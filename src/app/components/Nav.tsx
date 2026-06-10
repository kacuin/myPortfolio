import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";

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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, {
      passive: true,
    });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = [
      "about",
      "experience",
      "skills",
      "stack",
      "contact",
    ];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

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
          background: scrolled
            ? "rgba(10,15,30,0.92)"
            : "rgba(10,15,30,0.7)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(79,110,247,0.2)",
          borderRadius: 100,
          padding: "10px 28px",
          display: "flex",
          alignItems: "center",
          gap: 32,
          transition: "background 0.3s, box-shadow 0.3s",
          boxShadow: scrolled
            ? "0 8px 32px rgba(79,110,247,0.12)"
            : "none",
          width: "max-content",
          maxWidth: "calc(100vw - 40px)",
        }}
      >
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            scrollTo("#hero");
          }}
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700,
            fontSize: 16,
            color: "#4F6EF7",
            textDecoration: "none",
            letterSpacing: "0.02em",
          }}
        >
          KC.
        </a>

        <div className="hidden sm:flex" style={{ gap: 24 }}>
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={(e) => {
                e.preventDefault();
                scrollTo(l.href);
              }}
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 12,
                color:
                  active === l.href.slice(1)
                    ? "#F0F4FF"
                    : "#8892B0",
                textDecoration: "none",
                letterSpacing: "0.05em",
                transition: "color 0.2s",
                position: "relative",
                margin: "0px 5px"
              }}
            >
              {active === l.href.slice(1) && (
                <motion.span
                  layoutId="nav-dot"
                  style={{
                    position: "absolute",
                    bottom: -4,
                    left: 0,
                    right: 0,
                    height: 1,
                    background: "#4F6EF7",
                    borderRadius: 2,
                  }}
                />
              )}
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              scrollTo("#contact");
            }}
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 12,
              color: "#fff",
              textDecoration: "none",
              letterSpacing: "0.05em",
              background: "#4F6EF7",
              padding: "6px 16px",
              borderRadius: 100,
              transition: "background 0.2s",
            }}
          >
            Contact
          </a>
        </div>

        <button
          className="sm:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{
            background: "none",
            border: "none",
            color: "#F0F4FF",
            cursor: "pointer",
            padding: 4,
          }}
        >
          {mobileOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{
              position: "fixed",
              top: 80,
              left: 20,
              right: 20,
              zIndex: 99,
              background: "rgba(10,15,30,0.96)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(79,110,247,0.2)",
              borderRadius: 16,
              padding: 24,
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}
          >
            {[
              ...links,
              { label: "Contact", href: "#contact" },
            ].map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo(l.href);
                }}
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: 16,
                  fontWeight: 500,
                  color:
                    active === l.href.slice(1)
                      ? "#4F6EF7"
                      : "#F0F4FF",
                  textDecoration: "none",
                  padding: "8px 0",
                  borderBottom:
                    "1px solid rgba(79,110,247,0.1)",
                }}
              >
                {l.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}