# SOURCES — satisfaction-matrix.html

Every citation used by the artifact, with its final confidence tier and what the verification
pass could and could not confirm. Built 2026-07-07 by five parallel research agents (one per
domain) plus one independent adversarial verifier agent that re-checked every figure with
freshly-phrased searches and attempted primary fetches.

**Session constraint (applies to every tier below):** the research environment's egress
network policy returned HTTP 403 at the gateway for almost all external hosts. Web search
worked; direct fetching of primary sources did not — with one exception (an S3 mirror of
Krieger & Sheldon 2015, fetched successfully by two agents independently). Consequently
exactly one source cluster is T1; everything else is capped at T2 (multi-query-consistent
secondary evidence) or T3 (contested). A future session with open egress could promote most
T2 figures by checking them against primary texts.

Tier definitions:
- **T1** — verified against the primary source this session (source fetched, figure seen in text)
- **T2** — secondary citation, consistent across independently-phrased searches; primary not verified
- **T3** — contested across sources or known-confounded; the conflict is displayed, never resolved silently
- **REMOVED** — circulated figure that failed verification; listed in the artifact's "failed verification" panel

---

## Cross-occupation (NORC/GSS)

**Smith, T.W. (2007). *Job Satisfaction in the United States.* NORC/University of Chicago.**
Pooled General Social Survey data, >27,000 respondents. Metric: % "very satisfied" with job.
- Primary PDF (gss.norc.org / UChicago news release) **not fetchable** — every occupation figure is at most T2.
- **T2** (exact value independently returned in multiple differently-phrased searches): clergy 87.2
  (an 87.3 variant appeared once; resolved to 87.2), firefighters 80.1, physical therapists 78.1,
  waiters/servers 27.0, bartenders 26.4, laborers-except-construction 21.4, workforce average ≈47.
- **T3** (occupation's presence on the top/bottom list confirmed; exact decimal from a single search
  synthesis, not independently re-retrieved): authors 74.2, special education teachers 70.1,
  teachers 69.2, education administrators 68.4, painters/sculptors 67.3, psychologists 66.9,
  freight/stock handlers 25.8, furniture sales 25.2, cashiers 25.0, apparel sales 23.9 (rank as
  7th-least corroborated), hand packers 23.7, misc. food preparation 23.6.
- **T3 with named conflict**: roofers 25.3 — several secondary write-ups call roofers the single
  least-satisfied occupation; laborers (21.4) are numerically lower on *satisfaction*, while roofers
  are lowest on the report's separate *happiness* measure (14% "very happy").
- **REMOVED**: office supervisors 80.6 (numerically incoherent with the published ranking;
  fabrication-suspect search-synthesis artifact); operating engineers 64.1 (occupation is a genuine
  top-12 member, value untraceable → rendered NO DATA); security/financial services sales
  (top-12 member, no percentage found anywhere → NO DATA).
- Could not confirm: pooling window (1988–2006 module vs 1972–2006 cumulative), per-occupation
  sample sizes, minimum-N inclusion threshold, and the entire middle of the distribution.

## Healthcare

**Halasy, West, Shanafelt, O'Laughlin, Satele & Dyrbye (2021). "PA job satisfaction and career
plans." JAAPA 34(6). — T2.** 82.7% of PAs satisfied with their job; 32.2% intent to leave; 19.5%
intent to reduce hours. Random sample of 2,100 PAs (Redi-Data). Confirmed across queries; the LWW
full text was not fetchable, and the final analyzed respondent N could not be located. Verified
correction: survey fielded **2016** — not a COVID-era study despite the 2021 publication date.

**Starkel, Guay, Lo Sasso, Vujicic & Warren (2015). "Practice settings and dentists' job
satisfaction." JADA. — study real, headline figure REMOVED.** N=2,171 (596 solo / 710 small
group / 865 large group) confirmed. The circulating "48% satisfied" headline could not be confirmed
by any source; the artifact shows the study as a comparative-by-setting finding with NO headline figure.

