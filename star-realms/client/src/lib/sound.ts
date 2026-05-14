// Tiny WebAudio sound module. No external assets. Off by default;
// users opt-in and the preference persists in localStorage.

type SoundName = "play" | "buy" | "attack" | "boss" | "victory" | "defeat" | "ui";

const KEY = "star-realms.sound";

let ctx: AudioContext | null = null;
let enabled = readStored();

function readStored(): boolean {
  try {
    return localStorage.getItem(KEY) === "on";
  } catch {
    return false;
  }
}

function ensureContext() {
  if (!ctx) {
    const C = (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext);
    if (!C) return null;
    ctx = new C();
  }
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

interface Tone {
  freq: number;
  duration: number;
  type?: OscillatorType;
  decay?: number;
  gain?: number;
}

const palette: Record<SoundName, Tone[]> = {
  play:    [{ freq: 660, duration: 0.10, type: "triangle" }],
  buy:     [{ freq: 520, duration: 0.08, type: "sine" }, { freq: 780, duration: 0.10, type: "sine" }],
  attack:  [{ freq: 200, duration: 0.14, type: "sawtooth", decay: 0.14 }],
  boss:    [{ freq: 140, duration: 0.20, type: "square", decay: 0.20 }],
  victory: [{ freq: 523, duration: 0.12, type: "triangle" }, { freq: 659, duration: 0.12, type: "triangle" }, { freq: 784, duration: 0.20, type: "triangle" }],
  defeat:  [{ freq: 261, duration: 0.18, type: "sawtooth" }, { freq: 196, duration: 0.30, type: "sawtooth" }],
  ui:      [{ freq: 880, duration: 0.05, type: "sine", gain: 0.04 }],
};

function playTone(c: AudioContext, t: Tone, when: number) {
  const osc = c.createOscillator();
  const gain = c.createGain();
  osc.type = t.type ?? "sine";
  osc.frequency.value = t.freq;
  const g = t.gain ?? 0.08;
  gain.gain.setValueAtTime(0, when);
  gain.gain.linearRampToValueAtTime(g, when + 0.005);
  gain.gain.exponentialRampToValueAtTime(0.0001, when + (t.decay ?? t.duration));
  osc.connect(gain).connect(c.destination);
  osc.start(when);
  osc.stop(when + t.duration + 0.02);
}

export function play(name: SoundName) {
  if (!enabled) return;
  const c = ensureContext();
  if (!c) return;
  let when = c.currentTime;
  for (const tone of palette[name]) {
    playTone(c, tone, when);
    when += tone.duration * 0.9;
  }
}

export function isEnabled(): boolean {
  return enabled;
}

export function setEnabled(v: boolean) {
  enabled = v;
  try { localStorage.setItem(KEY, v ? "on" : "off"); } catch { /* ignore */ }
  if (v) {
    // Resume on user gesture.
    const c = ensureContext();
    if (c?.state === "suspended") void c.resume();
    play("ui");
  }
}
