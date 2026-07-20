import { ThemeProvider } from "../context/ThemeContext";
import { WindowManagerProvider } from "../os/WindowManagerContext";
import { DesktopItemsProvider } from "../os/DesktopItemsContext";
import { BootSequence } from "../os/BootSequence";
import { Desktop } from "../os/Desktop";

export default function App() {
  return (
    <ThemeProvider>
      <WindowManagerProvider>
        <DesktopItemsProvider>
          <BootSequence>
            <Desktop />
          </BootSequence>
        </DesktopItemsProvider>
      </WindowManagerProvider>
    </ThemeProvider>
  );
}
