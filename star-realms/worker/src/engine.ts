// Authoritative game engine. Pure functions over GameState — no side
// effects, no storage. The Durable Object loads state, calls into here,
// and persists the result.

import {
  ALL_DEFS,
  BOSS_TIERS,
  CARD_DEFS_BY_ID,
  EXPLORER,
  STARTERS,
  THREAT_DECK,
  bossTiersForDifficulty,
  buildTradeDeck,
} from "@star-realms/shared/cards";
import type {
  AttackTarget,
  CardInstance,
  DifficultyMode,
  GameState,
  LogEntry,
  PlayerState,
} from "@star-realms/shared/types";

// ---------- RNG (seeded, deterministic per-room) ----------

function makeRng(seed: number) {
  // Mulberry32. Good enough for shuffles.
  let t = seed >>> 0;
  return () => {
    t = (t + 0x6d2b79f5) >>> 0;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffle<T>(arr: T[], rng: () => number): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [out[i], out[j]] = [out[j]!, out[i]!];
  }
  return out;
}

function newInstance(defId: string): CardInstance {
  return { instanceId: crypto.randomUUID(), defId };
}

// ---------- Setup ----------

export function createInitialState(args: {
  roomId: string;
  difficulty: DifficultyMode;
  players: { id: string; name: string }[];
  seed: number;
}): GameState {
  const { roomId, difficulty, players, seed } = args;
  const rng = makeRng(seed);

  const cardDefs = Object.fromEntries(ALL_DEFS.map((d) => [d.id, d]));

  const tradeDeckIds = shuffle(buildTradeDeck(), rng);
  const tradeRow = tradeDeckIds.splice(0, 5).map(newInstance);

  const playerStates: PlayerState[] = players.map((p, idx) => {
    const startDeckIds = [
      ...Array(8).fill("starter.scout"),
      ...Array(2).fill("starter.viper"),
    ];
    const shuffled = shuffle(startDeckIds, rng).map(newInstance);
    // First player draws 3 cards (standard 2-player rule), second draws 5.
    const handSize = idx === 0 ? 3 : 5;
    const hand = shuffled.splice(0, handSize);
    return {
      id: p.id,
      name: p.name,
      authority: 50,
      hand,
      deck: shuffled,
      discard: [],
      inPlay: [],
      bases: [],
      trade: 0,
      combat: 0,
      connected: true,
    };
  });

  const tiers = bossTiersForDifficulty(difficulty);
  const firstTier = BOSS_TIERS[tiers[0]!];

  return {
    roomId,
    difficulty,
    phase: "playing",
    round: 1,
    activePlayerId: playerStates[0]!.id,
    players: playerStates,
    boss: {
      name: firstTier.name,
      authority: firstTier.maxAuthority,
      maxAuthority: firstTier.maxAuthority,
      threats: [],
      nextThreatIn: firstTier.threatEveryNRounds,
      damagePerTurn: firstTier.damagePerTurn,
      tier: firstTier.tier,
    },
    shared: {
      tradeRow,
      tradeDeck: tradeDeckIds.length,
      explorerPile: 10,
      scrapHeap: [],
    },
    cardDefs,
    log: [
      logEntry("system", `Room ${roomId} started — difficulty: ${difficulty}.`),
    ],
  };
}

// ---------- Logging ----------

let logCounter = 0;
function logEntry(kind: LogEntry["kind"], text: string): LogEntry {
  return { id: `${Date.now()}-${logCounter++}`, ts: Date.now(), text, kind };
}

function pushLog(state: GameState, kind: LogEntry["kind"], text: string) {
  state.log.push(logEntry(kind, text));
  if (state.log.length > 200) state.log.splice(0, state.log.length - 200);
}

// ---------- Effects ----------
// Effect strings have the form "kind:arg" or just "kind". The engine
// dispatches via a small switch. Many effects are simple resource
// nudges; a few require deferred player choice (e.g. scrap) — those are
// no-ops in v1 and logged as TODO.

function applyEffect(
  state: GameState,
  player: PlayerState,
  effect: string,
  isAlly: boolean,
) {
  const [kind, rawArg] = effect.split(":");
  const arg = rawArg ? parseInt(rawArg, 10) : 0;
  switch (kind) {
    case "trade":
      player.trade += arg;
      break;
    case "combat":
      player.combat += arg;
      break;
    case "authority":
      player.authority += arg;
      break;
    case "draw":
      drawCards(player, arg, state);
      break;
    case "draw_if_bases": {
      const [, threshold, n] = effect.split(":");
      if (player.bases.length >= parseInt(threshold!, 10))
        drawCards(player, parseInt(n!, 10), state);
      break;
    }
    case "mitigate":
      // Reduce boss damage next round.
      state.boss.damagePerTurn = Math.max(0, state.boss.damagePerTurn - arg);
      pushLog(state, "play", `${player.name} mitigates ${arg} boss damage next round.`);
      break;
    case "destroy_threat":
      // Player will select a threat; for v1 auto-destroy the first.
      if (state.boss.threats.length > 0) {
        const t = state.boss.threats.shift()!;
        pushLog(state, "play", `${player.name} destroys ${state.cardDefs[t.defId]!.name}.`);
      }
      break;
    // Effects requiring player choice (scrap, blob world choice, etc.)
    // are TODO. They are intentionally no-ops for v1.0 — engine ships in
    // M3 and these resolve in M4.
    case "choose_trade_or_auth":
      player.trade += arg; // default to trade until UI choice ships
      break;
    case "blob_world_choice":
      player.combat += 5;
      break;
    case "wildcard_ally":
      // Handled in ally detection.
      break;
    default:
      // Unimplemented in v1.0 (M4 will cover): may_scrap_*, scrap_*,
      // free_ship_top, buy_to_top, draw_on_destroyed.
      pushLog(state, "info", `(TODO: effect "${kind}")`);
  }
  void isAlly;
}

