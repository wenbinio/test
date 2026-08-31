# Ins & Outs — a field guide to peeing and pooing

A public health-information site answering, with numbers: how much should you
pee and poo, when is it too much or too little, and what should you look out
for. Adults, general public, no login, nothing leaves the browser.

React 18 + TypeScript + Vite. The real toolchain — `npm run build` produces a
`dist/`, and it does so on the browser targets listed below.

---

## Design direction

**A printed field guide, not a clinic leaflet.**

Warm paper ground, ink-black text, a single oxblood accent, hairline rules, and
a hard split between a display serif at large sizes and a compact sans for
interface furniture. Every figure is set in a monospace with tabular lining
numerals, so numbers line up like a table of results rather than drifting
around inside prose. Pages are built as an editorial two-column split — a
sticky heading and standfirst on the left, the substance on the right — which
collapses to one column below 62rem.

The reasoning: this subject invites either coyness or jokes, and both get in
the way. A field-guide voice — plain, specific, numerate, unembarrassed — lets
the page say "pee" and "poo" without nudging, and lets it give you a threshold
instead of a euphemism. Humour is confined to headings on the reassurance
material and is kept structurally distant from anything serious.

**The one exception to the whole visual system is the emergency block.** It is
the only element on the site with a solid dark-red field and a heavy top rule,
it appears at the top of the home page and the top of the warning-signs page,
and it carries the four things that must never be scrolled past: visible blood
in urine, black tarry stool, acute urinary retention, and cauda equina
syndrome. Nothing else on the site looks like it, so it cannot be mistaken for
ordinary content.

### Colour and contrast

Every foreground/background pair was checked with the WCAG contrast formula
rather than eyeballed. Body text is **16.98:1** in light mode and **15.36:1** in
dark. The lowest ratio anywhere in normal use is **6.51:1** (dark-mode accent on
a raised card). The status colours clear 7:1 in both themes. The eighteen colour
swatches in the urine and stool charts each carry the label in whichever of two
inks scored higher against that swatch; the weakest is **4.59:1** (dark honey).

**Status is never conveyed by colour alone.** Each of the three levels has its
own glyph shape as well as its own colour and its own word — a circled tick for
Normal, a triangle for Watch, an octagon for Get seen — so the meaning survives
greyscale printing, colour blindness and forced-colours mode.

---

## Install, run, build

```
npm install
npm run dev      # dev server
npm run build    # tsc -b && vite build  ->  dist/
npm run preview  # serve the built output
npm run lint     # oxlint
```

`npx tsc --noEmit -p tsconfig.app.json` type-checks without building.

The built site uses a relative `base` and hash routing, so `dist/` works from a
static bucket or a sub-path with no server rewrite rules.

It does **not** work opened directly from the filesystem: the build emits an ES
module, and browsers refuse to load one over `file://` on CORS grounds. Serve it
over http(s) — `npm run preview`, or any static file server.

---

## Layout

```
src/
  main.tsx                 mount
  App.tsx                  shell: skip link, masthead, main, footer
  router.tsx               hash router, focus + document.title management
  data/                    the medical content, as typed data
    types.ts               Severity, Timeframe, BristolType, RedFlag, ...
    bristol.ts             bristolScale — all seven types
    colours.ts             urineColours (10), stoolColours (8), with swatch inks
    redFlags.ts            56 flags tagged by timeframe + body system
    reference.ts           figures, clinical terms, water intake, FAQs
  lib/
    storage.ts             feature-detected localStorage with memory fallback
    clipboard.ts           secure-context clipboard + select-the-text fallback
    dates.ts               component-wise Date construction only
    ids.ts                 counter-based ids (no crypto.randomUUID)
  components/
    Layout.tsx             Masthead, SiteFooter, Section, Split, Scroller
    Signal.tsx             the three-level status chip (shape + colour + word)
    BristolFigure.tsx      inline SVG line drawings, types 1-7
    BristolPicker.tsx      BristolReference (static) + BristolField (radiogroup)
    ColourChart.tsx        interactive colour chart with live detail panel
    ThemeToggle.tsx        auto / light / dark
    Bits.tsx               Figures, Callout, Card, FaqList
  features/log/
    model.ts               Entry union, volume buckets, Finding
    analyse.ts             the threshold engine + summary generator
    store.ts               useLog: reducer, persistence, sample data
    EntryForm.tsx          the add-an-entry form
  routes/
    Home.tsx  Pee.tsx  Poo.tsx  RedFlags.tsx  Log.tsx
  styles/
    tokens.css  global.css
```

