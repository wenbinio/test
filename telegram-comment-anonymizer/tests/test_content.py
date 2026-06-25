from types import SimpleNamespace

from aiogram.enums import ContentType

from anonymizer.content import extract, render_html


def test_render_html_escapes_plain_text():
    assert render_html("a < b & c", None) == "a &lt; b &amp; c"


def test_render_html_empty():
    assert render_html(None, None) == ""
    assert render_html("", None) == ""


def test_extract_text():
    msg = SimpleNamespace(content_type=ContentType.TEXT, text="hello", entities=None)
    result = extract(msg)
    assert result.kind == "text"
    assert result.body_html == "hello"
    assert result.file_id is None


def test_extract_photo_uses_largest_size():
    msg = SimpleNamespace(
        content_type=ContentType.PHOTO,
        caption="nice",
        caption_entities=None,
        photo=[SimpleNamespace(file_id="small"), SimpleNamespace(file_id="large")],
    )
    result = extract(msg)
    assert result.kind == "photo"
    assert result.file_id == "large"
    assert result.body_html == "nice"


def test_extract_sticker_has_no_caption():
    msg = SimpleNamespace(
        content_type=ContentType.STICKER,
        sticker=SimpleNamespace(file_id="stk"),
    )
    result = extract(msg)
    assert result.kind == "sticker"
    assert result.body_html == ""
    assert result.file_id == "stk"


def test_extract_returns_none_for_unsupported():
    msg = SimpleNamespace(content_type=ContentType.POLL)
    assert extract(msg) is None
