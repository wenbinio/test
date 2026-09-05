# Singapore Parliament — Health Information Bill Second Reading speeches and post-Bill Parliamentary Questions on NEHR research access, TRUST and derived information

**Agent:** SG-01-hansard-extraction
**Scope:** Verbatim extraction of (a) Mr Louis Chua's Second Reading speech on the Health Information Bill, (b) the Government closing speech, (c) the Government opening Second Reading speech, all 12 January 2026; and (d) every Parliamentary Question from 12 January 2026 to the retrieval date bearing on NEHR research access, the TRUST platform, derived information, de-identified data, secondary/commercial use of NEHR data, and AI training on health data.
**Retrieval date:** 3 September 2026
**Confidence:** **high** for everything marked Official-Report-verbatim — the Hansard JSON API was revived this session (see §0) and the complete Official Report for every sitting day from 12 January 2026 to 3 September 2026 was retrieved as structured data and searched exhaustively. Negative findings in §4.3 are therefore reliable negatives.

> **Citation form used throughout.** Sitting date + Volume + Sitting No. Online Hansard has carried **no column numbering since 10 September 2012**; every section retrieved this session again shows `startPgNo`/`endPgNo` of 0 and an empty `onlinePDFFileName`. Any "vol X, col Y" citation for a post-2012 Singapore debate is invented. The Second Reading citation is **Vol 96, Sitting No 12, 15th Parliament First Session, Monday 12 January 2026**.

---

## 0. STATUS OF THE HANSARD API — READ THIS FIRST

### 0.1 The API is NOT dead. It has changed method. GET is dead; POST works.

The orchestrator's brief is correct that **every GET request 500s**, including for known sitting days. That is not an outage and not a block — the SPRS Angular front end was rebuilt and the backend now accepts **only POST with a JSON body**. Recovered by reading the SPA bundle `https://sprs.parl.gov.sg/search/main.6c50b646860a7eb9.js`, which contains:

```
this.getHansardReportURL = this.baseUrl + "/getHansardReport"
getHansardReport(X){ ... return this.authHttp.post(this.getHansardReportURL, {sittingDate: X}, at) ... }
```

**The working call, plain curl, no token, no XSRF header, no browser:**

```bash
curl -sS -A "<browser UA>" \
  -H "Content-Type: application/json" \
  -H "Origin: https://sprs.parl.gov.sg" \
  -H "Referer: https://sprs.parl.gov.sg/search/" \
  -X POST --data '{"sittingDate":"12-01-2026"}' \
  "https://sprs.parl.gov.sg/search/getHansardReport"
```

Returns HTTP 200 and the full Official Report for the day (1,282,505 bytes for 12 January 2026). The sibling endpoints behave the same way: `POST /search/getDisplayData` with `{}` (200, parliament list) and `POST /search/fetchData` with `{}` (200, 30,929-byte MP list). `POST /search/getToken` returns 405 and is not needed. A cookie jar seeded from `GET https://sprs.parl.gov.sg/search/` (an Imperva/Incapsula `incap_ses_*` cookie) was carried on every request; it was not tested whether the cookie is strictly required.

**The 500/200 discriminator survives the change.** A non-sitting day POST returns HTTP 500 with the identical 91-byte body `{"errorCode":500,"description":"Unable to process the request. Please try after sometime."}`. Verified individually against 06-08-2026, 12-08-2026, 26-08-2026, 01-09-2026, 02-09-2026 and 03-09-2026 (all 500) and 05-08-2026 (200, 1,046,112 bytes).

**Other endpoints found in the bundle, not exercised:** `/search/getHansardTopic` (POST `{id}`), `/search/getMpNameByMpId` (POST `{mpId}`), `/search/getHtml`, `/search/searchResult` (POST — returned HTTP 400 "System error occured while retrieving the results" on a naive `{"keyword":...}` payload; the correct payload shape was not reverse-engineered), `/search/searchByMp`, `/search/officialReport/getFile`, `/search/officialReport/download`, `/search/vernacular/download`.

### 0.2 What was saved for the orchestrator

`$SCRATCH/work/SG-01/hansard/<DD-MM-YYYY>.json` — **23 files, one per sitting day, raw as returned by the API**, covering every sitting from 12 January 2026 to 3 September 2026:

12-01, 13-01, 14-01, 03-02, 04-02, 12-02, 24-02, 25-02, 26-02, 27-02, 02-03, 03-03, 04-03, 05-03, 06-03, 07-04, 08-04, 05-05, 06-05, 07-05, 07-07, 04-08, 05-08 (all 2026). Total ~18 MB.

A27's 79-file corpus (1 Jan 2024 – 15 Aug 2026) was **not** available — it was stored on the user's local machine, not in Drive. The 23 files above overlap A27's period from 12 Jan 2026 and can be re-fetched at any time in about two minutes using §0.1.

### 0.3 Parliament has not sat since 5 August 2026

