# English authorities: adversarial review (Parts 3 and 4 notes)

Reviewed 12 November 2026. Source document: `/root/.claude/uploads/4554aee0-a4f0-5dad-8d6d-91e6563403b9/f24041a0-Digi_Presentation_G1.md` (lines 99, 243-251, 257, 276-280, 310-314, 378, 414).

## Access limits (read first)

- BAILII, bruneis.bailii.org, publications.parliament.uk (House of Lords judgments), Justia and Casemine all returned HTTP 403 to automated requests, both by curl and by the fetch tool. I did not try to get round the block. As a result **no House of Lords or Privy Council judgment from before 2001 could be read in primary text**: Dorset Yacht, Smith v Littlewoods, Hughes, Murphy, Wagon Mound, Rylands, Cambridge Water and Transco.
- What I could read in raw text: UK Supreme Court judgments and Court of Appeal judgments from the National Archives Find Case Law site (caselaw.nationalarchives.gov.uk), and the statute from legislation.gov.uk. Where a pre-2001 case is quoted below, the quotation sits **inside a later judgment that I downloaded**, and is marked that way.
- Status labels used: **[RAW]** = exact string matched in raw source I downloaded with curl. **[RAW-via-later-case]** = exact string matched in a downloaded later judgment that quotes or describes the older case, not in the older judgment itself. **[SUMMARISING TOOL]** = read through the WebFetch summariser. **[SECONDARY]** = secondary source only. **[MEMORY]** = recalled, not checked, and not to be relied on.
- Raw files are in `/tmp/claude-0/-home-user-test/4554aee0-a4f0-5dad-8d6d-91e6563403b9/scratchpad/dl/` (text versions: `robinson.txt`, `michael.txt`, `yr.txt`, `ewca_civ_2012_1248.txt`, `uksc_2025_21.txt`, `ewca_civ_2016_1005.txt`, `ewca_civ_2013_545.txt`, `ewca_civ_2015_586.txt`, `cma.xml`). The paragraph numbers below come from those files.

## Verdict table

| # | Proposition | Verdict | One-line correction |
|---|---|---|---|
| 1 | Dorset Yacht: duty, limited to owners in the vicinity; "custodian liable for those who escape its control" | **Correct with qualification (significant)** | It was a preliminary issue on assumed facts, decided 4-1, so the Home Office was held capable of owing a duty, not found negligent. Liability is for the officers' own carelessness in exercising control, not for the escapees' acts. "Custodian liable for those who escape" overstates it. |
| 2 | Smith v Littlewoods [1987] AC 241: wary of duties to prevent harm by independent third parties | **Correct** | Citation confirmed. It was a Scottish appeal to the HL, and Lord Goff's speech identified exceptions to the omissions rule. |
| 3 | Robinson [2018] UKSC 4 on acts and omissions | **Correct with qualification** | Citation right. The "failing to brake" point is Lord Reed's para 69(5), adopting Lord Hoffmann in Stovin v Wise. Robinson does not say "lapses are treated as part of the act" in those words. |
| 4 | Hughes v Lord Advocate [1963] AC 837 | **Correct with qualification** | Citation confirmed. The type of harm must be foreseeable; the manner may not be. It is a Scottish appeal, and it does not cover an unforeseeable different kind of harm. |
| 5 | Murphy [1991] 1 AC 398: pure economic loss generally irrecoverable | **Correct with qualification** | Citation confirmed. Murphy is the defective-building case that overruled Anns. The general rule rests on Cattle and Spartan Steel; Murphy is the authority that the cost of repairing a defective thing is pure economic loss. |
| 6 | Your Response v Datateam [2014] EWCA Civ 281 | **Correct with qualification** | Citation right. Held that a database cannot be the subject of a possessory lien because it is not capable of possession. It did not decide that data is not property. |
| 7 | Wagon Mound No 1 [1961] AC 388 (PC) | **Correct** | Privy Council, on appeal from New South Wales. Test: damage of a kind reasonably foreseeable. |
| 8 | Rylands v Fletcher (1868) LR 3 HL 330; tied to land and to physical things; narrowed | **Correct with qualification** | Citation right. "Tied to land" is right. "Physical things" is not a stated requirement. Narrowing authorities are Cambridge Water [1994] 2 AC 264 and Transco [2003] UKHL 61, [2004] 2 AC 1. |
| 9 | Computer Misuse Act 1990 s 1: intent to secure access and knowledge it is unauthorised | **Correct with qualification** | The text also needs an act causing a computer to perform a function, and s 1(1)(b) and (c) tie the knowledge to the access intended. Intent need not be directed at any particular data (s 1(2)). |
| 10 | Closer analogy than Dorset Yacht? | **Could not verify any closer common-law authority** | I found none. Nearest are Hartwell (PC) on a dangerous instrument entrusted to someone who misused it, and the statutory regime in the Automated and Electric Vehicles Act 2018 s 2. |

