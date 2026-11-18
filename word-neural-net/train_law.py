"""Same network, different amounts of data.

Trains the identical 64-20-10 integer network (same recipe, same settings) on random
subsets of the real handwritten-digit training scans and measures each on the same 450
held-out test scans. Writes curve.json (the learning curve) and the two networks that
get embedded in the Word document.

Usage: python3 train_law.py
"""
import json, warnings
import numpy as np
from sklearn.datasets import load_digits
from sklearn.model_selection import train_test_split
from sklearn.neural_network import MLPClassifier
warnings.filterwarnings("ignore")

H, S1, S2 = 20, 16, 16
SIZES = [20, 40, 80, 160, 320, 640, 1077]
RUNS = 5
d = load_digits()
X, y = d.data, d.target
# identical split to train.py: 450 test scans never used for training
Xtrv, Xte, ytrv, yte = train_test_split(X, y, test_size=0.25, random_state=0, stratify=y)
Xtr, _, ytr, _ = train_test_split(Xtrv, ytrv, test_size=0.2, random_state=0, stratify=ytrv)
binar = lambda Z: (Z > 7).astype(int)

def shift(img, dx, dy):
    out = np.zeros_like(img); h, w = img.shape
    out[max(0,dy):h+min(0,dy), max(0,dx):w+min(0,dx)] = img[max(0,-dy):h+min(0,-dy), max(0,-dx):w+min(0,-dx)]
    return out

def augment(Xs, ys):
    A, B = [], []
    for x, t in zip(Xs, ys):
        im = x.reshape(8, 8)
        for thr in (4, 7, 10):
            for dx, dy in ((0,0),(1,0),(-1,0),(0,1),(0,-1)):
                A.append((shift(im, dx, dy) > thr).astype(float).ravel()); B.append(t)
    return np.array(A), np.array(B)

def fit(n, run):
    rng = np.random.RandomState(1000 * run + n)
    if n < len(Xtr):                      # stratified random subset: n/10 scans of each digit
        idx = np.concatenate([rng.choice(np.where(ytr == k)[0], n // 10, replace=False) for k in range(10)])
    else:
        idx = np.arange(len(Xtr))
    A, B = augment(Xtr[idx], ytr[idx])
    m = MLPClassifier(hidden_layer_sizes=(H,), alpha=1e-2, max_iter=1500, random_state=run).fit(A, B)
    q = (np.rint(m.coefs_[0]*S1).astype(int), np.rint(m.intercepts_[0]*S1).astype(int),
         np.rint(m.coefs_[1]*S2).astype(int), np.rint(m.intercepts_[1]*S2*S1*2).astype(int))
    a = binar(Xte) @ q[0] + q[1]
    o = (a + np.abs(a)) @ q[2] + q[3]
    return q, int((o.argmax(1) == yte).sum())

curve, nets = [], {}
for n in SIZES:
    res = []
    for run in range(RUNS):
        q, c = fit(n, run)
        res.append(c)
        if run == 0:
            nets[n] = dict(n=n, correct=c, W1=q[0].tolist(), b1=q[1].tolist(), W2=q[2].tolist(), b2=q[3].tolist())
    curve.append(dict(n=n, correct=res, mean_acc=float(np.mean(res)) / len(yte)))
    print(n, res, f"mean {np.mean(res)/len(yte):.3f}")
json.dump(dict(H=H, runs=RUNS, n_test=int(len(yte)), n_train_pool=int(len(Xtr)), curve=curve, nets=nets,
               test_X=binar(Xte).tolist(), test_y=yte.tolist()), open('curve.json', 'w'))
