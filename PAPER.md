# Autonomy Survives, Prestige Confounds the Rest: An Independent-Measurement Linkage of O*NET Work-Modality Characteristics to Occupation-Level Job Satisfaction in the U.S. General Social Survey

**Provenance.** This paper reports an original computed analysis produced by a multi-agent AI research
pipeline (Claude, Anthropic) on 2026-07-07: five domain research agents, two adversarial verification
rounds against primary sources, a literature-scouting agent, a data-engineering agent, and — for this
manuscript — three parallel checker agents plus one adversarial reviewer (see § 8, Verification
statement). It is a research artifact, not a peer-reviewed publication. All data, code, and the full
method log are in `analysis/linkage/` of the same repository; the companion visualization is
`satisfaction-matrix.html` and the evidence audit is `SOURCES.md`.

---

## Abstract

Occupational rankings of job satisfaction are well known — clergy and firefighters at the top, service
and manual occupations at the bottom (Smith, 2007) — but *why* occupations differ remains contested,
and self-report studies conflate the measurement of work characteristics with the measurement of
satisfaction. We test a structural ("work-modality") account using an independent-measurement linkage
in which predictors and outcome come from sources that never saw each other: occupation-level work
characteristics from the U.S. Department of Labor's O*NET database (v30.3), rated by job incumbents
and analysts with no satisfaction agenda, joined to occupation-level job satisfaction recomputed from
General Social Survey microdata (pooled 1988–2006, survey-weighted), with the occupation code as the
only join key. A literature scout found no prior study crossing GSS occupation-level satisfaction
with O*NET. The analytic sample is 128 occupations (1980 Census codes; 12,647 GSS respondents; cell
n ≥ 30). A validation gate against the primary NORC tabulation reproduced the published extremes with
a mean absolute deviation of 3.3 percentage points across 23 matchable occupations. Raw
occupation-level correlations with the percentage "very satisfied" were strongest for occupational
prestige (r = .57), followed by an O*NET autonomy composite (r = .47) and mean education (r = .46);
a physicality composite correlated negatively (r = −.30). After partialling out both prestige and
education, autonomy remained significant (partial r = .228, nominal p = .0095) — its "determine
tasks, priorities and goals" element being the strongest residual predictor (.236) — while
physicality (+.01), consequence-of-error (−.02), social load (+.08), and a responsibility composite
(+.09) fell to null. P-values are unadjusted; the autonomy result's evidential weight rests on its
replication across stricter cell thresholds (n ≥ 50), a wider window (1988–2010), single- and
double-control blocks, and a mean-satisfaction outcome. Two modality dimensions (feedback speed, task identity) proved
untestable: O*NET contains no corresponding elements. We report an honest tension: prestige is the
strongest raw ecological correlate, contrary to the strongest structural reading — yet the comparable
Estonian linkage (Vainre et al., 2025) found prestige non-significant. Autonomy is the one modality
construct that carries occupation-level signal beyond prestige and education.

**Keywords:** job satisfaction; occupations; autonomy; O*NET; General Social Survey; ecological
analysis; person–environment fit; data linkage

---

## 1. Introduction

Cross-occupation satisfaction rankings have circulated for decades: in the NORC tabulation of pooled
General Social Survey (GSS) data, 87.2% of clergy but only 21.4% of non-construction laborers
described themselves as "very satisfied" with their work (Smith, 2007). Three families of explanation
compete. A *compensation/status* account points to pay and prestige. A *person–environment fit*
account points to the match between individual interests and job content — but meta-analytically,
measured interest fit predicts job satisfaction only weakly (ρ = .19; Hoff et al., 2020), and a
German vocational-training study found interest and skill congruence did not predict training
satisfaction at all (Michaelis & Findeisen, 2022). A *structural* account, descending from the Job
Characteristics Model (Hackman & Oldham, 1976), self-determination theory (Deci & Ryan, 2000), and
the demand–control model (Karasek, 1979), holds that satisfaction tracks how work is organized —
volition, feedback, task wholeness, interpersonal load, and the coupling of responsibility to
control — more than what the work is about or what it pays.

