"""Build "watch-it-learn.docx": a macro-free Word page that trains a classifier from scratch,
on real contract clauses, every time it recalculates, and then sits an exam.

The learning rule (run entirely by Word fields, in document order, no stored state):
  * memory starts empty
  * for each study clause in turn: score every clause type as the total number of key words
    the clause shares with the remembered clauses of that type; if the right type does not
    strictly win, the clause is filed in memory under its right type
  * exam: the same scoring against whatever is in memory; right only if the true type strictly wins
The reader chooses how many of the 40 study clauses it may use.

    python3 train_legal.py   # once, to fetch LEDGAR and choose the 64 key words (legal.json)
    python3 build_learn.py   # writes watch-it-learn.docx and verifies the field maths
    python3 build_learn.py --flat
"""
import json, sys, zipfile, datetime
import numpy as np, pandas as pd
from sklearn.feature_extraction.text import CountVectorizer
from build import Doc, esc, rpr, run, para, ON, OFF
from build_legal import tc, kicker, bar_chart, INK, ACCENT, GREY, PALE, RULE, SERIF, SANS

L = json.load(open('legal.json'))
CLASSES, WORDS = L['classes'], L['words']
names = json.load(open('data/ledgar_labels.json'))
N_STUDY, N_EXAM, SEED = 40, 30, 0
BUDGETS = [0, 5, 10, 15, 20, 30, 40]
START_BUDGET = 10
FLAT = '--flat' in sys.argv
OUT = 'preview-learn-flat.docx' if FLAT else 'watch-it-learn.docx'
HIDE = rpr(size=1, color='FFFFFF')

