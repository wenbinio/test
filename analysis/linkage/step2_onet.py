#!/usr/bin/env python3
"""
STEP 2 - O*NET 30.3 element scores at the O*NET-SOC-2019 level.

Inputs : ../WorkContext.txt   (CX = Context scale 1-5 means)
         ../WorkActivities.txt (IM = Importance scale 1-5 means)
Output : onet_soc_elements.csv   one row per O*NET-SOC code with raw element means,
                                  per-construct z-composites, and the derived coupling index.

Elements (Element ID -> label):
  autonomy      : 4.C.3.a.4 Freedom to Make Decisions (CX),
                  4.C.3.b.8 Determine Tasks, Priorities and Goals (CX)  [note: 4.C.3.b.8 is a WC element]
  social_load   : 4.C.1.a.4 Contact With Others (CX),
                  4.C.1.b.1.f Deal With External Customers (CX),
                  4.C.1.d.2 Dealing With Unpleasant, Angry, or Discourteous People (CX)
  physicality   : 4.C.2.d.1.b Spend Time Standing (CX),
                  4.A.3.a.1 Performing General Physical Activities (IM, from WorkActivities)
  responsibility: 4.C.3.a.1 Consequence of Error (CX),
                  4.C.3.a.2.a Impact of Decisions (CX)  [element label 'Frequency of Decision Making' family],
                  4.C.1.c.1 Responsibility for Outcomes and Results (CX),
                  4.C.1.c.2 Responsib. for Health/Safety of Others -> 'Responsible for Others Health and Safety' (CX)

Composite = mean of z-scores across the construct's constituent elements
            (z computed across all O*NET-SOC codes with data; per-element standardization
             so that CX 1-5 and IM 1-5 scales are put on a common footing).
Derived index (authored): coupling = z(autonomy_composite) - z(consequence_of_error)
"""
import pandas as pd, numpy as np, os

HERE = os.path.dirname(os.path.abspath(__file__))
WC = os.path.join(HERE, '..', 'WorkContext.txt')
WA = os.path.join(HERE, '..', 'WorkActivities.txt')

CX_ELEMS = {
    '4.C.3.a.4':'freedom_make_decisions',
    '4.C.3.b.8':'determine_tasks_priorities',
    '4.C.1.a.4':'contact_with_others',
    '4.C.1.b.1.f':'deal_external_customers',
    '4.C.1.d.2':'deal_unpleasant_people',
    '4.C.2.d.1.b':'spend_time_standing',
    '4.C.3.a.1':'consequence_of_error',
    '4.C.3.a.2.a':'impact_of_decisions',
    '4.C.1.c.1':'responsibility_outcomes',
    '4.C.1.c.2':'responsibility_health_safety',
}
IM_ELEMS = {'4.A.3.a.1':'general_physical_activities'}

wc = pd.read_csv(WC, sep='\t', dtype=str)
wc.columns = [c.strip() for c in wc.columns]
wc = wc[(wc['Scale ID']=='CX') & (wc['Element ID'].isin(CX_ELEMS))].copy()
wc['val'] = pd.to_numeric(wc['Data Value'], errors='coerce')
wc['col'] = wc['Element ID'].map(CX_ELEMS)
cx = wc.pivot_table(index='O*NET-SOC Code', columns='col', values='val', aggfunc='mean')

wa = pd.read_csv(WA, sep='\t', dtype=str)
wa.columns = [c.strip() for c in wa.columns]
wa = wa[(wa['Scale ID']=='IM') & (wa['Element ID'].isin(IM_ELEMS))].copy()
wa['val'] = pd.to_numeric(wa['Data Value'], errors='coerce')
wa['col'] = wa['Element ID'].map(IM_ELEMS)
im = wa.pivot_table(index='O*NET-SOC Code', columns='col', values='val', aggfunc='mean')

df = cx.join(im, how='outer')
df.index.name = 'onetsoc'

def z(s):
    return (s - s.mean()) / s.std(ddof=0)

zcols = {}
for c in df.columns:
    zcols['z_'+c] = z(df[c])
Z = pd.DataFrame(zcols, index=df.index)

# per-construct composites = mean of constituent z-scores
constructs = {
    'autonomy':      ['z_freedom_make_decisions','z_determine_tasks_priorities'],
    'social_load':   ['z_contact_with_others','z_deal_external_customers','z_deal_unpleasant_people'],
    'physicality':   ['z_spend_time_standing','z_general_physical_activities'],
    'responsibility':['z_consequence_of_error','z_impact_of_decisions',
                      'z_responsibility_outcomes','z_responsibility_health_safety'],
}
for name, zc in constructs.items():
    df[name+'_composite'] = Z[zc].mean(axis=1)

# derived coupling index (authored): z(autonomy composite) - z(consequence of error)
df['coupling'] = z(df['autonomy_composite']) - z(df['consequence_of_error'])

df = df.reset_index()
df.to_csv(os.path.join(HERE,'onet_soc_elements.csv'), index=False)
print("O*NET-SOC codes:", len(df))
print("columns:", list(df.columns))
print(df[['onetsoc','freedom_make_decisions','consequence_of_error','autonomy_composite','coupling']].head())
print("non-null per element:")
for c in list(CX_ELEMS.values())+list(IM_ELEMS.values()):
    print(f"  {c}: {df[c].notna().sum()}")
