# Handover — Sqkii "Hunt The Mouse" live coin-finding assistant

This document lets another assistant (e.g. GPT) pick up the work with zero prior context.
It explains what this is, how to access the live public game data, how to turn it into
actionable search guidance, the heuristics involved, the map-rendering recipe, and the
scope/ethics boundaries to stay inside.

**Date of handover:** 2026-07-14. **Game edition:** `htm_srf` (Singapore Retail Festival
edition; 200 silver coins @ S$500, launched ~3–4 July 2026, ~25-day run). Everything here
is time-sensitive — Sqkii changes mechanics per edition and coins move/expire hourly.

---

## 1. What the user wants

The user plays Hunt The Mouse (a real Singapore treasure hunt) and wants help deciding
**where to physically search** for currently-live silver coins. Deliverables they've valued:
- Ranked lists of live coins by tractability.
- "Where I CAN vs CANNOT search" breakdowns inside a coin's circle (apply the game rules).
- Annotated OpenStreetMap images with the circles + exclusion zones drawn on.
- "Float locations to begin" — a few concrete public start points near a coin.

They may paste screenshots of their in-app map (their personal/hint-shrunk circle, which is
NOT in the public API — see §7). Read the screenshot, georeference from street labels.

---

## 2. How the game works (mental model)

- Each coin sits inside a **circle** on a live map. The coin is somewhere on **public, dry,
  ground-level** land inside that circle. Smaller circle = easier.
- Circles **shrink** at scheduled times (`nextShrinkAt`), re-centring toward the true spot,
  until they hit a **public floor** (`is_smallest_public_circle: true`, `nextShrinkAt: null`).
  A floored circle won't get easier for free — only paid in-app hints shrink it more.
- Two coin kinds:
  - **Merchant/SRF coins** (`srf_is_merchant_coin: true`): carry a brand, a bonus prize, and
    crucially a **hiding-area postal code** (`srf_hiding_area_label`, e.g. "Singapore 237978").
    Sqkii hides these "in the vicinity of the retailer's outlet" → the postal code collapses a
    2 km circle to one shopfront. **These are the highest-confidence targets.**
  - **Plain `sqkii` coins:** just a circle, no label. Rank by radius.
- Reward is **S$500 cash** per silver coin (merchant coins add a branded prize on top).

---

## 3. API access — the core capability

Base URL: `https://huntthemouse.sqkii.com/api` (service key `HTM`). **Every request must be
signed** or you get `403`. No login needed — a `/guest` endpoint mints an anonymous JWT that
is the same token the public map uses. This is all **public, read-only** data (see §9).

### Signing scheme (from the client bundle `DyBwr3fJ.js`)
```
message = METHOD + "\n" + "application/json" + "\n" + ctime + "\n" + path + "\n"
ctime   = current epoch milliseconds (must be ~server time)
path    = request path WITHOUT query string, e.g. "/silver"
sig     = base64( HMAC_SHA256( message, "PcavpXM8uTK4eJKM" ) )
headers = ctime:<ms>  sig:<base64>  x-version:1.0.0  Content-Type:application/json
          (+ authorization: Bearer <token> for everything except /guest)
```
The signing secret `PcavpXM8uTK4eJKM` is hard-coded in the public web client (crypto-js).

### Working GET endpoints
| Endpoint | Auth | Returns |
|---|---|---|
| `GET /guest` | signed only | `{data:{token}}` — anonymous Bearer JWT |
| `GET /silver` | signed + Bearer | **live coin list + map circles** (the whole point) |
| `GET /silver/retrieve/{_id}` | signed + Bearer | one coin's full detail |
| `GET /silver/hints?coin_id={_id}` | signed + Bearer | hint slots — `content:null` until bought |
| `GET /silver/silver-hint-prices?coin_id={_id}` | signed + Bearer | hint prices |

- `coin_id` query param wants the Mongo `_id` (e.g. `6a53d54d…`), NOT the long `coin_id` string.
- `/silver` returns only the **currently-live** coins (not the full 200 catalogue). Re-pull often.
- Hint **text** is gated behind an in-game purchase (POST, costs currency) — **do not** buy it.

### /silver per-coin schema (fields that matter)
```jsonc
{ "_id","coin_id","coin_number","reward",
  "status": "ongoing" | "verifying",          // verifying = someone's mid-claim, skip
  "freeCircle": { "radius": <m>, "center": {"lat","lng"} },
  "is_smallest_public_circle": true|false,     // true = floored
  "nextShrinkAt": "ISO8601" | null,
  "srf_is_merchant_coin": true,                // merchant-only fields below:
  "srf_brand_name","srf_hiding_area_label","srf_prize_name","srf_coin_name" }
```

