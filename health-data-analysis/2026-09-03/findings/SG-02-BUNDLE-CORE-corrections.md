# BUNDLE-CORE correction log — the two errors flagged by the adversarial review of 25 August 2026

**Agent:** SG-02
**Date of corrections:** **3 September 2026**
**Source file corrected:** `ctx/BUNDLE-CORE.md` (508,671 bytes, 2,977 lines, UTF-8, CRLF line endings)
**Corrected file produced:** `out/BUNDLE-CORE.corrected-2026-09-03.md` (3,000 lines)
**Method:** exact-string replacement in Python (`work/SG-02/apply_corrections.py`), each edit asserted to match **exactly once** before being applied; the script aborts otherwise. CRLF line endings preserved (`newline=""` on both read and write) so the diff is confined to the intended lines.

The adversarial review's wording was:

> "**Two currency/consistency flags in BUNDLE-CORE.** GL-10-R1 became effective on Aug 17, 2026. BUNDLE-CORE §4.2.1 also contains a later sentence incorrectly suggesting HCSA s 59(8) remains in force after correctly recording its repeal with effect from Nov 1, 2022. The existing corpus has not been edited here."

Both flags are **confirmed and corrected**. No other change has been made, and the bundle has **not** been re-anchored from 15 August 2026.

---

## Correction 1 — GL-10-R1 is in force, and has been since 17 August 2026

### 1.1 Verification before editing

| Question | Answer | Source, retrieved 3 September 2026 |
|---|---|---|
| Does the guide state its own effective date? | Yes. Revision History table, p 3: *"GL-10 Best Practices Guide for MD Cybersecurity: First Release (17 August 2026)"*, against revision label "R1" | PDF `https://file.go.gov.sg/gl-10-r1-14-08-2026.pdf` — HTTP 200, 1,183,301 bytes, 38 pp; text extracted with PyMuPDF. **Retrieved: yes** |
| Is it still current on HSA's own guidance index? | Yes. Listed as *"GL-10-R1 Best Practices Guide on Medical Device Cybersecurity (2026 Aug) PUB"*, linking to `https://go.gov.sg/gl-10-r1-14-08-2026`. Page footer: "last updated 3 September 2026" | `https://www.hsa.gov.sg/medical-devices/guidance-documents/` — HTTP 200. **Retrieved: yes** |
| Is it binding? | **No, and this is unchanged.** Scope, p 6: *"This document does not constitute regulatory guidance and does not establish regulatory requirements or expectations for pre-market submission or registration."* | Same PDF. **Retrieved: yes** |

**Conclusion:** GL-10-R1 was published on 14 August 2026 and took effect on **17 August 2026**. BUNDLE-CORE's statement was correct as at its 15 August 2026 anchor and has been overtaken by two days.

### 1.2 Occurrences found

`grep -n "GL-10\|GL10" ctx/BUNDLE-CORE.md` returns **four** lines: **20, 168, 369, 1820.**

| Line | Makes a status claim? | Action |
|---|---|---|
| 20 | No — narrative listing GL-10-R1 among items produced by the 1–15 August 2026 sweep. Accurate (it was published 14 August 2026) | **Not edited** |
| 168 | No — argumentative, "a non-regulatory GL-10-R1". Accurate and unaffected | **Not edited** |
| **369** | **Yes** — §3F item 46 | **Edited (1a)** |
| **1820** | **Yes** — §5 HSA register item 11 | **Edited (1b)** |

### 1.3 Edit 1a — file line **369** (§3F, "FUTURE-DATED OBLIGATIONS UNDER INSTRUMENTS ALREADY MADE", row 46)

**Old text (verbatim, the replaced substring):**

```
⚠️ **Two days after the retrieval date: published but NOT YET IN FORCE as at 15 August 2026.** The newest instrument in the project.
```

**New text (verbatim):**

```
✅ **CORRECTED 3 Sep 2026 — IN FORCE since 17 August 2026.** Published 14 August 2026, it was not yet in force at this bundle's 15 August 2026 anchor and took effect two days later: the guide's own Revision History (GL-10 R1, p 3) reads "First Release (17 August 2026)". Still listed as a current guidance document on HSA's medical-device guidance index (retrieved 3 September 2026). The newest instrument in the project.
```

**Reason:** the status statement is now false. The row's own "Takes effect" column already read **17 August 2026**, so the Notes cell contradicted its own row from 17 August onwards.

**Preserved unchanged in the same row:** the P/S marking and source cell (`` `file.go.gov.sg/gl-10-r1-14-08-2026.pdf` — **P** ``), the "Takes effect" column, and the remaining Notes sentences — the non-binding characterisation, the "creates no breach-notification duty" point, the consultation history (10 Mar – 13 May 2025, 123 responses from 16 stakeholders) and the on/for title discrepancy.

**Source URL:** `https://file.go.gov.sg/gl-10-r1-14-08-2026.pdf` and `https://www.hsa.gov.sg/medical-devices/guidance-documents/` — **Retrieved: yes (both).**

