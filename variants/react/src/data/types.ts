/** Three-level signal used everywhere status is shown.
 *  Always rendered with a distinct glyph AND a word, never colour alone. */
export type Severity = 'ok' | 'watch' | 'urgent'

/** How fast someone needs to act. Drives the red-flag filters. */
export type Timeframe = 'now' | 'days' | 'reassure'

export type BodySystem = 'urinary' | 'bowel' | 'both'

export interface BristolType {
  type: 1 | 2 | 3 | 4 | 5 | 6 | 7
  name: string
  form: string
  meaning: string
  transit: string
  severity: Severity
}

export interface UrineColour {
  id: string
  label: string
  swatch: string
  /** Text colour that clears 4.5:1 on `swatch`; used for the chip label. */
  swatchInk: string
  causes: string
  action: string
  severity: Severity
}

export interface StoolColour {
  id: string
  label: string
  swatch: string
  swatchInk: string
  cause: string
  severity: Severity
}

export interface RedFlag {
  id: string
  timeframe: Timeframe
  system: BodySystem
  /** The symptom, in the reader's own words. */
  symptom: string
  /** What it can mean and what to do. */
  detail: string
  /** Set on the handful that must never be scrolled past. */
  critical?: boolean
}

export interface ClinicalTerm {
  term: string
  meaning: string
  threshold: string
  system: BodySystem
}

export interface Figure {
  value: string
  unit?: string
  label: string
}

export interface Faq {
  q: string
  a: string
}
