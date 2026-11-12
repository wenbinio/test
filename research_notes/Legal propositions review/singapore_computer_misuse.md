# Singapore computer-misuse propositions: adversarial review

Reviewed 12 November 2026 against the group document `Digi_Presentation_G1.md` (section "Singapore: Computer Misuse Act 1993 (CMA)" and the two-minute script).

## How the sources were obtained

Singapore Statutes Online (SSO) returned HTTP 403 on every URL tried, and WebFetch got 403 as well. CommonLII returned a Cloudflare 403 block. The Wayback Machine connection was reset. The Act text therefore comes from third-party copies of SSO output. All of them were downloaded as raw files and exact-matched with a whitespace-normalising script (`/tmp/claude-0/-home-user-test/4554aee0-a4f0-5dad-8d6d-91e6563403b9/scratchpad/verify.py`, run with `python3 -I`). Files are in `.../scratchpad/src/`.

| Tag | Copy | What it is | URL |
|---|---|---|---|
| **[SSO-PDF]** | Cyber Policy Portal copy of the SSO PDF | CMA 2020 Rev Ed, "Current version as at 22 Feb 2023". Only ss 1-2 (4 pages). | https://database.cyberpolicyportal.org/api/files/1677064048110lbzcv84lifh.pdf |
| **[LRC-copy]** | Legal Wires archive of the SSO page | CMA 2020 Rev Ed, full text, with the Law Revision Commission legislative history and comparative (renumbering) table. Includes Act 16 of 2023 and Act 21 of 2025 amendments. | https://littdb.sfo2.cdn.digitaloceanspaces.com/litt/SG/SSOStatutes/acts/CMA1993.html |
| **[LawPlayer]** | LawPlayer, "synced from sso.agc.gov.sg" 9 April 2026 | Same consolidated text. Used as a cross-check. | https://lawplayer.com/sg/act/CMA1993 |
| **[2007-Ed]** | asianlaws.org PDF | Cap 50A 2007 Rev Ed, "informal consolidation, version in force from 31/8/2018" (after the 2017 amendments). Pre-2020 numbering. | https://asianlaws.org/gcld/cyberlawdb/SG/Computer%20Misuse%20Act.pdf |

Status labels used below:
- **EXACT** means the exact string was matched in raw downloaded text.
- **SUMMARY** means it was read through a summarising tool or search snippet only.
- **SECONDARY** means a secondary source only.

The 2020 Revised Edition came into operation on 31 December 2021. The consolidated copies include later amendments (Act 16 of 2023 in force 8 February 2024; Act 21 of 2025 in force 30 December 2025). Those amendments touch ss 2, 8A, 8B, 13(3) and the Schedules. They do not touch ss 3-7 or 11, which carry no 2023 or 2025 tags.

## Verdict table

| # | Proposition | Verdict | One-line correction |
|---|---|---|---|
| 1 | s 3 requires knowledge that access is unauthorised | **Correct with qualification** | The text says the person "knowingly causes a computer to perform any function **for the purpose of** securing access without authority". It does not say "knows the access is unauthorised". The High Court describes two elements (knowing causation; purpose of access without authority). |
| 2 | 2017 amendments: "serious damage" lifts the maximum from ~2 to ~7 years | **Wrong (three errors)** | The 7-year tier is s 3(2), triggered by "any damage" **as defined in s 2(1)** (not "serious damage"). It dates from the 1998 edition at the latest, not 2017. Maximum is $50,000 and/or 7 years. First conviction: $5,000 and/or 2 years. Repeat: $10,000 and/or 3 years. |
| 3 | s 5 requires an act the person knows will cause unauthorised modification | **Correct** | Matches s 5(1) almost word for word. |
| 4 | ss 4, 6, 7 "also turn on intent or knowledge" | **Correct with qualification (headings wrong)** | s 4 "Access with intent to commit or facilitate commission of offence" (intent). s 6 "Unauthorised use **or interception** of computer service" (knowingly, plus purpose limbs). s 7 "Unauthorised obstruction of use of computer" (knowingly, without authority or lawful excuse). |
| 5 | Enhanced penalties for "protected computers" where critical infrastructure is targeted | **Correct with qualification** | The provision is s 11 of the 2020 Rev Ed (it was s 9 in the 2007 Rev Ed). Trigger: access to a protected computer in the course of a s 3, 5, 6 or 7 offence. Penalty is $100,000 and/or 20 years. "Protected" means the offender **knew or ought reasonably to have known** the system serves one of four listed purposes. "Critical infrastructure" is not the statutory phrase. |
| 6 | Territorial scope is s 11 | **Wrong section; description incomplete** | It is **s 13** in the 2020 Rev Ed (old s 11). s 13(3) has a third limb the slide omits (accused in Singapore at the material time) and, since 2024, a fourth (Singpass offences). "Serious harm in Singapore" is a narrow defined term. |
| 7 | "Knowledge- or intent-based, no negligence or recklessness tier" | **Correct for ss 3-7; wrong for the Act as a whole** | s 11(2) ("ought reasonably to have known") and s 9(1) ("knowing or having reason to believe") use objective standards. s 3(2), 5(2), 6(2) and 7(2) add liability for "damage" with no stated fault element as to damage. The words "reckless", "rash" and "negligent" do not appear in the Act, so the narrower claim survives. |
| 8 | s 2(5): "authority means consent"; no good-faith research exception; no disclosure duty; no active-defence exception | **s 2(5) wrong; the rest Correct with qualification** | s 2(5) is a two-limb test: not entitled to control access of that kind **and** no consent from someone who is so entitled. No general research or hack-back exception in the Act. But Penal Code ch 4A (private defence) applies to offences under other written laws, and the Act has purpose-based carve-outs in ss 9-10. |
| 9 | Short title and former title | **Needs stating** | Current: Computer Misuse Act 1993 (2020 Rev Ed). Former title: Computer Misuse and Cybersecurity Act (13 March 2013 to 30 August 2018). |
| 10 | Cybersecurity Act incident reporting only for CII/designated entities; not an AI lab | **Correct with qualification** | The duty attaches to designated persons. But the 2024 amendments widened the classes (in force 31 Oct 2025 for provider-owned CII and temporary-concern systems). The ESCI and FDI parts were **not** in the 31 Oct 2025 commencement. I found no later commencement. An AI lab could in principle be designated. |
| 11 | SingHealth: accountability via regulators and COI, not the CMA | **Weak version Correct; strong version Wrong or unsupported** | PDPC: SingHealth S$250,000, IHiS S$750,000, [2019] SGPDPC 3. The COI could only find facts and recommend. "Foreign attackers could not be prosecuted" is unsupported. "COI to penalise local negligence" is wrong. The CMA targets intruders, not victims. |
| 12 | Attribution: controlling minds or employees within authority; "innocent agent" | **Corporate limb overstated; innocent-agent limb Could not verify as Singapore authority** | Singapore test (Tom-Reck, affirmed 2025): "embodiment" of the company, or a servant acting within a function of management **properly delegated**. Employees merely "within their authority" are not enough. "Innocent agent" appears only via Penal Code abetment/attempt provisions and presupposes a principal who has the fault element. |
| 13 | No existing offence reaches a developer whose system accesses a computer without anyone intending it | **Largely Correct for criminal law, with qualifications** | I found no criminal negligence or recklessness offence for unintended computer access. But "Singapore must therefore enact" is a policy conclusion. Regulatory liability exists (PDPA s 24, applied in SingHealth). Knowledge can be shown by wilful blindness; some CMA provisions use objective standards. |

