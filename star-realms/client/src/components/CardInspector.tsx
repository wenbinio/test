import { useEffect } from "react";
import type { CardDef } from "@star-realms/shared/types";
import { FactionGlyph } from "./FactionGlyph";

interface Props {
  def: CardDef | null;
  onClose: () => void;
}

export function CardInspector({ def, onClose }: Props) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  if (!def) return null;

  const factionVar =
    def.faction === "trade"   ? "var(--f-trade)"   :
    def.faction === "blob"    ? "var(--f-blob)"    :
    def.faction === "machine" ? "var(--f-machine)" :
    def.faction === "star"    ? "var(--f-star)"    :
                                "var(--f-neutral)";

  return (
    <div
      className="endscreen"
      style={{ background: "rgba(5,6,13,0.85)" }}
      onClick={onClose}
      role="dialog"
      aria-label={`${def.name} card details`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "min(420px, 92vw)",
          background: "linear-gradient(180deg, #101828 0%, #050810 100%)",
          border: `1px solid ${factionVar}`,
          borderRadius: 14,
          padding: 22,
          boxShadow: `0 30px 80px rgba(0,0,0,0.55), 0 0 0 1px ${factionVar}, 0 0 40px ${factionVar}66`,
          position: "relative",
        }}
      >
        <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 12 }}>
          <h2 style={{ fontSize: 20, flex: 1, color: factionVar }}>{def.name}</h2>
          {def.cost > 0 && (
            <div
              className="mono"
              style={{
                background: factionVar,
                color: "#06080f",
                width: 36,
                height: 36,
                borderRadius: 18,
                display: "grid",
                placeItems: "center",
                fontWeight: 700,
                fontSize: 16,
              }}
            >
              {def.cost}
            </div>
          )}
        </div>

        <div style={{ display: "flex", gap: 8, fontSize: 11, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.16em", marginBottom: 16 }}>
          <span>{def.faction}</span>
          <span>·</span>
          <span>{def.type}</span>
          {def.defense != null && (
            <>
              <span>·</span>
              <span>defense {def.defense}</span>
            </>
          )}
          {def.outpost && (
            <>
              <span>·</span>
              <span style={{ color: factionVar }}>outpost</span>
            </>
          )}
        </div>

        <div
          style={{
            display: "grid",
            placeItems: "center",
            height: 96,
            color: factionVar,
            marginBottom: 14,
            filter: `drop-shadow(0 0 14px ${factionVar}66)`,
          }}
        >
          <div style={{ width: 72, height: 72 }}>
            <FactionGlyph faction={def.faction} />
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {def.abilities.map((a, i) => (
            <div
              key={i}
              style={{
                padding: "10px 12px",
                background: "rgba(10,13,24,0.6)",
                border: "1px solid var(--border)",
                borderRadius: 8,
                fontSize: 13,
                lineHeight: 1.4,
              }}
            >
              <div style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.14em", color: "var(--text-muted)", marginBottom: 4 }}>
                {a.ally ? "Ally" : a.scrap ? "Scrap" : "Primary"}
              </div>
              {a.text}
            </div>
          ))}
        </div>

        <button
          onClick={onClose}
          style={{ position: "absolute", top: 10, right: 10, padding: "4px 10px" }}
          aria-label="Close inspector"
        >
          ✕
        </button>

        <div style={{ marginTop: 16, fontSize: 11, color: "var(--text-muted)", textAlign: "center" }}>
          Esc to close · right-click any card to inspect
        </div>
      </div>
    </div>
  );
}
