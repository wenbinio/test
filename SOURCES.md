# SOURCES — satisfaction-matrix.html

Every citation used by the artifact, with its final confidence tier and what verification could
and could not confirm. Built 2026-07-07 by five parallel research agents (one per domain) plus
independent adversarial verifier agents, across **two verification rounds**.

**Round one** ran under a network egress policy that returned HTTP 403 for almost all publishers
and archives; web search worked, and exactly one primary source passed the gateway (an S3 mirror
of Krieger & Sheldon 2015, fetched by two agents independently). Round one therefore capped
everything else at T2/T3.

**Round two** ran after the egress policy was opened mid-session. A second verifier fetched
primary texts directly — the NORC tables via GSS News No. 21 (gss.norc.org), official PubMed
abstracts via NCBI E-utilities, the After the JD III PDF (americanbarfoundation.org), the Heinz,
Hull & Harter PDF (ilj.law.indiana.edu), the Schrever 2022 paper (PMC), and the Springer full text
of Frei & Grund — promoting most load-bearing figures to T1, recovering three NO DATA cells,
adding two occupations, and producing five corrections. Still refusing fetches after round two:
ScienceDirect (Hoff, Wiegand, French), Wiley (Kristof-Brown), Medscape (registration wall),
Merck, and papers.ssrn.com.

Tier definitions:
- **T1** — verified against the primary source this session (source fetched, figure seen in text)
- **T2** — secondary citation, consistent across independently-phrased searches; primary not verified
- **T3** — contested across sources or known-confounded; the conflict is displayed, never resolved silently
- **REMOVED/CORRECTED** — circulated figure that failed verification or was corrected against primary text

---

## Cross-occupation (NORC/GSS) — now T1

**Smith, T.W. (2007). *Job Satisfaction in America.* NORC/University of Chicago, April 2007.**
Verified via **GSS News No. 21 (July 2007)**, which reproduces Smith's Table 1 (Top/Bottom 12
Occupations in Job Satisfaction) and Table 2 (General Happiness) verbatim. Round two corrected the
report title (it is "…in America", not "…in the United States") and established that data span
GSS **1972–2006** and that **both lists are ranked by mean score (1–4 scale), not by % very
satisfied** — the key to the round-one "ranking trap."

- **T1 top-12** (% very satisfied · mean · rank-by-mean): clergy 87.2 · 3.79 · #1; physical
  therapists 78.1 · 3.72 · #2; firefighters 80.1 · 3.67 · #3; education administrators 68.4 ·
  3.62 · #4; painters/sculptors 67.3 · 3.62 · #5; teachers 69.2 · 3.61 · #6; authors 74.2 · 3.61 ·
  #7; psychologists 66.9 · 3.59 · #8; special education teachers 70.1 · 3.59 · #9; operating
  engineers 64.1 · 3.56 · #10; office supervisors 60.8 · 3.55 · #11; security & financial services
  sales 65.4 · 3.55 · #12.
- **T1 bottom-12** (% · mean): roofers 25.3 · 2.84 (lowest-ranked); waiters/servers 27.0 · 2.85;
  laborers-except-construction 21.4 · 2.86 (lowest %); bartenders 26.4 · 2.88; hand packers 23.7 ·
  2.88; freight/stock handlers 25.8 · 2.91; apparel sales 23.9 · 2.93; cashiers 25.0 · 2.94; misc.
  food preparation 23.6 · 2.95; expediters 37.0 · 2.97; butchers & meat cutters 31.8 · 2.97;
  furniture/home-furnishing sales 25.2 · 2.99.
- **Recovered cells** (NO DATA in round one): operating engineers 64.1 → T1 (the removed seed was
  correct after all); security & financial services sales 65.4 → T1; office supervisors 60.8 →
  **T3** — the primary contradicts itself (prose prints 80.6%, Table 1 prints 60.8, mean 3.55),
  confirmed by three independent reads of the fetched PDF this session; the internally-coherent
  table value is displayed with the conflict stated.
- **Prose-vs-table slips inside the primary** (table used throughout): office supervisors 80.6 vs
  60.8; freight/stock handlers 23.9 (prose) vs 25.8 (table).
