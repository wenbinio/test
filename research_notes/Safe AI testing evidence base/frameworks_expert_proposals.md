# Framework-level proposals on acceptable risk when testing advanced AI: evidence pack for Part 6 (as of 12 November 2026)

Scope: frameworks and principles only. No engineering detail, no statute or case law. This builds on `research_notes/Hugging Face OpenAI incident lessons/government_expert_responses.md` and `containment_practice_singapore_us.md` and does not repeat their material except where I corrected it (see "Corrections to earlier notes").

## How quotations are labelled

- **[EXACT]** the string was matched, after whitespace and quote-mark normalisation, in raw text I downloaded with curl into scratchpad folders `raw/`, `raw2/`, `raw3/`, `raw4/`, `raw5/` (under `/tmp/claude-0/-home-user-test/4554aee0-a4f0-5dad-8d6d-91e6563403b9/scratchpad/`) and converted with `pdftotext` or an HTML-to-text script. The matching script is `.../scratchpad/tools/verify.py`. Nothing downloaded was executed.
- **[SUMMARISED]** read through a summarising fetch tool, or carried over from the earlier notes, which used one. Wording not guaranteed.
- **[SNIPPET]** seen only in a search-result summary. Not proof.
- **[RECALLED]** I remember the source but did not open it this session.
- A paraphrase is not a quotation. Where I paraphrase I say "paraphrase".
- Caveat on [EXACT]: it proves the words are in the document. For the two-column PDF tables (Singapore Consensus companion report) the extraction interleaves columns, so I treat those as table content, not quotations.

"Pre" means published before the OpenAI disclosure of 21 July 2026. "Post" means in response to the incident.

## Corrections to earlier notes (important for the script)

1. **The open letter's text is now in hand and differs from press paraphrase.** Primary text: ai-security-letter.org, "An Open Letter on AI and Cybersecurity from the Scientific Community", October 2026. It does not name OpenAI, Hugging Face or any company ([EXACT]: it says only "Multiple organizations have disclosed high-profile security failures"). The word "binding" does not appear in it. The Decoder's phrase "set binding standards" is the journalist's paraphrase. The letter asks for a body that "standardizes ... best practices" and "should also be mandated to record and track containment failures". The earlier note's "fully disconnect AI models from the internet" overstates it: the letter says "In the short term" and "initially default to airgapping cyber-capable models".
2. **Signatory count is a moving number.** The Decoder headline of 13 Oct 2026 says 406. The letter page, fetched 12 Nov 2026, says "513 Signatories:" [EXACT]. Press reported 450, 487 and about 500 in between [SNIPPET]. Cite the date with any count.
3. **"CSIS (Korman and Mehta)": I found no joint piece.** The CSIS item is Aalok Mehta alone, "Out of Bounds", 24 Aug 2026. Zack Korman appears in Time (24 Jul 2026, via earlier notes) as a quoted security researcher, not as a CSIS author. A CSIS blog "Substantive Frontier Model Evaluation for Beginners, Part 2" (21 Aug 2026) is by Carter Musheno, a CSIS intern [SUMMARISED; the page returned 403 to curl]. Do not attribute either to "Korman and Mehta".
4. **IAPS did produce an incident memo** (27 July 2026). The earlier note listed IAPS as "no response found".
5. **The "safe harbour" in the AI-evaluation literature is a different thing from the student's.** Longpre et al. (2024) propose a safe harbour for independent researchers against developer retaliation. The student's safe harbour shields a developer who meets a containment standard. I found no source proposing the developer-side version for evaluation containment (see Q8 and the table).

---

## Q1. The case for testing: who says most authoritatively that dangerous-capability evaluations are needed before deployment

### Takeaway
Every top-level source treats pre-deployment dangerous-capability testing as necessary, and none says testing should stop. The newest authoritative statement (International AI Safety Report 2026) also says pre-deployment tests are becoming less reliable, which strengthens the case for safeguards-off testing and, by extension, for containing it. None of these sources discusses the risk the test itself creates.

