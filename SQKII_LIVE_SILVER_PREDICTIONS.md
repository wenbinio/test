# Sqkii Hunt The Mouse — Live Silver-Coin Predictions
### Singapore Retail Festival edition (`htm_srf`) · snapshot 2026-07-13

Built from **public game data only** — the same map circles every player sees (pulled via the
site's anonymous guest token, GET-only) — combined with the SRF merchant labels the app publishes
and the hiding heuristics from the historical-finds report. The *hint text* itself is gated behind
in-game purchase and was **not** accessed; these predictions come from circle geometry + published
merchant postal codes + reasoning, not from reading paid hints.

**18 coins live** (16 ongoing, 2 already "verifying" = effectively won). Each is S$500 cash; three are
SRF merchant coins that also carry a bonus prize. Circles shrink daily (next shrink ~18:30 SGT today).

---

## TIER 1 — Merchant coins (highest confidence: the outlet is named)

Sqkii hides each merchant coin **"in the vicinity of the retailer's outlet,"** and the API publishes the
outlet's postal code as `srf_hiding_area_label`. That collapses a 2.3 km circle to one shopfront. Go to
the outlet, then search the public micro-spots around it (see heuristics below).

| Coin | Brand | Hiding-area postal | Likely locale | Bonus prize | Map |
|---|---|---|---|---|---|
| #1 | **Kallang Wave Mall** | Singapore **397628** | Kallang Wave Mall / Singapore Sports Hub (1 Stadium Pl) | $300 PANGU Running Voucher | [1.30362,103.87109](https://www.google.com/maps/search/?api=1&query=1.30362,103.87109) |
| #1 | **Seoul Garden HOTPOT** | Singapore **486038** | Upper Changi Rd East / Singapore Expo–Tampines side | Sephora Gift Card (S$300) | [1.33911,103.95899](https://www.google.com/maps/search/?api=1&query=1.33911,103.95899) |
| #1 | **Seoul Garden** | Singapore **529510** | Simei / Tampines (Eastpoint-Simei belt) | Pokémon Prismatic Evolutions ETB | [1.35150,103.94461](https://www.google.com/maps/search/?api=1&query=1.35150,103.94461) |

> Verify each postal code against the brand's actual outlet address before travelling — the label is the
> hiding *area*, and the coin sits in a public spot near (not inside) the shop. Tampines/Expo & Simei are
> also this weekend's themed zones, so expect competition there.

---

## TIER 2 — Tightest non-merchant circles (best effort:reward ratio)

Smallest radius = least ground to cover. These are the ones to grind first.

| Coin | Radius | Approx. area (center) | Map |
|---|---|---|---|
| **#49** | **513 m** *(smallest live)* | Punggol / Sengkang NE | [1.40910,103.89985](https://www.google.com/maps/search/?api=1&query=1.40910,103.89985) |
| **#43** | **519 m** | Bukit Batok / Jurong East (west) | [1.34850,103.75229](https://www.google.com/maps/search/?api=1&query=1.34850,103.75229) |
| #47 | 706 m | Toa Payoh / Balestier (central) | [1.32381,103.81477](https://www.google.com/maps/search/?api=1&query=1.32381,103.81477) |
| #18 | 760 m | Yishun (far north) | [1.42586,103.84847](https://www.google.com/maps/search/?api=1&query=1.42586,103.84847) |
| #36 | 760 m | Ang Mo Kio / Bishan | [1.37362,103.87158](https://www.google.com/maps/search/?api=1&query=1.37362,103.87158) |
| #14 | 767 m | Jurong East / Bukit Batok | [1.31969,103.76555](https://www.google.com/maps/search/?api=1&query=1.31969,103.76555) |

## TIER 3 — Larger circles (need a shrink or a bought hint first)

| Coin | Radius | Approx. area | Map |
|---|---|---|---|
| #65 | 922 m | Bukit Panjang / Choa Chu Kang | [1.37963,103.75529](https://www.google.com/maps/search/?api=1&query=1.37963,103.75529) |
| #66 | 922 m | Choa Chu Kang | [1.37793,103.74174](https://www.google.com/maps/search/?api=1&query=1.37793,103.74174) |
| #69 | 927 m | Punggol | [1.39956,103.90634](https://www.google.com/maps/search/?api=1&query=1.39956,103.90634) |
| #70 | 927 m | Jurong West | [1.34892,103.71565](https://www.google.com/maps/search/?api=1&query=1.34892,103.71565) |
| #74 | 927 m | Jurong West | [1.34339,103.71333](https://www.google.com/maps/search/?api=1&query=1.34339,103.71333) |
| #72 | 1499 m | Sengkang / Punggol | [1.39110,103.90012](https://www.google.com/maps/search/?api=1&query=1.39110,103.90012) |
| #71 | 1997 m | Ang Mo Kio / Serangoon (widest) | [1.35691,103.86692](https://www.google.com/maps/search/?api=1&query=1.35691,103.86692) |

## Already being won (skip)
- **#68** (CCK, ~1.38314,103.74382) and **#73** (Jurong West/Boon Lay, ~1.33793,103.70585) are `verifying` — a hunter is mid-claim.

---

## Where inside the circle to actually look (from the historical-finds heuristics)

Every documented Sqkii coin sat **at ground level, waist-height or below, in plain public view**, lightly
camouflaged, never buried or inside anything you must dismantle. Within each circle, prioritise:

1. **Undersides / gaps of public benches** (2024 S$500k was wedged between a bench's planks and a ledge).
2. **Tree-base nooks**, sometimes with a small rock placed on top (2026 gold coin).
3. **Behind pillars, pipes, drainpipes, electrical/riser boxes** (Sqkii's own recap clips flag pillars/pipes).
4. **Along staircase walls, low ledges, planter rims, railing bases, fence lines.**
5. Cluster around **high-dwell public furniture**: void decks, bus stops, playground/fitness-corner edges,
   MRT/LRT exits, coffeeshop and mall frontages — but always the *public* side, no locked/restricted access.

**Rule-out filter** (Sqkii never requires): trespass, water, heights/roofs, digging, forcing anything open,
dark/unlit spots, walking onto roads. Anything needing those is the wrong spot.

## Timing
- Circles shrink **daily (~18:30 SGT today, `nextShrinkAt` 10:30 UTC)** — a shrink roughly halves the area, so a
  large-circle coin becomes tractable right after. Re-pull the circle list after each shrink.
- Historically the winning move is **round-the-clock team searching**; the coins sit in 24/7-accessible public
  space, and past golds were found at 1:43 am and 11:32 pm.
- Coins end `end_at` late Aug, so no same-day expiry pressure — but competition finds them far sooner.

## Two caveats
- The public `/silver` list returns only the **currently live** coins (18), not the full 200-coin catalogue;
  new coins drop through the run, so re-pull daily.
- The public Telegram teaser (#1216, 9 Jul) name-checked **313@somerset / Ngee Ann City** (the festival
  ground on Orchard Rd), but **no live circle currently sits in Orchard** — that coin was likely already
  found, or the mention was festival promo rather than an active hide. Don't chase Orchard on that alone.

*Area labels are derived from circle-center coordinates; confirm on a map before travelling. Merchant
postal codes are as published by Sqkii's app.*