- **Exact item wording** (from the fetched table footnote): "On the whole, how satisfied are you
  with the work you do—would you say you are very satisfied, moderately satisfied, a little
  dissatisfied, or very dissatisfied?" Mean score runs 1–4.
- **Added occupations** absent from every round-one secondary list: expediters 37.0; butchers &
  meat cutters 31.8.
- **Corrections**: clergy decimal settled at 87.2 (87.3 variant wrong); roofers are 14.2% "very
  happy" — second-lowest on happiness, above garage & service-station attendants (13.2%) — while
  genuinely lowest-*ranked* on satisfaction by mean.
- **Still T2**: the ≈47% workforce average (recurs consistently in secondary coverage; not printed
  in the GSS News tables).
- **Still missing**: the full April 2007 report — mid-distribution occupations, per-occupation Ns,
  minimum-N inclusion threshold (secondary coverage: >27,000 respondents, 198 analyzable occupations).

## Healthcare

**Halasy, West, Shanafelt, O'Laughlin, Satele & Dyrbye (2021). "PA job satisfaction and career
plans." JAAPA 34(6), PMID 34031320. — T1.** Official abstract fetched: "82.7% of PAs were satisfied
with their job"; 32.2% intent to leave; 19.5% intent to reduce hours; fielded **2016** (pre-COVID).
Analyzed respondent N still not stated in the abstract (would require the LWW full text).

**Lo Sasso, Starkel, Warren, Guay & Vujicic (2015). "Practice settings and dentists' job
satisfaction." JADA 146(8):600–609, PMID 26227645. — study T1-confirmed; headline figure remains
NO DATA.** Round two corrected the author order (Lo Sasso is lead) and confirmed N=2,171 with **no
overall satisfaction %** — the circulating 48% headline is unsupported. Verified comparative
finding: small-group dentists most satisfied overall; large-group most satisfied with
income/benefits and least stressed.

**Merck Animal Health Veterinary Wellbeing Study II (2020, with AVMA/Brakke). — T2/T3.** 74%
career satisfaction (T2; N=2,871 of 20,000 invited, fielded Sept–Oct 2019). Round two could not
promote it: the JAVMA executive-summary PubMed record (PMID 32412878) has no abstract body and
Merck's site blocks fetches. "Would recommend the profession" stays **T3, contested**: 41% overall
per Merck.com (24% for ≤34, 62% for ≥65), 48% per one secondary source, 33% per dvm360.

**Medscape Physician Burnout & Depression Report 2024. — T2 (extremes only).** N=9,226; overall
49% burnout / 20% depression; EM 63, OB/GYN 53, FM 51 (high); ENT 43, Pathology 41, Ophthalmology
39, Psychiatry 39, Plastic Surgery 37 (low). Registration-walled through both rounds; middle
specialties remain an explicit NO DATA band. Never merged with AMA's separate survey.

**Shanafelt et al. longitudinal physician burnout series (≥1 MBI symptom). — all six waves T1.**
Official abstracts fetched via NCBI E-utilities in round two:
2011: 45.5% (3,310/7,227; original 2012 paper printed 45.8% of 7,288 completed — the harmonized
series value 45.5% is used, as restated in every later wave paper) · 2014: 54.4% (3,680/6,767;
6,880 of 35,922 invited, 19.2%, Aug–Oct 2014) · 2017: 43.9% (2,147/4,893; 5,197 of 30,456, 17.1%,
Oct 2017–Mar 2018) · 2020: 38.2% (7,510 participants, Nov 2020–Mar 2021; PMID 35246286) ·
2021: 62.8% (2,440 participants, Dec 2021–Jan 2022; WLI satisfaction fell 46.1%→30.2%; PMID
36229269) · 2023: 45.2% (7,643 participants, Oct 2023–Mar 2024; PMID 40202475).

**REMOVED — "Physicians 44% satisfied (Dyrbye 2013)."** Confirmed nonexistent against the fetched
abstract (PMID 24290109): the paper measures satisfaction and burnout **by career stage**
(early-career lowest career-choice satisfaction; middle-career highest burnout). Round two also
corrected the artifact's own round-one note, which had misdescribed the paper as a would-recommend
study. Physician satisfaction remains a deliberate NO DATA cell.

## Law

