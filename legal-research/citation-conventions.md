# Citation Conventions

Practical SAL-style (Singapore Academy of Law) citation notes gathered while working the
dossiers — what forms were used, how contested citations got resolved, and where a citation
had to be left deliberately incomplete rather than guessed.

## Neutral citations vs. report citations

- **Neutral citation** — court-assigned, always available immediately from eLitigation, format
  `[Year] Court Abbrev Number`, e.g. `[2021] SGHC 26`, `[2017] SGCA 58`, `[2019] SGHC 150`.
  This is the safe default citation form: it can be verified by direct PDF read (see
  `source-access-playbook.md`) without needing LawNet.
- **Report citation** (Singapore Law Reports) — assigned later when the case is selected for
  the SLR, format `[Year] Volume SLR Page`, e.g. `[2021] 4 SLR 1371`. **Report citations
  cannot be verified from eLitigation** — the judgment PDF itself doesn't carry its own future
  SLR page number. Confirming one requires either LawNet/Westlaw (unavailable to agents — see
  `source-access-playbook.md`) or finding a **later judgment that quotes the case using its
  SLR citation**.
- **Live example of how a report citation got confirmed without LawNet**: *Munshi Mohammad
  Faiz v Interpro Construction* [2021] SGHC 26 was independently reported to be [2021] 4 SLR
  1371 by one agent; this was corroborated when a later, unrelated Court of Appeal case, *Reed
  v Bellingham* [2022] SGCA 60, was found to cite it at ¶47 as *"Munshi Mohammad Faiz v
  Interpro Construction Pte Ltd and others and another appeal [2021] 4 SLR 1371 at [64]."*
  Because Reed v Bellingham was itself fully verified by direct PDF read, this is treated as a
  reliable (MEDIUM-to-FULLY-VERIFIED-adjacent) confirmation of Munshi's SLR citation — a
  general technique: **when you can't reach LawNet, hunt for a later verified judgment that
  quotes your case with its full report citation.**
- **Live example of a report citation that turned out to be WRONG**: one agent's WebFetch pass
  reported *PP v Jurong Country Club* as "[2019] 2 SLR 316." A separate pass **affirmatively
  denied** this citation. The safe resolution: cite the case by its neutral citation only —
  *PP v Jurong Country Club and another appeal* [2019] SGHC 150 — and flag the SLR citation as
  unconfirmed pending a LawNet citator check. **Do not repeat a report citation you have not
  independently confirmed, even if a fetch tool asserts it confidently.**

## Court abbreviations encountered

- `SGCA` — Court of Appeal.
- `SGHC` — General Division of the High Court.
- `SGHC(A)` — Appellate Division of the High Court. Note the eLitigation URL slug uses `SGAD`
  (e.g. `elitigation.sg/gd/s/2021_SGAD_1`) even though the citation is written `SGHC(A)`, e.g.
  *Hwa Aik Engineering Pte Ltd v Munshi Mohammad Faiz and another* [2021] SGHC(A) 1;
  [2021] 1 SLR 1288. Don't confuse the URL slug with the citation form.
- `SGECT` — Employment Claims Tribunal appeals/references.
- `SGHCR` — High Court, Registrar's/Assistant Registrar's decisions.
- `SLR(R)` — the **pre-2010 reissue** series (Singapore Law Reports (Reissue)), used for older
  cases republished with updated citation format, e.g. *Awang bin Dollah v Shun Shing
  Construction & Engineering Co Ltd and other appeals* [1997] **2 SLR(R) 746** (also
  historically reported as [1997] 3 SLR 677 — cases straddling the SLR(R) reissue can have two
  valid-looking report citations; note both if both are found, and flag which one is the
  reissue).

## Statute citation form

`<Act name> <Year of the Revised Edition or original enactment> (<Rev Ed year> Rev Ed)
s <section>(<subsection>)(<paragraph>)`, e.g.:

> Employment Agencies Act 1958 (2020 Rev Ed) s 6(3)(c)

Note the Act's short title year (1958, the year of original enactment) is distinct from the
Revised Edition year (2020) — both appear in a correct citation. The project confirmed via SSO
that the "2020 Rev Ed" text of the EAA "incorporates all amendments up to and including 1
December 2021" and "comes into operation on 31 December 2021" — i.e., a Revised Edition's
effective date can postdate its nominal year, which matters if pinpointing "the version in
force on [date]."

## Subsidiary legislation citation form

`(S <number>/<year>) r <rule>(<subrule>)`, e.g.:

> Employment Agencies Rules 2011 (S 172/2011) r 12(1)

Other subsidiary-legislation instruments encountered and their SSO identifiers: Employment
Agencies (Exemption) Order 2011 (S 175/2011); Employment Agencies (Exemption) Order 2014
(S 433/2014); Employment Agencies (Amendment) Rules 2022 (S 442/2022) — citation verified,
substance blocked by a 403 in one session, see `source-access-playbook.md`; Employment of
Foreign Manpower (Work Passes) Regulations 2012 (S 569/2012).

## Hansard citation form — and its caveat

Standard form:

> Singapore Parliamentary Debates, Official Report (11 January 2011) vol 87 (Lee Yi Shyan,
> Minister of State for Trade and Industry and Manpower)

**Caveat learned the hard way**: sprs.parl.gov.sg and search.pair.gov.sg were unreachable by
every method tried (JS rendering + Incapsula/AWS WAF — see `source-access-playbook.md`), so
the volume number and any column numbers are **not independently verifiable** by an agent.
"Vol 87" for the 11 January 2011 sitting was only "plausible, moderately corroborated" via NAS
catalogue date-clustering, not confirmed from primary text; column numbers were "completely
unfound." **The correct practice when a full Hansard cite can't be verified is to cite by
sitting date only, and mark volume/column as unverified**, e.g.:

> Singapore Parliamentary Debates, Official Report (11 January 2011) [vol/cols unverified]
> (Lee Yi Shyan, Minister of State for Trade and Industry and Manpower)

rather than asserting a specific volume/column that cannot be checked. If the verbatim speech
text itself is needed and the official page has been taken down, see the web.archive.org
recovery technique in `source-access-playbook.md` — but note that a Wayback-recovered press
release of a speech is not a substitute for a properly column-cited Hansard transcript.

## Statutory basis for relying on Hansard/extrinsic material

**Interpretation Act 1965, s 9A** ("Purposive interpretation of written law and use of
extrinsic materials") is the statutory hook that justifies citing a Second Reading speech (or
other extrinsic material) in a Singapore legal memo at all:

- s 9A(1) requires courts to prefer a purposive interpretation.
- s 9A(2)–(3) authorises reliance on extrinsic material — expressly including Parliamentary
  debates and a Bill's explanatory statement — both to *confirm* an ordinary meaning and to
  *resolve* ambiguity or a manifestly absurd/unreasonable result.

Cite s 9A explicitly whenever a memo leans on a Second Reading speech or similar material, so
the reader understands why extrinsic material is doctrinally admissible in the first place —
this is not merely persuasive colour, it is expressly sanctioned by statute.
