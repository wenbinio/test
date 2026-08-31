import { useCallback, useEffect, useMemo, useReducer, useState } from 'react'
import { makeId } from '../../lib/ids'
import { readItem, storageStatus, writeItem } from '../../lib/storage'
import { DAY_MS, startOfDay } from '../../lib/dates'
import type { Entry } from './model'
import { computeStats, deriveFindings, sortFindings, buildSummary } from './analyse'

const STORAGE_KEY = 'ins-and-outs:log:v1'

type Action =
  | { type: 'add'; entry: Entry }
  | { type: 'remove'; id: string }
  | { type: 'replace'; entries: Entry[] }
  | { type: 'clear' }

function reducer(state: Entry[], action: Action): Entry[] {
  switch (action.type) {
    case 'add':
      return state.concat([action.entry]).sort((a, b) => b.at - a.at)
    case 'remove':
      return state.filter((e) => e.id !== action.id)
    case 'replace':
      return action.entries.slice().sort((a, b) => b.at - a.at)
    case 'clear':
      return []
    default:
      return state
  }
}

/** Validate anything coming back out of storage. It is the reader's own
 *  browser, but a half-written or hand-edited value should not crash the page. */
function parseStored(raw: string | null): Entry[] {
  if (!raw) return []
  try {
    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    const out: Entry[] = []
    for (let i = 0; i < parsed.length; i += 1) {
      const item = parsed[i] as Partial<Entry> & { kind?: string }
      if (!item || typeof item !== 'object') continue
      if (typeof item.at !== 'number' || !isFinite(item.at)) continue
      if (typeof item.id !== 'string') continue
      if (item.kind === 'pee' || item.kind === 'poo' || item.kind === 'drink') {
        out.push(item as Entry)
      }
    }
    return out.sort((a, b) => b.at - a.at)
  } catch {
    return []
  }
}

export function useLog() {
  const [entries, dispatch] = useReducer(reducer, [], () =>
    parseStored(readItem(STORAGE_KEY)),
  )
  const [persistent, setPersistent] = useState(() => storageStatus() === 'persistent')

  useEffect(() => {
    const ok = writeItem(STORAGE_KEY, JSON.stringify(entries))
    setPersistent(ok)
  }, [entries])

  const stats = useMemo(() => computeStats(entries), [entries])
  const findings = useMemo(
    () => sortFindings(deriveFindings(entries, stats)),
    [entries, stats],
  )
  const summary = useMemo(
    () => buildSummary(entries, stats, findings),
    [entries, stats, findings],
  )

  const add = useCallback((entry: Entry) => dispatch({ type: 'add', entry }), [])
  const remove = useCallback((id: string) => dispatch({ type: 'remove', id }), [])
  const clear = useCallback(() => dispatch({ type: 'clear' }), [])
  const loadSample = useCallback(
    () => dispatch({ type: 'replace', entries: buildSample() }),
    [],
  )

  return { entries, stats, findings, summary, persistent, add, remove, clear, loadSample }
}

/** Four days of plausible entries so the tool can be understood before you have
 *  typed anything. Deliberately unremarkable apart from a slightly slow bowel
 *  and one dark afternoon pee — enough for the analysis to say something real
 *  without staging a medical emergency. */
export function buildSample(): Entry[] {
  const today = startOfDay(Date.now())
  const at = (dayOffset: number, hour: number, minute: number) =>
    today - dayOffset * DAY_MS + hour * 3600000 + minute * 60000

  const pee = (
    d: number,
    h: number,
    m: number,
    volume: 'small' | 'medium' | 'large',
    colour: string,
    extra?: Partial<Entry>,
  ): Entry =>
    Object.assign(
      {
        id: makeId('pee'),
        kind: 'pee' as const,
        at: at(d, h, m),
        volume,
        colour,
        wokeToPee: false,
        urgency: false,
        burning: false,
        blood: false,
        note: '',
      },
      extra,
    ) as Entry

  const poo = (
    d: number,
    h: number,
    m: number,
    bristol: 1 | 2 | 3 | 4 | 5 | 6 | 7,
    colour: string,
    extra?: Partial<Entry>,
  ): Entry =>
    Object.assign(
      {
        id: makeId('poo'),
        kind: 'poo' as const,
        at: at(d, h, m),
        bristol,
        colour,
        strained: false,
        incomplete: false,
        blood: 'none' as const,
        note: '',
      },
      extra,
    ) as Entry

  const drink = (d: number, h: number, m: number, ml: number): Entry => ({
    id: makeId('drink'),
    kind: 'drink',
    at: at(d, h, m),
    ml,
    note: '',
  })

  const entries: Entry[] = [
    // Three days ago
    pee(3, 7, 10, 'large', 'amber'),
    drink(3, 7, 30, 400),
    pee(3, 10, 40, 'medium', 'pale-straw'),
    poo(3, 8, 15, 2, 'brown', { strained: true, incomplete: true }),
    drink(3, 12, 0, 350),
    pee(3, 13, 20, 'medium', 'pale-straw'),
    pee(3, 16, 50, 'small', 'amber'),
    drink(3, 18, 30, 500),
    pee(3, 21, 5, 'medium', 'pale-straw'),

    // Two days ago
    pee(2, 6, 55, 'large', 'amber'),
    drink(2, 7, 20, 300),
    pee(2, 9, 45, 'medium', 'pale-straw'),
    drink(2, 11, 0, 250),
    pee(2, 12, 30, 'medium', 'pale-straw'),
    drink(2, 15, 0, 400),
    pee(2, 15, 40, 'small', 'amber', { urgency: true }),
    pee(2, 19, 10, 'medium', 'pale-straw'),
    pee(2, 22, 40, 'small', 'pale-straw'),
    poo(2, 20, 45, 2, 'brown', { strained: true, incomplete: true }),

    // Yesterday
    pee(1, 7, 0, 'large', 'amber'),
    drink(1, 7, 25, 400),
    poo(1, 7, 45, 3, 'brown'),
    pee(1, 10, 15, 'medium', 'pale-straw'),
    drink(1, 12, 30, 500),
    pee(1, 14, 0, 'medium', 'pale-straw'),
    pee(1, 17, 30, 'small', 'dark-honey', { note: 'Hot day, forgot to drink after lunch.' }),
    drink(1, 18, 0, 450),
    pee(1, 20, 45, 'medium', 'pale-straw'),
    pee(1, 3, 20, 'small', 'pale-straw', { wokeToPee: true }),

    // Today
    pee(0, 7, 20, 'large', 'amber'),
    drink(0, 7, 45, 350),
    pee(0, 11, 0, 'medium', 'pale-straw'),
    drink(0, 13, 0, 400),
    pee(0, 14, 30, 'medium', 'pale-straw'),
  ]

  return entries.sort((a, b) => b.at - a.at)
}
