# Singapore data protection: adversarial review of seven-slide propositions (HF/OpenAI incident presentation)

Reviewed 12 November 2026. Source group document: `/root/.claude/uploads/4554aee0-a4f0-5dad-8d6d-91e6563403b9/f24041a0-Digi_Presentation_G1.md`. Note: the slide strings "ss 26C-26D put the duty on the data holder", "s 26C(2): duty to assess starts at 'reason to believe'", "s 48J: negligence weighed in penalties", "PDPC: 3 days · Customers: without undue delay" and "PDPA ss 11, 12, 24..." are not in that file (it holds the script); they were reviewed as given in the brief.

## Sources used and their status

| Label | What | Copy used / version | Status |
|---|---|---|---|
| ACT | Personal Data Protection Act 2012 (2020 Rev Ed) | Third-party archive of Singapore Statutes Online ("Archived by Legal Wires"), https://littdb.sfo2.cdn.digitaloceanspaces.com/litt/SG/SSOStatutes/acts/PDPA2012.html . States it incorporates amendments to 1 Dec 2021, in operation 31 Dec 2021, with notes of amendments "wef 01/10/2022". **Not checked against the live SSO text; amendments after 2021 not verified.** SSO itself (sso.agc.gov.sg) returned HTTP 403; CommonLII returned a Cloudflare block; lawplayer.com returned 403. | Exact strings matched in raw downloaded text |
| REGS | PDP (Notification of Data Breaches) Regulations 2021 (S 64/2021) | Same archive, https://littdb.sfo2.cdn.digitaloceanspaces.com/litt/SG/SSOStatutes/subsidiary_legislation/PDPA2012-S64-2021.html (includes amendments noted S 735/2021) | Exact strings matched in raw text |
| REED | Reed, Michael v Bellingham, Alex (Attorney-General, intervener) [2022] SGCA 60 | eLitigation, https://www.elitigation.sg/gd/s/2022_SGCA_60 ("Version No 1: 09 Sep 2022"; page last updated 19 Oct 2026) | Exact strings matched in raw text |
| KC | PDPC, Advisory Guidelines on Key Concepts in the PDPA | PDPC PDF, "Revised 29 April 2026" (URL ends `advisory-guidelines-on-key-concepts-in-the-pdpa-17-may-2022.pdf` but the cover says revised 29 April 2026) | Exact strings matched (pdftotext) |
| DBG | PDPC, Guide on Managing and Notifying Data Breaches under the PDPA, revised 15 March 2021 | https://www.pdpc.gov.sg/-/media/Files/PDPC/PDF-Files/Other-Guides/Guide-on-Managing-and-Notifying-Data-Breaches-under-the-PDPA-15-Mar-2021.pdf | Exact strings matched (pdftotext) |
| SH | Singapore Health Services Pte Ltd & Ors [2019] SGPDPC 3 | Singapore Law Watch copy of the PDPC decision, https://www.singaporelawwatch.sg/Portals/0/Docs/Judgments/2019/%5B2019%5D%20SGPDPC%203.pdf ; PDPC media release 15 Jan 2019 https://www.pdpc.gov.sg/-/media/Files/PDPC/PDF-Files/Press-Room/2019/Media-Release---SingHealth-and-IHIS_15-Jan-2019.pdf | Exact strings matched (pdftotext) |
| MGF | IMDA, Model AI Governance Framework for Agentic AI, v1.5, published 20 May 2026 (updated 5 June 2026), 53 pp | https://www.imda.gov.sg/-/media/imda/files/about/emerging-tech-and-research/artificial-intelligence/mgf-for-agentic-ai.pdf (URL works) | Exact strings matched (pdftotext); absence claims are by text search of the whole PDF |
| ADV | IMDA "Advisory for ICM Sector: OpenAI Agent Escaped Sandbox to Compromise Hugging Face AI Repository" (3 pp) | https://www.imda.gov.sg/assets/d67062a6-6347-4995-ad49-910072e154b0.pdf | Exact strings matched (pdftotext) |
| CMA | Computer Misuse Act 1993 (2020 Rev Ed) | Same archive family, https://littdb.sfo2.cdn.digitaloceanspaces.com/litt/SG/SSOStatutes/acts/CMA1993.html | Read by text search; no reporting duty found |
| CSA | Cybersecurity Act 2018 and 2024 Amendment Act | Primary text not retrieved (archive and SSO denied). | Secondary only (law-firm notes via search) |

