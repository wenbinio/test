"""Core anonymization logic, wired onto an aiogram router."""

from __future__ import annotations

import asyncio
import html
import logging
import time
from typing import Optional, Set, Tuple

from aiogram import Bot, F, Router
from aiogram.enums import ContentType
from aiogram.exceptions import (
    TelegramAPIError,
    TelegramBadRequest,
    TelegramForbiddenError,
    TelegramRetryAfter,
)
from aiogram.types import (
    InputMediaAudio,
    InputMediaDocument,
    InputMediaPhoto,
    InputMediaVideo,
    Message,
)

from .aliases import alias_for
from .albums import AlbumCollector
from .config import Settings
from .content import (
    CAPTIONABLE,
    HANDLED_CONTENT,
    NONCAPTION,
    Repostable,
    extract,
    render_html,
)

log = logging.getLogger("anonymizer")

# kind -> (Bot method name, keyword used for the file_id)
_SENDERS = {
    "photo": ("send_photo", "photo"),
    "video": ("send_video", "video"),
    "animation": ("send_animation", "animation"),
    "document": ("send_document", "document"),
    "audio": ("send_audio", "audio"),
    "voice": ("send_voice", "voice"),
    "video_note": ("send_video_note", "video_note"),
    "sticker": ("send_sticker", "sticker"),
}

_ALBUM_CLASSES = {
    "photo": InputMediaPhoto,
    "video": InputMediaVideo,
    "document": InputMediaDocument,
    "audio": InputMediaAudio,
}


def _album_kind(message: Message) -> Tuple[Optional[str], Optional[str]]:
    ct = message.content_type
    if ct == ContentType.PHOTO:
        return "photo", message.photo[-1].file_id
    if ct == ContentType.VIDEO:
        return "video", message.video.file_id
    if ct == ContentType.DOCUMENT:
        return "document", message.document.file_id
    if ct == ContentType.AUDIO:
        return "audio", message.audio.file_id
    return None, None


