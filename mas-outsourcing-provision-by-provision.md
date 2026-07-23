# MAS Outsourcing Guidelines — Provision-by-Provision Breakdown

**Bank Guidelines** = Guidelines on Outsourcing (Banks), 11 December 2023, effective 11 December 2024.
**FI Guidelines** = Guidelines on Outsourcing (Financial Institutions other than Banks), effective 11 December 2024, last revised 24 January 2025.

This walkthrough proceeds in the order of the **Bank Guidelines** (¶1.1 → Annex 3), pairing each provision with its FI counterpart. FI-only provisions are inserted at the point where they fall in the FI sequence, in boxes marked **[FI-only]**. "Identical" means word-for-word apart from mechanical substitutions ("Bank"→"institution", "bank-wide"→"institution-wide", "MOORS"→"material outsourcing arrangement", renumbered cross-references and footnotes).

**Numbering map at a glance:**

| Bank Guidelines | FI Guidelines |
|---|---|
| §1 Introduction (1.1–1.6) | §1 Introduction (1.1–1.4) + §2 Application (2.1–2.4) |
| — | §3 Definitions *(no Bank counterpart)* |
| §2 Engagement with MAS (2.1–2.2) | §4 Engagement with MAS (4.1–4.2) |
| §3 Risk Management Practices (3.1–3.12) | §5 Risk Management Practices (5.1–5.12) — offset: Bank 3.1→FI 5.2, 3.2→5.3, 3.3→5.4, 3.4→5.5, **3.5→folded into 5.5.2(j)**, 3.6→5.6, 3.7→5.7, 3.8→5.8, 3.9→5.9, 3.10→5.10, 3.11→5.11, 3.12→5.12 |
| Annex 1 Material Outsourcing | Annex 3 |
| Annex 2 Cloud Computing | Annex 5 |
| Annex 3 Applicability chart *(Bank-only)* | Annexes 1 (Exempted Services), 2 (Examples), 4 (Register) *(FI-only)* |

---

## PART ONE — INTRODUCTION

### Bank ¶1.1 ↔ FI ¶1.1 — Purpose and risk rationale

Both open identically: outsourcing can bring cost and other benefits but may increase an institution's risk profile (reputation, compliance and operational risks from service-provider failure, security breaches, or inability to comply with Singapore legal and regulatory requirements); country risk arises where the provider is overseas and concentration risk where multiple functions go to one provider; outsourcing "does not diminish the obligations of an institution, and those of its board and senior management", so a sound and responsive risk management framework is needed.

**Change: none.** The paragraphs are verbatim identical — both even use the word "institution".

### Bank ¶1.2 ↔ FI ¶1.2 — Addressees, perimeter, self-assessment

- **Bank:** addresses "a bank or merchant bank (hereafter collectively referred to as 'Bank')" that has entered into or plans "an arrangement for ongoing outsourced relevant services ('outsourcing arrangement')", **excluding exempted Outsourced Relevant Services in Annex D of MAS Notices 658 and 1121** ("Notices"). Footnote 1 confirms the Guidelines cover both material and non-material *ongoing* arrangements.
- **FI:** addresses "a financial institution (other than a bank or merchant bank)" that has entered into any outsourcing arrangement or plans to outsource its **business activities** (fn 1: business and operational functions and processes) to a service provider, **excluding exempted outsourced services in Annex 1 of the Guidelines themselves**.
- Both then impose the same self-assessment expectation for all existing arrangements, with an identical footnote 2 extending this to arrangements inherited through acquisition of another institution's business.

**Changes:** (i) different addressees; (ii) the Bank perimeter is built on the statutory/Notice concept of "ongoing outsourced relevant services", the FI perimeter on the Guidelines' own defined term "outsourcing arrangement"; (iii) the exemption list lives in the Notices (Annex D) for banks but inside the instrument (Annex 1) for FIs.

**Are the two "outsourcing arrangement" concepts the same thing?** Intentionally yes, technically no — verified against Notice 658 ¶2.1 itself. Both descend from the single 2016/2018 Guidelines definition and occupy the same functional slot (both are even labelled "outsourcing arrangement"), and Notice 658's Annexes A–C are recognisably the old Guidelines' example lists recast in binding form. But the Notice re-engineered the test:

