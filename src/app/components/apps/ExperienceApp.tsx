import { useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown } from "lucide-react";
import { AppTitle, stagger, EASE } from "./shared";

type Job = {
  title: string;
  company: string;
  date: string;
  active: boolean;
  bullets: ReactNode[];
};

const strong = (t: string) => (
  <strong style={{ color: "var(--color-text)", fontWeight: 500 }}>{t}</strong>
);

const jobs: Job[] = [
  {
    title: "Tech Lead & Mid-Level Full Stack Developer",
    company: "Odecci Solutions Inc.",
    date: "Feb 2026 – Present",
    active: true,
    bullets: [
      <>Named by the CTO as {strong("Tech Lead")} for code quality, delivery progress, and documentation — leading {strong("four direct reports")} plus an external vendor team whose CMS and mobile deliverables I review and validate continuously.</>,
      <>Lead the {strong("React Native cross-platform migration")} of a Gulf property group's resident-services app: a 262-case regression suite across 16 modules, a 23-screen triaged punch list, and the 2.0 deployment plan.</>,
      <>Overturned a client-requested rename-and-republish in favour of an in-place store update by citing an {strong("ADR")} identity-preservation finding — removing an entire release cycle and sparing {strong("6,878 active residents")} a forced re-install and re-registration.</>,
      <>Resolved {strong("99 of 102 support tickets (97%)")} across three production mobile products in seven months — booking, chat, notifications, tenant data, leasing, and release stability.</>,
      <>Designed and ran the company's {strong("internship programme")} end to end — roadmap, screening exams, and interviews; pooled 10–20 candidates, shortlisted 5, onboarded 3.</>,
      "Sole owner of an Australian client engagement end to end — environment, deploy workflow, domain and SSL, Laravel scaffold, and AI tooling.",
      <>Mobile lead for an {strong("all-in-one service booking platform")} in Flutter, integrating Firebase, Google Maps API, and third-party SDKs.</>,
      "Instituted the team's operating cadence: written work logs, a shared blocker register, and a 24-hour PR-review SLA.",
    ],
  },
  {
    title: "Acting Tech Lead",
    company: "Odecci Solutions Inc.",
    date: "Oct 2025 – Jan 2026",
    active: false,
    bullets: [
      <>Appointed Acting Tech Lead while continuing IC responsibilities — drove all Agile ceremonies for {strong("4 engineers")}.</>,
      <>Owned technical decisions and authored the team's first {strong("Architecture Decision Records (ADRs)")}.</>,
      <>Built and maintained CI/CD pipelines using {strong("GitHub Actions + Expo EAS + Docker")}.</>,
    ],
  },
  {
    title: "Full Stack & Mobile Developer",
    company: "Odecci Solutions Inc.",
    date: "Jan 2024 – Sep 2025",
    active: false,
    bullets: [
      <>Sole maintainer of the company's entire mobile portfolio — {strong("iOS (Swift/Obj-C), Android (Kotlin/Java), React Native")} — five production apps on the App Store and Google Play.</>,
      <>Rebuilt the in-app customer-service {strong("chat attachment and image pipeline")} on the native iOS app — traced blank-image failures to a discarded error parameter in the image-loading callback and a client/server contract mismatch in how message text and file URLs travelled.</>,
      <>Established AI-assisted development as standard workflow, backed by a {strong("persistent engineering knowledge vault")}.</>,
    ],
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
    date: "Nov 2023 – Jan 2024",
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
      <>Built UI/UX designs, prototypes, and front-end implementation for a {strong("Lending Management System")} in Figma.</>,
      "Completed internship gaining hands-on experience with production codebases.",
    ],
  },
];

function Bullet({ children }: { children: ReactNode }) {
  return (
    <li
      style={{
        fontSize: 13.5,
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
      {/* <SectionLabel>02 · EXPERIENCE</SectionLabel> */}
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
                    <h3
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: 17,
                        fontWeight: 600,
                        letterSpacing: "-0.01em",
                        color: "var(--color-text)",
                      }}
                    >
                      {job.title}
                    </h3>
                    <div
                      style={{
                        fontFamily: "var(--font-mono)",
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
