"""Build "word-field-probe.docx": a one-page diagnostic for the field mechanisms the other
documents rely on. Every row shows a live value and what it should be.

    python3 build_probe.py
"""
import zipfile
from build import Doc, esc, rpr, run, para, ON, OFF

d = Doc()
V = rpr(font='Courier New', size=12, bold=True, color='7A1F2B')
T = rpr(font='Arial', size=9.5)
G = rpr(font='Arial', size=8.5, color='6E6A64')


def fld(code_parts, result, name=None, rp=V):
    """Emit a field with a given cached result; optionally wrap it in a bookmark."""
    xml, _ = d._emit(code_parts, result, rp)
    return d.bookmark(name, xml, result) if name else xml


def F(expr, result, name=None, rp=V):
    return fld([f' = {expr} '], str(result), name, rp)


def text_field(name, default):
    d.bm_id += 1
    ff = (f'<w:ffData><w:name w:val="{name}"/><w:enabled/><w:calcOnExit/>'
          f'<w:textInput><w:type w:val="number"/><w:default w:val="{default}"/></w:textInput></w:ffData>')
    return (f'<w:r>{V}<w:fldChar w:fldCharType="begin">{ff}</w:fldChar></w:r>'
            f'<w:bookmarkStart w:id="{d.bm_id}" w:name="{name}"/>'
            f'<w:r>{V}<w:instrText xml:space="preserve"> FORMTEXT </w:instrText></w:r>'
            f'<w:r>{V}<w:fldChar w:fldCharType="separate"/></w:r>'
            f'<w:r>{V}<w:t>{default}</w:t></w:r>'
            f'<w:r>{V}<w:fldChar w:fldCharType="end"/></w:r>'
            f'<w:bookmarkEnd w:id="{d.bm_id}"/>')


def num_dropdown(name, items, sel):
    d.bm_id += 1
    ff = (f'<w:ffData><w:name w:val="{name}"/><w:enabled/><w:calcOnExit/><w:ddList><w:result w:val="{sel}"/><w:default w:val="{sel}"/>'
          + ''.join(f'<w:listEntry w:val="{i}"/>' for i in items) + '</w:ddList></w:ffData>')
    return (f'<w:r>{V}<w:fldChar w:fldCharType="begin">{ff}</w:fldChar></w:r>'
            f'<w:bookmarkStart w:id="{d.bm_id}" w:name="{name}"/>'
            f'<w:r>{V}<w:instrText xml:space="preserve"> FORMDROPDOWN </w:instrText></w:r>'
            f'<w:r>{V}<w:fldChar w:fldCharType="separate"/></w:r><w:r>{V}<w:fldChar w:fldCharType="end"/></w:r>'
            f'<w:bookmarkEnd w:id="{d.bm_id}"/>')


def cellx(content, w):
    return f'<w:tc><w:tcPr><w:tcW w:w="{w}" w:type="dxa"/></w:tcPr>{content}</w:tc>'


rows = []


def row(label, live, expect):
    n = len(rows) + 1
    rows.append('<w:tr><w:trPr><w:cantSplit/></w:trPr>'
                + cellx(para(run(str(n), rpr(font='Arial', size=9.5, bold=True)), before=40, after=40), 500)
                + cellx(para(run(label, T), before=40, after=40), 3300)
                + cellx(para(live, before=40, after=40), 2600)
                + cellx(para(run(expect, G), before=40, after=40), 3238) + '</w:tr>')


sp = run('  ', V)
# inputs
row('Input A: a square', d.dropdown('d_1', False, V), 'Starts □. You change this.')
row('Input B: a number list', num_dropdown('d_2', ['0', '1', '2', '3'], 1), 'Starts 1. You change this.')
row('Input C: type a number', text_field('t_1', 5), 'Starts 5. You change this.')
# is anything recalculating, and how often?
row('Counter: a field that adds 1 to itself', F('c_1+1', 0, 'c_1'), 'Goes up by 1 every time the page recalculates.')
row('Ring: two fields that feed each other', F('q_1+1', 0, 'p_1') + sp + F('p_1+1', 1, 'q_1'), 'Each goes up by 2 per recalculation (0 1, then 2 3, then 4 5).')
# reading the inputs
row('Mirror of A', fld([' REF d_1 '], OFF), 'Same symbol as row 1.')
ref = d._emit([' REF d_1 '], OFF, V)
row('A as a number', fld([' IF ', ref, f' = "{ON}" 1 0 '], '0', 'v_1'), '1 when A is ■, 0 when □.')
row('B times 10', F('d_2*10', 10), '10 x row 2.')
row('C times 2', F('t_1*2', 10), '2 x row 3.')
# dependency order
chain = F('v_1+1', 1, 'e_1')
for i in range(2, 7):
    chain += sp + F(f'e_{i-1}+1', i, f'e_{i}')
