import type { Faction } from "@star-realms/shared/types";

interface Props {
  faction: Faction;
}

// Pure SVG faction glyphs. No external assets.
export function FactionGlyph({ faction }: Props) {
  switch (faction) {
    case "trade":
      return (
        <svg viewBox="0 0 32 32" aria-hidden>
          <circle cx="16" cy="16" r="9" fill="none" stroke="currentColor" strokeWidth="2" />
          <circle cx="16" cy="16" r="3" fill="currentColor" />
          <path d="M16 4 L16 8 M16 24 L16 28 M4 16 L8 16 M24 16 L28 16"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case "blob":
      return (
        <svg viewBox="0 0 32 32" aria-hidden>
          <path d="M16 4 C22 4 26 8 24 14 C28 18 24 26 18 24 C14 28 6 24 8 18 C4 14 8 6 16 4 Z"
                fill="currentColor" opacity="0.85" />
          <circle cx="13" cy="14" r="1.6" fill="#06080f" />
          <circle cx="19" cy="14" r="1.6" fill="#06080f" />
        </svg>
      );
    case "machine":
      return (
        <svg viewBox="0 0 32 32" aria-hidden>
          <path d="M16 3 L20 8 L26 8 L26 14 L29 16 L26 18 L26 24 L20 24 L16 29 L12 24 L6 24 L6 18 L3 16 L6 14 L6 8 L12 8 Z"
                fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
          <circle cx="16" cy="16" r="3.5" fill="currentColor" />
        </svg>
      );
    case "star":
      return (
        <svg viewBox="0 0 32 32" aria-hidden>
          <path d="M16 3 L19.5 12 L29 12 L21.2 18 L24 27 L16 21.5 L8 27 L10.8 18 L3 12 L12.5 12 Z"
                fill="currentColor" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 32 32" aria-hidden>
          <circle cx="16" cy="16" r="9" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="3 3" />
          <circle cx="16" cy="16" r="2" fill="currentColor" />
        </svg>
      );
  }
}
