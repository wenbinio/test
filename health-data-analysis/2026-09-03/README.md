# Research wave 3 September 2026 — health data analytics (SG / AU)

Retrieval date for all files: **3 September 2026**. Six Opus agents, one per task; all six completed. Every findings file follows the RESEARCH-BRIEF §3 format (status as at date, URL retrieved, retrieved yes/no, provisions quoted under 25 words, P/S marking, Gaps, Search log).

This branch copy mirrors the Google Drive folder *Health Data Analysis*, and adds the bulk artefacts that could not go through the Drive connector.

## Layout

```
findings/   the seven findings files (SG-01 is the single unsplit file here; Drive has it in two parts)
bulk/       AU-01-DAT-Act-2022-full-text.txt        DAT Act 2022 (Cth) full text, 271 KB
            BUNDLE-CORE.corrected-2026-09-03.md      BUNDLE-CORE with the three corrections applied, 510 KB
            BUNDLE-CORE.corrections-2026-09-03.patch unified diff; apply to BUNDLE-CORE.md with `patch -p0`
            hansard-json/                            23 raw Hansard Official Report JSON files (12 Jan – 5 Aug 2026), 18 MB,
                                                     plus sweep.py (the POST sweeper), corpus.py (loader) and apilog.txt
            sg-01-extracts/                          the four speeches and 12 PQs as extracted text; num-*.md are the
                                                     paragraph-numbered versions used in SG-01
sources/    retrieved primary-source PDFs and PNGs cited in the findings, by agent (if present)
```

## Findings files

| Task | File | Scope |
|---|---|---|
| AU-01 | `findings/AU-01-dat-act-text.md` | DAT Act 2022 (Cth) ss 13–16 pinpointed; Data Availability and Transparency Code 2022; commencement history; 2025–26 amendments (none) |
| AU-02 | `findings/AU-02-dat-act-in-practice.md` | Statutory Review Final Report; NDC annual reports; accredited users, ADSPs, DSAs, refusals and withdrawals, with dates |
| AU-03 | `findings/AU-03-share-by-default.md` | Act No 8/2025; both 2025 Rules; commencement; ADHA figures before and after; second reading speeches; committee reports; MHR Act secondary-use provisions and the 2018 Framework |
| SG-01 | `findings/SG-01-hansard-extraction.md` | Louis Chua speech, government opening and closing speeches (HIB 2R, 12 Jan 2026), verbatim; every PQ since on NEHR research access, TRUST or derived information; confirmed negatives |
| SG-02 | `findings/SG-02-currency-pass.md` | HIA commencement status; HIA subsidiary legislation since 15 Aug (e-Gazette Algolia route); IG v2.0; s 25 consultation |
| SG-02 | `findings/SG-02-BUNDLE-CORE-corrections.md` | The two errors flagged 25 Aug, plus a third |
| LIT-01 | `findings/LIT-01-reading-digest.md` | Reading digest: four anchors plus Consensus sweep |

## Headline findings

**Singapore**
- Health Information Act 2026 wholly uncommenced as at 3 Sep 2026: no s 1 commencement notification in any Subsidiary Legislation Supplement through S 583/2026; MOH's site still says the requirements "have yet to take effect". Government's stated target is "early 2027" (opening speech ¶73).
- No HIA subsidiary legislation gazetted since 15 Aug 2026. HIA Implementation Guide v2.0 and FAQ v1.2 (27 Aug) say nothing on derived information or s 25. No s 25 regulations consultation; the "prescribed criteria" for Type 1 and Type 2 derived information remain unprescribed.
- Parliament has not sat since 5 Aug 2026. Health Sciences Authority (Amendment) and Other Matters Bill 17/2026 is listed for Second Reading on 8 Sep 2026.
- Hansard: the Government never used the words "derived information" in the Second Reading. TRUST is the operative research-access route: 40 approved applications to PRECISE-SG100K and HELIOS data (34 public, 6 private, 1 publication) as at 6 May 2026. On 5 Aug 2026 the Minister rejected explicit consent for AI training as "a non-starter" and did not answer whether NEHR data is within scope.
- BUNDLE-CORE errors confirmed and corrected: GL-10-R1 in force since 17 Aug 2026 (two places); HCSA s 59(8) never commenced and deleted from 1 Nov 2022. Third error: a cross-reference to "§3F item 45" should read item 46.

