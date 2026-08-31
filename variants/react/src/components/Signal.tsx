import type { Severity } from '../data/types'

const WORDS: Record<Severity, string> = {
  ok: 'Normal',
  watch: 'Watch',
  urgent: 'Get seen',
}

/** Each level gets its own glyph shape as well as its own colour and word, so
 *  the status survives greyscale printing, colour blindness and forced-colours
 *  mode. Nothing on this site conveys status by colour alone. */
function Glyph({ level }: { level: Severity }) {
  if (level === 'ok') {
    return (
      <svg width="13" height="13" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
        <circle cx="8" cy="8" r="7" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <path
          d="M4.6 8.3 6.9 10.6 11.4 5.8"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.9"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  }
  if (level === 'watch') {
    return (
      <svg width="13" height="13" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
        <path
          d="M8 1.7 15 14.3H1z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path d="M8 6v3.4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="8" cy="11.8" r="0.95" fill="currentColor" />
      </svg>
    )
  }
  return (
    <svg width="13" height="13" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
      <path
        d="M5.4 1.2h5.2L14.8 5.4v5.2l-4.2 4.2H5.4L1.2 10.6V5.4z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M8 4.6v4.1" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
      <circle cx="8" cy="11.4" r="1" fill="currentColor" />
    </svg>
  )
}

export function Signal({ level, label }: { level: Severity; label?: string }) {
  const text = label || WORDS[level]
  return (
    <span className={'signal signal--' + level}>
      <Glyph level={level} />
      <span>{text}</span>
    </span>
  )
}