- **Conjunctive vs disjunctive.** FI: a service that "may currently or potentially be performed by the institution itself" **and** ongoing dependence **and** (integral to a financial service *or* provided to the market in the institution's name). Notice 658: an "outsourced relevant service" is a relevant service (other than the Annex B exclusions) that **(a) is performed, or was at any time previously performed, by the bank itself**, *or* **(b) is integral to any business the bank may carry on under s 30(1) Banking Act** (including the Annex A list), *or* **(c) is deemed included by Annex C** — public cloud (SaaS/PaaS/IaaS), information-systems hosting/management, IT helpdesks, data centre operations, archival/storage/destruction of confidential or customer data, manpower management incl. payroll, corporate secretariat, e-signature facilitation, ATM maintenance.
- **"Ongoing".** FI: qualitative — "dependent on the service on an ongoing basis". Bank: bright-line — an ORS obtained or received (or intended) for **more than 12 months**, including where renewals or intended renewals take the cumulative duration past 12 months.
- **Self-performability.** FI: hypothetical capability is a threshold requirement for everything. Bank: actual/historical performance is one optional limb only.
- **"In the name of" limb.** FI has it as a general test; the Notice has no general limb, capturing specific instances through Annex A (white-labelling; marketing in the bank's name).

Practical consequences: a ≤12-month non-renewing arrangement can never be an ongoing ORS for a bank regardless of dependence, while the FI test has no duration threshold; a 13-month arrangement is "ongoing" for a bank regardless of dependence; public cloud is automatically in scope for banks (Annex C) but must pass the two-limb test for an FI; and a service the bank could never perform itself can still be caught via the "integral" limb, whereas the FI chapeau requires self-performability.

### [FI-only] FI ¶1.3 — Cross-reference to the Bank Guidelines

The FI Guidelines state that expectations for banks and merchant banks are in a separate set of guidelines, because that set "makes reference to definitions in MAS Notices 658 and 1121 that apply only to banks and merchant banks" (fn 3 links to the Bank Guidelines). **No Bank counterpart** (the Bank Guidelines do not reciprocally cite the FI Guidelines).

### Bank ¶1.3 ↔ FI ¶2.1 — Proportionality

Identical: implementation should be commensurate with the nature of risks in, and materiality of, the arrangement — expressly including arrangements involving an MAS-regulated entity — and outsourced services (whether provided by the service provider or its sub-contractor) must continue to be managed "as if the services were still managed by" the institution.

**Change: none of substance** (located in the Introduction for banks, in the separate "Application of Guidelines" section for FIs).

### Bank ¶1.4 ↔ FI ¶2.2 — Perimeter guidance and annex roadmap

- **Bank:** Banks "are expected to refer to the Notices in determining which relevant services are outsourcing arrangements"; arrangements outside the definition should still be subject to adequate risk management and sound internal controls; roadmap to Annex 1 (materiality guidance), Annex 2 (cloud), Annex 3 (applicability of Notices/Guidelines to service categories); "Please refer to the Notices for the definition of terms used in these Guidelines."
- **FI:** roadmap to Annex 1 (exempted services), Annex 2 (non-exhaustive examples of what is and is not an outsourcing arrangement), Annex 3 (materiality guidance), Annex 4 (register template, "to be submitted to MAS, at least annually or upon request"), Annex 5 (cloud); the same warning that non-outsourcing arrangements still need adequate risk management and sound internal controls.

**Changes:** (i) scoping authority — the Notices for banks vs the Guidelines' own definitions and Annexes 1–2 for FIs; (ii) the FI roadmap already announces the **annual register submission** obligation, which has no stated counterpart frequency anywhere in the Bank Guidelines; (iii) the Bank version outsources all definitions to the Notices, the FI version to its §3.

### [FI-only] FI ¶2.3 — Group-wide observance

A Singapore-incorporated institution should consider the impact of outsourcing by its branches and any corporation under its control (including overseas) on its consolidated operations, and should **ensure these Guidelines are observed by branches and controlled corporations** through a group-wide outsourcing risk management framework that complies with the Guidelines.

**No direct Bank counterpart.** The Bank Guidelines reach group arrangements through ¶3.11.1 (application to intra-group outsourcing, including subsidiaries of Singapore-incorporated banks) and Annex 1 ¶4 (group-level materiality), but contain no affirmative "ensure observance by branches and subsidiaries" instruction.

### Bank ¶1.5 ↔ FI ¶2.4 — Not exhaustive; no override; no standard of care

Identical: the Guidelines are not exhaustive, do not override legislation, must be read with the relevant legislation, subsidiary legislation, written directions, notices, codes and other guidelines, and are not a statement of the standard of care owed to customers.

**One difference:** the Bank version hangs footnote 3 off "other guidelines", pointing to the **MAS Information Paper on "Operational Risk Management – Third-Party Arrangements"** as good practice MAS expects to see in banks. The FI version has no such reference.

### Bank ¶1.6 ↔ FI ¶1.4 — Effective date

- **Bank:** "These Guidelines take effect on 11 December 2024."
- **FI:** "These Guidelines take effect on 11 December 2024 and last revised on 24 January 2025."

**Change:** same effective date; only the FI Guidelines have been revised since (the 24 January 2025 revision amended the "financial adviser" definition in §3 — it is the only provision carrying an amendment tag).

---

## PART TWO — [FI-only] SECTION 3: DEFINITIONS

The Bank Guidelines have **no definitions section** at all — ¶1.4 defers wholesale to the Notices, and only three terms are pinned down in footnotes ("bridge-institution" at fn 14, "multi-tenancy" at fn 20, and the scope of "customer information" at fn 4). The FI Guidelines, by contrast, carry a complete glossary at §3, because there is no Notice to lean on. Its contents:

- **"benchmark administrator"** — authorised under s 123F SFA or exempt under s 123K SFA.
- **"board"** — for Singapore-incorporated institutions, the board of directors; for foreign-incorporated institutions, **a management committee or body beyond local management** charged with oversight of the Singapore operations. *(This tailored definition is what makes FI ¶5.2.5's regional-committee mechanism work; the Bank Guidelines have no equivalent.)*
- **"bridge-institution"** — same definition as Bank fn 14 (resolution vehicle).
- **"business relations"** — sector-by-sector definitions for insurers, CMIs, financial advisers, credit/charge card licensees and benchmark administrators.
- **"CMI"** — capital markets services licensees, registered fund management companies and certain exempt persons.
- **"customer"** — ten sector-specific limbs, covering: CIS trustees (managers and participants); approved exchanges, market operators, trade repositories, clearing houses and the central depository (participants in their services); licensed trust companies (the trust, settlor and beneficiaries); insurers (including master-policy owners for group policies); insurance intermediaries; financial advisers; CMIs (including investors in managed investment vehicles); card licensees; money-changers and remitters (including cash payees of inward remittances); benchmark administrators (information providers and benchmark recipients).
- **"customer information"** — "user information" (SFA) for exchanges/market operators/clearing houses; "user information" and "transaction information" for trade repositories; otherwise customers' accounts, particulars, transaction details and dealings — excluding information that is public, anonymised, or securely encrypted so identities cannot readily be inferred. *(Compare Bank fn 4: same anonymisation/encryption carve-out, but with the express rider that customer information which had previously been made public **remains** customer information — a nuance the FI definition does not carry, since it simply excludes "public" information.)*
- **"financial adviser"** — licensed under the FAA or exempt under s 20(1)(g) FAA read with reg 27(1)(d) FAR. **[Amended on 24 January 2025.]**
- **"institution"** — any FSMA s 2 financial institution other than a licensed bank or merchant bank.
- **"material outsourcing arrangement"** — an arrangement which (a) on service failure or security breach, could materially impact the institution's business operations, reputation or profitability, or its ability to manage risk and comply with applicable laws; **or** (b) involves customer information which, on unauthorised access, disclosure, loss or theft, may materially impact customers. *(The Bank analogue "MOORS" is defined in the Notices, not the Guidelines.)*
- **"legal arrangement" / "legal person"** — standard AML-style definitions.
- **"outsourcing agreement"** — the written agreement setting out the contractual terms governing the arrangement.
- **"outsourcing arrangement"** — a service that may currently or potentially be performed by the institution itself, where (a) the institution depends on it on an ongoing basis and (b) it is integral to the institution's provision of a financial service, or is provided to the market in the institution's name.
- **"relevant business transaction"** — thresholds for money-changers (≥S$5,000 or inward remittance) and remitters.
- **"service provider"** — any party providing a service to the institution, **including any entity within the institution's group** (fn 4 defines "group": head office/parent, subsidiaries, affiliates, and controlled/controlling entities including SPEs), located in Singapore or elsewhere.
- **"sub-contracting"** — where a service provider further outsources services covered by the outsourcing arrangement to another service provider.

---

## PART THREE — ENGAGEMENT WITH MAS

### Bank ¶2.1 ↔ FI ¶¶4.1.1–4.1.2 — Demonstrating observance; consequences of non-observance

Both require the institution to be able to demonstrate observance of the Guidelines to MAS. Where MAS is not satisfied, it may require additional measures, "which could include pre-notification of new" material arrangements (Bank: "material ongoing outsourced relevant services (MOORS)"; FI: "material outsourcing arrangements"). Both state MAS may take non-observance into account in its assessment (impact of the arrangement on the institution and the financial system; severity of deficiencies; internal-controls/risk-management track record; circumstances of the case) and that MAS may communicate directly with home or host regulators of the institution and its service provider on their ability and willingness to cooperate.

**One substantive addition on the FI side:** FI ¶4.1.1 states that demonstrating observance "should include **submission of its outsourcing register** in the template set out in Annex 4 **at least annually or upon request**." The Bank Guidelines contain no submission-frequency provision — the closest text is fn 21 to ¶3.8.2(a) ("Banks should submit their registers according to the template set out at this link"), which states no frequency (register requirements for banks sit in the Notices).

### [FI-only] FI ¶4.1.3 — MAS may require modification or re-integration

MAS may require an institution to **modify, make alternative arrangements or re-integrate** an outsourced service where: (a) the institution fails to demonstrate a satisfactory understanding of the risks; (b) it fails to implement adequate risk measures satisfactorily and timeously; (c) adverse developments arise that could impact it; (d) **MAS's supervisory powers or functions are hindered**; or (e) **the security and confidentiality of customer information is lowered due to changes in the service provider's control environment**.

**Bank counterpart is structurally different and appears later** (Bank ¶¶3.4.5–3.4.6, discussed below): for banks, MAS's intervention takes the form of a **direction to terminate** the contract or stop receiving the MOORS under Notices ¶7.1(g) — a last-resort mechanism with more grounds, including audit obstruction. Grounds (d) and (e) of the FI list have no Bank-Guidelines equivalent; conversely the Bank list's audit-obstruction grounds have no FI equivalent.

### Bank ¶2.2 ↔ FI ¶4.2.1 — Notification of adverse developments

Identical: notify MAS **as soon as possible** of any adverse development arising from outsourcing that could impact the institution — including events that could lead to prolonged service failure or disruption, and any breach of security or confidentiality of customer information — and also of such adverse developments **within the institution's group**.

**One drafting difference:** the Bank version carries fn 4 delimiting "customer information" (see Part Two above); the FI version needs no footnote because its §3 definition does that work.

---

## PART FOUR — RISK MANAGEMENT PRACTICES

### [FI-only] FI ¶5.1.1 — Overview

In supervising an institution, MAS will review its implementation of the Guidelines and the quality of board and senior management oversight and governance, internal controls and risk management regarding outsourcing risks. **No Bank counterpart** as a standalone provision (the idea is folded into Bank ¶2.1).

### Bank ¶3.1.1 ↔ FI ¶5.2.1 — Board and senior management: overall responsibility

Identical: day-to-day duties may be delegated to the service provider, but responsibility for oversight, governance, risk management and the outsourcing risk management framework stays with the institution, its board and senior management; adequate processes must give a comprehensive institution-wide view of outsourcing risk exposures, fed into the framework. **Change: none** ("bank-wide" vs "institution-wide" only).

### Bank ¶3.1.2 ↔ FI ¶5.2.2 — Board responsibilities

Identical six items: (a) approve the risk/materiality evaluation framework and applicable policies; (b) set risk appetite; (c) lay down approval authorities; (d) assess management competencies; (e) ensure senior management establishes governance structures and processes (e.g. a management body reviewing controls for consistency with the institution-wide view of risk); (f) undertake regular reviews of outsourcing strategies and arrangements for continued relevance, safety and soundness. **Change: none.**

### Bank ¶3.1.3 ↔ FI ¶5.2.3 — Senior management responsibilities

Identical eight items: (a) evaluate materiality and risks under the board-approved framework; (b) develop and implement sound policies and procedures; (c) review and adjust them regularly; (d) monitor and control all risks from material arrangements institution-wide; (e) ensure tested contingency plans based on realistic disruptive scenarios; (f) ensure independent review and audit of compliance; (g) ensure timely remediation of audit findings; (h) communicate risk information to the board in a timely manner.

**Only change:** items (d) and (h) refer to "its MOORS" in the Bank version and "its material outsourcing arrangements" in the FI version.

### Bank ¶3.1.4 ↔ FI ¶5.2.4 — Delegation to a board committee

Identical: communication procedures between board and committee; regular reporting; senior management held responsible for implementation; the board remains responsible for the committee's performance. **Change: none.**

### Bank ¶3.1.5 ↔ FI ¶5.2.5 — Foreign-incorporated institutions

- **Bank:** the senior-management functions in ¶3.1.3 lie with **local management**; local management of a foreign-incorporated Bank must take steps to comply with Singapore laws and the Guidelines and "cannot abrogate its governance responsibilities".
- **FI:** the same local-management text, **preceded by an additional sentence**: for a foreign-incorporated institution, the **board functions in ¶5.2.2 may be delegated to and performed by a management committee or body beyond local management** charged with functionally overseeing the local office — e.g. a regional risk management committee (dovetailing with the §3 "board" definition).

**Change:** the FI version expressly solves the "who is the board of a Singapore branch?" problem; the Bank version addresses only the senior-management/local-management limb.

### Bank ¶3.2.1 ↔ FI ¶5.3.1 — Risk evaluation framework

Identical six-step framework: (a) identify outsourcing's role in overall strategy; (b) comprehensive due diligence on nature/scope/complexity to identify and mitigate key risks; (c) assess the service provider's ability to employ a high standard of care and meet regulatory standards **as if the service were performed by the institution itself**; (d) analyse impact on overall risk profile and adequacy of internal expertise/resources; (e) analyse entity **and group** aggregate exposure to manage concentration risk; (f) weigh benefits against risks (from temporary disruption through security breach to unexpected termination), including whether, for strategic and internal-control reasons, the arrangement should not be entered into at all. **Change: none of substance.**

### Bank ¶3.2.2 ↔ FI ¶5.3.2 — When evaluations occur

Identical: before entering an arrangement with an existing or new provider, and re-performed periodically on existing arrangements as part of approval, strategic planning, risk management or internal control reviews. **Change: none.**

### [Bank-only] Bank ¶3.2.3 — Legal advice on overseas disclosure of customer information

When assessing risks of a MOORS that involves **disclosing customer information to an overseas service provider**, a Bank should assess whether **independent legal advice** is necessary or whether internal counsel's advice suffices; the decision on obtaining advice, and its frequency, must be approved by the **board or its delegated committee**, and revisited "whenever there are significant changes in the relevant law(s) overseas."

**No FI counterpart anywhere.** This is a banking-secrecy-driven provision.

### Bank ¶3.3.1 ↔ FI ¶5.4.1 — Due diligence trigger

Identical: due diligence on the service provider when **considering, renegotiating or renewing** an arrangement. **Change: none.**

### Bank ¶3.3.2 ↔ FI ¶5.4.2 — Due diligence content

Identical: assess all relevant aspects, including capability to employ a high standard of care as if in-house; physical and IT security controls; business reputation and financial strength; ethical and professional standards; ability to meet obligations. Onsite visits (by persons with requisite knowledge and skills) plus, where possible, independent reviews and market feedback. **Change: none.**

### Bank ¶3.3.3 ↔ FI ¶5.4.3 — Due diligence information set

Identical ten heads (a)–(j): experience and capability over the contract period; financial strength and resources (credit-assessment-like: business strategy and goals, audited financials, equity-sponsor commitment, resilience under adverse conditions); corporate governance, reputation, culture, compliance, pending/potential litigation; security and internal controls, audit coverage, reporting and monitoring; risk management framework and capabilities including **technology risk management** (fn: standards commensurate with MAS Technology Risk Management Guidelines) and **BCM** (fn: standards commensurate with MAS BCM Guidelines); disaster recovery arrangements and track record; reliance on and success with sub-contractors; insurance coverage; external (political, economic, social, legal) environment of the provider's jurisdiction; ability and track record of compliance with applicable laws. **Change: none.**

### Bank ¶3.3.4 ↔ FI ¶5.4.4 — Screening the provider's employees

Identical: employees undertaking any part of the arrangement assessed against the institution's own hiring policies — disciplinary or criminal proceedings; convictions (particularly fraud, misrepresentation, dishonesty); accepted civil liability for fraud/misrepresentation; financial soundness — with adverse findings weighed for relevance and impact. **Change: none.**

### Bank ¶3.3.5 ↔ FI ¶5.4.5 — Documentation and re-performance

Identical: document due diligence; re-perform periodically on a risk-based frequency (including intragroup arrangements; reduced due diligence may suffice intra-group); keep the information current; use due diligence findings to set audit frequency and scope. **Change: none.**

### [Bank-only] Bank ¶3.3.6 — Frequency-of-checks policies

For **Notices ¶5.2(b)** (policies on frequencies of checks on service providers), a Bank need not set a policy per individual MOORS; policies may be set for **groups or types of MOORS** provided the review frequency is commensurate with the risks. **No FI counterpart** — this interprets a Notice obligation that does not exist for FIs. (The FI analogue in spirit is the annual review at FI ¶5.8.2(d), below.)

### Bank ¶3.4.1 ↔ FI ¶5.5.1 — Written agreements, legally vetted

Identical: contractual terms carefully and properly defined in written agreements, vetted by a competent authority (e.g. legal counsel) for legality and enforceability. **Change: none.**

### Bank ¶3.4.2 ↔ FI ¶5.5.2 — Minimum contents of the outsourcing agreement

Both: every agreement must address the risks identified at the risk-evaluation and due-diligence stages, allow timely renegotiation and renewal preserving control and the right to intervene, and at the very least cover:

| Item | Bank ¶3.4.2 | FI ¶5.5.2 |
|---|---|---|
| Scope | (a) | (a) |
| Performance, operational, internal control and risk management standards | (b) | (b) |
| Confidentiality and security | (c) — **fn 9: for a MOORS, must include the requirements of Notices ¶7.1(a)–(c)** | (c) |
| Business continuity management | (d) | (d) |
| Monitoring and control | (e) | (e) |
| Audit and inspection | (f) — **fn 12: for a MOORS, must include Notices ¶7.1(d)** | (f) |
| Notification of adverse developments (events and circumstances the provider must report so the institution can mitigate and notify MAS) | (g) | (g) |
| Dispute resolution (resolution process, events of default, indemnities, remedies, recourse; enforceable contractual rights on breach) | (h) | (h) |
| Default termination and early exit | (i) — bare item, elaborated in ¶¶3.4.3–3.4.8 | (i) — **expanded inline** (see next entry) |
| Sub-contracting | *not in this list* — dealt with in a dedicated §3.5 | **(j) — included as an agreement item** |
| Applicable laws (choice of law, covenants, jurisdiction) | (j) | (k) |

**Changes:** (i) the FI list has eleven items to the Bank's ten, because sub-contracting is folded in as item (j); (ii) the Bank version layers binding Notice ¶7.1 requirements on top for MOORS via footnotes; (iii) both elaborate termination — but differently (next entry).

### Bank ¶3.4.3 ↔ FI ¶5.5.2(i) — Termination triggers

Both give the institution the right to terminate **in the event of default**, plus:

- **Bank (¶3.4.3):** (a) by giving reasonable notice; (b) if the service provider **or a sub-contractor** failed to safeguard the confidentiality **or integrity of customer information**; (c) demonstrable deterioration in the ability of the provider or sub-contractor **to safeguard the confidentiality of customer information**.
- **FI (¶5.5.2(i)):** where the provider (i) undergoes a **change in ownership**; (ii) becomes **insolvent or goes into liquidation**; (iii) goes into **receivership or judicial management** (in Singapore or elsewhere); (iv) there has been a **breach of security or confidentiality**; or (v) there is demonstrable deterioration in the ability of the provider **to perform the contracted service**.

**This is the sharpest single drafting divergence in the two documents.** The FI list keeps the traditional corporate-event triggers and a service-performance trigger; the Bank list is confidentiality-centred (and extends expressly to sub-contractor failures) and adds a no-fault reasonable-notice termination right. The Bank Guidelines nowhere recite corporate-event triggers — banks' binding contract requirements are prescribed by Notices ¶7.1, whose full content the Guidelines do not reproduce. On the face of the two Guidelines, the FI trigger list is the broader one.

### Bank ¶3.4.4 ↔ FI ¶5.5.2(i) (closing text) — Termination mechanics

Identical: the minimum period to execute a termination provision must be specified in the agreement; provisions to ensure smooth transition on termination or amendment; such provisions may facilitate transferability of the services to a **bridge-institution** (identically defined: Bank fn 14 / FI fn 13) or a third party; where an intra-group entity provides the service, the agreement must be legally enforceable against it. **Change: none** (placement differs — standalone paragraph vs closing text of the termination limb).

### [Bank-only] Bank ¶¶3.4.5–3.4.6 — MAS-directed termination

For **Notices ¶7.1(g)**, MAS will consider directing a Bank to terminate the contract or stop obtaining/receiving the MOORS when: (a) circumstances in Notices ¶10.3 arise and the provider is unwilling or unable to remediate; (b) the provider won't/can't remediate and the Bank did not itself terminate; (c) the Bank cannot demonstrate satisfactory understanding of the risk; (d) the Bank cannot implement adequate risk measures satisfactorily and timeously; (e) adverse developments arise that could impact the Bank; (f) MAS or an MAS-appointed auditor is **prevented by the service provider from auditing** its books, systems and premises for the purposes in **s 47A(10) Banking Act 1970**; (g)–(h) where the sub-contract so provides, the sub-contractor prevents audit or withholds records/documents/reports/information. Fn 15: termination directions are a **last resort**; Banks need not exercise termination rights if they can remediate with the provider. ¶3.4.6: MAS will endeavour to give **reasonable notice** of an intended direction.

**FI counterpart:** none in this form — the FI analogue is the modify/re-integrate power at FI ¶4.1.3 (see Part Three), with a shorter, partly different list of grounds, no last-resort framing and no notice commitment.

### [Bank-only] Bank ¶3.4.7 — Deletion of information on termination, extended

For **Notices ¶7.1(f)** (deleting, destroying or rendering information unusable on termination), a Bank should endeavour to go **beyond the minimally required customer information to include non-customer information** given to the provider, unless the Bank assesses the provider has legitimate reasons to retain it; and should ensure the minimum termination-execution period is specified.

**FI counterpart:** none as an agreement-content expectation. The only FI deletion provision is the shared BCM one (FI ¶5.7.2(c) = Bank ¶3.7.2(c)): on adverse conditions or termination, all documents, transaction records and information previously given to the provider should be promptly removed from its possession, or deleted, destroyed or rendered unusable.

### Bank ¶3.4.8 ↔ FI ¶5.5.3 — Country-risk tailoring

Identical: each agreement tailored to address country-risk issues and potential obstacles to oversight and management where the provider is outside Singapore (cross-referring the outside-Singapore section, ¶3.10 / ¶5.10). **Change: none.**

### Bank ¶3.5.1 ↔ FI ¶5.5.2(j) — Sub-contracting: core controls

Substantively identical: retain the ability to monitor and control the arrangement when the provider sub-contracts; agreement clauses setting rules and limitations on sub-contracting; clauses making the service provider **contractually liable** for the sub-contractor's performance, risk management practices and compliance with the provider-level agreement, including the Guidelines' prudent practices; sub-contracting of any part of a material arrangement subject to the institution's **prior approval**.

**Change:** location and framing only — a dedicated section for Banks vs one item in the FI agreement checklist. (Minor wording: Bank "monitor and control **the risks arising from** its outsourcing arrangements" vs FI "monitor and control its outsourcing arrangements".)

### [Bank-only] Bank ¶3.5.2 — Customer consent before sub-contracting

Before a Bank allows a MOORS involving disclosure of customer information to be sub-contracted, it **must obtain the customer's written consent** to disclosure of customer information to the sub-contractor. The consent need not name the service providers, but the scope and purpose of disclosure must be made known (fn 17: consent may be obtained via onboarding terms and conditions, with reasonable steps to ensure customers know they are granting it).

**No FI counterpart** — the word "consent" does not appear in the FI Guidelines. Banking-secrecy-driven.

### [Bank-only] Bank ¶3.5.3 — Prescribed content of the sub-contract

For MOORS, on a risk-proportionate, best-effort basis, the Bank should ensure sub-contractors are held to similar standards as service providers, endeavouring to ensure:

- **(a) where the sub-contracting involves disclosure of customer information to the sub-contractor:** (i) the sub-contractor is notified in writing of the Bank's confidentiality obligations under the Banking Act and common law; (ii) customer information is disclosed to / accessed / collected / copied / modified / used / stored / processed by the sub-contractor only to the extent necessary to perform its duties; (iii) the sub-contractor and its employees do not disclose customer information to any third party unless compelled by law — and then must notify the Bank (directly or through the provider) as soon as practicable to the extent permitted by law;
- **(b) that the sub-contract itself provides:** (i) protection of confidentiality and integrity of **all** Bank information in the sub-contractor's custody; (ii) need-to-know access limits on the sub-contractor and its employees; (iii) the same no-third-party-disclosure/notification obligation; (iv) that **MAS, or an MAS-appointed auditor, may audit the sub-contractor** — to determine proper provision of the sub-contracted MOORS and assess the sub-contractor's ability to ensure service continuity, safeguard information, and manage legal, reputational, technological and operational risks, plus its compliance with written laws; (v) that the sub-contractor will provide any record, document, report or information on request to the Bank or MAS (or their appointees); (vi) that on cessation of the sub-contracted MOORS, **customer information given to the sub-contractor is deleted, destroyed or rendered unusable as soon as possible**, except where prohibited by written law or foreign law (for overseas arrangements), or where a branch/office stores it in a Bank system accessible only by the Bank after termination (fn 18: flexibility permitted for non-customer information).

**No FI counterpart at this level.** The FI Guidelines reach sub-contractors only through the provider-liability clause (¶5.5.2(j)) and the audit/access clauses (¶¶5.9.2–5.9.4), and never prescribe the contents of the sub-contract itself.

### [Bank-only] Bank ¶3.5.4 — 30-day notification of sub-contractor engagement

For **Notices ¶6.3(a)**, the service provider's notification to the Bank of its engagement of a sub-contractor should take place **no later than 30 days**; where later, the Bank should assess whether the provider had good reasons and work with it to secure prompter notifications in future. **No FI counterpart** (no 30-day or equivalent period appears anywhere in the FI Guidelines).

### Bank ¶3.6.1 ↔ FI ¶5.6.1 — Confidentiality: principle

Identical: public confidence in financial institutions being a cornerstone of the industry's stability and reputation, the institution must satisfy itself that the provider's security policies, procedures and controls enable protection of the confidentiality and security of customer information. **Change: none.**

### Bank ¶3.6.2 ↔ FI ¶5.6.2 — Confidentiality: required steps

Identical four steps: (a) state the parties' responsibilities in the agreement for adequacy and effectiveness of security policies and practices, including when each party may change security requirements; the agreement also addressing (i) which party bears losses on a breach and the provider's obligation to inform, and (ii) access to and disclosure of customer information — used by the provider and its staff **strictly for the contracted purpose**; (b) disclose customer information only on a **need-to-know basis**; (c) ensure the provider can protect the confidentiality of customer information, documents, records and assets, particularly in **multi-tenancy** settings (identically defined in a footnote); (d) review and monitor the provider's security practices regularly, including commissioning audits or periodic expert reports on confidentiality, security adequacy and compliance, and requiring the provider to disclose breaches of confidentiality of customer information.

**Change: none** (the Bank version's fn 9, noted above, ties the MOORS agreement provisions to Notices ¶7.1(a)–(c)).

### Bank ¶¶3.7.1–3.7.4 ↔ FI ¶¶5.7.1–5.7.4 — Business continuity management

Identical throughout: (¶.1) business continuity not to be compromised — critical business services and functions per the MAS BCM Guidelines and critical systems per the MAS Notice on Technology Risk Management; adopt BCM Guidelines practices. (¶.2) Mitigate interdependency risk so the institution can meet obligations on service disruption/failure, unexpected termination or provider liquidation, by: (a) contractual BCP requirements and verification that provider BCPs are satisfactory and commensurate; (b) proactive assurance on BCP preparedness — regular provider testing against recovery objectives, notification of test findings affecting performance, of substantial BCP changes, and of adverse developments substantially impacting the service; (c) plans and procedures for adverse conditions or termination, including continuation of business and prompt removal/deletion/destruction of documents, transaction records and information held by the provider. (¶.3) Involve providers in the institution's BCP validation and testing; optionally join the provider's BC/DR tests. (¶.4) Worst-case scenarios (unexpected termination, provider liquidation, wide-area disruption with collateral impact); higher preparedness where the institution is highly interdependent in the financial system; identify viable, non-prohibitive alternatives.

**Change: none.**

### Bank ¶3.8.1 ↔ FI ¶5.8.1 — Monitoring and control: structure

Identical: a management/control structure varying with the nature and extent of risks; more rigorous approach as materiality and complexity grow; proactive relationship with the provider (e.g. frequent meetings); agreements to contain monitoring-and-control clauses. **Change: none.**

### Bank ¶3.8.2 ↔ FI ¶5.8.2 — Monitoring and control: required measures

Bank lists **five** measures for any MOORS; FI lists **six** for any material outsourcing arrangement:

- **(a) Register of outsourcing arrangements** — both: readily accessible to board and senior management, promptly updated, part of governance reviews. *Difference:* the Bank version's fn 21 says registers should be submitted per the template at a stated link (no frequency); the FI version requires the register to contain the Annex 4 information, with submission at least annually or on request imposed by ¶4.1.1.
- **(b) Multi-disciplinary outsourcing management groups** (legal, compliance, finance; sufficient time and skilled manpower to plan and oversee the entire outsourcing lifecycle) — identical.
- **(c) Outsourcing management control groups** for ongoing monitoring of service delivery and confidentiality/security against agreed service levels, validated through provider auditors' reports or commissioned audits — identical.
- **(d) [FI-only] Periodic reviews, at least annually, of all material outsourcing arrangements** — to ensure the institution's outsourcing risk policies and procedures and the Guidelines are effectively implemented, ascertain adequacy of internal risk management and management information systems (e.g. effectiveness of processes and metrics evaluating provider performance and security), and highlight control deficiencies. **No Bank-Guidelines counterpart** (banks' periodic-review obligations arise under the Notices — cf. ¶3.3.6).
- **(e)/(d) Reporting policies and procedures** — identical: senior-management review; reports to the board for information; monitoring metrics and performance data **not aggregated** with other customers' data; adverse developments escalated to senior management of institution and provider (or the board where warranted) on a timely basis; prompt review of the relationship for modification or termination when adverse developments occur.
- **(f)/(e) Pre- and post-implementation reviews** of new or amended arrangements; fresh comprehensive due diligence on material amendment — identical.

### Bank ¶3.9.1 ↔ FI ¶5.9.1 — Audit and inspection: principle

Identical: outsourcing must not interfere with the institution's ability to manage its business or **impede MAS in carrying out its supervisory functions**. **Change: none.**

### Bank ¶3.9.2 ↔ FI ¶¶5.9.2–5.9.3 — Audit and MAS-access clauses

- **Bank ¶3.9.2:** all MOORS agreements to include clauses allowing the **Bank** to audit the provider and its sub-contractors (internal or external auditors, or Bank-appointed agents); the Bank should also obtain copies of any report or finding on the provider and sub-contractors (by their internal or external auditors or appointed agents) relating to the arrangement.
- **FI ¶5.9.2:** the same institution-audit and report-access clauses **(a)**, plus **(b)** clauses allowing **MAS, or any agent appointed by MAS, where necessary or expedient, to exercise the institution's contractual rights** to (i) access and inspect the provider and its sub-contractors and obtain records, documents, transactions and information given to, stored at or processed by them, and (ii) access any report and finding made on them.
- **FI ¶5.9.3:** material outsourcing agreements should also include clauses requiring the provider to **comply as soon as possible with any request from MAS or the institution** to submit reports on the security and control environment of the provider and its sub-contractors to MAS.

**Changes:** two FI-only contractual mechanisms — the MAS step-in access clause and the provider-reports-to-MAS clause. The Bank Guidelines need neither because MAS holds **statutory** inspection powers over banks' service providers (s 47A(10) Banking Act, recited at Bank ¶3.4.5(f)) and the Notices (¶7.1(d)) prescribe the binding audit-clause requirements.

### Bank ¶3.9.3 ↔ FI ¶5.9.4 — Sub-contractor coverage; notice of MAS inspections

Both extend the audit expectations to any sub-contractor the provider engages — expressly including **disaster recovery and backup service providers** — and both state MAS will endeavour to give reasonable notice of exercising its inspection rights and to share findings where appropriate.

**Two differences:** (i) the operative verb — the Bank should "**endeavour** to subject" sub-contractors to the audit requirements, whereas the FI institution should "**ensure** that these expectations are met"; (ii) FI ¶5.9.4's "these expectations" reaches back over both ¶5.9.2 **and** ¶5.9.3, so the FI ensure-obligation covers the MAS-access and reporting clauses too, while the Bank provision is audit-only.

### Bank ¶3.9.4 ↔ FI ¶5.9.5 — Independent audits and expert assessments

Identical: ensure independent audits and/or expert assessments (FI: "of **all** its outsourcing arrangements"); frequency set by nature and extent of risk and impact; scope to include the provider's and sub-contractors' security (physical and IT, per identical footnotes) and control environment, incident management for material breaches/disruptions/issues, and the institution's own observance of the Guidelines for the arrangement. **Change:** the word "all" (FI) — otherwise none.

### Bank ¶3.9.5 ↔ FI ¶5.9.6 — Who audits; remediation

Both: audits may be performed by the institution's internal or external auditors, the provider's external auditors, or agents appointed by the institution; auditors must have requisite knowledge and skills and be independent of the function performing the arrangement; senior management ensures timely remediation; adequate processes to complete remediation; provider fixes validated by the institution before closure; skilled persons involved to validate security measures where necessary.

**Two differences:** (i) the Bank version adds the express example "**e.g. audits commissioned by multiple Banks using the same service provider**" (pooled audits); (ii) the Bank footnote (fn 24) opens with the concession "**While audits need not be procured by banks**, a bank should conduct its own audits to supplement the audits performed by the service provider's auditors, where necessary" — the FI footnote (fn 18) omits the concession and keeps only the supplement expectation.

### Bank ¶3.9.6 ↔ FI ¶5.9.7 — Escalation

Identical: significant issues and concerns escalated to senior management of institution and provider (or the board where warranted) on a timely basis; review the arrangement if the risk is no longer within risk tolerance. **Change: none.**

### Bank ¶3.9.7 ↔ FI ¶5.9.8 — Reports to MAS

- **Bank:** copies of audit reports submitted to MAS **upon request**; other reports or information on the Bank and provider related to the arrangement also upon request.
- **FI:** "Copies of audit reports should be submitted by the institution to MAS." — **no "upon request" qualifier** on the audit-report limb; other reports/information upon request.

**Change:** the missing qualifier. On its face the FI expectation to submit audit reports is unconditional.

### [Bank-only] Bank ¶3.9.8 — Certifications, pooled audits, third-party certification

Audits/expert assessments performed as part of a **certification process** (but **not self-attestations**) may be relied on, provided the auditors are independent and competent; the Bank must satisfy itself that scope and methodology allow it to assess the provider's ability to perform (design, implementation, effectiveness of controls) and the adequacy of its risk management; **audit reports must fulfil the requirements set out in the Notices**; Banks may also rely on **pooled audits or third-party certification** performed by independent parties.

**No FI counterpart.** The FI Guidelines are silent on certification-based reliance.

### Bank ¶3.10.1 ↔ FI ¶5.10.1 — Outsourcing outside Singapore: country risk

Identical: country risk from foreign engagement or foreign performance; continuous due diligence on (a) government policies, (b) political/social/economic conditions, (c) legal and regulatory developments, (d) ability to monitor the provider and execute BCM plans and exit strategy; awareness of the provider's disaster recovery arrangements and locations; risks of physical or electronic transport of information to foreign primary/backup sites. **Change: none.**

### Bank ¶3.10.2 ↔ FI ¶5.10.2 — Outside Singapore: preserving MAS supervision

Both, for material arrangements with providers outside Singapore: (a) in principle contract only with providers in jurisdictions that generally uphold confidentiality clauses and agreements; (b) do not contract into jurisdictions where prompt access to information by MAS (or its agents) at the provider may be impeded by legal or administrative restrictions — with a minimum commitment to retrieve information readily from the provider on MAS request.

**Two FI-only additions:** in (b), the institution "should **confirm in writing to MAS**" that its outsourcing agreements provide MAS the rights of inspecting the provider and of access to the institution's and provider's information, reports and findings per ¶5.9; and **(c)** the institution should **notify MAS if any overseas authority seeks access to its customer information**, or if the ¶5.9 access rights of the institution and MAS "have been restricted or denied." Neither appears in the Bank Guidelines.

### Bank ¶¶3.11.1–3.11.2 ↔ FI ¶¶5.11.1–5.11.2 — Outsourcing within a group

Substantively identical: the Guidelines apply to intra-group arrangements (the Bank version adds "including subsidiaries of Singapore-incorporated banks"); expectations may be met within group-wide policies and procedures; on request, the institution provides information demonstrating group-wide board/senior-management oversight structures and processes; each version cross-refers its own foreign-incorporation paragraph (¶3.1.5 / ¶5.2.5). Intra-group due diligence may take a qualitative form — the provider's ability to address institution-specific risks, particularly BCM, monitoring and control, audit and inspection, **including confirmation of MAS's right of access** to preserve effective supervision, and compliance with local regulatory standards; respective roles and responsibilities documented in an SLA or equivalent. **Change: none of substance.** (Recall also FI ¶2.3's group-observance duty and the FI "service provider"/"group" definitions.)

### Bank ¶¶3.12.1–3.12.3 ↔ FI ¶¶5.12.1–5.12.3 — Outsourcing internal audit to external auditors

Identical bodies: independence concerns where one provider handles multiple engagements (internal audit plus external audit or consulting — it will not criticise its own work); ensure providers have expertise for complex, high-volume operations; as sound practice, do **not** outsource internal audit to the institution's own external audit firm; satisfy the auditor-independence standards of the Singapore accounting profession before outsourcing; periodic assessments of the provider's continuing ability (e.g. in line with the Quality Assurance and Improvement Program under the IIA International Standards).

**One footnote difference:** on departures from the no-own-external-auditor practice — Bank fn 26: "Any departure from this best practice should remain within the bounds of the applicable ethical standards for the statutory or external auditor." FI fn 20: any departure "should be **limited to small institutions** and should remain within the bounds of the applicable ethical standards…". On its face the Bank formulation permits any bank to depart (within ethical bounds), while the FI formulation confines departures to small institutions — the stricter version.

---

## PART FIVE — ANNEXES

### Bank Annex 1 ↔ FI Annex 3 — Material Outsourcing

Identical in all four paragraphs: (1) nine qualitative materiality factors — importance of the outsourced activity (contribution to income/profit); impact on earnings, solvency, liquidity, funding, capital and risk profile; impact on reputation, brand and business objectives on provider failure or breach; impact on customers; impact on counterparties and the Singapore financial market; cost as a proportion of total operating costs; cost of failure (in-housing or substitution) as a proportion of operating costs; aggregate exposure to a single provider; ability to maintain internal controls and meet regulatory requirements if the provider has operational problems. (2) Outsourcing all or substantially all risk management or internal control functions — compliance, internal audit, financial accounting, actuarial (other than certification activities) — is **deemed material**. (3) Periodic reviews to catch newly material arrangements (incremental services, volume increases, changed nature, sub-contracting changes). (4) Materiality assessed at entity **and** group level (with branches and controlled corporations).

**Change: none** — only the annex number and Bank/institution wording. (Note the different legal function: for FIs this guidance supplements the §3 binding-style definition of "material outsourcing arrangement"; for banks it is guidance toward the Notices' MOORS definition.)

### Bank Annex 2 ↔ FI Annex 5 — Cloud Computing

Identical in all eight paragraphs: definition of cloud services (SaaS/PaaS/IaaS); advantages (economies of scale, cost savings, quality administration, uniform security standards, scalability, resilience through distribution); private/public/hybrid models with distinct trade-offs; maturing provider security (strong authentication, access controls, tokenisation, encryption); **MAS treats cloud services operated by service providers as a form of outsourcing**; cloud risks are not distinct from other outsourcing — apply the Guidelines' due diligence and governance; be alert to multi-tenancy, data commingling and multi-location processing — address data access, confidentiality, integrity, **sovereignty**, recoverability, regulatory compliance and auditing; ensure the provider can clearly identify and segregate customer data with strong physical or logical controls, with robust access controls that **survive the tenure of the contract**; ultimate responsibility and accountability stay with the institution; risk-based oversight commensurate with materiality.

**Change: none.**

### [Bank-only] Bank Annex 3 — Applicability of Notices and Guidelines to Categories of Services

A decision tree over "relevant services" as defined in **s 47A(12) Banking Act 1970** (any service obtained or received by the bank other than from an employee in the course of employment or a director/officer in the course of appointment, excluding services specified by MAS by written notice):

1. **Non-Outsourced Relevant Services** — not subject to Notices or Guidelines; still require adequate risk management and sound internal controls.
2. **Non-Ongoing Outsourced Relevant Services** — not subject to Notices/Guidelines, **except** where the service involves disclosure of customer information, in which case Section C of the Notices and the Notices' outsourcing-register requirement apply; still require adequate risk management.
3. **Non-material Ongoing ORS** — subject to the Notices' register requirement (plus Section C where customer information is disclosed); Guidelines applied to a degree commensurate with risk.
4. **MOORS** — fully subject to the Notices and the Guidelines.

**No FI counterpart** — the taxonomy only exists because of the Notices. The FI regime's scope filter is instead its §3 definitions plus Annexes 1–2.

### [FI-only] FI Annex 1 — Exempted Outsourced Services

Two exemptions: (1) services **wholly provided by GovTech** or agents appointed by GovTech (full list at the Singpass API products page); (2) services **not for the conduct of any financial business** where the provider does not receive, handle or have access to the institution's confidential information or customer information — e.g. cleaning, gardening, pantry services including vending-machine maintenance. **Bank counterpart:** exemptions exist but are housed in Annex D of the Notices (not reproduced in the Bank Guidelines).

### [FI-only] FI Annex 2 — Examples of Outsourcing Arrangements

**Included examples (non-exhaustive), (a)–(o):** application processing (loan origination, credit cards); white-labelling (trading and hedging facilities); middle and back office operations (EFT, payroll, custody operations, quality control, purchasing, CIS participant registers and reports, order processing, trade settlement, risk management); business continuity and disaster recovery; claims administration (loan negotiations/processing, collateral management, bad-loan collection); document processing (cheques, card and bill payments, statements, corporate payments, statement printing); information systems hosting (SaaS/PaaS/IaaS); information systems management and maintenance (data entry/processing, data centres and facilities management, end-user support, LAN management, help desks, IT security operations); investment management (discretionary portfolio and cash management); management of policy issuance and claims by managing agents; manpower management (benefits/compensation administration, staff appointment, training and development); marketing and research (product development, data warehousing/mining, media relations, call centres, telemarketing); professional services related to the business (accounting, internal audit, actuarial, compliance); archival, storage and destruction of data and records; calculation of financial benchmarks.

**Generally NOT outsourcing:** (a) industry-characteristic third-party services — custody with specified custodians under SF(LCB)R reg 27; telecommunications and public utilities (electricity, SMS gateways); postal services; market information services (Bloomberg, Moody's, S&P); common network infrastructure (Visa, MasterCard, MEPS+); clearing and settlement arrangements between clearing houses/settlement institutions and members; regulator-overseen global financial messaging (SWIFT); correspondent banking; (b) introducer and principal-agent arrangements — insurance agents and ancillary sales services, underwriting agents, introducers with no contractual customer relationship; (c) arrangements the institution cannot legally or administratively provide itself — statutory audit and independent audit assessments; discrete advisory (legal opinions, independent appraisals, trustees in bankruptcy, loss adjusters); independent consulting where in-house expertise is absent.

**No Bank counterpart** — banks classify services through the Notices' categories and Annex 3's chart.

### [FI-only] FI Annex 4 — Register of Outsourcing Arrangements

An institution should maintain an updated register of **all existing outsourcing arrangements** in the format of the template on the MAS website (submission at least annually or upon request per ¶4.1.1). **Bank counterpart:** the template link at fn 21 to ¶3.8.2(a), with register content and submission requirements otherwise governed by the Notices.

---

## CLOSING NOTE

Reading the two instruments sequentially, the pattern is consistent: the **shared core** (board/senior management, risk evaluation, due diligence, confidentiality, BCM, monitoring structure, audit mechanics, overseas and intra-group outsourcing, internal audit, cloud, materiality factors) is carried over essentially verbatim from the pre-2023 single Guidelines into both instruments. Every divergence traces to one root cause: **banks have a binding Notice layer and s 47A Banking Act statutory powers behind their Guidelines; non-bank FIs do not.** So the Bank Guidelines add Notice-interpreting and banking-secrecy provisions (¶¶3.2.3, 3.3.6, 3.4.5–3.4.7, 3.5.2–3.5.4, 3.9.8, Annex 3) and strip out anything the Notices now do (definitions, register frequency, exemption list, corporate-event termination triggers, MAS access rights), while the FI Guidelines retain and extend the self-contained 2016/2018 apparatus (definitions, annual register, contractual MAS access and reporting clauses, written confirmations and notifications for offshore arrangements, annual reviews, and the exemptions and examples annexes).

*This breakdown is based on a full reading of both official PDFs; the substance of every paired comparison was verified by three independent adversarial review passes against the source texts, with regime context separately verified against MAS Circular ID 19/23, MAS's consultation response, and practitioner analyses.*
