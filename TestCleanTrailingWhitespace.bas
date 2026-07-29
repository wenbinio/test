Option Explicit

' =====================================================================
'  Automated edge-case suite for CleanTrailingWhitespace.
'
'  Each test builds a scratch document, runs the cleaner over it and
'  asserts on the resulting text. Scratch documents are closed without
'  saving. Run RunCleanTrailingWhitespaceTests and read the report in
'  the Immediate window (Ctrl+G).
'
'  Requires the CleanTrailingWhitespace module in the same project.
' =====================================================================

Private testsRun As Long
Private testsFailed As Long
Private failureLog As String

Public Sub RunCleanTrailingWhitespaceTests()
    Dim previousScreenUpdating As Boolean

    testsRun = 0
    testsFailed = 0
    failureLog = vbNullString

    previousScreenUpdating = Application.ScreenUpdating
    Application.ScreenUpdating = False

    On Error GoTo Failed

    ' --- Basic trailing whitespace ---------------------------------
    TestTrailingSpaces
    TestTrailingTabs
    TestMixedTrailingWhitespace
    TestTrailingNonBreakingSpace
    TestTrailingUnicodeSpaces
    TestLongWhitespaceRun

    ' --- Whitespace that must survive ------------------------------
    TestLeadingWhitespacePreserved
    TestInteriorWhitespacePreserved
    TestCleanDocumentUnchanged

    ' --- Breaks -----------------------------------------------------
    TestWhitespaceBeforeLineBreak
    TestWhitespaceBeforePageBreak
    TestWhitespaceBeforeSectionBreak
    TestWhitespaceBeforeConsecutiveBreaks

    ' --- Blank paragraphs -------------------------------------------
    TestWhitespaceOnlyParagraph
    TestConsecutiveBlankParagraphs
    TestBlankParagraphIndentReset
    TestBlankListParagraphNotReformatted

    ' --- Structure ---------------------------------------------------
    TestTableCellTrailingWhitespace
    TestTableCellIndentPreserved
    TestDocumentEndWhitespace
    TestEmptyDocument
    TestSingleSpaceDocument

    ' --- Idempotence and scale --------------------------------------
    TestIdempotence
    TestManyParagraphs

    Application.ScreenUpdating = previousScreenUpdating
    ReportResults
    Exit Sub

Failed:
    Application.ScreenUpdating = previousScreenUpdating
    Debug.Print "SUITE ABORTED: " & Err.Number & " - " & Err.Description
    ReportResults
End Sub

' ---------------------------------------------------------------------
'  Tests
' ---------------------------------------------------------------------

Private Sub TestTrailingSpaces()
    Dim doc As Document
    Set doc = NewScratchDocument("Alpha   " & vbCr & "Beta  ")
    CleanDocumentTrailingWhitespace doc
    AssertBodyEquals "trailing spaces", doc, "Alpha" & vbCr & "Beta"
    Discard doc
End Sub

Private Sub TestTrailingTabs()
    Dim doc As Document
    Set doc = NewScratchDocument( _
        "Alpha" & vbTab & vbTab & vbCr & "Beta" & vbTab)
    CleanDocumentTrailingWhitespace doc
    AssertBodyEquals "trailing tabs", doc, "Alpha" & vbCr & "Beta"
    Discard doc
End Sub

Private Sub TestMixedTrailingWhitespace()
    Dim doc As Document
    Set doc = NewScratchDocument( _
        "Alpha " & vbTab & "  " & vbTab & ChrW(160) & vbCr & "Beta")
    CleanDocumentTrailingWhitespace doc
    AssertBodyEquals "mixed space/tab/nbsp run", doc, _
        "Alpha" & vbCr & "Beta"
    Discard doc
End Sub

Private Sub TestTrailingNonBreakingSpace()
    Dim doc As Document
    Set doc = NewScratchDocument( _
        "Alpha" & ChrW(160) & ChrW(160) & vbCr & "Beta")
    CleanDocumentTrailingWhitespace doc
    AssertBodyEquals "trailing nbsp", doc, "Alpha" & vbCr & "Beta"
    Discard doc
