import {
  createContext,
  useContext,
  useReducer,
  useRef,
  type ReactNode,
  type RefObject,
} from "react";
import { appById, type AppId } from "./apps";
import { playSound } from "./sounds";

export type WinState = {
  open: boolean;
  minimized: boolean;
  zIndex: number;
  pos: { x: number; y: number };
  size: { w: number; h: number };
  /** Set while zoomed (green light) — the rect to restore to. */
  prevRect: { x: number; y: number; w: number; h: number } | null;
  launching: boolean;
};

type State = {
  windows: Partial<Record<AppId, WinState>>;
  nextZ: number;
  focused: AppId | null;
};

type Action =
  | { type: "OPEN"; id: AppId; pos: { x: number; y: number }; size: { w: number; h: number } }
  | { type: "CLOSE"; id: AppId }
  | { type: "MINIMIZE"; id: AppId }
  | { type: "FOCUS"; id: AppId }
  | { type: "MOVE"; id: AppId; pos: { x: number; y: number } }
  | { type: "RESIZE"; id: AppId; pos: { x: number; y: number }; size: { w: number; h: number } }
  | { type: "ZOOM"; id: AppId; rect: { x: number; y: number; w: number; h: number } }
  | { type: "LAUNCHED"; id: AppId }
  | { type: "MINIMIZE_ALL" };

const initial: State = { windows: {}, nextZ: 10, focused: null };

function reducer(state: State, action: Action): State {
  const win = state.windows[("id" in action ? action.id : "") as AppId];
  switch (action.type) {
    case "OPEN": {
      if (win?.open && !win.minimized) {
        // already visible → just focus
        return reducer(state, { type: "FOCUS", id: action.id });
      }
      if (win?.open && win.minimized) {
        // restore from dock
        return {
          ...state,
          focused: action.id,
          nextZ: state.nextZ + 1,
          windows: {
            ...state.windows,
            [action.id]: { ...win, minimized: false, zIndex: state.nextZ },
          },
        };
      }
      return {
        ...state,
        focused: action.id,
        nextZ: state.nextZ + 1,
        windows: {
          ...state.windows,
          [action.id]: {
            open: true,
            minimized: false,
            zIndex: state.nextZ,
            pos: action.pos,
            size: action.size,
            prevRect: null,
            launching: true,
          },
        },
      };
    }
    case "CLOSE": {
      if (!win) return state;
      const windows = { ...state.windows };
      delete windows[action.id];
      return {
        ...state,
        windows,
        focused: state.focused === action.id ? null : state.focused,
      };
    }
    case "MINIMIZE": {
      if (!win) return state;
      return {
        ...state,
        focused: state.focused === action.id ? null : state.focused,
        windows: { ...state.windows, [action.id]: { ...win, minimized: true } },
      };
    }
    case "FOCUS": {
      if (!win || (state.focused === action.id && !win.minimized)) return state;
      return {
        ...state,
        focused: action.id,
        nextZ: state.nextZ + 1,
        windows: {
          ...state.windows,
          [action.id]: { ...win, minimized: false, zIndex: state.nextZ },
        },
      };
    }
    case "MOVE": {
      if (!win) return state;
      return {
        ...state,
        windows: { ...state.windows, [action.id]: { ...win, pos: action.pos } },
      };
    }
    case "RESIZE": {
      if (!win) return state;
      return {
        ...state,
        windows: {
          ...state.windows,
          // manual resize breaks out of zoomed state
          [action.id]: { ...win, pos: action.pos, size: action.size, prevRect: null },
        },
      };
    }
    case "ZOOM": {
      if (!win) return state;
      const zoomed = win.prevRect
        ? {
            ...win,
            pos: { x: win.prevRect.x, y: win.prevRect.y },
            size: { w: win.prevRect.w, h: win.prevRect.h },
            prevRect: null,
          }
        : {
            ...win,
            prevRect: { ...win.pos, w: win.size.w, h: win.size.h },
            pos: { x: action.rect.x, y: action.rect.y },
            size: { w: action.rect.w, h: action.rect.h },
          };
      return {
        ...state,
        focused: action.id,
        nextZ: state.nextZ + 1,
        windows: { ...state.windows, [action.id]: { ...zoomed, zIndex: state.nextZ } },
      };
    }
    case "LAUNCHED": {
      if (!win) return state;
      return {
        ...state,
        windows: { ...state.windows, [action.id]: { ...win, launching: false } },
      };
    }
    case "MINIMIZE_ALL": {
      const windows = { ...state.windows };
      (Object.keys(windows) as AppId[]).forEach((id) => {
        const w = windows[id];
        if (w?.open) windows[id] = { ...w, minimized: true };
      });
      return { ...state, windows, focused: null };
    }
  }
}

