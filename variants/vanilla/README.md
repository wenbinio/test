# OUTPUT — vanilla-JS variant

A public health-information site answering: how much should you pee and poo, when
is it too much or too little, and what should you look out for.

No framework, no bundler, no npm, no build step, no network requests. Open
`index.html` directly from disk (`file://`) and everything works, including the
interactive tool.

## Design direction

**A printed clinical field guide.** Warm paper ground, ink serif body text, a
monospaced voice reserved for numbers and labels, hairline rules, numbered
sections with the ordinal set in the margin, and a sticky section index down the
left of each long page. The reasoning: this is reference material people scan
under stress at two in the morning, so it should read like something you can
trust and navigate — a manual, not a landing page — while looking nothing like a
hospital leaflet.

Three things carry the tone:

- **Numbers are typographically loud.** Every page opens with a stat strip set in
  monospace at display size, because the numbers are the reason the page exists.
- **Emergencies are set apart, and never near a joke.** The `.alarm` block is a
  solid oxblood panel that breaks the reading rhythm completely. The dry humour
  in the copy lives only on the front page and the hydration section, nowhere
  near a symptom.
- **Colour never carries meaning on its own.** Every status is a text tag —
  `NORMAL` / `WATCH` / `GET SEEN` / `EMERGENCY` — and every colour swatch in the
  urine and stool charts sits beside the colour's name in words.

Palette contrast ratios were computed, not eyeballed. Body ink is 15.20:1 in both
light and dark; the lowest text pair anywhere is 4.78:1 (muted text on the sunken
background); every interactive border is at least 3.07:1. Illustration strokes and
hairline rules are decorative only and carry no information.

## Files

```
index.html          Front page: emergency block, the numbers, the one-minute version
pee.html            Urination: frequency, volume, clinical terms, colour chart,
                    smell, the eight-glasses myth, water intoxication, low output,
                    habits, Q&A
poo.html            Bowels: the numbers, all seven Bristol types (inline SVG),
                    Rome IV constipation and the real diarrhoea definition, stool
                    colour, going too often / too little, what helps, Q&A
warning-signs.html  Three lists — go now / book within days / almost certainly
                    nothing — plus cauda equina, how to describe symptoms, the
                    usual tests, and the groups whose thresholds shift
note.html           The interactive tool
assets/site.css     All styling. One file, no imports.
assets/site.js      Safe storage wrapper, clipboard wrapper, theme toggle,
                    current-page marking, table scroll hints.
assets/note.js      The note builder.
```

Header, nav and footer are repeated in each file rather than injected, so the
whole site renders with JavaScript disabled.

## The interactive feature: the note builder

`note.html` is a six-step walkthrough that ends in a printable summary for a
clinical appointment.

1. **Emergency screen first.** Twelve tick-boxes covering acute retention,
   melaena, haematemesis, heavy rectal bleeding, cauda equina, obstruction,
   suspected urosepsis and testicular torsion. If anything is ticked, pressing
   Continue **skips the remaining steps entirely** and goes straight to a "go
   now" verdict, which quotes back exactly what was ticked and — for the saddle
   anaesthesia and leg-weakness answers — surfaces the sentence to say on
   arrival.
2. **Scope and duration**, with three weeks called out as the investigation
   threshold.
3. **Blood**, kept as its own step so it cannot be skimmed past.
4. **The other urgency-raising patterns** — weight loss, night waking, age over
   50, family history, anaemia, persistent bloating, pregnancy,
   immunosuppression.
5. **Detail**: an interactive Bristol selector (seven inline-SVG tiles, real
   radio inputs underneath), an interactive urine colour selector, frequency now
   versus normal, night-time trips, weight change, medicines.
6. **A daily log** — date, pees, poos, Bristol type, urine colour, blood, note —
   stored in the browser, sorted oldest first, editable and removable.

It then produces a triage verdict (**go now** / **book within days** / **probably
nothing, keep the note**) with its reasons stated explicitly, and a plain-text
summary containing the answers, the log with per-day rows and computed averages,
and the seven questions worth asking the clinician. The summary can be printed or
copied. The logic errs upward: any visible blood, any duration of three weeks or
more, any ticked flag, a red or cola-coloured urine answer, or blood recorded in
the log all escalate to "book within days".

