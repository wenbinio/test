"""Buffering for media groups (albums).

Telegram delivers each item of an album as a separate update sharing a
``media_group_id``. We collect the items for a short window, then hand the whole
batch to a flush callback so the album can be re-posted as one group.
"""

from __future__ import annotations

import asyncio
from typing import Awaitable, Callable, Dict, List, Tuple

from aiogram import Bot
from aiogram.types import Message

FlushCallback = Callable[[Bot, List[Message], int], Awaitable[None]]


class AlbumCollector:
    def __init__(self, flush_cb: FlushCallback, delay: float = 1.2) -> None:
        self._flush_cb = flush_cb
        self._delay = delay
        self._buckets: Dict[Tuple[int, str], dict] = {}
        self._lock = asyncio.Lock()

    async def add(self, bot: Bot, message: Message, subject_id: int) -> None:
        key = (message.chat.id, message.media_group_id)
        async with self._lock:
            bucket = self._buckets.get(key)
            if bucket is None:
                bucket = {"messages": [], "subject": subject_id, "bot": bot, "task": None}
                self._buckets[key] = bucket
            bucket["messages"].append(message)
            # Debounce: restart the flush timer on every new item.
            if bucket["task"] is not None:
                bucket["task"].cancel()
            bucket["task"] = asyncio.create_task(self._wait_and_flush(key))

    async def _wait_and_flush(self, key: Tuple[int, str]) -> None:
        try:
            await asyncio.sleep(self._delay)
        except asyncio.CancelledError:
            return  # a newer item arrived; that item scheduled a fresh timer

        async with self._lock:
            bucket = self._buckets.pop(key, None)
        if bucket:
            await self._flush_cb(bucket["bot"], bucket["messages"], bucket["subject"])