---

## 1. Home Office v Dorset Yacht Co Ltd [1970] AC 1004 (HL)

**Primary text not reachable (403).** Everything below is from later Supreme Court judgments and one encyclopaedia summary.

**Passages relied on**

- Michael v Chief Constable of South Wales Police [2015] UKSC 2, Lord Toulson, para 39 **[RAW-via-later-case]**: "In that case it was held that an action in negligence could lie against prison officers who negligently allowed young offenders camping on an island under the prison officers' supervision to escape from the island by stealing the plaintiffs' yacht. The reason for imposing liability was that the prison officers were responsible for exercising proper control over the wrong-doers, who were in their charge, and there was sufficient proximity between the prison officers and the owners of yachts in the close vicinity of the camp, because the use of their property as a means of escape was the very thing which the prison officers ought to have foreseen. By bringing the young offenders onto the island and leaving them unsupervised, the prison officers created a danger for the owners of the yachts which would not otherwise have existed."
- Michael, para 99 **[RAW-via-later-case]**: "The first is where D was in a position of control over T and should have foreseen the likelihood of T causing damage to somebody in close proximity if D failed to take reasonable care in the exercise of that control. Dorset Yacht is the classic example, and in that case Lord Diplock set close limits to the scope of the liability."
- Robinson v Chief Constable of West Yorkshire Police [2018] UKSC 4, Lord Reed, para 72 **[RAW-via-later-case]**, quoting Lord Reid at p 1027: "the ground of liability is not responsibility for the acts of the escaping trainees; it is liability for damage caused by the carelessness of these officers in the knowledge that their carelessness would probably result in the trainees causing damage of this kind".
- Robinson, para 37 (Lord Reed) **[RAW-via-later-case]**: public authorities may owe a duty "where the public authority has created a danger of harm which would not otherwise have existed ... The first type of situation is illustrated by Dorset Yacht".
- Procedure and vote: Wikipedia, https://en.wikipedia.org/wiki/Dorset_Yacht_Co_Ltd_v_Home_Office, read through WebFetch **[SECONDARY / SUMMARISING TOOL]**. It says a preliminary issue asked whether the officers or the Home Office owed a duty of care, the House held 4-1, and Viscount Dilhorne dissented. It also says ten trainees were on Brownsea Island and seven escaped. I could not confirm these from a judgment. A student revision site (lawprof.co) says the officers' duty was "breached" and gives a muddled account of the speeches. **It is wrong that breach was decided and should not be used**; I did not rely on it.

**Fact points still unverified:** Michael para 39 says the trainees escaped "by stealing the plaintiffs' yacht", while Wikipedia says they boarded a yacht and collided with the plaintiffs' yacht. The two secondary accounts differ, so the slide should say only "escaped and damaged yachts".

**Errors and overstatements in the proposition**

1. "Held to owe the yacht owners a duty": the case was a preliminary issue on assumed facts. The House held the Home Office could be liable if the officers were negligent. Breach and negligence went to trial.
2. "Custodian liable for those who escape its control" (Part 4 line 414): this is the wrong rationale. Lord Reid (quoted in Robinson para 72) says liability is for the officers' own carelessness, not for the trainees' acts. The control relationship is a necessary condition, not the basis of liability.
3. Limits: Toulson says Lord Diplock "set close limits" (para 99). The two features in the note (vicinity, foreseeable consequence of escape) are fair, but Toulson's own words show the real triggers: control over the wrongdoer, a danger the defendant created, and use of the claimant's property as a means of escape being "the very thing" the officers should have foreseen. I could not check Lord Diplock's own wording, so I do not give a page reference for his limits.
4. The "no vicinity on the internet" point is the group's inference and not a holding. Dorset is a case about property near the camp.

