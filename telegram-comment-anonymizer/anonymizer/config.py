"""Runtime configuration, loaded from environment variables (or a .env file)."""

from __future__ import annotations

import hashlib
import os
from dataclasses import dataclass

try:  # optional convenience: load a local .env if python-dotenv is installed
    from dotenv import load_dotenv

    load_dotenv()
except ImportError:  # pragma: no cover - dotenv is optional
    pass


_TRUTHY = {"1", "true", "yes", "on"}
_VALID_STYLES = {"name", "number", "fixed"}


@dataclass(frozen=True)
class Settings:
    token: str
    # If non-empty, the bot only acts in these chat ids (the discussion groups).
    # If empty, it acts in every group where it is an admin.
    group_ids: frozenset[int]
    alias_style: str          # "name" | "number" | "fixed"
    alias_salt: str           # secret salt for deriving stable pseudonyms
    anonymize_admins: bool     # also anonymize group admins/mods?
    label_emoji: str           # prefix shown before each alias
    admin_cache_ttl: int       # seconds to cache the admin list per chat
    log_level: str


def _parse_ids(raw: str) -> frozenset[int]:
    ids = set()
    for chunk in raw.replace(" ", "").split(","):
        if not chunk:
            continue
        try:
            ids.add(int(chunk))
        except ValueError as exc:  # surface typos early instead of silently ignoring
            raise SystemExit(f"Invalid chat id in DISCUSSION_GROUP_IDS: {chunk!r}") from exc
    return frozenset(ids)


def load_settings() -> Settings:
    token = os.environ.get("BOT_TOKEN", "").strip()
    if not token:
        raise SystemExit(
            "BOT_TOKEN is required. Create a bot with @BotFather and set BOT_TOKEN "
            "in your environment or a .env file."
        )

    style = os.environ.get("ALIAS_STYLE", "name").strip().lower()
    if style not in _VALID_STYLES:
        style = "name"

    # A stable salt keeps pseudonyms consistent across restarts. We default to a
    # value derived from the token so it is stable without extra configuration,
    # but operators can override it with ALIAS_SALT.
    salt = os.environ.get("ALIAS_SALT", "").strip()
    if not salt:
        salt = hashlib.sha256(token.encode()).hexdigest()

    return Settings(
        token=token,
        group_ids=_parse_ids(os.environ.get("DISCUSSION_GROUP_IDS", "")),
        alias_style=style,
        alias_salt=salt,
        anonymize_admins=os.environ.get("ANONYMIZE_ADMINS", "false").strip().lower() in _TRUTHY,
        label_emoji=os.environ.get("LABEL_EMOJI", "🕵️"),
        admin_cache_ttl=int(os.environ.get("ADMIN_CACHE_TTL", "300")),
        log_level=os.environ.get("LOG_LEVEL", "INFO").strip().upper(),
    )
