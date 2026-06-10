import { useEffect, useRef } from "react";
import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { Metrics } from "./components/Metrics";
import { About } from "./components/About";
import { Experience } from "./components/Experience";
import { Projects } from "./components/Projects";
import { Skills } from "./components/Skills";
import { Stack } from "./components/Stack";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";

function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (!glowRef.current) return;
      glowRef.current.style.left = `${e.clientX}px`;
      glowRef.current.style.top = `${e.clientY}px`;
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div
      ref={glowRef}
      style={{
        position: "fixed",
        width: 400,
        height: 400,
        borderRadius: "50%",
        background:
          "radial-gradient(circle, rgba(79,110,247,0.06) 0%, transparent 70%)",
        transform: "translate(-50%, -50%)",
        pointerEvents: "none",
        zIndex: 0,
        transition: "left 0.08s ease, top 0.08s ease",
      }}
    />
  );
}

export default function App() {
  return (
    <div
      style={{
        background: "#0A0F1E",
        color: "#F0F4FF",
        fontFamily: "'Inter', sans-serif",
        minHeight: "100vh",
        overflowX: "hidden",
        scrollBehavior: "smooth",
      }}
    >
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #0A0F1E; overflow-x: hidden; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #0A0F1E; }
        ::-webkit-scrollbar-thumb { background: #1E2D50; border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: #4F6EF7; }
        ::selection { background: rgba(79,110,247,0.3); color: #F0F4FF; }
        input, textarea { box-sizing: border-box; }

        @media (max-width: 768px) {
          .grid-cols-1 { grid-template-columns: 1fr !important; gap: 40px !important; }
          .md\\:grid-cols-2 { grid-template-columns: 1fr !important; }
          .hidden { display: none !important; }
          .sm\\:flex { display: none !important; }
        }
        @media (min-width: 640px) {
          .sm\\:flex { display: flex !important; }
          .hidden { display: block !important; }
        }
        @media (max-width: 640px) {
          .sm\\:hidden { display: none; }
        }
      `}</style>

      <CursorGlow />
      <Nav />
      <Hero />
      <Metrics />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Stack />
      <Contact />
      <Footer />
    </div>
  );
}
