import type { Severity } from '../../data/types'

export type BristolValue = 1 | 2 | 3 | 4 | 5 | 6 | 7
export type PeeVolume = 'small' | 'medium' | 'large'
export type PooBlood = 'none' | 'bright' | 'black'

export interface PeeEntry {
  id: string
  kind: 'pee'
  at: number
  volume: PeeVolume
  colour: string
  wokeToPee: boolean
  urgency: boolean
  burning: boolean
  blood: boolean
  note: string
}

export interface PooEntry {
  id: string
  kind: 'poo'
  at: number
  bristol: BristolValue
  colour: string
  strained: boolean
  incomplete: boolean
  blood: PooBlood
  note: string
}

export interface DrinkEntry {
  id: string
  kind: 'drink'
  at: number
  ml: number
  note: string
}

export type Entry = PeeEntry | PooEntry | DrinkEntry

/** Rough mL per void. Deliberately coarse — nobody measures, and pretending to
 *  three significant figures would make the totals look more authoritative
 *  than they are. Every derived volume is labelled as an estimate. */
export const VOLUME_ML: Record<PeeVolume, number> = {
  small: 100,
  medium: 250,
  large: 450,
}

export const VOLUME_LABEL: Record<PeeVolume, string> = {
  small: 'Small — a splash, over in seconds',
  medium: 'Normal — a steady 20–30 seconds',
  large: 'Large — a long one, bladder was full',
}

export interface Finding {
  id: string
  severity: Severity
  /** The threshold or definition this is measured against. */
  title: string
  detail: string
  /** What the reader should actually do. */
  action: string
}

export interface DaySummary {
  dayStart: number
  pees: PeeEntry[]
  poos: PooEntry[]
  drinks: DrinkEntry[]
  estimatedUrineMl: number
  fluidMl: number
  nocturiaCount: number
  looseCount: number
}
