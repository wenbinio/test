// Paraphrased v1 card definitions for Star Realms co-op rebuild.
// All names and text are original re-wordings; no printed card text is
// reused verbatim. Used by both client (for rendering) and worker (for
// engine dispatch). Effect IDs are interpreted by `worker/src/engine.ts`.

import type { CardDef } from "./types";

// ===== Starter cards =====

export const STARTERS: CardDef[] = [
  {
    id: "starter.scout",
    name: "Scout",
    faction: "neutral",
    type: "ship",
    cost: 0,
    abilities: [{ text: "+1 Trade.", effect: "trade:1" }],
  },
  {
    id: "starter.viper",
    name: "Viper",
    faction: "neutral",
    type: "ship",
    cost: 0,
    abilities: [{ text: "+1 Combat.", effect: "combat:1" }],
  },
];

// ===== Explorer (always available, not in trade deck) =====

export const EXPLORER: CardDef = {
  id: "neutral.explorer",
  name: "Explorer",
  faction: "neutral",
  type: "ship",
  cost: 2,
  abilities: [
    { text: "+2 Trade.", effect: "trade:2" },
    { text: "Scrap: +2 Combat.", effect: "combat:2", scrap: true },
  ],
};

// ===== Trade deck =====
// 30 distinct designs, paraphrased. Quantities chosen so the deck
// totals ~80 cards (typical of the printed core set).

