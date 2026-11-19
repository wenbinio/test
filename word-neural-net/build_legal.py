"""Build "cheap-cognition-legal.docx": two identical neural networks, trained on different
numbers of real contract clauses, running side by side inside a macro-free Word file,
plus the measured learning curves and a native chart of published AI inference prices.

    python3 train_legal.py             # downloads LEDGAR, runs the experiments -> legal.json
    python3 build_legal.py             # writes cheap-cognition-legal.docx, verifies the field maths
    python3 build_legal.py --no-chart  # same, with the price chart drawn as plain bars (fallback)
    python3 build_legal.py --pick      # list candidate opening clauses
    python3 build_legal.py --flat      # plain-text layout preview (no fields)
"""
import io, json, sys, zipfile, datetime
import numpy as np
from build import Doc, esc, rpr, run, tab, para, terms, ON, OFF

L = json.load(open('legal.json'))
H, N_TEST, CLASSES, WORDS = L['H'], L['n_test'], L['classes'], L['words']
TEST_X, TEST_Y, TEST_TEXT = np.array(L['test_X']), np.array(L['test_y']), L['test_text']
SMALL_N, LARGE_N = 20, L['n_pool']
NETS = {}
for key, n in (('A', SMALL_N), ('B', LARGE_N)):
    t = L['nets'][str(n)]
    NETS[key] = dict(n=n, correct=t['correct'], W1=np.array(t['W1']), b1=np.array(t['b1']),
                     W2=np.array(t['W2']), b2=np.array(t['b2']))
LET = {'A': ('a', 'h', 'o', 'm', 'd'), 'B': ('b', 'g', 'q', 'x', 'z')}
START_INDEX = 963
FLAT, NO_CHART = '--flat' in sys.argv, '--no-chart' in sys.argv
OUT = 'preview-legal-flat.docx' if FLAT else ('cheap-cognition-legal-no-chart.docx' if NO_CHART else 'cheap-cognition-legal.docx')

INK, ACCENT, GREY, PALE, RULE = '14171F', '7A1F2B', '6E6A64', 'F4F1EA', 'CFC8BB'
SERIF, SANS = 'Georgia', 'Arial'
HIDE = rpr(size=1, color='FFFFFF')
HIDE_PALE = rpr(size=1, color=PALE)

# Published prices: cheapest model reaching GPT-3.5's score (64.8) on the MMLU benchmark, USD per million tokens.
# Source: Epoch AI, "LLM inference prices have fallen rapidly but unequally across tasks" (12 March 2025),
# table "Lowest inference prices", MMLU, GPT-3.5 threshold. The first and last rows are also the figures
# reported in the Stanford HAI 2025 AI Index Report, chapter 1.
PRICES = [('2022-11-30', 'GPT-3.5', 20.00), ('2023-03-06', 'GPT-3.5 Turbo', 2.00), ('2023-11-06', 'GPT-3.5-Turbo-2023-11', 0.75),
          ('2024-03-04', 'Claude-3-Haiku', 0.50), ('2024-05-10', 'Gemini-1.5-Flash-2024-05', 0.13),
          ('2024-07-23', 'Llama-3.1-Instruct-8B', 0.10), ('2024-10-03', 'Gemini-1.5-Flash-8B', 0.07)]
EPOCH_URL = 'https://epoch.ai/data-insights/ai-inference-price-trends'
HAI_URL = 'https://hai.stanford.edu/ai-index/2025-ai-index-report/research-and-development'


def forward(net, x):
    a = x @ net['W1'] + net['b1']
    h = a + np.abs(a)
    return a, h, h @ net['W2'] + net['b2']


def word_dropdown(d, i, on, rp):
    """Drop-down form field for word i: entries '□ word' / '■ word'; bookmark k_<i+1>."""
    name, off_t, on_t = f'k_{i+1}', f'{OFF} {WORDS[i]}', f'{ON} {WORDS[i]}'
    d.n_fields += 1
    d.bm_id += 1
    d.env[name] = on_t if on else off_t
    if d.flat:
        return f'<w:r>{rp}<w:t xml:space="preserve">{d.env[name]}</w:t></w:r>'
    sel = 1 if on else 0
    ff = (f'<w:ffData><w:name w:val="{name}"/><w:enabled/><w:calcOnExit/>'
          f'<w:ddList><w:result w:val="{sel}"/><w:default w:val="{sel}"/>'
          f'<w:listEntry w:val="{off_t}"/><w:listEntry w:val="{on_t}"/></w:ddList></w:ffData>')
    return (f'<w:r>{rp}<w:fldChar w:fldCharType="begin">{ff}</w:fldChar></w:r>'
            f'<w:bookmarkStart w:id="{d.bm_id}" w:name="{name}"/>'
            f'<w:r>{rp}<w:instrText xml:space="preserve"> FORMDROPDOWN </w:instrText></w:r>'
            f'<w:r>{rp}<w:fldChar w:fldCharType="separate"/></w:r>'
            f'<w:r>{rp}<w:fldChar w:fldCharType="end"/></w:r>'
            f'<w:bookmarkEnd w:id="{d.bm_id}"/>')