**Last sitting: Wednesday, 5 August 2026, Vol 96, Sitting No 34.** Confirmed two ways:
1. Every weekday from 6 August 2026 to 3 September 2026 returns the 91-byte 500 (non-sitting) from the POST API.
2. `https://www.parliament.gov.sg/parliamentary-business/order-paper` — the most recent Order Paper listed is **4 August 2026** (`/api/media/00747016-.../Order-Paper---4August2026.pdf`) and the newest date appearing anywhere in the Order Paper listing is 5 August 2026. There is **no Order Paper for any future sitting**. (The string "02 September 2026" on that page is the site footer's `last-updated` attribute, not a sitting date.)

**Consequence:** there is no Parliamentary Question on any topic after 5 August 2026, and the window 15 August 2026 (A27's cut-off) to 3 September 2026 contains **no new parliamentary material at all**. Everything new in that window is extra-parliamentary; see §5.2.

---

## Summary table

| # | Item | Date | Vol / Sitting | Speaker / answering Minister | Topic | Source route | Retrieved | Official-Report verbatim |
|---|---|---|---|---|---|---|---|---|
| 1 | Second Reading — **opening speech**, Health Information Bill | 12 Jan 2026 | Vol 96, Sitting No 12 | Mr Tan Kiat How, SMS (MDDI & MOH) | Whole Bill; anonymised NEHR info for public interest purposes; commencement early 2027 | Hansard POST API (§0.1) + MOH newsroom | yes | **yes** |
| 2 | Second Reading — **Mr Louis Chua** (Sengkang) | 12 Jan 2026 | Vol 96, Sitting No 12 | Mr Chua Kheng Wee Louis | cl 30(7) background upload; cl 50; Type 1 / Type 2 derived information; cl 25(2); cl 30(5)(a); TRUST DAC; commercial access; DeepMind | Hansard POST API | yes | **yes** |
| 2b | Same speech, **party-published prepared text** | 12 Jan 2026 | n/a | Workers' Party, `wp.sg/parliament/speech-by-louis-chua-on-the-health-information-bill` | as above, with section headings | curl | yes | **no — party text, not the Official Report** |
| 3 | Second Reading — **closing speech / reply** | 12 Jan 2026 | Vol 96, Sitting No 12 | Mr Tan Kiat How, SMS | research use via TRUST under NRF; AI model training; commercial requests; insurers/employers; commencement early 2027 | Hansard POST API + MOH newsroom | yes | **yes** |
| 3b | Same speech, **MOH published text** | 12 Jan 2026 | n/a | MOH newsroom | as above, numbered paragraphs | curl | yes | **no — MOH text; diverges from Hansard, see §2.4** |
| 4 | Second Reading — **Mr Fadli Fawzi** (Aljunied), commercial-use passage | 12 Jan 2026 | Vol 96, Sitting No 12 | Mr Fadli Fawzi | monetisation of pooled health data; "Social Dividend"; data cooperatives; MIDATA | Hansard POST API | yes | **yes** |
| 5 | **PQ** — Data on Approved Access Applications to PRECISE, SG10K and HELIOS, Research Productivity and Outcomes, and Plans for Public Registry | 6 May 2026 | Vol 96, Sitting No 30 | Q: Mr Kenneth Tiong Boon Kiat · A: Mr Ong Ye Kung | **Core.** TRUST as the research-access route; 40 approvals, 6 to private companies | Hansard POST API | yes | **yes** |
| 6 | **PQ** — Rationale and Cost of Developing AI Models for Healthcare Diagnostics, and Safeguards for Patient Data (SIMFONI) | 5 Aug 2026 | Vol 96, Sitting No 34 | Q: Mr Yip Hon Weng; Mr Low Wu Yang Andre (NCMP) · A: Mr Ong Ye Kung | **Core.** AI training on de-identified local patient data via TRUST; consent expressly rejected; NEHR-scope question not answered | Hansard POST API | yes | **yes** |
| 7 | **PQ** — Mandatory Data Security Requirements for Patient Data Processed by AI Tools Through Third-party Cloud Services | 4 Aug 2026 | Vol 96, Sitting No 33 | Q: Assoc Prof Jamus Jerome Lim · A: Mr Ong Ye Kung | HCSA + PDPA apply; unpublished binding no-retention commitments from AI model providers | Hansard POST API | yes | **yes** |
| 8 | **PQ** — Regulatory Framework for AI-developed Drugs … and Adequacy of Data Protection Safeguards for National Patient Data | 6 May 2026 | Vol 96, Sitting No 30 | Q: Mr Yip Hon Weng · A: Mr Ong Ye Kung | AI access to national patient data; safeguards claimed are PDPA only | Hansard POST API | yes | **yes** |
| 9 | **PQ** — MAS and LIA Collaboration on Clinical Guidance for Insurance Medical Record Disclosure | 3 Feb 2026 | Vol 96, Sitting No 15 | Q: Dr Haresh Singaraju · A: Mr Ong Ye Kung | HCSA circular + unpublished guidance note to insurers | Hansard POST API | yes | **yes** |
| 10 | **PQ** — Role-Based Access to NEHR for Registered Community Optometrists | 12 Feb 2026 | Vol 96, Sitting No 17 | Q: Mr Yip Hon Weng · A: Mr Ong Ye Kung | NEHR access hinges on HCSA licensing | Hansard POST API | yes | **yes** |
| 11 | **PQ** — Plans for Onboarding TCM Practitioners to NEHR | 12 Feb 2026 | Vol 96, Sitting No 17 | Q: Mr Cai Yinzhou · A: Mr Ong Ye Kung | TCM outside the NEHR regime | Hansard POST API | yes | **yes** |
| 12 | **PQ** — Making LPA Status and Donee Identity Accessible on NEHR | 7 Jul 2026 | Vol 96, Sitting No 32 | Q: Dr Haresh Singaraju · A: Mr Ong Ye Kung | Mental Capacity Act limits NEHR content | Hansard POST API | yes | **yes** |
| 13 | **PQ** — Acceptance Rates of Revised HealthHub Terms of Use | 2 Mar 2026 | Vol 96, Sitting No 22 | Q: Mr Dennis Tan Lip Fong · A: Mr Ong Ye Kung | HealthHub TOU updated Sep and Nov 2025 | Hansard POST API | yes | **yes** |
| 14 | **PQ** — Simplifying HealthHub Terms of Use | 7 May 2026 | Vol 96, Sitting No 31 | Q: Mr Dennis Tan Lip Fong · A: Mr Ong Ye Kung | Access to own record conditioned on broad contract; simplification declined | Hansard POST API | yes | **yes** |
| 15 | **PQ** — Patient Follow-Up Testing at Different Healthcare Cluster Polyclinics | 13 Jan 2026 | Vol 96, Sitting No 13 | Q: Mr Dennis Tan Lip Fong · A: Mr Ong Ye Kung | NEHR as cross-cluster sharing mechanism; Next Gen EMR | Hansard POST API | yes | **yes** |
| 16 | **PQ** — Medical Records Access Rights for Non-custodial Parents | 7 Apr 2026 | Vol 96, Sitting No 27 | Q: Mr Victor Lye · A: Mr Ong Ye Kung | HealthHub parental access; administrative discretion only | Hansard POST API | yes | **yes** |
| 17 | **COS 2026, Head O** — AI chronic-disease risk model built on anonymised patient data | 5 Mar 2026 | Vol 96, Sitting No 25 | Mr Ong Ye Kung | Secondary use of anonymised patient data to build a national AI model | Hansard POST API | yes | **yes** |
| 18 | **Extra-parliamentary, post-A27** — Speech at HIMSS26 APAC, incl. first reference to **AIHGle 2.0**, Tandem, AgentSea | 24 Aug 2026 | n/a | Mr Tan Kiat How, SMS | AI governance instrument updated; agentic AI in public healthcare | MOH newsroom via sitemap | yes | **n/a — not a parliamentary document** |

---

## 1. Mr Chua Kheng Wee Louis — Second Reading of the Health Information Bill, 12 January 2026

- **Sitting:** Monday, 12 January 2026 · 15th Parliament, First Session · **Vol 96, Sitting No 12**
- **Speaker:** **Mr Chua Kheng Wee Louis (Sengkang)**, Workers' Party. Called by Mr Deputy Speaker; began **5.18 pm**.
- **Source and route:** the Official Report as served by the Hansard JSON API, `POST https://sprs.parl.gov.sg/search/getHansardReport` with body `{"sittingDate":"12-01-2026"}`, retrieved 3 September 2026. Raw JSON saved at `$SCRATCH/work/SG-01/hansard/12-01-2026.json`. The speech is in `takesSectionVOList[11]` (`sectionType` "BP", title "Health Information Bill"), HTML stripped locally.
- **Status:** **Official-Report verbatim.** Paragraph numbers `[LC ¶n]` below are mine, applied to the paragraph breaks in the Official Report; they are a pinpointing aid, not a Hansard artefact.

### 1.1 Full text, verbatim

**[LC ¶1]** Mr Deputy Speaker: Mr Louis Chua.

**[LC ¶2]** 5.18 pm

**[LC ¶3]** Mr Chua Kheng Wee Louis (Sengkang): Mr Deputy Speaker, one's medical information is more than just a set of datapoints on a server. It is the deeply personal and sensitive, and a digital diary of our physical and mental lives.

**[LC ¶4]** Therefore, the public's trust is sacrosanct to the implementation of the NEHR. We must ensure that the Government and healthcare stakeholders do their utmost to safeguard the privacy of this data.

**[LC ¶5]** While I broadly agree with the principles of the HIB, which delineates the responsibilities of our healthcare ecosystem and mandates data contribution, I believe it is also important that we continue to strengthen areas of data privacy, transparency and individual agency.

**[LC ¶6]** As we move towards Smart Nation, we must ensure that our progress does not leave Singaporeans feeling as to the power asymmetry between themselves and the state is growing, and that they are losing control of their own data and privacy, and that public education measures would be stepped up to foster a deeper understanding of the NEHR's and one's rights as patients.

**[LC ¶7]** One crucial aspect of this Bill is that patients of opt in or out of the NEHR by way of an Access Restriction, which blocks medical practitioners from viewing all of the patient's NEHR's records, save important details, such as one's critical allergies and personal information. Patients may also select the medical institutions to the impose and access restriction on.

**[LC ¶8]** Notably, clause 30(7) reveals that even if a restriction is in place, a patient's information continues to be uploaded to the NEHR in the background. This, according to MOH, is in the interest of ensuring the expeditious provision of care should the patient wish to opt-in to the NEHR in the future or during an emergency situation. But Mr Deputy Speaker, if a citizen says "no" to the NEHR today, should the state then be allowed to say, "Okay, but trust me" and collect their data anyway?

**[LC ¶9]** In a 2017 letter to MOH, the then President of the Singapore Medical Association highlighted that this might compromise the patients' right to privacy. This is because patients might not wish for their medical records to be uploaded to the NEHR at all.

**[LC ¶10]** I urge the Government to reconsider this continuous background uploading and if other additional options can also be considered. For example, we should consider offering a total opt out or a so-called "no means no" option, provided the patient is thoroughly briefed on the dangers and risks of doing so and is counselled on the implications of such an option.

**[LC ¶11]** Second, patients might prefer to block access to certain documents and records only, instead of imposing a wholesale access restriction on their records. I understand that one sensitive health information that could potentially lead to stigmatisation and discrimination will be secured by additional measures, such as double lock-in feature.

**[LC ¶12]** Nevertheless, what is sensitive to one might not be sensitive to another. Hence, patients might wish for additional flexibility when protecting their health records rather than just give a blanket nod.

**[LC ¶13]** Part 3 of the Bill also allows for the sharing of both administrative and clinical information, to facilitate the continuity of care and outreach efforts for national health programmes through data sharing arrangements. Notably, patient consent is also not required for the sharing of such data between healthcare providers and public agencies as established under clause 50.

**[LC ¶14]** Therefore, I hope that patients will be recorded some flexibility and control over the types of health information they wish to disclose and how they would like that information to be used.

**[LC ¶15]** While I appreciate that we can already check out any NEHR access history in HealthHub, patient consent should also be sought for data sharing between healthcare providers and public agencies. On that note, Part 2, Division 4 of the Bill also sets out the requirements for the usage of any NEHR data for secondary purposes or derived information. After all, a national health record database provides a valuable snapshot of our population's health condition, which could then be used by researchers for developing solutions to public health issues faced by our society.

**[LC ¶16]** The Bill separates such derived information into two categories. Type 1, which is information that is individually identifiable, as well as Type 2, data that is aggregated and anonymised.

**[LC ¶17]** And it is worth noting that clause 30(5) paragraph (a) states that "The imposition of an access restriction does not preclude one's NEHR records, be it individually identifiable or anonymised from being disclosed as derived information, if an approval is granted by the Minister.

**[LC ¶18]** I agree with clause 25(2) that the Minister may approve an application to obtain Type 2 derived information, if the Minister is satisfied, having regard to the purpose for which the application is made. That is in the public interest to do so.

**[LC ¶19]** However, what are the instances in which subsection (1) will apply where individually identifiable health information is required in the name of promoting public Health?

**[LC ¶20]** This is another case where even if an individual exercises his right to impose an access restriction, it can be again overruled with a Ministerial approval for his individually identifiable information to be shared on public healthcare grounds.

**[LC ¶21]** Although the cost to the patient's privacy may be outweighed by the benefits such research brings to society at large, that should not preclude the Government from giving patients more agency over secondary usage of the health information, especially for research purposes. This is a principle that is adopted by other healthcare systems worldwide as well. For instance, both Taiwan and the EU have enacted regulations empowering patients to restrict the use of their identifiable health data for secondary purposes. Therefore, I hope that the Government would consider allowing patients to exercise greater control over the secondary usage of their health data.

**[LC ¶22]** To follow on the Ministerial approval requirement under clause 25, according to MOH's Trusted Research and Real World-Data Utilisation and Sharing Tech (TRUST) platform, which provides anonymised healthcare-related data for secondary usage, the Data Access Committee reviews the social value and public interests of each data request.

**[LC ¶23]** I agree that access to any NEHR data unlocks research and development (R&D) potential and supports long-term public health outcomes. When it comes to commercial-linked entities, however, while such parties might use the data for generating public health reasons and research, it raises ethical concerns surrounding transparency and privacy, especially if access to data is excessive, insufficiently justified or beyond stated that be used.

**[LC ¶24]** Back in 2015, in the United Kingdom, the Royal Free and HS Foundation Trust in London signed an agreement with Google DeepMind. This allowed the British AI firm to analyse sensitive information on 1.6 million patients who uses the TRUST hospitals each year. The access was used for monitoring software for mobile devices called Streams which promises to improve clinicians' ability to support patients with acute kidney injury. But according to the study's authors, the publicist dated in the agreement were far less specific and made more open-ended references to using data to improve services.

**[LC ¶25]** In the last few years, there has been a significant drive and race across providers to train AI models using the largest and most diverse datasets available in order to achieve better performance. However, this trend also raises important concerns about data privacy, particularly, in regard to sensitive records, such as medical information – NEHR data.

**[LC ¶26]** For this reason, we should exercise caution before granting third parties, especially if they are commercially-linked organisations, with excessive or unconstrained access to NEHR data, especially when longitudinal studies examining individuals' health records over prolonged periods are involved and be mindful of scope creep, given commercial incentives.

**[LC ¶27]** Besides R&D applications, I do believe that Government should capitalise on the NEHR's capabilities to boost the efficiency of healthcare delivery and financial assistance to all Singaporeans.

**[LC ¶28]** With allied health professionals, such as medical social workers having access to the patient's NEHR record, I hope that the possibility of financial assistance being further streamlined via enhanced data sharing procedures with the likes of the Social Services Office can be explored – with the patient's approval, of course. This would be most helpful in cases, such as long-term assistance to those permanently unable to work due to illness or disability. And in turn, this could also help to alleviate the workload of our medical social workers while easing the experience of those seeking financial and social support.

**[LC ¶29]** Finally, an extensive public education effort on the NEHR should also be implemented, should this Bill be passed. A 2018 Singapore Medical Association survey revealed that only 50% of respondents heard about the NEHR and 14.9% fully understood what the NEHR was back then. As shared in the Feedback Report on the Public Consultation for the Health Information Bill, during the public consultation exercise, MOH received feedback requesting for a greater clarity and clearer communication of the policy positions under the Bill. Will the MOH be conducting and updated public awareness survey upon implementation of the Bill to measure how public understanding of the NEHR has evolved, particularly regarding access restrictions and the use of individually identifiable data?

**[LC ¶30]** It is nonetheless critical that the Government ramp up its patient's education efforts regarding the purposes of the NEHR and how it might benefit them as well as to explain the rights of each patient pertaining to their medical data.

**[LC ¶31]** In conclusion, Mr Deputy Speaker, the NEHR represents a significant milestone in our Smart Nation journey but its success rests entirely on the foundation of trust. Medical information is among the most intimate forms of data one can share and the success of the NEHR ultimately depends, not on compulsion, but on trust.

**[LC ¶32]** To ensure this trust is not eroded by a perceived power asymmetry between the state and the individual, we must move beyond a "collect first, tell later" approach. And throughout my speech, I have highlighted three recurring themes: agency, transparency and proportionality.

**[LC ¶33]** I hope Singaporeans can be granted more meaningful control and disclosure over how their health information is accessed, shared and used. More importantly, we cannot have a well-functioning healthcare system if only 15% of people fully understood what the NEHR is. We must ramp up public education to ensure every Singaporean knows their rights and how their data is used to serve the common good, in order to foster the trust that turns our national database into a national asset. Notwithstanding these clarifications, I support the Bill.
### 1.2 The research-access / derived-information / TRUST points he made, pinpointed

| # | Point | Pinpoint | Key words as spoken |
|---|---|---|---|
| 1 | **Background contribution continues despite an access restriction.** He asks the Government to reconsider it and to consider a full opt-out. | **[LC ¶8]**–**[LC ¶10]** | "clause 30(7) reveals that even if a restriction is in place, a patient's information continues to be uploaded to the NEHR in the background"; "if a citizen says 'no' to the NEHR today, should the state then be allowed to say, 'Okay, but trust me' and collect their data anyway?"; "we should consider offering a total opt out or a so-called 'no means no' option" |
| 2 | **No patient consent for provider-to-public-agency sharing under clause 50**, and he asks that consent be sought. | **[LC ¶13]**, **[LC ¶15]** | "patient consent is also not required for the sharing of such data between healthcare providers and public agencies as established under clause 50"; "patient consent should also be sought for data sharing between healthcare providers and public agencies" |
| 3 | **Locates the secondary-use regime**: Part 2, Division 4 of the Bill governs use of NEHR data "for secondary purposes or derived information". | **[LC ¶15]** | "Part 2, Division 4 of the Bill also sets out the requirements for the usage of any NEHR data for secondary purposes or derived information" |
| 4 | **States the Type 1 / Type 2 taxonomy of derived information.** This is the only place in the whole debate where the taxonomy is stated. | **[LC ¶16]** | "The Bill separates such derived information into two categories. Type 1, which is information that is individually identifiable, as well as Type 2, data that is aggregated and anonymised." |
| 5 | **Clause 30(5)(a) — an access restriction does not stop disclosure as derived information** where the Minister approves. | **[LC ¶17]** | "clause 30(5) paragraph (a) states that 'The imposition of an access restriction does not preclude one's NEHR records, be it individually identifiable or anonymised from being disclosed as derived information, if an approval is granted by the Minister." |
| 6 | **Clause 25(2) — Ministerial approval for Type 2 derived information** on a public-interest test; he accepts it, then asks what triggers the identifiable (subsection (1)) limb. | **[LC ¶18]**–**[LC ¶20]** | "I agree with clause 25(2) that the Minister may approve an application to obtain Type 2 derived information … That is in the public interest to do so."; "what are the instances in which subsection (1) will apply where individually identifiable health information is required in the name of promoting public Health?"; "even if an individual exercises his right to impose an access restriction, it can be again overruled with a Ministerial approval" |
| 7 | **Asks for patient control over secondary use for research**, citing Taiwan and the EU. | **[LC ¶21]** | "both Taiwan and the EU have enacted regulations empowering patients to restrict the use of their identifiable health data for secondary purposes. Therefore, I hope that the Government would consider allowing patients to exercise greater control over the secondary usage of their health data." |
| 8 | **TRUST** — names the platform, expands the acronym, and identifies the **Data Access Committee** and its social-value / public-interest test as the operative governance. | **[LC ¶22]** | "MOH's Trusted Research and Real World-Data Utilisation and Sharing Tech (TRUST) platform, which provides anonymised healthcare-related data for secondary usage, the Data Access Committee reviews the social value and public interests of each data request" |
| 9 | **Commercial-linked entities** — transparency and privacy concerns where access is "excessive, insufficiently justified or beyond" the stated use. | **[LC ¶23]** | "When it comes to commercial-linked entities … it raises ethical concerns surrounding transparency and privacy, especially if access to data is excessive, insufficiently justified or beyond stated that be used." |
| 10 | **The DeepMind / Royal Free precedent** — 1.6 million patients, purposes in the agreement "far less specific" than represented. | **[LC ¶24]** | see §1.3 on the Hansard transcription error in this paragraph |
| 11 | **AI training on the largest available datasets** is the driver, and NEHR data is the sensitive case. | **[LC ¶25]** | "a significant drive and race across providers to train AI models using the largest and most diverse datasets available … this trend also raises important concerns about data privacy, particularly, in regard to sensitive records, such as medical information – NEHR data" |
| 12 | **Warns against unconstrained third-party / commercial access and scope creep**, especially for longitudinal studies. | **[LC ¶26]** | "we should exercise caution before granting third parties, especially if they are commercially-linked organisations, with excessive or unconstrained access to NEHR data … and be mindful of scope creep, given commercial incentives" |
| 13 | **Asks for a repeat public-awareness survey** on the use of individually identifiable data. | **[LC ¶29]** | "Will the MOH be conducting and updated public awareness survey upon implementation of the Bill to measure how public understanding of the NEHR has evolved, particularly regarding access restrictions and the use of individually identifiable data?" |

**What he got.** The Minister answered items 1, 2 and 8/9 only, and at a high level of generality — see **[CL ¶56]** and **[CL ¶57]** at §2.2. Items 4, 5, 6, 7, 10, 11, 12 and 13 — the whole Type 1 / Type 2 derived-information architecture, the clause 30(5)(a) override, the request for patient control over secondary use, and the request for an awareness survey — **received no answer on the floor**. The Bill was reported without amendment.

### 1.3 The Workers' Party published text, and the divergences from Hansard

- **Source and route:** `https://www.wp.sg/parliament/speech-by-louis-chua-on-the-health-information-bill`, plain curl with a browser User-Agent, HTTP 200, 71,308 bytes, retrieved 3 September 2026. Found by paginating the party's speech index with the Webflow parameter `https://www.wp.sg/parliament?675b9c48_page=N` (the speech sits on page 18; the index has no sitemap and no server-side search). Extracted text saved at `$SCRATCH/work/SG-01/wp-louis-chua-hib.txt`.
- **Status: [PARTY-PUBLISHED TEXT — NOT THE OFFICIAL REPORT].** It is primary as to authorship (published by the speaker's own party under his name, headed "Health Information Bill: January 2026 / Chua Kheng Wee Louis") but it is the **prepared text**, not the record of what was said. Where the two differ, **Hansard governs** for citation purposes. Do not quote the WP text as Hansard.

I diffed the two sentence by sentence. The substance is the same throughout — every one of the thirteen points in §1.2 appears in both. The differences are of three kinds:

**(a) Structural.** The WP text carries section headings absent from Hansard: "Introduction", "Uploading of Information despite an Access Restriction", "Selective Imposition of Access Restrictions and Patient Consent", "Use of Data for Secondary Purposes", "Transparency on Requests for Derived Data", "Streamlining of Healthcare Mobile Applications", "Strengthening Public Education Efforts", "Conclusion". These are useful as a map of his argument but they are **not in the Official Report** and must not be presented as such. The WP text also addresses "Mr Speaker" whereas he was in fact called by, and addressed, **Mr Deputy Speaker**.

**(b) Hansard appears to contain transcription errors.** Four are material enough to flag, because a reader quoting Hansard alone would go wrong:

| Hansard (Official Report) | WP prepared text | Comment |
|---|---|---|
| "the Royal Free and **HS** Foundation Trust in London" **[LC ¶24]** | "the Royal Free **NHS** Foundation Trust in London" | WP is correct as a matter of fact. |
| "1.6 million patients who uses **the TRUST hospitals** each year" **[LC ¶24]** | "1.6 million patients who use **the Trust's hospitals** each year" | **Citation trap.** Hansard's capitalisation makes it read as though he were referring to Singapore's TRUST platform. He was referring to the UK NHS Foundation *Trust*. Anyone quoting **[LC ¶24]** must not treat "the TRUST hospitals" as a reference to the TRUST platform. |
| "the **publicist dated** in the agreement were far less specific" **[LC ¶24]** | "the **purposes stated** in the agreement were far less specific" | Hansard is garbled; the WP text is the intelligible reading. Quote this sentence only with the garble shown, or paraphrase. |
| "such as **double lock-in** feature" **[LC ¶11]** | "such as a **double log-in** feature" | "double log-in" is correct — it is the re-verification control the Minister described for sensitive information. |

Other, smaller Hansard oddities in the same speech: "patients **of** opt in or out" (¶7); "patients will be **recorded** some flexibility" (¶14, WP: "would be **accorded**"); "might use the data for **generating** public health reasons" (¶23, WP: "**genuine** public health reasons"); "beyond stated **that be used**" (¶23, WP: "beyond **the stated secondary use**").

**(c) Small substantive differences between prepared and delivered text.** Three are worth recording:

| Hansard | WP prepared text |
|---|---|
| "we continue to **strengthen** areas of data privacy" ¶5 | "we continue to **significantly strengthen** areas of data privacy" |
| "**Besides R&D applications**, I do believe that Government should capitalise on the NEHR's capabilities" ¶27 | "**Besides commercial and R&D applications**, I do believe the Government should capitalise…" |
| "only **50%** of respondents heard about the NEHR" ¶29 | "only **50.2%** of respondents heard about the NEHR" |
| "with the patient's **approval**, of course" ¶28 | "with the patient's **consent** of course" |

**Recommendation for the bundle:** cite Hansard for the words spoken; cite the WP page separately, expressly as the party-published prepared text, where you need the section headings, the correct "Royal Free NHS Foundation Trust", or the intelligible "the purposes stated in the agreement".

---

## 2. Government closing speech — Mr Tan Kiat How, Senior Minister of State, 12 January 2026

- **Sitting:** Monday, 12 January 2026 · 15th Parliament, First Session · **Vol 96, Sitting No 12**
- **Speaker:** **Mr Tan Kiat How, Senior Minister of State, Ministry of Digital Development and Information & Ministry of Health**, replying on behalf of the Minister for Health. Presiding: **Mr Speaker**.
- **Timing:** the reply began at **7.25 pm** after the suspension (the House suspended 7.13–7.25 pm), ran to **8.07 pm** when the Senior Minister of State reached his time limit, and resumed at **8.08 pm** after the Suspension of Standing Orders ("Time Limit for Senior Minister of State's Speech"). Clarifications followed from Mr Kenneth Tiong and Mr David Hoe.
- **Source and route:** Official Report via `POST https://sprs.parl.gov.sg/search/getHansardReport` `{"sittingDate":"12-01-2026"}`, retrieved 3 September 2026; sections `takesSectionVOList[13]` (7.25–8.07 pm) and `[15]` (8.08 pm onward, including the clarification exchange). Cross-checked against MOH's published text at `https://www.moh.gov.sg/newsroom/closing-speech-by-mr-tan-kiat-how--senior-minister-of-state--mddi---moh--for-the-second-reading-of-the-health-information-bill/` (curl, HTTP 200, 629,051 bytes).
- **Status:** **Official-Report verbatim.** `[CL ¶n]` numbering is mine.

### 2.1 Full text, verbatim

**[CL ¶1]** Mr Speaker: Senior Minister of State Tan Kiat How.

**[CL ¶2]** 7.25 pm

**[CL ¶3]** Mr Tan Kiat How: Mr Speaker, I thank all the Members who have spoken, for supporting the Bill, especially our new Nominated Members, Ms Kuah and Dr Haresh, contributing to the debate on the first day they are sworn in.

**[CL ¶4]** Sir, only by enabling data sharing and a unified health summary for each patient, can we support continuity of care when patients move between different healthcare settings and receive care from multiple healthcare providers.

**[CL ¶5]** The Members have raised a number of thoughtful views and constructive comments which I will address in four broad themes.

**[CL ¶6]** But before I do that, I would like to address the points made by the Member Mr Kenneth Tiong around the organisation of and his views on Synapxe, the health tech agency that implements many of the IT projects in MOH. As that topic does not pertain to the specifics of the HIB, I encourage Mr Tiong to raise a separate Parliamentary Question or raise the issue separately from today's debate. But suffice to say that Synapxe is not a commercial entity. Its fundamental role is to support MOH in delivering digital health and IT services to benefit the healthcare clusters to deliver better healthcare services to our Singaporeans.

**[CL ¶7]** Let me now turn to the substance of the Bill. There are four broad themes of comments that came in. First, it is around the safeguards for patients. Second, the obligations and support measures for healthcare providers. Third, the support measures for healthcare professionals. And fourthly, the sharing of non-NEHR health information. Let me start with the safeguards for patients.

**[CL ¶8]** Mr Yip Hon Weng, Mr David Hoe, Dr Wan Rizal, Dr Hamid Razak and Mr Fadili Fawzi highlighted the importance of safeguarding access to and the use of patients' NEHR information. And this has been a focus for us when we carried out the public consultation and prepared this Bill. There are broadly two sets of concerns that we hear from individuals.

**[CL ¶9]** The first is how a patient's NEHR information will be adequately safeguarded and accessed only as needed by healthcare professionals and providers. Of special concern is the access to health information that may be deemed more sensitive. There were also related questions about the Access Restriction feature. So, that is the first set of concerns. The second is around whether their NEHR information would be used beyond healthcare, such as for employment and insurance purposes.

**[CL ¶10]** Let me touch on the first set of concerns. Sir, we are not starting from scratch. We have been operating the NEHR for 15 years. Importantly, the vast majority of healthcare providers are already onboard – all public healthcare institutions, most private hospitals and the bulk of the GP clinics. So, this is a system that has been operating for many years. And we have built in various ex-ante safeguards into the design of the NEHR. This includes role-based access, such that authorised healthcare professionals can only access the types of health information required for their specific patient care roles. We also have technical controls and regular ex-post audits to flag unauthorised accesses to the NEHR.

**[CL ¶11]** With the HIB, we are enhancing the legislative safeguards and stiffening penalties for unauthorised access.

**[CL ¶12]** First-time offences of unauthorised access of NEHR are punishable with a maximum fine of $50,000 and/or up to two years' imprisonment upon conviction. And the penalty is doubled for repeat offenders. Healthcare professionals who access NEHR in an unauthorised manner could also be referred to the relevant Professional Boards or Councils for further action.

**[CL ¶13]** Mr Dennis Tan spoke about offences and whether the $1 million maximum fine was sufficient. Sir, the regimes he compared with as well as PDPA that he referred to, do not have criminal prosecution. The breaches to the HIB are serious and we take this seriously. For example, a conviction involves not just fines, it is imprisonment as well. But more basically, we take an approach that is more supportive, working together with our healthcare providers, the healthcare professionals. These are people – nurses, clinicians and administrators, who want to do well, who want to serve the patients, who want to take care of the patients. And we want to take a supportive role and approach to uplift data security and cybersecurity postures, not a punitive approach.

**[CL ¶14]** Mr Alex Yeo asked about audits on unauthorised accesses of the NEHR and Mr Tiong asked if Synapxe would proactively monitor against unauthorised access. Synapxe, the NEHR system operator, conducts regular audits and ongoing monitoring to detect suspicious behaviour or atypical patterns, including in response to patient alerts. For example, accessing the NEHR information of a patient who has not recently visited any healthcare provider is a flag. Synapxe will conduct investigations to determine whether an unauthorised access has occurred. Synapxe will regularly review its audit plans, including frequency, best practices and the use of new tools like artificial intelligence to ensure that the regime is robust.

**[CL ¶15]** In addition, instances when a patient's NEHR information is accessed over the preceding 12 months will be made known to him through the "NEHR Access History" feature in the HealthHub application. This provides an additional layer of transparency. Patients can monitor which healthcare providers have accessed their NEHR information and flag any unauthorised access to the authorities for investigation.

**[CL ¶16]** The logs will show access at the healthcare institution level to keep the function simple, useable and practical. In a multi-disciplinary team, healthcare professionals across different roles may access the patient's NEHR information at different times of the patient's care journey. Depending on the patient's condition, it is also not uncommon for nurses, pharmacists or allied health professionals to need access. In our healthcare system, the institution is ultimately responsible for care to its patient.

**[CL ¶17]** I would like to take the opportunity to clarify the comment made by Mr David Hoe. HealthHub access logs will show all accesses to NEHR, regardless of whether the access is through EMR or the portal. So, just to clarify on his point earlier.

**[CL ¶18]** Sir, I would like to assure Mr Hoe, Mr Fadli and Mr Yip that we will seek users' feedback when reviewing the interface to ensure it is simple and user-friendly.

**[CL ¶19]** Mr Speaker, we understand that some patients are particularly concerned about access to health information that may be deemed more sensitive. Mr Louis Chua, Mr Yip, Dr Hamid, Mr Hoe and Mr Tiong have commented on the need for safeguards for such information. Such health information includes sexually transmitted infections, delusional disorders and schizophrenia. The diagnoses and test results that confirm the condition are subject to additional safeguards.

**[CL ¶20]** First, there are restrictions on who can access this information. Only a select group of healthcare professionals are allowed to access this information, based on their role in caring for the patient diagnosed with the health condition. For example, a nurse who is working in a psychiatric ward will have access to the psychiatric condition of the patient he or she is caring for. So, that is the first control.

**[CL ¶21]** Second, before an authorised healthcare professional can access these types of health information, they will be subject to a double log-in, which requires the authorised healthcare professional to re-verify their credentials before access. This ensures that such information is only accessed when needed and avoids accidental access. Accesses to such health information are more closely audited by Synapxe and cases of unauthorised access to NEHR information will be investigated and penalties imposed.

**[CL ¶22]** Sir, we appreciate that despite all these safeguards, some patients may still have privacy concerns. To assuage the concerns of these patients, the HIB will allow patients to restrict healthcare providers from accessing their NEHR information or we call this "Access Restrictions" in the Bill. As I mentioned earlier in my opening speech, we do not encourage this, as it could lead to adverse impact on care delivery for the patient.

**[CL ¶23]** To address the queries raised by Members, the Access Restrictions have been designed to balance the impact to patient care; considering the welfare and interest of the patient, while taking into consideration their concerns around privacy.

**[CL ¶24]** So, patients may restrict access to their NEHR information at the healthcare institution level, but not at an individual healthcare professional level. As I have mentioned earlier, care delivery is team-based and increasingly multi-disciplinary. It is not operationally feasible to restrict access to specific healthcare professionals but not others, when they all work in a team, in the same healthcare institution. This is aligned with good practices we observed elsewhere, like in Australia.

**[CL ¶25]** Health information will be contributed to NEHR even if Access Restrictions are in place. As pointed out by Dr Hamid, who brings in a practitioner's perspective, an incomplete record, including if individuals opt not to contribute select healthcare information deemed to be more sensitive, will significantly reduce the utility of NEHR in supporting healthcare professionals to provide quality care and could pose a safety risk.

**[CL ¶26]** In certain situations, access to such records in a timely manner could save lives, as I mentioned earlier in my opening speech. One example would be when a doctor or pharmacist needs to have the ability to access drug interactions and his job is hindered due to incomplete medication information, the patient could suffer unintended consequences, especially in emergency situations when the patient may not be able to respond.

**[CL ¶27]** It also ensures that if patients change their mind in future, for instance, when they are older and remove such Access Restrictions, there would be no gap in NEHR information and this was a valuable learning point when MOH colleagues engaged other jurisdictions. The approach we are adopting aims to achieve a balance between patient choice and ensuring that patients receive better and more coordinated patient care.

**[CL ¶28]** Sir, in summary, healthcare providers would be granted access to NEHR to support patients' continuity of care across healthcare settings by default. Patients may, however, restrict access to all healthcare providers, or from the second half of 2026, limit access so that only select healthcare providers, such as their own Healthier SG clinic, may access their NEHR information. Whilst in place, restricted healthcare providers will not be able to, unless required by other written law, access the patient's NEHR information, except for the essential subset of records that cover allergies and vaccination records.

**[CL ¶29]** Next, I would like to also thank Members like Mr Yip, Mr Hoe, Mr Chua, Mr Fadli and Ms Kuah Boon Theng for highlighting the importance of educating the public on the implications of placing Access Restrictions and supporting patients who are less digitally savvy. We are likewise mindful of this point.

**[CL ¶30]** MOH will work with the healthcare institutions to set-up physical touchpoints for those who require help with placing Access Restrictions and help them understand the implications of doing so. Alternatively, patients may seek the help of trusted individuals, like their family members and caregivers to place Access Restrictions on their behalf.

**[CL ¶31]** Mr Yip raised the concern that the act of placing an Access Restriction may itself become a source of stigma or adverse inference. This Access Restriction will be known only to the healthcare providers managing the patient and all healthcare professionals are bound by their respective professional bodies' ethical codes and ethical guidelines to treat all patients fairly and without prejudice.

**[CL ¶32]** Let me now move to queries around NEHR access by insurers and employers. We understand Singaporeans' concerns about the potential discrimination or stigmatisation they may face if their health information is revealed to their employer or insurer. On this, I would like to reiterate three points that I have made earlier in my opening speech.

**[CL ¶33]** First, insurers and employers do not and will not have access to NEHR. Second, healthcare professionals are also prohibited from accessing NEHR for employment or insurance purposes, except for prescribed statutory medical examinations, which I will talk on later, or where authorised by other written law or Order of the Court. Third, the HIB imposes strict penalties for any unauthorised access to NEHR, with higher penalties for prohibited employment or insurance purposes.

**[CL ¶34]** Dr Wan Rizal asked whether statutory medical examinations may provide a backdoor for employers to gain access to NEHR information. The list of statutory medical examinations that is in the Bill is tightly scoped to those where NEHR access is necessary to protect the public and safeguard the health of the individual. This is the key principle.

**[CL ¶35]** We have no plans to expand this list to include employment-related screenings that are not necessary to protect the public and the individual. The current practice for employment-related screenings will remain – where doctors rely on their history-taking, clinical assessment and their own existing medical records for the individual, if any, without access to NEHR.

**[CL ¶36]** On Mr Yeo's query, on whether MOH would consider allowing individuals to give consent for their NEHR information to be accessed for insurance purposes for some situations, I would like to reiterate that NEHR is primarily for patient care purposes. When insurers request for health information, the current practice is for healthcare providers and professionals to rely on their medical records and patient interactions, which include history-taking, as well as physical examinations, to prepare the necessary reports for the insurer. This will continue to be the case after the HIB is enacted. NEHR must not be accessed for such insurance- and employment-related checks.

**[CL ¶37]** To Mr Tiong's query, healthcare providers and professionals should prepare separate medical reports, memos or clinical summaries for the insurer, instead of providing their raw medical records, such as printouts from their clinical medical records. This is because raw medical records contain extensive information, including potentially irrelevant information.

**[CL ¶38]** Where NEHR information is referred to during a medical examination, information relevant to the episode would be validated or confirmed with the patient during history taking and may be captured in the provider's own medical records, together with the doctor's clinical assessment. Such information would then be treated as part of the provider's own medical records. Healthcare providers and professionals will need to carefully assess what information in their own medical records is relevant and necessary to include in the report provided to an insurer.

**[CL ¶39]** MOH has issued a circular to healthcare providers and a guidance note to insurers to clearly state these positions. Healthcare providers may inform MOH if there are any inappropriate requests for NEHR information for insurance purposes.

**[CL ¶40]** Sir, let me now address questions about the contribution requirements in the Bill. Dr Haresh asked if mandatory contributions, coupled with access will encourage episodic care affecting initiatives, such as Healthier SG, which encourages building a trusted relationship between patients and their family doctors. Mr Hoe asked about the requirement to contribute information in a timely and accurate manner and the treatment of overseas medical records. Mr Fadli Fawzi asked about the level of details of key health information to be contributed to NEHR.

**[CL ¶41]** The Bill requires healthcare providers to contribute accurate and complete health information in a timely manner. This ultimately benefits patients by enabling their healthcare providers to access all relevant health information to provide the best care. Take a Healthier SG family doctor as an example. The bill will allow the doctor to deliver better patient care, taking account of the patient's medical history across different settings, including private specialist clinics.

**[CL ¶42]** This enables the doctor to build a trusted, and hopefully lifelong relationship towards better health outcomes. And to help healthcare providers comply with the contribution requirements in the Bill, we have whitelisted health information management systems (HIMS) that have the requisite technical features and encourage all healthcare providers to subscribe to these HIMS.

**[CL ¶43]** On overseas medical records, the HIB only applies within Singapore. Nevertheless, patients can bring their overseas health records to their local healthcare providers, who may then incorporate relevant information into their own medical records and once incorporated, these records will be contributed to NEHR.

**[CL ¶44]** To Dr Hamid's query on whether populations who receive care outside the conventional system, such as prison inmates, would benefit from the Bill, I would like to assure the Member that all Singaporeans key health information, including those under the care of the Singapore Prison Service, will be contributed to NEHR.

**[CL ¶45]** To Mr Fadli's query, NEHR is designed to be a "One Health Summary". We will only require the contribution of health information prescribed in the First Schedule of the Bill and not the doctor's detailed clinical notes. The design of the system and the data pipes take in only the prescribed data types.

**[CL ¶46]** For example, if a patient has diabetes and is prescribed with insulin, the doctor will only contribute "diabetes" as a diagnosis and "insulin" as the medication. So, only information that is needed for continuity of care.

**[CL ¶47]** Sir, let me now turn to Dr Choo Pei Ling's suggestion to extend NEHR access to other users, such as allied health professionals working outside of licensed institutions. I would like to thank Dr Choo for her suggestion to extend the access to other users. However, I would like to reiterate that the primary purpose of the NEHR is to support and enhance the continuity of care for patients. Hence, the HIB provides for NEHR access for licensed healthcare institutions. Within these institutions, NEHR access is only provided for healthcare professionals with clinical or care planning roles. This is the core principle governing NEHR access.

**[CL ¶48]** However, we recognise that as care models develop and evolve, we may need to grant new providers or services access to NEHR. In doing so, we will consider factors such as whether NEHR information is required for that role and whether the provider or service is able to comply with the HIB's requirements. Prior to changing the scope of providers that may access NEHR, we will consult relevant stakeholders and publicly communicate the changes through the MOH website.

**[CL ¶49]** Sir, Mr Louis Chua, Mr Yip and Mr Fadli Fawzi also asked about the sharing of NEHR information for non-patient care purposes under the HIB or other written laws such as the Criminal Procedure Code 2010.

**[CL ¶50]** NEHR was set up to facilitate patient care and the information within NEHR is primarily intended to be shared across healthcare providers for that purpose. This is a consistent principle adopted by other jurisdictions that we have studied.

**[CL ¶51]** MOH is of the view that identifiable health information should generally be interpreted and managed by qualified healthcare professionals. Parties from outside the healthcare sector generally do not require identifiable health information for non-healthcare-related purposes. Therefore, when parties seek MOH's views on this, MOH will suggest that such parties consider alternative data sources or ways of achieving its policy intent instead of using NEHR information or involve qualified healthcare professionals to partner parties in meeting the intent.

**[CL ¶52]** For public health purposes under the HIB, NEHR information may be needed in certain situations, for example, to quickly identify and enable healthcare providers to contact affected patients in the event of a major drug contamination incident. Another example is in the event of an outbreak of a serious infectious disease, there may not be sufficient time nor would it be feasible to seek consent from individuals to use their NEHR information to contain the outbreak. De-identified NEHR information may also be needed for public policy analysis and planning purposes, such as to review healthcare utilisation trends or to analyse the cost effectiveness of medicines.

**[CL ¶53]** I have given some examples to the queries raised by Members on the scenarios in which those clauses apply.

**[CL ¶54]** As a general rule, MOH will ensure requests for NEHR information have sound basis before supporting it. For all supported requests, whether from private entities such as academic institutions and health-related organisations or from public agencies under other written laws, MOH will share only the necessary data required to fulfil the intent.

**[CL ¶55]** Let me give another example to illustrate my point. For example, for requests from the Police to locate missing persons, we only provide administrative information about visits to healthcare providers without details of the patient's medical condition. This enables the Police to confirm if missing persons have been warded in an emergency and in turn alert worried family members. Requesting parties will also be required to protect the data against loss and against unauthorised access, use, modification, disclosure or other misuse.

**[CL ¶56]** Mr Chua and Mr Fadli asked specifically about the use of NEHR for research. De-identified NEHR health information may be shared through established platforms such as TRUST under the National Research Foundation for research purposes. This could include training for artificial intelligence models.

**[CL ¶57]** Where requests are received from commercial parties, possibly for commercial purposes, we are extremely cautious in assessing such requests, including whether the sharing of such data is helpful in contributing to better healthcare and better health outcomes. Primarily, NEHR is for continuity of care and for public health purposes, not for commercial purposes.

**[CL ¶58]** Mr Chua suggested allowing Access Restrictions to be applied to the sharing of NEHR information for broader public health interest purposes such as policy planning and analysis. This is not advisable as it could lead to incomplete analysis and would undermine the utility of NEHR informing national policies and planning.

**[CL ¶59]** Sir, now, let me turn to the third topic on resilience and security of the system.

**[CL ¶60]** A number of Members, including Mr Yip and Mr Dennis Tan asked about the resilience and security standards for NEHR, particularly in light of the SingHealth data breach in 2018. I would like to reassure Members that MOH has taken in the recommendations under the Public Sector Data Security Review Committee conducted in 2019. And NEHR is complying with the relevant resilience and security requirements for Government systems recommended by this committee. NEHR is subject to security and resilience audits, with vulnerability scans, penetration tests and exercises carried out regularly to ensure that systems are secure and backup systems are operational in the event of a downtime.

**[CL ¶61]** I must add that, really, the lesson from the SingHealth data breach is that we were open and transparent about the issue, convened a Committee of Inquiry, learned our lessons, applied them and made sure we work very hard to prevent such breaches from recurring. We took those lessons to heart as we built up our cybersecurity and data security standards. We have done so over the years.

**[CL ¶62]** Additionally, there are several lines of defence before the NEHR database, with intrusion detection at various parts of the network. Timely hardware, software and application upgrades are implemented, which include security patches as well as security controls to detect and block suspicious traffic from external sources.

**[CL ¶63]** MOH and Synapxe will continue to work with the Cyber Security Agency of Singapore, GovTech and independent auditing firms to conduct regular cybersecurity reviews and security assessments.

**[CL ¶64]** I would also like to thank Mr Yip for his feedback on the need to make NEHR more user-friendly. I assure him we will continue to invest in the improvement of NEHR's technology and features to help healthcare providers quickly identify the most relevant information for their patients.

**[CL ¶65]** Relatedly, Mr Yip, Dr Choo, Mr Hoe, Ms Joan Pereira and a number of Members like Mr Fadli Fawzi, Mr Tiong and Mr Dennis Tan asked for further details on the cybersecurity and incident management requirements, including their feasibility and the availability of MOH support.

**[CL ¶66]** Sir, I would like to clarify that today, healthcare providers are already required to make reasonable security arrangements to protect personal health information. This is an existing requirement in laws such as the Personal Data Protection Act and Healthcare Services Act 2020.

**[CL ¶67]** The Bill's cybersecurity and data security requirements are based on these existing standards and legal requirements, but contextualised for the healthcare sector. These include frameworks such as the Cyber Security Agency of Singapore's Cyber Essentials Mark and the Infocomm Media Development Authority's Data Protection Essentials, which were designed to be accessible and implementable by smaller organisations.

**[CL ¶68]** Examples of these requirements include the use of anti-malware solutions and firewalls in computers, the backing up of essential business information and data storage practices. Healthcare providers will also need to train their staff on cyber-hygiene and data governance practices to ensure safe and secure access to health information.

**[CL ¶69]** On the incident management framework, healthcare providers and their HIMS providers must put in place a framework to identify, resolve and mitigate cybersecurity and data breaches. This includes notifying MOH of prescribed security incidents and implementing mechanisms and processes to detect and respond to incidents such as ransomware attacks or unauthorised access to NEHR.

**[CL ¶70]** But even with the best preventive measures, a data breach may still occur. Healthcare providers will be required to notify MOH and affected individuals of significant data breaches. Once notified, MOH will work with the healthcare providers to understand the root cause of the breach, the extent of the data exposed, the potential harm to patients, and the containment and mitigation measures that need to be implemented.

**[CL ¶71]** In the event of any data breach, healthcare providers are expected to take necessary measures to remediate the situation and prevent such incidents from occurring again. Where MOH is of the view that the mitigation or preventive measures are inadequate, we will work with the healthcare providers on implementing the appropriate measures.

**[CL ¶72]** To Mr Fadli Fawzi's query on how significant harm will be defined, if a data breach causes or is likely to cause significant harm to an individual, for example, if it involves disclosure of health information that may be deemed more sensitive, healthcare providers must notify the affected individuals on or after notifying MOH.

**[CL ¶73]** Additionally, MOH will only require significant breaches to be notified in alignment with the approach under existing legal frameworks such as the PDPA. These details will be set out in subsidiary legislation.

**[CL ¶74]** Let me now turn to the support measures for healthcare providers. I appreciate the concerns that Members have raised about the support needed for smaller providers, especially smaller GP clinics. I mentioned earlier that with Healthier SG, most GP clinics have already onboarded to NEHR, with the support of MOH.

**[CL ¶75]** MOH recognises the importance of providing healthcare providers with reasonable time to comply with the HIB requirements and will offer the necessary support for healthcare providers to prepare and adapt their systems and processes. We see them as a valuable partner in supporting the continuity of care in the community.

**[CL ¶76]** Our support package will include measures to defray costs of subscription to whitelisted HIB-compliant HIMS to digitalise their clinical records and to contribute data to NEHR more seamlessly. There are also other support packages to engage professional services from whitelisted service providers to implement cyber and data security requirements.

**[CL ¶77]** Additionally, resources, guidance materials and training programmes will be available to help healthcare providers, including our community health partners, to meet the HIB cybersecurity and data protection requirements on an ongoing basis.

**[CL ¶78]** We would like to reassure providers that with this support in place, healthcare providers will be better enabled and supported to implement the relevant requirements.

**[CL ¶79]** We acknowledge the concerns raised by Mr Yip about potential fear-mongering tactics by some vendors. To address this, MOH is developing basic service packages specifically tailored to the needs of solo practitioners and small and medium enterprises so that they can self-help and prevent overselling of unnecessary services. We are also establishing clear guidelines for whitelisted service providers on appropriate engagement practices and transparent pricing. Healthcare providers that encounter unethical practices by whitelisted service providers can report them to MOH.

**[CL ¶80]** Additionally, we recognise that there is a small group of what Members call the pen-and-paper clinics that may face challenges in digitalising their clinics and meeting the Bill's requirements. As Members highlighted, these clinics may require additional implementation support.

**[CL ¶81]** Sir, digitalisation is becoming key to the provision of healthcare. It is critical for clinical documentation, transmission of information between providers and laboratories, and supports timely coordination with other providers.

**[CL ¶82]** Today, most clinics already have some form of IT system for clinic management, accounting and billing. Going forward, digital tools will increasingly become important, enabling clinics to rely on clinical decision support systems to close care gaps and deliver safer care. Therefore, in recent years, we have strengthened the digitalisation in the private primary care sector to support Healthier SG and other national initiatives.

**[CL ¶83]** Today, about 1,100 Healthier SG clinics are onboard suitable Clinic Management Systems and contribute to NEHR. Across the GP sector, more than 80% of them are on Clinic Management Systems. So, there are a large number of clinics, a vast number of them, already embarking on the digitalisation efforts. And we are supporting the remaining clinics to digitalise and onboard suitable systems to enable better delivery of care.

**[CL ¶84]** To Ms Joan Pereira's query if smaller clinics could collaborate on shared resources, this is a good idea for smaller clinics to explore. Currently, clinics can already join the Primary Care Networks (PCNs). PCNs not only provide peer leadership and support to small or solo GP practices, they also offer administrative assistance through the PCN headquarters. The PCNs will continue to offer advice and support to member clinics, share resources to smoothen the clinics' journey in digitalisation and fulfilling NEHR contribution. We will further consider Mr Dennis Tan's and Ms Pereira's suggestions on shared IT support services as part of the roll-out.

**[CL ¶85]** I would like to assure Members that MOH is mindful of the administrative effort required to contribute information to NEHR. And this is why we encourage all healthcare providers to adopt a whitelisted HIMS, which automates the process of contributing relevant health information to NEHR. That said, for smaller clinics that may require more time to digitalise, we will make available an alternative contribution channel so that these clinics will be able to start contributing data when required, while MOH continues to work with them on their digitalisation plans.

**[CL ¶86]** Ms Kuah reflected concerns from the ground about time and effort needed for compliance, and if MOH will take these considerations in event of non-compliance, especially in the initial period. MOH has worked closely with healthcare providers and professionals and have been engaging them over the last few years. We have taken their feedback on board.

**[CL ¶87]** First, the Bill will commence in early 2027 to allow sufficient time for healthcare providers and professionals to familiarise themselves with the Bill's requirements. Second, to support their transition, guidance materials and dedicated support channels will be made available from the second quarter of this year to help providers and professionals understand their options and navigate the process. Third, should there be challenges complying with the Bill by the required timelines, MOH will consider the facts of each case carefully and assist where appropriate.

**[CL ¶88]** Sir, now let me turn to the comments and suggestions for support for healthcare professionals.

**[CL ¶89]** Dr Hamid Razak and Dr Choo Pei Ling enquired about how MOH intends to support healthcare professionals, noting that they have concerns about increased liability arising from the HIB. I think Dr Haresh also pointed out concerns from healthcare professionals on medical and legal liabilities and how they should think about it.

**[CL ¶90]** We have been engaging the professional bodies and speaking to them over a period of time, and have taken their suggestions, ideas and feedback on board. MOH will publish a set of guidelines to support healthcare professionals' appropriate access and use of NEHR information. These guidelines will apply not only to doctors but also to other healthcare professionals accessing NEHR, such as dentists, nurses and allied health professionals. Let me share some examples of the guidance that will be provided.

**[CL ¶91]** Sir, healthcare professionals have asked whether they will be required to access NEHR for each consultation and whether they need to review each record in NEHR when they do access it.

**[CL ¶92]** Accessing patients' NEHR information is not compulsory under the HIB. NEHR supports and complements existing clinical practices, including good history-taking and physical examinations. The HIB does not change existing standards and practices. Healthcare professionals are encouraged to consider a range of factors before deciding whether NEHR access is required for a particular consultation, such as whether more information is required based on the information gleaned from the history-taking and physical examinations or whether health records in NEHR would be relevant to the particular consultation.

**[CL ¶93]** Sir, we will continue to work with respective professional bodies to disseminate these guidelines to all healthcare professionals. We will also support professional bodies in ensuring their members' compliance with the Bill. Sir, on this note, I would also like to take the opportunity to thank Ms Kuah for co-chairing the NEHR Guidelines Workgroup Committee.

**[CL ¶94]** Sir, let me now turn to health information that sits outside of NEHR and the clauses in the HIB that will enable the sharing of such information. Ms Pereira enquired about the timeline for enabling community health partners' sharing of such health information to be covered under the HIB. Mr Louis Chua asked why the HIB enables the sharing of non-NEHR health information without consent.

**[CL ¶95]** Today, AIC shares data with community partners to enable them to engage and provide befriending services or care to seniors. However, on the ground, there are difficulties with obtaining consent for data-sharing. Referencing my earlier example of Mr Lim, the 72-year-old gentlemen who is managing his diabetes condition. He stopped visiting his local polyclinic and his polyclinic has faced difficulties in contacting him to obtain consent. The HIB will address this by providing an additional channel for the sharing of health information.

**[CL ¶96]** With the HIB, Mr Lim's polyclinic can potentially share his contact information and broad health risk indicators, such as an indication of the presence of frailty or chronic conditions with AIC, without the details of specific medical conditions. AIC can then prioritise engaging Mr Lim to check on his well-being and link him with the necessary support as needed.

**[CL ¶97]** On whether to include other community health partners, like Active Ageing Centres and use cases in the future, MOH will carefully assess whether these other entities and use cases facilitate quality care and care continuity for patients. We will consider their readiness to meet the various responsibilities that come with sharing health information, such as cybersecurity and data security requirements under the Bill and we will consult key stakeholders.

**[CL ¶98]** 8.07 pm

**[CL ¶99]** Mr Speaker: Senior Minister of State Tan, if I could just ask you to hold on for a minute, because you have reached your time limit. So, Deputy Leader.

**[CL ¶100]** [(proc text) Debate resumed. (proc text)]

**[CL ¶101]** Mr Speaker: Senior Minister of State, you may resume.

**[CL ¶102]** 8.08 pm

**[CL ¶103]** Mr Tan Kiat How: Sir, we will consider their readiness to meet the various responsibilities that come with sharing health information, such as the various requirements under the Bill. Any community health partners which are added will be publicly communicated, including through MOH's website.

**[CL ¶104]** Sir, to conclude, the HIB will help us achieve the goal of "One Patient, One Health Summary, One Care Journey". We will work with and support healthcare providers and healthcare professionals in achieving this goal. Through our collective efforts, Singaporeans can benefit from better coordinated care, enhanced quality of care and lower costs.

**[CL ¶105]** Sir, I believe I have addressed the questions raised by all the Members and I beg to move.

**[CL ¶106]** Mr Speaker: Are there clarifications for Senior Minister of State Tan? Mr Kenneth Tiong.

**[CL ¶107]** 8.09 pm

**[CL ¶108]** Mr Kenneth Tiong Boon Kiat: Thank you, Mr Speaker, for the clarifications. I also thank the Senior Minister of State. So, I mentioned the possibility of insurance. The Senior Minister of State mentioned that there will be cost support. But is there a reason why insurance is not offered, rather than general cost support? That is the first clarification.

**[CL ¶109]** Two, I thank the Senior Minister of State for saying there will be flexibility for IT-incapable practices, such as the senior GPs who are my constituents. Can the Senior Minister of State just double click and explain a bit what this flexibility for IT-incapable practices might entail?

**[CL ¶110]** Three, I think I did not hear an answer to what if there is a data breach. Can the insurers now use the now-public information in the data breach?

**[CL ¶111]** And I thank him for his response to my concerns about the inspection and right to audit clauses. The Senior Minister of State's response is that doctors should carefully assess what is relevant. I think that this may not be a great solution because I think the doctor is caught in the middle between the insurer and the patient, and they have to bear liability for the judgement calls as to what they put in the notes. So, I think what is probably going to happen is that there is going to be a chilling effect, where doctors will start avoiding documenting any sensitive data, both in their own medical records but also perhaps in NEHR as well. And so, if it percolates up to the NEHR, would the NEHR utility not be undermined if they cannot trust what to input?

**[CL ¶112]** So, I mentioned in my speech that it might be better to just go downstream and just say that we "work with MAS to prohibit insurers from requiring NEHR-derived information as a condition of coverage, claim processing and policy renewal." And if I may, that is a significant part of why I posed the Parliamentary Question to Minister Ong Ye Kung earlier today about needing a dual regulation framework by MAS and MOH for insurers, so that someone is cleanly accountable for insurer behaviour as a health system actor.

**[CL ¶113]** Mr Tan Kiat How: Sir, I thank the Member for his clarifications. I believe there are four clarifications and I will take them in turn. One about offering cyber insurance to GP clinics. Can I just get the Member to confirm that this is what he is asking about? Okay.

**[CL ¶114]** Sir, in my speech, I did outline a few measures that we are putting in place and will continue to put in place to support GPs, especially smaller GPs, to comply with the HIB requirements, including data security and cybersecurity. And there are a number of support packages we are discussing with them. These details we will make known in due course. So, that is one.

**[CL ¶115]** We are supporting them, and we want them to travel the journey together with us. And there is broad support among the doctors, including those smaller GPs who see the value of contributing to and assessing NEHR, and most of the GPs are already onboard. They understand the need for the cybersecurity and data security requirements under the Bill to protect the data, and we are working with them to look at the various whitelisted services and management systems they can adopt to meet the requirements.

**[CL ¶116]** In terms of cybersecurity insurance, this is something we certainly will consider, but today, unfortunately, there is not a very mature market for cybersecurity insurance, specifically for GPs. So, if this is something useful, we will certainly consider as part of the support packages and discussions with the relevant stakeholders.

**[CL ¶117]** Second, about flexibility for senior GPs or smaller GPs. I mentioned the support packages. We do intend to provide for them, including funding support, whitelisting service providers and the different mentioned systems. But I think what we want to avoid is having different standards of cybersecurity and data security requirements for different clinics based on the size.

**[CL ¶118]** I think that is not the sensible and practical way to do it, as mentioned by different Members earlier. It is about making sure that different clinics and different touch points to the NEHR system meet the appropriate level of cybersecurity and data security requirements and finding ways of uplifting the different GPs and we will certainly do so in the coming months and years.

**[CL ¶119]** If the Member could clarify on third question for me, please?

**[CL ¶120]** Mr Kenneth Tiong Boon Kiat: Data breaches. If there is a data breach.

**[CL ¶121]** Mr Tan Kiat How: Okay. Sir, it is quite clear that the insurance companies cannot assess NEHR for insurance or employment purposes. But in data breaches, I think it all boils down to the ethical considerations or how they access those data breaches in the first place, and that is something we have to work together with MAS, as the regulator, together with insurance companies, on understanding how they are using that information. And that is something we frown upon – using NEHR data for purpose of insurance. But it is a hypothetical scenario, something we have to think through.

**[CL ¶122]** On a dedicated regulation around insurance, whether they should just be prohibited, to avoid putting the healthcare providers or professionals in a very difficult situation – this is something we are working through with the healthcare providers, the industry associations as well as together with MAS with the insurance industry.

**[CL ¶123]** In fact, I had mentioned earlier in my closing speech that MOH has issued guidelines to the insurers and doctors on how we should think about the HIB when it is enacted. We will certainly work closely with MAS as the regulator for the insurance industry.

**[CL ¶124]** But I think, it is quite clear, the principle and approach under the HIB is that we prohibit the use and access of NEHR information for employment and insurance purposes. And we have to work through the insurance associations, the MAS, the professional bodies, including the healthcare professional bodies for how it is implemented on the ground. But our assurance to the public and to those Members who spoke about it, is that our approach and position is quite clear.

**[CL ¶125]** Did I answer all the Member's questions? Okay.

**[CL ¶126]** Mr Speaker: Mr David Hoe.

**[CL ¶127]** Mr David Hoe: I thank the Senior Minister of State for the response and the reassurance. I would like to clarify a comment that I made earlier. I wonder if I heard clearly that the access to information to electronic medical records by healthcare professionals will be captured in the NEHR access history. I ask this because the Singaporean who was particularly concerned about this Bill sent me the URL to the FAQ in HealthHub that reads, "Your healthcare professionals may be accessing your records from their own electronic medical records (EMR) systems. Access made to your records in their EMR systems are not included in the NEHR access history." I would be happy to share the URL. I just wanted to clarify whether what I heard was correct.

**[CL ¶128]** Mr Tan Kiat How: Sir, just to clarify. Access to NEHR, even through the EMR, will be logged as an access to NEHR. But accessing a patient's records on the healthcare institutions' own EMR system is separate. It is an internal operations system for the hospitals, for the polyclinics or for the private healthcare clinics. So, it is quite different. But if you use EMR to log to NEHR, the logs will be recorded and tracked.

**[CL ¶129]** 8.18 pm

**[CL ¶130]** Mr Speaker: Any other clarifications from Members for the Senior Minister of State? No?

**[CL ¶131]** [(proc text) Question put, and agreed to. (proc text)]

**[CL ¶132]** [(proc text) Bill accordingly read a Second time and committed to a Committee of the whole House. (proc text)]

**[CL ¶133]** [(proc text) The House immediately resolved itself into a Committee on the Bill. – [Mr Tan Kiat How]. (proc text)]

**[CL ¶134]** [(proc text) Bill considered in Committee. (proc text)]

**[CL ¶135]** [Mr Speaker in the Chair]
### 2.2 Every passage on secondary use, research access, TRUST, derived / de-identified information, commercial requests, insurers and employers, and commencement — pinpointed

Hansard paragraph numbers `[CL ¶n]` are mine; MOH paragraph numbers are the Ministry's own, from its published text of the same speech.

#### (a) Research access, TRUST and AI model training — the single most important passage in the debate

> **[CL ¶56]** *(MOH published text ¶48)* — **"Mr Chua and Mr Fadli asked specifically about the use of NEHR for research. De-identified NEHR health information may be shared through established platforms such as TRUST under the National Research Foundation for research purposes. This could include training for artificial intelligence models."**

This is the Government's entire statement on the record about how NEHR data reaches researchers. Four things are established by it and nothing more: (i) the information is **de-identified**; (ii) the route is **TRUST**; (iii) TRUST sits **under the National Research Foundation**, not MOH — the transfer of the TRUST Office to NRF took effect 1 April 2026, i.e. **after** this statement, so the Minister was describing the intended end-state on 12 January 2026; (iv) permitted research use **includes AI model training**. No consent mechanism, no approval criteria, no publication requirement and no instrument is named.

#### (b) Commercial requests

> **[CL ¶57]** *(MOH ¶48, same paragraph in MOH's text)* — **"Where requests are received from commercial parties, possibly for commercial purposes, we are extremely cautious in assessing such requests, including whether the sharing of such data is helpful in contributing to better healthcare and better health outcomes. Primarily, NEHR is for continuity of care and for public health purposes, not for commercial purposes."**

Note what this is: a statement of posture ("extremely cautious", "primarily … not for commercial purposes"), not a prohibition, not a test, and not a reference to any instrument. It does not say commercial requests are refused. Read against item 5 in §4.1 — **six of forty approved TRUST research-access applications went to private companies** — the posture and the practice are both on the record and they should be read together.

#### (c) Secondary use for public health and policy analysis — de-identified information

> **[CL ¶52]** *(MOH ¶44)* — "For public health purposes under the HIB, NEHR information may be needed in certain situations, for example, to quickly identify and enable healthcare providers to contact affected patients in the event of a major drug contamination incident. Another example is in the event of an outbreak of a serious infectious disease, there may not be sufficient time nor would it be feasible to seek consent from individuals to use their NEHR information to contain the outbreak. **De-identified NEHR information may also be needed for public policy analysis and planning purposes, such as to review healthcare utilisation trends or to analyse the cost effectiveness of medicines.**"

The consent point is stated expressly and only for the outbreak case; the de-identified policy-analysis use in the last sentence is asserted without any consent discussion at all.

#### (d) Derived information — a confirmed negative

**The Minister never used the term "derived information" in either speech, and never explained the Type 1 / Type 2 distinction.** I searched the complete text of both Government speeches, the whole Second Reading debate and the Committee stage. The term "derived information" occurs in the entire proceedings of 12 January 2026 **three times only**, and never in a Government speech:
- **[LC ¶15]**, **[LC ¶16]**, **[LC ¶17]**, **[LC ¶18]** — Mr Louis Chua;
- **[CL ¶112]** — Mr Kenneth Tiong at the clarification stage, in the different sense of "NEHR-**derived** information" held by insurers.

So the House passed a Bill containing a two-tier derived-information regime (Type 1 identifiable, Type 2 anonymised, both approvable by the Minister, both surviving an access restriction) **without the Government ever describing that regime on the floor**. The nearest the Government came is the opening speech at **[OP ¶56]**: "The HIB will provide for the sharing of identifiable NEHR information for public health purposes and anonymised NEHR information for broader public interest purposes." That is a description of the effect, not of the mechanism, and it does not disclose that a Ministerial approval can override an access restriction. **This is a live disclosure point.**

#### (e) Insurers and employers

> **[CL ¶32]** *(MOH ¶26)* — "Let me now move to queries around NEHR access by insurers and employers. We understand Singaporeans' concerns about the potential discrimination or stigmatisation they may face if their health information is revealed to their employer or insurer. On this, I would like to reiterate three points that I have made earlier in my opening speech."

> **[CL ¶33]** *(MOH ¶26 a–c)* — **"First, insurers and employers do not and will not have access to NEHR. Second, healthcare professionals are also prohibited from accessing NEHR for employment or insurance purposes, except for prescribed statutory medical examinations, which I will talk on later, or where authorised by other written law or Order of the Court. Third, the HIB imposes strict penalties for any unauthorised access to NEHR, with higher penalties for prohibited employment or insurance purposes."**

> **[CL ¶34]**–**[CL ¶35]** *(MOH ¶27–28)* — on Dr Wan Rizal's statutory-medical-examination "backdoor": "The list of statutory medical examinations that is in the Bill is tightly scoped to those where NEHR access is necessary to protect the public and safeguard the health of the individual." … **"We have no plans to expand this list to include employment-related screenings that are not necessary to protect the public and the individual."**

> **[CL ¶36]** *(MOH ¶29)* — rejecting Mr Alex Yeo's proposal for patient-consented underwriting access: "I would like to reiterate that NEHR is primarily for patient care purposes… **NEHR must not be accessed for such insurance- and employment-related checks.**"

> **[CL ¶37]**–**[CL ¶38]** *(MOH ¶30)* — the **transcription pathway**, confirmed rather than closed: providers "should prepare separate medical reports, memos or clinical summaries for the insurer, instead of providing their raw medical records"; and **"Where NEHR information is referred to during a medical examination, information relevant to the episode would be validated or confirmed with the patient during history taking and may be captured in the provider's own medical records, together with the doctor's clinical assessment. Such information would then be treated as part of the provider's own medical records."**

> **[CL ¶39]** *(MOH ¶31)* — two instruments disclosed: **"MOH has issued a circular to healthcare providers and a guidance note to insurers to clearly state these positions. Healthcare providers may inform MOH if there are any inappropriate requests for NEHR information for insurance purposes."**

**Clarification stage** — Mr Kenneth Tiong pressed three points and got two open answers and one deferral:
> **[CL ¶110]** (Tiong) — "I think I did not hear an answer to what if there is a data breach. Can the insurers now use the now-public information in the data breach?"
> **[CL ¶111]** (Tiong) — on the "inspection and right to audit" clauses: "there is going to be a chilling effect, where doctors will start avoiding documenting any sensitive data, both in their own medical records but also perhaps in NEHR as well… would the NEHR utility not be undermined if they cannot trust what to input?"
> **[CL ¶112]** (Tiong) — "it might be better to just go downstream and just say that we 'work with MAS to prohibit insurers from requiring NEHR-derived information as a condition of coverage, claim processing and policy renewal.'"
> **[CL ¶121]** (Minister) — **"it is quite clear that the insurance companies cannot assess NEHR for insurance or employment purposes. But in data breaches, I think it all boils down to the ethical considerations… that is something we have to work together with MAS, as the regulator… And that is something we frown upon – using NEHR data for purpose of insurance. But it is a hypothetical scenario, something we have to think through."** *(Hansard reads "assess"; from context "access" is intended.)*
> **[CL ¶122]** (Minister) — **"On a dedicated regulation around insurance, whether they should just be prohibited… this is something we are working through with the healthcare providers, the industry associations as well as together with MAS with the insurance industry."**
> **[CL ¶123]** (Minister) — "MOH has issued guidelines to the insurers and doctors on how we should think about the HIB when it is enacted."

**Open as at 3 September 2026:** the data-breach scenario; a dedicated statutory prohibition binding insurers; and the guidance note to insurers remains **unpublished** — see §5.1.

#### (f) Commencement

> **[CL ¶87]** *(MOH ¶72 a–c)* — answering Ms Kuah Boon Theng on transition latitude: **"First, the Bill will commence in early 2027 to allow sufficient time for healthcare providers and professionals to familiarise themselves with the Bill's requirements. Second, to support their transition, guidance materials and dedicated support channels will be made available from the second quarter of this year to help providers and professionals understand their options and navigate the process. Third, should there be challenges complying with the Bill by the required timelines, MOH will consider the facts of each case carefully and assist where appropriate."**

Corroborated twice in the opening speech: **[OP ¶4]** ("our plans to commence the Bill from early 2027") and **[OP ¶73]** ("we intend for the Bill to take effect from early 2027"). This confirms A27's §1(a): **the commencement date given to Parliament is early 2027, stated three times in one sitting.** The "second half of 2026" statements in the same speeches are about the HealthHub access-restriction channel and the selective restriction feature, not commencement — see **[OP ¶49]** and MOH closing ¶23.

#### (g) Access restrictions, and the Healthier SG point

> **[CL ¶28]** *(MOH ¶23)* — **"Sir, in summary, healthcare providers would be granted access to NEHR to support patients' continuity of care across healthcare settings by default. Patients may, however, restrict access to all healthcare providers, or from the second half of 2026, limit access so that only select healthcare providers, such as their own Healthier SG clinic, may access their NEHR information. Whilst in place, restricted healthcare providers will not be able to, unless required by other written law, access the patient's NEHR information, except for the essential subset of records that cover allergies and vaccination records."**

**Two divergences from MOH's published ¶23**, both in favour of quoting Hansard: MOH reads "may access **their information**" where Hansard reads "may access **their NEHR information**"; and MOH reads "**Once** in place" where Hansard reads "**Whilst** in place".

Nothing in the closing speech discloses that Healthier SG enrolment **forecloses** restricting one's own primary care provider — A27's §1(c) finding stands and I re-confirmed it against the full text: the words "cannot" and "Healthier SG" never co-occur in relation to access restrictions anywhere in the 12 January 2026 proceedings.

### 2.3 What the closing speech did NOT contain

Searched over the complete text of both parts and the clarification exchange:
- **No mention of the TRUST Data Access Committee**, notwithstanding that Mr Louis Chua named it and described its test at **[LC ¶22]**.
- **No mention of "Type 1" or "Type 2"**, of clause 25, clause 25(2) or clause 30(5)(a).
- **No answer to the request for patient control over secondary use** (**[LC ¶21]**), and no reference to Taiwan or the EU.
- **No answer to Mr Fadli Fawzi's "Social Dividend" proposal** or to his data-cooperative / MIDATA proposal (§3.3), and no answer to his question whether it can be "explicitly legislated that any dataset from the NEHR must be anonymised".
- **No answer to the public-awareness-survey request** (**[LC ¶29]**).
- **No mention of enTRUST, the Biomedical Data Hub, PRECISE, SG100K, HELIOS or HEALIX.**

### 2.4 Divergence between the Official Report and MOH's published text — flag for the bundle

MOH's published closing speech is a useful pinpointing aid because its paragraphs are numbered, but it is **not** the Official Report and in at least one place it is defective. **MOH ¶48 reads: "De-identifiable NEHR health information through established platforms such as TRUST under the National Research Foundation (NRF) for research purposes. These could include training for artificial intelligence models."** — which has no main verb and says "De-identif**iable**". The Official Report at **[CL ¶56]** reads **"De-identified NEHR health information may be shared through established platforms such as TRUST under the National Research Foundation for research purposes. This could include training for artificial intelligence models."**

**Quote Hansard, not MOH, for this sentence.** The distinction between "de-identified" (a state) and "de-identifiable" (a capability) is not trivial in a data-protection argument, and MOH's version omits the operative "may be shared".

---

## 3. Government opening Second Reading speech — Mr Tan Kiat How, 12 January 2026

**LOCATED AND RETRIEVED.**

- **Sitting:** Monday, 12 January 2026 · **Vol 96, Sitting No 12**. Moved at **4.05 pm**; presiding **Mr Deputy Speaker**.
- **Route 1 (authoritative):** Official Report, `POST https://sprs.parl.gov.sg/search/getHansardReport` `{"sittingDate":"12-01-2026"}`, section `takesSectionVOList[11]`, from "Mr Deputy Speaker: Senior Minister of State Tan Kiat How" to "Question proposed" immediately before Ms Mariam Jaafar rose at 4.37 pm.
- **Route 2 (cross-check, numbered paragraphs):** `https://www.moh.gov.sg/newsroom/health-information-bill-second-reading-opening-speech-for-sms-tan-kiat-how/` — plain curl with a browser User-Agent, **HTTP 200, 611,272 bytes**, retrieved 3 September 2026. Found by grepping `https://www.moh.gov.sg/sitemap.xml` (11,148 URLs) for "health-information-bill". MOH's text runs to 89 numbered paragraphs.
- **Status:** **Official-Report verbatim** for the text below. `[OP ¶n]` numbering is mine.

### 3.1 Full text, verbatim

**[OP ¶1]** Mr Deputy Speaker: Senior Minister of State Tan Kiat How.

**[OP ¶2]** 4.05 pm

**[OP ¶3]** The Senior Minister of State for Health (Mr Tan Kiat How) (for the Coordinating Minister for Social Policies and Minister for Health): Mr Deputy Speaker, on behalf of the Minister for Health, I move that, "The Bill be now read a Second time."

**[OP ¶4]** I will first set out the context of the Health Information Bill (HIB) and its role in supporting the transformation of our healthcare delivery model. I will then outline how the HIB will help Ministry of Health (MOH) achieve the goal of "One Patient, One Health Summary, One Care Journey", and bring Members of the House through the key provisions of the Bill, before finally covering our plans to commence the Bill from early 2027.

**[OP ¶5]** Sir, Singapore is rapidly ageing. By 2030, one in four Singaporeans will be aged 65 and above. This substantial demographic shift brings with it a higher burden of chronic diseases and a higher proportion of patients with multiple co-morbidities. These patients will need well-coordinated, sustained care.

**[OP ¶6]** This is why we are transforming our healthcare delivery, from being hospital-centric to delivering care in the community. We are implementing national programmes like Healthier SG and Age Well SG, as well as initiatives, such as the Home Personal Care and Mobile Inpatient Care @ Home.

**[OP ¶7]** Sir, this effort will enable patients to benefit from timely and more holistic care. Patients will receive care from a wider range of healthcare providers, not just at public hospitals and polyclinics, but also at home or in the community, including at general practitioner (GP) clinics, dialysis centres and via home medical or rehabilitation services.

**[OP ¶8]** The sharing of a patient's key health information across settings and service providers is therefore essential. Such sharing of health information will also benefit younger patients who visit new healthcare providers or encounter medical emergencies.

**[OP ¶9]** Today's situation is not ideal. Currently, when patients move between healthcare providers, such as from private specialist clinics to their GPs, their key health records are often not accessible across providers. Such gaps can risk medication errors, delayed treatment and duplicate tests and procedures.

**[OP ¶10]** This is why many jurisdictions, such as Australia, Estonia, Finland and Norway, have developed robust governance frameworks to govern the sharing of health information across healthcare providers. This sharing regime has led to better patient outcomes, reduced costs and more effective and efficient healthcare delivery. We have studied these jurisdictions carefully and adopted key features suited to our local context.

**[OP ¶11]** But, Sir, in practice, we are not starting from scratch. Singapore started sharing health information across providers since 2011, with the implementation of the National Electronic Health Record system (NEHR). Today, all public hospitals and polyclinics are already contributing key health information to NEHR. Public hospitals contribute about 80% of total beds in Singapore and account for approximately 90% of hospital stays. And with Healthier SG, most GP clinics are already onboarded to NEHR. This has been of tremendous benefit for GPs and their patients. Most private hospitals have also onboarded to NEHR, while the remaining are in the process of doing so.

**[OP ¶12]** Hence, the vast bulk of key healthcare services are already on NEHR, or coming onboard soon, leaving a small group that have not done so, such as specialist clinics, clinical and radiological laboratories and dental clinics.

**[OP ¶13]** Sir, with your permission, may I ask the Clerks to distribute a handout on the key elements of the HIB.

**[OP ¶14]** Mr Deputy Speaker: Please proceed.

**[OP ¶15]** Mr Tan Kiat How: Thank you, Sir. Members may also access the handout through the MP@SGPARL App. [A handout was distributed to hon Members.]

**[OP ¶16]** Sir, the HIB will help us realise the vision of "One Patient, One Health Summary, One Care Journey" in two important ways.

**[OP ¶17]** First, the HIB will close the remaining gap by requiring all licensed healthcare providers to contribute to the NEHR and providing for their NEHR access. This will allow patients' key health information to be accessible by their healthcare providers when they move across healthcare settings. Patients will benefit from better coordinated care, enhanced quality of care and lower costs.

**[OP ¶18]** Let me illustrate with a hypothetical example of 50-year-old Ms Kamala, as covered in the infographic. Ms Kamala regularly visits her nearby GP to manage her chronic health conditions. She recently moved to a new estate. When she visits a different GP near her new home, the doctor there can make informed care decisions based on Ms Kamala's health information in NEHR.

**[OP ¶19]** Her new doctor can see which tests have been done and the medications that have been prescribed. He need not repeat the tests, saving Ms Kamala time and money.

**[OP ¶20]** Appropriate tests and medications can also be ordered to better manage Ms Kamala's health requirements. Patients moving between private and public healthcare providers, or acute and community settings will similarly benefit.

**[OP ¶21]** Actually, I think many Members in the House can relate to these examples. We often see our residents, especially our seniors, sitting in front of a GP clinic, carrying a big plastic bag of medicine. I once joked with an Ah Gong, saying, "Most people go and see doctor to collect medicine. How come you see doctor, bring medicine to see doctor?" So, he laughed and said, "Doctor asked me what medicine do I take. How can I remember? So, I brought everything there." And I am pretty sure, if I looked into his plastic bag, there would be medicine that has been issued by another doctor many months or even some time ago, and probably had expired. So, this situation is not ideal.

**[OP ¶22]** Second, the HIB will enable the sharing of non-NEHR health information to facilitate community-based care. Today, the Agency for Integrated Care (AIC) under MOH shares data with community health partners to enable them to engage and provide befriending services or care to seniors. The HIB will provide an additional channel for the sharing of non-NEHR health information to better support national health programmes and initiatives.

**[OP ¶23]** Let me illustrate this using another hypothetical example also covered in the infographic: 72-year-old Mr Lim has Type 2 diabetes and has rarely left home since his wife passed away. Mr Lim has been skipping his polyclinic appointments and struggles to manage his diabetes.

**[OP ¶24]** Without the opportunity to see Mr Lim, the polyclinic cannot seek his consent to share his contact and relevant health information with community health partners for follow-up. However, if our community healthcare providers and their partners are aware of Mr Lim's conditions, they can better support him.

**[OP ¶25]** With the HIB, when Mr Lim's polyclinic assesses that he would benefit from community support, the polyclinic can potentially share his contact information and an indicator of his level of health risk, such as whether he has a chronic condition, with AIC. AIC can then prioritise engaging Mr Lim, encourage him to check on his well-being and link him up with necessary support if needed.

**[OP ¶26]** AIC's early engagement of seniors like Mr Lim allows them to benefit from healthcare providers and community-based services before their isolation sets in, leading to more serious health consequences. And again, this is a scenario that I am sure many Members in the House see when we do our house visits, meeting our seniors in the community, especially seniors living alone, isolated. And these provisions under the HIB will help to enable better care for our seniors.

**[OP ¶27]** To ensure that the Bill addresses Singapore's healthcare needs as well as considers stakeholders' views, MOH has been engaging the public and stakeholders since 2022.

**[OP ¶28]** I would like to take this opportunity to thank members of the public and patient advocacy groups for their support for the Bill and their invaluable inputs, such as providing patients with greater control over their access to NEHR. I would also like to thank the professional bodies and healthcare professionals for their feedback, particularly regarding the cyber and data security requirements and the support that their members and colleagues may require as part of the transition. MOH has taken these viewpoints onboard.

**[OP ¶29]** Sir, now allow me to go through the Bill's key provisions and safeguards for the sharing of health information under the Bill.

**[OP ¶30]** In the example of Ms Kamala shared earlier, NEHR would only be able to support her new doctor if key health information from her previous healthcare providers were contributed to NEHR.

**[OP ¶31]** The HIB will require all healthcare providers licensed under the Healthcare Services Act 2020 and retail pharmacies licensed under the Health Products Act 2007 to contribute key health information about patients into NEHR. The key health information are those crucial for continuity of care such as allergies, vaccinations, diagnoses, medications, laboratory test results, radiological images and discharge summaries.

**[OP ¶32]** As certain public agencies such as the Singapore Armed Forces (SAF) and the Singapore Civil Defence Force (SCDF) also provide patient care, the Bill enables these agencies to be gazetted under the Act to contribute key health information to NEHR.

**[OP ¶33]** Key health information of Singapore Citizens, permanent residents and patients with long-term immigration passes will need to be contributed as these groups are more likely to seek care in Singapore over time. Health information of transient visitors such as tourists need not be contributed.

**[OP ¶34]** Clauses 10 to 15 set out the provisions relating to the contribution of key health information to NEHR. The First Schedule lists the key health information that each licensee category needs to contribute, based on the patient care functions they provide.

**[OP ¶35]** NEHR access will be provided to the healthcare providers that are contributing key health information to NEHR. The Bill will also enable NEHR access for community health partners providing clinical or care planning services. This is in recognition of their increasingly important role in supporting patients' continuity of care.

**[OP ¶36]** To enable the provision of timely and effective care, there will not be a need for every healthcare professional to seek consent each time they access their patients' NEHR.

**[OP ¶37]** At the same time, we are mindful that patients expect their NEHR information to be kept confidential. The Bill provides for robust legislative safeguards to address these concerns. We also have in place technical controls to ensure that access to NEHR is tightly regulated.

**[OP ¶38]** Let me first speak about the legislative safeguards.

**[OP ¶39]** NEHR access for patient care purposes will be limited to licensed healthcare providers and their authorised individuals. Healthcare providers must only authorise NEHR access for healthcare professionals who require it for patient care purposes. Such professionals include doctors, nurses, pharmacists and allied health professionals. Individuals who only perform an administrative or corporate role, even if they are healthcare professionals, will not be given NEHR access. Authorised individuals must access NEHR only for patients whom they are providing patient care to.

**[OP ¶40]** Healthcare providers must also implement appropriate practices to ensure their healthcare professionals access NEHR appropriately. This will include regular training on the appropriate use of NEHR and conducting audits on NEHR access.

**[OP ¶41]** In short, access to NEHR is restricted to healthcare professionals for the purpose of providing care to their patients. Accessing NEHR for purposes relating to employment or insurance will be strictly prohibited. This means healthcare professionals will not be allowed to access NEHR for purposes such as filling out medical reports required for insurance claims or pre-employment medical screening forms. This will address the concerns expressed during the public consultation that health information could be used in a discriminatory manner by employers or insurance companies.

**[OP ¶42]** However, there are medical examinations set out in statutes which serve to protect the public and safeguard the health of the individual and those around him. Examples include examinations of persons who are at risk of an infectious disease and the medical examinations to assess fitness for service in the SAF, SCDF and Singapore Police Force as required under the Enlistment Act. NEHR access will therefore be allowed for these statutory medical examinations.

**[OP ¶43]** Clauses 16 to 23 set out the provisions relating to NEHR access, including the legislative safeguards. The Second Schedule sets out the categories of authorised individuals who may access NEHR for different categories of healthcare providers. The specified statutory medical examinations for which NEHR may be accessed is listed in the Third Schedule.

**[OP ¶44]** That is the set of legislative safeguards. Let me turn to the technical controls that MOH will put in place to tightly regulate access to NEHR.

**[OP ¶45]** First, authorised individuals will only be granted access to the data types required for their patient care duties. For example, nurses in general will not have access to radiological images as they do not require this information for their patient care duties.

**[OP ¶46]** System-level controls to limit unauthorised access, such as limiting the number of patient records that can be accessed within a stipulated timeframe and conducting regular audits to flag unauthorised NEHR access, have already been implemented. We will be progressively rolling out additional technical measures and processes to limit and detect unauthorised access to NEHR information of patients.

**[OP ¶47]** Patients themselves can monitor access of their NEHR information through their HealthHub account and can report suspicious activities to MOH for investigations.

**[OP ¶48]** Sir, by default, patients' key health information will be contributed to NEHR and will be accessible by healthcare providers to support the continuity of care across healthcare settings. For those who continue to have privacy concerns, they may restrict access to their NEHR information so that only select healthcare providers may have this access. This Access Restriction feature is like the approach adopted by countries like Australia, Estonia and Hong Kong.

**[OP ¶49]** Today, such an Access Restriction regime is already in place. Patients can submit their request to place an Access Restriction at public healthcare institutions (PHIs). From the second half of this year, patients can do so through the HealthHub app.

**[OP ¶50]** For patient safety, when patients visit their healthcare providers, the provider will still be able to view a subset of records in the patients' NEHR even if there is an Access Restriction in place. This subset of records comprises critical allergies and vaccination information that helps reduce the risk of inappropriate prescriptions or immunisations when patients visit new healthcare providers.

**[OP ¶51]** Further, a patient's NEHR information may be accessed during medical emergencies despite an Access Restriction. This feature, known as "break-glass", is like Australia's approach. Access in such extenuating situations will be subject to strict controls.

**[OP ¶52]** First, only doctors will be allowed to "break glass". Second, before "breaking glass", the doctor must re-verify their credentials and declare a medical emergency has happened. Third, every instance where a doctor "breaks glass" will be subject to audits. Confirmed cases of inappropriate "break-glass" will be investigated as potential breaches under the HIB and may also be referred to the Singapore Medical Council for disciplinary action.

**[OP ¶53]** To ensure there are no gaps in patients' records even during emergencies, health information will continue to be contributed to NEHR even when an Access Restriction is placed.

**[OP ¶54]** While Access Restriction is an option, we do not encourage its use as it would adversely affect the quality of care we receive as patients. It is only when healthcare providers – our doctors and our frontline healthcare staff – have access to our key health information that they can deliver holistic and effective care in a timely manner.

**[OP ¶55]** Next, let me turn to clauses 29 to 33, which deal with Access Restrictions. Details relating to these Access Restrictions will be set out in subsidiary legislation.

**[OP ¶56]** As the national repository of key health information, NEHR information can be used to inform national policies and research to improve population health outcomes for Singaporeans. The HIB will provide for the sharing of identifiable NEHR information for public health purposes and anonymised NEHR information for broader public interest purposes.

**[OP ¶57]** Let me give a few examples. For example, in the event of a major drug contamination incident, MOH may share necessary information from NEHR, such as the identity of patients prescribed with the drug, with relevant healthcare institutions and direct them to promptly contact the affected individuals and advise them to stop taking the drug and seek medical care. The HIB will not impede the sharing of NEHR information as required or permitted under other laws.

**[OP ¶58]** For example, NEHR information may be required under the Criminal Procedure Code 2010 to facilitate criminal investigations by the Police or by the Communicable Diseases Agency under the Infectious Diseases Act 1976 for outbreak investigations and contact tracing of potentially exposed individuals.

**[OP ¶59]** But for all requests, MOH will assess whether the NEHR information is appropriate and necessary for the purpose of the request, taking into consideration factors such as whether alternative information is suitable and whether anonymised or aggregated data would suffice.

**[OP ¶60]** The sharing of NEHR information under other laws, as well as for public health and public interest purposes, are provided for in clause 5 and clauses 20 to 28 respectively.

**[OP ¶61]** Sir, let me now turn to the provisions for the sharing of non-NEHR health information to facilitate community-based care.

**[OP ¶62]** As mentioned earlier, the HIB will provide an additional channel for data sharing to support the goal of "One Patient, One Health Summary, One Care Journey". We will enable the scoped sharing of non-NEHR health information without an individual's consent only if three key criteria are met.

**[OP ¶63]** First, data sharing must be between specified entities. For a start, this will cover key public healthcare stakeholders such as PHIs, AIC and public agencies.

**[OP ¶64]** Second, information must only be shared for specified use cases to support continuity of care and population health outreach under national programmes such as Healthier SG and Age Well SG. For example, PHIs may share contact information and the addresses of seniors with AIC for AIC to contact and engage these seniors to connect them to relevant community-based care services and activities based on their needs.

**[OP ¶65]** Third, we will restrict the data types that can be shared to those relevant to each use case. The data shared will generally be limited to basic identification and contact information and if necessary, broad health risk indicators, such as the presence of frailty or chronic conditions, but not the actual medical conditions.

**[OP ¶66]** The scope and key requirements for the sharing of non-NEHR health information are provided for under clauses 45 to 60 while the use cases and specified entities are set out in the Fourth Schedule. The list of data types allowed for each use case will be set out in subsidiary legislation.

**[OP ¶67]** Let me now turn to the measures in the HIB to secure and protect health information.

**[OP ¶68]** Healthcare providers that contribute to and access NEHR as well as entities allowed to share and receive non-NEHR health information will need to meet cybersecurity and data security requirements. They will also be responsible for assessing whether a notifiable cybersecurity incident or data breach has occurred. Once confirmed, MOH will need to be notified. Where a data breach has resulted in, or is likely to result in, significant harm to individuals, the affected individuals will also need to be notified. These security requirements are covered in clauses 61 to 82.

**[OP ¶69]** To be clear, today, licensed healthcare providers and practitioners already have obligations to safeguard the personal data of their patients under existing laws. The security requirements under the HIB are based on existing standards and legal requirements. What the HIB does is to consolidate these requirements in relation to health information.

**[OP ¶70]** Additionally, the Bill will empower the Minister for Health to take emergency measures in critical events where the threat to health information or relevant health information systems could result in health information being lost or compromised. Such powers are not unique to this Bill and can be found in the Infectious Diseases Act 1976 and the Cybersecurity Act 2018.

**[OP ¶71]** These powers are necessary. We have seen how incidents, whether cyber or physical in nature, can lead to major and prolonged disruptions of essential services around the world, including healthcare services. Physical incidents, such as fires, can take out information systems and result in data loss, just as faulty information technology (IT) updates or cyberattacks can lead to the same outcome. Hence, these powers are scoped towards enabling responses to protect health information regardless of the form of the threat.

**[OP ¶72]** Should an outage involving health information or the systems that host or process such information occur in Singapore and threaten a major disruption of healthcare services, clauses 83 to 85 will allow the Minister to direct relevant healthcare providers to take mitigating or recovery measures.

**[OP ¶73]** Sir, as I have earlier mentioned, we intend for the Bill to take effect from early 2027. This would give healthcare providers sufficient time to familiarise themselves with the Bill’s requirements and strengthen their cybersecurity and data security postures. MOH is working closely with healthcare providers on the implementation timelines and will announce further details soon.

**[OP ¶74]** Sir, during our consultations, some healthcare providers shared concerns about the burden of implementing the HIB’s security requirements. MOH has been engaging the associations and providers. I wish to reassure them that MOH is committed to supporting them through this transition.

**[OP ¶75]** We will inform healthcare providers of NEHR-compatible systems that meet the Bill’s cybersecurity requirements and automate the contribution of key health information. With the use of such NEHR-compatible systems, healthcare providers will then only need to ensure their data security measures are in place, such as training staff involved in patient care to access and use NEHR appropriately. Training resources and programmes, as well as funding support, will be made available to support healthcare providers and healthcare professionals.

**[OP ¶76]** We are aware that some healthcare professionals are concerned about increased liability from accessing and using NEHR. MOH is working towards publishing guidelines on the appropriate access and use of NEHR information that healthcare professionals, including nurses and allied health professionals, may use as a resource.

**[OP ¶77]** I will now touch on the key offences and the penalties. Under the HIB, non-compliance with contribution requirements is not an offence in the first instance, as we recognise that there could be genuine challenges onboarding to NEHR. If non-contribution arises from technical difficulties, for instance, we will work with healthcare providers to rectify the underlying issue. However, in the event of deliberate or reckless non-compliance or breaches, directions may then be issued to the healthcare provider to comply. It is only when the healthcare provider fails to comply with a direction that the provider could be liable for an offence punishable by up to $20,000, one year’s imprisonment or both, upon conviction. And I reinforce, it is really in the event of deliberate or reckless non-compliance or breaches.

**[OP ¶78]** For breaches that are likely to have a greater impact on patients, maximum penalties are higher. For instance, a person convicted of an offence relating to unauthorised access of NEHR information under clause 38 faces a fine of up to $50,000, two years’ imprisonment or both, for a first offence. This maximum penalty is doubled for a repeat offence or if the unauthorised access was for employment or insurance purposes. The penalty for this offence is comparable to other relevant laws. For instance, the maximum fine of $50,000 is aligned with serious breaches involving unauthorised access to computer material in the Computer Misuse Act 1993.

**[OP ¶79]** Breaches involving systemic failures are dealt with most severely. For instance, healthcare providers that fail to put in place the cybersecurity or data security measures required under the HIB may face a fine of up to $1 million, as the health information of many patients could be compromised. A failure would likely be committed by a healthcare provider or other organisation. Hence, the maximum fine must be high enough to serve as an effective deterrent to such organisations.

**[OP ¶80]** Nevertheless, these are maximum penalties, which are aimed at addressing the most egregious of breaches. We would like to reassure healthcare providers and healthcare professionals as well as Singaporeans that should potential breaches occur, MOH will look at the facts of each case carefully. The Bill also allows for a range of enforcement actions besides prosecution, including composition of offences, directions to rectify breaches and letters of warning.

**[OP ¶81]** Sir, the HIB will play a critical role in supporting the transformation of our healthcare delivery services and model. Through “One Patient, One Health Summary, One Care Journey”, Singaporeans will benefit from better coordinated care, enhanced quality of care and lower costs. I urge Members of the House to support the Bill. Deputy Speaker, Sir, I beg to move.

**[OP ¶82]** [(proc text) Question proposed. (proc
### 3.2 Key opening-speech passages on secondary use, research and commencement

> **[OP ¶4]** — "I will first set out the context of the Health Information Bill (HIB) and its role in supporting the transformation of our healthcare delivery model. I will then outline how the HIB will help Ministry of Health (MOH) achieve the goal of 'One Patient, One Health Summary, One Care Journey', and bring Members of the House through the key provisions of the Bill, before finally covering **our plans to commence the Bill from early 2027**."

> **[OP ¶49]** — "Today, such an Access Restriction regime is already in place. Patients can submit their request to place an Access Restriction at public healthcare institutions (PHIs). **From the second half of this year, patients can do so through the HealthHub app.**" — "this year" = 2026. Per A27, MOH's own site had moved this to 2027 by 14 August 2026, unannounced.

> **[OP ¶55]** — "Next, let me turn to clauses 29 to 33, which deal with Access Restrictions. **Details relating to these Access Restrictions will be set out in subsidiary legislation.**"

> **[OP ¶56]** — **"As the national repository of key health information, NEHR information can be used to inform national policies and research to improve population health outcomes for Singaporeans. The HIB will provide for the sharing of identifiable NEHR information for public health purposes and anonymised NEHR information for broader public interest purposes."** — the Government's only description of the derived-information architecture, and it does not use the term.

> **[OP ¶59]** — "But for all requests, **MOH will assess whether the NEHR information is appropriate and necessary for the purpose of the request, taking into consideration factors such as whether alternative information is suitable and whether anonymised or aggregated data would suffice.**" — a necessity-and-minimisation test, stated as ministerial practice, not as a statutory criterion, and not tied to any published instrument.

> **[OP ¶60]** — "The sharing of NEHR information under other laws, as well as for public health and public interest purposes, are provided for in **clause 5 and clauses 20 to 28** respectively."

> **[OP ¶73]** — **"Sir, as I have earlier mentioned, we intend for the Bill to take effect from early 2027. This would give healthcare providers sufficient time to familiarise themselves with the Bill's requirements and strengthen their cybersecurity and data security postures. MOH is working closely with healthcare providers on the implementation timelines and will announce further details soon."**

**Confirmed negative:** the words "TRUST", "research platform", "National Research Foundation", "derived information", "Type 1" and "Type 2" appear **nowhere** in the opening speech. The Government's first and only mention of TRUST in this debate is in the reply, at **[CL ¶56]**, and it came only because Mr Chua and Mr Fadli had asked.

### 3.3 Mr Fadli Fawzi's commercial-use passage — the other Member the Minister was answering at [CL ¶56]

Same sitting, Official Report, same route. Included because **[CL ¶56]** answers "Mr Chua and Mr Fadli" together, and because this is the only place in the debate where monetisation of NEHR data is put squarely.

> **Mr Fadli Fawzi (Aljunied):** "Looking ahead, the national electronic healthcare system, once it is fully up and running, our citizen's pooled health data **will be a valuable goldmine for clinical researchers and pharmaceutical companies**. While this can accelerate drug development and spur medical innovation, **the public needs assurance that their personal health data will not be monetised for profit.**"

> "Here, my question is **whether the Government intends to make healthcare information in the NEHR available to the private, academic or any other sectors and whether the current Bill makes provisions to regulate such a possibility?** While I am in principle not opposed to such collaborations, **I hope that it can be explicitly legislated that any dataset from the NEHR must be anonymised**, if this has not been done already."

> "Moreover, if the data is used for commercial research, the Government should consider a **'Social Dividend'** which ensures that the benefits return to the people. **Any revenue or benefits derived should be reinvested directly into patient subsidies or national health funds**, ensuring that the value generated by the people's health data is returned back to the people."

> "I would also suggest exploring the model of **data cooperatives**. One example of this model is non-profit Swiss cooperative **MIDATA** where citizens control their data and can choose to contribute it to specific research projects that they believe in. This has enabled research and tailored care plans for diseases, such as multiple sclerosis."

**Answered only by [CL ¶56]–[CL ¶57].** The request for an express legislated anonymisation requirement, the Social Dividend and the data-cooperative model all went unanswered.

---

## 4. Parliamentary Questions since 12 January 2026

### 4.0 Method and completeness

Every sitting day from 12 January 2026 to 3 September 2026 was retrieved in full (23 sitting days, 2,600 sections across `takesSectionVOList`, `writtenAnswersVOList` and `writtenAnsNAVOList`) and searched as a local corpus. The searches run over the whole corpus were: `TRUST|enTRUST`; `derived information|Type 1|Type 2`; `de-identified|deidentified|anonymised|anonymized|pseudonymis*`; `secondary use|research purposes|research and analytics`; `commercial use/purpose/entity/company|private compan*|industry access`; `train* (of) AI|artificial intelligence|models|AI model|foundation model`; `NEHR within 200 chars of research` and the reverse; `insurer|insurance|employer|employment`; and a health-data density filter (`NEHR|National Electronic Health Record|Health Information Bill/Act|patient data|health data|medical record|health record|health information|TRUST platform|PRECISE|SG100K|SG10K|HELIOS|HEALIX|Synapxe|HealthHub|biomedical research`, three or more hits per section).

Items 1–3 below are the PQs squarely on **NEHR research access, TRUST or derived information**. Items 4–12 are the adjacent health-data PQs in the same window, included because the brief's topics (secondary use, commercial use, AI training) shade into them and because A27's list should be verifiable end-to-end from the raw JSON now saved.

### 4.1 Squarely on research access, TRUST and secondary use

---

#### 1. Data on Approved Access Applications to PRECISE, SG10K and HELIOS, Research Productivity and Outcomes, and Plans for Public Registry

- **Date:** Wednesday, **6 May 2026** · **Vol 96, Sitting No 30** · **written answer**, Question No 15
- **Questioner:** **Mr Kenneth Tiong Boon Kiat** (Aljunied)
- **Answering Minister:** **Mr Ong Ye Kung**, Coordinating Minister for Social Policies and Minister for Health
- **Route:** Hansard POST API, `writtenAnswersVOList` for 06-05-2026. Also republished by MOH at `https://www.moh.gov.sg/newsroom/data-on-approved-access-applications-to-precise--sg10k-and-helios--research-productivity-and-outcomes--and-plans-for-public-registry/`.
- **Official-Report verbatim: yes.**

**Question, verbatim:**

> **15** Mr Kenneth Tiong Boon Kiat asked the Coordinating Minister for Social Policies and Minister for Health (a) how many applications to access PRECISE, SG10K and HELIOS data have been received and approved, broken down by public-sector researchers, private-sector firms and local startups, and average time to access; (b) how many approved applications have produced publications, patents or commercial products; and (c) whether the Ministry will publish a public registry of approved projects and outcomes, as the UK Biobank does.

**Answer, verbatim:**

> **Mr Ong Ye Kung:** PRECISE-SG100K and the Health for Life in Singapore (HELIOS) are large-scale longitudinal cohort studies to drive research, improve disease understanding, and enable more targeted care. The majority of their datasets were accessible from 2025 through TRUST, our national health research and analytics platform supporting the analysis of anonymised data for health research.
>
> Based on applications for data access on TRUST, there have been 40 approved applications to access PRECISE-SG100K and HELIOS' data. Of these, 34 were from public-sector researchers and six were from private companies. Since then, one publication has resulted from these applications, with more in the pipeline as projects mature. Publicly available listings of approved projects are maintained on the TRUST website.

**Relevance.** The only quantitative disclosure of research access to Singapore health data anywhere in the parliamentary record: TRUST is confirmed as the operative access route, described as "our national health research and analytics platform supporting the analysis of **anonymised** data"; **40 approvals, 34 public-sector, 6 private companies, 1 publication**. Three limbs of the question went unanswered — **average time to access**, **local startups as a separate category**, and **patents or commercial products** — and the request for a UK Biobank-style public registry was deflected to the existing TRUST website listings rather than accepted.

---

#### 2. Rationale and Cost of Developing AI Models for Healthcare Diagnostics, and Safeguards for Patient Data (SIMFONI)

- **Date:** Wednesday, **5 August 2026** · **Vol 96, Sitting No 34** · **oral answer**, Question Nos 4 and 5 taken together. **This is the last sitting day before the retrieval date.**
- **Questioners:** **Mr Yip Hon Weng** (Yio Chu Kang) — Q4; **Mr Low Wu Yang Andre** (Non-Constituency Member) — Q5
- **Answering Minister:** **Mr Ong Ye Kung**, Minister for Health
- **Route:** Hansard POST API, 05-08-2026, `takesSectionVOList`, sectionType OA, sub-title "Update on deployment of SIMFONI". Partly republished by MOH at `.../newsroom/testing-and-safeguards-for-singapore-medical-foundation-ai-model--simfoni--initiative/`.
- **Official-Report verbatim: yes.**

**Questions, verbatim:**

> **4** Mr Yip Hon Weng asked the Coordinating Minister for Social Policies and Minister for Health regarding the Singapore Medical Foundation AI Model (SIMFONI) initiative (a) what are the rationale and cost of developing AI models for conditions that can be diagnosed by routine tests, instead of targeting rare diseases that are harder to diagnose; (b) how will clinicians access SIMFONI and whether private practitioners will be included; and (c) what safeguards protect patient identifiers from data leaks.
>
> **5** Mr Low Wu Yang Andre asked the Coordinating Minister for Social Policies and Minister for Health (a) before the deployment of Singapore Medical Foundation AI Model (SIMFONI), whether the Ministry will subject its models to privacy testing by assessors independent of the developers to determine if they can memorise or reproduce identifiable patient information; and (b) whether test standards, findings and response protocol for any disclosure will be published.

**Answer, verbatim (opening):**

> **The Minister for Health (Mr Ong Ye Kung):** Mr Speaker, may I have your permission to answer Question Nos 4 and 5 together?
>
> **Mr Speaker:** Yes, please proceed.
>
> **Mr Ong Ye Kung:** The Singapore Medical Foundation AI Model (SIMFONI) develops artificial intelligence (AI) tools to provide clinical decision support for managing chronic conditions, prioritising conditions with high disease burden in Singapore and feasibility of development. We are starting with a couple of specialty areas and settings in the public healthcare sector. If successful, we will expand its coverage to more specialities and also possibly, to the private practitioners.
>
> **SIMFONI's models are built on existing models trained using international data. They are adapted using local patient data, they are de-identified, in a secure national platform with well-established processes, expertise and safeguards. This platform is called TRUST, which was established in 2022 precisely for research, development and innovation efforts.**
>
> To further ensure the integrity of this process, an independent safety and evaluation unit will carry out rigorous testing of SIMFONI's models before actual deployment.

**Supplementary — Mr Yip Hon Weng, verbatim:**

> **Mr Yip Hon Weng (Yio Chu Kang):** Thank you, Mr Speaker. I thank the Minister for his response. While clinicians will ultimately retain responsibility for medical decisions, international experience has shown that doctors may gradually defer to AI decisions or recommendations – something known as automation bias. Will the Ministry announce specific safeguards to detect and mitigate this risk and how we ensure that AI compliments rather than subtly replaces independent clinical judgement?

> **Mr Ong Ye Kung:** **We do not really announce what we are going to do to safeguard against this.** This is very much in the way we approach AI, how we deploy and how we implement them.
>
> I have given a few speeches on this matter. There is a lot of hype about AI, including in healthcare. And sometimes, you really wonder why are these proposals like that. Because those of us who work in healthcare, you know it is not simple, especially a public essential service.
>
> We have to take a very careful use-case approach. That means, what problems are we facing, can AI solve those problems? Find the right tools. Never treat AI as a hammer going around looking for nails or a solution looking for a problem. We have enough problems. Let us see what AI can do to solve some of these problems.
>
> And when you can find the right AI tool, make sure it is trained in the local context, taking into account security, de-identified data, patient data that is in Singapore.
>
> When the model is ready, when you deploy it, you have to deploy in accordance with clinical protocols. There is a certain way we do things. There are existing legacy IT systems. AI is not something you plug into the socket and suddenly, it solves your problems. It does not work that way. And then, how do you interface with existing legacy IT systems? How the processes are thought through, with the clinicians still making the judgement?
>
> It is early days, but I think we are very conscious that there is a lot of hype, a lot of use or misuse of AI. I think all this hype at some point will subside to a more realistic level, where people are more judicious, thoughtful and even, sober about using AI. And we tell ourselves, "Why wait for that process? Why do we not start off being sober and judicious?" And that is the approach that the Ministry of Health is taking.

**Supplementary — Mr Low Wu Yang Andre, verbatim. This is the direct question on NEHR scope and consent:**

> **Mr Low Wu Yang Andre (Non-Constituency Member):** Thank you, Speaker. Minister, I have three supplementary questions. Firstly, it is about **the scope of the data that is being envisaged to be used to train this AI model. Would it encompass all health data in Singapore of all patients, including data in the National Electronic Health Record (NEHR) database?**
>
> Secondly, it is about the nature of the consent that will be sought before patient's data will be used for training. **Has the Ministry considered, or will the Ministry consider, asking patients for explicit consent before their data can be used for training purposes?**
>
> And third supplementary question: I understand the Minister has given assurances that the data will be anonymised and have personal identifiers removed before they are used for training. However, as we can see, I have another Parliamentary Question today for a similar data leak incident with the Singapore Land Authority, where a lot of these processes are fallible. And sometimes, anonymisation of data does not actually pan out and personal identifiable data can leak into publicly available databases. What assurances can the Minister give to the public that their very sensitive health data will remain safe?

> **Mr Ong Ye Kung:** I think we all know AI is a breakthrough technology, but we must take a thoughtful and judicious approach. So, we have to decide what we want to do with it. **If we start off thinking that we distrust this system entirely and therefore, let us scope down the data to be used to train models** – even though we know the data is essential to train models that can improve healthcare, save lives, operate everything better and maybe help us address some of our very stark challenges of an ageing population with rising patient load – and if we accept that, but yet at the same time distrust the system and say, "Let's scope down the data, let's not believe that they can really be anonymised and de-dentified because there can be leaks and traceability", and **"Let's seek everyone's consent before we can use", then it is a non-starter. It becomes a non-starter.**
>
> I think just take a balanced approach: recognise that this is a breakthrough technology that can do a lot of good, but to do so, we will need to use the data that we have and take the necessary precautions. Make sure that it is anonymised and de-identified. And we started this process some years ago. **So, TRUST data has been used in various contexts already – so far, incident-free.** I think we make sure it is anonymised and de-identified by international standards.
>
> I think let us proceed on that basis. We must have safeguards, I agree. But we must strike a balance between leveraging that technology, but putting in place the safeguards. And we can proceed on that basis.
>
> And at some point, Singaporeans will see that healthcare services are improving, yet quite incident-free. That is when they have confidence and assurance. I think let the action and the results speak for themselves.

*(Hansard reads "de-dentified"; plainly "de-identified".)*

**Relevance.** The most important item in this file after the Second Reading. On the record, from the Minister for Health: (i) health-data-derived AI models are trained on **local patient data, de-identified, on TRUST**; (ii) an **explicit consent requirement was put to him directly and expressly rejected** as "a non-starter"; (iii) **the question whether NEHR is within scope was asked and was not answered** — he neither confirmed nor denied it; (iv) the request to publish test standards, findings and a disclosure response protocol (Q5(b)) was **not answered at all**; (v) "TRUST data has been used in various contexts already – so far, incident-free" is the only public assurance offered. Read with **[CL ¶56]** — "De-identified NEHR health information may be shared through established platforms such as TRUST … This could include training for artificial intelligence models" — the Government's position is that NEHR data may lawfully train AI models, de-identified, via TRUST, without individual consent. **There is no statutory instrument governing this.** The Health Information Act 2026 is uncommenced and no subsidiary legislation has been made.

---

#### 3. Mandatory Data Security Requirements for Patient Data Processed by AI Tools Through Third-party Cloud Services

- **Date:** Tuesday, **4 August 2026** · **Vol 96, Sitting No 33** · **written answer**, Question No 21
- **Questioner:** **Assoc Prof Jamus Jerome Lim** (Sengkang)
- **Answering Minister:** **Mr Ong Ye Kung**
- **Route:** Hansard POST API, 04-08-2026. Republished by MOH at `.../newsroom/data-security-requirements-apply-to-ai-tools-that-process-patient-data/`.
- **Official-Report verbatim: yes.**

> **21** Assoc Prof Jamus Jerome Lim asked the Coordinating Minister for Social Policies and Minister for Health whether mandatory data security requirements apply to AI tools that process patient data through third-party cloud services.
>
> **Mr Ong Ye Kung:** Yes, data security requirements apply to AI tools that process patient data, whether hosted on third-party cloud services or on-premise. These are requirements under both the Healthcare Services Act and the Personal Data Protection Act.
>
> Public healthcare institutions have also adopted additional practices to safeguard data. For example, **AI model providers whom they work with must give legally-binding commitments that all input and output data are not stored or retained.** The AI tools also need to be accessed from secure environments.

**Relevance.** Confirms A27's item. The **only** statutory instruments claimed are the HCSA and the PDPA — no health-data-specific instrument, because the Health Information Act is not in force. The "legally-binding commitments" required of AI model providers are **contractual instruments governing national health data and they are not published anywhere**; add to the transparency-gap list with the NEHR Accession Agreement and the guidance note to insurers.

### 4.2 Adjacent health-data PQs in the same window, verbatim

---

#### 4. Regulatory Framework for AI-developed Drugs and Implications on Clinical Trials, and Adequacy of Data Protection Safeguards for National Patient Data
**6 May 2026 · Vol 96, Sitting No 30 · written answer, Q16 · Mr Yip Hon Weng · Mr Ong Ye Kung · Official-Report verbatim: yes**

> **16** Mr Yip Hon Weng asked the Coordinating Minister for Social Policies and Minister for Health (a) whether the Ministry has studied if AI-developed drugs can shorten or bypass clinical trials; (b) if so, how will the regulatory approval of AI-developed drugs differ from conventional products; (c) what regulations currently govern AI healthcare innovations; and (d) whether existing personal data protection and cybersecurity safeguards can prevent data leakage when AI accesses national patient data for product conceptualisation.
>
> **Mr Ong Ye Kung:** Both artificial intelligence- (AI-)developed and conventionally developed drugs must meet the same international standards of quality, safety and efficacy. The Health Sciences Authority's regulatory approach is aligned with international agencies, such as the US Food and Drug Administration and the European Medicines Agency, that have outlined key principles on the responsible use of AI in drug development.
>
> Patient data is robustly protected, including when used for AI development. Existing data protection and cybersecurity safeguards, including those under the Personal Data Protection Act, ensure that patient confidentiality is maintained and that the data is protected.
>
> We will continue to monitor developments and strengthen our safeguards as needed.

**Relevance.** Limb (d) asks squarely about AI accessing **national patient data**; the answer names **only the PDPA**. Limb (c) — what regulations govern AI healthcare innovations — is not answered at all; note that four months later, on 24 August 2026, the same Ministry pointed to **AIHGle 2.0** (§5.2), which was not mentioned here.

---

#### 5. MAS and Life Insurance Association of Singapore (LIAS) Collaboration on Clinical Guidance for Insurance Medical Record Disclosure Context Requirements for Claims
**3 February 2026 · Vol 96, Sitting No 15 · written answer, Q12 and Q13 · Dr Haresh Singaraju · Mr Ong Ye Kung · Official-Report verbatim: yes**

> **12** Dr Haresh Singaraju asked the Coordinating Minister for Social Policies and Minister for Health in view of the requirement for clinicians to disclose only information relevant to an insurance claim to insurers, whether the Ministry can provide guidance on how clinicians shall disclose patient medical records to insurers when (i) the insurance request forms do not state what the claims are for (ii) requests are made for all medical records of claimants.
>
> **13** Dr Haresh Singaraju asked the Coordinating Minister for Social Policies and Minister for Health whether the Ministry will work with MAS and the Life Insurance Association of Singapore to ensure that insurance request forms provide sufficient context for clinicians to determine what information is relevant to disclose.
>
> **Mr Ong Ye Kung:** Under the Healthcare Services Act (HCSA), licensees including clinicians are required to: (a) maintain the confidentiality of every patient health record; and (b) protect patient health records from unauthorised access, disclosure, copying or use. In addition, the Health Information Bill strictly prohibits access to the National Electronic Health Record (NEHR) for insurance related purposes.
>
> Where the purpose of the insurer's information request is unclear, clinicians should request for and the insurer should provide, clarifications to ensure relevant information is provided. Clinicians should prepare separate medical memos or clinical summaries for the insurer, based on their own clinical records. They must not access NEHR for such purposes.
>
> The Ministry of Health (MOH) has clarified these matters through a **circular issued to all licensees under the HCSA**. With the Monetary Authority of Singapore's support, MOH also issued a **guidance note to insurers** on the above-mentioned, as well as the appropriate practices and scope when requesting patient medical records from clinicians. We expect insurers to ensure that their practices are aligned with the guidance.

**Relevance.** Confirms **[CL ¶39]** three weeks later, and names both unpublished instruments. Note the reference to "the Health Information **Bill**" on 3 February 2026 — three weeks after passage — as prohibiting insurance access; the Act was not then, and is not now, in force.

---

#### 6. Role-Based Access to National Electronic Health Records for Registered Community Optometrists
**12 February 2026 · Vol 96, Sitting No 17 · written answer, Q13 · Mr Yip Hon Weng · Mr Ong Ye Kung · Official-Report verbatim: yes**

> **13** Mr Yip Hon Weng asked the Coordinating Minister for Social Policies and Minister for Health whether the Ministry will grant registered community optometrists role-based access to the National Electronic Health Record to view relevant patient information, as well as to contribute eye-care findings, with the aim of enhancing clinical safety and facilitating seamless care coordination between community providers and public healthcare institutions.
>
> **Mr Ong Ye Kung:** Currently, registered optometrists working in institutions licensed under the Healthcare Services Act (HCSA), for example, those assisting ophthalmologists in community eye clinics, may be provided access to the National Electronic Health Record system (NEHR) to support the delivery of care to patients. Health information from optometrists in non-HCSA licensed institutions is currently not required to be submitted to NEHR.

**Relevance.** The regime hinges entirely on HCSA licensing, for both access and contribution.

---

#### 7. Plans for Onboarding Traditional Chinese Medicine Practitioners to National Electronic Health Record
**12 February 2026 · Vol 96, Sitting No 17 · written answer (not answered orally), Q34 · Mr Cai Yinzhou · Mr Ong Ye Kung · Official-Report verbatim: yes**

> **34** Mr Cai Yinzhou asked the Coordinating Minister for Social Policies and Minister for Health (a) whether the Ministry plans to onboard Traditional Chinese Medicine (TCM) practitioners to the National Electronic Health Record (NEHR); (b) if so, what is the timeline; (c) what technical and financial support will be provided to TCM clinics to upgrade their practice management systems; and (d) how will the Ministry ensure data interoperability between TCM diagnostic terminology and Western medical records within NEHR.
>
> **Mr Ong Ye Kung:** Traditional Chinese Medicine (TCM) service is not a licensable healthcare service under the Healthcare Services Act 2020, and under the Health Information Bill, data from TCM practitioners are not within the data types to be contributed to the National Electronic Health Record system.

---

#### 8. Making Lasting Power of Attorney Status and Donee Identity Accessible on National Electronic Health Record for Clinical Decision Making and Timeline for Integration
**7 July 2026 · Vol 96, Sitting No 32 · written answer, Q24 · Dr Haresh Singaraju · Mr Ong Ye Kung · Official-Report verbatim: yes**

> **24** Dr Haresh Singaraju asked the Coordinating Minister for Social Policies and Minister for Health in view that Advance Care Planning is visible on the National Electronic Health Record (NEHR) and that the Government is promoting Lasting Power of Attorney (LPA) uptake (a) whether LPA status and donee identity can be made visible on NEHR to help clinicians identify authorised decision makers at the point of care; and (b) what is the Ministry's timeline for such integration.
>
> **Mr Ong Ye Kung:** Information on the Lasting Power of Attorney (LPA) cannot be made visible on the National Electronic Health Record system as it is protected under the Mental Capacity Act. Such information may only be disclosed by the Public Guardian to specified persons upon satisfactory submission of evidence(s) required under the law.
>
> Typically, the appointed donees would present the LPA to healthcare providers when acting for donors who have lost mental capacity. If the healthcare provider does not know the identity of the donor's next-of-kin or donee, or is unable to contact them after reasonable attempts, they may request for information on the donor's LPA via the Office of the Public Guardian Online portal.

**Relevance.** A clean instance of another statute (the Mental Capacity Act) limiting what may enter NEHR — useful for the interaction-of-instruments analysis.

---

#### 9. Acceptance Rates of Revised HealthHub Terms of Use and Alternative Access Options
**2 March 2026 · Vol 96, Sitting No 22 · written answer, Q10 · Mr Dennis Tan Lip Fong · Mr Ong Ye Kung · Official-Report verbatim: yes**

> **10** Mr Dennis Tan Lip Fong asked the Coordinating Minister for Social Policies and Minister for Health since the updates to HealthHub's terms of use in September and November 2025 (a) how many users have not accepted the revised terms of use in full or have given up access to HealthHub; and (b) how else can such users access similar information previously accessible on HealthHub, other than through the platform.
>
> **Mr Ong Ye Kung:** HealthHub's Terms of Use were updated in September 2025 and November 2025 arising from Data Protection Trustmark requirements and enhancement of the Caregiver Access module respectively. Since then, there has not been a reduction in the number of monthly unique HealthHub users.
>
> Residents who prefer not to use HealthHub have the option of contacting the public healthcare institutions directly through service counters and contact centres.

---

#### 10. Simplifying HealthHub Terms of Use for Seniors and Residents of All Literacy Levels
**7 May 2026 · Vol 96, Sitting No 31 · written answer, Q12 · Mr Dennis Tan Lip Fong · Mr Ong Ye Kung · Official-Report verbatim: yes**

> **12** Mr Dennis Tan Lip Fong asked the Coordinating Minister for Social Policies and Minister for Health (a) whether the Ministry will provide a simplified version of HealthHub's Terms of Use to ensure digital access to health records is not conditional on accepting broad contractual terms; and (b) what measures are taken to ensure that these terms are accessible and easy to understand for seniors and residents of all literacy levels.
>
> **Mr Ong Ye Kung:** HealthHub's Terms of Use (TOU) is broadly similar to those of other digital health apps. It covers the full range of HealthHub's functions, from access to health records and appointment scheduling to bill payment, the caregiver module and more. The TOUs set out protections and liabilities to safeguard against illegal or inappropriate use that could compromise the platform for all users.
>
> We will continue to review the TOU to ensure clarity for users. Users who require assistance in understanding the TOU or managing their HealthHub access can call 1800 225 4482 or email contact_us@healthhub.sg.

**Relevance.** The proposition put — that access to one's own health record should not be conditional on accepting broad contractual terms — was not accepted and not directly addressed. Pairs with the Healthier SG Enrolment Terms point.

---

#### 11. Patient Follow-Up Testing at Different Healthcare Cluster Polyclinics
**13 January 2026 · Vol 96, Sitting No 13 · written answer, Q13 · Mr Dennis Tan Lip Fong · Mr Ong Ye Kung · Official-Report verbatim: yes** — the day after the Second Reading.

> **13** Mr Dennis Tan Lip Fong asked the Coordinating Minister for Social Policies and Minister for Health (a) whether patients may have follow-up tests, including blood tests, scans, or procedures in a polyclinic physically closer to them, but belonging to a different public healthcare cluster from the hospital that ordered the follow-up tests; and (b) whether such hospitals will have access to the ensuing test reports.
>
> **Mr Ong Ye Kung:** Patients can have tests, scans or procedures performed if available at polyclinics regardless of the public healthcare cluster of the hospital that ordered them. In some cases, patients may be reviewed by a polyclinic doctor before the tests are performed. The test results are made available to the hospitals via the National Electronic Health Record (NEHR), which enables secure sharing of patient data across public healthcare institutions. **Access to this data will become more seamless as we move towards using the same electronic medical record system across all public healthcare institutions.**

**Relevance.** The Next Generation EMR programme — a forward commitment with no instrument and no further parliamentary scrutiny.

---

#### 12. Medical Records Access Rights for Non-custodial Parents and Court-ordered Custody Protections
**7 April 2026 · Vol 96, Sitting No 27 · written answer, Q27 · Mr Victor Lye · Mr Ong Ye Kung · Official-Report verbatim: yes**

> **27** Mr Victor Lye asked the Coordinating Minister for Social Policies and Minister for Health (a) whether a non-custodial parent is currently able to access or modify a child's medical records through platforms such as HealthHub; and (b) if so, what safeguards exist where the other parent has been granted sole custody by the Courts.
>
> **Mr Ong Ye Kung:** Medical records are provided and updated by healthcare professionals only. HealthHub displays selected medical information from a patient's medical records. Parents will be able to access, but not modify, their child's medical records reflected in HealthHub. They may write to contact_us@healthhub.sg with information on special circumstances that may affect access to their child's records. The Ministry of Health will assess such requests on a case-by-case basis.

---

#### 13. Not a PQ, but on point: Committee of Supply 2026, Head O (Ministry of Health)
**5 March 2026 · Vol 96, Sitting No 25 · Mr Ong Ye Kung · Official-Report verbatim: yes**

> "When it comes to AI in healthcare, we are guided by two principles. One, **care should be AI-enhanced, not AI-decided.** Clinicians remain in the loop and healthcare remains a profoundly human endeavour. Two, we take a practical, use case approach. **AI should not be a hammer looking for a nail, a solution looking for a problem.** We deploy AI where we know it will improve patient outcomes or the delivery of care, and where it can do so cost-effectively."
>
> "**MOH has developed such a model for our local context using anonymised patient data.** With this model, by reviewing an individual's current health status, it can identify if he/she has a high risk – high risk defined by 75% or above – of developing chronic diseases, such as diabetes or high cholesterol, within the next three years."

**Relevance.** A national predictive model built by MOH on **anonymised patient data**, announced for roll-out to all Healthier SG enrolees' doctors from early 2027. No consent mechanism was disclosed, no governing instrument was named, and no Member asked.

### 4.3 CONFIRMED NEGATIVES

Each of the following is the result of an exhaustive search of the complete Official Report for **every** sitting day from 12 January 2026 to 3 September 2026 (23 sittings, 2,600 sections), not a failure to find. Search paths are at §6.

1. **No PQ has asked about the legal basis, constitution or governance of the TRUST platform, the TRUST Data Access Committee, enTRUST, the PRECISE-SG100K Data Access Committee, or the Biomedical Data Hub.** TRUST is named in the parliamentary record in this window on exactly three occasions: the Second Reading reply **[CL ¶56]**, the 6 May 2026 written answer (§4.1 item 1), and the 5 August 2026 oral answer (§4.1 item 2). On each occasion the Government named it; on no occasion was its governance examined. The 6 May 2026 question asked for **statistics**, and got them.

2. **No PQ has asked about the transfer of the TRUST Office to the National Research Foundation.** The transfer (1 April 2026, per A13) is mentioned in the parliamentary record only in the passing phrase "TRUST under the National Research Foundation" at **[CL ¶56]**, made on 12 January 2026, before it took effect. Neither the Second Reading nor the 5 August 2026 answer (which says TRUST "was established in 2022") discloses the change of custodian.

3. **No PQ has asked about "derived information", Type 1 or Type 2 derived information, or clauses 25 or 30(5) of the Bill / sections of the Act.** The term appears in the parliamentary record in this window only in Mr Louis Chua's Second Reading speech and Mr Kenneth Tiong's clarification, both on 12 January 2026.

4. **No PQ has asked whether NEHR data is or will be used to train AI models.** The only time the question was put was as a **supplementary** by Mr Low Wu Yang Andre on 5 August 2026 (§4.1 item 2), and **it was not answered**.

5. **No PQ has asked about commercial or industry access to NEHR data.** The nearest are the six private-company approvals disclosed in the 6 May 2026 answer, which concern PRECISE-SG100K and HELIOS, not NEHR.

6. **No PQ has asked about consent for secondary use of health data.** Same position as 4.

7. **No PQ has asked about the SG500K / National Precision Medicine Phase III programme.** A27 recorded this negative to 15 August 2026; it holds to 3 September 2026.

8. **No PQ has asked about cross-border transfer of health data.** A27's negative holds.

9. **No subsidiary legislation under the Health Information Act 2026 has been laid, and no PQ has asked when it will be.** Nothing in the 23 sittings mentions HIA subsidiary legislation at all after 12 January 2026.

10. **No PQ has asked about HEALIX.** A27 flagged HEALIX as named in COS 2026 with no identified governing instrument; nothing further has been asked.

11. **No PQ has asked about the unpublished guidance note to insurers or the AI providers' no-retention commitments** beyond the two answers at §4.2 item 5 and §4.1 item 3 that disclosed their existence.

12. **No Ministerial Statement on health data was made in this window**, and **no Bill amending the Health Information Act 2026 has been introduced.** The only health-portfolio Bill before the House is the Health Sciences Authority (Amendment) and Other Matters Bill (No 17/2026), First Reading 4 August 2026, Vol 96 Sitting No 33, still awaiting Second Reading (A27 §4.2).

---

## 5. Gaps, dead ends, and things the orchestrator should know

### 5.1 Still unpublished / unlocated

1. **The MOH guidance note to insurers**, issued with MAS's support, on appropriate practices and scope when requesting patient medical records. Twice on the record (**[CL ¶39]**, 12 Jan 2026; §4.2 item 5, 3 Feb 2026). Not on `moh.gov.sg` (sitemap of 11,148 URLs grepped), not found on `healthinfo.gov.sg` by A27, not attempted on `mas.gov.sg` or `lia.org.sg`. **High-value chase; assign to whoever owns insurance.**
2. **The MOH circular to HCSA licensees** on the same subject. Probably but not certainly the 6 March 2026 HIA Enactment Circular listed on `healthinfo.gov.sg/news-and-events/circulars/`; the two are not expressly identified with each other in any source I retrieved. **Do not assume they are the same instrument.**
3. **The "legally-binding commitments" required of AI model providers by public healthcare institutions** that input and output data are not stored or retained (§4.1 item 3). Contractual instruments governing national health data; unpublished.
4. **The TRUST Data Access Committee's terms of reference and approval criteria.** Mr Louis Chua described the DAC's social-value / public-interest test at **[LC ¶22]** and the Minister confirmed the "Publicly available listings of approved projects are maintained on the TRUST website" (§4.1 item 1), but the TRUST site itself was outside my domain. **A13 should reconcile.**
5. **The independent safety and evaluation unit** that is to test SIMFONI's models before deployment (§4.1 item 2). Named on the floor; not identified by name, constitution or reporting line; no instrument.

### 5.2 New since A27's 15 August 2026 cut-off — extra-parliamentary, and material

Parliament has not sat since 5 August 2026, so nothing parliamentary is new. Two MOH items are, and one of them is an instrument:

- **24 August 2026 — "AIHGle 2.0".** In his speech at the HIMSS26 APAC Health Conference and Exhibition, Mr Tan Kiat How said: **"The Ministry of Health recently updated our Artificial Intelligence in Healthcare Guidelines — AIHGle 2.0. It sets out responsibilities across the AI lifecycle — for developers to develop responsibly, healthcare institutions to deploy safely, and healthcare professionals to use AI wisely. That includes evaluating safety and performance, putting in place multidisciplinary governance, monitoring systems after deployment, maintaining incident-reporting processes, and ensuring that professional judgement remains with people."** Retrieved from `https://www.moh.gov.sg/newsroom/speech-by-mr-tan-kiat-how--senior-minister-of-state--ministry-of-digital-development-and-information---ministry-of-health--at-himss26-apac-health-conference-and-exhibition--24-august-2026/` (curl, HTTP 200, 486,649 bytes, 3 September 2026). **This is a normative instrument in the brief's sense, it is days old, it does not appear in A27 or KEY-FINDINGS, and the guidelines document itself has not been located.** Note the tension with the 6 May 2026 written answer (§4.2 item 4), where the same Ministry, asked "what regulations currently govern AI healthcare innovations", did not mention the AI in Healthcare Guidelines at all.
- **Same speech — three Synapxe platforms named**, none of which appears in KEY-FINDINGS and none of which has an identified governing instrument: **Tandem** ("a common, secure GenAI platform across Singapore's public healthcare system" where professionals "test ideas securely with domain-specific data"); **Note Buddy** (transcribes and summarises doctor–patient conversations across four languages); and **AgentSea** ("a sector-wide agentic AI platform … Over 12,000 AI agents have been created by healthcare professionals"). The Senior Minister of State also framed the governance problem explicitly: *"as we move from AI that recommends to AI that acts, we must move from assuring outputs to assuring actions."* **Recommend an owner be assigned.**
- **12 August 2026** — Speech by Ms Lai Wei Lin, Permanent Secretary (Policy & Development), MOH, at the AIA Healthcare Summit 2026. Retrieved (HTTP 200) and **checked: no health-data-sharing content.** Excluded.
- **7 August 2026** — MOH public consultation on the proposed Bill to protect genetic information (A27 §2.2 #19). Confirmed present on the MOH sitemap; not re-retrieved, outside my domain.

### 5.3 Not done

1. **Vernacular speeches.** The 12 January 2026 sitting carries a `vernacularList` of four items and the Hansard text marks them "[Please refer to Vernacular Speech.]". The endpoints `/search/vernacular/download` and `/search/officialReport/download` exist in the SPA bundle and take a POST `{id}` body; I did not exercise them. A27 flagged the same gap, including a COS 2026 Mandarin passage whose English summary is cut off mid-sentence.
2. **The full-text search endpoint** `POST /search/searchResult` returned HTTP 400 on a naive payload. Reverse-engineering it would let a future agent search all of Hansard server-side rather than sweeping day by day. Not pursued because the day-by-day sweep is cheap and complete.
3. **Sittings before 12 January 2026** were not re-fetched. A27's findings for 2024–2025 stand on A27's own retrieval and were not independently re-verified here; if the orchestrator wants that corpus rebuilt in Drive, §0.1 will do it in roughly four minutes for the full 683-weekday sweep.
4. **`sso.agc.gov.sg` was not used** (prohibited by the task), so no clause number quoted by a Member has been checked against the enacted section numbering of the Health Information Act 2026. **Every clause reference in §1 and §2 is a reference to the Bill as debated, attributed to the Member or Minister who cited it, not a verified reference to the Act.**

---

## 6. Search log

**WebSearch queries used: 0.** Everything was direct retrieval. Full allowance unspent.

| Host / path | Method | Result |
|---|---|---|
| `sprs.parl.gov.sg/search/getHansardReport/?sittingDate=DD-MM-YYYY` | GET, plain + browser UA | **HTTP 500**, 91 bytes, every date incl. 12-01-2026 and 04-08-2026 |
| same, no trailing slash; `sittingdate` lowercase; `--http1.1`; `Origin` + `Referer` + `Accept: application/json` + `Accept-Language: en-SG` + `X-Requested-With` + `Sec-Fetch-Dest/Mode/Site`; form-encoded POST to the bare path | GET and POST | **HTTP 500**, 91 bytes, all ten variants |
| `sprs.parl.gov.sg/search/getDisplayData`, `/fetchData` | GET | **HTTP 500**, 91 bytes |
| `sprs.parl.gov.sg/search/` | GET | **HTTP 200**, 3,077 bytes — Angular shell; revealed `main.6c50b646860a7eb9.js` and an Imperva `_Incapsula_Resource` script |
| `sprs.parl.gov.sg/search/main.6c50b646860a7eb9.js` | GET | **HTTP 200**, 1,010,111 bytes — **the fix**: endpoints are POST with JSON bodies |
| `sprs.parl.gov.sg/search/getHansardReport` | **POST** `{"sittingDate":"12-01-2026"}`, `Content-Type: application/json`, cookie jar seeded from `/search/` | **HTTP 200, 1,282,505 bytes** |
| same | **POST**, 172 weekdays 12 Jan – 3 Sep 2026 | **23 sitting days recovered** (~18 MB), all others HTTP 500 / 91 bytes |
| `sprs.parl.gov.sg/search/getDisplayData`, `/fetchData` | **POST** `{}` | **HTTP 200** (942 and 30,929 bytes) |
| `sprs.parl.gov.sg/search/getToken` | POST `{}` | HTTP 405 Method Not Allowed — not needed |
| `sprs.parl.gov.sg/search/searchResult` | POST `{"keyword":…}` | HTTP 400 — payload shape not reverse-engineered |
| `sprs.parl.gov.sg/search/topic?reportid=…` | GET | HTTP 404 (SPA shell) |
| `www.moh.gov.sg/sitemap.xml` | GET | HTTP 200, 1,989,918 bytes, **11,148 URLs** — the index for everything MOH below |
| `moh.gov.sg/newsroom/health-information-bill-second-reading-opening-speech-for-sms-tan-kiat-how/` | GET | **HTTP 200**, 611,272 bytes — **opening speech, 89 numbered paragraphs** |
| `moh.gov.sg/newsroom/closing-speech-by-mr-tan-kiat-how--senior-minister-of-state--mddi---moh--for-the-second-reading-of-the-health-information-bill/` | GET | **HTTP 200**, 629,051 bytes — closing speech, 86 numbered paragraphs |
| `moh.gov.sg/newsroom/…himss26-apac-health-conference-and-exhibition--24-august-2026/` | GET | **HTTP 200**, 486,649 bytes — **AIHGle 2.0, Tandem, AgentSea, Note Buddy** |
| `moh.gov.sg/newsroom/…aia-healthcare-summit-2026--12-august-2026/` | GET | HTTP 200 — checked, no health-data content, excluded |
| `www.wp.sg/sitemap.xml`, `wp.sg/sitemap_index.xml` | GET | HTTP 404 (Webflow site, no sitemap) |
| `www.wp.sg/parliament` and `?675b9c48_page=2…22` | GET | HTTP 200 each; **server-side pagination works** via the Webflow collection-list parameter. Louis Chua's HIB speech is on **page 18** |
| `www.wp.sg/parliament/speech-by-louis-chua-on-the-health-information-bill` | GET | **HTTP 200**, 71,308 bytes — party-published prepared text |
| `www.parliament.gov.sg/parliamentary-business/order-paper` | GET | HTTP 200, 1,227,775 bytes — **latest Order Paper is 4 August 2026**; no future sitting listed |
| `www.parliament.gov.sg/parliamentary-business/votes-and-proceedings` | GET | HTTP 200 — client-side pagination only; latest shown 7 July 2026 |
| `www.parliament.gov.sg/parliamentary-business/bills-introduced` | GET | HTTP 200 — as A27 described |

**Corpus searches run over all 2,600 sections of the 23 sitting days:** see §4.0.

**Files left in `$SCRATCH/work/SG-01/`:**
- `hansard/*.json` — 23 raw Hansard JSON files, **the artefact to store in Drive**
- `corpus.py` — loader that turns them into searchable section records (`date, display, parl, sess, vol, sitting, listname, idx, title, sub, stype, qno, text, clar, clartitle`)
- `sweep.py` — the POST sweeper; change the date range and re-run
- `hib-2R-12jan2026.txt` — the whole Second Reading, Committee and Third Reading, HTML stripped
- `opening-hansard.txt`, `closing-part1.txt`, `closing-part2.txt`, `louis-chua-hansard.txt` — the four speeches as extracted
- `num-op.md`, `num-cl.md`, `num-lc.md` — the same, paragraph-numbered as used in this file
- `wp-louis-chua-hib.txt`, `moh-opening.txt`, `moh-closing.txt`, `himss26.txt`, `aia.txt`
- `pq/*.txt` — 12 PQs with their metadata headers
- `apilog.txt` — every API attempt with status and body size
- `raw/` — unprocessed HTML/JS/XML for everything above
