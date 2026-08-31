/**
 * crypto.randomUUID is unavailable outside secure contexts (plain http, some
 * embedded webviews), so ids are generated from a monotonic counter plus a
 * per-session random suffix. Uniqueness within one document is all we need —
 * these ids never leave the browser.
 */
let counter = 0
const session = Math.floor(Math.random() * 0x10000).toString(36)

export function makeId(prefix: string): string {
  counter += 1
  return prefix + '-' + session + '-' + counter.toString(36)
}
