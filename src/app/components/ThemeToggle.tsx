// import { useEffect, useState } from "react";
// import { Moon, SunMedium } from "lucide-react";
// import { useTheme } from "next-themes";

// export function ThemeToggle() {
//   const { resolvedTheme, setTheme } = useTheme();
//   const [mounted, setMounted] = useState(false);

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   const isDark = mounted ? resolvedTheme === "dark" : false;

//   return (
//     <button
//       type="button"
//       aria-label="Toggle light and dark mode"
//       onClick={() => setTheme(isDark ? "light" : "dark")}
//       style={{
//         border: "1px solid rgba(79,110,247,0.18)",
//         background: "var(--color-accent-dim2)",
//         color: "var(--foreground)",
//         width: 40,
//         height: 40,
//         borderRadius: 999,
//         display: "grid",
//         placeItems: "center",
//         cursor: "pointer",
//         transition: "transform 0.2s ease, background 0.2s ease",
//       }}
//     >
//       {isDark ? <SunMedium size={18} /> : <Moon size={18} />}
//     </button>
//   );
// }
import { Moon, Sun } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  return (
    <button
      onClick={toggle}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      style={{
        width: 36, height: 36, borderRadius: "50%",
        border: "1px solid rgba(79,110,247,0.25)",
        background: "var(--color-accent-dim2)",
        color: "var(--color-text)",
        display: "grid", placeItems: "center",
        cursor: "pointer",
        transition: "background 0.2s, transform 0.15s",
        flexShrink: 0,
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.background = "rgba(79,110,247,0.18)";
        (e.currentTarget as HTMLElement).style.transform = "scale(1.05)";
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.background = "var(--color-accent-dim2)";
        (e.currentTarget as HTMLElement).style.transform = "scale(1)";
      }}
    >
      {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}