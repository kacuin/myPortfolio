import { motion } from "motion/react";
import { MapPin, Building2, GraduationCap, Mail, Handshake } from "lucide-react";

const tags = [
  "Flutter", "React Native", "Laravel", "iOS Swift",
  "Android Kotlin", "Firebase", "CI/CD", "AI-driven dev",
];

const cardRows = [
  { icon: <MapPin size={16} />, label: "Location", val: "Caloocan, Philippines" },
  { icon: <Building2 size={16} />, label: "Current role", val: "Mid-Level Full Stack Dev & Team Lead" },
  { icon: <GraduationCap size={16} />, label: "Education", val: "Diploma in CompEng Tech — PUP (2020–2024)" },
  { icon: <Mail size={16} />, label: "Email", val: "wkcacuin@gmail.com" },
  { icon: <Handshake size={16} />, label: "Open to", val: "Remote roles, freelance, senior/lead positions" },
];

export function About() {
  return (
    <section id="about" style={{ padding: "100px 0", background: "var(--color-bg)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 32px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 80,
            alignItems: "start",
          }}
          className="grid-cols-1 md:grid-cols-2"
        >
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
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
              01 · ABOUT
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
                marginBottom: 24,
              }}
            >
              The person<br />behind the code.
            </motion.h2>

            {[
              <>I'm a 24-year-old developer from Caloocan, Philippines who started as an intern in 2023 and grew into a <strong style={{ color: "var(--color-text)", fontWeight: 500 }}>Team Lead and System Architect</strong> within three years — at the same company, through shipped features, measurable outcomes, and earned trust.</>,
              <>My work spans the full stack: mobile-first with Flutter and React Native, backend with Laravel, and everything in between. I don't just write code — I <strong style={{ color: "var(--color-text)", fontWeight: 500 }}>own systems</strong>, make architecture decisions, write ADRs, mentor engineers, and run Agile ceremonies.</>,
              <>Outside of work, I'm a <strong style={{ color: "var(--color-text)", fontWeight: 500 }}>lay preacher and ministry worker</strong> with a Filipino church team. That work — communicating complex ideas clearly to diverse audiences — sharpens how I think about technical communication and leading teams.</>,
            ].map((p, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 + i * 0.1 }}
                style={{ color: "var(--color-text-muted)", lineHeight: 1.85, marginBottom: 20, fontSize: 15.5 }}
              >
                {p}
              </motion.p>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 32 }}
            >
              {tags.map((t) => (
                <span
                  key={t}
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 12,
                    color: "var(--color-teal)",
                    background: "var(--color-teal-dim)",
                    border: "1px solid rgba(100,255,218,0.15)",
                    padding: "4px 12px",
                    borderRadius: 100,
                  }}
                >
                  {t}
                </span>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            style={{
              background: "var(--color-surface)",
              border: "1px solid var(--color-border)",
              borderRadius: 16,
              padding: 32,
            }}
          >
            {cardRows.map((row, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 16,
                  padding: "16px 0",
                  borderBottom: i < cardRows.length - 1 ? "1px solid var(--color-border)" : "none",
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    background: "rgba(79,110,247,0.15)",
                    border: "1px solid rgba(79,110,247,0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--color-accent)",
                    flexShrink: 0,
                  }}
                >
                  {row.icon}
                </div>
                <div>
                  <div style={{ fontSize: 12, color: "var(--color-text-muted)", marginBottom: 2 }}>{row.label}</div>
                  <div
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: 15,
                      fontWeight: 500,
                      color: "var(--color-text)",
                    }}
                  >
                    {row.val}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
