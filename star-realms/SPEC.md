# Star Realms — Co-op Web Rebuild
## Product Specification & Requirements

**Status:** Draft v0.1 — awaiting sign-off
**Owner:** wenbinio
**Branch:** `claude/rebuild-star-realms-ui-3X5lc`
**Target deploy:** privately hosted on owner's domain

> Legal note: Star Realms is © Wise Wizard Games. This is a private,
> non-commercial fan rebuild of the UI/UX for personal use among invited
> players. Card art, names, and rules text are NOT redistributed. Card data
> in this project uses placeholder art and re-worded rules text. The project
> must remain unlisted / invite-only.

---

## 1. Vision

A modern, snappy, **online co-op** web client for Star Realms with a
faithful sci-fi dark aesthetic. Two friends share a browser session and
play **together against a procedurally escalating "Hostile Worlds" boss**
(inspired by the official Star Realms Frontiers solo/co-op campaign).

Primary goals, in priority order:

1. **Feels good to play.** Fast, fluid card interactions. No page reloads.
   Authoritative state sync within ~100 ms on a home connection.
2. **Beautiful.** Faithful sci-fi dark theme with four faction colors and
   readable, ergonomic typography on desktops down to small laptops.
3. **Private & simple to host.** One Node process, one static bundle,
   served behind the owner's domain over HTTPS. No public matchmaking.
4. **Honest reimplementation.** No copyrighted card text or art reused.
   Rules text re-paraphrased; placeholder art only.

Non-goals (v1):

- Competitive 1v1 mode (only co-op vs. boss).
- 3-4 player.
- Mobile-first UI (responsive down to ~1024 px is enough).
- Native apps / offline play.
- Public matchmaking, ranking, accounts, payments.

---

## 2. Personas & Top User Stories

**P1 — The Host (owner).** Runs the server on their domain. Wants to spin
up a game with one friend in <30 seconds.

**P2 — The Guest.** Receives a link / room code. Wants to join with zero
account setup and just play.

Top stories:

- *As Host*, I open the site, click **New Game**, get a room code, and
  share it.
- *As Guest*, I open the link, enter my name, and join the same room.
- *As either player*, I can see my hand, the trade row, my partner's
  played cards, and the boss's state at a glance.
- *As either player*, I can play / buy / attack with one click or drag.
- *As either player*, I can chat in-game with my partner.
- *As either player*, I can reconnect after a refresh and resume the
  same game.

---

## 3. Game Design (Co-op Variant)

### 3.1 Setup

- 2 human players, sharing a single deck-building economy individually
  (each has their own deck, discard, hand, bases, authority — like the
  base game).
- Starting deck per player: 8× Scout, 2× Viper. Standard.
- Starting authority: **50** per player.
- Trade row: 5 face-up cards drawn from the trade deck.
- Explorer pile: always available (cost 2, +2 combat, scrap for +2
  trade — paraphrased).
- **Shared damage pool:** combat each player generates can be directed
  at the boss, at a threat card, or at the partner's bases is **not**
  allowed (no friendly fire).

### 3.2 Boss ("Hostile Worlds")

- Boss has authority that scales with tier (e.g. 50, 75, 100).
- Each round the boss may:
  - Spawn a **Threat** card into its zone (random from a threat pool).
  - Deal `damagePerTurn` combat to the player with **highest** authority
    (ties broken alphabetically by name, then split if both are tied).
  - At escalation milestones, increase `damagePerTurn` and threat tier.
- Threats are bases-like cards with defense + an ongoing penalty
  (e.g. "−1 trade in this row each turn"). Players spend combat to
  destroy them.
- Game **ends in defeat** when any player's authority reaches 0.
- Game **ends in victory** when boss authority reaches 0.

### 3.3 Turn Flow

Players alternate turns. On a player's turn:

1. **Start phase** — resolve start-of-turn base effects.
2. **Main phase** — play cards from hand, activate base abilities, use
   trade to buy from trade row / explorer pile, use combat to attack
   boss or threats.
3. **Discard phase** — discard hand and in-play ships to discard.
4. **Draw phase** — draw 5 new cards.
5. **Boss reaction** — only after **both** players have completed a
   turn in the round, the boss acts (spawn + damage).

### 3.4 Ally Mechanics

Standard Star Realms ally rules apply: when a player plays a card
matching the faction of another card in their *own* in-play area, both
cards' ally abilities trigger once. Partner's faction cards do **not**
trigger ally (each player's tableau is independent).

### 3.5 Card Set (v1)

- Implement the **core 80-card** trade deck equivalent using
  paraphrased text and placeholder art. Reference categories:
  - Trade Federation: economy + authority gain
  - Blob: aggressive combat + scaling
  - Star Empire: card draw + force-discard
  - Machine Cult: scrap synergy + bases
- 10 Threat cards for the boss (mix of defense values + penalties).
- Explorer (neutral, paraphrased).

---

## 4. Functional Requirements

### 4.1 Lobby

- **FR-L1** Create a new room → receive 6-character room code.
- **FR-L2** Join existing room by code; max 2 players per room.
- **FR-L3** Display players' display names and connection status.
- **FR-L4** Host can press **Start Game** when 2 players are present.
- **FR-L5** Optional boss difficulty selector: *Standard / Hard / Endless*.

### 4.2 In-Game

- **FR-G1** Visualize: each player's hand (own hand fully visible; partner's
  hand shown as card-back count), discard counts, deck counts, bases in
  play, in-play ships for current turn, trade/combat pools, authority.
