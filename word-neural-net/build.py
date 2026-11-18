"""Build "this-document-thinks.docx": a macro-free Word file that runs a trained
neural network using nothing but Word's own field engine.

    python3 train.py     # trains on real handwritten digits, writes model.json
    python3 build.py     # writes this-document-thinks.docx (and verifies the field maths)

How the Word side works
  * each pixel is a legacy drop-down form field (□ / ■) with "calculate on exit"
  * { IF { REF k_rc } = "■" 1 0 } turns each pixel into a number (bookmark v_rc)
  * { = ... } formula fields compute every neuron from those bookmarks, using only
    + - * / and the one-argument functions ABS() and SIGN()  (no decimal points and no
    argument separators, so it behaves the same under any regional settings)
  * IF fields print the answer and the bars
The document is protected for "filling in forms" (no password) so the drop-downs are live.
"""
import io, json, re, sys, zipfile, datetime
import numpy as np
from PIL import Image, ImageDraw

M = json.load(open('model.json'))
W1, B1, W2, B2 = np.array(M['W1']), np.array(M['b1']), np.array(M['W2']), np.array(M['b2'])
H = M['H']
TEST_X, TEST_Y = np.array(M['test_X']), np.array(M['test_y'])
START_INDEX = 278           # a real test-set "2" the network gets right; shown when the file opens
ON, OFF = '■', '□'   # ■ □
BAR_BLOCKS, BAR_STEP = 8, 1000
FLAT = '--flat' in sys.argv      # layout preview with plain text instead of fields
OUT = 'preview-flat.docx' if FLAT else 'this-document-thinks.docx'

NAVY, RED, GREY, LIGHT, BLUE = '1F2A44', 'C0392B', '6B7280', 'F3F5F9', '2E5AAC'


def esc(s):
    return s.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;').replace('"', '&quot;')


def rpr(font=None, size=None, bold=False, italic=False, color=None, spacing=None):
    x = ''
    if font:
        x += f'<w:rFonts w:ascii="{font}" w:hAnsi="{font}" w:cs="{font}" w:eastAsia="{font}"/>'
    if bold:
        x += '<w:b/>'
    if italic:
        x += '<w:i/>'
    if color:
        x += f'<w:color w:val="{color}"/>'
    if spacing is not None:
        x += f'<w:spacing w:val="{spacing}"/>'
    if size:
        x += f'<w:sz w:val="{int(size * 2)}"/><w:szCs w:val="{int(size * 2)}"/>'
    return f'<w:rPr>{x}</w:rPr>' if x else ''


def run(text, rp=''):
    return f'<w:r>{rp}<w:t xml:space="preserve">{esc(text)}</w:t></w:r>'


def tab(rp=''):
    return f'<w:r>{rp}<w:tab/></w:r>'


def para(content='', style=None, jc=None, before=None, after=None, line=None, exact=False,
         tabs=None, keep=False, extra=''):
    x = ''
    if style:
        x += f'<w:pStyle w:val="{style}"/>'
    if keep:
        x += '<w:keepNext/>'
    if tabs:
        x += '<w:tabs>' + ''.join(f'<w:tab w:val="{k}" w:pos="{p}"/>' for k, p in tabs) + '</w:tabs>'
    if before is not None or after is not None or line is not None:
        x += '<w:spacing'
        if before is not None:
            x += f' w:before="{before}"'
        if after is not None:
            x += f' w:after="{after}"'
        if line is not None:
            x += f' w:line="{line}" w:lineRule="{"exact" if exact else "auto"}"'
        x += '/>'
    if jc:
        x += f'<w:jc w:val="{jc}"/>'
    x += extra
    return f'<w:p>{"<w:pPr>" + x + "</w:pPr>" if x else ""}{content}</w:p>'


