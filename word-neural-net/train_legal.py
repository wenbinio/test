"""Same network, different amounts of LEGAL data.

Data: LEDGAR (Tuggener et al. 2020) as packaged in LexGLUE (Chalkidis et al. 2022):
80,000 real contract provisions from SEC EDGAR filings, each labelled with its provision
type. Licence CC BY 4.0. Downloaded from the Hugging Face hub into data/ if missing.

Experiment A (the one that runs inside Word): ten common provision types, each clause
reduced to the presence/absence of 64 words, classified by the same 64-20-10 integer
network used for the digits. Trained on 20 ... 18,089 clauses, tested on the 3,138
LexGLUE test clauses of those ten types.

Experiment B (too big for Word, run here only): all 100 provision types, every word
(TF-IDF), linear classifier. Trained on 100 ... 60,000 clauses, tested on all 10,000
test clauses. This shows whether the curve in A flattens because of the data or because
the tiny network is full.

Usage: python3 train_legal.py   ->  legal.json
"""
import json, os, re, urllib.request, warnings
import numpy as np, pandas as pd
from sklearn.feature_extraction.text import CountVectorizer, TfidfVectorizer
from sklearn.feature_selection import chi2
from sklearn.neural_network import MLPClassifier
from sklearn.svm import LinearSVC
warnings.filterwarnings("ignore")

BASE = "https://huggingface.co/datasets/coastalcph/lex_glue/resolve/refs%2Fconvert%2Fparquet/ledgar/{}/0000.parquet"
os.makedirs('data', exist_ok=True)
for s in ('train', 'validation', 'test'):
    p = f'data/ledgar_{s}.parquet'
    if not os.path.exists(p):
        urllib.request.urlretrieve(BASE.format(s), p)
names = json.load(open('data/ledgar_labels.json'))
tr, te = pd.read_parquet('data/ledgar_train.parquet'), pd.read_parquet('data/ledgar_test.parquet')

# ---------------------------------------------------------------- experiment A
CLASSES = ['Governing Laws', 'Notices', 'Counterparts', 'Entire Agreements', 'Severability',
           'Amendments', 'Assignments', 'Terminations', 'Confidentiality', 'Indemnifications']
ids = [names.index(c) for c in CLASSES]
trA, teA = tr[tr.label.isin(ids)].reset_index(drop=True), te[te.label.isin(ids)].reset_index(drop=True)
ytr, yte = trA.label.map(ids.index).values, teA.label.map(ids.index).values
H, S1, S2, NW = 20, 16, 16, 64

# 64 words chosen from the FULL training pool: for each provision type, the words most
# associated with it (chi-squared, present more often inside the type than outside).
cv = CountVectorizer(binary=True, token_pattern=r"(?u)\b[a-z]{3,14}\b", min_df=20, stop_words='english')
Xall = cv.fit_transform(trA.text)
vocab = np.array(cv.get_feature_names_out())
ranked = []
for k in range(10):
    pos = ytr == k
    score, _ = chi2(Xall, pos)
    more = np.asarray(Xall[pos].mean(0)).ravel() > np.asarray(Xall[~pos].mean(0)).ravel()
    ranked.append([i for i in np.argsort(-np.nan_to_num(score)) if more[i]])
words, r = [], 0
while len(words) < NW:
    for k in range(10):
        w = ranked[k][r]
        if w not in words and len(words) < NW:
            words.append(w)
    r += 1
words = sorted(vocab[words])
feat = CountVectorizer(binary=True, vocabulary=words, token_pattern=r"(?u)\b[a-z]{3,14}\b")
XtrA, XteA = feat.transform(trA.text).toarray(), feat.transform(teA.text).toarray()
print('words:', ' '.join(words))

def fit_net(n, run):
    rng = np.random.RandomState(1000 * run + n)
    if n < len(ytr):
        idx = np.concatenate([rng.choice(np.where(ytr == k)[0], n // 10, replace=False) for k in range(10)])
    else:
        idx = np.arange(len(ytr))
    m = MLPClassifier(hidden_layer_sizes=(H,), alpha=1e-2, max_iter=1500, random_state=run).fit(XtrA[idx].astype(float), ytr[idx])
    q = (np.rint(m.coefs_[0]*S1).astype(int), np.rint(m.intercepts_[0]*S1).astype(int),
         np.rint(m.coefs_[1]*S2).astype(int), np.rint(m.intercepts_[1]*S2*S1*2).astype(int))
    a = XteA @ q[0] + q[1]
    o = (a + np.abs(a)) @ q[2] + q[3]
    return q, int((o.argmax(1) == yte).sum())

SIZES_A, RUNS_A = [20, 50, 100, 200, 500, 1000, 2000, 5000, len(ytr)], 5
curveA, nets = [], {}
for n in SIZES_A:
    res, qs = [], []
    for run in range(RUNS_A):
        q, c = fit_net(n, run)
        res.append(c); qs.append(q)
    med = int(np.argsort(res)[len(res) // 2])          # embed the median run, not the luckiest
    q = qs[med]
    nets[n] = dict(n=n, run=med, correct=res[med], W1=q[0].tolist(), b1=q[1].tolist(), W2=q[2].tolist(), b2=q[3].tolist())
    curveA.append(dict(n=n, correct=res, mean_acc=float(np.mean(res)) / len(yte)))
    print('A', n, res, f"mean {np.mean(res)/len(yte):.4f}", flush=True)

# ---------------------------------------------------------------- experiment B
SIZES_B, RUNS_B = [100, 300, 1000, 3000, 10000, 30000, len(tr)], 3
curveB = []
for n in SIZES_B:
    res = []
    for run in range(RUNS_B if n < len(tr) else 1):
        idx = np.random.RandomState(1000 * run + n).choice(len(tr), n, replace=False) if n < len(tr) else np.arange(len(tr))
        tf = TfidfVectorizer(sublinear_tf=True, min_df=1)          # vocabulary learned from the sample only
        clf = LinearSVC(C=1.0).fit(tf.fit_transform(tr.text.iloc[idx]), tr.label.values[idx])
        res.append(int((clf.predict(tf.transform(te.text)) == te.label.values).sum()))
    curveB.append(dict(n=n, correct=res, mean_acc=float(np.mean(res)) / len(te)))
    print('B', n, res, f"mean {np.mean(res)/len(te):.4f}", flush=True)

json.dump(dict(H=H, classes=CLASSES, words=words, n_test=int(len(yte)), n_pool=int(len(ytr)),
               runsA=RUNS_A, curveA=curveA, nets=nets, runsB=RUNS_B, n_testB=int(len(te)), n_classesB=100, curveB=curveB,
               test_X=XteA.tolist(), test_y=yte.tolist(), test_text=teA.text.tolist()), open('legal.json', 'w'))