class Anonymizer:
    """Holds shared state (settings, admin cache, album buffer) and handlers."""

    def __init__(self, settings: Settings) -> None:
        self.s = settings
        self.router = Router(name="anonymizer")
        self._admin_cache: dict[int, Tuple[float, Set[int]]] = {}
        self._albums = AlbumCollector(self._flush_album)

        # Only react to messages inside groups/supergroups (the discussion group).
        self.router.message.register(
            self.on_message, F.chat.type.in_({"group", "supergroup"})
        )

    # ------------------------------------------------------------------ helpers

    async def _call(self, func, **kwargs):
        """Invoke a Bot method, transparently honoring Telegram flood waits."""
        for _ in range(5):
            try:
                return await func(**kwargs)
            except TelegramRetryAfter as exc:
                log.warning("Flood limit hit; sleeping %ss", exc.retry_after)
                await asyncio.sleep(exc.retry_after + 1)
        return await func(**kwargs)

    async def _admins(self, bot: Bot, chat_id: int) -> Set[int]:
        now = time.monotonic()
        cached = self._admin_cache.get(chat_id)
        if cached and cached[0] > now:
            return cached[1]
        try:
            members = await bot.get_chat_administrators(chat_id)
            ids = {m.user.id for m in members}
        except TelegramAPIError as exc:
            log.warning("Could not fetch admins for chat %s: %s", chat_id, exc)
            ids = set()
        self._admin_cache[chat_id] = (now + self.s.admin_cache_ttl, ids)
        return ids

    async def _subject_id(self, message: Message, bot: Bot) -> Optional[int]:
        """Return the id to anonymize, or ``None`` if the message must be left alone."""
        # The channel post itself, auto-forwarded into the discussion group.
        if message.is_automatic_forward:
            return None
        # Restrict to configured discussion groups, if any were given.
        if self.s.group_ids and message.chat.id not in self.s.group_ids:
            return None

        if message.from_user is None:
            sender_chat = message.sender_chat
            if sender_chat is None:
                return None  # service message
            if sender_chat.id == message.chat.id:
                return None  # anonymous group admin -> already anonymous
            return sender_chat.id  # commented "as a channel"

        user = message.from_user
        me = await bot.me()
        if user.id == me.id or user.is_bot:
            return None  # our own re-posts / other bots
        if not self.s.anonymize_admins and user.id in await self._admins(bot, message.chat.id):
            return None  # keep mods/admins identifiable
        return user.id

    def _alias_html(self, subject_id: int) -> str:
        alias = alias_for(subject_id, self.s.alias_salt, self.s.alias_style)
        label = f"{self.s.label_emoji} {alias}".strip()
        return f"<b>{html.escape(label)}</b>"

    async def _delete(self, bot: Bot, message: Message) -> bool:
        try:
            await message.delete()
            return True
        except TelegramForbiddenError:
            log.warning(
                "Missing 'Delete messages' admin right in chat %s; cannot anonymize. "
                "Grant the bot that permission.",
                message.chat.id,
            )
            return False
        except TelegramBadRequest as exc:
            log.warning("Delete failed in chat %s: %s", message.chat.id, exc)
            return False

    # ---------------------------------------------------------------- handlers

    async def on_message(self, message: Message, bot: Bot) -> None:
        if message.content_type not in HANDLED_CONTENT:
            return  # service messages and anything we don't touch

        subject_id = await self._subject_id(message, bot)
        if subject_id is None:
            return

        if message.media_group_id:
            await self._albums.add(bot, message, subject_id)
            return

        await self._anonymize_single(bot, message, subject_id)

    async def _anonymize_single(self, bot: Bot, message: Message, subject_id: int) -> None:
        content = extract(message)
        thread_id = message.message_thread_id

        if content is None:
            await self._fallback_copy(bot, message, thread_id)
            return

        # Delete BEFORE re-posting: if the re-post fails we still never leak the
        # author's identity (the original is already gone).
        if not await self._delete(bot, message):
            return

        await self._send(bot, message.chat.id, thread_id, content, self._alias_html(subject_id))

    async def _send(
        self,
        bot: Bot,
        chat_id: int,
        thread_id: Optional[int],
        content: Repostable,
        alias_html: str,
    ) -> None:
        common = dict(chat_id=chat_id, message_thread_id=thread_id)
        prefix = alias_html + "\n"
        try:
            if content.kind == "text":
                await self._call(
                    bot.send_message,
                    text=prefix + content.body_html,
                    parse_mode="HTML",
                    **common,
                )
            elif content.kind in CAPTIONABLE:
                method_name, arg = _SENDERS[content.kind]
                caption = prefix + content.body_html
                await self._call(
                    getattr(bot, method_name),
                    caption=caption,
                    parse_mode="HTML",
                    **{arg: content.file_id},
                    **common,
                )
            elif content.kind in NONCAPTION:
                # Stickers / video notes carry no caption, so the alias cannot be
                # attached; they are simply re-sent anonymously.
                method_name, arg = _SENDERS[content.kind]
                await self._call(
                    getattr(bot, method_name),
                    **{arg: content.file_id},
                    **common,
                )
        except TelegramAPIError as exc:
            log.error("Failed to repost anonymized %s in chat %s: %s", content.kind, chat_id, exc)

    async def _fallback_copy(self, bot: Bot, message: Message, thread_id: Optional[int]) -> None:
        """For types we cannot rebuild (polls, dice, location, ...).

        copy_message drops the author attribution. We copy first, then delete the
        original, since copy needs the original message to still exist.
        """
        try:
            await self._call(
                bot.copy_message,
                chat_id=message.chat.id,
                from_chat_id=message.chat.id,
                message_id=message.message_id,
                message_thread_id=thread_id,
            )
        except TelegramAPIError as exc:
            log.warning(
                "Cannot anonymize message type %s in chat %s: %s",
                message.content_type,
                message.chat.id,
                exc,
            )
            return
        await self._delete(bot, message)

    async def _flush_album(self, bot: Bot, messages: list[Message], subject_id: int) -> None:
        messages.sort(key=lambda m: m.message_id)
        chat_id = messages[0].chat.id
        thread_id = messages[0].message_thread_id
        alias_html = self._alias_html(subject_id)

        # Capture file_ids and the album caption before deleting anything.
        items: list[Tuple[str, str]] = []
        caption_body = ""
        for m in messages:
            kind, file_id = _album_kind(m)
            if kind is None:
                continue
            if m.caption and not caption_body:
                caption_body = render_html(m.caption, m.caption_entities)
            items.append((kind, file_id))

        for m in messages:
            await self._delete(bot, m)

        if not items:
            return

        if len(items) == 1:
            kind, file_id = items[0]
            await self._send(bot, chat_id, thread_id, Repostable(kind, caption_body, file_id), alias_html)
            return

        first_caption = alias_html + ("\n" + caption_body if caption_body else "")
        media = []
        for idx, (kind, file_id) in enumerate(items):
            cls = _ALBUM_CLASSES[kind]
            if idx == 0:
                media.append(cls(media=file_id, caption=first_caption, parse_mode="HTML"))
            else:
                media.append(cls(media=file_id))

        try:
            await self._call(
                bot.send_media_group, chat_id=chat_id, media=media, message_thread_id=thread_id
            )
        except TelegramAPIError as exc:
            log.error("Failed to repost album in chat %s: %s", chat_id, exc)
