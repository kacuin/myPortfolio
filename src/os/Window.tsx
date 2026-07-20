import { useEffect, useRef, useState } from "react";
import {
  animate,
  motion,
  useAnimationControls,
  useDragControls,
  useMotionValue,
} from "motion/react";
import type { AppDef } from "./apps";
import { useWindowManager, type WinState } from "./WindowManagerContext";
import { useIsMobile } from "./useIsMobile";

import { EASE } from "./motion";

function TrafficLights({
  onClose,
  onMinimize,
  onZoom,
}: {
  onClose: () => void;
  onMinimize: () => void;
  onZoom?: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  const light = (
    color: string,
    symbol: string,
    action?: () => void,
    disabled?: boolean
  ) => (
    <button
      onClick={(e) => {
        e.stopPropagation();
        action?.();
      }}
      onPointerDown={(e) => e.stopPropagation()}
      disabled={disabled}
      aria-label={symbol === "×" ? "Close" : symbol === "−" ? "Minimize" : "Zoom (disabled)"}
      style={{
        width: 12,
        height: 12,
        borderRadius: "50%",
        border: "none",
        background: disabled ? "var(--color-border)" : color,
        display: "grid",
        placeItems: "center",
        cursor: disabled ? "default" : "pointer",
        padding: 0,
        fontSize: 9,
        fontWeight: 700,
        lineHeight: 1,
        color: hovered && !disabled ? "rgba(0,0,0,0.55)" : "transparent",
        transition: "color 0.12s",
        flexShrink: 0,
      }}
    >
      {symbol}
    </button>
  );

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ display: "flex", gap: 8, alignItems: "center" }}
    >
      {light("#FF5F57", "×", onClose)}
      {light("#FEBC2E", "−", onMinimize)}
      {light("#28C840", "+", onZoom, !onZoom)}
    </div>
  );
}

const MIN_W = 360;
const MIN_H = 280;

type ResizeDir = "n" | "s" | "e" | "w" | "ne" | "nw" | "se" | "sw";

const RESIZE_HANDLES: { dir: ResizeDir; cursor: string; style: React.CSSProperties }[] = [
  { dir: "n", cursor: "ns-resize", style: { top: 0, left: 8, right: 8, height: 5 } },
  { dir: "s", cursor: "ns-resize", style: { bottom: 0, left: 8, right: 8, height: 5 } },
  { dir: "e", cursor: "ew-resize", style: { top: 8, bottom: 8, right: 0, width: 5 } },
  { dir: "w", cursor: "ew-resize", style: { top: 8, bottom: 8, left: 0, width: 5 } },
  { dir: "ne", cursor: "nesw-resize", style: { top: 0, right: 0, width: 10, height: 10 } },
  { dir: "nw", cursor: "nwse-resize", style: { top: 0, left: 0, width: 10, height: 10 } },
  { dir: "se", cursor: "nwse-resize", style: { bottom: 0, right: 0, width: 10, height: 10 } },
  { dir: "sw", cursor: "nesw-resize", style: { bottom: 0, left: 0, width: 10, height: 10 } },
];

