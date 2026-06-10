import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import meDayImage from "../../assets/me_day.jpeg";
import meNightImage from "../../assets/me_night.png";


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

// --- PhotoFrame component ---
function PhotoFrame() {
  const { theme } = useTheme();
  const frameRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const animRef = useRef<number>(0);
  const [hovered, setHovered] = useState(false);

  // Draw the window overlay (day = bright sky tint, night = dark blue with stars)
  // useEffect(() => {
  //   const canvas = canvasRef.current;
  //   if (!canvas) return;
  //   const ctx = canvas.getContext("2d")!;
  //   let frame = 0;

  //   const draw = () => {
  //     const { width: w, height: h } = canvas;
  //     ctx.clearRect(0, 0, w, h);

  //     const isDark = theme === "dark";
  //     const mx = mouseRef.current.x;
  //     const my = mouseRef.current.y;

  //     if (isDark) {
  //       // Night: deep blue gradient over window area (top-left region of photo)
  //       const grad = ctx.createRadialGradient(
  //         w * 0.28, h * 0.35, 10,
  //         w * 0.28, h * 0.35, w * 0.55
  //       );
  //       grad.addColorStop(0, "rgba(15,25,65,0.72)");
  //       grad.addColorStop(0.5, "rgba(8,15,45,0.58)");
  //       grad.addColorStop(1, "rgba(0,0,0,0)");
  //       ctx.fillStyle = grad;
  //       ctx.fillRect(0, 0, w * 0.62, h * 0.78);

  //       // Stars — stable positions, pulse slightly
  //       const stars = [
  //         [0.06, 0.06], [0.14, 0.12], [0.22, 0.04], [0.08, 0.20],
  //         [0.18, 0.22], [0.30, 0.08], [0.36, 0.18], [0.26, 0.28],
  //         [0.10, 0.32], [0.42, 0.10], [0.04, 0.15], [0.34, 0.30],
  //       ];
  //       stars.forEach(([sx, sy], i) => {
  //         const pulse = 0.5 + 0.5 * Math.sin(frame * 0.04 + i * 0.9);
  //         const size = 1.2 + pulse * 0.8;
  //         ctx.beginPath();
  //         ctx.arc(sx * w, sy * h * 0.78, size, 0, Math.PI * 2);
  //         ctx.fillStyle = `rgba(200,220,255,${0.55 + pulse * 0.45})`;
  //         ctx.fill();
  //       });

  //       // Moon glow near top-right of window
  //       const moonX = w * 0.38 + mx * w * 0.04;
  //       const moonY = h * 0.10 + my * h * 0.04;
  //       const moonGrad = ctx.createRadialGradient(moonX, moonY, 2, moonX, moonY, 28);
  //       moonGrad.addColorStop(0, "rgba(220,235,255,0.85)");
  //       moonGrad.addColorStop(0.4, "rgba(160,190,255,0.25)");
  //       moonGrad.addColorStop(1, "rgba(0,0,0,0)");
  //       ctx.fillStyle = moonGrad;
  //       ctx.beginPath();
  //       ctx.arc(moonX, moonY, 28, 0, Math.PI * 2);
  //       ctx.fill();
  //       ctx.beginPath();
  //       ctx.arc(moonX, moonY, 7, 0, Math.PI * 2);
  //       ctx.fillStyle = "rgba(235,245,255,0.90)";
  //       ctx.fill();

  //     } else {
  //       // Day: subtle warm sky tint, keep the photo mostly visible
  //       const skyGrad = ctx.createLinearGradient(0, 0, w * 0.5, h * 0.65);
  //       skyGrad.addColorStop(0, "rgba(210,230,255,0.22)");
  //       skyGrad.addColorStop(1, "rgba(255,255,255,0)");
  //       ctx.fillStyle = skyGrad;
  //       ctx.fillRect(0, 0, w * 0.62, h * 0.75);

  //       // Sunlight lens flare near window top
  //       const sunX = w * 0.15 + mx * w * 0.06;
  //       const sunY = h * 0.06 + my * h * 0.03;
  //       const flare = ctx.createRadialGradient(sunX, sunY, 0, sunX, sunY, 55);
  //       flare.addColorStop(0, "rgba(255,248,200,0.55)");
  //       flare.addColorStop(0.5, "rgba(255,230,120,0.12)");
  //       flare.addColorStop(1, "rgba(255,255,255,0)");
  //       ctx.fillStyle = flare;
  //       ctx.beginPath();
  //       ctx.arc(sunX, sunY, 55, 0, Math.PI * 2);
  //       ctx.fill();
  //     }

  //     // Cursor-following shimmer on photo edges
  //     if (hovered) {
  //       const edgeGrad = ctx.createRadialGradient(
  //         mx * w, my * h, 0,
  //         mx * w, my * h, 80
  //       );
  //       edgeGrad.addColorStop(0, "rgba(79,110,247,0.12)");
  //       edgeGrad.addColorStop(1, "rgba(79,110,247,0)");
  //       ctx.fillStyle = edgeGrad;
  //       ctx.fillRect(0, 0, w, h);
  //     }

  //     frame++;
  //     animRef.current = requestAnimationFrame(draw);
  //   };

  //   draw();
  //   return () => cancelAnimationFrame(animRef.current);
  // }, [theme, hovered]);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = frameRef.current!.getBoundingClientRect();
    mouseRef.current = {
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    };
  };

  return (
    <motion.div
      ref={frameRef}
      onMouseMove={onMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: "relative",
        width: "100%",
        maxWidth: 400,
        aspectRatio: "3/4",
        borderRadius: 20,
        overflow: "hidden",
        border: `1px solid var(--color-border)`,
        boxShadow: theme === "dark"
          ? "0 32px 80px rgba(0,0,10,0.55), 0 0 0 1px rgba(79,110,247,0.12)"
          : "0 32px 80px rgba(61,91,245,0.12), 0 0 0 1px rgba(61,91,245,0.10)",
        cursor: "none",
        flexShrink: 0,
        transition: "box-shadow 0.4s",
      }}
    >
      {/* The photo */}
      <img
        src={theme === "dark" ? meNightImage : meDayImage}
        alt="KC Acuin"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center top",
          display: "block",
          // desaturate slightly in dark mode for the night effect
          // filter: theme === "dark" ? "brightness(0.82) saturate(0.75)" : "brightness(1) saturate(1)",
          transition: "filter 0.8s ease",
        }}
      />

      {/* Canvas overlay for day/night + mouse effects */}
      <canvas
        ref={canvasRef}
        width={400}
        height={533}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
      />

      {/* Custom cursor dot */}
      <CustomCursorDot frameRef={frameRef} hovered={hovered} />

      {/* Bottom name badge */}
      {/* <div
        style={{
          position: "absolute",
          bottom: 16,
          left: 16,
          right: 16,
          background: theme === "dark"
            ? "rgba(10,15,30,0.72)"
            : "rgba(255,255,255,0.82)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderRadius: 12,
          padding: "10px 14px",
          border: `1px solid var(--color-border)`,
          transition: "background 0.4s",
        }}
      >
        <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600, color: "var(--color-text)" }}>
          KC Acuin
        </div>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "var(--color-accent)", marginTop: 2 }}>
          Team Lead · Odecci Solutions
        </div>
      </div> */}

      {/* Day/night indicator badge */}
      {/* <div
        style={{
          position: "absolute",
          top: 14,
          right: 14,
          display: "flex",
          alignItems: "center",
          gap: 5,
          background: theme === "dark" ? "rgba(10,15,40,0.75)" : "rgba(255,255,255,0.80)",
          backdropFilter: "blur(8px)",
          border: `1px solid var(--color-border)`,
          borderRadius: 100,
          padding: "4px 10px",
          transition: "background 0.4s",
        }}
      >
        <span style={{ fontSize: 11 }}>{theme === "dark" ? "🌙" : "☀️"}</span>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "var(--color-text-muted)" }}>
          {theme === "dark" ? "Night" : "Day"}
        </span>
      </div> */}
    </motion.div>
  );
}

