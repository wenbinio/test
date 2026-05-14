import type { GameState, PendingChoice } from "@star-realms/shared/types";
import { useStore } from "../state/store";
import { Card } from "./Card";

interface Props {
  state: GameState;
  myId: string | null;
}

export function ChoicePrompt({ state, myId }: Props) {
  const send = useStore((s) => s.send);
  const c = state.pendingChoice;
  if (!c) return null;
  const isMine = c.playerId === myId;
  const source = state.cardDefs[c.sourceDefId];

  return (
    <div className="endscreen" style={{ background: "rgba(5,6,13,0.7)" }}>
      <div
        className="modal"
        style={{
          maxWidth: 720,
          textAlign: "left",
          padding: "20px 24px",
        }}
      >
        <h2 style={{ fontSize: 16, marginBottom: 4 }}>
          {isMine ? "CHOOSE" : "PARTNER IS DECIDING"}
        </h2>
        <div style={{ color: "var(--text-dim)", fontSize: 13, marginBottom: 16 }}>
          {c.prompt}
          {source && (
            <span style={{ color: "var(--text-muted)" }}> · {source.name}</span>
          )}
        </div>

        {!isMine && (
          <div style={{ color: "var(--text-muted)", fontSize: 12 }}>
            Waiting for them to choose…
          </div>
        )}

        {isMine && c.kind === "trade_or_auth" && (
          <div style={{ display: "flex", gap: 12 }}>
            <button
              className="primary"
              onClick={() => send({ kind: "resolveChoice", payload: { kind: "trade_or_auth", pick: "trade" } })}
            >
              +{c.amount} Trade
            </button>
            <button
              className="primary"
              onClick={() => send({ kind: "resolveChoice", payload: { kind: "trade_or_auth", pick: "auth" } })}
            >
              +{c.amount} Authority
            </button>
          </div>
        )}

        {isMine && c.kind === "blob_world" && (
          <div style={{ display: "flex", gap: 12 }}>
            <button
              className="primary"
              onClick={() => send({ kind: "resolveChoice", payload: { kind: "blob_world", pick: "five_combat" } })}
            >
              +5 Combat
            </button>
            <button
              className="primary"
              onClick={() => send({ kind: "resolveChoice", payload: { kind: "blob_world", pick: "per_blob" } })}
            >
              +{c.blobsPlayed} Combat (per Blob)
            </button>
          </div>
        )}

        {isMine && c.kind === "scrap_hand_or_discard" && (
          <ScrapPicker
            state={state}
            options={c.options}
            optional={c.optional}
            onPick={(id) =>
              send({ kind: "resolveChoice", payload: { kind: "scrap_hand_or_discard", instanceId: id } })
            }
          />
        )}

        {isMine && (c.kind === "free_ship" || c.kind === "scrap_trade_row") && (
          <TradeRowPicker
            state={state}
            options={c.options}
            onPick={(id) =>
              send({
                kind: "resolveChoice",
                payload: c.kind === "free_ship"
                  ? { kind: "free_ship", instanceId: id }
                  : { kind: "scrap_trade_row", instanceId: id },
              })
            }
          />
        )}

        {isMine && c.kind === "destroy_threat" && (
          <TradeRowPicker
            state={state}
            options={c.options.map((o) => ({ instanceId: o.instanceId }))}
            sourceList={state.boss.threats}
            onPick={(id) =>
              send({ kind: "resolveChoice", payload: { kind: "destroy_threat", instanceId: id } })
            }
          />
        )}
      </div>
    </div>
  );
}

function ScrapPicker({
  state,
  options,
  optional,
  onPick,
}: {
  state: GameState;
  options: { instanceId: string; zone: "hand" | "discard" }[];
  optional: boolean;
  onPick: (id: string | null) => void;
}) {
  // Resolve options into instance + def by looking through current player.
  const me = state.players.find((p) => p.id === state.pendingChoice?.playerId);
  const find = (id: string) =>
    me?.hand.find((c) => c.instanceId === id) || me?.discard.find((c) => c.instanceId === id);
  return (
    <div>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", maxHeight: 360, overflowY: "auto" }}>
        {options.map((o) => {
          const inst = find(o.instanceId);
          if (!inst) return null;
          const def = state.cardDefs[inst.defId];
          if (!def) return null;
          return (
            <div key={o.instanceId} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
              <Card def={def} instance={inst} onClick={() => onPick(o.instanceId)} />
              <span style={{ fontSize: 10, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.12em" }}>
                {o.zone}
              </span>
            </div>
          );
        })}
      </div>
      {optional && (
        <div style={{ marginTop: 12 }}>
          <button onClick={() => onPick(null)}>Skip</button>
        </div>
      )}
    </div>
  );
}

function TradeRowPicker({
  state,
  options,
  sourceList,
  onPick,
}: {
  state: GameState;
  options: { instanceId: string }[];
  sourceList?: GameState["boss"]["threats"];
  onPick: (id: string) => void;
}) {
  const lookup = (id: string) =>
    sourceList?.find((c) => c.instanceId === id) ||
    state.shared.tradeRow.find((c) => c.instanceId === id);
  return (
    <div style={{ display: "flex", gap: 10, flexWrap: "wrap", maxHeight: 360, overflowY: "auto" }}>
      {options.map((o) => {
        const inst = lookup(o.instanceId);
        if (!inst) return null;
        const def = state.cardDefs[inst.defId];
        if (!def) return null;
        return <Card key={o.instanceId} def={def} instance={inst} onClick={() => onPick(o.instanceId)} />;
      })}
    </div>
  );
}