**Krieger & Sheldon (2015). "What Makes Lawyers Happy?" 83 Geo. Wash. L. Rev.; SSRN 2398989. —
T1 (both rounds).** Full PDF fetched twice in round one. N=6,226 working sample (7,805 total;
12.7% response; 4 state bars); SWB correlations — autonomy .66, relatedness .65, competence .63,
internal motivation .55, supervisor autonomy support .44, intrinsic values .30, income .192, class
rank .12, USNWR rank .05, law review .00 (n.s.), billable hours −.10; setting means — Judges 5.76
(N=141) > Public service 4.98 (N=1,091) > Prestige 4.86 (N=1,434) > Other 4.71 (N=2,852).

**Dinovitzer et al. (2014). *After the JD III.* ABF/NALP. — T1.** PDF fetched in round two: 76%
moderately/extremely satisfied with the decision to become a lawyer, "virtually unchanged from
prior waves"; complete surveys from **N=2,862** (May 2012–early 2013). Public-sector lawyers most
satisfied. **Correction:** a circulating mean of 3.92/5 is not in the report and was dropped.

**Heinz, Hull & Harter (1999). "Lawyers and Their Discontents." 74 Ind. L.J. 735. — T1, with
corrections.** PDF fetched in round two: **N=788** interviewees (82% of target; 1994–95 Chicago
Lawyers Survey); **84%** satisfied or very satisfied (~10% neutral, ~5% dissatisfied, 1.6% very
dissatisfied). The round-one figures (83.7%; 45.2+38.5 split; "~800 lawyers") were corrected — the
split is not in this article. Counter-finding verbatim: "practice setting was not a significant
predictor. The only significant variable ... was income"; large-firm lawyers gave ~10 points fewer
"very satisfied" answers but few were dissatisfied. The seed claim "large-firm practice least
satisfying after controls (Hull 1999)" stays REMOVED, now contradicted by primary text.

**Dinovitzer & Garth (2007). 41 Law & Society Rev. 1. — T2 (directional only).**

**Chambers (2014). 39 Law & Social Inquiry 313. — T2.** Methodological counterpoint, displayed
alongside.

**REMOVED — Sandefur & Heinz (1999) income-inequality claim.** Not found as stated in either round.

**Roach Anleu & Mack, Australian judicial surveys. — T2.** ~90% magistrate satisfaction
(approximate). The 47%-vs-31% "emotionally draining" magistrate/judge split is now corroborated
*inside a fetched primary* (Schrever 2022 quotes Roach Anleu & Mack 2017) but the original survey
reports were not fetched — stays T2.

**Schrever, Hulbert & Sourdin. — T2, source attribution corrected.** The 52.9%-vs-32.8% K10
distress split belongs to the **2019 J. Judicial Administration paper** (not fetched). The 2022
follow-up ("Where Stress Presides", PMC9225743) **was** fetched in round two: it confirms N=152
across 5 courts, needs-based predictors of stress, and magistrates > judges on stress variables —
while reporting depression/anxiety levels similar to the general population (a nuance now shown).
A "28.7%" subfigure sometimes quoted remains unverifiable and unused.

**Gap (confirmed, both rounds):** no controlled study of satisfaction by legal doctrine.

## Academia

**French, Allen, Miller, Kim & Centeno (2020). J. Vocational Behavior 120:103443. — T2.**
ScienceDirect refused fetches in both rounds (including the accepted-manuscript URL). Ordering
shown without means; the turnover-intention seed claim stays REMOVED.

**Bozeman & Gaughan (2011). J. Higher Education 82(2):154–186. — T2 (direction only).** N still
unknown: a candidate (1,794 of 4,916 invited, 37%) surfaced in secondary search only and is not
reported as fact.

**Frei & Grund (2022). J. Business Economics 92(7):1125–1166. — T1.** Springer full text fetched
in round two: unbalanced panel of **6,058 observations from 1,949 individuals** (3,573
doctoral-student and 2,485 postdoc observations); overemployment "unfold[s] more severe
consequences" than underemployment — confirmed verbatim. Scope caveat unchanged: total-hours
mismatch, not role-allocation fit.

**HBCU time-allocation study (Frontiers in Psychology 2021, PMC8548608). — T3.** Satisfaction
linkage still unconfirmed.

**Gap (confirmed, search-limited):** no located study treats allocation fit as a moderator.

