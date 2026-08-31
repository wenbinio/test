import type { ClinicalTerm, Faq, Figure } from './types'

export const peeFigures: Figure[] = [
  { value: '6–8', label: 'typical pees a day (4–10 is still ordinary)' },
  { value: '300–500', unit: 'mL', label: 'comfortable bladder capacity per void' },
  { value: '800–2000', unit: 'mL', label: 'urine passed in 24 hours on about 2 L of fluid' },
  { value: '20–30', unit: 's', label: 'how long a full void actually takes' },
  { value: '0–1', label: 'night-time trips most adults make' },
  { value: '~20', unit: '%', label: 'of your water intake that arrives as food' },
]

export const pooFigures: Figure[] = [
  { value: '3×/day – 3×/week', label: 'the accepted normal range — about 95% of people' },
  { value: '100–150', unit: 'g', label: 'typical daily stool weight on a Western diet' },
  { value: '10–73', unit: 'h', label: 'whole-gut transit time, median around 30–40 h' },
  { value: '~30', unit: 'g', label: 'recommended daily fibre; typical UK intake is 15–20 g' },
]

export const urinaryTerms: ClinicalTerm[] = [
  { term: 'Polyuria', system: 'urinary', meaning: 'An abnormally large total volume of urine.', threshold: 'More than 3 L in 24 hours, or more than about 40 mL per kg of body weight per 24 hours.' },
  { term: 'Oliguria', system: 'urinary', meaning: 'Too little urine.', threshold: 'Under roughly 400–500 mL in 24 hours.' },
  { term: 'Anuria', system: 'urinary', meaning: 'Essentially no urine at all.', threshold: 'Under 100 mL in 24 hours. An emergency.' },
  { term: 'Frequency', system: 'urinary', meaning: 'Going more often than expected, regardless of how much comes out.', threshold: 'More than 8 voids in 24 hours.' },
  { term: 'Nocturia', system: 'urinary', meaning: 'Waking from sleep specifically to pee.', threshold: 'Waking once counts. Two or more times a night is where it is generally treated as clinically relevant.' },
  { term: 'Nocturnal polyuria', system: 'urinary', meaning: 'A disproportionate share of the day’s urine made overnight.', threshold: 'More than 20–33% of 24-hour output overnight — the higher figure is normal in older adults.' },
  { term: 'Urgency', system: 'urinary', meaning: 'A sudden, hard-to-defer need to go.', threshold: 'No volume threshold. It is the compulsion that defines it.' },
  { term: 'Hesitancy', system: 'urinary', meaning: 'Difficulty starting, or a long wait before flow begins.', threshold: 'No formal number. Usually paired with a weak or stop-start stream.' },
  { term: 'Dysuria', system: 'urinary', meaning: 'Pain, burning or stinging when you pee.', threshold: 'Any occurrence is worth attention, especially with fever or back pain.' },
]

export const bowelTerms: ClinicalTerm[] = [
  { term: 'Diarrhoea', system: 'bowel', meaning: 'Loose or liquid stool, more often than normal for you.', threshold: 'Three or more loose or liquid stools in 24 hours. Acute is under 14 days, persistent 14–29 days, chronic four weeks or more. Loose form matters more than the count — frequent formed stool is frequency, not diarrhoea.' },
  { term: 'Constipation (Rome IV)', system: 'bowel', meaning: 'A symptom cluster, not a stool count.', threshold: 'At least two of: straining; lumpy or hard stools (Bristol 1–2); a sense of incomplete evacuation; a sense of blockage; needing manual help; fewer than three spontaneous bowel movements a week. Each present in more than a quarter of movements, for at least three months, with symptoms starting at least six months ago.' },
  { term: 'Tenesmus', system: 'bowel', meaning: 'A persistent, painful feeling that you need to go when the rectum is empty.', threshold: 'Associated with proctitis, inflammatory bowel disease and rectal masses. Persistent tenesmus gets assessed.' },
  { term: 'Faecal incontinence', system: 'bowel', meaning: 'Involuntary loss of solid or liquid stool.', threshold: 'No threshold — any is worth raising. Common, under-reported, and often treatable: pelvic floor causes, sphincter injury after childbirth, and overflow from impacted constipation are all addressable.' },
  { term: 'Steatorrhoea', system: 'bowel', meaning: 'Fat in the stool.', threshold: 'Pale, bulky, greasy, foul-smelling, floats, hard to flush, sometimes with an oily film. Suggests fat malabsorption and needs investigating.' },
  { term: 'Melaena', system: 'bowel', meaning: 'Black, tarry, sticky stool from digested blood.', threshold: 'Indicates upper gastrointestinal bleeding. A medical emergency, particularly with dizziness, breathlessness or vomiting blood.' },
  { term: 'Haematochezia', system: 'bowel', meaning: 'Fresh red blood with, on, or around the stool.', threshold: 'Usually from lower down. Benign causes are common, but visible rectal bleeding is never simply assumed away.' },
]