All "exact string matched" quotations below were checked by grep against the converted raw text of the downloaded file.

## Verdict table

| # | Proposition | Verdict | One-line correction |
|---|---|---|---|
| 1 | s 24 requires reasonable security arrangements | Correct with qualification | Right, but add "personal data in its possession or under its control" and the targets (unauthorised access etc.). "Protection obligation" is PDPC's label, not the Act's. |
| 2 | "ss 11, 12, 24: reasonable person; foreseeable harm raises the bar" | Wrong (as a statement of those sections) | Only s 11(1) is the reasonable-person provision; s 12 is policies and practices; s 24 says "reasonable security arrangements". "Foreseeable harm raises the bar" is PDPC guidance (Key Concepts 17.2-17.3), not statute. |
| 3 | Breach notification: 500+, three calendar days | Correct with qualification | 3 days runs from the day after the organisation's own assessment that the breach is notifiable, not from discovery. 500 is in Reg 4, not the Act. A breach is notifiable on significant harm OR significant scale. Individuals must be told only for significant-harm breaches. |
| 4 | Hosting for enterprise customers: alert "immediately" | Wrong | s 26C(3)(a): "without undue delay", to the organisation the intermediary processes for. Slide wording "without undue delay" is right; the script's "immediately" is not. A data intermediary has no PDPC 3-day duty; that sits with its principal. |
| 5 | s 26C(2): starts at "reason to believe" | Correct with qualification | Section and trigger right; add "reasonable and expeditious manner". PDPC guidance: generally within 30 calendar days (Key Concepts 20.4; Guide of 15 Mar 2021). PDPC's gloss on the trigger is "credible grounds to believe". |
| 6 | ss 26C-26D put the duty on the data holder; nothing on the outsider | Correct with qualification | Accurate for who holds the data, but the duty also reaches anyone (including the developer) whose possession or control holds the affected personal data, e.g. staged copies. 26C(3) and 26E put a separate duty on data intermediaries. |
| 7 | "s 48J: negligence weighed in penalties" | Wrong | Intentional or negligent contravention is the threshold for a penalty, not a weighing factor. Cap for contraventions from 1 Oct 2022: 10% of Singapore annual turnover if that exceeds $10m, else $1m. The 48J(6) factors do not list negligence. |
| 8 | s 48O / Reed holdings | Correct with qualification | Citation [2022] SGCA 60 right. Decided under s 32, not 48O (s 48O is the renumbered s 32). Paragraphs: distress [99], [107], [132]-[134]; loss of control [108]-[110]; direct causation and non-trivial [93], [102]. SLR citation could not be verified. |
| 9 | OpenAI "collected" data contrary to s 13 | Correct with qualification | Arguable on the text and PDPC's definition of collection (obtaining control or possession, "actively or passively"). No decision or guidance on automated or AI-agent collection found. Attribution of agents' acts and any s 13 exceptions not tested. |
| 10 | "Negligence won't compensate mere distress. The PDPA can." | Correct with qualification | Distress is "loss or damage" (Reed [107]) but must be real, direct and non-trivial, caused by an organisation's contravention of Parts 4-6B, and s 48O(2) delays suit after a PDPC decision. Not "mere" distress. |
| 11 | SingHealth and IT vendor fined | Correct | [2019] SGPDPC 3; SingHealth $250,000; Integrated Health Information Systems Pte Ltd (IHiS) $750,000; total $1m. |
| 12 | IMDA framework: monitor "around the clock", "completely voluntary", "for commercial deployment, not lab testing" | Wrong in part | "Limit access" supported. "Around the clock" is not in the text (it says continuously monitor). "Voluntary" appears nowhere in the framework. It is aimed at organisations deploying agents, in-house or third-party, including internal-facing agents, not "commercial" only. IMDA's July 2026 advisory addresses organisations "running autonomous agents and evaluations" directly. |
| 13 | No existing duty to notify victim or CSA | Correct with qualification (could not exhaust) | Nothing found in the PDPA, CMA or (secondary) Cybersecurity Act requiring a developer to tell the victim or CSA. But PDPA ss 26C-26D may require the developer to assess and notify the PDPC, and individuals, for staged personal data. "Not the public" is too strong. |

