import type { GameState, PlayerState } from "@star-realms/shared/types";
import { Card, CardBack, Pile } from "./Card";
import { useStore } from "../state/store";

interface SelfProps {
  state: GameState;
  me: PlayerState;
}

export function SelfArea({ state, me }: SelfProps) {
  const send = useStore((s) => s.send);
  const isMyTurn = state.activePlayerId === me.id;

  return (
    <div className="self">
      <h3>YOU · {me.name} {isMyTurn && <span style={{color: "var(--good)"}}>· active</span>}</h3>
      <div className="row" style={{ alignItems: "flex-start" }}>
        <Pile label="Deck" count={me.deck.length} />
        <Pile label="Discard" count={me.discard.length} />
        {me.bases.length > 0 && (
          <div>
            <div style={{ fontSize: 10, color: "var(--text-muted)", marginBottom: 4 }}>
              BASES <span style={{ opacity: 0.6 }}>· click to activate</span>
            </div>
            <div className="row">
              {me.bases.map((b) => {
                const def = state.cardDefs[b.defId];
                if (!def) return null;
                const usable = isMyTurn && !b.activated;
                return (
                  <Card
                    key={b.instanceId}
                    def={def}
                    instance={b}
                    disabled={!usable}
                    onClick={() => send({ kind: "activateBase", instanceId: b.instanceId })}
                  />
                );
              })}
            </div>
          </div>
        )}
        {me.inPlay.length > 0 && (
          <div>
            <div style={{ fontSize: 10, color: "var(--text-muted)", marginBottom: 4 }}>IN PLAY</div>
            <div className="row">
              {me.inPlay.map((c) => {
                const def = state.cardDefs[c.defId];
                if (!def) return null;
                return <Card key={c.instanceId} def={def} instance={c} />;
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

interface PartnerProps {
  state: GameState;
  partner: PlayerState;
}

export function PartnerArea({ state, partner }: PartnerProps) {
  const isTurn = state.activePlayerId === partner.id;
  return (
    <div className="partner">
      <h3>
        PARTNER · {partner.name}
        {isTurn && <span style={{color: "var(--good)"}}> · their turn</span>}
        {!partner.connected && <span style={{color: "var(--warn)"}}> · offline</span>}
      </h3>
      <div className="player-stats" style={{ marginBottom: 8 }}>
        <div className="stat authority">
          <span className="label">Authority</span>
          <span className="value">{partner.authority}</span>
        </div>
        <div className="stat trade">
          <span className="label">Trade</span>
          <span className="value">{partner.trade}</span>
        </div>
        <div className="stat combat">
          <span className="label">Combat</span>
          <span className="value">{partner.combat}</span>
        </div>
      </div>
      <div className="row" style={{ alignItems: "flex-start" }}>
        <div>
          <div style={{ fontSize: 10, color: "var(--text-muted)", marginBottom: 4 }}>HAND</div>
          <div className="row">
            {partner.hand.map((c) => <CardBack key={c.instanceId} />)}
          </div>
        </div>
        <Pile label="Deck" count={partner.deck.length} />
        <Pile label="Discard" count={partner.discard.length} />
        {partner.bases.length > 0 && (
          <div>
            <div style={{ fontSize: 10, color: "var(--text-muted)", marginBottom: 4 }}>BASES</div>
            <div className="row">
              {partner.bases.map((b) => {
                const def = state.cardDefs[b.defId];
                if (!def) return null;
                return <Card key={b.instanceId} def={def} instance={b} />;
              })}
            </div>
          </div>
        )}
        {partner.inPlay.length > 0 && (
          <div>
            <div style={{ fontSize: 10, color: "var(--text-muted)", marginBottom: 4 }}>IN PLAY</div>
            <div className="row">
              {partner.inPlay.map((c) => {
                const def = state.cardDefs[c.defId];
                if (!def) return null;
                return <Card key={c.instanceId} def={def} instance={c} />;
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
