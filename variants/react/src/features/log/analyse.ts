import { bristolByType } from '../../data/bristol'
import { stoolColours, urineColours } from '../../data/colours'
import { DAY_MS, formatDay, startOfDay } from '../../lib/dates'
import type { DaySummary, Entry, Finding, PeeEntry, PooEntry, DrinkEntry } from './model'
import { VOLUME_ML } from './model'

/** Group entries into local calendar days, oldest first.
 *  Written as an explicit reduce because Object.groupBy is not available in
 *  the browser versions this site supports. */
export function groupByDay(entries: Entry[]): DaySummary[] {
  const buckets: Record<string, DaySummary> = {}
  const order: number[] = []

  for (let i = 0; i < entries.length; i += 1) {
    const entry = entries[i]
    const dayStart = startOfDay(entry.at)
    const key = String(dayStart)
    if (!Object.prototype.hasOwnProperty.call(buckets, key)) {
      buckets[key] = {
        dayStart,
        pees: [],
        poos: [],
        drinks: [],
        estimatedUrineMl: 0,
        fluidMl: 0,
        nocturiaCount: 0,
        looseCount: 0,
      }
      order.push(dayStart)
    }
    const day = buckets[key]
    if (entry.kind === 'pee') {
      day.pees.push(entry)
      day.estimatedUrineMl += VOLUME_ML[entry.volume]
      if (entry.wokeToPee) day.nocturiaCount += 1
    } else if (entry.kind === 'poo') {
      day.poos.push(entry)
      if (entry.bristol >= 6) day.looseCount += 1
    } else {
      day.drinks.push(entry)
      day.fluidMl += entry.ml
    }
  }

  order.sort((a, b) => a - b)
  const out: DaySummary[] = []
  for (let i = 0; i < order.length; i += 1) {
    const day = buckets[String(order[i])]
    day.pees.sort((a, b) => a.at - b.at)
    day.poos.sort((a, b) => a.at - b.at)
    day.drinks.sort((a, b) => a.at - b.at)
    out.push(day)
  }
  return out
}

export interface Stats {
  days: DaySummary[]
  daysLogged: number
  /** Calendar span from first to last entry, which is what the weekly rate
   *  should be calculated against — not the number of days you remembered. */
  spanDays: number
  totalPees: number
  totalPoos: number
  meanPeesPerDay: number
  meanUrineMl: number
  meanFluidMl: number
  meanNocturia: number
  poosPerWeek: number
  bristolCounts: number[]
  medianBristol: number | null
  strainedShare: number
  incompleteShare: number
  hardShare: number
}

function median(values: number[]): number | null {
  if (values.length === 0) return null
  const sorted = values.slice().sort((a, b) => a - b)
  const mid = Math.floor(sorted.length / 2)
  if (sorted.length % 2 === 1) return sorted[mid]
  return (sorted[mid - 1] + sorted[mid]) / 2
}

