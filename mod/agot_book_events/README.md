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

## Compatibility Notes

This mod is designed to work alongside the CK3 AGOT mod. Key assumptions and areas to verify:

- **Bloodline traits**: Events trigger on `stark_bloodline`, `lannister_bloodline`, and `targaryen_bloodline`. Confirm these match the actual trait IDs used by the AGOT mod — they may use dynasty checks or different trait names (e.g. `blood_of_old_valyria`).
- **Title keys**: Events reference `title:c_winterfell` and `title:c_kings_landing`. Verify these match AGOT's title hierarchy (county-level vs barony-level).
- **Combat trait**: Jaime's event uses `has_trait = skilled_swordsman`. If the AGOT mod uses a different warrior trait (e.g. `knight`, `formidable_fighter`), this trigger should be updated.
- **Themes and backgrounds**: All themes (`crown`, `intrigue`, `death`, `war`, `mystical`, `wedding`, `realm`, `stewardship`, `duel`) and override backgrounds (`throne_room`, `burning_building`, `feast`) are standard CK3 assets and should work without modification.
- **Effects and modifiers**: Custom modifier names (`dragon_mother`, `commander_of_unsullied`, `torn_by_love`) are defined within this mod and do not conflict with AGOT.

## Story Event Expansion Plan

The following additional story arcs are planned for future releases:

### House Baratheon (`baratheon_book.*`)
- Stannis receives word of Joffrey's illegitimacy and declares his claim
- The shadow beneath Storm's End
- Battle of the Blackwater and its aftermath
- March to the Wall and alliance with the Night's Watch
- Sacrifice and fanaticism vs pragmatism choices

### House Greyjoy (`greyjoy_book.*`)
- Theon returns to the Iron Islands and faces his father's scorn
- The decision to raid the North and betray the Starks
- Capture of Winterfell and the Prince of Winterfell
- Fall and captivity — the transformation into Reek
- Escape and redemption arc

### Night's Watch / Jon Snow (`nights_watch_book.*`)
- Taking the black and swearing vows
- Ranging beyond the Wall and capture by wildlings
- The conflicted loyalties — wildling allegiance vs the Watch
- Election as Lord Commander
- Assassination and resurrection choices

### Expanded Stark Events (`stark_book.3000+`)
- Arya's journey: escape from King's Landing, travel with the Night's Watch recruits
- Training in Braavos and identity choices
- Sansa's captivity in King's Landing and the Vale
- Bran's journey north and greensight awakening

### Expanded Lannister Events (`lannister_book.0300+`)
- Cersei's regency and growing paranoia
- The Walk of Shame and fall from power
- Tyrion's arrival in Meereen and alliance with Daenerys

### Expanded Targaryen Events (`targaryen_book.0100+`)
- Drogon in the fighting pits and Daenerys's flight
- Return of the Dothraki and second khalasar
- Siege of Meereen and departure for Westeros

## Notes

All event text is paraphrased and original content inspired by the books, not direct quotations, to respect copyright.