End Sub

Private Sub TestTrailingUnicodeSpaces()
    Dim doc As Document
    ' En space, em space, thin space, narrow nbsp, ideographic space.
    Set doc = NewScratchDocument( _
        "Alpha" & ChrW(8194) & ChrW(8195) & ChrW(8201) & _
        ChrW(8239) & ChrW(12288) & vbCr & "Beta")
    CleanDocumentTrailingWhitespace doc
    AssertBodyEquals "trailing unicode spaces", doc, _
        "Alpha" & vbCr & "Beta"
    Discard doc
End Sub

Private Sub TestLongWhitespaceRun()
    Dim doc As Document
    ' A long run is where the wildcard "@" operator was unreliable.
    Set doc = NewScratchDocument( _
        "Alpha" & String$(200, " ") & vbCr & "Beta")
    CleanDocumentTrailingWhitespace doc
    AssertBodyEquals "200-space run", doc, "Alpha" & vbCr & "Beta"
    Discard doc
End Sub

Private Sub TestLeadingWhitespacePreserved()
    Dim doc As Document
    Set doc = NewScratchDocument("   Alpha   " & vbCr & vbTab & "Beta")
    CleanDocumentTrailingWhitespace doc
    AssertBodyEquals "leading whitespace preserved", doc, _
        "   Alpha" & vbCr & vbTab & "Beta"
    Discard doc
End Sub

Private Sub TestInteriorWhitespacePreserved()
    Dim doc As Document
    Set doc = NewScratchDocument( _
        "Alpha   Beta" & vbTab & "Gamma  " & vbCr)
    CleanDocumentTrailingWhitespace doc
    AssertBodyEquals "interior whitespace preserved", doc, _
        "Alpha   Beta" & vbTab & "Gamma" & vbCr
    Discard doc
End Sub

Private Sub TestCleanDocumentUnchanged()
    Dim doc As Document
    Set doc = NewScratchDocument("Alpha" & vbCr & "Beta" & vbCr & "Gamma")
    CleanDocumentTrailingWhitespace doc
    AssertBodyEquals "already-clean document untouched", doc, _
        "Alpha" & vbCr & "Beta" & vbCr & "Gamma"
    Discard doc
End Sub

Private Sub TestWhitespaceBeforeLineBreak()
    Dim doc As Document
    Set doc = NewScratchDocument( _
        "Alpha  " & Chr$(11) & "Beta   " & Chr$(11) & "Gamma")
    CleanDocumentTrailingWhitespace doc
    AssertBodyEquals "whitespace before line break", doc, _
        "Alpha" & Chr$(11) & "Beta" & Chr$(11) & "Gamma"
    Discard doc
End Sub

Private Sub TestWhitespaceBeforePageBreak()
    Dim doc As Document
    Dim rng As Range

    Set doc = NewScratchDocument("Alpha  ")
    Set rng = doc.Content
    rng.Collapse wdCollapseEnd
    rng.InsertBreak wdPageBreak
    rng.InsertAfter "Beta"

    CleanDocumentTrailingWhitespace doc
    AssertNoWhitespaceBeforeCode "whitespace before page break", doc, 12
    Discard doc
End Sub

Private Sub TestWhitespaceBeforeSectionBreak()
    Dim doc As Document
    Dim rng As Range

    Set doc = NewScratchDocument("Alpha  ")
    Set rng = doc.Content
    rng.Collapse wdCollapseEnd
    rng.InsertBreak wdSectionBreakNextPage
    rng.InsertAfter "Beta"

    CleanDocumentTrailingWhitespace doc
    AssertNoWhitespaceBeforeCode _
        "whitespace before section break", doc, 12
    Discard doc
End Sub