---

## 1. s 3: does the person need to know access is unauthorised?

**Text relied on** (CMA 2020 Rev Ed s 3(1)): "any person who knowingly causes a computer to perform any function for the purpose of securing access without authority to any program or data held in any computer shall be guilty of an offence". **EXACT** in [LRC-copy], [LawPlayer] and [2007-Ed]. Also quoted from the 1998 edition in *Lim Siong Khee* [2001] SGHC 69.

**Judicial statement of elements:** "There are two elements to the offence under s 3(1) of the CMA. First, the accused must have 'knowingly' caused a computer to perform a function; second, this must have been done for the purpose of securing access 'without authority' to any program or data held in the computer." *Xu Yuanchen v Public Prosecutor and another appeal* [2023] SGHC 123 at [104]. **EXACT** (eLitigation raw HTML). The court then adds at [105]-[106] that "authority" is judged by s 2(5) and relates to the kind and purpose of access (citing *Lim Siong Khee* [2001] 1 SLR(R) 631 at [19]).

**Why the slide is imprecise:**
- "Knowingly" modifies causing the computer to perform a function. The unauthorised nature of the access is the object of a **purpose**, tested against s 2(5), which is an objective entitlement-or-consent test.
- A person who honestly believes they are authorised will usually lack the purpose, so the proposition is a fair gloss in practice. It is not the statutory formulation.
- I found no Singapore decision stating "knowledge of lack of authority" as a separate element. I did not locate a decision squarely deciding the point. Could not verify.
- The slide's comparison with UK Computer Misuse Act 1990 s 1 ("closer to Singapore's position") was not checked in this review. Do not rely on it until the UK wording has been compared with the Singapore wording above.

**Slide wording:** "s 3: a person who knowingly makes a computer perform a function for the purpose of securing access without authority. Authority is judged under s 2(5)."

**Footnote:** Computer Misuse Act 1993 (2020 Rev Ed) s 3(1); *Xu Yuanchen v Public Prosecutor and another appeal* [2023] SGHC 123 at [104].

---

## 2. The "7 years" tier

**Text relied on** (s 3, 2020 Rev Ed):
- s 3(1)(a) first conviction: "to a fine not exceeding $5,000 or to imprisonment for a term not exceeding 2 years or to both". **EXACT** [LRC-copy], [LawPlayer].
- s 3(1)(b) repeat: "$10,000 ... 3 years". **EXACT**.
- s 3(2): "If any damage is caused as a result of an offence under this section, a person convicted of the offence shall be liable to a fine not exceeding $50,000 or to imprisonment for a term not exceeding 7 years or to both." **EXACT** in [LRC-copy], [LawPlayer], [2007-Ed], and in *Liew Cheong Wee Leslie v PP* [2013] SGHC 141 and *Tan Chye Guan Charles v PP* [2009] SGHC 128 (both quoting the 1998 Rev Ed).
- s 2(1) "damage": "means, except for the purposes of section 17, any impairment to a computer or the integrity or availability of data, a program or system, or information, that (a) causes loss aggregating at least $10,000 in value ... (b) modifies or impairs ... the medical examination, diagnosis, treatment or care of one or more persons; (c) causes or threatens physical injury or death to any person; or (d) threatens public health or public safety". **EXACT** [SSO-PDF].
- The court in *Liew Cheong Wee Leslie* [2013] SGHC 141 at [4]: "Damage is not any damage but damage as defined in s 2 of the Act." **EXACT**.

