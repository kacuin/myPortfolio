import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  motion,
  useTransform,
  useSpring,
  useAnimationControls,
  AnimatePresence,
  type MotionValue,
} from "motion/react";

const EASE = [0.16, 1, 0.3, 1] as const;

export const DOCK_ICON_BASE = 48;
export const DOCK_ICON_MAX = 84;

export function DockIcon({
  mouseX,
  label,
  gradient,
  running,
  launching,
  onLaunched,
  onClick,
  isMobile,
  registerRef,
  children,
}: {
  mouseX: MotionValue<number>;
  label: string;
  gradient: [string, string];
  running?: boolean;
  launching?: boolean;
  onLaunched?: () => void;
  onClick: () => void;
  isMobile: boolean;
  registerRef?: (el: HTMLElement | null) => void;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const bounce = useAnimationControls();

  const distance = useTransform(mouseX, (x) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return x - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(
    distance,
    [-150, 0, 150],
    [DOCK_ICON_BASE, DOCK_ICON_MAX, DOCK_ICON_BASE]
  );
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 170, damping: 12 });

  // Bounce-on-launch, like a real macOS app opening
  useEffect(() => {
    if (!launching) return;
    let cancelled = false;
    bounce
      .start({
        y: [0, -26, 0, -12, 0],
        transition: { duration: 0.85, ease: "easeOut", times: [0, 0.3, 0.55, 0.78, 1] },
      })
      .then(() => {
        if (!cancelled) onLaunched?.();
      });
    return () => {
      cancelled = true;
    };
  }, [launching, bounce, onLaunched]);

  const base = isMobile ? 44 : DOCK_ICON_BASE;

  return (
    // Fixed-height slot: only its WIDTH animates, so the dock bar never grows.
    // The tile is bottom-anchored inside and magnifies upward, out of the bar.
    <motion.div
      style={{
        width: isMobile ? base : width,
        height: base,
        position: "relative",
        flexShrink: 0,
      }}
    >
      <motion.div
        animate={bounce}
        style={{ position: "absolute", bottom: 0, left: 0, right: 0 }}
      >
        <AnimatePresence>
          {hovered && !isMobile && (
            <motion.div
              initial={{ opacity: 0, y: 6, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 4, scale: 0.95 }}
              transition={{ duration: 0.16, ease: EASE }}
              style={{
                position: "absolute",
                bottom: "calc(100% + 12px)",
                left: "50%",
                x: "-50%",
                background: "var(--glass-bg)",
                backdropFilter: "blur(28px) saturate(1.8)",
                WebkitBackdropFilter: "blur(28px) saturate(1.8)",
                border: "1px solid var(--glass-border)",
                borderRadius: 8,
                padding: "5px 12px",
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 12.5,
                fontWeight: 500,
                color: "var(--color-text)",
                whiteSpace: "nowrap",
                pointerEvents: "none",
                boxShadow:
                  "inset 0 1px 0 rgba(255,255,255,0.15), 0 8px 24px rgba(0,0,10,0.25)",
              }}
            >
              {label}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          ref={(el) => {
            (ref as React.MutableRefObject<HTMLDivElement | null>).current = el;
            registerRef?.(el);
          }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onClick={onClick}
          whileTap={{ scale: 0.88 }}
          style={{
            width: "100%",
            height: isMobile ? base : width,
            borderRadius: "24%",
            background: `linear-gradient(145deg, ${gradient[0]}, ${gradient[1]})`,
            border: "1px solid rgba(255,255,255,0.18)",
            boxShadow:
              "0 6px 16px rgba(0,0,10,0.35), inset 0 1px 0 rgba(255,255,255,0.25)",
            display: "grid",
            placeItems: "center",
            cursor: "pointer",
            color: "#fff",
            userSelect: "none",
            WebkitTapHighlightColor: "transparent",
          }}
        >
          {children}
        </motion.div>
      </motion.div>

      {/* running-app indicator dot */}
      <div
        style={{
          position: "absolute",
          bottom: -7,
          left: "50%",
          transform: "translateX(-50%)",
          width: 4,
          height: 4,
          borderRadius: "50%",
          background: running ? "var(--color-text)" : "transparent",
          opacity: running ? 0.8 : 0,
          transition: "opacity 0.25s",
        }}
      />
    </motion.div>
  );
}
