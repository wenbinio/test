"""Classify and extract re-postable content from a raw Telegram message dict."""

from __future__ import annotations

from dataclasses import dataclass
from typing import Optional

from .entities import render_html

# Media that carries a caption we can prefix with the alias.
CAPTIONABLE = ("photo", "video", "animation", "document", "audio", "voice")
# Media with no caption field; we just re-send it.
NONCAPTION = ("video_note", "sticker")
# Types we cannot rebuild from fields, handled via copyMessage instead.
FALLBACK = ("poll", "dice", "location", "venue", "contact", "game")

_MEDIA_ORDER = CAPTIONABLE + NONCAPTION


@dataclass
class Repostable:
    kind: str               # "text", "photo", ... (matches CAPTIONABLE/NONCAPTION)
    body_html: str          # rendered text/caption WITHOUT the alias (may be "")
    file_id: Optional[str]  # None for plain text


def kind(message: dict) -> Optional[str]:
    """Return the re-buildable content kind, or ``None``."""
    if "text" in message:
        return "text"
    for key in _MEDIA_ORDER:
        if key in message:
            return key
    return None


def is_fallback(message: dict) -> bool:
    return any(key in message for key in FALLBACK)


def _file_id(message: dict, k: str) -> str:
    if k == "photo":
        return message["photo"][-1]["file_id"]  # largest size
    return message[k]["file_id"]


def extract(message: dict) -> Optional[Repostable]:
    """Return a :class:`Repostable`, or ``None`` if the type isn't re-buildable."""
    k = kind(message)
    if k is None:
        return None
    if k == "text":
        return Repostable("text", render_html(message.get("text"), message.get("entities")), None)
    if k in CAPTIONABLE:
        caption = render_html(message.get("caption"), message.get("caption_entities"))
        return Repostable(k, caption, _file_id(message, k))
    return Repostable(k, "", _file_id(message, k))  # video_note / sticker