# ---------------------------------------------------------------------------------------
# A tiny model of Word's field engine: enough to emit the fields AND to compute the cached
# results Word will show on first open (and to prove the field maths equals the network).
# ---------------------------------------------------------------------------------------
class Doc:
    def __init__(self, flat=False):
        self.flat = flat       # True: plain text instead of fields (layout preview only)
        self.env = {}          # bookmark name -> text
        self.bm_id = 0
        self.n_fields = 0

    def bookmark(self, name, inner, text):
        self.bm_id += 1
        self.env[name] = text
        return f'<w:bookmarkStart w:id="{self.bm_id}" w:name="{name}"/>{inner}<w:bookmarkEnd w:id="{self.bm_id}"/>'

    def _emit(self, parts, result, rp):
        self.n_fields += 1
        if self.flat:
            return (f'<w:r>{rp}<w:t xml:space="preserve">{esc(result)}</w:t></w:r>' if result != '' else ''), result
        x = f'<w:r>{rp}<w:fldChar w:fldCharType="begin"/></w:r>'
        for p in parts:
            if isinstance(p, tuple):          # nested field: (xml, result)
                x += p[0]
            else:
                x += f'<w:r>{rp}<w:instrText xml:space="preserve">{esc(p)}</w:instrText></w:r>'
        x += f'<w:r>{rp}<w:fldChar w:fldCharType="separate"/></w:r>'
        if result != '':
            x += f'<w:r>{rp}<w:t xml:space="preserve">{esc(result)}</w:t></w:r>'
        x += f'<w:r>{rp}<w:fldChar w:fldCharType="end"/></w:r>'
        return x, result

    def formula(self, parts, rp='', name=None):
        """{ = expr }  -- parts are strings and nested fields. Returns (xml, result)."""
        expr = ''.join(p[1] if isinstance(p, tuple) else p for p in parts)
        py = re.sub(r'\b[a-z]_\d+\b', lambda m_: f'({int(self.env[m_.group(0)])})', expr)
        py = py.replace('ABS', 'abs').replace('SIGN', 'sgn')
        assert re.fullmatch(r'[0-9+\-*/() absgn]*', py), py
        val = eval(py, {'abs': abs, 'sgn': lambda v: (v > 0) - (v < 0)})
        assert float(val).is_integer(), (expr, val)
        xml, res = self._emit([' = '] + list(parts) + [' '], str(int(val)), rp)
        if name:
            xml = self.bookmark(name, xml, res)
        return xml, res

    def ref(self, name, rp=''):
        return self._emit([f' REF {name} '], self.env[name], rp)

    def iff(self, lhs, op, rhs, t, f, rp='', name=None, quote=True):
        """{ IF <nested field> op rhs "t" "f" }  -- rhs is a str (text compare) or int."""
        if isinstance(rhs, str):
            ok = {'=': lhs[1] == rhs}[op]
            rhs_code = f'"{rhs}"'
        else:
            a = int(lhs[1])
            ok = {'=': a == rhs, '>': a > rhs}[op]
            rhs_code = str(rhs)
        q = (lambda s: f'"{s}"') if quote else (lambda s: s)
        xml, res = self._emit([' IF ', lhs, f' {op} {rhs_code} {q(t)} {q(f)} '], t if ok else f, rp)
        if name:
            xml = self.bookmark(name, xml, res)
        return xml, res

    def dropdown(self, name, on, rp=''):
        """Legacy drop-down form field, calculate-on-exit, bookmark = name."""
        self.n_fields += 1
        sel = 1 if on else 0
        ff = (f'<w:ffData><w:name w:val="{name}"/><w:enabled/><w:calcOnExit/>'
              f'<w:statusText w:type="text" w:val="Pick a square, then press Tab"/>'
              f'<w:ddList><w:result w:val="{sel}"/><w:default w:val="{sel}"/>'
              f'<w:listEntry w:val="{OFF}"/><w:listEntry w:val="{ON}"/></w:ddList></w:ffData>')
        self.bm_id += 1
        self.env[name] = ON if on else OFF
        if self.flat:
            return f'<w:r>{rp}<w:t>{ON if on else OFF}</w:t></w:r>'
        return (f'<w:r>{rp}<w:fldChar w:fldCharType="begin">{ff}</w:fldChar></w:r>'
                f'<w:bookmarkStart w:id="{self.bm_id}" w:name="{name}"/>'
                f'<w:r>{rp}<w:instrText xml:space="preserve"> FORMDROPDOWN </w:instrText></w:r>'
                f'<w:r>{rp}<w:fldChar w:fldCharType="separate"/></w:r>'
                f'<w:r>{rp}<w:fldChar w:fldCharType="end"/></w:r>'
                f'<w:bookmarkEnd w:id="{self.bm_id}"/>')


def terms(pairs, lead='0'):
    """'0+3*v_11-7*v_12' from [(3,'v_11'),(-7,'v_12')]; zero weights are dropped."""
    s = lead
    for w, n in pairs:
        if w:
            s += f'{"+" if w > 0 else "-"}{abs(int(w))}*{n}'
    return s


