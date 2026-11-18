"""Build "same-machine-different-data.docx": two identical neural networks, trained on
different amounts of real handwriting, running side by side inside a macro-free Word file.

    python3 train_law.py        # trains the networks, measures the learning curve -> curve.json
    python3 build_law.py        # writes same-machine-different-data.docx and verifies the field maths
    python3 build_law.py --pick # list candidate starting scans
    python3 build_law.py --flat # plain-text layout preview (no fields)

Uses the field machinery from build.py (drop-down form fields + IF / formula fields).
"""
import json, sys, zipfile, datetime
import numpy as np
from build import Doc, esc, rpr, run, para, terms, ON, OFF

C = json.load(open('curve.json'))
H, N_TEST = C['H'], C['n_test']
TEST_X, TEST_Y = np.array(C['test_X']), np.array(C['test_y'])
SMALL_N, LARGE_N = 20, 1077
NETS = {}
for key, n in (('A', SMALL_N), ('B', LARGE_N)):
    t = C['nets'][str(n)]
    NETS[key] = dict(n=n, correct=t['correct'], W1=np.array(t['W1']), b1=np.array(t['b1']),
                     W2=np.array(t['W2']), b2=np.array(t['b2']))
# bookmark letters per network: weighted sum, fired value, output score, running max, answer
LET = {'A': ('a', 'h', 'o', 'm', 'd'), 'B': ('b', 'g', 'q', 'x', 'z')}
START_INDEX = 399
FLAT = '--flat' in sys.argv
OUT = 'preview-law-flat.docx' if FLAT else 'same-machine-different-data.docx'

INK, ACCENT, GREY, PALE, RULE = '14171F', '7A1F2B', '6E6A64', 'F4F1EA', 'CFC8BB'
SERIF, SANS = 'Georgia', 'Arial'
HIDE = rpr(size=1, color='FFFFFF')


def forward(net, x):
    a = x @ net['W1'] + net['b1']
    h = a + np.abs(a)
    return a, h, h @ net['W2'] + net['b2']


def network_fields(d, key):
    """All the invisible arithmetic of one network; returns xml for 1pt paragraphs."""
    net, (A, Hh, O, Mx, D) = NETS[key], LET[key]
    W1, b1, W2, b2 = net['W1'], net['b1'], net['W2'], net['b2']
    sp = run(' ', HIDE)
    x = ''
    for j in range(H):                                   # hidden layer
        parts = [f'0{"+" if b1[j] >= 0 else "-"}{abs(int(b1[j]))}']
        for r in range(8):
            pr = [(W1[r * 8 + c, j], f'v_{r+1}{c+1}') for c in range(8)]
            if any(w for w, _ in pr):
                parts += ['+(', d.formula([terms(pr)], HIDE), ')']
        x += d.formula(parts, HIDE, name=f'{A}_{j+1}')[0] + sp
    for j in range(H):                                   # a + |a|  (= 2 x ReLU)
        x += d.formula([f'{A}_{j+1}+ABS({A}_{j+1})'], HIDE, name=f'{Hh}_{j+1}')[0] + sp
    for k in range(10):                                  # output scores
        parts = [f'0{"+" if b2[k] >= 0 else "-"}{abs(int(b2[k]))}']
        for g in range(0, H, 5):
            pr = [(W2[j, k], f'{Hh}_{j+1}') for j in range(g, min(g + 5, H))]
            if any(w for w, _ in pr):
                parts += ['+(', d.formula([terms(pr)], HIDE), ')']
        x += d.formula(parts, HIDE, name=f'{O}_{k}')[0] + sp
    prev = f'{O}_0'                                      # running maximum: (a+b+|a-b|)/2
    for k in range(1, 10):
        x += d.formula([f'({prev}+{O}_{k}+ABS({prev}-{O}_{k}))/2'], HIDE, name=f'{Mx}_{k}')[0] + sp
        prev = f'{Mx}_{k}'
    return para(x, before=0, after=0, line=20, exact=True)


def answer_field(d, key, rp):
    """The winning digit as a number: sum of k x [score k equals the maximum]."""
    _, _, O, Mx, D = LET[key]
    parts = ['0']
    for k in range(1, 10):
        hit = d.iff(d.formula([f'ABS({O}_{k}-{Mx}_9)'], rp), '=', 0, '1', '0', rp, quote=False)
        parts += [f'+{k}*(', hit, ')']
    return d.formula(parts, rp, name=f'{D}_1')


