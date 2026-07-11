import { useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useIsMobile } from "./useIsMobile";

/**
 * Living gradient wallpaper: large blurred color blobs drifting on slow CSS
 * keyframe loops, with a mouse-parallax layer shift (deeper blobs move less).
 */

type Blob = {
  color: string;
  size: number; // vmax
  top: string;
  left: string;
  drift: string; // keyframe animation name
  duration: number; // s
  depth: number; // parallax factor, px at full viewport offset
  opacity: number;
};

const BLOBS: Blob[] = [
  { color: "var(--wall-blob-1)", size: 58, top: "-18%", left: "-12%", drift: "wall-drift-a", duration: 74, depth: 26, opacity: 1 },
  { color: "var(--wall-blob-2)", size: 48, top: "8%", left: "62%", drift: "wall-drift-b", duration: 88, depth: 18, opacity: 1 },
  { color: "var(--wall-blob-3)", size: 44, top: "58%", left: "8%", drift: "wall-drift-c", duration: 66, depth: 12, opacity: 1 },
  { color: "var(--wall-blob-4)", size: 38, top: "62%", left: "70%", drift: "wall-drift-b", duration: 96, depth: 8, opacity: 0.8 },
];

export function Wallpaper() {
  const isMobile = useIsMobile();
  const mx = useMotionValue(0); // -0.5 .. 0.5 of viewport
  const my = useMotionValue(0);
  const px = useSpring(mx, { stiffness: 40, damping: 18, mass: 0.6 });
  const py = useSpring(my, { stiffness: 40, damping: 18, mass: 0.6 });

  useEffect(() => {
    if (isMobile) return;
    const move = (e: MouseEvent) => {
      mx.set(e.clientX / window.innerWidth - 0.5);
      my.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [isMobile, mx, my]);

  return (
    <div
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 0,
      }}
    >
      {BLOBS.map((b, i) => (
        <ParallaxBlob key={i} blob={b} px={px} py={py} />
      ))}
      {/* vignette sits above the blobs so edges stay grounded */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(120% 100% at 50% 45%, transparent 55%, var(--wall-vignette) 100%)",
        }}
      />
    </div>
  );
}

function ParallaxBlob({
  blob,
  px,
  py,
}: {
  blob: Blob;
  px: ReturnType<typeof useSpring>;
  py: ReturnType<typeof useSpring>;
}) {
  const x = useTransform(px, (v) => v * -2 * blob.depth);
  const y = useTransform(py, (v) => v * -2 * blob.depth);

  return (
    // Outer layer: parallax translate. Inner layer: infinite drift keyframes.
    <motion.div style={{ position: "absolute", inset: 0, x, y }}>
      <div
        style={{
          position: "absolute",
          top: blob.top,
          left: blob.left,
          width: `${blob.size}vmax`,
          height: `${blob.size}vmax`,
          borderRadius: "50%",
          background: `radial-gradient(circle at 50% 50%, ${blob.color} 0%, transparent 70%)`,
          filter: "blur(60px)",
          opacity: blob.opacity,
          animation: `${blob.drift} ${blob.duration}s ease-in-out infinite`,
          willChange: "transform",
        }}
      />
    </motion.div>
  );
}
