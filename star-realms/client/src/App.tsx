import { useCallback, useEffect, useState } from "react";
import { useStore } from "./state/store";
import { Lobby } from "./components/Lobby";
import { WaitingRoom } from "./components/WaitingRoom";
import { GameBoard } from "./components/GameBoard";
import { Toasts } from "./components/Toasts";
import { ChoicePrompt } from "./components/ChoicePrompt";
import { CardInspector } from "./components/CardInspector";
import { HelpOverlay } from "./components/HelpOverlay";
import { isEnabled as isSoundOn, setEnabled as setSoundOn } from "./lib/sound";
import { useStateChangeFX } from "./lib/useStateChangeFX";

export function App() {
  const session = useStore((s) => s.session);
  const state = useStore((s) => s.state);
  const connected = useStore((s) => s.connected);
  const disconnect = useStore((s) => s.disconnect);
  const inspecting = useStore((s) => s.inspecting);
  const inspect = useStore((s) => s.inspect);
  const send = useStore((s) => s.send);

  const [helpOpen, setHelpOpen] = useState(false);
  const [soundOn, setSoundOnState] = useState(isSoundOn());
  const [turnBanner, setTurnBanner] = useState<string | null>(null);

  useStateChangeFX(state);

  // Auto-resume when we have a stored session but no live socket.
  useEffect(() => {
    if (session && !state) {
      useStore.getState().resume(session);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Show a banner when the active player changes — helpful for skim-reads.
  useEffect(() => {
    if (!state || !session) return;
    if (state.activePlayerId === session.playerId) setTurnBanner("YOUR TURN");
    else {
      const other = state.players.find((p) => p.id === state.activePlayerId);
      if (other) setTurnBanner(`${other.name.toUpperCase()}'S TURN`);
    }
    const t = setTimeout(() => setTurnBanner(null), 1800);
    return () => clearTimeout(t);
  }, [state?.activePlayerId, session?.playerId]); // eslint-disable-line react-hooks/exhaustive-deps

  const toggleSound = useCallback(() => {
    const next = !soundOn;
    setSoundOn(next);
    setSoundOnState(next);
  }, [soundOn]);

  // Global keyboard shortcuts.
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const tag = target?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || target?.isContentEditable) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;

      switch (e.key) {
        case "?":
        case "/":
          e.preventDefault();
          setHelpOpen((v) => !v);
          return;
        case "m":
        case "M":
          e.preventDefault();
          toggleSound();
          return;
      }

      if (!state || !session) return;
      const isMyTurn = state.activePlayerId === session.playerId;
      if (!isMyTurn || state.pendingChoice) return;
      const me = state.players.find((p) => p.id === session.playerId);
      if (!me) return;

      switch (e.key) {
        case "e":
        case "E":
          e.preventDefault();
          send({ kind: "endTurn" });
          break;
        case "a":
        case "A":
          if (me.combat > 0) {
            e.preventDefault();
            send({ kind: "attack", target: { kind: "boss" } });
          }
          break;
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [state, session, send, toggleSound]);

  const overlays = (
    <>
      {state?.pendingChoice && <ChoicePrompt state={state} myId={session?.playerId ?? null} />}
      <CardInspector def={inspecting} onClose={() => inspect(null)} />
      <HelpOverlay open={helpOpen} onClose={() => setHelpOpen(false)} />
      <Toasts />
      {turnBanner && <div className="turn-banner" key={turnBanner + state?.round}>{turnBanner}</div>}
    </>
  );

  const topbar = (
    <Topbar
      connected={connected}
      roomId={session?.roomId ?? null}
      onLeave={session ? disconnect : null}
      soundOn={soundOn}
      onToggleSound={toggleSound}
      onHelp={() => setHelpOpen(true)}
    />
  );

  if (!session) {
    return (
      <div className="app-shell">
        <a href="#main" className="skip-link">Skip to content</a>
        {topbar}
        <main id="main"><Lobby /></main>
        {overlays}
      </div>
    );
  }

  if (!state) {
    return (
      <div className="app-shell">
        <a href="#main" className="skip-link">Skip to content</a>
        {topbar}
        <main id="main"><WaitingRoom roomId={session.roomId} /></main>
        {overlays}
      </div>
    );
  }

  const showEnd = state.phase === "victory" || state.phase === "defeat";

  return (
    <div className="app-shell">
      <a href="#main" className="skip-link">Skip to content</a>
      {topbar}
      <main id="main" style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <GameBoard state={state} myId={session.playerId} />
      </main>
      {showEnd && <EndScreen phase={state.phase as "victory" | "defeat"} onLeave={disconnect} />}
      {overlays}
    </div>
  );
}

function Topbar({
  connected,
  roomId,
  onLeave,
  soundOn,
  onToggleSound,
  onHelp,
}: {
  connected: boolean;
  roomId: string | null;
  onLeave: (() => void) | null;
  soundOn: boolean;
  onToggleSound: () => void;
  onHelp: () => void;
}) {
  return (
    <div className="topbar" role="banner">
      <span className="brand" aria-label="Star Realms Co-op">STAR REALMS · CO-OP</span>
      {roomId && (
        <span className="room-code" aria-label={`Room code ${roomId}`}>
          ROOM · {roomId}
        </span>
      )}
      <span className="conn" aria-live="polite">
        <span className={`dot ${connected ? "on" : ""}`} aria-hidden />
        {connected ? "Online" : "Offline"}
      </span>
      <button
        className="icon-btn"
        onClick={onToggleSound}
        aria-label={soundOn ? "Mute sound" : "Enable sound"}
        title={soundOn ? "Mute (M)" : "Unmute (M)"}
      >
        {soundOn ? (
          <svg viewBox="0 0 16 16" aria-hidden>
            <path d="M3 5 H6 L10 2 V14 L6 11 H3 Z" fill="currentColor" />
            <path d="M12 5 Q14 8 12 11" stroke="currentColor" fill="none" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        ) : (
          <svg viewBox="0 0 16 16" aria-hidden>
            <path d="M3 5 H6 L10 2 V14 L6 11 H3 Z" fill="currentColor" />
            <path d="M12 5 L15 8 M15 5 L12 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        )}
      </button>
      <button
        className="icon-btn"
        onClick={onHelp}
        aria-label="Open keyboard shortcuts help"
        title="Help (?)"
      >
        <svg viewBox="0 0 16 16" aria-hidden>
          <circle cx="8" cy="8" r="6.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <text x="8" y="11.5" fontSize="9" textAnchor="middle" fill="currentColor" fontFamily="Orbitron">?</text>
        </svg>
      </button>
      {onLeave && (
        <button onClick={onLeave} style={{ marginLeft: 4 }}>
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
    <div className={`endscreen ${phase}`} role="dialog" aria-label={phase === "victory" ? "Victory" : "Defeat"}>
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
