import { useEffect } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
}

export function HelpOverlay({ open, onClose }: Props) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "?" || e.key === "/") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="help-overlay" onClick={onClose} role="dialog" aria-label="Keyboard shortcuts">
      <div className="help-card" onClick={(e) => e.stopPropagation()}>
        <h2>Shortcuts &amp; Controls</h2>
        <dl>
          <dt>E</dt>            <dd>End turn</dd>
          <dt>A</dt>            <dd>Attack boss with all current combat</dd>
          <dt>M</dt>            <dd>Toggle sound</dd>
          <dt>?</dt>            <dd>Toggle this help</dd>
          <dt>Esc</dt>          <dd>Close any modal</dd>
          <dt>Right-click</dt>  <dd>Inspect a card (or focus + <kbd>I</kbd>)</dd>
          <dt>Tab / Shift+Tab</dt> <dd>Move focus through hand, trade row, bases</dd>
          <dt>Enter / Space</dt>  <dd>Activate the focused card</dd>
        </dl>
        <div style={{ marginTop: 18, fontSize: 12, color: "var(--text-muted)" }}>
          Press <strong>?</strong> or click anywhere to close.
        </div>
      </div>
    </div>
  );
}
