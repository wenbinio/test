import json,re,html,os,glob
W="/tmp/claude-0/-home-user-test/fefcf466-ba6c-51ec-b47e-1fd23f71276b/scratchpad/work/SG-01"
def strip(h):
    if not h: return ""
    h=re.sub(r'(?i)<br\s*/?>','\n',h)
    h=re.sub(r'(?i)</(p|div|li|h[1-6]|tr)>','\n',h)
    h=re.sub(r'<[^>]+>','',h); h=html.unescape(h)
    h=h.replace('\xa0',' ')
    h=re.sub(r'[ \t]+',' ',h); h=re.sub(r'\n\s*\n+','\n\n',h)
    return h.strip()
def load():
    recs=[]
    for fp in sorted(glob.glob(f"{W}/hansard/*.json")):
        d=json.load(open(fp,encoding="utf-8"))
        md=d.get("metadata") or {}
        base=dict(date=md.get("sittingDate"),display=md.get("dateToDisplay"),
                  parl=md.get("parlimentNO"),sess=md.get("sessionNO"),
                  vol=md.get("volumeNO"),sitting=md.get("sittingNO"))
        for key in ("takesSectionVOList","writtenAnswersVOList","writtenAnsNAVOList"):
            for i,s in enumerate(d.get(key) or []):
                r=dict(base); r.update(listname=key,idx=i,title=s.get("title"),
                    sub=s.get("subTitle"),stype=s.get("sectionType"),qno=s.get("questionNo"),
                    text=strip(s.get("content")), clar=strip(s.get("clarificationText")),
                    clartitle=s.get("clarificationTitle"))
                recs.append(r)
    return recs
