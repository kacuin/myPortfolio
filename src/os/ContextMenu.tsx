import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronRight, Volume2, VolumeX } from "lucide-react";
import { APPS } from "./apps";
import { useWindowManager } from "./WindowManagerContext";
import { useTheme } from "../context/ThemeContext";
import { isMuted, setMuted } from "./sounds";
import cvFile from "../assets/KC_Acuin_CV.pdf";

import { EASE } from "./motion";

export type MenuPos = { x: number; y: number } | null;

const itemStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 18,
  width: "100%",
  border: "none",
  background: "transparent",
  color: "var(--color-text)",
  fontFamily: "var(--font-ui)",
  fontSize: 13,
  padding: "5px 10px",
  borderRadius: 6,
  cursor: "default",
  textAlign: "left",
  whiteSpace: "nowrap",
};

function Item({
  label,
  right,
  onClick,
  onHover,
}: {
  label: string;
  right?: React.ReactNode;
  onClick?: () => void;
  onHover?: () => void;
}) {
  const [hover, setHover] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => {
        setHover(true);
        onHover?.();
      }}
      onMouseLeave={() => setHover(false)}
      style={{
        ...itemStyle,
        background: hover ? "var(--color-accent)" : "transparent",
        color: hover ? "#fff" : "var(--color-text)",
      }}
    >
      {label}
      {right}
    </button>
  );
}

function Sep() {
  return <div style={{ height: 1, background: "var(--color-border)", margin: "4px 8px" }} />;
}

const paneStyle: React.CSSProperties = {
  background:
    "linear-gradient(180deg, rgba(255,255,255,0.06) 0%, transparent 100%), var(--glass-bg)",
  backdropFilter: "blur(28px) saturate(1.8)",
  WebkitBackdropFilter: "blur(28px) saturate(1.8)",
  border: "1px solid var(--glass-border)",
  borderRadius: 10,
  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.12), 0 16px 50px rgba(0,0,10,0.35)",
  padding: 5,
};

export function ContextMenu({ pos, onClose }: { pos: MenuPos; onClose: () => void }) {
  const { openApp, minimizeAll, windows, moveWindow } = useWindowManager();
  const { toggle } = useTheme();
  const [openSub, setOpenSub] = useState(false);
  const [muted, setMutedState] = useState(isMuted());

  useEffect(() => {
    if (!pos) return;
    setOpenSub(false);
    const close = () => onClose();
    const esc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("click", close);
    window.addEventListener("keydown", esc);
    return () => {
      window.removeEventListener("click", close);
      window.removeEventListener("keydown", esc);
    };
  }, [pos, onClose]);

  const run = (fn: () => void) => () => {
    fn();
    onClose();
  };

  const sortWindows = () => {
    let i = 0;
    APPS.forEach((app) => {
      const w = windows[app.id];
      if (w?.open && !w.minimized) {
        moveWindow(app.id, {
          x: Math.max(12, window.innerWidth * 0.5 - 380 + i * 36),
          y: Math.max(40, window.innerHeight * 0.5 - 300 + i * 28),
        });
        i++;
      }
    });
  };

  // Keep the menu on-screen
  const clampedX = pos ? Math.min(pos.x, window.innerWidth - 230) : 0;
  const clampedY = pos ? Math.min(pos.y, window.innerHeight - 300) : 0;

  return (
    <AnimatePresence>
      {pos && (
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.14, ease: EASE }}
          onContextMenu={(e) => e.preventDefault()}
          style={{
            position: "fixed",
            left: clampedX,
            top: clampedY,
            zIndex: 1300,
            minWidth: 210,
            transformOrigin: "top left",
            ...paneStyle,
          }}
        >
          <div style={{ position: "relative" }}>
            <Item
              label="Open"
              right={<ChevronRight size={13} />}
              onHover={() => setOpenSub(true)}
            />
            {openSub && (
              <div
                style={{
                  position: "absolute",
                  left: "calc(100% + 2px)",
                  top: -5,
                  minWidth: 180,
                  ...paneStyle,
                }}
                onMouseLeave={() => setOpenSub(false)}
              >
                {APPS.map((a) => (
                  <Item key={a.id} label={a.name} onClick={run(() => openApp(a.id))} />
                ))}
              </div>
            )}
          </div>
          <div onMouseEnter={() => setOpenSub(false)}>
            <Item label="Show Desktop" onClick={run(minimizeAll)} />
            <Item label="Sort Windows" onClick={run(sortWindows)} />
            <Sep />
            <Item
              label="Download CV…"
              onClick={run(() => {
                const a = document.createElement("a");
                a.href = cvFile;
                a.download = "KC_Acuin_CV.pdf";
                a.click();
              })}
            />
            <Item label="Toggle Theme" onClick={run(toggle)} />
            <Item
              label={muted ? "Sounds Off" : "Sounds On"}
              right={muted ? <VolumeX size={13} /> : <Volume2 size={13} />}
              onClick={() => {
                setMuted(!muted);
                setMutedState(!muted);
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