- **FR-G2** Click a card in hand → play it. Play resolves animations and
  applies effect server-side.
- **FR-G3** Click a card in trade row → if affordable, prompt to buy.
- **FR-G4** Combat: a single **Attack** widget shows current available
  combat; player chooses target (boss or specific threat).
- **FR-G5** Bases: shown stacked beneath in-play row, can be activated
  while still in play, can be destroyed by boss threats with combat.
- **FR-G6** End turn button enabled only when current player.
- **FR-G7** Persistent **event log** panel showing the last N events.
- **FR-G8** **Chat** input always visible.
- **FR-G9** **Reconnect**: refreshing the page restores the player's seat
  using a token stored in `localStorage` keyed to room.

### 4.3 End-of-Game

- **FR-E1** On victory or defeat, show summary modal with boss tier
  reached, rounds survived, cards bought per player.
- **FR-E2** "New Game" button returns both players to lobby.

### 4.4 Out-of-scope (v1)

- Replays, save/load games to disk, AI fill-in for missing partner,
  spectators, deck inspection of opponent.

---

## 5. UI/UX Requirements

### 5.1 Visual System

- **Theme:** sci-fi dark. Background: deep starfield (`#05060d` base
  with subtle nebula gradients). Card surfaces: `#101828` with faction
  accent borders.
- **Faction palette:**
  - Trade Federation — `#f5c34e` (gold/yellow)
  - Blob              — `#3ddc84` (green)
  - Star Empire       — `#ffd35a` → reserved; use `#ffae42` (amber)
  - Machine Cult      — `#ff5a5f` (red)
  - Neutral           — `#7a8aa3` (slate)
- **Typography:** Inter or system UI for chrome; Orbitron / Audiowide
  (Google Fonts) for headers and authority numbers. All licensed under
  SIL OFL.
- **Motion:** 120-180 ms ease-out for transitions. Cards lift on hover
  (translateY -6 px + glow). Played cards animate from hand to in-play
  row over 220 ms.
- **Sound (optional v1.1):** subtle click on play, low whoosh on attack,
  muted by default.

### 5.2 Layout (desktop ≥ 1280 × 800)

```
┌──────────────────────────────────────────────────────────┐
│ Top bar: room code · partner status · chat toggle · menu │
├──────────────────────────────────────────────────────────┤
│                 BOSS PANEL (authority + threats)          │
├──────────────────────────────────────────────────────────┤
│        Trade Row (5 cards) · Explorer · Trade Deck       │
├───────────────────────────┬──────────────────────────────┤
│   Partner area            │   Event log / chat           │
│   (hand-back, discard,    │                              │
│   bases, in-play)         │                              │
├───────────────────────────┴──────────────────────────────┤
│           YOUR in-play row · YOUR bases                  │
├──────────────────────────────────────────────────────────┤
│ Authority · Trade · Combat · End Turn                    │
│ YOUR HAND (fanned cards)                                 │
└──────────────────────────────────────────────────────────┘
```

### 5.3 Key Interactions

- **Click-to-play** as primary input; drag-to-play as secondary
  affordance (drop targets highlight when card is dragged).
- **Right-click / long-press** on any card → enlarged inspector modal
  with full rules text.
- **Affordance feedback:**
  - Trade-row card you can afford → faint glow + cursor pointer.
  - Trade-row card you cannot afford → 50 % opacity.
  - Bases that can be attacked → red pulsing outline.
- **Accessibility:**
  - Keyboard nav: Tab cycles through hand, Enter plays, B opens buy,
    E ends turn.
  - All faction colors paired with shape/icon to remain distinguishable
    in color-blind modes.
  - Contrast: text ≥ 4.5 : 1 vs. its background per WCAG AA.

### 5.4 Empty / error states

- Disconnect banner with auto-reconnect spinner.
- Partner-disconnected pause: game freezes, banner shown until rejoin.
- Server error toast (3 s auto-dismiss).

---

## 6. Technical Architecture

### 6.1 Tech Stack

- **Frontend:** React 18 + TypeScript + Vite. State via Zustand
  (small, fits the single-room scope). Styling via plain CSS modules
  with custom properties for theming (no Tailwind dependency to keep
  bundle small).
- **Backend:** Node 20 + TypeScript + Express (static + REST health)
  + Socket.IO 4 (real-time). Authoritative game engine runs server-side.
- **Shared:** `shared/src/types.ts` consumed by both halves via local
  workspace import.
- **Persistence (v1):** in-memory only. Game state lost on server
  restart. Room codes recycled after 4 h of inactivity.
- **Persistence (v1.1, optional):** SQLite via `better-sqlite3` for
  game history and chat logs.

### 6.2 Repo Layout

