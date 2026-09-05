# Australia — "Sharing by default" for My Health Record: the contribution limb and the access limb

**Agent:** AU-03
**Scope:** The Commonwealth 2025 Act and the two 2025 Share by Default Rules that impose a duty on pathology and diagnostic imaging providers to contribute reports to My Health Record; and, as the mirror-image "access limb", the My Health Records Act 2012 secondary-use provisions and the 2018 secondary-use Framework.
**Retrieval date:** 3 September 2026
**Confidence:** high for the legislation, the parliamentary record and the secondary-use provisions (all read from retrieved primary text); **medium-low** for the ADHA statistics in Part D, which had to be taken from web-archive captures because `digitalhealth.gov.au` is unreachable from this session, and some of which are infographic images rather than tabular data.

---

## 0. Retrieval conditions (read this before relying on Part D)

Tested by me on 3 September 2026:

| Host | Result | Route used |
|---|---|---|
| `www.legislation.gov.au` | 200 to plain curl | **Primary route.** PDFs at `/{id}/asmade/{registration-date}/text/original/pdf`; Explanatory Statements at `/{id}/asmade/{date}/es/original/pdf`; compilations at `/{id}/{date}/{date}/text/original/pdf` |
| `api.prod.legislation.gov.au/v1` | 200, OData | Authoritative for making/registration dates, compilation lists, status. `$filter=contains(name,'…')` works; the `search(criteria=…)` function does not |
| `www.aph.gov.au` | 200 to plain curl | Bill homepage, committee reports (HTML chapters), Bills Digest |
| **`www.aph.gov.au/api/hansard/transcript?id=<parlinfo id>`** | 200, JSON | **New finding — this bypasses the ParlInfo WAF entirely.** Returns MainTitle, Date, Chamber, Speaker and the full speech HTML. Use `id=chamber/hansardr/28041/0009` (no trailing `sid`) |
| `parlinfo.aph.gov.au` | **403 — Azure WAF JS challenge** | Failed to curl, to WebFetch, and to Playwright. All ParlInfo download URLs (EMs, committee report PDFs, Hansard PDFs) are unreachable |
| `static.aph.gov.au` and `www.aph.gov.au/-/media/…` | 200 | **Route to committee PDFs** that ParlInfo blocks (PJCHR reports, Scrutiny Digests) |
| `www.digitalhealth.gov.au` | **Connection reset / empty reply** on every path, HTML and PDF | Unreachable. Worked around via `web.archive.org` |
| `www.health.gov.au` | **503 to WebFetch**, connection failure to curl | Unreachable. Worked around via `web.archive.org` |
| `web.archive.org` (CDX + `id_` raw captures) | 200 | **Works.** This is the only route to ADHA and Department of Health material |
| `webarchive.nla.gov.au` | Anubis bot-check interstitial | Unusable |
| `transparency.gov.au` | 200 but pure SPA; its delivery API is `previewapi.` only | Could not retrieve ADHA annual reports |
| `data.gov.au` | 200; CKAN at `/data/api/3/…` | No My Health Record datasets |
| **Playwright / headless Chromium** | **Does not work in this session.** Every navigation, including `example.com`, fails `net::ERR_CONNECTION_RESET`; the agent proxy logs `ws_closed_mid_exchange` for every host | Do not spend calls on it |

---

## Summary table

| # | Instrument (exact title) | Type | Issuing body | Citation | Date made | Status as at 3 Sep 2026 | Relevance to health data sharing | Source | P/S |
|---|---|---|---|---|---|---|---|---|---|
| 1 | Health Legislation Amendment (Modernising My Health Record—Sharing by Default) Act 2025 | Act | Parliament of Australia | No. 8, 2025; Register ID **C2025A00008** | Assented 14 Feb 2025 | **In force** (all substantive provisions commenced 15 Feb 2025) | Creates the contribution duty (MHR Act s 78A) and the Medicare condition (HIA s 19AD) | legislation.gov.au PDF, registered 18/02/2025 | P |
| 2 | My Health Record (Share by Default) Rules 2025 | Legislative instrument (Rules) | Minister for Health and Ageing (Mark Butler) | **F2025L01569** | 9 Dec 2025 | **In force**; whole instrument commenced **1 July 2026** | Specifies the prescribed provider classes, the healthcare, the information and the 24-hour period for s 78A | legislation.gov.au PDF, registered 12/12/2025 | P |
| 3 | Health Insurance (Share by Default) Rules 2025 | Legislative instrument (Rules) | Minister for Health and Ageing (Mark Butler) | **F2025L01568** | 9 Dec 2025 | **In force**; whole instrument commenced **1 July 2026** | The "upload rules" for HIA s 19AD — Medicare benefit not payable unless the report is shared | legislation.gov.au PDF, registered 12/12/2025 | P |
| 4 | My Health Records Act 2012 (Compilation No. 18) | Act (compilation) | OPC | No. 63, 2012; compilation **C2026C00277** | Compilation date 1 July 2026 | In force | Contains both limbs: ss 78A–78D (contribution) and ss 15(ma), 16, 82–86, 109(7A), 109A (access/secondary use) | legislation.gov.au PDF, registered 11/07/2026 | P |
| 5 | My Health Records Rules 2026 | Legislative instrument (Rules) | Minister for Health and Ageing | **F2026L00392** | 27 Mar 2026 | In force from **1 April 2026** | Consolidating rules (registration, access controls, opt-out). **Contains no s 109(7A) secondary-use framework** | legislation.gov.au PDF, registered 31/03/2026 | P |
| 6 | My Health Records Regulations 2026 | Legislative instrument (Regulations) | Governor-General | **F2026L00387** | 19 Mar 2026 | In force | Companion regulations | legislation.gov.au PDF, registered 27/03/2026 | P |
| 7 | Framework to guide the secondary use of My Health Record system data | Policy framework (**not law**) | Department of Health | May 2018 | May 2018 | **Still the operative policy; never given legal effect.** No rule has been made under s 109(7A) | health.gov.au PDF via Wayback capture 14 Sep 2024 | P |
| 8 | Senate Community Affairs Legislation Committee, *Health Legislation Amendment (Modernising My Health Record—Sharing by Default) Bill 2024 [Provisions]* | Committee report | Senate committee | Report, January 2025 | Reported 30 Jan 2025 | Complete; Recommendation 1 (bill be passed) implemented | Recommends passage; Greens and Coalition additional comments | aph.gov.au HTML chapters | P |
| 9 | Parliamentary Joint Committee on Human Rights, Report 1 of 2025 | Scrutiny report | PJCHR | Report 1 of 2025 | Considered 5 Feb 2025 | Complete; addendum to EM tabled 12 Feb 2025 | Right-to-privacy assessment of default sharing | static.aph.gov.au PDF (Chapter 1) | P |
| 10 | Senate Standing Committee for the Scrutiny of Bills, Scrutiny Digest 1 of 2025 | Scrutiny report | Senate committee | Scrutiny Digest 1 of 2025 | Considered 5 Feb 2025 | Complete; addendum to EM tabled 12 Feb 2025 | Delegated-legislation and data-matching concerns | aph.gov.au `/-/media/` PDF | P |

---

## PIPELINE — what is not yet done

There is **no pipeline item on the contribution limb**: as at 3 September 2026 the Act and both Rules are fully commenced. The pipeline is entirely on the **access limb** and in the **next phases** of the contribution limb.

### P1. The s 109(7A) secondary-use rule — announced since 2018, still not made
- **Status as at 3 Sep 2026:** *Not made.* I queried the Federal Register of Legislation for every instrument whose title contains "My Health Record" (21 results, listed in the search log), for "Secondary Use" (0 results) and for "Data Governance" (0 results). None prescribes a framework under s 109(7A). The My Health Records Rules 2026 (F2026L00392), which repeal and replace the 2016/2017 rules, contain **no** reference to s 109(7A), to research, to public health purposes, or to the Data Governance Board (verified by full-text grep of the retrieved PDF).
- **Consequence:** the Data Governance Board's principal statutory function — s 83(1)(a), "to oversee the operation of the framework prescribed by My Health Records Rules made for the purposes of subsection 109(7A)" — has no framework to oversee.
- **Department's own statement**, health.gov.au "Use of My Health Record data", page "Date last updated: 4 March 2024", retrieved from Wayback captures of **15 Nov 2025** and **11 Jun 2026** (both identical): *"My Health Record data is not yet available for research and public health purposes."* The page describes the Department as still "developing a My Health Record Research and Public Health Rule".
- **What is outstanding:** the legislative rule; formal establishment of the Data Governance Board; completion of the AIHW/ADHA proof of concept begun July 2021; a "refresh" of the 2018 Framework.

### P2. Later phases of the contribution duty (beyond pathology and diagnostic imaging)
- Both 2025 Rules are confined to reports authored by or on behalf of a **pathologist** or a **radiologist**. The Act's machinery (MHR Act s 5 definition of *prescribed healthcare provider organisation*; s 78A(1)(b) "healthcare of a kind specified in the My Health Records Rules") is deliberately open-ended.
- The Minister's second reading speech (House, 21 Nov 2024): *"We're starting with pathology and diagnostic imaging."*
- The Scrutiny of Bills Committee recorded that "the minister's second reading speech indicates that the information intended to be specified in the My Health Records rules would initially be pathology and diagnostic imaging, with the intention that this will expand over time" (Scrutiny Digest 1 of 2025, [1.49]).
- The Senate committee's Greens additional comments, [1.9]: *"subsequent Rules will declare other healthcare professions for which mandatory sharing will apply."*
- **No further Rules had been made as at 3 Sep 2026** (Register query, above).

### P3. Individual extensions of time still running
- MHR Act s 78B and HIA s 19AE let the System Operator approve a period during which a provider need not share. ADHA publishes a register of applicants: "Some pathology and diagnostic imaging providers have applied for an extension of time to comply with the upload requirements" (ADHA, *Pathology and diagnostic imaging providers uploading to My Health Record*, page "Date last updated: 30 June 2026", Wayback capture 2 Jul 2026).
- The linked register itself — `…/documents/share-by-default-extensions-register.pdf` — is `NOT LOCATED — attempted: direct curl to digitalhealth.gov.au (connection reset); Wayback CDX for that exact URL (zero captures)`. So **the number of providers currently exempt is not on the record I could retrieve.**