## Meta-analytic layer

**Hoff, Song, Wee, Phan & Rounds (2020). J. Vocational Behavior 123:103503. — T2.** ρ=0.19
[.16,.21], k=105, N≈39,602. ScienceDirect refused in both rounds.

**Hoff et al. (2018). AMBPP. — T2, disambiguation entry.** ρ=0.11 for interest *level* (k=107,
N=38,695) — kept separate from the 2020 *fit* figure.

**Wiegand, Drasgow & Rounds (2021). J. Vocational Behavior 125:103524. — T2 (qualitative
direction only).** ScienceDirect refused; Ns and surface parameters still not retrievable.

**Michaelis & Findeisen (2022). Frontiers in Psychology 13:834543, PMID 35237215. — T1.** Official
abstract fetched in round two, null result verbatim: "Training satisfaction is not affected by
interest congruence and skill congruence." N=4,097 German VET trainees (NEPS); only
Realistic-interest congruence reduced premature contract termination; moderate overeducation
enhanced satisfaction.

**Kristof-Brown, Zimmerman & Johnson (2005). Personnel Psychology 58(2):281–342. — T2.** ρ≈.56 =
person-JOB fit → satisfaction; ρ≈.44 = person-ORGANIZATION fit (conflict resolved in round one by
independent search; Wiley refused fetches in both rounds). Construct flag: perceived fit is
structurally inflated versus measured congruence.

---

## Outcome ledger of the two verification rounds

**Promoted to T1 in round two:** all 24 NORC occupation values + both new occupations; PA 82.7%;
all six Shanafelt waves; After the JD III 76%; Heinz/Hull/Harter 84%; Michaelis & Findeisen null;
Frei & Grund (with recovered N). (Krieger & Sheldon was already T1 from round one.)

**Recovered (NO DATA → T1):** operating engineers 64.1; office supervisors 60.8; security &
financial services sales 65.4; Frei & Grund N; After the JD III wave N (2,862).

**Corrected against primary text:** office supervisors 80.6→60.8 (typo in the source report's own
prose); roofers' happiness "lowest"→second-lowest (14.2%; garage attendants 13.2% lowest);
Heinz 83.7%/N≈800/45.2+38.5-split → 84%/N=788/split-not-in-primary; AJD mean 3.92 dropped;
the artifact's own Dyrbye-2013 description fixed (career-stage study, not would-recommend).

**Still unverifiable (remain T2/T3/NO DATA):** Hoff 2020, Wiegand 2021, French 2020
(ScienceDirect); Kristof-Brown 2005 (Wiley); Medscape 2024 full specialty table (registration);
Merck 74% and would-recommend values; Bozeman & Gaughan N; Halasy analyzed N; Schrever 2019
52.9%/32.8% primary; Roach Anleu & Mack original reports; NORC workforce average ≈47, the
mid-distribution table, per-occupation Ns, and the minimum-N threshold; the Schrever "28.7%"
subfigure; Sandefur & Heinz claim.

## Linkage analysis (computed this session — original, not a citation)

**Design.** Independent-measurement linkage: O*NET incumbents/analysts rated occupations' work
modality without seeing satisfaction data; GSS respondents reported satisfaction without seeing
O*NET; the 1980-census occupation code is the only join. A literature scout confirmed no published
study crosses GSS occupation-level satisfaction with O*NET (closest analog: Vainre et al. 2025,
Estonian Biobank × O*NET, 263 occupations, primary-verified preprint — occupation-level partial
r≈.17–.29; prestige not significant there).

**Pipeline** (reproducible scripts + full method log in `analysis/linkage/`): GSS cumulative
microdata (gss7224, downloaded from gss.norc.org) → % very satisfied per OCC80 occupation,
1988–2006, WTSSALL-weighted, n≥30 → n=128 occupations; O*NET 30.3 Work Context/Activities elements
aggregated backward through O*NET-SOC 2019 → SOC 2018 → Census 2018 → 2010 → 2002 → 2000 → 1990 →
1980 (NIOSH/Beard 2022 proportional crosswalks, per-occupation quality flags). Sensitivity runs:
n≥50 (89 occupations), window 1988–2010 (144), unweighted.

