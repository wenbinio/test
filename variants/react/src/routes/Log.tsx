import { useRef, useState } from 'react'
import { bristolScale } from '../data/bristol'
import { stoolColours, urineColours } from '../data/colours'
import { Signal } from '../components/Signal'
import { Section } from '../components/Layout'
import { clipboardAvailable, copyText, selectElementText } from '../lib/clipboard'
import { formatDay, formatTime } from '../lib/dates'
import { EntryForm } from '../features/log/EntryForm'
import type { DaySummary, Entry } from '../features/log/model'
import { VOLUME_ML } from '../features/log/model'
import { useLog } from '../features/log/store'
import { hrefFor } from '../router'
import type { HeadingRef } from '../router'

function labelForUrine(id: string): string {
  for (let i = 0; i < urineColours.length; i += 1) {
    if (urineColours[i].id === id) return urineColours[i].label
  }
  return id
}

function labelForStool(id: string): string {
  for (let i = 0; i < stoolColours.length; i += 1) {
    if (stoolColours[i].id === id) return stoolColours[i].label
  }
  return id
}

function EntryRow({ entry, onRemove }: { entry: Entry; onRemove: (id: string) => void }) {
  let what = ''
  const tags: { text: string; alarm?: boolean }[] = []

  if (entry.kind === 'pee') {
    what = 'Pee — ' + labelForUrine(entry.colour) + ', about ' + VOLUME_ML[entry.volume] + ' mL'
    if (entry.wokeToPee) tags.push({ text: 'Woke me' })
    if (entry.urgency) tags.push({ text: 'Urgent' })
    if (entry.burning) tags.push({ text: 'Burning', alarm: true })
    if (entry.blood) tags.push({ text: 'Blood', alarm: true })
  } else if (entry.kind === 'poo') {
    what = 'Poo — Bristol ' + entry.bristol + ', ' + labelForStool(entry.colour).toLowerCase()
    if (entry.strained) tags.push({ text: 'Strained' })
    if (entry.incomplete) tags.push({ text: 'Incomplete' })
    if (entry.blood === 'bright') tags.push({ text: 'Fresh blood', alarm: true })
    if (entry.blood === 'black') tags.push({ text: 'Black / tarry', alarm: true })
  } else {
    what = 'Drink — ' + entry.ml + ' mL'
  }

  return (
    <li>
      <span className="entry__time">{formatTime(entry.at)}</span>
      <span className="entry__what">{what}</span>
      <span className="entry__tags">
        {tags.map((t) => (
          <span className={'tag' + (t.alarm ? ' tag--alarm' : '')} key={t.text}>
            {t.text}
          </span>
        ))}
        <button
          type="button"
          className="btn btn--ghost btn--small noPrint"
          onClick={() => onRemove(entry.id)}
        >
          Delete
          <span className="visuallyHidden">
            {' '}
            the entry at {formatTime(entry.at)} on {formatDay(entry.at)}
          </span>
        </button>
      </span>
      {entry.note ? <span className="entry__note">{entry.note}</span> : null}
    </li>
  )
}

function DayBlock({ day, onRemove }: { day: DaySummary; onRemove: (id: string) => void }) {
  const all: Entry[] = ([] as Entry[])
    .concat(day.pees, day.poos, day.drinks)
    .sort((a, b) => a.at - b.at)

  return (
    <section className="dayCard" aria-labelledby={'day-' + day.dayStart}>
      <div className="dayCard__head">
        <h3 className="dayCard__date" id={'day-' + day.dayStart}>
          {formatDay(day.dayStart)}
        </h3>
        <p className="dayCard__tally">
          {day.pees.length} pees · {day.poos.length} poos · ~
          {day.estimatedUrineMl} mL out · {day.fluidMl} mL in
          {day.nocturiaCount > 0 ? ' · ' + day.nocturiaCount + ' overnight' : ''}
        </p>
      </div>
      <ul className="entryList">
        {all.map((e) => (
          <EntryRow entry={e} key={e.id} onRemove={onRemove} />
        ))}
      </ul>
    </section>
  )
}