export const waterIntake = [
  { source: 'EFSA (Europe), total water', women: '~2.0 L/day', men: '~2.5 L/day' },
  { source: 'IOM / NASEM (US), total water', women: '~2.7 L/day', men: '~3.7 L/day' },
]

export const peeFaqs: Faq[] = [
  { q: 'Is holding your pee bad for you?', a: 'Occasionally, no — the bladder is built to store urine. Habitually and to extremes, yes: regularly ignoring the urge for hours blunts your sense of being full and can leave residual urine behind, which raises infection risk. There is no evidence that a normal delay ruptures anything in a healthy adult. Go within a reasonable time of a proper urge, and do not plan your day around avoiding toilets.' },
  { q: 'Does completely clear urine mean I am winning?', a: 'No. Persistently colourless urine usually means you are drinking more than you need, and occasionally it flags a condition where the kidneys cannot concentrate urine at all. Pale yellow is the target, not water-clear. Over-drinking is not a virtue.' },
  { q: 'How many times a night is too many?', a: 'Once is common and usually unremarkable, particularly over 60. Two or more times a night, most nights, is where nocturia gets treated as worth investigating — not because it is dangerous in itself, but because it wrecks sleep and usually has a findable cause: an enlarged prostate, poorly controlled diabetes, sleep apnoea, heart failure, evening diuretic timing, or a large drink before bed. The threshold that matters most is whether it bothers you.' },
  { q: 'Does “eight glasses a day” have any basis?', a: 'Not really. It is usually traced to a 1945 US Food and Nutrition Board note suggesting about 2.5 litres of water a day — which went on to say that most of that quantity is contained in prepared foods. The second sentence got dropped and a rule was born. Current adequate-intake figures are around 2.0 L for women and 2.5 L for men of total water per day in Europe, and 2.7 L and 3.7 L in the US, food included. Thirst plus pale-yellow urine beats counting glasses.' },
  { q: 'Does cranberry juice prevent urinary infections?', a: 'The evidence is weak and mixed, and it is fair to say the question is not settled. Cranberry proanthocyanidins do reduce bacterial adhesion in the laboratory. Trials in humans are less impressive: reviews suggest a modest reduction in recurrent infections for women with recurrent UTIs and for children, and little or no benefit for older adults, catheterised patients or the general population. Juice in particular is sugary and inconsistently dosed. It is not a treatment for an active infection.' },
  { q: 'Why do I pee more in cold weather?', a: 'Cold diuresis. When you are cold, blood vessels near the skin constrict to conserve heat, pushing more blood into the core and raising central pressure. The kidneys read that as excess volume and get rid of fluid. You also sweat far less in winter, so more of what you drink leaves as urine.' },
]

export const pooFaqs: Faq[] = [
  { q: 'Do I have to go every day?', a: 'No. Three times a day to three times a week is the normal range, and about 95% of people fall inside it. If your stool is soft, passes easily and your pattern has not changed, going every second or third day is entirely normal.' },
  { q: 'Is it bad to hold it in?', a: 'Occasionally, no — everyone does. Habitually, yes. When stool stays in the rectum, water keeps being reabsorbed and it gets harder to pass, and repeatedly overriding the urge blunts the reflex that tells you to go. Chronic postponement is a genuine and common cause of constipation.' },
  { q: 'Is blood always haemorrhoids?', a: 'No, and this assumption causes more delay than any other. Haemorrhoids and fissures are the commonest causes of fresh red bleeding, but polyps, colitis and bowel cancer look identical from the toilet bowl — and having haemorrhoids does not stop you also having something else. New rectal bleeding gets assessed, especially over 40, if it lasts beyond a few days, or if it comes with a change in habit or weight loss.' },
  { q: 'How long should I be on the toilet?', a: 'A couple of minutes. If nothing has happened in about five, get up and come back when the urge returns rather than straining. Extended sitting — usually driven by a phone — combined with straining is associated with haemorrhoids. Sitting longer does not help the bowel work.' },
  { q: 'Do probiotics help?', a: 'The evidence is mixed and highly strain-specific. Some strains show modest benefit in some conditions, particularly antibiotic-associated diarrhoea. Most general supermarket products have little or no evidence for general bowel health. If you try one, give a single product four weeks and stop if nothing changes — and fix fibre, fluid and routine first, because those are where the effect actually is.' },
  { q: 'Can I measure my own transit time?', a: 'Yes, crudely but genuinely. Eat a marker that survives digestion — a decent portion of sweetcorn, or blue food colouring in a meal — note the time, then note when it first appears and when it has fully cleared. First appearance under about 10 hours suggests fast transit. Nothing by 72 hours suggests slow. It beats guessing.' },
]