export const TRADE_DECK: Array<{ def: CardDef; count: number }> = [
  // -------- Trade Federation (economy + authority) --------
  {
    count: 4,
    def: {
      id: "trade.federation_shuttle",
      name: "Federation Shuttle",
      faction: "trade",
      type: "ship",
      cost: 1,
      abilities: [
        { text: "+2 Trade.", effect: "trade:2" },
        { text: "Ally: +4 Authority.", effect: "authority:4", ally: true },
      ],
    },
  },
  {
    count: 3,
    def: {
      id: "trade.cutter",
      name: "Cutter",
      faction: "trade",
      type: "ship",
      cost: 2,
      abilities: [
        { text: "+4 Authority.", effect: "authority:4" },
        { text: "+2 Trade.", effect: "trade:2" },
        { text: "Ally: +4 Combat.", effect: "combat:4", ally: true },
      ],
    },
  },
  {
    count: 2,
    def: {
      id: "trade.embassy_yacht",
      name: "Embassy Yacht",
      faction: "trade",
      type: "ship",
      cost: 3,
      abilities: [
        { text: "+2 Trade.", effect: "trade:2" },
        { text: "+3 Authority.", effect: "authority:3" },
        { text: "If you have 2+ bases, draw 2.", effect: "draw_if_bases:2:2" },
      ],
    },
  },
  {
    count: 2,
    def: {
      id: "trade.freighter",
      name: "Freighter",
      faction: "trade",
      type: "ship",
      cost: 4,
      abilities: [
        { text: "+4 Trade.", effect: "trade:4" },
        { text: "Ally: next ship you buy goes on top of your deck.", effect: "buy_to_top", ally: true },
      ],
    },
  },
  {
    count: 2,
    def: {
      id: "trade.trading_post",
      name: "Trading Post",
      faction: "trade",
      type: "base",
      cost: 3,
      defense: 4,
      outpost: true,
      abilities: [
        { text: "Choose one: +1 Authority or +1 Trade.", effect: "choose_trade_or_auth:1" },
        { text: "Scrap: +3 Combat.", effect: "combat:3", scrap: true },
      ],
    },
  },
  {
    count: 1,
    def: {
      id: "trade.command_ship",
      name: "Command Ship",
      faction: "trade",
      type: "ship",
      cost: 8,
      abilities: [
        { text: "+4 Authority.", effect: "authority:4" },
        { text: "+5 Combat.", effect: "combat:5" },
        { text: "Draw 2 cards.", effect: "draw:2" },
        { text: "Ally: destroy a target threat.", effect: "destroy_threat", ally: true },
      ],
    },
  },
  // -------- Blob (aggression + scaling) --------
  {
    count: 3,
    def: {
      id: "blob.fighter",
      name: "Blob Fighter",
      faction: "blob",
      type: "ship",
      cost: 1,
      abilities: [
        { text: "+3 Combat.", effect: "combat:3" },
        { text: "Ally: Draw a card.", effect: "draw:1", ally: true },
      ],
    },
  },
  {
    count: 3,
    def: {
      id: "blob.trade_pod",
      name: "Trade Pod",
      faction: "blob",
      type: "ship",
      cost: 2,
      abilities: [
        { text: "+3 Trade.", effect: "trade:3" },
        { text: "Ally: +2 Combat.", effect: "combat:2", ally: true },
      ],
    },
  },
  {
    count: 2,
    def: {
      id: "blob.ram",
      name: "Battle Pod",
      faction: "blob",
      type: "ship",
      cost: 2,
      abilities: [
        { text: "+4 Combat.", effect: "combat:4" },
        { text: "Scrap a trade-row card.", effect: "scrap_trade_row" },
        { text: "Ally: +2 Combat.", effect: "combat:2", ally: true },
      ],
    },
  },
  {
    count: 2,
    def: {
      id: "blob.wheel",
      name: "Blob Wheel",
      faction: "blob",
      type: "base",
      cost: 3,
      defense: 5,
      abilities: [
        { text: "+1 Combat.", effect: "combat:1" },
        { text: "Scrap: +3 Trade.", effect: "trade:3", scrap: true },
      ],
    },
  },
  {
    count: 1,
    def: {
      id: "blob.carrier",
      name: "Blob Carrier",
      faction: "blob",
      type: "ship",
      cost: 6,
      abilities: [
        { text: "+7 Combat.", effect: "combat:7" },
        { text: "Ally: Acquire a free ship and put it on top of your deck.", effect: "free_ship_top", ally: true },
      ],
    },
  },
  {
    count: 1,
    def: {
      id: "blob.world",
      name: "Blob World",
      faction: "blob",
      type: "base",
      cost: 8,
      defense: 7,
      abilities: [
        { text: "Choose one: +5 Combat, or +1 Combat per Blob card played this turn.", effect: "blob_world_choice" },
      ],
    },
  },
  // -------- Star Empire (draw + force discard) --------
  {
    count: 3,
    def: {
      id: "star.corvette",
      name: "Imperial Corvette",
      faction: "star",
      type: "ship",
      cost: 2,
      abilities: [
        { text: "+1 Combat.", effect: "combat:1" },
        { text: "Draw a card.", effect: "draw:1" },
        { text: "Ally: +2 Combat.", effect: "combat:2", ally: true },
      ],
    },
  },
  {
    count: 3,
    def: {
      id: "star.fighter",
      name: "Imperial Fighter",
      faction: "star",
      type: "ship",
      cost: 1,
      abilities: [
        { text: "+2 Combat.", effect: "combat:2" },
        { text: "Boss deals 2 less next round.", effect: "mitigate:2" },
        { text: "Ally: Draw a card.", effect: "draw:1", ally: true },
      ],
    },
  },
  {
    count: 2,
    def: {
      id: "star.frigate",
      name: "Survey Frigate",
      faction: "star",
      type: "ship",
      cost: 3,
      abilities: [
        { text: "+4 Combat.", effect: "combat:4" },
        { text: "Draw a card.", effect: "draw:1" },
      ],
    },
  },
  {
    count: 2,
    def: {
      id: "star.outpost",
      name: "Recon Outpost",
      faction: "star",
      type: "base",
      cost: 4,
      defense: 4,
      outpost: true,
      abilities: [
        { text: "+1 Combat.", effect: "combat:1" },
        { text: "When destroyed, draw a card.", effect: "draw_on_destroyed:1" },
      ],
    },
  },
  {
    count: 1,
    def: {
      id: "star.dreadnought",
      name: "Dreadnought",
      faction: "star",
      type: "ship",
      cost: 7,
      abilities: [
        { text: "+7 Combat.", effect: "combat:7" },
        { text: "Draw a card.", effect: "draw:1" },
        { text: "Scrap: +5 Combat.", effect: "combat:5", scrap: true },
      ],
    },
  },
  // -------- Machine Cult (scrap synergy + bases) --------
  {
    count: 3,
    def: {
      id: "machine.drone",
      name: "Patrol Mech",
      faction: "machine",
      type: "ship",
      cost: 1,
      abilities: [
        { text: "+3 Combat.", effect: "combat:3" },
        { text: "You may scrap a card in your hand or discard.", effect: "may_scrap_hand_or_discard" },
        { text: "Ally: +2 Combat.", effect: "combat:2", ally: true },
      ],
    },
  },
  {
    count: 3,
    def: {
      id: "machine.supply",
      name: "Supply Bot",
      faction: "machine",
      type: "ship",
      cost: 2,
      abilities: [
        { text: "+2 Trade.", effect: "trade:2" },
        { text: "You may scrap a card in your hand or discard.", effect: "may_scrap_hand_or_discard" },
        { text: "Ally: +2 Combat.", effect: "combat:2", ally: true },
      ],
    },
  },
  {
    count: 2,
    def: {
      id: "machine.repair_bot",
      name: "Repair Bot",
      faction: "machine",
      type: "ship",
      cost: 2,
      abilities: [
        { text: "+1 Trade.", effect: "trade:1" },
        { text: "+3 Authority.", effect: "authority:3" },
      ],
    },
  },
  {
    count: 2,
    def: {
      id: "machine.foundry",
      name: "Foundry",
      faction: "machine",
      type: "base",
      cost: 4,
      defense: 5,
      outpost: true,
      abilities: [
        { text: "+1 Trade.", effect: "trade:1" },
        { text: "Scrap a card in your hand or discard.", effect: "scrap_hand_or_discard" },
      ],
    },
  },
  {
    count: 1,
    def: {
      id: "machine.mech_world",
      name: "Mech World",
      faction: "machine",
      type: "base",
      cost: 5,
      defense: 6,
      outpost: true,
      abilities: [
        { text: "Counts as an ally of every faction this turn.", effect: "wildcard_ally" },
      ],
    },
  },
];

