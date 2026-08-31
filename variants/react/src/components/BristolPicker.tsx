import { bristolScale } from '../data/bristol'
import type { BristolValue } from '../features/log/model'
import { BristolFigure } from './BristolFigure'
import { Signal } from './Signal'

/** The full scale, as static reference. */
export function BristolReference() {
  return (
    <ul className="bristolList">
      {bristolScale.map((b) => (
        <li key={b.type}>
          <div className="bristolRow">
            <div>
              <BristolFigure type={b.type} />
              <span className="bristolRow__num">Type {b.type}</span>
            </div>
            <div>
              <div className="ruleList__head" style={{ marginBottom: '0.15rem' }}>
                <h3 className="bristolRow__name">{b.name}</h3>
                <Signal level={b.severity} />
              </div>
              <p className="bristolRow__form">{b.form}</p>
              <p className="bristolRow__meaning">{b.meaning}</p>
              <p className="bristolRow__form">
                <strong>Transit:</strong> {b.transit}
              </p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}

/**
 * The same scale as a form control. Implemented as a radiogroup of native
 * inputs with visually hidden radios rather than a listbox widget, so arrow
 * keys, screen readers and form semantics all work without custom key
 * handling.
 */
export function BristolField({
  value,
  onChange,
  name,
}: {
  value: BristolValue
  onChange: (v: BristolValue) => void
  name: string
}) {
  return (
    <fieldset>
      <legend>Stool form (Bristol type)</legend>
      <ul className="bristolList">
        {bristolScale.map((b) => {
          const id = name + '-' + b.type
          const checked = value === b.type
          return (
            <li key={b.type}>
              <label
                className="bristolRow"
                htmlFor={id}
                style={{ cursor: 'pointer', borderColor: checked ? 'var(--accent)' : undefined, boxShadow: checked ? 'inset 0 0 0 2px var(--accent)' : undefined }}
              >
                <div>
                  <BristolFigure type={b.type} />
                  <span className="bristolRow__num">Type {b.type}</span>
                </div>
                <div>
                  <input
                    className="visuallyHidden"
                    type="radio"
                    id={id}
                    name={name}
                    checked={checked}
                    onChange={() => onChange(b.type)}
                  />
                  <span className="bristolRow__name">{b.name}</span>
                  <span className="bristolRow__form" style={{ display: 'block' }}>
                    {b.form}
                  </span>
                </div>
              </label>
            </li>
          )
        })}
      </ul>
    </fieldset>
  )
}