---

## 1. Section 24 (protection obligation)

- Text (ACT, s 24; exact string matched): "An organisation must protect personal data in its possession or under its control by making reasonable security arrangements to prevent — (a) unauthorised access, collection, use, disclosure, copying, modification or disposal, or similar risks; and (b) the loss of any storage medium or device on which personal data is stored."
- "Protection Obligation" is a PDPC label: KC para 17.1 ("referred to in these Guidelines as the Protection Obligation"; exact match).
- Data intermediaries are also bound by s 24: ACT s 4(2) ("Parts 3, 4, 5, 6 (except sections 24 and 25) ... do not impose any obligation on a data intermediary"; exact match).
- Status: exact string matched in raw source.
- Slide wording: "s 24: an organisation must make reasonable security arrangements to protect personal data in its possession or under its control."
- Footnote: Personal Data Protection Act 2012 (2020 Rev Ed) s 24.

## 2. Sections 11, 12, 24

- s 11(1) (exact): "In meeting its responsibilities under this Act, an organisation must consider what a reasonable person would consider appropriate in the circumstances." s 11(2): "An organisation is responsible for personal data in its possession or under its control." s 11(3)-(6): data protection officer designation and public contact.
- s 12 (exact): "An organisation must — (a) develop and implement policies and practices that are necessary for the organisation to meet the obligations of the organisation under this Act; (b) develop a process to receive and respond to complaints ...; (c) communicate to its staff ...; (d) make information available on request ...". It has no reasonable-person test.
- s 24 uses "reasonable security arrangements" and does not say "reasonable person".
- PDPC on s 11(1) (KC, Reasonableness section; exact): "Section 11(1) does not impose a separate obligation on organisations but requires them to consider 'what a reasonable person would consider appropriate in the circumstances'". Objective standard: "judged based on an objective standard".
- "Foreseeable harm raises the bar": not in the Act. The nearest PDPC guidance is KC 17.2 ("taking into consideration the nature of the personal data ... and the possible impact to the individual concerned if an unauthorised person obtained, modified or disposed of the personal data") and 17.3(a) ("fit the nature of the personal data held ... and the possible harm that might result from a security breach"). The phrase "all reasonably foreseeable risks" in KC appears in the legitimate-interests discussion (collection for lawful purposes), not in the protection-obligation chapter.
- Status: statute and guidance exact string matched.
- Slide wording: "s 24: reasonable security arrangements. s 11(1): judged by what a reasonable person would consider appropriate. s 12: policies and practices. PDPC guidance: more sensitive data and greater potential harm call for stronger security."
- Footnote: Personal Data Protection Act 2012 (2020 Rev Ed) ss 11(1), 12, 24; Personal Data Protection Commission, Advisory Guidelines on Key Concepts in the Personal Data Protection Act (revised 29 April 2026) paras 17.2-17.3.

## 3. Data breach notification

- s 26B(1) (exact): a data breach is notifiable if it "(a) results in, or is likely to result in, significant harm to an affected individual; or (b) is, or is likely to be, of a significant scale."
- s 26B(3)(a): deemed significant scale "if the data breach affects not fewer than the prescribed number of affected individuals".
- The number: REGS reg 4 (exact): "For the purposes of section 26B(3)(a) of the Act, the prescribed number of affected individuals is 500." So "500 or more" is correct, and the figure is in the Regulations, not the Act.
- Significant harm: s 26B(2) deems it for prescribed data; REGS reg 3(1)(a) (full name/alias/ID number plus Schedule data such as account numbers, income) and reg 3(1)(b) (account identifier plus password or access code). Relevant here: harvested credentials fall within reg 3(1)(b) if tied to an individual's account with an organisation.
- Internal breaches excluded: s 26B(4).
- Time limit (exact), s 26D(1): "must notify the Commission as soon as is practicable, but in any case no later than 3 calendar days after the day the organisation makes that assessment." The clock starts at the organisation's assessment/determination that the breach is notifiable, not at discovery. DBG fn 6 (exact): "The first day of the three days starts on the day after the organisation makes the determination that there is a notifiable breach ... if an organisation determines on 1st January that a data breach is notifiable, it must notify the Commission by 4th January."
- Individuals, s 26D(2) (exact): "on or after notifying the Commission under subsection (1), the organisation must also notify each affected individual affected by a notifiable data breach mentioned in section 26B(1)(a) in any manner that is reasonable in the circumstances." So only significant-harm breaches (limb (a)), not scale-only breaches, and "on or after" PDPC notification. Exceptions: s 26D(5) (remedial or technological measures), (6) (law enforcement or PDPC direction), (7) (PDPC waiver).
- Script: "If personal data was compromised at scale, say affecting 500 or more people, ... three calendar days to notify the PDPC once they've assessed the breach." Accurate. Gaps: omits significant harm limb, omits duty to individuals, and "just three days" omits that the assessment comes first (see 5).
- Status: exact string matched in raw source.
- Slide wording: "Notifiable if likely significant harm, or 500+ people affected. Tell the PDPC within 3 calendar days of assessing it notifiable; tell affected individuals too if significant harm."
- Footnote: Personal Data Protection Act 2012 (2020 Rev Ed) ss 26B, 26D; Personal Data Protection (Notification of Data Breaches) Regulations 2021 (S 64/2021) regs 3-4.