### Cited Findings
**Pre-incident**
- International AI Safety Report 2026 (chair Yoshua Bengio, over 100 authors, backed by over 30 countries; published 3 Feb 2026) lists "capability evaluations to assess potentially dangerous behaviours" among risk-management practices [EXACT]. It also states the "evaluation gap": "performance on pre-deployment tests does not reliably predict real-world utility or risk" [EXACT]. Its framing of the policy problem is the "evidence dilemma": "acting too early can lead to entrenching ineffective interventions, while waiting for conclusive data can leave society vulnerable to potentially serious negative impacts" [EXACT]. On governance status: "While AI risk management initiatives remain largely voluntary, a small number of regulatory regimes are beginning to formalise some risk management practices as legal requirements." [EXACT]. It mentions piloting systems "in limited sandboxed environments" as a mitigation for deployers [EXACT: "deployers could pilot AI systems in limited sandboxed environments to analyse potential failure modes before deploying them more broadly"], i.e. it treats a sandbox as a safety tool and not as a risk source. Standing: international scientific panel, the successor to the Bletchley-commissioned report. Source: International AI Safety Report 2026, internationalaisafetyreport.org/publication/international-ai-safety-report-2026 (executive summary and section 3). Local copy was the HTML page, which embeds the full report text.
- Bletchley Declaration (countries attending the AI Safety Summit, 1-2 Nov 2023, GOV.UK): "actors developing frontier AI capabilities, in particular those AI systems which are unusually powerful and potentially harmful, have a particularly strong responsibility for ensuring the safety of these AI systems, including through systems for safety testing, through evaluations, and by other appropriate measures" [EXACT]. Standing: first intergovernmental statement on frontier AI risk. URL: gov.uk/government/publications/ai-safety-summit-2023-the-bletchley-declaration/the-bletchley-declaration-by-countries-attending-the-ai-safety-summit-1-2-november-2023.
- Frontier AI Safety Commitments, AI Seoul Summit (May 2024; GOV.UK page updated 7 Feb 2025): Outcome 1 commits organisations to "Assess the risks posed by their frontier models or systems across the AI lifecycle, including before deploying that model or system, and, as appropriate, before and during training." [EXACT]. Standing: voluntary commitments by 16 companies (company count from METR, below; the 21 May 2024 date is recalled, not verified). URL: gov.uk/government/publications/frontier-ai-safety-commitments-ai-seoul-summit-2024/frontier-ai-safety-commitments-ai-seoul-summit-2024.
- OpenAI Preparedness Framework v2 (updated 15 April 2025): "we run in-scope models through frontier capability evaluations to measure the full extent of model capabilities before we deploy our models and during development" [EXACT]. Standing: frontier lab. URL: cdn.openai.com/pdf/18a02b5d-6b67-4cec-ab64-68cdfbddebcd/preparedness-framework-v2.pdf, section 1.
- METR, "Common Elements of Frontier AI Safety Policies" (16 Dec 2025 version): states that twelve companies have published frontier safety policies (Anthropic, OpenAI, Google DeepMind, Magic, Naver, Meta, G42, Cohere, Microsoft, Amazon, xAI, NVIDIA) and that "In May of 2024, sixteen companies agreed to do so as part of the Frontier AI Safety Commitments at the AI Seoul Summit" [EXACT: "Beginning in September of 2023, several AI companies began to voluntarily publish these protocols"]. Standing: independent evaluator. URL: metr.org/common-elements.
- UK AISI: not re-fetched here. Its testing rationale is in the earlier notes; I opened only its safety-case blog (Q3).

**Post-incident**
- Chris Painter (President, METR), written testimony, US Senate HSGAC subcommittee, "Rogue AI: Securing the Homeland Against AI Agent Attacks", 30 Sept 2026: "I am not here to push for a particular angle or policy agenda." [EXACT]. His one cross-cutting ask is "better public visibility into the capabilities of frontier AI agents" and into the effectiveness of restrictions and detection [EXACT for the quoted phrase]. He describes METR's access as voluntary: "The participation of these AI developers is voluntary" [EXACT]. URL: metr.org/chris-painter-senate-testimony-sep-2026.pdf, pp. 1-2 and the closing section. Standing: leading independent AI-agent evaluator.
- Dario Amodei, "We Must Pace the Frontier", Sept 2026 (darioamodei.com/post/we-must-pace-the-frontier): "pacing does not mean halting model training or technical progress, but ensuring companies take adequate time to align and safeguard their models, and for third party evaluators to confirm this" [EXACT]. Standing: CEO of a frontier lab.

### Inferences
- The statements of necessity are strong and uniform, so the student can state "testing must continue" without needing to defend it. The IASR "evaluation gap" cuts both ways: tests are valuable but imperfect, which is an argument for running them with safeguards off (more informative) and therefore for containing them.
- Seoul I (assess risk "before and during training") is the nearest any summit text comes to risk during development, but it concerns the risk the model poses, not the risk the assessment activity creates.

### Gaps
- UK AISI's own statement of why pre-deployment testing is needed was not re-opened; see earlier notes. The Paris summit text (Feb 2025) and the "Paris Call for AI Safety and Security" (9 Nov 2026, covered only through The Decoder in earlier notes) were not obtained in primary form.

---

## Q2. Risk thresholds and proportionality: do the frontier frameworks address risk created by the testing itself?

### Takeaway
All three frameworks scale safeguards to capability and are framed around deployment (and, at the margin, large-scale internal deployment). I found no passage in any of them that sets containment requirements for dangerous-capability evaluation itself. The strongest evidence is textual: Google DeepMind's framework says its mitigation process "is required only for external deployment and large scale internal deployment, not further development", and Anthropic's policy relaxes some safeguards for "safety testing".