**Slide wording:** "Dorset Yacht (HL, 1970): borstal officers who left trainees unsupervised could be liable to owners of yachts moored nearby when trainees escaped and damaged them. The duty rested on control over the trainees, a danger the Home Office created, and close proximity. It is liability for the officers' own carelessness, not for the trainees' acts."

**Citation:** Home Office v Dorset Yacht Co Ltd [1970] AC 1004 (HL). Also cited as Dorset Yacht Co Ltd v Home Office (Robinson, Michael). I did not verify the neutral citation [1970] UKHL 2; it appears in a search-engine snippet of the BAILII page only.

---

## 2. Smith v Littlewoods Organisation Ltd [1987] AC 241

**Primary text not reachable.**

- Michael, Lord Toulson, para 97 **[RAW-via-later-case]**: "English law does not as a general rule impose liability on a defendant (D) for injury or damage to the person or property of a claimant (C) caused by the conduct of a third party (T): Smith v Littlewoods Organisation Ltd [1987] AC 241, 270 (a Scottish appeal in which a large number of English and Scottish cases were reviewed). The fundamental reason, as Lord Goff explained, is that the common law does not generally impose liability for pure omissions."
- Robinson, Lord Hughes, para 114 **[RAW-via-later-case]**: disused cinema, vandals started a fire; "no doubt, a case of pure omission, and was so analysed by Lord Goff, although not by the majority of the House of Lords, through Lord Mackay". Para 115: Lord Goff "identified at any rate several situations where such liability is imposed", including assumption of responsibility and occupier's knowledge of previous incursions.
- Robinson, Lord Reed, para 37 names Littlewoods for the rule that public authorities, like private persons, "generally owe no duty of care towards individuals to prevent them from being harmed by the conduct of a third party".

**Verdict:** correct. Add that the House was divided on how to characterise the case (omission per Lord Goff, not per the majority). The "independent third party" wording is the note's own, though it matches Toulson's "caused by the conduct of a third party".

**Slide wording:** "The general rule: no duty to stop a third party harming someone, absent special circumstances (Smith v Littlewoods [1987] AC 241, HL on appeal from Scotland; applied in Michael [2015] UKSC 2 at [97])."

**Citation:** Smith v Littlewoods Organisation Ltd [1987] AC 241 (HL, Scottish appeal), at 270 for the general rule.

---

## 3. Robinson v Chief Constable of West Yorkshire Police [2018] UKSC 4

Source: https://caselaw.nationalarchives.gov.uk/uksc/2018/4, raw HTML downloaded and text-extracted. Neutral citation confirmed in the file header.

- Lord Reed, para 69(4) **[RAW]**: "The distinction between careless acts causing personal injury, for which the law generally imposes liability, and careless omissions to prevent acts (by other agencies) causing personal injury, for which the common law generally imposes no liability, is not a mere alternative to policy-based reasoning, but is inherent in the nature of the tort of negligence."
- Para 69(5) **[RAW]**: "The argument that most cases can be equally analysed in terms of either an act or an omission, sometimes illustrated by asking whether a road accident is caused by the negligent driver's act of driving or by his omission to apply the brakes or to keep a good lookout, does not reflect the true nature and purpose of the distinction, as explained above." It then quotes Lord Hoffmann in Stovin v Wise at p 945: "If I am driving at 50 miles an hour and fail to apply the brakes, the motorist with whom I collide can plausibly say that the damage was caused by my driving into him at 50 miles an hour."
- Para 69 is Lord Reed's reply to Lord Hughes, set out as numbered points inside the paragraph.
- Para 72 **[RAW]**: the police were not like defendants in "pure omissions"; "In such cases the defendant played no active part in the critical events."

**Qualification:** the slide's analogy ("failing to brake is part of negligent driving") is supported, but the source for it is Lord Reed at para 69(5), adopting Lord Hoffmann in Stovin v Wise [1996] AC 923, 945. Robinson does not say "lapses in how you carry out an activity are treated as part of the act". Cite the paragraph, and do not put the group's wording inside quotation marks. Note too that Lord Hughes (paras 113-117) disagreed with the rigidity of an act/omission test, so the point is not unanimous in reasoning, although the result was.

**Slide wording:** "Negligent driving is an act even if the failure is a failure to brake (Robinson [2018] UKSC 4 at [69(5)], adopting Lord Hoffmann in Stovin v Wise). Liability for causing harm is the norm; liability for failing to prevent harm by others is the exception ([69(4)])."

