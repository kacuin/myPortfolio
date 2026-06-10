import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown } from "lucide-react";

const jobs = [
  {
    title: "Mid-Level Full Stack Developer & Team Lead",
    company: "Odecci Solutions Inc.",
    date: "Feb 2026 – Present",
    active: true,
    bullets: [
      <>Mobile lead for <strong style={{ color: "var(--color-text)", fontWeight: 500 }}>iReserb</strong> — an all-in-one service booking platform in Flutter, integrating Firebase, Google Maps API, and third-party SDKs.</>,
      "Driving technical roadmap and architecture decisions for the full mobile portfolio; leading a 2-person dev team through active sprint cycles.",
      <>Implementing AI-driven development workflows with <strong style={{ color: "var(--color-text)", fontWeight: 500 }}>GitHub Copilot (MCP & AI Agents)</strong> for accelerated feature delivery.</>,
      "Mentoring engineers on clean architecture, code review standards, and Agile best practices.",
    ],
  },
  {
    title: "Full Stack & Mobile Developer",
    company: "Odecci Solutions Inc.",
    date: "Jan 2024 – Jan 2026",
    active: false,
    bullets: [
      <>Sole maintainer of the company's entire mobile portfolio — <strong style={{ color: "var(--color-text)", fontWeight: 500 }}>iOS (Swift/Obj-C), Android (Kotlin/Java), React Native</strong>.</>,
      <>Reduced app crash rate by <strong style={{ color: "var(--color-text)", fontWeight: 500 }}>68%</strong> via automated testing and disciplined tech debt management.</>,
      <>Cut release cycle from <strong style={{ color: "var(--color-text)", fontWeight: 500 }}>3 weeks to under 4 days</strong> with CI/CD pipelines and automated workflows.</>,
      <>Migrated Gold One Lending web app from microservices to a <strong style={{ color: "var(--color-text)", fontWeight: 500 }}>clean monolith</strong> and designed the future system architecture roadmap.</>,
      <>Achieved <strong style={{ color: "var(--color-text)", fontWeight: 500 }}>2–3× feature delivery acceleration</strong> using AI-assisted tools (Claude, Grok, Cursor).</>,
    ],
    sub: {
      label: "Acting Tech Lead · Oct 2025 – Jan 2026",
      bullets: [
        <>Appointed Acting Tech Lead while continuing IC responsibilities — drove all Agile ceremonies for <strong style={{ color: "var(--color-text)", fontWeight: 500 }}>4 engineers</strong>.</>,
        <>Owned technical decisions and <strong style={{ color: "var(--color-text)", fontWeight: 500 }}>Architecture Decision Records (ADRs)</strong>.</>,
        <>Built and maintained CI/CD pipelines using <strong style={{ color: "var(--color-text)", fontWeight: 500 }}>GitHub Actions + Expo EAS + Docker</strong>.</>,
      ],
    },
  },
  {
    title: "Part-Time Full Stack Developer",
    company: "Polytechnic University of the Philippines",
    date: "May 2024 – Present",
    active: false,
    bullets: [
      <>Completed full SDLC for an internal <strong style={{ color: "var(--color-text)", fontWeight: 500 }}>Procurement Project Tracker</strong> built in Laravel.</>,
      "Ongoing continuous enhancement and integration supporting procurement management operations.",
    ],
  },
  {
    title: "WordPress Developer",
    company: "Odecci Solutions Inc.",
    date: "Nov 2023 – May 2024",
    active: false,
    bullets: [
      "Maintained and developed client WordPress sites using Elementor, Divi Theme, and industry-standard plugins.",
    ],
  },
  {
    title: "Front End Developer → Internship",
    company: "Odecci Solutions Inc.",
    date: "May 2023 – Jan 2024",
    active: false,
    bullets: [
      <>Built UI/UX designs, prototypes, and front-end implementation for a <strong style={{ color: "var(--color-text)", fontWeight: 500 }}>Lending Management System</strong> (Gold One Lending Corp.) in Figma.</>,
      "Completed internship gaining hands-on experience with production codebases.",
    ],
  },
];