export function Log({ headingRef }: { headingRef: HeadingRef }) {
  const { entries, stats, findings, summary, persistent, add, remove, clear, loadSample } =
    useLog()
  const [copyState, setCopyState] = useState<string>('')
  const summaryRef = useRef<HTMLPreElement | null>(null)

  const maxBristol = Math.max.apply(null, stats.bristolCounts.concat([1]))

  function handleCopy() {
    copyText(summary).then((ok) => {
      if (ok) {
        setCopyState('Summary copied to the clipboard.')
      } else {
        selectElementText(summaryRef.current)
        setCopyState('Copying is not available here, so the summary is selected — press Ctrl+C or Cmd+C.')
      }
    })
  }

  function handleSelect() {
    selectElementText(summaryRef.current)
    setCopyState('Summary selected. Press Ctrl+C or Cmd+C to copy.')
  }

  function handleClear() {
    clear()
    setCopyState('')
  }

  return (
    <>
      <div className="shell">
        <div className="hero">
          <p className="eyebrow">Chapter four — interactive</p>
          <h1 className="pageTitle" ref={headingRef} tabIndex={-1}>
            The logbook
          </h1>
          <div className="prose">
            <p className="lede">
              Record a few days. This measures what you record against the
              published thresholds — polyuria, oliguria, frequency, nocturia,
              the diarrhoea definition, the Rome IV constipation criteria — and
              then writes the summary you can hand to a doctor.
            </p>
            <p>
              Three days is enough to be useful. A fortnight is better. Nothing
              leaves your browser: there is no account, no server and no network
              request of any kind.
            </p>
          </div>
        </div>
      </div>

      <Section>
        {!persistent ? (
          <p className="notice" role="status" style={{ marginBottom: '1.5rem' }}>
            <strong>Heads up:</strong> this browser is not letting the page save
            anything — most often that is iOS Private Browsing, or site data
            being blocked. The log still works, but it will disappear when you
            close the tab. Copy the summary before you go if you want to keep it.
          </p>
        ) : null}

        <div className="logGrid">
          <div className="logGrid__form noPrint">
            <EntryForm onAdd={add} />
            <div className="btnRow" style={{ marginTop: '1rem' }}>
              <button type="button" className="btn btn--ghost btn--small" onClick={loadSample}>
                Load four sample days
              </button>
              {entries.length > 0 ? (
                <button type="button" className="btn btn--ghost btn--small" onClick={handleClear}>
                  Clear the log
                </button>
              ) : null}
            </div>
            <p className="small muted" style={{ marginTop: '0.5rem' }}>
              The sample is an ordinary, unremarkable four days with a slightly
              slow bowel — enough for the analysis to have something to say.
            </p>
          </div>

          <div className="stack">
            {entries.length === 0 ? (
              <div className="panel">
                <h2 className="panel__title">Nothing logged yet</h2>
                <div className="prose small">
                  <p>
                    Add an entry on the left, or load the sample days to see what
                    the analysis does. If you are logging for an appointment, the
                    fields here are the ones a clinician will ask about anyway:
                    times, rough volumes, Bristol type, colour, blood, straining
                    and whether anything woke you.
                  </p>
                  <p>
                    <a className="inlineLink" href={hrefFor('/red-flags')}>
                      What to write down before an appointment
                    </a>
                  </p>
                </div>
              </div>
            ) : (
              <>
                <section aria-labelledby="findings-heading">
                  <h2 className="sectionTitle" id="findings-heading">
                    What your log says
                  </h2>
                  <div aria-live="polite">
                    {findings.map((f) => (
                      <div className={'finding finding--' + f.severity} key={f.id}>
                        <Signal level={f.severity} />
                        <h3 className="finding__title">{f.title}</h3>
                        <p className="small">{f.detail}</p>
                        <p className="small finding__action">{f.action}</p>
                      </div>
                    ))}
                  </div>
                  <p className="small muted" style={{ marginTop: '0.75rem' }}>
                    These are thresholds, not diagnoses. Crossing one means a
                    conversation is worth having, not that you have anything in
                    particular.
                  </p>
                </section>

                <section aria-labelledby="stats-heading">
                  <h2 className="sectionTitle" id="stats-heading">
                    The averages
                  </h2>
                  <dl className="statStrip">
                    <div>
                      <dt>Pees per day</dt>
                      <dd>{stats.meanPeesPerDay.toFixed(1)}</dd>
                    </div>
                    <div>
                      <dt>Est. output per day</dt>
                      <dd>{Math.round(stats.meanUrineMl)} mL</dd>
                    </div>
                    <div>
                      <dt>Poos per week</dt>
                      <dd>{stats.poosPerWeek.toFixed(1)}</dd>
                    </div>
                    <div>
                      <dt>Median Bristol</dt>
                      <dd>{stats.medianBristol === null ? '—' : stats.medianBristol}</dd>
                    </div>
                  </dl>
                  <p className="small muted" style={{ marginTop: '0.6rem' }}>
                    Output is estimated from three void sizes (about 100, 250 and
                    450 mL), not measured. Normal is 800–2000 mL a day on around
                    2 litres of fluid, and 3 poos a day to 3 a week.
                  </p>
                </section>

                {stats.totalPoos > 0 ? (
                  <section aria-labelledby="dist-heading">
                    <h2 className="subTitle" id="dist-heading">
                      Where your stool form sits
                    </h2>
                    <ul className="distList">
                      {bristolScale.map((b) => {
                        const count = stats.bristolCounts[b.type - 1]
                        const width = Math.round((count / maxBristol) * 100)
                        return (
                          <li className="distRow" key={b.type}>
                            <span>Type {b.type}</span>
                            <span className="distTrack">
                              <span
                                className={'distFill distFill--' + b.severity}
                                style={{ width: width + '%' }}
                              />
                            </span>
                            <span className="distCount">
                              {count}
                              <span className="visuallyHidden">
                                {' '}
                                {count === 1 ? 'movement' : 'movements'} recorded as
                                type {b.type}, {b.name}
                              </span>
                            </span>
                          </li>
                        )
                      })}
                    </ul>
                  </section>
                ) : null}

                <section aria-labelledby="days-heading">
                  <h2 className="sectionTitle" id="days-heading">
                    Day by day
                  </h2>
                  {stats.days
                    .slice()
                    .reverse()
                    .map((day) => (
                      <DayBlock day={day} key={day.dayStart} onRemove={remove} />
                    ))}
                </section>

                <section aria-labelledby="summary-heading">
                  <h2 className="sectionTitle" id="summary-heading">
                    The handover
                  </h2>
                  <div className="prose small">
                    <p>
                      A one-page plain-text summary. Copy it into a note, print
                      this page, or hand the phone over — which is easier than
                      reconstructing six weeks from memory, and easier than
                      saying some of it out loud.
                    </p>
                  </div>
                  <div className="btnRow noPrint" style={{ margin: '0.75rem 0' }}>
                    {clipboardAvailable() ? (
                      <button type="button" className="btn" onClick={handleCopy}>
                        Copy summary
                      </button>
                    ) : null}
                    <button type="button" className="btn btn--ghost" onClick={handleSelect}>
                      Select the text
                    </button>
                    <button
                      type="button"
                      className="btn btn--ghost"
                      onClick={() => window.print()}
                    >
                      Print this page
                    </button>
                  </div>
                  <p aria-live="polite" className="small muted">
                    {copyState}
                  </p>
                  <pre className="summaryBox" ref={summaryRef} tabIndex={0}>
                    {summary}
                  </pre>
                </section>
              </>
            )}
          </div>
        </div>
      </Section>

      <Section>
        <div className="prose">
          <h2 className="sectionTitle">What this deliberately does not do</h2>
          <p>
            It does not tell you how much to drink. There is no hydration
            calculator here, because the honest answer — drink to thirst, aim for
            pale straw — cannot be improved by a number, and a target volume
            would contradict the evidence on the page about it.
          </p>
          <p>
            It does not diagnose. Every finding above resolves to a threshold and
            a suggestion about who to speak to, never to a condition. And it does
            not give doses of anything.
          </p>
        </div>
      </Section>
    </>
  )
}