**Citation:** Robinson v Chief Constable of West Yorkshire Police [2018] UKSC 4. (The AC report reference was not checked.)

---

## 4. Hughes v Lord Advocate [1963] AC 837

**Primary text not reachable.** Citation and proposition checked in three Court of Appeal judgments (National Archives, raw text).

- Lowdon v Jumpzone Leisure UK Ltd [2015] EWCA Civ 586, para 23 **[RAW-via-later-case]**: "vertebral artery dissection, rather than personal injury in general, needed to be foreseeable: see e.g. The Wagon Mound [No1] [1961] AC 388; Hughes v. Lord Advocate [1963] AC 837."
- Edwards v London Borough of Sutton [2016] EWCA Civ 1005, para 38 **[RAW-via-later-case]**: in Hughes there "was a clear potential danger presented by the lighted lamp. It was, as Lord Reid put it, 'a known source of danger' ([1963] AC at p.845)." The same judgment, para 46 (quoting the trial judge), describes Hughes as holding that "the fact that the damage occurred in an unforeseeable way was held not to mean that it was not foreseeable in a sense relevant in the law".
- Hide v Steeplechase Co (Cheltenham) Ltd [2013] EWCA Civ 545, para 26 **[RAW-via-later-case]** treats the "very unusual" way of injury as questionable ground to defeat liability "in the light of Hughes v Lord Advocate [1963] AC 837".

**Verdict:** correct with qualification. The limit is that the harm that occurs must be of the foreseeable type. I did not read the speeches, so I cannot give the well-known facts (paraffin lamp, explosion, burns) with a source; I recall them but leave them off the slide unless the group reads the case. It is a House of Lords appeal from the Court of Session (Scotland), and Lord Reid at 845 stressed the known source of danger.

**Slide wording:** "Hughes v Lord Advocate [1963] AC 837 (HL): the defendant is liable if the kind of harm was foreseeable, even if the precise way it happened was not."

**Citation:** Hughes v Lord Advocate [1963] AC 837 (HL, Scotland).

---

## 5. Murphy v Brentwood District Council [1991] 1 AC 398

**Primary text not reachable.**

- URS Corporation Ltd v BDW Trading Ltd [2025] UKSC 21, para 27 **[RAW-via-later-case]**: "the relevant 'damage' is not physical damage to the building but is rather the pure economic loss of having a defective building which has a lower value than it should have had and/or requires repair: see Murphy v Brentwood District Council [1991] 1 AC 398 ('Murphy v Brentwood') (overruling Anns v Merton London Borough Council [1978] AC 728 ('Anns v Merton')). In general, there is no duty of care owed in the tort of negligence not to cause another person pure economic loss: see, eg, Cattle v Stockton Waterworks Co (1875) LR 10 QB 453; Spartan Steel & Alloys Ltd v Martin & Co (Contractors) Ltd [1973] QB 27; Armstead v Royal & Sun Alliance Insurance Co Ltd [2024] UKSC 6; [2025] AC 406, para 20".
- Robinson, para 38 **[RAW-via-later-case]**: Anns "was overruled in Murphy v Brentwood District Council [1991] 1 AC 398 on a limited basis".

**Qualifications**

- Murphy is the right citation for the classification of the cost of repairing a defective thing as pure economic loss, and for the overruling of Anns. The Supreme Court's own authorities for the general exclusionary rule are Cattle and Spartan Steel; Murphy should not be presented alone as the source of the rule.
- Losses that follow physical damage to the claimant's property are not pure economic loss. If the Hugging Face intrusion damaged or corrupted its systems, the proposition in the note (line 276: incident-response cost "risks being classified as pure economic loss") needs the point that the classification depends on whether there was damage to property (see the Your Response discussion in item 6).
- The Murphy "defective building" line is a separate question from the Hedley Byrne exception. Do not leave it unsaid that England's rule has exceptions.

**Slide wording:** "England: no general duty not to cause pure economic loss (Spartan Steel [1973] QB 27; URS v BDW [2025] UKSC 21 at [27]). Murphy [1991] 1 AC 398 treats the cost of repairing a defective thing as pure economic loss."

**Citation:** Murphy v Brentwood District Council [1991] 1 AC 398 (HL).

---

## 6. Your Response Ltd v Datateam Business Media Ltd [2014] EWCA Civ 281

