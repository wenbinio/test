# LIT-01 — Supervisor and Anchor Literature: Reading Digest

**Agent:** LIT-01 · **Retrieval date:** 3 September 2026 · **Format:** digest (headed entries, bullets, tables — not paper prose)

**Retrieval scorecard**

| # | Anchor | Identified | Full text retrieved | Route |
|---|---|---|---|---|
| 1 | "Allen, IDPL 2025" | **Yes, definitively** — but it is **not** about the DAT Act (see §1.1) | **No** | OUP 403 to curl, WebFetch, Playwright; Unpaywall `oa_status: closed`, `has_repository_copy: false`; SSRN 403; Europe PMC 0 hits. Landing-page summary only. |
| 2 | Scheibner, Hardin, Keech & Richards, *Data & Policy* 2025 | Yes | **Yes** (20 pp) | Cambridge OA PDF via curl, `cambridge.org/core/services/aop-cambridge-core/content/view/S2632324925100382` (HTTP 200) |
| 3 | Olsen et al., *npj Digital Medicine* 2025 | Yes — the adversarial review's DOI is **correct** | **Yes** (13 pp) | `nature.com/articles/s41746-025-01868-9.pdf` (HTTP 200) |
| 4 | "the IJPDS TRUST survey" | Yes — Toh, Smedinga, Feroz, Savulescu & Schaefer 2026 | **Yes** (16 pp) | `ijpds.org/article/download/3200/7021` (HTTP 200) |

**Method note.** Every citation below was confirmed against a retrieved record (Crossref `api.crossref.org/works/<doi>`, the publisher PDF, Unpaywall, or Semantic Scholar). Nothing is completed from memory. Where a field could not be confirmed it is marked **unconfirmed**.

**Blockers.**
- `academic.oup.com` — 403 to curl (expected), 403 to WebFetch on `/article-abstract/` and `/advance-article/` paths, and Playwright Chromium could not complete TLS through the agent proxy (`ERR_CONNECTION_RESET`; proxy log shows `ws_closed_mid_exchange` for `academic.oup.com:443`). A WebFetch of the canonical `/idpl/article/15/1/48/8107097` URL did return the landing page.
- `papers.ssrn.com` — 403 to curl and to WebFetch.
- **OpenAlex is unusable this session**: `api.openalex.org` returns HTTP 429 `{"error":"Rate limit exceeded","message":"Insufficient budget. This request costs $0.001 but you only have $0 remaining. Resets at midnight UTC..."}`. Crossref, Unpaywall, Semantic Scholar and Europe PMC all worked.
- A13 (`A13-trust-platform-and-rwd.md`) contains **no academic citation** for the IJPDS survey — the task's suggestion to "check A13 for a citation" comes up empty. A13 is entirely primary-source (TRUST/MOH publications). The IJPDS paper was found instead via Crossref journal search on ISSN 2399-4908 and independently confirmed by the Consensus sweep.

---

# PART 1 — THE FOUR ANCHOR PAPERS

## 1.1 "Allen, IDPL 2025" — identified, but the description in the task does not match the paper

### Confirmed citation
> Wenxi Zhang, Sharanya Shanmugam and Jason Grant Allen, "Comparing smart city data protection approaches: digital consent and the accountability framework in Singapore" (2025) 15(1) *International Data Privacy Law* 48–66. DOI: 10.1093/idpl/ipaf002.
> URL: https://doi.org/10.1093/idpl/ipaf002 · OUP: https://academic.oup.com/idpl/article/15/1/48/8107097

- **Print issue:** 1 February 2025. **Advance publication:** 7 April 2025 (Crossref `published-online`). Both dates confirmed via Crossref and Unpaywall.
- **Affiliations (Crossref):** all three authors, Centre for Digital Law, Yong Pung How School of Law, **Singapore Management University**. Jason Grant Allen is the Centre's Director.
- **Preprint:** SSRN 4785278, issued as *SMU Centre for AI & Data Governance Research Paper No. 02/2024*. The SSRN landing page is **not retrievable** from this session (403); the series number and posting dates come from a WebSearch result summary and are **unconfirmed against a retrieved record**.
- **Retrieved successfully: no** (full text). Landing page only, via WebFetch.

### ⚠️ Identification finding — read this before citing
The task described "Allen, IDPL 2025" as being "on data sharing / the DAT Act / Australian health data governance". **It is not.** It is a Singapore PDPA / smart-city consent paper.

