import json,os,subprocess,datetime,sys
UA="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36"
BASE="/tmp/claude-0/-home-user-test/fefcf466-ba6c-51ec-b47e-1fd23f71276b/scratchpad/work/SG-01"
OUT=os.path.join(BASE,"hansard"); os.makedirs(OUT,exist_ok=True)
CJ=os.path.join(BASE,"cj.txt")
def fetch(d):
    body=json.dumps({"sittingDate":d})
    p=subprocess.run(["curl","-sS","-m","90","-A",UA,"-b",CJ,"-c",CJ,
        "-H","Content-Type: application/json","-H","Accept: application/json, text/plain, */*",
        "-H","Origin: https://sprs.parl.gov.sg","-H","Referer: https://sprs.parl.gov.sg/search/",
        "-X","POST","--data",body,"https://sprs.parl.gov.sg/search/getHansardReport"],
        capture_output=True)
    return p.stdout
start=datetime.date(2026,1,12); end=datetime.date(2026,9,3)
hits=[]
d=start
while d<=end:
    if d.weekday()<5:
        ds=d.strftime("%d-%m-%Y")
        fp=os.path.join(OUT,ds+".json")
        if os.path.exists(fp) and os.path.getsize(fp)>2000:
            hits.append(ds); d+=datetime.timedelta(days=1); continue
        b=fetch(ds)
        if len(b)>2000:
            open(fp,"wb").write(b); hits.append(ds)
            print("HIT",ds,len(b),flush=True)
    d+=datetime.timedelta(days=1)
print("SITTINGS:",len(hits))
print(hits)
