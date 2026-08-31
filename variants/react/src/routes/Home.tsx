import { criticalFlags } from '../data/redFlags'
import { peeFigures, pooFigures } from '../data/reference'
import { Figures } from '../components/Bits'
import { Section, Split } from '../components/Layout'
import { hrefFor } from '../router'
import type { HeadingRef } from '../router'

const ROUTE_CARDS = [
  {
    num: '01',
    to: '/pee' as const,
    title: 'Peeing',
    desc: 'Six to eight times a day, 800–2000 mL, and why the colour chart beats every rule you have been given about glasses of water.',
  },
  {
    num: '02',
    to: '/poo' as const,
    title: 'Pooing',
    desc: 'Three a day to three a week. The whole Bristol scale, what the colours mean, and the actual clinical definitions of constipation and diarrhoea.',
  },
  {
    num: '03',
    to: '/red-flags' as const,
    title: 'Warning signs',
    desc: 'Sorted by how fast you need to move: go now, book within days, or almost certainly nothing at all.',
  },
  {
    num: '04',
    to: '/log' as const,
    title: 'The logbook',
    desc: 'Record a few days, and it measures what you record against the published thresholds — then writes the summary to hand to a doctor.',
  },
]

export function Home({ headingRef }: { headingRef: HeadingRef }) {
  return (
    <>
      <div className="shell">
        <div className="hero">
          <div className="heroGrid">
            <div>
              <p className="eyebrow">Pee &amp; poo, without the coyness</p>
              <h1 className="display" ref={headingRef} tabIndex={-1}>
                Nobody tells you what normal is.
              </h1>
              <div className="prose">
                <p className="lede">
                  So here it is, with numbers. Most adults pee six to eight
                  times a day and poo somewhere between three times a day and
                  three times a week. Both of those ranges are enormous, which
                  is the point: almost everything you are worried about is
                  inside them.
                </p>
              </div>
            </div>
            <div className="prose">
              <p>
                This guide covers how much, how often, what the colours mean,
                and — the part that actually matters — the short list of signs
                that need a doctor today rather than a search engine at two in
                the morning.
              </p>
              <p>
                It will not diagnose you and it does not try to. It will tell
                you where the published thresholds sit, and when the honest
                answer is <em>we do not really know</em>.
              </p>
              <p>
                <a className="btn" href={hrefFor('/red-flags')}>
                  Skip to the warning signs
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      <Section>
        <div className="slab">
          <p className="slab__kicker">Before anything else</p>
          <h2 className="slab__title">
            Four things that mean stop reading and get help now
          </h2>
          <p>
            Everything else on this site can wait until you have finished a cup
            of tea. These cannot. If one of them describes you, go to an
            emergency department or call your emergency number.
          </p>
          <ul>
            {criticalFlags.map((flag) => (
              <li key={flag.id}>
                <strong>{flag.symptom}</strong>
                <span>{flag.detail}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section>
        <Split
          aside={
            <>
              <p className="eyebrow">The numbers</p>
              <h2 className="sectionTitle">What a normal week looks like</h2>
              <div className="prose small muted">
                <p>
                  Ranges, not targets. The count matters far less than whether
                  anything has changed, and whether it is comfortable.
                </p>
              </div>
            </>
          }
        >
          <div className="stack">
            <div>
              <h3 className="subTitle">Urine</h3>
              <Figures items={peeFigures} three />
            </div>
            <div>
              <h3 className="subTitle">Stool</h3>
              <Figures items={pooFigures} />
            </div>
          </div>
        </Split>
      </Section>

      <Section>
        <Split
          aside={
            <>
              <p className="eyebrow">The guide</p>
              <h2 className="sectionTitle">Four ways in</h2>
              <div className="prose small muted">
                <p>
                  Start wherever your question is. Everything cross-links, and
                  nothing assumes you have read the rest.
                </p>
              </div>
            </>
          }
        >
          <div className="routeCards">
            {ROUTE_CARDS.map((c) => (
              <a className="routeCard" href={hrefFor(c.to)} key={c.to}>
                <span className="routeCard__num">{c.num}</span>
                <span className="routeCard__title">{c.title}</span>
                <span className="routeCard__desc">{c.desc}</span>
              </a>
            ))}
          </div>
        </Split>
      </Section>

      <Section>
        <Split
          aside={
            <>
              <p className="eyebrow">The honest bit</p>
              <h2 className="sectionTitle">Where the evidence runs out</h2>
            </>
          }
        >
          <div className="cards cards--3">
            <article className="card">
              <h3 className="card__title">Eight glasses a day</h3>
              <div className="prose small">
                <p>
                  No evidence base. The number is usually traced to a 1945 US
                  recommendation of about 2.5 litres of water a day — which went
                  on to say that most of that already comes from food. The
                  second sentence got dropped and a rule was born.
                </p>
              </div>
            </article>
            <article className="card">
              <h3 className="card__title">Cranberry juice</h3>
              <div className="prose small">
                <p>
                  Weak and mixed. It reduces bacterial adhesion in a laboratory.
                  In humans, reviews suggest a modest reduction in recurrent
                  infections for some groups and little or nothing for most.
                  It treats nothing that is already happening.
                </p>
              </div>
            </article>
            <article className="card">
              <h3 className="card__title">Probiotics</h3>
              <div className="prose small">
                <p>
                  Highly strain-specific and mostly unproven for general bowel
                  health. Fix fibre, fluid and routine first — that is where the
                  measurable effect is. If you try one, give a single product
                  four weeks and stop if nothing changes.
                </p>
              </div>
            </article>
          </div>
        </Split>
      </Section>
    </>
  )
}
