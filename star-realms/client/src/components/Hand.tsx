import type { GameState, PlayerState } from "@star-realms/shared/types";
import { Card } from "./Card";
import { useStore } from "../state/store";
import { usePulseOnChange } from "../lib/usePulseOnChange";

interface Props {
  state: GameState;
  me: PlayerState;
}

export function Hand({ state, me }: Props) {
  const send = useStore((s) => s.send);
  const isMyTurn = state.activePlayerId === me.id;

  const authPulse = usePulseOnChange(me.authority);
  const tradePulse = usePulseOnChange(me.trade);
  const combatPulse = usePulseOnChange(me.combat);

  return (
    <div className="hand-bar" aria-label="Your hand and controls">
      <div className="controls">
        <div className="player-stats" role="status" aria-live="polite">
          <div className="stat authority">
            <span className="label">Authority</span>
            <span className={`value ${authPulse}`} aria-label={`${me.authority} authority`}>{me.authority}</span>
          </div>
          <div className="stat trade">
            <span className="label">Trade</span>
            <span className={`value ${tradePulse}`} aria-label={`${me.trade} trade`}>{me.trade}</span>
          </div>
          <div className="stat combat">
            <span className="label">Combat</span>
            <span className={`value ${combatPulse}`} aria-label={`${me.combat} combat`}>{me.combat}</span>
          </div>
        </div>
        <button
          className="primary"
          style={{ marginLeft: "auto" }}
          disabled={!isMyTurn}
          onClick={() => send({ kind: "endTurn" })}
          aria-keyshortcuts="E"
          title="End turn (E)"
        >
          End Turn
        </button>
      </div>
      <div
        className="row"
        style={{ justifyContent: "center" }}
        role="region"
        aria-label="Your hand"
      >
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
              enterAnim
            />
          );
        })}
      </div>
    </div>
  );
}