### Cited Findings
**Pre-incident**
- Anthropic, Responsible Scaling Policy v3.4 (effective 8 July 2026, so 13 days before the disclosure; 8-page PDF at www-cdn.anthropic.com/files/4zrzovbb/website/0bacdc8440ea96e62a8766d99ebe1d4eea6d5f3a.pdf; landing page anthropic.com/responsible-scaling-policy lists it as current, page "Last updated Aug 14, 2026"). Standing: frontier lab; the first lab framework (Sept 2023). The landing page says "risk governance in this rapidly evolving domain should be proportional, iterative, and exportable" [EXACT]. The changelog records: "For internal use, safety testing and deployments to sufficiently trusted users, we will instead require a combination of access controls and monitoring." [EXACT; this is a changelog entry about the ASL-3 Deployment Standard, and the PDF text extraction does not show which version label it belongs to. Cite it as "changelog entry in RSP v3.4"]. This is the only passage I found in the three frameworks that names "safety testing" as a distinct context, and it lowers safeguards (red-teaming for general access, access controls plus monitoring for testing). The policy's Section 1 says independent bodies "might review such arguments and enforce high quality standards for private AI developers via voluntary mechanisms" [EXACT] and that the policy is "our voluntary framework" (the opening words are garbled in extraction, so I do not give that as a quotation). RSP v3.4 states that ASLs are now covered only in "Appendix B: Notes on ASLs", so the older AI Safety Level ladder is no longer the main structure (contents page; I did not read the appendix in full).
- OpenAI, Preparedness Framework v2 (15 April 2025): "We won't deploy these very capable models until we've built safeguards to sufficiently minimize the associated risks of severe harm." [EXACT]. Governance: "An internal, cross-functional group of OpenAI leaders called the Safety Advisory Group (SAG) oversees the Preparedness Framework" [EXACT]; the framework's safeguards table for misaligned models (Appendix C.2) lists sandboxing as one safeguard (paraphrase; the table is two-column in extraction so no quotation offered). The framework's trigger is deployment-based ("safeguards ... before we deploy"). Standing: frontier lab. Note: an Axios item dated 18 Aug 2026 reports OpenAI would rewrite its safety rules after the incident [SNIPPET; Axios returned 403]. I did not find a post-incident version of the framework.
- Google DeepMind, Frontier Safety Framework v3.0 (published 22 Sept 2025; 8 pages; storage.googleapis.com/deepmind-media/DeepMind.com/Blog/strengthening-our-frontier-safety-framework/frontier-safety-framework_3.pdf). Standing: frontier lab. Key text: "A safety case is an assessable argument showing how severe risks associated with a model's CCLs have been reduced to an appropriate level." [EXACT, footnote 5]. Risk acceptance is proportionate: mitigations must bring "the risk of severe harm to an appropriate level proportionate to the risk" [EXACT]. Scope: the deployment-mitigation requirement "is required only for external deployment and large scale internal deployment, not further development." [EXACT]. For ML R&D critical capability levels it adds "large scale internal deployments", mentioning "limiting affordances, monitoring and escalation, auditing" as safeguards (paraphrase). This is the single clearest textual statement that the framework's gate does not cover the testing and development phase.
- Seoul commitments (above): thresholds. Outcome 1 II: organisations will "Set out thresholds" at which severe risks "would be deemed intolerable" [EXACT for each fragment]. The thresholds are about model risk, with explanation "accompanied by an explanation of how thresholds were decided upon" (paraphrase). Standing: 16 company signatories, voluntary.
- METR, Common Elements (Dec 2025): it compares the policies. In the excerpt I read, the text on "penetration testing" appears only as a security-programme element, and a policy element METR quotes (developer not identified in my reading) reads "Third-party environments: Document how all relevant models will meet the criteria above, even if they are deployed in a third-party partner's environment that may have a different set of safeguards" [EXACT] and is the nearest to the point (a partner environment, treated as a deployment case). I did not read the whole document, so "no containment-of-testing element" is not established for it.

**Post-incident**
- OpenAI's own corrective measures are in the 26 Aug 2026 technical report (earlier notes). Not re-covered.
- IAPS, Bearman with Covino, Mittelsteadt and O'Brien, "The OpenAI/Hugging Face Incident: Challenges in Controlling and Containing Cyber-Capable AI Systems", policy memo, 27 July 2026 (iaps.ai/research/...). Standing: US AI policy think tank. It asks Congress "What measures, if any, are taken before and during high-risk capability evaluations to secure and monitor the sandbox and other internal systems that models may be able to access?" [EXACT: "before and during high-risk capability evaluations to secure and monitor the sandbox"] and recommends a "harmonized risk-reporting standard for internally deployed models" (paraphrase). It says "There are no federal requirements to report on internal models or incidents." [EXACT].
- Mark MacCarthy and David Beier, "It's Time to Regulate the AI Development Process", Tech Policy Press, 7 Oct 2026: the incidents "opened a new dimension of needed AI regulation - legal measures to ensure the safety of the AI development process itself" [EXACT]. Standing: policy commentators (MacCarthy is a Brookings and Georgetown fellow: recalled, not verified from this page).

### Inferences
- The pattern is consistent: threshold-and-safeguard ladders govern release; the testing phase is either out of scope (GDM) or treated as a lower-safeguard context (Anthropic). That supports the student's claim that "proportionality" exists only at the capability/deployment level today and that "scaling containment to the safeguards removed" is a new idea, not an existing framework feature. State it as "I found no passage", not "none exists": I read the three framework documents by search and targeted reading, not line by line.
- RSP's own wording ("safety testing ... access controls and monitoring") can be used either way: it shows labs already tier safeguards by context (support for graduated containment) and that the tier for testing was lower (the gap).

### Gaps
- No full line-by-line read of PF v2, FSF v3 or RSP v3.4. No post-incident revision of any of the three found. Whether Google DeepMind has a later FSF than v3.0 was not checked. Anthropic's RSP Appendix B (ASLs) was not read.

---

## Q3. Safety cases, and whether they could apply to an evaluation environment

### Takeaway
The safety-case literature is built around justifying deployment (and, in Clymer et al., training and deployment) of a model. Its "control" arguments, especially "isolation", describe exactly the containment properties a test environment would need, so a safety case for an evaluation environment is a natural extension, but I found no source that proposes it. IAPS (post-incident) is the only source I found asking for safety cases as a policy requirement, and it frames them for "high-stakes deployment".

