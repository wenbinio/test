# Source Access Playbook

For every Singapore legal/regulatory source the project touched: the URL pattern, what
access method **worked**, what **failed**, and gotchas observed by one or more agents.
Environments and egress policies vary between agent sessions — where two agents got
different results from the same source, both outcomes are recorded.

---

## sso.agc.gov.sg — Singapore Statutes Online

- **Acts**: `https://sso.agc.gov.sg/Act/<ActAbbrev><Year>` e.g. `/Act/EAA1958`, `/Act/IA1965`,
  `/Act/EFMA1990`, `/Act/PDPA2012`, `/Act/PWA2024`.
- **Subsidiary legislation**: `https://sso.agc.gov.sg/SL/<ActAbbrev>-S<no>-<year>` e.g.
  `/SL/EAA1958-S172-2011` (EA Rules 2011), `/SL/EAA1958-S175-2011`, `/SL/EFMA1990-S569-2012`
  (Work Passes Regulations), `/SL/EFMA1990-N4` (Work Pass Exemptions Notification).
- **Acts Supplement (as-gazetted amending Acts)**:
  `https://sso.agc.gov.sg/Acts-Supp/<no>-<year>/Published/<YYYYMMDDHHMMSS>` e.g.
  `/Acts-Supp/5-2011/Published/20110222170000` for the Employment Agencies (Amendment) Act
  2011.
- **SL Supplement**: `https://sso.agc.gov.sg/SL-Supp/S<no>-<year>/Published/<timestamp>`.
- **PDF rendition**: append `?ViewType=Pdf` to an Act page, or use the
  `Act-Rev/<Act><Year>/Published/<timestamp>...ViewType=Pdf` pattern — **this is the reliable
  fetch method** (see below).

**Access results — mixed, record both outcomes:**
- `WebFetch` (the AI-summarizer tool) → **HTTP 403** for essentially every agent that tried it directly on an SSO HTML page.
- Direct `curl`/HTTP GET (no special headers) → **worked** for most agents (Agents 1–3, 6).
- The `?ViewType=Pdf` PDF rendition → **parsed cleanly** and was the method of choice for at least one agent (Agent 4) after the plain HTML GET was also blocked in that session.
- One agent (Agent 10) got **HTTP 403 even via curl** on sso.agc.gov.sg *and* lawgazette.com.sg — egress/IP-reputation policy evidently varies by session, not just by tool. That agent had to flag citations as "citation-verified, substance-unverified" for a 2022 amendment (S 442/2022) it could not open.
- Practical rule: **try direct GET first; if blocked, try the `?ViewType=Pdf` rendition; if both are blocked, do not fabricate substantive text — cite the instrument by number/date only and flag substance as unverified.**

## elitigation.sg — Judgments (Supreme Court, post-2000)

- **Judgment page**: `https://www.elitigation.sg/gd/s/<YYYY>_<COURT>_<NN>` e.g.
  `/gd/s/2021_SGHC_26`, `/gd/s/2017_SGCA_58`, `/gd/s/2021_SGAD_1` (SGHC(A) shows as `SGAD` in
  the URL).
- **PDF**: `https://www.elitigation.sg/gd/gd/<YYYY>_<COURT>_<NN>/pdf`.
- **Coverage gap**: pre-2000 judgments are generally **not hosted** on eLitigation at all —
  confirmed for *Awang bin Dollah v Shun Shing Construction* [1997] 2 SLR(R) 746, which no
  agent could retrieve primary text for. Treat any pre-2000 case as **LawNet/Justis-only**.
- **CRITICAL GOTCHA — WebFetch hallucinates paragraph numbers on judgment PDFs.** One agent's
  WebFetch pass on *Ng Huat Seng v Munib Mohammad Madni* [2017] SGCA 58 reported the two-stage
  vicarious-liability test at **¶16/¶66**. A second agent downloaded the PDF and read it
  page-by-page with the Read tool and confirmed the test is actually at **¶42/¶44** (also
  cross-verified because a later judgment, *Munshi*, quotes Ng Huat Seng ¶42 and ¶44
  verbatim). **Never cite a pinpoint paragraph number sourced only from a WebFetch AI summary
  of a raw PDF stream.** The reliable method is: download the PDF, then read it with the Read
  tool page-by-page (or section-by-section), and only cite pinpoints you have personally seen
  in the extracted text.