# ---------------------------------------------------------------- real data
ids = [names.index(c) for c in CLASSES]
tr, te = pd.read_parquet('data/ledgar_train.parquet'), pd.read_parquet('data/ledgar_test.parquet')
trA, teA = tr[tr.label.isin(ids)].reset_index(drop=True), te[te.label.isin(ids)].reset_index(drop=True)
ytr, yte = trA.label.map(ids.index).values, teA.label.map(ids.index).values
feat = CountVectorizer(binary=True, vocabulary=WORDS, token_pattern=r"(?u)\b[a-z]{3,14}\b")
Xtr, Xte = feat.transform(trA.text).toarray(), feat.transform(teA.text).toarray()
rng = np.random.RandomState(SEED)                     # random draw, fixed seed: 4 study clauses of each type, shuffled
study = np.concatenate([rng.choice(np.where(ytr == k)[0], N_STUDY // 10, replace=False) for k in range(10)])
rng.shuffle(study)
exam = rng.choice(len(yte), N_EXAM, replace=False)    # 30 random unseen clauses
X, Y, TXT = Xtr[study], ytr[study], trA.text.values[study]
XE, YE, TXTE = Xte[exam], yte[exam], teA.text.values[exam]
K = X @ X.T                                           # shared key words between study clauses
KE = XE @ X.T                                         # ... between exam clauses and study clauses


def simulate(budget):
    """The learning rule in numpy. Returns memory flags, exam results, accuracy on ALL unseen clauses."""
    mem = np.zeros(N_STUDY, int)
    for e in range(budget):
        s = np.array([(mem[:e] * (Y[:e] == k)) @ K[:e, e] for k in range(10)])
        if np.delete(s, Y[e]).max() >= s[Y[e]]:
            mem[e] = 1
    W = np.array([(X * (mem * (Y == k))[:, None]).sum(0) for k in range(10)])

    def right(Xs, ys):
        S = Xs @ W.T
        st = S[np.arange(len(ys)), ys]
        S[np.arange(len(ys)), ys] = -1
        return st > S.max(1)
    return mem, right(XE, YE).astype(int), float(right(Xte, yte).mean())


# ---------------------------------------------------------------- fields
def iff(d, lhs, op, rhs, t, f, rp, name=None, quote=True):
    a = lhs[1]
    if isinstance(rhs, str):
        ok, rc = (a == rhs), f'"{rhs}"'
    else:
        ok, rc = {'=': int(a) == rhs, '>=': int(a) >= rhs}[op], str(rhs)
    q = (lambda s: f'"{s}"') if quote else (lambda s: s)
    xml, res = d._emit([' IF ', lhs, f' {op} {rc} {q(t)} {q(f)} '], t if ok else f, rp)
    if name:
        xml = d.bookmark(name, xml, res)
    return xml, res


def budget_dropdown(d, rp):
    sel = BUDGETS.index(d.budget)
    d.n_fields += 1
    d.bm_id += 1
    d.env['d_1'] = str(d.budget)
    if d.flat:
        return f'<w:r>{rp}<w:t>{d.budget}</w:t></w:r>'
    ff = ('<w:ffData><w:name w:val="d_1"/><w:enabled/><w:calcOnExit/>'
          f'<w:ddList><w:result w:val="{sel}"/><w:default w:val="{sel}"/>'
          + ''.join(f'<w:listEntry w:val="{b}"/>' for b in BUDGETS) + '</w:ddList></w:ffData>')
    return (f'<w:r>{rp}<w:fldChar w:fldCharType="begin">{ff}</w:fldChar></w:r>'
            f'<w:bookmarkStart w:id="{d.bm_id}" w:name="d_1"/>'
            f'<w:r>{rp}<w:instrText xml:space="preserve"> FORMDROPDOWN </w:instrText></w:r>'
            f'<w:r>{rp}<w:fldChar w:fldCharType="separate"/></w:r><w:r>{rp}<w:fldChar w:fldCharType="end"/></w:r>'
            f'<w:bookmarkEnd w:id="{d.bm_id}"/>')


def total(d, pairs, rp=HIDE):
    """Parts of a formula summing coeff*bookmark terms; more than 8 terms are split into nested fields."""
    pairs = [(int(c), n) for c, n in pairs if c]
    txt = lambda ps: '0' + ''.join(f'+{c}*{n}' for c, n in ps)
    if len(pairs) <= 8:
        return [txt(pairs)]
    parts = ['0']
    for g in range(0, len(pairs), 8):
        parts += ['+(', d.formula([txt(pairs[g:g + 8])], rp), ')']
    return parts


def snippet(text, room):
    words, out = text.replace('\n', ' ').split(), ''
    for w in words:
        if sum(1.4 if ch.isupper() else 1 for ch in out + ' ' + w) > room:   # capitals are wider
            break
        out += (' ' if out else '') + w
    return out + '…'


def machine(budget, flat=False):
    d = Doc(flat)
    d.budget = budget
    big = rpr(font=SERIF, size=20, color=ACCENT)
    ctl = (run('How many clauses may it study?   ', rpr(font=SERIF, size=13, color=INK)) + budget_dropdown(d, big)
           + run('   then press Tab.', rpr(font=SERIF, size=13, color=INK)))
    # the chosen number, read with the same REF-inside-IF idiom the other documents use
    parts = ['0']
    for b in BUDGETS[1:]:
        parts += [f'+{b}*(', iff(d, d.ref('d_1', HIDE), '=', str(b), '1', '0', HIDE, quote=False), ')']
    ctl += d.formula(parts, HIDE, name='b_1')[0]
    control = para(ctl, jc='center', before=60, after=160)

    row_rp, row_b, glyph = rpr(font=SANS, size=7, color=INK), rpr(font=SANS, size=7, bold=True, color=INK), rpr(font=SANS, size=7, bold=True, color=ACCENT)
    num_rp = rpr(font=SANS, size=7, color=GREY)
    # ------------------------------------------------ study pass
    c1 = kicker('WHAT IT STUDIES, IN THIS ORDER', after=30)
    c1 += para(run(f'{ON} got it wrong, so filed it in memory     {OFF} got it right     blank = not studied', rpr(font=SANS, size=6.5, color=GREY)), before=0, after=70)
    for e in range(N_STUDY):
        t, n = int(Y[e]), e + 1
        prev = [(K[p, e], p, int(Y[p])) for p in range(e) if K[p, e] > 0]
        hid = iff(d, d.formula(['b_1'], HIDE), '>=', n, '1', '0', HIDE, name=f'g_{n}', quote=False)[0]
        own = [(c, f'm_{p+1}') for c, p, cls in prev if cls == t]
        others = sorted({cls for c, p, cls in prev if cls != t})
        if not own:                                   # nothing of its own type could be in memory: always a mistake
            hid += d.formula([f'g_{n}'], HIDE, name=f'm_{n}')[0]
        else:
            hid += d.formula(total(d, own), HIDE, name=f's_{n}')[0]
            tests = []
            for k in others:                          # a rival type scores at least as much?
                tests.append(iff(d, d.formula(total(d, [(c, f'm_{p+1}') for c, p, cls in prev if cls == k]) + [f'-s_{n}'], HIDE), '>=', 0, '1', '0', HIDE, quote=False))
            if not others:                            # rivals all score 0: wrong only if its own score is 0 too
                tests.append(iff(d, d.formula([f'0-s_{n}'], HIDE), '>=', 0, '1', '0', HIDE, quote=False))
            parts = [f'g_{n}*SIGN(0']
            for x in tests:
                parts += ['+(', x, ')']
            hid += d.formula(parts + [')'], HIDE, name=f'm_{n}')[0]
        status = iff(d, d.formula([f'm_{n}'], glyph), '=', 1, ON, '', glyph)[0] + iff(d, d.formula([f'g_{n}-m_{n}'], glyph), '=', 1, OFF, '', glyph)[0]
        label = CLASSES[t]
        c1 += para(hid + run(f'{n:>2}  ', num_rp) + status + run('  ' + label, row_b) + run('  ' + snippet(TXT[e], 54 - len(label)), row_rp),
                   before=0, after=0, line=190, exact=True, ind='<w:ind w:left="0"/>')
    # ------------------------------------------------ exam
    c2 = kicker('THE EXAM: 30 CLAUSES IT NEVER STUDIES', after=30)
    c2 += para(run('Marked right only if the true type scores strictly highest.', rpr(font=SANS, size=6.5, color=GREY)), before=0, after=70)
    for j in range(N_EXAM):
        t, n = int(YE[j]), j + 1
        rel = [(KE[j, p], p, int(Y[p])) for p in range(N_STUDY) if KE[j, p] > 0]
        own = [(c, f'm_{p+1}') for c, p, cls in rel if cls == t]
        others = sorted({cls for c, p, cls in rel if cls != t})
        if not own:
            hid = d.formula(['0'], HIDE, name=f'r_{n}')[0]
        else:
            hid = d.formula(total(d, own), HIDE, name=f'x_{n}')[0]
            tests = []
            for k in others:
                tests.append(iff(d, d.formula(total(d, [(c, f'm_{p+1}') for c, p, cls in rel if cls == k]) + [f'-x_{n}'], HIDE), '>=', 0, '1', '0', HIDE, quote=False))
            if not others:
                tests.append(iff(d, d.formula([f'0-x_{n}'], HIDE), '>=', 0, '1', '0', HIDE, quote=False))
            parts = ['1-SIGN(0']
            for x in tests:
                parts += ['+(', x, ')']
            hid += d.formula(parts + [')'], HIDE, name=f'r_{n}')[0]
        status = iff(d, d.formula([f'r_{n}'], glyph), '=', 1, 'right', 'wrong', glyph)[0]
        label = CLASSES[t]
        c2 += para(hid + status + run('  ' + label, row_b) + run('  ' + snippet(TXTE[j], 50 - len(label)), row_rp),
                   before=0, after=0, line=190, exact=True)
    # ------------------------------------------------ result
    score = d.formula(total(d, [(1, f'r_{j+1}') for j in range(N_EXAM)], HIDE), rpr(font=SERIF, size=54, color=ACCENT), name='z_1')
    memory = d.formula(total(d, [(1, f'm_{e+1}') for e in range(N_STUDY)], HIDE), rpr(font=SERIF, size=13, color=INK), name='q_1')
    c2 += para('', before=120, after=0, line=40, exact=True, pre=f'<w:pBdr><w:bottom w:val="single" w:sz="4" w:space="1" w:color="{RULE}"/></w:pBdr>')
    c2 += kicker('EXAM RESULT', jc='center', before=120, after=0)
    c2 += para(score[0] + run(f' of {N_EXAM}', rpr(font=SERIF, size=20, color=GREY)), jc='center', before=0, after=0, line=1150, exact=True)
    c2 += para(run('Its entire knowledge: ', rpr(font=SERIF, size=10, italic=True, color=GREY)) + memory[0]
               + run(' clauses in memory.', rpr(font=SERIF, size=10, italic=True, color=GREY)), jc='center', before=0, after=0)
    d.score, d.memory = int(score[1]), int(memory[1])

    g = [4900, 4738]
    side = f'<w:left w:val="single" w:sz="4" w:space="0" w:color="{RULE}"/>'
    tbl = (f'<w:tbl><w:tblPr><w:tblW w:w="{sum(g)}" w:type="dxa"/><w:tblLayout w:type="fixed"/>'
           '<w:tblCellMar><w:top w:w="90" w:type="dxa"/><w:left w:w="110" w:type="dxa"/><w:bottom w:w="90" w:type="dxa"/><w:right w:w="110" w:type="dxa"/></w:tblCellMar></w:tblPr>'
           '<w:tblGrid>' + ''.join(f'<w:gridCol w:w="{w}"/>' for w in g) + '</w:tblGrid>'
           f'<w:tr><w:trPr><w:cantSplit/></w:trPr>{tc(c1, g[0], PALE)}{tc(c2, g[1], borders=side)}</w:tr></w:tbl>')
    return control + tbl, d


def verify():
    out = {}
    for b in BUDGETS:
        _, d = machine(b)
        mem, right, acc = simulate(b)
        assert all(int(d.env[f'm_{e+1}']) == mem[e] for e in range(N_STUDY)), b
        assert all(int(d.env[f'r_{j+1}']) == right[j] for j in range(N_EXAM)), b
        assert d.score == right.sum() and d.memory == mem.sum()
        out[b] = dict(exam=int(right.sum()), memory=int(mem.sum()), acc_all=acc, fields=d.n_fields)
        print(f'budget {b:>2}: fields agree with numpy | exam {right.sum():>2}/{N_EXAM} | memory {mem.sum():>2} | all {len(yte):,} unseen clauses: {100 * acc:.1f}%')
    return out


def build():
    res = verify()
    content, d = machine(START_BUDGET, FLAT)
    print('fields:', d.n_fields)
    body_rp = rpr(font=SERIF, size=10.5)
    P = lambda t, **k: para(run(t, body_rp), **k)
    small = lambda t, **k: para(run(t, rpr(font=SERIF, size=8.5, italic=True, color=GREY)), **k)
    H1 = lambda t: para(run(t, rpr(font=SERIF, size=19, color=INK)), before=300, after=120, keep=True)
    rule = lambda after=120: para('', before=0, after=after, line=40, exact=True, pre=f'<w:pBdr><w:bottom w:val="single" w:sz="6" w:space="1" w:color="{INK}"/></w:pBdr>')
    sect = lambda extra='': ('<w:sectPr>' + extra + '<w:pgSz w:w="11906" w:h="16838"/>'
                             '<w:pgMar w:top="900" w:right="1134" w:bottom="800" w:left="1134" w:header="567" w:footer="567" w:gutter="0"/>')
    pc = lambda v: f'{100 * v:.0f}%'
    body = kicker('A WORKING DEMONSTRATION  ·  NO MACROS  ·  NO INTERNET', after=60)
    body += para(run('Watch it learn.', rpr(font=SERIF, size=30, color=INK)), before=0, after=40, line=240)
    body += para(run('This page knows nothing about contracts. Each time you press Tab it starts again from nothing, studies real clauses '
                     'one at a time, and then sits an exam on thirty clauses it has never seen.', rpr(font=SERIF, size=11.5, italic=True, color=GREY)), before=0, after=100)
    body += rule(after=60)
    body += content
    body += para(run('Nothing happening? Click “Enable Editing” and use Word on a computer. Leave the number with Tab, not the mouse. '
                     'To edit this page: Review → Restrict Editing → Stop Protection (no password).', rpr(font=SANS, size=7, color=GREY)),
                 jc='center', before=120, after=0, extra=sect() + '</w:sectPr>')

    # ---------------- editable pages
    body += kicker('THE ARGUMENT', after=60)
    body += para(run('The learning is free. The clauses are not.', rpr(font=SERIF, size=24, color=INK)), before=0, after=160, line=264)
    body += P('This paper argues that legal work has no moat outside data and distribution, and that cheaper cognition will '
              'therefore entrench the largest players instead of displacing them.')
    body += H1('What the first page does')
    body += P('The first page does not contain a trained model. It contains a rule for learning and forty real contract clauses. '
              'Every time it recalculates, it begins with an empty memory and works down the list:')
    body += P('It guesses each clause’s type by counting the key words the clause shares with the clauses already in its memory, '
              'type by type. If the right type does not come out on top, it files the clause in memory under the right type. '
              'That is the whole rule. Rules of this kind date from the 1960s, and this one fits in two sentences.', ind='<w:ind w:left="500" w:right="500"/>')
    body += P(f'Then it marks thirty clauses it never studied, the same way. Word’s field calculator does all of it: '
              f'{res[N_STUDY]["fields"]:,} fields, recomputed from nothing each time. Nothing is stored between runs.')
    body += H1('What changes the score')
    body += P('The rule never changes and costs nothing to copy. The only thing the reader can change is how many clauses it is allowed to see.')
    body += kicker(f'CLAUSES STUDIED  ·  SHARE OF ALL {len(yte):,} UNSEEN CLAUSES CLASSIFIED CORRECTLY', jc='center', before=160, after=100)
    body += bar_chart([dict(n=b, mean_acc=res[b]['acc_all']) for b in BUDGETS[1:]], (), 'studied')
    body += small(f'Measured by running the same rule, with the same forty clauses in the same order, against every one of the {len(yte):,} test clauses '
                  f'of these ten types. The thirty-clause exam on the first page is a random sample of them: '
                  + ', '.join(f'{res[b]["exam"]} of {N_EXAM} after {b}' for b in BUDGETS[1:]) + '.', jc='center', before=80, after=140,
                  ind='<w:ind w:left="500" w:right="500"/>')
    body += P(f'With nothing to study it gets nothing right. After five clauses it reaches {pc(res[5]["acc_all"])}, after twenty {pc(res[20]["acc_all"])}, '
              f'and after forty {pc(res[40]["acc_all"])}. At the end its entire knowledge is the {res[40]["memory"]} clauses it once got wrong. '
              'The model is not something separate from the data. It is the data.')
    body += H1('What this does not show')
    body += P('Sorting clauses into ten types is a narrow task. It is not legal reasoning, drafting or advice.')
    body += P('The forty study clauses and the exam clauses were drawn at random with a fixed seed, and the order matters: a different draw gives a '
              'different curve. In three other draws tested, forty clauses reached between about 80% and 87%.')
    body += P('The 64 key words it counts were chosen beforehand using about 18,000 labelled clauses. That choice is itself knowledge taken from data, '
              'and the page does not learn it.')
    body += P('The clauses are public SEC filings that anyone can download. The page shows that data is what makes the difference, not who can obtain it. '
              'It says nothing about distribution.')
    body += H1('Sources')
    body += P('Contract data: LEDGAR (Tuggener, von Däniken, Peetz and Cieliebak, LREC 2020), labelled provisions from contracts filed on SEC EDGAR, '
              'in the train/test split published with LexGLUE (Chalkidis et al., ACL 2022), licence CC BY 4.0. The ten types are: ' + ', '.join(CLASSES) + '. '
              'Study clauses come from the training split and exam clauses from the test split. Press Alt+F9 to see the fields (stop protection first if Word ignores the keys). '
              'The file is an ordinary .docx, a format that cannot contain macros.')
    body += para(run('Built with Claude, an AI system made by Anthropic.', rpr(font=SERIF, size=9, italic=True, color=GREY)), before=240)
    body += sect('<w:type w:val="nextPage"/>') + '<w:formProt w:val="0"/></w:sectPr>'

    head = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n'
    W = 'xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"'
    R = 'http://schemas.openxmlformats.org/officeDocument/2006/relationships'
    parts = {
        '[Content_Types].xml': f'{head}<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/><Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/><Override PartName="/word/settings.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.settings+xml"/></Types>',
        '_rels/.rels': f'{head}<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="{R}/officeDocument" Target="word/document.xml"/></Relationships>',
        'word/_rels/document.xml.rels': f'{head}<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="{R}/styles" Target="styles.xml"/><Relationship Id="rId2" Type="{R}/settings" Target="settings.xml"/></Relationships>',
        'word/document.xml': f'{head}<w:document {W}><w:body>{body}</w:body></w:document>',
        'word/styles.xml': f'{head}<w:styles {W}><w:docDefaults><w:rPrDefault><w:rPr><w:rFonts w:ascii="{SERIF}" w:hAnsi="{SERIF}" w:cs="{SERIF}" w:eastAsia="{SERIF}"/><w:color w:val="{INK}"/><w:sz w:val="21"/><w:szCs w:val="21"/><w:lang w:val="en-GB"/></w:rPr></w:rPrDefault><w:pPrDefault><w:pPr><w:spacing w:after="140" w:line="288" w:lineRule="auto"/></w:pPr></w:pPrDefault></w:docDefaults><w:style w:type="paragraph" w:default="1" w:styleId="Normal"><w:name w:val="Normal"/><w:qFormat/></w:style></w:styles>',
        'word/settings.xml': f'{head}<w:settings {W}><w:zoom w:percent="100"/><w:documentProtection w:edit="forms" w:enforcement="1"/><w:defaultTabStop w:val="720"/><w:compat><w:compatSetting w:name="compatibilityMode" w:uri="http://schemas.microsoft.com/office/word" w:val="15"/></w:compat></w:settings>',
    }
    with zipfile.ZipFile(OUT, 'w', zipfile.ZIP_DEFLATED) as z:
        for k, v in parts.items():
            z.writestr(k, v)
    print('wrote', OUT)


if __name__ == '__main__':
    build()
