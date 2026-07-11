import { motion } from "motion/react";
import type { ReactNode } from "react";

export const EASE = [0.16, 1, 0.3, 1] as const;

export function stagger(i: number) {
  return {
    initial: { opacity: 0, y: 14 },
    animate: { opacity: 1, y: 0 },
    transition: { delay: 0.06 + i * 0.07, duration: 0.45, ease: EASE },
  };
}

export function SectionLabel({ children, index }: { children: ReactNode; index?: number }) {
  return (
    <motion.div
      {...stagger(index ?? 0)}
      style={{
        fontFamily: "'JetBrains Mono', monospace",
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
        fontFamily: "'Space Grotesk', sans-serif",
        fontSize: "clamp(24px, 3vw, 32px)",
        fontWeight: 700,
        letterSpacing: "-0.02em",
        color: "var(--color-text)",
        marginBottom: 14,
      }}
    >
      {children}
    </motion.h2>
  );
}
