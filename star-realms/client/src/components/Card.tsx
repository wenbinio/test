import type { CardDef, CardInstance } from "@star-realms/shared/types";
import { FactionGlyph } from "./FactionGlyph";
import { useStore } from "../state/store";
import s from "../styles/card.module.css";

interface Props {
  def: CardDef;
  instance?: CardInstance;
  onClick?: () => void;
  disabled?: boolean;
  enterAnim?: boolean;
}

export function Card({ def, instance, onClick, disabled, enterAnim }: Props) {
  const inspect = useStore((st) => st.inspect);
  const clickable = !!onClick && !disabled;
  const klass = [
    s.card,
    s[`faction-${def.faction}`],
    clickable ? s.clickable : "",
    disabled ? s.disabled : "",
    instance?.activated ? s.activated : "",
    enterAnim ? "card-enter" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className={klass}
      onClick={clickable ? onClick : undefined}
      onContextMenu={(e) => {
        e.preventDefault();
        inspect(def);
      }}
      role={clickable ? "button" : "group"}
      aria-label={`${def.name}, ${def.faction} ${def.type}${def.cost ? `, cost ${def.cost}` : ""}${def.defense != null ? `, defense ${def.defense}` : ""}`}
      tabIndex={clickable ? 0 : -1}
      onKeyDown={(e) => {
        if (clickable && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          onClick!();
        }
        if (e.key === "i" || e.key === "I") {
          e.preventDefault();
          inspect(def);
        }
      }}
      title={`${def.name} — right-click to inspect`}
    >
      <div className={s.top}>
        <div className={s.name}>{def.name}</div>
        {def.cost > 0 && <div className={s.cost}>{def.cost}</div>}
      </div>
      <div className={s.glyph}>
        <FactionGlyph faction={def.faction} />
      </div>
      <div className={s.text}>
        {def.abilities.slice(0, 4).map((a, i) => (
          <div
            key={i}
            className={`${s.ability} ${a.ally ? s.ally : ""} ${a.scrap ? s.scrap : ""}`}
          >
            {a.text}
          </div>
        ))}
      </div>
      <div className={s.footer}>
        <span>{def.type}</span>
        {def.defense != null && <span className={s.defense}>{def.defense}</span>}
      </div>
    </div>
  );
}

export function CardBack({ label }: { label?: string }) {
  return <div className={s.cardback}>{label ?? "STAR REALMS"}</div>;
}

export function Pile({ label, count }: { label: string; count: number }) {
  return (
    <div className={s.pile}>
      <div className={s.count}>{count}</div>
      <div className={s.label}>{label}</div>
    </div>
  );
}
