Option Explicit

' =====================================================================
'  CleanTrailingWhitespace
'
'  Removes trailing whitespace ahead of every kind of break in the
'  main text story:
'    - paragraph marks
'    - manual line breaks (Shift+Enter)
'    - manual page breaks (Ctrl+Enter)
'    - column breaks
'    - section breaks
'    - end-of-cell markers in tables
'  and left-aligns visually blank paragraphs that are safe to
'  reformat.
'
'  Whitespace policy: space, tab, no-break space (U+00A0), the
'  Unicode typographic spaces U+2000..U+200A (en, em, thin, hair
'  etc.), narrow no-break space (U+202F) and ideographic space
'  (U+3000).
'
'  Break characters are located with plain, non-wildcard Find codes
'  and whitespace runs are measured in VBA, so none of the wildcard
'  engine's quirks (notably the unreliable "@" repeat operator, which
'  can match a single character of a run and leave the rest behind)
'  are involved.
'
'  The paired module TestCleanTrailingWhitespace contains an
'  automated edge-case suite: run RunCleanTrailingWhitespaceTests.
' =====================================================================

' Set to True to also clean headers, footers, footnotes, endnotes,
' comments and text frames. Default is the main body only.
Private Const CLEAN_ALL_STORIES As Boolean = False

Public Sub CleanTrailingWhitespaceAndLeftAlignBlankParagraphs()
    Const UNDO_NAME As String = _
        "Clean trailing whitespace and blank paragraphs"

    Dim previousScreenUpdating As Boolean
    Dim undoStarted As Boolean

    Dim savedErrorNumber As Long
    Dim savedErrorDescription As String

    On Error GoTo Failed

    previousScreenUpdating = Application.ScreenUpdating
    Application.ScreenUpdating = False

    Application.UndoRecord.StartCustomRecord UNDO_NAME
    undoStarted = True

    CleanDocumentTrailingWhitespace ActiveDocument

Cleanup:
    On Error Resume Next

    If undoStarted Then
        Application.UndoRecord.EndCustomRecord
    End If

    Application.ScreenUpdating = previousScreenUpdating

    On Error GoTo 0

    If savedErrorNumber <> 0 Then
        MsgBox _
            "The cleanup stopped after making some changes:" & _
            vbCrLf & savedErrorDescription, _
            vbExclamation
    Else
        MsgBox _
            "Trailing whitespace removed and safe blank paragraphs " & _
            "moved to the left margin.", _
            vbInformation
    End If

    Exit Sub

Failed:
    savedErrorNumber = Err.Number
    savedErrorDescription = Err.Description
    Resume Cleanup
End Sub

' Testable core: no undo record, no message boxes and no reliance on
' the active document or the selection.
Public Sub CleanDocumentTrailingWhitespace(ByVal doc As Document)
    Dim story As Range
    Dim linked As Range

    If CLEAN_ALL_STORIES Then
        For Each story In doc.StoryRanges
            Set linked = story
            Do
                CleanStoryRange linked
                Set linked = linked.NextStoryRange
            Loop Until linked Is Nothing
        Next story
    Else
        CleanStoryRange doc.StoryRanges(wdMainTextStory)
    End If
End Sub

' Verifier: counts whitespace runs that sit immediately before a
' structural break or at the very end of the story. Returns 0 for a
' fully clean document.
'
' A correct single pass must leave 0. If running the cleaner twice
' lowers this number, the first pass skipped content and that is a
' bug, not an expected top-up.
Public Function CountResidualTrailingWhitespace( _
    ByVal doc As Document) As Long

    Dim text As String
    Dim i As Long
    Dim code As Long
    Dim previousCode As Long
    Dim total As Long
    Dim inRun As Boolean

    text = doc.StoryRanges(wdMainTextStory).Text

    For i = 1 To Len(text)
        code = UnicodeCharacterCode(Mid$(text, i, 1))

        If IsWhitespaceCode(code) Then
            inRun = True
        Else
            If inRun And IsStructuralBreakCode(code) Then
                total = total + 1
            End If
            inRun = False
        End If
    Next i

    ' A run still open at the end of the story is trailing whitespace.
    If inRun Then total = total + 1

    CountResidualTrailingWhitespace = total
End Function

Private Sub CleanStoryRange(ByVal body As Range)
    Dim para As Paragraph
    Dim paraRanges() As Range
    Dim paraTexts() As String
    Dim paragraphCount As Long
    Dim i As Long

    ' Whitespace ahead of mid-paragraph breaks. Section breaks always
    ' terminate a paragraph, so the tail pass below covers them.
    DeleteWhitespaceBeforeBreak body, "^l"   ' Manual line break
    DeleteWhitespaceBeforeBreak body, "^m"   ' Manual page break
    DeleteWhitespaceBeforeBreak body, "^n"   ' Column break

    ' Two phases, deliberately.
    '
    ' Phase 1 enumerates without modifying anything. Word's Paragraphs
    ' enumerator can lose sync when content is edited mid-enumeration,
    ' silently skipping paragraphs - which leaves trailing whitespace
    ' behind and makes a second run of the macro appear to find more.
    ' Indexed access (body.Paragraphs(i)) avoids that but re-walks the
    ' story on every call, which is quadratic.
    '
    ' Snapshotting Range objects gets both: enumeration is read-only
    ' and therefore safe, and Word Ranges auto-adjust their positions
    ' as text is deleted, so they stay valid throughout phase 2.
    paragraphCount = body.Paragraphs.Count
    If paragraphCount = 0 Then Exit Sub

    ReDim paraRanges(1 To paragraphCount)
    ReDim paraTexts(1 To paragraphCount)

    i = 0
    For Each para In body.Paragraphs
        i = i + 1
        If i > paragraphCount Then Exit For

        Set paraRanges(i) = para.Range

        ' Captured now because phase 2 only removes whitespace, which
        ' changes neither whether a paragraph is visually blank nor
        ' whether it holds a Chr(12). The cached text stays valid for
        ' both guards and costs one COM round-trip instead of two.
        paraTexts(i) = para.Range.Text
    Next para

    ' Phase 2 mutates, with no enumerator in flight.
    For i = 1 To paragraphCount
        If Not paraRanges(i) Is Nothing Then
            DeleteParagraphTailWhitespace paraRanges(i)

            If ShouldNormaliseBlankParagraph( _
                paraRanges(i), paraTexts(i)) Then

                With paraRanges(i).ParagraphFormat
                    .LeftIndent = 0
                    .FirstLineIndent = 0
                    .Alignment = wdAlignParagraphLeft
                End With
            End If
        End If
    Next i
End Sub

' Locates break characters with a plain (non-wildcard) Find, then
' measures the preceding whitespace run in code and deletes it,
' without ever rewriting the break character itself.
Private Sub DeleteWhitespaceBeforeBreak( _
    ByVal sourceRange As Range, _
    ByVal breakCode As String)

    Dim scan As Range
    Dim probe As Range
    Dim breakStart As Long
    Dim runStart As Long
    Dim wasFound As Boolean

    Set scan = sourceRange.Duplicate

    Do
        With scan.Find
            .ClearFormatting
            .Text = breakCode
            .Forward = True
            .Wrap = wdFindStop
            .Format = False
            .MatchCase = False
            .MatchWholeWord = False
            .MatchSoundsLike = False
            .MatchAllWordForms = False
            .MatchWildcards = False
            wasFound = .Execute
        End With

        If Not wasFound Then Exit Do

        ' Find has redefined scan as the matched break character.
        breakStart = scan.Start
        runStart = breakStart

        ' Walk backwards over the whitespace run preceding the break.
        Set probe = scan.Duplicate
        Do While runStart > sourceRange.Start
            probe.SetRange Start:=runStart - 1, End:=runStart
            If Not IsWhitespaceCode( _
                UnicodeCharacterCode(probe.Text)) Then Exit Do
            runStart = runStart - 1
        Loop

        If runStart < breakStart Then
            probe.SetRange Start:=runStart, End:=breakStart
            probe.Delete

            ' The break now occupies the old run start position.
            breakStart = runStart
        End If

        ' Resume immediately after the retained break.
        If breakStart + 1 >= sourceRange.End Then Exit Do

        scan.SetRange Start:=breakStart + 1, End:=sourceRange.End
    Loop
End Sub

' Deletes every whitespace run that sits between the last visible text
' and the end of the paragraph, however the paragraph terminates:
' paragraph mark, section break, end-of-cell marker, or break
' characters immediately ahead of one of those.
'
' Walks live document positions rather than indices into a cached
' text string: a paragraph tail can hold more than one whitespace run
' (for example "text  <line break>  <paragraph mark>"), and each
' deletion would invalidate string-index arithmetic. Positions to the
' left of a deletion never move, so backwards walking stays valid.
Private Sub DeleteParagraphTailWhitespace(ByVal paraRange As Range)
    Dim probe As Range
    Dim lowerBound As Long
    Dim pos As Long
    Dim runEnd As Long
    Dim code As Long

    lowerBound = paraRange.Start
    pos = paraRange.End
    Set probe = paraRange.Duplicate

    Do While pos > lowerBound
        probe.SetRange Start:=pos - 1, End:=pos
        code = UnicodeCharacterCode(probe.Text)

        If IsStructuralBreakCode(code) Then
            pos = pos - 1

        ElseIf IsWhitespaceCode(code) Then
            runEnd = pos

            Do While pos > lowerBound
                probe.SetRange Start:=pos - 1, End:=pos
                If Not IsWhitespaceCode( _
                    UnicodeCharacterCode(probe.Text)) Then Exit Do
                pos = pos - 1
            Loop

            probe.SetRange Start:=pos, End:=runEnd
            probe.Delete

        Else
            Exit Do
        End If
    Loop
End Sub

Private Function ShouldNormaliseBlankParagraph( _
    ByVal paraRange As Range, _
    ByVal paragraphText As String) As Boolean

    ' Cheapest test first: almost every paragraph in a real document
    ' fails it, so the structural guards below - each a COM
    ' round-trip - only ever run on visually blank paragraphs.
    If Not IsVisuallyBlankParagraph(paragraphText) Then Exit Function

    ' Do not alter paragraph formatting inside table cells.
    If paraRange.Information(wdWithInTable) Then Exit Function

    ' Do not interfere with list indentation or create malformed
    ' blank list items.
    If paraRange.ListFormat.ListType <> wdListNoNumbering Then _
        Exit Function

    ' Field and content-control characters already fail the blank
    ' test above; these guards are retained defensively.
    If paraRange.InlineShapes.Count > 0 Then Exit Function
    If paraRange.Fields.Count > 0 Then Exit Function
    If paraRange.ContentControls.Count > 0 Then Exit Function
    If HasAnchoredShape(paraRange) Then Exit Function
    If ContainsSectionBreak(paragraphText, paraRange) Then _
        Exit Function

    ShouldNormaliseBlankParagraph = True
End Function

Private Function IsVisuallyBlankParagraph( _
    ByVal paragraphText As String) As Boolean

    Dim i As Long
    Dim code As Long

    For i = 1 To Len(paragraphText)
        code = UnicodeCharacterCode(Mid$(paragraphText, i, 1))

        If Not (IsStructuralBreakCode(code) Or _
                IsWhitespaceCode(code)) Then
            Exit Function
        End If
    Next i

    IsVisuallyBlankParagraph = True
End Function

' Single source of truth for what counts as removable whitespace.
Private Function IsWhitespaceCode(ByVal code As Long) As Boolean
    Select Case code
        Case 32                  ' Ordinary space
        Case 9                   ' Tab
        Case 160                 ' No-break space
        Case 8192 To 8202        ' Typographic spaces (en, em, thin...)
        Case 8239                ' Narrow no-break space
        Case 12288               ' Ideographic space
        Case Else
            Exit Function
    End Select

    IsWhitespaceCode = True
End Function

' Characters that terminate or structure a paragraph without being
' visible text.
Private Function IsStructuralBreakCode(ByVal code As Long) As Boolean
    Select Case code
        Case 7                   ' End-of-cell / end-of-row marker
        Case 11                  ' Manual line break
        Case 12                  ' Manual page break or section break
        Case 13                  ' Paragraph mark
        Case 14                  ' Column break
        Case Else
            Exit Function
    End Select

    IsStructuralBreakCode = True
End Function

Private Function ContainsSectionBreak( _
    ByVal paragraphText As String, _
    ByVal paraRange As Range) As Boolean

    ' Page breaks and section breaks both surface as Chr(12) in the
    ' paragraph text, so a paragraph without any Chr(12) cannot
    ' contain either and needs no further checks.
    If InStr(paragraphText, Chr$(12)) = 0 Then Exit Function

    ' A section break is the paragraph's own terminating character,
    ' so the text ends in Chr(12) instead of the usual Chr(13).
    ' A manual page break is always followed by more text or the
    ' paragraph mark, so it can never be the final character.
    If Right$(paragraphText, 1) = Chr$(12) Then
        ContainsSectionBreak = True
        Exit Function
    End If

    ' Defensive: also treat the last paragraph of any section other
    ' than the final one as owning a section break.
    Dim sec As Section
    Set sec = paraRange.Sections(1)

    If sec.Index < sec.Parent.Sections.Count Then
        ContainsSectionBreak = (paraRange.End >= sec.Range.End)
    End If
End Function

Private Function HasAnchoredShape( _
    ByVal sourceRange As Range) As Boolean

    ' Range.ShapeRange may raise an error where no qualifying
    ' shape range exists, depending on the document context.
    On Error Resume Next
    HasAnchoredShape = (sourceRange.ShapeRange.Count > 0)
    Err.Clear
    On Error GoTo 0
End Function

Private Function UnicodeCharacterCode( _
    ByVal characterText As String) As Long

    Dim result As Long

    If Len(characterText) = 0 Then
        UnicodeCharacterCode = -1
        Exit Function
    End If

    result = AscW(Left$(characterText, 1))

    ' AscW can return a signed 16-bit value.
    If result < 0 Then result = result + 65536

    UnicodeCharacterCode = result
End Function
