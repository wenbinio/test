import type { GameState, PlayerState } from "@star-realms/shared/types";
import { Card } from "./Card";
import { useStore } from "../state/store";

interface Props {
  state: GameState;
  me: PlayerState;
}

export function Hand({ state, me }: Props) {
  const send = useStore((s) => s.send);
  const isMyTurn = state.activePlayerId === me.id;

  return (
    <div className="hand-bar">
      <div className="controls">
        <div className="player-stats">
          <div className="stat authority">
            <span className="label">Authority</span>
            <span className="value">{me.authority}</span>
          </div>
          <div className="stat trade">
            <span className="label">Trade</span>
            <span className="value">{me.trade}</span>
          </div>
          <div className="stat combat">
            <span className="label">Combat</span>
            <span className="value">{me.combat}</span>
          </div>
        </div>
        <button
          className="primary"
          style={{ marginLeft: "auto" }}
          disabled={!isMyTurn}
          onClick={() => send({ kind: "endTurn" })}
        >
          End Turn
        </button>
      </div>
      <div className="row" style={{ justifyContent: "center" }}>
        {me.hand.length === 0 && (
          <div style={{ color: "var(--text-muted)", fontSize: 12, padding: "32px 0" }}>
            Empty hand — end your turn to draw.
          </div>
        )}
        {me.hand.map((c) => {
          const def = state.cardDefs[c.defId];
          if (!def) return null;
          return (
            <Card
              key={c.instanceId}
              def={def}
              instance={c}
              disabled={!isMyTurn}
              onClick={() => send({ kind: "play", instanceId: c.instanceId })}
            />
          );
        })}
      </div>
    </div>
  );
}
