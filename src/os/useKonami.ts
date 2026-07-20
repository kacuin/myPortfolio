import { useEffect, useRef } from "react";

const SEQUENCE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

/**
 * Fires `onUnlock` when the Konami code is entered.
 *
 * Progress is kept in a ref rather than state so a partial sequence never
 * re-renders the desktop on every keypress.
 */
export function useKonami(onUnlock: () => void) {
  const progress = useRef(0);
  const handler = useRef(onUnlock);

  // Assigning during render is the pattern React warns about under concurrent
  // double-rendering; the latest-ref idiom belongs in an effect.
  useEffect(() => {
    handler.current = onUnlock;
  });

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      // Spotlight navigates results with the arrow keys and KAI has a chat
      // composer — typing in either shouldn't advance the sequence.
      const el = e.target as HTMLElement | null;
      if (
        el instanceof HTMLInputElement ||
        el instanceof HTMLTextAreaElement ||
        el?.isContentEditable
      ) {
        return;
      }

      const expected = SEQUENCE[progress.current];
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;

      if (key === expected) {
        progress.current += 1;
        if (progress.current === SEQUENCE.length) {
          progress.current = 0;
          handler.current();
        }
        return;
      }
      // A wrong key still counts as a valid first key — otherwise "↑↑↑↓↓..."
      // never matches, which is exactly how people actually type it.
      progress.current = key === SEQUENCE[0] ? 1 : 0;
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
}
