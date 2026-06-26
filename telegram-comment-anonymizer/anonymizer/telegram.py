"""A tiny synchronous Telegram Bot API client built on the standard library.

The Bot API is plain HTTPS + JSON, so no third-party HTTP stack is needed. We
only ever send strings (text, file_ids) — media is re-posted by ``file_id``, so
there are no multipart uploads to worry about.
"""

from __future__ import annotations

import json
import logging
import time
import urllib.error
import urllib.request
from typing import Any, List, Optional

log = logging.getLogger("anonymizer")


class TelegramError(Exception):
    def __init__(self, code: Optional[int], description: str):
        super().__init__(f"[{code}] {description}")
        self.code = code
        self.description = description


class Bot:
    def __init__(self, token: str, timeout: int = 30):
        self._url = f"https://api.telegram.org/bot{token}/"
        self._timeout = timeout

    def call(self, method: str, _read_timeout: Optional[int] = None, **params: Any) -> Any:
        """Invoke an API method, retrying transparently on flood limits."""
        body = json.dumps({k: v for k, v in params.items() if v is not None}).encode()
        read_timeout = _read_timeout or self._timeout

        for attempt in range(5):
            request = urllib.request.Request(
                self._url + method, data=body, headers={"Content-Type": "application/json"}
            )
            try:
                with urllib.request.urlopen(request, timeout=read_timeout) as response:
                    payload = json.load(response)
            except urllib.error.HTTPError as exc:
                try:
                    payload = json.load(exc)  # Telegram returns JSON on 4xx too
                except (ValueError, OSError):
                    raise TelegramError(exc.code, exc.reason or "http error") from exc
            # URLError / socket timeout propagate to the caller (the poll loop
            # is responsible for deciding whether to keep going).

            if payload.get("ok"):
                return payload.get("result")

            retry_after = (payload.get("parameters") or {}).get("retry_after")
            if retry_after:
                log.warning("Flood limit; sleeping %ss", retry_after)
                time.sleep(retry_after + 1)
                continue
            raise TelegramError(payload.get("error_code"), payload.get("description", ""))

        raise TelegramError(None, f"{method}: retries exhausted")

    def get_updates(self, offset: Optional[int], timeout: int) -> List[dict]:
        """Long-poll for new updates. Never raises: returns [] on any error."""
        try:
            result = self.call(
                "getUpdates",
                _read_timeout=timeout + 10,
                offset=offset,
                timeout=timeout,
                allowed_updates=["message"],
            )
            return result or []
        except (TelegramError, urllib.error.URLError, OSError) as exc:
            log.warning("getUpdates failed (%s); retrying shortly", exc)
            time.sleep(3)
            return []