export function Window({ app, win }: { app: AppDef; win: WinState }) {
  const { closeApp, minimizeApp, focusApp, resizeWindow, zoomApp, iconRefs, focused } =
    useWindowManager();
  const isMobile = useIsMobile();

  const frameRef = useRef<HTMLDivElement>(null);
  const minimizeControls = useAnimationControls();
  const dragControls = useDragControls();
  const wasMinimized = useRef(false);
  // Drag offset lives in motion values so zoom can reset it smoothly.
  const dragX = useMotionValue(0);
  const dragY = useMotionValue(0);
  const [smooth, setSmooth] = useState(false);

  const handleZoom = () => {
    setSmooth(true);
    zoomApp(app.id);
    animate(dragX, 0, { duration: 0.35, ease: EASE });
    animate(dragY, 0, { duration: 0.35, ease: EASE });
    setTimeout(() => setSmooth(false), 400);
  };

  const startResize = (dir: ResizeDir) => (e: React.PointerEvent) => {
    e.stopPropagation();
    e.preventDefault();
    focusApp(app.id);
    const sx = e.clientX;
    const sy = e.clientY;
    const s = { x: win.pos.x, y: win.pos.y, w: win.size.w, h: win.size.h };
    const onMove = (ev: PointerEvent) => {
      const dx = ev.clientX - sx;
      const dy = ev.clientY - sy;
      let { x, y } = s;
      let w = s.w;
      let h = s.h;
      if (dir.includes("e")) w = Math.max(MIN_W, s.w + dx);
      if (dir.includes("s")) h = Math.max(MIN_H, s.h + dy);
      if (dir.includes("w")) {
        w = Math.max(MIN_W, s.w - dx);
        x = s.x + s.w - w;
      }
      if (dir.includes("n")) {
        h = Math.max(MIN_H, s.h - dy);
        y = s.y + s.h - h;
      }
      resizeWindow(app.id, { x, y }, { w, h });
    };
    const onUp = () => window.removeEventListener("pointermove", onMove);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp, { once: true });
  };

  const isFocused = focused === app.id;
  const Content = app.component;

  // Animate to/from the dock icon when minimized state flips.
  useEffect(() => {
    if (isMobile) return;
    const dockDelta = () => {
      const icon = iconRefs.current[app.id];
      const frame = frameRef.current;
      if (!icon || !frame) return null;
      const ir = icon.getBoundingClientRect();
      const fr = frame.getBoundingClientRect();
      return {
        x: ir.x + ir.width / 2 - (fr.x + fr.width / 2),
        y: ir.y + ir.height / 2 - (fr.y + fr.height / 2),
      };
    };

    if (win.minimized && !wasMinimized.current) {
      wasMinimized.current = true;
      const d = dockDelta();
      minimizeControls.start({
        x: d?.x ?? 0,
        y: d?.y ?? window.innerHeight,
        scale: 0.04,
        opacity: 0,
        transition: { duration: 0.45, ease: EASE },
      });
    } else if (!win.minimized && wasMinimized.current) {
      wasMinimized.current = false;
      minimizeControls.start({
        x: 0,
        y: 0,
        scale: 1,
        opacity: 1,
        transition: { duration: 0.45, ease: EASE },
      });
    }
  }, [win.minimized, isMobile, app.id, iconRefs, minimizeControls]);

  if (isMobile) {
    // Full-screen sheet below the menu bar
    return (
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", stiffness: 320, damping: 32 }}
        onPointerDown={() => focusApp(app.id)}
        style={{
          position: "fixed",
          top: "var(--menubar-h)",
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: win.zIndex,
          display: win.minimized ? "none" : "flex",
          flexDirection: "column",
          background: "var(--window-bg)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          borderTop: "1px solid var(--glass-border)",
        }}
      >
        <div
          style={{
            height: 40,
            display: "flex",
            alignItems: "center",
            padding: "0 14px",
            gap: 10,
            borderBottom: "1px solid var(--color-border)",
            flexShrink: 0,
          }}
        >
          <TrafficLights onClose={() => closeApp(app.id)} onMinimize={() => closeApp(app.id)} />
          <span
            style={{
              flex: 1,
              textAlign: "center",
              fontFamily: "var(--font-ui)",
              fontSize: 13,
              fontWeight: 600,
              color: "var(--color-text)",
              marginRight: 52, // balance the traffic lights
            }}
          >
            {app.name}
          </span>
        </div>
        <div style={{ flex: 1, overflowY: "auto", overscrollBehavior: "contain", paddingBottom: 84 }}>
          <Content />
        </div>
      </motion.div>
    );
  }

  return (
    // Outer layer: open/close/minimize animations (never dragged)
    <motion.div
      animate={minimizeControls}
      initial={{ opacity: 0, scale: 0.92, y: 14 }}
      exit={{ opacity: 0, scale: 0.92, transition: { duration: 0.22, ease: EASE } }}
      style={{
        position: "fixed",
        left: win.pos.x,
        top: win.pos.y,
        zIndex: win.zIndex,
        pointerEvents: win.minimized ? "none" : "auto",
        transformOrigin: "bottom center",
        transition: smooth ? "left 0.35s cubic-bezier(0.16,1,0.3,1), top 0.35s cubic-bezier(0.16,1,0.3,1)" : undefined,
      }}
    >
      <WindowEntrance controls={minimizeControls} />
      {/* Inner layer: drag */}
      <motion.div
        ref={frameRef}
        drag
        dragControls={dragControls}
        dragListener={false}
        dragMomentum={false}
        dragElastic={0}
        onPointerDown={() => focusApp(app.id)}
        style={{
          x: dragX,
          y: dragY,
          width: win.size.w,
          height: win.size.h,
          position: "relative",
          display: "flex",
          flexDirection: "column",
          borderRadius: 12,
          overflow: "hidden",
          background: "var(--window-bg)",
          backdropFilter: "blur(28px) saturate(1.8)",
          WebkitBackdropFilter: "blur(28px) saturate(1.8)",
          border: `1px solid ${isFocused ? "var(--color-border-hover)" : "var(--color-border)"}`,
          boxShadow: `inset 0 1px 0 rgba(255,255,255,0.10), ${
            isFocused ? "var(--window-shadow-focus)" : "var(--window-shadow)"
          }`,
          transition: smooth
            ? "box-shadow 0.25s, border-color 0.25s, width 0.35s cubic-bezier(0.16,1,0.3,1), height 0.35s cubic-bezier(0.16,1,0.3,1)"
            : "box-shadow 0.25s, border-color 0.25s",
        }}
      >
        {/* Title bar — drag handle */}
        <div
          onPointerDown={(e) => {
            dragControls.start(e);
          }}
          onDoubleClick={() => minimizeApp(app.id)}
          style={{
            height: 36,
            display: "flex",
            alignItems: "center",
            padding: "0 12px",
            gap: 10,
            borderBottom: "1px solid var(--color-border)",
            cursor: "grab",
            userSelect: "none",
            flexShrink: 0,
            touchAction: "none",
            background: isFocused ? "transparent" : "rgba(0,0,0,0.04)",
          }}
        >
          <TrafficLights
            onClose={() => closeApp(app.id)}
            onMinimize={() => minimizeApp(app.id)}
            onZoom={handleZoom}
          />
          <span
            style={{
              flex: 1,
              textAlign: "center",
              fontFamily:
                app.id === "memory"
                  ? "var(--font-mono)"
                  : "var(--font-ui)",
              fontSize: 13,
              fontWeight: 600,
              color: isFocused ? "var(--color-text)" : "var(--color-text-subtle)",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              marginRight: 52, // optical balance vs traffic lights
            }}
          >
            {app.name}
          </span>
        </div>

        <div style={{ flex: 1, overflowY: "auto", overscrollBehavior: "contain" }}>
          <Content />
        </div>

        {/* Resize handles — invisible strips on edges and corners */}
        {RESIZE_HANDLES.map((h) => (
          <div
            key={h.dir}
            onPointerDown={startResize(h.dir)}
            style={{
              position: "absolute",
              ...h.style,
              cursor: h.cursor,
              zIndex: 5,
              touchAction: "none",
            }}
          />
        ))}
      </motion.div>
    </motion.div>
  );
}

// Kicks the entrance animation once on mount (controls own the outer layer).
function WindowEntrance({ controls }: { controls: ReturnType<typeof useAnimationControls> }) {
  useEffect(() => {
    controls.start({
      opacity: 1,
      scale: 1,
      y: 0,
      x: 0,
      transition: { duration: 0.4, ease: EASE },
    });
  }, [controls]);
  return null;
}
