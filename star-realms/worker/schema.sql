-- D1 schema for Star Realms game history.
-- Run with: wrangler d1 execute star-realms --file=./schema.sql

CREATE TABLE IF NOT EXISTS game_history (
  id            TEXT PRIMARY KEY,             -- room id + start ts
  room_id       TEXT NOT NULL,
  difficulty    TEXT NOT NULL,
  outcome       TEXT NOT NULL,                -- 'victory' | 'defeat'
  rounds        INTEGER NOT NULL,
  boss_tier     INTEGER NOT NULL,             -- tier reached
  players_json  TEXT NOT NULL,                -- JSON: [{name, authority, cardsBought}]
  log_json      TEXT NOT NULL,                -- last 50 log entries
  started_at    INTEGER NOT NULL,             -- unix ms
  ended_at      INTEGER NOT NULL              -- unix ms
);

CREATE INDEX IF NOT EXISTS idx_history_ended_at ON game_history (ended_at DESC);
CREATE INDEX IF NOT EXISTS idx_history_room ON game_history (room_id);
