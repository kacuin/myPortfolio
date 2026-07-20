/**
 * Shared motion vocabulary for the desktop shell and its apps.
 *
 * This used to be a `const EASE = [...]` copy-pasted into eight files, which
 * meant "retune the feel of the OS" was an eight-file edit. It is one file now.
 */

/** Expo-out. Every entrance in the app uses this — it is the house curve. */
export const EASE = [0.16, 1, 0.3, 1] as const;

/** Window/card lift: quick, barely-there overshoot. */
export const SPRING_CARD = { stiffness: 260, damping: 20, mass: 0.6 } as const;

/** Wallpaper parallax: deliberately slow and heavy so it reads as depth, not motion. */
export const SPRING_PARALLAX = { stiffness: 40, damping: 18, mass: 0.6 } as const;

/** Staggered list/section entrance. `i` is the item's position in its group. */
export function stagger(i: number) {
  return {
    initial: { opacity: 0, y: 14 },
    animate: { opacity: 1, y: 0 },
    transition: { delay: 0.06 + i * 0.07, duration: 0.45, ease: EASE },
  };
}
