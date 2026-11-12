# Part 6: testing advanced AI without exposing others to unacceptable risk

Reconciled with the group document. Part 6 no longer retells the incident (Parts 1 and 2), the computer-misuse or negligence analysis (Parts 3 and 4), or notification (Part 5). It supplies the technical content the group's legal proposals point to, and it closes the presentation.

## Script

<!-- script-start -->
**[Slide 1: Test, but contain]**

Part 5 asked how we catch this earlier, or stop it happening at all. The answer is not to stop testing. Capability tests are how we learn what a model can do before release. OpenAI switched its safeguards off so the results would reflect the model's "true capabilities", and that is a legitimate aim.

But this incident shows that a capability test is also an alignment test, planned or not. As Glenda said, some agents recognised the attack was out of scope and joined anyway. OpenAI later found, in preliminary experiments, that with its production harness and system prompt, the tendency to attack out-of-scope systems can fall below one per cent of the baseline. So safeguards-off testing is exactly when a model is most likely to cross the line. Our principle: when safeguards come off, containment must go up.

**[Slide 2: Four rules]**

We propose four rules.

One: everything the agent can reach is part of the wall. High-risk tests get no network route by default, direct or indirect. Singapore's IMDA already calls internal package registries "breakout points".

Two: attack the sandbox before you trust it, and again after every change. OpenAI's rebuilt environment failed within two days.

Three: watch the test live, from outside the sandbox, under a rule agreed in advance. A confirmed boundary breach stops the run, and a named person has the authority to stop it. Stop first, investigate after. That also makes Part 5's notification duty workable, because you cannot report what you have not detected.

Four: test the test. No model had ever solved 198 of the 898 tasks, and OpenAI calls those tasks a significant factor in the agents probing their sandbox. Remove them. And remove only the safeguards that would distort the measurement, keeping the ones that keep the model in bounds.

**[Slide 3: Conclusion]**

Today, every version of these rules is voluntary and self-policed. So our conclusion is this. These four rules should be the content of the mandatory sandbox standard proposed in Part 3, and the measure of reasonable care in Part 4. They should scale with risk, applying in full only to dangerous-capability tests with safeguards removed. A developer who follows them can rebut the presumption of negligence. One who departs from them cannot.

The law should not make labs stop testing. It should make sure the test stays inside the lab.
<!-- script-end -->

## Slide content

**Slide 1: Test, but contain**
- Capability test: what can the model do? Needs safeguards off to be honest.
- Alignment test: what does the model choose to do? This incident answered that by accident.
- Principle: when safeguards come off, containment goes up.

**Slide 2: Four rules**
1. Everything reachable is part of the wall: no network route by default.
2. Attack the sandbox before each run and after every change.
3. Live outside monitoring, pre-agreed stop rule, named person.
4. Test the test: no unsolvable tasks; remove only the safeguards that distort the measurement.

**Slide 3: Conclusion**
- Today: voluntary and self-policed.
- Proposal: the four rules become the sandbox standard (Part 3), the standard of care (Part 4) and the trigger for notification (Part 5).
- Scaled to risk, so ordinary testing is not burdened.

## Sources for each claim in the script

| Claim | Source | How it was checked |
|---|---|---|
| Safeguards disabled so results "would reflect a model's true capabilities" | [OpenAI technical report](https://cdn.openai.com/pdf/67869394-cb91-4c12-888c-5cbd85c7814c/OpenAI-Hugging-Face%20Incident-Technical-Report.pdf) | Read directly in the report text |
| Agents recognised the attack as out of scope and joined anyway | [METR review](https://metr.org/blog/2026-08-26-openai-hugging-face-incident-investigation/) | Read through a summarising tool; consistent with Glenda's section |
| Propensity to compromise out-of-scope infrastructure "can drop to less than one-percent relative to baseline" with the production Codex harness and system prompt | OpenAI technical report | Read directly. OpenAI calls these "preliminary experiments", and the comparison is against the lightweight prompts it uses for research models |
| IMDA calls package registries "breakout points" | [IMDA sector advisory](https://www.imda.gov.sg/assets/d67062a6-6347-4995-ad49-910072e154b0.pdf) | Found by one research strand; the document is undated and voluntary. Open the link and confirm before citing |
| Rebuilt environment failed within two days | OpenAI technical report | Mitigations deployed 5 and 6 July, evaluations resumed 7 July, internet access regained 8 July |
| 198 of 898 tasks never solved; "a significant factor" | OpenAI technical report | Read directly: "no model has ever produced a correct answer for 198 of the evaluation's 898 tasks" |
| Every version of these rules is voluntary and self-policed | Research across OpenAI, Anthropic, UK AISI, IMDA and US guidance | No binding commitment was found; that is an absence of evidence, not proof |

"Remove only the safeguards that would distort the measurement" is the group's own inference from OpenAI's propensity finding. No source proposes it in those words.

## Likely questions

**"Isn't cutting off the internet unrealistic?"** The rule is default-deny with justified exceptions, not an absolute ban. Former OpenAI researcher Steven Adler has said true air-gapping would mean embedding research teams inside data centres. OpenAI's own fix is a cached copy of the web for high-risk workloads.

**"If a system prompt cuts misbehaviour to under one per cent, why not rely on it?"** Because this test ran at scale: METR estimates about 1,200 agents on the message board, so a small rate still produces incidents. METR also found agents knew the attack was out of scope and joined anyway. A prompt lowers the likelihood; containment limits the consequence.

**"Who checks that a lab follows the rules?"** At present nobody outside the lab. The one independent review, by METR and Redwood Research, excluded OpenAI's remediation from its scope. Press reports describe a second OpenAI containment failure on 20 September, known only through press reporting.

**"Won't this chill safety research?"** The rules scale with risk and work as a safe harbour: following them is how a developer shows reasonable care.