**Merck Animal Health Veterinary Wellbeing Study II (2020, with AVMA/Brakke Consulting). — T2/T3.**
74% of veterinarians somewhat/extremely satisfied with their career (T2; N=2,871 usable of 20,000
invited, fielded Sept–Oct 2019). The seed value 65% matched no wave or metric — REMOVED.
"Would recommend the profession" is **T3, three-way contested**: 41% overall per Merck.com (24%
for ≤34, 62% for ≥65), 48% per one secondary source, 33% per dvm360 — all three displayed.

**Medscape Physician Burnout & Depression Report 2024. — T2 (extremes only).** N=9,226 US
physicians, 29+ specialties; overall 49% burnout / 20% depression. Verified extremes: Emergency
Medicine 63, OB/GYN 53, Family Medicine 51 (high); Otolaryngology 43, Pathology 41, Ophthalmology
39, Psychiatry 39, Plastic Surgery 37 (low). The ~20 middle specialties sit behind Medscape
registration and are rendered as an explicit NO DATA band. Caveats displayed: press coverage
conflates report-year with survey-year; AMA's separate survey (42–43.9%, 2025) is a different
instrument and is never merged.

**Shanafelt et al. longitudinal physician burnout series (≥1 MBI symptom). — T2.**
2011: 45.5% (3,310/7,227; Arch Intern Med 2012;172:1377) · 2014: 54.4% (3,680/6,767; Mayo Clin
Proc 2015;90:1600) · 2017: 43.9% (2,147/4,893; Mayo Clin Proc 2019;94:1681) · 2020: 38.2%
(n≈7,510; Mayo Clin Proc 2022) · 2021: 62.8% (n=2,440; Mayo Clin Proc 2022 COVID wave; work-life
integration satisfaction fell to 30.2%) · 2023: 45.2% (N=7,643; Mayo Clin Proc 2025). Values from
indexed abstracts with exact numerators/denominators; primary PDFs not fetchable. The circulating
"48.2% in 2023" seed was wrong — REMOVED.

**REMOVED — "Physicians 44% satisfied (Dyrbye 2013)."** Found nowhere. Dyrbye et al. 2013 (Mayo
Clin Proc 88:1358) measures whether physicians would recommend medicine (52–57%), not a 44%
satisfaction rate. Physician satisfaction is rendered as a deliberate NO DATA cell.

## Law

**Krieger & Sheldon (2015). "What Makes Lawyers Happy? A Data-Driven Prescription to Redefine
Professional Success." 83 Geo. Wash. L. Rev.; SSRN 2398989. — T1 (the only T1 cluster).**
The full PDF was fetched twice this session (research agent + verifier independently; the verifier
extracted text by decompressing the PDF streams). Confirmed against primary text: N=6,226 working
sample (7,805 total; 12.7% response; 4 US state bars); SWB composite metric (life satisfaction +
net affect); correlations with SWB — autonomy .66, relatedness .65, competence .63, internal
motivation .55, supervisor autonomy support .44, intrinsic values .30, income .192, class rank .12,
USNWR school rank .05, law review .00 (n.s.), billable hours −.10; setting means — Judges 5.76
(N=141) > Public service 4.98 (N=1,091) > Prestige 4.86 (N=1,434) > Other 4.71 (N=2,852); public
service > prestige on well-being despite substantially lower income.

**Dinovitzer et al. (2014). *After the JD III.* American Bar Foundation/NALP. — T2.** 76% of Wave III
respondents (fielded 2012–13) moderately/extremely satisfied with the decision to become a lawyer
(mean 3.92/5); public-interest lawyers most satisfied of the settings. ABF PDF not fetchable;
confirmed via NCBEX Bar Examiner and ABA Journal coverage.

**Heinz, Hull & Harter (1999). "Lawyers and Their Discontents." 74 Ind. L.J. 735; and Hull (1999),
52 Vand. L. Rev. — T2.** ~800 Chicago lawyers: 45.2% very satisfied + 38.5% satisfied (83.7%).
Counter-finding displayed: firm size was NOT a significant predictor of dissatisfaction.
The seed claim "large-firm practice least satisfying after controls (Hull 1999)" is **REMOVED**
as contradicted by the actual finding.

