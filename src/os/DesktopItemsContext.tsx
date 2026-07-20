import { createContext, useContext, useState } from "react";

const STORAGE_KEY = "kc-note-trashed";

type DesktopItems = {
  noteTrashed: boolean;
  trashNote: () => void;
  restoreNote: () => void;
};

const DesktopItemsContext = createContext<DesktopItems>({
  noteTrashed: false,
  trashNote: () => {},
  restoreNote: () => {},
});

/**
 * State for the loose items sitting on the desktop (currently just the sticky
 * note). Deliberately separate from WindowManagerContext — window state and
 * desktop-object state have nothing to do with each other, and merging them
 * would mean every note drag re-renders every window.
 */
export function DesktopItemsProvider({ children }: { children: React.ReactNode }) {
  const [noteTrashed, setNoteTrashed] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) === "1";
    } catch {
      return false;
    }
  });

  const persist = (trashed: boolean) => {
    setNoteTrashed(trashed);
    try {
      localStorage.setItem(STORAGE_KEY, trashed ? "1" : "0");
    } catch {
      /* non-fatal */
    }
  };

  return (
    <DesktopItemsContext.Provider
      value={{
        noteTrashed,
        trashNote: () => persist(true),
        restoreNote: () => persist(false),
      }}
    >
      {children}
    </DesktopItemsContext.Provider>
  );
}

export const useDesktopItems = () => useContext(DesktopItemsContext);
