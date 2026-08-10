import { motion } from "motion/react";
import { Smartphone, Globe, Settings, Bot, Crown, Palette } from "lucide-react";
import { SectionLabel, AppTitle, stagger } from "./shared";

const skills = [
  {
    icon: <Smartphone size={20} />,
    title: "Mobile Development",
    tags: ["Flutter", "Dart", "React Native", "iOS Swift", "Objective-C", "Android Kotlin", "Java", "Firebase"],
    color: "var(--color-accent)",
  },
  {
    icon: <Globe size={20} />,
    title: "Web & Backend",
    tags: ["Laravel", "PHP", "Node.js", "TypeScript", "Livewire", "Alpine.js", "Tailwind CSS", "REST APIs", "MySQL"],
    color: "var(--color-teal)",
  },
  {
    icon: <Settings size={20} />,
    title: "DevOps & Architecture",
    tags: ["GitHub Actions", "Docker", "Expo EAS", "CI/CD", "Clean Architecture", "Riverpod", "GoRouter", "ADRs"],
    color: "var(--color-amber)",
  },
  {
    icon: <Bot size={20} />,
    title: "AI-Assisted Development",
    tags: ["GitHub Copilot", "MCP Agents", "Claude", "Cursor", "Grok", "Prompt Engineering"],
    color: "var(--color-accent)",
  },
  {
    icon: <Crown size={20} />,
    title: "Leadership & Management",
    tags: ["Tech Lead", "Agile/Scrum", "Mentoring", "Code Review", "Vendor Mgmt", "Stakeholder Mgmt", "Technical Writing"],
    color: "var(--color-teal)",
  },
  {
    icon: <Palette size={20} />,
    title: "Design & Tooling",
    tags: ["Figma", "UI/UX Design", "Wireframing", "Prototyping", "Git", "Jira"],
    color: "var(--color-amber)",
  },
];

const stack = [
  {
    label: "MOBILE",
    chips: ["Flutter", "React Native", "Swift", "Kotlin", "Dart", "Java", "Obj-C"],
    highlights: ["Flutter", "React Native"],
  },
  {
    label: "BACKEND",
    chips: ["Laravel", "Node.js", "PHP", "MySQL", "Firebase", "Isar", "REST"],
    highlights: ["Laravel"],
  },
  {
    label: "FRONTEND",
    chips: ["TypeScript", "Tailwind CSS", "Livewire", "Alpine.js", "WordPress", "Figma"],
    highlights: [],
  },
  {
    label: "DEVOPS",
    chips: ["GitHub Actions", "Docker", "Expo EAS", "Git", "App Store Connect", "Google Play"],
    highlights: ["GitHub Actions"],
  },
  {
    label: "AI TOOLS",
    chips: ["GitHub Copilot", "Claude", "Cursor", "Grok"],
    highlights: ["GitHub Copilot", "Claude"],
  },
];

export function SkillsApp() {
  return (
    <div style={{ padding: "28px 32px 32px" }}>
      {/* <SectionLabel>04 · SKILLS</SectionLabel> */}
      <AppTitle>What I bring to the table.</AppTitle>
      <motion.p
        {...stagger(2)}
        style={{ color: "var(--color-text-muted)", fontSize: 14, marginBottom: 26, maxWidth: 480 }}
      >
        Technical depth across mobile, web, and leadership — plus the AI tooling to move faster than a solo team should.
      </motion.p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 14,
          marginBottom: 40,
        }}
      >
        {skills.map((s, i) => (
          <motion.div
            key={s.title}
            {...stagger(3 + i)}
            whileHover={{ y: -4 }}
            style={{
              background: "var(--color-surface)",
              border: "1px solid var(--color-border)",
              borderRadius: 14,
              padding: 20,
              cursor: "default",
            }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 10,
                background: `color-mix(in srgb, ${s.color} 10%, transparent)`,
                border: `1px solid color-mix(in srgb, ${s.color} 24%, transparent)`,
                display: "grid",
                placeItems: "center",
                color: s.color,
                marginBottom: 12,
              }}
            >
              {s.icon}
            </div>
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 16.5,
                fontWeight: 600,
                letterSpacing: "-0.01em",
                color: "var(--color-text)",
                marginBottom: 10,
              }}
            >
              {s.title}
            </h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {s.tags.map((t) => (
                <span
                  key={t}
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 10.5,
                    color: "var(--color-text-muted)",
                    background: "rgba(136,146,176,0.08)",
                    border: "1px solid var(--color-border)",
                    padding: "3px 9px",
                    borderRadius: 100,
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <SectionLabel index={9}>05 · TECH STACK</SectionLabel>
      <motion.h3
        {...stagger(10)}
        style={{
          fontFamily: "var(--font-display)",
          fontSize: 23,
          fontWeight: 600,
          letterSpacing: "-0.015em",
          color: "var(--color-text)",
          marginBottom: 20,
        }}
      >
        Tools I reach for.
      </motion.h3>

      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {stack.map((cat, i) => (
          <motion.div
            key={cat.label}
            {...stagger(11 + i)}
            style={{ display: "flex", gap: 18, alignItems: "center", flexWrap: "wrap" }}
          >
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 10.5,
                color: "var(--color-text-muted)",
                letterSpacing: "0.1em",
                minWidth: 90,
              }}
            >
              {cat.label}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, flex: 1 }}>
              {cat.chips.map((chip) => {
                const hl = cat.highlights.includes(chip);
                return (
                  <motion.span
                    key={chip}
                    whileHover={{ scale: 1.05 }}
                    style={{
                      fontFamily: "var(--font-ui)",
                      fontSize: 13,
                      fontWeight: 500,
                      color: hl ? "var(--color-accent)" : "var(--color-text)",
                      background: hl ? "var(--color-accent-dim)" : "var(--color-surface)",
                      border: `1px solid ${hl ? "rgba(79,110,247,0.4)" : "var(--color-border)"}`,
                      padding: "6px 15px",
                      borderRadius: 100,
                      cursor: "default",
                    }}
                  >
                    {chip}
                  </motion.span>
                );
              })}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