The medical facts live in `src/data/` as typed arrays, deliberately separated
from presentation — the Bristol scale, the colour charts and the red-flag list
are each consumed by two or three different components (reference table,
interactive picker, log analysis) and there is exactly one copy of each fact.

---

## The interactive feature: the logbook

`/#/log`. Not a quiz and not a decorative widget — it is the thing React
actually earns its place on.

**What you put in.** Pees (time, one of three rough volume buckets, colour from
the chart, plus flags for woke-me-from-sleep, urgency, burning, visible blood),
poos (time, Bristol type chosen from the illustrated scale, colour, blood as
none/fresh/black-and-tarry, straining, incomplete emptying) and drinks (mL).

**What it works out.** Everything downstream is derived state recomputed on
every change, which is precisely what would be tedious and bug-prone in plain
DOM code. It groups entries into local calendar days, then measures them
against the published thresholds:

- **Polyuria** — estimated output over 3 L in 24 h
- **Oliguria** — under roughly 400–500 mL in 24 h
- **Urinary frequency** — more than 8 voids in 24 h
- **Nocturia** — two or more wakings a night, on most nights
- **Diarrhoea** — three or more Bristol 6–7 stools in 24 h, with the acute /
  persistent / chronic time brackets applied to the log's own span
- **Constipation** — the actual Rome IV criteria: it counts straining, hard
  stool, and incomplete evacuation as shares of total movements, checks whether
  each exceeds 25%, checks the fewer-than-three-a-week criterion against the
  calendar span, and reports how many of the criteria are met. It also states
  plainly that Rome IV additionally requires three months of symptoms, which a
  short log cannot establish.
- **The normal band** — 3/day to 3/week, and the median Bristol type

It also lifts anything on the warning list straight out of the entries: black
tarry stool goes to an emergency finding, visible blood in urine or fresh
rectal blood to a get-seen-within-days finding, pale clay stool and repeated
greasy floating stool to their own findings. Findings sort by urgency, render
with the same three-level signal used everywhere else, and every one of them
resolves to a threshold and a suggestion about who to speak to — never to a
condition.

**What comes out.** A plain-text handover summary — period, urinary averages,
stool distribution, straining shares, thresholds crossed, and your own notes —
built for a ten-minute appointment, or for handing over on paper when saying it
out loud is the hard part. Copy via the clipboard where that is available, with
a select-the-text fallback where it is not, plus a print stylesheet that drops
the chrome.

There is also a **Load four sample days** button, so the tool can be understood
before you have typed anything. The sample is deliberately unremarkable — an
ordinary week with a slightly slow bowel and one dark afternoon pee — enough to
demonstrate the Rome IV path without staging a medical emergency.

**Persistence.** `localStorage`, feature-detected and wrapped in `try`/`catch`
at both the probe and the write. If it is unavailable — iOS Private Browsing is
the common case — the log degrades to in-memory state and a visible notice
appears at the top of the page telling the reader it will not survive closing
the tab.

### Other interactive elements

- **The colour charts** (urine and stool) are real button groups with
  `aria-pressed`; the detail opens in a live region below the grid rather than a
  tooltip, so it works on touch and is announced to a screen reader.
- **The warning-signs page** filters 56 flags by urgency and by body system,
  with the count in a live region. The emergency block above it is never
  filtered out.

---

## Compatibility notes

**Build target:** `['es2020', 'chrome87', 'safari14', 'firefox88', 'edge88']`
for both JS and CSS. That covers Chrome, Edge, Safari (macOS and iOS), Firefox,
Samsung Internet and Opera two to three versions back.

Transpilation is not treated as a safety net for runtime APIs, so these are
avoided outright and verified absent from both source and built output:
`Object.groupBy`, `structuredClone`, `crypto.randomUUID`, `Array.prototype.at`,
`String.prototype.replaceAll`, `<dialog>`, the Popover API and
`requestIdleCallback`.

The TypeScript `lib` is pinned to `["ES2020", "DOM", "DOM.Iterable"]` as a
guard rail — the compiler rejects `.at()`, `.replaceAll()` and `Object.groupBy`
before they can reach a browser.