I ran an **exhaustive** Crossref scan of *International Data Privacy Law* on both ISSNs (2044-4001, 452 records; 2044-3994, 445 records — the journal's entire Crossref footprint) and grepped every author surname. **`ipaf002` is the only IDPL article of any year with an author surnamed Allen.** There is no second candidate.

**Most likely source of the confusion** — a different Allen, who does write on Australian health data governance and social licence:

| Candidate | Confirmed citation | Why it fits the task's description |
|---|---|---|
| **Adams, Allen & Flack (2022)** | Carolyn Adams, **Judy Allen** and Felicity Flack, *Sharing Linked Data for Health Research: Toward Better Decision Making* (Cambridge University Press, 2 June 2022). DOI 10.1017/9781108675789; ISBN 9781108426640. Chapters: "Social Licence" 57–82 (DOI …675789.005); "Law" 131–174 (DOI …675789.008). | Australian health data governance + social licence. **This is the work anchor 2 actually cites** (Scheibner et al. cite Adams, Flack and Allen twice, at e72-2 and e72-4). Strongly recommend the user substitute this for the phantom "Allen IDPL DAT Act" paper. |
| Burdon & Mackie (2020) | Mark Burdon and Tom Mackie, "Australia's Consumer Data Right and the uncertain role of information privacy law" (2020) 10(3) *IDPL* 222–235. DOI 10.1093/idpl/ipaa008. | An IDPL article on an Australian statutory data-sharing right. Wrong author, wrong year. |
| Hartridge & Kind (2025) | Sam Hartridge and Carly Kind, "Personal data all the way down: an Australian perspective on privacy regulation of generative AI" (2025) 15(3) *IDPL* 187–193. DOI 10.1093/idpl/ipaf022. | The only *Australian* IDPL article of 2025. Not on data sharing. |
| Shackel & Smith (2025) | Laura Shackel and Marcus Smith, "Australian privacy law, extraterritoriality, and regulating data collected by offshore direct-to-consumer genetic testing companies" (2025) 15(3) *IDPL* 282–293. DOI 10.1093/idpl/ipaf016. | Australian, health-adjacent (genetic testing), 2025. Not on data sharing law. |

**No IDPL article on the Data Availability and Transparency Act exists** in the journal's Crossref record. A separate Crossref author+topic search ("Allen" + Australian health data governance, 2024–) returned no candidate either.

### What can and cannot be said about ipaf002
Because the full text is unretrieved, **no argument map with pinpoints is possible**. What follows is flagged by source.

- **Thesis (one line, from the OUP landing page, retrieved):** traditional data protection frameworks may be inadequate for smart cities, and the paper compares **digital consent** against the **accountability framework** as approaches to protecting personal data in that setting, using Singapore's Smart Nation programme since 2014 as the case study.
- **From the OUP landing page (retrieved, but paraphrased by the fetch tool — treat as the publisher's own framing, not as quotable text):** smart cities are characterised by embedded sensors, real-time processing and digital service delivery; the authors argue these create "distinctive challenges for data protection".
- **From a WebSearch result summary — UNCONFIRMED, do not cite:** that the paper argues digital consent is rarely meaningfully extended because of limited cognitive capacity, rational apathy and dependency on digital infrastructure; and that Singapore's 2021 PDPA amendments mark a shift from a "Consent Model" to an "Accountability Model" that moves the burden from data subjects to organisations. **This is a secondary characterisation of a paper I could not read. It must be verified against the PDF before it goes anywhere near the bundle.**
- **Evidence base and method:** doctrinal/comparative legal analysis with synthesis from behavioural and social science. **Unconfirmed** — inferred from the landing page and search summary only.
- **Figures/counts:** none identified. **Unconfirmed.**

### Relevance, if the full text is later obtained
- **(a) contribution/access split:** *indirect but potentially the most useful of the four.* The consent-vs-accountability axis is precisely the axis on which the HIA's contribution limb (mandatory, no consent) and access limb (patient-controlled) sit. If the paper is right that Singapore's PDPA has already shifted from consent to accountability, the HIA's contribution limb is continuous with that shift rather than a break from it. **This is a hypothesis to test against the paper, not a finding.**
- **(b) DAT Act uptake:** none.
- **(c) MHR secondary use:** none.
- **(d) TRUST / derived information:** indirect. Note the adversarial review's caution — *"MOH is a public agency outside principal PDPA obligations, but healthcare clusters and Synapxe are PDPA-regulated organisations"* — so a PDPA-accountability argument does not run cleanly across the whole Singapore public-health perimeter.

### Weaknesses a supervisor would probe
1. **The obvious one: you are citing a paper you have not read.** Do not cite ipaf002 until the PDF is in hand.
2. Smart-city sensor data and clinical records are different data classes with different collection settings; the transfer of the argument to NEHR is an inference the paper does not make.
3. It is a 2024-drafted paper (SSRN posted 2024) published Feb 2025 — **before** the Health Information Act 2026. It cannot speak to the HIA.
4. Two of three authors are research associates at the same centre as the third; it is a single-institution view of Singapore's regime.

---

## 1.2 Scheibner, Hardin, Keech & Richards (2025) — *Data & Policy* — **the DAT Act anchor**

### Confirmed citation
> James Scheibner, Tina Hardin, Wendy Keech and Bernadette Richards, "Public data sharing legislation, privacy and sharing of health and social welfare data in Australia: a legal and policy document analysis" (2025) 7 *Data & Policy* e72. DOI: 10.1017/dap.2025.10038. CC BY 4.0.
> URL: https://doi.org/10.1017/dap.2025.10038

- **Affiliations:** Scheibner — Flinders University (College of Business, Government and Law; Centre for Social Impact; Jeff Bleich Centre); Hardin — Commission on Excellence and Innovation in Health, SA Government; Keech — Health Translation SA; Richards — University of Queensland.
- **Dates (p e72-1):** Received 24 October 2024; Revised 30 July 2025; Accepted 23 September 2025; published online 22 October 2025.
- **Pagination:** e72-1 to e72-20. **Retrieved successfully: yes** (publisher PDF, all 20 pp).
- ✅ The task's guess at the authors ("likely Bernadette Richards and James Scheibner") is **correct**, but the author order is **Scheibner, Hardin, Keech, Richards** — cite it as *Scheibner et al.*, not "Richards / Scheibner".

### One-line thesis
Australia's five public-sector data-sharing statutes are a **procedural overlay, not a substantive authorisation**: they do not change the privacy-law norms that actually govern whether health and social-welfare data can be shared, and their inconsistencies with one another are what threatens social licence.

### Argument map (8 moves, each pinpointed)

| # | Move | Pinpoint |
|---|---|---|
| 1 | Two opposing trends frame the field: government push to exploit public sector data, and rising public appetite for control after Optus/Medibank/Robodebt and the re-identification of "de-identified" open data. | e72-2 |
| 2 | **Core finding.** Data sharing legislation "by itself, does not substantially change the norms embedded in privacy and health information management law governing the sharing of personal and health information." | e72-1 (abstract), restated e72-3 |
| 3 | Method: comparative legal/policy document analysis of five jurisdictions — Commonwealth, NSW, SA, Victoria, WA — plus grey-literature search for the guidelines and policies that interpret them; four comparison criteria (definition of public sector data; who must share; who can receive; on what grounds). | e72-3 to e72-4 |
| 4 | **The DAT Act is narrow on who may receive.** Only Commonwealth/State/Territory agencies and Australian universities can be "accredited users" (s 74(1)); "Private sector and foreign organisations are excluded from the scope of this scheme". No obligation to share, but a custodian must give reasons for refusal within a reasonable time (s 25). | e72-7, §3.3.1 |
| 5 | **The DAT Act is broad on purpose.** It is "the only act which explicitly permits data sharing for research purposes" (s 15(1)(c)); law enforcement and national security are expressly excluded (s 15(2)). Every other regime is confined to policy/service delivery. | e72-8, §3.4 |
| 6 | **The Five Safes are legislated but not operationalised.** The DAT Act's Data Sharing Principles and the SA Trusted Access Principles are statutory encodings of the Five Safes, but "does not prescribe the use of specific technical or organisational strategies"; only the Victorian CDO has published technical de-identification guidance. | e72-9 (Code detail), e72-12, e72-16 |
| 7 | **Four points of divergence** across the five regimes: permissible purposes; whether sharing is *mandated*; who may receive; and the security/technical measures required. Full comparison in Table 2. | e72-12; Table 2, e72-13 to e72-14 |
| 8 | **Legality ≠ social licence.** Broad public support for secondary use "does not extend to sharing with private sector organisations"; and the barriers agencies cite "may be self-imposed". Reform proposals: a SA public-sector privacy Act; a guidance-issuing agency for each regime; secure access environments and PETs. | e72-15 to e72-17 |

### Evidence base and method
- Comparative legal + policy document analysis (a **doctrinal** study, not an empirical one). Criteria derived by comparison with existing statutory reviews (Marshall 2021, NSW).
- Corpus is set out in **Table 1, e72-5 to e72-6**: the data-sharing Act/Bill for each jurisdiction, its policies and agreement templates, and "other relevant legislation" — the Commonwealth row expressly lists the **My Health Records Act 2012** alongside the National Health Act 1953, Health Insurance Act 1973, FOI Act 1982 and Privacy Act 1988 (e72-5).
- "extensive but non-exhaustive literature review … using Google Scholar" (e72-4). **No interviews, no survey, no dataset, no uptake statistics.**

### Key quotable lines (all ≤25 words, pinpointed)
- "data sharing legislation, by itself, does not substantially change the norms embedded in privacy and health information management law" — **e72-1**
- "Private sector and foreign organisations are excluded from the scope of this scheme" — **e72-7**
- "only one organisation outside the South Australian government currently has been authorised to receive public sector data" — **e72-8**
- "Derived information is defined as any new information generated from the use or interpretation of existing government information" — **e72-11**
- "the legal barriers that government agencies cite for not using or disclosing public sector data containing personal information may be self-imposed" — **e72-15**
- "this broad support does not extend to sharing with private sector organisations" — **e72-15**

### What it establishes vs what it merely asserts

| Established (by document analysis) | Asserted (carried on other people's evidence) |
|---|---|
| The textual content of five regimes and their divergences (Tables 1–2, e72-5–e72-6, e72-13–e72-14) | That the divergences *do in fact* impede cross-jurisdictional projects — no project-level evidence is offered (e72-3, e72-12) |
| That the DAT Act alone names research as a permitted purpose (e72-8) | That social licence is "fragile" — sourced to Street 2020, Braunack-Mayer 2021, Prictor 2023 (e72-15) |
| That the DAT Act excludes private and foreign recipients (e72-7) | That agency reluctance is "self-imposed" — sourced to the authors' own earlier work, Richards and Scheibner 2022 (e72-15) |
| One SA data point on actual uptake: one non-government authorised recipient, 2021–22 (e72-8) | **No Commonwealth uptake figure at all.** The paper never counts accredited users, data sharing agreements, or projects under the DAT Act |

### Direct relevance
- **(a) contribution/access split — high.** Move 2 is the transferable proposition: a data-sharing statute that sits on top of an unchanged privacy/confidentiality baseline does not by itself enlarge what may be shared. Test the HIA against this: does the contribution limb *change the norm* (a genuine mandate that overrides consent), or does it merely re-plumb an existing permission? The DAT Act is the comparator that did the latter. Also note the **structural mirror**: the DAT Act, like the HIA, separates a *sharing/contribution* mechanism from the *access* conditions imposed by other law.
- **(b) DAT Act uptake — the best available, and it is thin.** e72-7–e72-9 gives the accreditation architecture with section pinpoints. It gives **no** uptake numbers. The single quantitative datum in the paper is South Australian, not Commonwealth (e72-8).
- **(c) MHR secondary use — weak.** MHR appears once, as a Table 1 entry (e72-5). The paper does not analyse the My Health Records Act, the secondary-use framework, or sharing by default.
- **(d) TRUST / derived information — high, and this is the paper's sleeper value.** e72-11 gives a **statutory definition of "derived information"** from the WA *Privacy and Responsible Information Sharing Bill 2024* s 170(d)(iv) — "any new information generated from the use or interpretation of existing government information" — and notes the consequence: "This provision would extend data sharing obligations on a recipient to any datasets generated through data linkage." That is a directly usable comparator for the Singapore derived-information question, and it is a *legislated* definition, which Singapore's TRUST (a non-statutory, contractual platform per A13) does not have. Also relevant: TRUST applies the Five Safes as an adopted framework, and this paper shows what it looks like when the Five Safes are put *into a statute* (DAT Act Data Sharing Principles; SA Trusted Access Principles) and why that still leaves the technical questions unanswered (e72-12, e72-16).

### Weaknesses a supervisor would probe
1. **Currency.** Received Oct 2024, revised Jul 2025. The Commonwealth's **statutory review of the DAT Act** (issues paper April 2025; draft report July 2025; sunset 2027) is **not discussed**. Given that the review's preliminary view is reportedly that the Act is not achieving its purpose, a paper concluding the Act is a procedural overlay is *consistent with* but does not *engage* the review. **The user must go to the review itself** — see Part 3.
2. **WA is a Bill throughout.** The paper analyses the *Privacy and Responsible Information Sharing Bill 2024* and notes the Act "will not come into force until 2026" (e72-3). As at 3 September 2026 that status needs re-checking; the derived-information definition may have moved on assent. **Do not cite the WA provision as in force without re-verification.**
3. **Doctrinal, not empirical.** Every claim about impact ("would confuse researchers", "may undermine cross-jurisdictional projects") is a prediction, not a finding.
4. **Three of six author-affiliations are South Australian and the paper says so** — "Due to three of the authors of this paper being in South Australia, we sought to compare the South Australian legislative framework with other jurisdictions" (e72-3). SA is the most-analysed jurisdiction and the only one without a privacy Act; the reform agenda leans that way.
5. **Funding disclosure is slightly awkward**: Health Translation SA funded a *previous* project by Scheibner and Richards, and Health Translation SA's Executive Director is the third author (e72-17).
6. **Small textual slips** the paper carries: "Personal Data Protection Act" for Victoria's *Privacy and Data Protection Act* (e72-10); "Data Sector (Government Sharing) Act" (e72-9); "disclosures" for "discloses" (e72-9). Cosmetic, but check any quote character-by-character.

### Figures/counts reported
- **One only.** SA: "The public reports from 2021 to 2022 indicate that only one organisation outside the South Australian government currently has been authorised to receive public sector data" (e72-8), sourced to the SA Data Sharing Agreement Register, accessed 19 September 2024 (bibliography, e72-18). **The paper's own "as at" for this figure is the 2021–22 reports, accessed Sept 2024.**
- No counts of DAT Act accredited entities, data sharing agreements, or projects anywhere in the paper.

---

## 1.3 Olsen et al. (2025) — *npj Digital Medicine* — willingness-to-share meta-analysis

### Confirmed citation — the adversarial review's DOI is correct
> Quita Olsen, Amalie Dyda, Leanna Woods, Elton Lobo, Rebekah Eden, Michelle A. Krahe, Bernadette Richards, Nalini Pather, Lesley McGee, Clair Sullivan and Jason D. Pole, "Worldwide willingness to share health data high but privacy, consent and transparency paramount, a meta-analysis" (2025) 8 *npj Digital Medicine* 540. DOI: 10.1038/s41746-025-01868-9. Published 23 August 2025. Licence CC BY-NC-ND 4.0.
> URL: https://doi.org/10.1038/s41746-025-01868-9

- ✅ **Verified**: the DOI cited in `ADVERSARIAL-REVIEW-2026-08-25` resolves to exactly this paper (Crossref). Note the citation form is **8:540** (article number), not a page range. **Retrieved successfully: yes** (publisher PDF, 13 pp).
- **Note the shared author with anchor 2:** Bernadette Richards is a co-author of both. So is Michelle Krahe, first author of the companion scientometric review (see Part 2, [13]).

### One-line thesis
Roughly three-quarters of the public in (predominantly high-income) countries say they would share de-identified health data for secondary use, **but the pooled figure is close to meaningless on its own** — it collapses a 24–100% range, and the operative variable is *who receives the data*, where willingness collapses to 25% for commercial reuse.

### Argument map (6 moves, pinpointed)

| # | Move | Pinpoint |
|---|---|---|
| 1 | Willingness to share is the empirical core of "social licence"; no prior meta-analysis existed. | p 1 |
| 2 | Pooled random-effects estimate **77.2% (95% CI 71–82%)** across 52 studies / 117,905 participants — but the **prediction interval is 27–97%** and heterogeneity is near-total (τ²=1.18, I²=99.6%, p<0.001). LFK index 3.52 = "major asymmetry", i.e. publication bias or small-study effects. | p 2 |
| 3 | Unwillingness pooled at **13.2% (8.8–19.1%)**, 33 studies, 100,911 participants, τ²=1.7, I²=99.7%, LFK −3.43. The residual **10% is unaccounted for** and almost never measured. | p 2; discussion p 8 |
| 4 | **The commercial/research split is the finding that survives.** Research 80.2% → government 70% → for-profit *for health purposes* 56% → **for-profit for commercial purposes 25.4%**. | p 2; **Table 2, p 3** |
| 5 | **Health status matters, jurisdiction does not.** Cancer patients 90.9% > other patients 81.1% > general public 69.7% (p=0.0037). Region (p=0.61), country (p=0.56) and data type (p=0.09) were **not** significant. | **Table 2, p 3**; discussion p 8 |
| 6 | Concerns are stable and high even where willingness is high — privacy, consent, transparency, control — and 36–52% of participants did not know what their own jurisdiction's data-sharing practices were. | pp 6–7; p 8 |

### Evidence base and method
- Systematic review + proportion meta-analysis. **PROSPERO CRD42024504135**; PRISMA 2020 (p 9).
- **Base:** 4,085 records → 95 relevant → **65 quantitative articles, 141,193 participants, 34 countries** → **52 in the meta-analysis** (55 estimates, because 3 studies reported two groups). PRISMA flow, Fig 1, p 4; counts pp 1–2.
- Quality: MMAT; 47 of 65 rated high methodological quality (p 2). Sensitivity analysis on low-risk-of-bias studies gave **78.3% (71–84%)** — i.e. the headline is robust to quality (p 2).
- 63 of 65 studies cross-sectional; one RCT, one pre-post (p 2).
- **All 52 meta-analysed studies concerned de-identified data** except one that made no distinction; 8 studies reported identified and de-identified jointly and only the de-identified figures were used (pp 1–2).

### 📅 "As at" dates the paper itself reports — critical, and easy to get wrong
- **Databases searched: 29 January 2024** (p 9).
- **Inclusion window: peer-reviewed, English, January 2020 to December 2023** (Table 4, p 9).
- **The underlying survey data were collected between June 2015 and June 2022**, with one outlier collected in **2009** (p 2).
- ⚠️ **So the "77%" describes public opinion sampled up to mid-2022, published up to end-2023, searched in January 2024, and published in August 2025.** It is not a 2025 measurement. Anyone citing it as current opinion in 2026 is out by roughly four years. This matters directly to the project: the Singapore Health Information Bill debates and TRUST's expansion all post-date the evidence base.

### Key quotable lines (≤25 words, pinpointed)
- "The prediction interval ranged between 27 and 97% reflecting substantial variability in willingness to share across studies." — **p 2**
- "The LFK index was 3.52, indicating major asymmetry and suggesting publication bias or small-study effects." — **p 2**
- "least willingness to share with for-profit organisations who were using the data for commercial purposes" — **p 2**
- "35% of Singaporean participants not trusting research processes and protections" — **p 7**

### Table pinpoints (as requested)

**Table 2, p 3 — "Meta-analyses of willingness to share overall and by region, country type of health data and between unwell and health populations"**

| Stratum | N studies | Proportion | 95% CI | τ² | p | LFK |
|---|---|---|---|---|---|---|
| Willingness to share (overall) | 55 | 0.77 | 0.71–0.82 | 1.18 | — | 3.52 |
| Sensitivity (high quality) | 25 | 0.78 | 0.71–0.84 | 1.34 | — | 4.06 |
| Unwillingness (overall) | 33 | 0.13 | 0.09–0.19 | 1.67 | — | −3.43 |
| **…for research** | 38 | **0.80** | 0.74–0.85 | 1.19 | — | 6.53 |
| **…with government** | 16 | **0.70** | 0.57–0.80 | 1.12 | — | −5.54 |
| **…with for-profit, health purposes** | 18 | **0.56** | 0.45–0.66 | 0.79 | — | 4.49 |
| **…with for-profit, commercial purposes** | 16 | **0.25** | 0.19–0.33 | 0.51 | — | 1.62 |
| East Asia & Pacific | 15 | 0.76 | 0.65–0.84 | 0.77 | 0.61 (region) | 0.46 |
| Europe & Central Asia | 23 | 0.81 | 0.71–0.88 | 1.65 | — | — |
| North America | 13 | 0.76 | 0.64–0.84 | 0.80 | — | — |
| Australia | 8 | 0.78 | 0.61–0.89 | 0.91 | 0.56 (country) | −0.33 |
| UK | 9 | 0.71 | 0.54–0.84 | 0.94 | — | — |
| USA | 11 | 0.75 | 0.61–0.86 | 0.95 | — | — |
| Genomic data | 9 | 0.70 | 0.57–0.80 | 0.48 | 0.09 (data type) | 3.10 |
| Mental health data | 4 | 0.83 | 0.72–0.90 | 0.15 | — | — |
| **Patients with cancer** | 5 | **0.91** | 0.73–0.97 | 1.03 | **0.0037** | 3.46 |
| **Patients in hospital/treatment** | 22 | **0.81** | 0.72–0.88 | 1.19 | — | — |
| **The general public** | 28 | **0.70** | 0.62–0.77 | 0.83 | — | — |

*(In the published table the stratification p-value and LFK index sit on the first row of each block and apply to the block, not that row. The text confirms this reading: "significant difference between the groups (p = 0.0037)", p 2; "Stratification by type of health data or country did not yield significant differences", p 8.)*

- **Table 3, p 5** — participant characteristics with significant associations (ethnicity, sex, age, education). Includes a **Singapore** study (ref 53): older cohort 60.3%, younger cohort 71.8%.
- **Table 1, p 2** — taxonomy of secondary uses. **Table 4, p 9** — inclusion/exclusion criteria.

### What it establishes vs what it merely asserts

| Establishes | Asserts / carries |
|---|---|
| That published willingness estimates are enormously heterogeneous and that a single pooled number is not usable as a point estimate (pp 2, 9) | That there is a "global population with 10% uncertainty" (p 2) — this residual is arithmetic, not measured; only one included study reported unwillingness directly (p 8) |
| A **statistically significant, large, and directionally consistent** research-vs-commercial gradient (Table 2, p 3) | That the gradient is caused by "concerns about exploitation… loss of control, potential misuse" (p 8) — this is inference from the narrative synthesis, not from the meta-analysis |
| A significant patient-vs-public gradient (p=0.0037) | That country and data type do not matter — these are **null results with n=4–15 per stratum and I²≈99%**; underpowered, not evidence of absence (p 8 concedes "further studies may be required") |
| The evidence base's Western skew and the absence of marginalised populations (p 8) | Recommendations for public education and a validated instrument (p 9) — reasonable, but not derived from the data |

### Direct relevance
- **(a) contribution/access split — moderate.** The paper measures willingness to *share*, i.e. the contribution side, and finds it high but heavily conditioned on recipient identity. It says nothing about attitudes to *access* by other clinicians, which is the HIA's other limb, and nothing about insurer or employer access.
- **(b) DAT Act uptake — none.**
- **(c) MHR secondary use — indirect.** Australia-specific pooled willingness is **78% (61–89%), n=8** (Table 2, p 3) — a usable Australian baseline for the MHR secondary-use argument, and the 25.4% commercial figure is the number that bears on any private-sector-access proposal.
- **(d) TRUST / derived information — high on the commercial question.** TRUST's industry-access framework is announced but not operational (A13 §P1), and TRUST's eligibility is still confined to the public sector. The 25.4% figure is the strongest quantitative support available for the proposition that opening a national platform to industry is the step that carries social-licence risk. **Pair it with the IJPDS TRUST survey's 89% figure** (§1.4) — the two are measuring different things (willingness to share vs demand for oversight) but point the same way.
- ⚠️ **Anonymisation caution applies.** The adversarial review warns that "Anonymisation must be proved, not asserted." Olsen's respondents were answering about *de-identified* data (pp 1–2). Their 77% is therefore conditional on a de-identification claim the respondents were not in a position to test — exactly the gap the review flags for TRUST.

### Weaknesses a supervisor would probe
1. **The database list is internally inconsistent across three places in the paper.** Abstract, p 1: "Five electronic databases were searched". Methods, p 9: "Four databases were searched: Medline (Ovid), … CINAHL, Web of Science and **Scopus**". PRISMA Fig 1, p 4: **Web of Science, MEDLINE, Embase, CINAHL** (no Scopus). Three different answers to a basic reproducibility question. **This is the first thing an examiner will find.**
2. **I² = 99.6%.** Pooling proportions at that heterogeneity is contestable in principle; the prediction interval (27–97%) is arguably the honest headline and the abstract does not report it.
3. **LFK 3.52 = major asymmetry**, acknowledged but not corrected for; no trim-and-fill.
4. **Two studies contribute 46% of all participants** (a UK study, n=29,275; a global DNA study, n=36,268) — p 2. The pooled figure is heavily leveraged by two datasets.
5. **Single-reviewer data extraction** (verified by a second reviewer) — p 9.
6. **Recency, as above:** underlying data to mid-2022.
7. **"Predominantly high-income countries"** — Singapore appears once, as ref 53 (a Singapore national survey; see Part 2). Asia-Pacific n=15 with p=0.61 on the regional stratification.

### Figures/counts (with the paper's own "as at")
4,085 records screened; 95 relevant; **65 quantitative articles**; 141,193 participants; 34 countries; 52 studies (55 estimates) meta-analysed; 117,905 participants in the willingness meta-analysis; 100,911 in the unwillingness meta-analysis. All **as at the search date of 29 January 2024**, with an inclusion window of **January 2020 – December 2023** (pp 1–2, 4, 9).

---

## 1.4 Toh, Smedinga, Feroz, Savulescu & Schaefer (2026) — *IJPDS* — the TRUST survey

### Confirmed citation
> Hui Jin Toh, Marthe Smedinga, Faisal Feroz, Julian Savulescu and G. Owen Schaefer, "A survey of public attitudes toward secondary research governance oversight: Evidence from Singapore's TRUST platform" (2026) 11(1) *International Journal of Population Data Science* 15. DOI: 10.23889/ijpds.v11i1.3200. CC BY 4.0.
> URL: https://doi.org/10.23889/ijpds.v11i1.3200 · PDF: https://ijpds.org/article/download/3200/7021

- **Article identifier used by the journal:** `(2026) 11:1:15`. **Submitted** 05/08/2025; **Accepted** 12/12/2025; **Published** 23/03/2026 (p 1). **It is a 2026 paper, not 2025.**
- **Affiliations:** Centre for Biomedical Ethics, Yong Loo Lin School of Medicine, NUS (all); Smedinga also TUM Munich; Feroz also Uehiro Oxford Institute, Oxford Dept of Experimental Psychology, NTU Psychology; Savulescu also Uehiro Oxford. **Toh and Smedinga are joint first authors.** Corresponding author: Savulescu.
- **Retrieved successfully: yes** (PDF, 16 pp; printed pagination 1–14 plus references).
- **Cross-check with A13:** the DAC membership list in A13 (TRUST DAC Annual Report FY2024, p 4) includes **Prof Julian Savulescu (Centre for Biomedical Ethics, NUS)** — i.e. the corresponding author of this survey sits on the committee whose oversight the survey is testing. A13 does not disclose this and neither does the paper's competing-interests statement, which I could not locate in the PDF. **Flag this to the user as a disclosure question, not as an accusation.**

### Survey design, N, dates — as requested

| Item | Value | Pinpoint |
|---|---|---|
| Design | Cross-sectional online survey; four hypothetical research scenarios; between-subjects | p 3 |
| Platform | Qualtrics | p 3 |
| Sampling frame | **Health Opinion Panel Singapore (HOPS)**, hosted at NUS Centre for Biomedical Ethics; 2,527 Singapore citizens and PRs; panel recruited by stratified random household sampling from a de-identified DOS address frame, stratified by age, ethnicity, gender; eligibility 21+, reads English, internet access, personal email | p 3 |
| Invitations | 1,526 panel members emailed (those not invited to the prior study); reminders on days 8 and 15; closed day 31; SGD10 supermarket e-voucher | p 3 |
| **Field dates** | **September to October 2024** | p 1 (abstract), p 3 |
| **N** | **453 completed**; power analysis targeted 400 for ±5% margin | p 3, p 6 |
| Per-scenario n | Each respondent randomly assigned **2 of 4** scenarios; n = 221–236 | p 5, p 7 (Table 4) |
| Ethics | Deemed **exempt** from review by NUS-IRB under the panel's existing approval (ref LH-18-011) | p 6 |
| Weighting | **None applied** | p 3, p 13 |

**Sample vs population (Table 2, p 6, against the 2020 Census):** 61% female (national 48%); 81% Chinese (74%); 54% bachelor's or postgraduate (33% of residents 25+); median age 49 (national 42). 12% Indian, 5% Malay, 2% other. Self-rated health good/very good/excellent 83%.

### Headline results with pinpoints

**Table 4, p 7 — support for an additional MOH review despite a stated 2–5 week delay**

| Scenario | n | Support | 95% CI | Oppose | 95% CI |
|---|---|---|---|---|---|
| 1. MINDEF, NS medical risk prediction | 221 | 185 (**84%**) | 79–88% | 36 (16%) | 12–21% |
| 2. **Overseas private company**, breast-cancer screening AI | 236 | 211 (**89%**) | 85–93% | 25 (11%) | 7–15% |
| 3. New York University, rare genetic disease | 227 | 195 (**86%**) | 81–90% | 32 (14%) | 10–19% |
| 4. MOE, educational attainment prediction | 222 | 177 (**80%**) | 75–85% | 45 (20%) | 15–25% |

- **Overall test:** χ²(3) = 8.47, p = 0.037, **Cramér's V = 0.10 (small effect)** — p 6.
- **Post-hoc (Table 5, p 8):** with Bonferroni α = 0.0083, **only Project 2 vs Project 4 is significant** (9 pp difference, p = 0.007). All five other pairs n.s. **So the "foreign commercial > domestic government" gradient rests on a single significant comparison with a small effect size.**
- **Reasons for support (Table 6, p 9):** "There should be government accountability" 68–76% (highest for Project 2, 76%, n=160); "MOH has the public interest in mind" 55–62%; "MOH has the right expertise" 44–50%.
- **Reasons for opposition (Table 6, p 9):** "I do not see the added value" 56–64%; "MOH should not spend time or resources on this" 29–38%; "I would not want the research to be delayed" 22–36%.
- **Supplementary Q, Project 2 (Table 7, p 9):** retain contact details so individuals can be told of elevated cancer risk, despite breach risk — **for 164 (69%)**, against 74 (31%). Top reason for: "Individuals might want to be informed about their cancer risk status" 83%. Top reason against: "I am worried about data leaks" 77%.
- **Supplementary Q, Project 3 (Table 8, p 10):** require overseas researchers to work in a **CCTV-monitored room in Singapore**, despite impeding collaboration — **for 193 (82%)**, against 42 (18%). Reason for: patient privacy 92%; distrust of overseas researchers 29%. Reason against: makes research harder 59%; no added value 53%.

### Argument map (6 moves, pinpointed)

| # | Move | Pinpoint |
|---|---|---|
| 1 | Technical safeguards (de-identification, secure environments, access restrictions) "do not resolve questions about legitimacy of data use decisions"; social licence is a separate object. | p 2 |
| 2 | The literature measures willingness to *share* but not attitudes to *governance process*; specifically not whether oversight delay is read as accountability or as bureaucracy. | p 2 |
| 3 | **The TRUST institutional fact the whole design turns on:** TRUST runs a **tiered** review — all proposals go to the DAC, but "requests involving sensitive or rare disease data require supplementary approval from the Ministry of Health", adding "about 2–5 weeks"; and "What constitutes as 'sensitive data' is determined by data custodians". | p 2 |
| 4 | 80–89% support MOH review in every scenario, and *accountability* — not privacy — is the dominant stated reason. The variance across scenarios is small (V=0.10); the consistency is the finding. | pp 6–7 |
| 5 | Respondents reason in a **risk-calibrated, context-dependent** way rather than trading privacy against utility monotonically: 69% accept a privacy risk for a *direct personal* benefit, while 82% impose an onerous safeguard for a *vulnerable, re-identifiable* population. | pp 10–11 |
| 6 | **Policy inference:** governance should be **risk-proportionate above a floor**, not risk-proportionate instead of a floor — "proportionality operates within bounds of minimum acceptable protection rather than eliminating review entirely", and "Relaxing oversight due to high trust risks becoming self-undermining." | p 12 |

### Key quotable lines (≤25 words, pinpointed)
- "requests involving sensitive or rare disease data require supplementary approval from the Ministry of Health" — **p 2**
- "What constitutes as 'sensitive data' is determined by data custodians" — **p 2**
- "the survey referred to 'a national data platform' instead of TRUST directly to avoid priming effects" — **p 3**
- "social licence depends more on procedural justice than operational efficiency" — **p 10**
- Respondent: "Delay of 2-5 weeks is a small price to pay for added oversight." — **p 10**
- Respondent: "It is our country data, need a watchdog if affects us" — **p 10**
- "Relaxing oversight due to high trust risks becoming self-undermining." — **p 12**

### What it establishes vs what it merely asserts

| Establishes | Asserts |
|---|---|
| That a Singapore panel sample overwhelmingly endorses an additional ministerial review layer and accepts its time cost (Table 4, p 7) | That this demonstrates "procedural justice" is the basis of social licence (p 10) — one construct, one item, no procedural-justice instrument was administered |
| That *accountability*, not privacy, is the most-cited reason (Table 6, p 9) | That the public expects review to cover "scientific validity, social justice, and long-term societal benefit" (p 12) — this comes from open-text coding by **a single coder**, no inter-rater reliability (p 13) |
| That the foreign-commercial scenario draws the most oversight demand — but only just (p = 0.007 on one of six comparisons, V = 0.10) | That this shows a "risk-calibrated approach" to foreignness — the paper **itself concedes** it cannot separate foreignness from entity type or purpose, because Projects 2 and 3 involved only foreign entities and no local university or local company was tested (pp 10, 13) |
| The 69%/82% contrast on the two supplementary questions (Tables 7–8, pp 9–10) | That the contrast is explained by direct vs indirect benefit (p 11) — plausible, but the two questions differ on scenario, entity, disease and safeguard simultaneously |

### Direct relevance
- **(a) contribution/access split — high, and it cuts a specific way.** This is evidence about the **access** limb: the public wants a *government gate* on downstream research use. It is not evidence about the contribution limb; respondents were never asked whether data should be contributed to the platform in the first place. Note the disjunction with the HIA architecture: the survey's respondents want MOH review of *research access*, whereas the HIA's public controversy (per A27) is about *insurer and employer* access. Do not conflate them.
- **(b) DAT Act uptake — none.**
- **(c) MHR secondary use — none directly**, but the qualitative theme "Data as public property requiring stewardship" (p 10) is the Singapore analogue of the Australian social-licence literature and can be set against Braunack-Mayer et al.'s Australian community-attitudes survey on government-to-private sharing (Part 2).
- **(d) TRUST / derived information — this is *the* TRUST paper.** It supplies (i) an independent, citable description of TRUST's tiered DAC → MOH review and its 2–5 week cost (p 2), which corroborates A13's account from a non-government source; (ii) the fact that **"sensitive data" is defined by the data custodians, not by MOH or by statute** (p 2) — a governance gap worth pressing, since it means the trigger for the higher review tier is set by the contributing institution; and (iii) empirical support for the proposition that TRUST's forthcoming industry-access framework (A13 §P1) will face the highest oversight expectations of any use case tested (89%, Table 4, p 7). **It reports nothing on derived information.**

### Weaknesses a supervisor would probe
1. **Sample is not representative and is not weighted** — over-educated (54% vs 33%), over-Chinese, over-female, older (p 6, p 13). The authors say so.
2. **Social desirability in a high-trust, high-deference polity.** The authors raise it themselves (p 13). An 80–89% endorsement of *more government review* in Singapore is exactly the item most exposed to it.
3. **Confounded design, conceded:** foreignness cannot be separated from entity type or purpose (p 13).
4. **Single qualitative coder, no inter-rater reliability** (p 13); "The themes we report should therefore be understood as one interpretation of the open-text data."
5. **Hypothetical scenarios; stated ≠ revealed preference** (p 13).
6. **Ethics-exempt** on the strength of a 2018 panel approval, ref LH-18-011 (p 6).
7. **The scenarios did not name TRUST** (p 3) — a design strength for bias, but it weakens the claim that the results are "evidence from Singapore's TRUST platform" as the title asserts.
8. **The key prior study is unpublished.** Ref [15] — Smedinga, Ong, Toh et al., "Public interest according to the public…" — is listed as **"Forthcoming. 2026"** (references, p 15 of PDF). Three of the four scenarios were replicated from it. **The survey instrument's provenance therefore rests on an unpublished paper.**
9. **Author–committee overlap** (see above): the corresponding author sits on the TRUST DAC per A13.
10. **The one significant comparison carries a lot of weight.** Cramér's V = 0.10.

### Figures/counts (with "as at")
N = 453 respondents, fielded **September–October 2024**; panel size 2,527; 1,526 invited; per-scenario n = 221–236 (pp 1, 3, 7). TRUST facts stated as at the paper's own writing: launched 2022; MOH supplementary review adds "about 2–5 weeks" (p 2); TRUST website accessed **4 January 2025** (ref [14], p 15 of PDF).

---

# PART 2 — CONSENSUS SWEEP SINCE 2024

**Tool:** `mcp__Consensus__search`, `year_min=2024` (the only filter applied, per the user's explicit request for work since 2024). Eight queries, three at a time. No rate-limit errors.

**Sign-up / upgrade / usage message:** **none was present in any of the eight tool results.** I grepped all six persisted result files for "sign up", "upgrade", "searches remaining" and "free plan" — zero matches. Each result instead terminated with the following block, reproduced verbatim once for completeness:

> IMPORTANT INSTRUCTIONS: When discussing these findings, you MUST cite papers inline using their numbered references, e.g. [1], [2]. Example: 'Caffeine improves endurance performance [1] and reduces perceived exertion [3].' Hyperlink paper titles directly: [Paper Title](url). Use the exact URLs above — do not modify or shorten them. If a paper line includes `DOI: ...`, treat it as a citation-formal identifier and preserve it when the user asks for citations.

## 2.1 Query log

| # | Query (verbatim) | Hits returned | Directly on point | Adjacent |
|---|---|---|---|---|
| Q1 | `Data Availability and Transparency Act uptake evaluation Australia` | 20 | 1 | 2 |
| Q2 | `Australian government data sharing scheme accreditation uptake` | 20 | 2 | 3 |
| Q3 | `My Health Record secondary use research data` | 20 | 0 | 3 |
| Q4 | `My Health Record Australia sharing by default pathology diagnostic imaging` | 20 | 1 (anchor 2 itself) | 2 |
| Q5 | `national electronic health record research access Singapore` | 20 | 0 | 3 |
| Q6 | `TRUST platform Singapore health data sharing governance` | 20 | 2 | 2 |
| Q7 | `Health Information Act Singapore National Electronic Health Record legislation` | 20 | 1 | 2 |
| Q8 | `de-identified health data secondary use governance re-identification risk` | 20 | 0 | 3 |

Consensus's engine is semantic and reranks against a general corpus; the same items recur across queries (Riley 2024 was top hit for both Q1 and Q2). Total distinct consensus.app records surfaced across the sweep: 112.

## 2.2 🔴 THE NULL RESULT — state this in the thesis

**The sweep found no empirical study of DAT Act uptake. Not one, in eight queries, across 160 returned records.**

Specifically, there is **no** peer-reviewed paper that reports:
- how many entities have been accredited as data users or accredited data service providers;
- how many data sharing agreements have been registered;
- how many projects have run under the scheme;
- whether health data has in fact flowed under it.

The nearest thing in the entire literature is Scheibner et al.'s **single South Australian** datum — one non-government authorised recipient, from the 2021–22 SA public reports (e72-8). Anchor 2, the leading legal analysis of the DAT Act, does not count Commonwealth uptake either.

**This is itself a finding, and a load-bearing one for the project:** the comparator limb of the argument (Australia's DAT Act as the cautionary tale of a data-sharing statute that did not deliver) **cannot be carried by the literature**. It must be carried by primary sources — the Office of the National Data Commissioner's registers and annual reports, and the 2025 statutory review of the DAT Act. See Part 3.

Likewise: **no paper in the sweep addresses My Health Record secondary use or "sharing by default"** for pathology and diagnostic imaging. Q3 and Q4 returned generic EHR-secondary-use and radiology-report-access literature. The only MHR-specific item surfaced was a brief narrative review [12] which notes MHR's low utilisation and is not about secondary use at all. This too must go to primary sources (the Framework to guide the secondary use of My Health Record system data; the Australian Digital Health Agency).

## 2.3 Directly on point

**Singapore / TRUST**

- **[1]** Toh et al. 2026, *IJPDS* 11(1):15 — **anchor 4**; already retrieved in full. Its appearance as the top hit for Q6 independently confirms the identification. **Full text retrieved: yes.**
- **[2]** Clive Tan, "Policy Analysis of Singapore's Health Data Sharing Legislations using the DASHECO Health Data Sharing Ecosystem Framework" (2025) 25 *International Journal of Integrated Care* 360. DOI 10.5334/ijic.icic24165 (Crossref-verified; **an ICIC conference abstract, not a full article** — this is the single most important caveat on it). **Finding:** applies the DASHECO four-stakeholder framework (Health Data Generators / Users / Exchange Platform & IT Service Provider / Regulator & Governing Entity) to the Health Information Bill, to assess role alignment and forecast implementation challenges via realist evaluation. **Why it matters:** it is the only located academic policy analysis of the HIB, it reframes "data owner" as "data steward", and its Generator/User distinction maps almost exactly onto the contribution/access split. **Full text retrieved: no** — abstract only (via the Consensus record and Crossref). Being an ICIC abstract there may be no full text to retrieve.
- **[3]** Cynthia Chen et al., "Economic Evaluation of the Next Generation Electronic Medical Records in Singapore: Cost-Utility Analysis" (2025) 27 *JMIR* e70484. DOI 10.2196/70484. **Finding:** cost-utility analysis of Singapore's NGEMR. **Why it matters:** the only located quantitative economic evidence on Singapore's national EMR programme; useful if the argument needs a benefits-side counterweight. **Full text retrieved: no.**

**Australia — DAT Act ecosystem (all attitudinal, none on uptake)**

- **[4]** Merilyn Riley, Monique F Kilkenny, Kerin Robinson and Sandra G Leggat, "Researchers' perceptions of the trustworthiness, for reuse purposes, of government health data in Victoria, Australia" (2024) 54(2) *Health Information Management Journal* 139–149. DOI 10.1177/18333583241256049 (Crossref-verified). **Finding:** survey of 50 experienced health researchers who had used Victorian government health datasets; 88% believed the data trustworthy; data factors and management properties mattered more than provider factors; the most important constructs were "compliant with ethical regulation" (100%) and "monitoring privacy and confidentiality" (98%); least important were knowledge of participant consent (56%) and whether research was the provider's major focus (50%). **Why it matters:** the paper explicitly frames itself against the DAT Scheme and its lack of guidance on data "trustworthiness". It is the closest thing to a DAT-adjacent empirical study, and it is about *researchers*, not the public — a different constituency from Olsen's. **Full text retrieved: no** (SAGE; not attempted, outside the four anchors). *Figures above are as reported in the Consensus abstract record.*
- **[5]** Richard J Varhol, Suzanne Robinson, Crystal Man Ying Lee, Sean Randall and James H Boyd, "Attitudes towards data access and sharing health data for research: a case study of Australian data custodian perspectives" (2025) 55(2) *Health Information Management Journal* 315–327. DOI 10.1177/18333583251329533 (Crossref-verified). **Finding:** custodian-side attitudes to release. **Why it matters:** the custodian is the actor whose refusal the DAT Act tried to unblock, and whose reluctance Scheibner et al. call "self-imposed" (e72-15). This is the empirical test of that claim. **Full text retrieved: no.**
- **[6]** Xiaofang Yao, Anthony McCosker and Yong-Bin Kang, "Deepening the data divide: Marginalised perspectives and non-profit priorities in Australian data sharing reforms" (2025) 12(1) *Big Data & Society* 20539517241311585. DOI 10.1177/20539517241311585 (Crossref-verified). **Finding:** Australian data-sharing reforms centre government and industry and marginalise non-profit and community priorities. **Why it matters:** a distributive-justice critique of the reform programme the DAT Act belongs to; complements Olsen's finding that marginalised groups are absent from the willingness literature. **Full text retrieved: no.**
- **[7]** Heidi Green, Justin Beilby, **Carolyn Adams**, Alberto Nettel-Aguirre, **Felicity Flack** et al., "Sharing general practice data: a qualitative study with Australian general practitioners" (2026) *BMC Primary Care*. DOI 10.1186/s12875-026-03490-4 (Crossref-verified; volume/issue not yet assigned). **Finding:** GPs are broadly willing to support data sharing but require policy, educational and ethical work; trust, transparency and patient autonomy are conditions of their support. **Why it matters:** (i) it is the **provider-side** counterpart to the patient-side willingness literature, which is where the HIA's contribution limb actually bites; (ii) two authors are Adams and Flack — co-editors with **Judy Allen** of the CUP volume identified in §1.1. **Full text retrieved: no.**

**Cross-cutting**

- **[8]** Michelle A Krahe, Rebekah Eden, Jason D Pole, **Bernadette Richards**, **Quita Olsen** et al., "A scientometric review of health data sharing for secondary use: Insights, frontiers and the path ahead" (2025) *Health Information Management Journal* 18333583251393431. DOI 10.1177/18333583251393431 (Crossref-verified). **Why it matters:** the **companion mapping paper to anchor 3, by overlapping authors**. Read it immediately after Olsen; it is where the field-level gaps are catalogued. **Full text retrieved: no.**
- **[9]** Fidelia Cascini, Ana Pantovic, Yazan A Al-Ajlouni, Valeria Puleo, Lucia De Maio and Walter Ricciardi, "Health data sharing attitudes towards primary and secondary use of data: a systematic review" (2024) 71 *eClinicalMedicine* 102551. DOI 10.1016/j.eclinm.2024.102551 (Crossref-verified). **Finding:** 116 studies, 228,501 participants; sharing intentions for **primary** purposes higher than for **secondary**, across all data types; biobank data showed both the highest (98%) and the lowest (10%) intention rates. **Why it matters:** **this is the review Olsen et al. position themselves against** (Olsen cites it as ref 13 at pp 8–9), and its primary-vs-secondary gradient is the cleanest published statement of the proposition that underlies the contribution/access split. Higher citation count (74) than any other item in the sweep. **Full text retrieved: no.**

## 2.4 Adjacent (context, not authority)

- **[10]** Kimley Foster et al., "Toward Privacy-Preserving Data Sharing—An Australian Healthcare Perspective" (2025) *IEEE Access*. DOI 10.1109/access.2025.3545778. Survey of 82 Australian healthcare professionals; professionals' motivations differ from consumers' (patient outcomes over research). Small n, engineering venue. **Not retrieved.**
- **[11]** Nikos Koutras et al., "Information Governance and Open Access in Australia" (2026) 16 *Journal of Information Policy*. DOI 10.5325/jinfopoli.16.2026.0003. Open-access/information-governance framing; not health-specific. **Not retrieved.**
- **[12]** Andrew Xu and Brian E Chapman, "Patient Access to Health Data: A Review of Philosophic and Healthcare Issues" (2024) *Studies in Health Technology and Informatics*. DOI 10.3233/shti231275 (Crossref-verified; **a book chapter**, not a journal article). Narrative review noting **MHR's low patient utilisation** and debate centred on utility and privacy. The **only** MHR-specific item the sweep produced, and it is thin. **Not retrieved.**
- **[13]** Peter Chiu-Leung Chow, "Keeping good documentation: the ethical and legal issues in medical records" (2025) 66(9) *Singapore Medical Journal* 517–521. DOI 10.4103/singaporemedj.smj-2025-042 (Crossref-verified). Singapore clinician-facing guidance on record-keeping duties. Useful only as evidence of what practitioners are being told. **Not retrieved.**
- **[14]** Jacob Prehn et al., "Implementing Indigenous Data Sovereignty in Australia: A Five-Phase Framework for Indigenous Data Governance" (2025) *Australian Journal of Social Issues*. DOI 10.1002/ajs4.70086. Relevant to the WA Bill's Aboriginal information assessment requirement (anchor 2, e72-11 to e72-12). **Not retrieved.**
- **[15]** Elizabeth Ford et al., "What is the patient re-identification risk from using de-identified clinical free text data for health research?" (2025) *AI and Ethics*. DOI 10.1007/s43681-025-00681-0. Concludes re-identification risk from de-identified free text in a Five-Safes secure environment is "very low". **Why it matters here:** it is the strongest published *counter* to the adversarial review's caution that anonymisation "must be proved, not asserted" — a supervisor will expect the argument to engage it. **Not retrieved.**
- **[16]** Paola Daniore et al., "Fostering public trust in national health data platforms: key considerations for public involvement activities for England and Switzerland" (2025) 8 *Data & Policy*. DOI 10.1017/dap.2024.95. Comparator on public involvement in national platforms. **Not retrieved.**
- **[17]** J R H Tay et al., "Establishment of a large-scale oral disease registry (NDCS-ODR) in a national specialty center" (2026) *PLOS One*. DOI 10.1371/journal.pone.0341766. Singapore registry inside SingHealth; **229,249 unique patients as at June 2025** (the paper's own "as at"). Evidence of the cluster-level registry layer that A13 could not reach. **Not retrieved.**

## 2.5 Items I identified outside Consensus that outrank several sweep hits

Found via Crossref while verifying the anchors; flagged because they are more on point than most of the sweep.

- **James Scheibner and Hui Yun Chan, "Cross-border health data sharing between Singapore and Switzerland: controlling for competing regulatory requirements" (2025) 12(2) *Journal of Law and the Biosciences* lsaf021.** DOI 10.1093/jlb/lsaf021 (Crossref-verified). **Same lead author as anchor 2, on Singapore.** This is very likely the single most useful un-tasked paper for this project. **Not retrieved** (OUP).
- **James Scheibner, Nicole Kroesche, Luke Wakefield, Tina Cockburn, Steven M McPhail and Bernadette Richards, "Does Legislation Impede Data Sharing in Australia Across Institutions and Jurisdictions? A Scoping Review" (2023) 47(1) *Journal of Medical Systems* 116.** DOI 10.1007/s10916-023-02009-z (Crossref-verified). The scoping-review predecessor to anchor 2.
- **Tamra Lysaght, Angela Ballantyne, Hui Jin Toh, Andrew Lau, Serene Ong, Owen Schaefer, Makoto Shiraishi, Willem van den Boom, Vicki Xafis and E Shyong Tai, "Trust and Trade-Offs in Sharing Data for Precision Medicine: A National Survey of Singapore" (2021) 11(9) *Journal of Personalized Medicine* 921.** DOI 10.3390/jpm11090921 (Crossref-verified). **This is ref [11] of anchor 4 and, on the dates, very likely ref 53 of anchor 3** (Olsen's single Singapore study, from which the "35% of Singaporean participants not trusting research processes and protections" figure at Olsen p 7 is drawn). ⚠️ **The Singapore→Olsen mapping is an inference from author, country and topic; Olsen's numbered bibliography was not read to confirm it. Mark as unconfirmed until checked.**
- **Angela Ballantyne, Tamra Lysaght, Hui Jin Toh, Serene Ong, Andrew Lau, G Owen Schaefer, Vicki Xafis, E Shyong Tai, Ainsley J Newson, Stacy Carter and Chris Degeling, "Sharing precision medicine data with private industry: Outcomes of a citizens' jury in Singapore" (2022) 9(1) *Big Data & Society* 20539517221108988.** DOI 10.1177/20539517221108988 (Crossref-verified). Ref [12] of anchor 4. **A Singapore citizens' jury specifically on private-industry access** — directly on the TRUST industry-access question that A13 §P1 flags as announced-but-not-operational.
- **Annette Braunack-Mayer, Belinda Fabrianesi, Jackie Street, Pauline O'Shaughnessy, Stacy M Carter et al., "Sharing Government Health Data With the Private Sector: Community Attitudes Survey" (2021) 23(10) *JMIR* e24200.** DOI 10.2196/24200 (Crossref-verified). The Australian counterpart, cited by anchor 2 at e72-15.
- **Carolyn Adams, Judy Allen and Felicity Flack, *Sharing Linked Data for Health Research* (CUP 2022).** DOI 10.1017/9781108675789. See §1.1.
- **Normann Witzleb, "Responding to global trends?: Privacy law reform in Australia" in *Data Disclosure: Global Developments and Perspectives* (de Gruyter 2023) 147–168.** DOI 10.1515/9783111010601-009 (Crossref-verified). The source anchor 2 relies on for the DAT Act's exclusion of private and foreign entities (e72-7).

## 2.6 Consensus reference list — exact URLs as returned by the tool

[1] [A survey of public attitudes toward secondary research governance oversight: Evidence from Singapore's TRUST platform](https://consensus.app/papers/details/38c88d47fa1257588bd9181b1ddd5648/?utm_source=claude_desktop) (H. J. Toh et al., 2026, 0 citations, International Journal of Population Data Science, DOI: 10.23889/ijpds.v11i1.3200)
[2] [Policy Analysis of Singapore's Health Data Sharing Legislations using the DASHECO Health Data Sharing Ecosystem Framework](https://consensus.app/papers/details/aa751f984b755f4b8211034c68626266/?utm_source=claude_desktop) (Clive Tan, 2025, 0 citations, International Journal of Integrated Care, DOI: 10.5334/ijic.icic24165)
[3] [Economic Evaluation of the Next Generation Electronic Medical Records in Singapore: Cost-Utility Analysis](https://consensus.app/papers/details/053af98449915c5f98f36d68038f34a3/?utm_source=claude_desktop) (Cynthia Chen et al., 2025, 6 citations, Journal of Medical Internet Research, DOI: 10.2196/70484)
[4] [Researchers' perceptions of the trustworthiness, for reuse purposes, of government health data in Victoria, Australia: Implications for policy and practice](https://consensus.app/papers/details/e3556a5641c35a3d950df20658e87c5b/?utm_source=claude_desktop) (Merilyn Riley et al., 2024, 2 citations, Health Information Management, DOI: 10.1177/18333583241256049)
[5] [Attitudes towards data access and sharing health data for research: a case study of Australian data custodian perspectives](https://consensus.app/papers/details/11e7a4b0051a588d8274287d2f36074b/?utm_source=claude_desktop) (Richard J. Varhol et al., 2025, 1 citations, Health Information Management, DOI: 10.1177/18333583251329533)
[6] [Deepening the data divide: Marginalised perspectives and non-profit priorities in Australian data sharing reforms](https://consensus.app/papers/details/b4513fb12a7952c395d1b83df3776db9/?utm_source=claude_desktop) (Xiaofang Yao et al., 2025, 2 citations, Big Data & Society, DOI: 10.1177/20539517241311585)
[7] [Sharing general practice data: a qualitative study with Australian general practitioners](https://consensus.app/papers/details/d80d13be8d9d51c7b052fb6110d7633a/?utm_source=claude_desktop) (Heidi Green et al., 2026, 0 citations, BMC Primary Care, DOI: 10.1186/s12875-026-03490-4)
[8] [A scientometric review of health data sharing for secondary use: Insights, frontiers and the path ahead.](https://consensus.app/papers/details/4bd529edc469576bbca1d97ea7af83c2/?utm_source=claude_desktop) (M. Krahe et al., 2025, 1 citations, Health information management : journal of the Health Information Management Association of Australia, DOI: 10.1177/18333583251393431)
[9] [Health data sharing attitudes towards primary and secondary use of data: a systematic review](https://consensus.app/papers/details/feb970c131f45a8cb1169d1a67a2b27f/?utm_source=claude_desktop) (F. Cascini et al., 2024, 74 citations, eClinicalMedicine, DOI: 10.1016/j.eclinm.2024.102551)
[10] [Toward Privacy-Preserving Data Sharing—An Australian Healthcare Perspective](https://consensus.app/papers/details/19e73b199dd65300ba1da3ce55209e5d/?utm_source=claude_desktop) (Kimley Foster et al., 2025, 1 citations, IEEE Access, DOI: 10.1109/access.2025.3545778)
[11] [Information Governance and Open Access in Australia](https://consensus.app/papers/details/f742755b992955ae9b9a1972b07223a8/?utm_source=claude_desktop) (Nikos Koutras et al., 2026, 0 citations, Journal of Information Policy, DOI: 10.5325/jinfopoli.16.2026.0003)
[12] [Patient Access to Health Data: A Review of Philosophic and Healthcare Issues](https://consensus.app/papers/details/b6d65aa2081d5306bd105a2b78fd2b78/?utm_source=claude_desktop) (Andrew Xu et al., 2024, 0 citations, Studies in health technology and informatics, DOI: 10.3233/shti231275)
[13] [Keeping good documentation: the ethical and legal issues in medical records](https://consensus.app/papers/details/1156fdbb3d16517bb48076fa8ceab412/?utm_source=claude_desktop) (P. C. Chow, 2025, 3 citations, Singapore Medical Journal, DOI: 10.4103/singaporemedj.smj-2025-042)
[14] [Implementing Indigenous Data Sovereignty in Australia: A Five‐Phase Framework for Indigenous Data Governance](https://consensus.app/papers/details/427ffaf6cb8f57a5809839002911c6e0/?utm_source=claude_desktop) (Jacob Prehn et al., 2025, 2 citations, Australian Journal of Social Issues, DOI: 10.1002/ajs4.70086)
[15] [What is the patient re-identification risk from using de-identified clinical free text data for health research?](https://consensus.app/papers/details/1dd25357976f55418f724214905bb103/?utm_source=claude_desktop) (Elizabeth Ford et al., 2025, 15 citations, Ai and Ethics, DOI: 10.1007/s43681-025-00681-0)
[16] [Fostering public trust in national health data platforms: key considerations for public involvement activities for England and Switzerland](https://consensus.app/papers/details/bde02b17dd74594f9749c7f2916ceb56/?utm_source=claude_desktop) (Paola Daniore et al., 2025, 4 citations, Data & Policy, DOI: 10.1017/dap.2024.95)
[17] [Establishment of a large-scale oral disease registry (NDCS-ODR) in a national specialty center](https://consensus.app/papers/details/e9a718d3c0d35ce4a26a72f25e953ee1/?utm_source=claude_desktop) (J.R.H. Tay et al., 2026, 1 citations, PLOS One, DOI: 10.1371/journal.pone.0341766)
[18] [Worldwide willingness to share health data high but privacy, consent and transparency paramount, a meta-analysis](https://consensus.app/papers/details/c223e32d20c45eac9ffc42fe1346e878/?utm_source=claude_desktop) (Quita Olsen et al., 2025, 16 citations, NPJ Digital Medicine, DOI: 10.1038/s41746-025-01868-9)
[19] [Public data sharing legislation, privacy and sharing of health and social welfare data in Australia: a legal and policy document analysis](https://consensus.app/papers/details/ee40d4726a07556480f1218dcbcb6df7/?utm_source=claude_desktop) (James Scheibner et al., 2025, 0 citations, Data & Policy, DOI: 10.1017/dap.2025.10038)

*Citation counts are Consensus's own as at 3 September 2026; note [18] shows 16 citations there against the 0 shown for [19], which is a recency artefact, not a quality signal.*

---

# PART 3 — READING ORDER AND GAPS

## 3.1 Reading order

| Order | Read | Why first | Best cited for — with the pinpoint |
|---|---|---|---|
| **1** | **Scheibner et al., *Data & Policy* 7:e72 (2025)** | The only anchor that is *about* the comparator limb, fully retrieved, open access, and structurally analogous to the Singapore question. It sets the frame everything else fits into. | **The transferable proposition**: a sharing statute laid over an unchanged privacy baseline does not change what may be shared — **e72-1**. And the **statutory definition of "derived information"** (WA PRIS Bill s 170(d)(iv)) — **e72-11**. |
| **2** | **Toh et al., *IJPDS* 11(1):15 (2026)** | Short, open access, and the only empirical work on TRUST. Read straight after, because it supplies the Singapore-side facts against which anchor 2's Australian architecture is compared. | **TRUST's tiered DAC→MOH review and its 2–5 week cost, and that "sensitive data" is defined by data custodians** — **p 2**. **89% support for MOH review of a foreign commercial requester** — **Table 4, p 7**. |
| **3** | **Olsen et al., *npj Digit Med* 8:540 (2025)** | The quantitative backstop for every social-licence claim in the thesis. Read third because you need the two legal/institutional papers first to know which of its strata matter. | **The commercial cliff: 80.2% for research vs 25.4% for for-profit commercial reuse** — **Table 2, p 3**. Use the **27–97% prediction interval** — **p 2** — whenever anyone quotes "77%" at you. |
| **4** | **Cascini et al., *eClinicalMedicine* 71:102551 (2024)** *(not an anchor; promoted)* | It is the review Olsen argues against and it states the primary-vs-secondary gradient directly. Cheaper to read than the scientometric review and higher-yield. | The **primary > secondary** sharing-intention gradient across all data types — the empirical shadow of the contribution/access split. **Full text not yet retrieved; pinpoint needed.** |
| **5** | **Adams, Allen & Flack, *Sharing Linked Data for Health Research* (CUP 2022), chs "Social Licence" 57–82 and "Law" 131–174** *(the probable real "Allen")* | The book-length Australian treatment of exactly this problem, and anchor 2's own foundation. | Social licence as a **contractual exchange of benefits** between community and enterprise — cited to this work at **e72-2**. |
| **6** | **Scheibner & Chan, *J Law Biosci* 12(2):lsaf021 (2025)** *(not an anchor; promoted)* | Same lead author as anchor 2, on Singapore cross-border sharing. Likely the highest-yield un-tasked paper in this digest. | Cross-border regulatory conflict for Singapore health data. **Not retrieved; retrieval needed.** |
| **7** | **Zhang, Shanmugam & Allen, *IDPL* 15(1) 48–66 (2025)** | **Read last, and only once the PDF is in hand.** It is the weakest fit of the four to the project's questions, and it is currently unread. | *Provisionally*: the consent→accountability shift in Singapore's PDPA as the frame for the HIA's mandatory contribution limb. **Unverified — see §1.1.** |

## 3.2 What the literature does not cover — where primary sources must carry the argument

| Gap | What the literature gives you | What must carry it instead |
|---|---|---|
| 🔴 **DAT Act uptake — no empirical study exists** | Architecture only (anchor 2, e72-7 to e72-9). One SA datum, one non-government recipient, 2021–22 (e72-8). Zero Commonwealth figures. | **Office of the National Data Commissioner** — the register of accredited entities and data sharing agreements, and the Commissioner's annual reports. Assign to a primary-source agent. |
| 🔴 **The 2025 statutory review of the DAT Act** | Nothing. Anchor 2 was revised July 2025 and does not discuss it. Web search indicates an **issues paper (April 2025)**, submissions closing **30 May 2025**, and a **draft report (July 2025)** whose preliminary view is that the Act is not achieving its purpose but should be reformed rather than allowed to sunset in **2027**. ⚠️ **All of that is from law-firm commentary via web search and is UNCONFIRMED against the review documents themselves.** | The review's own issues paper, draft report and final report, from the Department of Finance / ONDC. **This is the single most important primary-source task arising from my work.** |
| 🔴 **My Health Record secondary use and sharing by default** | Nothing. MHR appears once in anchor 2 as a Table 1 entry (e72-5); one thin narrative review [12] noting low utilisation. | *My Health Records Act 2012*; the Framework to guide the secondary use of My Health Record system data; the Australian Digital Health Agency's reporting; the sharing-by-default reforms for pathology and diagnostic imaging. Entirely primary-source territory. |
| 🔴 **The Health Information Act 2026 itself** | One **conference abstract** [2] on the Bill, using the DASHECO framework. Nothing peer-reviewed on the Act. | The Act, its subsidiary legislation and MOH guidance — already held in `A02a`, `E01`, `BUNDLE-CORE`. The literature adds nothing here and should not be asked to. |
| 🔴 **The NEHR contribution/access split as a legal structure** | Nothing anywhere. No paper analyses a mandatory-contribution / controlled-access architecture as such. | Hansard (`A27`), the Act, MOH materials. **This is the project's original contribution, and the literature gap is the reason it is one.** Say so. |
| 🟠 **TRUST's governing instruments** | Anchor 4 describes the review tiers from the outside (p 2). | A13 records that the **Data Requestor Agreement, Data Contributor pre-agreement and Charging Framework are not public**. Neither the literature nor primary sources reach them. This is a genuine, unresolvable evidentiary limit — state it rather than papering over it. |
| 🟠 **Derived information in Singapore** | Only the **Australian** comparator: the WA statutory definition at anchor 2, e72-11. Anchor 4 says nothing on derived information; nor does anchor 3. | Singapore primary sources. The WA definition is the best available *comparator*, not authority — and note it sits in a **Bill** that anchor 2 records as not in force until 2026 (e72-3): **re-verify its status as at 3 September 2026 before citing.** |
| 🟠 **Whether anonymisation holds** | Contested. Ford et al. [15] argue re-identification risk from de-identified free text in a Five-Safes environment is "very low"; the adversarial review's caution says identifiability is party-relative and can change. Anchor 3's respondents were all answering about de-identified data (pp 1–2). | Primary technical/governance sources on TRUST's actual de-identification. **The argument must engage [15] rather than assert the contrary**, or it will be met with it. |
| 🟡 **Singapore public opinion, current** | Anchor 4 (fielded Sept–Oct 2024, n=453, unweighted, over-educated). Anchor 3's Singapore input is a single 2021 study reflecting data collected years earlier. | Nothing more recent exists. **Any claim about Singapore public opinion in 2026 rests on a 2024 panel survey and a 2021 national survey.** Date-stamp every such claim. |

## 3.3 Three cautions to carry forward

1. **"Allen, IDPL 2025" as briefed does not exist.** The real IDPL Allen article is a Singapore smart-city consent paper (§1.1), and it is unread. The Australian health-data-governance "Allen" is almost certainly **Judy Allen**, co-editor of the 2022 CUP volume. Correct this before any draft goes out; a citation to a paper that says something other than what it is cited for is the kind of error the adversarial review exists to catch.
2. **Two of the four anchors are about attitudes, not law.** Anchors 3 and 4 measure what people say. Neither establishes anything about what an instrument requires. Keep the doctrinal and the empirical claims on separate lines — the adversarial review's instruction to distinguish "the text of an instrument; an agency's description of it; and a commentator's characterisation of it" applies with equal force to survey evidence.
3. **Every headline number in this digest is older than it looks.** Olsen's 77% describes opinion sampled to mid-2022. Toh's 89% is October 2024. Scheibner's SA figure is from 2021–22 reports accessed in September 2024. None of them is a 2026 measurement, and none of them post-dates the Health Information Act 2026.
