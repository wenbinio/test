# CLAUDE.md

## Project Overview

This is a **Crusader Kings 3 (CK3) mod** called "AGOT Book Railroading Events" — a content mod for the "A Game of Thrones" (AGOT) CK3 mod. It implements narrative event chains that guide players through major plot points from the books for three houses: Stark, Lannister, and Targaryen.

**No build system, package manager, tests, linting, or CI/CD.** This is a pure game mod with CK3 script files and YAML localization.

## Repository Structure

```
.
├── CLAUDE.md                               # This file
├── README.md                               # Root readme (minimal)
├── descriptor.mod                          # CK3 mod descriptor (name, version, tags)
└── mod/
    └── agot_book_events/                   # Main mod content
        ├── README.md                       # Detailed mod documentation
        ├── events/                         # CK3 event script files
        │   ├── stark_events.txt            # House Stark event chain
        │   ├── lannister_events.txt        # House Lannister event chain
        │   └── targaryen_events.txt        # House Targaryen event chain
        └── localization/
            └── english/
                └── book_events_l_english.yml  # All event text (English)
```

## Languages & Formats

- **CK3 Script** (`.txt` files in `events/`): Paradox Interactive's declarative event scripting language
- **YAML** (`.yml` in `localization/`): CK3 localization format with `:0` suffix on keys

## Key Conventions

### Event Namespaces

Each house has its own namespace declared at the top of its event file:
- `stark_book.*` — Stark events
- `lannister_book.*` — Lannister events
- `targaryen_book.*` — Targaryen events

### Event ID Numbering

- `0001`–`0999`: Primary story events
- `1000`+: Major story milestones (e.g., Red Wedding, Trial by Combat)

### Event File Structure

Every event follows this pattern:

```
[namespace].[id] = {
    type = character_event
    title = [loc_key]
    desc = [loc_key]
    theme = [theme]

    trigger = { [conditions] }
    immediate = { [set flags, prevent re-trigger] }
    weight_multiplier = { base = [number] }

    option = {
        name = [loc_key]
        [effects]
        ai_chance = { base = [percentage] }
    }
}
```

### Localization Key Format

Keys follow the pattern `[namespace].[event_id].[suffix]:0`:
- `.t` — Event title
- `.desc` — Event description
- `.a` — Option text (first option)
- `.b` — Option text (second option)
- `.a.flavor` / `.a.tt` — Flavor text and tooltips

### Character Flag System

Events use flags to track story progression and prevent re-triggering:
- Flags are set in the `immediate` block when an event fires
- Subsequent events check for prior flags in their `trigger` block
- Example: `has_character_flag = ned_summons_received` gates later events

### AI Weighting (Railroading)

- Book-canonical options: `ai_chance = { base = 70–90 }`
- Alternate paths: `ai_chance = { base = 10–30 }`

This ensures AI characters follow book storylines while giving players meaningful choices.

### Content Guidelines

- Event text paraphrases book content (no direct quotations — copyright consideration)
- Flavor text and tooltips enhance immersion
- Character traits referenced include both AGOT mod traits (`stark_bloodline`, `targaryen_bloodline`) and vanilla CK3 traits (`brave`, `honest`, `dwarf`)

## Dependencies

- **Crusader Kings 3** v1.12.*
- **A Game of Thrones (AGOT) CK3 mod** — provides bloodline traits, characters, and world setup

## Adding New Content

When adding new event chains:

1. Create a new event file in `mod/agot_book_events/events/` named `[house]_events.txt`
2. Declare a namespace at the top: `namespace = [house]_book`
3. Follow the event ID numbering scheme (0001+ for primary, 1000+ for milestones)
4. Add all localization strings to `localization/english/book_events_l_english.yml`
5. Use character flags for sequential gating between events
6. Set `ai_chance` weights to rail AI toward canonical outcomes

## Installation (for manual testing)

Copy `mod/agot_book_events/` into the CK3 mod directory and enable via the CK3 Launcher. The `descriptor.mod` file provides launcher metadata.
