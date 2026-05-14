import { useEffect, useState } from "react";
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

  // Trigger a strike-shake when boss authority decreases.
  const [shake, setShake] = useState(false);
  const [prevAuth, setPrevAuth] = useState(state.boss.authority);
  useEffect(() => {
    if (state.boss.authority < prevAuth) {
      setShake(true);
      const t = setTimeout(() => setShake(false), 320);
      setPrevAuth(state.boss.authority);
      return () => clearTimeout(t);
    }
    if (state.boss.authority !== prevAuth) setPrevAuth(state.boss.authority);
    return undefined;
  }, [state.boss.authority, prevAuth]);

  return (
    <div
      className={`boss-panel ${shake ? "boss-strike" : ""}`}
      role="region"
      aria-label="Boss panel"
    >
      <div style={{ minWidth: 220 }}>
        <h2>{state.boss.name}</h2>
        <div style={{ fontSize: 11, color: "var(--text-muted)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
          Tier {state.boss.tier} · {state.boss.damagePerTurn} dmg/turn ·
          {" "}next threat in {state.boss.nextThreatIn}
        </div>
        <div
          style={{
            marginTop: 8,
            height: 8,
            width: 220,
            background: "rgba(0,0,0,0.4)",
            borderRadius: 4,
            overflow: "hidden",
            border: "1px solid rgba(192,132,252,0.35)",
          }}
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={state.boss.maxAuthority}
          aria-valuenow={state.boss.authority}
          aria-label="Boss authority"
        >
          <div style={{
            height: "100%",
            width: `${pct}%`,
            background: "linear-gradient(90deg, #c084fc, #ff5a5f)",
            transition: "width 320ms cubic-bezier(.2,.9,.2,1)",
          }}/>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 4 }}>
        <div className="stat" aria-live="polite">
          {state.boss.authority} / {state.boss.maxAuthority}
        </div>
        <button
          className="danger"
          disabled={!isMyTurn || combat <= 0}
          onClick={() => send({ kind: "attack", target: { kind: "boss" } })}
          aria-keyshortcuts="A"
          title="Attack boss (A)"
        >
          Attack Boss ({combat})
        </button>
      </div>

      <div className="threats" role="region" aria-label="Active threats">
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
              enterAnim
            />
          );
        })}
      </div>
    </div>
  );
}