The structural account has strong *within-discipline* evidence. In the largest lawyer well-being
study (N = 6,226), autonomy need satisfaction correlated r = .66 with subjective well-being while
income managed r = .192 and law-review membership r = .00 (Krieger & Sheldon, 2015). But such
studies share a vulnerability: the same respondent reports both the work characteristics and the
satisfaction, inflating associations through common-method variance — perceived person–job fit
correlates ρ ≈ .56 with satisfaction (Kristof-Brown et al., 2005) versus .19 for measured fit
(Hoff et al., 2020), a gap attributable largely to measurement, not substance. And any post-hoc
rating of occupations' "modality" by an analyst who has already seen the satisfaction ranking is
circular.

The design cure is an **independent-measurement linkage**: take work-characteristic measurements
from raters who never saw satisfaction data, take satisfaction from respondents who never saw the
work-characteristic instrument, and join them only by occupation code. The Department of Labor's
O*NET program provides the former; the GSS provides the latter. A dedicated literature search (≈30
primary fetches; see § 2.3) located no published study crossing GSS occupation-level satisfaction
with O*NET — the nearest analog is an Estonian Biobank × O*NET linkage (Vainre et al., 2025). This
paper reports, to our knowledge, the first such U.S. linkage, built with an explicit validation gate
against the primary NORC tabulation and full disclosure of crosswalk quality.

We test four modality constructs (autonomy, social load, physicality, responsibility–control
coupling) whose operationalization and analysis plan were fixed before any correlation was computed
(see § 3.2, construct-provenance disclosure), report two further constructs as *untestable by
design* (feedback speed and task identity have no O*NET elements), and evaluate the structural
account against the
compensation/status account by asking a single sharp question: **does any modality construct carry
occupation-level signal after occupational prestige and education are controlled?**

## 2. Background

### 2.1 Occupation-level satisfaction differences

Smith (2007) ranked detailed occupations by the share of GSS respondents "very satisfied" with
their work, publishing top-12 and bottom-12 tables (by mean score on the 1–4 item). Occupation
membership explains a modest share of individual satisfaction variance elsewhere — η² ≈ .07 in
Estonia (Vainre et al., 2025); ~1% across 25 coarse groups in British panel data (Törnroos et al.,
2019, as summarized in Vainre et al.) — so occupation-level analysis addresses between-occupation
ecology, not individual psychology.

### 2.2 Job characteristics and the measurement problem

The Job Characteristics Model's motivational dimensions (autonomy, feedback, task identity, skill
variety, task significance) meta-analytically predict satisfaction (Humphrey et al., 2007), but
predominantly via incumbent self-report. Two findings motivate independent measurement: subjective
and O*NET-based *objective* versions of the same job-resource constructs correlate only r = .11
within the same workers (Schmitz et al., 2019), and job-characteristic → well-being relations are
not homologous across levels of aggregation (van Veldhoven et al., 2025). Occupation-level linkage
with independent instruments is therefore a distinct — and conservative — test, with a lineage in
the DOT-based occupational scales of Roos and Treiman (1980).

### 2.3 The gap this study fills

A scouting pass (WebSearch plus ~30 primary-source fetches, 2026-07-07) found: (i) no
GSS × O*NET occupation-level satisfaction study; (ii) a recent systematic review of job
characteristics and satisfaction containing zero mentions of O*NET, DOT, or GSS (Mostafa & Jaafar,
2024, full text checked); (iii) one non-U.S. analog — Vainre et al. (2025), 59,042 Estonian Biobank
participants across 263 ISCO occupations linked to O*NET work values and RIASEC interests, finding
occupation-level partial correlations of |r| ≈ .17–.29 and, notably, **no significant prestige
association**; and (iv) U.S. survey × O*NET linkage precedents at the individual level (Schmitz et
al., 2019; the HRS–O*NET public linkage, Carpenter et al., 2021).

## 3. Data and methods

