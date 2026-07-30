# Lightpanda source audit

Target: [lightpanda-io/browser](https://github.com/lightpanda-io/browser) @ `edcd9ea` (2026-07-30)
License: AGPL-3.0-only, contributions gated behind a CLA (Selecy SAS)

Method: full clone read directly. Six parallel subagent passes over disjoint subsystems
(DOM, platform web APIs, CDP server, browser core/navigation, V8 runtime, network stack),
then a consolidation pass in which the nine highest-severity claims were re-verified against
the source by hand. Findings are marked **[verified]** where the code was read directly during
consolidation and **[relayed]** where the reading subagent's evidence was accepted as reported.

Nothing here has been reported upstream.

---

## Tier 0 — Security model

The recurring theme is not "unimplemented" but "assumed to have passed." Individually these are
bugs; together they mean a credentialed session browsing untrusted pages is not safe.

| # | Finding | Location | Status |
|---|---------|----------|--------|
| 0.1 | Cross-origin responses are tagged `.cors` with the comment *"for simplicity, assume CORS passed"*. No `Access-Control-Allow-Origin` check, no preflight, and `RequestInit` has no `mode` field. Any script reads any cross-origin body. | `src/browser/webapi/net/Fetch.zig:194` | **[verified]** |
| 0.2 | `postMessage` takes `targetOrigin` and discards it (`_ = target_origin;`), delivering unconditionally. Removes the guard against leaking to a window that navigated elsewhere. | `src/browser/webapi/Window.zig:810` | **[verified]** |
| 0.3 | Cache eligibility tests for an `Authorization` header in `transfer.res.headers` — the **response** headers. Servers don't echo that header, so the `Cache.zig:270` guard effectively never fires; authenticated GETs land in a URL-keyed shared cache and replay to later requests. No request-side guard exists anywhere in the cache path. | `src/network/HttpClient.zig:1020,1035` + `src/network/cache/Cache.zig:260-271` | **[verified]** |
| 0.4 | `setFollowLocation(false)` plus a hand-rolled redirect loop bypasses curl's cross-host auth stripping; `Authorization` headers and URL-userinfo credentials are reapplied on every hop with no same-origin check. | `src/network/HttpClient.zig:2459-2503, 2580-2619` | **[relayed]** |
| 0.5 | Every document-type request is treated as top-level navigation, so `SameSite=Lax` cookies are sent to cross-site iframes. | `src/network/HttpClient.zig:1683-1690` | **[relayed]** |
| 0.6 | `fetch`/XHR compute the cookie jar once from the initial URL; redirects never re-evaluate, so a same-origin fetch redirected cross-origin still attaches cookies. | `src/browser/webapi/net/Fetch.zig:99-103`, `net/XMLHttpRequest.zig:264-266` | **[relayed]** |

## Tier 1 — Fabricated values

Code that returns confident, invented answers instead of erroring. Worst class for an agent
consumer, which cannot tell a real answer from a synthesized one.

- `Page.captureScreenshot` / `printToPDF` return an embedded static placeholder PNG/PDF — `src/cdp/domains/page.zig:961-1004` **[verified]**
- `getBoundingClientRect` synthesizes geometry: `y` from document order, `x` from sibling index; `IntersectionObserver` is fed from the same source — `src/browser/webapi/Element.zig:1323-1336` **[verified]**
- `document.doctype` fabricates a `<!DOCTYPE html>` node where the spec returns `null`, while `compatMode` correctly reports `BackCompat` — internally inconsistent — `src/browser/webapi/HTMLDocument.zig:232-252` **[relayed]**
- `document.hasFocus()` hardcoded `true`; `document.referrer` hardcoded `""` — `src/browser/webapi/Document.zig:1241-1244, 1602` **[relayed]**
- `navigator.sendBeacon()` no-ops and returns `true` (spec: `true` means *queued*) — `src/browser/webapi/Navigator.zig:125-130` **[relayed]**
- `navigator.storage.estimate()` always reports 0 used / 1 GiB quota — `src/browser/webapi/StorageManager.zig` **[relayed]**
- All canvas drawing primitives are `.noop = true`, but `getImageData()` still returns a correctly-sized transparent buffer — `src/browser/webapi/canvas/CanvasRenderingContext2D.zig:104-183` **[relayed]**
- CDP `Network.responseReceived` timing fields all hardcoded `-1`; `Network.loadingFailed` labels every failure `type: "Ping"` — `src/cdp/domains/network.zig:546-572, 317-337` **[relayed]**

**Bot-detection corollary.** Issue #1177 asks for better evasion. Detection scripts test
*consistency*, not values. Fabricated geometry, always-true focus, always-empty referrer, a
blank canvas, and a doctype contradicting `compatMode` are jointly damning. The fabrications
are the fingerprint; stealth patches layered on top will not help.

## Tier 2 — Breaks automation in practice

1. **`page.keyboard.press('Tab')` silently does nothing.** `rawKeyDown` is early-returned as "a Chrome-internal event type not used for JS dispatch." Puppeteer sends `rawKeyDown` for every key lacking a text payload — Tab, Escape, arrows, Backspace, Delete, all modifiers. — `src/cdp/domains/input.zig:58` **[verified]**
2. **`Fetch.enable` returns success while leaving interception unarmed** for >1 pattern, any `resourceType` filter, or `requestStage: Response`. Handler never fires; nothing errors. — `src/cdp/domains/fetch.zig:152-189` **[relayed]**
3. **`Page.handleJavaScriptDialog` always errors**, so standard `page.on('dialog', …)` can never succeed; only a proprietary `LP.` pre-arm path works. — `src/cdp/domains/page.zig:822-834` **[relayed]**
4. **`setInterval` migrates to `low_priority` after its first tick** regardless of source queue. `hasMacrotasks()` only inspects the high-priority queue, so the browser reports a page idle while an interval still ticks — a false "done" signal feeding CDP waits. — `src/browser/js/Scheduler.zig:143` **[verified]**
5. **Native promises drain microtasks mid-script.** `crypto.subtle.sign()` settles synchronously and calls `runMicrotasks()`, running unrelated queued `.then()` callbacks before the calling script finishes its turn. Desyncs React/Vue schedulers from Chrome semantics. — `src/browser/js/PromiseResolver.zig:53-63,108-118` **[relayed]**
6. **Probable root cause for issue #1890** (multi-step form POST doesn't update page): navigation short-circuits when the URL equals the current one and contains `#`, *without checking navigation type*. An `action`-less form on a page whose URL has a fragment — the standard `/checkout#step2` wizard — is dropped with no request, no error, no log. — `src/browser/Frame.zig:925-931` **[verified]**
7. **Module top-level exceptions never reach `window.onerror`**; they are absorbed into internal logs. Classic scripts report correctly. — `src/browser/js/Context.zig:409-440` **[relayed]**
8. **IndexedDB `multiEntry` dedup is broken**: the `continue` advances the inner `seen` loop instead of skipping the outer element, so duplicates always insert. On `unique: true, multiEntry: true` this throws `ConstraintError` for spec-valid records. — `src/browser/webapi/storage/idb/IDBObjectStore.zig:465-469` **[verified]**

Also: namespaced attribute APIs ignore the namespace, breaking `<use xlink:href="#icon">` SVG
sprites (`Element.zig:617-758`); `Target.targetDestroyed` and `Target.targetInfoChanged` are
never emitted, staling Puppeteer's target registry after `page.close()`
(`src/cdp/domains/target.zig:277-319`); disabled checkboxes still toggle and disabled buttons
still take focus (`src/browser/EventManager.zig:642-675`); in-place iframe reloads leak into a
page-lifetime arena that is never reset (`src/browser/Page.zig:75,152-159`);
`Emulation.setDeviceMetricsOverride` silently ignores `deviceScaleFactor` and `mobile`
(`src/cdp/domains/emulation.zig:68-130`).

## Tier 3 — Reachable process crashes

`lp.assert` is unconditional in every build — no debug gate — and calls `crash_handler.crash`,
which is `noreturn` (`src/lightpanda.zig:417-429`). **[verified]**

- **Live:** reading `history.state` on a frame that only ever loaded `about:blank` (fresh popup, blank iframe) hits `assert(len > 0)` and kills the process — `src/browser/webapi/navigation/Navigation.zig:88-94` **[verified]**
- **Latent:** `PageHandle.navigate` lacks the `_load_state == .waiting` guard its CDP counterpart requires; safe only because its sole caller always passes a fresh page — `src/browser/Session.zig:974-977` **[relayed]**

---

## Assessment

Good bet for anonymous, high-volume, text-oriented crawling; the performance claims (~9x faster,
~16x less memory than headless Chrome) rest on real architectural choices and the engineering
underneath is competent — expert-authored Zig, leak-failing test runner, WPT suite, fortnightly
releases. Not vibecoded.

Two hard lines: do not run it authenticated against untrusted pages, and do not rely on it where
a wrong answer costs more than no answer, because its dominant failure mode is confident
fabrication rather than an error.

Mitigations if adopting: network-isolated container, throwaway per-site credentials, HTTP cache
disabled when sending `Authorization`, and treat screenshots, canvas output, and element
geometry as unavailable rather than as data.

## Suggested upstream order

1. Tier 0 in full — privately, via `SECURITY.md`, not public issues.
2. Convert Tier 1 fabrications to explicit CDP/JS errors, with the placeholders behind an opt-in flag.
3. Tier 2 items 1, 2, 3, 6 — small diffs, each unblocks a common automation flow.
4. `lp.assert` audit: separate genuine invariants from reachable input-driven states.
5. Only then approximate layout, which is the one large piece of new engineering and would
   retire the geometry fabrication plus much of the detection surface.

Deliberately deprioritized: WebGPU (#386) and extension support (#37) are large surface for
little DOM-automation value; screencast (#2140) presupposes real rendering.
