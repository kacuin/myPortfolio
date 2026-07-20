import { motion } from "motion/react";
import type { ReactNode } from "react";
import { stagger } from "../../../os/motion";

// Re-exported so the app components can keep importing their motion vocabulary
// from the same place they import SectionLabel/AppTitle. Definitions live in
// os/motion.ts.
export { EASE, stagger } from "../../../os/motion";

export function SectionLabel({ children, index }: { children: ReactNode; index?: number }) {
  return (
    <motion.div
      {...stagger(index ?? 0)}
      style={{
        fontFamily: "var(--font-mono)",
        fontSize: 11.5,
        color: "var(--color-accent)",
        letterSpacing: "0.15em",
        marginBottom: 10,
        display: "flex",
        alignItems: "center",
        gap: 10,
      }}
    >
      {children}
      <span
        style={{
          flex: 1,
          maxWidth: 60,
          height: 1,
          background: "var(--color-accent)",
          opacity: 0.4,
          display: "block",
        }}
      />
    </motion.div>
  );
}

export function AppTitle({ children, index }: { children: ReactNode; index?: number }) {
  return (
    <motion.h2
      {...stagger(index ?? 1)}
      style={{
        fontFamily: "var(--font-display)",
        fontSize: "clamp(25px, 3vw, 34px)",
        fontWeight: 600,
        letterSpacing: "-0.015em",
        lineHeight: 1.15,
        textWrap: "balance",
        color: "var(--color-text)",
        marginBottom: 14,
      }}
    >
      {children}
    </motion.h2>
  );
}
