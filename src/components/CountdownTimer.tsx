import { useEffect, useState } from "react";

export const CountdownTimer = ({ minutes = 14, className = "" }: { minutes?: number; className?: string }) => {
  const [seconds, setSeconds] = useState(minutes * 60);
  useEffect(() => {
    const id = setInterval(() => setSeconds((s) => (s > 0 ? s - 1 : minutes * 60)), 1000);
    return () => clearInterval(id);
  }, [minutes]);
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  const fmt = (n: number) => n.toString().padStart(2, "0");
  return (
    <div className={`inline-flex items-center gap-2 font-mono tabular-nums ${className}`}>
      <span className="px-2 py-1 rounded bg-foreground text-background text-sm font-bold">{fmt(h)}</span>:
      <span className="px-2 py-1 rounded bg-foreground text-background text-sm font-bold">{fmt(m)}</span>:
      <span className="px-2 py-1 rounded bg-accent text-accent-foreground text-sm font-bold">{fmt(s)}</span>
    </div>
  );
};
