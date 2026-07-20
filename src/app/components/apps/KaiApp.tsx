import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, SendHorizontal } from "lucide-react";
import { playSound } from "../../../os/sounds";
import { EASE } from "./shared";

type Msg = { role: "user" | "assistant"; content: string };

const SUGGESTIONS = [
  "What does KC build?",
  "What's his mobile stack?",
  "How does KC use AI at work?",
  "How do I contact KC?",
];

/** Friendly local responder for when /api/chat isn't reachable (e.g. npm run dev). */
function offlineReply(q: string): string {
  const t = q.toLowerCase();
  let a: string;
  if (t.includes("contact") || t.includes("email") || t.includes("hire"))
    a = "You can reach KC at wkcacuin@gmail.com, or find him on GitHub (kcacuin) and LinkedIn (in/kcacuin). The Contact app in the dock has everything, including his CV.";
  else if (t.includes("stack") || t.includes("mobile") || t.includes("flutter"))
    a = "KC works across Flutter/Dart, React Native (Expo), native iOS (Swift/UIKit), native Android (Kotlin), and Laravel on the backend — with Firebase, CI/CD via GitHub Actions and EAS, and clean architecture throughout.";
  else if (t.includes("ai") || t.includes("workflow"))
    a = "KC pairs with AI agents end-to-end — planning, coding, and verification. It cut his debugging time by ~70% and brought team releases from a week down to about 4 days.";
  else if (t.includes("build") || t.includes("project") || t.includes("work"))
    a = "KC ships production mobile and web apps — Flutter and React Native apps live on the App Store and Google Play, native iOS and Android work, and Laravel systems. Client engagements are under NDA, so the Projects app describes them without naming clients.";
  else
    a = "I'm KAI, KC's AI. I can tell you about his projects, stack, experience at Odecci Solutions, or how to reach him — try asking about any of those, or open the Projects app from the dock.";
  return `(offline mode) ${a}`;
}

async function streamChat(
  messages: Msg[],
  onToken: (full: string) => void
): Promise<string> {
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages: messages.slice(-12) }),
  });
  if (!res.ok || !res.body) {
    const err = await res.json().catch(() => null);
    throw new Error(err?.error ?? `HTTP ${res.status}`);
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let full = "";

  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop() ?? "";
    for (const line of lines) {
      const data = line.replace(/^data:\s*/, "").trim();
      if (!data || data === "[DONE]") continue;
      try {
        const delta = JSON.parse(data)?.choices?.[0]?.delta?.content;
        if (delta) {
          full += delta;
          onToken(full);
        }
      } catch {
        // partial/keepalive line — ignore
      }
    }
  }
  return full;
}

function Bubble({ msg }: { msg: Msg }) {
  const isUser = msg.role === "user";
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: EASE }}
      style={{
        display: "flex",
        justifyContent: isUser ? "flex-end" : "flex-start",
      }}
    >
      <div
        style={{
          maxWidth: "82%",
          padding: "9px 14px",
          borderRadius: isUser ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
          background: isUser ? "var(--color-accent)" : "var(--color-surface)",
          border: isUser ? "none" : "1px solid var(--color-border)",
          color: isUser ? "#fff" : "var(--color-text)",
          fontSize: 14,
          lineHeight: 1.65,
          whiteSpace: "pre-wrap",
          wordBreak: "break-word",
        }}
      >
        {msg.content}
      </div>
    </motion.div>
  );
}

function TypingDots() {
  return (
    <div style={{ display: "flex", gap: 4, padding: "12px 14px" }}>
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          animate={{ opacity: [0.25, 1, 0.25] }}
          transition={{ repeat: Infinity, duration: 1.1, delay: i * 0.18 }}
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: "var(--color-text-muted)",
          }}
        />
      ))}
    </div>
  );
}