**Australia**
- DAT Act 2022 self-ceases on 1 Apr 2027 (s 143). No 2025–26 amendments. No rules under s 86 or s 133. Code s 6(3) deems medical research a permitted purpose.
- Access limb in practice: 8 data sharing agreements ever registered, all NDDA/ANDII, none since 25 Mar 2025; 42 accredited entities at 12 Jun 2026; over 11,000 agreements outside the Act; 1 accreditation cancellation, 1 refusal, 0 suspensions; requests refused 3 of 7 (2023–24) and 7 of 23 (2024–25). Reformulation: the accreditation limb grew, the sharing limb sat idle. Review (Dr Stephen King) transmitted 11 Nov 2025, tabled 3 Mar 2026, 15 recommendations, no government response.
- Share by default: Act No 8/2025 assented 14 Feb 2025; both Rules made 9 Dec 2025, commenced 1 Jul 2026. Nobody in either chamber spoke on secondary use. MHR Act s 109(7A) secondary-use rule never made; the Department says "My Health Record data is not yet available for research and public health purposes". No post-commencement ADHA statistics published as at 24 Aug 2026.

**Literature**
- Three of four anchors retrieved in full. "Allen IDPL 2025" as described in the task does not exist: the only 2025 IDPL article with an author named Allen is Zhang, Shanmugam and Jason Grant Allen, "Comparing smart city data protection approaches" (2025) 15(1) IDPL 48, a Singapore consent/accountability paper, not a DAT Act paper. The mis-description originated in the orchestrator's prompt. Full text not retrieved (OUP 403).
- Consensus sweep: null result for DAT Act uptake and for MHR secondary use since 2024.
- Disclosure flag: Savulescu, corresponding author of the IJPDS TRUST survey, sits on the TRUST Data Access Committee.

## Reproducing the Hansard corpus

`POST https://sprs.parl.gov.sg/search/getHansardReport` with body `{"sittingDate":"DD-MM-YYYY"}`, `Content-Type: application/json`, `Origin` and `Referer` set to `https://sprs.parl.gov.sg`, cookie jar seeded from `/search/`. A non-sitting day returns HTTP 500 with a 91-byte body. `bulk/hansard-json/sweep.py` does this for a date range. Cite as "Vol 96, Sitting No N, date"; never column numbers.

## Follow-ups for the next wave
1. **AIHGle 2.0** (MOH AI in Healthcare Guidelines, updated; announced 24 Aug 2026 at HIMSS26). Document not located. Also Synapxe platforms Tandem, Note Buddy, AgentSea. Needs an owner.
2. **HSA (Amendment) Bill 17/2026** Second Reading, 8 Sep 2026: capture the debate via the POST route.
3. **Genetic Information Bill** consultation closed 4 Sep 2026: retrieve the submissions summary when published.
4. **ONDC registers**: re-read the live Accredited Entities and Data Sharing Agreements registers after 12 Jun 2026 to update AU-02 counts.
5. **Delegated Legislation Monitor** entries on F2025L01568 and F2025L01569 (highest-value unretrieved AU-03 document); Senate Journals 3 Mar 2026 for the Review tabling.
6. **MOH guidance note to insurers** (issued with MAS support): try `mas.gov.sg` and `lia.org.sg`.
7. **IJPDS TRUST survey / Savulescu DAC seat**: decide how to handle the disclosure in the paper.
8. **Allen misidentification**: decide whether the Singapore smart-city paper is wanted at all, or whether a different Allen piece was meant.
9. **ADHA July and August 2026 statistics** and Annual Report 2025–26 once published; the share-by-default extensions register PDF.

## Notes on the Drive copies
- The Google Doc copy of BUNDLE-CORE in Drive still carries the three errors; only the `.md` in this branch is corrected.
- Drive's `AU-03-share-by-default.md` was re-uploaded on 5 Sep 2026 after a truncated first upload; Drive's SG-01 Part B was re-uploaded the same day with a corrected closing note.