---

## PART A — The 2025 Act

### Health Legislation Amendment (Modernising My Health Record—Sharing by Default) Act 2025

- **Exact title (from the Act's own long title page):** *Health Legislation Amendment (Modernising My Health Record—Sharing by Default) Act 2025* — note the **em-dash** before "Sharing", not a hyphen or en-dash. Long title: *"An Act to amend the law relating to electronic health records and medicare benefits, and for other purposes"*.
- **Act number:** **No. 8, 2025** (taken from the Act's own running header and cover, not inferred).
- **Register (FRL) ID:** **C2025A00008**, "Authorised Version C2025A00008 registered 18/02/2025".
- **Bill:** *Health Legislation Amendment (Modernising My Health Record—Sharing by Default) Bill 2024*. Commonwealth bills are not given a sequential "Bill number" the way Singapore bills are; the Parliament's identifier is **`r7290`**. **Bill homepage:** `https://www.aph.gov.au/Parliamentary_Business/Bills_Legislation/Bills_Search_Results/Result?bId=r7290` — **Retrieved successfully: yes.** Type: Government. Portfolio: Health and Aged Care. Originating house: House of Representatives. Parliament no: 47. Status: Act.
- **Progress (verbatim from the Bill homepage "Progress" table):**

| Step | Date |
|---|---|
| House of Reps — Introduced and read a first time | **21 Nov 2024** |
| House — Second reading moved | 21 Nov 2024 |
| House — Referred to Federation Chamber | 26 Nov 2024 |
| House — Second reading debate | 26 Nov 2024 |
| House — Second reading agreed to | 26 Nov 2024 |
| House — Reported from Federation Chamber | 27 Nov 2024 |
| House — Third reading agreed to | **27 Nov 2024** |
| Senate — Introduced and read a first time | **4 Feb 2025** |
| Senate — Second reading moved | 4 Feb 2025 |
| Senate — Second reading agreed to | **12 Feb 2025** |
| Senate — Third reading agreed to | **12 Feb 2025** |
| Finally passed both Houses | 12 Feb 2025 |
| **Assent** (Act no 8, Year 2025) | **14 Feb 2025** |

- **s 2 commencement table — verbatim** (from the retrieved PDF; column 3 "is not part of this Act", s 2(2)):

> **Commencement information**
> 1. *Sections 1 to 3 and anything in this Act not elsewhere covered by this table* — "The day this Act receives the Royal Assent." — **14 February 2025**
> 2. *Schedule 1, Part 1* — "The day after this Act receives the Royal Assent." — **15 February 2025**
> 3. *Schedule 1, Part 2, Division 1* — "The day after this Act receives the Royal Assent." — **15 February 2025**
> 4. *Schedule 1, Part 2, Division 2* — "The day after this Act receives the Royal Assent. However, the provisions do not commence at all if Schedule 1 to the Health Insurance Legislation Amendment (Assignment of Medicare Benefits) Act 2024 commences on or before that day." — **15 February 2025**
> 5. *Schedule 1, Part 2, Division 3* — "The later of: (a) the start of the day after this Act receives the Royal Assent; and (b) immediately after the commencement of Schedule 1 to the Health Insurance Legislation Amendment (Assignment of Medicare Benefits) Act 2024." — [no date given in column 3]
> 6. *Schedule 1, Part 2, Division 4* — "The later of: (a) immediately after the commencement of the provisions covered by table item 3; and (b) the commencement of Schedule 2 to the Administrative Review Tribunal (Miscellaneous Measures) Act 2025." — [no date given in column 3]
> 7. *Schedule 2* — "The day after this Act receives the Royal Assent." — **15 February 2025**
>
> Note: "This table relates only to the provisions of this Act as originally enacted."

  **Caveat:** items 5 and 6 are conditional and column 3 in the *as made* print is blank for them. Whether they have since commenced is not stated in the as-made text; the current compilation of the *Health Insurance Act 1973* would need to be checked. `NOT RESOLVED — attempted: the as-made Act PDF only.`

### What each Schedule does

**Schedule 1, Part 1 — My Health Records Act 2012** (items 1–24; commenced 15 Feb 2025)

| Item | Provision inserted/amended | Effect |
|---|---|---|
| 1 | s 3 (object) | Recasts My Health Record as a national system "that is voluntary for those recipients" — i.e. voluntary **for consumers**, not for providers |
| 2 | s 4 | After "a healthcare provider may", inserts "(or, in some circumstances, must)" |
| 3 | s 5 definitions | Inserts *approved registered repository operator*; ***prescribed healthcare provider organisation*** — "a healthcare provider organisation that is: (a) a corporation to which paragraph 51(xx) of the Constitution applies; and (b) of a kind specified in the My Health Records Rules"; and ***share by default provision***, which lists ss 41A, 78A, 78C, 78D of the MHR Act and ss 19AD, 19AF, 19AG, 19AH of the Health Insurance Act 1973 |
| 4 | new ss 10A, 10B, 10C | s 10A defines *shares with the My Health Record system*; **s 10B defines when an *upload exception* applies**; s 10C defines when an application is *finally determined* |
| 5 | new Division 1A, ss 41A–41B | **s 41A: a prescribed healthcare provider organisation must be registered.** "Civil penalty: 250 penalty units." s 41B lets the System Operator approve a period during which s 41A(1) does not apply, taking into account "the healthcare provider organisation's size and technological readiness" |
| 8–11 | ss 51, 53, 54 | Cancellation/suspension where the organisation cannot comply with registration conditions |
| 13 | **new s 70AA** | Authorises the System Operator to collect, use and disclose specified health information to the Chief Executive Medicare, the Secretary and prescribed Commonwealth entities "for the purposes of monitoring, investigating or enforcing compliance with a share by default provision". s 70AA(3)(b) is the hook the 2025 Rules use. s 70AA(4): does not authorise collection of "healthcare recipient-only notes" |
| 14 | new Division 5, ss 73C, 73D | Parallel authorisations for the CEO Medicare, the Secretary, the Healthcare Identifiers service operator and prescribed Commonwealth entities, including for healthcare identifiers and identifying information |
| 15 | new s 76A | Duty to notify within 14 days of ceasing to be able to comply with registration conditions. "Civil penalty: 1,500 penalty units" |
| **16** | **new ss 78A–78D** | **The core contribution duty** — see below |
| 17 | s 79(2) | Makes the **Secretary of the Department** the authorised applicant for civil penalty proceedings on ss 41A(1), 76, 76A, 78A(1), 78A(2), 78C(1), 78C(4), 78D(1) |
| 18 | new Division 1A, s 79A | **Infringement notices** available for ss 41A(1), 78C(4) and 78D(1) |
| 21, 23 | s 97 | Reviewable decisions: refusal of a s 41B period, refusal of a s 78B period |
| 24 | application provisions | s 78A "applies in relation to any information created after the commencement of this item"; ss 70AA and 73C apply to "health information created after the commencement of this item" |

**s 78A — "Some information must be shared with the My Health Record system unless exception applies"**
- s 78A(1): where a prescribed organisation that is registered provides "healthcare of a kind specified in the My Health Records Rules", it "must share with the My Health Record system within the period specified in the My Health Records Rules the information specified". **"Civil penalty: 30 penalty units."**
- s 78A(2): the same duty triggered by creation of "a record of a kind specified in the My Health Records Rules". **"Civil penalty: 30 penalty units."**
- s 78A(3) — **six exceptions**: (a) an upload exception applies (s 10B); (b) another entity has already shared it; (c) a prescribed State/Territory law prevents it; (d) the information is specified in the Rules; (e) the organisation is specified in the Rules; (f) the period ends during an upload suspension period, or during a pending or approved s 78B or HIA s 19AE period. Note 2 records that the provider "bears an evidential burden".
- s 78A(4): "The Secretary of the Department may, by legislative instrument, determine that a period is an upload suspension period."
- s 78A(5): the Rules "may specify different periods for different healthcare provider organisations or different kinds of healthcare or record" — this is the **phasing power**.

**s 10B — the four upload exceptions (the consumer-control hinge)**
> (a) the individual is not a registered healthcare recipient; or
> (b) the individual, or a representative, "has advised the entity" (or the entity has otherwise been informed) "that the information must not be uploaded to the My Health Record system"; or
> (c) "an individual healthcare provider reasonably believes that the information should not be shared … because of a serious concern for the health, safety or wellbeing of the individual"; or
> (d) it "cannot be shared … due to circumstances beyond the reasonable control of the entity".

**s 78C — record keeping.** Where an upload exception applied, the organisation "must keep for a period of 2 years starting on the date the healthcare is provided evidence that an upload exception applied". "Civil penalty: 10 penalty units." s 78C(3)–(4): the System Operator or Secretary may require production; failure to comply, "Civil penalty: 10 penalty units."

**s 78D — notice.** During any period of non-sharing, the organisation must display a notice that must "indicate that the healthcare provider organisation is not currently sharing information with the My Health Record system", in a prominent place at each premises, on its website, and on any online booking facility. "Civil penalty: 10 penalty units."

**Schedule 1, Part 2 — Health Insurance Act 1973** (Division 1 commenced 15 Feb 2025)

| Provision | Effect |
|---|---|
| item 25, s 3(1) | Inserts *upload rules*, *shares with the My Health Record system*, *My Health Record System Operator*, *associate*, *upload exception applies* |
| **new s 19AD** | **"Medicare benefit is not payable in respect of a professional service specified in the upload rules … unless the person shares with the My Health Record system"** the specified information within the specified period. Exceptions in s 19AD(2) mirror s 78A(3); s 19AD(3) mirrors the s 10B upload exceptions |
| new s 19AE | System Operator may approve a period during which sharing is not required (the Medicare-side extension) |
| new s 19AF | 2-year record-keeping of evidence that an upload exception applied. "Civil penalty: 10 penalty units" (and again for failure to produce) |
| new s 19AG | **Advance payment**: a payment "on account of an amount that would but for section 19AD be payable" may be made on terms determined by the Secretary by legislative instrument — this is the mechanism that stops patients being out of pocket |
| new s 19AH | **Recovery of payments** from the service provider |
| **new s 19AI** | **The rule-making power**: "The Minister may, by legislative instrument, make rules (the upload rules) prescribing matters required or permitted by this Act to be prescribed by the upload rules." s 19AI(2): the upload rules may not create an offence or civil penalty, confer arrest/search powers, impose a tax, or amend the Act |
| items 27–32 | ss 129AADA, 129AAH — substantiation and notice machinery |

Divisions 2–4 of Part 2 are contingency amendments keyed to the *Health Insurance Legislation Amendment (Assignment of Medicare Benefits) Act 2024* and the *Administrative Review Tribunal (Miscellaneous Measures) Act 2025*.

**Schedule 2 — Other amendments** (commenced 15 Feb 2025). Amends the *A New Tax System (Goods and Services Tax) Act 1999*, *Fringe Benefits Tax Assessment Act 1986*, *Health Insurance Act 1973*, *National Health Act 1953*, *National Health Reform Act 2011* and *Private Health Insurance Act 2007*, so that a service for which Medicare benefit is withheld under s 19AD is still treated as it would otherwise be under those Acts. **Item 19 replaces the definition of "permitted purpose" in s 132A of the National Health Act 1953** so that My Health Record information may be **data-matched** for share-by-default compliance purposes — the provision that drew the Scrutiny of Bills Committee's criticism (Part F).

---

## PART B — The two 2025 Rules

Both were made on the **same day by the same Minister** and commenced on the **same day**. They are a matched pair: one imposes a civil-penalty duty on the *organisation*, the other makes *Medicare payment* conditional on the same act. The task brief supposed one of them covers pathology and diagnostic imaging; in fact **both** do, from different statutory bases.

### B1. My Health Record (Share by Default) Rules 2025

- **Exact title (from the instrument):** *My Health Record (Share by Default) Rules 2025* — singular "Record", not "Records", which distinguishes it from the *My Health Records Rules 2026*.
- **Register (FRL) ID:** **F2025L01569**. Drafting reference "OPC67462 - A".
- **Made:** "Dated 09 December 2025 / Mark Butler / Minister for Health and Ageing".
- **Registered:** 12 December 2025 (API `asMadeRegisteredAt` 2025-12-12T16:29:42).
- **Authority:** s 3 — "This instrument is made under the My Health Records Act 2012" (i.e. the s 109 rule-making power).
- **Commencement (s 2, verbatim):** item 1, "The whole of this instrument" — "**1 July 2026.**"
- **Status as at 3 Sep 2026:** **In force**; API `status: InForce`, `hasCommencedUnincorporatedAmendments: false`; no amending instrument on the Register. Sunsets 1 April 2036 under s 50 of the *Legislation Act 2003*.
- **URL (retrieved):** `https://www.legislation.gov.au/F2025L01569/asmade/2025-12-12/text/original/pdf` — **Retrieved successfully: yes** (10 pp.).
- **Explanatory Statement URL (retrieved):** `https://www.legislation.gov.au/F2025L01569/asmade/2025-12-12/es/original/pdf` — **Retrieved successfully: yes** (14 pp.).

**Operative provisions, pinpointed**

| Section | Hook in the Act | What it does |
|---|---|---|
| **s 5** | para (b) of the definition of *prescribed healthcare provider organisation*, MHR Act s 5 | Specifies "a proprietor of diagnostic imaging premises at which healthcare of the kind specified in section 6 … is rendered by or on behalf of a radiologist" |
| **s 6(1)** | MHR Act s 78A(1)(b) | Specifies the kinds of healthcare: R-type diagnostic imaging services in Part 2 of Sch 1 to the *Health Insurance (Diagnostic Imaging Services Table) Regulations (No. 2) 2020*; medical services in Part 4 of Sch 1 to the *Health Insurance (General Medical Services Table) Regulations 2021*; s 3C(1) determinations; and **"any other kind of healthcare rendered by or on behalf of a radiologist for which a report is created"** — "whether or not a medicare benefit is payable for the service" |
| **s 6(2)** | — | Carve-out: does not apply to healthcare rendered for "workplace drug or alcohol testing; court ordered testing; law enforcement" |
| **s 7(1)** | MHR Act s 78A(1) | The specified information is that "included in a report or other document that is … created in relation to that kind of healthcare; and … **authorised by the radiologist** who rendered the healthcare, or on whose behalf the healthcare was rendered" |
| **s 7(2)** | — | **"Subsection (1) does not apply to images."** Reports only, not the underlying imaging |
| **s 8(2)** | MHR Act s 78A(1) | "The specified period is the period of 24 hours beginning at the time the information is first provided" to the requesting provider, the treating provider, or the healthcare recipient |
| **s 9** | MHR Act s 70AA(3)(b) | Limits the compliance-monitoring data to (a) "the type of a report or other document" and (b) "the time at which, and the date on which" the service was requested or rendered |
| **ss 10–14** | ss 5, 78A(1)(b), 78A(1), 70AA(3)(b) | The same structure for **pathology**: proprietor of a pathology laboratory; pathology services in Part 2 of Sch 1 to the *Health Insurance (Pathology Services Table) Regulations 2020*; reports "authorised by the pathologist"; 24-hour period; same compliance-data limits |
| **s 11(2)** | — | Same three carve-outs (workplace testing, court-ordered testing, law enforcement) |
| **s 11(3)** | — | **Research carve-out on the contribution limb.** The duty does not apply to healthcare "that is performed for the sole purpose of a research study or a clinical trial" **and** in respect of which the report is not provided to a treating provider or to the healthcare recipient |

Note the asymmetry: the **research/clinical-trial carve-out (s 11(3)) appears only in the pathology Division**, not in the diagnostic imaging Division.

### B2. Health Insurance (Share by Default) Rules 2025

- **Exact title (from the instrument):** *Health Insurance (Share by Default) Rules 2025*. Drafting reference "OPC67461 - A".
- **Register (FRL) ID:** **F2025L01568**.
- **Made:** "Dated 09 December 2025 / Mark Butler / Minister for Health and Ageing".
- **Registered:** 12 December 2025 (API `asMadeRegisteredAt` 2025-12-12T13:16:36).
- **Authority:** s 3 — "This instrument is made under the Health Insurance Act 1973" (the s 19AI *upload rules* power).
- **Commencement (s 2, verbatim):** item 1, "The whole of this instrument" — "**1 July 2026.**"
- **Status as at 3 Sep 2026:** **In force**; API `status: InForce`; no amendments. Sunsets 1 April 2036.
- **URL (retrieved):** `https://www.legislation.gov.au/F2025L01568/asmade/2025-12-12/text/original/pdf` — **Retrieved successfully: yes** (8 pp.).
- **Explanatory Statement URL (retrieved):** `https://www.legislation.gov.au/F2025L01568/asmade/2025-12-12/es/original/pdf` — **Retrieved successfully: yes** (9 pp.).

**Operative provisions, pinpointed** — all for the purposes of HIA **s 19AD(1)**:

| Section | What it does |
|---|---|
| **s 5(2)** | Diagnostic imaging: specifies R-type services (DI Services Table Regulations (No. 2) 2020, Sch 1 Pt 2), medical services (General Medical Services Table Regulations 2021, Sch 1 Pt 4) and s 3C(1) determination services, in each case "rendered by or on behalf of a radiologist" |
| **s 6(1)** | The specified information is that in a report "created in respect of that professional service" and "authorised by the radiologist". **Note to s 6(1):** the information is "required to be shared with the My Health Record system for medicare benefit to be payable for the service, unless an exception applies" |
| **s 6(2)** | "Subsection (1) does not apply to images." |
| **s 7(2)** | 24-hour period from first provision to the requesting practitioner, or if none, the treating practitioner |
| **s 8(2)** | Pathology: pathology services (Pathology Services Table Regulations 2020, Sch 1 Pt 2), s 3C(1) determination services and pathologist-determinable services, "rendered by or on behalf of an approved pathology practitioner" |
| **s 9** | Report "authorised by the approved pathology practitioner", with the same Medicare-conditionality note |
| **s 10(2)** | Same 24-hour period |

**Difference worth flagging for the comparative:** the Health Insurance Rules key off "an **approved pathology practitioner**"; the My Health Record Rules key off "a **pathologist**" (defined in s 4 of that instrument to include a specialist recognised under HIA s 3D(1), a s 3DB(4)(a)/3E(1) determination holder, **or** an approved pathology practitioner). The two duties therefore do not bite on an identical population. The Health Insurance Rules also contain **no** workplace-testing / court-ordered-testing / law-enforcement carve-out and **no** research carve-out — those exist only in the My Health Record Rules.

### Phasing, tabling and disallowance

- **Phasing.** Neither instrument phases by date. Both commence whole on 1 July 2026. Phasing is achieved instead **by scope** (only written reports authored by a pathologist or radiologist; images expressly excluded) and **individually** through the s 78B / s 19AE extension approvals and the s 78A(4) upload suspension power.
- **Tabling.** `NOT LOCATED — attempted: legislation.gov.au instrument PDFs (tabling is not printed on the instrument), the Register OData API (Titles, Versions, Documents, _DisallowanceSearch, _OpenForDisallowanceSearch entity sets), and the Senate Journals via aph.gov.au.` Both instruments are disallowable legislative instruments registered on 12 December 2025, so under s 38 of the *Legislation Act 2003* they had to be tabled within 6 sitting days of each House, but I could not retrieve the tabling dates.
- **Disallowance.** Neither instrument appears in the Register's `_OpenForDisallowanceSearch` set (empty response for both IDs on 3 Sep 2026), i.e. the disallowance period has closed. Both remain `status: InForce` with a single status-history entry (InForce from 12 Dec 2025) and no repeal or disallowance recorded. **Conclusion: not disallowed.** I did not find a positive record of any disallowance motion being moved.

### What is in force as at 3 September 2026, and what is not

**In force:**
- The whole of the Act (subject to the two conditional items 5 and 6 noted above).
- MHR Act ss 41A, 41B, 70AA, 73C, 73D, 76A, 78A, 78B, 78C, 78D, 79A — since 15 Feb 2025, but **inert until 1 July 2026** because s 78A only bites once the Rules specify a provider kind, a kind of healthcare, information and a period.
- HIA ss 19AD–19AI — same position.
- Both Share by Default Rules — since 1 July 2026. **So the operative contribution duty has been live for approximately two months as at 3 September 2026.**

**Not yet in force / not yet made:**
- Any Rules extending the duty beyond pathology and diagnostic imaging.
- Any rule under MHR Act s 109(7A) prescribing the secondary-use framework.
- Any determination under s 78A(4) (upload suspension period) — none found on the Register.

---

## PART C — Commencement, as a single dated table

| Instrument | Provision | Commencement rule | Date | In force at 3 Sep 2026? |
|---|---|---|---|---|
| Act No. 8, 2025 | ss 1–3 and anything not elsewhere covered | Royal Assent | **14 Feb 2025** | Yes |
| Act No. 8, 2025 | Sch 1, Pt 1 (My Health Records Act amendments, incl. ss 41A, 70AA, 78A–78D, 79A) | Day after Assent | **15 Feb 2025** | Yes |
| Act No. 8, 2025 | Sch 1, Pt 2, Div 1 (Health Insurance Act, incl. ss 19AD–19AI) | Day after Assent | **15 Feb 2025** | Yes |
| Act No. 8, 2025 | Sch 1, Pt 2, Div 2 | Day after Assent, unless the Assignment of Medicare Benefits Act 2024 Sch 1 commenced on or before | **15 Feb 2025** (conditional) | Conditional — not verified |
| Act No. 8, 2025 | Sch 1, Pt 2, Div 3 | Later of day after Assent and commencement of Assignment of Medicare Benefits Act 2024 Sch 1 | No date in column 3 | Not verified |
| Act No. 8, 2025 | Sch 1, Pt 2, Div 4 | Later of item 3 commencement and commencement of ART (Miscellaneous Measures) Act 2025 Sch 2 | No date in column 3 | Not verified |
| Act No. 8, 2025 | Sch 2 (six other Acts, incl. National Health Act s 132A data matching) | Day after Assent | **15 Feb 2025** | Yes |
| **F2025L01569** My Health Record (Share by Default) Rules 2025 | The whole of the instrument | Fixed date, s 2 item 1 | **1 July 2026** | **Yes** |
| **F2025L01568** Health Insurance (Share by Default) Rules 2025 | The whole of the instrument | Fixed date, s 2 item 1 | **1 July 2026** | **Yes** |
| F2026L00392 My Health Records Rules 2026 (context) | The whole of the instrument | Fixed date | 1 April 2026 | Yes |
| F2026L00387 My Health Records Regulations 2026 (context) | — | — | Not extracted | Yes (API) |
| **s 109(7A) secondary-use rule** | — | — | **Never made** | **No** |

Registration dates for completeness: Act registered 18 Feb 2025 (C2025A00008); both Rules registered 12 Dec 2025; MHR Act compilation No. 18 registered 11 July 2026 (C2026C00277), compilation date 1 July 2026, "Includes amendments: Act No. 17, 2025".

---

## PART D — ADHA upload and view figures, before and after

**Retrieval caveat, stated up front.** `www.digitalhealth.gov.au` is unreachable from this session (connection reset on every path, HTML and PDF; `www.health.gov.au` returns 503). Everything below was retrieved from **Internet Archive captures**, with the capture date given for each. ADHA publishes its statistics as **infographics**, not tables; some values below were read from PNG images rather than a text layer, and I flag those.

### D1. THE HEADLINE ANSWER ON "AFTER"

**As at the most recent archived capture of ADHA's statistics page (24 August 2026), ADHA had published no monthly statistics for any month after June 2026.** The page's own footer reads "**Date last updated: 23 July 2026**", and the "previous months" list ends at "May 2026 (PDF, 1.62 MB)" with June 2026 as the current release. Since the Rules commenced on **1 July 2026**, **there are no published ADHA monthly upload or view figures for any post-commencement month.** Nor did I find any ADHA "sharing by default compliance" figure — no count of contributing providers, no exception rate, no penalty or infringement figures.

`NOT LOCATED — attempted: direct curl and WebFetch to digitalhealth.gov.au (connection reset / 503); Wayback CDX for the statistics landing page (latest capture 24 Aug 2026, showing June 2026 as current); Wayback CDX for the whole digitalhealth.gov.au domain filtered on "statistic"/"mhr" from 1 July 2026 (no July or August 2026 statistics PDF captured); transparency.gov.au ADHA annual report 2024–25 (SPA, delivery API not publicly reachable); data.gov.au CKAN (no My Health Record datasets); NLA web archive (bot-check interstitial).`

### D2. Pre-reform baseline — official statements with dates

| Date the figure refers to | Figure | Source (retrieved) |
|---|---|---|
| **August 2023** | "pathology and diagnostic imaging providers were only sharing about **half of pathology reports and one in five diagnostic imaging reports**" | Office of Impact Analysis, *Health Legislation Amendment (Modernising My Health Record—Sharing by Default) Bill 2024 Impact Analysis (November) 2024*, OIA reference OIA23-05874, p. ~13 of the retrieved PDF. `https://oia.pmc.gov.au/sites/default/files/posts/2024/11/Impact%20Analysis_1.pdf` — Retrieved successfully: yes |
| **May 2023 → May 2024** | "In May last year, just one in five diagnostic imaging reports were being sent to My Health Record. A year later, it's now one in three reports." | Mark Butler MP, House of Representatives Hansard, 21 November 2024 |
| **July 2023 → July 2024** | "the total number of pathology and diagnostic imaging reports shared with My Health Record increased by **33% and 35%** respectively. Over **10 million pathology and almost 1 million diagnostic imaging reports** are now being uploaded to My Health Record **each month**" | Impact Analysis, November 2024 |
| **August 2023 → August 2024** | "a **25% increase** for pathology reports and a **40% increase** for diagnostic imaging reports" in consumer views | Impact Analysis, November 2024 |
| **September 2024** | "it is estimated that **most states and territories are now uploading more than 75%** of all pathology and diagnostic imaging reports" | Impact Analysis, November 2024 |
| **November 2024** | "over **24.1 million** Australians have a My Health Record" | Senate Community Affairs Legislation Committee report, Ch 1 [1.18] |
| **at the January 2025 report** | "upload volumes still represent only **half of pathology reports and one in three diagnostic imaging reports**" | Senate Community Affairs Legislation Committee report, Ch 1 [1.16], quoting the Department |
| **2024 (registration base)** | "over 24 million Australians with a My Health Record, along with **99% of GPs and pharmacies, 97% of public hospitals, 56% of specialists and 39% of aged care providers** registered" | Impact Analysis, November 2024 |

### D3. ADHA monthly statistics — November 2025 (pre-commencement)

Source: *My Health Record Statistics and Insights, November 2025*, PDF, retrieved from Wayback raw capture **20260207040944** of `https://www.digitalhealth.gov.au/sites/default/files/documents/my-health-record-statistics-november-2025.pdf`. **Retrieved successfully: yes** (7 pp., text layer readable).

**Cumulative volumes uploaded** — the PDF's own note: "**All values are cumulative totals as at each month.**" These are *not* per-month flows.

| Document type | Total to Nov 2024 | Total to Nov 2025 | Increase |
|---|---|---|---|
| **Pathology reports** | 527M | **723M** | +37% |
| **Diagnostic imaging reports** | 46M | **65M** | +41% |
| Clinical documents | 630M | 860M | +36% |
| Medicine documents | 931M | 1.2B | +29% |
| Specialist letters | 4.8M | 7.4M | +55% |
| Discharge summaries | 28M | 35M | +25% |

**Caveat on the November 2025 table.** The PDF's text layer emits the six panel headings first and then all the numbers, so the heading-to-number mapping is not preserved. I reconstructed it by cross-checking against (a) the same PDF's "What is inside" panel, which independently states Clinical Documents 860M and Medicine Documents 1.2B at November 2025, and (b) the June 2026 infographic series, in which every one of the six values falls on a consistent trend line. Pathology (527M/723M), diagnostic imaging (46M/65M), specialist letters (4.8M/7.4M) and discharge summaries (28M/35M) are unambiguous from the layout; **the clinical-documents and medicine-documents rows are reconstructed and should be re-verified against the original infographic.**

Other November 2025 values: over **2 billion** documents in the system; **24.6M** total active My Health Records (24.7M at Nov 2025 on the time series); **461K** people re-registered after previously opting out or cancelling; **66K** people have placed advanced access controls; **30K** people checked in the month who had accessed their record. Provider registration/use: GP 99%/99%, Pharmacy 99%/99%, Public hospital 97%/95%, **Specialists 68%/40%**, **Aged care 54%/16%**.

Consumer views per month (from the November 2025 chart): Nov 2024 9.17M; Dec 2024 10.27M; Jan 2025 8.65M; Feb 2025 10.57M; Mar 2025 14.28M; Apr 2025 11.63M; May 2025 12.69M; **Jun 2025 16.48M**; Jul 2025 14.34M; Aug 2025 17.89M; Sep 2025 14.39M; Oct 2025 16.13M; **Nov 2025 22.22M**.

**Provider-to-provider viewing.** The November 2025 PDF carries two panels — "Healthcare providers uploaded documents that were looked at by other healthcare provider organisations" and "Healthcare providers looked at documents that were uploaded by other healthcare provider organisations" — each giving two values per sector, labelled "November 2024 to November 2025". The pairs are: GP 6.6M / 6.3M; **Path & DI 8.1M / 7.3M**; Public hospitals 4.2M / 3.9M; Specialists 116K / 109K; Pharmacy 8.8M / 8.4M (first panel); and Public hospitals 13.0M / 12.0M; Specialists 1.1M / 1.0M; Pharmacy 950K / 894K; GP 6.4M / 6.0M (second panel). **The extracted text layer does not preserve which value belongs to which year, and I could not resolve it — treat the year-to-value mapping as unverified.**

### D4. ADHA monthly statistics — June 2026 (the last month before commencement)

Source: ADHA statistics page, Wayback capture **20260824130159**, and the eight infographic PNGs captured at 20260824130206. The June 2026 PDF itself (`my-health-record-june-2026-statistics-landscape-version.pdf`) has **no Wayback capture** — `NOT LOCATED`. Values below were **read from the infographic images**, which are clearly legible.

**Cumulative volumes uploaded** (image "mhr-june-2026-stats-8.png"; same "cumulative totals" note):

| Document type | Total to June 2025 | Total to June 2026 | Increase |
|---|---|---|---|
| **Pathology reports** | 633M | **855M** | +35% |
| **Diagnostic imaging reports** | 56M | **78M** | +37% |
| Clinical documents | 754M | 1B | +34% |
| Medicine documents | 1B | 1.3B | +26% |
| Specialist letters | 6.2M | 9.1M | +46% |
| Discharge summaries | 32M | 38M | +19% |

**Views of reports** (image 4, "Increased views since last year"):

| Report type | June 2025 | June 2026 | Increase |
|---|---|---|---|
| **Pathology reports** | 60M | **133M** | **+120%** |
| **Diagnostic imaging reports** | 7.3M | **12M** | **+73%** |
| Specialist letters | 1.1M | 1.8M | +53% |

Records viewed: total to June 2025 6.86M → total to June 2026 **7.76M** ("An increase of 899K records in the last year alone"). This month more than **28K** people checked who had accessed their record. Over **71K** people have placed advanced access controls in their records.

**Consumer views per month** (image 5, "How much are people looking at their information?"): Jun 2025 16.48M; Jul 2025 14.34M; Aug 2025 17.89M; Sep 2025 14.39M; Oct 2025 16.13M; Nov 2025 22.22M; Dec 2025 15.82M; Jan 2026 17.78M; Feb 2026 21.93M; **Mar 2026 30.01M**; Apr 2026 23.43M; **May 2026 32.81M**; **Jun 2026 27.22M**.

**System size** (image 2): over **25M** total My Health Records; **25.10M** at June 2026 (Jan 2019 5.39M; Jan 2020 13.2M; Jan 2021 20.27M; Jan 2022 22.43M; Jan 2023 23.0M; Jan 2024 23.5M; Jan 2025 24.2M; Jan 2026 24.79M). Records by state: NSW 5.34M; Vic 6.2M; Qld 7.71M (values as labelled on the map — **the map labels are not individually captioned with state names in the image, so the state-to-value mapping is my inference from position and should be verified**); WA 2.74M; SA 1.68M; NT 236K; ACT 427K; Tas 529K.

**What is inside** (image 3): over **2.3 billion** documents; Clinical Documents 1B; Medicine Documents 1.3B; Consumer Documents 640K; **527K** people have registered who had previously opted out or cancelled.

**Provider registration and use, June 2026** (image 6): GP **99%** registered / **99%** have used; Pharmacy 99% / 99%; Public hospital **97%** / **95%**; **Specialists 75% / 44%**; **Aged care 57% / 21%**. (Compare Nov 2025: specialists 68%/40%, aged care 54%/16%.)

### D5. What is missing, explicitly

- **Per-month upload counts for pathology and diagnostic imaging.** ADHA publishes cumulative totals, not monthly flows. The only per-month upload figure I retrieved is the Impact Analysis statement for **July 2024**: "over 10 million pathology and almost 1 million diagnostic imaging reports … each month". `NOT LOCATED for any later month — attempted: ADHA statistics PDFs Nov 2025 and Apr 2026 (Apr 2026 PDF has an empty text layer — image-only), the June 2026 infographics, and the Impact Analysis.`
- **Share of pathology/DI providers uploading, at any date after September 2024.** `NOT LOCATED — attempted: ADHA statistics Nov 2025 and June 2026 (neither reports a provider-share figure for pathology or DI); ADHA "Pathology and diagnostic imaging providers uploading to My Health Record" page (Wayback 2 Jul 2026) which points only to the extensions register; the Senate committee report; the Impact Analysis.`
- **Documents viewed by healthcare provider organisations per month.** ADHA reports 12-month aggregates by sector, not monthly. See the unresolved year-mapping note in D3.
- **Any "sharing by default" compliance figure published by ADHA** — number of contributing providers, upload compliance rate, exceptions recorded under s 78C, extensions granted under s 78B/19AE, infringement notices under s 79A, civil penalty proceedings. **None found.** The extensions register PDF exists on ADHA's site but has zero web-archive captures.
- **ADHA Annual Reports 2023–24 and 2024–25.** `NOT LOCATED — attempted: digitalhealth.gov.au direct (connection reset on the PDF, 30+ s, twice); transparency.gov.au publication page (SPA; only previewapi delivery endpoint is exposed in its bundle, and it 404s); Wayback CDX for the annual-reports landing page (one capture, 3 Jan 2025, predating both reports' publication windows for the 2024-25 report).`

**Bottom line for the comparative:** on the Australian side, the reform's effect cannot yet be measured. The duty has been operative for roughly two months and the regulator has published nothing covering that period.

---

## PART E — Second reading speeches

**Citation caution.** The `aph.gov.au/api/hansard/transcript` response carries a `Page` field, and it was **null** for every fragment I retrieved. The Bill's second reading speech list likewise gives Chamber, Parliament No, date and time but no page. **Do not attach a Hansard page number to any of these quotations.** Cite chamber, date and (where given) time of day.

### E1. Minister's second reading speech — House of Representatives

- **Speaker:** Butler, Mark Christopher MP (Hindmarsh — Minister for Health and Aged Care and Deputy Leader of the House), at 09:07.
- **Date:** **21 November 2024**, Parliament 47, House of Representatives, status "Final".
- **ParlInfo ID:** `chamber/hansardr/28041/0009` (the debate wrapper is `…/0008`).
- **URL (retrieved):** `https://www.aph.gov.au/api/hansard/transcript?id=chamber/hansardr/28041/0009` — **Retrieved successfully: yes** (full text). The ParlInfo display URL `https://parlinfo.aph.gov.au/parlInfo/search/display/display.w3p;query=Id%3A%22chamber%2Fhansardr%2F28041%2F0009%22` returned **403** to curl, WebFetch and Playwright.

**(i) Why default sharing**
> "If a patient gets a diagnostic scan or a pathology test, then those results should be shared or uploaded to their My Health Record."

> "This was happening by exception. It was not the norm."

> "The taskforce recommended that My Health Record should be modernised … including by requiring the sharing of health information by default."

> "When we announced the government's intentions to introduce these reforms, just one in five diagnostic reports in radiology were being shared or uploaded to My Health Record."

**(ii) Consumer controls / opt-out**
> "The bill will not change the patient-controlled nature of My Health Record. Individuals can continue to choose not to have a My Health Record."

> "Or they can choose for certain records not to be shared. Patient choice will remain under these amendments."

> "Whether or not a patient chooses to engage with the information in their My Health Record … they can expect information will nonetheless be available."

On the clinical exception:
> "Electing not to upload should not be the norm."

On enforcement and the patient's position:
> "Patients will not lose benefits if providers fail to share to My Health Record."

**(iii) Research or secondary use**
> **Not mentioned.** I read the speech in full. It contains no reference to secondary use, research use, de-identified data, the Data Governance Board, the AIHW or the secondary-use Framework. Its only forward-looking framing is "Patients desire and deserve access to their own health data and agency over how it is used and how it is shared."

### E2. Second reading — Federation Chamber (House), 26 November 2024

The substantive House debate happened in the Federation Chamber, not the main chamber. Only two members spoke besides the Minister.

- **Mrs Bridget ARCHER MP (Bass), Coalition**, 19:04, `chamber/hansardr/28043/0275`:
> "The coalition will not oppose the … Bill 2024 passing the House."

> "the coalition will be seeking to refer the bill to committee in the Senate for further scrutiny"

> "The bill's fact sheet states that key details will be set out in currently unseen rules"

> On the existing privacy architecture: "prohibiting an employer from requesting and using health information in an individual's My Health Record" — she also listed "protecting employees and potential employees from discriminatory use of their My Health Record".

- **Mr Stephen BATES MP (Brisbane), Australian Greens**, 19:07, `chamber/hansardr/28043/0276`:
> "The Greens will be supporting the … Bill 2024 in the House of Representatives and reserving our position in the Senate."

> "we would like to see an inquiry into this bill, which will then inform our position in the Senate"

### E3. Second reading — Senate, 12 February 2025

There was **no substantive Senate second reading debate**. The bill's second reading was moved on 4 February 2025 and disposed of on 12 February 2025 at 19:12–19:18 with only procedural contributions and two divisions. Retrieved fragments `chamber/hansards/28694/0303` through `…/0311`.

- **Senator Katy GALLAGHER** (Minister for Finance, Manager of Government Business in the Senate), 19:12, `…/0305`:
> "I table an addendum to the explanatory memorandum relating to the bill."

> "The addendum responds to matters raised by the Scrutiny of Bills Committee and the Parliamentary Joint Committee on Human Rights."

- **Senator Malcolm ROBERTS (Pauline Hanson's One Nation)**, 19:12, `…/0306`, moving a second reading amendment on sheet 3327 by leave:
> "My Health Record was originally promised to the Australian people as an opt-in, opt-out, voluntary system"

> "sharing sensitive medical information by default to My Health Record breaches this promise to the Australian people"

> Also: "Australians are increasingly concerned about the privacy and security implications of increasing use of centralised digital IDs and other government data frameworks".
> **Question negatived.**

- **Senator Lidia THORPE (Independent)**, 19:13, `…/0307`, second reading amendment on sheet 3258. This is **the only speech in either chamber that touches third-party data use**:
> "ensure privacy protections and cybersecurity practices adequately protect health data and prevent the unauthorised sharing of health data with third parties"

> "there remains significant privacy concerns amongst the public about their digital rights relating to My Health Record"

> "allocate resources to ensure that consumers are aware of the changes and the much more active role they will have to play"

  Her amendment otherwise concerned prison healthcare, the National Review of First Nations Health Care in Prisons, recommendation 157 of the 1991 Royal Commission into Aboriginal Deaths in Custody, and the burden on Aboriginal Community Controlled Health Organisations. **Divided; NOES 23, AYES 12; question negatived.** The Greens voted aye.

- Senator Thorpe then moved a committee-of-the-whole amendment and a request for an amendment (sheets 3250 and 3268) on Medicare and PBS access for people in prison. **Divided; NOES 23, AYES 14; question negatived.** Bill read a second time; third reading agreed; finally passed 12 February 2025.

### E4. Who spoke on secondary use

**Nobody spoke on secondary use, research use or de-identified data in either chamber.** The closest is Senator Thorpe's phrase "the unauthorised sharing of health data with third parties", which is directed at data breach and misuse rather than at the s 109(7A) research framework. The Opposition's contribution (Archer) referenced the *existing* insurer/employer prohibitions as a reason for confidence, not as a subject for reform. This is a material contrast with the Singapore side and should be recorded as such.

---

## PART F — Committee consideration

### F1. Referral — YES, the Bill was referred

- **Referring resolution:** "On 28 November 2024, the Senate referred the provisions of the bill to the Community Affairs Legislation Committee (the committee) for inquiry and report by 30 January 2025" — Senate Community Affairs Legislation Committee report, Chapter 1 [1.2]. The Bill homepage "Notes" repeats: "Referred to Committee (28/11/2024): Senate Community Affairs Legislation Committee; Committee report (30/01/2025)".
- **The Coalition foreshadowed the referral in the House** two days earlier (Archer, 26 Nov 2024).
- **Selection of Bills Committee decision:** `NOT LOCATED — attempted: aph.gov.au /-/media/Committees/selectionbills_ctte/reports/2024/report{12,13,14,15}_2024.pdf (all 404, returning the site's 404 page); a targeted WebSearch for the report; the committee report itself, which records the Senate's referral but not the Selection of Bills Committee report number.` The referral was almost certainly effected through a Selection of Bills Committee report adopted on 28 November 2024, but I could not retrieve it and **do not assert a report number**.

### F2. Senate Community Affairs Legislation Committee

- **Inquiry page:** `https://www.aph.gov.au/Parliamentary_Business/Committees/Senate/Community_Affairs/ModMyHealthRecords24` — Retrieved successfully: yes. Inquiry title: *Health Legislation Amendment (Modernising My Health Record—Sharing by Default) Bill 2024 [Provisions]*.
- **Submissions sought by:** 10 January 2025. **22 submissions** received. **0 public hearings.**
- **Report:** "REPORT - January 2025", tabled **30 January 2025**. Chair: Senator Marielle Smith. The report PDF on ParlInfo (`…/committees/reportsen/RB000555/…`) is **403**; the HTML chapters on aph.gov.au are retrievable and were used.
- **Recommendation — the only one:**
> **Recommendation 1** [2.58]: "The committee recommends that the bill be passed."
- **Committee view, selected** [2.48]–[2.57]:
> [2.49] "the bill upholds the consumer-controlled nature of My Health Record, where individuals can still choose whether to have a My Health Record"

> [2.54] "the committee notes that the bill does not change this policy" — on the **7-day patient access delay** for reports, which several submitters had raised.

> [2.57] "it is a first step in broader reforms to position the My Health Record system to become a central part of Australia's healthcare system"

- **Dissenting report:** **None.** There were two sets of **additional comments**, both supportive:
  - **Australian Greens** (Senator Penny Allman-Payne, Deputy Chair; Senator Jordon Steele-John):
> [1.6] "We are satisfied that this Bill upholds the above principles by allowing individuals to opt out of their information being shared to My Health Record."

> [1.9] "The first stage of this legislation will apply to pathologists and diagnostic imaging providers, and then subsequent Rules will declare other healthcare professions"

> [1.10] "The Australian Greens encourage the Government to co-design the rest of the implementation process with healthcare consumers and providers."
  - **Coalition Senators** — five themes: stronger engagement and communication; clarity on next sectors and scope; transitional caution; support for smaller providers and ACCHOs; conclusion.
> [1.2] "this Bill builds on the previous Coalition Government's significant enhancements to MHR privacy arrangements, including … provisions restricting employer and insurer access"

> [1.4] "further information is required about which other sectors will be subject to mandatory upload provisions, and on what timeline"

> [1.5] "We strongly encourage the Government to adopt a fair grace period and robust support mechanisms"
- **Secondary use in the committee report:** a full-text search of all four retrieved chapters for "secondary use", "de-identified", "research" and "insurer" produced **two hits only** — the Coalition's reference to existing employer/insurer restrictions, and a citation to a Productivity Commission research paper. **The committee did not consider secondary use at all.**

### F3. Senate Standing Committee for the Scrutiny of Bills

- **Scrutiny Digest 15 of 2024**: consideration **deferred** (committee report, Ch 1 [1.90]).
- **Scrutiny Digest 1 of 2025**, considered **5 February 2025**. Self-citation given in the digest: "[2025] AUSStaCSBSD 6". **URL (retrieved):** `https://www.aph.gov.au/-/media/Committees/scrb_ctte/reports/2025/Scrutiny_Digest_1_of_2025/report/Scrutiny_Digest_1_of_2025.pdf` — **Retrieved successfully: yes** (97 pp.).
- **Provisions flagged** (standing order 24(1)(a)(i) and (iv)): Sch 1 item 3 (definition of *prescribed healthcare provider organisation*); item 13 (s 70AA, incl. para 70AA(2)(c)); item 14 (para 73C(2)(c), s 73D table item 5); item 16 (s 78A); item 26 (s 19AD); **Sch 2 item 19 (National Health Act s 132A)**.
- **On delegated legislation** [1.51]:
> "the explanatory memorandum provides little to no explanation as to why such matters are appropriate for inclusion in delegated legislation"

  [1.52]: "it is not clear why this is not set out on the face of the bill (with scope for additional matters to be prescribed should this become necessary in the future)".
  The digest quotes the EM's assurance, which is directly relevant to the access limb:
> "Test results or other sensitive contents of health records, will not be used or disclosed for compliance purposes."

- **On informed consent** [1.53]:
> "the scheme as a whole raises questions as to whether inclusion of a large amount of personal healthcare information is done by way of informed consent"

  and: "there does not appear to be any such equivalent requirement for providers to clearly notify patients that their personal healthcare information will automatically be included".
- **On data matching** [1.54]: the remade National Health Act s 132A "provides no specific limit on what data can be shared and matched", and "the explanatory memorandum provides no information about applicable privacy protections".
- **Committee action** [1.55]–[1.57]:
> "The committee requests that an addendum to the explanatory memorandum containing such matters be tabled in the Parliament as soon as practicable"

  and "The committee also draws this matter to the attention of the Senate Standing Committee for the Scrutiny of Delegated Legislation."
- **Outcome:** the addendum to the explanatory memorandum was tabled in the Senate by Senator Gallagher on **12 February 2025**, immediately before the second reading was disposed of. The addendum itself is on ParlInfo only (`legislation/ems/r7290_ems_b4279af0-…`) and is **403** — `NOT RETRIEVED`.

### F4. Parliamentary Joint Committee on Human Rights

- **Report 11 of 2024** (27 November 2024): consideration **deferred** (committee report, Ch 1 [1.89]).
- **Report 1 of 2025**, considered **5 February 2025**. Self-citation in the report: "[2023] AUPJCHR 3" (**note: the report's own citation line reads 2023, which appears to be an error in the document — quoted as printed**). **URL (retrieved):** `https://static.aph.gov.au/-/media/Committees/pjchr_ctte/reports/2025/Report_1_of_2025/section/Chapter_1__New_and_ongoing_matters.pdf` — **Retrieved successfully: yes** (33 pp.). Right engaged: **Privacy**.
- **Analysis:**
> [1.13] "the scheme in its opt-out form is likely incompatible with the right to privacy" (repeating its Report 4 of 2018 position)

> [1.10] "The sharing of information by default provisions does not require the informed consent of a person"

> [1.11] "it is unclear when this discretion may be exercised" — on the s 10B(c) clinical exception; and "there may be a risk that this results in discrimination against particular groups in practice, such as persons with a disability and/or First Nations people"

> [1.12] "an opt-in model remains a less rights restrictive alternative"

> [1.14] "the policy intention is for this to initially relate to pathology and diagnostic imaging information, but … nothing in the bill would restrict the scope of affected information in this way"

- **Suggested action** [1.16]–[1.18]:
> "the bill amended to require prescribed healthcare provider organisations to display a notice when they **are** sharing information with the My Health Record system"

  and to "require them to advise healthcare recipients that they can choose for certain information to not be uploaded"; plus an updated statement of compatibility on the clinical discretion. "The committee draws these human rights concerns to the attention of the minister and the Parliament."
- **Also examined:** the National Health Act s 132A data-matching amendment, listing the five new permitted purposes (overpayment identification, recovery, detecting contraventions, analysis, and "educating healthcare providers about requirements in relation to share by default service").
- **Outcome:** no amendment was made to the Bill. The addendum to the EM was tabled instead.

---

## PART G — The access limb: MHR Act 2012 secondary-use provisions and the Framework

### G1. Source

*My Health Records Act 2012*, **Compilation No. 18**, compilation date **1 July 2026**, "Includes amendments: Act No. 17, 2025", "Authorised Version **C2026C00277** registered 11/07/2026". 183 pp.
**URL (retrieved):** `https://www.legislation.gov.au/C2012A00063/2026-07-01/2026-07-01/text/original/pdf` — **Retrieved successfully: yes.** This is the compilation in force at 3 September 2026 (API: `isLatest: true`, start 2026-07-01, end null).

### G2. Every secondary-use / de-identified data / research provision, pinpointed

| Provision | Quote (≤25 words) | Note |
|---|---|---|
| **s 5, definition** | "**data custodian** means the Australian Institute of Health and Welfare." | The AIHW's role is **in the Act**, not merely in the Framework |
| **s 15(ma)** — System Operator function | "in accordance with the guidance and direction of the Board established under section 82, to prepare and provide de-identified data, and, with the consent of the healthcare recipient, health information, for research or public health purposes" | Inserted by Act No. 154, 2018. Note the **consent** condition attaches only to identified health information; de-identified data needs no consent |
| **s 16** — "Research or public health purposes" | "does not include providing de-identified data or health information to a private health insurer … or any other insurer." | The **insurer prohibition on the research limb**. Section 16 was repealed in 2015 and re-inserted (with different content) by Act No. 154, 2018 |
| **s 70A(1)(a)** — prohibited purpose | "(i) underwriting a contract of insurance that covers the healthcare recipient" … "(iv) an employer employing, or continuing or ceasing to employ, the healthcare recipient" | The **insurer/employer prohibition on the access limb**. s 70A(6): "using information for a purpose includes requesting or requiring the information for that purpose" |
| **s 70A(3)** | "use of information is not for a prohibited purpose if the use is solely for … the purpose of providing healthcare to the healthcare recipient" | Also carves out indemnity cover for providers |
| **s 70B(1)** | "a person is not authorised … to use health information included in a registered healthcare recipient's My Health Record for a prohibited purpose" | |
| **s 77A(1)** (offence) | requirement contravened where the entity "is reckless as to that result" and "the My Health Records Rules provide that the requirement is enforceable" | "Penalty: 100 penalty units." Strict liability applies to paras (1)(c) and (d) |
| **s 78(2)** (civil penalty) | an entity "must not contravene a requirement imposed on the entity by My Health Records Rules made for the purposes of subsection 109(7A), if the My Health Records Rules provide that the requirement is enforceable" | "Civil penalty: 100 penalty units." **Both s 77A and s 78(2) are dormant — they can only bite once a s 109(7A) rule exists** |
| **s 82** | "The Data Governance Board is established by this section." | |
| **s 83(1)(a)** | "to oversee the operation of the framework prescribed by My Health Records Rules made for the purposes of subsection 109(7A)" — including "assessing applications for the collection, use or disclosure of de-identified data and health information for research or public health purposes" | And "taking steps to ensure the ongoing protection of de-identified data and health information used by, or disclosed to, persons for research or public health purposes" |
| **s 83(2)** | "The Board does not have any functions, and must not perform any role, in relation to the day-to-day operation of the My Health Record system." | The statutory separation of the access limb from the contribution limb |
| **s 84–86** | Board of Chair, Deputy Chair and "at least 7, and no more than 10, other members"; the Minister **must** appoint a person representing the System Operator, a person representing the data custodian, and "a person who is an Aboriginal person or a Torres Strait Islander" | Qualification fields: population health and epidemiology; medical or health research; health services delivery; technology; data science; data governance; privacy; consumer advocacy |
| **s 109(1)** — general rule power | "The Minister may, by legislative instrument, make rules called the My Health Records Rules about matters required or permitted by this Act" | **This is the power used for sharing by default** (via s 78A). s 109(2): the Minister must first consult the System Operator and the Health Chief Executives Forum; "A failure to consult does not affect the validity of the Rules" |
| **s 109(7A)** — secondary-use rule power | "The My Health Records Rules may, in accordance with section 109A, prescribe a framework to guide the collection, use and disclosure of de-identified data and, with the consent of healthcare recipients, health information, for research or public health purposes." | **Permissive — "may". Never exercised.** |
| **s 109(9)** | rules made "for purposes other than subsection (7A)" may incorporate external material as in force from time to time | i.e. a s 109(7A) rule may **not** incorporate by reference — a deliberate constraint on delegating the framework to a policy document |
| **s 109(10)** | "the My Health Records Rules may not … create an offence or civil penalty" | Hence the offence/penalty sit in ss 77A and 78 of the Act |
| **s 109A(1)** | rules may "impose requirements on the System Operator, the Data Governance Board … the data custodian and other entities"; provide that requirements are "enforceable for the purposes of paragraph 77A(1)(c) or subsection 78(2)"; and "authorise the Board to make written policies and guidelines" | |
| **s 109A(2)** | the data custodian's functions: "receiving de-identified data and health information from the My Health Record system"; "as necessary—de-identifying health information"; "as necessary—providing data linkage services"; and "preparing and providing de-identified data and health information to users … whose use has been approved by the Data Governance Board" | |

**Amendment history (Endnote 4 of the compilation):** s 15 "am No 157, 2015; No 67, 2016; **No 154, 2018**"; s 16 "rep No 157, 2015 / ad **No 154, 2018** / am No 154, 2018"; s 109 "am No 157, 2015; No 67, 2016; **No 154, 2018**; No 54, 2024"; s 109A "ad **No 154, 2018**". Act No. 154 of 2018 is the *My Health Records Amendment (Strengthening Privacy) Act 2018*. **The entire access-limb architecture is nearly eight years old and has never been switched on.**

### G3. The Framework

- **Exact title:** *Framework to guide the secondary use of My Health Record system data*.
- **Date, verified from the document's own cover and running footer:** **May 2018** (not merely "2018"). Issuing body: Australian Government Department of Health.
- **Status:** **Policy, not law.** No instrument gives it legal force. It is not registered on the Federal Register of Legislation (Register query for "Secondary Use": 0 titles).
- **URL (retrieved):** `https://www.health.gov.au/sites/default/files/documents/2021/12/framework-to-guide-the-secondary-use-of-my-health-record-system-data.pdf`, retrieved via the Internet Archive raw capture of **14 September 2024** (`web.archive.org/web/20240914010334id_/…`) because health.gov.au returns 503. **Retrieved successfully: yes** (72 pp.). Earlier identical-digest capture: 21 April 2024. Live retrieval on 3 Sep 2026: **no**.
- **Governance body:** "The My Health Record (MHR) Secondary Use of Data Governance Board (the Board) will implement the Framework" [principle 1.2]. "The Board has no role around primary use of the MHR system data—this is the responsibility of the System Operator" [1.3]. The Chair of the Aboriginal and Torres Strait Islander Peoples' Advisory Panel is a Board member [1.5].
- **Data custodian:** "The Australian Institute of Health and Welfare (AIHW) is the Data Custodian for the purposes of the Framework" [1.1].

**What it permits**
> "Any Australian-based entity (except insurance agencies) can apply to access MHR system data for secondary use, subject to meeting the criteria set out in this Framework." [3.3]

> "The Board will use the 'Five safes' principles to assess applications." [3.5]

> Scope covers "de-identified MHR system data" and "identified MHR system data with the consent of the health care recipient".

> "Commercial organisations may propose uses that could be approved so long as it can be demonstrated that the use is consistent with 'research and public health purposes'".

**What it precludes**
> "MHR system data cannot be used solely for commercial and non-health-related purposes."

> "The provision of MHR data to insurance agencies will not be permitted (the impact of this exclusion will be considered as a part of the first review)."

> "The use of MHR data for clinical trials recruitment will not be considered until an explicit consent option is available in the MHR access controls."

> "MHR data that has been made accessible for secondary use must not leave Australia" [3.6] — though "there is scope for data analyses and reports produced using MHR system data to be shared internationally".

> "Consumers can opt out of having their MHR data used for secondary purposes." [2.1] — with the footnote: "consumers cannot opt out of the use of their MHR system data for uses described in the MHR Act, such as for law enforcement purposes."

> The Framework "does not apply to uses described in the MHR Act, such as for the purposes of law enforcement or System Operator functions."

**Later replacement or update:** **None found.** The Department's own page describes only "a refresh of the Framework" as work in progress, and says the Framework will be reviewed "as a part of establishing the legislative rule". `NOT LOCATED — attempted: Wayback captures of the health.gov.au publication page and the "Use of My Health Record data" topic page for 2024, 2025 and 2026 (the June 2026 capture still links the May 2018 document and still carries "Date last updated: 4 March 2024"); Register queries for "Secondary Use" and "Data Governance" (0 results).`

### G4. Record of secondary-use releases to date

**There have been none, and there is no application process open.** From the Department of Health page *Use of My Health Record data*, retrieved from the Internet Archive capture of **11 June 2026** (`web.archive.org/web/20260611043139/…`); the page's own footer reads "Date last updated: 4 March 2024" and the text is byte-identical to the 15 November 2025 capture:

> "**My Health Record data is not yet available for research and public health purposes.**"

> "We will only make it available to researchers and public health experts once we have established My Health Record research and public health governance arrangements. We are working on this."

The same page records the implementation state: the Department is "developing a My Health Record Research and Public Health Rule" and "establishing a My Health Record Data Governance Board"; ADHA is "establishing the technical infrastructure"; the AIHW "is the My Health Record data custodian for research and public health purposes". A **proof of concept** has been running "since July 2021". **Professor Mark Taylor started as Interim Chair of the Data Governance Board on 29 November 2021.**

**Number of applications approved: zero — none can have been, because no application process exists.** `Applications data NOT LOCATED — attempted: health.gov.au topic page (2024, 2025 and 2026 captures, all saying data is not yet available); ADHA "Secondary use of data" page (captures to March 2025 only); ADHA annual reports (unreachable, see D5).`

### G5. The two limbs, side by side — Australia

| | **Contribution limb** | **Access limb (secondary/research use)** |
|---|---|---|
| **Primary instrument** | *My Health Records Act 2012* ss 41A, 78A–78D (inserted by Act No. 8, 2025, Sch 1 Pt 1); *Health Insurance Act 1973* ss 19AD–19AI (Sch 1 Pt 2) | *My Health Records Act 2012* ss 15(ma), 16, 70A–70B, 77A, 78(2), 82–86, 109(7A), 109A (all inserted by Act No. 154, 2018) |
| **Subordinate instrument** | **My Health Record (Share by Default) Rules 2025** (F2025L01569) and **Health Insurance (Share by Default) Rules 2025** (F2025L01568) | **None.** No rule has ever been made under s 109(7A) |
| **Non-legal instrument** | ADHA guidance; clinical reference group guidance chaired by ACSQHC and ADHA | ***Framework to guide the secondary use of My Health Record system data*, May 2018 — policy only** |
| **Duty or permission** | **Duty.** A prescribed healthcare provider organisation "must share with the My Health Record system within the period specified" (s 78A(1)–(2)); and Medicare benefit "is not payable … unless the person shares" (s 19AD(1)) | **Permission, unexercised.** The System Operator's s 15(ma) function to "prepare and provide de-identified data … for research or public health purposes" is exercisable only "in accordance with the guidance and direction of the Board established under section 82" |
| **Who is bound / who may access** | Proprietors of pathology laboratories and diagnostic imaging premises, for reports authored by a pathologist or radiologist; images excluded | Intended: "Any Australian-based entity (except insurance agencies)" under the Framework. Actual: nobody |
| **Consumer control** | Opt-out per record (s 10B(b)); no My Health Record at all (s 10B(a)); provider clinical discretion (s 10B(c)) | Framework [2.1]: "Consumers can opt out of having their MHR data used for secondary purposes" — but this is a policy promise with no legal instrument behind it |
| **Prohibited recipients** | — | Insurers, on **both** routes: s 16 (research route) and s 70A(1)(a) (access route); employers under s 70A(1)(a)(iv) |
| **Enforcement** | Civil penalties (s 78A: 30 penalty units; s 41A: 250; s 76A: 1,500; ss 78C, 78D: 10 each), infringement notices (s 79A), Medicare non-payment and recovery (ss 19AD, 19AH), compliance data-matching (National Health Act s 132A) | ss 77A (100 penalty units, criminal) and 78(2) (100 penalty units, civil) — **both conditional on a s 109(7A) rule that does not exist, so neither is presently capable of being contravened** |
| **Governance body** | System Operator (ADHA); Secretary of the Department as authorised applicant and infringement authority | Data Governance Board (s 82) — established by statute, **not constituted**; only an Interim Chair appointed (29 Nov 2021). Data custodian: AIHW (s 5) |
| **Status as at 3 Sep 2026** | **In force since 1 July 2026** for pathology and diagnostic imaging. Later sectors await further Rules | **Not operative.** "My Health Record data is not yet available for research and public health purposes" (Department of Health, page last updated 4 Mar 2024, capture 11 Jun 2026) |

**The comparative point.** Australia has done the two limbs in the opposite order and on opposite timescales from what the statute book suggests. The **access limb was legislated first, in 2018**, complete with a governance board, a data custodian, a rule-making power, offences and civil penalties — and eight years later none of it has been switched on, because the enabling rule under s 109(7A) has never been made. The **contribution limb was legislated in 2025 and was operative within seventeen months**. The compulsion runs entirely one way: providers must contribute, and nobody may yet access for research.

---

## Secondary-source-only items

None of the substantive findings above rests on a secondary source. Two items were used only as **leads** and are recorded here for completeness; neither is relied on for any assertion:

- **Pulse+IT**, "My Health Record use surges as ADHA improves access" — appeared in a search-result snippet asserting that "views of diagnostic imaging reports increased by 866 per cent and pathology reports by 642 per cent, as of 2 August 2026". `PRIMARY SOURCE NOT LOCATED — attempted: ADHA statistics page and PDFs via Wayback (latest published month is June 2026, which reports +73% and +120% respectively year-on-year, not these figures).` **Uncorroborated. Do not use.** The figures are inconsistent in order of magnitude with ADHA's own June 2026 release and may be measured on a different base.
- **MinterEllison**, "New opt-out model for My Health Record information", and **Hall & Wilcox**, "What providers need to know about the new My Health Records Rules and Regulations" — used only to identify the instrument names, all of which were then verified against the instruments themselves.

---

## Gaps, dead ends, and open questions

1. **Tabling dates and disallowance record for F2025L01568 and F2025L01569.** Not on the instrument, not in the Register's OData entity sets. A follow-up agent should try the Senate Journals and the House Votes and Proceedings for sitting days in February 2026, or the Senate Standing Committee for the Scrutiny of Delegated Legislation's *Delegated Legislation Monitor* — the Scrutiny of Bills Committee expressly referred the share-by-default rules to that committee (Scrutiny Digest 1 of 2025 [1.57]), so **there is very likely a Delegated Legislation Monitor entry on these two instruments that I did not retrieve.** That is the single highest-value unretrieved document.
2. **ADHA post-commencement statistics.** Nothing published for July or August 2026 as at the 24 August 2026 archive capture. A follow-up should retry `digitalhealth.gov.au` directly (it may simply have been down today) for the July and August 2026 releases and for the **ADHA Annual Report 2025–26**, which will be the first to cover the commencement.
3. **The share-by-default extensions register** (`digitalhealth.gov.au/sites/default/files/documents/share-by-default-extensions-register.pdf`). Zero web-archive captures. This is the only public source for how many providers are currently exempt.
4. **Senate Estimates.** I did not reach Community Affairs Budget Estimates 2026–27 or the associated questions on notice, which are the most likely place for a post-commencement compliance figure. The estimates pages are on aph.gov.au and are reachable; a follow-up agent should search the Community Affairs estimates QoN index for "share by default".
5. **Selection of Bills Committee report number** for the 28 November 2024 referral.
6. **The Addendum to the Explanatory Memorandum** (tabled 12 Feb 2025) and the **Explanatory Memorandum** itself — both ParlInfo-only and 403. The EM is quoted at second hand in Scrutiny Digest 1 of 2025 (which is how I obtained the "Test results or other sensitive contents of health records, will not be used or disclosed for compliance purposes" quotation — **that quote is the Scrutiny Committee quoting the EM, not my direct reading of the EM**).
7. **Sch 1 Pt 2 Divs 3 and 4 of Act No. 8, 2025** — conditional commencement not verified. Check the current compilation of the *Health Insurance Act 1973*.
8. **Whether Act No. 17 of 2025** (which the MHR Act compilation No. 18 records as an amending Act) bears on either limb. Not investigated.
9. **The seven-day / five-day consumer access delay.** The committee report [2.54] records that the Bill does not change the 7-day policy; a search-result snippet suggests it moved to five days for most diagnostic imaging from March 2026, with immediate access for limb X-rays. **Not verified against a primary source** — this matters for the comparative because it is a consumer-access rule sitting between the two limbs.
10. **June 2026 records-by-state figures** were read off an unlabelled map image; the state-to-value mapping is inferred.

---

## Search log

**Direct fetches (curl, Chrome UA):**
- `legislation.gov.au`: C2025A00008 as-made PDF; F2025L01568 and F2025L01569 as-made PDFs and Explanatory Statements; C2012A00063 compilation 18 PDF; F2026L00392 and F2026L00387 PDFs. All 200.
- `api.prod.legislation.gov.au/v1`: `$metadata`; `Titles` filtered on `startswith(name,'Health Insurance (Share')`, `contains(name,'My Health Record')`, `contains(name,'Secondary Use')`, `contains(name,'Data Governance')`, `name eq 'My Health Records Act 2012'`; `Versions` and `Documents` for C2012A00063 and F2025L01569; `_DisallowanceSearch` and `_OpenForDisallowanceSearch` for F2025L01568/01569/F2026L00392.
- `aph.gov.au`: Bill homepage `bId=r7290`; Second Reading Speeches list (pages 1–2, pageSize=100); Bills Digest `bd/bd2425/25bd042`; Community Affairs inquiry page and `/Report` plus the four report chapters; PJCHR `Scrutiny_reports/2025/Report_1_of_2025`; `/-/media/Committees/scrb_ctte/reports/2025/Scrutiny_Digest_1_of_2025/report/…pdf`; `static.aph.gov.au` PJCHR Chapters 1 and 2.
- **`aph.gov.au/api/hansard/transcript`** for IDs `chamber/hansardr/28041/0008`, `…/0009`, `chamber/hansardr/28043/0274-0276`, `chamber/hansards/28694/0303-0311`.
- `oia.pmc.gov.au`: Impact Analysis PDF.
- `web.archive.org` CDX and raw (`id_`) captures: ADHA statistics landing page (4 captures in 2026, latest 20260824130159); `my-health-record-statistics-november-2025.pdf` (20260207040944); `mhr-statistics-april-2026-landscape.pdf` (20260613145401, image-only text layer); the eight `mhr-june-2026-stats-*.png` infographics (20260824130206); ADHA pathology/DI providers page (20260702005702); health.gov.au `use-of-my-health-record-data` (20251115123406 and 20260611043139); the secondary-use Framework PDF (20240914010334).

**WebSearch queries (7):** `"sharing by default" My Health Record Act 2025 amendment Commonwealth legislation`; `My Health Records Rules 2025 legislation.gov.au pathology diagnostic imaging sharing by default legislative instrument`; `"Health Insurance (Share by Default) Rules 2025" legislation.gov.au F2025L`; `aph.gov.au Bills Search "Modernising My Health Record" Sharing by Default Bill 2024 homepage second reading`; `Australian Digital Health Agency annual report 2024-25 …statistics`; `"My Health Record" statistics 2026 pathology reports uploaded per month …`; `"Scrutiny Digest 1 of 2025" …`; `"Framework to guide the secondary use of My Health Record system data" Department of Health 2018 pdf`; `Senate "Selection of Bills Committee" Report No. 2024 "Modernising My Health Record" …`.

**Dead ends (do not repeat):** ParlInfo (403 to curl, WebFetch and Playwright); Playwright/Chromium generally (proxy relay closes every tunnel); `webarchive.nla.gov.au` (bot check); `transparency.gov.au` (SPA, no public delivery API); `data.gov.au` (no relevant datasets); `digitalhealth.gov.au` and `health.gov.au` live (unreachable); `aph.gov.au/.../Scrutiny_of_Bills/Scrutiny_Digest/2025/…` (404 — the working path is `/Work_of_the_committee/Scrutiny_Digest_List/2025/…` or the `/-/media/` PDF); `aph.gov.au/-/media/Committees/selectionbills_ctte/reports/2024/report{N}_2024.pdf` (404).

**Working files:** `$SCRATCH/work/AU-03/` — includes `act2025-8-asmade.pdf`, `rule-F2025L01568.pdf`, `rule-F2025L01569.pdf`, `ES-F2025L01568.pdf`, `ES-F2025L01569.pdf`, `mhr-act-c18.pdf`, `x-F2026L00392.pdf`, `x-F2026L00387.pdf`, `framework2018.pdf`, `sd1-2025.pdf`, `pjchr-ch1.pdf`, `oia-ia.pdf`, `adha-nov2025.pdf`, `june-{1..8}.png`, and text extractions of each.
