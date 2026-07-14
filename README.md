# Sqkii "Hunt The Mouse" — coin-finding toolkit

Tools, research, and a live public-data puller to help decide **where to physically search**
for Sqkii Hunt The Mouse silver coins in Singapore. Everything here uses **public, read-only**
game data (the same map circles every player sees) plus verified research and reasoning.

> New here or an AI assistant picking this up? **Start with [`HANDOVER.md`](HANDOVER.md)** — it's
> the complete runbook (API access, workflow, ethics, current state).

## Files

| File | What it is |
|---|---|
| **[HANDOVER.md](HANDOVER.md)** | Full pickup runbook: public API + signing recipe, endpoints, data→guidance workflow, map-render recipe, scope/ethics, current state. Read this first. |
| **[htm_coins.py](htm_coins.py)** | On-demand live puller (stdlib only). Prints live coins ranked (merchant first, then tightest circle) with area labels + Google Maps links. `--json`, `--all`. |
| **[htm_coins.bat](htm_coins.bat)** | Same puller as a double-clickable Windows batch/Python polyglot. Needs Python 3 on PATH. |
| **[SQKII_COIN_PATTERNS.md](SQKII_COIN_PATTERNS.md)** | Verified research: every documented past find, clue-decoding patterns, location heuristics, community strategy, sources. |
| **[SQKII_LIVE_SILVER_PREDICTIONS.md](SQKII_LIVE_SILVER_PREDICTIONS.md)** | Tiered snapshot of live coins + the practical search playbook. |

## Quick start

```bash
python3 htm_coins.py          # ranked live board
python3 htm_coins.py --json   # machine-readable
python3 htm_coins.py --all    # include 'verifying' (being-won) coins
```
(Behind a proxy with a custom CA? set `SQKII_CA_BUNDLE=/path/to/ca.crt`. A normal machine needs nothing.)

## The one-paragraph method

Pull `/silver` → for **merchant coins**, decode the outlet postal (`srf_hiding_area_label`) via
OneMap to a building and search its public vicinity; for **plain coins**, rank by circle radius
and reverse-geocode the centre. Inside any circle, subtract everywhere the rules forbid (water,
schools, private/ticketed, restricted) and search the dry public micro-spots: bench undersides,
tree bases (under loose rocks), behind pillars/pipes/riser boxes, planter rims, stair walls —
waist-height and below, never buried, never behind locked access.

## Scope

Read-only public data only — no login, no POST/mutations, no buying hints/power-ups, no
brute-forcing. Advice always respects the game's safety rules (no trespass, water, heights,
digging, or restricted areas). See HANDOVER.md §9.
