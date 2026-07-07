#!/usr/bin/env python3
"""
STEP 3 - Crosswalk O*NET-SOC-2019 element scores down to 1980-census occupation codes.

Chain:  O*NET-SOC 2019  --strip .XX-->  SOC 2018
        SOC 2018        --hierarchical match--> 2018 Census occ code   (2018_occ_crosswalk.xlsx,
                                                 sheet '2018 Census Occ Code List')
        2018 Census occ --compose backward through Beard eTables 21,19,17,15,13-->
                        2010 -> 2002 -> 2000 -> 1990 -> 1980 Census occ

Backward composition:
  Each Beard 'Vert' sheet is a FORWARD (earlier->later) allocation:
     row = (SourceCode[earlier], TargetCode[later], lower, upper), weight = upper-lower,
     weights partition each Source code (sum to 1 over its targets).
  Compose M(1980->2018) = P(80->90) . P(90->00) . P(00->02) . P(02->10) . P(10->18)
     -> row c1980 gives the distribution of that 1980 code's workers across 2018 codes.
  O*NET(c1980) = sum_j M[c1980,j] * onet2018[j] / sum_j( M[c1980,j] where onet2018[j] exists )
     i.e. population-share weighted mean over the 2018 codes, renormalised to covered mass.

SOC 2018 -> 2018 Census assignment (hierarchical, most-specific-wins):
  exact detailed SOC  >  broad group (XX-YYY0)  >  minor group (XX-Y000)
  >  'Other ...' wildcard bucket (longest prefix)  >  major group (XX-0000)
  (The census list gives ONE representative SOC per census code; residual detailed SOCs are
   collected by 'Other' census codes whose SOC is written with X wildcards e.g. 51-4XXX.)
Multiple O*NET-SOC codes landing on the same 2018 census code are averaged (equal weight;
no employment weights available) and the contributing count is recorded.

Outputs: onet_occ80.csv  (one row per 1980 census occ that receives O*NET mass:
                          element/composite/coupling means + quality flags)
"""
import pandas as pd, numpy as np, os, re
HERE=os.path.dirname(os.path.abspath(__file__))
ROOT=os.path.join(HERE,'..')

# ---------- A) SOC 2018 -> 2018 Census occ ----------
d=pd.read_excel(os.path.join(ROOT,'2018_occ_crosswalk.xlsx'),
                sheet_name='2018 Census Occ Code List',header=None).dropna(axis=1,how='all')
d.columns=range(d.shape[1])
det=d[d[2].astype(str).str.match(r'^\s*\d{4}\s*$',na=False)][[1,2,3]].copy()
det.columns=['title','cen','soc']
det['cen']=det['cen'].astype(str).str.strip().astype(int)      # int census code
det['soc']=det['soc'].astype(str).str.strip()
cen_title={r.cen:r.title for r in det.itertuples()}

exact={}; broad={}; minor={}; major={}; wild=[]
for r in det.itertuples():
    s=r.soc
    if re.match(r'^\d{2}-\d{4}$',s):
        suf=s[3:]
        if suf=='0000': major[s[:3]]=r.cen
        elif suf[1:]=='000': minor[s[:4]]=r.cen        # XX-Y000
        elif suf[3]=='0': broad[s[:6]]=r.cen           # XX-YYY0 (store prefix 'XX-YYY')
        else: exact[s]=r.cen
    elif 'X' in s:                                     # wildcard 'Other' bucket
        pref=s[:s.index('X')]                          # e.g. '51-4XXX'->'51-4'
        wild.append((pref,r.cen))
wild.sort(key=lambda t:-len(t[0]))                     # longest prefix first

def soc_to_cen(s):
    if s in exact: return exact[s],'exact'
    if s[:6] in broad: return broad[s[:6]],'broad'
    if s[:4] in minor: return minor[s[:4]],'minor'
    for pref,c in wild:
        if s.startswith(pref): return c,'wildcard'
    if s[:3] in major: return major[s[:3]],'major'
    return None,'none'

onet=pd.read_csv(os.path.join(HERE,'onet_soc_elements.csv'))
onet['soc']=onet['onetsoc'].str[:7]
mm=onet['soc'].map(soc_to_cen)
onet['cen2018']=[a for a,_ in mm]; onet['soc_match']=[b for _,b in mm]
print("SOC->census match:",onet['soc_match'].value_counts().to_dict())
print("unmatched O*NET-SOC rows:", onet['cen2018'].isna().sum())

