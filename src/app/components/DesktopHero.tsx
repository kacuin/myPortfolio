import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { ArrowDown, ArrowRight } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { useWindowManager } from "../../os/WindowManagerContext";
import meDayImage from "../../assets/me_day.webp";
import meNightImage from "../../assets/me_night.webp";
import { PROFILE } from "../../content/profile";

import { EASE } from "../../os/motion";

// Shared with the crawlable fallback so indexed copy matches what's on screen.
const phrases = PROFILE.heroPhrases as readonly string[];

const longestPhrase = phrases.reduce((a, b) => (b.length > a.length ? b : a));

/** The three strongest lines from PROFILE.metrics, split so the number can carry
 *  its own weight. Keep in sync with that list rather than inventing figures. */
const PROOF = [
  { value: "6,878", label: "active users" },
  { value: "5", label: "apps shipped" },
  { value: "3+", label: "years in production" },
] as const;

function useTypewriter(items: readonly string[]) {
  const [text, setText] = useState("");
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [charIdx, setCharIdx] = useState(0);

  useEffect(() => {
    const phrase = items[phraseIdx];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting) {
      if (charIdx < phrase.length) {
        timeout = setTimeout(() => {
          setText(phrase.slice(0, charIdx + 1));
          setCharIdx((c) => c + 1);
        }, 70);
      } else {
        timeout = setTimeout(() => setDeleting(true), 1800);
      }
    } else {
      if (charIdx > 0) {
        timeout = setTimeout(() => {
          setText(phrase.slice(0, charIdx - 1));
          setCharIdx((c) => c - 1);
        }, 40);
      } else {
        setDeleting(false);
        setPhraseIdx((p) => (p + 1) % items.length);
      }
    }
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, phraseIdx, items]);

  return text;
}

/** Wallpaper identity card — the "desktop background" of the portfolio OS. */
export function DesktopHero() {
  const typeText = useTypewriter(phrases);
  const { theme } = useTheme();
  const { openApp } = useWindowManager();

  return (
    // Alignment and padding live in .hero-shell (theme.css), not inline: the
    // `safe center` fallback needs two stacked align-items declarations, which
    // a style object cannot express.
    <div
      className="hero-shell"
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        justifyContent: "center",
        pointerEvents: "none",
        zIndex: 1,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "clamp(28px, 5vw, 72px)",
          maxWidth: 1000,
          width: "100%",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        <div style={{ maxWidth: 560 }}>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.7, ease: EASE }}
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(44px, 7vw, 88px)",
              fontWeight: 600,
              lineHeight: 0.95,
              // Serifs need more room than the sans this replaced (-0.03em).
              letterSpacing: "-0.02em",
              // SOFT rounds the terminals, WONK swaps in the flared alternates —
              // the two axes that make Fraunces read as a person, not a default.
              fontVariationSettings: "'SOFT' 40, 'WONK' 1",
              textWrap: "balance",
              color: "var(--color-text)",
              marginBottom: 12,
            }}
          >
            KC <span style={{ color: "var(--color-accent)" }}>Acuin.</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6, ease: EASE }}
            style={{
              // Stays sans on purpose: this line ends in a blinking block
              // cursor, and a serif fights that terminal motif. The contrast
              // also makes the serif name above land harder.
              fontFamily: "var(--font-ui)",
              // The longest phrase is ~24 characters and this line must not
              // wrap (the invisible sizer below reserves one line's width), so
              // the lower bound is sized to fit a 320px viewport rather than
              // chosen for looks.
              fontSize: "clamp(15px, 2.6vw, 28px)",
              fontWeight: 400,
              color: "var(--color-text-muted)",
              marginBottom: 22,
              position: "relative",
              whiteSpace: "nowrap",
            }}
          >
            {/* Invisible sizer reserves space for the longest phrase — peers never reflow */}
            <span style={{ visibility: "hidden" }} aria-hidden="true">
              {longestPhrase}
            </span>
            <span
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
              }}
            >
              <span>{typeText}</span>
              <span
                style={{
                  display: "inline-block",
                  width: 2,
                  height: "1.1em",
                  background: "var(--color-accent)",
                  marginLeft: 3,
                  animation: "blink 1s step-end infinite",
                }}
              />
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6, ease: EASE }}
            style={{
              color: "var(--color-text-muted)",
              fontSize: 15.5,
              lineHeight: 1.8,
              marginBottom: 28,
              maxWidth: 520,
            }}
          >
            Mobile developer from the Philippines. I ship production apps across Flutter,
            React Native, iOS, Android, and Laravel. Lead a{" "}
            <strong style={{ color: "var(--color-text)", fontWeight: 500 }}>four-person team</strong>{" "}
            across Gulf and Australian client work, and pair heavily with AI agentic
            workflows, MCP tooling, and a knowledge vault that compounds.
          </motion.p>

          {/* Proof, then an ask. The hero previously ended on a passive hint at
              the dock, so the hard numbers stayed buried in About and nothing on
              first paint invited a visitor to do anything. */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.62, duration: 0.6, ease: EASE }}
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "10px 22px",
              marginBottom: 24,
              fontFamily: "var(--font-mono)",
              fontSize: 12,
              color: "var(--color-text-subtle)",
            }}
          >
            {PROOF.map((p) => (
              <span key={p.label} style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
                <strong style={{ color: "var(--color-text)", fontSize: 15, fontWeight: 600 }}>
                  {p.value}
                </strong>
                {p.label}
              </span>
            ))}
          </motion.div>

          {/* The hero root is pointerEvents:none so the photo and copy stay
              decorative; these two controls are the only part that isn't. */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.74, duration: 0.6, ease: EASE }}
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 10,
              marginBottom: 26,
              pointerEvents: "auto",
            }}
          >
            <button onClick={() => openApp("projects")} className="hero-cta hero-cta--primary">
              View the work <ArrowRight size={15} />
            </button>
            <button onClick={() => openApp("contact")} className="hero-cta">
              Get in touch
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0, duration: 0.8 }}
            className="hero-hint"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              fontFamily: "var(--font-mono)",
              fontSize: 12,
              color: "var(--color-text-subtle)",
              letterSpacing: "0.08em",
            }}
          >
            or open an app from the dock
            <motion.span
              animate={{ y: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
              style={{ display: "inline-flex" }}
            >
              <ArrowDown size={14} />
            </motion.span>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.55, duration: 0.7, ease: EASE }}
          className="hero-photo"
          style={{
            width: "clamp(180px, 22vw, 280px)",
            aspectRatio: "3/4",
            borderRadius: 20,
            overflow: "hidden",
            border: "1px solid var(--glass-border)",
            boxShadow:
              theme === "dark"
                ? "0 32px 80px rgba(0,0,10,0.55), 0 0 60px rgba(79,110,247,0.14), 0 0 0 1px rgba(79,110,247,0.12)"
                : "0 32px 80px rgba(61,91,245,0.14), 0 0 60px rgba(61,91,245,0.10), 0 0 0 1px rgba(61,91,245,0.10)",
            flexShrink: 0,
          }}
        >
          <img
            src={theme === "dark" ? meNightImage : meDayImage}
            alt="KC Acuin"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center top",
              display: "block",
            }}
          />
        </motion.div>
      </div>
    </div>
  );
}
