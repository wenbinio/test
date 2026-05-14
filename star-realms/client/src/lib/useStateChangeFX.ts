// Watches GameState transitions and triggers sounds + animation flags.

import { useEffect, useRef } from "react";
import type { GameState, LogEntry } from "@star-realms/shared/types";
import { play } from "./sound";

export function useStateChangeFX(state: GameState | null) {
  const lastLogIdRef = useRef<string | null>(null);
  const lastBossAuthRef = useRef<number | null>(null);

  useEffect(() => {
    if (!state) return;

    // First mount: prime refs, don't replay.
    if (lastLogIdRef.current === null) {
      const last = state.log[state.log.length - 1];
      lastLogIdRef.current = last?.id ?? "";
      lastBossAuthRef.current = state.boss.authority;
      return;
    }

    // New log entries since last render → play sounds for each.
    const lastSeen = lastLogIdRef.current;
    const seenIdx = state.log.findIndex((e) => e.id === lastSeen);
    const newOnes: LogEntry[] = seenIdx === -1 ? state.log : state.log.slice(seenIdx + 1);
    for (const e of newOnes) {
      switch (e.kind) {
        case "play":   play("play");   break;
        case "buy":    play("buy");    break;
        case "attack": play("attack"); break;
        case "boss":   play("boss");   break;
        case "system":
          if (state.phase === "victory") play("victory");
          else if (state.phase === "defeat") play("defeat");
          break;
        default: break;
      }
    }
    const tail = state.log[state.log.length - 1];
    if (tail) lastLogIdRef.current = tail.id;
    lastBossAuthRef.current = state.boss.authority;
  }, [state]);
}
