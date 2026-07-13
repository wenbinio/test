# SQKII Hunt Board — daily candidate engine

An interactive map + daily shortlist that narrows **SQKII "Hunt The Mouse"** using **public information only**:
the official placement rules, the clues Sqkii releases on its socials, and where past coins were reported found.

It reads **nothing** from any SQKII app, API, or account. All value is in inference over published info — the same
reasoning every player does, made systematic.

## What's here

- `index.html` — the interactive Hunt Board (self-contained; open in any browser).
  - Live-edition banner, official-vs-lore rules split, historical pattern weights, a place-name clue decoder,
    region filters, and a live-recomputing likelihood heatmap over Singapore.
- `daily-picks.md` — the day-to-day log: **top 5 locations to search**, dated, with the reasoning and the hint each rests on.

## Method (how the top 5 is produced)

1. **Rules as hard filters.** Official exclusions (never underwater/buried, no places of worship, no trespass, no
   dangerous/restricted areas, no damage, no climbing → ground-level, publicly reachable) remove impossible ground.
2. **Historical pattern as weights.** Confirmed finds cluster on ground-level benches & tree bases, heartland NE/E and
   the central-north green fringe. These bias the heatmap.
3. **The day's hint as a region/decoder lock.** Each released hint (e.g. the 2026 `_ _ _ M _ _ _` → *Thomson*) narrows
   the surviving area to a side of the island or a named locality.
4. **Rank surviving cells** by nearest locality → the day's top 5, each with a one-line "why" and the hint it leans on.

## Honest limits

- The current live edition (Retail Festival, 4–26 Jul 2026) hides **200 coins** with **per-coin, largely in-app hints** —
  there is no public master clue list, so day-to-day picks lean on the single daily social hint + community-reported finds.
- The historical pattern rests on a small number of publicly-confirmed finds — treat it as a tendency, not a law.
- Coordinates are approximate, derived from reported landmarks. For reasoning, not navigation.

## Sources

Official: https://huntthemouse.sqkii.com/ · Rules: Little Day Out · Finds: MustShareNews, Mothership ·
Community technique: HardwareZone, Reddit r/singapore. (Full links in `index.html` footer.)
