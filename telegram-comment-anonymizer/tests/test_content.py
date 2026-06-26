from anonymizer.content import extract, is_fallback, kind


def test_kind_text():
    assert kind({"text": "hi"}) == "text"


def test_kind_prefers_media():
    assert kind({"caption": "c", "photo": [{"file_id": "x"}]}) == "photo"


def test_kind_none_for_service():
    assert kind({"new_chat_members": []}) is None


def test_extract_text():
    result = extract({"text": "hello", "entities": None})
    assert result.kind == "text"
    assert result.body_html == "hello"
    assert result.file_id is None


def test_extract_photo_uses_largest_size():
    result = extract({
        "caption": "nice",
        "photo": [{"file_id": "small"}, {"file_id": "large"}],
    })
    assert result.kind == "photo"
    assert result.file_id == "large"
    assert result.body_html == "nice"


def test_extract_sticker_has_no_caption():
    result = extract({"sticker": {"file_id": "stk"}})
    assert result.kind == "sticker"
    assert result.body_html == ""
    assert result.file_id == "stk"


def test_extract_returns_none_for_unsupported():
    assert extract({"poll": {"id": "1"}}) is None


def test_is_fallback():
    assert is_fallback({"poll": {"id": "1"}})
    assert is_fallback({"dice": {"value": 3}})
    assert not is_fallback({"text": "hi"})
