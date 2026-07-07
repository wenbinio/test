# PAPER.md — Verification report

Four independent checker agents reviewed the manuscript before publication (2026-07-07). This file
summarizes each report and how every finding was resolved. The manuscript's § 8 carries the short
version; this is the record.

## 1. Numbers checker (Sonnet)

**Scope:** every numeric claim in PAPER.md vs `linkage-results.json`, `satisfaction-matrix.html`,
`SOURCES.md`; independent recomputation of totals.

**Result: 96 discrete checks, 0 mismatches.** All §4.1 (17 rows), §4.2 (16 rows), §4.3 sensitivity
values, single-control claims, all 23 Appendix A rows, validation summary (mean |Δ| = 3.28
independently recomputed), sample totals (128 occupations; Σn = 12,647 independently summed), and
all cross-referenced artifact figures reproduced exactly.

**Open items → resolution:**
- Five crosswalk counts (537/570 census codes, 502 populated, 133 clean, 369 many-to-many) were not
  persisted in the results JSON → **resolved**: `step3_crosswalk.py` re-run from its original
  working directory reproduced all five exactly ("2018 census codes with O*NET: 537 of 570"; "1980
  census occ codes with O*NET aggregated: 502"; quality {many_to_many_split: 369, clean_1to1: 133}).
- Within-analytic-sample crosswalk quality (14 clean / 114 many-to-many) surfaced by the checker →
  added to Limitation 3.
- Three literature figures outside its ground-truth scope (Vainre N=59,042, η²=.07; Törnroos ~1%)
  → delegated to the citation checker (see below; all confirmed).

## 2. Citation checker (Sonnet)

**Scope:** all 17 references — bibliographic details vs live sources; honesty of [P]/[S]/[U] tags vs
SOURCES.md; orphan check; factual attachments.

**Results:**
- Orphans: none in either direction.
- Bibliographic: 16 OK (3 with trivial incompleteness — subtitles/issue numbers, since completed),
  **1 error**: Beard et al. is *Epidemiology* 33(**2**), e8–e9, not 33(3) → **fixed**, and the tag
  narrowed to **[P: workbook]** since the article text itself was not read.
- Tags: 11 honest; 5 lacked SOURCES.md ledger entries (Beard, Mostafa & Jaafar, Roos & Treiman,
  Schmitz, van Veldhoven) although the underlying fetches occurred (scout logs) → **resolved** by
  adding a "Paper-only citations" provenance ledger to SOURCES.md; Carpenter documented as [S].
- Factual attachments: 8/8 confirmed (Beard issue number aside). Vainre's three load-bearing
  figures (N=59,042; 263 occupations; prestige non-significant; also η²=.07) re-confirmed against
  the fetched preprint PDF; Schmitz r=.11 re-confirmed verbatim from PMC full text; Törnroos
  bibliographic details (title/venue/pages/DOI) confirmed despite secondhand sourcing.

## 3. Methods checker (Sonnet)

**Findings → resolutions (5 MUST-FIX, 5 SHOULD-FIX, 4 notes):**
1. Causal/individual-level slip in the physicality discussion → rewritten ecologically, causal role
   explicitly not ruled out.
2. "What buys additional satisfaction" (conclusion) → "the one modality dimension still associated
   with additional satisfaction".
3. No multiplicity acknowledgment → § 3.5 "Multiplicity" paragraph added (Bonferroni α ≈ .003;
   nominal p-values; autonomy defended by replication, coupling/external-customers reframed as
   exploratory) + Limitation 8.
4. Spearman values selectively missing for prestige/education/coupling/responsibility → filled from
   the JSON (.571/.451/.292/.254).
5. "A priori / pre-stated" overclaim → "Construct provenance (disclosure)" paragraph added to § 3.2;
   § 1 reworded ("fixed before any correlation was computed").
6. Sub-threshold validation cells disclosed at point of use (§ 3.4) — later corrected further by the
   adversarial reviewer (see below).
7. "No independent signal" split → physicality "Explained by status/schooling"; social load "Not
   detected", with attenuation caveat (finding 8).
8. Attenuation-aware null language → applied in verdict table.
9. Rhetorical stacking of non-comparable evidence in the autonomy discussion → de-stacked
   ("compatible with, though not evidence for"; firefighters marked illustration only).
10. Title "Prestige Confounds" → "Prestige Confounds the Rest" (checker's suggested scoping).
11. Teachers gap mentioned in § 3.4, not just Appendix A → applied.
12. df reporting → "df = 125 single-control, df = 124 double-control" added to § 3.5.
13. Near-significant external-customers element undiscussed → addressed in § 4.2 with multiplicity
    framing.
14. Abstract-vs-body consistency → verified clean by the checker.

## 4. Adversarial reviewer (Opus) — VERDICT: ACCEPT-WITH-REQUIRED-CHANGES

**Attacks run:** reproduced the flagship partials exactly from the occupations array (autonomy
.2283/p=.0095; determine-tasks .2362/.0073; mean-satjob autonomy .2602/.003; single-controls
.224/.292); computed collinearity (autonomy~prestige r=.555, autonomy~educ r=.543, prestige~educ
r=.816, VIF=1.50 — partial stable); spot-audited Appendix A rows and table values (all exact);
recomputed Σn and Bonferroni threshold (exact).

**Defects found (missed by all three Sonnet checkers) → resolutions:**
- **Raw-vs-partial conflation:** the sensitivity blocks carry raw Pearson only, yet the abstract,
  § 3.5, § 4.4 and § 5 claimed the *result* (a partial correlation) "replicates across all
  sensitivity blocks". → Required changes RC1–RC5 applied: all replication language now
  distinguishes partial replication (single-/double-control blocks, both outcomes, n ≥ 50
  subsample) from raw replication (both thresholds, both windows), and states that 1988–2010
  partials were not computed. The missing n ≥ 50 double-control partials were computed by the
  reviewer, **independently re-verified by a second computation** (autonomy r = .237, p = .027;
  determine-tasks r = .279, p = .009; physicality r = −.02, n.s. — the two computations differed
  only in p-value convention, .025 vs .027; the more conservative value is published), and
  persisted to `linkage-results.json → sensitivity_min50.partial_both_pct_very_sat` with a
  method-log entry.
- **Validation-cell miscount:** § 3.4 said two of 23 validation cells fall below n ≥ 30; the true
  count is **six** (physical therapists 25, authors 24, roofers 26, expediters 26, butchers 23,
  furniture 22), so 17 of 23 extremes are in the analytic sample. → RC6 applied.
- **Residual confounding unnamed** for the focal autonomy partial (error-laden controls correlated
  at r = .82 cannot fully absorb the status bundle). → RC7 applied to Limitation 7.
- **Gate scope** (recommended): validation covers the outcome recomputation at the extremes only —
  neither mid-distribution cells nor the crosswalk/predictor side. → R8 applied to § 3.4.

**Substantive confirmations:** the central claim survives attack — the autonomy partial reproduces
exactly, replicates at n ≥ 50, collinearity is modest, and physicality's attenuation to null
replicates (−.02 at n ≥ 50).

## Residual known weaknesses (disclosed, not fixed)

- 1988–2010-window double-control partials remain uncomputed (occupation rows for that window are
  not persisted; would require re-running steps 1–4 with that window).
- The crosswalk/predictor side has no external validation of any kind.
- All p-values remain nominal; no formal multiplicity adjustment was applied (disclosed in § 3.5
  and Limitation 8).
