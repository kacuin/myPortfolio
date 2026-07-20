import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Github, Linkedin, Search, Volume2, VolumeX } from "lucide-react";
import { isMuted, setMuted } from "./sounds";
import { APPS, appById } from "./apps";
import { useWindowManager } from "./WindowManagerContext";
import { useIsMobile } from "./useIsMobile";
import { ThemeToggle } from "../app/components/ThemeToggle";
import { Clock } from "./Clock";
import cvFile from "../assets/KC_Acuin_CV.pdf";

type MenuItem = { label: string; action?: () => void; disabled?: boolean };

import { EASE } from "./motion";

function Menu({
  label,
  items,
  openMenu,
  setOpenMenu,
  bold,
}: {
  label: string;
  items: MenuItem[];
  openMenu: string | null;
  setOpenMenu: (m: string | null) => void;
  bold?: boolean;
}) {
  const open = openMenu === label;
  return (
    <div style={{ position: "relative" }}>
      <button
        onClick={() => setOpenMenu(open ? null : label)}
        onMouseEnter={() => {
          // real macOS behavior: once a menu is open, hovering siblings switches menus
          if (openMenu && !open) setOpenMenu(label);
        }}
        style={{
          border: "none",
          background: open ? "var(--color-accent-dim)" : "transparent",
          color: "var(--color-text)",
          fontFamily: "var(--font-ui)",
          fontSize: 13,
          fontWeight: bold ? 700 : 500,
          padding: "3px 10px",
          borderRadius: 5,
          cursor: "default",
          whiteSpace: "nowrap",
        }}
      >
        {label}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.18, ease: EASE }}
            style={{
              position: "absolute",
              top: "calc(100% + 4px)",
              left: 0,
              minWidth: 200,
              background: "var(--window-bg)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              border: "1px solid var(--glass-border)",
              borderRadius: 10,
              boxShadow: "var(--window-shadow)",
              padding: 5,
              zIndex: 1200,
            }}
          >
            {items.map((item, i) =>
              item.label === "—" ? (
                <div
                  key={i}
                  style={{ height: 1, background: "var(--color-border)", margin: "4px 8px" }}
                />
              ) : (
                <button
                  key={i}
                  disabled={item.disabled}
                  onClick={() => {
                    item.action?.();
                    setOpenMenu(null);
                  }}
                  style={{
                    display: "block",
                    width: "100%",
                    textAlign: "left",
                    border: "none",
                    background: "transparent",
                    color: item.disabled ? "var(--color-text-subtle)" : "var(--color-text)",
                    fontFamily: "var(--font-sans)",
                    fontSize: 13,
                    padding: "6px 10px",
                    borderRadius: 6,
                    cursor: item.disabled ? "default" : "pointer",
                    whiteSpace: "nowrap",
                  }}
                  onMouseEnter={(e) => {
                    if (!item.disabled)
                      (e.currentTarget as HTMLElement).style.background = "var(--color-accent)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "transparent";
                  }}
                >
                  {item.label}
                </button>
              )
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const menuIconBtn: React.CSSProperties = {
  color: "var(--color-text)",
  display: "grid",
  placeItems: "center",
  width: 22,
  height: 22,
  borderRadius: 6,
  border: "none",
  background: "transparent",
  cursor: "pointer",
  padding: 0,
};

export function MenuBar() {
  const { focused, openApp, closeApp, minimizeAll, windows } = useWindowManager();
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [soundsMuted, setSoundsMuted] = useState(isMuted());
  const barRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  // click-away closes menus
  useEffect(() => {
    if (!openMenu) return;
    const onDown = (e: MouseEvent) => {
      if (barRef.current && !barRef.current.contains(e.target as Node)) setOpenMenu(null);
    };
    window.addEventListener("mousedown", onDown);
    return () => window.removeEventListener("mousedown", onDown);
  }, [openMenu]);

  const focusedApp = focused ? appById(focused) : null;
  const appTitle = focusedApp ? focusedApp.name : "Finder";

  const downloadCV = () => {
    const a = document.createElement("a");
    a.href = cvFile;
    a.download = "KC_Acuin_CV.pdf";
    a.click();
  };

  const iconLink = (href: string, label: string, icon: React.ReactNode) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      style={{
        color: "var(--color-text)",
        display: "grid",
        placeItems: "center",
        width: 22,
        height: 22,
        borderRadius: 6,
        transition: "background 0.15s",
      }}
      onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "var(--color-accent-dim)")}
      onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "transparent")}
    >
      {icon}
    </a>
  );

  return (
    <motion.div
      ref={barRef}
      initial={{ y: -32, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: EASE }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "var(--menubar-h)",
        zIndex: 900,
        display: "flex",
        alignItems: "center",
        gap: 2,
        padding: "0 12px",
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.06) 0%, transparent 100%), var(--glass-bg)",
        backdropFilter: "blur(28px) saturate(1.8)",
        WebkitBackdropFilter: "blur(28px) saturate(1.8)",
        borderBottom: "1px solid var(--glass-border)",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.12)",
      }}
    >
      <Menu
        label="KC"
        bold
        items={[
          { label: "About KC Acuin", action: () => openApp("about") },
          { label: "—" },
          { label: "Download CV…", action: downloadCV },
          { label: "—" },
          { label: "Hide All Windows", action: minimizeAll },
        ]}
        openMenu={openMenu}
        setOpenMenu={setOpenMenu}
      />
      <span
        style={{
          fontFamily: "var(--font-ui)",
          fontSize: 13,
          fontWeight: 700,
          color: "var(--color-text)",
          padding: "3px 10px",
          whiteSpace: "nowrap",
        }}
      >
        {appTitle}
      </span>
      {!isMobile && (
      <>
      <Menu
        label="File"
        items={[
          { label: "Download CV", action: downloadCV },
          { label: "New Message…", action: () => openApp("contact") },
          { label: "—" },
          {
            label: "Close Window",
            disabled: !focused,
            action: () => focused && closeApp(focused),
          },
        ]}
        openMenu={openMenu}
        setOpenMenu={setOpenMenu}
      />
      <Menu
        label="View"
        items={[
          { label: "Show Desktop", action: minimizeAll },
          { label: "—" },
          ...APPS.filter((a) => windows[a.id]?.open).map((a) => ({
            label: a.name,
            action: () => openApp(a.id),
          })),
        ]}
        openMenu={openMenu}
        setOpenMenu={setOpenMenu}
      />
      <Menu
        label="Go"
        items={APPS.map((a) => ({ label: a.name, action: () => openApp(a.id) }))}
        openMenu={openMenu}
        setOpenMenu={setOpenMenu}
      />
      </>
      )}

      <div style={{ flex: 1 }} />

      <div style={{ display: "flex", alignItems: "center", gap: isMobile ? 6 : 10 }}>
        {!isMobile && iconLink("https://github.com/kcacuin", "GitHub", <Github size={13} />)}
        {!isMobile && iconLink("https://linkedin.com/in/kcacuin", "LinkedIn", <Linkedin size={13} />)}
        {!isMobile && (
          <button
            onClick={() => window.dispatchEvent(new CustomEvent("kc:spotlight"))}
            aria-label="Spotlight search (⌘K)"
            title="Search (⌘K)"
            style={menuIconBtn}
          >
            <Search size={13} />
          </button>
        )}
        <button
          onClick={() => {
            setMuted(!soundsMuted);
            setSoundsMuted(!soundsMuted);
          }}
          aria-label={soundsMuted ? "Unmute UI sounds" : "Mute UI sounds"}
          title={soundsMuted ? "Sounds off" : "Sounds on"}
          style={menuIconBtn}
        >
          {soundsMuted ? <VolumeX size={13} /> : <Volume2 size={13} />}
        </button>
        <ThemeToggle />
        <Clock compact={isMobile} />
      </div>
    </motion.div>
  );
}
