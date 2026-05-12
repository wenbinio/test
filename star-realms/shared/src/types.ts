// Shared types between Star Realms client and co-op server.

export type Faction = "neutral" | "trade" | "blob" | "machine" | "star";

export type CardType = "ship" | "base" | "outpost" | "threat";

export interface CardAbility {
  // Plain-English description shown on the card.
  text: string;
  // Identifier the engine can dispatch on. Engine resolution lives server-side.
  effect: string;
  // Whether the ability is gated by an ally (same-faction in play).
  ally?: boolean;
  // Whether the ability triggers when the card is scrapped from in-play / discard.
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
  // Whether the card has had its primary abilities played this turn.
  activated?: boolean;
  // Whether its ally ability has resolved this turn.
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
}

export interface BossState {
  // Co-op opponent ("Hostile Worlds"-style boss).
  name: string;
  authority: number;
  maxAuthority: number;
  threats: CardInstance[]; // Active threats in play
  nextThreatIn: number;    // Turns until next threat spawns
  damagePerTurn: number;   // Combat damage the boss deals each end-of-round
  tier: number;            // Escalates over time
}

export interface SharedState {
  tradeRow: CardInstance[];
  tradeDeck: number;          // Count only (hidden info).
  explorerPile: number;
  scrapHeap: CardInstance[];
}

export type Phase = "lobby" | "playing" | "victory" | "defeat";

export interface GameState {
  roomId: string;
  phase: Phase;
  round: number;
  activePlayerId: string | null;
  players: PlayerState[];
  boss: BossState;
  shared: SharedState;
  // Card definitions snapshotted into state so the client never needs to fetch separately.
  cardDefs: Record<string, CardDef>;
  log: LogEntry[];
}

export interface LogEntry {
  id: string;
  ts: number;
  text: string;
  kind: "info" | "play" | "buy" | "attack" | "boss" | "system";
}

// ===== Socket protocol =====

export interface ClientToServerEvents {
  "lobby:create": (payload: { name: string }, ack: (res: AckRoom) => void) => void;
  "lobby:join":   (payload: { name: string; roomId: string }, ack: (res: AckRoom) => void) => void;
  "lobby:start":  (payload: { roomId: string }, ack: (res: Ack) => void) => void;
  "game:play":    (payload: { roomId: string; instanceId: string }, ack: (res: Ack) => void) => void;
  "game:buy":     (payload: { roomId: string; instanceId: string }, ack: (res: Ack) => void) => void;
  "game:attackBoss": (payload: { roomId: string; amount: number }, ack: (res: Ack) => void) => void;
  "game:attackThreat": (payload: { roomId: string; instanceId: string }, ack: (res: Ack) => void) => void;
  "game:endTurn": (payload: { roomId: string }, ack: (res: Ack) => void) => void;
  "game:chat":    (payload: { roomId: string; text: string }) => void;
}

export interface ServerToClientEvents {
  "state": (state: GameState) => void;
  "toast": (msg: { kind: "info" | "warn" | "error"; text: string }) => void;
  "chat":  (msg: { from: string; text: string; ts: number }) => void;
}

export type Ack = { ok: true } | { ok: false; error: string };
export type AckRoom = { ok: true; roomId: string; playerId: string } | { ok: false; error: string };