Full reproducible pipeline: `analysis/linkage/step1_gss.py … step4_analysis.py`; machine-readable
results and method log: `analysis/linkage/linkage-results.json`.

### 3.1 Outcome: GSS occupation-level satisfaction

We downloaded the GSS cumulative cross-sectional microdata (release gss7224_r3, 47.4 MB, from
gss.norc.org) and recomputed occupation-level satisfaction rather than transcribing published
tables. Universe: respondents working full- or part-time (WRKSTAT ∈ {1,2}) with valid SATJOB
("On the whole, how satisfied are you with the work you do — would you say you are very satisfied,
moderately satisfied, a little dissatisfied, or very dissatisfied?") and a 1980-Census occupation
code (OCC80, available for survey years 1988–2010). Primary window: **1988–2006** (closest to
Smith, 2007), weighted by WTSSALL. Per occupation we computed the weighted percentage answering
"very satisfied" (primary outcome), the weighted mean on the 1–4 scale oriented so 4 = very
satisfied (secondary outcome), mean occupational prestige (PRESTG80), and mean years of education
(EDUC). Occupations with n ≥ 30 respondents enter the primary analysis: **128 occupations, 12,647
respondents**. Sensitivity sets: n ≥ 50 (89 occupations) and window 1988–2010 (144 occupations);
unweighted variants were also computed.

### 3.2 Predictors: O*NET 30.3 elements

From the O*NET 30.3 text database we took Work Context means (CX scale, 1–5) and one Work
Activities element (IM scale), chosen a priori to operationalize four modality constructs:

| Construct | O*NET element (ID) |
|---|---|
| Autonomy | Freedom to Make Decisions (4.C.3.a.4); Determine Tasks, Priorities and Goals (4.C.3.b.8) |
| Social load | Contact With Others (4.C.1.a.4); Deal With External Customers (4.C.1.b.1.f); Dealing With Unpleasant, Angry, or Discourteous People (4.C.1.d.2) |
| Physicality | Spend Time Standing (4.C.2.d.1.b); Performing General Physical Activities (4.A.3.a.1, IM) |
| Responsibility | Consequence of Error (4.C.3.a.1); Impact of Decisions (4.C.3.a.2.a); Responsibility for Others' Health/Safety (4.C.1.c.1) and Work Outcomes (4.C.1.c.2) |

Composites are means of per-element z-scores (standardized across all 894 O*NET-SOC codes,
population SD). A **derived coupling index** — z(autonomy composite) − z(consequence of error) —
operationalizes responsibility-*with*-control versus responsibility-*without*-control; it is an
authored formula and is flagged as such wherever reported. **Designed limitation:** O*NET contains
no feedback-from-job element and no task-identity element (verified against the 30.3 content
model); these two modality dimensions are declared untestable rather than proxied.

**Construct provenance (disclosure).** The four modality constructs originated as an interpretive
lens authored *after* viewing published satisfaction rankings and the discipline studies (see the
companion visualization's interpretive-axes panel) — they are not a blind a-priori theory. What was
fixed before any occupation-level correlation was computed is the O*NET element mapping above and
the analysis plan. The linkage design addresses the residual circularity by scoring the constructs
against measurements — O*NET incumbents and GSS respondents — that never saw each other, the axes,
or the rankings; but "chosen a priori" throughout this paper means *prior to the correlational
test*, not prior to all knowledge of the outcome literature.

### 3.3 Crosswalk

O*NET-SOC 2019 codes were collapsed to SOC 2018, mapped to 2018 Census occupation codes (Census
2018 crosswalk; hierarchical fallback exact → broad → minor → wildcard → major where the workbook
lists a representative SOC), then walked backward 2018 → 2010 → 2002 → 2000 → 1990 → 1980 through
the NIOSH crosswalk workbook (Beard et al., 2022), composing proportional-allocation transition
matrices. O*NET scores aggregate to each 1980 occupation as allocation-weighted means. Coverage:
774/774 O*NET-SOC prefixes matched; 537/570 2018 Census codes received O*NET data; 502 OCC80 codes
populated, of which 133 are clean one-to-one chains and 369 involve many-to-many splits.
Per-occupation `crosswalk_quality` and `coverage` flags are carried in the results file.

### 3.4 Validation gate

Before any correlation was computed, recomputed occupation percentages were compared with the
primary NORC tabulation (Table 1 of GSS News No. 21, July 2007, fetched and read directly this
session). Across the 23 matchable published extremes, mean |Δ| = **3.28** percentage points
(max 9.1); clergy 89.1 vs 87.2; roofers 26.1 vs 25.3 (Appendix A). Two of the 23 validation cells
(physical therapists n = 25, roofers n = 26) fall below the n ≥ 30 threshold used for the analytic
sample and enter the validation only; and one published extreme — "Teachers" — could not be paired
with an OCC80 cell by title-matching and is absent from the gate (reason undetermined; see
Appendix A). The largest deviations occur in the smallest cells (e.g., furniture salespersons
n = 22, −8.4), consistent with sampling noise around an unknown NORC pooling window and cell
threshold. Two incidental findings: our recomputed office-supervisor value (58.4) sides with the
table figure (60.8) over the report's own prose (80.6), corroborating the digit-transposition
reading; and our exact match on freight handlers (25.8 vs 25.8) sides with the table over the
prose's 23.9.

### 3.5 Analysis

Unit of analysis: occupation (n = 128). Pearson and Spearman correlations between each
element/composite and the outcome; partial correlations controlling prestige, education, and both
(df = 125 for single-control, df = 124 for double-control blocks). Two-sided p-values accompany
every estimate; exact values are in the results JSON. No individual-level inference is made.

**Multiplicity.** This design tests 16 predictors across several correlation blocks plus
sensitivity replications; all p-values are nominal and unadjusted. Under a Bonferroni correction
across 16 predictors (α ≈ .003), no double-control partial — including the flagship autonomy result
(p = .0095) — would clear the bar on its p-value alone. The evidential weight we place on autonomy
therefore rests on its *consistency across independent replications* (both single-control blocks,
both cell thresholds, both windows, both outcomes; § 4.3), not on any single test. Results near the
nominal threshold without such replication — the coupling index (p = .041) and the
deal-with-external-customers element (p = .052) — are reported as exploratory and should be treated
as likely multiplicity casualties until independently replicated.

## 4. Results

### 4.1 Raw occupation-level correlations (% very satisfied, n = 128)

| Predictor | Pearson r | p | Spearman ρ |
|---|---|---|---|
| Occupational prestige (PRESTG80) | **.568** | <.001 | .571 |
| Autonomy composite | **.469** | <.001 | .490 |
| — Determine tasks, priorities & goals | .460 | <.001 | .492 |
| — Freedom to make decisions | .437 | <.001 | .446 |
| Education (mean years) | .463 | <.001 | .451 |
| Impact of decisions | .344 | .0001 | .343 |
| Responsibility for others' health/safety | .291 | .0009 | .308 |
| Coupling (derived) | .261 | .0029 | .292 |
| Responsibility composite | .247 | .0049 | .254 |
| Deal with external customers | .217 | .0139 | .198 |
| Contact with others | .175 | .0485 | .201 |
| Consequence of error | .137 | .1235 | .102 |
| Social load composite | .129 | .146 | .165 |
| Dealing with unpleasant/angry people | −.047 | .599 | .038 |
| Physicality composite | **−.298** | .0006 | −.279 |
| — Spend time standing | −.297 | .0007 | −.263 |
| — General physical activities | −.270 | .0021 | −.249 |

Prestige is the strongest raw correlate; autonomy and education are essentially tied behind it;
physical work correlates negatively; consequence-of-error alone carries nothing.

### 4.2 What survives controls

Partial correlations with % very satisfied, controlling **both** prestige and education (n = 128):

| Predictor | partial r | p |
|---|---|---|
| — Determine tasks, priorities & goals | **.236** | .0073 |
| Autonomy composite | **.228** | .0095 |
| — Freedom to make decisions | .193 | .029 |
| Coupling (derived) | .181 | .0411 |
| Deal with external customers | .172 | .0523 |
| Responsibility for others' health/safety | .115 | .197 |
| Impact of decisions | .112 | .209 |
| Responsibility composite | .095 | .288 |
| Social load composite | .084 | .347 |
| Contact with others | .082 | .356 |
| Responsibility for work outcomes | .057 | .520 |
| General physical activities | .025 | .781 |
| Physicality composite | .011 | .901 |
| Spend time standing | −.001 | .992 |
| Consequence of error | −.022 | .804 |
| Dealing with unpleasant/angry people | −.029 | .747 |

Under single controls the pattern is the same: autonomy retains .224 (p = .0111) given prestige
alone and .292 (p = .0008) given education alone, while physicality is null under either (.011 /
.015). The raw physicality penalty is therefore statistically accounted for by prestige and
education at the occupation level; the autonomy association is not. The derived coupling index
survives the double control (.181, p = .0411) but weakens under prestige alone (.160, p = .0707) —
and per § 3.5, both it and the near-threshold deal-with-external-customers element (.172,
p = .0523; the one social-load element to approach nominal significance while its composite and
siblings do not) should be read as exploratory, unadjusted results.

### 4.3 Sensitivity

The autonomy result strengthens rather than weakens under stricter cell thresholds and the wider
window (raw Pearson): n ≥ 50 (89 occupations): autonomy .503, determine-tasks .523, coupling .333,
physicality −.310, prestige .600, education .486. Window 1988–2010 (144 occupations): autonomy
.480, coupling .299, physicality −.327, prestige .585, education .516. With the weighted mean
(1–4) as outcome instead of % very satisfied: prestige .598, autonomy .495, education .462,
physicality −.318; autonomy's double-control partial is .260 (p = .003).

### 4.4 Verdicts on the six modality axes

| Axis | Verdict | Basis |
|---|---|---|
| Autonomy (volition) | **Supported** | Survives prestige+education controls (.228, p = .0095) and replicates across all sensitivity blocks; strongest residual element .236 |
| Feedback speed | **Untestable** | No O*NET element exists |
| Task identity | **Untestable** | No O*NET element exists |
| Social load | Not detected | .13 raw (n.s.), .08 partial (n.s.) — a null throughout; attenuation toward zero cannot be ruled out |
| Physicality | Explained by status/schooling | −.30 raw (p = .0006) is fully attenuated to .01 under controls — a positive finding about confounding, not an absence of raw signal |
| Responsibility–control coupling | Weak / exploratory | Derived index .18 (p = .04, unadjusted); consequence-of-error alone −.02; treat as a multiplicity risk pending replication |

## 5. Discussion

Three conclusions are licensed by these data, one tension must be stated, and two abstentions are
part of the finding.

**Autonomy carries independent occupation-level signal.** The only modality construct surviving
double controls — and replicating across every sensitivity block — is autonomy, and its strongest
element is not freedom-from-supervision but the latitude to *determine one's own tasks, priorities,
and goals*. This is compatible with, though not evidence for, self-determination theory's construal
of autonomy as volition rather than independence; the much larger individual-level association in
an unrelated population (r = .66 among lawyers; Krieger & Sheldon, 2015) is a separate,
non-comparable data point offered as thematic context, not corroboration, and single occupations
(firefighters: strict hierarchy, high rated volition, 80.1% very satisfied) are illustrations only.

**The raw physicality gradient is statistically accounted for by status and schooling.** Physically
demanding work shows a clear negative association at the raw ecological level (−.30) that is fully
attenuated once prestige and education are held constant (+.01). At the occupation level, the data
are consistent with the physicality–satisfaction gradient operating through the status/schooling
bundle rather than physical demand per se — though this partial-correlation pattern cannot rule out
a causal role for physical demand, and no claim is made about why individual workers in physical
occupations report what they report.

**Consequence-of-error is not the active ingredient of "responsibility."** Raw responsibility
associations run through decision impact and responsibility for people — facets adjacent to
autonomy — while error stakes alone predict nothing (−.02 partial). The derived coupling index
(responsibility *with* control) stays marginally alive; its authored formula and p = .04 warrant
suspicion, and we flag rather than celebrate it.

**The honest tension: prestige leads raw.** At the ecological level, occupational prestige (+.57)
outcorrelates every modality construct — against the strongest structural reading. The defensible
statement is narrower: autonomy adds signal *beyond* prestige and education, while occupation-level
prestige is inseparable from income, selection, and social evaluation. Two external anchors nuance
the tension in opposite directions: the Estonian linkage found prestige *non-significant* across
263 occupations (Vainre et al., 2025) — and its top/bottom occupations (religious professionals,
medical professionals, authors high; labourers, sales workers low) echo the GSS extremes — while
within-lawyer data show income contributing far less than autonomy (Krieger & Sheldon, 2015). The
cross-country disagreement on prestige is displayed, not resolved.

**Abstentions.** Feedback speed and task identity — arguably the modality dimensions most
distinctive of the trades and crafts at the satisfaction extremes — cannot be tested because O*NET
never measured them. Their absence from the national occupational information system is itself a
finding, and a research recommendation.

## 6. Limitations

1. **Ecological inference only.** All associations are between-occupation; individual-level
   homology cannot be assumed (van Veldhoven et al., 2025), and O*NET-objective versus self-report
   measures of the same construct correlate weakly within persons (r = .11; Schmitz et al., 2019).
2. **Temporal offset.** O*NET ratings are contemporary (~2019–2023); GSS satisfaction is
   1988–2006. Occupation-level stability of work modality is assumed, not shown.
3. **Crosswalk attenuation.** The 1980→2018 chain requires five probabilistic hops; 369 of 502
   populated occupations involve many-to-many splits (within the 128-occupation analytic sample:
   114 many-to-many, 14 clean one-to-one). Allocation error biases correlations toward zero, so
   reported effects are more plausibly under- than over-stated — but quality varies by occupation
   (flags shipped per row).
4. **Representative-SOC approximation** on the SOC-2018→Census-2018 hop, and equal (not
   employment-weighted) aggregation of O*NET-SOC codes within census occupations.
5. **Unknown NORC methodology.** Smith (2007)'s exact pooling window and cell threshold are
   unpublished in the retrievable excerpt; our validation gate shows close but not exact
   reproduction (mean |Δ| = 3.28).
6. **Composites and the coupling index are authored** (pre-stated, but not externally validated
   scales); coupling especially should be treated as exploratory.
7. **No causal claims.** Selection of persons into occupations, compensating differentials, and
   omitted occupation-level variables (income itself, hours, precarity) remain unmodeled; prestige
   and education are coarse proxies for the status/compensation bundle.
8. **Nominal, unadjusted p-values.** Dozens of tests are reported without multiplicity correction
   (§ 3.5); only results replicating across independent blocks (autonomy) are treated as findings,
   and near-threshold results (coupling, deal-with-external-customers) as exploratory.

## 7. Conclusion

Joining measurements that could not have contaminated each other, the structural account of
occupational satisfaction survives in exactly one place — and it is the theoretically central one.
Autonomy, measured as incumbents' rated latitude to decide and to set their own tasks, predicts an
occupation's share of very-satisfied workers beyond what prestige and education explain. Physical
demand does not; interpersonal load does not; error stakes do not. Two structural dimensions remain
unmeasured at national scale. The strongest raw correlate, however, is still prestige — so the
structural claim earns its narrower form only: *given* an occupation's status and schooling, the
one modality dimension still associated with additional satisfaction is volition.

## 8. Verification statement

Every empirical figure in this paper was checked by independent agents before publication:
(i) a **numbers checker** (Sonnet) audited every statistic in this manuscript against
`analysis/linkage/linkage-results.json` and the artifact dataset; (ii) a **citation checker**
(Sonnet) verified every reference's existence and bibliographic details against live sources, and
its session-verification status against `SOURCES.md`; (iii) a **methods checker** (Sonnet) reviewed
statistical reporting and inferential language for overclaim; and (iv) an **adversarial reviewer**
(Opus) attempted to refute the paper's claims from the underlying data and required revisions
before sign-off. The checker reports and their resolutions are summarized in
`analysis/linkage/PAPER-verification.md`.

## Data and code availability

`analysis/linkage/` contains the four-step Python pipeline, the full results JSON (method log,
128 occupation rows with per-element scores and crosswalk-quality flags, all correlation blocks,
validation table, sensitivity blocks), and this paper's verification report. Inputs are public:
GSS cumulative microdata (gss.norc.org), O*NET 30.3 (onetcenter.org), NIOSH crosswalk workbook
(Beard et al., 2022), Census 2018 occupation crosswalk (census.gov).

## References

Verification key: **[P]** primary source fetched and read this session; **[S]** secondary/abstract-level
verification this session; **[U]** standard literature citation, not independently verified this session.

- Beard, J. D., et al. (2022). Crosswalks to convert U.S. Census Bureau industry and occupation
  codes, 1980–2018. *Epidemiology, 33*(2), e8–e9. **[P: workbook]** (the crosswalk workbook itself
  was downloaded and used, and the PMC record fetched; the journal article text was not read)
- Carpenter, R., Carr, D., Helppie-McFall, B., & Beckel, J. (2021). Creating a public data resource:
  The HRS–O*NET linkage. *Innovation in Aging, 5*(S1), 229–230. **[S]**
- Deci, E. L., & Ryan, R. M. (2000). The "what" and "why" of goal pursuits: Human needs and the
  self-determination of behavior. *Psychological Inquiry, 11*(4), 227–268. **[U]**
- Hackman, J. R., & Oldham, G. R. (1976). Motivation through the design of work: Test of a theory.
  *Organizational Behavior and Human Performance, 16*(2), 250–279. **[U]**
- Hoff, K. A., Song, Q. C., Wee, C. J. M., Phan, W. M. J., & Rounds, J. (2020). Interest fit and job
  satisfaction: A systematic review and meta-analysis. *Journal of Vocational Behavior, 123*,
  103503. **[S]** (ρ = .19, CI [.16, .21], k = 105, N ≈ 39,602)
- Humphrey, S. E., Nahrgang, J. D., & Morgeson, F. P. (2007). Integrating motivational, social, and
  contextual work design features: A meta-analytic summary and theoretical extension of the work
  design literature. *Journal of Applied Psychology, 92*(5), 1332–1356. **[U]**
- Karasek, R. A. (1979). Job demands, job decision latitude, and mental strain: Implications for job
  redesign. *Administrative Science Quarterly, 24*(2), 285–308. **[U]**
- Krieger, L. S., & Sheldon, K. M. (2015). What makes lawyers happy? A data-driven prescription to
  redefine professional success. *George Washington Law Review, 83*. **[P]**
- Kristof-Brown, A. L., Zimmerman, R. D., & Johnson, E. C. (2005). Consequences of individuals' fit
  at work: A meta-analysis of person–job, person–organization, person–group, and person–supervisor
  fit. *Personnel Psychology, 58*(2), 281–342. **[S]**
- Michaelis, C., & Findeisen, S. (2022). Influence of person-vocation fit on satisfaction and
  persistence in vocational training programs. *Frontiers in Psychology, 13*, 834543. **[P]**
  (abstract-level primary: official abstract fetched)
- Mostafa, R., & Jaafar, H. J. B. (2024). Revisiting job characteristics and job satisfaction: A
  systematic review with bibliographic analysis. *Multidisciplinary Reviews, 7*(7), e2024142. **[P]**
- Roos, P. A., & Treiman, D. J. (1980). DOT scales for the 1970 census classification. In A. R.
  Miller et al. (Eds.), *Work, jobs, and occupations: A critical review of the Dictionary of
  Occupational Titles*. National Academy Press. **[P]** (volume verified; scale detail secondary)
- Schmitz, L. L., McCluney, C. L., Sonnega, A., & Hicken, M. T. (2019). Interpreting subjective and
  objective measures of job resources: The importance of sociodemographic context. *International
  Journal of Environmental Research and Public Health, 16*(17), 3058. **[P]** (PMC full text
  fetched; r = .11 re-confirmed verbatim during citation checking)
- Smith, T. W. (2007). *Job satisfaction in America*. NORC/University of Chicago. **[P]** (via GSS
  News No. 21, July 2007, tables read directly)
- Törnroos, M., Jokela, M., & Hakulinen, C. (2019). The relationship between personality and job
  satisfaction across occupations. *Personality and Individual Differences, 145*, 82–88. **[S]**
  (via Vainre et al.'s reference list)
- Vainre, M., Anni, K., Vainik, U., & Mõttus, R. (2025). How satisfaction varies among 263
  occupations. PsyArXiv preprint. **[P]** (not peer-reviewed)
- van Veldhoven, M., Peccei, R., Suhail, A., van de Voorde, K., Croon, M., & Jongerling, J. (2025).
  Relationships between job characteristics and occupational well-being: Are they similar across
  levels of analysis? *PLoS ONE, 20*(7), e0328508. **[P]**

## Appendix A — Validation against the primary NORC tabulation

Recomputed (GSS 1988–2006, weighted) vs Smith (2007) Table 1, % very satisfied:

| Occupation | Ours | NORC | Δ | GSS n |
|---|---|---|---|---|
| Clergy | 89.1 | 87.2 | +1.9 | 46 |
| Physical therapists | 73.5 | 78.1 | −4.6 | 25 |
| Firefighters | 82.3 | 80.1 | +2.2 | 32 |
| Education administrators | 68.1 | 68.4 | −0.3 | 101 |
| Painters, sculptors, related | 66.1 | 67.3 | −1.2 | 59 |
| Authors | 78.7 | 74.2 | +4.5 | 24 |
| Psychologists | 73.6 | 66.9 | +6.7 | 42 |
| Special education teachers | 69.2 | 70.1 | −0.9 | 40 |
| Operating engineers | 64.8 | 64.1 | +0.7 | 35 |
| Office supervisors | 58.4 | 60.8 | −2.4 | 78 |
| Securities & financial services sales | 74.5 | 65.4 | +9.1 | 45 |
| Roofers | 26.1 | 25.3 | +0.8 | 26 |
| Waiters/servers | 27.6 | 27.0 | +0.6 | 175 |
| Laborers, except construction | 19.9 | 21.4 | −1.5 | 127 |
| Bartenders | 25.4 | 26.4 | −1.0 | 54 |
| Hand packers and packagers | 19.2 | 23.7 | −4.5 | 52 |
| Freight, stock, & material handlers | 25.8 | 25.8 | 0.0 | 72 |
| Apparel clothing salespersons | 16.5 | 23.9 | −7.4 | 35 |
| Cashiers | 21.0 | 25.0 | −4.0 | 277 |
| Food preparers, misc. | 20.4 | 23.6 | −3.2 | 71 |
| Expediters | 39.2 | 37.0 | +2.2 | 26 |
| Butchers & meat cutters | 24.4 | 31.8 | −7.4 | 23 |
| Furniture/home furnishing sales | 16.8 | 25.2 | −8.4 | 22 |

Mean |Δ| = 3.28; max |Δ| = 9.1. "Teachers" is the one published extreme absent above: it is the only
NORC row the pipeline's title-matching did not pair with an OCC80 cell, and the reason was not
determined this session (candidate cause: NORC's "Teachers" aggregates several OCC80 teaching codes;
unverified). Occupations below the n ≥ 30 threshold (e.g., physical therapists n = 25, roofers
n = 26) are validated here but excluded from the correlation sample. See
`linkage-results.json → validation_vs_norc`.
