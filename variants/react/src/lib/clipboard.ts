/**
 * navigator.clipboard requires a secure context, so it is absent on plain http
 * and inside some webviews. Callers get a boolean and fall back to asking the
 * reader to select the text themselves — which is why the summary is rendered
 * into a real, selectable element rather than only held in state.
 */
export function clipboardAvailable(): boolean {
  return (
    typeof navigator !== 'undefined' &&
    typeof navigator.clipboard !== 'undefined' &&
    typeof navigator.clipboard.writeText === 'function'
  )
}

export function copyText(text: string): Promise<boolean> {
  if (!clipboardAvailable()) return Promise.resolve(false)
  return navigator.clipboard.writeText(text).then(
    () => true,
    () => false,
  )
}

/** Select the contents of an element so a reader can copy with the keyboard. */
export function selectElementText(el: HTMLElement | null): void {
  if (!el || typeof window === 'undefined' || !window.getSelection) return
  const selection = window.getSelection()
  if (!selection) return
  const range = document.createRange()
  range.selectNodeContents(el)
  selection.removeAllRanges()
  selection.addRange(range)
}