def cell(content, width, span=1, fill=LIGHT):
    return (f'<w:tc><w:tcPr><w:tcW w:w="{width}" w:type="dxa"/>'
            + (f'<w:gridSpan w:val="{span}"/>' if span > 1 else '')
            + f'<w:shd w:val="clear" w:color="auto" w:fill="{fill}"/></w:tcPr>{content}</w:tc>')


def label(num, text):
    return para(run(f'{num}  ', rpr(size=9, bold=True, color=RED)) + run(text, rpr(size=9, bold=True, color=NAVY)),
                before=40, after=80, keep=True)


def machine(pixels, flat=False):
    """Returns (table_xml, doc). pixels: 64 ints, row-major."""
    d = Doc(flat)
    px = np.array(pixels).reshape(8, 8)
    mono = lambda size, **k: rpr(font='Courier New', size=size, **k)

    # 1 -- the picture: 8 x 8 drop-downs
    c1 = label('1', 'DRAW  (pick ■ or □, then press Tab)')
    for r in range(8):
        c1 += para(''.join(d.dropdown(f'k_{r+1}{c+1}', px[r, c], rpr(font='Arial', size=20, color=NAVY, spacing=30))
                           for c in range(8)), jc='center', before=0, after=0, line=340, exact=True)
    c1 += para('', before=0, after=0, line=120, exact=True)

    # 2 -- the picture as numbers
    c2 = label('2', 'WHAT THE NETWORK SEES: 64 NUMBERS')
    for r in range(8):
        line = ''
        for c in range(8):
            line += d.iff(d.ref(f'k_{r+1}{c+1}'), '=', ON, '1', '0', mono(13, bold=True, color=NAVY),
                          name=f'v_{r+1}{c+1}', quote=False)[0]
            if c < 7:
                line += run('  ', mono(13))
        c2 += para(line, jc='center', before=0, after=0, line=340, exact=True)
    rows = [d.formula([terms([(1, f'v_{r+1}{c+1}') for c in range(8)])]) for r in range(8)]
    parts = []
    for i, f in enumerate(rows):
        parts += ['+(' if i else '(', f, ')']
    c2 += para(d.formula(parts, rpr(size=9, bold=True, color=RED), name='n_1')[0]
               + run(' of 64 squares are switched on', rpr(size=9, color=GREY)), jc='center', before=60, after=40)

    # 3 -- hidden layer: a_j = W1.x + b1 ;  h_j = a_j + |a_j| (= 2 x ReLU)
    small, smallb = mono(8.5, color=GREY), mono(8.5, bold=True, color=NAVY)
    colw = 770
    tabs10 = [('right', 1450 + colw * (i + 1)) for i in range(10)]
    c3 = label('3', f'{H} HIDDEN NEURONS: each one weighs the 64 numbers its own way and adds them up')
    for blk in range(0, H, 10):
        js = list(range(blk, min(blk + 10, H)))
        c3 += para(run('neuron', small) + ''.join(tab() + run(str(j + 1), small) for j in js),
                   tabs=tabs10, before=40 if blk else 0, after=0)
        line = run('weighted sum', small)
        for j in js:
            parts = [terms([], lead=f'0{"+" if B1[j] >= 0 else "-"}{abs(int(B1[j]))}')]
            for r in range(8):
                pr = [(W1[r * 8 + c, j], f'v_{r+1}{c+1}') for c in range(8)]
                if any(w for w, _ in pr):
                    parts += ['+(', d.formula([terms(pr)]), ')']
            line += tab() + d.formula(parts, small, name=f'a_{j+1}')[0]
        c3 += para(line, tabs=tabs10, before=0, after=0)
        line = run('fires (×2)', smallb)
        for j in js:
            line += tab() + d.formula([f'a_{j+1}+ABS(a_{j+1})'], smallb, name=f'h_{j+1}')[0]
        c3 += para(line, tabs=tabs10, before=0, after=0)

    # 4 -- output layer: o_k = W2.h + b2
    c3 += para('', before=0, after=0, line=100, exact=True)
    c3 += label('4', '10 OUTPUT SCORES: one for each digit, built from the neurons above')
    c3 += para(run('digit', small) + ''.join(tab() + run(str(k), smallb) for k in range(10)), tabs=tabs10, before=0, after=0)
    line = run('score', smallb)
    for k in range(10):
        parts = [terms([], lead=f'0{"+" if B2[k] >= 0 else "-"}{abs(int(B2[k]))}')]
        for g in range(0, H, 5):
            pr = [(W2[j, k], f'h_{j+1}') for j in range(g, min(g + 5, H))]
            if any(w for w, _ in pr):
                parts += ['+(', d.formula([terms(pr)]), ')']
        line += tab() + d.formula(parts, smallb, name=f'o_{k}')[0]
    # running maximum of the ten scores (white, tiny): max(a,b) = (a+b+|a-b|)/2
    c3 += para(line, tabs=tabs10, before=0, after=0)
    hide = rpr(size=1, color=LIGHT)
    line, prev = '', 'o_0'
    for k in range(1, 10):
        line += d.formula([f'({prev}+o_{k}+ABS({prev}-o_{k}))/2'], hide, name=f'm_{k}')[0] + run(' ', hide)
        prev = f'm_{k}'
    c3 += para(line, before=0, after=0, line=60, exact=True)

    # 5 -- bars
    c5 = label('5', 'HOW CLOSE EACH DIGIT IS TO WINNING')
    barp = rpr(font='Arial', size=11, color=BLUE)
    for k in range(10):
        line = run(f'{k}  ', mono(11, bold=True, color=NAVY))
        for i in range(BAR_BLOCKS, 0, -1):
            line += d.iff(d.formula([f'o_{k}-m_9+{i * BAR_STEP}']), '>', 0, ON, OFF, barp)[0]
        c5 += para(line, before=0, after=0, line=270, exact=True, extra='<w:ind w:left="600"/>')
    c5 += para('', before=0, after=0, line=100, exact=True)

    # 6 -- the answer
    big = rpr(font='Arial', size=88, bold=True, color=RED)
    c6 = label('6', 'THE NETWORK SAYS')
    line = d.iff(d.formula(['n_1']), '=', 0, '?', '', big)[0]
    answer = '?' if d.env['n_1'] == '0' else ''
    for k in range(10):
        x, res = d.iff(d.formula([f'ABS(o_{k}-m_9)+1-SIGN(n_1)']), '=', 0, str(k), '', big)
        line += x
        answer += res
    c6 += para(line, jc='center', before=0, after=0)
    d.answer = answer

    g = [4819, 1181, 3638]
    borders = ''.join(f'<w:{s} w:val="single" w:sz="6" w:space="0" w:color="C9CED8"/>'
                      for s in ('top', 'left', 'bottom', 'right', 'insideH', 'insideV'))
    tbl = (f'<w:tbl><w:tblPr><w:tblW w:w="{sum(g)}" w:type="dxa"/><w:tblBorders>{borders}</w:tblBorders>'
           '<w:tblLayout w:type="fixed"/>'
           '<w:tblCellMar><w:top w:w="60" w:type="dxa"/><w:left w:w="140" w:type="dxa"/>'
           '<w:bottom w:w="60" w:type="dxa"/><w:right w:w="140" w:type="dxa"/></w:tblCellMar></w:tblPr>'
           '<w:tblGrid>' + ''.join(f'<w:gridCol w:w="{w}"/>' for w in g) + '</w:tblGrid>'
           f'<w:tr><w:trPr><w:cantSplit/></w:trPr>{cell(c1, g[0])}{cell(c2, g[1] + g[2], 2)}</w:tr>'
           f'<w:tr><w:trPr><w:cantSplit/></w:trPr>{cell(c3, sum(g), 3)}</w:tr>'
           f'<w:tr><w:trPr><w:cantSplit/></w:trPr>{cell(c5, g[0] + g[1], 2)}{cell(c6, g[2], fill="FFFFFF")}</w:tr>'
           '</w:tbl>')
    return tbl, d


