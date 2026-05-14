// GameRoom Durable Object — one instance per active room.
// Holds authoritative GameState, accepts up to 2 WebSocket connections,
// processes intents serially, broadcasts state to both clients.

import type {
  ClientFrame,
  GameState,
  ServerFrame,
} from "@star-realms/shared/types";
import {
  activateBase,
  attack,
  buyCard,
  createInitialState,
  endTurn,
  playCard,
  resolveChoice,
} from "./engine";
import { randomPlayerId, signToken } from "./token";

export interface RoomMeta {
  id: string;
  createdAt: number;
  lastActivity: number;
  players: {
    id: string;
    name: string;
    connected: boolean;
  }[];
  difficulty: "standard" | "hard" | "endless";
  historyWritten?: boolean;
}

interface Env {
  TOKEN_SECRET: string;
  ALLOWED_ORIGIN?: string;
  HISTORY?: D1Database;
}

// Idle-room purge threshold. After this much time without activity, the
// DO wipes its own storage on alarm wake.
const IDLE_PURGE_MS = 24 * 60 * 60 * 1000; // 24h

export class GameRoom implements DurableObject {
  private sockets = new Map<string, WebSocket>(); // playerId -> socket
  private state: GameState | null = null;
  private meta: RoomMeta | null = null;
  private loaded = false;

  constructor(
    private readonly ctx: DurableObjectState,
    private readonly env: Env,
  ) {}

  // ---------- lifecycle ----------

  private async ensureLoaded() {
    if (this.loaded) return;
    const [meta, state] = await Promise.all([
      this.ctx.storage.get<RoomMeta>("meta"),
      this.ctx.storage.get<GameState>("state"),
    ]);
    this.meta = meta ?? null;
    this.state = state ?? null;
    this.loaded = true;

    // Reattach hibernated WebSockets after eviction.
    for (const ws of this.ctx.getWebSockets()) {
      const tag = (ws.deserializeAttachment?.() as { playerId?: string } | undefined)?.playerId;
      if (tag) this.sockets.set(tag, ws);
    }
  }

  private async persist() {
    if (this.meta) {
      this.meta.lastActivity = Date.now();
      await this.ctx.storage.put("meta", this.meta);
    }
    if (this.state) await this.ctx.storage.put("state", this.state);
    // Schedule (or extend) the idle-purge alarm.
    await this.ctx.storage.setAlarm(Date.now() + IDLE_PURGE_MS);
    // Best-effort history write if the game just ended.
    await this.writeHistoryIfFinished();
  }

  // Cloudflare invokes this when the alarm fires.
  async alarm() {
    await this.ensureLoaded();
    if (!this.meta) return;
    const idleFor = Date.now() - this.meta.lastActivity;
    if (idleFor < IDLE_PURGE_MS) {
      // Activity happened between scheduling and firing — reschedule.
      await this.ctx.storage.setAlarm(this.meta.lastActivity + IDLE_PURGE_MS);
      return;
    }
    // Close any lingering sockets, then wipe.
    for (const ws of this.sockets.values()) {
      try { ws.close(1001, "Room purged after 24h idle"); } catch { /* ignore */ }
    }
    this.sockets.clear();
    await this.ctx.storage.deleteAll();
    this.meta = null;
    this.state = null;
  }