**CSS:** no native nesting, no `:has()`, no `color-mix()`, no `@layer`, no
container queries, no subgrid. Plain CSS with custom properties, flexbox and
grid. `:focus-visible` is applied in its own rule rather than a selector list,
because an unknown pseudo-class invalidates the whole rule in Safari 14 — this
way older Safari keeps a visible ring on every focus, which is the safe
direction to fail in.

**Storage and clipboard:** both feature-detected, both with real fallbacks
(in-memory state with a visible notice; select-the-text).

**Dates:** never parsed from a hand-built string. Everything is constructed with
`new Date(y, m, d, h, min)`, and the date/time inputs are validated with an
explicit regex plus a roll-over check, because `new Date(string)` is
implementation-defined outside strict ISO 8601 and Safari rejects formats
Chrome accepts. Day and month names are written out rather than relying on
`Intl` options that older Safari handles inconsistently.

**Responsive:** works from 320px. `overflow-x: hidden` on the body; wide tables
and the nav scroll inside their own `overflow-x: auto` containers, which are
keyboard-focusable so they are reachable without a pointer.

**Also supported:** `prefers-color-scheme` dark (plus an explicit auto/light/dark
toggle that wins in both directions), `prefers-reduced-motion` (all transitions
are inside a `no-preference` query), and print (chrome removed, slab rendered as
a black-bordered box, tables unconstrained, summary fully expanded).

**Accessibility:** semantic landmarks, exactly one `h1` per route with no skipped
heading levels, real labels on every control, visible focus, full keyboard
operability, `aria-live` on the colour-chart detail, the filter counts, the log
findings and the copy confirmation, and `<caption>` / `<thead>` / `scope` on
every table. Client-side navigation moves focus to the route's `h1` and updates
`document.title` — but not on first paint, which would yank focus from a reader
who arrived mid-page.

**Privacy:** no analytics, no fonts or scripts fetched at runtime, no third-party
UI kit, no network requests of any kind. System font stacks throughout.

---

## Verification performed

- `npm run build` succeeds; `dist/` contains `index.html` plus a 272 kB JS
  bundle (85 kB gzipped) and a 21 kB stylesheet (5 kB gzipped).
- `npx tsc --noEmit -p tsconfig.app.json` — clean.
- `npx oxlint src` — clean.
- Source and built output grepped for every banned runtime API and CSS
  feature — zero hits outside explanatory comments.
- All five routes server-rendered to catch runtime errors, then the markup
  audited programmatically for: one `h1` per route, no skipped heading levels,
  every internal link resolving to a real route, every form control having an
  accessible name, `<table>`/`<caption>`/`<thead>`/`scope` parity, landmarks,
  `aria-hidden` on every decorative SVG, and no button without a name. All
  checks pass.
- The built bundle was then loaded in headless Chromium over http and every
  route checked for layout, not just markup. This caught a real defect the
  markup audit could not see: grid items default to `min-width: auto`, so the
  `min-width: 34rem` on tables propagated out of `.scroller` and stopped the
  single-column `.split` shrinking, overflowing the Peeing and Pooing pages by
  246px at a 320px viewport. Fixed with `min-width: 0` on `.split` children.
- The threshold engine was exercised against ten scenarios — melaena, visible
  haematuria, pale stool, four loose stools in a day, a Rome IV constipation
  pattern, polyuria, frequency, nocturia, dysuria and an all-clear log — and
  each produced the expected finding at the expected severity.
- All contrast ratios computed with the WCAG formula, not estimated.

## Deliberately left out

**There is no hydration calculator.** It was on the table and it was the wrong
idea: the honest answer is *drink to thirst and aim for pale straw*, and a
calculator emitting a target volume would contradict the page that dismantles
the eight-glasses rule. The site gives the EFSA and IOM adequate-intake figures
as reference and explicitly frames them as population averages rather than
targets.

No drug doses anywhere, no diagnosis, and no symptom checker that names
conditions — findings resolve to thresholds and to "who to speak to, and how
fast".

## Source

The medical facts, thresholds and figures were taken from the researched pages
in `site/urination.html`, `site/bowels.html` and `site/red-flags.html`, lifted
into typed data modules and rewritten in this site's own voice and structure.
