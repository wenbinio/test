// Shared types between Star Realms client and the Cloudflare Worker
// (GameRoom Durable Object). Anything in this file must be safe to
// run in both browser and Workers/Deno-style runtimes (no Node APIs).

export type Faction = "neutral" | "trade" | "blob" | "machine" | "star";

export type CardType = "ship" | "base" | "outpost" | "threat";

export type DifficultyMode = "standard" | "hard" | "endless";

export interface CardAbility {
  // Plain-English description shown on the card (paraphrased — not
  // copied from the printed game).
  text: string;
  // Identifier the engine dispatches on.
  effect: string;
  // Whether the ability is gated by an ally (same-faction in play).
  ally?: boolean;
  // Whether the ability triggers when the card is scrapped.
  scrap?: boolean;
}

export interface CardDef {
  id: string;
  name: string;
  faction: Faction;
  type: CardType;
  cost: number;
  // For bases/outposts.
  defense?: number;
  outpost?: boolean;
  abilities: CardAbility[];
  flavor?: string;
}

export interface CardInstance {
  instanceId: string;
  defId: string;
  // Whether the card's primary abilities resolved this turn.
  activated?: boolean;
  // Whether its ally ability resolved this turn.
  allyUsed?: boolean;
}

export type Zone =
  | "deck"
  | "hand"
  | "inPlay"
  | "discard"
  | "bases"
  | "scrapHeap"
  | "tradeRow"
  | "tradeDeck"
  | "explorerPile";

export interface PlayerState {
  id: string;
  name: string;
  authority: number;
  hand: CardInstance[];
  deck: CardInstance[];
  discard: CardInstance[];
  inPlay: CardInstance[];
  bases: CardInstance[];
  trade: number;
  combat: number;
  connected: boolean;
  // A turn-scoped flag set by Freighter's ally ability. Next ship the
  // player buys goes on top of their deck instead of into discard.
  nextBuyToTop?: boolean;
}

// A PendingChoice pauses turn progression until the player selects an
// option. Only one choice can be active at a time; the engine queues
// the rest on `player.choiceQueue` (private to the engine — not
// surfaced to other player).
export type PendingChoice =
  | {
      kind: "scrap_hand_or_discard";
      playerId: string;
      prompt: string;
      optional: boolean;
      sourceDefId: string;
      options: { instanceId: string; zone: "hand" | "discard" }[];
    }
  | {
      kind: "trade_or_auth";
      playerId: string;
      prompt: string;
      amount: number;
      sourceDefId: string;
    }
  | {
      kind: "blob_world";
      playerId: string;
      prompt: string;
      sourceDefId: string;
      blobsPlayed: number;
    }
  | {
      kind: "free_ship";
      playerId: string;
      prompt: string;
      sourceDefId: string;
      options: { instanceId: string }[];
    }
  | {
      kind: "scrap_trade_row";
      playerId: string;
      prompt: string;
      sourceDefId: string;
      options: { instanceId: string }[];
    }
  | {
      kind: "destroy_threat";
      playerId: string;
      prompt: string;
      sourceDefId: string;
      options: { instanceId: string }[];
    };

export interface BossState {
  name: string;
  authority: number;
  maxAuthority: number;
  threats: CardInstance[];
  nextThreatIn: number;
  damagePerTurn: number;
  tier: 1 | 2 | 3;
}

export interface SharedState {
  tradeRow: CardInstance[];
  tradeDeck: number;
  explorerPile: number;
  scrapHeap: CardInstance[];
}

export type Phase = "lobby" | "playing" | "victory" | "defeat";

export interface GameState {
  roomId: string;
  difficulty: DifficultyMode;
  phase: Phase;
  round: number;
  activePlayerId: string | null;
  players: PlayerState[];
  boss: BossState;
  shared: SharedState;
  cardDefs: Record<string, CardDef>;
  log: LogEntry[];
  // The currently-blocking pending choice, if any. While set, no other
  // intent is accepted from the active player except `resolveChoice`.
  pendingChoice?: PendingChoice | null;
}

export interface LogEntry {
  id: string;
  ts: number;
  text: string;
  kind: "info" | "play" | "buy" | "attack" | "boss" | "system";
}

// ===== Wire protocol =====
// HTTP request/response bodies.

export interface CreateRoomRequest {
  name: string;
  difficulty?: DifficultyMode;
}

export interface CreateRoomResponse {
  roomId: string;
  playerId: string;
  playerToken: string; // HMAC-signed JWT-style token
}

export interface JoinRoomRequest {
  name: string;
}

export interface JoinRoomResponse {
  roomId: string;
  playerId: string;
  playerToken: string;
}

export interface ErrorResponse {
  error: string;
}

// WebSocket frames.

export type ClientFrame =
  | { kind: "startGame" }
  | { kind: "play"; instanceId: string }
  | { kind: "buy"; instanceId: string }
  | { kind: "activateBase"; instanceId: string }
  | { kind: "scrapExplorer"; instanceId: string } // scrap an Explorer from in-play for +2 combat
  | { kind: "attack"; target: AttackTarget }
  | { kind: "endTurn" }
  | { kind: "resolveChoice"; payload: ResolveChoicePayload }
  | { kind: "chat"; text: string }
  | { kind: "ping" };

export type ResolveChoicePayload =
  | { kind: "scrap_hand_or_discard"; instanceId: string | null } // null = skip (only when optional)
  | { kind: "trade_or_auth"; pick: "trade" | "auth" }
  | { kind: "blob_world"; pick: "five_combat" | "per_blob" }
  | { kind: "free_ship"; instanceId: string }
  | { kind: "scrap_trade_row"; instanceId: string }
  | { kind: "destroy_threat"; instanceId: string };

export type AttackTarget =
  | { kind: "boss" }
  | { kind: "threat"; instanceId: string };

export type ServerFrame =
  | { kind: "state"; state: GameState }
  | { kind: "chat"; from: string; text: string; ts: number }
  | { kind: "toast"; level: "info" | "warn" | "error"; text: string }
  | { kind: "pong" };
