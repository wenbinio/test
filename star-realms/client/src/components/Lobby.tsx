import { useState } from "react";
import { useStore } from "../state/store";
import type { DifficultyMode } from "@star-realms/shared/types";

export function Lobby() {
  const createRoom = useStore((s) => s.createRoom);
  const joinRoom = useStore((s) => s.joinRoom);
  const session = useStore((s) => s.session);
  const resume = useStore((s) => s.resume);
  const disconnect = useStore((s) => s.disconnect);

  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [difficulty, setDifficulty] = useState<DifficultyMode>("standard");
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const submit = async (action: () => Promise<void>) => {
    setErr(null);
    setBusy(true);
    try {
      await action();
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="lobby">
      <div className="lobby-card">
        <h1>STAR REALMS · CO-OP</h1>
        <div className="subtitle">
          Private match for two captains against Hostile Worlds.
        </div>

        {session && (
          <div style={{
            background: "rgba(110,198,255,0.08)",
            border: "1px solid rgba(110,198,255,0.35)",
            borderRadius: 6,
            padding: 10,
            marginBottom: 14,
            fontSize: 12,
          }}>
            Previous session detected — room <strong>{session.roomId}</strong>.
            <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
              <button className="primary" onClick={() => resume(session)}>
                Reconnect
              </button>
              <button onClick={disconnect}>Forget</button>
            </div>
          </div>
        )}

        <div className="field">
          <label htmlFor="name">Your name</label>
          <input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={32}
            placeholder="Captain..."
            autoFocus
          />
        </div>

        <div className="field">
          <label htmlFor="diff">Boss difficulty</label>
          <select
            id="diff"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value as DifficultyMode)}
          >
            <option value="standard">Standard — Tier 1 only</option>
            <option value="hard">Hard — Tier 1 → 2</option>
            <option value="endless">Endless — Tier 1 → 2 → 3</option>
          </select>
        </div>

        <div className="actions">
          <button
            className="primary"
            disabled={busy || !name.trim()}
            onClick={() => submit(() => createRoom(name.trim(), difficulty))}
          >
            Create Room
          </button>
        </div>

        <div className="divider">— or join —</div>

        <div className="field">
          <label htmlFor="code">Room code</label>
          <input
            id="code"
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            maxLength={6}
            placeholder="A1B2C3"
            className="mono"
            style={{ textTransform: "uppercase" }}
          />
        </div>

        <div className="actions">
          <button
            disabled={busy || !name.trim() || code.length !== 6}
            onClick={() => submit(() => joinRoom(code, name.trim()))}
          >
            Join Room
          </button>
        </div>

        {err && (
          <div style={{ marginTop: 12, color: "var(--bad)", fontSize: 12 }}>
            {err}
          </div>
        )}
      </div>
    </div>
  );
}
