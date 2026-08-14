import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, type PanInfo } from "motion/react";
import { useWindowManager } from "./WindowManagerContext";
import { useDesktopItems } from "./DesktopItemsContext";
import { useIsMobile } from "./useIsMobile";
import { playSound } from "./sounds";
import { EASE } from "./motion";

const POS_KEY = "kc-note-pos";

function loadPos(): { x: number; y: number } {
  try {
    const raw = localStorage.getItem(POS_KEY);
    if (raw) {
      // JSON.parse returns any — a stored "null" or a hand-edited value would
      // otherwise sail through and blow up on `.x` at the call site.
      const p: unknown = JSON.parse(raw);
      if (
        typeof p === "object" &&
        p !== null &&
        typeof (p as { x: unknown }).x === "number" &&
        typeof (p as { y: unknown }).y === "number"
      ) {
        return p as { x: number; y: number };
      }
    }
  } catch {
    /* fall through to default */
  }
  return { x: 0, y: 0 };
}

/**
 * A Post-it left on the desktop. Draggable, position remembered, and droppable
 * onto the Trash icon in the dock (which then actually has something in it).
 */
export function StickyNote() {
  const isMobile = useIsMobile();
  const { iconRefs } = useWindowManager();
  const { noteTrashed, trashNote } = useDesktopItems();
  const [pos] = useState(loadPos);
  const [overTrash, setOverTrash] = useState(false);
  // The offset has to live in explicit motion values we own — reading it back
  // off info.point would give a pointer page coordinate, not the note's offset.
  const x = useMotionValue(pos.x);
  const y = useMotionValue(pos.y);
  const noteRef = useRef<HTMLDivElement>(null);

  /**
   * Nudge the note back until a grabbable strip of it is on screen. Without
   * this, dragging it off an edge (or reloading at a smaller window size)
   * strands it permanently — the only way to reset it is to grab it, which is
   * exactly what's no longer possible.
   */
  const clampIntoView = () => {
    const el = noteRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const edge = 40; // floor on the inner measuring box, so a little more of the note than this
    let dx = 0;
    let dy = 0;
    if (r.right < edge) dx = edge - r.right;
    else if (r.left > window.innerWidth - edge) dx = window.innerWidth - edge - r.left;
    if (r.bottom < edge) dy = edge - r.bottom;
    else if (r.top > window.innerHeight - edge) dy = window.innerHeight - edge - r.top;
    if (dx) x.set(x.get() + dx);
    if (dy) y.set(y.get() + dy);
  };

  // These motion values outlive the note's exit animation (the offset lives on
  // this component, not the animated child), so without this a restored note
  // reappears sitting on top of the dock where it was dropped.
  useEffect(() => {
    if (noteTrashed) return;
    const home = loadPos();
    x.set(home.x);
    y.set(home.y);
  }, [noteTrashed, x, y]);

  // Also runs on mount, catching a position saved at a larger window size.
  // The dep array matters: without it this re-registers the listener and
  // schedules a fresh clamp on every render, which can yank the note mid-drag.
  // clampIntoView only closes over stable motion values and a ref, so pinning
  // it to noteTrashed is safe.
  useEffect(() => {
    if (noteTrashed) return;
    const id = requestAnimationFrame(clampIntoView);
    window.addEventListener("resize", clampIntoView);
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("resize", clampIntoView);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [noteTrashed]);

  // The note competes with the hero for space on a phone, and there is no
  // meaningful "desktop surface" to leave it on there.
  if (isMobile) return null;

  const pointerOverTrash = (info: PanInfo) => {
    const el = iconRefs.current.trash;
    if (!el) return false;
    const r = el.getBoundingClientRect();
    const { x, y } = info.point;
    return x >= r.left && x <= r.right && y >= r.top && y <= r.bottom;
  };

  return (
    <AnimatePresence>
      {!noteTrashed && (
        <motion.div
          drag
          dragMomentum={false}
          onDrag={(_, info) => setOverTrash(pointerOverTrash(info))}
          onDragEnd={(_, info) => {
            // Must clear before the early return: this component stays mounted
            // through the exit animation, so a stale `true` makes the restored
            // note re-enter stuck in the shrunken "over trash" pose.
            setOverTrash(false);
            if (pointerOverTrash(info)) {
              playSound("dock");
              trashNote();
              return;
            }
            clampIntoView();
            try {
              localStorage.setItem(POS_KEY, JSON.stringify({ x: x.get(), y: y.get() }));
            } catch {
              /* non-fatal */
            }
          }}
          initial={{ opacity: 0, scale: 0.9, rotate: -2.5 }}
          animate={{
            opacity: 1,
            scale: overTrash ? 0.88 : 1,
            rotate: overTrash ? -8 : -2.5,
          }}
          exit={{ opacity: 0, scale: 0.3, rotate: -18, transition: { duration: 0.32 } }}
          transition={{ duration: 0.5, ease: EASE }}
          whileHover={{ rotate: -1, scale: 1.02 }}
          whileDrag={{ scale: 1.05, rotate: 1, cursor: "grabbing" }}
          className="sticky-note"
          style={{
            // Default position lives in theme.css: the note sits in the left
            // gutter beside the hero, and that gutter closes below ~1300px, so
            // it needs a breakpoint rather than one fixed percentage.
            position: "absolute",
            x,
            y,
            zIndex: 2,
            padding: "16px 18px 18px",
            borderRadius: 3,
            cursor: "grab",
            // Paper, not glass — it should read as a physical object resting on
            // the desktop rather than another piece of system chrome.
            background:
              "linear-gradient(160deg, color-mix(in srgb, var(--color-amber) 26%, var(--color-surface)), color-mix(in srgb, var(--color-amber) 14%, var(--color-surface)))",
            border: "1px solid color-mix(in srgb, var(--color-amber) 34%, transparent)",
            boxShadow:
              "0 14px 32px rgba(0,0,10,0.34), inset 0 1px 0 rgba(255,255,255,0.18)",
            color: "var(--color-text)",
            userSelect: "none",
          }}
        >
          {/* The measuring ref lives here rather than on the motion.div above:
              a ref on an AnimatePresence child trips motion's PopChild wrapper
              into React's "`ref` is not a prop" warning. This inner box
              inherits the parent's drag transform, so its rect tracks the note
              (inset by the padding, which the 40px clamp margin absorbs). */}
          <div ref={noteRef}>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 9.5,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--color-amber)",
                marginBottom: 9,
              }}
            >
              note to self
            </div>
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 15,
                lineHeight: 1.45,
                fontWeight: 400,
                fontVariationSettings: "'SOFT' 60, 'WONK' 1",
              }}
            >
              Ship it, then make it good. In that order.
            </div>
            <div
              style={{
                marginTop: 12,
                fontFamily: "var(--font-mono)",
                fontSize: 9.5,
                color: "var(--color-text-subtle)",
              }}
            >
              drag me
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
