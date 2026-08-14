import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, AppWindow, Rocket, Layers, Zap, Sparkles } from "lucide-react";
import { celebrate, celebrateBig } from "./confetti";
import { APPS, type AppId } from "./apps";
import { useWindowManager } from "./WindowManagerContext";
import { useTheme } from "../context/ThemeContext";
import cvFile from "../assets/KC_Acuin_CV.pdf";

import { EASE } from "./motion";

type Entry = {
  title: string;
  subtitle: string;
  kind: "app" | "project" | "skill" | "action" | "egg";
  keywords: string;
  run: () => void;
};

/** Subsequence fuzzy match; higher score = better. -1 = no match. */
function fuzzyScore(query: string, target: string): number {
  const q = query.toLowerCase();
  const t = target.toLowerCase();
  if (!q) return 0;
  if (t.startsWith(q)) return 1000 - t.length;
  const wordStart = t.split(/[\s·—-]+/).some((w) => w.startsWith(q));
  if (wordStart) return 800 - t.length;
  if (t.includes(q)) return 600 - t.indexOf(q);
  // subsequence
  let ti = 0;
  let score = 0;
  for (const ch of q) {
    const found = t.indexOf(ch, ti);
    if (found === -1) return -1;
    score += found === ti ? 4 : 1; // consecutive letters score higher
    ti = found + 1;
  }
  return score;
}

// Client work is under NDA — these mirror the anonymized titles in ProjectsApp.
const PROJECT_NAMES = [
  "Service Booking Platform",
  "Quorfin",
  "Membership Privileges App",
  "Livestock Field App",
  "Resident Services App",
  "Lending Management System",
  "Procurement Tracker",
];

const SKILL_NAMES = [
  "Flutter",
  "React Native",
  "Swift",
  "Kotlin",
  "Laravel",
  "Firebase",
  "TypeScript",
  "AI Workflows",
];

const kindIcon = {
  app: AppWindow,
  project: Rocket,
  skill: Layers,
  action: Zap,
  egg: Sparkles,
} as const;

