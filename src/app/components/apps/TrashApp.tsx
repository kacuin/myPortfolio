import { Trash2, Undo2, StickyNote } from "lucide-react";
import { motion } from "motion/react";
import { useDesktopItems } from "../../../os/DesktopItemsContext";
import { EASE } from "./shared";

const wrapStyle: React.CSSProperties = {
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: 14,
  padding: 32,
  textAlign: "center",
};

export function TrashApp() {
  const { noteTrashed, restoreNote } = useDesktopItems();

  if (!noteTrashed) {
    return (
      <div style={wrapStyle}>
        <Trash2 size={40} color="var(--color-text-subtle)" strokeWidth={1.4} />
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 17,
            fontWeight: 600,
            color: "var(--color-text)",
          }}
        >
          Trash is empty
        </div>
        <div
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: 13.5,
            color: "var(--color-text-muted)",
            maxWidth: 300,
            lineHeight: 1.6,
          }}
        >
          I don't throw away good ideas — they end up in the vault instead.
        </div>
      </div>
    );
  }

  return (
    <div style={wrapStyle}>
      <motion.div
        initial={{ opacity: 0, y: 10, rotate: -6 }}
        animate={{ opacity: 1, y: 0, rotate: -2.5 }}
        transition={{ duration: 0.45, ease: EASE }}
        style={{
          width: 190,
          padding: "14px 16px",
          borderRadius: 3,
          background:
            "linear-gradient(160deg, color-mix(in srgb, var(--color-amber) 22%, var(--color-surface)), color-mix(in srgb, var(--color-amber) 11%, var(--color-surface)))",
          border: "1px solid color-mix(in srgb, var(--color-amber) 30%, transparent)",
          boxShadow: "0 10px 24px rgba(0,0,10,0.28)",
          textAlign: "left",
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 9,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--color-amber)",
            marginBottom: 7,
          }}
        >
          note to self
        </div>
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 13.5,
            lineHeight: 1.45,
            color: "var(--color-text)",
            fontVariationSettings: "'SOFT' 60, 'WONK' 1",
          }}
        >
          Ship it, then make it good. In that order.
        </div>
      </motion.div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 7,
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          letterSpacing: "0.08em",
          color: "var(--color-text-subtle)",
        }}
      >
        <StickyNote size={12} /> 1 item
      </div>

      <button
        onClick={restoreNote}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          marginTop: 2,
          padding: "9px 18px",
          borderRadius: 10,
          border: "1px solid var(--color-border)",
          background: "transparent",
          color: "var(--color-text)",
          fontFamily: "var(--font-ui)",
          fontSize: 13,
          fontWeight: 500,
          cursor: "pointer",
        }}
      >
        <Undo2 size={14} /> Put back
      </button>
    </div>
  );
}
