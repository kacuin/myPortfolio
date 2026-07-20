import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useIdle } from "./useIdle";
import { useIsMobile } from "./useIsMobile";
import { EASE } from "./motion";
import { PROFILE } from "../content/profile";

const IDLE_MS = 60_000;

function useClock(active: boolean) {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    if (!active) return;
    // Reseed immediately: the first interval tick is a second away, and the
    // screensaver fades in over ~1.1s showing whatever time it was when the
    // page loaded — which for a full-screen clock is the one unforgivable bug.
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, [active]);
  return now;
}

/**
 * Idle screensaver — the payoff of committing to the desktop metaphor.
 *
 * Any input dismisses it, because useIdle is listening to the same events.
 * Disabled on mobile (no idle concept when the tab is backgrounded) and under
 * reduced motion.
 */
export function Screensaver() {
  const isMobile = useIsMobile();
  const reduced = useReducedMotion();
  const idle = useIdle(IDLE_MS, !isMobile && !reduced);
  const now = useClock(idle);

  const time = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  const date = now.toLocaleDateString([], {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <AnimatePresence>
      {idle && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.1, ease: EASE }}
          aria-hidden
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9000,
            // Near-opaque in both themes — a screensaver that lets the desktop
            // show through just reads as a broken overlay, and at light-theme
            // opacities the text loses all contrast.
            background:
              "radial-gradient(120% 90% at 50% 40%, rgba(6,8,18,0.955) 0%, rgba(2,3,8,0.99) 70%)",
            backdropFilter: "blur(26px)",
            WebkitBackdropFilter: "blur(26px)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "none",
            color: "#F0F4FF",
            textAlign: "center",
            padding: 32,
          }}
        >
          {/* Slow drift keeps it from burning a static image into the eye. */}
          <motion.div
            animate={{ y: [-14, 14, -14], x: [-10, 12, -10] }}
            transition={{ duration: 34, repeat: Infinity, ease: "easeInOut" }}
            style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}
          >
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(58px, 11vw, 148px)",
                fontWeight: 500,
                lineHeight: 1,
                letterSpacing: "-0.03em",
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {time}
            </div>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 13,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "rgba(240,244,255,0.5)",
              }}
            >
              {date}
            </div>
            <div
              style={{
                marginTop: 30,
                fontFamily: "var(--font-display)",
                fontSize: "clamp(20px, 3vw, 30px)",
                fontWeight: 400,
                color: "rgba(240,244,255,0.66)",
                fontVariationSettings: "'SOFT' 40, 'WONK' 1",
              }}
            >
              {PROFILE.name}
            </div>
          </motion.div>

          <motion.div
            animate={{ opacity: [0.25, 0.6, 0.25] }}
            transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
            style={{
              position: "absolute",
              bottom: 54,
              fontFamily: "var(--font-mono)",
              fontSize: 11.5,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(240,244,255,0.5)",
            }}
          >
            Press any key
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
