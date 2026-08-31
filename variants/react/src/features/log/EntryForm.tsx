import { useState } from 'react'
import { stoolColours, urineColours } from '../../data/colours'
import { fromDateAndTime, toDateValue, toTimeValue } from '../../lib/dates'
import { makeId } from '../../lib/ids'
import { BristolField } from '../../components/BristolPicker'
import type { BristolValue, Entry, PeeVolume, PooBlood } from './model'
import { VOLUME_LABEL } from './model'

type Kind = 'pee' | 'poo' | 'drink'

const KINDS: { value: Kind; label: string }[] = [
  { value: 'pee', label: 'A pee' },
  { value: 'poo', label: 'A poo' },
  { value: 'drink', label: 'A drink' },
]

const VOLUMES: PeeVolume[] = ['small', 'medium', 'large']

export function EntryForm({ onAdd }: { onAdd: (entry: Entry) => void }) {
  const now = Date.now()
  const [kind, setKind] = useState<Kind>('pee')
  const [dateValue, setDateValue] = useState(() => toDateValue(now))
  const [timeValue, setTimeValue] = useState(() => toTimeValue(now))
  const [error, setError] = useState<string | null>(null)
  const [confirmation, setConfirmation] = useState<string | null>(null)

  // pee
  const [volume, setVolume] = useState<PeeVolume>('medium')
  const [peeColour, setPeeColour] = useState(urineColours[0].id)
  const [wokeToPee, setWokeToPee] = useState(false)
  const [urgency, setUrgency] = useState(false)
  const [burning, setBurning] = useState(false)
  const [peeBlood, setPeeBlood] = useState(false)

  // poo
  const [bristol, setBristol] = useState<BristolValue>(4)
  const [pooColour, setPooColour] = useState(stoolColours[0].id)
  const [strained, setStrained] = useState(false)
  const [incomplete, setIncomplete] = useState(false)
  const [pooBlood, setPooBlood] = useState<PooBlood>('none')

  // drink
  const [ml, setMl] = useState('250')

  const [note, setNote] = useState('')

  function reset() {
    setNote('')
    setWokeToPee(false)
    setUrgency(false)
    setBurning(false)
    setPeeBlood(false)
    setStrained(false)
    setIncomplete(false)
    setPooBlood('none')
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    const at = fromDateAndTime(dateValue, timeValue)
    if (at === null) {
      setError('That date and time could not be read. Check both fields.')
      setConfirmation(null)
      return
    }
    setError(null)

    let entry: Entry
    if (kind === 'pee') {
      entry = {
        id: makeId('pee'),
        kind: 'pee',
        at,
        volume,
        colour: peeColour,
        wokeToPee,
        urgency,
        burning,
        blood: peeBlood,
        note: note.trim(),
      }
      setConfirmation('Pee added at ' + timeValue + '.')
    } else if (kind === 'poo') {
      entry = {
        id: makeId('poo'),
        kind: 'poo',
        at,
        bristol,
        colour: pooColour,
        strained,
        incomplete,
        blood: pooBlood,
        note: note.trim(),
      }
      setConfirmation('Poo added at ' + timeValue + ', Bristol type ' + bristol + '.')
    } else {
      const parsed = Number(ml)
      if (!isFinite(parsed) || parsed <= 0 || parsed > 5000) {
        setError('Enter a drink volume between 1 and 5000 mL.')
        setConfirmation(null)
        return
      }
      entry = {
        id: makeId('drink'),
        kind: 'drink',
        at,
        ml: Math.round(parsed),
        note: note.trim(),
      }
      setConfirmation('Drink of ' + Math.round(parsed) + ' mL added at ' + timeValue + '.')
    }

    onAdd(entry)
    reset()
  }

  function setToNow() {
    const t = Date.now()
    setDateValue(toDateValue(t))
    setTimeValue(toTimeValue(t))
  }

  return (
    <form className="panel" onSubmit={handleSubmit} noValidate>
      <h2 className="panel__title">Add an entry</h2>

      <fieldset>
        <legend>What are you recording?</legend>
        <div className="segmented">
          {KINDS.map((k) => (
            <button
              key={k.value}
              type="button"
              aria-pressed={kind === k.value}
              onClick={() => setKind(k.value)}
            >
              {k.label}
            </button>
          ))}
        </div>
      </fieldset>

      <div className="row row--2">
        <div className="field">
          <label className="field__label" htmlFor="entry-date">
            Date
          </label>
          <input
            id="entry-date"
            type="date"
            value={dateValue}
            onChange={(e) => setDateValue(e.target.value)}
            required
          />
        </div>
        <div className="field">
          <label className="field__label" htmlFor="entry-time">
            Time
          </label>
          <input
            id="entry-time"
            type="time"
            value={timeValue}
            onChange={(e) => setTimeValue(e.target.value)}
            required
          />
        </div>
      </div>
      <p style={{ marginBottom: '1rem' }}>
        <button type="button" className="btn btn--ghost btn--small" onClick={setToNow}>
          Set to now
        </button>
      </p>

      {kind === 'pee' ? (
        <>
          <fieldset>
            <legend>Roughly how much?</legend>
            <div className="segmented" style={{ flexDirection: 'column' }}>
              {VOLUMES.map((v) => (
                <button
                  key={v}
                  type="button"
                  aria-pressed={volume === v}
                  onClick={() => setVolume(v)}
                  style={{ textAlign: 'left' }}
                >
                  {VOLUME_LABEL[v]}
                </button>
              ))}
            </div>
          </fieldset>

          <div className="field">
            <label className="field__label" htmlFor="pee-colour">
              Colour
            </label>
            <select
              id="pee-colour"
              value={peeColour}
              onChange={(e) => setPeeColour(e.target.value)}
            >
              {urineColours.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>

          <fieldset>
            <legend>Anything else</legend>
            <div className="checkGrid">
              <label className="check">
                <input
                  type="checkbox"
                  checked={wokeToPee}
                  onChange={(e) => setWokeToPee(e.target.checked)}
                />
                <span>This woke me from sleep</span>
              </label>
              <label className="check">
                <input
                  type="checkbox"
                  checked={urgency}
                  onChange={(e) => setUrgency(e.target.checked)}
                />
                <span>Sudden, hard to hold</span>
              </label>
              <label className="check">
                <input
                  type="checkbox"
                  checked={burning}
                  onChange={(e) => setBurning(e.target.checked)}
                />
                <span>Burning or stinging</span>
              </label>
              <label className="check">
                <input
                  type="checkbox"
                  checked={peeBlood}
                  onChange={(e) => setPeeBlood(e.target.checked)}
                />
                <span>Visible blood</span>
              </label>
            </div>
          </fieldset>
        </>
      ) : null}

      {kind === 'poo' ? (
        <>
          <BristolField name="bristol" value={bristol} onChange={setBristol} />

          <div className="field">
            <label className="field__label" htmlFor="poo-colour">
              Colour
            </label>
            <select
              id="poo-colour"
              value={pooColour}
              onChange={(e) => setPooColour(e.target.value)}
            >
              {stoolColours.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>

          <div className="field">
            <label className="field__label" htmlFor="poo-blood">
              Blood
            </label>
            <select
              id="poo-blood"
              value={pooBlood}
              onChange={(e) => setPooBlood(e.target.value as PooBlood)}
            >
              <option value="none">None</option>
              <option value="bright">Fresh red blood</option>
              <option value="black">Black and tarry</option>
            </select>
            <span className="field__hint">
              Black and tarry is treated as an emergency by this tool, and
              should be.
            </span>
          </div>

          <fieldset>
            <legend>How was it?</legend>
            <div className="checkGrid">
              <label className="check">
                <input
                  type="checkbox"
                  checked={strained}
                  onChange={(e) => setStrained(e.target.checked)}
                />
                <span>I had to strain</span>
              </label>
              <label className="check">
                <input
                  type="checkbox"
                  checked={incomplete}
                  onChange={(e) => setIncomplete(e.target.checked)}
                />
                <span>Felt incomplete afterwards</span>
              </label>
            </div>
          </fieldset>
        </>
      ) : null}

      {kind === 'drink' ? (
        <div className="field">
          <label className="field__label" htmlFor="drink-ml">
            How much, in millilitres
          </label>
          <input
            id="drink-ml"
            type="number"
            inputMode="numeric"
            min={1}
            max={5000}
            step={10}
            value={ml}
            onChange={(e) => setMl(e.target.value)}
            aria-describedby="drink-ml-hint"
          />
          <span className="field__hint" id="drink-ml-hint">
            A mug is about 250 mL, a pint is about 570 mL, a standard bottle is
            500 mL.
          </span>
        </div>
      ) : null}

      <div className="field">
        <label className="field__label" htmlFor="entry-note">
          Note (optional)
        </label>
        <textarea
          id="entry-note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Anything you would want to remember at an appointment."
        />
      </div>

      <div className="btnRow">
        <button className="btn" type="submit">
          Add to the log
        </button>
      </div>

      <p role="alert" className="small" style={{ marginTop: '0.75rem', color: 'var(--alarm-ink)' }}>
        {error}
      </p>
      <p aria-live="polite" className="small muted" style={{ marginTop: '0.25rem' }}>
        {confirmation}
      </p>
    </form>
  )
}