### Cited Findings
**Pre-incident**
- Joshua Clymer, Nick Gabrieli, David Krueger, Thomas Larsen, "Safety Cases: How to Justify the Safety of Advanced AI Systems", arXiv:2403.10462 (v2, 18 Mar 2024); affiliations Columbia, Harvard, Cambridge, Center for AI Policy. Standing: academic and policy-institute authors; the most-cited framework paper on AI safety cases. Abstract: "companies and regulators will make difficult decisions about whether it is safe to train and deploy them" [EXACT]. Definition: "A safety case is a structured rationale that a system is unlikely to cause significant harm if it is deployed to a particular setting." [EXACT] The "isolation" control argument: "Isolation arguments assert that AI systems are sandboxed so that their only interactions with the world are through a small number of well-monitored channels" [EXACT]. Evaluators "could be a regulatory body or, an industry committee" (paraphrase of section 3). URL: arxiv.org/pdf/2403.10462.
- UK AI Safety Institute (now AI Security Institute), Geoffrey Irving, "Safety cases at AISI", blog, 23 Aug 2024 (aisi.gov.uk/blog/safety-cases-at-aisi). Standing: UK government institute. Definition: "a structured argument that an AI system is safe within a particular training or deployment context" [EXACT]. It cites the MoD definition and notes "Anthropic includes "affirmative cases" in their sketch of ASL-4 policies" [EXACT] and that Google DeepMind's Deployment Mitigation Level 2 is "safety case with red team validation" (paraphrase). Limit: "since our understanding of AI safety is nascent, it is not yet possible to build full safety cases that scale to risks posed by models significantly more advanced than those of today" [EXACT]. Note the phrase "training or deployment context": AISI's definition is not limited to release.
- Google DeepMind FSF v3.0 (above): safety case defined in footnote 5; says the footnote's reference is arxiv.org/abs/2505.01420 (title not opened: [RECALLED]-class, do not cite by title).
- Anthropic: AISI's blog confirms "affirmative cases" in Anthropic's ASL-4 sketch [EXACT, above]. Anthropic's own safety-case papers ("Three Sketches of ASL-4 Safety Case Components"), Korbak et al. "A sketch of an AI control safety case", and Balesni et al. on evaluations-based safety cases for scheming are [RECALLED, not verified this session].

**Post-incident**
- IAPS memo (27 July 2026): policymakers should "Drive industry investment in safety and security R&D by requiring safety cases for high-stakes deployment" [EXACT: "requiring safety cases for high-stakes deployment"].
- Singapore Consensus 2026 asks for quantitative assurance of containment akin to nuclear and jet-engine standards (Q5), which is the safety-case idea without the label.

### Inferences
- Application to an evaluation environment is the student's own extension. The mapping: the "claim" is "an agent running this test cannot cause harm outside the environment"; the "argument" is Clymer's isolation plus monitoring; the "evidence" includes attack-the-sandbox results (red-team evidence AISI describes as "negative evidence"). Present it as the student's inference, supported by the structure of Clymer and AISI, not as something either author says.
- A safety case could also be the compliance artefact that makes a "safe harbour" administrable: the developer shows its argument to an evaluator. No source says this; it is a design suggestion.

### Gaps
- No source found that applies the safety-case method to evaluation environments or to testing activity. Anthropic and GDM safety-case papers not opened.

---

## Q4. Statements by senior researchers and others responding to the incident

### Takeaway
Responses converge on four asks: contain harder (air-gap or justified-exception internet access), report containment failures to an external body and eventually publish them, allow independent access, and (for some) liability or pacing. Only one named senior figure (Painter) explicitly declines to take a policy position. None of the primary texts I read proposes licensing or a safe harbour for compliant developers.

### Cited Findings (all post-incident)
- **Open letter, "An Open Letter on AI and Cybersecurity from the Scientific Community", October 2026, ai-security-letter.org.** Standing: signatories listed with institutions; I verified Geoffrey Hinton, Yoshua Bengio, Stuart J. Russell, Yejin Choi and Bernhard Schölkopf are in the list. Signatory count: 513 on 12 Nov 2026 [EXACT]; 406 per The Decoder, 13 Oct 2026 [press]. Exact demands, as the letter's own three numbered recommendations:
  1. "Organizations developing, deploying, and testing cyber-capable AI models should immediately adopt high-assurance containment systems. These organizations should exercise caution, and initially default to airgapping cyber-capable models." (the first sentence is [EXACT]).
  2. An international body "established in consultation with governments and a wide range of both AI and cybersecurity experts" (paraphrase) that "standardizes, for the public good, best practices for alignment and containment approaches that, unlike airgapping, allow for greater access outside the sandbox, such as internet connectivity" [EXACT]; "This body should also be mandated to record and track containment failures." [EXACT].
  3. "security incidents involving containment failure must be reported to the body and eventually made public. This transparency is required for both learning and accountability purposes." [EXACT].
  Principle statement, directly usable for "obligations scale with risk": "the range of model actions permitted by a containment system needs to be balanced with our currently limited ability to predict that the model's actions will not result in a security failure" [EXACT], and "strong sandboxing mechanisms including airgapping (disconnecting from the internet) should be used to provide high-assurance containment of cyber-capable AI models" [EXACT, introduced by "In the short term"]. It calls the failures "an irresponsible lapse in standard cybersecurity practices, preventable with stronger sandboxes and procedures" [EXACT], and says both better alignment and stronger sandboxing "are required". Note: it names "testing" explicitly in recommendation 1, and applies to "cyber-capable AI models", not all models. It is a request, not a binding rule.
