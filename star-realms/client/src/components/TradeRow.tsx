import type { GameState } from "@star-realms/shared/types";
import { Card, CardBack, Pile } from "./Card";
import { useStore } from "../state/store";
import { EXPLORER } from "@star-realms/shared/cards";

interface Props {
  state: GameState;
  myId: string | null;
}

export function TradeRow({ state, myId }: Props) {
  const send = useStore((s) => s.send);
  const me = state.players.find((p) => p.id === myId);
  const trade = me?.trade ?? 0;
  const isMyTurn = state.activePlayerId === myId;

  return (
    <div className="trade-row">
      <div className="label">Trade Row</div>
      <Pile label="Deck" count={state.shared.tradeDeck} />
      <CardBack label="EXPLORER" />
      <div className="row" style={{ flex: 1 }}>
        {state.shared.tradeRow.map((c) => {
          const def = state.cardDefs[c.defId];
          if (!def) return null;
          const affordable = trade >= def.cost && isMyTurn;
          return (
            <Card
              key={c.instanceId}
              def={def}
              instance={c}
              disabled={!affordable}
              onClick={() => send({ kind: "buy", instanceId: c.instanceId })}
            />
          );
        })}
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
        <Card
          def={EXPLORER}
          disabled={!isMyTurn || trade < EXPLORER.cost}
          onClick={() => send({ kind: "buy", instanceId: "explorer" })}
        />
        <span style={{ fontSize: 10, color: "var(--text-muted)" }}>
          Explorer · {state.shared.explorerPile} left
        </span>
      </div>
    </div>
  );
}