Private Sub TestWhitespaceBeforeConsecutiveBreaks()
    Dim doc As Document
    Set doc = NewScratchDocument( _
        "Alpha  " & Chr$(11) & Chr$(11) & "Beta")
    CleanDocumentTrailingWhitespace doc
    AssertBodyEquals "whitespace before consecutive breaks", doc, _
        "Alpha" & Chr$(11) & Chr$(11) & "Beta"
    Discard doc
End Sub

Private Sub TestWhitespaceOnlyParagraph()
    Dim doc As Document
    Set doc = NewScratchDocument( _
        "Alpha" & vbCr & "   " & vbTab & vbCr & "Beta")
    CleanDocumentTrailingWhitespace doc
    AssertBodyEquals "whitespace-only paragraph emptied", doc, _
        "Alpha" & vbCr & vbCr & "Beta"
    Discard doc
End Sub

Private Sub TestConsecutiveBlankParagraphs()
    Dim doc As Document
    Set doc = NewScratchDocument( _
        "Alpha" & vbCr & "  " & vbCr & vbTab & vbCr & "   " & _
        vbCr & "Beta")
    CleanDocumentTrailingWhitespace doc
    AssertBodyEquals "consecutive blank paragraphs emptied", doc, _
        "Alpha" & vbCr & vbCr & vbCr & vbCr & "Beta"
    Discard doc
End Sub

Private Sub TestBlankParagraphIndentReset()
    Dim doc As Document
    Set doc = NewScratchDocument("Alpha" & vbCr & "   " & vbCr & "Beta")

    With doc.Paragraphs(2).Format
        .LeftIndent = InchesToPoints(1)
        .FirstLineIndent = InchesToPoints(0.5)
        .Alignment = wdAlignParagraphCenter
    End With

    CleanDocumentTrailingWhitespace doc

    AssertTrue "blank paragraph left indent reset", _
        doc.Paragraphs(2).Format.LeftIndent = 0
    AssertTrue "blank paragraph first-line indent reset", _
        doc.Paragraphs(2).Format.FirstLineIndent = 0
    AssertTrue "blank paragraph left-aligned", _
        doc.Paragraphs(2).Format.Alignment = wdAlignParagraphLeft
    Discard doc
End Sub

Private Sub TestBlankListParagraphNotReformatted()
    Dim doc As Document
    Set doc = NewScratchDocument("Alpha" & vbCr & "  " & vbCr & "Beta")

    doc.Paragraphs(2).Range.ListFormat.ApplyBulletDefault
    doc.Paragraphs(2).Format.LeftIndent = InchesToPoints(1)

    CleanDocumentTrailingWhitespace doc

    AssertTrue "blank list paragraph keeps its indent", _
        doc.Paragraphs(2).Format.LeftIndent > 0
    Discard doc
End Sub

Private Sub TestTableCellTrailingWhitespace()
    Dim doc As Document
    Dim tbl As Table

    Set doc = NewScratchDocument("Alpha")
    Set tbl = doc.Tables.Add(doc.Paragraphs(1).Range, 2, 2)
    tbl.Cell(1, 1).Range.Text = "One  "
    tbl.Cell(1, 2).Range.Text = "Two" & vbTab
    tbl.Cell(2, 1).Range.Text = "Three   "
    tbl.Cell(2, 2).Range.Text = "Four"

    CleanDocumentTrailingWhitespace doc

    AssertTrue "table cell 1,1 cleaned", _
        CellText(tbl, 1, 1) = "One"
    AssertTrue "table cell 1,2 cleaned", _
        CellText(tbl, 1, 2) = "Two"
    AssertTrue "table cell 2,1 cleaned", _
        CellText(tbl, 2, 1) = "Three"
    AssertTrue "table cell 2,2 untouched", _
        CellText(tbl, 2, 2) = "Four"
    Discard doc
End Sub

