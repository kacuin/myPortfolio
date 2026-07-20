import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { ArrowDown } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import meDayImage from "../../assets/me_day.jpeg";
import meNightImage from "../../assets/me_night.png";
import { PROFILE } from "../../content/profile";

import { EASE } from "../../os/motion";

// Shared with the crawlable fallback so indexed copy matches what's on screen.
const phrases = PROFILE.heroPhrases as readonly string[];

const longestPhrase = phrases.reduce((a, b) => (b.length > a.length ? b : a));

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
              fontSize: "clamp(19px, 2.6vw, 28px)",
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
            Mobile developer from the Philippines — Team Lead at{" "}
            <strong style={{ color: "var(--color-text)", fontWeight: 500 }}>
              Odecci Solutions Inc.
            </strong>{" "}
            I ship production apps across Flutter, React Native, iOS, Android, and Laravel,
            and pair heavily with AI — cutting debug time{" "}
            <strong style={{ color: "var(--color-text)", fontWeight: 500 }}>70%</strong> and
            release cycles from weeks to days.
          </motion.p>

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
            Open an app from the dock below
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