## 4. Data intermediary

- s 26C(3)(a) (exact): "Where a data intermediary (other than a data intermediary mentioned in section 26E) has reason to believe that a data breach has occurred in relation to personal data that the data intermediary is processing on behalf of and for the purposes of another organisation — (a) the data intermediary must, without undue delay, notify that other organisation of the occurrence of the data breach; and (b) that other organisation must, upon notification by the data intermediary, conduct an assessment of whether the data breach is a notifiable data breach."
- "Immediately" is wrong; the statutory words are "without undue delay". Slide "Customers: without undue delay" is right.
- Recipient is "that other organisation" (the principal), not "customers" generally and not the end individuals.
- s 4(2) (exact): Parts 6A (except sections 26C(3)(a) and 26E) "do not impose any obligation on a data intermediary" processing under a written contract. So a data intermediary has no s 26C(2) assessment duty and no s 26D PDPC duty; the PDPC 3-day clock belongs to the principal after its own assessment. The slide pairing "PDPC: 3 days · Customers: without undue delay" is therefore misleading if both are said to be Hugging Face's duties for hosted data; it holds only if HF-SG also holds the data for its own purposes.
- s 26E: separate duty, "without undue delay", for a data intermediary of a public agency.
- PDPC wording: KC, "Obligations of data intermediaries" section ("the data intermediary is required to notify the organisation without undue delay from the time it has credible grounds to believe that the data breach has occurred"; exact match).
- Status: exact string matched in raw source.
- Slide wording: "Hosting data for a customer organisation: tell that customer without undue delay (s 26C(3)(a)). The customer then assesses and, if notifiable, tells the PDPC."
- Footnote: Personal Data Protection Act 2012 (2020 Rev Ed) ss 4(2), 26C(3)(a), 26E.

## 5. Section 26C(2)

- s 26C(2) (exact): "Subject to subsection (3), where an organisation has reason to believe that a data breach affecting personal data in its possession or under its control has occurred, the organisation must conduct, in a reasonable and expeditious manner, an assessment of whether the data breach is a notifiable data breach."
- s 26C(4): assessment must follow prescribed requirements.
- Guidance on speed: KC para 20.4 (exact): "organisations should generally do so within 30 calendar days. If an organisation is unable to complete its assessment within 30 days, it would be prudent for the organisation to be prepared to provide the Commission an explanation". KC 20.3: "Any unreasonable delay in assessing a data breach will be a breach of the DBN Obligation". DBG says the same (exact: "within 30 calendar days"; trigger worded "credible grounds to believe"). The 30 days is guidance, not a statutory limit.
- Status: exact string matched.
- Slide wording: "s 26C(2): assess 'in a reasonable and expeditious manner' once there is reason to believe a breach has occurred. PDPC guidance: generally within 30 days."
- Footnote: Personal Data Protection Act 2012 (2020 Rev Ed) s 26C(2); PDPC, Advisory Guidelines on Key Concepts (revised 29 April 2026) paras 20.2-20.4; PDPC, Guide on Managing and Notifying Data Breaches under the PDPA (revised 15 March 2021).

## 6. "ss 26C-26D put the duty on the data holder"

