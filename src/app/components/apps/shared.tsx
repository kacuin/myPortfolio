import { motion } from "motion/react";
import type { CSSProperties, ReactNode } from "react";
import { stagger } from "../../../os/motion";

// Re-exported so the app components can keep importing their motion vocabulary
// from the same place they import the layout primitives. Definitions live in
// os/motion.ts.
export { EASE, stagger } from "../../../os/motion";

/**
 * The five patterns below were re-typed by hand in every app file — the surface
 * card, the pill, the icon tile, the `▸` bullet, and the page shell. They had
 * drifted apart (13.5px vs 14px bullets, hardcoded rgba() that ignored the light
 * theme), so they live here now and every app consumes the same ones.
 */

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

/**
 * Page shell for a content app: the padding, title and lede that opened six
 * files character-for-character. Padding drops at narrow widths — the old flat
 * 32px sides spent a sixth of a 375px screen on margin.
 */
export function AppShell({
  title,
  lede,
  children,
}: {
  title: ReactNode;
  lede?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="app-shell">
      <AppTitle>{title}</AppTitle>
      {lede && (
        <motion.p
          {...stagger(2)}
          style={{
            color: "var(--color-text-muted)",
            fontSize: 14.5,
            lineHeight: 1.8,
            marginBottom: 26,
            maxWidth: "62ch",
          }}
        >
          {lede}
        </motion.p>
      )}
      {children}
    </div>
  );
}

export function Card({
  children,
  style,
  padded = true,
}: {
  children: ReactNode;
  style?: CSSProperties;
  padded?: boolean;
}) {
  return (
    <div
      style={{
        background: "var(--color-surface)",
        border: "1px solid var(--color-border)",
        borderRadius: "var(--radius-card)",
        padding: padded ? 20 : "4px 20px",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export type Tone = "accent" | "teal" | "amber";

const TONE: Record<Tone, { fg: string; fill: string; border: string }> = {
  accent: {
    fg: "var(--color-accent)",
    fill: "var(--color-accent-fill)",
    border: "var(--color-accent-border)",
  },
  teal: {
    fg: "var(--color-teal)",
    fill: "var(--color-teal-fill)",
    border: "var(--color-teal-border)",
  },
  amber: {
    fg: "var(--color-amber)",
    fill: "var(--color-amber-fill)",
    border: "var(--color-amber-border)",
  },
};

export function Pill({
  children,
  tone = "accent",
  style,
}: {
  children: ReactNode;
  tone?: Tone;
  style?: CSSProperties;
}) {
  const t = TONE[tone];
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "4px 11px",
        borderRadius: "var(--radius-pill)",
        fontFamily: "var(--font-mono)",
        fontSize: 11,
        lineHeight: 1.4,
        whiteSpace: "nowrap",
        color: t.fg,
        background: t.fill,
        border: `1px solid ${t.border}`,
        ...style,
      }}
    >
      {children}
    </span>
  );
}

export function IconTile({
  children,
  tone = "accent",
  size = 36,
}: {
  children: ReactNode;
  tone?: Tone;
  size?: number;
}) {
  const t = TONE[tone];
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: 10,
        background: t.fill,
        border: `1px solid ${t.border}`,
        display: "grid",
        placeItems: "center",
        color: t.fg,
        flexShrink: 0,
      }}
    >
      {children}
    </div>
  );
}

/** List item with a hanging accent marker. Was written twice, 1px apart. */
export function Bullet({ children }: { children: ReactNode }) {
  return (
    <li
      style={{
        position: "relative",
        listStyle: "none",
        padding: "5px 0 5px 18px",
        fontSize: 13.5,
        lineHeight: 1.7,
        color: "var(--color-text-muted)",
      }}
    >
      <span
        aria-hidden
        style={{ position: "absolute", left: 0, top: 6, color: "var(--color-accent)" }}
      >
        ▸
      </span>
      {children}
    </li>
  );
}
