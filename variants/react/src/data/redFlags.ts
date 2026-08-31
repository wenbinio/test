import type { RedFlag } from './types'

/** Every warning sign on the site, in one list, tagged so the triage page can
 *  filter by how fast you need to act and by which system it belongs to.
 *  `critical: true` marks the ones that get pulled out and shown first. */
export const redFlags: RedFlag[] = [
  /* ---------- GO NOW ---------- */
  {
    id: 'retention',
    timeframe: 'now',
    system: 'urinary',
    critical: true,
    symptom: 'You cannot pass urine at all and your bladder feels painfully full',
    detail:
      'Acute urinary retention. The bladder has to be drained, and a blocked bladder damages kidneys. It does not resolve on its own. Emergency department now.',
  },
  {
    id: 'haematuria-clots',
    timeframe: 'now',
    system: 'urinary',
    critical: true,
    symptom: 'Visible blood in your urine with clots, and trouble passing it',
    detail:
      'Clots can block the outflow. Go to an emergency department. Any visible blood in urine needs investigating even without clots — see the "within days" list.',
  },
  {
    id: 'melaena',
    timeframe: 'now',
    system: 'bowel',
    critical: true,
    symptom:
      'Black, tarry, sticky, strongly foul-smelling poo — or vomiting blood or something like coffee grounds',
    detail:
      'Melaena: digested blood from the upper gut. This is a medical emergency, same hour. Iron tablets and bismuth blacken stool without making it tarry or sticky. If you cannot tell the difference, assume bleeding and go.',
  },
  {
    id: 'cauda-equina',
    timeframe: 'now',
    system: 'both',
    critical: true,
    symptom:
      'New trouble passing urine or new loss of bladder or bowel control, together with numbness around the groin, genitals, buttocks or inner thighs — or new leg weakness or severe back pain',
    detail:
      'This pattern is cauda equina syndrome and it is a surgical emergency. Delay costs permanent bladder, bowel and sexual function. Go to an emergency department the same hour and say the words: "I think this might be cauda equina." Numbness includes not feeling the toilet paper, or not feeling urine or stool pass.',
  },
  {
    id: 'anuria',
    timeframe: 'now',
    system: 'urinary',
    symptom: 'No urine at all for 12 hours or more, painful or not',
    detail:
      'Under 100 mL in 24 hours is anuria. It needs assessing the same day, whether or not anything hurts.',
  },
  {
    id: 'urosepsis',
    timeframe: 'now',
    system: 'urinary',
    symptom:
      'Fever with shaking chills, plus pain in the flank or lower back under the ribs',
    detail:
      'A kidney infection tipping into sepsis. Same-day urgent care, not a routine appointment.',
  },
  {
    id: 'older-confusion',
    timeframe: 'now',
    system: 'urinary',
    symptom:
      'New confusion, drowsiness or a sudden change in behaviour in an older adult with urinary symptoms',
    detail:
      'In older people, infection often shows up as confusion before it shows up as a fever or burning. Treat the confusion as the warning sign.',
  },
  {
    id: 'torsion',
    timeframe: 'now',
    system: 'urinary',
    symptom: 'Sudden testicular pain, with or without swelling or vomiting',
    detail:
      'Testicular torsion. The window to save the testicle is measured in hours, not days.',
  },
  {
    id: 'stone',
    timeframe: 'now',
    system: 'urinary',
    symptom:
      'Severe flank pain radiating to the groin, coming in waves, with vomiting',
    detail:
      'Often an obstructing kidney stone. With a fever it becomes an emergency of a different order entirely.',
  },
  {
    id: 'sepsis-signs',
    timeframe: 'now',
    system: 'both',
    symptom:
      'Any urinary or bowel symptoms alongside signs of sepsis — very high or very low temperature, shivering, fast breathing or heart rate, mottled or blueish skin, not passing urine, or a rash that does not fade under a pressed glass',
    detail: 'Call your emergency number. Say the word "sepsis".',
  },
  {
    id: 'heavy-rectal',
    timeframe: 'now',
    system: 'bowel',
    symptom:
      'Heavy fresh rectal bleeding — filling the bowl, soaking through, or continuing — or any rectal bleeding with dizziness, fainting, breathlessness or a racing heart',
    detail:
      'Do not drive yourself if you feel faint. Call for an ambulance or have someone take you.',
  },
  {
    id: 'rigid-abdomen',
    timeframe: 'now',
    system: 'bowel',
    symptom:
      'Severe abdominal pain with a rigid, board-like or exquisitely tender belly',
    detail:
      'Especially if you cannot bear to be moved or touched. This needs surgical assessment now.',
  },
  {
    id: 'obstruction',
    timeframe: 'now',
    system: 'bowel',
    symptom:
      'No poo and no wind at all, with vomiting and a swollen, distended belly',
    detail: 'This pattern suggests bowel obstruction.',
  },
  {
    id: 'ischaemic',
    timeframe: 'now',
    system: 'bowel',
    symptom:
      'Sudden severe abdominal pain followed by rectal bleeding, in an older adult',
    detail:
      'Can be ischaemic colitis, where a segment of bowel loses its blood supply.',
  },
  {
    id: 'dehydration-vulnerable',
    timeframe: 'now',
    system: 'both',
    symptom:
      'Persistent vomiting and diarrhoea in a baby, a young child, a frail older person, or anyone immunosuppressed',
    detail:
      'Watch for very few wet nappies or no urine for hours, a dry mouth, no tears, sunken eyes, floppiness or difficulty rousing. Same-day assessment.',
  },
  {
    id: 'c-diff',
    timeframe: 'now',
    system: 'bowel',
    symptom:
      'Diarrhoea after recent antibiotics, with severe abdominal pain and fever',
    detail:
      'Can be Clostridioides difficile. It needs testing and treatment, not waiting out.',
  },

  /* ---------- WITHIN DAYS ---------- */
  {
    id: 'visible-blood-urine',
    timeframe: 'days',
    system: 'urinary',
    critical: true,
    symptom:
      'Visible blood in your urine — even once, even briefly, even with no pain at all',
    detail:
      'The single most important urinary warning sign. Often something benign like an infection or a stone, but it is also the commonest first sign of bladder and kidney cancer, and painless is the classic pattern. The fact that it stopped changes nothing. Expect an urgent referral for investigation.',
  },
  {
    id: 'habit-change',
    timeframe: 'days',
    system: 'bowel',
    critical: true,
    symptom:
      'A change in bowel habit lasting three weeks or more — looser, more frequent, narrower or newly constipated',
    detail:
      'Three weeks is the standard threshold for investigating bowel cancer, and it exists because waiting longer costs lives. Usually it turns out to be diet, medication or IBS. Book anyway.',
  },
  {
    id: 'rectal-bleeding',
    timeframe: 'days',
    system: 'bowel',
    critical: true,
    symptom:
      'Rectal bleeding — especially painless, or mixed through the stool rather than on the paper',
    detail:
      'Haemorrhoids and fissures are much the commonest cause, but that is a conclusion a clinician reaches after looking, not one you reach from the toilet bowl. Having piles does not stop you also having something else.',
  },
  {
    id: 'weight-loss',
    timeframe: 'days',
    system: 'both',
    symptom: 'Unintentional weight loss alongside bowel or urinary symptoms',
    detail:
      'Weight coming off without trying is a red flag at any age. Bring a number from the scales if you have one.',
  },
  {
    id: 'night-waking',
    timeframe: 'days',
    system: 'bowel',
    symptom: 'Diarrhoea or pain that wakes you from sleep',
    detail:
      'Symptoms that get you out of bed at night point away from IBS and towards inflammation or a structural cause.',
  },
  {
    id: 'anaemia',
    timeframe: 'days',
    system: 'bowel',
    symptom:
      'Iron-deficiency anaemia, or unexplained fatigue and breathlessness with bowel symptoms',
    detail:
      'Unexplained iron deficiency — especially in men and in post-menopausal women, who have no monthly blood loss to explain it — is investigated as possible slow bleeding from the gut.',
  },
  {
    id: 'family-history',
    timeframe: 'days',
    system: 'bowel',
    symptom:
      'New bowel symptoms over 40–50, or at any age with a family history of bowel cancer, polyps or inflammatory bowel disease',
    detail:
      'Both change the odds enough to change what gets tested and how quickly.',
  },
  {
    id: 'chronic-diarrhoea',
    timeframe: 'days',
    system: 'bowel',
    symptom: 'Diarrhoea lasting more than four weeks',
    detail:
      'Coeliac disease, inflammatory bowel disease, bile acid malabsorption, microscopic colitis, infection, medication, thyroid. All findable, several very treatable.',
  },
  {
    id: 'bloating',
    timeframe: 'days',
    system: 'bowel',
    symptom: 'Persistent bloating that does not come and go',
    detail:
      'Usually dietary or functional. But bloating that is persistent rather than fluctuating, with early fullness, pelvic pain or urinary urgency, is an ovarian cancer pattern in women and should be named specifically at the appointment.',
  },
  {
    id: 'mass',
    timeframe: 'days',
    system: 'bowel',
    symptom: 'A persistent lump you can feel in the abdomen or back passage',
    detail: 'Some are benign. None should be assumed to be.',
  },
  {
    id: 'faecal-incontinence',
    timeframe: 'days',
    system: 'bowel',
    symptom: 'New soiling or loss of bowel control',
    detail:
      'Sphincter injury, overflow from impacted constipation, neurological causes, pelvic surgery. Very treatable and badly under-reported. With back pain, saddle numbness or leg weakness, treat it as an emergency instead.',
  },
  {
    id: 'thin-stool',
    timeframe: 'days',
    system: 'bowel',
    symptom:
      'Persistently pencil-thin or ribbon-like stool over several weeks',
    detail:
      'A one-off narrow stool means nothing. A persistent change in calibre, especially with bleeding or a change in habit, can indicate narrowing of the bowel.',
  },
  {
    id: 'steatorrhoea',
    timeframe: 'days',
    system: 'bowel',
    symptom:
      'Pale, bulky, greasy, foul-smelling poo that floats and is hard to flush',
    detail:
      'Fat malabsorption. Coeliac disease, pancreatic exocrine insufficiency, bile acid problems, giardiasis. This needs testing, not a diet tweak.',
  },
  {
    id: 'frequency-urgency',
    timeframe: 'days',
    system: 'urinary',
    symptom: 'Unexplained frequency and urgency lasting weeks',
    detail:
      'Overactive bladder, bladder inflammation, infection, prostate enlargement, occasionally diabetes or a bladder lesion.',
  },
  {
    id: 'nocturia',
    timeframe: 'days',
    system: 'urinary',
    symptom: 'New nocturia — waking two or more times a night to pee',
    detail:
      'Prostate enlargement, heart or kidney problems, diabetes, sleep apnoea, or simply the timing of your evening diuretic. Worth sorting rather than tolerating: it wrecks sleep and usually has a findable cause.',
  },
  {
    id: 'obstructive',
    timeframe: 'days',
    system: 'urinary',
    symptom:
      'Weak stream, hesitancy, straining, dribbling at the end, or a sense of not emptying',
    detail:
      'Most often benign prostatic enlargement, but the same symptoms warrant a prostate assessment and a check that the bladder is emptying.',
  },
  {
    id: 'recurrent-uti',
    timeframe: 'days',
    system: 'urinary',
    symptom:
      'Recurrent urinary infections — two or more in six months, or three or more in a year',
    detail:
      'Needs a cause looked for rather than another round of treatment: stones, incomplete emptying, anatomy, post-menopausal changes, diabetes.',
  },
  {
    id: 'uti-man-pregnancy',
    timeframe: 'days',
    system: 'urinary',
    symptom: 'Urinary infection symptoms in a man, or in pregnancy',
    detail:
      'Both are treated as complicated by default. In pregnancy this is same-day, and even symptomless bacteria in the urine matter.',
  },
  {
    id: 'uti-not-improving',
    timeframe: 'days',
    system: 'urinary',
    symptom: 'Urinary infection symptoms not improving after 48 hours of treatment',
    detail:
      'The wrong antibiotic, a resistant organism, or something that was never a simple infection. Go back — do not sit it out.',
  },
  {
    id: 'negative-dip',
    timeframe: 'days',
    system: 'urinary',
    symptom: 'Persistent burning or bladder pain with repeatedly negative urine tests',
    detail:
      'Bladder pain syndrome, urethral irritation, a sexually transmitted infection, a gynaecological cause, or an organism the dipstick misses. "Nothing on the dip" is not the end of the story.',
  },
  {
    id: 'incontinence',
    timeframe: 'days',
    system: 'urinary',
    symptom: 'New or worsening urinary incontinence',
    detail:
      'Highly treatable and badly under-reported. Pelvic floor, prostate, neurological and medication causes are all in play.',
  },
  {
    id: 'frothy',
    timeframe: 'days',
    system: 'urinary',
    symptom: 'Persistently frothy or foamy urine',
    detail:
      'Can mean protein in the urine, an early marker of kidney disease. One froth from a fast stream is not the same as froth every day for weeks.',
  },
  {
    id: 'polyuria-thirst',
    timeframe: 'days',
    system: 'urinary',
    symptom:
      'Large volumes of urine with extreme thirst and unintentional weight loss',
    detail:
      'The classic pattern for undiagnosed diabetes. If it comes with vomiting, rapid breathing, abdominal pain or drowsiness, treat that as an emergency instead.',
  },
  {
    id: 'flank-pain',
    timeframe: 'days',
    system: 'urinary',
    symptom: 'Persistent flank or loin pain',
    detail:
      'Stones, obstruction, kidney infection or a kidney lesion. With a fever it becomes urgent.',
  },

  /* ---------- ALMOST CERTAINLY NOTHING ---------- */
  {
    id: 'morning-dark',
    timeframe: 'reassure',
    system: 'urinary',
    symptom: 'Your first pee of the day is dark and strong-smelling',
    detail:
      'You have gone seven or eight hours without a drink and your kidneys have been concentrating urine overnight. That is the system working, not a warning.',
  },
  {
    id: 'coffee-cold',
    timeframe: 'reassure',
    system: 'urinary',
    symptom: 'More trips after coffee, a beer, or a cold walk',
    detail:
      'Caffeine and alcohol are both diuretics; alcohol also suppresses the hormone that tells your kidneys to hold water. Cold constricts surface blood vessels, raises central pressure, and the kidneys shed fluid in response. All predictable.',
  },
  {
    id: 'neon-pee',
    timeframe: 'reassure',
    system: 'urinary',
    symptom: 'Your pee has gone bright fluorescent yellow',
    detail:
      'Riboflavin from a multivitamin. It is the colour of a supplement you did not need, harmlessly leaving.',
  },
  {
    id: 'asparagus',
    timeframe: 'reassure',
    system: 'urinary',
    symptom: 'Your pee smells odd after asparagus, coffee or garlic',
    detail:
      'Asparagus produces a sulphurous smell within 15–30 minutes. Whether you can smell it at all is partly genetic. Entirely harmless.',
  },
  {
    id: 'pee-after-drink',
    timeframe: 'reassure',
    system: 'urinary',
    symptom: 'You need to pee very soon after drinking',
    detail:
      'It is not the same water coming straight through. A drink raises blood volume, the kidneys release fluid already in the pipeline, and a part-full bladder makes you notice sooner. Only worth checking if it comes with constant thirst and large volumes.',
  },
  {
    id: 'not-daily',
    timeframe: 'reassure',
    system: 'bowel',
    symptom: 'You do not poo every day',
    detail:
      'Three times a day to three times a week is the normal range and roughly 95% of people sit inside it. If it is soft, easy and unchanged for you, every second or third day is normal. Daily-is-essential has no evidence behind it.',
  },
  {
    id: 'floating',
    timeframe: 'reassure',
    system: 'bowel',
    symptom: 'Your poo floats',
    detail:
      'Usually trapped gas from fibre fermenting, which is normal and can even reflect a good diet. The combination that matters is floating plus pale, greasy, foul-smelling and hard to flush.',
  },
  {
    id: 'green-poo',
    timeframe: 'reassure',
    system: 'bowel',
    symptom: 'Your poo has gone green',
    detail:
      'Fast transit means bile has not fully broken down on the way. Leafy greens, iron tablets and food colouring do it too. Harmless on its own.',
  },
  {
    id: 'coffee-poo',
    timeframe: 'reassure',
    system: 'bowel',
    symptom: 'Coffee makes you need to go',
    detail:
      'Coffee stimulates colonic activity within minutes, and it is not purely the caffeine — decaf does it too, though less. About a third of people get a reliable urge. Normal response, not a sensitive gut.',
  },
  {
    id: 'after-eating',
    timeframe: 'reassure',
    system: 'bowel',
    symptom: 'You need to go right after eating',
    detail:
      'The gastrocolic reflex: food entering the stomach triggers contractions further down. Strongest in the morning and after large meals. You can use it rather than fight it.',
  },
  {
    id: 'small-mucus',
    timeframe: 'reassure',
    system: 'bowel',
    symptom: 'A small amount of clear or white mucus',
    detail:
      'The bowel lining produces mucus constantly. Large amounts, mucus with blood, or a sudden new pattern with urgency is the version worth reporting.',
  },
  {
    id: 'gastro',
    timeframe: 'reassure',
    system: 'bowel',
    symptom:
      'Sudden diarrhoea that peaked within a day or two and is already settling',
    detail:
      'Gastroenteritis. Most adults get one or more a year, viral causes dominate, and it needs fluids and time rather than investigation — unless there is blood, high fever, severe pain, or it drags past a week.',
  },
  {
    id: 'stress-gut',
    timeframe: 'reassure',
    system: 'both',
    symptom: 'Urgency before an exam, an interview or a flight',
    detail:
      'The gut is densely wired into the nervous system. This is normal physiology, not weakness. Anxiety also amplifies attention to sensations you would otherwise not notice — which is why symptoms seem to worsen the more you monitor them.',
  },
  {
    id: 'life-change',
    timeframe: 'reassure',
    system: 'both',
    symptom:
      'Things changed when your life changed — travel, shift work, pregnancy, a new job, antibiotics, winter',
    detail:
      'Bowel and bladder habits track your life closely. A change that arrives with an obvious trigger and leaves with it is usually exactly what it looks like.',
  },
  {
    id: 'beetroot',
    timeframe: 'reassure',
    system: 'both',
    symptom: 'You ate beetroot and everything went alarming',
    detail:
      'Beetroot really does turn urine and stool red in some people. The catch is that you cannot tell beetroot from blood by looking, so this belongs on the reassurance list only when the colour clears within a day or two and nothing else is wrong.',
  },
]

export const criticalFlags = redFlags.filter((f) => f.critical)
