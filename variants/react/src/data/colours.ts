import type { StoolColour, UrineColour } from './types'

/* Swatch inks below were chosen by computing the WCAG contrast ratio of
   #141210 and #FFFDF8 against each swatch and keeping the winner. Every pair
   clears 4.5:1 — the lowest is 4.59:1 (dark honey). */

export const urineColours: UrineColour[] = [
  {
    id: 'pale-straw',
    label: 'Pale straw',
    swatch: '#f7e07a',
    swatchInk: '#141210',
    causes:
      'Well hydrated. This is what most of your day should look like — pale yellow, not water-clear.',
    action: 'Nothing to do.',
    severity: 'ok',
  },
  {
    id: 'neon',
    label: 'Neon yellow',
    swatch: '#e8f230',
    swatchInk: '#141210',
    causes:
      'Riboflavin (vitamin B2) from a multivitamin or B-complex, passing straight through.',
    action: 'Harmless. It means the supplement is more than you needed.',
    severity: 'ok',
  },
  {
    id: 'amber',
    label: 'Amber',
    swatch: '#d9a520',
    swatchInk: '#141210',
    causes:
      'Concentrated urine. Expected first thing in the morning; at other times it usually means you are behind on fluids.',
    action: 'Have a drink and check again in a couple of hours.',
    severity: 'watch',
  },
  {
    id: 'dark-honey',
    label: 'Dark honey',
    swatch: '#9a6b1f',
    swatchInk: '#FFFDF8',
    causes:
      'Marked dehydration — or bilirubin from a liver or bile duct problem, especially alongside pale stools, itchy skin or yellowing eyes.',
    action: 'If it does not clear after rehydrating, see a doctor.',
    severity: 'watch',
  },
  {
    id: 'orange',
    label: 'Orange',
    swatch: '#e8802a',
    swatchInk: '#141210',
    causes:
      'Dehydration, rifampicin, phenazopyridine, a lot of carrot or beta-carotene — or bile duct obstruction.',
    action: 'Check your medicines first, then your fluids.',
    severity: 'watch',
  },
  {
    id: 'pink-red',
    label: 'Pink or red',
    swatch: '#c8395a',
    swatchInk: '#FFFDF8',
    causes:
      'Beetroot, rhubarb and blackberries do this in some people. So does blood from anywhere in the urinary tract.',
    action:
      'Get seen. Never assume it was the beetroot — one painless episode is enough to warrant investigation.',
    severity: 'urgent',
  },
  {
    id: 'cola',
    label: 'Cola brown',
    swatch: '#5a3417',
    swatchInk: '#FFFDF8',
    causes:
      'Myoglobin from muscle breakdown (rhabdomyolysis, often after extreme exertion or a crush injury), liver disease, or certain medicines.',
    action:
      'Get seen — urgently if it follows heavy exertion or comes with muscle pain.',
    severity: 'urgent',
  },
  {
    id: 'green-blue',
    label: 'Green or blue',
    swatch: '#2f9e7a',
    swatchInk: '#141210',
    causes:
      'Food dyes, methylene blue, propofol, amitriptyline. Rarely a Pseudomonas infection.',
    action: 'Almost always harmless, but mention it.',
    severity: 'watch',
  },
  {
    id: 'cloudy',
    label: 'Cloudy or milky',
    swatch: '#e6e6df',
    swatchInk: '#141210',
    causes:
      'Infection, or phosphate crystals after a big meal (harmless). Rarely lymph fluid in the urine.',
    action: 'Get seen if it comes with burning or a fever.',
    severity: 'watch',
  },
  {
    id: 'foamy',
    label: 'Foamy',
    swatch: '#f2f0e4',
    swatchInk: '#141210',
    causes:
      'A fast stream froths briefly and harmlessly. Foam that lingers, repeatedly, suggests protein in the urine — which points at the kidneys.',
    action: 'Ask for a urine dipstick.',
    severity: 'watch',
  },
]

export const stoolColours: StoolColour[] = [
  {
    id: 'brown',
    label: 'Mid to dark brown',
    swatch: '#6B4423',
    swatchInk: '#FFFDF8',
    cause: 'Normal. Bile pigment fully processed over a typical transit time.',
    severity: 'ok',
  },
  {
    id: 'light-brown',
    label: 'Light or yellow-brown',
    swatch: '#A97C50',
    swatchInk: '#141210',
    cause:
      'Normal variant. Often faster transit, or a lot of dairy or fat in the last day.',
    severity: 'ok',
  },
  {
    id: 'green',
    label: 'Bright or dark green',
    swatch: '#3F7A2E',
    swatchInk: '#FFFDF8',
    cause:
      'Fast transit — bile has not been fully broken down. Also leafy greens, iron tablets and food colouring. Harmless unless it comes with persistent diarrhoea.',
    severity: 'ok',
  },
  {
    id: 'greasy',
    label: 'Yellow, greasy, floating',
    swatch: '#D9C15A',
    swatchInk: '#141210',
    cause:
      'Fat malabsorption — bulky, foul-smelling and hard to flush. Think coeliac disease, pancreatic insufficiency, giardia. Needs testing if it lasts more than a week or two.',
    severity: 'watch',
  },
  {
    id: 'pale',
    label: 'Pale, clay or chalk-white',
    swatch: '#DED6C3',
    swatchInk: '#141210',
    cause:
      'Bile is not reaching the bowel — possible bile duct obstruction or liver disease. Especially significant alongside dark urine, yellowing eyes or itching.',
    severity: 'urgent',
  },
  {
    id: 'black',
    label: 'Black, tarry, sticky',
    swatch: '#1E1B18',
    swatchInk: '#FFFDF8',
    cause:
      'Digested blood from the upper gut — melaena. This is an emergency. Iron tablets, bismuth, liquorice and blueberries also blacken stool, but that kind is not tarry, sticky or foul-smelling. If you are in any doubt, treat it as bleeding.',
    severity: 'urgent',
  },
  {
    id: 'red',
    label: 'Bright red',
    swatch: '#B3241F',
    swatchInk: '#FFFDF8',
    cause:
      'Fresh blood. Usually haemorrhoids or a fissure — but also polyps, colitis and bowel cancer. Beetroot mimics it. New rectal bleeding always gets checked.',
    severity: 'urgent',
  },
  {
    id: 'silver',
    label: 'Silver or aluminium',
    swatch: '#B9BCC0',
    swatchInk: '#141210',
    cause:
      'Rare. Pale fat-laden stool mixed with upper-gut blood, suggesting biliary obstruction with bleeding. Get assessed promptly.',
    severity: 'urgent',
  },
]