  // Best-effort: write the finished game to D1 if a binding is present.
  // Failures are logged and swallowed — they must not break gameplay.
  private async writeHistoryIfFinished() {
    if (!this.env.HISTORY || !this.state || !this.meta) return;
    if (this.state.phase !== "victory" && this.state.phase !== "defeat") return;
    if (this.meta.historyWritten) return;
    try {
      const id = `${this.meta.id}-${this.meta.createdAt}`;
      const players = this.state.players.map((p) => ({
        name: p.name,
        authority: p.authority,
        cardsBought: p.deck.length + p.discard.length + p.hand.length + p.inPlay.length + p.bases.length - 10,
      }));
      await this.env.HISTORY.prepare(
        `INSERT OR REPLACE INTO game_history
         (id, room_id, difficulty, outcome, rounds, boss_tier, players_json, log_json, started_at, ended_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      )
        .bind(
          id,
          this.meta.id,
          this.state.difficulty,
          this.state.phase,
          this.state.round,
          this.state.boss.tier,
          JSON.stringify(players),
          JSON.stringify(this.state.log.slice(-50)),
          this.meta.createdAt,
          Date.now(),
        )
        .run();
      this.meta.historyWritten = true;
      await this.ctx.storage.put("meta", this.meta);
    } catch (e) {
      console.error("history write failed", e);
    }
  }

  // ---------- HTTP entry ----------

  async fetch(req: Request): Promise<Response> {
    await this.ensureLoaded();
    const url = new URL(req.url);
    const action = url.pathname.split("/").pop();

    try {
      if (action === "create") return await this.handleCreate(req);
      if (action === "join")   return await this.handleJoin(req);
      if (action === "ws")     return await this.handleWsUpgrade(req);
      if (action === "purge")  return await this.handlePurge();
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Unknown error";
      return json({ error: msg }, 400);
    }
    return new Response("Not found", { status: 404 });
  }

  private async handleCreate(req: Request): Promise<Response> {
    if (this.meta) return json({ error: "Room already exists." }, 409);
    const body = (await req.json()) as { name: string; difficulty?: RoomMeta["difficulty"]; roomId: string };
    const id = body.roomId;
    const playerId = randomPlayerId();
    this.meta = {
      id,
      createdAt: Date.now(),
      lastActivity: Date.now(),
      difficulty: body.difficulty ?? "standard",
      players: [{ id: playerId, name: body.name, connected: false }],
    };
    await this.persist();
    const playerToken = await signToken(this.env.TOKEN_SECRET, {
      roomId: id,
      playerId,
      iat: Date.now(),
    });
    return json({ roomId: id, playerId, playerToken });
  }

  private async handleJoin(req: Request): Promise<Response> {
    if (!this.meta) return json({ error: "Room not found." }, 404);
    if (this.meta.players.length >= 2) return json({ error: "Room full." }, 409);
    const body = (await req.json()) as { name: string };
    const playerId = randomPlayerId();
    this.meta.players.push({ id: playerId, name: body.name, connected: false });
    this.meta.lastActivity = Date.now();
    await this.persist();
    const playerToken = await signToken(this.env.TOKEN_SECRET, {
      roomId: this.meta.id,
      playerId,
      iat: Date.now(),
    });
    return json({ roomId: this.meta.id, playerId, playerToken });
  }

  private async handleWsUpgrade(req: Request): Promise<Response> {
    if (!this.meta) return new Response("Room not found", { status: 404 });
    const url = new URL(req.url);
    const playerId = url.searchParams.get("playerId");
    if (!playerId) return new Response("Missing playerId", { status: 400 });
    if (!this.meta.players.some((p) => p.id === playerId))
      return new Response("Not a member", { status: 403 });
    // Token verification happens at /api/rooms/:id/ws (caller side).

    const pair = new WebSocketPair();
    const client = pair[0];
    const server = pair[1];
    this.ctx.acceptWebSocket(server, [playerId]);
    server.serializeAttachment?.({ playerId });
    this.sockets.set(playerId, server);

    const me = this.meta.players.find((p) => p.id === playerId)!;
    me.connected = true;
    this.meta.lastActivity = Date.now();
    if (this.state) {
      const ps = this.state.players.find((p) => p.id === playerId);
      if (ps) ps.connected = true;
    }
    await this.persist();
    if (this.state) this.broadcastState();

    return new Response(null, { status: 101, webSocket: client });
  }

  private async handlePurge(): Promise<Response> {
    await this.ctx.storage.deleteAll();
    return json({ ok: true });
  }

  // ---------- WebSocket handlers (Hibernation API) ----------

  async webSocketMessage(ws: WebSocket, data: ArrayBuffer | string) {
    await this.ensureLoaded();
    const playerId = this.lookupSocket(ws);
    if (!playerId) return;
    if (!this.meta) return;

    let frame: ClientFrame;
    try {
      frame = JSON.parse(typeof data === "string" ? data : new TextDecoder().decode(data));
    } catch {
      this.send(ws, { kind: "toast", level: "error", text: "Bad frame." });
      return;
    }

    this.meta.lastActivity = Date.now();

    try {
      switch (frame.kind) {
        case "ping":
          this.send(ws, { kind: "pong" });
          return;
        case "chat":
          this.broadcast({
            kind: "chat",
            from: this.playerName(playerId),
            text: frame.text.slice(0, 500),
            ts: Date.now(),
          });
          return;
        case "startGame":
          if (this.state) throw new Error("Game already started.");
          if (this.meta.players.length < 2) throw new Error("Need 2 players to start.");
          this.state = createInitialState({
            roomId: this.meta.id,
            difficulty: this.meta.difficulty,
            players: this.meta.players.map((p) => ({ id: p.id, name: p.name })),
            seed: Math.floor(Math.random() * 0x7fffffff),
          });
          break;
        case "play":
          if (!this.state) throw new Error("No game in progress.");
          playCard(this.state, playerId, frame.instanceId);
          break;
        case "buy":
          if (!this.state) throw new Error("No game in progress.");
          buyCard(this.state, playerId, frame.instanceId);
          break;
        case "attack":
          if (!this.state) throw new Error("No game in progress.");
          attack(this.state, playerId, frame.target);
          break;
        case "endTurn":
          if (!this.state) throw new Error("No game in progress.");
          endTurn(this.state, playerId);
          break;
        case "activateBase":
          if (!this.state) throw new Error("No game in progress.");
          activateBase(this.state, playerId, frame.instanceId);
          break;
        case "resolveChoice":
          if (!this.state) throw new Error("No game in progress.");
          resolveChoice(this.state, playerId, frame.payload);
          break;
        case "scrapExplorer":
          // Optional polish — current engine treats Explorer scrap as
          // "play card, gain +2 combat then scrap" via its abilities,
          // resolved client-side as a play action. Acknowledged but no-op.
          this.send(ws, { kind: "toast", level: "info", text: "Use Play to trigger Explorer." });
          return;
      }
      await this.persist();
      if (this.state) this.broadcastState();
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Action failed.";
      this.send(ws, { kind: "toast", level: "warn", text: msg });
    }
  }

  async webSocketClose(ws: WebSocket) {
    await this.ensureLoaded();
    const playerId = this.lookupSocket(ws);
    if (!playerId) return;
    this.sockets.delete(playerId);
    const m = this.meta?.players.find((p) => p.id === playerId);
    if (m) m.connected = false;
    if (this.state) {
      const ps = this.state.players.find((p) => p.id === playerId);
      if (ps) ps.connected = false;
    }
    await this.persist();
    if (this.state) this.broadcastState();
  }

  async webSocketError(ws: WebSocket) {
    await this.webSocketClose(ws);
  }

  // ---------- helpers ----------

  private lookupSocket(ws: WebSocket): string | null {
    for (const [id, s] of this.sockets) if (s === ws) return id;
    const tag = (ws.deserializeAttachment?.() as { playerId?: string } | undefined)?.playerId;
    return tag ?? null;
  }

  private playerName(playerId: string): string {
    return this.meta?.players.find((p) => p.id === playerId)?.name ?? "?";
  }

  private send(ws: WebSocket, frame: ServerFrame) {
    try {
      ws.send(JSON.stringify(frame));
    } catch {
      /* ignore */
    }
  }

  private broadcast(frame: ServerFrame) {
    for (const ws of this.sockets.values()) this.send(ws, frame);
  }

  private broadcastState() {
    if (!this.state) return;
    this.broadcast({ kind: "state", state: this.state });
  }
}

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}