**Errors on the slide:**
1. **Trigger.** The statutory trigger is "any damage" as defined in s 2(1). It is not "serious damage". "Serious harm in Singapore" appears only in the territorial provision (s 13(3)(c)), which was added in 2017. That may be the source of the confusion. The "damage" definition has a $10,000 loss floor (or a medical, injury or public-safety limb).
2. **Date.** The tier is not a 2017 introduction. It appears in the 1998 Rev Ed (quoted in *Tan Chye Guan Charles* [2009] SGHC 128 and *Liew* [2013] SGHC 141). In [2007-Ed], which includes the 2017 changes, s 3(2) carries only the marker "[21/98]" (Computer Misuse (Amendment) Act 1998, in force 1 August 1998). No "[22/2017]" marker. I could not establish whether a 7-year tier existed in the original 1993 Act, so say "since at least 1998".
3. **Numbers.** "About 2 years to about 7 years" skips the $5,000 and $10,000 fines and the repeat-offender tier. The correct range is 2 years/$5,000 (first), 3 years/$10,000 (repeat), 7 years/$50,000 (damage). Separately, s 11 (protected computers) lifts the maximum to 20 years/$100,000.

**What the 2017 amendments did** (Computer Misuse and Cybersecurity (Amendment) Act 2017, Act 22 of 2017, in force 1 June 2017): new offences for dealing in hacked personal information and hacking tools (then ss 8A and 8B, now ss 9 and 10), amalgamation of charges (then s 11A, now s 14), and widened territorial reach (then s 11, now s 13). Source: MHA second reading speech, "Clause 4 amends Section 11 to give Singapore jurisdiction over computer offences, where the act causes or creates a significant risk of serious harm in Singapore." **EXACT** (https://www.mha.gov.sg/media-room/newsroom/computer-misuse-and-cybersecurity-amendment-bill-2017-second-reading---speech-by-mr-desmond-lee-senior-minister-of-state-ministry-of-home-affairs-and-ministry-of-national-development/). The 2017 Act itself could not be retrieved (SSO 403). The commencement date is from the legislative history in [2007-Ed] and [LRC-copy].

**Slide wording:** "s 3(1): up to $5,000 and/or 2 years (first offence); s 3(2): if the offence causes 'damage' (defined in s 2(1)), up to $50,000 and/or 7 years. This tier predates the 2017 amendments."

**Footnote:** Computer Misuse Act 1993 (2020 Rev Ed) ss 2(1) ("damage"), 3(1)-(2); *Liew Cheong Wee Leslie v Public Prosecutor* [2013] SGHC 141 at [4].

---

## 3. s 5

**Text** (s 5(1), 2020 Rev Ed): "any person who does any act which the person knows will cause an unauthorised modification of the contents of any computer shall be guilty of an offence". **EXACT** [LRC-copy], [LawPlayer]. Penalties: first conviction $10,000/3 years; repeat $20,000/5 years; with damage, $50,000/7 years (s 5(2)).

Useful extra: s 2(7) says "any act which contributes towards causing such a modification is taken as causing it" (**EXACT** [SSO-PDF]), and s 2(8) tests authority for modification. These help the students' argument that a person who sets an automated system running can still "cause" the modification. The fault element remains knowledge.

**Verdict:** Correct. **Footnote:** Computer Misuse Act 1993 (2020 Rev Ed) ss 2(7)-(8), 5(1).

---

## 4. ss 4, 6, 7: headings and mental elements

| Section | Correct heading (2020 Rev Ed) | Mental element | Status |
|---|---|---|---|
| s 4 | "Access with intent to commit or facilitate commission of offence" | Causes a computer to perform any function for the purpose of securing access "with intent to commit an offence to which this section applies" (offence involving property, fraud, dishonesty or bodily harm, punishable with at least 2 years). Penalty $50,000 and/or 10 years. s 4(4): immaterial whether the access is authorised. | EXACT [LRC-copy], [LawPlayer]; headings also EXACT in [2007-Ed] |
| s 6 | "Unauthorised use or interception of computer service" | "any person who knowingly" (a) secures access without authority for the purpose of obtaining a computer service, (b) intercepts or causes to be intercepted without authority, or (c) uses a computer or device for the purpose of committing (a) or (b). First $10,000/3 years; repeat $20,000/5 years; damage $50,000/7 years. | EXACT |
| s 7 | "Unauthorised obstruction of use of computer" | "Any person who, knowingly and without authority or lawful excuse" interferes with or obstructs lawful use of a computer, or impedes access to or impairs data. Same penalty bands as s 6. | EXACT |

The slide's s 6 and s 7 headings are paraphrases and the s 6 paraphrase drops interception. Note that s 7 is the only one of the three with an express "lawful excuse" limb.

**Footnote:** Computer Misuse Act 1993 (2020 Rev Ed) ss 4(1)-(2), 6(1), 7(1).

---

## 5. Protected computers

**Text** (s 11, headed "Enhanced punishment for offences involving protected computers", 2020 Rev Ed). **EXACT** [LRC-copy], [LawPlayer].
- s 11(1): "Where access to any protected computer is obtained in the course of the commission of an offence under section 3, 5, 6 or 7, a person convicted of the offence shall, in lieu of the punishment prescribed in those sections, be liable to a fine not exceeding $100,000 or to imprisonment for a term not exceeding 20 years or to both."
- s 11(2): a computer is a "protected computer" "if the person committing the offence knew, or ought reasonably to have known, that the computer or program or data is used directly in connection with or necessary for" (a) security, defence or international relations of Singapore; (b) the existence or identity of a confidential source of information relating to enforcement of criminal law; (c) "the provision of services directly related to communications infrastructure, banking and financial services, public utilities, public transportation or public key infrastructure"; or (d) protection of public safety including essential emergency services.
- s 11(3): presumption of knowledge where a warning is displayed stating that unauthorised access attracts an enhanced penalty.

**Corrections:**
- The statutory phrase is not "critical infrastructure". (It is "critical information infrastructure" in the Cybersecurity Act, a different regime.)
- The trigger is the offender's knowledge, **actual or constructive** ("ought reasonably to have known"). That cuts against proposition 7.
- It applies to ss 3, 5, 6 and 7 only, not s 4.
- "Nothing suggests Hugging Face would qualify" is a fair judgement but untested. Limb (c) ("communications infrastructure") is the one a prosecutor would reach for.

**Renumbering:** old s 9 (2007 Ed) became s 11 (2020 Rev Ed). **EXACT** in [LRC-copy] comparative table ("9 | 8A, 10 | 8B, 11 | 9, 12 | 10, 13 | 11 ...").

**Footnote:** Computer Misuse Act 1993 (2020 Rev Ed) s 11(1)-(3).

---

## 6. Territorial scope

**Correct section: s 13**, headed "Territorial scope of offences under this Act" (2020 Rev Ed). It was s 11 in the 2007 Rev Ed (Cap 50A), which is almost certainly the source of the slide's "s 11".

**Renumbering evidence:**
- [LRC-copy] says: "This Act has undergone renumbering in the 2020 Revised Edition", with the table 2020 Ed. 9 = 2007 Ed. 8A; 10 = 8B; 11 = 9; 12 = 10; 13 = 11; 14 = 11A; 15 = 12; 16 = 12A; 17 = 13; 18 = 14; 19 = 16. **EXACT**.
- [2007-Ed] has "Territorial scope of offences under this Act" at s 11, with protected computers at s 9. **EXACT**.
- The 2023 Bill (a post-2020 document) amends "section 13(3)": https://www.parliament.gov.sg/docs/default-source/default-document-library/computer-misuse-(amendment)-bill-13-2023.pdf. **EXACT** ("In the principal Act, in section 13(3)").

**Text** (s 13(3), **EXACT** [LRC-copy], [LawPlayer]): the Act applies if
- (a) "for the offence in question, the accused was in Singapore at the material time";
- (b) "for the offence in question (being one under section 3, 4, 5, 6, 7 or 8), the computer, program or data was in Singapore at the material time";
- (c) "the offence causes, or creates a significant risk of, serious harm in Singapore"; or
- (d) (since 8 February 2024) the offence is one under s 8A(1) or 8B(1) (national digital identity service).

s 13(4) defines "serious harm in Singapore": illness, injury or death; disruption of, or serious diminution of public confidence in, essential services; the same for government functions; or damage to national security, defence or foreign relations.

**Assessment of the slide's sentence:** "reaches conduct outside Singapore only if a Singapore-based computer, program or data is involved, or serious harm to Singapore results" is a fair shorthand for limbs (b) and (c) but omits limb (a). Limb (a) matters for the students' own hypothetical (a Singapore developer whose model hits a foreign victim): the Act applies because the accused was in Singapore. The limb (b) reference is limited to offences under ss 3-8. The conclusion that the actual incident (US parties, US systems) has no Singapore link looks right on the facts given.

**Slide wording:** "s 13: applies if the accused, or the computer, program or data, was in Singapore, or the offence causes (or risks) serious harm in Singapore."

**Footnote:** Computer Misuse Act 1993 (2020 Rev Ed) s 13(1)-(4).

---

## 7. "No negligence or recklessness tier"

**Where the claim holds:** the base offences in ss 3-8 each require knowledge, purpose or intent (s 3 "knowingly ... for the purpose"; s 4 "intent"; s 5 "knows"; s 6 "knowingly"; s 7 "knowingly and without authority or lawful excuse"; s 8 "knowingly and without authority" plus wrongful gain/unlawful purpose/knowing likelihood of wrongful loss). The words "reckless", "rash" and "negligent" do not occur anywhere in the Act (searched in [LRC-copy]).

**Where it fails (provisions that falsify the broad claim):**
1. **s 11(2)** (protected computers): "knew, or ought reasonably to have known". An objective standard for the aggravating fact. **EXACT**.
2. **s 9(1)** (personal information from a s 3-6 breach): "knowing or having reason to believe that any personal information ... was obtained by an act done in contravention of section 3, 4, 5 or 6". **EXACT**. Introduced in 2017 as s 8A.
3. **s 8A(1)(b)** (Singpass users; in force 8 February 2024): "knowing, or having reasonable grounds to believe" that the disclosure is to facilitate an offence. **EXACT** [LawPlayer]. Not in the 2020 Rev Ed as first operative.
4. **Damage tiers** (ss 3(2), 5(2), 6(2), 7(2)): the enhanced penalty applies "if any damage is caused", with no stated fault element as to the damage. In *Liew* [2013] SGHC 141 at [4] the court treats it as a sentencing enhancement tied to the defined term.
5. **s 12(1)**: attempts and "any act preparatory to or in furtherance of" an offence are punished as the offence. **EXACT**. Still fault-based, but widens liability.
6. **Wilful blindness:** under the Penal Code, "knowingly" is established by intention or wilful blindness (Penal Code 1871 (2020 Rev Ed) s 26D(3), **EXACT** in the Penal Code PDF). I did not verify that this definition governs "knowingly" in the CMA, which is outside the Code. Mark as an open point. The students' "wilful blindness ... is a stretch" remark should not be presented as law either way.

**Corrected wording:** "The core offences (ss 3-7) require knowledge or intent, and the Act has no recklessness or negligence offence. A few provisions, such as s 11(2) and s 9(1), use 'ought to have known' or 'reason to believe' standards for particular facts."

**Footnote:** Computer Misuse Act 1993 (2020 Rev Ed) ss 9(1), 11(2), 12(1).

---

## 8. s 2(5), good-faith research, disclosure, active defence

**s 2(5) text** (**EXACT** in the SSO-generated 2020 Rev Ed PDF, [SSO-PDF]): "For the purposes of this Act, access of any kind by any person to any program or data held in a computer is unauthorised or done without authority if the person — (a) is not himself or herself entitled to control access of the kind in question to the program or data; and (b) does not have consent to access by him or her of the kind in question to the program or data from any person who is so entitled."

**Corrections:** it is not "authority means consent". Access is unauthorised only if **both** limbs hold. A person who is entitled to control access of that kind is authorised without any consent. Consent counts only if it comes from a person entitled to control that kind of access, and "of the kind in question" ties authority to the specific access. *Lim Siong Khee* [2001] SGHC 69: the consent that matters is that of the account holder, not the system provider (the same wording was in the 1998 edition). *Xu Yuanchen* [2023] SGHC 123 at [105]-[106]: the inquiry is whether authorisation was granted for the specific purpose or use. For the Hugging Face scenario this means the question is whether the agents were entitled to control, or had consent from someone entitled to control, access of that kind to those systems.

**"No good-faith research exception":** Correct as to the text. There is no general public-interest, research or good-faith defence in ss 3-7 (full-text search of [LRC-copy] found none). Qualifications:
- s 7 has an express "lawful excuse" limb.
- ss 9 and 10 (2017) have purpose-based carve-outs: s 9(2)-(3) (retention or transmission for a purpose other than facilitating an offence); s 10 requires intention to commit or facilitate an offence. The Minister said "It is not the Government's intent to criminalise legitimate cybersecurity industry practices" and, of s 8B (now s 10), that it is "an offence only if the act is carried out with the intention of committing or facilitating the commission of a computer crime". **EXACT** (MHA speech, paras 23 and 29).
- s 18 saves lawful investigations by the police and law-enforcement officers only.
- The Cybersecurity Act 2018 has a licensing regime for penetration-testing and managed-SOC providers (CSA page https://www.csa.gov.sg/legislation/cybersecurity-act/; read in the downloaded page text, paraphrased here, not quoted).

**"Responsible disclosure is not a statutory duty under the Act":** Correct. The only "disclosure" offences in the Act concern passwords, access codes and credentials (s 8, 8A). No provision imposes or protects disclosure. A different statute (Cybersecurity Act 2018 s 14) imposes a reporting duty on CII owners.

**"No active-defence exception":** The CMA text has none, which is accurate. But do not say that hack-back is therefore unlawful as a matter of settled law. Penal Code s 6 makes every offence definition subject to the General Exceptions and Right of Private Defence chapters, and s 40(2) says that in Chapters 4, 4A, 5 and 5A "offence" denotes a thing punishable under the Code "or under any other written law". Chapter 4A is headed "Right of Private Defence". Chapter 4A gives a right of private defence of property against theft, robbery, mischief or criminal trespass (s 97(b)), limited by s 98 (no more harm than reasonably necessary; no right where there is reasonable opportunity to have recourse to a public authority). Whether this could ever justify a counter-intrusion is untested, and I found no Singapore case. Could not verify.

**Slide wording:** "s 2(5): access is unauthorised if the person is not entitled to control that kind of access AND has no consent from someone who is. No statutory research or hack-back defence in the CMA; no statutory disclosure duty."

**Footnote:** Computer Misuse Act 1993 (2020 Rev Ed) s 2(5); Penal Code 1871 (2020 Rev Ed) ss 6, 40(2), 97(b), 98.

---

## 9. Title and citation

- **Current:** "This Act is the Computer Misuse Act 1993." (s 1, 2020 Rev Ed.) **EXACT** [SSO-PDF], [LRC-copy], [LawPlayer].
- **Former title:** Computer Misuse and Cybersecurity Act. [LRC-copy] legislative history: "The Computer Misuse Act was renamed as the Computer Misuse and Cybersecurity Act by this Act" (Computer Misuse (Amendment) Act 2013, Act 3 of 2013, in force 13 March 2013), and "The Computer Misuse and Cybersecurity Act was renamed as the Computer Misuse Act by this Act" (Cybersecurity Act 2018, Act 9 of 2018, s 49, in force 31 August 2018). **EXACT**. The header reads "(Formerly known as the Computer Misuse and Cybersecurity Act (2007 Ed.))". **EXACT**.
- **Original:** Act 19 of 1993, "Computer Misuse Act 1993" (in force 30 August 1993).
- **Pre-2020 citation:** Computer Misuse Act (Cap 50A, 2007 Rev Ed) or (Cap 50A, 1998 Rev Ed). The 2017 amending Act is titled the *Computer Misuse and Cybersecurity (Amendment) Act 2017* (Act 22 of 2017). Cite it by that name.

**Footnote:** Computer Misuse Act 1993 (2020 Rev Ed) s 1.

---

## 10. Cybersecurity Act 2018: incident reporting

**Original duty** (Cybersecurity Act 2018, as first published, Acts Supplement No 9 of 2018, via ADB copy https://lpr.adb.org/sites/default/files/2024-05/singapore-cybersecurity-act-2018.pdf): s 14(1): "The owner of a critical information infrastructure must notify the Commissioner of the occurrence of any of the following ..." (prescribed incidents in the CII, or in interconnected computers under the owner's control). s 14(3): failure without reasonable excuse is an offence, fine up to $100,000 and/or 2 years. "Critical information infrastructure" means a computer or computer system for which a designation under s 7(1) is in effect. **EXACT.** I verified the wording from the 2018 first-published text, not the 2020 Rev Ed. The proposition's description of the original regime is correct.

**2024 amendments** (Cybersecurity (Amendment) Act 2024, passed 7 May 2024; Bill No 15/2024: https://www.parliament.gov.sg/docs/default-source/bills-introduced/cybersecurity-(amendment)-bill-15-2024.pdf):
- New Part 3A (provider-owned CII), Part 3B (systems of temporary cybersecurity concern, STCCs), Part 3C (entities of special cybersecurity interest, ESCI) and Part 3D (major foundational digital infrastructure (FDI) service providers). FDI services are specified as "(a) cloud computing service; (b) data centre facility service". Each has its own incident-reporting duty. **EXACT** in the Bill text. Bill section numbers (Part 3C = clause 16, Part 3D = clause 17) are as introduced. I did not check the enacted Act numbering.
- **Commencement:** the Cybersecurity (Amendment) Act 2024 (Commencement) Notification 2025 (S 677/2025, gazetted 15 October 2025) brings "Sections 2 to 15, 18, 19, 22, 23(b), 24, 25, 28(a) to (g), 29, 31 and 32(1) to (4), (6) and (7)" into operation on **31 October 2025**. **EXACT** (https://assets.egazette.gov.sg/2025/Legislative%20Supplements/Subsidiary%20Legislation%20Supplement/677.pdf). Clauses 16 and 17 of the Bill (Parts 3C and 3D) are **not** in that list, which agrees with law-firm notes (CMS, Hogan Lovells, Allen & Gledhill: SUMMARY via search results, not downloaded).
- CSA press release (31 October 2025): the expanded reporting includes incidents suspected of being caused by Advanced Persistent Threats and disruption incidents for non-interconnected systems, to be reported "within 2 hours of becoming aware". **EXACT** (https://www.csa.gov.sg/news-events/press-releases/provisions-in-the-cybersecurity--amendment--act-to-come-into-force-on-31-october-2025/).

**Assessment:** The proposition is right that the duty does not attach to an ordinary company. It attaches to designated persons. But "CII owners or other designated entities" now covers four designation routes, and ESCI and FDI (the routes most plausible for an AI lab or a cloud host) were not commenced on 31 October 2025. I found no later commencement notification as at 12 November 2026, but my search was not exhaustive (see unsure list). An AI lab running internal experiments is not within any commenced regime unless designated. It could be designated an ESCI (if it holds sensitive information or performs a function of national interest) or, if it provides cloud services, an FDI provider.

**Slide wording:** "Cybersecurity Act incident-reporting duties bind designated owners (CII, and since 31 Oct 2025 provider-owned CII and temporary-concern systems). They do not bind an ordinary AI lab unless it is designated."

**Footnote:** Cybersecurity Act 2018 (2020 Rev Ed) s 14; Cybersecurity (Amendment) Act 2024; Cybersecurity (Amendment) Act 2024 (Commencement) Notification 2025 (S 677/2025).

---

## 11. SingHealth (2018)

**What happened** (decision text, **EXACT**): *Singapore Health Services Pte Ltd & Ors* [2019] SGPDPC 3, Commissioner Tan Kiat How, Case No DP-1807-B2435, 14 January 2019 (media release 15 January 2019). Source: https://www.singaporelawwatch.sg/Portals/0/Docs/Judgments/2019/%5B2019%5D%20SGPDPC%203.pdf and PDPC media release https://www.pdpc.gov.sg/-/media/Files/PDPC/PDF-Files/Press-Room/2019/Media-Release---SingHealth-and-IHIS_15-Jan-2019.pdf.
- At [135]: both SingHealth and IHiS "have breached section 24 of the PDPA" (the protection obligation).
- At [136]: SingHealth pays a financial penalty of **$250,000**. At [137]: IHiS pays **$750,000**. At [138]: "individually the highest and second highest financial penalty amounts imposed by the Commission to date".
- The vendor is **Integrated Health Information Systems Pte Ltd (IHiS)**. It is not an arm's-length vendor: the decision records that IHiS and SingHealth "are wholly-owned subsidiaries of MOH Holdings" and that IHiS is "the central national IT agency for the public healthcare sector". Calling it "its IT vendor" is loose. Say "its IT agency, IHiS".
- About 1.5 million patients' non-medical personal data and the outpatient dispensed-medicine records of about 160,000 were taken.

**Committee of Inquiry** (Public Report, 10 January 2019: https://file.go.gov.sg/singhealthcoi.pdf, 454 pages; **EXACT**):
- Appointed by the Minister-in-Charge of Cybersecurity "under Section 9(1)(b) of the Inquiries Act (Cap. 139A, 2008 Revised Edition)" on 24 July 2018. Chair: retired Chief District Judge Richard Magnus.
- Terms of reference (Part I, para 4): to "Establish the events and contributing factors leading to the cybersecurity attack", establish how IHiS and SingHealth responded, and recommend measures; and "Make and submit a report of its proceedings, findings and recommendations to the Minister-in-Charge of Cybersecurity". 16 recommendations (MDDI statement).
- Inquiries Act 2007 s 9(2): the Minister's terms of reference may "specify any particular matters as to which the committee is to determine the facts" and "direct whether the committee is to make recommendations". **EXACT** ([LawPlayer] copy of SSO text). The Part 3 provisions I could read contain no power to impose penalties. I did not read the Schedule of inquiry powers.
- So the COI **could** find facts, assess the response of IHiS and SingHealth, hear evidence (37 witnesses, 22 hearing days per the Minister) and recommend. It **could not** (on the terms of reference and the Act provisions I could read) fine, convict or order compensation. The only penalties were the PDPC's.

**Attackers:** The Minister told Parliament the attack was by "a skilled and sophisticated actor bearing the characteristics of an Advanced Persistent Threat (APT) group" and that "we know the identity of the attacker. But, for national security reasons, I will not comment further." **EXACT** (https://www.mddi.gov.sg/newsroom/statement-by-minister-on-govt-response-to-report-of-coi-during-parl-sitting/). The COI public report refers to "overseas C2 servers", which is server location, not the attackers' nationality. The attackers' nationality and the reason no prosecution was reported are not stated in anything I found.

**Assessment of the two versions:**
- Weak version (accountability through regulators and a COI, not the CMA): **Correct**, with the penalties above. Tighten "IT vendor" and cite the decision.
- Strong version: "As Singapore could not prosecute the foreign attackers, the state was forced to rely on an inward-facing Committee of Inquiry to penalise local institutional negligence instead of the Computer Misuse Act." Problems:
  1. "Foreign attackers": not established by any source I found. Foreign-hosted command-and-control servers are not the same thing.
  2. "Could not prosecute": unsupported. The CMA had jurisdiction because the victim computers were in Singapore (s 13(3)(b), then s 11(3)(b)). Any obstacle was practical (identification, arrest, extradition), not a gap in the Act.
  3. "Penalise ... instead of the CMA": a category error. The CMA targets intruders; it never could penalise a victim's negligence. Victim-side negligence is the PDPA s 24 regime, and the PDPC applied it.
  4. "COI to penalise": the COI did not penalise anyone.
  5. "Absence of suitable legislation": the SingHealth outcome shows a working regulatory regime (PDPA s 24, plus the Cybersecurity Act enacted and brought into force in 2018). It does not show an absence.
  6. The Minister told Parliament that SingHealth's database system "is part of our Critical Information Infrastructure (CII)" (**EXACT**, MDDI statement), and the COI report records that CSA and CID officers were appointed to investigate for the inquiry (Part I para 7).
  7. Press reports that IHiS dismissed or fined staff: SECONDARY only, not downloaded.

**Slide wording:** "SingHealth (2018): PDPC fined SingHealth S$250,000 and IHiS S$750,000 for breaching the PDPA protection obligation; a Committee of Inquiry made findings and recommendations. The attackers were not publicly prosecuted. Victim-side accountability came from the PDPA, not the CMA."

**Footnotes:** *Singapore Health Services Pte Ltd & Ors* [2019] SGPDPC 3 at [135]-[138]. Committee of Inquiry, *Public Report of the Committee of Inquiry into the Cyber Attack on Singapore Health Services Private Limited's Patient Database on or around 27 June 2018* (10 January 2019) Part I paras 2-4. Inquiries Act 2007 (2020 Rev Ed) s 9. Ministry of Digital Development and Information, Statement by the Minister on the Government's response to the COI report (Parliament sitting).

---

## 12. Attribution of fault to a company; "innocent agent"

**Corporate attribution.** *Public Prosecutor v China Railway Tunnel Group Co Ltd (Singapore Branch)* [2025] SGHC 101 (Menon CJ, Tay Yong Kwang JCA, Phang SJ; 29 May 2025), **EXACT** (eLitigation):
- [4]: "we affirm that the *Tom-Reck* test should remain the operative test for attribution of criminal liability to a company. However, in certain circumstances, it may be appropriate for the court to apply a special rule of attribution based on the *Meridian* approach."
- [21] (stating *Tom-Reck* at [17]): acts and knowledge are attributed if the person "may be regarded as the 'embodiment of the company'" or "is merely 'the company's servant', but the person's acts are within the scope of a function of management properly delegated to him".
- [59]: "The focus is on whether the relevant wrongdoer can be considered to be the directing mind and will of the company in the context of the relevant offending act."
- [51]: "Neither the YIC nor the Prosecution referred to any case where a special rule of attribution was created and applied in a strictly criminal context."
- Original source: *Tom-Reck Security Services Pte Ltd v Public Prosecutor* [2001] 1 SLR(R) 327 ([2001] SGHC 32; citation as given in the 2025 judgment).
- Penal Code 1871 (2020 Rev Ed) s 11: "The word 'person' includes any company or association or body of persons, whether incorporated or not." **EXACT.** I did not verify how the CMA's "any person" is defined for companies (Interpretation Act not retrieved).

**Assessment:** "Controlling minds" is fair (the embodiment limb). "Employees acting within their authority" is an **overstatement**: the second limb needs a function of **management** properly **delegated**. In *China Railway* the trial judge found the employee's corrupt acts were outside the scope of his authority and not a delegated management function ([24]), and the High Court dismissed the Prosecution's appeal, so nothing was attributed to the company. Mere agency or authority is not enough. Add that a *Meridian*-style special rule remains possible where the statute's purpose would otherwise be defeated, but the court has not yet applied one in a criminal case.

**Innocent agent.** Singapore criminal law deals with non-culpable agents through the Penal Code:
- s 108 Explanation 3: "It is not necessary that the person abetted should be capable by law of committing an offence, or that he should have the same guilty intention or knowledge as that of the abettor, or any guilty intention or knowledge." **EXACT.**
- s 511(2)(g) (attempt): "soliciting an innocent agent to engage in conduct constituting a physical element of the offence". **EXACT.**
- CMA s 12(1) applies abetment and attempt to CMA offences.

**Assessment:** "Treat the developer as principal and the model as its instrument" is a **fair analogy but not a Singapore doctrine**. I found no Singapore appellate case adopting "perpetration by innocent agent" under that label. The Code's provisions presuppose a **person** as the agent, and in every case the principal must themself have the intention or knowledge (the abettor's mental state). They do not supply a missing mental state. The students' own point that nobody intended the intrusion means the innocent-agent route does not close the gap. On the actus reus side, the CMA already treats running a program as the person's act (s 2(2)-(3) "uses a program", s 2(7)), so no agency doctrine is needed to make a developer the person who "causes a computer to perform any function". Could not verify any Singapore case on AI systems as agents.

**Slide wording:** "Company liability: the fault of a director or senior manager who embodies the company, or of an employee exercising a properly delegated management function (Tom-Reck, affirmed 2025). 'Innocent agent': the Penal Code reaches those who use a non-culpable agent, but the user must themself have the guilty mind."

**Footnotes:** *Public Prosecutor v China Railway Tunnel Group Co Ltd (Singapore Branch)* [2025] SGHC 101 at [4], [21], [59]; *Tom-Reck Security Services Pte Ltd v Public Prosecutor* [2001] 1 SLR(R) 327; Penal Code 1871 (2020 Rev Ed) ss 11, 108 (Explanation 3), 511(2)(g).

---

## 13. Is there any existing offence for unintended access? ("Singapore must therefore enact")

**CMA (2020 Rev Ed):** None. Every offence in ss 3-8 needs knowledge, purpose or intent (see item 7). s 12 punishes attempts and preparatory acts, but only for offences that themselves need a fault element. No CMA offence uses rashness or negligence.

**Penal Code 1871 (2020 Rev Ed), checked in the raw PDF** (https://assets.egazette.gov.sg/2021/Legislative%20Supplements/Revised%20Acts/21rs8334.pdf; operative 31 December 2021):
- The Code defines "rashly" (s 26E: doing an act "knowing that there is a real risk ... if it would have been unreasonable to have taken that risk") and "negligently" (s 26F: omitting what "a reasonable person would do" or doing what "a reasonable person would not do"). **EXACT.**
- The rash and negligent offences are about harm to people or physical safety: s 304A (death), ss 336-338 (endangering life or personal safety, hurt, grievous hurt), ss 279-289 (rash driving, rash navigation, dangerous substances, machinery, buildings, animals). **EXACT** for ss 304A and 336; the others from the arrangement of sections. None concerns data or computer systems.
- Mischief (s 425) requires "intent to cause, or knowing that he is likely to cause, wrongful loss or damage". That is knowledge, not negligence. **EXACT.** Whether corruption of data is "property" for mischief was not examined.
- No Penal Code offence covers a negligent computer intrusion.

**Elsewhere (regulatory, not criminal):**
- PDPA 2012 s 24 (protection obligation) with PDPC financial penalties: applied in [2019] SGPDPC 3. This reaches an organisation holding personal data, not an AI lab that intrudes.
- PDPA ss 48D-48F make it an offence for an individual to disclose, use or re-identify personal data "knowingly or recklessly". SECONDARY ONLY (search summary and a LawPlayer page I could not download). This is the one recklessness tier I found in Singapore data/cyber legislation, and it is about misusing personal data held by organisations, not intrusion.
- Cybersecurity Act 2018: CII duties, not developer duties.

**Assessment:** The factual premise (no existing offence fits a developer whose autonomous system intrudes with nobody intending it) looks **right for criminal law**, within the limits of what I checked. But:
1. The conclusion "Singapore must therefore enact an entirely new, specialised AI Liability and Cyber-Security Act ... strict developer liability" is a **policy recommendation**, not something the law "requires". Say "should consider".
2. The premise should be qualified. Knowledge can be shown by wilful blindness (if it applies to the CMA, unverified). A developer who knowingly disabled safeguards and launched agents with a purpose of obtaining access could meet s 3. s 11(2) and s 9(1) show Parliament already uses constructive-knowledge language where it wants it. There are non-criminal levers (PDPA, civil liability in Calvin's section).
3. SingHealth does not show a gap. See item 11.

**Slide wording:** "No Singapore offence we found punishes an unintended, negligent intrusion. The CMA needs knowledge or intent. Parliament could add a negligence or recklessness tier, as it already did for protected-computer status (s 11(2))."

**Footnotes:** Computer Misuse Act 1993 (2020 Rev Ed) ss 3-8, 11(2), 12; Penal Code 1871 (2020 Rev Ed) ss 26E, 26F, 304A, 336, 425.

---

## Anything on which I remain unsure

1. **Exact text of the CMA as at 31 December 2021.** All copies are third-party renditions of SSO, and two include later amendments. ss 3-7, 9, 11 carry no later amendment tags, so I am confident of them, but SSO should be checked before printing. The slides should state which version date they use.
2. **Whether 7 years was in the original 1993 Act.** I can only show it was in the 1998 Rev Ed and carries the [21/98] marker. The 2017 Act text (Act 22 of 2017) itself was not retrieved.
3. **Knowledge of lack of authority in s 3.** I found *Xu Yuanchen* [2023] SGHC 123 at [104] giving the two-element formulation, but no decision squarely deciding whether the accused must know the access is unauthorised. Not verified.
4. **Wilful blindness under the CMA.** Penal Code s 26D(3) is verified; its application to CMA "knowingly" is not.
5. **Private defence and hack-back.** The route via Penal Code ch 4A is my reading of ss 6, 40(2), 97(b) and 98. No case found.
6. **Cybersecurity Act:** (a) the text I quote for s 14 is the 2018 first-published version; (b) Bill clause numbers for Parts 3C and 3D may differ from the enacted Act; (c) I found no commencement notification after S 677/2025 but could not search the SSO or gazette index exhaustively, so the ESCI and FDI parts may have commenced since.
7. **COI powers.** I read Inquiries Act 2007 ss 9-14 via LawPlayer but not the Schedule of inquiry powers. The statement that the COI could not penalise rests on the terms of reference and the Part 3 provisions, not the Schedule.
8. **SingHealth attackers.** No source found on their nationality or on whether prosecution was attempted. IHiS staff discipline (reported in the press) not verified.
9. **PDPA ss 48D-48F** (recklessness for individuals): secondary summary only. PDPA direction power cited in the decision as s 29 (as then in force); the 2020 Rev Ed section number for financial penalties was not checked.
10. **Interpretation Act definition of "person"** for CMA offences by companies: not checked.
11. **Parts of the script outside the 13 propositions were not reviewed:** the PDPA three-day breach notification statement, *Quoine v B2C2*, *Spandeck* and the tort sections, and the US and UK comparisons (including the UK Computer Misuse Act s 1 characterisation).
