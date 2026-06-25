"""Entry point: ``python -m anonymizer``."""

from __future__ import annotations

import asyncio
import logging

from aiogram import Bot, Dispatcher

from .config import load_settings
from .handlers import Anonymizer


async def main() -> None:
    settings = load_settings()
    logging.basicConfig(
        level=getattr(logging, settings.log_level, logging.INFO),
        format="%(asctime)s %(levelname)s %(name)s: %(message)s",
    )

    bot = Bot(settings.token)
    dispatcher = Dispatcher()
    dispatcher.include_router(Anonymizer(settings).router)

    me = await bot.me()
    logging.getLogger("anonymizer").info(
        "Started as @%s. Add me as an admin (with 'Delete messages') to your "
        "channel's discussion group to anonymize comments.",
        me.username,
    )

    try:
        await dispatcher.start_polling(
            bot, allowed_updates=dispatcher.resolve_used_update_types()
        )
    finally:
        await bot.session.close()


if __name__ == "__main__":
    try:
        asyncio.run(main())
    except (KeyboardInterrupt, SystemExit):
        pass
