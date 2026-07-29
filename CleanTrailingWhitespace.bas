Option Explicit

Public Sub CleanTrailingWhitespaceAndLeftAlignBlankParagraphs()
    Const UNDO_NAME As String = _
        "Clean trailing whitespace and blank paragraphs"

    Dim doc As Document
    Dim body As Range
    Dim para As Paragraph
    Dim paraRange As Range

    Dim previousScreenUpdating As Boolean
    Dim undoStarted As Boolean

    Dim savedErrorNumber As Long
    Dim savedErrorDescription As String

    On Error GoTo Failed

    previousScreenUpdating = Application.ScreenUpdating
    Application.ScreenUpdating = False

    Set doc = ActiveDocument
    Set body = doc.StoryRanges(wdMainTextStory)

    Application.UndoRecord.StartCustomRecord UNDO_NAME
    undoStarted = True

    ' Delete trailing whitespace without replacing the break itself.
    DeleteWhitespaceBeforeBreak body, "^13"  ' Paragraph mark
    DeleteWhitespaceBeforeBreak body, "^11"  ' Manual line break

    ' Nothing in this loop deletes or splits paragraphs, so the
    ' collection is stable and For Each is safe. Indexed access
    ' (body.Paragraphs(i)) walks the story from the start on every
    ' call, which is quadratic on large documents.
    For Each para In body.Paragraphs
        Set paraRange = para.Range

        If ShouldNormaliseBlankParagraph(paraRange) Then
            DeleteWhitespaceOnly paraRange

            ' Put the blank paragraph at the left margin.
            With para.Format
                .LeftIndent = 0
                .FirstLineIndent = 0
                .Alignment = wdAlignParagraphLeft
            End With
        End If
    Next para

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

Private Sub DeleteWhitespaceBeforeBreak( _
    ByVal sourceRange As Range, _
    ByVal breakCode As String)

    Dim scan As Range
    Dim whitespace As Range
    Dim resumePosition As Long
    Dim wasFound As Boolean

    Set scan = sourceRange.Duplicate

    Do
        With scan.Find
            .ClearFormatting
            .Replacement.ClearFormatting

            ' Policy: ordinary spaces, tabs and trailing NBSPs
            ' are all treated as removable whitespace.
            .Text = WhitespaceRunPattern() & breakCode

            .Forward = True
            .Wrap = wdFindStop
            .Format = False

            .MatchCase = False
            .MatchWholeWord = False
            .MatchSoundsLike = False
            .MatchAllWordForms = False
            .MatchWildcards = True

            wasFound = .Execute
        End With

        If Not wasFound Then Exit Do

        ' Find has redefined scan as the matched range.
        ' Save the location of the retained break.
        resumePosition = scan.Start

        Set whitespace = scan.Duplicate

        ' Exclude the final ^13 or ^11 from the deletion.
        whitespace.End = whitespace.End - 1
        whitespace.Delete

        ' The break now occupies the old start position.
        ' Resume immediately after that retained break.
        resumePosition = resumePosition + 1

        If resumePosition >= sourceRange.End Then Exit Do

        scan.SetRange _
            Start:=resumePosition, _
            End:=sourceRange.End
    Loop
End Sub

Private Function ShouldNormaliseBlankParagraph( _
    ByVal paraRange As Range) As Boolean

    Dim paragraphText As String
    paragraphText = paraRange.Text

    ' Cheapest test first: almost every paragraph in a real document
    ' fails it, so the structural guards below - each a COM round-trip
    ' - only ever run on visually blank paragraphs.
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
    Dim characterCode As Long

    For i = 1 To Len(paragraphText)
        characterCode = UnicodeCharacterCode( _
            Mid$(paragraphText, i, 1))

        Select Case characterCode
            Case 7
                ' End-of-cell marker.
                ' Tables are excluded later, but retain this defensively.

            Case 9
                ' Tab.

            Case 11
                ' Manual line break.

            Case 12
                ' Manual page break.
                ' Section breaks are excluded separately.

            Case 13
                ' Paragraph mark.

            Case 32
                ' Ordinary space.

            Case 160
                ' Non-breaking space.

            Case Else
                IsVisuallyBlankParagraph = False
                Exit Function
        End Select
    Next i

    IsVisuallyBlankParagraph = True
End Function

Private Sub DeleteWhitespaceOnly(ByVal sourceRange As Range)
    Dim target As Range
    Set target = sourceRange.Duplicate

    With target.Find
        .ClearFormatting
        .Replacement.ClearFormatting

        .Text = WhitespaceRunPattern()
        .Replacement.Text = vbNullString

        .Forward = True
        .Wrap = wdFindStop
        .Format = False

        .MatchCase = False
        .MatchWholeWord = False
        .MatchSoundsLike = False
        .MatchAllWordForms = False
        .MatchWildcards = True

        .Execute Replace:=wdReplaceAll
    End With
End Sub

Private Function WhitespaceRunPattern() As String
    ' Word has inconsistent support for special-character codes
    ' inside wildcard character classes, so insert the NBSP literally.
    WhitespaceRunPattern = _
        "[ ^t" & ChrW(160) & "]@"
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
