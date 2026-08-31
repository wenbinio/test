import { urineColours } from '../data/colours'
import { peeFaqs, peeFigures, urinaryTerms, waterIntake } from '../data/reference'
import { Callout, FaqList, Figures } from '../components/Bits'
import { ColourChart } from '../components/ColourChart'
import { Scroller, Section, Split } from '../components/Layout'
import { hrefFor } from '../router'
import type { HeadingRef } from '../router'

export function Pee({ headingRef }: { headingRef: HeadingRef }) {
  return (
    <>
      <div className="shell">
        <div className="hero">
          <p className="eyebrow">Chapter one</p>
          <h1 className="pageTitle" ref={headingRef} tabIndex={-1}>
            Peeing: how much, how often, and what the colour is telling you
          </h1>
          <div className="prose">
            <p className="lede">
              Six to eight times a day. Somewhere between 800 mL and 2 litres in
              twenty-four hours. Twenty to thirty seconds a go. Those are the
              numbers — but the count matters far less than the volume, the
              colour, and whether anything has changed.
            </p>
          </div>
        </div>
      </div>

      <Section id="numbers">
        <Split
          aside={
            <>
              <p className="eyebrow">Baseline</p>
              <h2 className="sectionTitle">The numbers, before the opinions</h2>
              <div className="prose small muted">
                <p>
                  Four to ten times a day is still ordinary. What moves it:
                  fluid in, caffeine, alcohol, heat, cold, pregnancy and,
                  extremely often, a new prescription.
                </p>
              </div>
            </>
          }
        >
          <div className="stack">
            <Figures items={peeFigures} three />
            <div className="prose">
              <p>
                The first pee of the morning is <em>meant</em> to be the darkest
                and strongest-smelling of the day. You have gone seven or eight
                hours without a drink and your kidneys have spent the night
                concentrating urine. That is physiology working, not a warning.
              </p>
            </div>
            <div className="cards cards--2">
              <article className="card">
                <h3 className="card__title">Frequency is downstream of everything else</h3>
                <div className="prose small">
                  <p>
                    How often you go is mostly a function of how much fluid goes
                    in and how much of it your kidneys are told to keep. Caffeine
                    and alcohol push output up; alcohol also suppresses the
                    hormone that tells your kidneys to hold water, which is part
                    of why hangovers involve thirst. Heat and heavy sweating push
                    output down, because the water leaves through your skin
                    instead.
                  </p>
                </div>
              </article>
              <article className="card">
                <h3 className="card__title">Check your medicine cabinet first</h3>
                <div className="prose small">
                  <p>
                    Diuretics are prescribed precisely to make you pee more.
                    SGLT2 inhibitors, used in diabetes and heart failure, work by
                    dumping glucose into your urine, which drags water with it.
                    Lithium blunts the kidney's response to antidiuretic hormone.
                    If your frequency changed shortly after a new prescription,
                    that is the first thing to raise with your prescriber — and
                    do not simply stop taking it.
                  </p>
                </div>
              </article>
            </div>
            <Callout title="Count volume, not visits">
              <p>
                Ten small visits on three litres of tea is a completely different
                situation from ten small visits on one litre of water. If you are
                trying to work out whether something has genuinely changed,{' '}
                <a className="inlineLink" href={hrefFor('/log')}>
                  log three days in the logbook
                </a>
                . Three days of honest records beats a month of impressions.
              </p>
            </Callout>
          </div>
        </Split>
      </Section>

      <Section id="colour">
        <Split
          aside={
            <>
              <p className="eyebrow">Interactive</p>
              <h2 className="sectionTitle">The colour chart</h2>
              <div className="prose small muted">
                <p>
                  Tap any colour for what causes it and what to do. The swatches
                  are indicative only — lighting, toilet bowls and screens all
                  lie a little, so read the words as well as the colour.
                </p>
              </div>
            </>
          }
        >
          <ColourChart
            items={urineColours}
            label="Urine colours"
            idPrefix="urine-colour"
          />
        </Split>
      </Section>

      <Section id="terms">
        <Split
          aside={
            <>
              <p className="eyebrow">Vocabulary</p>
              <h2 className="sectionTitle">The words your GP will use</h2>
              <div className="prose small muted">
                <p>
                  These are clinical terms with defined thresholds. They describe
                  patterns; none of them is a diagnosis in itself. Using them
                  accurately makes a ten-minute appointment go much further.
                </p>
              </div>
            </>
          }
        >
          <Scroller label="Clinical terms for urinary patterns">
            <table>
              <caption>
                Clinical terms for urinary patterns, with the thresholds usually
                applied to adults
              </caption>
              <thead>
                <tr>
                  <th scope="col">Term</th>
                  <th scope="col">What it means</th>
                  <th scope="col">Usual threshold</th>
                </tr>
              </thead>
              <tbody>
                {urinaryTerms.map((t) => (
                  <tr key={t.term}>
                    <th scope="row">{t.term}</th>
                    <td>{t.meaning}</td>
                    <td>{t.threshold}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Scroller>
        </Split>
      </Section>

      <Section id="hydration">
        <Split
          aside={
            <>
              <p className="eyebrow">Myth, dismantled</p>
              <h2 className="sectionTitle">You can, in fact, drink too much</h2>
              <div className="prose small muted">
                <p>
                  Hydration advice has been oversold for eighty years. Here is
                  what the official figures actually say.
                </p>
              </div>
            </>
          }
        >
          <div className="stack">
            <Scroller label="Adequate intake figures for total water">
              <table>
                <caption>
                  Adequate intake for total water, from all sources including
                  food
                </caption>
                <thead>
                  <tr>
                    <th scope="col">Source</th>
                    <th scope="col">Women</th>
                    <th scope="col">Men</th>
                  </tr>
                </thead>
                <tbody>
                  {waterIntake.map((r) => (
                    <tr key={r.source}>
                      <th scope="row">{r.source}</th>
                      <td>{r.women}</td>
                      <td>{r.men}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Scroller>
            <div className="prose">
              <p>
                Both figures are <em>total water</em>, and food contributes
                roughly 20% of it. They are population averages for sedentary
                people in temperate conditions, not a target you must hit. Heat,
                exercise, fever, breastfeeding and several medical conditions all
                move the number up.
              </p>
            </div>
            <div className="cards cards--2">
              <article className="card">
                <h3 className="card__title">Primary polydipsia</h3>
                <div className="prose small">
                  <p>
                    Some people drink far beyond thirst — several litres a day,
                    driven by habit, a dry mouth from medication, or a
                    psychiatric condition. The result is high-volume,
                    near-colourless urine around the clock. It looks a lot like
                    diabetes insipidus, and the two are separated by testing, not
                    by guesswork. Worth investigating rather than self-labelling.
                  </p>
                </div>
              </article>
              <article className="card">
                <h3 className="card__title">Water intoxication</h3>
                <div className="prose small">
                  <p>
                    Healthy kidneys can excrete somewhere around 0.8–1.0 litres
                    an hour at most. Drink faster than that for a sustained
                    period — endurance events, drinking contests, some
                    drug-related episodes — and blood sodium falls.
                    Hyponatraemia causes headache, nausea, confusion and, at the
                    extreme, seizures and brain swelling. It has killed people.
                  </p>
                </div>
              </article>
            </div>
            <Callout title="The rule that actually works">
              <p>
                Drink to thirst, and aim for urine that is pale yellow rather
                than colourless for most of the day. That single check
                outperforms any glass count, and it adjusts itself automatically
                for weather, exercise and the size of your body.
              </p>
            </Callout>
          </div>
        </Split>
      </Section>

      <Section id="too-little">
        <Split
          aside={
            <>
              <p className="eyebrow">The other direction</p>
              <h2 className="sectionTitle">Peeing too little</h2>
              <div className="prose small muted">
                <p>
                  Two broad causes: not enough going in, or something wrong with
                  the kidneys or the plumbing below them. The first is fixed with
                  a drink. The second is not.
                </p>
              </div>
            </>
          }
        >
          <div className="stack">
            <div className="cards cards--2">
              <article className="card">
                <h3 className="card__title">Early signs of dehydration</h3>
                <ul className="bullets small">
                  <li>Dark yellow or amber urine outside the first morning pee</li>
                  <li>Fewer, smaller voids — four or five hours with no urge</li>
                  <li>Thirst, dry mouth, headache</li>
                  <li>Tiredness, poor concentration, light-headedness on standing</li>
                  <li>In older adults, confusion is often the first thing anyone notices</li>
                </ul>
              </article>
              <article className="card">
                <h3 className="card__title">When low output is urgent</h3>
                <ul className="bullets small">
                  <li>Very little or no urine for 8–12 hours despite drinking</li>
                  <li>
                    Complete inability to pee with a painful, distended lower
                    abdomen
                  </li>
                  <li>Low output with swelling of legs, face or hands, or breathlessness</li>
                  <li>
                    Low output after severe vomiting, diarrhoea, burns, blood loss
                    or heat exhaustion
                  </li>
                  <li>Low output alongside confusion, fainting or a racing pulse</li>
                </ul>
              </article>
            </div>
            <Callout title="Do not wait this one out" urgent>
              <p>
                If you cannot pass urine at all and your bladder feels full and
                painful, that is acute urinary retention. Go to an emergency
                department or call for urgent help now. It does not resolve on
                its own, and a blocked bladder damages kidneys.
              </p>
            </Callout>
          </div>
        </Split>
      </Section>

      <Section id="why">
        <Split
          aside={
            <>
              <p className="eyebrow">Causes</p>
              <h2 className="sectionTitle">Why your frequency changes</h2>
            </>
          }
        >
          <div className="cards cards--2">
            <article className="card">
              <h3 className="card__title">Cold and stress</h3>
              <div className="prose small">
                <p>
                  Cold constricts the blood vessels near your skin, pushing blood
                  into the core and raising central pressure; the kidneys read
                  that as excess volume and shed fluid. Anxiety adds a second
                  mechanism — a tense pelvic floor and an alert nervous system
                  make a part-full bladder feel urgent.
                </p>
              </div>
            </article>
            <article className="card">
              <h3 className="card__title">Latchkey urgency</h3>
              <div className="prose small">
                <p>
                  That sudden desperation at your own front door, or at the sound
                  of running water, is a learned association — your brain has
                  paired a cue with permission to go. It is common, it is not a
                  disease, and it responds to gradually resisting the cue rather
                  than rushing to meet it.
                </p>
              </div>
            </article>
            <article className="card">
              <h3 className="card__title">Pregnancy and afterwards</h3>
              <div className="prose small">
                <p>
                  Frequency rises early from a 40–50% increase in blood volume,
                  and again late as the uterus presses on the bladder. Afterwards,
                  a stretched pelvic floor commonly causes leaking on coughing,
                  laughing or exercise. Very common — and not something you have
                  to accept permanently. Pelvic floor physiotherapy has good
                  evidence behind it.
                </p>
              </div>
            </article>
            <article className="card">
              <h3 className="card__title">Ageing and the prostate</h3>
              <div className="prose small">
                <p>
                  Bladder capacity and elasticity fall with age, and more urine
                  is made overnight, so nocturia becomes commoner. In men over
                  50, benign prostatic enlargement adds hesitancy, a weaker
                  stream, dribbling at the end and a sense of not emptying.
                  Common does not mean it must be endured — it is treatable.
                </p>
              </div>
            </article>
            <article className="card">
              <h3 className="card__title">Diabetes</h3>
              <div className="prose small">
                <p>
                  High-volume urine plus relentless thirst is the classic pair.
                  In type 1 and type 2 diabetes, glucose spills into the urine
                  and pulls water with it. In diabetes insipidus — a different
                  and much rarer condition — the kidneys cannot concentrate urine
                  at all, producing litres of near-colourless output. Both need a
                  blood test, not a guess.
                </p>
              </div>
            </article>
            <article className="card">
              <h3 className="card__title">Constipation, of all things</h3>
              <div className="prose small">
                <p>
                  A loaded rectum sits directly against the bladder and reliably
                  worsens frequency, urgency and incomplete emptying. Treating
                  constipation is one of the most under-used ways to improve
                  urinary symptoms.
                </p>
              </div>
            </article>
          </div>
        </Split>
      </Section>

      <Section id="habits">
        <Split
          aside={
            <>
              <p className="eyebrow">Practical</p>
              <h2 className="sectionTitle">Habits that actually help</h2>
            </>
          }
        >
          <ul className="ruleList">
            <li>
              <span className="ruleList__term">Stop peeing "just in case"</span>
              <p className="small muted">
                An occasional pre-journey pee is sensible. Doing it habitually at
                low volumes trains the bladder to signal urgency earlier and
                shrinks your functional capacity. Go when you need to, not when
                you might.
              </p>
            </li>
            <li>
              <span className="ruleList__term">Do not strain, and do not rush</span>
              <p className="small muted">
                Pushing works against the mechanism — the pelvic floor has to
                relax for the bladder to empty. Straining also aggravates
                haemorrhoids and prolapse. Give it the twenty to thirty seconds
                it takes.
              </p>
            </li>
            <li>
              <span className="ruleList__term">Sit or stand relaxed, and do not hover</span>
              <p className="small muted">
                Feet supported, shoulders down, jaw unclenched. Hovering over a
                public seat keeps the pelvic floor engaged and leaves urine
                behind. Cover the seat instead.
              </p>
            </li>
            <li>
              <span className="ruleList__term">Train the pelvic floor properly</span>
              <p className="small muted">
                Pelvic floor muscle training has solid evidence for stress
                incontinence and helps urgency too, in men as well as women. It
                needs months rather than days, and a pelvic health
                physiotherapist is worth the referral.
              </p>
            </li>
            <li>
              <span className="ruleList__term">Shift fluids earlier for nocturia</span>
              <p className="small muted">
                Keep the total the same but front-load the day and taper in the
                two to three hours before bed. If your ankles swell, elevating
                your legs in the late afternoon moves that fluid before bedtime
                rather than after it.
              </p>
            </li>
            <li>
              <span className="ruleList__term">Trim the irritants, gradually</span>
              <p className="small muted">
                If urgency is the problem, cut caffeine and alcohol for two weeks
                and see what changes. Fizzy drinks, artificial sweeteners and
                very acidic drinks bother some people. Reduce gradually — abrupt
                caffeine withdrawal brings its own headaches.
              </p>
            </li>
          </ul>
        </Split>
      </Section>

      <Section id="faq">
        <Split
          aside={
            <>
              <p className="eyebrow">Questions</p>
              <h2 className="sectionTitle">Things people actually ask</h2>
            </>
          }
        >
          <FaqList items={peeFaqs} />
        </Split>
      </Section>
    </>
  )
}
