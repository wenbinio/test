@python -x "%~f0" %* & pause & exit /b
# ^ Windows batch launcher above; Python (run with -x, which skips line 1) starts here.
"""
htm_coins.bat — pull the LIVE Sqkii "Hunt The Mouse" silver-coin map circles
and print them ranked by tractability. Double-click it, or run:

    htm_coins.bat            :: ranked table
    htm_coins.bat --json     :: raw machine-readable JSON
    htm_coins.bat --all      :: include 'verifying' (being-won) coins

Self-contained batch/Python polyglot: no separate .py file needed. Requires
Python 3 installed and on PATH (https://python.org -> tick "Add to PATH").
Uses only public game data (the same circles the official map shows every
visitor, via an anonymous guest token). Read-only: no login, no purchases.
Behind a proxy with a custom CA? set SQKII_CA_BUNDLE=C:\path\to\ca.crt
"""
import base64, hashlib, hmac, json, os, ssl, sys, time, urllib.request

BASE = "https://huntthemouse.sqkii.com/api"
SECRET = b"PcavpXM8uTK4eJKM"   # signing key hard-coded in the public web client
VERSION = "1.0.0"

# Approx. town centroids for labelling a circle's location (lat, lng).
TOWNS = {
    "Jurong West": (1.3404, 103.7090), "Jurong East": (1.3329, 103.7436),
    "Boon Lay": (1.3387, 103.7059), "Bukit Batok": (1.3490, 103.7500),
    "Choa Chu Kang": (1.3840, 103.7470), "Bukit Panjang": (1.3774, 103.7719),
    "Clementi": (1.3151, 103.7649), "Yishun": (1.4293, 103.8350),
    "Sembawang": (1.4491, 103.8200), "Woodlands": (1.4360, 103.7860),
    "Ang Mo Kio": (1.3691, 103.8454), "Bishan": (1.3509, 103.8485),
    "Serangoon": (1.3554, 103.8730), "Hougang": (1.3712, 103.8926),
    "Sengkang": (1.3915, 103.8955), "Punggol": (1.4041, 103.9025),
    "Toa Payoh": (1.3343, 103.8563), "Balestier": (1.3260, 103.8480),
    "Novena": (1.3203, 103.8438), "Kallang": (1.3110, 103.8710),
    "Geylang": (1.3140, 103.8870), "Bedok": (1.3240, 103.9300),
    "Tampines": (1.3496, 103.9568), "Simei": (1.3435, 103.9530),
    "Pasir Ris": (1.3721, 103.9490), "Changi": (1.3450, 103.9832),
    "Queenstown": (1.2946, 103.8060), "Bukit Merah": (1.2819, 103.8239),
    "Orchard": (1.3040, 103.8320), "City/Marina": (1.2830, 103.8550),
    "Marine Parade": (1.3020, 103.9070), "MacPherson": (1.3270, 103.8900),
    "Newton": (1.3138, 103.8380), "Whampoa": (1.3230, 103.8560),
    "Bukit Timah": (1.3294, 103.8020), "Holland/Farrer": (1.3130, 103.7960),
    "Botanic Gdns": (1.3138, 103.8159), "Farrer Park": (1.3120, 103.8540),
}

def nearest_town(lat, lng):
    def d2(t):
        (a, b) = TOWNS[t]
        return (a - lat) ** 2 + (b - lng) ** 2
    return min(TOWNS, key=d2)

def _ctx():
    ca = os.environ.get("SQKII_CA_BUNDLE")
    return ssl.create_default_context(cafile=ca) if ca else ssl.create_default_context()

def _sign(method, path):
    ct = str(int(time.time() * 1000))
    msg = "\n".join([method, "application/json", ct, path, ""])
    sig = base64.b64encode(hmac.new(SECRET, msg.encode(), hashlib.sha256).digest()).decode()
    return ct, sig

def _get(path, token=None):
    ct, sig = _sign("GET", path)
    headers = {"Content-Type": "application/json", "Accept": "*/*",
               "ctime": ct, "sig": sig, "x-version": VERSION}
    if token:
        headers["authorization"] = "Bearer " + token
    req = urllib.request.Request(BASE + path, headers=headers)
    with urllib.request.urlopen(req, context=_ctx(), timeout=30) as r:
        return json.load(r)

def fetch_coins():
    token = _get("/guest")["data"]["token"]
    data = _get("/silver", token)["data"]
    coins = data if isinstance(data, list) else data.get("coins") or data.get("silver") or []
    out = []
    for c in coins:
        circ = c.get("freeCircle") or c.get("verifyingCircle") or {}
        ctr = circ.get("center") or {}
        lat, lng = ctr.get("lat"), ctr.get("lng")
        out.append({
            "coin_number": c.get("coin_number"),
            "status": c.get("status"),
            "reward": c.get("reward"),
            "radius_m": circ.get("radius"),
            "lat": lat, "lng": lng,
            "area": nearest_town(lat, lng) if lat and lng else None,
            "merchant": c.get("srf_brand_name"),
            "merchant_postal": c.get("srf_hiding_area_label"),
            "bonus_prize": c.get("srf_prize_name"),
            "next_shrink": c.get("nextShrinkAt"),
            "maps": f"https://www.google.com/maps/search/?api=1&query={lat:.5f},{lng:.5f}" if lat else None,
        })
    return out

def rank_key(c):
    # merchant coins first (exact outlet known), then smallest radius.
    return (0 if c["merchant"] else 1, c["radius_m"] if c["radius_m"] is not None else 9e9)

def main():
    args = set(sys.argv[1:])
    try:
        coins = fetch_coins()
    except Exception as e:
        print(f"Failed to fetch: {e}\n(If behind a proxy with a custom CA, set SQKII_CA_BUNDLE.)",
              file=sys.stderr)
        sys.exit(1)

    if "--all" not in args:
        coins = [c for c in coins if c["status"] != "verifying"]
    coins.sort(key=rank_key)

    if "--json" in args:
        print(json.dumps(coins, indent=2))
        return

    ts = time.strftime("%Y-%m-%d %H:%M:%S")
    print(f"\nSqkii Hunt The Mouse - live silver coins  ({len(coins)} shown, {ts})")
    print("Ranked: merchant coins first (outlet known), then tightest circle.\n")
    for c in coins:
        tag = "MERCHANT" if c["merchant"] else "        "
        r = f"{c['radius_m']:>4}m" if c["radius_m"] is not None else "  ?  "
        st = "" if c["status"] == "ongoing" else f" [{c['status']}]"
        print(f"  {tag}  #{str(c['coin_number']):>3}  {r}  {c['area'] or '?':<16}{st}")
        if c["merchant"]:
            print(f"            {c['merchant']} - postal {c['merchant_postal']} - bonus: {c['bonus_prize']}")
        print(f"            {c['maps']}")
    print("\nInside each circle, search ground-level public spots: bench-plank gaps, tree bases")
    print("(check under loose rocks), behind pillars/pipes/riser boxes, planter rims, stair walls.")
    print("Circles shrink daily (~18:30 SGT) - re-run after a shrink. Merchant coin = go to the outlet.\n")

if __name__ == "__main__":
    main()
