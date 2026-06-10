import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";

const phrases = [
  "Full Stack Developer.",
  "Mobile Engineer.",
  "Team Lead & Architect.",
  "AI-Driven Builder.",
];

function useTypewriter(phrases: string[]) {
  const [text, setText] = useState("");
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [charIdx, setCharIdx] = useState(0);

  useEffect(() => {
    const phrase = phrases[phraseIdx];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting) {
      if (charIdx < phrase.length) {
        timeout = setTimeout(() => {
          setText(phrase.slice(0, charIdx + 1));
          setCharIdx((c) => c + 1);
        }, 70);
      } else {
        timeout = setTimeout(() => setDeleting(true), 1800);
      }
    } else {
      if (charIdx > 0) {
        timeout = setTimeout(() => {
          setText(phrase.slice(0, charIdx - 1));
          setCharIdx((c) => c - 1);
        }, 40);
      } else {
        setDeleting(false);
        setPhraseIdx((p) => (p + 1) % phrases.length);
      }
    }
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, phraseIdx, phrases]);

  return text;
}

function GridBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let animId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const particles: { x: number; y: number; vx: number; vy: number; opacity: number }[] = [];
    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.5 + 0.1,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Grid
      ctx.strokeStyle = "rgba(79,110,247,0.04)";
      ctx.lineWidth = 1;
      const step = 60;
      for (let x = 0; x < canvas.width; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Particles + connections
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(79,110,247,${p.opacity})`;
        ctx.fill();
      });

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(79,110,247,${0.06 * (1 - dist / 120)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    />
  );
}

export function Hero() {
  const typeText = useTypewriter(phrases);

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
        padding: "120px 0 80px",
        background: "#0A0F1E",
      }}
    >
      <GridBackground />

      {/* Glow blobs */}
      <div
        style={{
          position: "absolute",
          top: "5%",
          right: "-10%",
          width: 700,
          height: 700,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(79,110,247,0.10) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "10%",
          left: "-10%",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(100,255,218,0.05) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "0 32px",
          width: "100%",
          position: "relative",
          zIndex: 1,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 13,
            color: "#64FFDA",
            letterSpacing: "0.12em",
            marginBottom: 20,
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <span style={{ display: "block", width: 40, height: 1, background: "#64FFDA" }} />
          Hi, my name is
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "clamp(52px, 8vw, 96px)",
            fontWeight: 700,
            lineHeight: 0.95,
            letterSpacing: "-0.03em",
            color: "#F0F4FF",
            marginBottom: 12,
          }}
        >
          KC <span style={{ color: "#4F6EF7" }}>Acuin.</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.6 }}
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "clamp(20px, 3vw, 32px)",
            fontWeight: 300,
            color: "#8892B0",
            marginBottom: 32,
            minHeight: 44,
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <span>{typeText}</span>
          <span
            style={{
              display: "inline-block",
              width: 2,
              height: "1.1em",
              background: "#4F6EF7",
              marginLeft: 2,
              animation: "blink 1s step-end infinite",
            }}
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.6 }}
          style={{
            maxWidth: 560,
            color: "#8892B0",
            fontSize: 16,
            lineHeight: 1.8,
            marginBottom: 48,
          }}
        >
          Mid-level full stack and mobile developer based in{" "}
          <strong style={{ color: "#F0F4FF", fontWeight: 500 }}>the Philippines</strong>, currently{" "}
          <strong style={{ color: "#F0F4FF", fontWeight: 500 }}>
            Team Lead at Odecci Solutions Inc.
          </strong>{" "}
          I build production apps across Flutter, React Native, iOS, Android, and Laravel — and I
          make my teams faster with AI-driven workflows.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.6 }}
          style={{ display: "flex", gap: 16, flexWrap: "wrap", alignItems: "center" }}
        >
          <button
            onClick={() => scrollTo("#experience")}
            style={{
              background: "#4F6EF7",
              color: "#fff",
              padding: "14px 32px",
              borderRadius: 8,
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 600,
              fontSize: 15,
              border: "none",
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              transition: "background 0.2s, transform 0.15s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = "#3A55D4";
              (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "#4F6EF7";
              (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
            }}
          >
            View my work <ArrowDown size={16} />
          </button>
          <button
            onClick={() => scrollTo("#contact")}
            style={{
              border: "1px solid rgba(30,45,80,1)",
              color: "#F0F4FF",
              padding: "14px 32px",
              borderRadius: 8,
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 500,
              fontSize: 15,
              background: "transparent",
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              transition: "border-color 0.2s, transform 0.15s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "#4F6EF7";
              (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(30,45,80,1)";
              (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
            }}
          >
            Get in touch
          </button>

          <div style={{ display: "flex", gap: 12, marginLeft: 8 }}>
            {[
              { icon: <Github size={18} />, href: "https://github.com/kcacuin" },
              { icon: <Linkedin size={18} />, href: "https://linkedin.com/in/kcacuin" },
              { icon: <Mail size={18} />, href: "mailto:wkcacuin@gmail.com" },
            ].map((s, i) => (
              <a
                key={i}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  border: "1px solid rgba(30,45,80,1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#8892B0",
                  textDecoration: "none",
                  transition: "border-color 0.2s, color 0.2s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "#4F6EF7";
                  (e.currentTarget as HTMLElement).style.color = "#4F6EF7";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(30,45,80,1)";
                  (e.currentTarget as HTMLElement).style.color = "#8892B0";
                }}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          style={{
            position: "absolute",
            bottom: -40,
            left: 32,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
          }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            style={{
              width: 1,
              height: 60,
              background: "linear-gradient(to bottom, #4F6EF7, transparent)",
              borderRadius: 2,
            }}
          />
        </motion.div>
      </div>

      <style>{`@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }`}</style>
    </section>
  );
}
