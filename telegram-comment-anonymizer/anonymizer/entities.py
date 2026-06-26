"""Render Telegram message entities to HTML, using only the standard library.

Telegram gives formatting as a list of *entities* (``bold``, ``text_link`` …)
with ``offset`` / ``length`` measured in **UTF-16 code units** — not Python
characters. Any message containing emoji or other non-BMP characters will have
offsets that don't line up with ``str`` indexing, so we slice the text in
UTF-16 space at entity boundaries (which always fall on whole characters).
"""

from __future__ import annotations

import html
from typing import List, Optional, Tuple


def _tags_for(entity: dict) -> Optional[Tuple[str, str]]:
    """Return (open_tag, close_tag) for a formatting entity, or None to skip.

    Auto-detected entities (``url``, ``mention``, ``hashtag`` …) carry no
    formatting and are returned as plain text — Telegram re-detects them.
    """
    etype = entity.get("type")
    if etype == "bold":
        return "<b>", "</b>"
    if etype == "italic":
        return "<i>", "</i>"
    if etype == "underline":
        return "<u>", "</u>"
    if etype == "strikethrough":
        return "<s>", "</s>"
    if etype == "spoiler":
        return '<span class="tg-spoiler">', "</span>"
    if etype == "code":
        return "<code>", "</code>"
    if etype == "pre":
        language = entity.get("language")
        if language:
            lang = html.escape(language, quote=True)
            return f'<pre><code class="language-{lang}">', "</code></pre>"
        return "<pre>", "</pre>"
    if etype == "blockquote":
        return "<blockquote>", "</blockquote>"
    if etype == "expandable_blockquote":
        return "<blockquote expandable>", "</blockquote>"
    if etype == "text_link":
        url = html.escape(entity.get("url", ""), quote=True)
        return f'<a href="{url}">', "</a>"
    if etype == "text_mention":
        user_id = (entity.get("user") or {}).get("id")
        return f'<a href="tg://user?id={user_id}">', "</a>"
    if etype == "custom_emoji":
        emoji_id = html.escape(str(entity.get("custom_emoji_id", "")), quote=True)
        return f'<tg-emoji emoji-id="{emoji_id}">', "</tg-emoji>"
    return None


def render_html(text: Optional[str], entities: Optional[List[dict]]) -> str:
    """Render ``text`` with ``entities`` to a safe HTML string."""
    if not text:
        return ""

    relevant = [e for e in (entities or []) if _tags_for(e)]
    if not relevant:
        return html.escape(text, quote=False)

    # Closings happen before openings at a shared boundary. Among closings,
    # the entity that started latest is innermost, so it closes first (sort by
    # descending start). Among openings, the entity that ends latest is
    # outermost, so it opens first (sort by descending end). This keeps nesting
    # valid for Telegram's (non-partially-overlapping) entities.
    opens: dict[int, list[Tuple[int, str]]] = {}
    closes: dict[int, list[Tuple[int, str]]] = {}
    boundaries = {0}

    u16 = text.encode("utf-16-le")
    n = len(u16) // 2
    boundaries.add(n)

    for entity in relevant:
        open_tag, close_tag = _tags_for(entity)
        start = entity["offset"]
        end = start + entity["length"]
        opens.setdefault(start, []).append((end, open_tag))
        closes.setdefault(end, []).append((start, close_tag))
        boundaries.add(start)
        boundaries.add(end)

    out: list[str] = []
    prev = 0
    for boundary in sorted(b for b in boundaries if 0 <= b <= n):
        if boundary > prev:
            segment = u16[prev * 2 : boundary * 2].decode("utf-16-le")
            out.append(html.escape(segment, quote=False))
            prev = boundary
        for _, tag in sorted(closes.get(boundary, []), key=lambda x: -x[0]):
            out.append(tag)
        for _, tag in sorted(opens.get(boundary, []), key=lambda x: -x[0]):
            out.append(tag)

    return "".join(out)
