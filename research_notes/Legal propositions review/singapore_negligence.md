# Singapore negligence propositions: adversarial review

Reviewed 12 November 2026 against the Part 4 notes and script in `/root/.claude/uploads/4554aee0-a4f0-5dad-8d6d-91e6563403b9/f24041a0-Digi_Presentation_G1.md`.

Raw downloads (eLitigation HTML, untrusted, text-stripped with `python3 -I`) are in `/tmp/claude-0/-home-user-test/4554aee0-a4f0-5dad-8d6d-91e6563403b9/scratchpad/dl/` (`*.txt`). The CLA PDF and the California opinion are in `.../scratchpad/st/` and `.../scratchpad/ca/`.

Status labels used below:
- **[RAW]** = exact string matched in raw text I downloaded.
- **[SUMM]** = read through a summarising tool (web search summaries). Used only as leads, never as proof.
- **[SEC]** = secondary source only.

Access notes:
- eLitigation worked for every judgment I fetched.
- Singapore Statutes Online returned HTTP 403, including with a browser User-Agent and the PDF URLs.
- CommonLII returned 403.
- The statute text comes from a non-official 2020 Rev Ed PDF of the Civil Law Act 1909 on faolex.fao.org. It is labelled "Informal Consolidation – version in force from 15/10/2024".
- For the Contributory Negligence and Personal Injuries Act 1953, I used eLitigation judgments that quote it, plus the cross-reference inside the Civil Law Act.

---

## Verdict table

