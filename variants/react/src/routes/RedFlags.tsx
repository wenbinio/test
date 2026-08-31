import { useMemo, useState } from 'react'
import { criticalFlags, redFlags } from '../data/redFlags'
import type { BodySystem, Timeframe } from '../data/types'
import { Signal } from '../components/Signal'
import { Section, Split } from '../components/Layout'
import { hrefFor } from '../router'
import type { HeadingRef } from '../router'

type TimeFilter = 'all' | Timeframe
type SystemFilter = 'all' | BodySystem

const TIME_OPTIONS: { value: TimeFilter; label: string }[] = [
  { value: 'all', label: 'Everything' },
  { value: 'now', label: 'Go now' },
  { value: 'days', label: 'Within days' },
  { value: 'reassure', label: 'Almost certainly nothing' },
]

const SYSTEM_OPTIONS: { value: SystemFilter; label: string }[] = [
  { value: 'all', label: 'Both' },
  { value: 'urinary', label: 'Peeing' },
  { value: 'bowel', label: 'Pooing' },
]

const TIME_META: Record<Timeframe, { heading: string; signal: 'ok' | 'watch' | 'urgent'; word: string }> = {
  now: { heading: 'Go now', signal: 'urgent', word: 'Emergency' },
  days: { heading: 'Book within days', signal: 'watch', word: 'See a GP' },
  reassure: { heading: 'Almost certainly nothing', signal: 'ok', word: 'Normal' },
}

