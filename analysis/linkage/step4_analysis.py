#!/usr/bin/env python3
"""
STEP 4 - Merge GSS occupation-level job satisfaction with O*NET modality scores
(unit = 1980 census occupation) and compute correlations + partials.

Primary design: GSS window 1988-2006, weighted (WTSSALL), min-N >= 30.
Also carries a sensitivity view (min-N >= 50) in the correlations block.
Outputs linkage-results.json.
"""
import pandas as pd, numpy as np, json, os
from scipy import stats
HERE=os.path.dirname(os.path.abspath(__file__))

gss=pd.read_csv(os.path.join(HERE,'gss_occ80.csv'))
onet=pd.read_csv(os.path.join(HERE,'onet_occ80.csv'))
occ80_titles={int(k):v for k,v in json.load(open(os.path.join(HERE,'occ80_titles.json'))).items()}

ELEM=['freedom_make_decisions','determine_tasks_priorities','contact_with_others',
 'deal_external_customers','deal_unpleasant_people','spend_time_standing',
 'consequence_of_error','impact_of_decisions','responsibility_outcomes',
 'responsibility_health_safety','general_physical_activities']
COMP=['autonomy_composite','social_load_composite','physicality_composite',
      'responsibility_composite','coupling']
PREDICTORS=ELEM+COMP

# NORC-extreme occupations (Smith 2007, GSSNews Table 1) -> occ80
NORC={176:('Clergy',3.79,87.2),103:('Physical Therapists',3.72,78.1),417:('Firefighters',3.67,80.1),
14:('Education Administrators',3.62,68.4),188:('Painters, Sculptors, Related',3.62,67.3),
183:('Authors',3.61,74.2),167:('Psychologists',3.59,66.9),158:('Special Education Teachers',3.59,70.1),
844:('Operating Engineers',3.56,64.1),303:('Office Supervisors',3.55,60.8),
255:('Securities & Financial Services Salespersons',3.55,65.4),
595:('Roofers',2.84,25.3),435:('Waiters/Servers',2.85,27.0),889:('Laborers, Except Construction',2.86,21.4),
434:('Bartenders',2.88,26.4),888:('Hand Packers and Packagers',2.88,23.7),
883:('Freight, Stock, & Material Handlers',2.91,25.8),264:('Apparel Clothing Salespersons',2.93,23.9),
276:('Cashiers',2.94,25.0),444:('Food Preparers, Misc.',2.95,23.6),373:('Expediters',2.97,37.0),
686:('Butchers & Meat Cutters',2.97,31.8),266:('Furniture/Home Furnishing Salespersons',2.99,25.2)}

def partial_corr(x,y,Z):
    """Pearson partial correlation of x,y controlling columns in Z (residualization)."""
    x=np.asarray(x,float); y=np.asarray(y,float)
    Z=np.asarray(Z,float)
    m=np.isfinite(x)&np.isfinite(y)&np.isfinite(Z).all(axis=1)
    x,y,Z=x[m],y[m],Z[m]
    A=np.column_stack([np.ones(len(x)),Z])
    rx=x-A@np.linalg.lstsq(A,x,rcond=None)[0]
    ry=y-A@np.linalg.lstsq(A,y,rcond=None)[0]
    if len(x)<4: return None,None,len(x)
    r,p=stats.pearsonr(rx,ry)
    return float(r),float(p),int(len(x))

def corrblock(df, outcome, predictors, method='pearson'):
    res={}
    for pcol in predictors:
        sub=df[[outcome,pcol]].dropna()
        if len(sub)<4: res[pcol]=None; continue
        if method=='pearson': r,p=stats.pearsonr(sub[outcome],sub[pcol])
        else: r,p=stats.spearmanr(sub[outcome],sub[pcol])
        res[pcol]=dict(r=round(float(r),4),p=round(float(p),4),n=int(len(sub)))
    return res

def partialblock(df, outcome, predictors, controls):
    res={}
    for pcol in predictors:
        r,p,n=partial_corr(df[pcol],df[outcome],df[controls].values)
        res[pcol]=None if r is None else dict(r=round(r,4),p=round(p,4),n=n)
    return res

def build(window,weighting,min_n):
    g=gss[(gss.window==window)&(gss.weighting==weighting)&(gss.n>=min_n)].copy()
    m=g.merge(onet,on='occ80',how='inner')
    return m

