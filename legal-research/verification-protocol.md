# Verification Protocol

A tiered confidence system emerged organically across the 11 dossiers as agents converged on
similar language ("VERIFIED", "MEDIUM confidence", "UNVERIFIED", "NOTHING FOUND"). This file
formalises it for reuse. Every research agent on a future Singapore legal task should be
briefed on these tiers up front, and should tag every non-trivial factual claim with one.

## The four tiers

### (a) FULLY VERIFIED
The agent **personally read the primary text** — a judgment PDF downloaded and read
page-by-page with the Read tool, or a statute/subsidiary-legislation PDF/HTML fetched directly
(not summarized by an AI fetch tool) and quoted verbatim. Pinpoint paragraph/section numbers
at this tier are trustworthy.

Examples from the project: *Munshi Mohammad Faiz v Interpro Construction* [2021] SGHC 26 read
in full (¶2–83) with pinpoints confirmed directly; EAA 1958 ss 2 and 6 quoted verbatim from a
directly-fetched SSO PDF; MOM's "Who needs to get a licence" page quoted verbatim via direct
curl + HTML strip.

### (b) MEDIUM
Either (i) a WebFetch AI-summary of a primary source (not a direct read), or (ii) the material
is **quoted verbatim inside another, independently fully-verified judgment** — i.e., you trust
the quoting court's transcription rather than having opened the original yourself.

Examples: *BNM v NUS* [2014] 4 SLR 931 was not independently read by any agent, but its
holding was treated as MEDIUM confidence because it is quoted at length in the fully-verified
*Munshi* judgment (¶55–56). CEI course-hour figures pulled from an AI-summarized MOM fetch
(not raw-HTML verified) were tagged MEDIUM.

**Rule: never cite a pinpoint paragraph or column number sourced only from a WebFetch AI
summary of a raw PDF stream.** This project hit a confirmed hallucination (see
`source-access-playbook.md` — Ng Huat Seng ¶16/¶66 vs actual ¶42/¶44) that would have gone
uncorrected without a second agent doing a direct read. Downgrade any WebFetch-only pinpoint
to MEDIUM and re-verify by direct read before it goes in a memo.

### (c) SECONDARY
Law-firm client alerts, news articles, corporate-services marketing pages, aggregator sites
(e.g., sgpbusiness.com), book-preview synthesis. Useful for triangulation, industry colour,
and leads — never for a legal pinpoint. Always record the publishing firm/outlet and date.

Examples: EA licence numbers for Kelly Services, RGF Talent Solutions, PeopleSearch (all
tagged "Secondary-sourced" pending MOM EA Directory confirmation); "8–12 weeks incl CEI prep"
licence-processing estimate from Harvest Accounting (28 Apr 2026).

### (d) UNVERIFIED
Search-engine snippets only, or a claim the agent could not locate any source for at all.
Report the claim as unverified rather than omitting it silently if it's a plausible/circulating
claim worth flagging (so the writer/human knows it needs checking) — but never let it read as
settled.

Examples: "$50,000 paid-up capital" requirement for an EA licence — traced to an SEO page with
no citation and no MOM confirmation; flagged as **likely fabricated**, not merely unverified.
Hansard volume 87 for the 11 Jan 2011 sitting — "plausible, moderately corroborated" via NAS
metadata clustering but not confirmed from primary text; column numbers "completely unfound —
do NOT fabricate."

## Rules of practice

1. **Never cite pinpoints from WebFetch PDF summaries without a direct read.** This is the
   single most important rule this project surfaced. See the Ng Huat Seng episode above.
2. **Quote verbatim, and record URL + access date + "Last Updated" stamp** for every primary
   or MOM-guidance source. The Last Updated stamp is not optional — MOM guidance is a living
   document and the memo needs to say which version was relied on.
3. **Verified negatives are valuable findings — record "nothing found" explicitly, per
   category.** This project's recency-sweep agents (09, 10, 11) produced substantial value
   precisely by confirming, e.g., that no 2021–2026 Singapore judgment cites or applies
   *International Placements v PP* [2020] SGHC 46 (the only judicial EAA interpretation), that
   no case has applied *Ochroid Trading* illegality doctrine to an EAA breach, and that no
   Singapore case uses the term "staff augmentation" at all. A silent absence of findings is
   useless to a writer; an explicit "searched via N query variants, NOTHING FOUND" is a
   citable, load-bearing negative result. Always state the category searched, not just the
   conclusion.
4. **Never fabricate column numbers, SLR citations, or any other pinpoint you cannot source.**
   Mark as unverified with brackets, e.g. "[vol/cols unverified]," rather than guessing a
   plausible-looking number. Two live examples from the project: Hansard columns for the 11
   Jan 2011 sitting (never found, correctly left blank); and the SLR citation
   "[2019] 2 SLR 316" attributed to *PP v Jurong Country Club* — one agent's WebFetch pass
   **affirmatively denied** this citation existed; the correct, safe citation is the neutral
   citation [2019] SGHC 150 only, pending a LawNet citator check.
5. **Watch for scraping/aggregator errors.** The project caught two different firms (Adecco
   and Kelly Services) both being returned with EA licence number "91C2918" by an aggregator
   site — a conflated-row scraping error. Cross-check any single-aggregator data point against
   an authoritative registry (here, the MOM EA Directory) before repeating it.
6. **Watch for press re-reports of old cases masquerading as new decisions.** One agent
   (Agent 11) caught 2023/2024 press items about "CPF Board loses bid... Jurong Country Club"
   that were in fact re-reporting the same 2019 decision ([2019] SGHC 150), not a new ruling.
   Before treating a news hit as a "recent development," check whether it is describing a case
   with a citation you've already logged.
7. **Beware plausible-but-nonexistent case names.** The project's clearest example: one agent
   (Agent 2) asserted that *"Karuppiah Ravichandran v GDS Engineering Pte Ltd"* exists and
   stands for a WICA "substantial question of law" appeal threshold. A second, independent
   agent (Agent 5) could not locate any such case after a dedicated search and concluded it is
   "likely non-existent/misremembered," probably a conflation with the real (but different)
   case *Karuppan Bhoomides v Port of Singapore Authority* [1978] 1 WLR 189. This was recorded
   as an open discrepancy for a human verifier rather than silently resolved by either agent —
   **do not let one agent's confident assertion of a case's existence stand unchallenged; a
   second, independently-searching agent is the check.**
8. **Reconcile, don't silently pick a winner, when two agents disagree about a fact that
   matters.** Example: Agent 2 read a later case (Mohammed Shahid v Lim Keenly Builders
   [2010] SGHC 142, ¶21) stating that *Awang bin Dollah* succeeded on **occupier's liability**,
   not employer's liability; Agent 5 found a different later case (Asplenium [2019] SGHC 41)
   citing Awang bin Dollah for a **control test** relevant to employer identity. Both citations
   are individually well-sourced but point to different propositions from the same old,
   unretrievable case — flagged explicitly as "both may be true (different propositions);
   verify before citing" rather than either agent overriding the other.
9. **A confidence tier can be downgraded by a later agent's find, but should not be silently
   upgraded.** If a MEDIUM item is later independently read and confirmed, mark it FULLY
   VERIFIED and note which agent/pass did the confirming read (traceability matters more than
   speed).
