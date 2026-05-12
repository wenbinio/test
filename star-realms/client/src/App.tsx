import { useEffect } from "react";
import { useStore } from "./state/store";
import { Lobby } from "./components/Lobby";
import { WaitingRoom } from "./components/WaitingRoom";
import { GameBoard } from "./components/GameBoard";
import { Toasts } from "./components/Toasts";

export function App() {
  const session = useStore((s) => s.session);
  const state = useStore((s) => s.state);
  const connected = useStore((s) => s.connected);
  const disconnect = useStore((s) => s.disconnect);

  // Auto-resume when we have a stored session but no live socket.
  useEffect(() => {
    if (session && !state) {
      // Refire WS connect through resume() — the store handles dedup.
      useStore.getState().resume(session);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Pre-fill room code from URL ?room=...
  useEffect(() => {
    const u = new URL(location.href);
    const room = u.searchParams.get("room");
    if (room && !session) {
      // The Lobby reads its own state; we just leave the URL hint and
      // hope the user enters their name. (Could pre-populate via store.)
      void room;
    }
  }, [session]);

  if (!session) {
    return (
      <div className="app-shell">
        <Topbar connected={false} roomId={null} onLeave={null} />
        <Lobby />
        <Toasts />
      </div>
    );
  }

  if (!state) {
    return (
      <div className="app-shell">
        <Topbar connected={connected} roomId={session.roomId} onLeave={disconnect} />
        <WaitingRoom roomId={session.roomId} />
        <Toasts />
      </div>
    );
  }

  if (state.phase === "victory" || state.phase === "defeat") {
    return (
      <div className="app-shell">
        <Topbar connected={connected} roomId={session.roomId} onLeave={disconnect} />
        <GameBoard state={state} myId={session.playerId} />
        <EndScreen phase={state.phase} onLeave={disconnect} />
        <Toasts />
      </div>
    );
  }

  return (
    <div className="app-shell">
      <Topbar connected={connected} roomId={session.roomId} onLeave={disconnect} />
      <GameBoard state={state} myId={session.playerId} />
      <Toasts />
    </div>
  );
}

function Topbar({
  connected,
  roomId,
  onLeave,
}: {
  connected: boolean;
  roomId: string | null;
  onLeave: (() => void) | null;
}) {
  return (
    <div className="topbar">
      <span className="brand">STAR REALMS · CO-OP</span>
      {roomId && <span className="room-code">ROOM · {roomId}</span>}
      <span className="conn">
        <span className={`dot ${connected ? "on" : ""}`} />
        {connected ? "Online" : "Offline"}
      </span>
      {onLeave && (
        <button onClick={onLeave} style={{ marginLeft: 12 }}>
          Leave
        </button>
      )}
    </div>
  );
}

function EndScreen({
  phase,
  onLeave,
}: {
  phase: "victory" | "defeat";
  onLeave: () => void;
}) {
  return (
    <div className={`endscreen ${phase}`}>
      <div className="modal">
        <h1>{phase === "victory" ? "VICTORY" : "DEFEAT"}</h1>
        <p style={{ color: "var(--text-dim)", marginBottom: 16 }}>
          {phase === "victory"
            ? "Hostile Worlds has fallen. Well flown, captain."
            : "Your fleet is lost. The frontier remembers."}
        </p>
        <button className="primary" onClick={onLeave}>
          Return to Lobby
        </button>
      </div>
    </div>
  );
}
