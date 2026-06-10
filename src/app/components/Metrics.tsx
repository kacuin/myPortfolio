import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";

function AnimatedNumber({ target, suffix = "", prefix = "" }: { target: number; suffix?: string; prefix?: string }) {
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
      {prefix}{val}{suffix}
    </span>
  );
}

const metrics = [
  {
    num: 3,
    suffix: "+",
    label: "Years in production\ndevelopment",
    color: "#4F6EF7",
  },
  {
    num: 68,
    suffix: "%",
    label: "App crash rate\nreduction",
    color: "#64FFDA",
  },
  {
    num: 70,
    suffix: "%",
    label: "Debugging time cut\nvia AI tooling",
    color: "#F5A623",
  },
  {
    num: 3,
    suffix: "",
    label: "Week→4d release\ncycle improvement",
    color: "#4F6EF7",
  },
];

export function Metrics() {
  return (
    <section
      style={{
        background: "#131C35",
        borderTop: "1px solid #1E2D50",
        borderBottom: "1px solid #1E2D50",
        padding: "56px 0",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 32px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 0,
          }}
          className="grid-cols-2 sm:grid-cols-4"
        >
          {metrics.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              style={{
                textAlign: "center",
                padding: "16px 24px",
                borderRight: i < metrics.length - 1 ? "1px solid #1E2D50" : "none",
              }}
            >
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "clamp(28px, 4vw, 42px)",
                  fontWeight: 500,
                  color: m.color,
                  lineHeight: 1,
                  marginBottom: 10,
                }}
              >
                {i === 3 ? (
                  <>
                    <AnimatedNumber target={3} />
                    <span style={{ color: "#F5A623", fontSize: "0.7em" }}>wk→</span>
                    <AnimatedNumber target={4} />
                    <span style={{ color: "#F5A623", fontSize: "0.7em" }}>d</span>
                  </>
                ) : (
                  <AnimatedNumber target={m.num} suffix={m.suffix} />
                )}
              </div>
              <div
                style={{
                  fontSize: 13,
                  color: "#8892B0",
                  lineHeight: 1.5,
                  whiteSpace: "pre-line",
                }}
              >
                {m.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