function drawCards(player: PlayerState, n: number, state: GameState) {
  for (let i = 0; i < n; i++) {
    if (player.deck.length === 0) {
      if (player.discard.length === 0) return;
      const rng = makeRng(player.discard.length * 31 + state.round);
      player.deck = shuffle(player.discard, rng);
      player.discard = [];
    }
    const c = player.deck.shift();
    if (c) player.hand.push(c);
  }
}

// ---------- Player actions ----------

export function activePlayer(state: GameState): PlayerState | null {
  return state.players.find((p) => p.id === state.activePlayerId) ?? null;
}

export function playCard(state: GameState, playerId: string, instanceId: string) {
  if (state.activePlayerId !== playerId)
    throw new Error("Not your turn.");
  const player = state.players.find((p) => p.id === playerId);
  if (!player) throw new Error("Unknown player.");
  const idx = player.hand.findIndex((c) => c.instanceId === instanceId);
  if (idx === -1) throw new Error("Card not in hand.");
  const card = player.hand[idx]!;
  const def = state.cardDefs[card.defId];
  if (!def) throw new Error("Unknown card def.");

  player.hand.splice(idx, 1);
  if (def.type === "base" || def.type === "outpost") {
    player.bases.push(card);
  } else {
    player.inPlay.push(card);
  }

  // Primary abilities
  for (const ab of def.abilities.filter((a) => !a.ally && !a.scrap)) {
    applyEffect(state, player, ab.effect, false);
  }

  // Ally check: another in-play or base card of same faction (excluding self).
  const hasAlly =
    def.faction !== "neutral" &&
    [...player.inPlay, ...player.bases].some(
      (c) =>
        c.instanceId !== card.instanceId &&
        (state.cardDefs[c.defId]?.faction === def.faction ||
          // Mech World grants wildcard ally for its own turn.
          state.cardDefs[c.defId]?.id === "machine.mech_world"),
    );
  if (hasAlly && !card.allyUsed) {
    for (const ab of def.abilities.filter((a) => a.ally)) {
      applyEffect(state, player, ab.effect, true);
    }
    card.allyUsed = true;
  }

  pushLog(state, "play", `${player.name} plays ${def.name}.`);
}

export function buyCard(state: GameState, playerId: string, instanceId: string) {
  if (state.activePlayerId !== playerId)
    throw new Error("Not your turn.");
  const player = state.players.find((p) => p.id === playerId);
  if (!player) throw new Error("Unknown player.");

  // Explorer is special — instance id "explorer" requested by client.
  if (instanceId === "explorer") {
    if (state.shared.explorerPile <= 0) throw new Error("Explorer pile empty.");
    if (player.trade < EXPLORER.cost) throw new Error("Not enough trade.");
    player.trade -= EXPLORER.cost;
    state.shared.explorerPile -= 1;
    player.discard.push(newInstance(EXPLORER.id));
    pushLog(state, "buy", `${player.name} buys an Explorer.`);
    return;
  }

  const rowIdx = state.shared.tradeRow.findIndex((c) => c.instanceId === instanceId);
  if (rowIdx === -1) throw new Error("Card not in trade row.");
  const card = state.shared.tradeRow[rowIdx]!;
  const def = state.cardDefs[card.defId];
  if (!def) throw new Error("Unknown card def.");
  if (player.trade < def.cost) throw new Error("Not enough trade.");

  player.trade -= def.cost;
  state.shared.tradeRow.splice(rowIdx, 1);
  player.discard.push(card);

  // Refill the row from a fresh shuffle if needed (v1 uses the full pool
  // minus cards already on the table).
  refillTradeRow(state);

  pushLog(state, "buy", `${player.name} buys ${def.name}.`);
}