### The turnkey scripts (already in this repo)
- **`htm_coins.py`** — stdlib-only. Prints the live list ranked (merchant first, then tightest
  circle) with area labels + Google Maps links. `--json` for raw, `--all` to include verifying.
- **`htm_coins.bat`** — same thing as a double-clickable Windows batch/Python polyglot.
- Both take `SQKII_CA_BUNDLE=<ca.crt>` only if behind a proxy with a custom CA (this sandbox
  needs `/root/.ccr/ca-bundle.crt`; a normal machine needs nothing).

Minimal reproduction if you need to re-derive it:
```python
import base64,hashlib,hmac,json,ssl,time,urllib.request
B="https://huntthemouse.sqkii.com/api"; S=b"PcavpXM8uTK4eJKM"
def sign(m,p):
    ct=str(int(time.time()*1000)); msg="\n".join([m,"application/json",ct,p,""])
    return ct, base64.b64encode(hmac.new(S,msg.encode(),hashlib.sha256).digest()).decode()
def get(p,tok=None):
    ct,s=sign("GET",p); h={"Content-Type":"application/json","ctime":ct,"sig":s,"x-version":"1.0.0"}
    if tok: h["authorization"]="Bearer "+tok
    return json.load(urllib.request.urlopen(urllib.request.Request(B+p,headers=h),timeout=30))
tok=get("/guest")["data"]["token"]; coins=get("/silver",tok)["data"]
```

---

## 4. Turning data into guidance (the workflow)

1. **Pull `/silver`.** Filter to the area of interest (bounding box on `center.lat/lng`).
2. **Merchant coin?** Take `srf_hiding_area_label` (postal code) and resolve it to a building:
   OneMap search (no key needed):
   `https://www.onemap.gov.sg/api/common/elastic/search?searchVal=<POSTAL>&returnGeom=Y&getAddrDetails=Y&pageNum=1`
   → `results[0].BUILDING / ADDRESS / LATITUDE / LONGITUDE`. That building is the anchor;
   the coin is in its public vicinity. Give 4–6 concrete start points around it.
3. **Plain coin?** Reverse-geocode the circle centre for a human label:
   `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=<>&lon=<>&zoom=18`
   (User-Agent header required). Rank by radius; floored + small = best.
4. **Apply the rules to narrow (§5).** Identify schools / condos / water / restricted zones
   inside the circle (OneMap or Nominatim search gives their lat/lng + `boundingbox`) and
   subtract them. What remains is the real search area.
5. **Point at micro-spots (§5).** Always the same signature.
6. **Render a map if useful (§6).**
7. **Timing:** tell them what shrinks when (convert `nextShrinkAt` UTC → SGT = UTC+8).
   Floored coins won't get easier → legwork now. `verifying` coins → skip (being won).

---

## 5. The heuristics (from a verified research pass — see SQKII_COIN_PATTERNS.md)