Private Sub TestTableCellIndentPreserved()
    Dim doc As Document
    Dim tbl As Table

    Set doc = NewScratchDocument("Alpha")
    Set tbl = doc.Tables.Add(doc.Paragraphs(1).Range, 1, 1)
    tbl.Cell(1, 1).Range.Text = "  "
    tbl.Cell(1, 1).Range.Paragraphs(1).Format.Alignment = _
        wdAlignParagraphCenter

    CleanDocumentTrailingWhitespace doc

    AssertTrue "blank table cell keeps its alignment", _
        tbl.Cell(1, 1).Range.Paragraphs(1).Format.Alignment = _
        wdAlignParagraphCenter
    Discard doc
End Sub

Private Sub TestDocumentEndWhitespace()
    Dim doc As Document
    Set doc = NewScratchDocument("Alpha" & vbCr & "Beta    ")
    CleanDocumentTrailingWhitespace doc
    AssertBodyEquals "whitespace at document end", doc, _
        "Alpha" & vbCr & "Beta"
    Discard doc
End Sub

Private Sub TestEmptyDocument()
    Dim doc As Document
    Set doc = NewScratchDocument(vbNullString)
    CleanDocumentTrailingWhitespace doc
    AssertBodyEquals "empty document", doc, vbNullString
    Discard doc
End Sub

Private Sub TestSingleSpaceDocument()
    Dim doc As Document
    Set doc = NewScratchDocument(" ")
    CleanDocumentTrailingWhitespace doc
    AssertBodyEquals "single-space document", doc, vbNullString
    Discard doc
End Sub

Private Sub TestIdempotence()
    Dim doc As Document
    Dim firstPass As String

    Set doc = NewScratchDocument( _
        "Alpha  " & vbCr & "  " & vbCr & "Beta" & vbTab & _
        Chr$(11) & "Gamma " & ChrW(160) & vbCr)

    CleanDocumentTrailingWhitespace doc
    firstPass = BodyText(doc)

    CleanDocumentTrailingWhitespace doc

    AssertTrue "second pass changes nothing", _
        BodyText(doc) = firstPass
    Discard doc
End Sub

Private Sub TestManyParagraphs()
    Dim doc As Document
    Dim builder As String
    Dim i As Long

    For i = 1 To 500
        builder = builder & "Line " & i & "   " & vbCr
    Next i

    Set doc = NewScratchDocument(builder)
    CleanDocumentTrailingWhitespace doc

    AssertTrue "500 paragraphs fully cleaned", _
        InStr(BodyText(doc), " " & vbCr) = 0
    Discard doc
End Sub

' ---------------------------------------------------------------------
'  Harness
' ---------------------------------------------------------------------

Private Function NewScratchDocument( _
    ByVal initialText As String) As Document

    Dim doc As Document
    Set doc = Documents.Add(Visible:=False)

    If Len(initialText) > 0 Then
        doc.Content.Text = initialText
    End If

    Set NewScratchDocument = doc
End Function

Private Sub Discard(ByVal doc As Document)
    On Error Resume Next
    doc.Close SaveChanges:=wdDoNotSaveChanges
    On Error GoTo 0
End Sub

' Body text without the final paragraph mark Word always appends,
' so expectations read naturally.
Private Function BodyText(ByVal doc As Document) As String
    Dim result As String
    result = doc.StoryRanges(wdMainTextStory).Text

    If Len(result) > 0 Then
        If Right$(result, 1) = vbCr Then
            result = Left$(result, Len(result) - 1)
        End If
    End If

    BodyText = result
End Function

Private Function CellText( _
    ByVal tbl As Table, _
    ByVal rowIndex As Long, _
    ByVal columnIndex As Long) As String

    Dim result As String
    result = tbl.Cell(rowIndex, columnIndex).Range.Text

    ' Strip the trailing Chr(13) & Chr(7) end-of-cell marker.
    Do While Len(result) > 0
        If Right$(result, 1) = Chr$(7) Or _
           Right$(result, 1) = vbCr Then
            result = Left$(result, Len(result) - 1)
        Else
            Exit Do
        End If
    Loop

    CellText = result
