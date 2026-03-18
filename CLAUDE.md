# CLAUDE.md

## Project Overview

CK3 (Crusader Kings 3) game mod that adds book-accurate railroading events for the **A Game of Thrones** mod. Events guide players through major ASOIAF plot points with high AI acceptance rates (70-90%) for canonical paths while preserving player choice.

- **Language:** CK3 event scripting (Paradox script)
- **Supported version:** CK3 1.12.*
- **Dependency:** Requires the AGOT CK3 base mod

## Repository Structure

```
├── descriptor.mod                      # Mod metadata (name, version, tags)
└── mod/agot_book_events/
    ├── README.md                       # Mod documentation and install guide
    ├── events/
    │   ├── stark_events.txt            # 8 events — Ned's arc, War of Five Kings, Stark children
    │   ├── lannister_events.txt        # 7 events — Cersei, Tyrion's trial, Jaime's honor
    │   └── targaryen_events.txt        # 9 events — Dragon eggs, liberation arc, return to Westeros
    └── localization/english/
        └── book_events_l_english.yml   # All English localization strings
```

## Build & Test

**No build system or automated tests.** This is a CK3 mod — testing is done manually in-game.

To install: copy `descriptor.mod` and `mod/agot_book_events/` to the CK3 mod directory and enable in launcher.

## Event Conventions

### Namespaces & IDs
- Namespace per house: `stark_book`, `lannister_book`, `targaryen_book`
- Event ID format: `namespace.NNNN` (e.g., `stark_book.0001`)
- Sequential numbering within arcs; new arcs start at next thousand (`.0001`, `.1000`, `.2000`)

### Event Structure Pattern
```
namespace.event_id = {
    type = character_event
    title = namespace.event_id.t
    desc = namespace.event_id.desc
    trigger = { ... }
    option = {
        name = namespace.event_id.a    # canonical/book path
        ai_chance = { base = 80 }      # high AI acceptance
        trigger_event = { id = next_event days = N }
    }
    option = {
        name = namespace.event_id.b    # alternate path
        ai_chance = { base = 20 }      # low AI acceptance
    }
}
```

### Railroading Design
- **Canonical options:** AI weight 70-90 (first option, labeled `.a`)
- **Alternate options:** AI weight 10-30 (labeled `.b`, `.c`, etc.)
- Use `weight_multiplier` for conditional AI behavior adjustments

### Character Flags
- Flags track story arc progression and prevent event repetition
- Format: snake_case descriptive names (e.g., `ned_goes_south`, `tyrion_accused`)
- Always gate events with `NOT = { has_character_flag = ... }` to prevent replay
- Set flags in the triggering option to mark progression

### Trigger Conditions
- **Bloodline traits:** `has_trait = stark_bloodline`, `lannister_bloodline`, `targaryen_bloodline`
- **Titles:** `has_title = title:c_winterfell`, etc.
- **Timeline:** `year >= 298` for canonical book timing
- **Age:** `age >= 16` where appropriate
- Combine with `AND`/`OR` blocks for complex conditions

### Localization
- File: `localization/english/book_events_l_english.yml`
- Key format: `namespace.event_id.suffix:0 "Text"`
- Suffixes: `.t` (title), `.desc` (description), `.a`/`.b`/`.c` (option labels)
- Character modifiers: `dragon_mother`, `commander_of_unsullied`, `torn_by_love`

## Coding Style

- **Indentation:** Tabs
- **Braces:** Opening brace on same line, closing brace on own line
- **Ordering within events:** type → title → desc → trigger → immediate → option(s)
- **Comments:** Use `#` for section headers and explanatory notes
- Keep localization keys in sync with event file changes — every new event needs corresponding localization entries

## Key Traits Referenced

`stark_bloodline`, `lannister_bloodline`, `targaryen_bloodline`, `honest`, `brave`, `compassionate`, `skilled_swordsman`, `dwarf`