type Ctx = {
  windows: State["windows"];
  focused: AppId | null;
  openApp: (id: AppId) => void;
  closeApp: (id: AppId) => void;
  minimizeApp: (id: AppId) => void;
  focusApp: (id: AppId) => void;
  moveWindow: (id: AppId, pos: { x: number; y: number }) => void;
  resizeWindow: (id: AppId, pos: { x: number; y: number }, size: { w: number; h: number }) => void;
  zoomApp: (id: AppId) => void;
  markLaunched: (id: AppId) => void;
  minimizeAll: () => void;
  /** Dock icon DOM nodes, keyed by app id — used to aim the minimize animation. */
  iconRefs: RefObject<Partial<Record<AppId, HTMLElement | null>>>;
};

const WindowManagerContext = createContext<Ctx | null>(null);

let openCount = 0;

function cascadedPos() {
  const offset = (openCount++ % 6) * 32;
  const w = window.innerWidth;
  const h = window.innerHeight;
  // roughly centered, cascading down-right, clamped for small screens
  return {
    x: Math.max(12, w * 0.5 - 380 + offset),
    y: Math.max(40, h * 0.5 - 300 + offset * 0.75),
  };
}

export function WindowManagerProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initial);
  const iconRefs = useRef<Partial<Record<AppId, HTMLElement | null>>>({});

  const value: Ctx = {
    windows: state.windows,
    focused: state.focused,
    openApp: (id) => {
      const def = appById(id);
      const size = def
        ? {
            w: Math.min(def.size.w, window.innerWidth - 24),
            h: Math.min(def.size.h, window.innerHeight - 120),
          }
        : { w: 600, h: 480 };
      playSound("open");
      dispatch({ type: "OPEN", id, pos: cascadedPos(), size });
    },
    closeApp: (id) => {
      playSound("close");
      dispatch({ type: "CLOSE", id });
    },
    minimizeApp: (id) => {
      playSound("minimize");
      dispatch({ type: "MINIMIZE", id });
    },
    focusApp: (id) => dispatch({ type: "FOCUS", id }),
    moveWindow: (id, pos) => dispatch({ type: "MOVE", id, pos }),
    resizeWindow: (id, pos, size) => dispatch({ type: "RESIZE", id, pos, size }),
    zoomApp: (id) =>
      dispatch({
        type: "ZOOM",
        id,
        rect: {
          x: 12,
          y: 36, // below the menu bar
          w: window.innerWidth - 24,
          h: window.innerHeight - 36 - 96, // leave room for the dock
        },
      }),
    markLaunched: (id) => dispatch({ type: "LAUNCHED", id }),
    minimizeAll: () => {
      playSound("minimize");
      dispatch({ type: "MINIMIZE_ALL" });
    },
    iconRefs,
  };

  return (
    <WindowManagerContext.Provider value={value}>
      {children}
    </WindowManagerContext.Provider>
  );
}

export function useWindowManager() {
  const ctx = useContext(WindowManagerContext);
  if (!ctx) throw new Error("useWindowManager must be used inside WindowManagerProvider");
  return ctx;
}