def network_fields(d, key):
    """All the invisible arithmetic of one network, in white one-point type."""
    net, (A, Hh, O, Mx, D) = NETS[key], LET[key]
    W1, b1, W2, b2 = net['W1'], net['b1'], net['W2'], net['b2']
    sp = run(' ', HIDE)
    x = ''
    for j in range(H):                                   # hidden layer, 8 inputs per nested field
        parts = [f'0{"+" if b1[j] >= 0 else "-"}{abs(int(b1[j]))}']
        for g in range(0, 64, 8):
            pr = [(W1[i, j], f'v_{i+1}') for i in range(g, g + 8)]
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
    parts = ['0']                                        # index of the winning type
    for k in range(1, 10):
        hit = d.iff(d.formula([f'ABS({O}_{k}-{Mx}_9)'], HIDE), '=', 0, '1', '0', HIDE, quote=False)
        parts += [f'+{k}*(', hit, ')']
    x += d.formula(parts, HIDE, name=f'{D}_1')[0]
    return para(x, before=0, after=0, line=20, exact=True)


def tc(content, width, fill='FFFFFF', valign='top', borders=''):
    return (f'<w:tc><w:tcPr><w:tcW w:w="{width}" w:type="dxa"/>'
            + (f'<w:tcBorders>{borders}</w:tcBorders>' if borders else '')
            + f'<w:shd w:val="clear" w:color="auto" w:fill="{fill}"/><w:vAlign w:val="{valign}"/></w:tcPr>{content}</w:tc>')


def kicker(text, color=ACCENT, jc=None, before=0, after=60):
    return para(run(text, rpr(font=SANS, size=7.5, bold=True, color=color, spacing=30)), jc=jc, before=before, after=after, keep=True)


def machine(x_in, flat=False):
    d = Doc(flat)
    # --- left cell: the word wall (4 columns x 16 rows, alphabetical down the columns)
    colw = 1570
    tabs = [('left', colw * c) for c in range(1, 4)]
    c1 = kicker('THE 64 WORDS BOTH NETWORKS LOOK FOR   ·   ■ = IN THE CLAUSE', after=80)
    wrp = rpr(font=SANS, size=8.5, color=INK)
    for r in range(16):
        line = ''
        for c in range(4):
            i = c * 16 + r
            line += (tab() if c else '') + word_dropdown(d, i, x_in[i], wrp)
        c1 += para(line, tabs=tabs, before=0, after=0, line=262, exact=True)
    v = ''
    for i in range(64):
        v += d.iff(d.ref(f'k_{i+1}', HIDE_PALE), '=', f'{ON} {WORDS[i]}', '1', '0', HIDE_PALE, name=f'v_{i+1}', quote=False)[0] + run(' ', HIDE_PALE)
    c1 += para(v, before=0, after=0, line=20, exact=True)
    c1 += para(run('Click a word, choose ■ or □, then press Tab.', rpr(font=SERIF, size=9, italic=True, color=GREY)), before=80, after=0)

    # --- right cell: both networks
    c2 = ''
    for key in 'AB':
        net = NETS[key]
        col = ACCENT if key == 'B' else GREY
        big = rpr(font=SERIF, size=17, color=col)
        D = LET[key][4]
        c2 += network_fields(d, key)
        c2 += kicker(f'TRAINED ON {net["n"]:,} CLAUSES', color=col, jc='center', before=0 if key == 'A' else 200, after=40)
        line = ''
        for k in range(10):
            line += d.iff(d.formula([f'{D}_1'], big), '=', k, CLASSES[k], '', big)[0]
        c2 += para(line, jc='center', before=0, after=20, line=440, exact=True)
        c2 += para(run(f'right on {net["correct"]:,} of {N_TEST:,} unseen clauses ({100 * net["correct"] / N_TEST:.0f}%)',
                       rpr(font=SERIF, size=8.5, italic=True, color=GREY)), jc='center', before=0, after=0)
    vrp = rpr(font=SERIF, size=15, italic=True, color=INK)
    verdict = d.iff(d.formula(['d_1-z_1'], vrp), '=', 0, 'They agree.', 'They disagree.', vrp)
    c2 += para('', before=160, after=0, line=40, exact=True, pre=f'<w:pBdr><w:bottom w:val="single" w:sz="4" w:space="1" w:color="{RULE}"/></w:pBdr>')
    c2 += para(verdict[0], jc='center', before=140, after=0)
    d.answers = (int(d.env['d_1']), int(d.env['z_1']))
    d.verdict = verdict[1]

    g = [6500, 3138]
    side = f'<w:left w:val="single" w:sz="4" w:space="0" w:color="{RULE}"/>'
    tbl = (f'<w:tbl><w:tblPr><w:tblW w:w="{sum(g)}" w:type="dxa"/><w:tblLayout w:type="fixed"/>'
           '<w:tblCellMar><w:top w:w="100" w:type="dxa"/><w:left w:w="120" w:type="dxa"/>'
           '<w:bottom w:w="100" w:type="dxa"/><w:right w:w="120" w:type="dxa"/></w:tblCellMar></w:tblPr>'
           '<w:tblGrid>' + ''.join(f'<w:gridCol w:w="{w}"/>' for w in g) + '</w:tblGrid>'
           f'<w:tr><w:trPr><w:cantSplit/></w:trPr>{tc(c1, g[0], PALE)}{tc(c2, g[1], valign="center", borders=side)}</w:tr></w:tbl>')
    return tbl, d