export function computeStats(entries: Entry[]): Stats {
  const days = groupByDay(entries)
  const pees: PeeEntry[] = []
  const poos: PooEntry[] = []
  const drinks: DrinkEntry[] = []
  for (let i = 0; i < entries.length; i += 1) {
    const e = entries[i]
    if (e.kind === 'pee') pees.push(e)
    else if (e.kind === 'poo') poos.push(e)
    else drinks.push(e)
  }

  const daysLogged = days.length
  let spanDays = daysLogged
  if (daysLogged > 1) {
    const first = days[0].dayStart
    const last = days[daysLogged - 1].dayStart
    spanDays = Math.round((last - first) / DAY_MS) + 1
  }

  let urineTotal = 0
  let fluidTotal = 0
  let nocturiaTotal = 0
  for (let i = 0; i < days.length; i += 1) {
    urineTotal += days[i].estimatedUrineMl
    fluidTotal += days[i].fluidMl
    nocturiaTotal += days[i].nocturiaCount
  }

  const bristolCounts = [0, 0, 0, 0, 0, 0, 0]
  let strained = 0
  let incomplete = 0
  let hard = 0
  const bristolValues: number[] = []
  for (let i = 0; i < poos.length; i += 1) {
    const p = poos[i]
    bristolCounts[p.bristol - 1] += 1
    bristolValues.push(p.bristol)
    if (p.strained) strained += 1
    if (p.incomplete) incomplete += 1
    if (p.bristol <= 2) hard += 1
  }

  const safeDays = daysLogged || 1
  const safePoos = poos.length || 1

  return {
    days,
    daysLogged,
    spanDays,
    totalPees: pees.length,
    totalPoos: poos.length,
    meanPeesPerDay: pees.length / safeDays,
    meanUrineMl: urineTotal / safeDays,
    meanFluidMl: fluidTotal / safeDays,
    meanNocturia: nocturiaTotal / safeDays,
    poosPerWeek: (poos.length / (spanDays || 1)) * 7,
    bristolCounts,
    medianBristol: median(bristolValues),
    strainedShare: strained / safePoos,
    incompleteShare: incomplete / safePoos,
    hardShare: hard / safePoos,
  }
}

const urineColourById = (id: string) => {
  for (let i = 0; i < urineColours.length; i += 1) {
    if (urineColours[i].id === id) return urineColours[i]
  }
  return undefined
}

const stoolColourById = (id: string) => {
  for (let i = 0; i < stoolColours.length; i += 1) {
    if (stoolColours[i].id === id) return stoolColours[i]
  }
  return undefined
}

function pct(n: number): string {
  return Math.round(n * 100) + '%'
}

/**
 * Turn a log into findings, measured against the published thresholds:
 * polyuria >3 L/24 h, oliguria <400–500 mL/24 h, frequency >8 voids/24 h,
 * nocturia ≥2/night, diarrhoea ≥3 loose stools in 24 h, the Rome IV
 * constipation criteria, and the normal band of 3/day to 3/week.
 *
 * Severity here means "how fast to act", never "what you have". Nothing in
 * this function diagnoses anything, and the urgent findings all resolve to
 * "get seen" rather than to a condition.
 */
