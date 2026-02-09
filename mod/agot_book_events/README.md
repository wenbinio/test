# AGOT Book Railroading Events Mod

This mod adds story events for A Game of Thrones CK3 that guide players through major plot points from the books.

## Features

### Story Events for Major Houses

- **House Stark**: Events covering the journey to King's Landing, investigation of Jon Arryn's death, War of Five Kings, Red Wedding, and survival storylines
- **House Lannister**: Events for political machinations, Tyrion's trial and escape, Jaime's honor crisis
- **House Targaryen**: Events for Daenerys's journey from exile to Mother of Dragons, liberation of slaves, and return to Westeros

### High Railroading Chance

Events are designed with high AI acceptance rates (typically 70-90%) for book-path options to encourage following canonical storylines while still allowing player choice.

### Character Flags and Progression

- Events use character flags to track progression through story arcs
- Triggers are time-gated and condition-based to ensure logical event flow
- Multiple branching paths allow for alternate outcomes

## Installation

1. Copy the `descriptor.mod` file to your CK3 mod folder
2. Copy the `mod/agot_book_events` folder to your CK3 mod folder
3. Enable the mod in the CK3 launcher

## Mod Structure

```
mod/agot_book_events/
├── events/
│   ├── stark_events.txt       # House Stark storyline events
│   ├── lannister_events.txt   # House Lannister storyline events
│   └── targaryen_events.txt   # House Targaryen storyline events
└── localization/
    └── english/
        └── book_events_l_english.yml  # Event text and descriptions
```

## Event Namespaces

- `stark_book.*` - House Stark events
- `lannister_book.*` - House Lannister events  
- `targaryen_book.*` - House Targaryen events

## Requirements

- Crusader Kings 3 version 1.12.* or compatible
- A Game of Thrones mod (the events reference traits like `stark_bloodline`, `lannister_bloodline`, `targaryen_bloodline`)

## Notes

All event text is paraphrased and original content inspired by the books, not direct quotations, to respect copyright.