- Multiple agents independently confirmed this pattern is systemic, not a one-off: a second
  discrepancy arose on *Munshi Mohammad Faiz v Interpro Construction* [2021] SGHC 26, where a
  WebFetch/secondary-pass agent reported the dual-VL holding at "[53]" and control analysis at
  "[72]–[75]", while the agent that read the PDF directly located the actual holding at ¶67 and
  control analysis at ¶70–80. The direct-read agent is authoritative; the mismatch was flagged
  explicitly for a verifier rather than silently resolved.

## web.archive.org (Wayback Machine)

- **Blocked specifically by the `WebFetch` tool** in this environment — but **reachable via
  Bash `curl`**. This is a tool-specific block, not a network-wide block.
- Snapshot URL pattern: `http://web.archive.org/web/<YYYYMMDDHHMMSS>/<original-url>`.
- Availability API: `https://archive.org/wayback/available?url=<original-url>` — useful to
  check whether *any* snapshot exists before trying to fetch a specific timestamp.
- **Payoff case**: a MOM ministerial speech page (2011 Employment Agencies (Amendment) Bill,
  Second Reading, Mr Lee Yi Shyan) had been deleted from mom.gov.sg (now 404). A dedicated
  gap-filler agent found a Wayback snapshot (captured 2 Apr 2025) via `curl` and recovered the
  **full verbatim speech text**, saved as a standalone file (`08a-hansard-speech-fulltext.txt`)
  for the writer. Lesson: when a primary government page 404s, check Wayback via curl before
  giving up on verbatim text.
- Caveat even on a successful recovery: a Wayback snapshot of a press-release version of a
  speech is **not** a Hansard-formatted transcript (no column markers, may omit floor
  interjections) — flag it as such rather than presenting it as the official Hansard record.

## sprs.parl.gov.sg (Parliament Hansard) and search.pair.gov.sg

- **Inaccessible to every method tried** — JS-rendered pages plus Incapsula/AWS WAF bot
  protection defeated direct GET, WebFetch, and curl alike, across multiple agents.
- Practical consequence: Hansard **volume/column numbers are not independently verifiable**
  through automated tools. Do not guess or interpolate column numbers — cite by sitting date
  only, or with an explicit bracketed "[vol/cols unverified]" flag (see
  `citation-conventions.md`).
- Escalation path: a human with LawNet/Parliament-portal access, or manual browser access,
  is required to pin down exact volume/column citations.

## National Archives of Singapore (NAS) catalogue

- Returns an **AWS WAF challenge**: HTTP 202 with header `x-amzn-waf-action: challenge`. No
  method tried defeated this. Used only to loosely corroborate a Hansard volume number
  ("Vol 87") by date-clustering metadata visible in search-result snippets — that
  corroboration is **moderate, not primary-verified**.

## mom.gov.sg (Ministry of Manpower)

- Fetches fine via direct GET / WebFetch for ordinary HTML pages — the most reliable
  government source in the project.