row('Chain, in reading order', chain, '1 2 3 4 5 6 when A is □; 2 3 4 5 6 7 when ■. All change in the same recalculation.')
back = F('f_2+1', 3, 'f_3') + sp + F('f_1+1', 2, 'f_2') + sp + F('v_1+1', 1, 'f_1')
row('Chain, written backwards', back, '3 2 1 when □; 4 3 2 when ■. If this needs several recalculations to settle, say how many.')
# functions and nesting
inner = d._emit([' = 3+4 '], '7', V)
row('Arithmetic', F('ABS(0-5)', 5) + sp + F('SIGN(0-5)', -1) + sp + F('(7+3+ABS(7-3))/2', 7) + sp + fld([' = 2*(', inner, ') '], '14'), 'Always 5  -1  7  14.')
# hidden intermediate
hid = rpr(size=1, color='FFFFFF')
row('Through a hidden step', F('v_1+1', 1, 'g_1', hid) + F('g_1*100', 100), '100 when A is □, 200 when ■.')
row('Bookmarks still alive', F('DEFINED(d_1)+DEFINED(v_1)+DEFINED(e_6)+DEFINED(g_1)+DEFINED(c_1)', 5), 'Always 5.')

b = ''.join(f'<w:{s} w:val="single" w:sz="4" w:space="0" w:color="BBBBBB"/>' for s in ('top', 'left', 'bottom', 'right', 'insideH', 'insideV'))
table = ('<w:tbl><w:tblPr><w:tblW w:w="9638" w:type="dxa"/><w:tblBorders>' + b + '</w:tblBorders><w:tblLayout w:type="fixed"/>'
         '<w:tblCellMar><w:left w:w="100" w:type="dxa"/><w:right w:w="100" w:type="dxa"/></w:tblCellMar></w:tblPr>'
         '<w:tblGrid><w:gridCol w:w="500"/><w:gridCol w:w="3300"/><w:gridCol w:w="2600"/><w:gridCol w:w="3238"/></w:tblGrid>'
         + ''.join(rows) + '</w:tbl>')
# the same counter outside any table
outside = para(run('Row 15, outside the table. Counter: ', T) + F('k_1+1', 0, 'k_1') + run('   A as a number: ', T) + F('v_1', 0)
               + run('   (counter should match row 4)', G), before=160, after=80)
steps = ['Open in desktop Word and click Enable Editing.',
         'Change Input A to ■, then press Tab. Note rows 4 to 15.',
         'Change Input A back to □, then press Tab. Note them again.',
         'Change Input A to ■ again, but this time click on Input B with the mouse instead of pressing Tab. Did anything change?',
         'Change Input B and press Tab. Type a new number in Input C and press Tab.',
         'If the counters stopped at some point, press Ctrl+F2 (Print Preview) then Esc, and see whether they move.']
body = para(run('Word field probe', rpr(font='Arial', size=20, bold=True)), after=60)
body += para(run('Twelve small tests of the mechanisms the other documents use. Follow the steps, then tell me what rows 4 to 15 showed after each one.', T), after=100)
for i, s in enumerate(steps, 1):
    body += para(run(f'{i}.  ', rpr(font='Arial', size=9.5, bold=True)) + run(s, T), before=0, after=30)
body += para('', before=0, after=60)
body += table + outside
body += ('<w:sectPr><w:pgSz w:w="11906" w:h="16838"/><w:pgMar w:top="1020" w:right="1134" w:bottom="1020" w:left="1134" w:header="567" w:footer="567" w:gutter="0"/></w:sectPr>')

head = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n'
W = 'xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"'
parts = {
    '[Content_Types].xml': f'{head}<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/><Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/><Override PartName="/word/settings.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.settings+xml"/></Types>',
    '_rels/.rels': f'{head}<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/></Relationships>',
    'word/_rels/document.xml.rels': f'{head}<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/settings" Target="settings.xml"/></Relationships>',
    'word/document.xml': f'{head}<w:document {W}><w:body>{body}</w:body></w:document>',
    'word/styles.xml': f'{head}<w:styles {W}><w:docDefaults><w:rPrDefault><w:rPr><w:rFonts w:ascii="Arial" w:hAnsi="Arial" w:cs="Arial"/><w:sz w:val="20"/><w:szCs w:val="20"/><w:lang w:val="en-GB"/></w:rPr></w:rPrDefault><w:pPrDefault><w:pPr><w:spacing w:after="80"/></w:pPr></w:pPrDefault></w:docDefaults><w:style w:type="paragraph" w:default="1" w:styleId="Normal"><w:name w:val="Normal"/><w:qFormat/></w:style></w:styles>',
    'word/settings.xml': f'{head}<w:settings {W}><w:documentProtection w:edit="forms" w:enforcement="1"/><w:defaultTabStop w:val="720"/><w:compat><w:compatSetting w:name="compatibilityMode" w:uri="http://schemas.microsoft.com/office/word" w:val="15"/></w:compat></w:settings>',
}
with zipfile.ZipFile('word-field-probe.docx', 'w', zipfile.ZIP_DEFLATED) as z:
    for k, v in parts.items():
        z.writestr(k, v)
print('wrote word-field-probe.docx with', d.n_fields, 'fields')