- The duty attaches to the organisation with the data "in its possession or under its control" (s 26C(2); exact), not to whoever caused the breach. s 24 has the same hook.
- Data intermediaries: a separate notification duty (s 26C(3)(a), s 26E).
- Outside party: the Act has no duty triggered merely by causing a breach. But "data breach" includes "unauthorised access, collection, use, disclosure, copying, modification or disposal of personal data" (s 26A, exact). If the developer's agents copied and staged personal data, that data may be in the developer's possession or control, so the developer itself may have s 26C(2) (assess) and then s 26D duties, and s 24 duties over the staged copy. This is an inference from the text; no decision or guidance found applying it to AI agents.
- Consequence for the script: "hard legal duties ... fall entirely on the victim" is overstated, and "How many people did Singapore law require them to tell? Zero" should be hedged.
- Status: exact string matched; the application is my inference, flagged as untested.
- Slide wording: "Duties under ss 26C-26D fall on whoever has the data in its possession or control. If the developer holds copies of the personal data, they may apply to it too."
- Footnote: Personal Data Protection Act 2012 (2020 Rev Ed) ss 24, 26A, 26C, 26D.

## 7. Section 48J

- s 48J(1) (exact): "the Commission may, if it is satisfied that — (a) an organisation has intentionally or negligently contravened any provision of Part 3, 4, 5, 6, 6A or 6B; or (b) a person has intentionally or negligently contravened — (i) any provision of Part 9; or (ii) section 48B(1), require, by written notice, the organisation or person ... to pay a financial penalty."
- So intention or negligence is a condition of the power. It is not one of the weighed factors.
- s 48J(2): does not apply where the breach is an offence.
- Cap, s 48J(3) (exact, as marked "wef 01/10/2022"): organisation, "in the case of a contravention on or after the date of commencement of section 24 of the Personal Data Protection (Amendment) Act 2020 by an organisation whose annual turnover in Singapore exceeds $10 million — 10% of the annual turnover in Singapore of the organisation; (b) in any other case — $1 million."
- Factors, s 48J(6)(a)-(j): nature, gravity, duration; type of personal data; financial benefit; mitigation; adequate measures; prior failures; compliance with directions; proportionality and deterrence; impact on the organisation; other matters. Negligence is not listed.
- Caveat: the archive is dated to 2021 revisions; any amendment after Dec 2021 is unchecked. SingHealth (2019) was decided under the earlier $1m cap.
- Status: exact string matched.
- Slide wording: "s 48J: PDPC may fine only for an intentional or negligent breach. Cap: 10% of Singapore turnover (if over $10m), otherwise $1m. It then weighs gravity, data type, mitigation and similar factors."
- Footnote: Personal Data Protection Act 2012 (2020 Rev Ed) s 48J(1), (3), (6).

## 8. Section 48O and Reed v Bellingham

