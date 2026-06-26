"""Entry point: ``python -m anonymizer``."""

from __future__ import annotations

import logging

from .config import load_settings
from .core import Anonymizer
from .telegram import Bot


def main() -> None:
    settings = load_settings()
    logging.basicConfig(
        level=getattr(logging, settings.log_level, logging.INFO),
        format="%(asctime)s %(levelname)s %(name)s: %(message)s",
    )

    bot = Bot(settings.token)
    me = bot.call("getMe")
    logging.getLogger("anonymizer").info(
        "Started as @%s. Add me as an admin (with 'Delete messages') to your "
        "channel's discussion group to anonymize comments.",
        me.get("username"),
    )

    anonymizer = Anonymizer(settings, bot)
    anonymizer.me_id = me["id"]
    anonymizer.run()


if __name__ == "__main__":
    try:
        main()
    except (KeyboardInterrupt, SystemExit):
        pass