Source: https://caselaw.nationalarchives.gov.uk/ewca/civ/2014/281, raw HTML downloaded; judgment date 14 March 2014 (confirmed in file). Moore-Bick, Davis and Floyd LJJ.

- Para 1 **[RAW]**: "It raises an interesting and important question, namely, whether it is possible to exercise a common law possessory lien over an electronic database."
- Para 17 (Moore-Bick LJ) **[RAW]**: information of the kind that makes up a database "if it constitutes property at all, does not constitute property of a kind that is susceptible of possession or of being the subject of the tort of conversion".
- Para 26 **[RAW]**: "In my view that decision makes it very difficult to accept that the common law recognises the existence of intangible property other than choses in action (apart from patents, which are subject to statutory classification), but even if it does, the decision in OBG v Allan prevents us from holding that property of that kind is susceptible of possession so that wrongful interference can constitute the tort of conversion. It follows, in my view, that it is equally not susceptible to the exercise of a possessory lien."
- Para 20 **[RAW]**: distinguishes the disk or medium (tangible) from the data (not).
- Para 42 (Floyd LJ) **[RAW]**: "Whilst the physical medium and the rights are treated as property, the information itself has never been."
- Para 36 **[RAW]**: the publisher's appeal allowed in part. The data manager had no lien and was in breach in refusing to supply a copy.

**Qualification:** the holding is that a database cannot be possessed, so no lien and no conversion. Moore-Bick LJ left open whether data is "property at all" ("if it constitutes property at all"), so "data is not property" is too strong for the court's words. Floyd LJ's para 42 is closer to that, but it is an observation. The case is about intangible information, and a corrupted database on a server is a different question (damage to a medium that is tangible, per para 20). English law may have moved on since 2014 (digital assets legislation); I did not check any later authority and flag this as unsure.

**Slide wording:** "Your Response v Datateam [2014] EWCA Civ 281: a database cannot be possessed, so no possessory lien (and no conversion) over it. The court left open whether data is 'property at all'; Floyd LJ said information itself 'has never been' property."

**Citation:** Your Response Ltd v Datateam Business Media Ltd [2014] EWCA Civ 281, [2015] QB 41 (the QB reference is from memory, not checked).

---

## 7. Overseas Tankship (UK) Ltd v Morts Dock & Engineering Co Ltd (The Wagon Mound No 1) [1961] AC 388

**Primary text not reachable.**

- Westlaw case analysis (Sweet & Maxwell / Thomson Reuters), 1961 WL 20739, hosted at https://www.law.berkeley.edu/files/Wagon_Mound_1.pdf, downloaded and converted with pdftotext **[SECONDARY: a case digest, not the judgment]**. It records: "Privy Council (Australia) 18 January 1961"; reported [1961] A.C. 388; "A plaintiff can recover as damages for the negligence of the defendant compensation for resulting damage only if that damage could have been foreseen by a reasonable man. It is not enough that the damage was a direct consequence of the negligent act." It also records Re Polemis "not followed". Judges listed: Viscount Simonds, Lord Reid, Lord Radcliffe, Lord Tucker, Lord Morris of Borth-y-Gest.
- Lowdon [2015] EWCA Civ 586, para 23 **[RAW-via-later-case]** cites "The Wagon Mound [No1] [1961] AC 388" for foreseeability of the type of damage, not the particular injury.

**Verdict:** correct. The court is the Judicial Committee of the Privy Council, on appeal from the Supreme Court of New South Wales. Correct the slide so it says "type or kind of damage reasonably foreseeable" and that the case displaced the "direct consequence" test of Re Polemis. Persuasive in England only in the sense of being binding practice there; for Singapore it is persuasive and the group already flags the adoption authority as unchecked.

**Slide wording:** "The Wagon Mound (No 1) [1961] AC 388 (PC): damage is recoverable only if damage of that kind was reasonably foreseeable; the 'direct consequence' test in Re Polemis is not followed."

**Citation:** Overseas Tankship (UK) Ltd v Morts Dock and Engineering Co Ltd (The Wagon Mound) [1961] AC 388 (PC).

---

## 8. Rylands v Fletcher (1868) LR 3 HL 330 and the narrowing authorities

**Primary texts not reachable.** Source used: Stannard (t/a Wyvern Tyres) v Gore [2012] EWCA Civ 1248 (Court of Appeal), https://caselaw.nationalarchives.gov.uk/ewca/civ/2012/1248, which quotes Cambridge Water and Transco at length and states the test.

