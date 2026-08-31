import type { BristolType } from './types'

/** The Bristol Stool Scale. Types 1-2 mean stool sat long enough for the
 *  colon to reabsorb water; 6-7 mean it moved through too fast. */
export const bristolScale: BristolType[] = [
  {
    type: 1,
    name: 'Separate hard lumps',
    form: 'Like nuts. Difficult to pass, often one at a time.',
    meaning:
      'Severe constipation. The colon has held on long enough to pull most of the water out. Needs fibre, fluid and a look at your medicines — and a review if it is your normal.',
    transit: 'Very slow',
    severity: 'urgent',
  },
  {
    type: 2,
    name: 'Lumpy sausage',
    form: 'Sausage-shaped, but visibly made of lumps stuck together.',
    meaning:
      'Mild constipation. This is the type people report while insisting they are regular. Common on low fibre or when you are behind on fluids.',
    transit: 'Slow',
    severity: 'watch',
  },
  {
    type: 3,
    name: 'Cracked sausage',
    form: 'Sausage-shaped with cracks across the surface.',
    meaning:
      'Normal. Slightly firm, but it passes easily and without straining. Nothing to fix here.',
    transit: 'Normal',
    severity: 'ok',
  },
  {
    type: 4,
    name: 'Smooth and soft',
    form: 'Like a sausage or a snake, smooth all the way along.',
    meaning:
      'The target. Minimal effort, little residue, in and out in a couple of minutes.',
    transit: 'Normal',
    severity: 'ok',
  },
  {
    type: 5,
    name: 'Soft blobs',
    form: 'Soft blobs with clear-cut edges, passed easily.',
    meaning:
      'Tending loose. Often a sign of too little soluble fibre — the kind that adds form. This is not diarrhoea.',
    transit: 'Slightly fast',
    severity: 'watch',
  },
  {
    type: 6,
    name: 'Mushy, ragged edges',
    form: 'Fluffy pieces with ragged edges. Mushy rather than liquid.',
    meaning:
      'Mild diarrhoea. An odd day is unremarkable. Several weeks of it is worth investigating.',
    transit: 'Fast',
    severity: 'watch',
  },
  {
    type: 7,
    name: 'Entirely liquid',
    form: 'Watery, no solid pieces at all.',
    meaning:
      'Diarrhoea. Keep fluid and salts up. Liquid stool that is bloody, that wakes you at night, or that lasts beyond a week needs assessment.',
    transit: 'Very fast',
    severity: 'urgent',
  },
]

export const bristolByType = (t: number): BristolType | undefined =>
  bristolScale[t - 1]
