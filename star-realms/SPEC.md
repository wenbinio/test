# Star Realms — Co-op Web Rebuild
## Product Specification & Requirements

**Status:** v0.5 — M0–M6 implemented; v1 feature-complete
**Owner:** wenbinio
**Branch:** `claude/rebuild-star-realms-ui-3X5lc`
**Target deploy:** Cloudflare Workers + Durable Objects (backend) +
Cloudflare Pages (static client), all on owner's private domain via
Cloudflare DNS

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

- **Frontend:** React 18 + TypeScript + Vite. State via Zustand. Plain
  CSS modules with custom properties for theming (no Tailwind, small
  bundle). Native `WebSocket` to talk to the Worker — no `socket.io`.
- **Backend:** **Cloudflare Workers + Durable Objects**.
  - One **`GameRoom` Durable Object** per active room. The DO holds
    the authoritative `GameState` in memory, persists snapshots to its
    own storage on every mutation, and survives evictions.
  - Up to 2 WebSocket clients connect to a single DO. Hibernation API
    is used so idle rooms cost nothing.
  - Intents (`play`, `buy`, `attack`, `end-turn`, `chat`) arrive as
    JSON frames. The DO processes them serially (single-threaded by
    design), mutates state, and broadcasts new state to both sockets.
  - Boss AI runs inline inside `end-turn`.
- **Auth:** invite-link only. Room creation returns a `roomId` (6-char
  base32) + per-player `playerToken` (HMAC-signed JSON, secret stored
  as a Worker secret). The token is stored in `localStorage` keyed by
  room for reconnect. No accounts, no email, no third-party IdP.
- **Shared:** `shared/src/types.ts` + `shared/src/cards.ts` consumed by
  both the client (Vite bundle) and the worker (esbuild bundle) via
  workspace imports.
- **Persistence:** Durable Object Storage (KV per DO). One `state` key
  holds the current `GameState`; one `meta` key holds room metadata
  and player tokens. A scheduled Worker cron sweeps DOs idle for >24 h
  (calls a `purge` endpoint on each, which deletes its storage).
- **Hosting/Deploy:** `wrangler deploy` ships the Worker + DO. The
  client is built with `npm --workspace=client run build` and deployed
  to Cloudflare Pages. The owner's private domain is mapped to both
  via a Cloudflare zone (Pages on `play.example.com`, Worker on
  `play-api.example.com`).

### 6.2 Repo Layout

```
star-realms/
├── SPEC.md
├── README.md
├── package.json            # workspaces: client, worker, shared
├── shared/                 # types + card definitions + engine helpers
├── worker/                 # Cloudflare Worker + GameRoom Durable Object
│   ├── wrangler.toml
│   └── src/
│       ├── index.ts        # HTTP routes, WS upgrade, DO routing
│       ├── room.ts         # GameRoom Durable Object class
│       ├── engine.ts       # Game rules (play/buy/attack/end-turn)
│       ├── boss.ts         # Boss AI + threat spawning
│       └── token.ts        # HMAC-signed player tokens
└── client/                 # React + Vite
    └── src/
        ├── components/
        ├── hooks/
        ├── state/          # Zustand store + selectors
        └── styles/
```

### 6.3 Wire Protocol (full schema in `shared/src/types.ts`)

**HTTP (client → Worker):**

| Method | Path                       | Purpose                                |
| ------ | -------------------------- | -------------------------------------- |
| POST   | `/rooms`                   | Create room. Body `{ name }`. Returns `{ roomId, playerToken }`. |
| POST   | `/rooms/:id/join`          | Join existing room. Body `{ name }`. Returns `{ playerToken }`. |
| GET    | `/rooms/:id/ws`            | Upgrade to WebSocket. Auth via `?t=<playerToken>`.              |
| GET    | `/health`                  | Liveness for monitoring.                                        |

**WebSocket (bidirectional JSON frames):**

Client → Server:
`{ kind: "play", instanceId }`,
`{ kind: "buy", instanceId }`,
`{ kind: "attack", target: { kind: "boss" } | { kind: "threat", instanceId } }`,
`{ kind: "endTurn" }`,
`{ kind: "startGame" }`,
`{ kind: "chat", text }`,
`{ kind: "ping" }`.

Server → Client:
`{ kind: "state", state: GameState }` — full state, broadcast after
every mutation,
`{ kind: "chat", from, text, ts }`,
`{ kind: "toast", level, text }`,
`{ kind: "pong" }`.

Authoritative model: clients never compute game outcomes. They send
intents; the DO validates, mutates, persists, and broadcasts new state
to both connected sockets. Full state (not delta) for v1 — payload is
< 8 KB for a typical mid-game position.

### 6.4 Hosting & Deployment

- **Worker + DO:** `cd worker && wrangler deploy`. Routed to
  `play-api.<your-domain>` via Cloudflare. Secrets set via
  `wrangler secret put TOKEN_SECRET` (HMAC key for player tokens).
- **Client:** `npm --workspace=client run build`, then deploy
  `client/dist/` to Cloudflare Pages routed at `play.<your-domain>`
  (or connect the GitHub repo to Pages for auto-deploy).
- DNS managed in Cloudflare. HTTPS handled by Cloudflare automatically.
- Required Worker bindings: `ROOMS` (Durable Object namespace,
  class = `GameRoom`).
- Required Worker secrets: `TOKEN_SECRET` (32+ random bytes),
  `ALLOWED_ORIGIN` (e.g. `https://play.example.com`) for CORS allow-list.
- Required client env (Vite): `VITE_API_BASE` (e.g.
  `https://play-api.example.com`).

### 6.5 Build & Dev

- `npm install` at repo root installs all workspaces.
- `npm run dev` runs `worker` (`wrangler dev` on `:8787`) and `client`
  (Vite on `:5173`) in parallel. Vite proxies `/api/*` → `:8787`.
- `npm run build` builds the client (`client/dist`) and type-checks
  the worker.
- `npm run deploy` runs `wrangler deploy` for the worker; Pages picks
  up the client bundle on push (or via `wrangler pages deploy`).

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

## 8. Data Model (inside `GameRoom` Durable Object)

```
DO storage keys
├── meta            // RoomMeta
└── state           // GameState | null (null until startGame)

RoomMeta {
  id: string                 // 6-char base32, matches DO name
  createdAt: number
  lastActivity: number
  players: PlayerMeta[]      // length 0..2
}

PlayerMeta {
  id: string                 // uuid v4
  name: string
  tokenHash: string          // HMAC of the signed token (for verify)
  connected: boolean         // updated when WS opens/closes
}
```

In-memory only inside the DO:
- `Map<playerId, WebSocket>` of live sockets.
- The latest `GameState` (loaded from storage on cold start).

Card defs are bundled into the worker from `shared/src/cards.ts`. The
client receives the same defs as part of the first `state` frame so it
never needs a separate fetch.

## 8.1 Open Questions

All §10 open questions are resolved as of v0.3:

1. Boss curve — T1 50/1/3, T2 75/2/2, T3 100/3/1. Difficulty modes:
   Standard=T1, Hard=T1→T2, Endless=T1→T2→T3.
2. Card art — typographic + geometric SVG faction glyphs.
3. Sound — deferred to v1.1.
4. Auth — invite-link only, HMAC-signed `playerToken` per player.
5. Persistence — Durable Object Storage. Idle-room sweep at 24 h.
6. Deploy — Cloudflare Workers + DO (backend) + Cloudflare Pages
   (frontend), private domain via Cloudflare DNS.

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

(Resolved — see §8.1.)

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