**Appears in the Google-Doc export?** **Yes**, at `BUNDLE-CORE.gdoc-export-2026-08-25.txt` **line 703** (same sentence, formatting stripped). **The Google-Doc copy still carries the error and must be corrected there too.**

### 1.4 Edit 1b — file line **1820** (§5 HSA instrument register, row 11)

**Old text (verbatim, the replaced substring):**

```
⚠️ **NOT IN FORCE as at 15 Aug 2026 — first release effective 17 August 2026.** See §3F item 45
```

**New text (verbatim):**

```
✅ **IN FORCE since 17 August 2026** — corrected 3 Sep 2026; it was not yet in force at this bundle's 15 Aug 2026 anchor. The guide's own Revision History (p 3) reads "First Release (17 August 2026)". It remains **expressly non-binding** best-practice guidance: "This document does not constitute regulatory guidance and does not establish regulatory requirements" (p 6). See §3F item 45
```

**Reason:** as for 1a. The non-binding character is now stated in the register row itself with its pinpoint, so the corrected status cannot be misread as "GL-10-R1 is now mandatory".

**Preserved unchanged:** the row's Type cell already reads "Best-practices guide, **expressly non-binding**"; the P/S column reads `| P |`; both are untouched.

**Deliberately not fixed:** the cross-reference reads "See §3F item 45", but the GL-10-R1 row in §3F is **item 46**. This is a third, separate error. It is outside the two corrections commissioned and the instruction was to make no other edits, so the broken cross-reference is **flagged here and left in place** in both the old and new text.

**Source URL:** as for 1a. **Retrieved: yes.**

**Appears in the Google-Doc export?** **Yes**, at `BUNDLE-CORE.gdoc-export-2026-08-25.txt` **line 4688**. **Also uncorrected there.**

---

## Correction 2 — HCSA s 59(8) does not remain in force

### 2.1 The search that found it

The adversarial review said §4.2.1 "also contains a later sentence incorrectly suggesting HCSA s 59(8) remains in force". It does. These greps were run over the whole file:

```
grep -n "59(8)"                ctx/BUNDLE-CORE.md      → lines 215, 771, 773, 775, 777, 781, 924, 931, 2922, 2957
grep -n "remains in force"     ctx/BUNDLE-CORE.md      → lines 777, 781, 931, 2957
grep -n "still in force"       ctx/BUNDLE-CORE.md      → line 216 (Medicines (Advertisement and Sale) Act 1955 — unrelated, correct)
grep -n "survives"             ctx/BUNDLE-CORE.md      → lines 277, 739, 1706, 2820, 2398 — all unrelated
grep -n "continues to apply"   ctx/BUNDLE-CORE.md      → no hits
grep -n "in force today"       ctx/BUNDLE-CORE.md      → line 777 only (inside the warning against the error)
```

Line-by-line disposal of every `59(8)` occurrence:

| Line | Section | Says | Correct? |
|---|---|---|---|
| 215 | §3A item 10 | s 59(8) "was itself deleted by Act 31 of 2022 s 24(1) with effect from 1 November 2022" | ✅ correct |
| 771 | §4.2.1 commencement table | s 59(8) — excepted by S 1030/2021, "❌ **never**" commenced | ✅ correct |
| 773 | §4.2.1 | citation caution on the title-restricted sweep | ✅ correct |
| 775 | §4.2.1 | "s 59(8) never came into force and has not existed since 1 November 2022" | ✅ correct |
| 777 | §4.2.1 | *warns against* the wrong statement and explains why it is wrong | ✅ correct |
| **781** | **§4.2.1, "Key data provisions"** | **"s 59(8) (⚠️ remains in force because PDPA s 44 has never commenced — §3A item 10)"** | ❌ **WRONG — this is the sentence** |
| 924 | §4.3.1 | PDPA (Amendment) Act 2020 s 44 "DELETED by Act 31 of 2022 s 24(3)(b) wef 1 Nov 2022" | ✅ correct |
| 931 | §4.3.1 | corrects the "remains in force today" claim explicitly | ✅ correct |
| 2922 | open-questions table | "✅ Moot. It never commenced and was deleted with effect from 1 November 2022" | ✅ correct |
| 2957 | myth-correction table | `"HCSA s 59(8) remains in force"` → "Deleted with effect from 1 November 2022" | ✅ correct (it is the myth column) |

So the error is a **single sentence**, four paragraphs below the paragraph that refutes it, in the same section.

### 2.2 The edit — file line **781**

**Old text (verbatim, the replaced substring):**

```
**s 59(8)** (⚠️ remains in force because PDPA s 44 has never commenced — §3A item 10).
```

**New text (verbatim):**

```
**s 59(8)** (⚠️ **never commenced, and deleted with effect from 1 November 2022** by the Statutes (Miscellaneous Amendments) Act 2022 (Act 31 of 2022) s 24(1), S 850/2022 — the statement that it "remains in force because PDPA s 44 has never commenced" is wrong and is corrected above in this same section; see also §3A item 10).
```