def tc(content, width, fill='FFFFFF', valign='top', borders=''):
    return (f'<w:tc><w:tcPr><w:tcW w:w="{width}" w:type="dxa"/>'
            + (f'<w:tcBorders>{borders}</w:tcBorders>' if borders else '')
            + f'<w:shd w:val="clear" w:color="auto" w:fill="{fill}"/><w:vAlign w:val="{valign}"/></w:tcPr>{content}</w:tc>')


def kicker(text, color=ACCENT, jc=None, before=0, after=60):
    return para(run(text, rpr(font=SANS, size=7.5, bold=True, color=color, spacing=30)), jc=jc, before=before, after=after, keep=True)


def machine(pixels, flat=False):
    d = Doc(flat)
    px = np.array(pixels).reshape(8, 8)
    # --- cell 1: the grid, then the invisible 0/1 conversion
    c1 = kicker('DRAW A DIGIT', jc='center')
    for r in range(8):
        c1 += para(''.join(d.dropdown(f'k_{r+1}{c+1}', px[r, c], rpr(font=SANS, size=20, color=INK, spacing=30))
                           for c in range(8)), jc='center', before=0, after=0, line=340, exact=True)
    v = ''
    for r in range(8):
        for c in range(8):
            v += d.iff(d.ref(f'k_{r+1}{c+1}', HIDE), '=', ON, '1', '0', HIDE, name=f'v_{r+1}{c+1}', quote=False)[0] + run(' ', HIDE)
    c1 += para(v, before=0, after=0, line=20, exact=True)
    c1 += para(run('Pick ■ or □ in any square, then press Tab.', rpr(font=SERIF, size=9, italic=True, color=GREY)),
               jc='center', before=100, after=0)

    cells = {}
    for key in 'AB':
        net = NETS[key]
        big = rpr(font=SERIF, size=92, bold=False, color=ACCENT if key == 'B' else GREY)
        c = network_fields(d, key)
        c += kicker(f'TRAINED ON {net["n"]:,} SCANS', color=ACCENT if key == 'B' else GREY, jc='center')
        c += para(answer_field(d, key, big)[0], jc='center', before=0, after=0, line=1900, exact=True)
        c += para(run(f'reads {net["correct"]} of {N_TEST} unseen scans correctly', rpr(font=SERIF, size=9, italic=True, color=GREY)),
                  jc='center', before=0, after=0)
        c += para(run(f'{100 * net["correct"] / N_TEST:.0f}%', rpr(font=SERIF, size=15, color=INK)), jc='center', before=20, after=0)
        cells[key] = c
    verdict_rp = rpr(font=SERIF, size=17, italic=True, color=INK)
    verdict = d.iff(d.formula(['d_1-z_1'], verdict_rp), '=', 0, 'They agree.', 'They disagree.', verdict_rp)
    d.answers = (d.env['d_1'], d.env['z_1'])
    d.verdict = verdict[1]

    g = [3600, 3019, 3019]
    side = f'<w:left w:val="single" w:sz="4" w:space="0" w:color="{RULE}"/>'
    tbl = (f'<w:tbl><w:tblPr><w:tblW w:w="{sum(g)}" w:type="dxa"/><w:tblLayout w:type="fixed"/>'
           '<w:tblCellMar><w:top w:w="80" w:type="dxa"/><w:left w:w="120" w:type="dxa"/>'
           '<w:bottom w:w="80" w:type="dxa"/><w:right w:w="120" w:type="dxa"/></w:tblCellMar></w:tblPr>'
           '<w:tblGrid>' + ''.join(f'<w:gridCol w:w="{w}"/>' for w in g) + '</w:tblGrid>'
           f'<w:tr><w:trPr><w:cantSplit/></w:trPr>{tc(c1, g[0], PALE)}{tc(cells["A"], g[1], borders=side)}{tc(cells["B"], g[2], borders=side)}</w:tr>'
           '</w:tbl>')
    tbl += para(verdict[0], jc='center', before=200, after=60)
    return tbl, d