ELEM=['freedom_make_decisions','determine_tasks_priorities','contact_with_others',
 'deal_external_customers','deal_unpleasant_people','spend_time_standing',
 'consequence_of_error','impact_of_decisions','responsibility_outcomes',
 'responsibility_health_safety','general_physical_activities']
COMP=['autonomy_composite','social_load_composite','physicality_composite',
      'responsibility_composite','coupling']
VALCOLS=ELEM+COMP

# average O*NET-SOC onto 2018 census code (equal weight)
oc=onet.dropna(subset=['cen2018']).copy(); oc['cen2018']=oc['cen2018'].astype(int)
cen2018=oc.groupby('cen2018')[VALCOLS].mean()
cen2018_nsoc=oc.groupby('cen2018').size().rename('n_onetsoc')
print("2018 census codes with O*NET:",len(cen2018),"of",len(det))

# ---------- B) backward composition through Beard eTables ----------
STEPS=[('eTable 13-Occ-1980-1990-Vert',1980,1990),
       ('eTable 15-Occ-1990-2000-Vert',1990,2000),
       ('eTable 17-Occ-2000-2002-Vert',2000,2002),
       ('eTable 19-Occ-2002-2010-Vert',2002,2010),
       ('eTable 21-Occ-2010-2018-Vert',2010,2018)]
BK=os.path.join(ROOT,'crosswalk_epi.xlsx')

def load_P(sheet):
    t=pd.read_excel(BK,sheet_name=sheet,header=0)
    t.columns=['srcCode','srcTitle','tgtCode','tgtTitle','lo','hi']
    t=t.dropna(subset=['srcCode','tgtCode'])
    t['srcCode']=t['srcCode'].astype(int); t['tgtCode']=t['tgtCode'].astype(int)
    t['w']=pd.to_numeric(t['hi'],errors='coerce')-pd.to_numeric(t['lo'],errors='coerce')
    P={}
    for r in t.itertuples():
        P.setdefault(r.srcCode,{}).setdefault(r.tgtCode,0.0)
        P[r.srcCode][r.tgtCode]+=r.w
    # normalise each source row to sum 1 (guard against rounding / gaps)
    for s,row in P.items():
        tot=sum(row.values())
        if tot>0:
            for k in row: row[k]/=tot
    return P

Ps=[load_P(s) for s,_,_ in STEPS]

# compose: start identity on 1980 codes present as sources in first step
codes1980=sorted(Ps[0].keys())
def compose_row(c0):
    dist={c0:1.0}
    for P in Ps:
        nd={}
        for code,p in dist.items():
            row=P.get(code)
            if row is None:            # code not found in this step -> mass dropped (record later)
                continue
            for tgt,w in row.items():
                nd[tgt]=nd.get(tgt,0.0)+p*w
        dist=nd
    return dist   # distribution over 2018 codes

# ---------- C) aggregate O*NET to 1980 codes ----------
rows=[]
cen2018_set=set(cen2018.index)
for c0 in codes1980:
    dist=compose_row(c0)          # {cen2018: prob}
    if not dist: continue
    total_mass=sum(dist.values())
    covered={j:w for j,w in dist.items() if j in cen2018_set}
    cov_mass=sum(covered.values())
    n2018=len(covered)
    maxw=max(dist.values()) if dist else 0
    if cov_mass<=0:
        continue
    vals={}
    nsoc=0
    for col in VALCOLS:
        num=sum(w*cen2018.loc[j,col] for j,w in covered.items())
        vals[col]=num/cov_mass
    nsoc=int(sum(cen2018_nsoc.loc[j] for j in covered))
    quality='clean_1to1' if (maxw>=0.999 and n2018==1) else 'many_to_many_split'
    rows.append(dict(occ80=c0, crosswalk_quality=quality,
                     n_2018_codes=n2018, n_onetsoc=nsoc,
                     coverage=round(cov_mass/total_mass if total_mass>0 else 0,4),
                     total_mass=round(total_mass,4), max_path_weight=round(maxw,4), **vals))

out=pd.DataFrame(rows)
out.to_csv(os.path.join(HERE,'onet_occ80.csv'),index=False)
print("1980 census occ codes with O*NET aggregated:",len(out))
print("quality:",out['crosswalk_quality'].value_counts().to_dict())
print("median coverage:",out['coverage'].median(),"min:",out['coverage'].min())
print(out[['occ80','crosswalk_quality','n_2018_codes','n_onetsoc','coverage',
           'autonomy_composite','consequence_of_error','coupling']].head(12).to_string())
