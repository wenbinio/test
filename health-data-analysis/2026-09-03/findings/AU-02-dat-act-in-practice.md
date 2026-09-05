# The Data Availability and Transparency Act 2022 (Cth) in practice — uptake numbers, registers and the statutory review

**Agent:** AU-02
**Scope:** Primary-source evidence base for the claim that the DAT Act's access-limb machinery (accreditation, ADSPs, data sharing agreements, the National Data Commissioner's functions) produced very little actual sharing — assembled from dated counts in the Act's own statutory review, the National Data Commissioner's four annual reports, the public registers, and the Federal Register of Legislation.
**Retrieval date:** 3 September 2026
**Confidence:** high for the counts (every figure below is pinpointed to a document retrieved in this session, with the document's own "as at" date); medium for the *current* register state (the ONDC website is unreachable from this environment — the register figures are from web-archive captures of 11 March, 11 May and 12 June 2026, not 3 September 2026); low/nil for Senate Estimates, ANAO and Portfolio Budget Statements material (hosts unreachable — see Gaps). The operative statutory provisions (ss 138, 142, 143) are quoted from the authorised compilation at §A0.

> **Retrieval-environment note, tested 3 Sep 2026.** `www.datacommissioner.gov.au`, `www.finance.gov.au` and `www.anao.gov.au` all return connection failure to curl, to WebFetch (HTTP 503) **and to headless Chromium via Playwright** (`ERR_CONNECTION_RESET`). `parlinfo.aph.gov.au` returns 403. The route that worked for every Commonwealth document in this file was **`web.archive.org`** (CDX index + `id_` raw-content replay), plus the **Federal Register of Legislation OData API at `api.prod.legislation.gov.au`** for statutory status. `www.aph.gov.au`, `dataplace.gov.au`, `data.gov.au`, `transparency.gov.au` and `webarchive.nla.gov.au` return 200 but did not hold the documents needed (`webarchive.nla.gov.au` is behind an Anubis proof-of-work bot challenge). All PDFs are saved in `work/AU-02/`.

---

## Summary table

| # | Instrument / document (exact title) | Type | Issuing body | Citation | Date made / issued | Status as at 3 Sep 2026 | Relevance | Source | P/S |
|---|---|---|---|---|---|---|---|---|---|
| 1 | Data Availability and Transparency Act 2022 | Act | Parliament of the Commonwealth | Act No. 11 of 2022 | Made 31 Mar 2022; registered 4 Apr 2022 | **In force**; unamended since compilation No. 4 (11 Dec 2024); Register records a future status of **"Ceased" from 1 Apr 2027 23:59, reason "Self Ceasing"** | The instrument whose access limb is in issue | FRL OData API `titles/C2022A00011` | P |
| 2 | Statutory Review of the Data Availability and Transparency Act 2022 – Final Report | Statutory review report (s 142) | Dr Stephen P King (independent reviewer); Dept of Finance secretariat | ISBN 978-1-925205-74-9 (online); 171 pp; cover date November 2025 | Transmitted to Minister 11 Nov 2025 | **Tabled in both Houses 3 Mar 2026.** Government response: none published (see item 4) | Source of the load-bearing uptake numbers | Wayback replay of finance.gov.au PDF | P |
| 3 | Statutory Review of the DAT Act 2022 – Issues Paper | Consultation paper | Dept of Finance / the Review | 13 pp | Released 30 Apr 2025; consultation closed 30 May 2025 | Closed; 62 submissions | Earliest dated uptake counts (as at 20 Mar 2025) | Wayback replay | P |
| 4 | Statutory Review of the DAT Act 2022 – Draft Findings and Recommendations | Consultation paper | Dept of Finance / the Review | 29 pp | Released 18 Jul 2025; consultation closed 8 Aug 2025 | Closed; 25 submissions | Uptake counts as at 1 Jul 2025 | Wayback replay | P |
| 5 | Government response to the Statutory Review | — | Australian Government | — | — | **NOT PUBLISHED / NOT LOCATED as at 3 Sep 2026** — see §A4 | Would settle the sunset question | — | — |
| 6 | Annual Report of the National Data Commissioner 2021-22 | Statutory annual report (s 138) | National Data Commissioner | ISSN 2653-6625; 17 pp; dated October 2022 | Oct 2022 | Published | Baseline: nil activity | Wayback replay | P |
| 7 | Annual Report of the National Data Commissioner 2022-23 | Statutory annual report (s 138) | National Data Commissioner | 15 pp; PDF created 29 Sep 2023 | Sep/Oct 2023 | Published | Year-1 counts | Wayback replay | P |
| 8 | Annual Report of the National Data Commissioner 2023-2024 | Statutory annual report (s 138) | National Data Commissioner | 17 pp; PDF created 15 Oct 2024 | Oct 2024 | Published | Year-2 counts | Wayback replay | P |
| 9 | Annual Report of the National Data Commissioner 2024–2025 | Statutory annual report (s 138) | National Data Commissioner (Acting, Dr Andrew Taylor) | 49 pp; letter of transmittal 22 Sep 2025 | Sep/Oct 2025 | Published; **most recent** | Year-3 counts, incl. refusals/cancellations | Wayback replay | P |
| 10 | Annual Report of the National Data Commissioner 2025-26 | Statutory annual report (s 138) | National Data Commissioner | — | — | **NOT PUBLISHED / NOT LOCATED as at 3 Sep 2026** — see §B5 | Would be the first post-review report | — | — |
| 11 | Register of accredited entities | Statutory public register (s 45 / Pt 5.2) | ONDC | — | Continuously maintained | Live site unreachable; **latest archived capture 12 Jun 2026 shows 42 entities** | Direct evidence of accreditation uptake | Wayback capture | P (archived) |
| 12 | Register of data sharing agreements | Statutory public register (s 45) | ONDC | — | Continuously maintained | Live site unreachable; **latest archived capture 11 May 2026 shows 8 agreements**; page's own "Last updated" field reads 30 Apr 2025 | Direct evidence of sharing uptake | Wayback capture | P (archived) |
| 13 | Data Availability and Transparency (Australian National University) Authorisation 2026 | Notifiable instrument | Made under the DAT Act | F2026N00551 | Made 22 Jul 2026; registered 30 Jul 2026 | **In force** | Only DAT Act instrument made after the Final Report was tabled | FRL OData API | P (metadata only — text not retrieved) |
| 14 | Data Availability and Transparency Code 2022 / (National Security Measures) Code 2022 / Amendment (No. 1) Code 2025 / Regulations 2022 / Transitional Rules 2022 | Subordinate legislation | Commissioner / Minister / GG | F2022L01719; F2022L01722; F2025L00701 (**Repealed**); F2022L00601; F2022L01260 | 2022–2025 | As shown | The Scheme's operative subordinate machinery | FRL OData API | P |

---

## PIPELINE — not yet decided / outstanding as at 3 September 2026

### P1. The sunset: 1 April 2027 — no amending legislation exists

- **Status as at 3 Sep 2026:** the DAT Act's latest compilation is **compilation No. 4, register ID `C2024C00820`, in force from 11 December 2024**, and it is the **latest** version on the Federal Register. There is **no later compilation and no amending Act**.
- The Register's own status record for the Act carries a single future-status entry: `{"status":"Ceased","start":"2027-04-01T23:59:00","reasons":[{"affect":"Cease","markdown":"Self Ceasing"}]}`.
- **URL (retrieved):** `https://api.prod.legislation.gov.au/v1/titles/C2022A00011` and `https://api.prod.legislation.gov.au/v1/Versions?$filter=titleId eq 'C2022A00011'` — **Retrieved successfully: yes** (3 Sep 2026).
- **What is outstanding:** Recommendation 1 of the Final Report ("The DAT Act should not sunset, subject to it being amended…", p. 39) requires legislation. The Review itself noted at ¶466 (p. 117) that "it may be necessary to extend the operation of the DAT Act while the necessary amendments are made". **No such Bill was located** (search paths in §Gaps). On the Register's face, the Act ceases in **seven months** from the retrieval date with no amendment on foot.

### P2. Government response to the Statutory Review — not published

- Department of Finance review landing page, **page "Updated: 04 March 2026"**, archived 18 May 2026: *"The Government is considering its response to the Review."*
- ONDC statutory-review page, **"Last updated 24 April 2026"**, archived 15 May 2026: same sentence.
- No later statement located. See §A4 for the full search path.

### P3. National Data Commissioner — acting appointment

- The inaugural Commissioner, Gayle Milnes, announced she was "standing down from the role and retiring from the Australian Public Service on 22 August 2025"; "Dr Andrew Taylor will act as National Data Commissioner from 23 August" (ONDC DataPoints, published 18 Aug 2025).
- The 2024–25 annual report is signed by "Dr Andrew Taylor, Acting National Data Commissioner", 22 September 2025 (p. 1).
- An **"Acting National Data Commissioner's Statement of Intent – JAN 2026"** exists on the ONDC site (file path `sites/default/files/2026-01/`, archived 16 Feb 2026), indicating the office was still filled in an acting capacity in January 2026.
- Whether a substantive Commissioner has since been appointed: **NOT LOCATED** (ONDC site unreachable).

---

## A. The Statutory Review

## A0. The statutory provisions themselves — ss 142, 143 and 138 as enacted

**Source:** *Data Availability and Transparency Act 2022* (Cth), **Act No. 11 of 2022**, **Compilation No. 4**, compilation date **11 December 2024**, registered 18 December 2024, includes amendments up to Act No. 128, 2024. Authorised PDF (`isAuthorised = true` on the Register's OData record), 170 pp, extracted by agent AU-01 and read by this agent at `out/AU-01-DAT-Act-2022-full-text.txt`. **Retrieved successfully: yes.** *(This closes the statutory-text gap recorded earlier in this session; the working route is `https://www.legislation.gov.au/C2022A00011/2024-12-11/2024-12-11/text/original/pdf`, not the SPA landing page.)*

**s 142 — Periodic reviews of operation of Act.** s 142(1): "The Minister must cause periodic reviews of the operation of this Act to be undertaken." s 142(2): a review "must start by, and be completed within 12 months (or a longer period agreed by the Minister) of: (a) the third anniversary of the commencement of this section" — and (b) three months after any Privacy Act amendments made in response to the review announced by the Attorney-General on 12 December 2019 that "in the Minister's opinion, are likely to have a material impact on the data sharing scheme". s 142(4): "A review is taken to be completed when the Minister is given the report about the review." s 142(5): "The Minister must cause a copy of the report about each review to be laid before each House of the Parliament within 15 sitting days of that House after the Minister receives the report."

*Compliance check on the face of the record:* commencement 1 April 2022 → third anniversary 1 April 2025; the reviewer was appointed and the review formally commenced **27 March 2025** (five days inside the deadline); the report was given to the Minister **11 November 2025**, within 12 months of the start; it was laid before both Houses **3 March 2026** (per the Department of Finance). **The s 142 machinery was complied with.**

**s 143 — Sunset of the data sharing scheme.** s 143(1): "Subject to this section, this Act ceases to have effect at the end of the day (the sunset day) that is **the fifth anniversary of the commencement of this section**." Commencement was 1 April 2022, giving a sunset day of **1 April 2027** — which is exactly what the Federal Register's own status record shows ("Ceased", start `2027-04-01T23:59:00`, reason "Self Ceasing"). s 143(2)–(4) permit transitional regulations to be made in the window "starting 12 months before the sunset day and ending immediately before the first anniversary of the sunset day", which may "provide that certain provisions of this Act continue to apply, or to apply in a modified way, after the sunset day". **That regulation-making window opened on 1 April 2026 and no such regulation has been made.** Verified two ways on 3 Sep 2026: (i) the FRL title search for all instruments named "Data Availability…" (§D1) returns nothing later than F2026N00551, an authorisation; and (ii) the *Data Availability and Transparency Regulations 2022* (F2022L00601) are still at compilation No. 2, in force from **1 July 2023**, with no amendment since (`api.prod.legislation.gov.au/v1/Versions?$filter=titleId eq 'F2022L00601'`).

**s 138 — Annual report.** s 138(1) requires the Commissioner, after each financial year, to "prepare and give a report to the Minister, for presentation to the Parliament, on the Commissioner's activities during the financial year". s 138(2) prescribes the content, and it is s 138(2)(d) that generates the counts relied on throughout §B: **(d)(i)** the number of requests received by data custodians from accredited users and the reasons for their being "agreed to or refused"; **(d)(ia)** the number refused where reasons were not given within the s 25(3) time; **(d)(ii)** "the number of data sharing agreements made"; **(d)(iii)** "the number of entities accredited"; **(d)(iv)** "the number of accredited entities as at the end of the financial year"; **(d)(v)** scheme complaints; **(d)(vi)** general complaints; **(d)(vii)** complaints received by data custodians. s 138(2)(f) requires the APS staffing number and s 138(2)(g) a report on financial matters. s 138(4): the report "must be given to the Minister by the 15th day of the fourth month after the end of the financial year" — i.e. **by 15 October**.

**Two consequences for the argument.** First, the uptake counts in §B are not incidental management reporting: they are **statutorily mandated disclosures**, which is why their silences (§B2) matter — the Act does *not* require reporting of applications received, withdrawn or refused, of accreditation suspensions or cancellations, or of terminated agreements, so their absence from the early reports is a gap in the statutory reporting scheme rather than proof of nil. Second, s 138(4) sets a 15 October deadline, which confirms that the absence of a 2025-26 report on 3 September 2026 is **not a default** (§B5).


### A1. The review power and the review's own procedural facts

- **Statutory basis.** Final Report, "Timing" (p. 7): *"Section 142 of the DAT Act requires periodic reviews of the DAT Act, and for an initial review to commence by 1 April 2025 and be completed by 1 April 2026 (the third and fourth anniversaries of the commencement of the Act)."* The same page records that the review "is taken to be completed when the Minister responsible for the DAT Act is given a written report", and that "[a] copy of the report must be provided to each House of the Parliament within 15 sitting days after the Minister receives it."
- **Sunset provision.** Final Report ¶465 (p. 117): *"Without legislative intervention, the DAT Act will sunset on 1 April 2027 (section 143)."*
- **Reviewer.** Final Report, "Reviewer" (p. 7): *"The Minister for Finance, Senator the Hon Katy Gallagher (the Minister), appointed Dr Stephen P King as the independent reviewer on 27 March 2025."* The Department of Finance page adds: "Dr King is a Commissioner to the Productivity Commission and Professor of Practice at Monash University."
- **Secretariat.** Provided by the Department of Finance and the Australian Bureau of Statistics (Letter of Transmittal, p. 6).
- **Transmission.** Letter of Transmittal is dated **11 November 2025** (p. 6). The Finance page states the Review "was provided to the Minister for Finance on 11 November 2025".
- **Tabling.** Department of Finance, *Statutory Review of the Data Availability and Transparency Act 2022* page (page "Updated: 04 March 2026"; Wayback capture 18 May 2026): **"The Minister presented a copy of the Final Report to both Houses of the Parliament on 3 March 2026."** *Caveat:* this is the responsible department's own statement, not the parliamentary record. The Journals of the Senate / Votes and Proceedings entry for 3 March 2026 was **not** independently retrieved (see §Gaps).
- **Publication.** The report PDF sits in the Finance file store under `sites/default/files/2026-03/`; the PDF's embedded creation date is 24 February 2026 and its cover carries "November 2025".
- **URL (retrieved):** `https://www.finance.gov.au/sites/default/files/2026-03/statutory-review-of-data-availability-and-transparency-act-final-report.pdf`, via `https://web.archive.org/web/20260410210214id_/…` — **Retrieved successfully: yes** (1,461,768 bytes, 171 pages, PDF 1.7). Direct fetch of the finance.gov.au URL: **Retrieved successfully: no** (HTTP 403 to curl; HTTP 503 to WebFetch; `ERR_CONNECTION_RESET` to Playwright).

### A2. Terms of Reference (verbatim list, Final Report p. 7)

The Review considered:
1. "Does the Act support improved public sector data availability and transparency, including sharing public sector data in a controlled way?"
2. "Has the operation of the Act advanced its objects?"
3. "How does the operation of the Act compare and interact with other existing mechanisms for facilitating access to, sharing and use of public sector data?"
4. "Stakeholder satisfaction with the operation of the Act as a tool for reducing barriers and enabling effective access to, sharing and re-use of public sector data."
5. "Should the Act remain in force past its current sunset date of 1 April 2027?"
6. "Any other relevant matters."

**Conduct** (p. 7): Issues Paper released **30 April 2025**, consultation closed **30 May 2025** → **62 public submissions** and **26 meetings** with key stakeholders. Draft Findings and Recommendations paper released **18 July 2025**, consultation closed **8 August 2025** → **25 public submissions**.

### A3. Every quantitative statement in the Final Report about uptake

Each row gives the figure, the "as at" date the report itself attaches to it, and the page/paragraph pinpoint.

| Figure | The report's own "as at" date | Pinpoint |
|---|---|---|
| **8 data sharing agreements** registered under the DAT Act — "all have been between Australian Government entities for the purposes of building the NDDA"; "To date, no other requests for data under the DAT Act have been agreed to" | no date given; report transmitted 11 Nov 2025 | p. 33, ¶90 |
| **The only data asset created using the DAT Act is the National Disability Data Asset** | "As of August 2024" | p. 21, ¶20 |
| **Over 11,000 data sharing agreements *outside* the DAT Act**, from a survey of **19 Commonwealth Government agencies** (report notes some may pre-date the Act) | "In June 2024" | p. 21, ¶21; source given as footnote 11 |
| **62 data requests total through Dataplace since its June 2022 launch**, of which **37 were made by accredited entities under the DAT Act** and **25 were general requests** | "as of 30 September 2025" | p. 36, ¶106; sourced to "Submission 38, National Data Commissioner" (fn 43) |
| **ONDC has accredited 36 Users and 14 ADSPs** | "As at 30 September 2025" | p. 65, ¶241 |
| **125 organisations onboarded to Dataplace** | "as at 30 September 2025" | p. 138 (Appendix C), sourced "(ONDC 2025)" |
| **Average time to assess a DAT Act data request: 39 days**; two Australian Government entities averaged **79 and 111 days** | "(as of May 2025)" | p. 35, ¶102 |
| Australian Government Data Catalogue: **36,000+ dataset records from 70 custodians**; 150 with access restrictions, 150 with conditions of use; **5,485 site visits and 10,242 metadata records viewed** since launch **8 July 2024** | "As of September 2025" | p. 138 |
| **NDDA first release brought together 18 datasets** | December 2024 (per ONDC AR 2024-25 p. 18) | (Final Report p. 33 ¶91 records the NDDA agencies' reported intention to stop using the DAT Act) |
| ONDC "has around **40 permanent staff** … with a **budget of $16 million for 2024-25**" | statement in the Issues Paper, 30 Apr 2025 | Issues Paper p. 10 |

**Note on internal inconsistency worth flagging to the compilers.** Two ONDC-sourced totals for the *same* metric differ by one and by three:
- Final Report ¶241 (p. 65): **36 Users and 14 ADSPs as at 30 September 2025**.
- ONDC Annual Report 2024–25 (p. 21, Figure 9): **33 Accredited Users and 13 Accredited Data Service Providers as at end of 2024–25 (30 June 2025)**.
- Archived register, 11 March 2026 capture: **37 Accredited Users and 14 ADSPs**.
These are consistent as a *trajectory* (33→36→37 users over 30 Jun 2025 → 30 Sep 2025 → 11 Mar 2026), but do not cite them as if they were the same date.

### A4. The Review's *characterisation* of uptake — clearly labelled as characterisation, not as a count

These are the Reviewer's own evaluative statements. They are **not** the numbers, and the project's claim should not rest on them.

- **p. 11 (Executive Summary):** "The DAT Act's limited uptake is largely due to these design issues" *(characterisation)*.
- **p. 12 (Executive Summary):** the Act's authorisation framework is "overly prescriptive and voluntary for custodians, resulting in limited uptake for public sector data sharing" *(characterisation)*.
- **p. 33, ¶87:** "Fundamental flaws with the DAT Act have prevented it from driving additional sharing of public sector data" *(characterisation)*.
- **p. 41, ¶131:** "uptake of the DAT Act for public sector data sharing has been very limited" *(characterisation)*.
- **p. 14 / p. 117, ¶468:** if Recommendations 1–3 are not implemented, "the DAT Act's authorising framework will continue to be ineffective and underutilised, and should be allowed to sunset" *(characterisation)*.
- **p. 32:** "there are still significant use cases where the sharing of data would provide benefits to Australia and these are not being exploited" *(characterisation)*. The illustration given is **Box 1, the GenV project** (p. 32), a Murdoch Children's Research Institute longitudinal cohort of "nearly 125,000 Victorian children born between 2021 and 2023 and their parents", which has consent "including explicit permission to access Medicare records and identifiers" but faces "significant uncertainty" — **directly relevant to the health-data comparator**.

### A5. All 15 recommendations, with pinpoints — those touching the sharing pathway, accreditation, ADSPs, the sunset and the Commissioner

| Rec | Text (verbatim) | Page | Touches |
|---|---|---|---|
| 1 | "The DAT Act should not sunset, subject to it being amended to provide a clear authorising pathway that enables greater and better sharing of Commonwealth data for approved purposes." | 39 | **Sunset; sharing pathway** |
| 2 | "The DAT Act's authorising framework should be amended to take a principles-based approach to ensure clarity and flexibility." | 45 | **Sharing pathway** |
| 3 | "The DAT Act should embed a default posture of agreeing to share data, with data custodians able to refuse requests in appropriately limited circumstances, subject to oversight and review." | 49 | **Sharing pathway; custodian veto** |
| 4 | "The National Data Commissioner's functions and powers should be recalibrated to focus on assurance, oversight and assistance in facilitating data sharing decisions." | 59 | **Commissioner** |
| 5 | "The DAT Act should establish a permissions-basis for accreditation which replaces the current strict 'user' and 'data service provider' accreditation designations." | 72 | **Accreditation; ADSPs** |
| 6 | "Explicit accreditation categories should be introduced to more simply reflect the application of different accreditation standards and to facilitate alignment between accreditation and data sharing use-cases." | 73 | **Accreditation** |
| 7 | "Transparency and other measures which promote greater regulatory flexibility in respect of DAT Act accreditation should be introduced and have consideration to broader developments in the data system." | 75 | **Accreditation** |
| 8 | "The entities that can seek accreditation to request and use data under the DAT Act should be expanded to include ACCOs, not-for-profit research institutes (including independent research organisations and medical research institutes), PHNs, and not-for-profit service delivery organisations (including Approved Aged Care Providers)." | 83 | **Accreditation eligibility — health-relevant** |
| 9 | "The DAT Act should include a power which allows the Minister to expand accreditation eligibility further, subject to advice from the National Data Commissioner (or other appropriate office or body with appropriate expertise)." | 86 | **Accreditation; Commissioner** |
| 10 | "Expand the data sharing purposes to include data curation and the creation of data assets" | 90 | **Sharing pathway** |
| 11 | "Improve the operation of the service delivery purpose, and particularly the interaction with the prohibition on enforcement-related purposes." | 91 | **Sharing purposes** |
| 12 | "Embed Indigenous data governance frameworks into decision-making processes and expand the participation in the DAT Act so that First Nations peoples are better heard, recognised and empowered to contribute to positive outcomes for Indigenous communities." | 97 | Participation |
| 13 | "The DAT Act should explicitly recognise the roles of states and territories in Commonwealth processes that involve jurisdictional data." | 101 | Federal interface |
| 14 | "Longer term, there should be a nationally consistent data sharing framework that achieves full interoperability across jurisdictions and provides standardised pathways for users to access Australian public sector data held by any government." | 101 | Federal interface |
| 15 | "Further investment in the data ecosystem is required to improve capability and enable better outcomes for participants." | 114 | Non-legislative |

**Implementation** (¶¶467–470, pp. 117): "if only certain recommendations were to be prioritised, the Review considers Recommendations 1 to 3 to be essential"; "Recommendations 4 to 11, 13 and 14 will require legislative changes to implement. In contrast, Recommendations 12 and 15 could be implemented without legislative change."

### A6. Consultation papers published by the Review

**Issues Paper**, 13 pp, released 30 April 2025 (`finance.gov.au/sites/default/files/2025-04/statutory-review-of-the-dat-act-issues-paper.pdf`, via Wayback capture 23 Jun 2025 — **Retrieved successfully: yes**). Key dated figures, all at p. 10 ("Progress to date"):
- "As of **20 March 2025**, **34 entities are accredited** to participate in the DATA Scheme (**17 Commonwealth entities, 10 State & Territory entities, and 7 Universities**)."
- "There have been **8 data sharing agreements** under the DATA Scheme since the DAT Act commenced, all of which are related to the delivery of the National Disability Data Asset (NDDA)."
- Footnote 4: "To date, there have been **30 data sharing requests** for data under the DATA Scheme."
- "In June 2024, a survey of 19 Commonwealth entities showed those agencies had over **11,000 data sharing agreements outside** of the DATA Scheme."
- "The ONDC has around **40 permanent staff** … with a **budget of $16 million for 2024-25**."
- On the Commissioner's powers: "At present **only some of these powers have been exercised** by the Commissioner. The Commissioner has used their powers to make two data codes under section 126 of the DAT Act."

**Draft Findings and Recommendations paper**, 29 pp, released 18 July 2025 (`…/2025-07/dat-act-review-draft-findings-and-recommendations.pdf`, via Wayback capture 12 Oct 2025 — **Retrieved successfully: yes**). At pp. 6–7:
- "As of **1 July 2025**, **17 Australian Government entities, 10 state and territory entities, and 10 Australian universities** have been accredited as a user or data service provider, and there have been **34 requests for data** under the DAT Act."
- "While **8 data sharing agreements** have been registered under the DAT Act, all of these have been between Commonwealth agencies for the purposes of building the National Disability Data Asset (NDDA). **To date no other requests for data under the DAT Act have been agreed to.**"
- "the DAT Act has **not yet driven material additional sharing** of public sector data" *(characterisation)*.

### A7. Government response

**NOT PUBLISHED / NOT LOCATED — attempted:** (i) Department of Finance review landing page (`finance.gov.au/government/public-data/public-data-policy/statutory-review-data-availability-and-transparency-act-2022`), latest Wayback capture **18 May 2026**, page's own "Updated" stamp **4 March 2026** — reads "The Government is considering its response to the Review."; (ii) Department of Finance publications page for the Final Report, Wayback capture 15 May 2026 — same sentence; (iii) ONDC statutory review page, "Last updated 24 April 2026", Wayback capture 15 May 2026 — same sentence; (iv) Federal Register of Legislation OData query for all titles containing "Data Availability" — **no amending Act, and no Bill-originated title, after 2022**; (v) ONDC news feed (below); (vi) two targeted web searches for a ministerial response or media release. **A confirmed negative on the record retrievable from this environment.**

### A8. A further dated negative — the ONDC published no news for eight months

The ONDC news index, archived **12 June 2026**, shows "Showing 1 - 10 of 38" with the most recent item dated **15 October 2025** ("APS Data Awards 2026 – Nominations are open now"). The same list at the 16 February 2026 capture is identical. **The ONDC published nothing about the tabling of the Final Report, and nothing at all, between 15 October 2025 and at least 12 June 2026.**

---

## B. National Data Commissioner annual reports — the dated counts

All four reports are made under **s 138** of the DAT Act and are addressed to the Minister for Finance for presentation to the Parliament. All were retrieved from web-archive replays of `datacommissioner.gov.au` file paths. **Tabling dates for the annual reports themselves were not located** (parlinfo 403).

### B1. Master table of counts (all figures pinpointed; blank = the report is silent)

> **Pinpoint convention:** page references to the annual reports are **PDF page numbers in the retrieved file**, because the reports carry two different printed folios per PDF page (a left/right spread). Page references to the Final Report, the Issues Paper and the Draft Findings paper are likewise PDF page numbers, which in those documents run one behind the printed folio.

| Metric | 2021-22 (to 30 Jun 2022) | 2022-23 (to 30 Jun 2023) | 2023-24 (to 30 Jun 2024) | 2024-25 (to 30 Jun 2025) |
|---|---|---|---|---|
| **Accredited Users (cumulative)** | 0 — "There was no data sharing activity in the reporting period" (PDF p. 14, App. 1, 138(2)(d)(vii)) | **4** (at-a-glance, PDF pp. 4–5; narrative, PDF p. 9) | **24** (at-a-glance, PDF pp. 4–5; narrative, PDF p. 9) | **33** (p. 10 at-a-glance; p. 21, Fig. 9) |
| **Accredited Data Service Providers (cumulative)** | 0 | **6**, "accredited under Ministerial Rule" (PDF pp. 4–5) | **11**, "with 7 of these also Accredited Users" (p. 9) | **13**, "including 3 renewed accreditations" (p. 10; p. 21) |
| **Total accredited entities** | 0 | **9** (AIHW accredited as both) (PDF p. 9) | **28**, up "from 9 to 28" (PDF p. 9) | **37** — "17 Australian Government agencies, 10 state and territory government agencies, and 10 Australian universities" (Commissioner's foreword, p. 4; full list at Fig. 3, p. 15) |
| **Accreditations granted in-year** | 0 | 4 users + 6 ADSPs | 20 users + 5 ADSPs (PDF p. 9) | 9 users (4 Cth, 2 State/Territory, 3 universities) + 2 ADSPs + 3 ADSP renewals (p. 20; Fig. 9 p. 21 states "10 Accredited Users") |
| **Applications in assessment / pipeline** | — | **9 being assessed**, "a further 15 were in the pipeline" (PDF p. 9); at-a-glance: 6 user + 3 ADSP applications being assessed, 15 users exploring (PDF pp. 4–5) | — | — |
| **Accreditation conditions imposed** | — | — | in-year: **1 data user and 5 data service providers** (PDF p. 9) | cumulative **11**; in-year **4 Accredited Users and 3 ADSPs** (pp. 10, 20–21) |
| **Accreditation suspensions** | — | — | — | **0** (cumulative) (pp. 10, 21) |
| **Accreditation cancellations** | — | — | — | **1** — "one accreditation was cancelled due to a machinery of government change" (p. 20; Fig. 9 p. 21) |
| **Accreditation applications refused** | — | — | — | **1** — "one accreditation application was refused" (p. 20); at-a-glance "1 accreditation assessment refusal" (p. 10) |
| **Data sharing requests under the Scheme (cumulative)** | 0 | **0** (PDF pp. 4–5; PDF p. 9: "there were no data sharing requests, refusals, or data sharing agreements made under the Scheme during the year") | **8** (PDF pp. 4–5; footnoted: "includes one data request in 2022-23 which was previously reported as a general request") | **34** (p. 10; Fig. 5 p. 17) |
| **General (non-Scheme) requests through Dataplace (cumulative)** | 0 | **6** (PDF pp. 4–5) | **22** (PDF pp. 4–5) | **23** (p. 10) |
| **Requests in-year, all types** | — | 6 | 24 (PDF p. 9: "ticked up from 6 in 2022-23 to 24 in 2023-24") | 27 (p. 16: "increase from 24 in 2023–24 to 27 in 2024–25"; "All requests were made under the Scheme, except for one") |
| **Requests refused by data custodians** | — | **0** | **3 of 7** Scheme requests in-year; reasons: 1 "data was already available and accessible", 2 "could be resolved using other legislative authorisations" (p. 9) | **7** refused in-year; **6** agreed; "Nil" refusals where reasons were late (Fig. 7, p. 19). "The ONDC confirmed 3 of these parties agreed to share the data outside the DATA Scheme as a general share" (p. 19) |
| **Requests pending at year end** | — | — | **2** (PDF p. 9) | **11** (PDF p. 16) |
| **Data sharing agreements registered under the Scheme (cumulative)** | **0** | **0** | **2** — "the first 2 DATA Scheme data sharing agreements – a major milestone. These agreements help create the National Disability Data Asset" (PDF p. 9) | **8** (p. 10); plus "3 data sharing from a variation to data sharing agreements" and "2 administrative variations" |
| **DSAs made in-year** | 0 | 0 | 2 | **6**, plus **3 variations authorising additional data** — "The 6 data sharing agreements under the Scheme and the 3 variations to Scheme agreements were to build the National Disability Data Asset (NDDA)" (p. 18) |
| **General (non-Scheme) data shares (cumulative)** | 0 | — | **10** — *corrected to 9* by AR 2024-25 Appendix 1 (PDF p. 43) | **15** (p. 10) |
| **Total data shares in-year** | 0 | 0 | **12** — *corrected to 11* by AR 2024-25 App. 1 | **14** (6 Scheme DSAs + 3 variations + 5 general), "just above our target of 13 for the year" (p. 18) |
| **Organisations onboarded to Dataplace (cumulative)** | 26 Cth agencies onboarded; Dataplace launched 1 Jun 2022 (p. 10) | **47** (39 Scheme + 8 non-Scheme), "a further 15 had commenced onboarding" (PDF pp. 4–5, 9) | **88** (PDF pp. 4–5) | **122** (p. 10; foreword p. 4: "By end June 2025 there were 122 organisations onboarded") |
| **Complaints to the Commissioner (cumulative)** | 0 | **7** — 0 Scheme, 3 general, 4 other (PDF pp. 4–5) | **12** — 0 Scheme, 6 general, 6 other (PDF pp. 4–5) | **20** — **0 Scheme**, 6 general, 14 other (p. 10) |
| **Complaints received by data custodians** | **0** (PDF p. 14) | **0** (PDF pp. 4–5) | **0** (PDF pp. 4–5) | **0** (p. 10) |
| **Data breaches** | — | — | — | **0** (p. 10) |
| **Reportable events / changes in circumstances** | — | — | — | **13** (p. 10) |
| **Codes / instruments made** | Regulations 2022 made; Ministerial Rule drafted (PDF p. 11) | **2 codes** (PDF pp. 4–5) | — | 2 codes + **1 code amendment** (*Data Availability and Transparency Amendment (No. 1) Code 2025*) + **19 guidance notes** (p. 10) |
| **Average staffing level** | **29.4** (pp. 14, 20) | **35.77** (PDF p. 11) | **47.84**, "a 30 per cent increase on the previous year" (PDF p. 13) | **48.86** (p. 41) |
| **Financial resources** | "$19.4 million in resourcing, with actual payments made of $11.3 million"; departmental expenditure **$8m** (employee $4.4m, supplier $3.6m), "$5.4 million less than budgeted" (PDF p. 14) | — | operational expenditure **$12 million**, "within 5 per cent of the funds appropriated"; employee $8m, supplier $4m, "mostly relating to the Data Inventories Pilot Program" (PDF p. 13) | operational expenditure **$9.6m** (employee $8.220m, supplier $1.425m); capital $1.207m (AGDC) + $1.012m (Dataplace); appropriation table (Table 1, p. 42): operational budget **$9,658k** appropriated / **$9,648k** paid; capital **$2,552k** / **$2,219k**; total **$12,210k / $11,868k**. "The ONDC did not charge any fees during 2024–25." |

### B2. Where the reports are silent

- **No annual report gives a count of accreditation applications *received*, *withdrawn* or *lapsed*.** Only 2022-23 reports applications "being assessed" (9) and "in the pipeline" (15).
- **No annual report before 2024-25 reports suspensions, cancellations or refusals of accreditation at all** — 2022-23 and 2023-24 have no corresponding line.
- **No annual report identifies the entity whose accreditation was cancelled, or the applicant that was refused.**
- **No annual report reports any data sharing agreement being terminated, varied adversely, or de-registered.**
- **No annual report gives a tabling date for itself.**
- 2021-22 and 2022-23 contain no Portfolio-Budget-Statements-style performance measure targets; the "target of 10" (2023-24) and "target of 13" (2024-25) data-share targets appear only in narrative.

### B3. The 37 accredited entities as at 30 June 2025 (AR 2024-25, Figure 3, p. 15)

*Australian Government (17):* Attorney-General's Department; Australian Bureau of Statistics; Australian Commission on Safety and Quality in Healthcare; Australian Institute of Family Studies; Australian Institute of Health and Welfare; Australian Securities and Investments Commission; Department of Education; Department of Employment and Workplace Relations; Department of Finance; Department of Health, Disability and Ageing; Department of Industry, Science and Resources; Department of Infrastructure, Transport, Regional Development, Communications, Sports and the Arts; Department of Social Services; Department of the Treasury; Digital Transformation Agency; National Disability Insurance Agency; Productivity Commission.

*State or Territory (10):* ACT Chief Minister, Treasury and Economic Development Directorate; NSW Department of Customer Service; NSW Health Administration Corporation; NSW Ministry of Health; Queensland Health; Queensland Treasury; South Australian Department of Treasury and Finance; Victorian Department of Health; Western Australian Department of Health; Western Australian Department of the Premier and Cabinet.

*Australian universities (10):* Monash University; Queensland University of Technology; The University of Adelaide; The University of Melbourne; The University of New South Wales; The University of Queensland; The University of Sydney; The University of Tasmania; The University of Technology Sydney; The University of Western Australia.

**Health-relevant observation:** 8 of the 37 are health portfolio bodies (ACSQHC, AIHW, Dept Health Disability and Ageing, NSW Health Administration Corporation, NSW Ministry of Health, Queensland Health, Victorian Department of Health, WA Department of Health) — yet **none of the 8 registered data sharing agreements has a health department as a party** (see §C2).

### B4. Retrieval details

| Report | URL (retrieved) | Retrieved successfully |
|---|---|---|
| 2021-22 | `datacommissioner.gov.au/sites/default/files/2022-11/Annual Report of the National Data Commissioner 2021-22.pdf` via `web.archive.org/web/20221130003821/` | **yes** (17 pp) |
| 2022-23 | `…/sites/default/files/2023-10/ONDC Annual report.pdf` via `web.archive.org/web/20231011121738id_/` | **yes** (15 pp) |
| 2023-24 | `…/sites/default/files/2024-10/ONDC_Annual report_2023-24.pdf` via `web.archive.org/web/20241107144355id_/` | **yes** (17 pp) |
| 2024-25 | `…/sites/default/files/2025-10/Annual Report of the National Data Commissioner 2024-2025.pdf` via `web.archive.org/web/20251110093906id_/` | **yes** (49 pp) |
| Direct fetch of any `datacommissioner.gov.au` URL | — | **no** — connection failure to curl, Playwright and WebFetch on 3 Sep 2026 |

### B5. 2025-26 annual report

**NOT PUBLISHED / NOT LOCATED as at 3 Sep 2026 — attempted:** full Wayback CDX enumeration of the `datacommissioner.gov.au` domain (17,279 unique URLs, `matchType=domain`), filtered for "annual" — returns exactly four annual-report PDFs, the newest being 2024-2025 in the `2025-10/` directory; the ONDC "Annual Reports" index page (latest capture 15 Jan 2026) lists "Current Annual Report: Annual Report of the National Data Commissioner 2024-2025.pdf"; the live site is unreachable. Each prior report was published in **September–October** following the financial year, so a 2025-26 report would not be expected before October 2026. **Treat as not yet published, not as a failure to report.**

---

## C. Live registers — state as at 3 September 2026

**The live registers could not be reached.** `https://www.datacommissioner.gov.au/registers/accredited-entities` and `…/registers/data-sharing-agreements` return connection failure to curl (HTTP 000), to WebFetch, and to headless Chromium via Playwright, on 3 September 2026. Both the `www` and bare-domain hosts fail. **Retrieved successfully: no.** What follows are the **nearest archived snapshots, with their capture dates**.

### C1. Register of accredited entities

**Snapshot A — capture 12 June 2026** (`web.archive.org/web/20260612204934/`). **Retrieved successfully: yes.**
- Page header: "Register of accredited entities"; the page's own **"Last updated: 16 December 2025"** — but see caveat below.
- Result count: **"Showing 1 - 10 of 42"**.
- Facet counts published on the page: **Accredited User (38)**, **Accredited Data Service Provider (14)**. Sector: **Australian Government Entity (19)**, **Australian University (12)**, **State and Territory Government Entity (11)**. Jurisdiction: Commonwealth (19), NSW (7), QLD (6), VIC (3), WA (3), SA (2), ACT (1), TAS (1).
- **Caveat on the "Last updated" field:** it reads 16 December 2025, yet the same page lists an accreditation dated **29/05/2026**. The field is stale and should not be cited as the register's currency date; cite the **capture date** instead.

**Snapshot B — capture 11 March 2026** (`web.archive.org/web/20260311063401/`). **Retrieved successfully: yes.**
- **"Showing 1 - 10 of 41"**; Accredited User (37), ADSP (14); Australian Government Entity (18), Australian University (12), State and Territory Government Entity (11).

**Entries visible with accreditation dates and types** (page 1 of each capture; the register shows entity, sector, jurisdiction, accreditation type and date, and notes "(Conditions apply)"):

| Entity | Sector | Jurisdiction | Accreditation(s) and date | Conditions |
|---|---|---|---|---|
| ACT Chief Minister, Treasury and Economic Development Directorate | State/Territory | ACT | Accredited User 12/09/2024 | — |
| Attorney-General's Department | Australian Government | Cth | Accredited User 02/08/2024 | — |
| Australian Bureau of Statistics | Australian Government | Cth | Accredited User 05/07/2023; **ADSP 11/02/2025** | — |
| Australian Commission on Safety and Quality in Health Care | Australian Government | Cth | Accredited User 29/02/2024 | — |
| Australian Institute of Family Studies | Australian Government | Cth | **ADSP 30/07/2025** | — |
| Australian Institute of Health and Welfare | Australian Government | Cth | Accredited User 29/06/2023; **ADSP 19/12/2024** | — |
| Australian Securities and Investments Commission | Australian Government | Cth | Accredited User 30/05/2024 | — |
| **Australian Trade and Investment Commission (Austrade)** | Australian Government | Cth | **Accredited User 29/05/2026** | — |
| Department of Defence | Australian Government | Cth | Accredited User 15/12/2025 | — |
| Department of Education | Australian Government | Cth | Accredited User 03/05/2024 | — |
| Department of Employment and Workplace Relations | Australian Government | Cth | Accredited User 30/03/2024; **ADSP 05/08/2025** | **(Conditions apply)** |

*(Austrade appears only in the 12 June 2026 capture; Dept Employment and Workplace Relations detail is from the 11 March 2026 capture. The 12 June capture's page 1 is otherwise identical.)*

**Pages 2–5 of the register were never archived** (Wayback holds no capture of any `?page=` URL for this register, and the live site is unreachable). The **complete** list of the 42 entities as at 12 June 2026 therefore **NOT LOCATED — attempted:** Wayback CDX prefix search on `datacommissioner.gov.au/registers/accredited-entities*`; the superseded register path `…/accredited-entity-register` (only 2025 captures, 200); the twelve individually-archived entity detail pages; `dataplace.gov.au` (its `/register` path is an account sign-up form, not a public register; `/registers`, `/accredited-entities`, `/data-sharing-agreements` all 404); `webarchive.nla.gov.au` (bot challenge). **Nearest complete list: the 37 entities named in AR 2024-25 Figure 3, at §B3, current to 30 June 2025.**

### C2. Register of data sharing agreements — complete, and complete is eight

**Capture 11 May 2026** (`web.archive.org/web/20260511093057/`). **Retrieved successfully: yes.** This is the latest of only three captures (15 Jan 2026, 16 Feb 2026, 11 May 2026).

- Page's own "Last updated: **30 April 2025**".
- Result count: **"Showing 1 - 8 of 8"** — the whole register fits on one page and was captured in full.
- Facets: Data Custodian — Australian Institute of Health and Welfare (5), Australian Bureau of Statistics (2), Department of Social Services (1). Data requestor — Australian Bureau of Statistics (8), Australian Institute of Health and Welfare (8).

| DSR number | Registration date | Data Custodian | Data requestor(s) | Purpose (register's own title) |
|---|---|---|---|---|
| DSR-03384 | 2025-03-25 | AIHW | AIHW; ABS | "Sharing of Disability Services National Minimum Dataset data originating from the Australian Capital Territory to support creation of the NDDA" |
| DSR-03399 | 2025-03-24 | AIHW | AIHW; ABS | "Sharing of Disability Services National Minimum Data Set data originating from Tasmania to support creation of the NDDA" |
| DSR-03376 | 2025-03-03 | AIHW | ABS; AIHW | "Sharing of Disability Services National Minimum Dataset data originating from South Australia to support creation of the NDDA" |
| DSR-03352 | 2025-02-26 | AIHW | ABS; AIHW | "Sharing of Hospitals data originating from the Australian Capital Territory to support creation of the NDDA" |
| DSR-03140 | 2024-09-20 | AIHW | ABS; AIHW | "Sharing of data originating from the Government of South Australia to support creation of the NDDA" |
| DSR-03110 | 2024-09-13 | ABS | AIHW; ABS | "Sharing of data originating from the Australian Government agencies to support creation of, and updates to, the National Linkage Spine, the National Linkage Map and dual-use variables for the Australian National Data Integration Infrastructure" |
| DSR-02465 | 2024-05-20 | Department of Social Services | AIHW; ABS | "Sharing of data originating from the Department of Social Services to support creation of the NDDA" |
| DSR-02467 | 2024-05-10 | ABS | ABS; AIHW | "Sharing of data originating from state and territory births and deaths registrars, and Australian Government agencies to support creation of the NDDA" |

**Four facts follow directly from this register and should be stated as facts, not inferences:**
1. **Every one of the eight registered agreements is an NDDA / ANDII build agreement.** Seven name the NDDA in their title; the eighth (DSR-03110) is the National Linkage Spine / Linkage Map for the Australian National Data Integration Infrastructure.
2. **Only three entities are ever the custodian** — AIHW (5), ABS (2), DSS (1) — and **only two entities are ever the requestor** — ABS (8) and AIHW (8), in every case jointly.
3. **The earliest registration is 10 May 2024**, i.e. **two years and one month** after the Act commenced on 1 April 2022.
4. **No agreement has been registered since 25 March 2025.** The register at the 11 May 2026 capture still shows 8 of 8 — a **13½-month gap** with no new registration, on the register's own face.

**Retrieval note on registers under the Act:** the DAT Act obliges the Commissioner to "keep public registers of Agreements, Accredited Users and Accredited Data Service Providers" (AR 2024-25, p. 30, restating s 45). The register of accredited entities states that it "provides information about organisations that are **currently accredited**" — so the cancelled accreditation reported in 2024-25 (§E1) will not appear on it, and the register cannot be used to enumerate historical accreditations.

---

## D. Other primary numbers

### D1. Federal Register of Legislation — status data (all retrieved 3 Sep 2026 via the OData API)

- **Act:** `C2022A00011`, "Data Availability and Transparency Act 2022", `collection: Act`, `isPrincipal: true`, `year: 2022`, `number: 11`, `makingDate: 2022-03-31`, `asMadeRegisteredAt: 2022-04-04T17:47:40`, `status: InForce`, `originatingBillUri` points to Bill home `r6649`.
- **`statusPossibleFuture`:** `[{"status":"Ceased","start":"2027-04-01T23:59:00","reasons":[{"affect":"Cease","markdown":"Self Ceasing"}]}]`.
- **Compilations:** No. 0 (`C2022A00011`, 31 Mar 2022) → No. 1 (`C2023C00106`, 1 Jul 2023, amended by the *National Anti-Corruption Commission (Consequential and Transitional Provisions) Act 2022* sch 1 items 108–111) → No. 2 (`C2023C00328`, 18 Oct 2023) → No. 3 (`C2024C00520`, 14 Oct 2024) → **No. 4 (`C2024C00820`, in force from 11 Dec 2024, `isLatest: true`, end 2027-04-01T23:59)**. The authorised PDF of compilation 4 is 170 pages.
- **Subordinate and related instruments under the Act** (FRL search, `contains(name,'Data Availability')`):

| ID | Title | Made | Status |
|---|---|---|---|
| C2022A00012 | Data Availability and Transparency (Consequential Amendments) Act 2022 | 2022-03-31 | InForce |
| F2022L00601 | Data Availability and Transparency Regulations 2022 | 2022-04-10 | InForce |
| F2022N00201 | Data Availability and Transparency (Authorised Officers—Treasury) Authorisation 2022 | 2022-09-08 | InForce |
| F2022L01260 | Data Availability and Transparency (Consequential Amendments) Transitional Rules 2022 | 2022-09-22 | InForce |
| F2022L01719 | Data Availability and Transparency Code 2022 | 2022-12-16 | InForce |
| F2022L01722 | Data Availability and Transparency (National Security Measures) Code 2022 | 2022-12-16 | InForce |
| F2023L01548 | DAT (Consequential Amendments) Transitional Rules (Transitional Entity) Amendment Rule 2023 | 2023-11-19 | **Repealed** |
| F2024N00252 | Data Availability and Transparency (Authorised Officers—Finance) Authorisation 2024 | 2024-03-20 | InForce |
| F2024N00499 | Data Availability and Transparency Act (Authorised Officers) Authorisation 2024 | 2024-03-27 | InForce |
| F2024N00673 | DAT (National Data Commissioner) (Education and Support Related Functions) Delegation 2024 | 2024-07-25 | InForce |
| F2025L00701 | Data Availability and Transparency Amendment (No. 1) Code 2025 | 2025-06-16 | **Repealed** |
| F2025N00987 | Data Availability and Transparency Act (Authorised Officers) Authorisation 2025 | 2025-11-18 | InForce |
| **F2026N00551** | **Data Availability and Transparency (Australian National University) Authorisation 2026** | **2026-07-22** (registered 2026-07-30) | **InForce** |

**F2026N00551 is the only instrument made under the DAT Act after the Final Report was tabled on 3 March 2026**, and is the single most recent dated act of administration of the Scheme located in this session. **Its text was not retrieved** (the Federal Register front end is an Angular single-page application that returns only the shell to curl, WebFetch and Playwright; the OData API exposes metadata but no content endpoint that resolved). Its name suggests an authorisation touching the Australian National University — which is **not** among the 37 entities on the AR 2024-25 accredited list, so it may evidence a 42nd/43rd accreditation, but **that inference is unverified and must not be asserted.**

### D2. Performance targets stated by the ONDC itself

- 2023-24: "our first 12 data shares, exceeding our target of 10 for the year" (AR 2023-24, PDF p. 9) — the 12 was later **corrected to 11** (AR 2024-25, Appendix 1, PDF p. 43).
- 2024-25: "The total of 14 data shares was just above our target of 13 for the year" (AR 2024-25, p. 18).
- **Correction of material errors** (AR 2024-25, App. 1, PDF p. 43): three figures in the 2023-24 report were wrong — data shares 12 → **11** (twice), general data shares 10 → **9**. *Any citation of the 2023-24 report's headline share counts must use the corrected figures.*

### D3. Not obtained

**Senate Estimates transcripts, Questions on Notice, Portfolio Budget Statements performance measures, and ANAO reports: NOT LOCATED — attempted:** `parlinfo.aph.gov.au` (403 to curl); `www.aph.gov.au` tabled-documents application (the React app's only exposed endpoint, `/api/otd/content`, serves static page copy; `/api/otd/documents`, `/search`, `/document`, `/results`, `/tableddocuments` all 404); `www.finance.gov.au` (Portfolio Budget Statements host — connection failure to curl, Playwright and WebFetch); `www.anao.gov.au` (connection failure); `regulatoryreform.gov.au` regulator-stocktake page for the ONDC (301-redirects to the unreachable finance.gov.au, and Wayback holds no capture after 19 April 2025). One web search returned a snippet asserting "as of 14 March 2026, 41 entities were accredited comprising 18 Australian Government entities, 12 Australian universities and 11 state and territory entities" — **that snippet was not retrieved from its source and is not relied on**; note however that it matches, exactly, the facet counts on the register capture of 11 March 2026 recorded at §C1, which *was* retrieved.

---

## E. Refusals, withdrawals, suspensions, cancellations and terminations

This section answers the specific hunt. **The confirmed negatives here are as important as the positives, and both are stated with their search paths.**

### E1. Accreditation — one cancellation and one refusal, both in 2024-25, neither named

- **AR 2024-25, p. 20:** "Also in 2024-25, **one accreditation was cancelled due to a machinery of government change** and **one accreditation application was refused**."
- **AR 2024-25, Figure 9, p. 21 ("Key reporting: accreditation"):** "**Suspensions 0**"; "**Cancellations 1**". These are cumulative-to-30-June-2025 figures per the report's own Note 1 on p. 10.
- **AR 2024-25 at-a-glance, p. 10:** "**0 accreditation suspensions**"; "**1 accreditation cancelled**"; "**1 accreditation assessment refusal**".
- **Neither entity is named**, in the annual report or on the register. The register lists only entities "currently accredited", so a cancelled accreditation leaves no trace on it.
- **AR 2021-22, AR 2022-23 and AR 2023-24 report no suspension, cancellation, refusal or withdrawal of accreditation at all** — and, unlike the 2024-25 report, contain no corresponding reporting line, so their silence is not affirmative evidence of zero. AR 2023-24 does report conditions imposed ("Conditions were imposed on one data user and 5 data service providers accredited in the year", PDF p. 9).
- **No accreditation *withdrawal* (i.e. an entity surrendering accreditation) is reported in any of the four annual reports.** **NOT PUBLISHED / NOT LOCATED — attempted:** full-text search of all four annual reports for "withdraw", "surrender", "revoke", "lapse"; the archived registers; the ONDC news feed to 12 June 2026.

### E2. Refusals of *data sharing requests* by custodians — the more numerous refusal

| Year | Scheme requests decided | Refused | Agreed | Pinpoint |
|---|---|---|---|---|
| 2021-22 | 0 | 0 | 0 | AR 2021-22 PDF p. 14 |
| 2022-23 | 0 | **0** | 0 | AR 2022-23 PDF pp. 4–5, 9 |
| 2023-24 | 7 (2 pending at year end) | **3** | 2 | AR 2023-24 PDF p. 9 |
| 2024-25 | 23 received by custodians under the Act | **7** | 6 | AR 2024-25 Fig. 7, p. 19 |

- **Reasons, 2023-24 (p. 9):** one refusal "on the basis that the requested data was already available and accessible"; two "on the basis they could be resolved using other legislative authorisations to facilitate data sharing" (PDF p. 9).
- **Reasons, 2024-25 (p. 19):** "All reasons for refusal were provided by Data Custodians within the time required by the Act. In some cases Data Custodians identified other legislative pathways for safe data sharing. In another instance, the Data Custodian provided publicly available data." Notably: "**One of the refusals was made on the basis that the Data Custodian did not consider the requesting organisation (an Accredited User) to have the necessary experience or capability to handle the public sector data requested**" — i.e. a custodian second-guessing the Commissioner's own accreditation. And: "The ONDC confirmed **3 of these parties agreed to share the data outside the DATA Scheme as a general share**."
- **Late reasons:** s 138(2)(d)(ia) requires reporting refusals where reasons were not given within the s 25(3) time. Every report answers **nil**: AR 2023-24 PDF p. 14 ("No requests were refused by data custodians in the financial year where…"); AR 2024-25 Fig. 7, p. 19 ("Nil.").
- **The Final Report's structural point on refusals (p. 33, ¶89, and p. 35, ¶101):** "data custodians can refuse requests for any reason (section 25)"; "where a dataset has multiple custodians, access to a data requestor can only be granted if all data custodians agree, meaning each data custodian effectively has a veto right"; and "[a]lthough the DAT Act requires data custodians to notify accredited users of refusal reasons, the explanation need not be informative, and users have no right of redress."

### E3. Data sharing agreements — no termination, no de-registration, on the published record

**CONFIRMED "NONE PUBLISHED".** No terminated, revoked, expired or de-registered data sharing agreement is disclosed anywhere in the record retrievable from this environment.

**Search paths exhausted:**
1. All four annual reports, full text, for "terminat", "revoke", "cease", "expire", "de-register" in relation to agreements — **nil**. The only agreement-level events reported are the 2024-25 "**3 data sharing from a variation to data sharing agreements**" and "**2 administrative variations to data sharing agreements**" (AR 2024-25 p. 10), both additive.
2. The register of data sharing agreements at all three archived captures (15 Jan, 16 Feb, 11 May 2026) — **8 of 8 in every capture, identical DSR numbers and dates**. Nothing has left the register.
3. The Final Report — records only that "8 data sharing agreements have been registered" (¶90, p. 33), with no reference to any being ended.
4. The ONDC news feed to its last item (15 Oct 2025) and to the 12 June 2026 capture — no announcement.
5. The live registers — unreachable (§C).

**But note the forward-looking negative that *is* on the record.** Final Report ¶91 (p. 33): "the Commonwealth agencies involved in the NDDA project have reported that **the DAT Act will no longer be used to support the NDDA in the future**, due to difficulties with using the DAT Act." Since **all eight** registered agreements are NDDA/ANDII agreements (§C2), this is a statement by the only parties who have ever used the Act's sharing pathway that they intend to stop using it.

---

## F. Does the access-limb-idle claim survive the numbers?

### F1. Dated timeline, 1 April 2022 → 3 September 2026

| Date | Accredited Users | ADSPs | Total accredited entities | Scheme data requests (cumulative) | **Registered data sharing agreements (cumulative)** | Source and its own "as at" |
|---|---|---|---|---|---|---|
| **1 Apr 2022** — Act commences | 0 | 0 | 0 | 0 | **0** | AR 2021-22 PDF p. 10 (accreditation opened 1 Jun 2022; Dataplace launched 1 Jun 2022) |
| **30 Jun 2022** | 0 | 0 | 0 | 0 | **0** | AR 2021-22 PDF p. 14: "There was no data sharing activity in the reporting period" |
| **30 Jun 2023** | 4 | 6 | **9** | **0** | **0** | AR 2022-23 PDF pp. 4–5, 9 |
| **10 May 2024** | — | — | — | — | **1** — first ever agreement (DSR-02467, ABS→ABS/AIHW, NDDA) | Register, capture 11 May 2026 |
| **30 Jun 2024** | 24 | 11 | **28** | **8** | **2** | AR 2023-24 PDF pp. 4–5, 9 |
| **20 Mar 2025** | — | — | **34** (17 Cth, 10 S/T, 7 uni) | **30** | **8** | Issues Paper (30 Apr 2025) p. 10, fn 4 |
| **25 Mar 2025** | — | — | — | — | **8** — last agreement ever registered (DSR-03384) | Register, capture 11 May 2026 |
| **30 Apr 2025** | — | — | — | — | 8 | Register's own "Last updated" stamp |
| **1 Jul 2025** | — | — | **37** (17 Cth, 10 S/T, 10 uni) | **34** | **8** | Draft Findings paper (18 Jul 2025) p. 6 |
| **30 Jun 2025** | **33** | **13** | **37** (17 Cth, 10 S/T, 10 uni) | **34** + 23 general | **8** (+3 variations) | AR 2024-25 pp. 4, 10, 15, 21 |
| **30 Sep 2025** | **36** | **14** | — | **37** of 62 total Dataplace requests | — | Final Report ¶¶106, 241 (pp. 36, 65) |
| **11 Nov 2025** | — | — | — | — | **8** | Final Report ¶90 (p. 33), transmitted this date |
| **3 Mar 2026** | — | — | — | — | — | Final Report tabled in both Houses |
| **11 Mar 2026** | **37** | **14** | **41** (18 Cth, 12 uni, 11 S/T) | — | — | Register capture |
| **11 May 2026** | — | — | — | — | **8** | Register capture — "Showing 1 - 8 of 8" |
| **12 Jun 2026** | **38** | **14** | **42** (19 Cth, 12 uni, 11 S/T) | — | — | Register capture |
| **22 Jul 2026** | — | — | — | — | — | F2026N00551 (ANU Authorisation 2026) made — last DAT Act instrument |
| **3 Sep 2026** | **not obtainable** — registers unreachable | | | | | Latest evidence is the 12 Jun 2026 / 11 May 2026 captures |
| **1 Apr 2027** | — | — | — | — | — | Act "Ceased — Self Ceasing" per the Federal Register, absent amendment |

### F2. What the numbers show

Stated flatly, and only from the figures above:

1. **The accreditation limb worked and kept working.** From 0 entities at 30 June 2022 the register reached 9 (30 Jun 2023), 28 (30 Jun 2024), 37 (30 Jun 2025), 41 (11 Mar 2026) and 42 (12 Jun 2026). Accreditations were still being granted after the review reported: Austrade was accredited **29 May 2026**. Thirteen guidance instruments, two codes, one code amendment and 19 guidance notes were made. Average staffing rose 29.4 → 35.77 → 47.84 → 48.86 and the office spent $8m, then $12m, then $9.6m operationally. **The apparatus was built, staffed, funded and used — by applicants.**
2. **The sharing limb produced eight agreements in four years, and none in the last seventeen months of the observable record.** First agreement registered 10 May 2024 (two years one month after commencement); eighth and last 25 March 2025; still eight at the 11 May 2026 capture.
3. **All eight agreements are the same project.** Every registered agreement is an NDDA or ANDII build agreement, and only three entities (AIHW, ABS, DSS) have ever been custodian and only two (ABS, AIHW) have ever been requestor. On the Review's words (p. 33, ¶90): the eight "have been between Australian Government entities for the purposes of building the NDDA. **To date, no other requests for data under the DAT Act have been agreed to.**"
4. **Requests were made; they mostly did not become shares.** 34 Scheme requests cumulative to 30 June 2025 against 8 agreements. In the two years in which requests were decided, custodians refused 3 of 7 (2023-24) and 7 of 23 (2024-25). Under s 25 a custodian may refuse "for any reason", and where a dataset has multiple custodians each holds an effective veto.
5. **The scheme is dwarfed by sharing outside it.** A June 2024 survey of 19 Commonwealth agencies found **over 11,000 data sharing agreements outside the DAT Act** (Final Report ¶21, p. 21).
6. **The regulatory limb registered essentially nothing to regulate.** Cumulative to 30 June 2025: **0 Scheme complaints** (of 20 complaints total), **0 complaints to data custodians in any of the four years**, **0 data breaches**, **0 accreditation suspensions**, **1 cancellation** (machinery of government), **1 application refused**.
7. **The only users of the pathway say they are leaving it.** The NDDA agencies "reported that the DAT Act will no longer be used to support the NDDA in the future" (¶91, p. 33).
8. **Nothing has been decided.** As at 3 September 2026 there is no government response, no amending Bill, and no later compilation of the Act; the Register still carries "Ceased — Self Ceasing" from 1 April 2027.

**So: the claim survives, but it must be stated precisely.** What "sat idle" is not the *whole* machinery — accreditation, guidance, platform-building and the Commissioner's education functions were all active and growing throughout, and were still growing three months after the Review reported. What sat idle is the **agreement-and-sharing pathway**: eight agreements, one project, two requesting entities, nothing new for at least thirteen months, and zero Scheme complaints because there was almost nothing to complain about. A safer formulation than "the access-limb machinery sat idle" is: *the Act's accreditation limb was used and grew steadily, while its authorisation-to-share limb produced eight agreements in four years, all for a single data asset whose participants have said they will not use the Act again.*

### F3. What the numbers do **not** show

- **They do not show that the data was not shared.** They show it was not shared *under this Act*. The 11,000+ agreements outside the DAT Act (19 agencies, June 2024) are the counterfactual. AR 2024-25 records 15 cumulative "general data shares" through Dataplace alone, and that "3 of these parties agreed to share the data outside the DATA Scheme as a general share" after a Scheme refusal (p. 19).
- **They do not show that the machinery was unused by applicants.** Demand for accreditation kept rising after the Review found the Act ineffective.
- **They do not measure volume, sensitivity or value.** A "data sharing agreement" is a unit of paperwork, not of data. The NDDA's first release "brought together 18 datasets" (AR 2024-25, p. 18) — one agreement can carry a great deal.
- **They do not establish causation.** The Review attributes low uptake to design (complexity, prescriptiveness, custodian voluntariness) — but that is its *characterisation*, not something the counts prove.
- **They cannot speak to 3 September 2026.** The most recent register evidence is 12 June 2026 (entities) and 11 May 2026 (agreements). A ninth agreement could have been registered since; nothing retrievable here would show it.
- **They do not name anyone.** The cancelled accreditation, the refused application, the seven refused requests and the refusing custodians are all unidentified in the published record.

### F4. Which numbers are missing

1. **The state of both registers on 3 September 2026** — the single most consequential gap. Requires either the live site or a later archival capture.
2. **The full membership of the 42-entity register at 12 June 2026** — pages 2–5 were never archived.
3. **The 2025-26 annual report**, which would be the first to cover the post-review period and the first to say whether any agreement was registered after 25 March 2025.
4. **Accreditation applications received, withdrawn or lapsed** — never published in any year.
5. **The identity of the cancelled and refused entities**, and of the custodians who refused requests.
6. **Any tabling date for the four annual reports** (parlinfo unreachable).
7. **Senate Estimates and Questions on Notice**, which are the usual route to inter-annual counts.
8. ~~The text of ss 142, 143 and 138~~ — **obtained; see §A0.** The provisions are now quoted from the authorised Compilation No. 4.
9. **The text of F2026N00551**, the only post-tabling instrument.
10. **Whether a substantive National Data Commissioner has been appointed** since Dr Taylor began acting on 23 August 2025.

---

## Secondary-source-only items

**None relied on.** Every figure, date and quotation in this file is taken from a document retrieved in this session that was issued by the Commonwealth (the Review, the Department of Finance, the National Data Commissioner, or the Federal Register of Legislation), served either directly or as a byte-identical web-archive replay of the issuing body's own URL.

Two search-engine assertions were **encountered and deliberately not used**: (i) "as of 14 March 2026, 41 entities were accredited comprising 18 Australian Government entities, 12 Australian universities and 11 state and territory entities" (source page unreachable — but note it coincides exactly with the retrieved 11 March 2026 register facets); (ii) various law-firm commentaries (Holding Redlich, Maddocks, Norton Rose Fulbright, Mondaq) on the Final Report — used only as leads to the primary PDF, never cited.

---

## Gaps, dead ends, and open questions

| # | What was sought | Search paths exhausted | Status |
|---|---|---|---|
| G1 | Live registers as at 3 Sep 2026 | `www.datacommissioner.gov.au` and bare domain via curl (HTTP 000), WebFetch (503) and Playwright headless Chromium with and without the session proxy (`ERR_CONNECTION_RESET`); `dataplace.gov.au` (`/registers`, `/accredited-entities`, `/data-sharing-agreements`, `/register-of-*` all 404; `/register` is an account sign-up form); `webarchive.nla.gov.au` (Anubis bot challenge on `/awa/timemap` and `/awa/cdx`); `web.archive.org` (latest captures 12 Jun 2026 / 11 May 2026) | **Nearest snapshots given with capture dates** |
| G2 | Pages 2–5 of the accredited-entities register | Wayback CDX prefix search on the register URL and on the superseded `/accredited-entity-register` path; the 12 individually-archived entity detail pages | **NOT LOCATED** — nearest complete list is AR 2024-25 Fig. 3 (37 entities, 30 Jun 2025) |
| G3 | Statutory text of ss 138, 142, 143 | ~~SPA landing page, `/downloads`, `/Details/…/Html/Text`, OData `/Content` — all dead ends; AustLII 403~~ | **CLOSED during this session** — see §A0. Working route, found by agent AU-01: `https://www.legislation.gov.au/C2022A00011/2024-12-11/2024-12-11/text/original/pdf` (authorised PDF, 170 pp). **Use the dated `/<start>/<start>/text/original/pdf` form, not `/latest/text`.** |
| G4 | Journals of the Senate / Votes and Proceedings, 3 March 2026 | `parlinfo.aph.gov.au` (403); `aph.gov.au` tabled-documents React app (only `/api/otd/content` exists and serves static copy; all plausible search endpoints 404); `aph.gov.au/…/Journals_of_the_Senate` (index lists years only to 2025) | **Tabling date rests on the Department of Finance's own statement** (page updated 4 Mar 2026) |
| G5 | Senate Estimates, QoN, PBS, ANAO | See §D3 | **NOT LOCATED** |
| G6 | Government response | See §A7 | **CONFIRMED NOT PUBLISHED as at the latest retrievable evidence (18 May 2026 capture / 4 Mar 2026 page stamp), with no later contrary evidence** |
| G7 | 2025-26 annual report | See §B5 | **Not yet published** (expected Oct 2026) |
| G8 | Text of F2026N00551 (ANU Authorisation 2026) | Same SPA problem as G3 | **Metadata only** — a follow-up agent with FRL access should retrieve it; it may evidence a further accreditation |
| G9 | Whether any agreement was registered after 25 Mar 2025 | Registers (to 11 May 2026), all annual reports, Final Report, ONDC news | **No evidence of any; not provable to 3 Sep 2026** |

**For a follow-up agent:** the two highest-value retrievals are (a) the accredited-entities and data-sharing-agreements registers **as at today** — worth trying from a different network egress, since the host is reachable in principle (it was crawled by Wayback on 28 August 2026); and (b) the **Journals of the Senate for 3 March 2026**, to convert the tabling date from a departmental assertion into a parliamentary record.

---

## Search log

**Web searches (5):** "Data Availability and Transparency Act 2022 statutory review final report"; "National Data Commissioner annual report 2024-25 accredited entities data sharing agreements"; "Government response statutory review Data Availability and Transparency Act 2022 recommendations 2026"; "Senate estimates Finance Portfolio question on notice National Data Commissioner DATA Scheme accredited entities 2026"; "Katy Gallagher media release Government response DAT Act review 2026 data sharing legislation amendment sunset extension"; plus one exact-phrase search on the tabling date.

**Host reachability probe, 3 Sep 2026** (curl, Chrome UA): `datacommissioner.gov.au` 000 · `finance.gov.au` 000 · `anao.gov.au` 000 · `parlinfo.aph.gov.au` 403 · `austlii.edu.au` 403 · `aph.gov.au` 200 · `legislation.gov.au` 200 · `oaic.gov.au` 200 · `dataplace.gov.au` 200 · `data.gov.au` 200 · `transparency.gov.au` 200 (its `api.transparency.gov.au` is denied at the egress proxy) · `webarchive.nla.gov.au` 200 but bot-challenged · `web.archive.org` 200.

**Playwright:** installed driver v1.55-era, browsers pinned at build 1194; launched with `executable_path=/opt/pw-browsers/chromium-1194/chrome-linux/chrome` (the bundled driver looks for build 1234 and fails otherwise — **do not run `playwright install`**). Reached neither `finance.gov.au` nor `datacommissioner.gov.au` with or without `proxy={"server":"http://127.0.0.1:41707"}`. **Playwright is not a workaround for these two hosts in this environment.**

**web.archive.org (the route that worked):**
- CDX domain dump: `cdx/search/cdx?url=datacommissioner.gov.au&matchType=domain&collapse=urlkey&limit=30000` → 17,279 unique URLs (saved as `work/AU-02/cdx-all.txt`). This is how all four annual report PDFs were found.
- Availability API (`archive.org/wayback/available?url=…`) to locate the three review PDFs.
- Raw-content replay with the `id_` timestamp suffix for every PDF (`…/web/<ts>id_/<url>`) — essential, as the ordinary replay injects the archive toolbar into the byte stream.
- Captures used: Final Report 20260410210214 · Draft Findings 20251012114729 · Issues Paper 20250623181916 · AR2021-22 20221130003821 · AR2022-23 20231011121738 · AR2023-24 20241107144355 · AR2024-25 20251110093906 · accredited-entities register 20260311063401 and 20260612204934 · DSA register 20260511093057 · Finance review page 20260518061659 · Finance publications page 20260515140422 · ONDC review page 20260515044136 · ONDC AR index 20260115015942 · ONDC news 20260216140839 and 20260612204007 · ONDC closing reflections 20260216134517.

**Federal Register of Legislation OData API** (`api.prod.legislation.gov.au/v1/`, plain curl, no auth, no rate limit encountered) — **this works where the front end does not**: `/v1/` lists entity sets; `/v1/titles/<id>` gives making date, registration, status and `statusPossibleFuture` (this is where the 1 April 2027 "Self Ceasing" record comes from); `/v1/Versions?$filter=titleId eq '<id>'` gives the compilation chain; `/v1/Documents?$filter=registerId eq '<id>'` gives formats and page counts; `/v1/titles?$filter=contains(name,'…')` searches. **No content/text endpoint was found** — treat the API as authoritative for *status* and useless for *text*.

**PDF parsing:** PyMuPDF (`import pymupdf`) on all seven PDFs, with page markers injected so every quotation carries a PDF page number. Note the Wayback replay truncated the 2021-22 AR at exactly 1,048,576 bytes on the first attempt (`id_` variant); re-fetching **without** the `id_` suffix and with `--retry 4 --retry-all-errors -C -` returned the complete 4.7 MB file. Check `page_count` after every download.

**Overlap with AU-01:** AU-01's early capture `work/AU-01/dat-latest-text.raw` is the same Angular SPA shell this agent hit at G3. AU-01 subsequently found the working route — the **dated authorised-PDF path** `legislation.gov.au/C2022A00011/2024-12-11/2024-12-11/text/original/pdf` — and published the full text at `out/AU-01-DAT-Act-2022-full-text.txt`. This agent read ss 138, 142 and 143 from that file rather than re-retrieving them; §A0 is the only part of this file sourced from another agent's retrieval, and it is a compilation PDF, not a paraphrase. **Any other agent needing Commonwealth statutory text should use that dated path, not `/latest/text`.**
