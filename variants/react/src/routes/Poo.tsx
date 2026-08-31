import { stoolColours } from '../data/colours'
import { bowelTerms, pooFaqs, pooFigures } from '../data/reference'
import { Callout, FaqList, Figures } from '../components/Bits'
import { BristolReference } from '../components/BristolPicker'
import { ColourChart } from '../components/ColourChart'
import { Scroller, Section, Split } from '../components/Layout'
import { hrefFor } from '../router'
import type { HeadingRef } from '../router'

export function Poo({ headingRef }: { headingRef: HeadingRef }) {
  return (
    <>
      <div className="shell">
        <div className="hero">
          <p className="eyebrow">Chapter two</p>
          <h1 className="pageTitle" ref={headingRef} tabIndex={-1}>
            Pooing: the Bristol scale, and why daily is not the target
          </h1>
          <div className="prose">
            <p className="lede">
              Three times a day to three times a week. About 95% of people sit
              inside that band, and there is no health benefit to forcing
              yourself towards a daily average you do not naturally have. What
              matters is whether it is soft, easy to pass, and unchanged for you.
            </p>
          </div>
        </div>
      </div>

      <Section id="numbers">
        <Split
          aside={
            <>
              <p className="eyebrow">Baseline</p>
              <h2 className="sectionTitle">The numbers, plainly</h2>
              <div className="prose small muted">
                <p>
                  The normal range is wide because bowel frequency is set by
                  diet, fibre, fluid, activity, hormones and your own gut — not
                  by a rule someone made up.
                </p>
              </div>
            </>
          }
        >
          <div className="stack">
            <Figures items={pooFigures} />
            <div className="prose">
              <p>
                Stool weight tracks fibre intake closely. Around 100–150 g a day
                is typical on a UK or similar diet. Populations eating 50 g or
                more of fibre a day routinely produce 300–500 g a day, with
                shorter transit and softer stool. That single fact is the
                clearest explanation for why constipation is common here and rare
                elsewhere.
              </p>
            </div>
            <div className="cards cards--2">
              <article className="card">
                <h3 className="card__title">Consistency beats count</h3>
                <div className="prose small">
                  <p>
                    Going three times a week with soft, easily passed stool and
                    no straining is normal. Going daily with hard pellets and ten
                    minutes of effort is constipation. If you remember one thing
                    from this page, remember that the shape and the ease matter
                    more than the tally.
                  </p>
                </div>
              </article>
              <article className="card">
                <h3 className="card__title">Two minutes, not fifteen</h3>
                <div className="prose small">
                  <p>
                    A normal bowel movement takes a couple of minutes. If you are
                    routinely sitting for ten or fifteen, that is the phone, not
                    the bowel. Prolonged sitting and straining on an open seat
                    raises pressure on the anal cushions and is associated with
                    haemorrhoids. Leave when you are done and come back later if
                    nothing happens.
                  </p>
                </div>
              </article>
            </div>
            <Callout title="You can measure your own transit time">
              <p>
                Eat a marker that survives digestion — a decent portion of
                sweetcorn, or blue food colouring in a meal — note the time, then
                note when it first appears and when it has fully cleared. First
                appearance under about 10 hours suggests fast transit; nothing by
                72 hours suggests slow. It is crude, but it is a real
                measurement, and it beats guessing.
              </p>
            </Callout>
          </div>
        </Split>
      </Section>

      <Section id="bristol">
        <Split
          aside={
            <>
              <p className="eyebrow">The scale</p>
              <h2 className="sectionTitle">All seven Bristol types</h2>
              <div className="prose small muted">
                <p>
                  The standard clinical shorthand for stool form, and a decent
                  proxy for transit time. Types 1–2 mean stool sat in the colon
                  long enough for water to be reabsorbed; types 6–7 mean it moved
                  through too fast.
                </p>
                <p>
                  Most people vary by a type or two across a week. That is fine.
                  What matters is where your centre of gravity sits, and whether
                  it has moved.
                </p>
                <p>
                  <a className="inlineLink" href={hrefFor('/log')}>
                    Record yours in the logbook
                  </a>{' '}
                  and it will work out your median for you.
                </p>
              </div>
            </>
          }
        >
          <BristolReference />
        </Split>
      </Section>

      <Section id="colour">
        <Split
          aside={
            <>
              <p className="eyebrow">Interactive</p>
              <h2 className="sectionTitle">What the colour means</h2>
              <div className="prose small muted">
                <p>
                  Normal stool is brown because bile pigments break down on the
                  way through. Most colour changes are food or transit speed. Two
                  exceptions matter enormously: pale clay-coloured, and black
                  tarry. Tap any swatch.
                </p>
              </div>
            </>
          }
        >
          <ColourChart
            items={stoolColours}
            label="Stool colours"
            idPrefix="stool-colour"
          />
        </Split>
      </Section>

      <Section id="terms">
        <Split
          aside={
            <>
              <p className="eyebrow">Vocabulary</p>
              <h2 className="sectionTitle">The words doctors use, with thresholds</h2>
              <div className="prose small muted">
                <p>
                  These have specific definitions. Using them accurately makes an
                  appointment far more productive than "things have been a bit
                  off".
                </p>
              </div>
            </>
          }
        >
          <Scroller label="Clinical definitions of bowel symptoms">
            <table>
              <caption>
                Clinical definitions of bowel symptoms and their thresholds
              </caption>
              <thead>
                <tr>
                  <th scope="col">Term</th>
                  <th scope="col">What it means</th>
                  <th scope="col">Definition or threshold</th>
                </tr>
              </thead>
              <tbody>
                {bowelTerms.map((t) => (
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

      <Section id="too-often">
        <Split
          aside={
            <>
              <p className="eyebrow">Going too often</p>
              <h2 className="sectionTitle">Three different problems, three different fixes</h2>
              <div className="prose small muted">
                <p>
                  <strong>Frequency</strong> is passing formed stool more often
                  than you used to. <strong>Diarrhoea</strong> is loose or liquid
                  stool, three or more times in 24 hours.{' '}
                  <strong>Urgency</strong> is the alarming sense that you have
                  very little warning. Saying which one you have is genuinely
                  useful information.
                </p>
              </div>
            </>
          }
        >
          <div className="cards cards--2">
            <article className="card">
              <h3 className="card__title">Bile acid malabsorption</h3>
              <div className="prose small">
                <p>
                  Very common and badly underdiagnosed — a substantial share of
                  people labelled IBS-D actually have this. The signature is
                  urgent, watery, sometimes yellow diarrhoea shortly after eating,
                  often worse after fatty meals, and it classically appears after
                  gallbladder removal or ileal Crohn's. It is specifically
                  testable and specifically treatable, which is why it is worth
                  naming to your doctor.
                </p>
              </div>
            </article>
            <article className="card">
              <h3 className="card__title">Coeliac disease</h3>
              <div className="prose small">
                <p>
                  Affects roughly 1 in 100 people, and most remain undiagnosed.
                  Loose stool, bloating, fatigue, iron deficiency, sometimes
                  weight loss. Get tested <em>before</em> cutting out gluten —
                  testing on a gluten-free diet gives false negatives, and you
                  then have to eat it again to find out.
                </p>
              </div>
            </article>
            <article className="card">
              <h3 className="card__title">Lactose and fructose</h3>
              <div className="prose small">
                <p>
                  Undigested sugar draws water into the bowel and gets fermented:
                  bloating, wind and loose stool one to several hours after the
                  trigger. Lactose intolerance is very common in adults
                  worldwide. Fructose is the one people miss — fruit juice,
                  apples, pears, honey.
                </p>
              </div>
            </article>
            <article className="card">
              <h3 className="card__title">Medicines and sweeteners</h3>
              <div className="prose small">
                <p>
                  Frequent culprits: metformin, magnesium supplements and
                  antacids, antibiotics, SSRIs, and chronic laxative use. Sugar
                  alcohols — sorbitol, xylitol, mannitol, maltitol — in sugar-free
                  gum, sweets and drinks are a classic hidden cause. Check labels
                  before assuming your gut has turned on you.
                </p>
              </div>
            </article>
            <article className="card">
              <h3 className="card__title">Inflammatory bowel disease</h3>
              <div className="prose small">
                <p>
                  Crohn's disease and ulcerative colitis. Suspect it with blood or
                  mucus, night-time symptoms that wake you, weight loss, fever,
                  mouth ulcers, joint pain or raised inflammatory markers. This is
                  not the same as IBS and should not be managed as though it were.
                </p>
              </div>
            </article>
            <article className="card">
              <h3 className="card__title">After an infection</h3>
              <div className="prose small">
                <p>
                  Acute gastroenteritis usually settles in days. But a meaningful
                  minority develop persistent IBS-type symptoms for months
                  afterwards, with the gut behaving differently even though the
                  infection has cleared. Diarrhoea lasting more than 14 days after
                  an infection deserves stool testing rather than waiting it out.
                </p>
              </div>
            </article>
          </div>
        </Split>
      </Section>

      <Section id="too-little">
        <Split
          aside={
            <>
              <p className="eyebrow">Going too little</p>
              <h2 className="sectionTitle">Constipation is about difficulty, not the calendar</h2>
              <div className="prose small muted">
                <p>
                  Not going daily is not a problem if it is comfortable, easy and
                  unchanged for you. When constipation is real, the causes are
                  usually mundane and fixable.
                </p>
              </div>
            </>
          }
        >
          <div className="stack">
            <ul className="ruleList">
              <li>
                <span className="ruleList__term">Not enough fibre</span>
                <p className="small muted">
                  The recommended intake is around 30 g a day. Typical UK and US
                  intake is roughly 15–20 g. That gap explains a very large share
                  of constipation on its own.
                </p>
              </li>
              <li>
                <span className="ruleList__term">Fibre without the fluid</span>
                <p className="small muted">
                  Bulk with no water is harder to move, not easier. Adding fibre
                  and not adding fluid can make things worse.
                </p>
              </li>
              <li>
                <span className="ruleList__term">Ignoring the urge</span>
                <p className="small muted">
                  Repeatedly overriding the call — no time, no private toilet, a
                  job that does not allow it — lets the rectum reabsorb water and
                  blunts the reflex over time.
                </p>
              </li>
              <li>
                <span className="ruleList__term">Medicines</span>
                <p className="small muted">
                  Opioid painkillers are the strongest offender and constipate
                  reliably rather than occasionally. Also iron supplements,
                  anticholinergics, some antidepressants, calcium channel
                  blockers, and aluminium- or calcium-containing antacids.
                </p>
              </li>
              <li>
                <span className="ruleList__term">Thyroid</span>
                <p className="small muted">
                  An underactive thyroid slows transit, alongside fatigue, cold
                  intolerance, dry skin and weight gain. A simple blood test
                  settles it.
                </p>
              </li>
              <li>
                <span className="ruleList__term">Pelvic floor dyssynergia</span>
                <p className="small muted">
                  The pelvic floor and anal sphincter contract when they should
                  relax, so stool cannot be evacuated even when it is soft.
                  Suspect it with prolonged straining, a need for manual help, or
                  a sense of blockage despite soft stool. Fibre does not fix this
                  — biofeedback physiotherapy does, and it works well.
                </p>
              </li>
            </ul>
            <Callout title="New constipation in an adult is a different question" urgent>
              <p>
                Lifelong mild constipation is one thing. Constipation that is
                genuinely new — especially over the age of 50, or alongside
                bleeding, weight loss, vomiting or abdominal swelling — needs a
                medical assessment rather than a fibre supplement.
              </p>
            </Callout>
          </div>
        </Split>
      </Section>

      <Section id="helps">
        <Split
          aside={
            <>
              <p className="eyebrow">Practical</p>
              <h2 className="sectionTitle">What actually helps</h2>
            </>
          }
        >
          <div className="cards cards--2">
            <article className="card">
              <h3 className="card__title">The right kind of fibre</h3>
              <div className="prose small">
                <p>
                  Soluble fibre — oats, psyllium, beans, apples, linseed — forms a
                  gel, holds water and softens hard stool. It also firms up loose
                  stool, which is why it helps in both directions. Insoluble fibre
                  — wheat bran, skins, nuts — adds bulk and speeds transit but can
                  aggravate bloating in IBS. Aim for 30 g a day in total.
                </p>
              </div>
            </article>
            <article className="card">
              <h3 className="card__title">Psyllium first, slowly</h3>
              <div className="prose small">
                <p>
                  Of the fibre supplements, psyllium (ispaghula) has the best
                  evidence for both constipation and IBS. Start small, increase
                  over two to three weeks, take it with a full glass of water.
                  Ramping too fast is the single commonest reason people abandon
                  fibre — the wind and bloating are a dosing problem, not a
                  verdict.
                </p>
              </div>
            </article>
            <article className="card">
              <h3 className="card__title">Use the gastrocolic reflex</h3>
              <div className="prose small">
                <p>
                  Eating triggers colonic contractions, strongest in the morning
                  and after the largest meal. Give yourself an unhurried ten to
                  twenty minutes after breakfast, at the same time each day, and
                  sit whether or not you feel much urge. Training a consistent
                  window works better than most supplements.
                </p>
              </div>
            </article>
            <article className="card">
              <h3 className="card__title">A footstool</h3>
              <div className="prose small">
                <p>
                  Raising your knees above your hips and leaning forward with
                  elbows on knees relaxes the puborectalis muscle and straightens
                  the anorectal angle. Small studies show less straining and
                  faster evacuation. It is one of the few genuinely effective
                  bathroom purchases.
                </p>
              </div>
            </article>
            <article className="card">
              <h3 className="card__title">Movement</h3>
              <div className="prose small">
                <p>
                  Regular walking and general activity measurably improve
                  constipation and transit time. It does not need to be exercise
                  in any formal sense — consistent daily movement is what shows
                  up in the studies. Prolonged bed rest or a fully sedentary week
                  shows up in the bowel quickly.
                </p>
              </div>
            </article>
            <article className="card">
              <h3 className="card__title">Leave the phone outside</h3>
              <div className="prose small">
                <p>
                  Phone use extends toilet sitting well past the couple of minutes
                  needed, and longer sitting with straining is associated with
                  haemorrhoids. This is the least medical and most effective
                  advice on the page.
                </p>
              </div>
            </article>
          </div>
        </Split>
      </Section>

      <Section id="watch">
        <Split
          aside={
            <>
              <p className="eyebrow">Worth stating flatly</p>
              <h2 className="sectionTitle">Being young is not reassurance</h2>
            </>
          }
        >
          <div className="prose">
            <p>
              Bowel cancer incidence in adults under 50 has been rising steadily
              for several decades across many countries. Being in your twenties or
              thirties does not take bowel symptoms off the table — and it is not
              a reason for a clinician to dismiss them either. Younger patients
              are diagnosed later on average, partly because both they and their
              doctors attribute symptoms to something else for months.
            </p>
            <p>
              The second thing worth saying plainly: haemorrhoids are extremely
              common, which means plenty of people with something else also have
              haemorrhoids. Finding piles excludes nothing. If you are unsure,
              being checked and reassured costs very little.{' '}
              <a className="inlineLink" href={hrefFor('/red-flags')}>
                The full list of warning signs lives here
              </a>
              .
            </p>
          </div>
        </Split>
      </Section>

      <Section id="faq">
        <Split
          aside={
            <>
              <p className="eyebrow">Questions</p>
              <h2 className="sectionTitle">Common questions</h2>
            </>
          }
        >
          <FaqList items={pooFaqs} />
        </Split>
      </Section>
    </>
  )
}
