import { Moon, Sun } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

// Compact menu-bar style toggle for the macOS desktop chrome.
export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  return (
    <button
      onClick={toggle}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      style={{
        width: 22, height: 22, borderRadius: 6,
        border: "none",
        background: "transparent",
        color: "var(--color-text)",
        display: "grid", placeItems: "center",
        cursor: "pointer",
        transition: "background 0.15s",
        flexShrink: 0,
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.background = "var(--color-accent-dim)";
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.background = "transparent";
      }}
    >
      {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
    </button>
  );
}