- Para 20, quoting Transco para 9 **[RAW-via-later-case]**: "The rule in Rylands v Fletcher is a sub-species of nuisance, which is itself a tort based on the interference by one occupier of land with the right in or enjoyment of land by another occupier of land as such. ... There must, in other words, be an escape from one tenement to another. Second, the claim cannot include a claim for death or personal injury, since such a claim does not relate to any right in or enjoyment of land."
- Para 17, quoting Cambridge Water at 306 **[RAW-via-later-case]**: "foreseeability of damage of the relevant type should be regarded as a prerequisite of liability in damages under the rule."
- Para 22 (the court's own statement of the test) **[RAW]**: the defendant must be an owner or occupier of land and must bring or keep an "exceptionally dangerous or mischievous thing" there; the use must be "extraordinary and unusual"; "the thing must escape from his property into or onto the property of another"; damage must be of a relevant kind "to the rights and enjoyment of the claimant's land"; and "Damages for death or personal injury are not recoverable."
- Para 19: Transco is "the latest and last word", and the House refused to absorb the rule into negligence ("So the rule remains the law of the land").
- Para 18: Lord Goff in Cambridge Water at 308 on "natural use" extended to "ordinary use".
- Citations inside Stannard: (1868) LR 3 HL 330 appears at pp 339-340 for Lord Cairns and Lord Cranworth; Cambridge Water Co v Eastern Counties Leather plc [1994] 2 AC 264; Transco plc v Stockport MBC [2003] UKHL 61, [2004] 2 AC 1 (Stannard gives "[2004] 2 AC 1" in one place and "[2004] 2 AC 251" in another; **the page reference needs checking against the report**, and I rely on "[2004] 2 AC 1").

**Qualification**

- "Tied to land": correct, and it should be put as a requirement that the claimant has an interest in land and that something escapes from the defendant's land to the claimant's land (Transco para 9). That is the strongest reason it fits poorly: Hugging Face's loss is not damage to a right in or enjoyment of land.
- "Escape of physical things": the cases speak of a "thing" and "something dangerous". I found no authority that states a "physical" requirement, nor any that applies the rule to data or software. Present the point as the group's inference (that data is not a thing, and no land is involved), not as a rule.
- "English law has narrowed it": better put as "retained but confined": Cambridge Water added foreseeability of the relevant damage; Transco refused to abolish it but required an exceptionally dangerous thing, extraordinary and unusual use, and excluded personal injury.

**Slide wording:** "Rylands v Fletcher (1868) LR 3 HL 330: strict liability of an occupier for the escape of an exceptionally dangerous thing from his land onto a neighbour's land. Confined by Cambridge Water [1994] 2 AC 264 (foreseeability) and Transco [2003] UKHL 61, [2004] 2 AC 1 (a sub-species of nuisance; no personal injury). No land, no claim."

---

## 9. Computer Misuse Act 1990 (UK), s 1

Source: https://www.legislation.gov.uk/ukpga/1990/18/section/1/data.xml, raw XML downloaded (current revised text; page metadata dated 2023-02-27). **[RAW]**

Text of s 1(1), exact string matched: "A person is guilty of an offence if— (a) he causes a computer to perform any function with intent to secure access to any program or data held in any computer, or to enable any such access to be secured; (b) the access he intends to secure, or to enable to be secured, is unauthorised; and (c) he knows at the time when he causes the computer to perform the function that that is the case."

Section 1(2): the intent "need not be directed at— (a) any particular program or data; (b) a program or data of any particular kind; or (c) a program or data held in any particular computer."

Section 1(3): penalties (summary conviction; on indictment up to two years). Reading of the penalty wording: on conviction on indictment, imprisonment not exceeding two years or a fine or both (**[RAW]**, same file).

**Verdict:** the note's summary is right as far as it goes. It leaves out (i) the act element, causing a computer to perform a function; (ii) that the intent can be to "enable" access by another; (iii) that unauthorised-ness is of "the access he intends to secure" and knowledge must exist "at the time" of the function; and (iv) s 1(2). The group's later claim that there is no recklessness tier is consistent with the text of s 1. The note says the UK position is "closer to Singapore's position". I did not read the Singapore Act in this exercise and cannot confirm it.

**Slide wording:** "CMA 1990 s 1: causing a computer to perform a function, with intent to secure unauthorised access, knowing at that time the access is unauthorised. No recklessness; intent need not target particular data (s 1(2))."

---

## 10. Closer analogy than Dorset Yacht for harm by an autonomous system or escaping software?

**Answer: none found. Could not verify any.** I searched the National Archives Find Case Law database by keyword and read the cases above; I did not search reported English, Scottish or other Commonwealth reports systematically, and BAILII and CommonLII were not accessible. I found no English or other Commonwealth appellate authority imposing liability for harm caused by autonomous software or an AI agent that left its operator's control. The absence is a limit of this search, not proof that none exists.

Candidates, with how far each is checked:

- **Dorset Yacht remains the right structural analogy** for "a defendant who put a dangerous capability in a situation where it could escape and harm nearby property". Michael para 39 and Robinson paras 37 and 70 **[RAW-via-later-case]** describe Dorset as a case where the defendant "created a danger of harm which would not otherwise have existed". That framing helps the group more than "custodian liable", since the OpenAI agents were created and launched by OpenAI.
- **Attorney General of the British Virgin Islands v Hartwell [2004] 1 WLR 1273 (PC)**: Robinson para 37 and para 70 **[RAW-via-later-case]** treat it, with Dorset Yacht, as an example of a duty to protect against a danger the defendant had itself created, including danger resulting from human agency. In Hartwell a police officer given a firearm used it. I recall the facts from memory; the descriptions I read in Robinson do not set them out, so **the facts are [MEMORY]**. Its value is the handing of a dangerous instrument to someone who then misuses it, which may be closer to "deploying an agent with offensive capabilities" than an escape. Treat as a possible addition, not a replacement.
- **Smith v Littlewoods [1987] AC 241** and **Goldman v Hargrave** (PC) concern the occupier who knows of a risk arising on his land (Robinson paras 69(7), 115). These support the "knowledge of the risk" point rather than being a closer analogy.
- **Statute, not common law:** Automated and Electric Vehicles Act 2018, s 2 (heading verified at legislation.gov.uk: "Liability of insurers etc where accident caused by automated vehicle"), now amended by the Automated Vehicles Act 2024 (listed in the effects data of the same page). I read the section heading only, not the body. It is a regime that attributes damage caused by an automated vehicle to an insurer or owner without proof of fault by a human. It shows the legislature choosing a statutory answer for autonomous systems, and it is not a common-law analogy.
- **Not checked, from memory only [MEMORY]:** Moffatt v Air Canada, 2024 BCCRT 149 (a British Columbia tribunal holding a company answerable for what its chatbot told a customer; a small-claims forum and a misrepresentation claim, so of little weight here); Quoine Corp v B2C2 Ltd [2020] SGCA(I) 02 (Singapore, trading algorithms and mistake in contract, not tort for harm to a third party). I could not download Quoine from the Singapore judiciary site in this session, so I give no holding for it. Thaler v Comptroller-General [2023] UKSC 49 (an AI cannot be an inventor under the Patents Act) was downloaded but I did not read it, and it does not address liability for harm.

---

## Matters on which I remain unsure

1. **Every pre-2001 House of Lords and Privy Council case** (Dorset Yacht, Smith v Littlewoods, Hughes, Murphy, Wagon Mound, Rylands, Cambridge Water, Transco, Stovin v Wise) was read only through later judgments or a digest. Someone with BAILII or Westlaw access should check page references (especially Lord Diplock's limits in Dorset Yacht, and Lord Reid's remarks at 1027 and 1030) before they go on a slide.
2. **The Dorset Yacht facts**: number of trainees and which yacht was taken. The two secondary accounts differ.
3. **The vote in Dorset Yacht (4-1, Viscount Dilhorne dissenting)** is from Wikipedia only.
4. **Transco report reference**: [2004] 2 AC 1 versus "[2004] 2 AC 251" inside Stannard.
5. **Your Response**: the [2015] QB 41 report reference is from memory; I did not check whether later English authority or legislation has changed the position on whether data is property.
6. **Hartwell's facts** and any neutral citation are not verified.
7. **Murphy**: I did not read the speeches, so "generally irrecoverable" rests on URS v BDW para 27 and Robinson para 38.
8. **Computer Misuse Act**: I did not read the Singapore Act, so I cannot confirm the "closer to Singapore" comparison.
9. **Singapore adoption authorities** (Spandeck, Wagon Mound, Rylands) were outside this task and were not checked.
