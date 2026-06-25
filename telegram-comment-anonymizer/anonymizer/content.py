"""Extracting re-postable content from an incoming comment.

We capture everything needed to recreate a message *before* deleting the
original, so the author's identity can be removed without losing the content.
"""

from __future__ import annotations

import html
from dataclasses import dataclass
from typing import Optional

from aiogram.enums import ContentType
from aiogram.types import Message, MessageEntity
from aiogram.utils.text_decorations import html_decoration

# Media that carries a caption we can prefix with the alias.
CAPTIONABLE = {"photo", "video", "animation", "document", "audio", "voice"}
# Media with no caption field; we just re-send it.
NONCAPTION = {"video_note", "sticker"}

# Content types we re-create ourselves (by file_id / text).
_RECONSTRUCTIBLE = {ContentType.TEXT}
# Content types we cannot rebuild from fields, so we fall back to copy_message.
FALLBACK_TYPES = {
    ContentType.POLL,
    ContentType.DICE,
    ContentType.LOCATION,
    ContentType.VENUE,
    ContentType.CONTACT,
    ContentType.GAME,
}

# Everything the bot will act on. Anything else (service messages such as joins,
# pins, etc.) is ignored entirely.
HANDLED_CONTENT = {
    ContentType.TEXT,
    ContentType.PHOTO,
    ContentType.VIDEO,
    ContentType.ANIMATION,
    ContentType.DOCUMENT,
    ContentType.AUDIO,
    ContentType.VOICE,
    ContentType.VIDEO_NOTE,
    ContentType.STICKER,
} | FALLBACK_TYPES


@dataclass
class Repostable:
    kind: str               # "text", "photo", ... (matches CAPTIONABLE/NONCAPTION)
    body_html: str          # rendered text/caption WITHOUT the alias (may be "")
    file_id: Optional[str]  # None for plain text


def render_html(text: Optional[str], entities: Optional[list[MessageEntity]]) -> str:
    """Render message text/caption to safe HTML, preserving formatting."""
    if not text:
        return ""
    if not entities:
        return html.escape(text)
    return html_decoration.unparse(text, entities)


def _caption(message: Message) -> str:
    return render_html(message.caption, message.caption_entities)


def extract(message: Message) -> Optional[Repostable]:
    """Return a :class:`Repostable` for re-creatable messages, else ``None``.

    ``None`` means either a service message or a type that must be handled via
    the copy_message fallback.
    """
    ct = message.content_type

    if ct == ContentType.TEXT:
        return Repostable("text", render_html(message.text, message.entities), None)
    if ct == ContentType.PHOTO:
        return Repostable("photo", _caption(message), message.photo[-1].file_id)
    if ct == ContentType.VIDEO:
        return Repostable("video", _caption(message), message.video.file_id)
    if ct == ContentType.ANIMATION:
        return Repostable("animation", _caption(message), message.animation.file_id)
    if ct == ContentType.DOCUMENT:
        return Repostable("document", _caption(message), message.document.file_id)
    if ct == ContentType.AUDIO:
        return Repostable("audio", _caption(message), message.audio.file_id)
    if ct == ContentType.VOICE:
        return Repostable("voice", _caption(message), message.voice.file_id)
    if ct == ContentType.VIDEO_NOTE:
        return Repostable("video_note", "", message.video_note.file_id)
    if ct == ContentType.STICKER:
        return Repostable("sticker", "", message.sticker.file_id)

    return None
