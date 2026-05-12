import { useStore } from "../state/store";

interface Props {
  roomId: string;
}

export function WaitingRoom({ roomId }: Props) {
  const send = useStore((s) => s.send);
  const connected = useStore((s) => s.connected);
  const disconnect = useStore((s) => s.disconnect);

  const inviteUrl = `${location.origin}/?room=${roomId}`;

  return (
    <div className="lobby">
      <div className="lobby-card">
        <h1>WAITING ROOM</h1>
        <div className="subtitle">
          Share the code or link below with your partner.
        </div>

        <div className="field">
          <label>Room code</label>
          <div
            className="mono"
            style={{
              fontSize: 28,
              letterSpacing: "0.3em",
              padding: "12px 16px",
              border: "1px solid var(--border-strong)",
              borderRadius: 8,
              textAlign: "center",
              background: "rgba(110,198,255,0.06)",
            }}
          >
            {roomId}
          </div>
        </div>

        <div className="field">
          <label>Invite link</label>
          <div style={{ display: "flex", gap: 8 }}>
            <input readOnly value={inviteUrl} />
            <button onClick={() => navigator.clipboard?.writeText(inviteUrl)}>Copy</button>
          </div>
        </div>

        <div className="actions" style={{ flexDirection: "column", gap: 8 }}>
          <button
            className="primary"
            disabled={!connected}
            onClick={() => send({ kind: "startGame" })}
          >
            Start Game (needs 2 players)
          </button>
          <button onClick={disconnect}>Leave</button>
        </div>

        <div style={{ marginTop: 14, fontSize: 12, color: "var(--text-muted)" }}>
          {connected ? "Connected." : "Connecting…"}
        </div>
      </div>
    </div>
  );
}
