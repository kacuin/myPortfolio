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
import { StickyNote } from "./StickyNote";
import { Screensaver } from "./Screensaver";
import { useKonami } from "./useKonami";
import { celebrateBig } from "./confetti";
import { playSound } from "./sounds";

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
        background: "radial-gradient(circle, var(--color-accent-dim) 0%, transparent 70%)",
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
  const [partying, setPartying] = useState(false);

  // Held in a ref so re-triggering inside the window restarts the party rather
  // than letting the first timer cut the second one short.
  // Explicit undefined rather than a zero-arg useRef<T>(): the bare form is
  // fine on the installed @types/react 18, but is an error under React 19's.
  const partyTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useKonami(() => {
    celebrateBig();
    playSound("open");
    setPartying(true);
    clearTimeout(partyTimer.current);
    partyTimer.current = setTimeout(() => setPartying(false), 6000);
  });

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
        // Konami payoff: re-point the wallpaper blob tokens for a few seconds.
        // Scoped here so it colors the wallpaper without tinting any text.
        ...(partying
          ? ({
              "--wall-blob-1": "rgba(255, 74, 138, 0.40)",
              "--wall-blob-2": "rgba(124, 92, 252, 0.36)",
              "--wall-blob-3": "rgba(100, 255, 218, 0.26)",
              "--wall-blob-4": "rgba(245, 166, 35, 0.24)",
            } as React.CSSProperties)
          : null),
      }}
    >
      {/* Wallpaper layers */}
      <Wallpaper />
      {/* Tracks the mouse, so on a touch device it is a fixed layer that can
          never do anything. */}
      {!isMobile && <CursorGlow />}
      <DesktopHero />
      <StickyNote />

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
      <Screensaver />
    </div>
  );
}
