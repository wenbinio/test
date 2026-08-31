import type { ReactNode } from 'react'
import type { Faq, Figure, Severity } from '../data/types'

export function Figures({
  items,
  three,
}: {
  items: Figure[]
  three?: boolean
}) {
  return (
    <ul className={'figures' + (three ? ' figures--3' : '')}>
      {items.map((f) => (
        <li className="figure" key={f.label}>
          <span className="figure__value">
            {f.value}
            {f.unit ? <span className="figure__unit">{f.unit}</span> : null}
          </span>
          <span className="figure__label">{f.label}</span>
        </li>
      ))}
    </ul>
  )
}

export function Callout({
  title,
  urgent,
  children,
}: {
  title: string
  urgent?: boolean
  children: ReactNode
}) {
  return (
    <aside className={'callout' + (urgent ? ' callout--urgent' : '')}>
      <p className="callout__title">{title}</p>
      <div className="prose">{children}</div>
    </aside>
  )
}

export function Card({
  title,
  children,
  signal,
}: {
  title: string
  children: ReactNode
  signal?: ReactNode
}) {
  return (
    <article className="card">
      {signal ? <p style={{ marginBottom: '0.5rem' }}>{signal}</p> : null}
      <h3 className="card__title">{title}</h3>
      <div className="prose small">{children}</div>
    </article>
  )
}

export function FaqList({ items }: { items: Faq[] }) {
  return (
    <div>
      {items.map((f) => (
        <details className="faq" key={f.q}>
          <summary>{f.q}</summary>
          <div className="faq__body">
            <p>{f.a}</p>
          </div>
        </details>
      ))}
    </div>
  )
}

export const SEVERITY_WORD: Record<Severity, string> = {
  ok: 'Normal',
  watch: 'Watch',
  urgent: 'Get seen',
}