def verify():
    agree, correct = {k: 0 for k in 'AB'}, {k: 0 for k in 'AB'}
    for x, y in zip(TEST_X, TEST_Y):
        _, d = machine(x)
        for key, got in zip('AB', d.answers):
            a, h, o = forward(NETS[key], x)
            A, Hh, O, Mx, _ = LET[key]
            assert all(int(d.env[f'{A}_{j+1}']) == a[j] and int(d.env[f'{Hh}_{j+1}']) == h[j] for j in range(H))
            assert all(int(d.env[f'{O}_{k}']) == o[k] for k in range(10)) and int(d.env[f'{Mx}_9']) == o.max()
            tie = int((o == o.max()).sum()) > 1
            agree[key] += (got == int(o.argmax())) or tie
            correct[key] += got == int(y)
        assert d.verdict == ('They agree.' if d.answers[0] == d.answers[1] else 'They disagree.')
    print('field-code emulation identical to numpy:', agree, 'of', N_TEST, '| correct:', correct)
    assert all(v == N_TEST for v in agree.values())
    return correct


def pick():
    out = []
    for i, (x, y) in enumerate(zip(TEST_X, TEST_Y)):
        oa, ob = forward(NETS['A'], x)[2], forward(NETS['B'], x)[2]
        n = len(TEST_TEXT[i].split())
        if oa.argmax() != y and ob.argmax() == y and 20 <= n <= 60 and x.sum() >= 3:
            ga, gb = np.sort(oa), np.sort(ob)
            out.append((int(min(ga[-1] - ga[-2], gb[-1] - gb[-2])), i, CLASSES[y], CLASSES[int(oa.argmax())], n, int(x.sum())))
    out.sort(reverse=True)
    print(len(out), 'short test clauses the 20-clause network gets wrong and the full network gets right')
    for m, i, y, a, n, s in out[:14]:
        print(f'#{i} [{y}] small says [{a}] words={n} ticked={s} margin={m}\n    {TEST_TEXT[i]}')


def bar_chart(points, hot, unit, total_w=7300, label_w=1700):
    """Horizontal bars drawn with paragraph shading (0-100% scale, no truncated axis)."""
    bar_w = total_w - label_w
    usable = bar_w - 160
    rows = ''
    for pt in points:
        n, acc = pt['n'], pt['mean_acc']
        is_hot = n in hot
        lab = para(run(f'{n:,} {unit}', rpr(font=SANS, size=8.5, bold=is_hot, color=INK if is_hot else GREY)), jc='right', before=0, after=0)
        bar = para(run(f'{100 * acc:.0f}%', rpr(font=SANS, size=8.5, bold=True, color='FFFFFF')), jc='right', before=0, after=0,
                   pre=f'<w:shd w:val="clear" w:color="auto" w:fill="{ACCENT if is_hot else "B9B2A6"}"/>',
                   ind=f'<w:ind w:left="0" w:right="{int((1 - acc) * usable)}"/>')
        rows += f'<w:tr><w:trPr><w:cantSplit/></w:trPr>{tc(lab, label_w, valign="center")}{tc(bar, bar_w, valign="center")}</w:tr>'
    return (f'<w:tbl><w:tblPr><w:tblW w:w="{total_w}" w:type="dxa"/><w:jc w:val="center"/><w:tblLayout w:type="fixed"/>'
            '<w:tblCellMar><w:top w:w="25" w:type="dxa"/><w:left w:w="80" w:type="dxa"/>'
            '<w:bottom w:w="25" w:type="dxa"/><w:right w:w="80" w:type="dxa"/></w:tblCellMar></w:tblPr>'
            f'<w:tblGrid><w:gridCol w:w="{label_w}"/><w:gridCol w:w="{bar_w}"/></w:tblGrid>' + rows + '</w:tbl>')


# ---------------------------------------------------------------------------------------
# Native Word chart of the published prices (scatter, log scale) + its embedded workbook
# ---------------------------------------------------------------------------------------
def serial(iso):
    return (datetime.date.fromisoformat(iso) - datetime.date(1899, 12, 30)).days


