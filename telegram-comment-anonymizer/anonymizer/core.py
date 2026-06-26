"""The anonymizer: turns identified comments into pseudonymous re-posts."""

from __future__ import annotations

import html
import logging
import time
from typing import Dict, Optional, Set

from .aliases import alias_for
from .config import Settings
from .content import Repostable, extract, is_fallback
from .telegram import Bot, TelegramError

log = logging.getLogger("anonymizer")

# kind -> (API method, file_id parameter name)
_SENDERS = {
    "photo": ("sendPhoto", "photo"),
    "video": ("sendVideo", "video"),
    "animation": ("sendAnimation", "animation"),
    "document": ("sendDocument", "document"),
    "audio": ("sendAudio", "audio"),
    "voice": ("sendVoice", "voice"),
    "video_note": ("sendVideoNote", "video_note"),
    "sticker": ("sendSticker", "sticker"),
}
_CAPTIONABLE = {"photo", "video", "animation", "document", "audio", "voice"}
_ALBUM_KINDS = {"photo", "video", "document", "audio"}

_POLL_IDLE = 25     # long-poll seconds when nothing is pending
_POLL_BUSY = 2      # short poll while an album is still arriving
_ALBUM_SETTLE = 1.0  # seconds of quiet before an album is considered complete


class Anonymizer:
    def __init__(self, settings: Settings, bot: Bot):
        self.s = settings
        self.bot = bot
        self.me_id: Optional[int] = None
        self._admin_cache: Dict[int, tuple[float, Set[int]]] = {}
        self._albums: Dict[str, dict] = {}

    # -------------------------------------------------------------- main loop

    def run(self) -> None:
        if self.me_id is None:
            self.me_id = self.bot.call("getMe")["id"]
        offset: Optional[int] = None
        while True:
            timeout = _POLL_BUSY if self._albums else _POLL_IDLE
            for update in self.bot.get_updates(offset, timeout):
                offset = update["update_id"] + 1
                message = update.get("message")
                if message:
                    try:
                        self._handle(message)
                    except Exception:  # never let one bad comment kill the loop
                        log.exception("Error handling message %s", message.get("message_id"))
            self._flush_due_albums()

    # ---------------------------------------------------------------- helpers

    def _admins(self, chat_id: int) -> Set[int]:
        now = time.time()
        cached = self._admin_cache.get(chat_id)
        if cached and cached[0] > now:
            return cached[1]
        try:
            members = self.bot.call("getChatAdministrators", chat_id=chat_id)
            ids = {m["user"]["id"] for m in members}
        except TelegramError as exc:
            log.warning("Could not fetch admins for chat %s: %s", chat_id, exc)
            ids = set()
        self._admin_cache[chat_id] = (now + self.s.admin_cache_ttl, ids)
        return ids

    def _subject_id(self, message: dict) -> Optional[int]:
        """Id to anonymize, or None if the message should be left alone."""
        if message.get("is_automatic_forward"):
            return None  # the channel post mirrored into the discussion group
        chat_id = message["chat"]["id"]
        if self.s.group_ids and chat_id not in self.s.group_ids:
            return None

        sender = message.get("from")
        if sender is None:
            sender_chat = message.get("sender_chat")
            if not sender_chat:
                return None  # service message
            if sender_chat["id"] == chat_id:
                return None  # anonymous group admin -> already anonymous
            return sender_chat["id"]  # commented "as a channel"

        uid = sender["id"]
        if uid == self.me_id or sender.get("is_bot"):
            return None
        if not self.s.anonymize_admins and uid in self._admins(chat_id):
            return None
        return uid

    def _alias_html(self, subject_id: int) -> str:
        alias = alias_for(subject_id, self.s.alias_salt, self.s.alias_style)
        label = f"{self.s.label_emoji} {alias}".strip()
        return f"<b>{html.escape(label)}</b>"

    def _delete(self, chat_id: int, message_id: int) -> bool:
        try:
            self.bot.call("deleteMessage", chat_id=chat_id, message_id=message_id)
            return True
        except TelegramError as exc:
            log.warning(
                "Could not delete message %s in chat %s (%s). Ensure the bot is an "
                "admin with 'Delete messages'.",
                message_id, chat_id, exc,
            )
            return False

    # ------------------------------------------------------------- dispatch

    def _handle(self, message: dict) -> None:
        subject_id = self._subject_id(message)
        if subject_id is None:
            return
        if message.get("media_group_id"):
            self._buffer_album(message, subject_id)
            return
        content = extract(message)
        if content is None:
            if is_fallback(message):
                self._fallback_copy(message)
            return
        self._anonymize_single(message, subject_id, content)

    def _anonymize_single(self, message: dict, subject_id: int, content: Repostable) -> None:
        chat_id = message["chat"]["id"]
        thread_id = message.get("message_thread_id")
        # Delete BEFORE re-posting: identity never lingers if the re-post fails.
        if not self._delete(chat_id, message["message_id"]):
            return
        self._send(chat_id, thread_id, content, self._alias_html(subject_id))

    def _send(self, chat_id: int, thread_id: Optional[int], content: Repostable, alias_html: str) -> None:
        prefix = alias_html + "\n"
        common = dict(chat_id=chat_id, message_thread_id=thread_id)
        try:
            if content.kind == "text":
                self.bot.call("sendMessage", text=prefix + content.body_html, parse_mode="HTML", **common)
                return
            method, arg = _SENDERS[content.kind]
            params = {arg: content.file_id, **common}
            if content.kind in _CAPTIONABLE:
                params["caption"] = prefix + content.body_html
                params["parse_mode"] = "HTML"
            self.bot.call(method, **params)
        except TelegramError as exc:
            log.error("Failed to repost %s in chat %s: %s", content.kind, chat_id, exc)

    def _fallback_copy(self, message: dict) -> None:
        """Polls/dice/locations/etc.: copyMessage drops the author, then delete."""
        chat_id = message["chat"]["id"]
        try:
            self.bot.call(
                "copyMessage",
                chat_id=chat_id,
                from_chat_id=chat_id,
                message_id=message["message_id"],
                message_thread_id=message.get("message_thread_id"),
            )
        except TelegramError as exc:
            log.warning("Cannot anonymize this message type in chat %s: %s", chat_id, exc)
            return
        self._delete(chat_id, message["message_id"])

    # --------------------------------------------------------------- albums

    def _buffer_album(self, message: dict, subject_id: int) -> None:
        bucket = self._albums.setdefault(
            message["media_group_id"], {"messages": [], "subject": subject_id}
        )
        bucket["messages"].append(message)
        bucket["last"] = time.time()

    def _flush_due_albums(self) -> None:
        now = time.time()
        for mgid in [k for k, b in self._albums.items() if now - b["last"] > _ALBUM_SETTLE]:
            bucket = self._albums.pop(mgid)
            try:
                self._flush_album(bucket["messages"], bucket["subject"])
            except Exception:
                log.exception("Error flushing album %s", mgid)

    def _flush_album(self, messages: list[dict], subject_id: int) -> None:
        messages.sort(key=lambda m: m["message_id"])
        chat_id = messages[0]["chat"]["id"]
        thread_id = messages[0].get("message_thread_id")
        alias_html = self._alias_html(subject_id)

        # Capture file_ids and the single album caption before deleting anything.
        items = []
        caption_body = ""
        for message in messages:
            content = extract(message)
            if content is None or content.kind not in _ALBUM_KINDS:
                continue
            if content.body_html and not caption_body:
                caption_body = content.body_html
            items.append(content)

        for message in messages:
            self._delete(chat_id, message["message_id"])

        if not items:
            return
        if len(items) == 1:
            self._send(chat_id, thread_id, Repostable(items[0].kind, caption_body, items[0].file_id), alias_html)
            return

        first_caption = alias_html + ("\n" + caption_body if caption_body else "")
        media = []
        for index, content in enumerate(items):
            entry = {"type": content.kind, "media": content.file_id}
            if index == 0:
                entry["caption"] = first_caption
                entry["parse_mode"] = "HTML"
            media.append(entry)
        try:
            self.bot.call("sendMediaGroup", chat_id=chat_id, media=media, message_thread_id=thread_id)
        except TelegramError as exc:
            log.error("Failed to repost album in chat %s: %s", chat_id, exc)