results={'method_log':[], 'gss_window_used':'1988-2006 (primary); 1988-2010 carried as sensitivity',
         'weights_used':'WTSSALL (weighted primary); unweighted carried as sensitivity',
         'min_n':{'primary':30,'sensitivity':50},
         'onet_version':'O*NET 30.3','onet_scale':'Context CX (1-5) and Importance IM (1-5)',
         'occupation_unit':'1980 Census occupation (GSS OCC80)'}

ML=results['method_log']
ML.append("STEP1 GSS: gss7224_r3.dta (NORC GSS 1972-2024 cumulative, R3). Universe: SATJOB in 1..4, WRKSTAT in {1,2}, OCC80 in 3..889. pct_very_sat=100*share(SATJOB==1); mean_satjob=mean(5-SATJOB) on NORC 1..4 (4=very satisfied). Weight WTSSALL.")
ML.append("STEP1 download: https://gss.norc.org/content/dam/gss/get-the-data/documents/stata/GSS_stata.zip (curl, browser UA; HTTP200; 47.4MB).")
ML.append("STEP1 windows: (a) 1988-2006 primary, (b) 1988-2010 all OCC80 years. OCC80+SATJOB survey years present: 1988,1989,1990,1991,1993,1994,1996,1998,2000,2002,2004,2006,2008,2010. Universe N(all)=18091.")
ML.append("STEP2 O*NET: WorkContext.txt CX means for 4.C.3.a.4,4.C.3.b.8,4.C.1.a.4,4.C.1.b.1.f,4.C.1.d.2,4.C.2.d.1.b,4.C.3.a.1,4.C.3.a.2.a,4.C.1.c.1,4.C.1.c.2 ; WorkActivities.txt IM mean for 4.A.3.a.1. 894 O*NET-SOC codes, all elements present.")
ML.append("STEP2 composites = mean of per-element z-scores (z across 894 O*NET-SOC codes, population std ddof=0). coupling = z(autonomy_composite) - z(consequence_of_error) [AUTHORED/DERIVED].")
ML.append("STEP2 DESIGNED LIMITATION: O*NET has NO feedback-from-job element and NO task-identity element; NOT proxied.")
ML.append("STEP3 crosswalk: O*NET-SOC 2019 -> strip .XX -> SOC 2018 -> 2018 Census occ via hierarchical match (exact>broad>minor>wildcard'Other'>major) using 2018_occ_crosswalk.xlsx sheet '2018 Census Occ Code List'. All 774 O*NET-SOC prefixes matched (exact484/broad257/wildcard108/minor45 element-rows). Multiple O*NET-SOC per census code averaged equal-weight.")
ML.append("STEP3 backward census walk: Beard workbook (crosswalk_epi.xlsx) Vert eTables composed forward 1980->1990->2000->2002->2010->2018 (P matrices, weight=upper-lower, rows renormalised to 1); M(1980->2018) row = worker-share distribution. O*NET(occ80)=share-weighted mean over covered 2018 codes, renormalised to covered mass. Per-occ flags: crosswalk_quality, n_2018_codes, n_onetsoc, coverage.")
ML.append("STEP4 merge on occ80; Pearson+Spearman of pct_very_sat and mean_satjob vs each element/composite/coupling; partial correlations controlling PRESTG80, EDUC, both (residualization). NORC-extreme occupations flagged.")

# validation vs NORC (primary design values, computed from window/weighting cells directly)
gv=gss[(gss.window=='1988_2006')&(gss.weighting=='weighted')].set_index('occ80')
validation=[]
for occ,(t,nm,npc) in NORC.items():
    if occ in gv.index:
        r=gv.loc[occ]
        validation.append(dict(occ80=int(occ),occ=t,n=int(r['n']),
            ours_pct_very_sat=round(float(r['pct_very_sat']),1),norc_pct_very_sat=npc,
            delta_pct=round(float(r['pct_very_sat'])-npc,1),
            ours_mean_satjob=round(float(r['mean_satjob']),2),norc_mean=nm,
            delta_mean=round(float(r['mean_satjob'])-nm,2)))
    else:
        validation.append(dict(occ80=int(occ),occ=t,n=0,note='below min-N or absent'))
results['validation_vs_norc']=validation
dpc=[abs(v['delta_pct']) for v in validation if 'delta_pct' in v]
results['validation_summary']=dict(n_matched=len(dpc),
    mean_abs_delta_pct=round(float(np.mean(dpc)),2),
    max_abs_delta_pct=round(float(np.max(dpc)),2),
    clergy=next(v for v in validation if v['occ80']==176),
    roofers=next(v for v in validation if v['occ80']==595))

# primary merged table
M=build('1988_2006','weighted',30)
results['n_occupations']=int(len(M))
extreme_set=set(NORC)
M['is_norc_extreme']=M['occ80'].isin(extreme_set)

