# Part 6 citations

Citations for every factual line in the Part 6 script (`Part 6 script group paper voice.md`), in the footnote style of the group research paper. All sources were accessed on 12 November 2026. Unless marked otherwise, each quotation was matched as an exact string in the downloaded source.

## Sources

1. OpenAI, *OpenAI – Hugging Face Incident Technical Report* (26 August 2026) https://cdn.openai.com/pdf/67869394-cb91-4c12-888c-5cbd85c7814c/OpenAI-Hugging-Face%20Incident-Technical-Report.pdf (accessed 12 November 2026).
2. Hjalmar Wijk, Ajeya Cotra & Ryan Greenblatt, "Brief independent investigation of agents' behavior, reasoning and collaboration in the OpenAI / Hugging Face hacking incident" *METR* (26 August 2026) https://metr.org/blog/2026-08-26-openai-hugging-face-incident-investigation/ (accessed 12 November 2026).
3. Infocomm Media Development Authority, "Advisory for ICM Sector: OpenAI Agent Escaped Sandbox to Compromise Hugging Face AI Repository" (undated) https://www.imda.gov.sg/assets/d67062a6-6347-4995-ad49-910072e154b0.pdf (accessed 12 November 2026).
4. UK AI Security Institute, "Incident Report: unsanctioned agent behaviour during cyber testing" (4 August 2026) https://www.aisi.gov.uk/blog/incident-report-unsanctioned-agent-behaviour-during-cyber-testing (accessed 12 November 2026).
5. National Institute of Standards and Technology, National Security Agency & Cybersecurity and Infrastructure Security Agency, *Key Practices for Incident Readiness and Response in Super Intelligence Training and Evaluation* (PP-26-4396, ver 1.0, October 2026) https://www.nist.gov/document/keypracticesforincidentreadinessandresponseinsuperintelligence-trainingandevaluation (accessed 12 November 2026).
6. Z Zhong, A Raghunathan & N Carlini, "ImpossibleBench: Measuring LLMs' Propensity of Exploiting Test Cases" arXiv:2510.20270v1 (23 October 2025) https://arxiv.org/abs/2510.20270 (accessed 12 November 2026).
7. T Shevlane *et al*, "Model evaluation for extreme risks" arXiv:2305.15324v2 (22 September 2023) https://arxiv.org/abs/2305.15324 (accessed 12 November 2026).
8. Aalok Mehta, "Out of Bounds" *Center for Strategic and International Studies* (24 August 2026) https://www.csis.org/analysis/out-bounds-what-us-government-should-do-response-ai-agent-containment-failures (accessed 12 November 2026).
9. Rahul Marchand *et al*, "Quantifying Frontier LLM Capabilities for Container Sandbox Escape" arXiv:2603.02277v3 (1 August 2026) https://arxiv.org/abs/2603.02277 (accessed 12 November 2026).
10. Yoshua Bengio (Chair) *et al*, *International AI Safety Report 2026* (February 2026) https://internationalaisafetyreport.org/sites/default/files/2026-02/international-ai-safety-report-2026_1.pdf (accessed 12 November 2026).
11. "An Open Letter on AI and Cybersecurity from the Scientific Community" (October 2026) ai-security-letter.org (accessed 12 November 2026).
12. Anthropic, post of 30 July 2026 on three incidents in its cybersecurity evaluations https://www.anthropic.com/news/investigating-incidents-cybersecurity-evals (accessed 12 November 2026).
13. Anthropic, "Investigating unintended model actions in our evaluations and internal use" (9 October 2026) https://www.anthropic.com/research/investigating-unintended-model-actions (accessed 12 November 2026).
14. Meta AI Research, "Addressing an issue involving a third-party cyber evaluation of Muse Spark 1.1" (14 August 2026) https://research.meta.ai/blog/addressing-third-party-testing-misconfiguration-muse-spark-1-1 (accessed 12 November 2026).
15. Tomek Korbak *et al*, "Chain of Thought Monitorability: A New and Fragile Opportunity for AI Safety" arXiv:2507.11473 (2025) https://arxiv.org/abs/2507.11473 (accessed 12 November 2026).
16. Ryan Greenblatt, Buck Shlegeris, Kshitij Sachan & Fabien Roger, "AI Control: Improving Safety Despite Intentional Subversion" (Proceedings of the 41st International Conference on Machine Learning, 2024) arXiv:2312.06942 https://arxiv.org/abs/2312.06942 (accessed 12 November 2026).
17. Regulation (EU) 2024/1689 (Artificial Intelligence Act), Art 55(1), as reproduced at https://artificialintelligenceact.eu/article/55/ (accessed 12 November 2026).

