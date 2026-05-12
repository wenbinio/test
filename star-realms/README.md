# Star Realms — Co-op Web Rebuild

Private 2-player online co-op rebuild of Star Realms' UI/UX. Sci-fi
dark theme, faithful but original (no copyrighted card text or art).
Two captains face the procedurally escalating **Hostile Worlds** boss.

> Legal: fan project, non-commercial, invite-only. No printed-game card
> names, art, or rules text are redistributed. Card text is paraphrased
> and art is generated from CSS/SVG.

See [`SPEC.md`](./SPEC.md) for full product spec and decisions.

---

## Stack

- **Client**: React 18 + Vite + TypeScript + Zustand + native `WebSocket`
- **Backend**: Cloudflare Worker + Durable Objects (one DO per game room)
- **Auth**: HMAC-signed player tokens — pure invite-link, no accounts
- **Hosting**: Cloudflare Pages (frontend) + Cloudflare Workers (backend),
  both behind your private domain via Cloudflare DNS

## Repo layout

```
star-realms/
├── SPEC.md
├── README.md (this file)
├── package.json          # workspaces: shared, client, worker
├── shared/               # types + card defs (used by both client + worker)
├── client/               # Vite + React app
└── worker/               # CF Worker + GameRoom Durable Object
```

---

## Local development

### Prereqs

- Node 20+
- A Cloudflare account (free tier is fine for dev). Run `wrangler login`
  once; `wrangler dev` works fully offline for local iteration.

### One-time setup

```bash
cd star-realms
npm install
```

### Run both halves

```bash
npm run dev
```

This starts:
- the Worker on `:8787` via `wrangler dev` (with a local Durable Object)
- Vite on `:5173`, proxying `/api/*` → `:8787`

Open <http://localhost:5173>. Create a room in one tab/window, copy the
6-character code, and join from another tab/window or another browser.

### Local secrets

`wrangler dev` reads dev secrets from `worker/.dev.vars`. Create it:

```
TOKEN_SECRET=dev-secret-change-me-32-bytes-min-plzthx
ALLOWED_ORIGIN=http://localhost:5173
```

`.dev.vars` is gitignored.

---

## Production deploy

### 1. Deploy the Worker + Durable Object

```bash
cd worker
npx wrangler login                  # one time

# Set production secrets:
npx wrangler secret put TOKEN_SECRET     # 32+ random bytes
npx wrangler secret put ALLOWED_ORIGIN   # https://play.your-domain.com

npx wrangler deploy
```

The Worker registers a `GameRoom` Durable Object on first deploy.

### 2. Map a route on your domain

In the Cloudflare dashboard:
- DNS → add a `play-api` (or whatever you like) record. If you proxy
  through Cloudflare (orange cloud), the worker route handles HTTPS.
- Workers Routes → add `play-api.your-domain.com/*` → `star-realms-worker`.

### 3. Deploy the client to Cloudflare Pages

```bash
cd client
VITE_API_BASE=https://play-api.your-domain.com npm run build
npx wrangler pages deploy dist --project-name=star-realms
```

In the Pages project → Custom Domains → add `play.your-domain.com`.

### 4. Smoke test

- Open `https://play.your-domain.com` in two browsers.
- Create a room in browser A, copy the code, join in browser B.
- Press **Start Game**. Both clients should show the board.

---

## Status

This is the **M0–M3** scaffold (see SPEC §9):

- ✅ M0 — monorepo + types + cards + theme
- ✅ M1 — lobby, room codes, WebSocket sync, chat, reconnect
- ✅ M2 — engine + game state skeleton + turn flow
- ✅ M3 — play / buy / attack-boss / attack-threat / end-turn working;
  Trade Federation, Blob, Star Empire, Machine Cult + basic effects
- ⏳ M4 — choice-driven effects (scrap, blob-world choice, free-ship-top, etc.)
- ⏳ M5 — UX polish (animations, sound, modal inspector, a11y pass)
- ⏳ M6 — idle-room purge cron + history persistence

---

## License

Source code: MIT. Game IP belongs to Wise Wizard Games.
