#!/usr/bin/env python3
"""
STEP 1 - GSS microdata -> per-OCC80 occupation-level job-satisfaction outcomes.

Input : gss_stata/gss7224_r3.dta  (GSS 1972-2024 cumulative cross-section, R3, NORC 2024 release)
Output: gss_occ80.csv (one row per OCC80 x window x weighting x minN scheme; long format)
        gss_occ80_primary.json  (the primary design: 1988-2006, weighted, kept for merge)

Design decisions (logged):
 - Universe: respondents with a valid SATJOB (codes 1..4) AND WRKSTAT in {1,2}
   (working full-time or part-time), AND a valid OCC80 census-1980 occupation code (3..889).
 - SATJOB GSS coding: 1=very satisfied ... 4=very dissatisfied.
     pct_very_sat = 100 * share answering code 1 (very satisfied).
     mean_satjob_norc = mean(5 - SATJOB)  -> NORC 1..4 direction (4 = very satisfied).
 - Weight: WTSSALL (the historical all-years weight present across 1988-2010).
     "weighted" uses WTSSALL; "unweighted" uses w=1.
 - Two windows: (a) 1988-2006, (b) all OCC80 years 1988-2010.
 - Two min-N thresholds applied downstream: n>=30 (primary), n>=50 (sensitivity).
"""
import pyreadstat, pandas as pd, numpy as np, json, os

HERE = os.path.dirname(os.path.abspath(__file__))
DTA  = os.path.join(HERE, 'gss_stata', 'gss7224_r3.dta')

cols = ['year','satjob','occ80','prestg80','educ','wrkstat','sex','age','wtssall']
df, meta = pyreadstat.read_dta(DTA, usecols=cols, encoding='latin1')

# OCC80 code -> title label map (from stata value labels)
lblname = meta.variable_to_label.get('occ80')
occ80_titles = {int(k): v for k, v in meta.value_labels.get(lblname, {}).items()
                if isinstance(k, (int, float)) and 3 <= k <= 889}

for c in ['year','satjob','occ80','prestg80','educ','wrkstat','age','wtssall']:
    df[c] = pd.to_numeric(df[c], errors='coerce')

# Universe filter
u = df[(df['satjob'].between(1,4)) &
       (df['wrkstat'].isin([1,2])) &
       (df['occ80'].between(3,889))].copy()
u['very_sat'] = (u['satjob'] == 1).astype(float)
u['satjob_norc'] = 5 - u['satjob']          # 4 = very satisfied
u['occ80'] = u['occ80'].astype(int)

def wstats(g, wcol):
    w = g[wcol].fillna(0.0).values if wcol else np.ones(len(g))
    if wcol is None: w = np.ones(len(g))
    W = w.sum()
    def wm(x):
        x = np.asarray(x, float); m = ~np.isnan(x)
        return float(np.sum(w[m]*x[m]) / np.sum(w[m])) if np.sum(w[m])>0 else np.nan
    return pd.Series({
        'n': int(len(g)),
        'sum_w': float(W),
        'pct_very_sat': 100.0*wm(g['very_sat'].values),
        'mean_satjob': wm(g['satjob_norc'].values),
        'prestige': wm(g['prestg80'].values),
        'educ': wm(g['educ'].values),
    })

windows = {'1988_2006': (1988,2006), '1988_2010': (1988,2010)}
rows = []
for wname,(y0,y1) in windows.items():
    sub = u[u['year'].between(y0,y1)]
    for wlabel, wcol in [('weighted','wtssall'), ('unweighted',None)]:
        agg = sub.groupby('occ80').apply(lambda g: wstats(g, wcol), include_groups=False)
        agg = agg.reset_index()
        agg['window'] = wname; agg['weighting'] = wlabel
        agg['title'] = agg['occ80'].map(occ80_titles)
        rows.append(agg)
out = pd.concat(rows, ignore_index=True)
out.to_csv(os.path.join(HERE,'gss_occ80.csv'), index=False)

# Primary design for merge: 1988-2006, weighted (min-N applied in step4)
prim = out[(out['window']=='1988_2006') & (out['weighting']=='weighted')].copy()
prim = prim.sort_values('occ80')
prim.to_json(os.path.join(HERE,'gss_occ80_primary.json'), orient='records')

# save the OCC80 title dictionary too
json.dump(occ80_titles, open(os.path.join(HERE,'occ80_titles.json'),'w'), indent=0)

print("universe N:", len(u))
print("rows written:", len(out))
print("primary (1988-2006 weighted) occupations with n>=30:", (prim['n']>=30).sum())
print("primary occupations with n>=50:", (prim['n']>=50).sum())
print("total distinct OCC80:", prim['occ80'].nunique())
