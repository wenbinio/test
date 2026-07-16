# Orchestration Patterns

What worked in this project's multi-agent design, worth reusing for the next Singapore legal
research task (or any similarly source-fragmented jurisdiction).

## 1. Independent parallel sweeps through DIFFERENT channels

The 11 agents were not 11 copies of the same search — each was assigned a distinct channel:
statutory framework (01), direct case-law sweep via eLitigation (02), MOM regulatory practice
(03), an independent "second opinion" crux deep-dive (04), an *alternate-channel* case-law
sweep that harvested case names from secondary/web sources and then verified them against
primary PDFs (05), licence logistics/costs (06), sub-supply and cross-border questions (07), a
Hansard gap-filler (08/08a), and three recency waves covering employment status (09), EAA
enforcement (10), and vicarious liability (11).

The payoff of routing **direct primary-source sweeps** (02) and **secondary-literature/
web-harvest sweeps** (05) through *different* agents, rather than one agent doing both, is that
their outputs could be cross-checked against each other — and they caught real discrepancies
that a single combined sweep would likely have silently resolved one way and missed the other:

- **Munshi pinpoint conflict**: Agent 2 (via a WebFetch-style pass) reported the dual-VL
  holding at ¶53 and control analysis at ¶72–75; Agent 5 (direct PDF read, page by page)
  located the actual holding at ¶67 and control analysis at ¶70–80. Recorded explicitly as a
  cross-check flag rather than either agent overwriting the other — the direct-read agent was
  ultimately treated as authoritative, but the discrepancy is preserved in the record for a
  verifier to see the *why*.
- **Asplenium party-name conflict**: Agent 5 styled the case "Asplenium Land Pte Ltd v Lam Chye
  Shing [2019] SGHC 41"; Agent 11 (a later recency sweep) styled the same neutral citation as
  "Asplenium Pte Ltd v Cekap Kaya Resources Pte Ltd [2019] SGHC 41." Flagged explicitly:
  "VERIFIER MUST RESOLVE the correct case name before citation." Two independently-working
  agents converging on the same citation number but different party names is a strong signal
  that at least one is misremembering/mis-scraping — exactly the kind of error a single sweep
  would not have surfaced.
- **Awang bin Dollah mischaracterization**: Agent 2 found (via a later case quoting it) that
  Awang bin Dollah succeeded on **occupier's liability**, not employer's liability. Agent 5
  found a *different* later case citing Awang bin Dollah for a **control test** relevant to
  employer identity. Neither agent could read Awang bin Dollah directly (pre-2000, not on
  eLitigation). Both citations are individually well-sourced. Recorded as "both may be true
  (different propositions); verify before citing" — the orchestration value here was two
  agents surfacing two different secondary trails to the same unreachable primary case, which
  together gave the writer a fuller (if still unverified) picture than either alone.
- **Karuppiah Ravichandran existence dispute**: Agent 2 asserted this case exists (as a WICA
  appeal-threshold authority); Agent 5, searching independently, could not locate it and
  concluded it is "likely non-existent/misremembered" — probably a conflation with the real
  case Karuppan Bhoomides v Port of Singapore Authority [1978] 1 WLR 189. This is the single
  clearest example in the project of why a plausible-sounding case name from one agent should
  never be taken as confirmed until at least one other agent has independently tried and
  failed (or succeeded) to find it.

**Lesson**: when assigning research channels, deliberately split "read primary sources
directly" from "harvest leads from secondary/web sources and verify," rather than having one
agent do both in sequence. The friction between the two outputs is where errors surface.

## 2. Archive each agent's report to a numbered file immediately

Every agent's dossier was written to a numbered file (`01-...md` through `11-...md`, plus
`08a-...txt` for a large recovered text) in a shared scratchpad **as soon as that agent
finished**, rather than being held only in that agent's own conversational context. This is
context-loss insurance: if the orchestrating session's context is compacted, rotated, or lost,
the raw research survives on disk and doesn't have to be redone. It also makes cross-checking
between agents (pattern 1 above) mechanically possible — a later agent, or a human, or a
knowledge-base-building agent (like the one that produced this file) can simply read all the
numbered files.

