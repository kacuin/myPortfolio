import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";

type Line = { text: string; kind: "cmd" | "head" | "body" | "blank" | "teal" };

const cmd = (text: string): Line => ({ text, kind: "cmd" });
const head = (text: string): Line => ({ text, kind: "head" });
const body = (text: string): Line => ({ text, kind: "body" });
const teal = (text: string): Line => ({ text, kind: "teal" });
const blank = (): Line => ({ text: "", kind: "blank" });

// Written by the AI itself — a first-person memory of working with KC.
const LINES: Line[] = [
  cmd("whoami"),
  body("claude: KC's AI pair programmer"),
  blank(),
  cmd("cat memory/who-is-kc.md"),
  head("# Who I'm working with"),
  body("KC Acuin. Tech Lead at Odecci Solutions, Caloocan PH."),
  body("Intern to Tech Lead in three years, same company,"),
  body("promoted on shipped features, not tenure."),
  body("Flutter, Swift, Kotlin, React Native, Laravel. Preaches"),
  body("on weekends; explains architecture like a sermon: clearly."),
  blank(),
  cmd("cat memory/quorfin.md"),
  head("# Quorfin: the 14-wave build"),
  body("An offline-first Flutter finance app we built together in"),
  body("14 structured waves: Isar + Riverpod foundation, budgeting,"),
  body("recurring transactions, goals, exports, notifications…"),
  teal("wave 7: encrypted backups (PBKDF2 + AES-GCM)"),
  teal("wave 8: field-level encryption when Isar OSS had none"),
  body("He verifies package APIs before promising features now."),
  body("We learned that one the hard way."),
  blank(),
  cmd("cat memory/ios-chat.md"),
  head("# iOS war stories"),
  body("Native Swift/UIKit chat. Images rendered blank for days:"),
  body("the SDWebImage callback was discarding its error param."),
  body("Root cause: a client/server contract mismatch in how message"),
  body("text and file URLs travel. KC's rule since: never swallow"),
  body("an error parameter. Ever."),
  blank(),
  cmd("cat memory/how-he-works.md"),
  head("# How KC works"),
  body("Wave-based delivery. ADRs for decisions. A persistent"),
  body("vault of learnings so no lesson is paid for twice."),
  body("Verification before 'done': a green build is not proof."),
  teal("262-case regression suite: 16 modules, 2 platforms"),
  teal("5 production apps on the App Store & Google Play"),
  teal("99 of 102 support tickets resolved in 7 months"),
  teal("4 engineers led as Tech Lead"),
  blank(),
  cmd("cat memory/verdict.md"),
  body("Ships fast, owns systems, remembers everything."),
  body("Hire him before someone else's AI writes this file."),
];

const PROMPT = "claude@kc-portfolio ~ %";

export function MemoryApp() {
  const [count, setCount] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const done = count >= LINES.length;

  useEffect(() => {
    if (done) return;
    const next = LINES[count];
    // commands "type" slower; output streams fast
    const delay = next.kind === "cmd" ? 420 : next.kind === "blank" ? 90 : 130;
    const t = setTimeout(() => setCount((c) => c + 1), delay);
    return () => clearTimeout(t);
  }, [count, done]);

  // follow the output
  useEffect(() => {
    const el = scrollRef.current?.parentElement;
    if (el) el.scrollTop = el.scrollHeight;
  }, [count]);

  const color = (kind: Line["kind"]) =>
    kind === "head"
      ? "#F0F4FF"
      : kind === "teal"
        ? "#64FFDA"
        : "#8892B0";

  return (
    <div
      ref={scrollRef}
      style={{
        minHeight: "100%",
        // Deliberately opts out of the theme system: a terminal is a terminal in
        // both themes, and a light-mode terminal reads as a bug. The hex values
        // below are the dark tokens inlined for that reason, not an oversight.
        background: "rgba(5, 8, 18, 0.88)",
        padding: "18px 20px 24px",
        fontFamily: "var(--font-mono)",
        // Lines run to ~66 characters and must not overflow the window on a
        // phone, so the size floors below the desktop 12.5px.
        fontSize: "clamp(10.5px, 3vw, 12.5px)",
        lineHeight: 1.75,
        overflowWrap: "anywhere",
      }}
    >
      <div style={{ color: "#4A5578", marginBottom: 10 }}>
        Last login: {new Date().toDateString()} on ttys001, memory bank mounted
      </div>

      {LINES.slice(0, count).map((line, i) =>
        line.kind === "cmd" ? (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.15 }}
            style={{ marginTop: i === 0 ? 0 : 4 }}
          >
            <span style={{ color: "#64FFDA" }}>{PROMPT}</span>{" "}
            <span style={{ color: "#F0F4FF" }}>{line.text}</span>
          </motion.div>
        ) : line.kind === "blank" ? (
          <div key={i} style={{ height: "0.9em" }} />
        ) : (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.12 }}
            style={{
              color: color(line.kind),
              fontWeight: line.kind === "head" ? 600 : 400,
            }}
          >
            {line.text}
          </motion.div>
        )
      )}

      {/* prompt + blinking block cursor */}
      <div style={{ marginTop: 6 }}>
        <span style={{ color: "#64FFDA" }}>{PROMPT}</span>{" "}
        <span
          style={{
            display: "inline-block",
            width: 8,
            height: "1.05em",
            verticalAlign: "text-bottom",
            background: "#64FFDA",
            animation: "blink 1s step-end infinite",
          }}
        />
      </div>
    </div>
  );
}