- s 48O(1) (exact): "A person who suffers loss or damage directly as a result of a contravention — (a) by an organisation of any provision of Part 4, 5, 6, 6A or 6B; or (b) by a person of any provision of Division 3 of Part 9 or section 48B(1), has a right of action for relief in civil proceedings in a court." s 48O(2): where the PDPC has decided on the contravention, no action "until after the decision has become final as a result of there being no further right of appeal." s 48O(3): injunction or declaration, damages, other relief. "Formerly s 32": consistent with the case, which is entirely under s 32 (the judgment contains no reference to s 48O).
- Citation: Reed, Michael v Bellingham, Alex (Attorney-General, intervener) [2022] SGCA 60, Court of Appeal, Civil Appeal No 174 of 2020, Menon CJ, Phang JCA, Prakash JCA, judgment delivered by Prakash JCA, 9 September 2022 (REED header; exact). The judgment states it is subject to correction "for publication in LawNet and/or the Singapore Law Reports", but the text shows no SLR reference. **Singapore Law Reports citation: could not verify.** (I have a recollection of [2022] 2 SLR 1156 but have not confirmed it and it should not go on a slide unless checked on LawNet or SAL.)
- (a) Emotional distress is "loss or damage": [107] (exact): "We thus hold that Parliament did not intend to exclude emotional distress from the meaning of 'loss and damage' in s 32(1)." Also [99] (denuded of practical use), [132]-[134] (conclusion; [134]: "the appellant's emotional distress is a form of 'loss or damage' within the meaning of s 32(1)"). Correct.
- (b) Loss of control: [108]-[110] (exact [108]: "loss of control of personal data does not constitute 'loss or damage' under the section"; [110] "tautologous"). The Court's own summary says "mere loss of control". Correct, but say "mere".
- (c) "Directly" and non-trivial: [93] (exact): "a strict causal link is prescribed in s 32(1). The 'loss or damage' must have been suffered 'directly as a result of a contravention'" and "trivial annoyance or negative emotions which form part of the vicissitudes of life will not be actionable"; [102(a)] refers to "the direct causal requirement and the de minimis principle"; [116] (ordinary vicissitudes of life are not emotional distress). Correct, but these are limits the Court identified as answers to the floodgates argument, and the wording "must not be trivial" is a paraphrase (the Court cites "more than trivial" from Lloyd at [93]).
- Also relevant: [115] multi-factorial test for proving distress, including the nature of the data and the defendant's conduct; [94] type of data is relevant but not a precondition.
- Status: exact string matched in raw source (citation and paragraphs); SLR unverified.
- Slide wording: "Reed v Bellingham (CA, 2022, decided under s 32, now s 48O): emotional distress is 'loss or damage' [107]; mere loss of control is not [108]-[110]; loss must follow directly from the breach and be more than trivial [93], [102]."
- Footnote: Reed, Michael v Bellingham, Alex (Attorney-General, intervener) [2022] SGCA 60 at [93], [99], [102], [107]-[110], [134] (decided under s 32 of the Personal Data Protection Act 2012 (2012 Rev Ed), now s 48O of the 2020 Rev Ed). [Add SLR citation only once verified.]

## 9. s 13 and collection by an AI agent

- s 13 (exact): "An organisation must not, on or after 2 July 2014, collect, use or disclose personal data about an individual unless — (a) the individual gives, or is deemed to have given, his or her consent ...; or (b) the collection, use or disclosure ... without the individual's consent is required or authorised under this Act or any other written law."
- "Collect" is undefined in the Act. KC (Collection, Use and Disclosure; exact): "Collection refers to any act or set of acts through which an organisation obtains control over or possession of personal data." and "collection, use and disclosure may take place actively or passively. Both forms ... are subject to the same obligations". This supports the group's "arguably" and answers "nobody chose to collect": there is no intention element in the definition.
- Against: the Act regulates "organisations"; attribution of an AI agent's acts to the developer is not addressed in anything I found. The Act's employee carve-out (s 4(1)(b)) concerns individuals, not the organisation (Reed [43]-[54] on the employee exemption). No PDPC decision or guidance on automated, scraped or agent-driven collection was found. (The KC guidelines and PDPC AI guidelines I searched deal with consent and business-improvement exceptions, not unauthorised system intrusion.)
- Group document already says "open question rather than a firm claim"; that is the right framing. A stronger route may be s 24 or s 26C-26D on the staged copy (see 6).
- Status: statute and guidance exact string matched; negative finding (no decision) is "not found", not proof of absence.
- Slide wording: "Open question: if its agents copied personal data, was OpenAI-SG 'collecting' it without consent (s 13)? PDPC treats collection as obtaining possession or control, active or passive. No decision on AI agents."
- Footnote: Personal Data Protection Act 2012 (2020 Rev Ed) s 13; PDPC, Advisory Guidelines on Key Concepts (revised 29 April 2026), "Collection, Use and Disclosure".

## 10. "Negligence won't compensate mere distress. The PDPA can."

- PDPA half supported by Reed [107], [134] (see 8). But qualify: (i) claimant must prove actual distress and not ordinary vicissitudes ([115]-[116]); (ii) loss must be direct ([93]); (iii) a contravention of Parts 4-6B by an organisation is required, so the claim lies against the organisation that breached s 24 and not against a hacker or an outsider who is not in breach (s 48O(1)); (iv) s 48O(2) postpones the action until a PDPC decision is final; (v) a bare data loss with no proven distress is not loss (loss of control [110]).
- "Mere distress" is inaccurate: the Court required distress that is real and non-trivial.
- Status: exact string matched.
- Slide wording: "Under s 48O, emotional distress counts as loss (Reed), if real, non-trivial and directly caused by the organisation's breach. The claim lies against the organisation in breach."
- Footnote: as 8.

