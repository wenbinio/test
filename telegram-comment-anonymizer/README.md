# Telegram Comment Anonymizer

A bot that anonymizes **comments on your Telegram channel**. When someone
comments on a post, the bot deletes their comment and instantly re-posts an
identical copy under its own name — so the content stays, but who wrote it does
not.

Channel comments live in the channel's linked **discussion group**. This bot
sits in that group as an admin and rewrites incoming comments.

```
Before:   Jane Doe (@jane)   "Great post!"
After:    🕵️ Brave Otter      "Great post!"
```

**Zero dependencies, tiny footprint.** It talks to the Telegram Bot API
directly using only the Python standard library — no framework to install, and
~21 MB of RAM per process, so it runs comfortably on the smallest Raspberry Pi.

## Features

- Anonymizes **text, photos, videos, GIFs, documents, audio, voice, video
  notes, stickers**, and **albums** (media groups stay grouped).
- Preserves **formatting** (bold, links, emoji, etc.) and keeps each comment
  under the **right post**.
- **Stable pseudonyms** so a back-and-forth is still followable
  (`Brave Otter`), or `Anonymous #0042`, or a flat `Anonymous` — your choice.
  Derived with a salted HMAC, so readers can't reverse them.
- **Deletes before re-posting**, so an author's identity never lingers even if
  the re-post fails.
- Leaves the channel's own posts alone, and (by default) keeps **admins/mods**
  identifiable.

## Setup

1. **Create a bot** with [@BotFather](https://t.me/BotFather) and copy the token.

2. **Make sure your channel has comments enabled** (Channel → Edit → Discussion,
   and link/create a group).

3. **Add the bot to the discussion group as an administrator**, and grant it the
   **Delete messages** permission. (As an admin it can read every comment —
   privacy mode does not need changing.)

4. **Configure and run** (needs Python 3.8+, nothing else):

   ```bash
   cd telegram-comment-anonymizer
   cp .env.example .env
   # edit .env and set BOT_TOKEN
   python -m anonymizer
   ```

That's it — comment on a post in your channel and watch it come back
anonymized.

## Configuration

All settings are environment variables (see [`.env.example`](.env.example)):

| Variable | Default | Description |
| --- | --- | --- |
| `BOT_TOKEN` | — | **Required.** Token from @BotFather. |
| `DISCUSSION_GROUP_IDS` | *(all)* | Comma-separated group ids to restrict to. Empty = every group where the bot is admin. |
| `ALIAS_STYLE` | `name` | `name` (`Brave Otter`), `number` (`Anonymous #0042`), or `fixed` (`Anonymous`). |
| `ALIAS_SALT` | *(from token)* | Secret salt for pseudonyms. Keep it private and stable. |
| `ANONYMIZE_ADMINS` | `false` | Also anonymize group admins/mods. |
| `LABEL_EMOJI` | `🕵️` | Prefix shown before each alias. |
| `ADMIN_CACHE_TTL` | `300` | Seconds to cache each group's admin list. |
| `LOG_LEVEL` | `INFO` | `DEBUG` / `INFO` / `WARNING` / `ERROR`. |

## How it works

```
anonymizer/
├── __main__.py    # entry point + polling loop wiring
├── telegram.py    # ~80-line Bot API client over urllib (no framework)
├── core.py        # subject detection, anonymize/album/fallback logic
├── content.py     # classify & extract content from a message dict
├── entities.py    # render Telegram formatting -> HTML (UTF-16 safe)
├── aliases.py     # stable salted-HMAC pseudonyms
└── config.py      # env/.env settings
```

It long-polls `getUpdates`; for each comment it captures the content, deletes
the original (removing the author's identity), then re-posts an identical copy.
Media is re-sent by `file_id`, so the media bytes never pass through the host —
only small JSON API calls do.

## Tests

```bash
pip install -r requirements-dev.txt
pytest
```

## Footprint

Measured idle RSS: **~21 MB** per process (vs ~127 MB for an aiogram-based
equivalent). CPU is negligible, and because media is re-posted by `file_id`,
bandwidth is tiny too. One process can serve **many channels** at once (a single
bot can be admin in many discussion groups), so you rarely need more than one.

## Limitations & notes

- The bot must be an **admin with delete rights**; without them it logs a
  warning and leaves comments untouched (it never leaves a half-anonymized
  duplicate).
- Re-posting replaces the message, so the comment's **timestamp resets** and a
  reader watching live may briefly glimpse the original before it's deleted —
  this is inherent to the Bot API.
- **Reply chains between comments aren't preserved** (each comment is rebuilt);
  comments still stay under the correct post via the thread id.
- Polls, dice, locations, venues, contacts and games are anonymized via
  `copyMessage` (no alias label) where Telegram allows it.
- Pseudonym name collisions are possible but rare; use `ALIAS_STYLE=number` for
  a larger space.

## Responsible use

Use this on channels **you operate**, and let your commenters know their
comments are anonymized. Don't use it to strip attribution from content or
people you don't have the right to.