```
star-realms/
├── SPEC.md
├── README.md
├── package.json            # workspaces: client, server, shared
├── shared/                 # types + card definitions
├── server/                 # Node + Socket.IO
│   └── src/
│       ├── index.ts        # HTTP + socket bootstrap
│       ├── net/            # socket handlers, rooms
│       └── game/           # engine, cards, boss AI
└── client/                 # React + Vite
    └── src/
        ├── components/
        ├── hooks/
        ├── state/          # Zustand store + selectors
        └── styles/
```

### 6.3 Socket Protocol (summary; full schema in `shared/src/types.ts`)

Client → Server: `lobby:create`, `lobby:join`, `lobby:start`,
`game:play`, `game:buy`, `game:attackBoss`, `game:attackThreat`,
`game:endTurn`, `game:chat`.

Server → Client: `state` (authoritative full state push after each
mutation), `toast`, `chat`.

Authoritative model: clients never compute game outcomes. They submit
intents; the server validates, mutates, and broadcasts new state. Full
state broadcast (not delta) for v1 — bandwidth is trivial for a 2-player
card game.

### 6.4 Hosting & Deployment

- Single Node process serves both the API/sockets and the static client
  bundle.
- Reverse-proxy behind nginx/Caddy on the owner's domain with HTTPS
  (Let's Encrypt).
- WebSocket upgrade allowed on the same origin (no CORS work needed).
- `systemd` unit (or pm2) to keep the process alive.
- One env var: `PORT` (default 8080).
- Optional: `ADMIN_TOKEN` env var to allow `/admin/health` and
  `/admin/rooms` endpoints behind a header.

### 6.5 Build & Dev

- `npm install` at repo root installs all workspaces.
- `npm run dev` runs `server` (ts-node-dev) + `client` (vite) in
  parallel with proxy from `:5173` → `:8080`.
- `npm run build` produces `client/dist` and `server/dist`.
- `npm start` runs the compiled server, which also serves
  `client/dist` statically.

---

## 7. Non-Functional Requirements

| Area            | Requirement                                              |
| --------------- | -------------------------------------------------------- |
| Performance     | < 100 ms intent → broadcast on LAN; < 16 ms client frame |
| Reliability     | Reconnect within 30 s preserves seat & token             |
| Privacy         | No analytics, no third-party trackers, no telemetry      |
| Auth            | Per-room invite code only; no user accounts              |
| Logging         | Per-room rolling log file (last 24 h), redacts chat IPs  |
| Browser support | Latest 2 versions of Chrome / Firefox / Safari / Edge    |
| Bundle size     | < 250 KB gzipped JS for first paint                      |
| Security        | Rate-limit socket events (30/s/client); strict CSP       |

---

## 8. Data Model (server-side, in memory)

```
Room {
  id: string (6-char base32)
  createdAt: number
  players: Player[]          // length 0..2
  state: GameState | null    // null until lobby:start
}

Player {
  id: string (uuid)          // server-assigned, returned to client
  token: string              // for reconnect; stored in localStorage
  socketId: string | null    // null when disconnected
  name: string
}
```

Card defs are loaded once at server boot from `shared/src/cards.ts`.

---

## 9. Milestones

| # | Milestone                              | Definition of Done                                                                 |
| - | -------------------------------------- | ---------------------------------------------------------------------------------- |
| M0 | Project scaffolding                   | Monorepo builds; shared types compile; CI placeholder runs                         |
| M1 | Lobby & room sync                     | Two browsers can connect, join a room, see each other, chat                        |
| M2 | Game state skeleton                   | Engine creates a game; both clients see decks, hands, trade row; turn passes        |
| M3 | Core card actions                     | Play / buy / attack-boss / end-turn all functional; basic effects on starter cards |
| M4 | Full card set + ally mechanics        | Trade deck + threats + ally triggers + scrap effects                               |
| M5 | UX polish                             | Animations, sounds (optional), accessibility pass, modal inspector                 |
| M6 | Reconnect + persistence + deploy doc  | Refresh restores seat; deploy guide for owner's domain                             |

---

## 10. Open Questions

1. **Difficulty curves** — do you want me to design boss tiers myself
   or do you have a specific escalation in mind?
2. **Card art** — placeholder geometric SVG, AI-generated, or just
   typographic cards? (Affects bundle size + time.)
3. **Sound** — in scope for v1 or defer?
4. **Authentication beyond room codes** — is a single shared password
   on the lobby acceptable, or pure invite-link-only?
5. **Persistence** — okay with in-memory only for v1, or do you need
   game-history persistence from day one?
6. **Domain & deploy environment** — what's the target (bare VPS,
   Docker, Fly.io, etc.)? Affects the deploy guide I write in M6.

---

## 11. Acceptance Criteria (v1 ship)

- Owner can `npm install && npm run build && npm start` and reach the
  game on their domain.
- Two browsers in different locations can complete a full game from
  lobby → victory or defeat without errors.
- All FRs in §4 are met.
- Lighthouse desktop scores: Performance ≥ 90, Accessibility ≥ 95.
- No console errors in either browser during a full game.
- No copyrighted Star Realms text or art shipped in the bundle.
