/**
 * Dates are always built from explicit numeric components. Parsing a
 * hand-assembled string with `new Date(string)` is implementation-defined for
 * anything that is not a strict ISO 8601 value, and Safari in particular
 * rejects formats that Chrome accepts.
 */

/** Local midnight for the day containing `ms`, as an epoch value. */
export function startOfDay(ms: number): number {
  const d = new Date(ms)
  return new Date(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0, 0, 0).getTime()
}

/** Combine a `<input type="date">` value and a `<input type="time">` value. */
export function fromDateAndTime(dateValue: string, timeValue: string): number | null {
  const dm = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dateValue)
  const tm = /^(\d{2}):(\d{2})$/.exec(timeValue)
  if (!dm || !tm) return null
  const y = Number(dm[1])
  const mo = Number(dm[2]) - 1
  const d = Number(dm[3])
  const h = Number(tm[1])
  const mi = Number(tm[2])
  if (mo < 0 || mo > 11 || d < 1 || d > 31 || h > 23 || mi > 59) return null
  const built = new Date(y, mo, d, h, mi, 0, 0)
  // Reject values the Date constructor silently rolled over (e.g. 31 February).
  if (built.getMonth() !== mo || built.getDate() !== d) return null
  return built.getTime()
}

function pad(n: number): string {
  return (n < 10 ? '0' : '') + n
}

export function toDateValue(ms: number): string {
  const d = new Date(ms)
  return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate())
}

export function toTimeValue(ms: number): string {
  const d = new Date(ms)
  return pad(d.getHours()) + ':' + pad(d.getMinutes())
}

const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

/** e.g. "Tuesday 3 Jun" — written out rather than relying on Intl options
 *  that older Safari handles inconsistently. */
export function formatDay(ms: number): string {
  const d = new Date(ms)
  return DAY_NAMES[d.getDay()] + ' ' + d.getDate() + ' ' + MONTH_NAMES[d.getMonth()]
}

export function formatShortDay(ms: number): string {
  const d = new Date(ms)
  return d.getDate() + ' ' + MONTH_NAMES[d.getMonth()]
}

export function formatTime(ms: number): string {
  return toTimeValue(ms)
}

export const DAY_MS = 86400000
