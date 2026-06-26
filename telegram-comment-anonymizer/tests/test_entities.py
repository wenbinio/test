from anonymizer.entities import render_html


def bold(offset, length):
    return {"type": "bold", "offset": offset, "length": length}


def test_plain_text_is_escaped():
    assert render_html("a < b & c", None) == "a &lt; b &amp; c"


def test_empty():
    assert render_html(None, None) == ""
    assert render_html("", [bold(0, 0)]) == ""


def test_simple_bold():
    assert render_html("hello", [bold(0, 5)]) == "<b>hello</b>"


def test_partial_bold():
    assert render_html("ab", [bold(0, 1)]) == "<b>a</b>b"


def test_adjacent_entities():
    out = render_html("ab", [bold(0, 1), {"type": "italic", "offset": 1, "length": 1}])
    assert out == "<b>a</b><i>b</i>"


def test_nested_entities():
    # "abc" with bold over all and italic over "b"
    out = render_html("abc", [bold(0, 3), {"type": "italic", "offset": 1, "length": 1}])
    assert out == "<b>a<i>b</i>c</b>"


def test_text_link_escapes_url():
    out = render_html("x", [{"type": "text_link", "offset": 0, "length": 1, "url": "h?a=1&b=2"}])
    assert out == '<a href="h?a=1&amp;b=2">x</a>'


def test_emoji_offsets_are_utf16():
    # "😀 hi": the emoji is 2 UTF-16 units, so bold over "hi" starts at offset 3.
    out = render_html("😀 hi", [bold(3, 2)])
    assert out == "😀 <b>hi</b>"


def test_auto_detected_entities_are_left_plain():
    # A 'url' entity carries no formatting; the text passes through unwrapped.
    out = render_html("see x.com", [{"type": "url", "offset": 4, "length": 5}])
    assert out == "see x.com"


def test_pre_with_language():
    out = render_html("z", [{"type": "pre", "offset": 0, "length": 1, "language": "py"}])
    assert out == '<pre><code class="language-py">z</code></pre>'