**Dinovitzer & Garth (2007). 41 Law & Society Rev. 1. — T2 (directional only).** Content-vs-context
satisfaction distinction; magnitudes not verified.

**Chambers (2014). "Overstating the Satisfaction of Lawyers." 39 Law & Social Inquiry 313. — T2.**
Methodological counterpoint (ambivalence, survivorship bias, non-response bias); displayed
alongside the surveys, not adjudicated.

**REMOVED — "Income inequality within a field depresses income satisfaction (Sandefur & Heinz
1999)."** Not found as stated; closest matches are an unpublished Law & Society Association
conference paper and the *Urban Lawyers* monograph (2005). No verifiable figure.

**Roach Anleu & Mack, national Australian judicial surveys (2008 JJA overview; 2014/2017 waves).
— T2.** ~90% of magistrates satisfied/very satisfied (approximate); satisfaction concentrated in
intrinsic aspects; magistrates 47% vs judges 31% "work always/often emotionally draining";
magistrates less satisfied with control over workload. SSRN PDFs not fetchable.

**Schrever, Hulbert & Sourdin (2019), J. Judicial Administration 28(3):141; and (2022) "Where
Stress Presides," Psychiatry, Psychology & Law (PMC9225743). — T2.** N=152 judicial officers,
5 Australian courts; 52.9% moderate-to-very-high K10 distress vs 32.8% general population;
magistrates > judges on all stress variables and lower on autonomy/relatedness satisfaction, the
gap reported as almost entirely explained by those two needs. A "28.7%" subfigure sometimes quoted
could not be verified and is not used.

**Gap (confirmed):** no rigorous, controlled study of satisfaction by legal doctrine (tax vs
litigation vs corporate). Only uncontrolled trade surveys exist (Vault ~17,000 self-selected
large-firm associates; Above the Law; Law360 Pulse).

## Academia

**French, Allen, Miller, Kim & Centeno (2020). J. Vocational Behavior 120:103443. — T2.** N=1,270
faculty, 11 universities, one US southeastern state; latent profile analysis. "Classic" dual
profile highest satisfaction & work-family balance; teaching-focused profile lowest. Profile-level
means not retrievable — the artifact shows only the verified ordering, no numbers. **Seed
correction (REMOVED claim):** no significant profile differences in turnover intentions or
affective commitment — the circulating turnover claim is wrong.

**Bozeman & Gaughan (2011). J. Higher Education 82(2):154–186. — T2 (direction only).** Teaching-
undergrad hours negatively associated with satisfaction; research/grant hours no significant
relation; tenured > untenured; salary equity and colleague respect strong positives. Exact N could
not be located after repeated targeted searches and is deliberately reported as unknown.

**Frei & Grund (2022). "Working-time mismatch and job satisfaction of junior academics."
J. Business Economics 92(7):1125–1166. — T2 with scope caveat.** Total actual-vs-desired HOURS
mismatch lowers satisfaction; overemployment worse than underemployment. This is hours mismatch,
not teaching/research/service allocation fit — the closest real study to the allocation thesis,
displayed with that caveat. N not retrievable.

**Faculty time allocation at HBCUs, Frontiers in Psychology (2021), PMC8548608. — T3.** Documents
current-vs-ideal-vs-expected allocation discrepancies by gender/tenure/URM; whether discrepancies
were statistically linked to satisfaction could not be confirmed — displayed as an unresolved cell.

**Gap (confirmed, search-limited):** no located study treats preferred-vs-actual allocation fit as
a moderator/interaction on satisfaction; all located studies are main effects or profile
comparisons. Citation-network searching was blocked this session, so this is "not found in a
genuine search," not proof of absence.

## Meta-analytic layer

