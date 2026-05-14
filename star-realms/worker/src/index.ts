// Worker entry — routes HTTP requests to the right GameRoom Durable
// Object instance and handles WebSocket upgrade.

import { GameRoom } from "./room";
import { randomRoomId, verifyToken } from "./token";

export { GameRoom };

interface Env {
  ROOMS: DurableObjectNamespace;
  TOKEN_SECRET: string;
  ALLOWED_ORIGIN?: string;
  HISTORY?: D1Database;
}

export default {
  async fetch(req: Request, env: Env): Promise<Response> {
    const url = new URL(req.url);
    const origin = req.headers.get("origin");

    if (req.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders(env, origin) });
    }
    if (url.pathname === "/health") {
      return json({ ok: true }, 200, corsHeaders(env, origin));
    }

    // GET /history — recent finished games (read-only). Returns empty
    // array if no D1 binding is configured.
    if (req.method === "GET" && url.pathname === "/history") {
      if (!env.HISTORY) {
        return json({ games: [] }, 200, corsHeaders(env, origin));
      }
      const limit = Math.min(50, parseInt(url.searchParams.get("limit") ?? "20", 10) || 20);
      try {
        const r = await env.HISTORY.prepare(
          `SELECT id, room_id, difficulty, outcome, rounds, boss_tier, players_json, started_at, ended_at
             FROM game_history
             ORDER BY ended_at DESC
             LIMIT ?`,
        ).bind(limit).all<{
          id: string;
          room_id: string;
          difficulty: string;
          outcome: string;
          rounds: number;
          boss_tier: number;
          players_json: string;
          started_at: number;
          ended_at: number;
        }>();
        const games = (r.results ?? []).map((row) => ({
          id: row.id,
          roomId: row.room_id,
          difficulty: row.difficulty,
          outcome: row.outcome,
          rounds: row.rounds,
          bossTier: row.boss_tier,
          players: JSON.parse(row.players_json),
          startedAt: row.started_at,
          endedAt: row.ended_at,
        }));
        return json({ games }, 200, corsHeaders(env, origin));
      } catch (e) {
        return json({ error: e instanceof Error ? e.message : "history query failed" }, 500, corsHeaders(env, origin));
      }
    }

    // POST /rooms — create
    if (req.method === "POST" && url.pathname === "/rooms") {
      const body = (await req.json()) as { name: string; difficulty?: "standard" | "hard" | "endless" };
      if (!body?.name || body.name.length > 32)
        return json({ error: "Invalid name." }, 400, corsHeaders(env, origin));
      const roomId = randomRoomId();
      const id = env.ROOMS.idFromName(roomId);
      const stub = env.ROOMS.get(id);
      const r = await stub.fetch(new Request(`https://do/create`, {
        method: "POST",
        body: JSON.stringify({ ...body, roomId }),
      }));
      return withCors(r, env, origin);
    }

    // POST /rooms/:id/join
    let m = url.pathname.match(/^\/rooms\/([A-Z0-9]{6})\/join$/i);
    if (req.method === "POST" && m) {
      const roomId = m[1]!.toUpperCase();
      const stub = env.ROOMS.get(env.ROOMS.idFromName(roomId));
      const r = await stub.fetch(new Request(`https://do/join`, {
        method: "POST",
        body: await req.text(),
      }));
      return withCors(r, env, origin);
    }

    // GET /rooms/:id/ws — WebSocket upgrade
    m = url.pathname.match(/^\/rooms\/([A-Z0-9]{6})\/ws$/i);
    if (m) {
      if (req.headers.get("upgrade") !== "websocket")
        return new Response("Expected websocket", { status: 400 });
      const roomId = m[1]!.toUpperCase();
      const token = url.searchParams.get("t");
      if (!token) return new Response("Missing token", { status: 401 });
      const payload = await verifyToken(env.TOKEN_SECRET, token);
      if (!payload || payload.roomId !== roomId)
        return new Response("Invalid token", { status: 401 });
      const stub = env.ROOMS.get(env.ROOMS.idFromName(roomId));
      return stub.fetch(new Request(`https://do/ws?playerId=${payload.playerId}`, req));
    }

    return new Response("Not found", { status: 404, headers: corsHeaders(env, origin) });
  },
} satisfies ExportedHandler<Env>;

function corsHeaders(env: Env, origin: string | null): Record<string, string> {
  const allow = env.ALLOWED_ORIGIN || "*";
  const o =
    allow === "*"
      ? "*"
      : origin && allow.split(",").map((s) => s.trim()).includes(origin)
        ? origin
        : allow.split(",")[0]!;
  return {
    "access-control-allow-origin": o,
    "access-control-allow-methods": "GET,POST,OPTIONS",
    "access-control-allow-headers": "content-type",
    "access-control-max-age": "86400",
  };
}

function withCors(r: Response, env: Env, origin: string | null): Response {
  const headers = new Headers(r.headers);
  for (const [k, v] of Object.entries(corsHeaders(env, origin))) headers.set(k, v);
  return new Response(r.body, { status: r.status, headers });
}

function json(body: unknown, status: number, headers: Record<string, string>): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json", ...headers },
  });
}