### 2.3 Why the old sentence is wrong

The reasoning behind it was: s 44 of the Personal Data Protection (Amendment) Act 2020 (Act 40 of 2020) would have deleted HCSA s 59(8); s 44 never commenced; therefore s 59(8) survives.

**The premise is true and the conclusion does not follow.** A single omnibus provision — **Statutes (Miscellaneous Amendments) Act 2022 (Act 31 of 2022), s 24**, headed "Deletion of superseded amendments" — did **both** jobs directly, with effect from **1 November 2022** (commenced by **S 850/2022**):

- **s 24(1)** deleted **HCSA s 59(8)** itself; and
- **s 24(3)** deleted **ss 42, 44 and 45 of Act 40 of 2020** — including the very amending provision whose dormancy the old sentence relied on.

Parliament tidied away the dormant amending provision and its target in one stroke. So s 59(8) **never commenced** (it was excepted from commencement by S 1030/2021 and no later notification ever brought it in) **and has not existed since 1 November 2022**. It cannot "remain in force"; it was never in force, and it is now not on the statute book at all.

Two further reasons the old sentence had to go:
1. It **contradicted the same section** four paragraphs above (line 775) and the express warning at line 777, and §4.3.1 at line 931, and the myth-correction table at line 2957. A reader quoting line 781 would be quoting the bundle against itself.
2. Line 781 cross-referred to "§3A item 10" — which is the entry that **states the deletion**. The cross-reference pointed at its own refutation.

**Source:** Statutes (Miscellaneous Amendments) Act 2022 (Act 31 of 2022), Acts Supplement No. 30 of 2022, s 24(1) and s 24(3); commencement S 850/2022. **Retrieved by me this session: no.** This correction rests on the bundle's own primary-sourced findings at §3A item 10, §4.2.1 (lines 771–777) and §4.3.1 (lines 924, 931), each of which cites Act 31 of 2022 s 24 and S 850/2022 and each of which was primary-sourced by the originating agents. The correction makes line 781 consistent with those findings; it does not introduce a new proposition. **A verifier wanting independent confirmation should pull Acts Supplement No. 30 of 2022 and S 850/2022 from `assets.egazette.gov.sg`.**

**Appears in the Google-Doc export?** **Yes**, at `BUNDLE-CORE.gdoc-export-2026-08-25.txt` **line 1878**, verbatim (formatting stripped): *"… s 57 (regulation-making); s 59(8) (⚠️ remains in force because PDPA s 44 has never commenced — §3A item 10)."* **The Google-Doc copy still carries the error and must be corrected there too.**

---

## Corrigendum block inserted

A dated block was inserted **immediately after the title block** (after the `---` on line 6, before `# 1. HOW TO USE THIS BUNDLE`). It is a blockquote headed **"Corrigendum (3 September 2026)"**, lists the two corrections, states expressly that nothing else has been re-anchored, and directs the reader to `SG-02-currency-pass.md` for the Health Information Act's status as at 3 September 2026. 23 lines added.

---

## Diff verification

```
diff -u ctx/BUNDLE-CORE.md out/BUNDLE-CORE.corrected-2026-09-03.md
```

| Measure | Value |
|---|---|
| **Diff hunk count (`@@`)** | **4** |
| Lines removed (`^-` excluding the `---` header) | **3** |
| Lines added (`^+` excluding the `+++` header) | **26** |
| Net line change | 2,977 → 3,000 (+23, all of it the Corrigendum block) |
| Line endings | CRLF preserved in the output (`file` reports "with CRLF line terminators") |

The four hunks are exactly:

| Hunk | Location | Change |
|---|---|---|
| `@@ -5,6 +5,29 @@` | after the title block | +23 lines: the Corrigendum block |
| `@@ -366,7 +389,7 @@` | §3F item 46 | 1 line replaced — Correction 1a |
| `@@ -778,7 +801,7 @@` | §4.2.1 "Key data provisions" | 1 line replaced — Correction 2 |
| `@@ -1817,7 +1840,7 @@` | §5 HSA register item 11 | 1 line replaced — Correction 1b |

**No other line in the file differs.** The full unified diff is at `work/SG-02/bundle.diff` (59 lines).

---

## What is NOT corrected, and why

1. **The bundle's 15 August 2026 anchor is untouched.** Every other status statement still reads "as at 15 August 2026". The Corrigendum says so expressly. The current position on the Health Information Act is in `SG-02-currency-pass.md`, not in the bundle.
2. **"See §3F item 45" (line 1820) should read "item 46".** Left in place — a third error, outside scope.
3. **Lines 20 and 168** mention GL-10-R1 without making a status claim and are accurate as written.
4. **The Google-Doc copy** (`BUNDLE-CORE.gdoc-export-2026-08-25.txt`) carries **both** errors, at lines 703, 4688 (GL-10-R1) and 1878 (HCSA s 59(8)). It is a text export and cannot be edited back into the Doc from here. **Whoever owns that Doc must apply the same three replacements.**
