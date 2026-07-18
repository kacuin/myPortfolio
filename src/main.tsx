
  import { createRoot } from "react-dom/client";
  import App from "./app/App.tsx";
  import "./styles/index.css";

  createRoot(document.getElementById("root")!).render(<App />);

  // The crawlable fallback (injected by vite-plugins/seoContent.ts) is only for
  // clients that never run JS. Once the desktop shell mounts, drop it.
  document.getElementById("seo-content")?.remove();
  