## 11. SingHealth

- Citation: Singapore Health Services Pte. Ltd. & Ors. [2019] SGPDPC 3, Commissioner Tan Kiat How, Case No DP-1807-B2435, decision dated 14 January 2019 (published 15 January 2019). Organisations: SingHealth and Integrated Health Information Systems Pte Ltd (IHiS) ([3], exact).
- Amounts (exact): [136] "directs SingHealth to pay a financial penalty of $250,000"; [137] "directs IHiS to pay a financial penalty of $750,000". Total $1m, "the highest ever imposed by PDPC to-date" (media release). Basis: protection obligation, s 24 (decision headnote "Protection obligation"; "Data intermediary"). IHiS had been appointed by SingHealth to operate its patient database system (media release fn 1).
- Secondary only: IHiS was renamed Synapxe in July 2023 (search summary from a law-firm note; not confirmed).
- The group's other point (Committee of Inquiry, not CMA, as the route) is a separate claim not checked here.
- Status: exact string matched.
- Slide wording: "SingHealth breach: PDPC fined SingHealth $250,000 and its IT operator IHiS $750,000 under s 24."
- Footnote: Singapore Health Services Pte Ltd & Ors [2019] SGPDPC 3 at [136]-[137].

## 12. IMDA framework and advisory

Document checked: Model AI Governance Framework for Agentic AI, Version 1.5, published 20 May 2026, updated 5 June 2026.

- "Limit what agents can access": supported. Executive Summary (exact): "organisations could limit their agents' scope of impact by designing appropriate boundaries at the planning stage, such as limiting access to tools and external systems". Also section 2.1.2 and the least-privilege item "Apply the principle of least privilege to limit tools available to each agent".
- "Monitor them around the clock": overstated. Text says (2.3.3, exact): "Organisations should continuously monitor and log agent behaviour post-deployment" and "continuously monitor them in production"; also "real-time" detection. The only "24/7" in the document is a case study of Stability Solutions' agents "run 24/7", not a recommendation. The framework itself says "continuous human oversight over all agent workflows becomes impractical at scale" (Executive Summary). Use "continuously monitor" and say after deployment.
- "Completely voluntary": the word "voluntary" (and "mandatory", "binding", "legal") does not appear in the framework text (searched). It is a guidance document ("emerging best practices", "living document", uses "should/could"); it creates no statutory duty I could find, so "not legally binding" is a fair inference but "completely voluntary" is not stated by the document. Say "guidance, not law".
- "Written for commercial deployment, not internal lab testing": not supported as put. Executive Summary (exact): "The MGF is targeted at organisations looking to deploy agentic AI, whether by developing AI agents in-house or using third-party agentic solutions." It is not limited to commercial use: case studies include internal-facing agents (e.g. Stability Solutions "internal-facing" agents, PwC internal agents, GovTech employees). It includes pre-deployment testing (2.3.2, "Before deploying, test agents", with sandboxes and "properly configured execution environment"). What is fair: it is about deploying agents to do tasks, and it does not address capability or dangerous-capability evaluation of frontier models (no discussion of frontier-model evaluation found). So: "built for deploying agents, and silent on frontier-model evaluations."
- Advisory (IMDA, "Advisory for ICM Sector: OpenAI Agent Escaped Sandbox to Compromise Hugging Face AI Repository", citing OpenAI's report published 21 July 2026; the advisory's own issue date is not shown on the document). Exact: "IMDA recommends that organisations running autonomous agents and evaluations, and those consuming or hosting models on AI platforms, regularly validate and harden their security controls". Headed recommendations "Organisation running autonomous agent and evaluations: Run evaluation agents, including cyber-capable LLM agents, in environments treated as untrusted workloads with strict sandboxing, network isolation, minimal filesystem visibility, and define target systems ... Log every agent action". It also "encourages organisations to conduct formal risk assessments". Effect: IMDA itself addresses agent evaluations, after the incident, so the "not for testing" claim cannot be used to say IMDA guidance is silent on evaluation. It is still a recommendation (no binding language such as "must"), so it supports the script's point that there was no hard legal duty, but shows IMDA expects evaluation labs to sandbox and log. It also postdates the incident, so it cannot show what the lab should have known in May-July 2026; the framework (May 2026) did predate it.
- Status: exact string matched in raw PDF text; absence claims by full-text search.
- Slide wording: "IMDA's framework (May 2026) is guidance, not law. It recommends limiting agent access and continuous monitoring. It targets organisations deploying agents and does not address frontier-model evaluation. IMDA's July 2026 advisory tells organisations running agent evaluations to sandbox, isolate and log."
- Footnote: Infocomm Media Development Authority, Model AI Governance Framework for Agentic AI (Version 1.5, published 20 May 2026, updated 5 June 2026) executive summary and ss 2.1.2, 2.3.2, 2.3.3; IMDA, Advisory for ICM Sector: OpenAI Agent Escaped Sandbox to Compromise Hugging Face AI Repository (July 2026) <https://www.imda.gov.sg/assets/d67062a6-6347-4995-ad49-910072e154b0.pdf>.

