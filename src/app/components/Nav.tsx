import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

const links = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Stack", href: "#stack" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

  // Scroll detection
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Responsive breakpoint detection — replaces sm: classes
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Section active tracking
  useEffect(() => {
    const sections = ["about", "experience", "skills", "stack", "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Close mobile drawer on resize to desktop
  useEffect(() => {
    if (!isMobile) setMobileOpen(false);
  }, [isMobile]);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: "fixed",
          top: 20,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 100,
          background: scrolled ? "var(--color-nav-bg)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
          border: scrolled
            ? "1px solid var(--color-border)"
            : "1px solid transparent",
          borderRadius: 100,
          padding: isMobile ? "8px 12px 8px 20px" : "8px 10px 8px 22px",
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
          flexWrap: "nowrap",
          gap: 0,
          transition: "background 0.35s, box-shadow 0.35s, border-color 0.35s",
          boxShadow: scrolled ? "0 8px 32px rgba(79,110,247,0.10)" : "none",
          width: "max-content",
          maxWidth: "calc(100vw - 40px)",
        }}
      >
        {/* Logo */}
        <a
          href="#hero"
          onClick={(e) => { e.preventDefault(); scrollTo("#hero"); }}
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700,
            fontSize: 16,
            color: "var(--color-accent)",
            textDecoration: "none",
            letterSpacing: "0.02em",
            marginRight: isMobile ? 12 : 8,
            flexShrink: 0,
          }}
        >
          KC.
        </a>

        {/* ── DESKTOP: links + divider + contact + toggle ── */}
        {!isMobile && (
          <div style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
            flexWrap: "nowrap",
            gap: 0,
          }}>
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={(e) => { e.preventDefault(); scrollTo(l.href); }}
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 12,
                  color: active === l.href.slice(1)
                    ? "var(--color-text)"
                    : "var(--color-text-muted)",
                  textDecoration: "none",
                  letterSpacing: "0.05em",
                  transition: "color 0.2s",
                  position: "relative",
                  padding: "6px 12px",
                  whiteSpace: "nowrap",
                  flexShrink: 0,
                }}
                onMouseEnter={e =>
                  (e.currentTarget as HTMLElement).style.color = "var(--color-text)"
                }
                onMouseLeave={e =>
                  (e.currentTarget as HTMLElement).style.color =
                    active === l.href.slice(1)
                      ? "var(--color-text)"
                      : "var(--color-text-muted)"
                }
              >
                {active === l.href.slice(1) && (
                  <motion.span
                    layoutId="nav-dot"
                    style={{
                      position: "absolute",
                      bottom: 2,
                      left: 12,
                      right: 12,
                      height: 1,
                      background: "var(--color-accent)",
                      borderRadius: 2,
                    }}
                  />
                )}
                {l.label}
              </a>
            ))}

            {/* Vertical divider */}
            <div style={{
              width: 1,
              height: 16,
              background: "var(--color-border)",
              margin: "0 10px",
              flexShrink: 0,
            }} />

            {/* Contact pill */}
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); scrollTo("#contact"); }}
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 12,
                color: "#fff",
                textDecoration: "none",
                letterSpacing: "0.05em",
                background: "var(--color-accent)",
                padding: "6px 16px",
                borderRadius: 100,
                transition: "background 0.2s",
                flexShrink: 0,
                whiteSpace: "nowrap",
              }}
              onMouseEnter={e =>
                (e.currentTarget as HTMLElement).style.background = "var(--color-accent-hover)"
              }
              onMouseLeave={e =>
                (e.currentTarget as HTMLElement).style.background = "var(--color-accent)"
              }
            >
              Contact
            </a>

            {/* Theme toggle — 8px gap from Contact pill */}
            <div style={{ marginLeft: 8, flexShrink: 0 }}>
              <ThemeToggle />
            </div>
          </div>
        )}

        {/* ── MOBILE: toggle + hamburger ── */}
        {isMobile && (
          <div style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
            gap: 6,
            flexShrink: 0,
          }}>
            <ThemeToggle />
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
              style={{
                background: "none",
                border: "none",
                color: "var(--color-text)",
                cursor: "pointer",
                padding: 4,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={mobileOpen ? "x" : "menu"}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  style={{ display: "flex" }}
                >
                  {mobileOpen ? <X size={18} /> : <Menu size={18} />}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        )}
      </motion.nav>

      {/* ── MOBILE DRAWER ── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop tap-to-close */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              style={{
                position: "fixed",
                inset: 0,
                zIndex: 98,
                background: "rgba(0,0,0,0.25)",
              }}
            />

            <motion.div
              initial={{ opacity: 0, y: -12, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.97 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: "fixed",
                top: 76,
                left: 16,
                right: 16,
                zIndex: 99,
                background: "var(--color-surface)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: "1px solid var(--color-border)",
                borderRadius: 16,
                padding: "8px",
                display: "flex",
                flexDirection: "column",
                gap: 2,
                boxShadow: "0 16px 48px rgba(0,0,0,0.18)",
              }}
            >
              {[...links, { label: "Contact", href: "#contact" }].map((l, i) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={(e) => { e.preventDefault(); scrollTo(l.href); }}
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: 15,
                    fontWeight: 500,
                    color: active === l.href.slice(1)
                      ? "var(--color-accent)"
                      : "var(--color-text)",
                    textDecoration: "none",
                    padding: "12px 16px",
                    borderRadius: 10,
                    background: active === l.href.slice(1)
                      ? "var(--color-accent-dim)"
                      : "transparent",
                    transition: "background 0.15s, color 0.15s",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                  onMouseEnter={e => {
                    if (active !== l.href.slice(1))
                      (e.currentTarget as HTMLElement).style.background = "var(--color-accent-dim2)";
                  }}
                  onMouseLeave={e => {
                    if (active !== l.href.slice(1))
                      (e.currentTarget as HTMLElement).style.background = "transparent";
                  }}
                >
                  {l.label}
                  {i === links.length && (
                    <span style={{
                      fontSize: 10,
                      background: "var(--color-accent)",
                      color: "#fff",
                      padding: "2px 8px",
                      borderRadius: 100,
                    }}>
                      Hire me
                    </span>
                  )}
                </a>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}