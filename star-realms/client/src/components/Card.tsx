import type { CardDef, CardInstance } from "@star-realms/shared/types";
import { FactionGlyph } from "./FactionGlyph";
import s from "../styles/card.module.css";

interface Props {
  def: CardDef;
  instance?: CardInstance;
  onClick?: () => void;
  disabled?: boolean;
}

export function Card({ def, instance, onClick, disabled }: Props) {
  const clickable = !!onClick && !disabled;
  const klass = [
    s.card,
    s[`faction-${def.faction}`],
    clickable ? s.clickable : "",
    disabled ? s.disabled : "",
    instance?.activated ? s.activated : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className={klass}
      onClick={clickable ? onClick : undefined}
      role={clickable ? "button" : undefined}
      tabIndex={clickable ? 0 : -1}
      onKeyDown={(e) => {
        if (clickable && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          onClick!();
        }
      }}
      title={def.name}
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