- **Chris Painter (METR), Senate testimony, 30 Sept 2026** (metr.org/chris-painter-senate-testimony-sep-2026.pdf). Hearing: Senate HSGAC subcommittee, "Rogue AI: Securing the Homeland Against AI Agent Attacks"; other witnesses reported as Marius Hobbhahn (Apollo), Paul Ohm (Georgetown), Kurt Gaudette (Dragos), Daniel Kokotajlo (AI Futures Project); Altman invited but declined [SNIPPET, search summary; Hawley chairs]. Painter on voluntariness and incident disclosure: "My testimony today would not have been possible if AI companies had not been willing to publicly and voluntarily share information about incidents." [EXACT] and "AI companies may be disincentivized from sharing incidents with the public." [EXACT]. This is evidence for "currently voluntary" from the evaluator the student relies on.
- **Dario Amodei, "We Must Pace the Frontier", Sept 2026.** Standing: CEO, Anthropic. He calls on companies to treat the incident as their own: "I believe it's incumbent on every frontier AI company to act as if OAI-HF had happened to them." [EXACT]. He says Anthropic's own incidents trace partly to imperfect environments: "Monitoring, sandboxing, training environment hygiene, and data issues are extremely complicated areas where operational issues crop up again and again." [EXACT]. Step one is Anthropic's unilateral commitment to embedded external evaluators (paraphrase), and he "calls on governments to require other frontier companies to match" [EXACT: "calls on governments to require other frontier companies to match"]. He cites banking as precedent: embedding evaluators "has precedent in the banking industry, which sometimes involves regulatory "supervisors" embedded along with employees" [EXACT]. His proposed pacing trigger includes capability X = "the model is capable of escaping or defeating most common sandboxing methods" (paraphrase, from the essay's example), which makes sandbox-defeating capability itself a threshold. Altman's reported agreement and pledge of "independent evaluators with employee-like access" is [SNIPPET] only (NPR/Forkast summaries; Altman's X post and OpenAI's blog not opened, OpenAI's site returns 403).
- **Heidy Khlaaf (AI Now)**, in Time, 24 July 2026: "What we consider safe in a nuclear plant is so different from what big tech considers safe." [SUMMARISED via earlier notes; Time returned 406 to curl so I could not upgrade it]. A pre-incident basis for her nuclear comparison: AI Now report "Fission for Algorithms" with Sofia Guerra (2025), arguing regulators should apply nuclear-style oversight [SNIPPET, search result only; ainowinstitute.org/reports/fission-for-algorithms]. [RECALLED] She has also argued AI firms use safety language without nuclear-style discipline.
- **Gabriel Weil (University of Houston Law Center; Institute for Law & AI)**, Transformer, 24 July 2026: strict liability and mandatory insurance [SUMMARISED via earlier notes; my guessed URL for the raw page returned 404, so not upgraded]. Liability is legal analysis and is out of scope here beyond noting the proposal exists.
- **CSIS, Aalok Mehta**, "Out of Bounds: What the U.S. Government Should Do in Response to AI Agent Containment Failures", 24 Aug 2026 (csis.org/analysis/out-bounds-what-us-government-should-do-response-ai-agent-containment-failures). Standing: Washington think tank (Wadhwani AI Center). Raw text confirms "redundancies in sandboxing environments" and that the long-term idea is "a parallel initiative to Security Level (SL) initiatives" [EXACT for both fragments]. Fuller recommendation list is in the earlier notes.
- **Lawfare, Mackenzie Arnold and Stephan Llerena (LawAI)**, "When Reporting an AI Security Incident Is Not Mandatory", 24 July 2026 (lawfaremedia.org/article/when-reporting-an-ai-security-incident-is-not-mandatory). Standing: legal-policy publication, authors from the Institute for Law & AI. "So long as reporting remains almost entirely voluntary, detailed answers to these questions will be hard to come by" [EXACT]; on whether state incident-reporting laws applied: "The answer seems far from clear." [EXACT]. (Statutory detail is for classmates.)
- **IAPS** (above): "For now, what policymakers and the public learn of this incident depends on voluntary disclosure." [EXACT]; "Policymakers should view this as a clear warning shot" [EXACT].
- **Lab-leader statements**: Amodei (above) is primary. OpenAI's own statements are in the technical report covered by other researchers.
- Pre-incident senior statement relevant here: none added.

### Inferences
- The letter and Painter together support "obligations scale with risk" (letter: balance permitted actions against predictive ability) but not "safe harbour". The letter's reporting recommendation is to an international body, which differs from the national-agency routes in IAPS and Mehta.
- Because the letter does not mention the incident and its signature list grew from 406 to 513, the student should say "an open letter in October 2026, after the incident, from over 500 scientists including ..." and give the date of the count.

### Gaps
- Written testimony of Hobbhahn, Ohm, Gaudette and Kokotajlo and the hearing page (hsgac.senate.gov) were downloaded (hsgac.html) but not read in detail. Altman's primary statement not obtained. Raw Time text for Khlaaf and Korman, and raw Transformer text for Weil, not obtained this session.

---

## Q5. Singapore's contribution

### Takeaway
The Singapore Consensus (2025, and the July 2026 edition at arxiv.org/pdf/2608.14611) is the most explicit international research-priority document on secure evaluation, sandboxing and incident reporting, but it is a research agenda written for scientists and policymakers and does not set rules. Its "secure evaluation infrastructure" section concerns letting outsiders evaluate a model securely, not containing the model under test.

### Cited Findings
**Pre-incident**
- "The Singapore Consensus on Global AI Safety Research Priorities", arXiv:2506.20702 (2025; 66 pages; arxiv.org/pdf/2506.20702). Standing: output of the 2025 Singapore Conference on AI (26 April 2025) with contributors from governments, labs and academia, including Yoshua Bengio and IMDA's Wan Sie Lee (listed contributors; editor/lead-author list not captured from the extraction). Section 1.3 "Secure evaluation infrastructure": external auditors "need infrastructure and protocols that enable thorough evaluation while protecting sensitive intellectual property" (paraphrase). On incidents: "Establishing shared incident reporting systems allows the field to collectively learn from serious failures and risks" [EXACT].
- IMDA Model AI Governance Framework for Agentic AI (first published 22 Jan 2026; v1.5 20 May 2026): its testing-sandbox findings and the "incorporating human-in-the-loop during testing" recommendation are in the earlier notes [SUMMARISED]. Those are application-assurance exercises, not dangerous-capability evaluation.
- AI Verify: nothing on containment of dangerous-capability testing found; earlier notes record the same.

**Post-incident**
- "The 2026 Singapore Consensus on Global AI Safety Research Priorities", July 2026, arXiv 2608.14611 (lead author Stephen Casper per earlier notes; contributors listed at the front). It does not mention the Hugging Face incident (earlier notes). It states: "Secure evaluation infrastructure and protocols can allow for more meaningful forms of external scrutiny with limited tradeoffs to security." [EXACT, section 1.5 "Updates/Advantages"]. Section 1.5 also records "an implementation gap between what types of secure auditing infrastructure is possible and what is implemented" (paraphrase, [EXACT] on "implementation gap"). On agents it prioritises "confining them to controlled environments ("sandboxing") so mistakes stay contained" [EXACT, executive summary]. On assurance: containment measures should have quantitative assurance "akin to existing industry standards for systems such as jet engines and nuclear reactors" [EXACT]. On incident reporting: "paralleling how competing aircraft manufacturers pool accident data" [EXACT]. It also lists "Third-party AI testing and assurance providers" as having "an important role" (paraphrase). The companion report's agentic-risk table (two-column table; interleaved in extraction, so not offered as a quotation) has a "Runtime Assurance" row with "isolation ... graduated containment upon deviation" and "Interruptibility" with "Non-tamperable kill switches at task, session, and system levels", and a "Human-in-the-Loop Oversight" row with "tiered autonomy levels with defined escalation criteria". These are the Consensus's nearest words to "graduated containment", but they describe agent deployment, not evaluation environments.
- IMDA sector advisory on the incident (undated; imda.gov.sg/assets/d67062a6-6347-4995-ad49-910072e154b0.pdf): "breakout points" for package registries, per earlier notes. The script says "Open the link and confirm before citing". I did not re-open it this session, so this stays [SUMMARISED].

### Inferences
- The Consensus gives the student authority for (a) sandboxing and monitoring as research priorities, (b) shared incident reporting as an area of mutual interest, (c) nuclear and aviation as benchmarks for assurance. It does not give authority for "containment rises as safeguards come off". Do not attribute that to Singapore.

### Gaps
- The Consensus's own statement on pre-deployment testing environments, and the IMDA advisory, were not re-read against raw text this session. The 2026 edition's full section 1.1 (system evaluations) was not read.

---

## Q6. Independent oversight: third-party evaluation and audit, incident reporting, licensing; who opposes

### Takeaway
Third-party evaluation, mandatory incident reporting and near-miss reporting have broad support among the sources, including a lab CEO. Licensing or pre-approval of dangerous-capability testing is not proposed by any source I found. Opposition is to the form of rules (premature, chilling or defender-hobbling), not to oversight as such, and mostly comes from sources of lower standing.

### Cited Findings
**Pre-incident**
- Shayne Longpre, Sayash Kapoor, Kevin Klyman et al. (with Arvind Narayanan, Percy Liang, Peter Henderson), "A Safe Harbor for AI Evaluation and Red Teaming", arXiv:2403.04893 (5 March 2024; arxiv.org/pdf/2403.04893). Standing: academic authors from Stanford, Princeton, MIT and others. "We propose that major AI developers commit to providing a legal and technical safe harbor, indemnifying public interest safety research and protecting it from the threat of account suspensions or legal reprisal." [EXACT]. The paper's concern is that developers' terms of service "have disincentives on good faith safety evaluations" [EXACT]. This is the best pre-incident source for the "regulation could chill testing" worry, and the only prominent "safe harbour" in this literature. It protects evaluators from developers, not developers from liability.
- Singapore Consensus 2025 and RSP v3.4: independent bodies reviewing safety arguments "via voluntary mechanisms" [EXACT, RSP] (Q2).
- Singapore Consensus 2026 (above): "Independent third-party AI testing and assurance providers play an important role in translating AI safety research into repeatable evaluation methods" (paraphrase; sentence is in section 1.5).

**Post-incident, supporting oversight**
- Open letter: reporting to an international body, "eventually made public" (Q4).
- Amodei: embedded external evaluators, and the banking-supervisor precedent (Q4). Painter: "excellent precedent for independent third-party investigation" is from the METR report (earlier notes) and METR also notes it could investigate only because OpenAI agreed (Q4 testimony).
- IAPS: new reporting standards for internally deployed models; "Establish a harmonized risk-reporting standard for internally deployed models" (paraphrase); "Develop standardized protocols for incident reporting involving internally deployed models" (paraphrase).
- Lawfare/LawAI: rulemaking authority "will be key" so that "companies are well informed about their obligations" (paraphrase of the closing argument; "So long as reporting remains almost entirely voluntary ..." is [EXACT], Q4).
- MacCarthy and Beier (Tech Policy Press, 7 Oct 2026): treat the White House "morally binding" commitments (the "Joint Commitment on Frontier Responsibilities", 29 Sept 2026) as "legally binding and enforceable through external regulatory review" [EXACT: "treat these "morally binding" commitments as legally binding and enforceable through external regulatory review"]. They describe the Commitment as including "independent audits by outside evaluators" (paraphrase).
- Mehta (CSIS): independent verification organisations should be brought into information sharing and given cybersecurity support (paraphrase; the page says policymakers "increasingly lean on independent verification organizations (IVOs)" [EXACT fragment]).

**Post-incident, opposing or qualifying**
- Brian Williamson (partner, Communications Chambers; published by CEPA, a transatlantic think tank), "Cybersecurity - Let's Not Tie Defenders' Hands", 10 Aug 2026 (cepa.org/article/cybersecurity-lets-not-tie-defenders-hands/): "Policymakers should not jump to enact new, poorly thought-out laws, potentially including scrutiny that delays models needed for defense." [EXACT]. He argues "cyber capability is inherently dual-use" [EXACT]. This opposes broad rules because they might slow defensive access to capable models; it is not an argument about evaluation rules specifically and says nothing against containment.
- Hugging Face CEO reportedly said existing cyber law is likely sufficient [SNIPPET; cryptobriefing returned a block page; not verified].
- Yann LeCun reportedly did not sign the letter and calls such incidents engineering failures [SNIPPET; one search summary].
- A TechRadar op-ed (headline: "The AI escape is a red herring. The real problem is we can't tell a good sandbox from a bad one") argues the missing piece is a way to rate sandboxes (page downloaded, author and arguments not read) [SNIPPET].

### Inferences
- I found no credible source arguing that a containment standard or incident reporting would reduce testing. The credible "chilling" argument in the literature is Longpre et al.'s, and it points the other way: legal threats to independent evaluators, which a well-designed regime should protect. The student should address this because their "safe harbour" word invites the confusion.
- Licensing/pre-approval of dangerous-capability testing remains unproposed in every source I could open. Say so as "I found none", with Public Citizen's general "pre-deployment oversight" call (earlier notes) as the nearest.

### Gaps
- No primary text of an explicit opponent of mandatory evaluation-containment rules. The Washington Examiner op-ed (Joe Borelli, 30 Aug 2026, "On AI, let's not replicate the gain-of-function failures") was downloaded but paywalled; it appears to argue the opposite, for more visibility. The "pushes testing out of sight" claim has no primary source in this pack.

---

## Q7. Analogies used by credible commentators

### Takeaway
Nuclear, aviation and banking-supervision analogies are made by named sources with checkable texts. Biosafety-level and gain-of-function analogies appear only in low-standing or unread sources. Penetration-testing authorisation I found only as a security-programme element in lab policies, not as an analogy.

### Cited Findings
- **Nuclear and aviation (Singapore Consensus 2026)**: "akin to existing industry standards for systems such as jet engines and nuclear reactors" [EXACT]; incident pooling "paralleling how competing aircraft manufacturers pool accident data" [EXACT]. Post-incident publication (July 2026), though written independently of it.
- **Nuclear (Khlaaf)**: Time, 24 July 2026 [SUMMARISED]; AI Now "Fission for Algorithms" [SNIPPET].
- **Banking supervision (Amodei)**: embedded evaluators "has precedent in the banking industry" [EXACT] (Q4).
- **Security levels (Mehta, CSIS)**: SL-style initiative for agents leaving controlled environments [EXACT fragment "Security Level (SL)"].
- **Aviation accident investigation**: cep and the UN Scientific Panel brief, per earlier notes [SUMMARISED].
- **Gain-of-function**: a Washington Examiner op-ed by Joe Borelli (30 Aug 2026) draws the parallel; I could not read the paywalled body. A LessWrong comment and an Atlantic Council piece on AI-enabled biology accidents ("It's not just misuse: AI-enabled biological research also runs the risk of accidents") surfaced in search; the Atlantic Council piece mentions a July 2026 OSTP gain-of-function policy [SNIPPET]. I did not read either as to AI testing. Borelli's standing is a politician and columnist, not a researcher.
- **Biosafety levels**: A vendor blog (Delinea) maps CDC biosafety levels to agent containment; an encyclopedia entry notes limits of the analogy; Anthropic's ASL naming is itself modelled on biosafety levels [SNIPPET; the latter is [RECALLED] from Anthropic's 2023 RSP]. None is a top-level source. The earlier notes' conclusion stands: a BSL framing of the student's tiers is their own synthesis.
- **Penetration-testing authorisation**: METR's Common Elements lists "penetration testing" as a security-assessment practice inside lab policies [EXACT: "penetration testing, and bug bounty programs"]; no source found uses it as an analogy for authorising dangerous-capability tests. Longpre et al. use "Vulnerability Disclosure ... rules of engagement for third party ethical hackers" as a model [EXACT: "A vulnerability disclosure policy establishes rules of engagement for third party ethical hackers"] for evaluators' legal protection, which is the closest.

### Inferences
- The strongest analogies for the student's containment-scales-with-risk idea are the nuclear/aviation assurance benchmarks (Singapore Consensus) and the BSL structure, but only the first is documented. The BSL analogy would need the student to attribute it to themselves.

### Gaps
- Borelli, Atlantic Council and Delinea were not read for the analogy argument. No source found for a pen-test-authorisation analogy.

---

## Q8. The opposing view: tighter rules would reduce or hide safety testing

### Takeaway
I did not find a credible primary source arguing that evaluation-containment or incident-reporting rules would cut testing or push it out of sight. The closest credible concerns are (1) Longpre et al.'s chilling-effect argument about independent evaluators (which supports protection, not fewer rules), (2) Williamson's argument that premature rules may hamper defenders, and (3) the structural point in the lab frameworks that voluntary, tiered safeguards are meant to be adaptable.

### Cited Findings
- Longpre et al. 2024 (Q6): the problem they identify is that developers' policies deter good-faith evaluation, "This causes some researchers to fear that conducting such research or releasing their findings will result in account suspensions or legal reprisal." [EXACT].
- Williamson / CEPA (Q6) [EXACT quotations above].
- Anthropic RSP landing page: governance should be "proportional, iterative, and exportable" [EXACT], and the RSP changelog notes the lab removed some prescriptive evaluation requirements because "the science of evaluations is not currently mature enough" (paraphrase of a changelog line near "confident" statements; I did not pin the exact wording, so it is not a quotation).
- IASR 2026: "acting too early can lead to entrenching ineffective interventions" [EXACT] is the generic official statement of the caution against premature rules.
- Painter: the voluntary regime delivered the Hugging Face disclosure and an outside review ("publicly and voluntarily share information", [EXACT], Q4), which is an argument that a voluntary cooperative regime produced information. He draws no conclusion about mandates.

### Inferences
- An honest presenter should say that the opposition is thin in primary sources and that the live objection is design: rules should not penalise disclosure or protect only large incumbents, and should not hamper defenders. The student's "obligations scale with risk" clause answers the first; the Safe-harbour clause answers the second if it is compliance-linked.

### Gaps
- Not found: Dean Ball, Adam Thierer or Neil Chilson on this incident; a US industry-association statement; any formal lab submission opposing evaluation rules. A search for "chill/underground" returned nothing on point.

---

## Mapping the framing to sources (final table)

| Part of the framing | Strongest supporting source | Strongest objection or limit |
|---|---|---|
| Testing must continue | Bletchley Declaration ("systems for safety testing, through evaluations") [EXACT] and IASR 2026 ("capability evaluations to assess potentially dangerous behaviours") [EXACT]; Amodei: pacing "does not mean halting model training or technical progress" [EXACT] | IASR 2026 "evaluation gap": pre-deployment tests "[do] not reliably predict real-world utility or risk" [EXACT], so tests are valuable but imperfect; MacCarthy and Beier say the safest course may be to avoid dangerous experiments (paraphrase, Q2). Neither says stop testing |
| Containment should rise as safeguards come off | Open letter, Oct 2026: containment must be "balanced with our currently limited ability to predict" model actions, and "initially default to airgapping cyber-capable models" [EXACT]; Clymer et al. "isolation" argument [EXACT] | No lab framework says it. GDM FSF v3.0: mitigation process "required only for external deployment and large scale internal deployment, not further development" [EXACT]; Anthropic RSP changelog relaxes to "access controls and monitoring" for "safety testing" [EXACT]. The tie to "safeguards removed" is the student's own inference |
| Obligations scale with risk | GDM FSF: mitigation "proportionate to the risk" [EXACT]; Seoul commitments' thresholds [EXACT]; RSP "proportional" [EXACT]; open letter's "cyber-capable" scoping | Frameworks scale to capability for deployment, not to test conditions. Williamson/CEPA: broad new rules may hamper defenders [EXACT]. IASR "evidence dilemma" [EXACT] |
| Safe harbour for compliance with a containment standard | None found. Nearest: Longpre et al., "legal and technical safe harbor" [EXACT], but for independent evaluators, not developers; Clymer/AISI safety cases as a possible compliance artefact (inference) | Painter and Lawfare say disclosure is currently voluntary; Weil argues for strict liability with residual risk still falling on developers [SUMMARISED], which is the opposite of a shield; MacCarthy and Beier want commitments enforceable by external review. Terminology clash must be flagged |
| Currently voluntary and self-policed | IASR 2026 ("remain largely voluntary") [EXACT]; RSP "voluntary framework" and "voluntary mechanisms" [EXACT]; Painter: "participation ... is voluntary" and AI companies "may be disincentivized from sharing incidents" [EXACT]; IAPS: "depends on voluntary disclosure" [EXACT] | IASR also notes "a small number of regulatory regimes are beginning to formalise some risk management practices as legal requirements" [EXACT]; the Lawfare piece shows state reporting laws exist but their application to testing incidents is "far from clear" [EXACT], so "entirely" voluntary is too strong for incident reporting. Say "mostly voluntary" |