## 13. "Originator notification duty": is there truly no existing duty?

- PDPA: no duty to notify the victim organisation or CSA. But see 6: if personal data is in the developer's possession or control, ss 26C-26D can require an assessment and notice to the PDPC and, for significant harm, to affected individuals (s 26D(2)). s 26D(9) says these apply concurrently with duties under other laws. So "Not the public" and "Zero" are too strong, though the victim and CSA are right.
- Computer Misuse Act 1993 (CMA, 2020 Rev Ed archive): offences in ss 3-9 (including s 9, personal information obtained by contravention); text search found no reporting or notification duty. Status: read by text search of raw archive.
- Criminal Procedure Code: a general duty to report certain offences to police may exist (I recall s 424) but the archive copy did not contain that provision and I could not verify it. Unverified; could not verify whether it reaches CMA offences.
- Cybersecurity Act 2018: incident reporting duties fall on owners of designated critical information infrastructure (CII) and, since the Cybersecurity (Amendment) Act 2024, certain other regimes. Secondary sources (law-firm notes found by search): parts of the amendment commenced 31 October 2025, including Part 3A (third-party owned CII) and Part 3B (systems of temporary cybersecurity concern); the Parts on Entities of Special Cybersecurity Interest (3C) and foundational digital infrastructure (3D) were reported as not yet in force at the time of those notes. Primary text and any later commencement not verified. None of this is a duty on an unrelated developer to report its own system's intrusion into someone else's systems.
- Sector rules (e.g. MAS notices for financial institutions): not checked; they bind regulated entities and are unlikely to cover an AI developer. Unverified.
- Verdict: the premise holds for victim/CSA on what I could check, but cannot be called exhaustively verified; and the PDPA qualification matters. Safer slide wording: "We found no Singapore law that requires a developer to tell the victim or CSA about an unauthorised intrusion by its own AI system. PDPA ss 26C-26D may require notice to the PDPC and affected individuals if it holds the personal data."
- Footnote: Personal Data Protection Act 2012 (2020 Rev Ed) ss 26A-26D; Computer Misuse Act 1993 (2020 Rev Ed) ss 3-9; Cybersecurity Act 2018 (2020 Rev Ed) and Cybersecurity (Amendment) Act 2024.

---

## Remaining uncertainties

1. Statute copy is a third-party archive of the 2020 Rev Ed (to 1 Dec 2021 with 2022 commencement notes); SSO was blocked. Any amendment after 2021 (including to ss 48J, 26B, Regulations) is unchecked. Confirm on SSO before presenting.
2. Reed SLR citation not verified. Do not print one without checking LawNet or SAL.
3. Cybersecurity Act: no primary text retrieved; commencement status of Parts 3C/3D is from law-firm notes. CPC s 424 and sector rules not verified.
4. Whether a developer's agents' acts are attributed to it under the PDPA for s 13 or s 24 is not resolved in anything found. No decision on AI-agent collection found; absence of a decision is "not found" only.
5. Whether staged copies make the developer an organisation with the data "in its possession or under its control" is my reading of ss 24 and 26C(2), untested.
6. The IMDA advisory's issue date is not on the document. The Synapxe rename is secondary only.
7. The slide strings quoted in the brief (ss 26C-26D, s 48J, "PDPC: 3 days" slide) were not located in the group file and were reviewed as quoted.
8. The group script says OpenAI "finally realized" on July 20; the IMDA advisory cites OpenAI's disclosure as 21 July 2026. Timeline facts were not part of this review.