- **Always record the "Last Updated" stamp** on every MOM page cited — MOM pages are
  living/administrative guidance that changes over time (e.g., "Who needs to get a licence" —
  last updated 2 Jul 2026; "Eligibility for an EA licence" — 12 Feb 2026; "Security bond
  requirements" — 24 Dec 2025). The Last Updated date is part of the citation, not
  decoration — it tells the reader (and future researchers) exactly which version of
  administrative guidance was relied on.
- PDFs (e.g., EA Licence Conditions) are extractable with `pdftotext` and this was the
  reliable method for a ~1,261-line licence-conditions document.
- **One 9.6 MB PDF (`ea-regulatory-framework-changes.pdf`) failed to parse** — record file
  size as a plausible cause and flag for manual review rather than silently omitting the
  document or guessing its contents.
- Press-release URL pattern: `mom.gov.sg/newsroom/press-releases/<YYYY>/<MMDD>-<slug>` — useful
  for enforcement-action searches and for constructing likely URLs to verify by direct fetch.
- Parliamentary Q&A pattern:
  `mom.gov.sg/newsroom/parliament-questions-and-replies/<YYYY>/<MMDD>-<slug>`.
- FAQ pattern: `mom.gov.sg/faq/<topic>/<question-slug>`.

## lawgazette.com.sg (Law Society of Singapore's Law Gazette)

- **HTTP 403** for at least one agent (Agent 10), blocking a lead article ("Employers of
  Record in Singapore: A Critical Overview"). Another agent's earlier fetch of a different
  Law Gazette feature also errored. Treat as **unreliable/frequently blocked** — flag any
  citation to it and prefer corroborating from a source that did load.

## journalsonline.academypublishing.org.sg (SAcLJ / SAL Annual Review)

- **Paywalled** — no agent obtained quotable text directly.
- **SMU InK** (`ink.library.smu.edu.sg`) sometimes hosts open-access PDFs of the same or
  related articles (e.g., a SAL Ann Rev Tort chapter URL was located at
  `ink.library.smu.edu.sg/cgi/viewcontent.cgi?article=...&context=sol_research`), but fetches
  **returned empty or 403 for some agents** even on InK URLs. Do not assume InK bypasses the
  paywall — verify per-URL.
- Net effect: SAcLJ/SAL Ann Rev commentary is a **genuine, recorded gap** in this project, not
  a source to strain against. Cite the URL as "located, not retrievable" and move on rather
  than fabricating a pinpoint.

## LawNet / Westlaw

- **Not accessible to agents at all** in this environment — no agent even attempted a fetch,
  since these are authenticated subscription platforms. This is the standing **escalation
  path for a human** on: (a) SLR (report) citation confirmation/citator checks, (b) any
  pre-2000 case not on eLitigation (e.g. Awang bin Dollah), (c) Halsbury's Laws of Singapore,
  and (d) treatise material (e.g., Ravi Chandran's Employment Law in Singapore) where no
  open-access excerpt exists.

## Google Books previews, law-firm client-alert pages, Lexology/Mondaq

- **Partial access** — some law-firm update pages and Google Books preview snippets loaded;
  others 403'd or returned thin/paywalled previews. Treated throughout as **SECONDARY, not
  primary**, tier evidence (see `verification-protocol.md`).
- When citing any law-firm or aggregator page, **capture firm name + publication date**
  (these pages get updated or taken down, and dates matter for currency, e.g. a "9.6% CPF
  rate" or "$50,000 paid-up capital" claim traced back to an SEO/marketing page with no
  citation and no figure to substantiate it — flagged as likely fabricated rather than
  repeated).
- Aggregator sites (sgpbusiness.com and similar) were used for EA licence-number lookups but
  produced at least one **scraping error**: the same licence number "91C2918" was returned for
  two different firms (Adecco and Kelly Services) — a red flag that the underlying scrape had
  conflated rows. Any single-source licence-number or company-registry data point from an
  aggregator should be cross-checked against the official MOM EA Directory before being relied
  on.

## MOM EA Directory (licence verification)

- `mom.gov.sg/eservices/services/employment-agencies-and-personnel-search` — the authoritative
  source for confirming a firm's actual EA licence number and status; used to catch the
  aggregator scraping error above. Prefer this over any third-party aggregator for licence-
  number claims.

## GoBusiness licensing portal

- `licensing.gobusiness.gov.sg/licence-directory/mom/employment-agency-licence` — application
  process, fee schedule, and processing-time claims should be cross-checked here against MOM's
  own "Apply for a licence" page, since several secondary sources (corporate-services
  marketing pages) published contradictory processing-time and fee figures (see
  `verification-protocol.md` for the specific discrepancies caught).