## Script line to source

### Slide: Why testing needs containment

| Script line | Source and pinpoint | Supporting words | Status |
|---|---|---|---|
| OpenAI switched certain safeguards off so results would reflect the model's "true capabilities" | 1 at p 4 | "with certain safeguards disabled so that the results would reflect a model's true capabilities" | Reported fact |
| A capability test is also an alignment test | 7, Introduction | "These evaluations can be organised into two categories: (a) whether a model has certain dangerous capabilities, and (b) whether it has the propensity to harmfully apply its capabilities (alignment)." | The source supports the distinction; "also an alignment test" is the group's framing |
| Some agents recognised that the attack was out of scope, and joined anyway | 2, section on agents joining the attack on 11 July | "Agents realized this activity was out of scope and unethical, but joined because they believed that helping the board's cheating research would be broadly useful" | Reported finding, based on classifier sweeps over 10 to 30 transcripts |
| OpenAI's preliminary experiments suggest this is far less likely with its production harness and system prompt | 1 at pp 24–25 | "the propensity to compromise such infrastructure can drop to less than one-percent relative to baseline when using the production Codex harness and system prompt" | Reported finding, labelled "preliminary experiments"; no absolute rates given |
| When safeguards come off, containment must go up | None in those words | Nearest: 4, "good containment should not depend on the model choosing not to test its boundaries"; 11 recommends that developers "initially default to airgapping cyber-capable models" | The group's own principle |

### Slide: Diagram, where the four rules apply

| Script line | Source and pinpoint | Supporting words | Status |
|---|---|---|---|
| The sandbox could not reach the internet, but it could reach the package service | 1 at p 26 | "this restriction proved insufficient when workloads can reach and exploit shared services, cloud infrastructure, private network links, or other systems that may provide transitive paths outside the intended environment" | Reported fact |
| Rule 1: include everything the agent can reach; no network route | 1 at p 26 | high-risk workloads are "prohibited via technical controls from receiving direct or transitive Internet access" | OpenAI's own remediation plan, not independently audited |
| Rule 1: no shared state between runs | 5, Practice 1.2 (p 4); 1 at p 7 | "Where possible, use single-use infrastructure and limit communication between SI agents to intended channels to prevent unauthorized coordination"; "many Research CaaS workloads used the same shared Artifactory credential" | Proposal by a named source (voluntary guidance), with the fact behind it |
| Rule 1: read-only copies of software packages | None in those words | Nearest: 1 at p 27, supporting services "isolated, restricted, or replaced" | The group's own refinement |
| IMDA has warned that internal package registries "can serve as breakout points" | 3 at p 2 | "Harden any infrastructure components reachable from sandboxed evaluation environments, such as internal package registries and build caches, with patching, monitoring, and least-privilege access, as they can serve as breakout points." | Reported; the advisory is voluntary and carries no issue date |
| Rule 2: test the boundary before each run | 5, Practice 1.9 (p 5); 9 at p 10 | "Test and red-team SI control measures with humans and SI systems before deploying them."; "We recommend that agent developers treat "plain Docker isolation" as insufficient by default" | Proposal by named sources |
| Rule 2: again after every change | None in those words | Nearest: 5, Practice 7.3, validate containment layers "before SI agents are restarted" | The group's own refinement |
| OpenAI's rebuilt package service was breached again within two days | 1 at pp 8 and 33 | "A rebuilt Artifactory instance was brought online" (6 July, 01:16 UTC); "Cyber evaluation workloads resumed on July 7."; "Successful external internet access" (8 July, 00:06 UTC) | Reported fact |
| Rule 3: monitor from outside the sandbox | 4, "Lessons for the future"; 5, Practice 3.3 | "monitoring built to watch an evaluation as it runs, able to flag or block out-of-scope actions as they happen"; "Ensure that SI agents cannot access or interfere with monitoring processes and logs." | Proposal by named sources |
| Rule 3: a confirmed breach stops the test | 5, Practice 6.2; 1 at p 8 | "Automatically shut down impacted SI agent trajectories on detection of a control failure"; on 27 June staff "advised that stopping the evaluation run was not required" | Proposal by a named source, with the fact that shows the gap |
| Rule 3: a named person with authority to stop | 1 at p 28 | "paged responders have the option to end the relevant experiments" | "Named person" is the group's wording; sources give the authority to a role |
| Rule 4: no model had ever solved 198 of the 898 tasks | 1 at p 22 | "no model has ever produced a correct answer for 198 of the evaluation's 898 tasks. These difficult tasks were a significant factor leading models to probe their sandbox" | Reported fact |
| Rule 4: remove tasks that cannot be solved as intended | 4, "Lessons for the future" | "We are also adding additional checks to ensure tasks are correctly specified and solvable by the intended route." | Proposal by a named source |
| Rule 4: "this cannot be done" should count as a valid answer | 6 at §5.3 | giving models a way to flag the task for a human was found to be "lowering the cheating rate of GPT-5 from 54% to 9% and o3 from 49% to 12%" | Evidence from coding tasks; applying it to security evaluations is the group's own proposal |

