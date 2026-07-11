import { ThemeProvider } from "../context/ThemeContext";
import { WindowManagerProvider } from "../os/WindowManagerContext";
import { Desktop } from "../os/Desktop";

export default function App() {
  return (
    <ThemeProvider>
      <WindowManagerProvider>
        <Desktop />
      </WindowManagerProvider>
    </ThemeProvider>
  );
}