export function Spotlight() {
  const { openApp, minimizeAll } = useWindowManager();
  const { toggle } = useTheme();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const entries = useMemo<Entry[]>(() => {
    const openIt = (id: AppId) => () => openApp(id);
    return [
      ...APPS.map((a) => ({
        title: a.name,
        subtitle: "Application",
        kind: "app" as const,
        keywords: a.id,
        run: openIt(a.id),
      })),
      ...PROJECT_NAMES.map((p) => ({
        title: p,
        subtitle: "Project: open in Projects",
        kind: "project" as const,
        keywords: "project work shipped",
        run: openIt("projects"),
      })),
      ...SKILL_NAMES.map((s) => ({
        title: s,
        subtitle: "Skill: open Skills & Stack",
        kind: "skill" as const,
        keywords: "skill stack tech",
        run: openIt("skills"),
      })),
      {
        title: "Download CV",
        subtitle: "Action",
        kind: "action" as const,
        keywords: "resume pdf download",
        run: () => {
          const a = document.createElement("a");
          a.href = cvFile;
          a.download = "KC_Acuin_CV.pdf";
          a.click();
        },
      },
      {
        title: "Toggle Theme",
        subtitle: "Action",
        kind: "action" as const,
        keywords: "dark light mode appearance",
        run: toggle,
      },
      {
        title: "Show Desktop",
        subtitle: "Action",
        kind: "action" as const,
        keywords: "minimize all windows",
        run: minimizeAll,
      },

      // Eggs. Filtered out of the default list below, so they only surface for
      // someone who actually types the thing.
      {
        title: "confetti",
        subtitle: "Why not",
        kind: "egg" as const,
        keywords: "party celebrate fun",
        run: () => celebrate({ x: 0.5, y: 0.6 }),
      },
      {
        title: "whoami",
        subtitle: "kc: mobile dev, team lead, Philippines",
        kind: "egg" as const,
        keywords: "who am i identity about",
        run: openIt("about"),
      },
      {
        title: "sudo make me a sandwich",
        subtitle: "Okay.",
        kind: "egg" as const,
        keywords: "xkcd sudo sandwich",
        run: celebrateBig,
      },
    ];
  }, [openApp, minimizeAll, toggle]);

  const results = useMemo(() => {
    if (!query.trim()) return entries.filter((e) => e.kind !== "egg").slice(0, 8);
    return entries
      .map((e) => ({
        e,
        score: Math.max(fuzzyScore(query, e.title), fuzzyScore(query, e.keywords) - 200),
      }))
      .filter((r) => r.score >= 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 8)
      .map((r) => r.e);
  }, [query, entries]);

  // Global shortcuts: ⌘K / Ctrl+K opens, menu-bar button fires kc:spotlight
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("kc:spotlight", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("kc:spotlight", onOpen);
    };
  }, []);

  useEffect(() => {
    if (open) {
      setQuery("");
      setSelected(0);
      // focus after the entrance animation mounts the input
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  useEffect(() => setSelected(0), [query]);

  const runEntry = (e: Entry) => {
    setOpen(false);
    e.run();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          onClick={() => setOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1100,
            background: "rgba(0,0,10,0.25)",
            display: "flex",
            justifyContent: "center",
            paddingTop: "18vh",
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: -6 }}
            transition={{ duration: 0.18, ease: EASE }}
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "min(560px, calc(100vw - 32px))",
              alignSelf: "flex-start",
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.07) 0%, transparent 100%), var(--glass-bg)",
              backdropFilter: "blur(28px) saturate(1.8)",
              WebkitBackdropFilter: "blur(28px) saturate(1.8)",
              border: "1px solid var(--glass-border)",
              borderRadius: 14,
              boxShadow:
                "inset 0 1px 0 rgba(255,255,255,0.15), 0 32px 90px rgba(0,0,10,0.45)",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "14px 16px",
                borderBottom: results.length ? "1px solid var(--color-border)" : "none",
              }}
            >
              <Search size={18} color="var(--color-text-muted)" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "ArrowDown") {
                    e.preventDefault();
                    setSelected((s) => Math.min(s + 1, results.length - 1));
                  } else if (e.key === "ArrowUp") {
                    e.preventDefault();
                    setSelected((s) => Math.max(s - 1, 0));
                  } else if (e.key === "Enter" && results[selected]) {
                    runEntry(results[selected]);
                  } else if (e.key === "Escape") {
                    setOpen(false);
                  }
                }}
                placeholder="Search apps, projects, skills…"
                style={{
                  flex: 1,
                  border: "none",
                  outline: "none",
                  background: "transparent",
                  color: "var(--color-text)",
                  fontFamily: "var(--font-ui)",
                  fontSize: 17,
                }}
              />
              <kbd
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 10.5,
                  color: "var(--color-text-subtle)",
                  border: "1px solid var(--color-border)",
                  borderRadius: 5,
                  padding: "2px 6px",
                }}
              >
                esc
              </kbd>
            </div>

            {results.length > 0 && (
              <div style={{ padding: 6, maxHeight: 320, overflowY: "auto" }}>
                {results.map((r, i) => {
                  const Icon = kindIcon[r.kind];
                  const active = i === selected;
                  return (
                    <div
                      key={`${r.kind}-${r.title}`}
                      onClick={() => runEntry(r)}
                      onMouseEnter={() => setSelected(i)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        padding: "8px 10px",
                        borderRadius: 8,
                        cursor: "pointer",
                        background: active ? "var(--color-accent)" : "transparent",
                      }}
                    >
                      <div
                        style={{
                          width: 30,
                          height: 30,
                          borderRadius: 8,
                          display: "grid",
                          placeItems: "center",
                          background: active ? "rgba(255,255,255,0.18)" : "var(--color-accent-dim)",
                          color: active ? "#fff" : "var(--color-accent)",
                          flexShrink: 0,
                        }}
                      >
                        <Icon size={15} />
                      </div>
                      <div style={{ minWidth: 0 }}>
                        <div
                          style={{
                            fontFamily: "var(--font-ui)",
                            fontSize: 14,
                            fontWeight: 600,
                            color: active ? "#fff" : "var(--color-text)",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {r.title}
                        </div>
                        <div
                          style={{
                            fontSize: 11.5,
                            color: active ? "rgba(255,255,255,0.75)" : "var(--color-text-subtle)",
                          }}
                        >
                          {r.subtitle}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