def numpy_forward(x):
    a = x @ W1 + B1
    h = a + np.abs(a)
    return a, h, h @ W2 + B2


def verify():
    """Run every test image through the generated *field code* and compare with numpy."""
    agree = correct = ties = 0
    for x, y in zip(TEST_X, TEST_Y):
        _, d = machine(x)
        a, h, o = numpy_forward(x)
        assert all(int(d.env[f'a_{j+1}']) == a[j] and int(d.env[f'h_{j+1}']) == h[j] for j in range(H))
        assert all(int(d.env[f'o_{k}']) == o[k] for k in range(10))
        assert int(d.env['m_9']) == o.max() and int(d.env['n_1']) == x.sum()
        if len(d.answer) != 1:
            ties += 1
        agree += d.answer == str(int(o.argmax()))
        correct += d.answer == str(int(y))
    n = len(TEST_X)
    _, d = machine(np.zeros(64, int))
    assert d.answer == '?'
    print(f'field-code emulation: {agree}/{n} identical to numpy, {correct}/{n} correct ({correct / n:.4f}), ties={ties}')
    assert agree == n
    return correct, n


# ---------------------------------------------------------------------------------------
# Pictures made from the real data / the real weights
# ---------------------------------------------------------------------------------------
def png(im):
    b = io.BytesIO()
    im.save(b, 'PNG')
    return b.getvalue()