def chart_xml():
    n = len(PRICES)
    xs = ''.join(f'<c:pt idx="{i}"><c:v>{serial(d)}</c:v></c:pt>' for i, (d, _, _) in enumerate(PRICES))
    ys = ''.join(f'<c:pt idx="{i}"><c:v>{p}</c:v></c:pt>' for i, (_, _, p) in enumerate(PRICES))
    line = lambda color, w: f'<a:ln w="{w}" cap="rnd"><a:solidFill><a:srgbClr val="{color}"/></a:solidFill><a:round/></a:ln>'
    text = lambda sz, color, bold=0: (f'<c:txPr><a:bodyPr/><a:lstStyle/><a:p><a:pPr><a:defRPr sz="{sz}" b="{bold}"><a:solidFill><a:srgbClr val="{color}"/></a:solidFill>'
                                      f'<a:latin typeface="{SANS}"/></a:defRPr></a:pPr><a:endParaRPr lang="en-GB"/></a:p></c:txPr>')
    return ('<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n'
            '<c:chartSpace xmlns:c="http://schemas.openxmlformats.org/drawingml/2006/chart" '
            'xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" '
            'xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">'
            '<c:date1904 val="0"/><c:roundedCorners val="0"/>'
            '<c:chart><c:autoTitleDeleted val="1"/><c:plotArea><c:layout/>'
            '<c:scatterChart><c:scatterStyle val="lineMarker"/><c:varyColors val="0"/>'
            '<c:ser><c:idx val="0"/><c:order val="0"/>'
            '<c:tx><c:strRef><c:f>Sheet1!$B$1</c:f><c:strCache><c:ptCount val="1"/><c:pt idx="0"><c:v>USD per million tokens</c:v></c:pt></c:strCache></c:strRef></c:tx>'
            f'<c:spPr>{line(ACCENT, 28575)}</c:spPr>'
            f'<c:marker><c:symbol val="circle"/><c:size val="7"/><c:spPr><a:solidFill><a:srgbClr val="{ACCENT}"/></a:solidFill>{line("FFFFFF", 9525)}</c:spPr></c:marker>'
            f'<c:dLbls><c:numFmt formatCode="\\$0.00" sourceLinked="0"/><c:spPr><a:noFill/><a:ln><a:noFill/></a:ln></c:spPr>{text(850, INK, 1)}'
            '<c:dLblPos val="t"/><c:showLegendKey val="0"/><c:showVal val="1"/><c:showCatName val="0"/><c:showSerName val="0"/><c:showPercent val="0"/><c:showBubbleSize val="0"/></c:dLbls>'
            f'<c:xVal><c:numRef><c:f>Sheet1!$A$2:$A${n + 1}</c:f><c:numCache><c:formatCode>d\\ mmm\\ yyyy</c:formatCode><c:ptCount val="{n}"/>{xs}</c:numCache></c:numRef></c:xVal>'
            f'<c:yVal><c:numRef><c:f>Sheet1!$B$2:$B${n + 1}</c:f><c:numCache><c:formatCode>\\$0.00</c:formatCode><c:ptCount val="{n}"/>{ys}</c:numCache></c:numRef></c:yVal>'
            '<c:smooth val="0"/></c:ser>'
            '<c:axId val="50010001"/><c:axId val="50010002"/></c:scatterChart>'
            # x axis: dates, one tick per calendar year
            f'<c:valAx><c:axId val="50010001"/><c:scaling><c:orientation val="minMax"/><c:max val="{serial("2025-01-01") + 1}"/><c:min val="{serial("2022-01-01")}"/></c:scaling>'
            '<c:delete val="0"/><c:axPos val="b"/><c:numFmt formatCode="yyyy" sourceLinked="0"/><c:majorTickMark val="out"/><c:minorTickMark val="none"/><c:tickLblPos val="low"/>'
            f'<c:spPr>{line(GREY, 9525)}</c:spPr><c:crossAx val="50010002"/><c:crosses val="min"/><c:crossBetween val="midCat"/><c:majorUnit val="365.34"/></c:valAx>'
            # y axis: price, logarithmic
            '<c:valAx><c:axId val="50010002"/><c:scaling><c:logBase val="10"/><c:orientation val="minMax"/><c:max val="100"/><c:min val="0.01"/></c:scaling>'
            f'<c:delete val="0"/><c:axPos val="l"/><c:majorGridlines><c:spPr>{line("E4DFD5", 6350)}</c:spPr></c:majorGridlines>'
            '<c:numFmt formatCode="\\$#,##0.00" sourceLinked="0"/><c:majorTickMark val="none"/><c:minorTickMark val="none"/><c:tickLblPos val="low"/>'
            '<c:spPr><a:ln><a:noFill/></a:ln></c:spPr><c:crossAx val="50010001"/><c:crosses val="min"/><c:crossBetween val="midCat"/></c:valAx>'
            '<c:spPr><a:noFill/><a:ln><a:noFill/></a:ln></c:spPr></c:plotArea>'
            '<c:plotVisOnly val="1"/><c:dispBlanksAs val="gap"/></c:chart>'
            '<c:spPr><a:solidFill><a:srgbClr val="FFFFFF"/></a:solidFill><a:ln><a:noFill/></a:ln></c:spPr>'
            + text(850, GREY) +
            '<c:externalData r:id="rId1"><c:autoUpdate val="0"/></c:externalData></c:chartSpace>')


