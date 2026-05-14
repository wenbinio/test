// Authoritative game engine. Pure functions over GameState — no side
// effects, no storage. The Durable Object loads state, calls into here,
// and persists the result.

import {
  ALL_DEFS,
  BOSS_TIERS,
  EXPLORER,
  STARTERS,
  THREAT_DECK,
  TRADE_DECK,
  bossTiersForDifficulty,
  buildTradeDeck,
} from "@star-realms/shared/cards";
import type {
  AttackTarget,
  CardDef,
  CardInstance,
  DifficultyMode,
  GameState,
  LogEntry,
  PendingChoice,
  PlayerState,
  ResolveChoicePayload,
} from "@star-realms/shared/types";

// ---------- RNG (seeded, deterministic per-room) ----------

function makeRng(seed: number) {
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
    log: [logEntry("system", `Room ${roomId} started — difficulty: ${difficulty}.`)],
    pendingChoice: null,
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

// ---------- Validation guard ----------

function requireNoPendingChoice(state: GameState) {
  if (state.pendingChoice)
    throw new Error("Resolve the current choice first.");
}

// ---------- Effects ----------

function applyEffect(
  state: GameState,
  player: PlayerState,
  effect: string,
  source: CardDef,
) {
  const [kind, rawArg, raw2] = effect.split(":");
  const arg = rawArg ? parseInt(rawArg, 10) : 0;

  switch (kind) {
    case "trade":
      player.trade += arg;
      return;
    case "combat":
      player.combat += arg;
      return;
    case "authority":
      player.authority += arg;
      return;
    case "draw":
      drawCards(player, arg, state);
      return;
    case "draw_if_bases": {
      const threshold = arg;
      const n = parseInt(raw2 ?? "1", 10);
      if (player.bases.length >= threshold) drawCards(player, n, state);
      return;
    }
    case "mitigate":
      state.boss.damagePerTurn = Math.max(0, state.boss.damagePerTurn - arg);
      pushLog(state, "play", `${player.name} mitigates ${arg} boss damage.`);
      return;
    case "destroy_threat": {
      if (state.boss.threats.length === 0) {
        pushLog(state, "info", `(No threats to destroy.)`);
        return;
      }
      if (state.boss.threats.length === 1) {
        const t = state.boss.threats.shift()!;
        const def = state.cardDefs[t.defId];
        pushLog(state, "play", `${player.name} destroys ${def?.name ?? "?"}.`);
        return;
      }
      queueChoice(state, player, {
        kind: "destroy_threat",
        playerId: player.id,
        prompt: `Destroy a threat (${source.name}).`,
        sourceDefId: source.id,
        options: state.boss.threats.map((t) => ({ instanceId: t.instanceId })),
      });
      return;
    }
    case "choose_trade_or_auth":
      queueChoice(state, player, {
        kind: "trade_or_auth",
        playerId: player.id,
        prompt: `${source.name}: gain Trade or Authority?`,
        amount: arg,
        sourceDefId: source.id,
      });
      return;
    case "blob_world_choice": {
      const blobsPlayed = [...player.inPlay, ...player.bases].filter((c) => {
        const d = state.cardDefs[c.defId];
        return d && d.faction === "blob";
      }).length;
      queueChoice(state, player, {
        kind: "blob_world",
        playerId: player.id,
        prompt: `Blob World: +5 Combat, or +1 per Blob you've played (${blobsPlayed})?`,
        sourceDefId: source.id,
        blobsPlayed,
      });
      return;
    }
    case "wildcard_ally":
      // Handled in ally detection on play.
      return;
    case "may_scrap_hand_or_discard":
    case "scrap_hand_or_discard": {
      const options = [
        ...player.hand.map((c) => ({ instanceId: c.instanceId, zone: "hand" as const })),
        ...player.discard.map((c) => ({ instanceId: c.instanceId, zone: "discard" as const })),
      ];
      if (options.length === 0) return;
      queueChoice(state, player, {
        kind: "scrap_hand_or_discard",
        playerId: player.id,
        prompt: `${source.name}: scrap a card from your hand or discard.`,
        optional: kind === "may_scrap_hand_or_discard",
        sourceDefId: source.id,
        options,
      });
      return;
    }
    case "free_ship_top": {
      const options = state.shared.tradeRow
        .filter((c) => state.cardDefs[c.defId]?.type === "ship")
        .map((c) => ({ instanceId: c.instanceId }));
      if (options.length === 0) return;
      queueChoice(state, player, {
        kind: "free_ship",
        playerId: player.id,
        prompt: `${source.name}: take a free ship to the top of your deck.`,
        sourceDefId: source.id,
        options,
      });
      return;
    }
    case "buy_to_top":
      player.nextBuyToTop = true;
      pushLog(state, "play", `${player.name}: next ship bought goes on top of deck.`);
      return;
    case "scrap_trade_row": {
      const options = state.shared.tradeRow.map((c) => ({ instanceId: c.instanceId }));
      if (options.length === 0) return;
      queueChoice(state, player, {
        kind: "scrap_trade_row",
        playerId: player.id,
        prompt: `${source.name}: scrap a card from the trade row.`,
        sourceDefId: source.id,
        options,
      });
      return;
    }
    case "draw_on_destroyed":
      // Resolved when the base is destroyed — M4 has no boss-attacks-base,
      // so this is a no-op until friendly-fire mechanics exist.
      return;
    case "boss_spawn_faster":
    case "boss_damage":
    case "minus_draw":
    case "minus_trade":
    case "shield_boss":
      // Passive threat effects. Read at the right time, not applied here.
      return;
    default:
      pushLog(state, "info", `(TODO: effect "${kind}")`);
  }
}

// pendingChoice is a single slot in v1. If a card has multiple
// choice-triggering abilities, the second will overwrite the first —
// acceptable since no v1 card chains more than one choice.
function queueChoice(_state: GameState, _player: PlayerState, c: PendingChoice) {
  _state.pendingChoice = c;
  pushLog(_state, "info", c.prompt);
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

export function playCard(state: GameState, playerId: string, instanceId: string) {
  requireNoPendingChoice(state);
  if (state.activePlayerId !== playerId) throw new Error("Not your turn.");
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

  for (const ab of def.abilities.filter((a) => !a.ally && !a.scrap)) {
    applyEffect(state, player, ab.effect, def);
  }

  const hasAlly =
    def.faction !== "neutral" &&
    [...player.inPlay, ...player.bases].some((c) => {
      if (c.instanceId === card.instanceId) return false;
      const d = state.cardDefs[c.defId];
      if (!d) return false;
      return d.faction === def.faction || d.id === "machine.mech_world";
    });

  if (hasAlly && !card.allyUsed) {
    for (const ab of def.abilities.filter((a) => a.ally)) {
      applyEffect(state, player, ab.effect, def);
    }
    card.allyUsed = true;
  }
  // Newly played card may unlock ally for an already-in-play same-faction
  // card that hadn't yet seen an ally.
  if (def.faction !== "neutral") {
    for (const c of [...player.inPlay, ...player.bases]) {
      if (c.instanceId === card.instanceId) continue;
      if (c.allyUsed) continue;
      const d = state.cardDefs[c.defId];
      if (!d) continue;
      if (d.faction !== def.faction && def.id !== "machine.mech_world") continue;
      for (const ab of d.abilities.filter((a) => a.ally)) {
        applyEffect(state, player, ab.effect, d);
      }
      c.allyUsed = true;
    }
  }

  card.activated = true;
  pushLog(state, "play", `${player.name} plays ${def.name}.`);
}

export function activateBase(state: GameState, playerId: string, instanceId: string) {
  requireNoPendingChoice(state);
  if (state.activePlayerId !== playerId) throw new Error("Not your turn.");
  const player = state.players.find((p) => p.id === playerId);
  if (!player) throw new Error("Unknown player.");
  const base = player.bases.find((b) => b.instanceId === instanceId);
  if (!base) throw new Error("Base not in play.");
  if (base.activated) throw new Error("Base already activated this turn.");
  const def = state.cardDefs[base.defId];
  if (!def) throw new Error("Unknown card def.");

  for (const ab of def.abilities.filter((a) => !a.ally && !a.scrap)) {
    applyEffect(state, player, ab.effect, def);
  }
  base.activated = true;

  const hasAlly = [...player.inPlay, ...player.bases].some((c) => {
    if (c.instanceId === base.instanceId) return false;
    const d = state.cardDefs[c.defId];
    return d?.faction === def.faction || d?.id === "machine.mech_world";
  });
  if (hasAlly && !base.allyUsed) {
    for (const ab of def.abilities.filter((a) => a.ally)) {
      applyEffect(state, player, ab.effect, def);
    }
    base.allyUsed = true;
  }

  pushLog(state, "play", `${player.name} activates ${def.name}.`);
}

export function buyCard(state: GameState, playerId: string, instanceId: string) {
  requireNoPendingChoice(state);
  if (state.activePlayerId !== playerId) throw new Error("Not your turn.");
  const player = state.players.find((p) => p.id === playerId);
  if (!player) throw new Error("Unknown player.");

  if (instanceId === "explorer") {
    if (state.shared.explorerPile <= 0) throw new Error("Explorer pile empty.");
    if (player.trade < EXPLORER.cost) throw new Error("Not enough trade.");
    player.trade -= EXPLORER.cost;
    state.shared.explorerPile -= 1;
    placeBoughtCard(player, newInstance(EXPLORER.id));
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
  placeBoughtCard(player, card);
  refillTradeRow(state);

  pushLog(state, "buy", `${player.name} buys ${def.name}.`);
}

function placeBoughtCard(player: PlayerState, c: CardInstance) {
  if (player.nextBuyToTop) {
    player.deck.unshift(c);
    player.nextBuyToTop = false;
  } else {
    player.discard.push(c);
  }
}

function refillTradeRow(state: GameState) {
  while (state.shared.tradeRow.length < 5 && state.shared.tradeDeck > 0) {
    const inUse = new Set<string>([
      ...state.shared.tradeRow.map((c) => c.defId),
      ...state.shared.scrapHeap.map((c) => c.defId),
    ]);
    const pool = ALL_DEFS.filter(
      (d) =>
        d.type !== "threat" &&
        d.id !== EXPLORER.id &&
        !STARTERS.includes(d) &&
        TRADE_DECK.some((t) => t.def.id === d.id) &&
        !inUse.has(d.id),
    );
    if (pool.length === 0) break;
    const pick = pool[Math.floor(Math.random() * pool.length)]!;
    state.shared.tradeRow.push(newInstance(pick.id));
    state.shared.tradeDeck -= 1;
  }
}

export function attack(state: GameState, playerId: string, target: AttackTarget) {
  requireNoPendingChoice(state);
  if (state.activePlayerId !== playerId) throw new Error("Not your turn.");
  const player = state.players.find((p) => p.id === playerId);
  if (!player) throw new Error("Unknown player.");
  if (player.combat <= 0) throw new Error("No combat.");

  if (target.kind === "boss") {
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
  requireNoPendingChoice(state);
  if (state.activePlayerId !== playerId) throw new Error("Not your turn.");
  const player = state.players.find((p) => p.id === playerId);
  if (!player) throw new Error("Unknown player.");

  player.discard.push(...player.hand, ...player.inPlay);
  player.hand = [];
  player.inPlay = [];
  player.trade = 0;
  player.combat = 0;
  player.nextBuyToTop = false;
  for (const b of player.bases) {
    b.activated = false;
    b.allyUsed = false;
  }

  // Apply per-turn "minus_draw" threat penalty if active.
  const minusDraw = state.boss.threats.reduce((acc, t) => {
    const d = state.cardDefs[t.defId];
    const ab = d?.abilities.find((a) => a.effect.startsWith("minus_draw:"));
    if (!ab) return acc;
    return acc + parseInt(ab.effect.split(":")[1] ?? "0", 10);
  }, 0);
  drawCards(player, Math.max(0, 5 - minusDraw), state);

  const idx = state.players.findIndex((p) => p.id === playerId);
  const nextIdx = (idx + 1) % state.players.length;
  state.activePlayerId = state.players[nextIdx]!.id;

  if (nextIdx === 0) {
    state.round += 1;
    bossReact(state);
  }
}

// ---------- Pending-choice resolution ----------

export function resolveChoice(
  state: GameState,
  playerId: string,
  payload: ResolveChoicePayload,
) {
  if (!state.pendingChoice) throw new Error("No pending choice.");
  const choice = state.pendingChoice;
  if (choice.playerId !== playerId) throw new Error("Not your choice.");
  const player = state.players.find((p) => p.id === playerId);
  if (!player) throw new Error("Unknown player.");
  if (choice.kind !== payload.kind) throw new Error("Choice kind mismatch.");

  switch (payload.kind) {
    case "scrap_hand_or_discard": {
      const c = choice.kind === "scrap_hand_or_discard" ? choice : null;
      if (!c) throw new Error("Bad choice.");
      if (payload.instanceId == null) {
        if (!c.optional) throw new Error("Must scrap a card.");
        pushLog(state, "play", `${player.name} skips scrap.`);
        break;
      }
      const fromHand = player.hand.findIndex((x) => x.instanceId === payload.instanceId);
      if (fromHand !== -1) {
        const [removed] = player.hand.splice(fromHand, 1);
        state.shared.scrapHeap.push(removed!);
        pushLog(state, "play", `${player.name} scraps ${state.cardDefs[removed!.defId]?.name}.`);
      } else {
        const fromDisc = player.discard.findIndex((x) => x.instanceId === payload.instanceId);
        if (fromDisc === -1) throw new Error("Card not in hand or discard.");
        const [removed] = player.discard.splice(fromDisc, 1);
        state.shared.scrapHeap.push(removed!);
        pushLog(state, "play", `${player.name} scraps ${state.cardDefs[removed!.defId]?.name}.`);
      }
      break;
    }
    case "trade_or_auth": {
      const c = choice.kind === "trade_or_auth" ? choice : null;
      if (!c) throw new Error("Bad choice.");
      if (payload.pick === "trade") player.trade += c.amount;
      else player.authority += c.amount;
      pushLog(state, "play", `${player.name} gains ${c.amount} ${payload.pick === "trade" ? "Trade" : "Authority"}.`);
      break;
    }
    case "blob_world": {
      const c = choice.kind === "blob_world" ? choice : null;
      if (!c) throw new Error("Bad choice.");
      if (payload.pick === "five_combat") player.combat += 5;
      else player.combat += c.blobsPlayed;
      pushLog(state, "play", `${player.name} channels Blob World.`);
      break;
    }
    case "free_ship": {
      const c = choice.kind === "free_ship" ? choice : null;
      if (!c) throw new Error("Bad choice.");
      const idx = state.shared.tradeRow.findIndex((x) => x.instanceId === payload.instanceId);
      if (idx === -1) throw new Error("Card not in trade row.");
      const [taken] = state.shared.tradeRow.splice(idx, 1);
      player.deck.unshift(taken!);
      refillTradeRow(state);
      pushLog(state, "play", `${player.name} grabs ${state.cardDefs[taken!.defId]?.name} to deck top.`);
      break;
    }
    case "scrap_trade_row": {
      const idx = state.shared.tradeRow.findIndex((x) => x.instanceId === payload.instanceId);
      if (idx === -1) throw new Error("Card not in trade row.");
      const [taken] = state.shared.tradeRow.splice(idx, 1);
      state.shared.scrapHeap.push(taken!);
      refillTradeRow(state);
      pushLog(state, "play", `${player.name} scraps ${state.cardDefs[taken!.defId]?.name} from the row.`);
      break;
    }
    case "destroy_threat": {
      const idx = state.boss.threats.findIndex((x) => x.instanceId === payload.instanceId);
      if (idx === -1) throw new Error("Threat not found.");
      const [removed] = state.boss.threats.splice(idx, 1);
      pushLog(state, "play", `${player.name} destroys ${state.cardDefs[removed!.defId]?.name}.`);
      break;
    }
  }

  state.pendingChoice = null;
}

// ---------- Boss AI ----------

function bossReact(state: GameState) {
  state.boss.nextThreatIn -= 1;
  if (state.boss.nextThreatIn <= 0) {
    const pool = THREAT_DECK;
    const def = pool[Math.floor(Math.random() * pool.length)]!;
    state.boss.threats.push(newInstance(def.id));
    state.boss.nextThreatIn = BOSS_TIERS[state.boss.tier].threatEveryNRounds;
    pushLog(state, "boss", `Boss deploys ${def.name}.`);
  }

  // Sum any extra boss damage from threat passives.
  const extra = state.boss.threats.reduce((acc, t) => {
    const d = state.cardDefs[t.defId];
    const ab = d?.abilities.find((a) => a.effect.startsWith("boss_damage:"));
    return ab ? acc + parseInt(ab.effect.split(":")[1] ?? "0", 10) : acc;
  }, 0);
  const dmg = state.boss.damagePerTurn + extra;

  const sorted = [...state.players].sort((a, b) => b.authority - a.authority);
  const top = sorted[0]!.authority;
  const targets = sorted.filter((p) => p.authority === top);
  for (const p of targets) {
    p.authority -= dmg;
    pushLog(state, "boss", `Boss strikes ${p.name} for ${dmg}.`);
    if (p.authority <= 0) {
      state.phase = "defeat";
      pushLog(state, "system", `Defeat — ${p.name} has fallen.`);
    }
  }
}