export function Experience() {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <section id="experience" style={{ padding: "100px 0", background: "var(--color-surface-alt)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 32px" }}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 12,
            color: "var(--color-accent)",
            letterSpacing: "0.15em",
            marginBottom: 12,
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          02 · EXPERIENCE
          <span style={{ flex: 1, maxWidth: 60, height: 1, background: "var(--color-accent)", opacity: 0.4, display: "block" }} />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "clamp(28px, 4vw, 42px)",
            fontWeight: 700,
            letterSpacing: "-0.02em",
            color: "var(--color-text)",
            marginBottom: 12,
          }}
        >
          Where I've worked.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          style={{ color: "var(--color-text-muted)", fontSize: 16, marginBottom: 64 }}
        >
          A single company, five roles, three years — each one earned.
        </motion.p>

        <div style={{ position: "relative" }}>
          <div
            style={{
              position: "absolute",
              left: 20,
              top: 0,
              bottom: 0,
              width: 1,
              background: "linear-gradient(to bottom, var(--color-accent), transparent)",
              opacity: 0.3,
            }}
          />

          {jobs.map((job, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              style={{ position: "relative", paddingLeft: 64, marginBottom: 32 }}
            >
              <div
                style={{
                  position: "absolute",
                  left: 12,
                  top: 24,
                  width: 17,
                  height: 17,
                  borderRadius: "50%",
                  background: job.active ? "var(--color-accent)" : "var(--color-surface)",
                  border: "2px solid var(--color-accent)",
                  zIndex: 1,
                  boxShadow: job.active ? "0 0 0 4px rgba(79,110,247,0.2)" : "none",
                }}
              />

              <div
                style={{
                  background: "var(--color-surface)",
                  border: `1px solid ${expanded === i ? "var(--color-accent)" : "var(--color-border)"}`,
                  borderRadius: 16,
                  padding: "28px 32px",
                  cursor: "pointer",
                  transition: "border-color 0.2s",
                }}
                onClick={() => setExpanded(expanded === i ? null : i)}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    gap: 16,
                    flexWrap: "wrap",
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: 12,
                        flexWrap: "wrap",
                        marginBottom: 4,
                      }}
                    >
                      <div
                        style={{
                          fontFamily: "'Space Grotesk', sans-serif",
                          fontSize: 18,
                          fontWeight: 600,
                          color: "var(--color-text)",
                        }}
                      >
                        {job.title}
                      </div>
                      <div
                        style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: 12,
                          color: "var(--color-amber)",
                          background: "var(--color-amber-dim)",
                          border: "1px solid rgba(245,166,35,0.2)",
                          padding: "3px 10px",
                          borderRadius: 100,
                          whiteSpace: "nowrap",
                        }}
                      >
                        {job.date}
                      </div>
                    </div>
                    <div
                      style={{
                        fontSize: 13,
                        color: "var(--color-accent)",
                        fontWeight: 500,
                        marginBottom: 0,
                      }}
                    >
                      {job.company}
                    </div>
                  </div>
                  <motion.div
                    animate={{ rotate: expanded === i ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    style={{ color: "var(--color-text-muted)", flexShrink: 0, marginTop: 4 }}
                  >
                    <ChevronDown size={18} />
                  </motion.div>
                </div>

                <AnimatePresence>
                  {expanded === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      style={{ overflow: "hidden" }}
                    >
                      <ul style={{ listStyle: "none", marginTop: 20 }}>
                        {job.bullets.map((b, bi) => (
                          <li
                            key={bi}
                            style={{
                              fontSize: 14.5,
                              color: "var(--color-text-muted)",
                              padding: "5px 0 5px 18px",
                              position: "relative",
                              lineHeight: 1.65,
                            }}
                          >
                            <span
                              style={{
                                position: "absolute",
                                left: 0,
                                top: 7,
                                color: "var(--color-accent)",
                                fontSize: 11,
                              }}
                            >
                              ▸
                            </span>
                            {b}
                          </li>
                        ))}
                      </ul>

                      {job.sub && (
                        <div
                          style={{
                            marginTop: 16,
                            padding: 16,
                            background: "rgba(79,110,247,0.05)",
                            border: "1px solid rgba(79,110,247,0.15)",
                            borderRadius: 10,
                          }}
                        >
                          <div
                            style={{
                              fontFamily: "'JetBrains Mono', monospace",
                              fontSize: 12,
                              color: "var(--color-teal)",
                              marginBottom: 8,
                              letterSpacing: "0.05em",
                            }}
                          >
                            ⬡ {job.sub.label}
                          </div>
                          <ul style={{ listStyle: "none" }}>
                            {job.sub.bullets.map((b, bi) => (
                              <li
                                key={bi}
                                style={{
                                  fontSize: 14,
                                  color: "var(--color-text-muted)",
                                  padding: "4px 0 4px 18px",
                                  position: "relative",
                                  lineHeight: 1.65,
                                }}
                              >
                                <span
                                  style={{
                                    position: "absolute",
                                    left: 0,
                                    top: 6,
                                    color: "var(--color-accent)",
                                    fontSize: 11,
                                  }}
                                >
                                  ▸
                                </span>
                                {b}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