def chart_workbook():
    import openpyxl
    wb = openpyxl.Workbook()
    ws = wb.active
    ws.title = 'Sheet1'
    ws.append(['Date', 'USD per million tokens', 'Cheapest model reaching GPT-3.5 level on MMLU', 'Source: Epoch AI, 12 March 2025'])
    for d, m, p in PRICES:
        ws.append([datetime.date.fromisoformat(d), p, m])
    for r in range(2, len(PRICES) + 2):
        ws.cell(r, 1).number_format = 'd mmm yyyy'
        ws.cell(r, 2).number_format = '$0.00'
    b = io.BytesIO()
    wb.save(b)
    return b.getvalue()


def chart_drawing(rid, width_cm=15.5, height_cm=7.2):
    cx, cy = int(width_cm * 360000), int(height_cm * 360000)
    return ('<w:r><w:drawing><wp:inline distT="0" distB="0" distL="0" distR="0">'
            f'<wp:extent cx="{cx}" cy="{cy}"/><wp:effectExtent l="0" t="0" r="0" b="0"/>'
            '<wp:docPr id="1" name="Chart 1" descr="Price of GPT-3.5-level AI per million tokens, November 2022 to October 2024"/><wp:cNvGraphicFramePr/>'
            '<a:graphic><a:graphicData uri="http://schemas.openxmlformats.org/drawingml/2006/chart">'
            f'<c:chart xmlns:c="http://schemas.openxmlformats.org/drawingml/2006/chart" r:id="{rid}"/>'
            '</a:graphicData></a:graphic></wp:inline></w:drawing></w:r>')


def price_bars():
    """Fallback for --no-chart: the same prices as shaded bars on a linear scale."""
    usable, top = 5600 - 160, PRICES[0][2]
    rows = ''
    for d, m, p in PRICES:
        when = datetime.date.fromisoformat(d).strftime('%b %Y')
        lab = para(run(when, rpr(font=SANS, size=8.5, color=GREY)), jc='right', before=0, after=0)
        w = max(p / top, 0.012)
        bar = para(run(' ', rpr(font=SANS, size=8.5)), before=0, after=0,
                   pre=f'<w:shd w:val="clear" w:color="auto" w:fill="{ACCENT}"/>', ind=f'<w:ind w:left="0" w:right="{int((1 - w) * usable)}"/>')
        val = para(run(f'${p:.2f}', rpr(font=SANS, size=8.5, bold=True, color=INK)), before=0, after=0)
        rows += f'<w:tr>{tc(lab, 1200, valign="center")}{tc(bar, 5600, valign="center")}{tc(val, 900, valign="center")}</w:tr>'
    return ('<w:tbl><w:tblPr><w:tblW w:w="7700" w:type="dxa"/><w:jc w:val="center"/><w:tblLayout w:type="fixed"/>'
            '<w:tblCellMar><w:top w:w="25" w:type="dxa"/><w:left w:w="80" w:type="dxa"/><w:bottom w:w="25" w:type="dxa"/><w:right w:w="80" w:type="dxa"/></w:tblCellMar></w:tblPr>'
            '<w:tblGrid><w:gridCol w:w="1200"/><w:gridCol w:w="5600"/><w:gridCol w:w="900"/></w:tblGrid>' + rows + '</w:tbl>')


def price_table():
    head = rpr(font=SANS, size=7.5, bold=True, color=GREY, spacing=20)
    cellp = lambda t, bold=False, jc=None: para(run(t, rpr(font=SANS, size=8.5, bold=bold, color=INK)), jc=jc, before=30, after=30)
    line = f'<w:bottom w:val="single" w:sz="4" w:space="0" w:color="{RULE}"/>'
    rows = ('<w:tr>' + tc(para(run('DATE', head), before=30, after=30), 1700, borders=line)
            + tc(para(run('CHEAPEST MODEL AT GPT-3.5 LEVEL', head), before=30, after=30), 3900, borders=line)
            + tc(para(run('USD PER MILLION TOKENS', head), jc='right', before=30, after=30), 2400, borders=line) + '</w:tr>')
    for d, m, p in PRICES:
        when = datetime.date.fromisoformat(d).strftime('%-d %b %Y')
        rows += ('<w:tr>' + tc(cellp(when), 1700, borders=line) + tc(cellp(m), 3900, borders=line)
                 + tc(cellp(f'${p:.2f}', True, 'right'), 2400, borders=line) + '</w:tr>')
    return ('<w:tbl><w:tblPr><w:tblW w:w="8000" w:type="dxa"/><w:jc w:val="center"/><w:tblLayout w:type="fixed"/></w:tblPr>'
            '<w:tblGrid><w:gridCol w:w="1700"/><w:gridCol w:w="3900"/><w:gridCol w:w="2400"/></w:tblGrid>' + rows + '</w:tbl>')


