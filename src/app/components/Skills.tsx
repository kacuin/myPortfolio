import { motion } from "motion/react";
import { Smartphone, Globe, Settings, Bot, Crown, Palette } from "lucide-react";

const skills = [
  {
    icon: <Smartphone size={24} />,
    title: "Mobile Development",
    tags: ["Flutter", "Dart", "React Native", "iOS Swift", "Objective-C", "Android Kotlin", "Java", "Firebase"],
    color: "#4F6EF7",
  },
  {
    icon: <Globe size={24} />,
    title: "Web & Backend",
    tags: ["Laravel", "PHP", "Node.js", "TypeScript", "Livewire", "Alpine.js", "Tailwind CSS", "REST APIs", "MySQL"],
    color: "#64FFDA",
  },
  {
    icon: <Settings size={24} />,
    title: "DevOps & Architecture",
    tags: ["GitHub Actions", "Docker", "Expo EAS", "CI/CD", "Clean Architecture", "Riverpod", "GoRouter", "ADRs"],
    color: "#F5A623",
  },
  {
    icon: <Bot size={24} />,
    title: "AI-Assisted Development",
    tags: ["GitHub Copilot", "MCP Agents", "Claude", "Cursor", "Grok", "Prompt Engineering"],
    color: "#4F6EF7",
  },
  {
    icon: <Crown size={24} />,
    title: "Leadership & Management",
    tags: ["Team Lead", "Agile/Scrum", "Mentoring", "Roadmap Ownership", "Stakeholder Mgmt", "Risk Mitigation"],
    color: "#64FFDA",
  },
  {
    icon: <Palette size={24} />,
    title: "Design & Tooling",
    tags: ["Figma", "UI/UX Design", "Wireframing", "Prototyping", "Git", "Jira"],
    color: "#F5A623",
  },
];

export function Skills() {
  return (
    <section id="skills" style={{ padding: "100px 0", background: "#0A0F1E" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 32px" }}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 12,
            color: "#4F6EF7",
            letterSpacing: "0.15em",
            marginBottom: 12,
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          03 · SKILLS
          <span style={{ flex: 1, maxWidth: 60, height: 1, background: "#4F6EF7", opacity: 0.4, display: "block" }} />
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
            color: "#F0F4FF",
            marginBottom: 12,
          }}
        >
          What I bring to the table.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          style={{ color: "#8892B0", fontSize: 16, marginBottom: 64, maxWidth: 500 }}
        >
          Technical depth across mobile, web, and leadership — plus the AI tooling to move faster than a solo team should.
        </motion.p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 20,
          }}
        >
          {skills.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              whileHover={{ y: -6, borderColor: s.color }}
              style={{
                background: "#131C35",
                border: "1px solid #1E2D50",
                borderRadius: 16,
                padding: 28,
                cursor: "default",
                transition: "border-color 0.2s",
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 12,
                  background: `${s.color}15`,
                  border: `1px solid ${s.color}30`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: s.color,
                  marginBottom: 16,
                }}
              >
                {s.icon}
              </div>
              <div
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: 16,
                  fontWeight: 600,
                  color: "#F0F4FF",
                  marginBottom: 14,
                }}
              >
                {s.title}
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {s.tags.map((t) => (
                  <span
                    key={t}
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 11,
                      color: "#8892B0",
                      background: "rgba(136,146,176,0.08)",
                      border: "1px solid #4A5578",
                      padding: "3px 10px",
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
      </div>
    </section>
  );
}
