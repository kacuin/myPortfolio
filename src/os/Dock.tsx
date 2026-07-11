import { motion, useMotionValue } from "motion/react";
import { FileDown, Trash2, House } from "lucide-react";
import { APPS, type AppId } from "./apps";
import { DockIcon } from "./DockIcon";
import { useWindowManager } from "./WindowManagerContext";
import { useIsMobile } from "./useIsMobile";
import cvFile from "../assets/KC_Acuin_CV.pdf";

const EASE = [0.16, 1, 0.3, 1] as const;

function Separator() {
  return (
    <div
      style={{
        width: 1,
        alignSelf: "stretch",
        margin: "6px 4px",
        background: "var(--glass-border)",
        flexShrink: 0,
      }}
    />
  );
}

// Icons scale with the tile, like real macOS dock icons.
const iconBox = (child: React.ReactNode) => (
  <div style={{ width: "52%", height: "52%", display: "grid", placeItems: "center" }}>
    {child}
  </div>
);

export function Dock() {
  const { windows, openApp, minimizeAll, markLaunched, iconRefs } = useWindowManager();
  const isMobile = useIsMobile();
  const mouseX = useMotionValue(Infinity);

  const registerRef = (id: AppId) => (el: HTMLElement | null) => {
    iconRefs.current[id] = el;
  };

  return (
    <motion.div
      initial={{ y: 90, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.25, duration: 0.7, ease: EASE }}
      style={
        isMobile
          ? {
              position: "fixed",
              bottom: 10,
              left: 8,
              right: 8,
              zIndex: 1000,
              display: "flex",
              justifyContent: "center",
            }
          : {
              position: "fixed",
              bottom: 10,
              left: "calc(50% - 290px)",
              zIndex: 1000,
              maxWidth: "calc(100vw - 16px)",
            }
      }
    >
      <div
        onMouseMove={isMobile ? undefined : (e) => mouseX.set(e.pageX)}
        onMouseLeave={isMobile ? undefined : () => mouseX.set(Infinity)}
        style={{
          display: "flex",
          alignItems: "flex-end",
          gap: isMobile ? 8 : 10,
          padding: isMobile ? "8px 10px" : "9px 12px",
          borderRadius: 22,
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.09) 0%, rgba(255,255,255,0.02) 45%, transparent 100%), var(--glass-bg)",
          backdropFilter: "blur(28px) saturate(1.8)",
          WebkitBackdropFilter: "blur(28px) saturate(1.8)",
          border: "1px solid var(--glass-border)",
          boxShadow:
            "inset 0 1px 0 rgba(255,255,255,0.18), inset 0 0 0 0.5px rgba(255,255,255,0.06), 0 16px 50px rgba(0,0,10,0.35)",
          overflowX: isMobile ? "auto" : "visible",
          maxWidth: "100%",
        }}
      >
        <DockIcon
          mouseX={mouseX}
          label="Show Desktop"
          gradient={["#5B7CFA", "#2E4BD8"]}
          onClick={minimizeAll}
          isMobile={isMobile}
        >
          {iconBox(<House size="100%" strokeWidth={1.7} />)}
        </DockIcon>

        {APPS.map((app) => {
          const win = windows[app.id];
          return (
            <DockIcon
              key={app.id}
              mouseX={mouseX}
              label={app.name}
              gradient={app.tint}
              running={win?.open}
              launching={win?.launching}
              onLaunched={() => markLaunched(app.id)}
              onClick={() => openApp(app.id)}
              isMobile={isMobile}
              registerRef={registerRef(app.id)}
            >
              {iconBox(<app.icon size="100%" strokeWidth={1.7} />)}
            </DockIcon>
          );
        })}

        <Separator />

        <DockIcon
          mouseX={mouseX}
          label="Download CV"
          gradient={["#8892B0", "#4A5578"]}
          onClick={() => {
            const a = document.createElement("a");
            a.href = cvFile;
            a.download = "KC_Acuin_CV.pdf";
            a.click();
          }}
          isMobile={isMobile}
        >
          {iconBox(<FileDown size="100%" strokeWidth={1.7} />)}
        </DockIcon>

        <Separator />

        <DockIcon
          mouseX={mouseX}
          label="Trash"
          gradient={["#3A4568", "#232C4A"]}
          running={windows.trash?.open}
          launching={windows.trash?.launching}
          onLaunched={() => markLaunched("trash")}
          onClick={() => openApp("trash")}
          isMobile={isMobile}
          registerRef={registerRef("trash")}
        >
          {iconBox(<Trash2 size="100%" strokeWidth={1.7} />)}
        </DockIcon>
      </div>
    </motion.div>
  );
}