def verify():
    agree = {k: 0 for k in 'AB'}
    for x in TEST_X:
        _, d = machine(x)
        for key, got in zip('AB', d.answers):
            a, h, o = forward(NETS[key], x)
            A, Hh, O, Mx, _ = LET[key]
            assert all(int(d.env[f'{A}_{j+1}']) == a[j] and int(d.env[f'{Hh}_{j+1}']) == h[j] for j in range(H))
            assert all(int(d.env[f'{O}_{k}']) == o[k] for k in range(10)) and int(d.env[f'{Mx}_9']) == o.max()
            agree[key] += got == str(int(o.argmax()))
        assert d.verdict == ('They agree.' if d.answers[0] == d.answers[1] else 'They disagree.')
    correct = {k: 0 for k in 'AB'}
    for x, y in zip(TEST_X, TEST_Y):
        _, d = machine(x)
        for key, got in zip('AB', d.answers):
            correct[key] += got == str(int(y))
    print('field-code emulation identical to numpy:', agree, 'of', N_TEST, '| correct:', correct)
    assert all(v == N_TEST for v in agree.values())
    assert all(correct[k] == NETS[k]['correct'] for k in 'AB')
    return correct


def pick():
    out = []
    for i, (x, y) in enumerate(zip(TEST_X, TEST_Y)):
        oa, ob = forward(NETS['A'], x)[2], forward(NETS['B'], x)[2]
        if oa.argmax() != y and ob.argmax() == y:
            ga, gb = np.sort(oa), np.sort(ob)
            out.append((min(ga[-1] - ga[-2], gb[-1] - gb[-2]), i, int(y), int(oa.argmax())))
    out.sort(reverse=True)
    print(len(out), 'test scans where the 20-scan network is wrong and the 1,077-scan network is right')
    for chunk in range(0, 18, 6):
        sel = out[chunk:chunk + 6]
        print('   '.join(f'#{i} is {y}, A says {a}'.ljust(20) for _, i, y, a in sel))
        for r in range(8):
            print('   '.join(''.join('#' if v else '.' for v in TEST_X[i].reshape(8, 8)[r]).ljust(20) for _, i, _, _ in sel))


def bar_chart():
    """Horizontal bars drawn with paragraph shading: mean test accuracy for each training-set size."""
    usable = 5600 - 160
    rows = ''
    for pt in C['curve']:
        n, acc = pt['n'], pt['mean_acc']
        hot = n in (SMALL_N, LARGE_N)
        fill = ACCENT if hot else 'B9B2A6'
        lab = para(run(f'{n:,} scans', rpr(font=SANS, size=8.5, bold=hot, color=INK if hot else GREY)), jc='right', before=0, after=0)
        bar = para(run(f'{100 * acc:.0f}%', rpr(font=SANS, size=8.5, bold=True, color='FFFFFF')), jc='right', before=0, after=0,
                   pre=f'<w:shd w:val="clear" w:color="auto" w:fill="{fill}"/>', ind=f'<w:ind w:left="0" w:right="{int((1 - acc) * usable)}"/>')
        rows += f'<w:tr><w:trPr><w:cantSplit/></w:trPr>{tc(lab, 1500, valign="center")}{tc(bar, 5600, valign="center")}</w:tr>'
    return ('<w:tbl><w:tblPr><w:tblW w:w="7100" w:type="dxa"/><w:jc w:val="center"/><w:tblLayout w:type="fixed"/>'
            '<w:tblCellMar><w:top w:w="25" w:type="dxa"/><w:left w:w="80" w:type="dxa"/>'
            '<w:bottom w:w="25" w:type="dxa"/><w:right w:w="80" w:type="dxa"/></w:tblCellMar></w:tblPr>'
            '<w:tblGrid><w:gridCol w:w="1500"/><w:gridCol w:w="5600"/></w:tblGrid>' + rows + '</w:tbl>')