# occupations rows
occs=[]
for r in M.sort_values('occ80').itertuples():
    onet_scores={c:(round(float(getattr(r,c)),4) if pd.notna(getattr(r,c)) else None)
                 for c in PREDICTORS}
    occs.append(dict(occ80=int(r.occ80), title=occ80_titles.get(int(r.occ80),''),
        n=int(r.n), pct_very_sat=round(float(r.pct_very_sat),2),
        mean_satjob=round(float(r.mean_satjob),3),
        prestige=round(float(r.prestige),2), educ=round(float(r.educ),2),
        crosswalk_quality=r.crosswalk_quality, n_2018_codes=int(r.n_2018_codes),
        n_onetsoc=int(r.n_onetsoc), coverage=round(float(r.coverage),3),
        is_norc_extreme=bool(r.is_norc_extreme), onet=onet_scores))
results['occupations']=occs

# correlations (primary: pct_very_sat outcome). also add prestige & educ as reference predictors.
REF=['prestige','educ']
corr={}
for outcome in ['pct_very_sat','mean_satjob']:
    corr[outcome]={
     'pearson':corrblock(M,outcome,PREDICTORS+REF,'pearson'),
     'spearman':corrblock(M,outcome,PREDICTORS+REF,'spearman'),
     'partial_prestige':partialblock(M,outcome,PREDICTORS,['prestige']),
     'partial_educ':partialblock(M,outcome,PREDICTORS,['educ']),
     'partial_both':partialblock(M,outcome,PREDICTORS,['prestige','educ']),
    }
results['correlations']=corr

# sensitivity n>=50
M50=build('1988_2006','weighted',50)
results['sensitivity_min50']=dict(n_occupations=int(len(M50)),
   pearson_pct_very_sat=corrblock(M50,'pct_very_sat',PREDICTORS+REF,'pearson'))
# sensitivity all years 1988-2010
Mall=build('1988_2010','weighted',30)
results['sensitivity_1988_2010']=dict(n_occupations=int(len(Mall)),
   pearson_pct_very_sat=corrblock(Mall,'pct_very_sat',PREDICTORS+REF,'pearson'))

results['limitations']=[
 "O*NET has NO feedback-from-job element and NO task-identity element (verified); these Hackman-Oldham dimensions are absent by design and were NOT proxied.",
 "O*NET-SOC->2018 census uses ONE representative SOC per census code plus hierarchical fallback; residual detailed SOCs assigned via 'Other' wildcard buckets. This approximates but does not reproduce the full official detailed SOC->census allocation.",
 "Multiple O*NET-SOC codes aggregated to a census code by EQUAL weight (no employment weights available), then census codes aggregated to 1980 codes by Beard worker-share allocation. O*NET measures ~2019-2023 incumbents joined to 1988-2006 GSS satisfaction: a temporal offset assumed stable at occupation level.",
 "Correlations are ecological (occupation-level); they do not imply individual-level effects.",
 "min-N thresholds and GSS pooling window differ from Smith 2007's unknown exact choices; validation deltas reported, not forced.",
 "coupling index is authored/derived (z(autonomy)-z(consequence of error)), not an established construct.",
 "Some 1980 occ codes have low crosswalk coverage or many-to-many splits; carry crosswalk_quality/coverage flags for downstream filtering.",
]

json.dump(results, open(os.path.join(HERE,'linkage-results.json'),'w'), indent=2)

# console headline
def show(name,block):
    items=sorted([(k,v['r']) for k,v in block.items() if v],key=lambda t:-abs(t[1]))
    print(f"\n{name} (n_occ={results['n_occupations']}):")
    for k,r in items: print(f"   {k:32s} r={r:+.3f}")
print("="*60)
print("VALIDATION: mean|Δ%%|=",results['validation_summary']['mean_abs_delta_pct'],
      " clergy",results['validation_summary']['clergy']['ours_pct_very_sat'],"vs 87.2",
      " roofers",results['validation_summary']['roofers']['ours_pct_very_sat'],"vs 25.3")
show("PEARSON pct_very_sat vs predictors",corr['pct_very_sat']['pearson'])
show("SPEARMAN pct_very_sat",corr['pct_very_sat']['spearman'])
show("PARTIAL (control prestige+educ) pct_very_sat",corr['pct_very_sat']['partial_both'])
print("\nwrote linkage-results.json ; n_occupations(primary)=",results['n_occupations'],
      " sensitivity n>=50:",results['sensitivity_min50']['n_occupations'])
