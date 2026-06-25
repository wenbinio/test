from anonymizer.aliases import alias_for


def test_fixed_style_is_constant():
    assert alias_for(123, "salt", "fixed") == "Anonymous"
    assert alias_for(999, "salt", "fixed") == "Anonymous"


def test_number_style_format():
    alias = alias_for(123, "salt", "number")
    prefix = "Anonymous #"
    assert alias.startswith(prefix)
    suffix = alias[len(prefix):]
    assert suffix.isdigit() and len(suffix) == 4


def test_is_deterministic():
    assert alias_for(42, "salt", "name") == alias_for(42, "salt", "name")
    assert alias_for(42, "salt", "number") == alias_for(42, "salt", "number")


def test_salt_changes_alias_mapping():
    # Across a range of ids, two different salts must not produce identical maps.
    a = [alias_for(i, "salt-a", "name") for i in range(50)]
    b = [alias_for(i, "salt-b", "name") for i in range(50)]
    assert a != b


def test_name_style_has_variety():
    names = {alias_for(i, "salt", "name") for i in range(200)}
    assert len(names) > 1
    assert all(" " in n for n in names)