export function deriveFindings(entries: Entry[], stats: Stats): Finding[] {
  const findings: Finding[] = []
  const { days } = stats

  /* ---- Things that end the conversation ---- */

  const blackStool = entries.filter((e) => e.kind === 'poo' && e.blood === 'black')
  if (blackStool.length > 0) {
    findings.push({
      id: 'melaena',
      severity: 'urgent',
      title: 'You logged black, tarry poo',
      detail:
        'Black tarry stool is melaena — digested blood from the upper gut. Iron tablets, bismuth and liquorice also blacken stool, but that kind is not sticky, tarry or strongly foul-smelling.',
      action:
        'Treat this as an emergency now. Go to an emergency department or call your emergency number, especially with dizziness, breathlessness or vomiting blood.',
    })
  }

  const blackColour = entries.filter((e) => e.kind === 'poo' && e.colour === 'black')
  if (blackColour.length > 0 && blackStool.length === 0) {
    findings.push({
      id: 'black-colour',
      severity: 'urgent',
      title: 'You logged black stool',
      detail:
        'If it is tarry, sticky and strongly foul-smelling, this is melaena — bleeding from the upper gut. If it is simply dark and otherwise normal, iron tablets or bismuth will do it.',
      action: 'If you are in any doubt at all, treat it as bleeding and be seen today.',
    })
  }

  const bloodyPee = entries.filter((e) => e.kind === 'pee' && e.blood)
  const redPee = entries.filter(
    (e) => e.kind === 'pee' && (e.colour === 'pink-red' || e.colour === 'cola'),
  )
  if (bloodyPee.length > 0 || redPee.length > 0) {
    findings.push({
      id: 'haematuria',
      severity: 'urgent',
      title: 'You logged blood, or red or brown urine',
      detail:
        'Visible blood in urine needs investigating every single time, even once, even painless, even if it never comes back. It is the commonest first sign of bladder and kidney cancer, and painless is the classic pattern. Beetroot mimics it — but you cannot tell the two apart by looking.',
      action:
        'Book with a GP within days and say the words "blood in my urine". If you also cannot pass urine, or you are passing clots, go to an emergency department instead.',
    })
  }

  const brightBlood = entries.filter((e) => e.kind === 'poo' && e.blood === 'bright')
  const redStool = entries.filter((e) => e.kind === 'poo' && e.colour === 'red')
  if (brightBlood.length > 0 || redStool.length > 0) {
    findings.push({
      id: 'rectal-bleeding',
      severity: 'urgent',
      title: 'You logged fresh red blood',
      detail:
        'Haemorrhoids and fissures are by far the commonest cause — but that is a conclusion a clinician reaches after looking, and having piles does not stop you also having something else.',
      action:
        'Book with a GP within days. Go now instead if the bleeding is heavy or continuous, or if you feel faint, breathless or your heart is racing.',
    })
  }

  const paleStool = entries.filter((e) => e.kind === 'poo' && e.colour === 'pale')
  if (paleStool.length > 0) {
    findings.push({
      id: 'pale-stool',
      severity: 'urgent',
      title: 'You logged pale, clay-coloured poo',
      detail:
        'Pale stool suggests bile is not reaching the bowel — a possible bile duct or liver problem. It matters a great deal more if your urine is also dark, or your eyes have yellowed, or your skin is itching.',
      action: 'See a doctor promptly rather than waiting to see if it repeats.',
    })
  }

  const greasy = entries.filter((e) => e.kind === 'poo' && e.colour === 'greasy')
  if (greasy.length >= 2) {
    findings.push({
      id: 'steatorrhoea',
      severity: 'watch',
      title: 'Repeated greasy, floating, foul-smelling poo',
      detail:
        'This pattern suggests fat malabsorption — coeliac disease, pancreatic insufficiency, bile acid problems or giardiasis. Floating on its own means trapped gas and is harmless; floating plus greasy, pale and hard to flush is the combination that matters.',
      action:
        'If this has been going on for more than a week or two, ask for testing rather than changing your diet first — cutting out gluten before a coeliac test makes the test unreliable.',
    })
  }

  const burning = entries.filter((e) => e.kind === 'pee' && e.burning)
  if (burning.length > 0) {
    findings.push({
      id: 'dysuria',
      severity: 'watch',
      title: 'You logged burning when you pee',
      detail:
        'Dysuria is most often a urinary tract infection, particularly with urgency and cloudy urine.',
      action:
        'See a clinician within a day or two. Go the same day if you also have a fever with shaking chills or pain in your flank or back — that can be a kidney infection.',
    })
  }

  /* ---- Thresholds from the log itself ---- */

  const polyuriaDays = days.filter((d) => d.estimatedUrineMl > 3000)
  if (polyuriaDays.length > 0) {
    findings.push({
      id: 'polyuria',
      severity: 'watch',
      title:
        'Estimated output above 3 L on ' +
        polyuriaDays.length +
        (polyuriaDays.length === 1 ? ' day' : ' days'),
      detail:
        'Polyuria is defined as more than 3 litres in 24 hours. Your figures here are estimates from bucket sizes, so treat this as a prompt rather than a measurement — but large volumes with constant thirst are the classic pattern for undiagnosed diabetes.',
      action:
        'If it comes with relentless thirst or weight loss you did not intend, ask for a blood glucose test.',
    })
  }

  const oliguriaDays = days.filter(
    (d) => d.pees.length >= 2 && d.estimatedUrineMl < 500,
  )
  if (oliguriaDays.length > 0) {
    findings.push({
      id: 'oliguria',
      severity: 'watch',
      title:
        'Estimated output under 500 mL on ' +
        oliguriaDays.length +
        (oliguriaDays.length === 1 ? ' day' : ' days'),
      detail:
        'Oliguria is under roughly 400–500 mL in 24 hours. The commonest reason by far is simply not drinking enough — but persistently low output can also mean the kidneys or the plumbing below them are struggling.',
      action:
        'Drink and see whether it recovers. If you pass very little or nothing for 8–12 hours despite drinking, or you cannot pass urine at all with a full painful bladder, that is an emergency.',
    })
  }

  const frequentDays = days.filter((d) => d.pees.length > 8)
  if (frequentDays.length > 0) {
    findings.push({
      id: 'frequency',
      severity: 'watch',
      title:
        'More than 8 pees on ' +
        frequentDays.length +
        (frequentDays.length === 1 ? ' day' : ' days'),
      detail:
        'More than 8 voids in 24 hours is the usual definition of urinary frequency. On its own it means very little — coffee, alcohol, cold weather and a big day of drinking all do it. What matters is whether it is new for you.',
      action:
        'If it has persisted for weeks without an obvious cause, take this log to a GP.',
    })
  }

  const nocturiaDays = days.filter((d) => d.nocturiaCount >= 2)
  if (nocturiaDays.length > 0 && nocturiaDays.length >= days.length / 2) {
    findings.push({
      id: 'nocturia',
      severity: 'watch',
      title: 'Waking twice or more a night on most nights',
      detail:
        'Waking once is common and usually unremarkable, particularly over 60. Two or more, most nights, is where nocturia is treated as worth investigating — not because it is dangerous, but because it wrecks sleep and usually has a findable cause.',
      action:
        'Worth a GP conversation, especially if it is new. Try shifting your fluids earlier in the day first, keeping the total the same.',
    })
  }

  const diarrhoeaDays = days.filter((d) => d.looseCount >= 3)
  if (diarrhoeaDays.length > 0) {
    const chronic = stats.spanDays >= 30 && diarrhoeaDays.length >= stats.spanDays / 2
    findings.push({
      id: 'diarrhoea',
      severity: chronic ? 'urgent' : 'watch',
      title:
        'Meets the definition of diarrhoea on ' +
        diarrhoeaDays.length +
        (diarrhoeaDays.length === 1 ? ' day' : ' days'),
      detail:
        'Diarrhoea is three or more loose or liquid stools (Bristol 6–7) in 24 hours. Acute is under 14 days, persistent is 14–29 days, chronic is 30 days or more.' +
        (chronic
          ? ' Your log spans four weeks or more with loose stool on most days, which puts this in the chronic bracket.'
          : ''),
      action: chronic
        ? 'Chronic diarrhoea needs a GP appointment and stool tests. Coeliac disease, inflammatory bowel disease, bile acid malabsorption and microscopic colitis are all findable, and several are very treatable.'
        : 'Keep fluid and salts up. Book an appointment if it lasts beyond a week, wakes you at night, or comes with blood or weight loss.',
    })
  }

  /* Rome IV constipation: at least two of six criteria, each in more than a
     quarter of movements. The three-month duration requirement cannot be met
     by a short log, so it is stated rather than assumed. */
  if (stats.totalPoos >= 3) {
    const met: string[] = []
    if (stats.strainedShare > 0.25) met.push('straining on ' + pct(stats.strainedShare) + ' of movements')
    if (stats.hardShare > 0.25) met.push('lumpy or hard stool (Bristol 1–2) on ' + pct(stats.hardShare))
    if (stats.incompleteShare > 0.25) met.push('a sense of incomplete emptying on ' + pct(stats.incompleteShare))
    if (stats.spanDays >= 7 && stats.poosPerWeek < 3) met.push('fewer than three bowel movements a week')

    if (met.length >= 2) {
      findings.push({
        id: 'constipation',
        severity: 'watch',
        title: 'Your log meets two or more Rome IV constipation criteria',
        detail:
          'Rome IV needs at least two of: straining; lumpy or hard stool; incomplete evacuation; a sense of blockage; manual help; fewer than three movements a week — each in more than a quarter of movements. Yours: ' +
          met.join('; ') +
          '. The full criteria also require three months of symptoms starting at least six months ago, which a log this short cannot establish.',
        action:
          'Fibre towards 30 g a day, fluid to go with it, a footstool, and an unhurried window after breakfast. If this is genuinely new — especially over 50, or with bleeding, weight loss or vomiting — book an appointment rather than buying a supplement.',
      })
    } else if (met.length === 1) {
      findings.push({
        id: 'constipation-partial',
        severity: 'watch',
        title: 'One constipation criterion showing',
        detail: 'From your log: ' + met[0] + '. Rome IV requires at least two.',
        action:
          'Worth nudging fibre, fluid and posture. Not worth worrying about on its own.',
      })
    }
  }

  if (stats.spanDays >= 7 && stats.totalPoos > 0) {
    if (stats.poosPerWeek > 21) {
      findings.push({
        id: 'above-band',
        severity: 'watch',
        title: 'Going more than three times a day on average',
        detail:
          'The normal band is three times a day to three times a week. Above that, the question is whether the stool is formed — frequent formed stool is frequency, not diarrhoea, and the two have different causes.',
        action:
          'If it is new and has lasted more than three weeks, book an appointment.',
      })
    }
  }

  /* ---- Dark urine that is not just the morning ---- */
  const darkNonMorning = entries.filter((e) => {
    if (e.kind !== 'pee') return false
    const colour = urineColourById(e.colour)
    if (!colour) return false
    if (colour.id !== 'amber' && colour.id !== 'dark-honey' && colour.id !== 'orange') return false
    const hour = new Date(e.at).getHours()
    return hour >= 10
  })
  if (darkNonMorning.length >= 3) {
    findings.push({
      id: 'concentrated',
      severity: 'watch',
      title: 'Dark urine repeatedly, outside the first pee of the day',
      detail:
        'The first pee of the morning is meant to be the darkest — you have gone eight hours without a drink. Dark urine later in the day usually just means you are behind on fluids.',
      action:
        'Drink to thirst and aim for pale straw rather than colourless. If it stays dark after rehydrating, or comes with yellowed eyes, itching or pale stools, see a doctor.',
    })
  }

  /* ---- Colour flags from the reference tables ---- */
  const seenUrgentColours: Record<string, boolean> = {}
  for (let i = 0; i < entries.length; i += 1) {
    const e = entries[i]
    if (e.kind === 'poo') {
      const c = stoolColourById(e.colour)
      if (c && c.severity === 'urgent' && c.id === 'silver' && !seenUrgentColours[c.id]) {
        seenUrgentColours[c.id] = true
        findings.push({
          id: 'stool-colour-' + c.id,
          severity: 'urgent',
          title: 'You logged ' + c.label.toLowerCase() + ' stool',
          detail: c.cause,
          action: 'Get assessed promptly.',
        })
      }
    }
  }

  if (findings.length === 0 && entries.length > 0) {
    findings.push({
      id: 'nothing',
      severity: 'ok',
      title: 'Nothing in this log crosses a threshold',
      detail:
        'No entry here meets a definition of polyuria, oliguria, frequency, nocturia, diarrhoea or constipation, and nothing you recorded is on the warning list.' +
        (stats.medianBristol !== null
          ? ' Your median stool is Bristol type ' +
            stats.medianBristol +
            (bristolByType(Math.round(stats.medianBristol))
              ? ' — ' + (bristolByType(Math.round(stats.medianBristol)) as { name: string }).name.toLowerCase()
              : '') +
            '.'
          : ''),
      action:
        'A log is still useful even when it is unremarkable. If something changes later, you now have a baseline to compare it against.',
    })
  }

  return findings
}

