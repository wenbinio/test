# Singapore Source Map

A quick reference of what kind of material lives where across the Singapore legal/regulatory
web, independent of any one project's specific legal question. Use this to scope which
channel to assign to which research agent (see `orchestration-patterns.md`). Pair with
`source-access-playbook.md` for the actual access mechanics of each source.

| Source | What it has | Notes |
|---|---|---|
| **sso.agc.gov.sg** (Singapore Statutes Online) | Acts (current in-force consolidated text + Revised Editions), Subsidiary Legislation (Rules, Orders, Regulations, Notifications), Acts Supplement (as-gazetted amending Acts), SL Supplement, amendment annotations/history | The primary-legislation source of record. See access mechanics in the playbook — expect a 403 on plain WebFetch. |
| **elitigation.sg** | Judgments of the Supreme Court (Court of Appeal, General Division of the High Court, Appellate Division of the High Court) from roughly **2000 onward** | Pre-2000 judgments generally not hosted — go to LawNet/Justis via a human. PDF rendition is the reliable read path. |
| **Singapore Law Watch** | Curated legal news, case summaries, sometimes links to full judgments | Useful for discovery/leads, not primary-source-grade on its own. |
| **mom.gov.sg** (Ministry of Manpower) | EA licensing guidance pages (by topic: eligibility, CEI, security bond, demerit points, licence conditions PDF), work-pass FAQs, press releases (enforcement actions), Parliamentary Q&A answers, EA Directory (licence lookup/verification) | The most reliably fetchable government source in this project. Always record "Last Updated" stamps. |
| **GoBusiness licensing portal** (`licensing.gobusiness.gov.sg`) | The actual application front-end/directory for the EA licence (and other business licences); authoritative on fee schedule and process steps | Cross-check any secondary "processing time" or "fee" claim against this and MOM's own Apply page — several corporate-services marketing pages published contradictory figures. |
| **IRAS** (`iras.gov.sg`) | Tax residence/permanent-establishment guidance, withholding tax rules, GST reverse-charge guidance for imported services | Relevant whenever a cross-border staffing/services structure is in play. |
| **PDPC** (Personal Data Protection Commission) | PDPA guidance, enforcement decisions, cross-border data-transfer guidance (PDP Regulations regs 10–11) | Relevant to any arrangement involving personal data of seconded/placed workers moving offshore. |
| **parliament.gov.sg** | Bills as introduced (First Reading text), Bill explanatory statements | Useful for legislative-history research; distinct from Hansard (the debates themselves, at sprs.parl.gov.sg). |
| **sprs.parl.gov.sg** (Hansard) / **search.pair.gov.sg** | Full Parliamentary debates, including Second/Third Reading speeches with column numbers | **Inaccessible to automated tools in this project** (JS-rendered + Incapsula/AWS WAF) — see playbook. Escalate to a human with browser/LawNet access for anything beyond a sitting date. |
| **National Archives of Singapore (NAS) catalogue** | Archival records, historical Hansard volume metadata | AWS WAF-blocked to automated fetch; only useful (in this project) for loose date-clustering corroboration via visible search-result snippets. |
| **SAL journals** (SAcLJ, SAL Annual Review — hosted at `journalsonline.academypublishing.org.sg`) | Academic/practitioner commentary, including annual case-law review chapters by subject (e.g., Tort, Employment) | Paywalled; check SMU InK for an open mirror, but verify per-URL, don't assume. |
| **SMU InK** (`ink.library.smu.edu.sg`) | Open-access mirrors of some SAL journal articles and SMU faculty working papers | Hit-or-miss availability even when a URL is located — some fetches returned empty or 403. |
| **NUS SJLS** (`law.nus.edu.sg/sjls/...`) | Singapore Journal of Legal Studies articles, sometimes as direct PDF URLs | URLs locatable via search; not always fetched/read in this project — treat as a lead to follow up, not a confirmed source. |
| **TWC2 / NGO sources** (e.g., `twc2.org.sg`) | Migrant-worker-focused policy critique and review documents (e.g., of the EAA) | Useful for a critical/policy angle on labour-supply regulation; treat as advocacy commentary (SECONDARY tier), not primary law. |
| **MOM EA Directory** | Authoritative licence-number and licence-status lookup for any named employment agency | The correction source for aggregator scraping errors (see `verification-protocol.md`) — always confirm a licence number here before repeating it from a third-party site. |
| **Press-release pattern**: `mom.gov.sg/newsroom/press-releases/YYYY/MMDD-slug` | MOM enforcement actions (prosecutions, licence suspensions/revocations), by date | Good for building an enforcement-history timeline; construct likely URLs from known dates/topics and verify by direct fetch. |
| **Law-firm update pages / Lexology / Mondaq** | Client alerts on new legislation, cases, or enforcement trends | SECONDARY tier only; capture firm name + publication date; expect intermittent 403s (lawgazette.com.sg 403'd for at least one agent). |
| **Aggregator/registry sites** (e.g., sgpbusiness.com) | Company/UEN lookups, sometimes licence numbers | Convenient but scraping-error-prone (confirmed duplicate-licence-number bug in this project) — cross-check against MOM EA Directory or ACRA directly. |
| **Google Books previews** | Snippets of treatises (e.g., Ravi Chandran, *Employment Law in Singapore*) | Useful for a lead/paraphrase, not a quotable pinpoint — treat preview snippets as UNVERIFIED/SECONDARY. |
| **LawNet / Westlaw Singapore** | Full case law incl. pre-2000, SLR/SLR(R) report citations and citator (cases judicially considered), Halsbury's Laws of Singapore, full treatise text | **Not accessible to agents at all.** This is the standing human-escalation path — flag every gap that would be closed by LawNet access explicitly rather than working around it with a weaker substitute. |

## Escalate-to-human triggers

Flag for human LawNet/Westlaw/physical-library follow-up whenever a research task needs:
- A pre-2000 case not on eLitigation.
- Confirmation of a specific SLR/SLR(R) report citation or its citator status (judicially
  considered/followed/doubted/overruled).
- Halsbury's Laws of Singapore.
- A specific paragraph/page from a paywalled treatise (e.g., Ravi Chandran) or a paywalled
  SAcLJ/SAL Ann Rev article with no open mirror.
- Exact Hansard volume/column numbers.
