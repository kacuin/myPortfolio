import { useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown } from "lucide-react";
import { SectionLabel, AppTitle, stagger, EASE } from "./shared";

type Job = {
  title: string;
  company: string;
  date: string;
  active: boolean;
  bullets: ReactNode[];
  sub?: { label: string; bullets: ReactNode[] };
};

const strong = (t: string) => (
  <strong style={{ color: "var(--color-text)", fontWeight: 500 }}>{t}</strong>
);

const jobs: Job[] = [
  {
    title: "Mid-Level Full Stack Developer & Team Lead",
    company: "Odecci Solutions Inc.",
    date: "Feb 2026 – Present",
    active: true,
    bullets: [
      <>Mobile lead for {strong("iReserb")} — an all-in-one service booking platform in Flutter, integrating Firebase, Google Maps API, and third-party SDKs.</>,
      "Driving technical roadmap and architecture decisions for the full mobile portfolio; leading a 2-person dev team through active sprint cycles.",
      <>Implementing AI-driven development workflows with {strong("GitHub Copilot (MCP & AI Agents)")} for accelerated feature delivery.</>,
      "Mentoring engineers on clean architecture, code review standards, and Agile best practices.",
    ],
  },
  {
    title: "Full Stack & Mobile Developer",
    company: "Odecci Solutions Inc.",
    date: "Jan 2024 – Jan 2026",
    active: false,
    bullets: [
      <>Sole maintainer of the company's entire mobile portfolio — {strong("iOS (Swift/Obj-C), Android (Kotlin/Java), React Native")}.</>,
      <>Reduced app crash rate by {strong("68%")} via automated testing and disciplined tech debt management.</>,
      <>Cut release cycle from {strong("3 weeks to under 4 days")} with CI/CD pipelines and automated workflows.</>,
      <>Migrated Gold One Lending web app from microservices to a {strong("clean monolith")} and designed the future system architecture roadmap.</>,
      <>Achieved {strong("2–3× feature delivery acceleration")} using AI-assisted tools (Claude, Grok, Cursor).</>,
    ],
    sub: {
      label: "Acting Tech Lead · Oct 2025 – Jan 2026",
      bullets: [
        <>Appointed Acting Tech Lead while continuing IC responsibilities — drove all Agile ceremonies for {strong("4 engineers")}.</>,
        <>Owned technical decisions and {strong("Architecture Decision Records (ADRs)")}.</>,
        <>Built and maintained CI/CD pipelines using {strong("GitHub Actions + Expo EAS + Docker")}.</>,
      ],
    },
  },
  {
    title: "Part-Time Full Stack Developer",
    company: "Polytechnic University of the Philippines",
    date: "May 2024 – Present",
    active: false,
    bullets: [
      <>Completed full SDLC for an internal {strong("Procurement Project Tracker")} built in Laravel.</>,
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
      <>Built UI/UX designs, prototypes, and front-end implementation for a {strong("Lending Management System")} (Gold One Lending Corp.) in Figma.</>,
      "Completed internship gaining hands-on experience with production codebases.",
    ],
  },
];

function Bullet({ children, small }: { children: ReactNode; small?: boolean }) {
  return (
    <li
      style={{
        fontSize: small ? 13 : 13.5,
        color: "var(--color-text-muted)",
        padding: "4px 0 4px 18px",
        position: "relative",
        lineHeight: 1.65,
      }}
    >
      <span style={{ position: "absolute", left: 0, top: 6, color: "var(--color-accent)", fontSize: 11 }}>
        ▸
      </span>
      {children}
    </li>
  );
}

export function ExperienceApp() {
  const [expanded, setExpanded] = useState<number | null>(0);

  return (
    <div style={{ padding: "28px 32px 32px" }}>
      <SectionLabel>02 · EXPERIENCE</SectionLabel>
      <AppTitle>Where I've worked.</AppTitle>
      <motion.p
        {...stagger(2)}
        style={{ color: "var(--color-text-muted)", fontSize: 14, marginBottom: 32 }}
      >
        A single company, five roles, three years — each one earned.
      </motion.p>

      <div style={{ position: "relative" }}>
        <div
          style={{
            position: "absolute",
            left: 8,
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
            {...stagger(3 + i)}
            style={{ position: "relative", paddingLeft: 36, marginBottom: 20 }}
          >
            <div
              style={{
                position: "absolute",
                left: 1,
                top: 22,
                width: 15,
                height: 15,
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
                borderRadius: 14,
                padding: "18px 22px",
                cursor: "pointer",
                transition: "border-color 0.2s",
              }}
              onClick={() => setExpanded(expanded === i ? null : i)}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: 10,
                      flexWrap: "wrap",
                      marginBottom: 4,
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontSize: 15.5,
                        fontWeight: 600,
                        color: "var(--color-text)",
                      }}
                    >
                      {job.title}
                    </div>
                    <div
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: 11,
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
                  <div style={{ fontSize: 12.5, color: "var(--color-accent)", fontWeight: 500 }}>
                    {job.company}
                  </div>
                </div>
                <motion.div
                  animate={{ rotate: expanded === i ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  style={{ color: "var(--color-text-muted)", flexShrink: 0, marginTop: 4 }}
                >
                  <ChevronDown size={16} />
                </motion.div>
              </div>

              <AnimatePresence>
                {expanded === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: EASE }}
                    style={{ overflow: "hidden" }}
                  >
                    <ul style={{ listStyle: "none", marginTop: 14 }}>
                      {job.bullets.map((b, bi) => (
                        <Bullet key={bi}>{b}</Bullet>
                      ))}
                    </ul>

                    {job.sub && (
                      <div
                        style={{
                          marginTop: 12,
                          padding: 14,
                          background: "rgba(79,110,247,0.05)",
                          border: "1px solid rgba(79,110,247,0.15)",
                          borderRadius: 10,
                        }}
                      >
                        <div
                          style={{
                            fontFamily: "'JetBrains Mono', monospace",
                            fontSize: 11.5,
                            color: "var(--color-teal)",
                            marginBottom: 6,
                            letterSpacing: "0.05em",
                          }}
                        >
                          ⬡ {job.sub.label}
                        </div>
                        <ul style={{ listStyle: "none" }}>
                          {job.sub.bullets.map((b, bi) => (
                            <Bullet key={bi} small>{b}</Bullet>
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
  );
}