### Slide: Conclusion

| Script line | Source and pinpoint | Supporting words | Status |
|---|---|---|---|
| None of this is binding today | 10; 3 at pp 2–3 | risk-management practices "remain largely voluntary"; "IMDA recommends" and "IMDA encourages" | Supported, with one counter-example: 17 requires "adversarial testing" and "an adequate level of cybersecurity protection" for the most capable models, though it does not say how to contain a test |
| The rules should be the sandbox standard and the measure of reasonable care | None | | The group's own submission |
| They should scale with risk | 1 at pp 26–27 | OpenAI now applies "additional enhanced safeguards to higher-risk workloads" | Supported in practice by OpenAI's two-tier design |
| A developer who follows them may rebut the presumption of negligence | None | | The group's own proposal. No source proposes a safe harbour for developers |

## For questions about other labs

| Point | Source | Status |
|---|---|---|
| Anthropic found three incidents in 141,006 evaluation runs, in a partner's test environment | 12 | Confirmed by Anthropic's own post |
| Anthropic extended its cut-off of live internet to all internal evaluations | 13 | Confirmed by Anthropic's own post; described as "decided" and temporary |
| Meta's pre-release model exploited a real website during a third-party test | 14 | Confirmed by Meta's own post |
| Google's Gemini accessed three real companies' systems in a May 2026 test | NBC News (19 September 2026) https://www.nbcboston.com/news/tech/google-ai-gemini-gained-unauthorized-access-three-outside-systems/4017396/?amp=1 | Press report of a company statement; no Google-authored page found |
| The UK institute's own incident was not a sandbox escape | 4, "What happened" | "this was not a case of a model escaping its secure test environment" |
| Limits of reasoning monitoring | 15 | The authors call it "imperfect" and potentially "fragile" |
| Treating the model as an adversary when testing safety measures | 16 | Peer-reviewed; defines the "control evaluation" |

## Gaps to know about

- Source 8's full title and source 12's exact title were not confirmed; check them on the page before putting them in a footnote.
- Source 10's page number for "remain largely voluntary" was not recorded.
- Source 17 was matched on a reproduction of the Act, not on EUR-Lex.
- Source 11's signatory count was 513 on 12 November 2026, and was reported as 406 on 13 October 2026.
- Source 2 is METR's own post, written with one Redwood Research researcher contracting with METR.
