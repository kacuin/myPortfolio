import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { EASE } from "./motion";
import { PROFILE } from "../content/profile";

const SESSION_KEY = "kc-booted";
const BOOT_MS = 1900;

/**
 * Once-per-session cold boot.
 *
 * sessionStorage, not localStorage: a returning visitor should see it again on
 * a fresh visit, but not on every route bounce or refresh within one sitting.
 * Click or any key skips.
 */
export function BootSequence({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion();
  const [booting, setBooting] = useState(() => {
    try {
      return sessionStorage.getItem(SESSION_KEY) !== "1";
    } catch {
      return false; // storage blocked — never trap the visitor behind a splash
    }
  });

  const skip = booting && reduced;

  useEffect(() => {
    if (!booting) return;

    const finish = () => {
      try {
        sessionStorage.setItem(SESSION_KEY, "1");
      } catch {
        /* non-fatal */
      }
      setBooting(false);
    };

    if (skip) {
      finish();
      return;
    }

    const timer = setTimeout(finish, BOOT_MS);
    window.addEventListener("keydown", finish);
    window.addEventListener("pointerdown", finish);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("keydown", finish);
      window.removeEventListener("pointerdown", finish);
    };
  }, [booting, skip]);

  return (
    <>
      {children}
      <AnimatePresence>
        {booting && !skip && (
          <motion.div
            key="boot"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.65, ease: EASE }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 10000,
              background: "#070914",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 34,
              cursor: "pointer",
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE }}
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(34px, 5vw, 54px)",
                fontWeight: 500,
                letterSpacing: "-0.02em",
                fontVariationSettings: "'SOFT' 40, 'WONK' 1",
                color: "#F0F4FF",
              }}
            >
              {PROFILE.name}
            </motion.div>

            <div
              style={{
                width: 172,
                height: 2,
                borderRadius: 2,
                background: "rgba(240,244,255,0.14)",
                overflow: "hidden",
              }}
            >
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: BOOT_MS / 1000, ease: [0.4, 0, 0.2, 1] }}
                style={{
                  height: "100%",
                  background: "#4F6EF7",
                  transformOrigin: "left",
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
