# Pee & Poo — a plain-language guide to urinary and bowel habits

A static, dependency-free website explaining how often people typically urinate and
open their bowels, what urine and stool colour indicate, and which symptoms warrant
medical attention.

## Stack

Deliberately none. Hand-written HTML5, one plain CSS file, one vanilla JavaScript
file. No framework, no build step, no package manager, no external requests — the
site works when opened straight off the filesystem (`file://`) and can be served by
any static host or GitHub Pages with no configuration.

```
site/
  index.html         Landing page and quick answers
  urination.html     Frequency, volume, colour chart, hydration
  bowels.html        Bristol Stool Scale, colour, constipation/diarrhoea
  red-flags.html     Triage: emergency, days-not-months, probably fine
  tracker.html       Private in-browser logging tool
  assets/styles.css  Design system (tokens, layout, components)
  assets/tracker.js  Tracker logic (localStorage only)
```

## Browser support

Targets every browser above roughly 1% market share, including versions two to three
years old: Chrome, Edge, Safari (macOS and iOS), Firefox, Samsung Internet, Opera.

- CSS avoids native nesting, `:has()`, `color-mix()`, `@layer` and container queries.
  Layout is flexbox and grid with single-column mobile defaults and `min-width` media
  queries, so an unsupported feature degrades to a readable stacked page.
- JavaScript is ES2020 or older, loaded as a classic (non-module) script. No
  `Object.groupBy`, `toSorted`, `structuredClone`, `crypto.randomUUID`, `replaceAll`
  or `<dialog>`.
- `localStorage` and `navigator.clipboard` are feature-detected and wrapped in
  `try`/`catch`; iOS Private Browsing and `file://` contexts fall back gracefully.
- Dark mode via `prefers-color-scheme`; reduced motion and print styles included.
- All static content is in the HTML, so the informational pages are fully readable
  with JavaScript disabled.

## Privacy

The tracker stores entries in `localStorage` in the visitor's own browser. There is
no account, no analytics, no network request of any kind, and no data leaves the
device. Clearing browser data deletes everything.

## Disclaimer

General health information, not medical advice, and not a substitute for assessment
by a clinician. Figures are given as ranges from mainstream clinical sources; where
the evidence is weak, the pages say so.
