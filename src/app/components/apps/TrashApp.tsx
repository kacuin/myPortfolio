import { Trash2 } from "lucide-react";

export function TrashApp() {
  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 14,
        padding: 32,
        textAlign: "center",
      }}
    >
      <Trash2 size={40} color="var(--color-text-subtle)" strokeWidth={1.4} />
      <div
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 16,
          fontWeight: 600,
          color: "var(--color-text)",
        }}
      >
        Trash is empty
      </div>
      <div
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 13.5,
          color: "var(--color-text-muted)",
          maxWidth: 300,
          lineHeight: 1.6,
        }}
      >
        I don't throw away good ideas — they end up in the vault instead.
      </div>
    </div>
  );
}