| # | Proposition | Verdict | One-line correction |
|---|---|---|---|
| 1 | Spandeck test: foreseeability threshold, then proximity, then policy; incremental | Correct with qualification | Citation and court are right. The stages are at [73], [75]-[76], [77]-[82], [83]. Spandeck's own summary at [115] calls it a "two-stage test" with foreseeability only a "threshold issue", not a limb. The slide should say "two-stage test (proximity, then policy) after a threshold of factual foreseeability". |
| 2 | Ngiam confirmed Spandeck applies to all types of damage | Wrong (misattributed) | Spandeck itself says so at [71] and [115]. Ngiam [2008] 3 SLR(R) 674 extended the test to psychiatric harm ([22], [109], [121]) and added specific criteria. The citation is right. |
| 3 | Spandeck [73] quotation | Correct | The exact string and the paragraph number match. |
| 4 | "NTUC Foodfare" quotation and "physical, circumstantial and causal proximity" | Wrong as attributed | Full name: NTUC Foodfare Co-operative Ltd v SIA Engineering Co Ltd [2018] 2 SLR 588; [2018] SGCA 41. The "mechanical formula" words are Ngiam at [108], quoted by Foodfare at [41], and were said about the psychiatric-harm proximity factors. The "physical, circumstantial and causal" formulation is Spandeck [81], restated in Foodfare at [40(a)] and [41]. |
| 5 | No exclusionary rule; economic loss recoverable; RSP Architects [1995] 3 SLR(R) 653 | Correct with qualification | The citation is right (neutral citation [1995] SGCA 79, 1 November 1995). The "no exclusionary rule" point is stated in Foodfare at [1]-[3] and Spandeck at [71]. Pre-Spandeck cases were more restrictive for pure economic loss (Spandeck [55]-[59]). Spandeck [115] says "a more restricted approach" may be preferable, within the single test. Delete "(check the citation)". |
| 6 | "Unlike California, Singapore doesn't bar pure economic loss" | Correct with qualification (California half overstated) | California has a general no-duty rule for negligently inflicted purely economic loss, with a "special relationship" exception (J'Aire; Biakanja). Say "restricts", not "bars". |
| 7 | Negligence compensates recognised psychiatric illness, not mere distress (Ngiam) | Correct | Ngiam [97] is the pinpoint. It concerns psychiatric harm from nervous shock. Reed v Bellingham [2022] SGCA 60 separately holds emotional distress is actionable under the PDPA private right of action. |
| 8 | Quoine: majority and AI passage | Wrong in part | The citation [2020] 2 SLR 20 is right. The "mind of its own" words are the SICC trial judge's ([2019] 4 SLR 17 at [206]). They are quoted in Mance IJ's dissent at [185] and are not a statement by the majority. Majority on deterministic programs: [97]-[99]. The majority says nothing about AI beyond noting the software was deterministic ([15]). |
| 9 | Skandinaviska [2011] 3 SLR 540 is the leading vicarious liability case | Correct with qualification (overstated) | The citation is right. It adopted the "close connection" test for an employer's liability for an employee's fraud ([64]-[75], [89]). The modern leading framework is Ng Huat Seng v Munib Mohammad Madni [2017] SGCA 58 at [41]-[44], [67]. |
| 10 | Contributory Negligence and Personal Injuries Act 1953 reduces damages | Correct | The title is right. The provision is s 3(1) (2020 Rev Ed). |
| 11 | Remoteness follows Wagon Mound (No 1) [1961] AC 388 | Correct (authority supplied) | Ho Soo Fong v Standard Chartered Bank [2007] 2 SLR(R) 181 at [39] (CA); Sunny Metal (CA) [2007] 3 SLR(R) 782 at [56]; Deloitte & Touche LLP v Hin Leong Trading [2026] SGCA 33 at [67]. A contract claim may use Hadley v Baxendale instead. |
| 12 | Rylands v Fletcher: status and non-physical escapes | Could not verify (non-physical escape); status can be stated | It survives in Singapore as a sub-species of nuisance (PEX International v Lim Seng Chye [2019] SGCA 82 at [66]-[70]). It was applied to an escape of sparks onto neighbouring land. I found no Singapore authority on non-physical or data escapes. |
| 13 | Contribution under the Civil Law Act 1909 | Correct (section supplied) | Civil Law Act 1909 (2020 Rev Ed), s 15 (entitlement) and s 16 (assessment). |
| 14 | "Owes a duty of care to everyone whose systems its agents actually enter" | Wrong as a flat assertion | No Singapore authority supports it. No Singapore decision on negligence for autonomous systems or on data as property damage was found. Reword as a contestable argument. |
| 15 | Positive activity, so act not omission | Correct with qualification | There is no Singapore Court of Appeal case squarely on this framing in the "third party agent" setting. The nearest authority is Ng Huat Seng [82(b)(ii)] on positive duties. Dorset Yacht and Smith v Littlewoods are English and persuasive only. |

---

## Detail

### 1. Spandeck: citation, court, test

**Source:** https://www.elitigation.sg/gd/s/2007_SGCA_37 **[RAW]**

**Citation and court:**
- Spandeck Engineering (S) Pte Ltd v Defence Science & Technology Agency [2007] SGCA 37, CA 3/2007.
- Court of Appeal (Chan Sek Keong CJ, Andrew Phang Boon Leong JA, V K Rajah JA), decided 8 August 2007.
- [2007] 4 SLR(R) 100 is confirmed by Foodfare at [1] (https://www.elitigation.sg/gd/s/2018_SGCA_41) **[RAW]**.
- Ngiam [2] cites it as "[2007] 4 SLR 100".

**Exact passages (all [RAW]):**
- [71]: "a single test is preferable in order to determine the imposition of a duty of care in all claims arising out of negligence, irrespective of the type of the damages claimed, and this should include claims for pure economic loss".
- [73]: "a coherent and workable test can be fashioned out of the basic two-stage test premised on proximity and policy considerations, if its application is preceded by a preliminary requirement of factual foreseeability. We would add that this test is to be applied incrementally, in the sense that when applying the test in each stage, it would be desirable to refer to decided cases in analogous situations".
- [76]: factual foreseeability "is a threshold question which the court must be satisfied is fulfilled, failing which the claim does not even take off".
- [77]: proximity is "the closeness of the relationship between the parties themselves".
- [83]: "Assuming a positive answer to the preliminary question of factual foreseeability and the first stage of the legal proximity test, a prima facie duty of care arises. Policy considerations should then be applied to the factual matrix to determine whether or not to negate this duty."
- [115]: "This test is a two-stage test, comprising of, first, proximity and, second, policy considerations. ... There is, of course, the threshold issue of factual foreseeability but since this is likely to be fulfilled in most cases, we do not see the need to include this as part of the legal test for a duty of care."

**Verdict:** Correct with qualification. The slide's three steps match [73] and [83].

**Slide wording:** "Spandeck: a single test for every negligence claim. Threshold of factual foreseeability; (1) legal proximity; (2) policy considerations that may negate the duty. Applied incrementally, by analogy with decided cases."

**Footnote:** Spandeck Engineering (S) Pte Ltd v Defence Science & Technology Agency [2007] 4 SLR(R) 100 at [71], [73], [83] and [115].

**Caveat:** "Every" is supported by [71] ("all claims arising out of negligence"). I did not verify whether later cases treat duties already settled by precedent as bypassing Spandeck.

### 2. Ngiam and "all types of damage"

**Source:** https://www.elitigation.sg/gd/s/2008_SGCA_23 **[RAW]**

**Citation and court:** Ngiam Kong Seng and another v Lim Chiew Hock [2008] SGCA 23, CA 38/2007; Court of Appeal, 29 May 2008. [2008] 3 SLR(R) 674 is confirmed by Foodfare at [41] and ACB v Thomson Medical at [49] **[RAW]**.

**Passages (all [RAW]):**
- [22]: "The court in Spandeck did not need to consider what ought to be the applicable legal rules and principles with respect to liability in the sphere of psychiatric harm. ... this same two-stage test applies in cases of psychiatric harm as well, although specific criteria would apply in this particular context."
- [2]: Spandeck set the test for "pure economic loss" and "personal injuries and/or physical damage".
- [109] and [121]: the second stage is applied to psychiatric harm claims; the position is "wholly consistent with the two-stage approach adopted by this court in Spandeck".

**Verdict:** Wrong (misattributed). Spandeck at [71] and [115] is the source of "all types of damage". Ngiam extended it to psychiatric harm.

**Slide wording:** "Spandeck applies whatever the type of damage (Spandeck at [71]); Ngiam applied it to psychiatric harm."

**Footnote:** Spandeck at [71] and [115]; Ngiam Kong Seng v Lim Chiew Hock [2008] 3 SLR(R) 674 at [22].

### 3. Spandeck [73] quotation

**Verdict:** Correct. I matched the whole string programmatically against the raw eLitigation text; it appears in [73].

**Slide wording:** Keep the quotation. Footnote: Spandeck [2007] 4 SLR(R) 100 at [73].

Mark the end of the quote "against a tortfeasor" as in the original; do not alter it.

### 4. NTUC Foodfare quotation

**Source:** https://www.elitigation.sg/gd/s/2018_SGCA_41 **[RAW]**

**Citation and court:**
- NTUC Foodfare Co-operative Ltd v SIA Engineering Co Ltd and another [2018] SGCA 41; Court of Appeal, Civil Appeal No 207 of 2017.
- Coram: Sundaresh Menon CJ, Steven Chong JA, Quentin Loh J. Heard 8 May 2018; judgment 19 July 2018. Steven Chong JA delivered the judgment.
- [2018] 2 SLR 588 is confirmed by Deloitte [2026] SGCA 33 **[RAW]** (https://www.elitigation.sg/gd/s/2026_SGCA_33).

**Passages (all [RAW]):**
- Foodfare [41]: "We reiterate that 'every application of the concept of proximity is heavily dependent on the precise factual matrix concerned … there is no mechanical formula that is to be applied by the court': see Ngiam Kong Seng and another v Lim Chiew Hock [2008] 3 SLR(R) 674 at [108]."
- Ngiam [108]: "every application of the concept of proximity is heavily dependent on the precise factual matrix concerned. In other words, there is no mechanical formula that is to be applied by the court vis-à-vis these factors."
  - "These factors" are Lord Wilberforce's three McLoughlin factors for psychiatric harm.
  - The words are Ngiam's own. Foodfare quotes them and elides the intervening "In other words,".
- Foodfare [40(a)]: "In Spandeck, we held, endorsing the observations of Deane J in Sutherland Shire Council v Heyman ... that proximity includes physical, circumstantial and causal proximity, and incorporates the twin criteria of voluntary assumption of responsibility ... and reliance ...: see Spandeck at [81]."
- Foodfare [41] repeats "physical, circumstantial and causal proximity".

**Verdict:** Wrong as attributed. The quote is not Foodfare's own and carries a Ngiam context.

**Slide wording:** "Proximity covers physical, circumstantial and causal proximity (Spandeck [81]; Foodfare [40]-[41]). 'There is no mechanical formula' (Ngiam [108], quoted in Foodfare [41])."

**Footnote:** NTUC Foodfare Co-operative Ltd v SIA Engineering Co Ltd [2018] 2 SLR 588 at [40]-[41], quoting Ngiam Kong Seng v Lim Chiew Hock [2008] 3 SLR(R) 674 at [108]; Spandeck at [81].

**For the Q&A about "going liberal":** Foodfare [41] also says assumption of responsibility and specific reliance are "neither essential nor inflexible conditions" in pure economic loss cases. That is stronger support for flexibility than the Ngiam line.

### 5. Pure economic loss and RSP Architects

**Sources:**
- https://www.elitigation.sg/gd/s/1995_SGCA_79 **[RAW]**
- https://www.elitigation.sg/gd/s/2016_SGCA_40 **[RAW]**
- https://www.elitigation.sg/gd/s/2018_SGCA_41 **[RAW]**

**Citation:**
- RSP Architects Planners & Engineers v Ocean Front Pte Ltd and another appeal [1995] SGCA 79, CA 185/1994 and 188/1994.
- Court of Appeal (Goh Joon Seng J, Karthigesu JA, L P Thean JA), 1 November 1995.
- [1995] 3 SLR(R) 653 is confirmed as the SLR(R) citation by a later Court of Appeal decision, [2016] SGCA 40 at [70] **[RAW]**.
- Spandeck cites the same case as [1996] 1 SLR 113 (the original SLR report) at [51]-[52] **[RAW]**.
- Pinpoints: [2016] SGCA 40 gives SLR(R) paragraphs [27], [74], [75]. The eLitigation text numbers paragraphs differently, so I give no RSP pinpoint.

**Passages (all [RAW]):**
- Foodfare [1]: Spandeck "departed from English law which applies a general exclusionary rule against recovery for pure economic loss".
- Foodfare [3]: "we rejected the exclusionary rule in favour of a single test for a duty of care in tort, premised on proximity and policy considerations".
- Foodfare [4]: "the precise classification of the loss is immaterial".
- Spandeck [51]: Singapore courts "in certain cases declined to apply the 'exclusionary rule' adopted by the House of Lords in Murphy".
- Spandeck [59]: after Eastern Lagoon and United Project Consultants, "the courts have 'consistently adopted a more restrictive approach'" for pure economic loss.
- Spandeck [115]: "It could be that a more restricted approach is preferable for cases of pure economic loss but this is to be done within the confines of a single test."

**Verdict:** Correct with qualification.

**Qualifications:**
- "Building on earlier cases" is fair, but the path was not linear. Ocean Front applied Anns and Junior Books. Eastern Lagoon re-characterised it. Several later cases kept a restrictive pure-economic-loss approach until Spandeck.
- Factual foreseeability is a threshold requirement as well.
- Recoverability also depends on breach, causation and remoteness.

**Slide wording:** "Singapore has no exclusionary rule for pure economic loss (Spandeck; Foodfare [1]-[3]). Recovery depends on proximity and policy, not on how the loss is labelled."

**Footnote:** Spandeck at [71] and [115]; NTUC Foodfare [2018] 2 SLR 588 at [1]-[4]; RSP Architects Planners & Engineers v Ocean Front Pte Ltd [1995] 3 SLR(R) 653.

### 6. California half

**Source:** Southern California Gas Leak Cases, California Supreme Court, S246669, 30 May 2019, slip opinion: https://www4.courts.ca.gov/opinions/archive/S246669.PDF **[RAW]**. Official citation (2019) 7 Cal.5th 391 is from search results only **[SUMM]**.

**Passages (all [RAW], slip opinion):**
- "The primary exception to the general rule of no-recovery for negligently inflicted purely economic losses is where the plaintiff and the defendant have a 'special relationship.' (J'Aire, supra, 24 Cal.3d at p. 804.)"
- "What we mean by special relationship is that the plaintiff was an intended beneficiary of a particular transaction but was harmed by the defendant's negligence in carrying it out."
- In J'Aire (1979) 24 Cal.3d 799, a special relationship existed between a restaurant operator and a contractor hired by the property owner. The restaurant recovered purely economic loss.
- J'Aire "disapproved Adams only to the extent it purported to impose an absolute rule that a plaintiff can never recover for negligently inflicted purely economic losses".
- The Court held the gas company owed businesses with no injury or property damage no tort duty to guard against purely economic loss.

**Verdict:** Correct with qualification. Singapore's rejection of a categorical rule is right. California does not impose an absolute bar. It has a general rule against recovery with exceptions.

**Slide wording:** "California generally denies negligence recovery for purely economic loss unless there is a 'special relationship' (J'Aire; Southern California Gas Leak Cases). Singapore uses a single proximity-and-policy test instead."

**Footnote:** Southern California Gas Leak Cases (2019) 7 Cal.5th 391; J'Aire Corp v Gregory (1979) 24 Cal.3d 799.

**Not verified:**
- Sheen v Wells Fargo (2022) 12 Cal.5th 905, which I recall as confining the "economic loss rule" to contract-related losses. I did not retrieve it.
- How California would treat unauthorised-access costs where the claimant's own servers or data were interfered with (physical-injury-to-property route). I did not research that.

### 7. Psychiatric illness, not mere distress

**Sources:**
- https://www.elitigation.sg/gd/s/2008_SGCA_23 **[RAW]**
- https://www.elitigation.sg/gd/s/2022_SGCA_60 **[RAW]**

**Passages (all [RAW]):**
- Ngiam [97]: "the plaintiff must prove that he or she has suffered what has often been termed a 'recognisable psychiatric illness' ... Psychiatric illness must be distinguished from sorrow and grief (no matter how severe), for the latter are considered as constituting part of the vicissitudes of life."
- Reed v Bellingham [2022] SGCA 60 at [77]: "Parliament intended to displace the starting position at common law that emotional distress is not actionable."
- Reed [107]: "Parliament did not intend to exclude emotional distress from the meaning of 'loss and damage' in s 32(1)" of the PDPA. Court of Appeal, Menon CJ, Phang JCA, Prakash JCA, 4 April 2022.

**Verdict:** Correct. Ngiam concerns nervous-shock claims, so "(see Ngiam)" should be "(Ngiam at [97])".

**Slide wording:** "In negligence, psychiatric harm must be a recognisable psychiatric illness; sorrow and grief, however severe, are not enough (Ngiam [97]). The PDPA private action is different: it covers emotional distress (Reed v Bellingham)."

**Footnote:** Ngiam Kong Seng v Lim Chiew Hock [2008] 3 SLR(R) 674 at [97]; Reed, Michael v Bellingham, Alex [2022] SGCA 60 at [77] and [107].

### 8. Quoine

**Source:** https://www.elitigation.sg/gd/s/2020_SGCAI_02 **[RAW]**

**Citation and court:**
- Quoine Pte Ltd v B2C2 Ltd [2020] SGCA(I) 2, Civil Appeal No 81 of 2019.
- Singapore Court of Appeal, International Commercial Court bench: Menon CJ, Phang JA, Prakash JA, Robert French IJ and Jonathan Mance IJ. Heard 14 October 2019; judgment 24 February 2020.
- Menon CJ delivered the judgment of the majority. Mance IJ dissented on unilateral mistake.
- [2020] 2 SLR 20 is confirmed by a Singapore Academy of Law Journal case note (https://journalsonline.academypublishing.org.sg/Journals/Singapore-Academy-of-Law-Journal/e-Archive/ctl/eFirstSALPDFJournalView/mid/495/ArticleId/1624/Citation/JournalsOnlinePDF) **[SEC]**.
- The first-instance decision is B2C2 Ltd v Quoine Pte Ltd [2019] 4 SLR 17 **[RAW]**.

**Majority, deterministic programs (all [RAW]):**
- [15]: the Trading Software "does not have the capacity to develop its own responses to varying conditions".
- [97]: "in cases where contracts are made by way of deterministic algorithms, any analysis concerning knowledge of a mistake or unconscionably taking advantage of one must be done by reference to the state of mind of the programmers of the algorithms at the time of the programming".
- [98]: "we are driven to assess the relevant state of knowledge by examining that of the programmers".
- [99]: the relevant time frame runs "from the point of programming up to the point that the relevant contract is formed". This widens "at the time of programming".

**The AI passage (all [RAW]):**
- The exact words: "the law in relation to the way in which ascertainment of knowledge in cases where computers have replaced human actions is to be determined will, no doubt, develop as legal disputes arise as a result of such actions. This will particularly be the case where the computer in question is creating artificial intelligence and could therefore be said to have a mind of its own."
- These are paragraph [206] of the first-instance judgment, quoted in Mance IJ's dissent at [185] of the Court of Appeal judgment (after "The Judge dealt with the issue as follows:").
- The Court of Appeal text contains no "mind of its own" statement in the majority judgment.
- Mance IJ's own comment is at [193]: "The law must be adapted to the new world of algorithmic programmes and artificial intelligence".

**Verdict:** Wrong in part.
- "Contract case on unilateral mistake" is correct.
- "Majority assessed knowledge by the programmer's state of mind" is correct, for deterministic algorithms.
- "The court indicated the analysis might differ for AI" is wrong as to the majority. It was the trial judge, in a passage quoted in the dissent.

**Slide wording:** "Quoine: for deterministic algorithms, the majority looked to the programmers' knowledge ([97]-[99]). The trial judge had flagged that AI that 'could ... be said to have a mind of its own' may differ ([2019] 4 SLR 17 at [206], quoted at [185] of the CA judgment, in the dissent of Mance IJ)."

**Footnote:** Quoine Pte Ltd v B2C2 Ltd [2020] 2 SLR 20 at [97]-[99]; B2C2 Ltd v Quoine Pte Ltd [2019] 4 SLR 17 at [206], quoted in Quoine at [185] (Mance IJ dissenting). The reported-volume pinpoints are not verified; the paragraph numbers above are the neutral-citation numbers on eLitigation.

### 9. Vicarious liability

**Sources:**
- https://www.elitigation.sg/gd/s/2011_SGCA_22 **[RAW]**
- https://www.elitigation.sg/gd/s/2017_SGCA_58 **[RAW]**

**Skandinaviska:**
- Skandinaviska Enskilda Banken AB (Publ), Singapore Branch v Asia Pacific Breweries (Singapore) Pte Ltd and another and another appeal [2011] SGCA 22, Civil Appeals 121 and 122 of 2009.
- Court of Appeal (Chan Sek Keong CJ, Chao Hick Tin JA, Phang JA), 19 May 2011.
- [2011] 3 SLR 540 is confirmed by Ng Huat Seng at [28] **[RAW]**.
- Facts: the company's finance manager, Chia, defrauded two banks over four years.
- Decision: [75] adopts the "close connection" test ("examine all the relevant circumstances – including policy considerations – and determine whether it would be fair and just to impose vicarious liability on the employer"). At [89] the court applies it and holds APBS not vicariously liable for the fraud ("the connection was in fact illusory" at [90]).

**Ng Huat Seng:**
- Ng Huat Seng and another v Munib Mohammad Madni and another [2017] SGCA 58, Civil Appeal No 99 of 2016. Court of Appeal (five judges), Menon CJ delivered the grounds, 26 September 2017.
- [41]-[44]: there are "two separate inquiries" in deciding vicarious liability.
  - First, the relationship between defendant and tortfeasor must be "of sufficient closeness such as would make it fair, just and reasonable to impose liability".
  - Second, "whether there is a sufficient connection between the relationship ... and the commission of the tort. Has that relationship created or significantly enhanced the risk of the tort being committed?"
- [67]: Skandinaviska's close connection test "presupposed the existence of an employment relationship" and addresses the second inquiry.
- The SLR citation [2017] 2 SLR 1074 comes only from search results **[SUMM]**. I could not match it in raw text.

**Verdict:** Correct with qualification. Skandinaviska is a leading case on the close-connection test for intentional wrongs. Ng Huat Seng is the leading modern framework.

**Why it matters for the presentation:** OpenAI-SG's liability for its employees' negligence needs only the employment relationship plus ordinary course-of-employment reasoning. A fraud case is an odd lead authority for that. Vicarious liability does not cover the AI agents themselves, which are not tortfeasors.

**Slide wording:** "Vicarious liability: a relationship akin to employment, plus a sufficiently close connection between that relationship and the tort (Ng Huat Seng [41]-[44]; Skandinaviska for the 'close connection' test)."

**Footnote:** Ng Huat Seng v Munib Mohammad Madni [2017] 2 SLR 1074 at [41]-[44] and [67]; Skandinaviska Enskilda Banken AB (Publ), Singapore Branch v Asia Pacific Breweries (Singapore) Pte Ltd [2011] 3 SLR 540 at [75].

### 10. Contributory negligence

**Sources:**
- https://www.elitigation.sg/gd/s/2016_SGCA_16 **[RAW]**
- https://www.elitigation.sg/gd/s/2024_SGHC_36 **[RAW]**
- Civil Law Act 1909 (2020 Rev Ed), s 16(3)(b) **[RAW]**.

**Passages:**
- [2016] SGCA 16 quotes the Cap 54, 2002 Rev Ed wording of s 3(1): "Where any person suffers damage as the result partly of his own fault and partly of the fault of any other person or persons, a claim in respect of that damage shall not be defeated by reason of the fault of the person suffering the damage, but the damages recoverable in respect thereof shall be reduced to such extent as the court thinks just and equitable having regard to the claimant's share in the responsibility for the damage."
- [2024] SGHC 36 at [60] cites "s 3(1) of the Contributory Negligence and Personal Injuries Act 1953 (2020 Rev Ed)".
- Civil Law Act s 16(3)(b) refers to "any reduction by virtue of section 3 of the Contributory Negligence and Personal Injuries Act 1953".

**Verdict:** Correct. The title is right. The provision is s 3(1). The Act is a partial defence that reduces damages.

**Slide wording:** "Contributory negligence reduces damages; it does not bar the claim (Contributory Negligence and Personal Injuries Act 1953, s 3(1))."

**Footnote:** Contributory Negligence and Personal Injuries Act 1953 (2020 Rev Ed), s 3(1).

**Caveat:** I read the 2020 Rev Ed text of s 3(1) only through judgments that cite or quote it. The official SSO copy returned 403. The quoted wording is the older Rev Ed text. I have no sign it changed in substance.

### 11. Remoteness

**Sources (all [RAW]):**
- https://www.elitigation.sg/gd/s/2007_SGCA_4
- https://www.elitigation.sg/gd/s/2007_SGCA_36
- https://www.elitigation.sg/gd/s/2026_SGCA_33

**Passages:**
- Ho Soo Fong and Another v Standard Chartered Bank [2007] SGCA 4; [2007] 2 SLR(R) 181; Court of Appeal (Chan Sek Keong CJ, Lee Seiu Kin J, Phang JA), 29 January 2007. At [39]: Wagon Mound "confirmed that the test of remoteness for most torts is that the damage has to be of such a kind as the reasonable man should have foreseen"; "These principles have been accepted in Singapore: see Fong Maun Yee v Yoong Weng Ho Robert [1997] 2 SLR 297 at [53]." The Fong Maun Yee citation is not independently verified.
- Sunny Metal & Engineering Pte Ltd v Ng Khim Ming Eric [2007] SGCA 36; [2007] 3 SLR(R) 782; Court of Appeal, 26 July 2007. At [56] it separates causation from "remoteness of damage". At [59] it notes remoteness principles differ between contract and tort, citing The Wagon Mound and Hadley v Baxendale.
- Deloitte & Touche LLP v Hin Leong Trading (Pte) Ltd (in compulsory liquidation) [2026] SGCA 33 (five-judge Court of Appeal; judgment reserved 16 July 2026).
  - [67]: Wagon Mound "establishes that loss is too remote to be recoverable if it is of a type that was not reasonably foreseeable at the time of the defendant's breach of duty. The test in Wagon Mound has been affirmed and applied by our courts: see, for example, Ho Soo Fong v Standard Chartered Bank [2007] 2 SLR(R) 181 at [39]; Sunny Metal (CA) at [56]."
  - [68]: the contractual remoteness rules in Hadley v Baxendale "are narrower than the Wagon Mound test", and apply where concurrent duties exist in contract and tort.

**Verdict:** Correct. Supply the Singapore authority.

**Slide wording:** "Remoteness in tort: loss of a type not reasonably foreseeable at breach is too remote (The Wagon Mound (No 1), applied in Singapore: Ho Soo Fong at [39]; Deloitte v Hin Leong at [67])."

**Footnote:** Ho Soo Fong v Standard Chartered Bank [2007] 2 SLR(R) 181 at [39]; Deloitte & Touche LLP v Hin Leong Trading (Pte) Ltd [2026] SGCA 33 at [67].

**Flag:** The slide also calls Hugging Face an existing OpenAI "customer". If a contract claim runs alongside, [68] says the narrower Hadley v Baxendale rule can apply.

### 12. Rylands v Fletcher

**Source:** PEX International Pte Ltd v Lim Seng Chye and another appeal [2019] SGCA 82, Civil Appeals 181 and 183 of 2018; Court of Appeal (Menon CJ, Phang JA, Chong JA); heard 17 October 2019; grounds 19 December 2019. https://www.elitigation.sg/gd/s/2019_SGCA_82 **[RAW]**

**Passages (all [RAW]):**
- [66]: "The English authorities are united in the view that the rule in Rylands v Fletcher is a sub-species of the tort of nuisance."
- [69]: "we do not see any good reason to depart from the English authorities that describe the rule in Rylands v Fletcher as a sub-species of nuisance and leave the question of whether it should be subsumed entirely within the tort of nuisance to a more appropriate case ... the authorities uniformly establish that foreseeability of the risk of harm is not relevant to determining liability under the rule."
- [68]: it is "an open question whether it remains necessary to preserve the distinction between nuisance and the rule in Rylands v Fletcher".
- [70]: the appeal on the rule failed because "there was non-natural use of the land and there was an escape of a dangerous object onto Lim's property" (sparks from hot works; fire damage to neighbouring building).

**Verdict:** The status can be stated. The non-physical escape point could not be verified.

**Status:** The rule is good law in Singapore as a sub-species of nuisance. It is not abolished. Whether it is subsumed into nuisance is expressly left open.

**Escape of data:** I found no Singapore case applying Rylands or nuisance to non-physical escapes such as data or software. The authorities describe an escape of a physical thing onto the claimant's land, causing damage to land or property on it. Treat this as a long shot, as the notes already say.

**Slide wording:** "Rylands v Fletcher survives in Singapore as a sub-species of nuisance (PEX International v Lim Seng Chye [2019] SGCA 82 at [66]-[70]). It concerns physical escapes onto land; no Singapore case extends it to data."

**Footnote:** PEX International Pte Ltd v Lim Seng Chye [2019] SGCA 82 at [66]-[70]. I did not verify the SLR citation.

### 13. Contribution

**Source:** Civil Law Act 1909 (2020 Rev Ed), informal consolidation in force 15 October 2024. PDF from https://faolex.fao.org/docs/pdf/sin248275.pdf **[RAW, non-official copy]**. SSO returned 403.

**Text (all [RAW]):**
- s 15(1): "Subject to subsections (2) to (5), any person liable in respect of any damage suffered by another person may recover contribution from any other person liable in respect of the same damage (whether jointly with him or otherwise)."
- s 16(1): the amount "shall be such as may be found by the court to be just and equitable having regard to the extent of that person's responsibility for the damage in question".
- s 16(2): the court may "exempt any person from liability to make contribution, or ... direct that the contribution to be recovered from any person shall amount to a complete indemnity".
- s 16(3)(b): contribution is capped by any reduction under s 3 of the Contributory Negligence and Personal Injuries Act 1953.

**Verdict:** Correct. Supply ss 15-16.

**Slide wording:** "Contribution between wrongdoers liable for the same damage: Civil Law Act 1909, ss 15-16."

**Footnote:** Civil Law Act 1909 (2020 Rev Ed), ss 15-16.

**Caution:** Section 15 applies only if both parties are liable "in respect of the same damage" to the claimant. Whether Hugging Face's PDPA liability to its users and OpenAI's tort liability to the users are for the same damage is a separate argument. It is my reading of the text, not a verified authority.

### 14. "A duty to everyone whose systems its agents actually enter"

**Verdict:** Wrong as a flat assertion. No Singapore authority supports it.

**What I searched:**
- eLitigation judgments fetched for this review.
- Web searches for Singapore decisions on AI or autonomous software in tort.
- Web searches for data as property damage.

**Findings:**
- **Negligence for autonomous systems or software:** none found. Secondary sources say the same (Singapore Law Gazette; Chambers AI Practice Guide 2026) **[SUMM]**. I did not run an exhaustive LawNet search, which is paywalled. Quoine is contract only and cannot be used for duty.
- **Custodian liability:** the main authorities are English (Home Office v Dorset Yacht [1970] AC 1004; Smith v Littlewoods [1987] AC 241). Both are persuasive only. In Spandeck the only mention I found is the Court of Appeal's Dorset Yacht citation inside an extract from Lord Denning MR's Court of Appeal judgment ([1969] 2 QB 412 at 426). I found no Singapore case applying Dorset Yacht to third-party agents under a defendant's control.
- **Contrary pressure:**
  - Spandeck [73] and [83]: indeterminate liability is the policy brake.
  - Ng Huat Seng [82(b)(ii)] and [103]: an antecedent relationship placing the claimant in the defendant's "custody, charge or care" is needed for a positive duty to protect. Neighbour-type relationships do not suffice.
  - Foodfare [2]-[3]: the proximity requirement is what contains indeterminate liability.
- **Data as property damage:** I found no Singapore decision on whether corrupted or accessed data is property damage in negligence. The nearest is Janesh s/o Rajkumar v Unknown Person [2022] SGHC 264 (Lee Seiu Kin J; urgent ex parte; at [67]-[72] an NFT treated as property under the Ainsworth criteria **[RAW]**). That is a digital-asset and injunction case. It does not decide corrupted data in negligence.
- **Reed v Bellingham [2022] SGCA 60** is a PDPA case, not property damage.

**Slide wording:** "A Singapore court could arguably recognise a duty, incrementally, to claimants whose systems the agents actually entered. No Singapore authority yet; Dorset Yacht is only persuasive."

**Footnote:** Spandeck at [73] and [83]; Ng Huat Seng v Munib Mohammad Madni [2017] 2 SLR 1074 at [82]; Home Office v Dorset Yacht Co Ltd [1970] AC 1004 (HL) (persuasive).

### 15. Acts and omissions

**Source:** https://www.elitigation.sg/gd/s/2017_SGCA_58 **[RAW]**

**Passages:**
- Ng Huat Seng [82(b)(ii)], describing the Tiong Aik framework (Management Corporation Strata Title Plan No 3322 v Tiong Aik Construction Pte Ltd and another [2016] 4 SLR 521): the claimant must show "an antecedent relationship ... which placed the claimant in the defendant's actual custody, charge or care, and from which it was possible to impute to the defendant the assumption of a positive duty to protect the claimant from harm, and not merely a duty to refrain from conduct which would foreseeably harm or injure the claimant".
  - This separates a duty not to cause harm from a positive duty to protect against harm.
- Ng Huat Seng [103]: an ordinary neighbour relationship does not suffice.
- Foodfare [40(b)] (https://www.elitigation.sg/gd/s/2018_SGCA_41) records Anwar Patrick Adrian v Ng Chong & Hue LLC [2014] 3 SLR 761 recognising two "proximity factors": knowledge, and control over the situation giving rise to the risk plus the claimant's corresponding vulnerability. I read this only through Foodfare **[RAW through Foodfare]**.
- Spandeck [71] applies the single test whether the claim arises from "negligent misstatements or acts/omissions".

**Verdict:** Correct with qualification. The "act, not omission" framing is a reasonable argument, but the Singapore authorities say the labels matter less than proximity.

**Slide wording:** "The group's argument: OpenAI's agents are its own instruments, so this is positive conduct. OpenAI will say containment failure is an omission. Singapore law asks about proximity (including control and vulnerability), not the label (Spandeck [71]; Foodfare [40(b)])."

**Footnote:** Spandeck at [71]; NTUC Foodfare [2018] 2 SLR 588 at [40(b)]; Ng Huat Seng [2017] 2 SLR 1074 at [82].

---

## Things I remain unsure about

1. **Reported-volume paragraph numbers.** eLitigation paragraph numbers match the neutral citations. I have not matched them to the SLR(R) report pagination, which can differ (see RSP above). Pinpoints in footnotes use eLitigation numbering.
2. **SLR citations from search results only [SUMM]:** Ng Huat Seng [2017] 2 SLR 1074 and Southern California Gas Leak Cases (2019) 7 Cal.5th 391. The neutral citations are verified.
3. **Whether Spandeck applies to every duty question.** I did not verify whether Singapore courts skip the test where a duty is already established by precedent.
4. **Sheen v Wells Fargo (2022)** and the California treatment of intrusion into the claimant's own systems were not retrieved.
5. **Fong Maun Yee v Yoong Weng Ho Robert [1997] 2 SLR 297 at [53]** is cited by Ho Soo Fong. I did not retrieve it.
6. **Official statute text.** SSO returned 403. Civil Law Act ss 15-16 come from an informal PDF consolidation. The Contributory Negligence Act s 3(1) comes through judgments only.
7. **Anwar Patrick Adrian [2014] 3 SLR 761** was read only through Foodfare. An attempt to fetch it as [2014] SGCA 53 returned an unrelated judgment.
8. **Negative findings.** "No Singapore authority on AI negligence, data as property damage, or the act/omission framing" is the result of my searches, not proof of absence. LawNet was not available.
9. **Stray files in the download folder.** `lawprof.txt`, `michael.txt`, `poole.txt` and `robinson.txt` in the `dl` folder were not created by me. I did not use them.