const SEVERITY_ORDER: Record<string, number> = { urgent: 0, watch: 1, ok: 2 }

export function sortFindings(findings: Finding[]): Finding[] {
  return findings.slice().sort((a, b) => SEVERITY_ORDER[a.severity] - SEVERITY_ORDER[b.severity])
}

/** A plain-text handover for an appointment. Deliberately terse: this is meant
 *  to be read in a ten-minute consultation, or handed over on paper when
 *  saying it out loud is the hard part. */
export function buildSummary(entries: Entry[], stats: Stats, findings: Finding[]): string {
  const lines: string[] = []
  lines.push('PEE & POO LOG — SUMMARY')
  if (stats.days.length > 0) {
    lines.push(
      'Period: ' +
        formatDay(stats.days[0].dayStart) +
        ' to ' +
        formatDay(stats.days[stats.days.length - 1].dayStart) +
        ' (' +
        stats.spanDays +
        ' days, ' +
        stats.daysLogged +
        ' with entries)',
    )
  }
  lines.push('')
  lines.push('URINE')
  lines.push('- Pees per day (average): ' + stats.meanPeesPerDay.toFixed(1))
  lines.push('- Estimated output per day: ' + Math.round(stats.meanUrineMl) + ' mL (estimated from void size, not measured)')
  lines.push('- Recorded fluid intake per day: ' + Math.round(stats.meanFluidMl) + ' mL')
  lines.push('- Woke at night to pee (average per night): ' + stats.meanNocturia.toFixed(1))
  const symptomatic: string[] = []
  if (entries.some((e) => e.kind === 'pee' && e.burning)) symptomatic.push('burning')
  if (entries.some((e) => e.kind === 'pee' && e.urgency)) symptomatic.push('urgency')
  if (entries.some((e) => e.kind === 'pee' && e.blood)) symptomatic.push('VISIBLE BLOOD')
  lines.push('- Symptoms recorded: ' + (symptomatic.length ? symptomatic.join(', ') : 'none'))

  lines.push('')
  lines.push('STOOL')
  lines.push('- Total movements: ' + stats.totalPoos + ' (' + stats.poosPerWeek.toFixed(1) + ' per week)')
  lines.push('- Median Bristol type: ' + (stats.medianBristol === null ? 'n/a' : String(stats.medianBristol)))
  const dist: string[] = []
  for (let i = 0; i < stats.bristolCounts.length; i += 1) {
    if (stats.bristolCounts[i] > 0) dist.push('type ' + (i + 1) + ' × ' + stats.bristolCounts[i])
  }
  lines.push('- Bristol distribution: ' + (dist.length ? dist.join(', ') : 'none recorded'))
  lines.push('- Straining: ' + pct(stats.strainedShare) + ' of movements')
  lines.push('- Incomplete emptying: ' + pct(stats.incompleteShare) + ' of movements')
  const bloodPoos = entries.filter((e) => e.kind === 'poo' && e.blood !== 'none')
  lines.push('- Blood: ' + (bloodPoos.length === 0 ? 'none recorded' : bloodPoos.length + ' episode(s)'))

  lines.push('')
  lines.push('THRESHOLDS CROSSED')
  if (findings.length === 0) {
    lines.push('- none')
  } else {
    for (let i = 0; i < findings.length; i += 1) {
      const f = findings[i]
      const tag = f.severity === 'urgent' ? '[URGENT] ' : f.severity === 'watch' ? '[WATCH] ' : '[OK] '
      lines.push('- ' + tag + f.title)
    }
  }

  const notes = entries.filter((e) => e.note && e.note.length > 0)
  if (notes.length > 0) {
    lines.push('')
    lines.push('NOTES')
    for (let i = 0; i < notes.length; i += 1) {
      const e = notes[i]
      lines.push('- ' + formatDay(e.at) + ': ' + e.note)
    }
  }

  lines.push('')
  lines.push('Volumes are estimates from a three-bucket scale, not measured.')
  lines.push('Generated by a public information site. Not a diagnosis.')
  return lines.join('\n')
}