**Hoff, Song, Wee, Phan & Rounds (2020). "Interest fit and job satisfaction: a systematic review
and meta-analysis." J. Vocational Behavior 123:103503. — T2.** ρ=0.19, 95% CI [.16, .21]; k=105
studies (194 effects), N≈39,602, ~65 years of research. Stronger for career-choice/occupational
satisfaction than day-to-day facet satisfaction; measurement approach moderates. Confirmed across
4+ independent sources (Illinois Experts, ScienceDaily, UH press, EconBiz).

**Hoff, Wee, Song, Phan & Rounds (2018). Academy of Management Proceedings. — T2, disambiguation
entry.** ρ=0.11 (k=107, 945 correlations, N=38,695) for vocational interest **level** — a different
construct from fit. Kept as a separate entry specifically to prevent conflation with the 2020 figure.

**Wiegand, Drasgow & Rounds (2021). "Misfit matters: A re-examination of interest fit and job
satisfaction." J. Vocational Behavior 125:103524. — T2 (qualitative direction only).** Polynomial
regression/response-surface across two large samples: misfit asymmetry direction differs by RIASEC
dimension (Investigative/Artistic: satisfaction rises monotonically deficiency→fit→excess;
Enterprising/Conventional: opposite), supporting complementary (needs-supplies) fit. Numeric
surface parameters and sample Ns not retrievable — none are shown.

**Michaelis & Findeisen (2022). "Influence of Person-Vocation Fit on Satisfaction and Persistence
in Vocational Training Programs." Frontiers in Psychology 13:834543. — T2.** German NEPS data,
N=4,097 VET trainees. **Null result, displayed unsoftened:** neither interest congruence nor skill
congruence significantly predicted training satisfaction; only Realistic-interest congruence
reduced premature contract termination; moderate overeducation *enhanced* satisfaction. Construct
scope displayed: training satisfaction, not general job satisfaction. (The verifier notes the
search engine self-corrected a deliberately wrong author guess to these authors — evidence against
query-echo confabulation.)

**Kristof-Brown, Zimmerman & Johnson (2005). Personnel Psychology 58(2):281–342. — T2.** k=172
studies, 836 effects. The input conflict (".44 vs .56") was resolved by independent search:
**ρ≈.56 = person-JOB fit → satisfaction; ρ≈.44 = person-ORGANIZATION fit → satisfaction** — two
different dimensions, not a discrepancy. Construct flag displayed: perceived/self-reported fit is
structurally inflated versus measured interest congruence; the ~3× gap versus Hoff's 0.19 is a
construct difference, not a contradiction.

---

## What the verifier could NOT confirm (rendered as NO DATA or removed)

1. Office supervisors 80.6% (NORC) — incoherent, fabrication-suspect
2. Operating engineers 64.1% (NORC) — occupation real, value untraceable
3. Security/financial services sales % (NORC) — no value anywhere
4. NORC mid-distribution occupations, per-occupation Ns, inclusion threshold, pooling window
5. Physicians "44% satisfied (Dyrbye 2013)" — nonexistent
6. Dentists "48%" headline (Starkel 2015) — study real, number unconfirmed
7. Veterinarians "65%" (Merck) — matches nothing
8. Shanafelt 2023 "48.2%" — actual figure 45.2%
9. Halasy final respondent N — not located
10. Bozeman & Gaughan exact N — not located
11. Frei & Grund exact N — not located
12. Wiegand numeric effect sizes and Ns — not located
13. "Large-firm least satisfying after controls (Hull 1999)" — contradicted
14. "Income inequality depresses income satisfaction (Sandefur & Heinz 1999)" — not found as stated
15. "Teaching-heavy profile highest turnover intention (French 2020)" — contradicted
16. Schrever "28.7%" subfigure — unverifiable, unused

## Interpretive layer disclosure

The six work-modality axes (autonomy-as-volition, feedback speed, task identity, social load,
physicality, responsibility–control coupling) and all per-role pip ratings are an **authored
interpretive framework, not measured data**. They are visually segregated in the artifact (dashed
panel, interpretive badge, muted pips) and excluded from every data panel and the master table's
tier system.