export function KaiApp() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, busy]);

  const send = async (text: string) => {
    const content = text.trim();
    if (!content || busy) return;
    playSound("send");
    const history: Msg[] = [...messages, { role: "user", content }];
    setMessages(history);
    setInput("");
    setBusy(true);

    try {
      let streamed = false;
      await streamChat(history, (full) => {
        streamed = true;
        setMessages([...history, { role: "assistant", content: full }]);
      });
      if (!streamed) throw new Error("empty response");
    } catch {
      setMessages([...history, { role: "assistant", content: offlineReply(content) }]);
    } finally {
      setBusy(false);
      playSound("receive");
    }
  };

  const showTyping = busy && messages[messages.length - 1]?.role === "user";

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Header strip */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "14px 20px",
          borderBottom: "1px solid var(--color-border)",
          flexShrink: 0,
        }}
      >
        <div
          style={{
            width: 38,
            height: 38,
            borderRadius: 11,
            background: "linear-gradient(145deg, #7C5CFC, #4F6EF7)",
            display: "grid",
            placeItems: "center",
            color: "#fff",
            boxShadow: "0 4px 14px rgba(124,92,252,0.35)",
          }}
        >
          <Sparkles size={19} />
        </div>
        <div>
          <div
            style={{
              // KAI is a name, so it gets the serif even here in the app bar.
              fontFamily: "var(--font-display)",
              fontSize: 16,
              fontWeight: 600,
              color: "var(--color-text)",
            }}
          >
            KAI
          </div>
          <div
            style={{
              fontSize: 11.5,
              color: "var(--color-text-muted)",
              display: "flex",
              alignItems: "center",
              gap: 5,
            }}
          >
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: "#28C840",
                display: "inline-block",
              }}
            />
            KC's AI — ask me anything about him
          </div>
        </div>
      </div>

      {/* Messages */}
      <div
        ref={scrollRef}
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "18px 20px",
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        {messages.length === 0 && (
          <div style={{ margin: "auto 0", textAlign: "center" }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: EASE }}
              style={{
                width: 60,
                height: 60,
                borderRadius: 18,
                margin: "0 auto 14px",
                background: "linear-gradient(145deg, #7C5CFC, #4F6EF7)",
                display: "grid",
                placeItems: "center",
                color: "#fff",
                boxShadow: "0 10px 30px rgba(124,92,252,0.4)",
              }}
            >
              <Sparkles size={28} />
            </motion.div>
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 19,
                fontWeight: 600,
                letterSpacing: "-0.01em",
                color: "var(--color-text)",
                marginBottom: 6,
              }}
            >
              Hi, I'm KAI — KC's AI.
            </div>
            <p style={{ fontSize: 13, color: "var(--color-text-muted)", marginBottom: 18 }}>
              Ask me about KC's projects, stack, or how to reach him.
            </p>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 8,
                justifyContent: "center",
              }}
            >
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => void send(s)}
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 11.5,
                    color: "var(--color-accent)",
                    background: "var(--color-accent-dim)",
                    border: "1px solid rgba(124,92,252,0.25)",
                    padding: "6px 13px",
                    borderRadius: 100,
                    cursor: "pointer",
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((m, i) => (
          <Bubble key={i} msg={m} />
        ))}
        <AnimatePresence>
          {showTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                alignSelf: "flex-start",
                background: "var(--color-surface)",
                border: "1px solid var(--color-border)",
                borderRadius: "16px 16px 16px 4px",
              }}
            >
              <TypingDots />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Composer */}
      <div
        style={{
          display: "flex",
          gap: 10,
          padding: "14px 16px",
          borderTop: "1px solid var(--color-border)",
          flexShrink: 0,
        }}
      >
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              void send(input);
            }
          }}
          placeholder="Message KAI…"
          rows={1}
          style={{
            flex: 1,
            resize: "none",
            border: "1px solid var(--color-border)",
            borderRadius: 12,
            background: "var(--color-input-bg)",
            color: "var(--color-text)",
            fontFamily: "var(--font-sans)",
            fontSize: 14,
            padding: "10px 14px",
            outline: "none",
            lineHeight: 1.5,
            maxHeight: 96,
          }}
        />
        <button
          onClick={() => void send(input)}
          disabled={busy || !input.trim()}
          aria-label="Send"
          style={{
            width: 42,
            height: 42,
            borderRadius: 12,
            border: "none",
            background:
              busy || !input.trim()
                ? "var(--color-surface)"
                : "linear-gradient(145deg, #7C5CFC, #4F6EF7)",
            color: busy || !input.trim() ? "var(--color-text-subtle)" : "#fff",
            display: "grid",
            placeItems: "center",
            cursor: busy || !input.trim() ? "default" : "pointer",
            alignSelf: "flex-end",
            transition: "background 0.2s",
          }}
        >
          <SendHorizontal size={17} />
        </button>
      </div>
    </div>
  );
}
