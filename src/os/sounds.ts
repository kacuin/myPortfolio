/**
 * Tiny WebAudio UI-sound synth — no audio assets, everything is generated.
 * Muting is persisted to localStorage under "kc-sounds".
 */

export type SoundName = "open" | "close" | "minimize" | "dock" | "send" | "receive";

const STORAGE_KEY = "kc-sounds";

let ctx: AudioContext | null = null;
let muted = localStorage.getItem(STORAGE_KEY) === "off";

function audioCtx(): AudioContext | null {
  if (typeof AudioContext === "undefined") return null;
  if (!ctx) ctx = new AudioContext();
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

export function isMuted() {
  return muted;
}

export function setMuted(value: boolean) {
  muted = value;
  localStorage.setItem(STORAGE_KEY, value ? "off" : "on");
}

/** One short oscillator blip with a pitch sweep and exponential decay. */
function blip(
  ac: AudioContext,
  {
    type = "sine" as OscillatorType,
    from,
    to,
    duration,
    gain = 0.08,
    delay = 0,
  }: {
    type?: OscillatorType;
    from: number;
    to: number;
    duration: number;
    gain?: number;
    delay?: number;
  }
) {
  const t0 = ac.currentTime + delay;
  const osc = ac.createOscillator();
  const g = ac.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(from, t0);
  osc.frequency.exponentialRampToValueAtTime(Math.max(1, to), t0 + duration);
  g.gain.setValueAtTime(0, t0);
  g.gain.linearRampToValueAtTime(gain, t0 + 0.012);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + duration);
  osc.connect(g).connect(ac.destination);
  osc.start(t0);
  osc.stop(t0 + duration + 0.02);
}

const RECIPES: Record<SoundName, (ac: AudioContext) => void> = {
  // soft rising pop — window opens
  open: (ac) => blip(ac, { from: 380, to: 720, duration: 0.16, gain: 0.06 }),
  // short falling tick — window closes
  close: (ac) => blip(ac, { from: 620, to: 280, duration: 0.13, gain: 0.05 }),
  // downward whoosh — minimize to dock
  minimize: (ac) =>
    blip(ac, { type: "triangle", from: 900, to: 160, duration: 0.3, gain: 0.045 }),
  // tight click — dock launch
  dock: (ac) => {
    blip(ac, { from: 520, to: 660, duration: 0.09, gain: 0.05 });
    blip(ac, { from: 660, to: 880, duration: 0.1, gain: 0.04, delay: 0.06 });
  },
  // message sent — quick up-chirp
  send: (ac) => blip(ac, { from: 500, to: 950, duration: 0.12, gain: 0.05 }),
  // message received — gentle two-note
  receive: (ac) => {
    blip(ac, { from: 700, to: 700, duration: 0.1, gain: 0.045 });
    blip(ac, { from: 880, to: 880, duration: 0.14, gain: 0.045, delay: 0.09 });
  },
};

export function playSound(name: SoundName) {
  if (muted) return;
  try {
    const ac = audioCtx();
    if (!ac) return;
    RECIPES[name](ac);
  } catch {
    // audio is decorative — never let it break the UI
  }
}
