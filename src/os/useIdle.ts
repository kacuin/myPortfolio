import { useEffect, useState } from "react";

const ACTIVITY = ["mousemove", "pointerdown", "keydown", "wheel", "touchstart"] as const;

/**
 * True once there has been no user input for `delay` ms.
 *
 * `enabled: false` both stops the timer and clears an active idle state, so
 * callers can switch it off (mobile, reduced motion) without extra bookkeeping.
 */
export function useIdle(delay: number, enabled = true) {
  const [idle, setIdle] = useState(false);

  useEffect(() => {
    if (!enabled) {
      setIdle(false);
      return;
    }

    let timer: ReturnType<typeof setTimeout>;
    const reset = () => {
      setIdle(false);
      clearTimeout(timer);
      timer = setTimeout(() => setIdle(true), delay);
    };

    reset();
    for (const evt of ACTIVITY) window.addEventListener(evt, reset, { passive: true });
    // Returning to a backgrounded tab counts as activity — otherwise the timer
    // ran down while you were away and the screensaver greets you on return.
    // This one is dispatched at `document`, not `window`.
    document.addEventListener("visibilitychange", reset);
    return () => {
      clearTimeout(timer);
      for (const evt of ACTIVITY) window.removeEventListener(evt, reset);
      document.removeEventListener("visibilitychange", reset);
    };
  }, [delay, enabled]);

  return idle;
}