// Cursor that follows mouse inside the photo
function CustomCursorDot({
  frameRef,
  hovered,
}: {
  frameRef: React.RefObject<HTMLDivElement>;
  hovered: boolean;
}) {
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const frame = frameRef.current;
    const dot = dotRef.current;
    if (!frame || !dot) return;
    const onMove = (e: MouseEvent) => {
      const rect = frame.getBoundingClientRect();
      dot.style.left = `${e.clientX - rect.left}px`;
      dot.style.top = `${e.clientY - rect.top}px`;
    };
    frame.addEventListener("mousemove", onMove);
    return () => frame.removeEventListener("mousemove", onMove);
  }, [frameRef]);

  return (
    <div
      ref={dotRef}
      style={{
        position: "absolute",
        width: hovered ? 28 : 0,
        height: hovered ? 28 : 0,
        borderRadius: "50%",
        background: "rgba(79,110,247,0.25)",
        border: "1.5px solid rgba(79,110,247,0.55)",
        transform: "translate(-50%, -50%)",
        pointerEvents: "none",
        transition: "width 0.2s, height 0.2s, opacity 0.2s",
        opacity: hovered ? 1 : 0,
        zIndex: 10,
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
        background: "var(--color-bg)",
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
        // style={{
        //   maxWidth: 1100,
        //   margin: "0 auto",
        //   padding: "0 32px",
        //   width: "100%",
        //   position: "relative",
        //   zIndex: 1,
        // }}
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "0 32px",
          width: "100%",
          position: "relative",
          zIndex: 1,
          display: "flex",
          alignItems: "center",
          gap: "clamp(40px, 6vw, 96px)",
          justifyContent: "space-between",
        }}
      >
        <div style={{ flex: "1 1 0", minWidth: 0 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 13,
              color: "var(--color-teal)",
              letterSpacing: "0.12em",
              marginBottom: 20,
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <span style={{ display: "block", width: 40, height: 1, background: "var(--color-teal)" }} />
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
              color: "var(--color-text)",
              marginBottom: 12,
            }}
          >
            KC <span style={{ color: "var(--color-accent)" }}>Acuin.</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.6 }}
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "clamp(20px, 3vw, 32px)",
              fontWeight: 300,
              color: "var(--color-text-muted)",
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
                background: "var(--color-accent)",
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
              color: "var(--color-text-muted)",
              fontSize: 16,
              lineHeight: 1.8,
              marginBottom: 48,
            }}
          >
            Mid-level full stack and mobile developer based in{" "}
            <strong style={{ color: "var(--color-text)", fontWeight: 500 }}>the Philippines</strong>, currently{" "}
            <strong style={{ color: "var(--color-text)", fontWeight: 500 }}>
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
                background: "var(--color-accent)",
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
                (e.currentTarget as HTMLElement).style.background = "var(--color-accent-hover)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "var(--color-accent)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              }}
            >
              View my work <ArrowDown size={16} />
            </button>
            <button
              onClick={() => scrollTo("#contact")}
              style={{
                border: "1px solid rgba(30,45,80,1)",
                color: "var(--color-text)",
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
                (e.currentTarget as HTMLElement).style.borderColor = "var(--color-accent)";
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
                    color: "var(--color-text-muted)",
                    textDecoration: "none",
                    transition: "border-color 0.2s, color 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "var(--color-accent)";
                    (e.currentTarget as HTMLElement).style.color = "var(--color-accent)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(30,45,80,1)";
                    (e.currentTarget as HTMLElement).style.color = "var(--color-text-muted)";
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
                background: "linear-gradient(to bottom, var(--color-accent), transparent)",
                borderRadius: 2,
              }}
            />
          </motion.div>
        </div>

        <div
          className="hidden sm:flex"
          style={{ flexDirection: "column", alignItems: "center", flexShrink: 0, width: "clamp(260px, 30vw, 380px)" }}
        >
          <PhotoFrame />
        </div>
      </div>

      <style>{`@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }`}</style>
    </section>
  );
}
