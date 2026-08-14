import { useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useIsMobile } from "./useIsMobile";
import { SPRING_PARALLAX } from "./motion";

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

/** feTurbulence noise as a data URI: ~200 bytes, no network request, and it
 *  tiles seamlessly at 160px. */
const GRAIN =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="160" height="160">` +
      `<filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch"/>` +
      `<feColorMatrix type="saturate" values="0"/></filter>` +
      `<rect width="160" height="160" filter="url(#n)" opacity="0.5"/></svg>`,
  );

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
  const px = useSpring(mx, SPRING_PARALLAX);
  const py = useSpring(my, SPRING_PARALLAX);

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

      {/* Light source, matching the one the window and dock shadows assume:
          above and slightly left. Without it the blobs read as flat colour. */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(80% 55% at 38% -10%, var(--wall-grain) 0%, transparent 60%)",
        }}
      />

      {/* vignette sits above the blobs so edges stay grounded */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(120% 100% at 50% 45%, transparent 55%, var(--wall-vignette) 100%)",
        }}
      />

      {/* Fine grain over everything. Large smooth gradients band visibly on
          8-bit displays; a little noise dithers that away and is the difference
          between "CSS gradient" and "surface". Inline SVG, so no request. */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.4,
          mixBlendMode: "overlay",
          backgroundImage: `url("${GRAIN}")`,
          backgroundRepeat: "repeat",
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
