import { useState } from 'react'
import type { StoolColour, UrineColour } from '../data/types'
import { Signal } from './Signal'

type Swatchable = UrineColour | StoolColour

function describe(item: Swatchable): string {
  return 'causes' in item ? item.causes : item.cause
}

function action(item: Swatchable): string | null {
  return 'action' in item ? item.action : null
}

/**
 * An interactive colour chart. Tapping a chip opens a full description below
 * the grid rather than in a tooltip, so it works on touch, reads correctly to
 * a screen reader, and cannot be missed off the bottom of a small viewport.
 * The chip is a real button with aria-pressed, and the detail panel is a live
 * region so the change is announced.
 */
export function ColourChart({
  items,
  label,
  idPrefix,
}: {
  items: Swatchable[]
  label: string
  idPrefix: string
}) {
  const [selectedId, setSelectedId] = useState<string>(items[0].id)
  let selected: Swatchable = items[0]
  for (let i = 0; i < items.length; i += 1) {
    if (items[i].id === selectedId) selected = items[i]
  }
  const panelId = idPrefix + '-detail'

  return (
    <div>
      <div className="chipGrid" role="group" aria-label={label}>
        {items.map((item) => (
          <button
            type="button"
            key={item.id}
            className="chip"
            aria-pressed={item.id === selectedId}
            aria-describedby={panelId}
            onClick={() => setSelectedId(item.id)}
          >
            <span
              className="chip__swatch"
              style={{ background: item.swatch, color: item.swatchInk }}
            >
              {item.label}
            </span>
            <span className="chip__meta">
              <Signal level={item.severity} />
            </span>
          </button>
        ))}
      </div>

      <div
        className="card"
        id={panelId}
        aria-live="polite"
        style={{ marginTop: '1rem' }}
      >
        <p style={{ marginBottom: '0.5rem' }}>
          <Signal level={selected.severity} />
        </p>
        <h3 className="card__title">{selected.label}</h3>
        <div className="prose small">
          <p>{describe(selected)}</p>
          {action(selected) ? (
            <p>
              <strong>What to do: </strong>
              {action(selected)}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  )
}