def picture_samples():
    """One real, binarised test image for each digit 0-9 (the first of each in the test split)."""
    s, pad = 14, 12
    im = Image.new('RGB', (10 * (8 * s + pad) + pad, 8 * s + 2 * pad), 'white')
    dr = ImageDraw.Draw(im)
    for k in range(10):
        x = TEST_X[np.where(TEST_Y == k)[0][0]].reshape(8, 8)
        ox = pad + k * (8 * s + pad)
        for r in range(8):
            for c in range(8):
                dr.rectangle([ox + c * s, pad + r * s, ox + c * s + s - 2, pad + r * s + s - 2],
                             fill='#1F2A44' if x[r, c] else '#E8EBF1')
    return im


def picture_neurons():
    """First-layer weights of every hidden neuron: red = 'ink here pushes me up', blue = 'pushes me down'."""
    s, pad = 12, 12
    cols = 10
    rows = (H + cols - 1) // cols
    im = Image.new('RGB', (cols * (8 * s + pad) + pad, rows * (8 * s + pad) + pad), 'white')
    dr = ImageDraw.Draw(im)
    mx = np.abs(W1).max()
    for j in range(H):
        ox, oy = pad + (j % cols) * (8 * s + pad), pad + (j // cols) * (8 * s + pad)
        for r in range(8):
            for c in range(8):
                t = W1[r * 8 + c, j] / mx
                col = (255, int(255 * (1 - t)), int(255 * (1 - t))) if t >= 0 else (int(255 * (1 + t)), int(255 * (1 + 0.6 * t)), 255)
                dr.rectangle([ox + c * s, oy + r * s, ox + c * s + s - 1, oy + r * s + s - 1], fill=col)
    return im


def inline_image(rid, im, width_cm, pid, name):
    cx = int(width_cm * 360000)
    cy = int(cx * im.height / im.width)
    return ('<w:r><w:drawing><wp:inline distT="0" distB="0" distL="0" distR="0">'
            f'<wp:extent cx="{cx}" cy="{cy}"/><wp:docPr id="{pid}" name="{name}" descr="{name}"/>'
            '<wp:cNvGraphicFramePr><a:graphicFrameLocks noChangeAspect="1"/></wp:cNvGraphicFramePr>'
            '<a:graphic><a:graphicData uri="http://schemas.openxmlformats.org/drawingml/2006/picture">'
            f'<pic:pic><pic:nvPicPr><pic:cNvPr id="{pid}" name="{name}"/><pic:cNvPicPr/></pic:nvPicPr>'
            f'<pic:blipFill><a:blip r:embed="{rid}"/><a:stretch><a:fillRect/></a:stretch></pic:blipFill>'
            f'<pic:spPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="{cx}" cy="{cy}"/></a:xfrm>'
            '<a:prstGeom prst="rect"><a:avLst/></a:prstGeom></pic:spPr></pic:pic>'
            '</a:graphicData></a:graphic></wp:inline></w:drawing></w:r>')


# ---------------------------------------------------------------------------------------
def build():
    correct, n_test = verify()
    start = TEST_X[START_INDEX]
    table, d = machine(start, FLAT)
    assert d.answer == str(TEST_Y[START_INDEX]), d.answer
    a0, h0, o0 = numpy_forward(start)
    flips = []
    for p in range(64):
        x = start.copy()
        x[p] ^= 1
        if numpy_forward(x)[2].argmax() != o0.argmax():
            flips.append((p // 8 + 1, p % 8 + 1, int(numpy_forward(x)[2].argmax())))
    print('start digit', d.answer, '| fields', d.n_fields, '| single-square edits that change the answer:', flips)

    n_params = W1.size + B1.size + W2.size + B2.size
    acc = f'{100 * correct / n_test:.1f}%'
    P = lambda t, **k: para(run(t), **k)
    B = lambda t: run(t, rpr(bold=True))
    body = ''
    # ---- section 1: protected for forms; holds the title and the machine
    body += para(run('This document is thinking.'), style='Title')
    body += para(run('A neural network is running inside this page. There are no macros, no add-ins and no '
                     'internet connection behind it: only Microsoft Word.', rpr(size=12, color=GREY)), after=100)
    body += para(B('Try it. ') + run('Click any square in the grid, choose ■ or □, and press Tab. '
                 'Word recalculates every number on the page and the network reads your drawing again. '
                 'The digit it starts with is a real person’s handwriting from the test data.'), after=120)
    body += table
    body += para(run('If nothing changes: click “Enable Editing” at the top of the window, and use Word on a '
                     'computer (not the browser or phone version). Press Tab after each change; the page updates when you leave a square. '
                     'To edit this page, choose Review \u2192 Restrict Editing \u2192 Stop Protection (there is no password).', rpr(size=8.5, italic=True, color=GREY)),
                 before=80, after=0,
                 extra='<w:sectPr><w:pgSz w:w="11906" w:h="16838"/>'
                       '<w:pgMar w:top="964" w:right="1134" w:bottom="964" w:left="1134" w:header="567" w:footer="567" w:gutter="0"/>'
                       '</w:sectPr>')
    # ---- section 2: editable explanation
    body += para(run('What just happened'), style='Heading1')
    body += P('Everything in the grey panels is a Word field: the same feature that prints page numbers and '
              'today’s date. Fields can also do arithmetic and make yes/no decisions, and a neural network '
              'needs nothing more than that. This file chains them together:')
    steps = [
        ('1 → 2', 'Each square is a drop-down. An IF field turns it into 1 (ink) or 0 (no ink).'),
        ('3', f'Each of the {H} hidden neurons multiplies the 64 numbers by its own 64 learned weights, adds them up, '
              'and passes the total on only if it is above zero. The panel shows twice that value, to keep every number whole.'),
        ('4', 'Each of the ten digits gets a score: a weighted sum of what the neurons passed on.'),
        ('5 → 6', 'IF fields compare the ten scores, draw the bars and print the digit with the highest one.'),
    ]
    rows = ''
    for k, t in steps:
        rows += ('<w:tr>' + cell(para(run(k, rpr(bold=True, color=RED)), before=40, after=40), 1100, fill='FFFFFF')
                 + cell(para(run(t), before=40, after=40), 8538, fill='FFFFFF') + '</w:tr>')
    body += ('<w:tbl><w:tblPr><w:tblW w:w="9638" w:type="dxa"/><w:tblLayout w:type="fixed"/></w:tblPr>'
             '<w:tblGrid><w:gridCol w:w="1100"/><w:gridCol w:w="8538"/></w:tblGrid>' + rows + '</w:tbl>')
    body += P(f'The weights were not written by hand. They were learned from real handwriting, then rounded to whole '
              f'numbers between −{int(np.abs(W1).max())} and {int(np.abs(W2).max())} so that Word’s calculator '
              f'could carry them. The file holds {d.n_fields:,} fields and {n_params:,} learned numbers.', before=120)

    body += para(run('The facts'), style='Heading1')
    facts = [
        ('Training data', f'{M["n_total"]:,} real 8×8 scans of handwritten digits (the “Optical Recognition of '
                          f'Handwritten Digits” set from the UCI repository, as shipped with scikit-learn). '
                          f'{M["n_train"]:,} were used for training, {M["n_val"]} to choose between training runs and '
                          f'{M["n_test"]} were held back for the test.'),
        ('Network', f'64 inputs → {H} hidden neurons → 10 outputs; {n_params:,} weights and biases, all whole numbers.'),
        ('Measured accuracy', f'{correct} of {n_test} unseen test scans read correctly ({acc}). This was measured by running '
                              'the exact field formulas stored in this file, not a separate copy of the model.'),
        ('Known weak spots', 'It is far from perfect. It was trained on thick, centred scans, so thin or off-centre '
                             'drawings often fool it, and sometimes one square is enough to change its answer. '
                             'Eights and nines are its worst digits.'),
        ('What is in the file', 'An ordinary .docx. That format cannot contain macros. Nothing is downloaded and nothing runs '
                                'except Word’s own field calculator.'),
    ]
    rows = ''
    for k, t in facts:
        rows += ('<w:tr>' + cell(para(run(k, rpr(bold=True, color=NAVY)), before=50, after=50), 2300)
                 + cell(para(run(t), before=50, after=50), 7338, fill='FFFFFF') + '</w:tr>')
    b2 = ''.join(f'<w:{s} w:val="single" w:sz="4" w:space="0" w:color="C9CED8"/>' for s in ('top', 'left', 'bottom', 'right', 'insideH', 'insideV'))
    body += (f'<w:tbl><w:tblPr><w:tblW w:w="9638" w:type="dxa"/><w:tblBorders>{b2}</w:tblBorders><w:tblLayout w:type="fixed"/></w:tblPr>'
             '<w:tblGrid><w:gridCol w:w="2300"/><w:gridCol w:w="7338"/></w:tblGrid>' + rows + '</w:tbl>')

    im_s, im_n = picture_samples(), picture_neurons()
    body += para(run('What it learned from'), style='Heading2')
    body += para(inline_image('rId10', im_s, 16.5, 1, 'Ten real test scans, one per digit'), after=40)
    body += para(run('Ten of the real scans it was tested on, one for each digit 0–9, as the network sees them.',
                     rpr(size=9, italic=True, color=GREY)))
    body += para(run('What each neuron looks for'), style='Heading2')
    body += para(inline_image('rId11', im_n, 16.5, 2, 'Weights of the hidden neurons'), after=40)
    body += para(run(f'The {H} hidden neurons. Red squares are places where ink raises the neuron’s total; blue '
                     'squares are places where ink lowers it. Nobody chose these patterns: training did.',
                     rpr(size=9, italic=True, color=GREY)))

    body += para(run('See the code'), style='Heading2')
    body += P('Press Alt+F9 to swap every result on the page for the field code that produces it, and Alt+F9 again to '
              'switch back. (If Word ignores the keys, choose Review \u2192 Restrict Editing \u2192 Stop Protection first.) '
              'This, for example, is the whole of output score 0:')
    code0 = '{ = ' + f'0{"+" if B2[0] >= 0 else "-"}{abs(int(B2[0]))}' + ''.join(
        '+({ = ' + terms([(W2[j, 0], f'h_{j+1}') for j in range(g, min(g + 5, H))]) + ' })' for g in range(0, H, 5)) + ' }'
    body += para(run(code0, rpr(font='Courier New', size=8.5, color=NAVY)), after=160)

    body += para(run('Why this matters'), style='Heading1')
    body += P('Word’s fields and form drop-downs date from the 1990s. They were built for mail merge, invoices '
              'and page numbers. Nobody designed them to recognise handwriting, and a search before this was built '
              'found neural networks in Excel spreadsheets but none in Word fields.')
    body += P('This file was made by asking an AI system for something that had not been done with Word. It chose '
              'the mechanism, trained the network on real data, squeezed it into whole numbers, wrote every one of the '
              f'{d.n_fields:,} interlocking fields directly as raw file contents, and checked its own work against '
              f'{n_test} test images. The frontier is not only new tools. It is also what AI can get out of the old ones.')
    body += para(run('Built with Claude, an AI system made by Anthropic. Everything after the first page can be edited freely.',
                     rpr(size=9, italic=True, color=GREY)), before=200)
    body += ('<w:sectPr><w:type w:val="nextPage"/><w:pgSz w:w="11906" w:h="16838"/>'
             '<w:pgMar w:top="1134" w:right="1134" w:bottom="1134" w:left="1134" w:header="567" w:footer="567" w:gutter="0"/>'
             '<w:formProt w:val="0"/></w:sectPr>')

    ns = ('xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" '
          'xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" '
          'xmlns:wp="http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing" '
          'xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" '
          'xmlns:pic="http://schemas.openxmlformats.org/drawingml/2006/picture"')
    head = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n'
    document = f'{head}<w:document {ns}><w:body>{body}</w:body></w:document>'

    styles = f'''{head}<w:styles xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
<w:docDefaults><w:rPrDefault><w:rPr><w:rFonts w:ascii="Arial" w:hAnsi="Arial" w:cs="Arial" w:eastAsia="Arial"/><w:color w:val="222222"/><w:sz w:val="21"/><w:szCs w:val="21"/><w:lang w:val="en-GB"/></w:rPr></w:rPrDefault>
<w:pPrDefault><w:pPr><w:spacing w:after="120" w:line="276" w:lineRule="auto"/></w:pPr></w:pPrDefault></w:docDefaults>
<w:style w:type="paragraph" w:default="1" w:styleId="Normal"><w:name w:val="Normal"/><w:qFormat/></w:style>
<w:style w:type="paragraph" w:styleId="Title"><w:name w:val="Title"/><w:basedOn w:val="Normal"/><w:next w:val="Normal"/><w:qFormat/><w:pPr><w:spacing w:before="0" w:after="60" w:line="240" w:lineRule="auto"/></w:pPr><w:rPr><w:b/><w:color w:val="{NAVY}"/><w:sz w:val="64"/><w:szCs w:val="64"/></w:rPr></w:style>
<w:style w:type="paragraph" w:styleId="Heading1"><w:name w:val="heading 1"/><w:basedOn w:val="Normal"/><w:next w:val="Normal"/><w:qFormat/><w:pPr><w:keepNext/><w:spacing w:before="320" w:after="120"/><w:outlineLvl w:val="0"/></w:pPr><w:rPr><w:b/><w:color w:val="{NAVY}"/><w:sz w:val="34"/><w:szCs w:val="34"/></w:rPr></w:style>
<w:style w:type="paragraph" w:styleId="Heading2"><w:name w:val="heading 2"/><w:basedOn w:val="Normal"/><w:next w:val="Normal"/><w:qFormat/><w:pPr><w:keepNext/><w:spacing w:before="260" w:after="100"/><w:outlineLvl w:val="1"/></w:pPr><w:rPr><w:b/><w:color w:val="{RED}"/><w:sz w:val="24"/><w:szCs w:val="24"/></w:rPr></w:style>
<w:style w:type="table" w:default="1" w:styleId="TableNormal"><w:name w:val="Normal Table"/><w:uiPriority w:val="99"/><w:semiHidden/><w:unhideWhenUsed/><w:tblPr><w:tblInd w:w="0" w:type="dxa"/><w:tblCellMar><w:top w:w="0" w:type="dxa"/><w:left w:w="108" w:type="dxa"/><w:bottom w:w="0" w:type="dxa"/><w:right w:w="108" w:type="dxa"/></w:tblCellMar></w:tblPr></w:style>
</w:styles>'''

    settings = f'''{head}<w:settings xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:zoom w:percent="100"/><w:documentProtection w:edit="forms" w:enforcement="1"/><w:defaultTabStop w:val="720"/><w:characterSpacingControl w:val="doNotCompress"/><w:compat><w:compatSetting w:name="compatibilityMode" w:uri="http://schemas.microsoft.com/office/word" w:val="15"/></w:compat></w:settings>'''

    content_types = f'''{head}<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Default Extension="png" ContentType="image/png"/><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/><Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/><Override PartName="/word/settings.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.settings+xml"/><Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/></Types>'''
    rels = f'''{head}<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/></Relationships>'''
    doc_rels = f'''{head}<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/settings" Target="settings.xml"/><Relationship Id="rId10" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/image" Target="media/samples.png"/><Relationship Id="rId11" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/image" Target="media/neurons.png"/></Relationships>'''
    now = datetime.datetime.now(datetime.timezone.utc).strftime('%Y-%m-%dT%H:%M:%SZ')
    core = f'''{head}<cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><dc:title>This document is thinking</dc:title><dcterms:created xsi:type="dcterms:W3CDTF">{now}</dcterms:created><dcterms:modified xsi:type="dcterms:W3CDTF">{now}</dcterms:modified></cp:coreProperties>'''

    with zipfile.ZipFile(OUT, 'w', zipfile.ZIP_DEFLATED) as z:
        z.writestr('[Content_Types].xml', content_types)
        z.writestr('_rels/.rels', rels)
        z.writestr('word/document.xml', document)
        z.writestr('word/_rels/document.xml.rels', doc_rels)
        z.writestr('word/styles.xml', styles)
        z.writestr('word/settings.xml', settings)
        z.writestr('docProps/core.xml', core)
        z.writestr('word/media/samples.png', png(im_s))
        z.writestr('word/media/neurons.png', png(im_n))
    print('wrote', OUT)


if __name__ == '__main__':
    build()