It does not diagnose and does not try to. It sorts by urgency and writes down
what you said.

## Compatibility notes

Targets every browser above roughly 1% share, including versions two to three
years old: Chrome, Edge, Safari (macOS and iOS), Firefox, Samsung Internet, Opera.

**CSS.** No native nesting, no `:has()`, no `color-mix()`, no `@layer`, no
container queries, no subgrid. Flexbox and grid only. `-webkit-` prefixes
included where Safari still wants them: `-webkit-sticky`, `-webkit-appearance`,
`-webkit-overflow-scrolling`, `-webkit-text-size-adjust`,
`-webkit-font-smoothing`, `-webkit-transform`/`-webkit-transition`,
`::-webkit-details-marker`, `::-moz-selection`. Dark mode is defined three times
over — a full light palette on bare `:root`, a `prefers-color-scheme: dark` block
guarded with `:root:not([data-theme="light"])`, and a `:root[data-theme="dark"]`
block — so the manual toggle wins in both directions and no colour has its only
definition inside a media query. `prefers-reduced-motion` and a print stylesheet
are both honoured.

**JavaScript.** ES2020 and below, classic scripts, no modules (`file://` blocks
those by CORS). None of `Object.groupBy`, `toSorted`, `toReversed`, `with`,
`Array.prototype.at`, `structuredClone`, `crypto.randomUUID`, `replaceAll`,
`Error.cause`, private `#fields`, static blocks, top-level `await`, `<dialog>`,
popover or `requestIdleCallback` appears anywhere.

**localStorage** is feature-detected with a write probe and every read and write
is wrapped in `try`/`catch`. iOS Private Browsing throws on access; the page
detects that, degrades to an in-memory object and shows a one-line amber notice
at the top saying nothing will be saved.

**navigator.clipboard** is undefined in non-secure contexts, which includes
`file://`. It is feature-detected, called inside `try`/`catch`, and its promise
has both a rejection handler and a `.catch()`. On failure the summary text is
selected for you and the status line says to press Ctrl+C or Cmd+C.

**Dates** are never parsed from a hand-built string. `new Date(y, m - 1, d)` is
used for construction and a strict `YYYY-MM-DD` regex plus a round-trip check for
parsing, so iOS Safari cannot disagree. Date inputs carry a `YYYY-MM-DD`
placeholder, which appears only in browsers that fall back to a text field.

**Accessibility.** Semantic landmarks and a skip link on every page; exactly one
`h1` per page and no skipped heading levels (verified); every input has a real
`<label for>` or a wrapping label (verified); visible focus everywhere, including
`:focus-within` outlines on the SVG picker tiles whose radios are visually
hidden; `aria-live` regions on the step counter, the verdict, the log status and
the copy status; every table has a `<caption>`, a `<thead>` and `scope`
attributes. Wide tables scroll inside their own container and announce that they
do, only when they actually overflow. The `hidden` attribute is backed by
`[hidden] { display: none !important }` because `.btn` sets `display`.

**JavaScript off.** All informational content is in the HTML. With JS disabled
the walkthrough shows every question at once, prefaced by a note explaining that
you can print the page and fill it in by hand; the navigation buttons, progress
bar and empty result panel are hidden by default and only revealed by the `js`
class.

## Verification performed

- `node --check` on both JS files.
- Every `href` and `src` resolved against the filesystem; every in-page fragment
  checked against the ids that exist on the target page.
- Grep for all banned JS APIs: zero hits. Grep for all banned CSS features: zero
  hits outside a comment. CSS braces balanced (258/258).
- No `http://` or `https://` in any `src` or `href`. The only such strings in the
  project are the SVG XML namespace inside the `data:` URI favicon, which is never
  fetched, and one code comment.
- Every id referenced by JS exists in the HTML, and every JS hook in the HTML is
  used.
- HTML tag balance and duplicate-id checks on all five pages: clean.
- 114 behavioural assertions driven through a real DOM (70 against the note
  builder, 44 against the shared script on the four content pages), covering the
  emergency short-circuit, all three verdicts, the log and its averages, the
  summary text, persistence and restore, corrupt stored JSON, a cancelled and a
  confirmed clear, the opaque-origin storage fallback, the clipboard fallback,
  the theme cycle and the nav current-page marking. All passing.
