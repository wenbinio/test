import { create } from "zustand";
import type {
  ClientFrame,
  GameState,
  ServerFrame,
} from "@star-realms/shared/types";
import { API_BASE, WS_BASE } from "../env";

interface Session {
  roomId: string;
  playerId: string;
  playerToken: string;
}

interface ChatMsg {
  from: string;
  text: string;
  ts: number;
}

interface Toast {
  id: number;
  level: "info" | "warn" | "error";
  text: string;
}

interface StoreState {
  session: Session | null;
  state: GameState | null;
  connected: boolean;
  chat: ChatMsg[];
  toasts: Toast[];
  ws: WebSocket | null;

  createRoom: (name: string, difficulty: "standard" | "hard" | "endless") => Promise<void>;
  joinRoom: (roomId: string, name: string) => Promise<void>;
  resume: (session: Session) => void;
  disconnect: () => void;
  send: (frame: ClientFrame) => void;
  dismissToast: (id: number) => void;
}

const SESSION_KEY = "star-realms.session";

function loadSession(): Session | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? (JSON.parse(raw) as Session) : null;
  } catch {
    return null;
  }
}

function saveSession(s: Session | null) {
  if (s) localStorage.setItem(SESSION_KEY, JSON.stringify(s));
  else localStorage.removeItem(SESSION_KEY);
}

let toastSeq = 1;

export const useStore = create<StoreState>((set, get) => ({
  session: loadSession(),
  state: null,
  connected: false,
  chat: [],
  toasts: [],
  ws: null,

  async createRoom(name, difficulty) {
    const r = await fetch(`${API_BASE}/rooms`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ name, difficulty }),
    });
    if (!r.ok) throw new Error((await r.json()).error || "Failed to create room.");
    const session = (await r.json()) as Session;
    saveSession(session);
    set({ session });
    connect(get, set, session);
  },

  async joinRoom(roomId, name) {
    const id = roomId.trim().toUpperCase();
    const r = await fetch(`${API_BASE}/rooms/${id}/join`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ name }),
    });
    if (!r.ok) throw new Error((await r.json()).error || "Failed to join room.");
    const session = (await r.json()) as Session;
    saveSession(session);
    set({ session });
    connect(get, set, session);
  },

  resume(session) {
    saveSession(session);
    set({ session });
    connect(get, set, session);
  },

  disconnect() {
    get().ws?.close();
    saveSession(null);
    set({ ws: null, session: null, state: null, connected: false, chat: [] });
  },

  send(frame) {
    const ws = get().ws;
    if (!ws || ws.readyState !== WebSocket.OPEN) {
      pushToast(set, "warn", "Not connected.");
      return;
    }
    ws.send(JSON.stringify(frame));
  },

  dismissToast(id) {
    set({ toasts: get().toasts.filter((t) => t.id !== id) });
  },
}));

function connect(
  get: () => StoreState,
  set: (partial: Partial<StoreState>) => void,
  session: Session,
) {
  get().ws?.close();
  const url = `${WS_BASE}/rooms/${session.roomId}/ws?t=${encodeURIComponent(session.playerToken)}`;
  const ws = new WebSocket(url);
  ws.addEventListener("open", () => set({ connected: true }));
  ws.addEventListener("close", () => set({ connected: false }));
  ws.addEventListener("error", () => pushToast(set, "error", "Connection error."));
  ws.addEventListener("message", (e) => {
    try {
      const frame = JSON.parse(e.data as string) as ServerFrame;
      switch (frame.kind) {
        case "state":
          set({ state: frame.state });
          break;
        case "chat":
          set({ chat: [...get().chat, { from: frame.from, text: frame.text, ts: frame.ts }] });
          break;
        case "toast":
          pushToast(set, frame.level, frame.text);
          break;
        case "pong":
          break;
      }
    } catch {
      /* ignore bad frames */
    }
  });
  set({ ws });
}

function pushToast(
  set: (partial: Partial<StoreState>) => void,
  level: Toast["level"],
  text: string,
) {
  const id = toastSeq++;
  // We don't have a getter here, so push using the function form.
  useStore.setState((s) => ({ toasts: [...s.toasts, { id, level, text }] }));
  setTimeout(() => {
    useStore.setState((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) }));
  }, 3500);
  void set;
}
