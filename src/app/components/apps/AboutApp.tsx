import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { MapPin, Building2, GraduationCap, Mail, Handshake } from "lucide-react";
import { SectionLabel, AppTitle, stagger } from "./shared";

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

function AnimatedNumber({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1800;
    const startTime = performance.now();
    const animate = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setVal(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [inView, target]);

  return (
    <span ref={ref}>
      {val}{suffix}
    </span>
  );
}

const metrics = [
  { num: 3, suffix: "+", label: "Years in production", color: "var(--color-accent)" },
  { num: 68, suffix: "%", label: "Crash-rate reduction", color: "var(--color-teal)" },
  { num: 70, suffix: "%", label: "Debug time cut via AI", color: "var(--color-amber)" },
  { num: 0, suffix: "", label: "Release cycle", color: "var(--color-accent)", custom: "wk→4d" },
];

export function AboutApp() {
  return (
    <div style={{ padding: "28px 32px 32px" }}>
      <SectionLabel>01 · ABOUT</SectionLabel>
      <AppTitle>The person behind the code.</AppTitle>

      {[
        <>I'm a 24-year-old developer from Caloocan, Philippines who started as an intern in 2023 and grew into a <strong style={{ color: "var(--color-text)", fontWeight: 500 }}>Team Lead and System Architect</strong> within three years — at the same company, through shipped features, measurable outcomes, and earned trust.</>,
        <>My work spans the full stack: mobile-first with Flutter and React Native, backend with Laravel, and everything in between. I don't just write code — I <strong style={{ color: "var(--color-text)", fontWeight: 500 }}>own systems</strong>, make architecture decisions, write ADRs, mentor engineers, and run Agile ceremonies.</>,
        <>I also pair heavily with AI: agentic workflows, MCP tooling, and a persistent knowledge vault keep my team shipping faster without cutting corners.</>,
        <>Outside of work, I'm a <strong style={{ color: "var(--color-text)", fontWeight: 500 }}>lay preacher and ministry worker</strong> with a Filipino church team. That work — communicating complex ideas clearly to diverse audiences — sharpens how I think about technical communication and leading teams.</>,
      ].map((p, i) => (
        <motion.p
          key={i}
          {...stagger(2 + i)}
          style={{ color: "var(--color-text-muted)", lineHeight: 1.8, marginBottom: 16, fontSize: 14.5 }}
        >
          {p}
        </motion.p>
      ))}

      <motion.div {...stagger(6)} style={{ display: "flex", flexWrap: "wrap", gap: 8, margin: "20px 0 28px" }}>
        {tags.map((t) => (
          <span
            key={t}
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11.5,
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

      {/* Metrics strip */}
      <motion.div
        {...stagger(7)}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
          gap: 12,
          marginBottom: 28,
        }}
      >
        {metrics.map((m, i) => (
          <div
            key={i}
            style={{
              background: "var(--color-surface)",
              border: "1px solid var(--color-border)",
              borderRadius: 12,
              padding: "16px 12px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 26,
                fontWeight: 500,
                color: m.color,
                lineHeight: 1,
                marginBottom: 8,
              }}
            >
              {m.custom ? m.custom : <AnimatedNumber target={m.num} suffix={m.suffix} />}
            </div>
            <div style={{ fontSize: 11.5, color: "var(--color-text-muted)", lineHeight: 1.4 }}>
              {m.label}
            </div>
          </div>
        ))}
      </motion.div>

      {/* Info card */}
      <motion.div
        {...stagger(8)}
        style={{
          background: "var(--color-surface)",
          border: "1px solid var(--color-border)",
          borderRadius: 14,
          padding: "8px 24px",
        }}
      >
        {cardRows.map((row, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 14,
              padding: "14px 0",
              borderBottom: i < cardRows.length - 1 ? "1px solid var(--color-border)" : "none",
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
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
              <div style={{ fontSize: 11.5, color: "var(--color-text-muted)", marginBottom: 2 }}>{row.label}</div>
              <div
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: 14,
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
  );
}
