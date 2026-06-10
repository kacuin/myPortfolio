import { motion } from "motion/react";
import { Github, Linkedin, Mail, Heart } from "lucide-react";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Stack", href: "#stack" },
  { label: "Contact", href: "#contact" },
];

const socials = [
  { icon: <Github size={16} />, href: "https://github.com/kcacuin", label: "GitHub" },
  { icon: <Linkedin size={16} />, href: "https://linkedin.com/in/kcacuin", label: "LinkedIn" },
  { icon: <Mail size={16} />, href: "mailto:wkcacuin@gmail.com", label: "Email" },
];

export function Footer() {
  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer
      style={{
        borderTop: "1px solid var(--color-border)",
        background: "var(--color-bg)",
        padding: "48px 0 32px",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 32px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: 40,
            marginBottom: 40,
            flexWrap: "wrap",
          }}
        >
          {/* Brand */}
          <div>
            <div
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 700,
                fontSize: 24,
                color: "var(--color-accent)",
                marginBottom: 8,
              }}
            >
              KC.
            </div>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 13,
                color: "var(--color-text-muted)",
                maxWidth: 220,
                lineHeight: 1.6,
              }}
            >
              Full Stack & Mobile Developer building production apps from the Philippines.
            </p>
          </div>

          {/* Nav */}
          <div>
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 11,
                color: "var(--color-text-subtle)",
                letterSpacing: "0.1em",
                marginBottom: 16,
              }}
            >
              NAVIGATE
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {navLinks.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={(e) => { e.preventDefault(); scrollTo(l.href); }}
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 14,
                    color: "var(--color-text-muted)",
                    textDecoration: "none",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--color-text)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--color-text-muted)"; }}
                >
                  {l.label}
                </a>
              ))}
            </div>
          </div>

          {/* Socials */}
          <div>
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 11,
                color: "var(--color-text-subtle)",
                letterSpacing: "0.1em",
                marginBottom: 16,
              }}
            >
              CONNECT
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 14,
                    color: "var(--color-text-muted)",
                    textDecoration: "none",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--color-accent)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--color-text-muted)"; }}
                >
                  {s.icon} {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Availability badge */}
          <div>
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 11,
                color: "var(--color-text-subtle)",
                letterSpacing: "0.1em",
                marginBottom: 16,
              }}
            >
              STATUS
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                background: "rgba(100,255,218,0.08)",
                border: "1px solid rgba(100,255,218,0.2)",
                borderRadius: 100,
                padding: "8px 16px",
              }}
            >
              <motion.div
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: "var(--color-teal)",
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 12,
                  color: "var(--color-teal)",
                  whiteSpace: "nowrap",
                }}
              >
                Open to opportunities
              </span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: "1px solid var(--color-border)",
            paddingTop: 24,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <p
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 12,
              color: "var(--color-text-subtle)",
            }}
          >
            © 2026 <span style={{ color: "var(--color-accent)" }}>KC Acuin</span> · Caloocan, Philippines
          </p>
          <p
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 12,
              color: "var(--color-text-subtle)",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            Built with <Heart size={12} style={{ color: "var(--color-accent)" }} /> React + Tailwind
          </p>
        </div>
      </div>
    </footer>
  );
}
