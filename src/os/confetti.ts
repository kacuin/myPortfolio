import confetti from "canvas-confetti";

/**
 * Confetti in the app's own colors.
 *
 * Reads the live theme tokens rather than hardcoding hexes, so a burst in light
 * mode uses the light palette. Resolved per call — the theme can change between
 * bursts.
 */
function paletteColors(): string[] {
  const s = getComputedStyle(document.documentElement);
  return ["--color-accent", "--color-teal", "--color-amber"]
    .map((token) => s.getPropertyValue(token).trim())
    .filter(Boolean);
}

function reducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** A burst from the bottom of the screen. `origin` is in viewport ratios. */
export function celebrate(origin: { x: number; y: number } = { x: 0.5, y: 0.75 }) {
  if (reducedMotion()) return;
  confetti({
    particleCount: 70,
    spread: 68,
    startVelocity: 38,
    scalar: 0.85,
    ticks: 160,
    origin,
    colors: paletteColors(),
    disableForReducedMotion: true,
  });
}

/** Bigger, two-sided burst — reserved for finding something hidden. */
export function celebrateBig() {
  if (reducedMotion()) return;
  const colors = paletteColors();
  for (const x of [0.1, 0.9]) {
    confetti({
      particleCount: 90,
      angle: x < 0.5 ? 60 : 120,
      spread: 75,
      startVelocity: 45,
      origin: { x, y: 0.8 },
      colors,
      disableForReducedMotion: true,
    });
  }
}
