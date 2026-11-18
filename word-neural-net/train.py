"""Train a tiny digit classifier on the real 8x8 handwritten-digit scans that ship
with scikit-learn (UCI "Optical Recognition of Handwritten Digits" test set, 1,797 images)
and quantise it to small integers so Word's field engine can run it.

Usage: python3 train.py  ->  writes model.json
"""
import json, warnings
import numpy as np
from sklearn.datasets import load_digits
from sklearn.model_selection import train_test_split
from sklearn.neural_network import MLPClassifier
warnings.filterwarnings("ignore")

H, S1, S2 = 20, 16, 16            # hidden neurons, integer scale of layer 1 / layer 2
d = load_digits()
X, y = d.data, d.target           # 1797 x 64, ink values 0..16
Xtrv, Xte, ytrv, yte = train_test_split(X, y, test_size=0.25, random_state=0, stratify=y)
Xtr, Xva, ytr, yva = train_test_split(Xtrv, ytrv, test_size=0.2, random_state=0, stratify=ytrv)

def shift(img, dx, dy):
    out = np.zeros_like(img); h, w = img.shape
    out[max(0,dy):h+min(0,dy), max(0,dx):w+min(0,dx)] = img[max(0,-dy):h+min(0,-dy), max(0,-dx):w+min(0,-dx)]
    return out

# Augment the real training images only: stroke thickness (binarisation threshold) and 1-pixel shifts.
A, B = [], []
for x, t in zip(Xtr, ytr):
    im = x.reshape(8, 8)
    for thr in (4, 7, 10):
        for dx, dy in ((0,0),(1,0),(-1,0),(0,1),(0,-1)):
            A.append((shift(im, dx, dy) > thr).astype(float).ravel()); B.append(t)
A, B = np.array(A), np.array(B)
binar = lambda Z: (Z > 7).astype(int)      # pixel is "on" if more than 7/16 ink

def quantise(m):
    W1, b1, W2, b2 = m.coefs_[0], m.intercepts_[0], m.coefs_[1], m.intercepts_[1]
    return (np.rint(W1*S1).astype(int), np.rint(b1*S1).astype(int),
            np.rint(W2*S2).astype(int), np.rint(b2*S2*S1*2).astype(int))

def forward(q, Xb):
    iW1, ib1, iW2, ib2 = q
    a = Xb @ iW1 + ib1
    h = a + np.abs(a)                      # = 2*ReLU(a); avoids division and two-argument functions
    return h @ iW2 + ib2

best = None
for seed in range(8):                      # seed chosen on the validation split, never on the test split
    m = MLPClassifier(hidden_layer_sizes=(H,), alpha=1e-2, max_iter=1500, random_state=seed).fit(A, B)
    q = quantise(m)
    va = float((forward(q, binar(Xva)).argmax(1) == yva).mean())
    print(f"seed {seed}: validation accuracy (integer net) {va:.4f}")
    if best is None or va > best[0]:
        best = (va, seed, m, q)
va, seed, m, q = best
te_int = float((forward(q, binar(Xte)).argmax(1) == yte).mean())
te_float = float(m.score(binar(Xte).astype(float), yte))
print(f"kept seed {seed}; TEST accuracy integer={te_int:.4f} float={te_float:.4f} on {len(Xte)} images")
json.dump(dict(H=H, S1=S1, S2=S2, seed=seed, val_acc_int=va, test_acc_int=te_int, test_acc_float=te_float,
               n_total=int(len(X)), n_train=int(len(Xtr)), n_val=int(len(Xva)), n_test=int(len(Xte)),
               n_train_augmented=int(len(A)),
               W1=q[0].tolist(), b1=q[1].tolist(), W2=q[2].tolist(), b2=q[3].tolist(),
               test_X=binar(Xte).tolist(), test_y=yte.tolist()), open('model.json', 'w'))