def build():
    correct = verify()
    for key in 'AB':                 # report what the stored field formulas actually score (ties included)
        NETS[key]['correct'] = correct[key]
    start = TEST_X[START_INDEX]
    table, d = machine(start, FLAT)
    truth = CLASSES[TEST_Y[START_INDEX]]
    print('start clause', START_INDEX, '| true:', truth, '| small:', CLASSES[d.answers[0]], '| large:', CLASSES[d.answers[1]], '|', d.verdict, '| fields', d.n_fields)
    assert d.answers[1] == TEST_Y[START_INDEX] and d.answers[0] != d.answers[1]

    A, B = NETS['A'], NETS['B']
    n_params = A['W1'].size + A['b1'].size + A['W2'].size + A['b2'].size
    n_mult = 64 * H + H * 10
    ca = {p['n']: p['mean_acc'] for p in L['curveA']}
    cb = {p['n']: p['mean_acc'] for p in L['curveB']}
    pc = lambda v: f'{100 * v:.0f}%'
    body_rp = rpr(font=SERIF, size=10.5)
    P = lambda t, **k: para(run(t, body_rp), **k)
    small = lambda t, **k: para(run(t, rpr(font=SERIF, size=8.5, italic=True, color=GREY)), **k)
    rule = lambda before=0, after=120: para('', before=before, after=after, line=40, exact=True,
                                           pre=f'<w:pBdr><w:bottom w:val="single" w:sz="6" w:space="1" w:color="{INK}"/></w:pBdr>')
    sect = lambda extra='': ('<w:sectPr>' + extra + '<w:pgSz w:w="11906" w:h="16838"/>'
                             '<w:pgMar w:top="1020" w:right="1134" w:bottom="1020" w:left="1134" w:header="567" w:footer="567" w:gutter="0"/>')
    H1 = lambda t: para(run(t, rpr(font=SERIF, size=19, color=INK)), before=300, after=120, keep=True)

    body = ''
    # ---------------- page 1: protected for forms
    body += kicker('A WORKING DEMONSTRATION  ·  NO MACROS  ·  NO INTERNET', after=80)
    body += para(run('Same machine. Different data.', rpr(font=SERIF, size=30, color=INK)), before=0, after=60, line=240)
    body += para(run('Two neural networks are reading a contract clause inside this page. They are identical in every way but one: '
                     'how many real clauses each was shown first.', rpr(font=SERIF, size=12.5, italic=True, color=GREY)), before=0, after=140)
    body += rule(after=140)
    body += kicker('THE CLAUSE  ·  A REAL PROVISION FROM A CONTRACT FILED WITH THE SEC', after=60)
    body += para(run('“' + TEST_TEXT[START_INDEX].strip() + '”', rpr(font=SERIF, size=10.5, italic=True, color=INK)), before=0, after=60,
                 ind='<w:ind w:left="300" w:right="300"/>')
    body += para(run('Its actual type: ', rpr(font=SANS, size=8.5, color=GREY)) + run(truth, rpr(font=SANS, size=8.5, bold=True, color=INK))
                 + run('. The ticked words below are the ones it contains. Change them to describe a different clause.', rpr(font=SANS, size=8.5, color=GREY)),
                 before=0, after=160, ind='<w:ind w:left="300" w:right="300"/>')
    body += table
    body += para(run(f'Both networks hold the same {n_params:,} numbers in the same arrangement, and each answer costs the same '
                     f'{n_mult:,} multiplications. The cost of the thinking is identical. The quality of the answer is not.',
                     rpr(font=SERIF, size=10.5, color=INK)), jc='center', before=240, after=0, ind='<w:ind w:left="900" w:right="900"/>')
    body += para(run('Nothing happening? Click “Enable Editing” at the top and use Word on a computer, not the browser or phone '
                     'version. The page updates when you leave a word. To edit this page: Review → Restrict Editing → Stop Protection '
                     '(no password).', rpr(font=SANS, size=7.5, color=GREY)), jc='center', before=260, after=0, extra=sect() + '</w:sectPr>')

    # ---------------- page 2 onward: editable
    body += kicker('THE ARGUMENT', after=60)
    body += para(run('Cognition is getting cheap. Data and distribution are not.', rpr(font=SERIF, size=24, color=INK)), before=0, after=160, line=264)
    body += P('This paper argues that legal work has no moat outside data and distribution, and that cheaper cognition will '
              'therefore entrench the largest players instead of displacing them.')

    body += H1('The price of the thinking')
    drop = PRICES[0][2] / PRICES[-1][2]
    body += P(f'Epoch AI tracks the cheapest AI model able to match GPT-3.5 on a standard test of general knowledge (MMLU). '
              f'In November 2022 that cost ${PRICES[0][2]:.2f} per million tokens. By October 2024 it cost ${PRICES[-1][2]:.2f}: '
              f'about {drop:.0f} times less in under two years. Stanford’s 2025 AI Index reports the same two figures and '
              'describes the fall as more than 280-fold.')
    if NO_CHART:
        body += price_bars()
        body += small('US dollars per million tokens, linear scale.', jc='center', before=80, after=120)
    else:
        body += para(chart_drawing('rId20'), jc='center', before=60, after=40)
        body += small('US dollars per million tokens, logarithmic scale: each gridline is ten times cheaper than the one above. '
                      'This is a live Word chart; right-click it and choose Edit Data to see the figures.', jc='center', before=0, after=140)
    body += price_table()
    body += small(f'Source: Epoch AI, “LLM inference prices have fallen rapidly but unequally across tasks”, 12 March 2025 '
                  f'({EPOCH_URL}); endpoints also in Stanford HAI, The 2025 AI Index Report, chapter 1 ({HAI_URL}).', jc='center', before=100,
                  ind='<w:ind w:left="600" w:right="600"/>')

    body += H1('What the first page shows')
    body += P(f'The two networks on the first page are the same machine. Each has {n_params:,} learned numbers, arranged the same way, '
              f'and each needs the same {n_mult:,} multiplications to classify a clause. Word’s own calculator, a feature from the '
              '1990s, does that arithmetic in the time it takes to press Tab.')
    body += P(f'The only difference is experience. One network learned from {SMALL_N} real contract clauses and the other from {LARGE_N:,}. '
              f'On {N_TEST:,} clauses neither had seen, the first is right {A["correct"]:,} times ({pc(A["correct"] / N_TEST)}) and the second '
              f'{B["correct"]:,} times ({pc(B["correct"] / N_TEST)}). Anyone can copy the machine. Nobody can copy the clauses without having them.')

    body += H1('Does legal data run out?')
    body += P('If more data stopped helping early, data would be a weak moat: a mid-sized firm would soon catch the largest. '
              'Two experiments on the same public contract data test that.')
    body += kicker('THE NETWORK IN THIS DOCUMENT  ·  10 CLAUSE TYPES, 64 WORDS', jc='center', before=160, after=100)
    body += bar_chart(L['curveA'], (SMALL_N, LARGE_N), 'clauses')
    body += small(f'Share of {N_TEST:,} unseen clauses classified correctly; average of {L["runsA"]} training runs per bar. '
                  'The two networks on the first page are the median run at each end.', jc='center', before=80, after=120)
    body += P(f'On this small task the curve flattens almost at once: {pc(ca[100])} with 100 clauses, {pc(ca[LARGE_N])} with {LARGE_N:,}. '
              'But that says more about the network than about the data. A machine that sees only 64 words and knows ten types fills up quickly.')
    body += kicker('A FULL-SIZE MODEL  ·  ALL 100 CLAUSE TYPES, EVERY WORD', jc='center', before=200, after=100)
    body += bar_chart(L['curveB'], (), 'clauses')
    nB = L['curveB'][-1]['n']
    body += small(f'Share of {L["n_testB"]:,} unseen clauses classified correctly; average of {L["runsB"]} runs per bar (one run at {nB:,}). '
                  'This model is too large to run inside Word; it was run separately on the same data.', jc='center', before=80, after=120)
    e30, e60 = 1 - cb[30000], 1 - cb[nB]
    body += P(f'On the realistic task the answer is different. Accuracy is still rising at {nB:,} clauses: {pc(cb[100])} with 100, '
              f'{pc(cb[1000])} with 1,000, {pc(cb[10000])} with 10,000 and {pc(cb[nB])} with {nB:,}.')
    body += P(f'This supports the thesis in one way and limits it in another. In its favour, more data never stops helping in the range '
              f'measured: the last doubling, from 30,000 to {nB:,} clauses, still removed about {100 * (e30 - e60) / e30:.0f}% of the remaining errors. '
              f'Against it, each step buys less: the first tenfold increase adds {100 * (cb[1000] - cb[100]):.0f} points, the next adds '
              f'{100 * (cb[10000] - cb[1000]):.0f}, and the final sixfold increase adds {100 * (cb[nB] - cb[10000]):.0f}. '
              f'A firm with 10,000 clauses is at {pc(cb[10000])}; one with six times as many is at {pc(cb[nB])}. '
              'Data is an advantage here, but a narrowing one. The entrenchment claim may need to rest more on distribution than on data.')

    body += H1('What this does not show')
    body += P('Sorting clauses by type is a narrow task. It is not legal reasoning, drafting or advice, and nothing here measures a law firm.')
    body += P('The clauses come from public SEC filings. That is the opposite of a proprietary data moat: anyone can download them. '
              'The experiment shows what more data does for a model, not who is able to get more data.')
    body += P('Nothing here speaks to distribution: client relationships, panels, referral networks and brand are outside the demonstration.')
    body += P('These are small models. Large language models learn differently and may need far less task-specific data, which would weaken a data moat further.')
    body += P('The 64 words were chosen using the full set of training clauses, so the 20-clause network starts with a head start it would not really have.')

    body += H1('How it works, and sources')
    body += P(f'Each word on the first page is a Word drop-down form field. Hidden IF fields turn the 64 words into ones and zeros, formula fields '
              f'compute {H} hidden neurons and 10 output scores for each network, and the clause type with the highest score is printed. '
              f'There are {d.n_fields:,} fields on the first page, most of them set in one-point type. '
              'Press Alt+F9 to see them (if Word ignores the keys, stop protection first). The file is an ordinary .docx, a format that cannot contain macros.')
    body += P('Contract data: LEDGAR (Tuggener, von Däniken, Peetz and Cieliebak, LREC 2020), 80,000 labelled provisions from contracts filed '
              'on SEC EDGAR, in the train/test split published with LexGLUE (Chalkidis et al., ACL 2022), licence CC BY 4.0. '
              f'The ten types used on the first page are: {", ".join(CLASSES)}. Test clauses were never used in training. '
              'The accuracy figures for the two embedded networks were measured by evaluating the formulas stored in this file.')
    body += para(run('Built with Claude, an AI system made by Anthropic.', rpr(font=SERIF, size=9, italic=True, color=GREY)), before=240)
    body += sect('<w:type w:val="nextPage"/>') + '<w:formProt w:val="0"/></w:sectPr>'

    head = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n'
    document = (f'{head}<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" '
                'xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" '
                'xmlns:wp="http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing" '
                f'xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main"><w:body>{body}</w:body></w:document>')
    styles = f'''{head}<w:styles xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
<w:docDefaults><w:rPrDefault><w:rPr><w:rFonts w:ascii="{SERIF}" w:hAnsi="{SERIF}" w:cs="{SERIF}" w:eastAsia="{SERIF}"/><w:color w:val="{INK}"/><w:sz w:val="21"/><w:szCs w:val="21"/><w:lang w:val="en-GB"/></w:rPr></w:rPrDefault>
<w:pPrDefault><w:pPr><w:spacing w:after="140" w:line="288" w:lineRule="auto"/></w:pPr></w:pPrDefault></w:docDefaults>
<w:style w:type="paragraph" w:default="1" w:styleId="Normal"><w:name w:val="Normal"/><w:qFormat/></w:style>
<w:style w:type="table" w:default="1" w:styleId="TableNormal"><w:name w:val="Normal Table"/><w:uiPriority w:val="99"/><w:semiHidden/><w:unhideWhenUsed/><w:tblPr><w:tblInd w:w="0" w:type="dxa"/><w:tblCellMar><w:top w:w="0" w:type="dxa"/><w:left w:w="108" w:type="dxa"/><w:bottom w:w="0" w:type="dxa"/><w:right w:w="108" w:type="dxa"/></w:tblCellMar></w:tblPr></w:style>
</w:styles>'''
    settings = f'''{head}<w:settings xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:zoom w:percent="100"/><w:documentProtection w:edit="forms" w:enforcement="1"/><w:defaultTabStop w:val="720"/><w:characterSpacingControl w:val="doNotCompress"/><w:compat><w:compatSetting w:name="compatibilityMode" w:uri="http://schemas.microsoft.com/office/word" w:val="15"/></w:compat></w:settings>'''
    chart = not NO_CHART
    content_types = (f'{head}<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">'
                     '<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>'
                     '<Default Extension="xml" ContentType="application/xml"/>'
                     + ('<Default Extension="xlsx" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"/>' if chart else '') +
                     '<Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>'
                     '<Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/>'
                     '<Override PartName="/word/settings.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.settings+xml"/>'
                     + ('<Override PartName="/word/charts/chart1.xml" ContentType="application/vnd.openxmlformats-officedocument.drawingml.chart+xml"/>' if chart else '') +
                     '<Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/></Types>')
    R = 'http://schemas.openxmlformats.org/officeDocument/2006/relationships'
    rels = (f'{head}<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">'
            f'<Relationship Id="rId1" Type="{R}/officeDocument" Target="word/document.xml"/>'
            '<Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/></Relationships>')
    doc_rels = (f'{head}<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">'
                f'<Relationship Id="rId1" Type="{R}/styles" Target="styles.xml"/><Relationship Id="rId2" Type="{R}/settings" Target="settings.xml"/>'
                + (f'<Relationship Id="rId20" Type="{R}/chart" Target="charts/chart1.xml"/>' if chart else '') + '</Relationships>')
    chart_rels = (f'{head}<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">'
                  f'<Relationship Id="rId1" Type="{R}/package" Target="../embeddings/Microsoft_Excel_Sheet1.xlsx"/></Relationships>')
    now = datetime.datetime.now(datetime.timezone.utc).strftime('%Y-%m-%dT%H:%M:%SZ')
    core = f'''{head}<cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><dc:title>Same machine. Different data.</dc:title><dcterms:created xsi:type="dcterms:W3CDTF">{now}</dcterms:created><dcterms:modified xsi:type="dcterms:W3CDTF">{now}</dcterms:modified></cp:coreProperties>'''
    parts = [('[Content_Types].xml', content_types), ('_rels/.rels', rels), ('word/document.xml', document),
             ('word/_rels/document.xml.rels', doc_rels), ('word/styles.xml', styles), ('word/settings.xml', settings), ('docProps/core.xml', core)]
    if chart:
        parts += [('word/charts/chart1.xml', chart_xml()), ('word/charts/_rels/chart1.xml.rels', chart_rels),
                  ('word/embeddings/Microsoft_Excel_Sheet1.xlsx', chart_workbook())]
    with zipfile.ZipFile(OUT, 'w', zipfile.ZIP_DEFLATED) as z:
        for name, data in parts:
            z.writestr(name, data)
    print('wrote', OUT)


if __name__ == '__main__':
    pick() if '--pick' in sys.argv else build()
