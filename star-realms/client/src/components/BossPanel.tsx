import type { GameState } from "@star-realms/shared/types";
import { Card } from "./Card";
import { useStore } from "../state/store";

interface Props {
  state: GameState;
  myId: string | null;
}

export function BossPanel({ state, myId }: Props) {
  const send = useStore((s) => s.send);
  const isMyTurn = state.activePlayerId === myId;
  const me = state.players.find((p) => p.id === myId);
  const combat = me?.combat ?? 0;
  const pct = Math.max(0, Math.round((state.boss.authority / state.boss.maxAuthority) * 100));

  return (
    <div className="boss-panel">
      <div style={{ minWidth: 220 }}>
        <h2>{state.boss.name}</h2>
        <div style={{ fontSize: 11, color: "var(--text-muted)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
          Tier {state.boss.tier} · {state.boss.damagePerTurn} dmg/turn ·
          {" "}next threat in {state.boss.nextThreatIn}
        </div>
        <div style={{
          marginTop: 8,
          height: 8,
          width: 220,
          background: "rgba(0,0,0,0.4)",
          borderRadius: 4,
          overflow: "hidden",
          border: "1px solid rgba(192,132,252,0.35)",
        }}>
          <div style={{
            height: "100%",
            width: `${pct}%`,
            background: "linear-gradient(90deg, #c084fc, #ff5a5f)",
            transition: "width 220ms ease-out",
          }}/>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 4 }}>
        <div className="stat">{state.boss.authority} / {state.boss.maxAuthority}</div>
        <button
          className="danger"
          disabled={!isMyTurn || combat <= 0}
          onClick={() => send({ kind: "attack", target: { kind: "boss" } })}
        >
          Attack Boss ({combat})
        </button>
      </div>

      <div className="threats">
        {state.boss.threats.map((t) => {
          const def = state.cardDefs[t.defId];
          if (!def) return null;
          return (
            <Card
              key={t.instanceId}
              def={def}
              instance={t}
              disabled={!isMyTurn || combat < (def.defense ?? 1)}
              onClick={() =>
                send({ kind: "attack", target: { kind: "threat", instanceId: t.instanceId } })
              }
            />
          );
        })}
      </div>
    </div>
  );
}
