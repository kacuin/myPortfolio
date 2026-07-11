import { useEffect, useRef, useState } from "react";
import { AnimatePresence } from "motion/react";
import { ALL_APPS } from "./apps";
import { useWindowManager } from "./WindowManagerContext";
import { useIsMobile } from "./useIsMobile";
import { MenuBar } from "./MenuBar";
import { Dock } from "./Dock";
import { Window } from "./Window";
import { DesktopHero } from "../app/components/DesktopHero";
import { Wallpaper } from "./Wallpaper";
import { ContextMenu, type MenuPos } from "./ContextMenu";
import { Spotlight } from "./Spotlight";

function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (!glowRef.current) return;
      glowRef.current.style.left = `${e.clientX}px`;
      glowRef.current.style.top = `${e.clientY}px`;
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);
  return (
    <div
      ref={glowRef}
      style={{
        position: "fixed",
        width: 400,
        height: 400,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(79,110,247,0.10) 0%, transparent 70%)",
        transform: "translate(-50%, -50%)",
        pointerEvents: "none",
        zIndex: 0,
        transition: "left 0.08s ease, top 0.08s ease",
      }}
    />
  );
}

export function Desktop() {
  const { windows } = useWindowManager();
  const isMobile = useIsMobile();
  const [menuPos, setMenuPos] = useState<MenuPos>(null);

  let visibleApps = ALL_APPS.filter((app) => windows[app.id]?.open);
  if (isMobile) {
    // one sheet at a time: only the topmost non-minimized window
    const top = visibleApps
      .filter((app) => !windows[app.id]!.minimized)
      .sort((a, b) => windows[b.id]!.zIndex - windows[a.id]!.zIndex)[0];
    visibleApps = top ? [top] : [];
  }

  return (
    <div
      onContextMenu={(e) => {
        // only on the bare desktop — windows, dock, and menu bar keep the native menu
        if (e.target !== e.currentTarget || isMobile) return;
        e.preventDefault();
        setMenuPos({ x: e.clientX, y: e.clientY });
      }}
      style={{
        position: "fixed",
        inset: 0,
        overflow: "hidden",
        background:
          "radial-gradient(120% 90% at 75% 8%, var(--color-accent-dim) 0%, transparent 55%), radial-gradient(90% 70% at 10% 95%, var(--color-teal-dim) 0%, transparent 60%), var(--color-bg)",
        transition: "background 0.3s",
      }}
    >
      {/* Wallpaper layers */}
      <Wallpaper />
      <CursorGlow />
      <DesktopHero />

      {/* Windows layer */}
      <AnimatePresence>
        {visibleApps.map((app) => (
          <Window key={app.id} app={app} win={windows[app.id]!} />
        ))}
      </AnimatePresence>

      <MenuBar />
      <Dock />
      <ContextMenu pos={menuPos} onClose={() => setMenuPos(null)} />
      <Spotlight />
    </div>
  );
}