Practical convention used: `NN-<short-topic>-<model>.md`, e.g. `02-case-law-sonnet.md`,
`04-second-opinion-crux-opus.md`. Encoding the model name in the filename is a small but useful
habit — it lets a later reader factor in which model produced a given claim when weighing
conflicting reports.

## 3. Explicit cross-check flags between agents

Agents were not just told to report findings — they were expected to **flag discrepancies with
other agents' work explicitly**, by name, when they noticed one (e.g., Agent 5's dossier ends
with a dedicated "Cross-check flags vs Agent 2 (for verifier)" section listing four numbered
items). This only works if agents can see prior agents' output (sequential dispatch, or a
review pass after parallel dispatch) and are explicitly instructed to look for and name
disagreements rather than silently picking whichever version they generated. A flag should
name the specific proposition in dispute, both agents' versions, and (if possible) which is
more reliable and why (e.g., "direct PDF read" beats "WebFetch summary").

## 4. Dedicated gap-filler agents for a single flagged gap

When Agent 1 flagged that it could not retrieve the verbatim 2011 Second Reading speech
(MOM's page 404'd, sprs.parl.gov.sg blocked, Wayback blocked-by-WebFetch-specifically), a
single dedicated agent (08) was dispatched with the narrow mission of recovering exactly that
one item. It succeeded via a `curl`-based Wayback fetch (see `source-access-playbook.md`) and
filed both a short summary (08) and the full recovered text as a companion file (08a). This is
more efficient than asking a broad-channel agent to also solve a narrow, specific access
problem — a narrow gap deserves a narrow, dedicated agent that can try multiple access
techniques without derailing a broader research mission.

## 5. Recency waves after the doctrinal base is built

Agents 09, 10, and 11 were dispatched *after* the doctrinal/statutory base (01–08) was in
place, each covering the 2020–2026 window for a different sub-question (employment status
generally; EAA enforcement specifically; vicarious liability specifically). This sequencing
matters: a recency sweep is much more useful once you know exactly which older authorities
(International Placements [2020] SGHC 46; Munshi [2021] SGHC 26; Jurong Country Club
[2019] SGHC 150) it needs to check for citation/doubt/extension. All three recency agents
explicitly checked "does anything cite/follow/distinguish/doubt case X" and reported strong,
useful **verified negatives** (see pattern 6) precisely because they knew what X was already.

## 6. Instructing agents to state "NOTHING FOUND" per category

Every recency-sweep dossier is structured around named categories (e.g. Agent 9: "Category 1
— Court decisions," "Category 2 — ECT appeals," "Category 3 — CPF enforcement," "Category 4 —
Ministry statements," "Category 5 — Tripartite instruments") with an explicit "NOTHING FOUND"
verdict recorded per category where applicable, rather than the category simply being absent
from the report. This produced citable, load-bearing negative results — e.g., "no 2021–2026
Singapore judgment cites, follows, distinguishes, or applies International Placements v PP
[2020] SGHC 46" is itself a useful finding for a memo (it tells the writer this remains the
sole and unrefined judicial word on the EAA), and it would be invisible if the agent had simply
not mentioned the category. **Instruct every research agent to enumerate the categories/
questions it searched and state a verdict — found, not found, or partially found — for each,
rather than only reporting positive hits.**

## 7. Instructing agents that their final message is raw data for a writer

Agents were oriented around the understanding that they were not producing the client-facing
memo themselves — a separate synthesis/writer step consumes their dossiers. This freed each
research agent to prioritise **accuracy and completeness of raw findings over narrative
polish**, to leave contradictions unresolved-but-flagged rather than picking a side, and to
record gaps and low-confidence items explicitly rather than smoothing them over for
readability. The governing instruction distilled from the dossiers' tone: **accuracy over
volume, and never fabricate** — an agent that returns "I found five things and here is exactly
how confident I am in each" is more valuable to the downstream writer than one that returns a
polished ten-item list with invented certainty.