End Function

Private Sub AssertBodyEquals( _
    ByVal testName As String, _
    ByVal doc As Document, _
    ByVal expected As String)

    Dim actual As String
    actual = BodyText(doc)

    testsRun = testsRun + 1

    If actual <> expected Then
        testsFailed = testsFailed + 1
        failureLog = failureLog & _
            "  FAIL: " & testName & vbCrLf & _
            "        expected: " & Describe(expected) & vbCrLf & _
            "        actual:   " & Describe(actual) & vbCrLf
    End If
End Sub

' Asserts no whitespace character immediately precedes any occurrence
' of the given character code. Used for breaks that cannot be
' expressed in a literal expectation string.
Private Sub AssertNoWhitespaceBeforeCode( _
    ByVal testName As String, _
    ByVal doc As Document, _
    ByVal breakCode As Long)

    Dim text As String
    Dim i As Long
    Dim previousCode As Long
    Dim found As Boolean
    Dim violation As Boolean

    text = doc.StoryRanges(wdMainTextStory).Text

    For i = 2 To Len(text)
        If AscW(Mid$(text, i, 1)) = breakCode Then
            found = True
            previousCode = AscW(Mid$(text, i - 1, 1))
            If previousCode < 0 Then previousCode = previousCode + 65536

            Select Case previousCode
                Case 32, 9, 160, 8192 To 8202, 8239, 12288
                    violation = True
            End Select
        End If
    Next i

    testsRun = testsRun + 1

    If Not found Then
        testsFailed = testsFailed + 1
        failureLog = failureLog & _
            "  FAIL: " & testName & vbCrLf & _
            "        break character " & breakCode & _
            " not present - fixture did not build" & vbCrLf
    ElseIf violation Then
        testsFailed = testsFailed + 1
        failureLog = failureLog & _
            "  FAIL: " & testName & vbCrLf & _
            "        whitespace survives before break character " & _
            breakCode & vbCrLf & _
            "        actual: " & Describe(text) & vbCrLf
    End If
End Sub

Private Sub AssertTrue( _
    ByVal testName As String, _
    ByVal condition As Boolean)

    testsRun = testsRun + 1

    If Not condition Then
        testsFailed = testsFailed + 1
        failureLog = failureLog & _
            "  FAIL: " & testName & vbCrLf
    End If
End Sub

' Renders control and whitespace characters visibly so failure
' output is readable.
Private Function Describe(ByVal text As String) As String
    Dim result As String
    Dim i As Long
    Dim code As Long

    For i = 1 To Len(text)
        code = AscW(Mid$(text, i, 1))
        If code < 0 Then code = code + 65536

        Select Case code
            Case 32:    result = result & "<sp>"
            Case 9:     result = result & "<tab>"
            Case 160:   result = result & "<nbsp>"
            Case 7:     result = result & "<cell>"
            Case 11:    result = result & "<lbr>"
            Case 12:    result = result & "<pgbr>"
            Case 13:    result = result & "<par>"
            Case 14:    result = result & "<colbr>"
            Case Is < 32, Is > 126
                result = result & "<u+" & Hex$(code) & ">"
            Case Else
                result = result & Mid$(text, i, 1)
        End Select
    Next i

    Describe = result
End Function

Private Sub ReportResults()
    Debug.Print String$(60, "=")
    Debug.Print "CleanTrailingWhitespace test results"
    Debug.Print String$(60, "=")

    If Len(failureLog) > 0 Then
        Debug.Print failureLog
    End If

    Debug.Print "Assertions run:    " & testsRun
    Debug.Print "Assertions failed: " & testsFailed

    If testsFailed = 0 Then
        Debug.Print "ALL TESTS PASSED"
    Else
        Debug.Print "*** FAILURES PRESENT ***"
    End If

    Debug.Print String$(60, "=")
End Sub
