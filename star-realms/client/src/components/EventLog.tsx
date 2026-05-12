import { useEffect, useRef, useState } from "react";
import type { GameState } from "@star-realms/shared/types";
import { useStore } from "../state/store";

export function EventLog({ state }: { state: GameState }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    ref.current?.scrollTo({ top: ref.current.scrollHeight });
  }, [state.log.length]);

  return (
    <div className="panel" style={{ flex: 1, minHeight: 0 }}>
      <h3>EVENT LOG</h3>
      <div className="log-list" ref={ref}>
        {state.log.map((e) => (
          <div key={e.id} className={`entry ${e.kind}`}>{e.text}</div>
        ))}
      </div>
    </div>
  );
}

export function ChatPanel() {
  const chat = useStore((s) => s.chat);
  const send = useStore((s) => s.send);
  const [text, setText] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref.current?.scrollTo({ top: ref.current.scrollHeight });
  }, [chat.length]);

  const submit = () => {
    const t = text.trim();
    if (!t) return;
    send({ kind: "chat", text: t });
    setText("");
  };

  return (
    <div className="panel" style={{ flex: 1, minHeight: 0 }}>
      <h3>CHAT</h3>
      <div className="chat-list" ref={ref}>
        {chat.length === 0 && (
          <div style={{ color: "var(--text-muted)" }}>No messages yet.</div>
        )}
        {chat.map((m, i) => (
          <div key={i}>
            <span style={{ color: "var(--f-trade)" }}>{m.from}:</span> {m.text}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && submit()}
          placeholder="Type to your partner…"
          maxLength={500}
        />
        <button onClick={submit}>Send</button>
      </div>
    </div>
  );
}