// ===== Boss threats =====
// Threats are base-like cards the boss puts into play. Players use
// combat to destroy them.

export const THREAT_DECK: CardDef[] = [
  {
    id: "threat.warpgate",
    name: "Warpgate",
    faction: "neutral",
    type: "threat",
    cost: 0,
    defense: 4,
    abilities: [
      { text: "Boss spawns 1 threat sooner.", effect: "boss_spawn_faster" },
    ],
  },
  {
    id: "threat.beacon",
    name: "Sensor Beacon",
    faction: "neutral",
    type: "threat",
    cost: 0,
    defense: 3,
    abilities: [
      { text: "Each player draws 1 fewer card at end of turn.", effect: "minus_draw:1" },
    ],
  },
  {
    id: "threat.orbital",
    name: "Orbital Battery",
    faction: "neutral",
    type: "threat",
    cost: 0,
    defense: 5,
    abilities: [
      { text: "Boss deals +1 damage per turn.", effect: "boss_damage:1" },
    ],
  },
  {
    id: "threat.jammer",
    name: "Trade Jammer",
    faction: "neutral",
    type: "threat",
    cost: 0,
    defense: 4,
    abilities: [
      { text: "Each player generates 1 less Trade per turn.", effect: "minus_trade:1" },
    ],
  },
  {
    id: "threat.swarm",
    name: "Bioform Swarm",
    faction: "neutral",
    type: "threat",
    cost: 0,
    defense: 6,
    abilities: [
      { text: "Boss deals +2 damage per turn.", effect: "boss_damage:2" },
    ],
  },
  {
    id: "threat.cloaker",
    name: "Cloaking Field",
    faction: "neutral",
    type: "threat",
    cost: 0,
    defense: 7,
    abilities: [
      { text: "Boss cannot be attacked while this threat is in play.", effect: "shield_boss" },
    ],
  },
];

// ===== Boss tier configuration =====

export interface BossTierConfig {
  tier: 1 | 2 | 3;
  name: string;
  maxAuthority: number;
  damagePerTurn: number;
  threatEveryNRounds: number;
}

export const BOSS_TIERS: Record<1 | 2 | 3, BossTierConfig> = {
  1: { tier: 1, name: "Hostile Worlds — Vanguard", maxAuthority: 50, damagePerTurn: 1, threatEveryNRounds: 3 },
  2: { tier: 2, name: "Hostile Worlds — Marauder Fleet", maxAuthority: 75, damagePerTurn: 2, threatEveryNRounds: 2 },
  3: { tier: 3, name: "Hostile Worlds — Hive Mind", maxAuthority: 100, damagePerTurn: 3, threatEveryNRounds: 1 },
};

export function bossTiersForDifficulty(d: "standard" | "hard" | "endless"): (1 | 2 | 3)[] {
  if (d === "standard") return [1];
  if (d === "hard") return [1, 2];
  return [1, 2, 3];
}

// ===== Lookup helpers =====

export const ALL_DEFS: CardDef[] = (() => {
  const out: CardDef[] = [...STARTERS, EXPLORER, ...THREAT_DECK];
  for (const entry of TRADE_DECK) out.push(entry.def);
  return out;
})();

export const CARD_DEFS_BY_ID: Record<string, CardDef> = (() => {
  const m: Record<string, CardDef> = {};
  for (const def of ALL_DEFS) m[def.id] = def;
  return m;
})();

export function buildTradeDeck(): string[] {
  // Returns an unshuffled list of def IDs respecting counts.
  const out: string[] = [];
  for (const { def, count } of TRADE_DECK) {
    for (let i = 0; i < count; i++) out.push(def.id);
  }
  return out;
}
