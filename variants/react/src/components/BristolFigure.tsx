/**
 * Inline line drawings of the seven Bristol types. Drawn rather than
 * photographed for the obvious reason, and kept abstract enough to read at
 * 40px. They inherit currentColor, so they work in both themes and in print.
 */
export function BristolFigure({ type }: { type: number }) {
  const common = {
    viewBox: '0 0 72 34',
    width: '100%',
    height: '34',
    'aria-hidden': true as const,
    focusable: 'false' as const,
    className: 'bristolRow__art',
  }
  const stroke = {
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.7,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  }

  if (type === 1) {
    return (
      <svg {...common}>
        <circle cx="12" cy="17" r="5.2" {...stroke} />
        <circle cx="27" cy="17" r="4.6" {...stroke} />
        <circle cx="41" cy="17" r="5.4" {...stroke} />
        <circle cx="56" cy="17" r="4.4" {...stroke} />
      </svg>
    )
  }
  if (type === 2) {
    return (
      <svg {...common}>
        <path
          d="M8 17c0-4 3-6 6-5.4 2-3.4 6-3.4 8 0 2.6-3 6.4-2.6 8 .6 2.4-3.2 6.6-2.8 8 .8 2.2-2.6 6-2 7 1.2 1.6-1 4 .2 4 2.8 0 4-2.8 5.4-5 4-2.4 3-6 3.4-7.6.4-2 2.8-6 2.4-7.6-.8-2 2.6-6.2 2.4-8-.6-2 2.6-6.2 2.4-8-.8C11 23 8 21 8 17z"
          {...stroke}
        />
      </svg>
    )
  }
  if (type === 3) {
    return (
      <svg {...common}>
        <rect x="7" y="10" width="58" height="14" rx="7" {...stroke} />
        <path d="M20 11.5v11M32 11.5v11M44 11.5v11M54 12.5v9" {...stroke} strokeWidth={1.1} />
      </svg>
    )
  }
  if (type === 4) {
    return (
      <svg {...common}>
        <path
          d="M9 20c0-5 4-8 9-8 6 0 9 5 15 5s9-5 15-5c5 0 9 3 9 7s-4 7-9 7c-6 0-9-4-15-4s-9 4-15 4c-5 0-9-2-9-6z"
          {...stroke}
        />
      </svg>
    )
  }
  if (type === 5) {
    return (
      <svg {...common}>
        <path d="M8 17c0-4 3.4-6.6 7.4-6.6S23 13 23 17s-3.6 6.6-7.6 6.6S8 21 8 17z" {...stroke} />
        <path d="M27 16.4c0-4.4 3.6-7 7.8-7s7.6 2.6 7.6 7-3.4 7.2-7.6 7.2-7.8-2.8-7.8-7.2z" {...stroke} />
        <path d="M47 17.4c0-3.8 3.2-6.4 7-6.4s7 2.6 7 6.4-3.2 6.4-7 6.4-7-2.6-7-6.4z" {...stroke} />
      </svg>
    )
  }
  if (type === 6) {
    return (
      <svg {...common}>
        <path
          d="M9 18.5c-1.6-2.6.6-4.6 3-4.4-.4-2.8 2.4-4.2 4.6-2.8 1-2.6 4.4-2.8 5.8-.6 1.8-2.4 5.4-1.8 6.2.8 2-2.2 5.6-1.4 6.2 1.2 2.2-1.8 5.6-.6 5.8 2 2.4-1.6 5.6 0 5.4 2.6 2.6-.6 4.8 1.4 4 3.8 2.4.4 3.2 3 1.4 4.6-1.6 1.4-4.4.6-5.2-1-1.2 2.4-4.8 2.6-6.2.4-1.4 2.4-5 2.4-6.4 0-1.4 2.2-4.8 2-6-.4-1.6 2-4.8 1.6-5.8-.8-2 1.6-5 .4-5.2-2.2-2.4.6-4.6-1-3.6-3.2z"
          {...stroke}
        />
      </svg>
    )
  }
  return (
    <svg {...common}>
      <path
        d="M6 22.5c4-1.5 6-4.5 11-4.5 4 0 6 3 10 3s6-4 10-4 6 4 10 4 6-3 9-2.5"
        {...stroke}
      />
      <path d="M8 27c5-1 8-2.5 13-2.5 5 0 8 2.5 13 2.5s8-2.5 13-2.5c4 0 6 1 9 1.5" {...stroke} />
      <path d="M14 14.5c3-1 5-2.5 8-2.5M34 12c3 0 5 1.5 7 2" {...stroke} strokeWidth={1.2} />
    </svg>
  )
}