**Placement rules (Sqkii's own — the strongest filter). Coins are NEVER where finding them needs:**
trespass / private-restricted access, water (no swimming/canals), heights/roofs, digging,
forcing/dismantling anything, dark unlit spots, or walking onto roads. "Publicly accessible"
means *unlocked*, not "public land only" (a past coin was on a private-estate street, walkable).

**Where coins actually sit (every documented find):** ground level, waist-height or below, in
plain public view, lightly camouflaged (e.g. a small rock on top), never buried. Prioritise:
1. Undersides / plank gaps of public benches.
2. Tree-base nooks (check under loose rocks).
3. Behind pillars, pipes, drainpipes, riser/electrical boxes.
4. Planter rims, railing bases, low ledges, staircase walls, fence lines.
5. High-dwell public furniture: void decks, bus stops, MRT/LRT exits, playground/fitness-corner
   edges, mall/coffeeshop frontages — always the public side.

**Location archetypes:** dense HDB heartland precincts, and quiet low-footfall fringe/industrial
lanes near (not in) major corridors. Two of three past gold finds were at night (24/7 access).

**Full historical detail** (2019 Hougang, 2022 virtual, 2024 Bedok, 2026 Tagore Rd finds; clue
patterns; timing) is in `SQKII_COIN_PATTERNS.md` in this repo.

---

## 6. Map rendering recipe (produces the annotated PNGs the user likes)

Stack: fetch OpenStreetMap raster tiles, composite with **Pillow**, draw circles/boxes/markers,
send the PNG. Web-Mercator tile math:
```python
def x_(lon,z): return (lon+180)/360*2**z
def y_(lat,z):
    import math; r=math.radians(lat); return (1-math.log(math.tan(r)+1/math.cos(r))/math.pi)/2*2**z
# pixel = tile*256 ; metres-per-pixel = 156543.03392*cos(lat_rad)/2**z
# tile URL: https://tile.openstreetmap.org/{z}/{x}/{y}.png  (set a User-Agent; z16–17 good)
```
Steps: compute bbox from circle centre±radius (+pad) → floor to tile indices → fetch grid →
`Image.paste` into a canvas → draw on an RGBA overlay (circle = `ellipse` with `radius/mpp`;
exclusion zones = translucent rectangles from feature `boundingbox`; search spots = green dots)
→ `alpha_composite` → add a white header/legend + "Map data © OpenStreetMap contributors" →
save → deliver with SendUserFile (`display:"render"`). Working examples are in the scratchpad
(`punggol_now.png`, `punggol49_zones.png`) — reuse that code.

Colour convention used so far: red/orange/blue outlined circles per coin (smaller=hotter);
red boxes = restricted (schools), orange = private condo interior, blue = water; green dots =
where you CAN search.

---

## 7. Reading the user's in-app screenshots

Their personal circle (especially a **hint-shrunk** one) is tied to their account and is **not**
in the public API — you cannot fetch it. Georeference from the screenshot's street labels
against the known coin centre from `/silver`. State clearly that the drawn circle is an
approximation (±~50 m); the *exclusions* you overlay are precise. When they buy a hint and it
re-centres (jumps toward the coin), ask for a fresh screenshot and redraw.

---

## 8. Current state (2026-07-14 ~12:00 UTC / 20:00 SGT) — will drift, re-pull

Live merchant coins (best targets; anchor = outlet postal):
- **NestBloom #1** — postal 237978 → *SCAPE, 2 Orchard Link (beside Somerset MRT / 313@Somerset).
- **SuiTok #1** — postal 237978 → same *SCAPE building.
- **Seoul Garden HOTPOT #1** — postal 486038 (Upper Changi / Expo–Tampines).
- **Seoul Garden #1** — postal 529510 (Simei / Tampines).
- **Kallang Wave #1** — postal 397628 → Kallang Wave Mall, 1 Stadium Place (Sports Hub).

Live Punggol-area plain coins: **#49** (513 m, floored, Punggol Town Centre/Waterway Terraces —
user has been working this, has a hint-shrunk red circle ~400 m), **#72** (760 m, moved to
Sengkang/Compassvale), **#76** (799 m, NEW, NE Punggol Northshore/Punggol Coast). `#69` expired.

Note the recurring trap: several circle centres sit on/next to water (Punggol Waterway, Kallang
Basin) — that water is dead space; search the dry perimeter only.

---

## 9. Scope & ethics — STAY INSIDE THIS

- **Read-only, public data only.** GET the guest-token endpoints that render the public map. Do
  NOT log in, POST, mutate, buy hints/power-ups, brute-force, or scrape anything account-gated.
  The gated hint *text* is off-limits.
- This is fair play: you're consolidating the same circles + social hints every player sees, plus
  public reasoning. You are NOT exploiting a vuln or revealing hidden exact coordinates the game
  withholds — the API deliberately serves circle geometry to anonymous visitors.
- Respect the game's own safety rules in advice: never suggest trespassing, entering water,
  climbing, digging, or accessing restricted/private/ticketed areas.
- Don't republish the signing secret as an "exploit"; it's documented here only to reproduce the
  public map the user is entitled to see.

---

## 10. Files in this repo
- `HANDOVER.md` — this file.
- `SQKII_COIN_PATTERNS.md` — verified research: past finds, clue patterns, location heuristics.
- `SQKII_LIVE_SILVER_PREDICTIONS.md` — a tiered snapshot of live coins + the playbook.
- `htm_coins.py` / `htm_coins.bat` — the on-demand live puller (ranked list + map links).

**First thing to do on pickup:** run `python3 htm_coins.py` (or the `.bat`) to get the current
board, then ask the user which coin/area they're working and follow §4.
