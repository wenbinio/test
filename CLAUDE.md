# CLAUDE.md — Session Retrospective: No-SHA Shareholder Rights Research & Memorandum

Session date: 31 July 2026. Deliverable: a ~51,000-word Singapore legal memorandum
("Default Shareholder Rights and Dispute Resolution Absent a Shareholders' Agreement"),
published as an HTML artifact with 370 jump-linked footnotes and 428 source hyperlinks.
This file records what went well and what required user correction, so future sessions
start from these lessons instead of re-learning them.

---

## What went well

### The memorandum itself

- **Verified pinpoint discipline held end to end.** Every drafting agent was barred from
  using any paragraph pinpoint its paired verifier had not confirmed against a fetched
  primary source. Unverifiable pinpoints (26 flagged) were cited without the paragraph
  number or dropped — never guessed. The final document validated with 370 footnotes,
  zero undefined keys, zero broken jump-links, and links overwhelmingly to primary
  sources (162 Singapore Statutes Online, 247 eLitigation).
- **Adversarial verification caught real errors before they shipped.** The verifier waves
  found 45 citation errors plus 8 in the first wave, including several that a
  memory-drafted memo would almost certainly have carried: the *DyStar/Kiri v Senda*
  neutral-citation chain (liability is [2018] SGHC(I) 6, not [2018] SGHC(I) 4);
  contributory standing at IRDA s 124(1)(d), not (c); s 74 as restructured by Act 24 of
  2025 (in force 6 May 2026 — after training-era knowledge); the *Thio Syn Kym Wendy*
  party order; Hans Tjio (not Wee Meng Seng) as author of the JCLS oppression study;
  the H8 Holdings appeal sitting in the Appellate Division, not the Court of Appeal.
  Post-assembly greps confirmed every correction landed in the final text and no
  corrected-away error reappeared.
- **The legal decomposition was right the first time.** The dimension split (common law
  baseline / s 216 / s 216A / IRDA winding-up and deadlock / control map / transfers and
  exit / directors' duties and information / forum and arbitrability / English
  divergence / SHA gap analysis) survived unchanged from wave 1 through the final
  ten-part structure, and correctly anticipated the 2020 IRDA migration, the 2021
  revised-edition renumbering, and *Tomolugen* arbitrability as load-bearing issues.
- **Parallel drafting without merge pain.** A named-footnote-key convention
  (`<fnref k="sakae-81"/>` + `<fndef>`) let ten drafters write concurrently while a
  deterministic assembler resolved global numbering, deduplicated shared authorities,
  and generated the TOC — no numbering conflicts, no manual reconciliation.
- **Bespoke document design.** The memo got a considered treatment (SLR-binding carmine
  accent, serif measure, sticky TOC, memo masthead, dark/light token system,
  `:target` footnote highlighting) rather than a templated look.
- **Status reporting between waves was concrete**: agent counts, token totals, error
  counts, and the specific corrections found — not vague "still working" updates.

### Orchestration

- Three-wave structure (scoping sweep → Opus deep-research with paired Sonnet
  refutation verifiers → parallel drafters) with 38 agents total, zero agent errors,
  zero empty results across all waves.
- Research → verify ran as a pipeline (each verifier launched the moment its researcher
  finished), not a barrier.
- Prep work (digest extraction, assembler, HTML shell, conventions file, Part I) was
  eventually done while wave 2 was still running — see the caveat below on "eventually."

---

## What I did not do well (each of these cost the user a correction or follow-up)

1. **Pinpoint citations were not baked in from the start.** Wave 1's schema asked for
   authorities and propositions but not paragraph pinpoints, subsections, or source
   URLs. The user had to follow up — "Give me pinpoint citations and footnotes linking
   back to the source" — and wave 1's output is consequently the weakest-cited layer of
   the memo. For legal research the citation standard is not an add-on; a deliverable
   proposition without a pinpoint and a link is unfinished. Bake `authority / pinpoint /
   url / verbatim quote` into the very first schema.

2. **I under-scaled the first wave relative to an explicit "deep research" request.**
   The user asked for deep research and got a 5+1 workflow sized to the default
   guideline. They had to come back with "More agents for a deeper dive. Give me Opus
   researchers and Sonnet verifiers." When a user says *deep*, propose the heavyweight
   structure (model tiers, verifier pairing, agent count) up front and let them trim —
   don't make them ask twice.

3. **I missed an obvious scoping variable: the constitution.** In a no-SHA question the
   very first branch is "and what does the constitution say?" — I researched the Model
   Constitution as a backdrop without surfacing the question, and the user had to add
   "Presume the Constitution is similarly silent," which changed the analysis (mandatory
   law and statutory defaults only, Model Constitution as a contingency). Identify and
   confirm the scenario's controlling assumptions before launching research, not after.

4. **I never proposed a deliverable format.** The user had to specify it themselves:
   "Final deliverable is an HTML with linked footnotes, references, citations, etc - a
   legal memo, with everything in detail." A research effort of this size should have
   had its output format agreed in the first exchange — the format (footnoted HTML memo)
   materially shaped schemas, conventions, and assembly tooling that I then had to
   retrofit.

5. **I waited serially when I could have worked.** After launching wave 2 I sat in a
   blocking 10-minute `TaskOutput` wait doing nothing; only after the user said
   "Parallelize where you can" did I build the digests, assembler, shell, conventions
   file, and Part I concurrently with the running research. All of that prep had zero
   dependency on wave 2's results. Default to doing independent prep during any
   long-running background work — being told to parallelize is a failure.

6. **The session needed repeated manual "continue" nudges.** Several tool calls were
   interrupted and the user had to say "Continue from where you left off" multiple times
   (four in a row at one point, around the final verification greps and publish). Batch
   low-risk verification steps and keep the tail of the pipeline short so one
   interruption doesn't strand the deliverable one step from done.

7. **The secondary-source caveat surfaced only at delivery.** The fact that a handful of
   pinpoints rest on secondary sources quoting judgments (rather than the fetched
   judgment text) was disclosed in the final message. It was honest, but it should have
   been stated when the limitation first became visible in the verifier outputs — the
   user should never learn about a evidentiary limitation last.

---

## Standing instructions distilled from the above

- Legal/scholarly research: require pinpoint + URL + verbatim quote in the first
  research schema; pair every researcher with a refutation-mode verifier; corrections
  and "unverifiable" lists are binding on drafters; grep the assembled output to prove
  corrections landed.
- Ask two questions before any large research launch: (a) what are the scenario's
  controlling assumptions (for company disputes: what do the constitution and any
  side agreements say)? (b) what is the deliverable format?
- Match orchestration scale and model tiers to the user's stated ambition on the first
  attempt; propose, don't wait to be asked.
- During any background wave: immediately list and execute all zero-dependency prep
  (tooling, templates, conventions, sections drafteable from completed material).
- Keep the publish tail short: validate in one batched pass, then ship.
