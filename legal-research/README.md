# Singapore Legal Research — Method Knowledge Base

This knowledge base captures **how** to do Singapore legal research effectively with AI
agents — access methods, verification discipline, citation conventions, and orchestration
patterns — distilled from a real multi-agent research project. It does **not** contain the
substantive legal findings (those live in the project's memo/dossiers); this KB is reusable
scaffolding for the *next* Singapore legal research task, whatever its subject matter.

## The project that generated this KB

Between roughly 07:15 and 07:35 on 16 July 2026, 11 agents (a mix of Opus and Sonnet,
labelled 01–11 plus a gap-filler 08a) independently researched whether a staff-augmentation /
IT-secondment business model triggers licensing under Singapore's **Employment Agencies Act
1958** (and adjacent regimes: EFMA/work passes, CPF, vicarious liability for "borrowed
employees"). Each agent worked a different channel — statutory text, case law, MOM
regulatory guidance, licence logistics, cross-border/sub-supply questions, Hansard recovery,
and three "recency sweeps" (2020–2026 case law, EAA enforcement, vicarious liability) — and
filed a numbered dossier. Their raw dossiers are the input to this KB; a separate writer
synthesised them into the client-facing memo. What's valuable for reuse is everything the
agents learned about *getting at* Singapore legal sources: which URLs work, which tools lie,
how to grade confidence, how to write citations, and how the multi-agent design caught errors
a single sweep would have missed.

## Map of files

| File | What it covers |
|---|---|
| [source-access-playbook.md](source-access-playbook.md) | Per-source URL patterns, what access method works vs. fails, and gotchas — SSO, eLitigation, web.archive.org, Hansard/NAS, MOM, law-firm/journal sites, LawNet. **Start here before fetching anything.** |
| [verification-protocol.md](verification-protocol.md) | The four-tier confidence system (FULLY VERIFIED / MEDIUM / SECONDARY / UNVERIFIED), citation-recording rules, and the specific fabrication/scraping traps this project hit. |
| [citation-conventions.md](citation-conventions.md) | SAL-style citation practice: neutral vs. report citations, how report cites get confirmed, statute/subsidiary-legislation/Hansard citation forms. |
| [orchestration-patterns.md](orchestration-patterns.md) | What worked in the multi-agent design — parallel independent channels, immediate archiving, cross-check flags, gap-filler agents, recency waves, "state NOTHING FOUND" discipline. |
| [singapore-source-map.md](singapore-source-map.md) | Quick reference of what kind of material lives where across the SG legal/regulatory web — independent of this project's specific legal question. |

## How to use this KB

A future orchestrator planning a new Singapore legal research task should read
`source-access-playbook.md` and `orchestration-patterns.md` before dispatching agents, brief
every research agent on the tiered confidence system in `verification-protocol.md`, and hold
all agents to the citation forms in `citation-conventions.md`. `singapore-source-map.md` helps
scope which channels to assign to which agents.
