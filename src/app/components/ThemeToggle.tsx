import { useEffect, useState } from "react";
import { Moon, SunMedium } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted ? resolvedTheme === "dark" : false;

  return (
    <button
      type="button"
      aria-label="Toggle light and dark mode"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      style={{
        border: "1px solid rgba(79,110,247,0.18)",
        background: "rgba(79,110,247,0.08)",
        color: "var(--foreground)",
        width: 40,
        height: 40,
        borderRadius: 999,
        display: "grid",
        placeItems: "center",
        cursor: "pointer",
        transition: "transform 0.2s ease, background 0.2s ease",
      }}
    >
      {isDark ? <SunMedium size={18} /> : <Moon size={18} />}
    </button>
  );
}
