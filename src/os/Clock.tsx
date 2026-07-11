import { useEffect, useState } from "react";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function format(d: Date, compact: boolean) {
  const h24 = d.getHours();
  const h = h24 % 12 === 0 ? 12 : h24 % 12;
  const m = d.getMinutes().toString().padStart(2, "0");
  const ampm = h24 < 12 ? "AM" : "PM";
  const time = `${h}:${m} ${ampm}`;
  if (compact) return time;
  return `${DAYS[d.getDay()]} ${MONTHS[d.getMonth()]} ${d.getDate()}  ${time}`;
}

export function Clock({ compact = false }: { compact?: boolean }) {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <span
      style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 11.5,
        color: "var(--color-text)",
        whiteSpace: "nowrap",
        letterSpacing: "0.02em",
      }}
    >
      {format(now, compact)}
    </span>
  );
}