def build():
    verify()
    start = TEST_X[START_INDEX]
    table, d = machine(start, FLAT)
    print('start scan', START_INDEX, 'true digit', TEST_Y[START_INDEX], 'answers', d.answers, d.verdict, '| fields', d.n_fields)
    assert d.answers[1] == str(TEST_Y[START_INDEX]) and d.answers[0] != d.answers[1]

    A, B = NETS['A'], NETS['B']
    n_params = A['W1'].size + A['b1'].size + A['W2'].size + A['b2'].size
    n_mult = 64 * H + H * 10
    cv = {p['n']: p['mean_acc'] for p in C['curve']}
    pct = lambda v: f'{100 * v:.0f}'
    body_rp = rpr(font=SERIF, size=10.5)
    P = lambda t, **k: para(run(t, body_rp), **k)
    rule = lambda before=0, after=120: para('', before=before, after=after, line=40, exact=True,
                                           pre=f'<w:pBdr><w:bottom w:val="single" w:sz="6" w:space="1" w:color="{INK}"/></w:pBdr>')
    sect = lambda extra='': ('<w:sectPr>' + extra + '<w:pgSz w:w="11906" w:h="16838"/>'
                             '<w:pgMar w:top="1020" w:right="1134" w:bottom="1020" w:left="1134" w:header="567" w:footer="567" w:gutter="0"/>')

    body = ''
    # ---------------- page 1: protected for forms
    body += kicker('A WORKING DEMONSTRATION  ·  NO MACROS  ·  NO INTERNET', after=80)
    body += para(run('Same machine. Different data.', rpr(font=SERIF, size=30, color=INK)), before=0, after=60, line=240)
    body += para(run('Two neural networks are running inside this page. They are identical in every way but one: '
                     'how much real handwriting each was shown before it got here.', rpr(font=SERIF, size=12.5, italic=True, color=GREY)),
                 before=0, after=140)
    body += rule(after=160)
    body += table
    body += para(run(f'Both networks hold the same {n_params:,} numbers in the same arrangement, and each answer costs the same '
                     f'{n_mult:,} multiplications. The cost of the thinking is identical. The quality of the answer is not.',
                     rpr(font=SERIF, size=10.5, color=INK)), jc='center', before=0, after=200,
                 ind='<w:ind w:left="900" w:right="900"/>')
    body += rule(after=140)
    body += kicker('WHAT MORE DATA BOUGHT  ·  SAME NETWORK, SAME TEST, MORE TRAINING SCANS', jc='center', after=100)
    body += bar_chart()
    body += para(run(f'Share of {N_TEST} unseen handwriting scans read correctly. Each bar is the average of {C["runs"]} training runs '
                     f'on different random samples of real scans. The two networks on this page are one run each, at {SMALL_N} and {LARGE_N:,} scans.',
                     rpr(font=SERIF, size=8.5, italic=True, color=GREY)), jc='center', before=100, after=0,
                 ind='<w:ind w:left="900" w:right="900"/>')
    body += para(run('Nothing happening? Click “Enable Editing” at the top and use Word on a computer, not the browser or phone '
                     'version. The page updates when you leave a square. To edit this page: Review → Restrict Editing → Stop Protection '
                     '(no password).', rpr(font=SANS, size=7.5, color=GREY)), jc='center', before=260, after=0,
                 extra=sect() + '</w:sectPr>')

    # ---------------- page 2: editable
    H1 = lambda t: para(run(t, rpr(font=SERIF, size=20, color=INK)), before=300, after=120, keep=True)
    body += kicker('THE ARGUMENT', after=60)
    body += para(run('Cognition is getting cheap. Data and distribution are not.', rpr(font=SERIF, size=24, color=INK)), before=0, after=160, line=264)
    body += P('This paper argues that legal work has no moat outside data and distribution, and that cheaper cognition will '
              'therefore entrench the largest players instead of displacing them.')
    body += H1('What the first page shows')
    body += P(f'The two networks on the first page are the same machine. Each has {n_params:,} learned numbers, arranged the same way, '
              f'and each needs the same {n_mult:,} multiplications to read a digit. Word’s own calculator, a feature from the '
              f'1990s, does that arithmetic in the time it takes to press Tab. The reasoning itself is close to free.')
    body += P(f'The only difference is experience. One network learned from {SMALL_N} real handwriting scans and the other from {LARGE_N:,}. '
              f'On {N_TEST} scans neither had seen, the first reads {A["correct"]} correctly ({pct(A["correct"] / N_TEST)}%) and the second reads '
              f'{B["correct"]} ({pct(B["correct"] / N_TEST)}%). Anyone can copy the machine. Nobody can copy the scans without having them.')
    body += H1('What it does not show')
    body += P('This is an illustration of a mechanism, not evidence about the legal market. The networks read handwritten digits, '
              'not contracts, and nothing here measures a law firm.')
    body += P('It says nothing about distribution: client relationships, panels, referral networks and brand are outside the demonstration.')
    body += P(f'It also cuts against the thesis in one respect. The returns to data flatten: going from {SMALL_N} to 80 scans lifts average '
              f'accuracy from {pct(cv[20])}% to {pct(cv[80])}%, but going from 640 to {LARGE_N:,} lifts it only from {pct(cv[640])}% to {pct(cv[1077])}%. '
              'If legal data behaves the same way, a mid-sized player with enough data may be nearly as good as the largest. '
              'The argument needs to say why legal data would not saturate like this.')
    body += H1('How it works')
    body += P(f'Each square is a Word drop-down form field. Hidden IF fields turn the 64 squares into ones and zeros, formula fields '
              f'compute {H} hidden neurons and 10 output scores for each network, and the digit with the highest score is printed. '
              f'There are {d.n_fields:,} fields on the first page, almost all of them set in white, one-point type. '
              'Press Alt+F9 to see them (if Word ignores the keys, stop protection first).')
    body += P(f'The scans are the 1,797 real handwritten digits distributed with scikit-learn, from the UCI “Optical Recognition of '
              f'Handwritten Digits” collection. {N_TEST} were set aside for testing and never used in training. Both networks were trained '
              f'with the same settings and rounded to whole numbers so that Word can run them. The accuracy figures were measured by '
              f'evaluating the formulas stored in this file. The file is an ordinary .docx, a format that cannot contain macros.')
    body += para(run('Built with Claude, an AI system made by Anthropic.', rpr(font=SERIF, size=9, italic=True, color=GREY)), before=240)
    body += sect('<w:type w:val="nextPage"/>') + '<w:formProt w:val="0"/></w:sectPr>'

    head = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n'
    document = (f'{head}<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" '
                f'xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><w:body>{body}</w:body></w:document>')
    styles = f'''{head}<w:styles xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
<w:docDefaults><w:rPrDefault><w:rPr><w:rFonts w:ascii="{SERIF}" w:hAnsi="{SERIF}" w:cs="{SERIF}" w:eastAsia="{SERIF}"/><w:color w:val="{INK}"/><w:sz w:val="21"/><w:szCs w:val="21"/><w:lang w:val="en-GB"/></w:rPr></w:rPrDefault>
<w:pPrDefault><w:pPr><w:spacing w:after="140" w:line="288" w:lineRule="auto"/></w:pPr></w:pPrDefault></w:docDefaults>
<w:style w:type="paragraph" w:default="1" w:styleId="Normal"><w:name w:val="Normal"/><w:qFormat/></w:style>
<w:style w:type="table" w:default="1" w:styleId="TableNormal"><w:name w:val="Normal Table"/><w:uiPriority w:val="99"/><w:semiHidden/><w:unhideWhenUsed/><w:tblPr><w:tblInd w:w="0" w:type="dxa"/><w:tblCellMar><w:top w:w="0" w:type="dxa"/><w:left w:w="108" w:type="dxa"/><w:bottom w:w="0" w:type="dxa"/><w:right w:w="108" w:type="dxa"/></w:tblCellMar></w:tblPr></w:style>
</w:styles>'''
    settings = f'''{head}<w:settings xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:zoom w:percent="100"/><w:documentProtection w:edit="forms" w:enforcement="1"/><w:defaultTabStop w:val="720"/><w:characterSpacingControl w:val="doNotCompress"/><w:compat><w:compatSetting w:name="compatibilityMode" w:uri="http://schemas.microsoft.com/office/word" w:val="15"/></w:compat></w:settings>'''
    content_types = f'''{head}<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/><Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/><Override PartName="/word/settings.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.settings+xml"/><Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/></Types>'''
    rels = f'''{head}<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/></Relationships>'''
    doc_rels = f'''{head}<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/settings" Target="settings.xml"/></Relationships>'''
    now = datetime.datetime.now(datetime.timezone.utc).strftime('%Y-%m-%dT%H:%M:%SZ')
    core = f'''{head}<cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><dc:title>Same machine. Different data.</dc:title><dcterms:created xsi:type="dcterms:W3CDTF">{now}</dcterms:created><dcterms:modified xsi:type="dcterms:W3CDTF">{now}</dcterms:modified></cp:coreProperties>'''
    with zipfile.ZipFile(OUT, 'w', zipfile.ZIP_DEFLATED) as z:
        for name, data in (('[Content_Types].xml', content_types), ('_rels/.rels', rels), ('word/document.xml', document),
                           ('word/_rels/document.xml.rels', doc_rels), ('word/styles.xml', styles),
                           ('word/settings.xml', settings), ('docProps/core.xml', core)):
            z.writestr(name, data)
    print('wrote', OUT)


if __name__ == '__main__':
    pick() if '--pick' in sys.argv else build()