function refillTradeRow(state: GameState) {
  while (state.shared.tradeRow.length < 5 && state.shared.tradeDeck > 0) {
    // We don't track the actual hidden trade-deck contents post-setup;
    // for v1 we draw from the full pool minus on-table cards. M4 will
    // properly model the trade deck. Picking a deterministic random
    // unused def is good enough as a placeholder.
    const inUse = new Set<string>([
      ...state.shared.tradeRow.map((c) => c.defId),
      ...state.shared.scrapHeap.map((c) => c.defId),
    ]);
    const pool = ALL_DEFS.filter(
      (d) => d.type !== "threat" && d.id !== EXPLORER.id && !STARTERS.includes(d) && !inUse.has(d.id),
    );
    if (pool.length === 0) break;
    const pick = pool[Math.floor(Math.random() * pool.length)]!;
    state.shared.tradeRow.push(newInstance(pick.id));
    state.shared.tradeDeck -= 1;
  }
}

export function attack(state: GameState, playerId: string, target: AttackTarget) {
  if (state.activePlayerId !== playerId)
    throw new Error("Not your turn.");
  const player = state.players.find((p) => p.id === playerId);
  if (!player) throw new Error("Unknown player.");
  if (player.combat <= 0) throw new Error("No combat.");

  if (target.kind === "boss") {
    // Cannot attack boss while a shield threat is active.
    const shielded = state.boss.threats.some((t) =>
      state.cardDefs[t.defId]?.abilities.some((a) => a.effect === "shield_boss"),
    );
    if (shielded) throw new Error("Boss is shielded — destroy threats first.");
    const dmg = player.combat;
    state.boss.authority -= dmg;
    player.combat = 0;
    pushLog(state, "attack", `${player.name} hits the boss for ${dmg}.`);
    if (state.boss.authority <= 0) advanceBossTier(state);
    return;
  }

  // Threat target
  const idx = state.boss.threats.findIndex((t) => t.instanceId === target.instanceId);
  if (idx === -1) throw new Error("Threat not found.");
  const threat = state.boss.threats[idx]!;
  const def = state.cardDefs[threat.defId];
  if (!def) throw new Error("Unknown threat def.");
  const need = def.defense ?? 1;
  if (player.combat < need) throw new Error(`Need ${need} combat.`);
  player.combat -= need;
  state.boss.threats.splice(idx, 1);
  pushLog(state, "attack", `${player.name} destroys ${def.name}.`);
}

function advanceBossTier(state: GameState) {
  const tiers = bossTiersForDifficulty(state.difficulty);
  const currentIdx = tiers.indexOf(state.boss.tier);
  const next = tiers[currentIdx + 1];
  if (!next) {
    state.phase = "victory";
    pushLog(state, "system", "Victory! Hostile Worlds defeated.");
    return;
  }
  const cfg = BOSS_TIERS[next];
  state.boss.tier = cfg.tier;
  state.boss.name = cfg.name;
  state.boss.authority = cfg.maxAuthority;
  state.boss.maxAuthority = cfg.maxAuthority;
  state.boss.damagePerTurn = cfg.damagePerTurn;
  state.boss.nextThreatIn = cfg.threatEveryNRounds;
  state.boss.threats = [];
  pushLog(state, "boss", `Boss escalates to ${cfg.name}.`);
}

export function endTurn(state: GameState, playerId: string) {
  if (state.activePlayerId !== playerId)
    throw new Error("Not your turn.");
  const player = state.players.find((p) => p.id === playerId);
  if (!player) throw new Error("Unknown player.");

  // Discard hand + in-play (bases stay).
  player.discard.push(...player.hand, ...player.inPlay);
  player.hand = [];
  player.inPlay = [];
  player.trade = 0;
  player.combat = 0;
  for (const b of player.bases) {
    b.activated = false;
    b.allyUsed = false;
  }

  // Draw 5.
  drawCards(player, 5, state);

  // Pass turn.
  const idx = state.players.findIndex((p) => p.id === playerId);
  const nextIdx = (idx + 1) % state.players.length;
  state.activePlayerId = state.players[nextIdx]!.id;

  // If we wrapped around to player 0, the round ends — boss reacts.
  if (nextIdx === 0) {
    state.round += 1;
    bossReact(state);
  }
}

// ---------- Boss AI ----------

function bossReact(state: GameState) {
  // Spawn threat if due.
  state.boss.nextThreatIn -= 1;
  if (state.boss.nextThreatIn <= 0) {
    const pool = THREAT_DECK;
    const def = pool[Math.floor(Math.random() * pool.length)]!;
    state.boss.threats.push(newInstance(def.id));
    state.boss.nextThreatIn = BOSS_TIERS[state.boss.tier].threatEveryNRounds;
    pushLog(state, "boss", `Boss deploys ${def.name}.`);
  }

  // Damage the player with highest authority.
  const sorted = [...state.players].sort((a, b) => b.authority - a.authority);
  const targets = sorted.filter((p) => p.authority === sorted[0]!.authority);
  const dmg = state.boss.damagePerTurn;
  for (const p of targets) {
    p.authority -= dmg;
    pushLog(state, "boss", `Boss strikes ${p.name} for ${dmg}.`);
    if (p.authority <= 0) {
      state.phase = "defeat";
      pushLog(state, "system", `Defeat — ${p.name} has fallen.`);
    }
  }
}
