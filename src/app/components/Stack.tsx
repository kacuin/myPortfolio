import { motion } from "motion/react";

const categories = [
  {
    label: "MOBILE",
    chips: [
      { name: "Flutter", highlight: true },
      { name: "React Native", highlight: true },
      { name: "Swift", highlight: false },
      { name: "Kotlin", highlight: false },
      { name: "Dart", highlight: false },
      { name: "Java", highlight: false },
      { name: "Obj-C", highlight: false },
    ],
  },
  {
    label: "BACKEND",
    chips: [
      { name: "Laravel", highlight: true },
      { name: "Node.js", highlight: false },
      { name: "PHP", highlight: false },
      { name: "MySQL", highlight: false },
      { name: "Firebase", highlight: false },
      { name: "Isar", highlight: false },
      { name: "REST", highlight: false },
    ],
  },
  {
    label: "FRONTEND",
    chips: [
      { name: "TypeScript", highlight: false },
      { name: "Tailwind CSS", highlight: false },
      { name: "Livewire", highlight: false },
      { name: "Alpine.js", highlight: false },
      { name: "WordPress", highlight: false },
      { name: "Figma", highlight: false },
    ],
  },
  {
    label: "DEVOPS",
    chips: [
      { name: "GitHub Actions", highlight: true },
      { name: "Docker", highlight: false },
      { name: "Expo EAS", highlight: false },
      { name: "Git", highlight: false },
      { name: "App Store Connect", highlight: false },
      { name: "Google Play", highlight: false },
    ],
  },
  {
    label: "AI TOOLS",
    chips: [
      { name: "GitHub Copilot", highlight: true },
      { name: "Claude", highlight: true },
      { name: "Cursor", highlight: false },
      { name: "Grok", highlight: false },
    ],
  },
];

export function Stack() {
  return (
    <section id="stack" style={{ padding: "100px 0", background: "#0F1729" }}>
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
          04 · TECH STACK
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
          Tools I reach for.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          style={{ color: "#8892B0", fontSize: 16, marginBottom: 64 }}
        >
          The daily drivers, organized by layer.
        </motion.p>

        <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
          {categories.map((cat, i) => (
            <motion.div
              key={cat.label}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              style={{ display: "flex", gap: 24, alignItems: "center", flexWrap: "wrap" }}
            >
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 11,
                  color: "#8892B0",
                  letterSpacing: "0.1em",
                  minWidth: 100,
                }}
              >
                {cat.label}
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10, flex: 1 }}>
                {cat.chips.map((chip) => (
                  <motion.span
                    key={chip.name}
                    whileHover={{ scale: 1.05 }}
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: 14,
                      fontWeight: 500,
                      color: chip.highlight ? "#4F6EF7" : "#F0F4FF",
                      background: chip.highlight ? "rgba(79,110,247,0.1)" : "#131C35",
                      border: `1px solid ${chip.highlight ? "rgba(79,110,247,0.4)" : "#1E2D50"}`,
                      padding: "8px 18px",
                      borderRadius: 100,
                      cursor: "default",
                      transition: "border-color 0.2s, color 0.2s",
                    }}
                  >
                    {chip.name}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