export function RedFlags({ headingRef }: { headingRef: HeadingRef }) {
  const [time, setTime] = useState<TimeFilter>('all')
  const [system, setSystem] = useState<SystemFilter>('all')

  const visible = useMemo(() => {
    return redFlags.filter((f) => {
      if (time !== 'all' && f.timeframe !== time) return false
      if (system !== 'all' && f.system !== system && f.system !== 'both') return false
      return true
    })
  }, [time, system])

  const groups: { key: Timeframe; items: typeof redFlags }[] = [
    { key: 'now', items: visible.filter((f) => f.timeframe === 'now') },
    { key: 'days', items: visible.filter((f) => f.timeframe === 'days') },
    { key: 'reassure', items: visible.filter((f) => f.timeframe === 'reassure') },
  ]

  return (
    <>
      <div className="shell">
        <div className="hero">
          <p className="eyebrow">Chapter three</p>
          <h1 className="pageTitle" ref={headingRef} tabIndex={-1}>
            Warning signs, sorted by how fast you need to move
          </h1>
          <div className="prose">
            <p className="lede">
              Most changes in how you pee and poo are benign, common and
              short-lived — a bug, a new tablet, a stressful fortnight, not
              enough fibre, too much coffee. This page is about the minority that
              are not.
            </p>
            <p>
              If you take one thing away: <strong>visible blood</strong>, and{' '}
              <strong>symptoms that persist for weeks rather than days</strong>,
              are the two patterns worth being seen for.
            </p>
          </div>
        </div>
      </div>

      <Section>
        <div className="slab">
          <p className="slab__kicker">Emergency — call now or go to A&amp;E</p>
          <h2 className="slab__title">Do not wait to see whether these settle</h2>
          <p>
            Do not wait for a GP appointment. Do not drive yourself if you feel
            faint or are bleeding heavily — call for an ambulance or have someone
            take you. Nobody is annoyed with you for coming in and being fine.
          </p>
          <ul>
            {criticalFlags.map((f) => (
              <li key={f.id}>
                <strong>{f.symptom}</strong>
                <span>{f.detail}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section id="all">
        <Split
          aside={
            <>
              <p className="eyebrow">Interactive</p>
              <h2 className="sectionTitle">The full list, filtered</h2>
              <div className="prose small muted">
                <p>
                  Red-flag lists distort your sense of the odds, so the
                  reassurance category is here on equal footing with the rest.
                  Use it to stop scanning symptom lists at 2am — not to talk
                  yourself out of an appointment you already know you need.
                </p>
              </div>
              <div className="filterBar" style={{ marginTop: '1.25rem' }}>
                <fieldset style={{ width: '100%' }}>
                  <legend>How urgent</legend>
                  <div className="segmented">
                    {TIME_OPTIONS.map((o) => (
                      <button
                        key={o.value}
                        type="button"
                        aria-pressed={time === o.value}
                        onClick={() => setTime(o.value)}
                      >
                        {o.label}
                      </button>
                    ))}
                  </div>
                </fieldset>
              </div>
              <div className="filterBar">
                <fieldset style={{ width: '100%' }}>
                  <legend>Which end</legend>
                  <div className="segmented">
                    {SYSTEM_OPTIONS.map((o) => (
                      <button
                        key={o.value}
                        type="button"
                        aria-pressed={system === o.value}
                        onClick={() => setSystem(o.value)}
                      >
                        {o.label}
                      </button>
                    ))}
                  </div>
                </fieldset>
              </div>
              <p className="count" aria-live="polite">
                Showing {visible.length} of {redFlags.length} entries.
              </p>
            </>
          }
        >
          <div className="stack">
            {visible.length === 0 ? (
              <p className="notice">
                No entries match that combination. Try widening the filters.
              </p>
            ) : null}

            {groups.map((group) => {
              if (group.items.length === 0) return null
              const meta = TIME_META[group.key]
              return (
                <section key={group.key} aria-labelledby={'group-' + group.key}>
                  <div className="ruleList__head" style={{ marginBottom: '0.75rem' }}>
                    <h3 className="subTitle" id={'group-' + group.key} style={{ marginBottom: 0 }}>
                      {meta.heading}
                    </h3>
                    <Signal level={meta.signal} label={meta.word} />
                  </div>
                  <ul className="ruleList">
                    {group.items.map((f) => (
                      <li key={f.id}>
                        <div className="ruleList__head">
                          <span className="ruleList__term">{f.symptom}</span>
                          {f.critical ? <Signal level="urgent" label="Unmissable" /> : null}
                        </div>
                        <p className="small muted">{f.detail}</p>
                      </li>
                    ))}
                  </ul>
                </section>
              )
            })}
          </div>
        </Split>
      </Section>

      <Section id="historian">
        <Split
          aside={
            <>
              <p className="eyebrow">Before the appointment</p>
              <h2 className="sectionTitle">How to be a good historian</h2>
              <div className="prose small muted">
                <p>
                  Clinicians work from the story you tell them. Ten minutes of
                  preparation genuinely changes what happens in a ten-minute
                  appointment — it converts "things have been a bit off, I think"
                  into a timeline that can be acted on. You do not need to be
                  scientific. You need to be specific.
                </p>
                <p>
                  <a className="inlineLink" href={hrefFor('/log')}>
                    The logbook records all of this
                  </a>{' '}
                  and prints a one-page summary you can hand over — which is
                  easier than reconstructing six weeks from memory in a waiting
                  room, and easier than saying some of it out loud.
                </p>
              </div>
            </>
          }
        >
          <div className="stack">
            <div className="cards cards--2">
              <article className="card">
                <h3 className="card__title">What to write down</h3>
                <ul className="bullets small">
                  <li>
                    <strong>Duration.</strong> The date or week it started.
                    "Since the start of June" beats "a while".
                  </li>
                  <li>
                    <strong>Frequency.</strong> How many times a day and night,
                    now versus your normal. Your normal is the comparison that
                    matters.
                  </li>
                  <li>
                    <strong>Stool form.</strong> Bristol types 1–7. "Mostly type
                    6 for a month" is far more useful than "loose".
                  </li>
                  <li>
                    <strong>Blood.</strong> Colour, amount, and exactly where it
                    appeared — on the paper, coating the stool, mixed through it,
                    in the water, or at the start or end of the stream.
                  </li>
                  <li>
                    <strong>Pain.</strong> Where, what kind, whether it relates to
                    eating or opening your bowels, and whether it wakes you.
                  </li>
                  <li>
                    <strong>Weight.</strong> Any change, over what period,
                    intentional or not. A number from the scales is worth a lot.
                  </li>
                  <li>
                    <strong>Everything you take.</strong> Prescriptions,
                    over-the-counter, supplements, iron, laxatives, herbal
                    remedies, protein powders. Photograph the boxes.
                  </li>
                  <li>
                    <strong>Family history and travel.</strong> Which cancers, at
                    what ages; where you have been and when.
                  </li>
                </ul>
              </article>
              <article className="card">
                <h3 className="card__title">Questions worth asking</h3>
                <ul className="bullets small">
                  <li>What do you think is most likely, and what are you ruling out?</li>
                  <li>What would change your mind — what should bring me back?</li>
                  <li>Which tests, and when and how will I get the results?</li>
                  <li>If this test is normal, does that settle it, or is there a next step?</li>
                  <li>
                    Is this urgent enough for a fast-track referral, and if not,
                    what would make it so?
                  </li>
                  <li>Is there anything I should stop, start or change while we wait?</li>
                  <li>
                    Can you write down the name of what you think this is, so I
                    can read about it properly?
                  </li>
                </ul>
              </article>
            </div>

            <article className="card">
              <h3 className="card__title">How to bring it up without dying of embarrassment</h3>
              <div className="prose small">
                <p>
                  Lead with the sentence, before your nerve goes: "I've had blood
                  when I open my bowels for three weeks." Or write it on a piece
                  of paper and hand it over — clinicians take that entirely in
                  their stride.
                </p>
                <p>
                  It helps to know that a GP hears about bowels, blood, discharge
                  and incontinence every single working day. You are not the
                  interesting one, and there is no version of this they have not
                  already seen this week. You can ask for a clinician of a
                  particular gender, ask for a chaperone, or bring someone with
                  you.
                </p>
              </div>
            </article>
          </div>
        </Split>
      </Section>

      <Section id="special">
        <Split
          aside={
            <>
              <p className="eyebrow">Different defaults</p>
              <h2 className="sectionTitle">When the thresholds shift</h2>
              <div className="prose small muted">
                <p>
                  If you are in one of these groups, err further towards being
                  seen, and sooner.
                </p>
              </div>
            </>
          }
        >
          <ul className="ruleList">
            <li>
              <span className="ruleList__term">Pregnancy</span>
              <p className="small muted">
                Urinary infections are treated in pregnancy even when they cause
                no symptoms, because untreated they carry risk to both. Any
                burning, frequency beyond the usual pregnancy increase, or an
                abnormal urine test needs same-day contact with a midwife or GP.
                Any rectal or urinary bleeding, fever with flank pain, or reduced
                urine output should be assessed promptly.
              </p>
            </li>
            <li>
              <span className="ruleList__term">Babies and children</span>
              <p className="small muted">
                Track nappies: fewer wet ones than usual, or none for several
                hours, is the main dehydration signal, along with a dry mouth, no
                tears, sunken eyes or unusual floppiness. Any visible blood in a
                baby's stool needs assessment — do not wait it out. Stool like red
                currant jelly, with episodes of drawing the legs up, inconsolable
                screaming and pallor, suggests intussusception and is an
                emergency. Fever in a baby under three months is always urgent.
              </p>
            </li>
            <li>
              <span className="ruleList__term">Adults over 65</span>
              <p className="small muted">
                Presentation is often atypical: infection may show as confusion,
                falls or simply "not themselves", with no fever and no burning.
                New constipation, new incontinence or a change in bowel habit
                carries more weight at this age, not less. Ischaemic colitis and
                bowel obstruction are both more likely. And a new bladder or bowel
                symptom is very often a new tablet.
              </p>
            </li>
            <li>
              <span className="ruleList__term">Spinal cord injury or neurological conditions</span>
              <p className="small muted">
                With a spinal cord injury, MS or spina bifida you may not feel a
                full bladder, a loaded bowel or the pain that normally signals
                trouble — so the absence of pain is not reassurance. Watch instead
                for changes in your usual routine, cloudy or strong-smelling
                urine, increased spasticity, or — above a T6 injury — autonomic
                dysreflexia: pounding headache, sweating and flushing above the
                level of injury. That is an emergency, and a blocked catheter or
                loaded bowel is a common trigger.
              </p>
            </li>
            <li>
              <span className="ruleList__term">Immunosuppression and chemotherapy</span>
              <p className="small muted">
                On chemotherapy, high-dose steroids, biologics or transplant
                immunosuppressants, the ordinary rules do not apply. A fever may
                be an emergency in its own right — follow the neutropenic sepsis
                instructions your team gave you and call the number on the card
                rather than waiting for a GP appointment.
              </p>
            </li>
            <li>
              <span className="ruleList__term">Recent foreign travel</span>
              <p className="small muted">
                Mention travel unprompted, including countries and dates, and
                mention it again if nobody asks. Diarrhoea that begins during or
                shortly after travel opens up parasites and organisms that need
                specific stool tests. Fever after travel to a malaria area is
                urgent regardless of bowel symptoms.
              </p>
            </li>
          </ul>
        </Split>
      </Section>

      <Section id="rule">
        <Split
          aside={
            <>
              <p className="eyebrow">In one paragraph</p>
              <h2 className="sectionTitle">The whole triage</h2>
            </>
          }
        >
          <div className="prose">
            <p>
              <strong>Days</strong> of symptoms with an obvious trigger and a
              clear trajectory towards better: watch, hydrate, read the other two
              chapters.
            </p>
            <p>
              <strong>Weeks</strong> of symptoms with no explanation, or any
              visible blood, or weight coming off without trying: book an
              appointment.
            </p>
            <p>
              Anything in the <strong>emergency</strong> block at the top of this
              page: go now.
            </p>
            <p>
              And if you went, were told it was nothing, and it has not gone away
              — go back and say so. Reassessment after an unresolved symptom is
              normal medicine, not a complaint about the last clinician. An IBS
              diagnosis is not a lifetime shield either: people with IBS get
              inflammatory bowel disease, coeliac disease and cancer at the
              ordinary rates. What matters is <em>change</em>.
            </p>
          </div>
        </Split>
      </Section>
    </>
  )
}