**Validation gate vs the T1 NORC table:** mean |Δ| = 3.28 points across 23 matchable extremes
(clergy computed 89.1 vs 87.2; roofers 26.1 vs 25.3); largest deltas are small-cell occupations.

**Headline results** (occupation-level r with % very satisfied, n=128): prestige +.57 (strongest
raw), autonomy composite +.47, education +.46, physicality −.30, coupling +.26, responsibility
+.25, social load +.13. After partialling out BOTH prestige and education: autonomy +.228
(p=.0095; element "determine tasks/priorities/goals" +.236) and the authored coupling index +.181
(p=.041) survive; physicality (+.01), responsibility (+.09), and social load (+.08) do not.
Verdicts per modality axis: autonomy SUPPORTED; feedback speed and task identity UNTESTABLE (O*NET
has no such elements — verified); social load and physicality NO INDEPENDENT SIGNAL;
responsibility–control coupling WEAK/SUGGESTIVE (derived formula).

**Honest tension:** prestige is the strongest raw correlate — against the strongest reading of the
central claim; the defensible statement is that autonomy carries signal *beyond* prestige and
education. The Estonian linkage found prestige not significant — cross-country conflict displayed,
not resolved.

**Limitations** (full list in the artifact and results JSON): ecological inference only
(non-homology across levels, van Veldhoven 2025; subjective-vs-objective r=.11, Schmitz 2019);
temporal offset (O*NET ~2019–2023 vs GSS 1988–2006); five-hop probabilistic crosswalk attenuation
(369/502 occupations many-to-many); representative-SOC approximation on the 2018 hop; equal
within-occupation O*NET weighting; coupling index is authored.

## Paper-only citations (PAPER.md) — provenance ledger

These sources are cited in PAPER.md but not in the visualization artifact; their session provenance
(from the literature-scout and citation-checker agents' fetch logs) is recorded here so every
[P]/[S] tag in the paper has a ledger entry:

- **Vainre, Anni, Vainik & Mõttus (2025), PsyArXiv** — **[P]**: full 32-page preprint PDF fetched
  twice this session (scout + citation checker, osf.io/download/j6spz). N=59,042, 263 occupations,
  η²=.07, prestige non-significant — all read from primary text.
- **Schmitz, McCluney, Sonnega & Hicken (2019), IJERPH 16(17):3058** — **[P]**: PMC6747317 full
  text fetched (scout + citation checker); r=.11 confirmed verbatim.
- **van Veldhoven et al. (2025), PLoS ONE 20(7):e0328508** — **[P]**: PMC12289054 fetched (scout).
- **Mostafa & Jaafar (2024), Multidisciplinary Reviews 7(7):e2024142** — **[P]**: full PDF fetched
  (scout); zero O*NET/DOT/GSS mentions confirmed by full-text search.
- **Beard et al. (2022), Epidemiology 33(2):e8–e9** — **[P: workbook]**: the crosswalk workbook was
  downloaded and used as pipeline input, and the PMC record (PMC10280701) fetched; the article text
  itself was not read. (Citation checker corrected the issue number from 33(3) to 33(2).)
- **Roos & Treiman (1980)**, in *Work, Jobs, and Occupations* — **[P: volume]**: NAP volume page
  fetched (scout); the chapter's scale details rest on secondary compilation.
- **Carpenter, Carr, Helppie-McFall & Beckel (2021), Innovation in Aging 5(S1):229–230** — **[S]**:
  bibliographic record confirmed via PMC; not read in full.
- **Törnroos, Jokela & Hakulinen (2019), PAID 145:82–88** — **[S]**: sourced from Vainre et al.'s
  reference list; bibliographic details independently confirmed (title/venue/pages/DOI) by the
  citation checker; the "~1% of variance" figure rests on Vainre et al.'s summary.
- **Deci & Ryan (2000); Hackman & Oldham (1976); Karasek (1979); Humphrey, Nahrgang & Morgeson
  (2007)** — **[U]**: standard-literature citations, bibliographic details confirmed by the
  citation checker, content not independently verified this session.

## Interpretive layer disclosure

The six work-modality axes and all per-role pip ratings are an **authored interpretive framework,
not measured data** — assigned after seeing the measured results (a circularity disclosed in the
artifact). They are visually segregated (dashed panel, interpretive badge, muted pips) and excluded
from the tier system and master table.
