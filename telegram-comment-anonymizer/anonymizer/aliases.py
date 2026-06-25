"""Stable, non-reversible pseudonyms for commenters.

Each commenter is mapped to a consistent alias via a salted HMAC of their id,
so a conversation stays followable while the real identity stays hidden. Because
the salt is secret, the mapping cannot be reversed by readers.
"""

from __future__ import annotations

import hashlib
import hmac

# Two small word lists combine into ~2.3k friendly, readable handles.
ADJECTIVES = [
    "Brave", "Calm", "Clever", "Bold", "Bright", "Swift", "Quiet", "Gentle",
    "Lucky", "Merry", "Noble", "Proud", "Witty", "Eager", "Fancy", "Jolly",
    "Keen", "Lively", "Mellow", "Nimble", "Plucky", "Quick", "Rapid", "Sunny",
    "Tame", "Vivid", "Wily", "Zany", "Amber", "Cosmic", "Dusky", "Emerald",
    "Frosty", "Golden", "Hazel", "Icy", "Jade", "Mint", "Onyx", "Pearl",
    "Ruby", "Silver", "Teal", "Velvet", "Azure", "Coral", "Ivory", "Scarlet",
]

ANIMALS = [
    "Otter", "Fox", "Heron", "Lynx", "Falcon", "Badger", "Marten", "Raven",
    "Hare", "Stoat", "Ferret", "Owl", "Wolf", "Bison", "Moose", "Elk",
    "Seal", "Crane", "Finch", "Robin", "Sparrow", "Magpie", "Wren", "Swift",
    "Newt", "Toad", "Gecko", "Viper", "Cobra", "Mantis", "Beetle", "Cricket",
    "Salmon", "Perch", "Carp", "Eel", "Squid", "Crab", "Prawn", "Urchin",
    "Panda", "Tapir", "Llama", "Camel", "Yak", "Ibex", "Gazelle", "Okapi",
]


def _digest(subject_id: int, salt: str) -> bytes:
    return hmac.new(salt.encode(), str(subject_id).encode(), hashlib.sha256).digest()


def alias_for(subject_id: int, salt: str, style: str = "name") -> str:
    """Return a stable display alias for ``subject_id``.

    ``style`` is one of:
      * ``"fixed"``  -> everyone is simply "Anonymous"
      * ``"number"`` -> "Anonymous #0042"
      * ``"name"``   -> "Brave Otter"   (default)
    """
    if style == "fixed":
        return "Anonymous"

    digest = _digest(subject_id, salt)

    if style == "number":
        number = int.from_bytes(digest[:4], "big") % 10000
        return f"Anonymous #{number:04d}"

    adjective = ADJECTIVES[digest[0] % len(ADJECTIVES)]
    animal = ANIMALS[digest[1] % len(ANIMALS)]
    return f"{adjective} {animal}"
