import { useState, useEffect, useRef } from "react";
import { Play, Pause, RotateCcw } from "lucide-react";

const CountdownTimer = () => {
  const [hours, setHours] = useState("0");
  const [minutes, setMinutes] = useState("5");
  const [seconds, setSeconds] = useState("0");
  const [remaining, setRemaining] = useState<number | null>(null);
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const totalSeconds = () =>
    (parseInt(hours) || 0) * 3600 + (parseInt(minutes) || 0) * 60 + (parseInt(seconds) || 0);

  useEffect(() => {
    if (running && remaining !== null) {
      intervalRef.current = setInterval(() => {
        setRemaining(r => {
          if (r === null || r <= 0) { setRunning(false); setDone(true); clearInterval(intervalRef.current!); return 0; }
          return r - 1;
        });
      }, 1000);
    }
    return () => clearInterval(intervalRef.current!);
  }, [running]);

  const start = () => {
    if (remaining === null) setRemaining(totalSeconds());
    setDone(false);
    setRunning(true);
  };

  const pause = () => { setRunning(false); clearInterval(intervalRef.current!); };

  const reset = () => {
    setRunning(false); setDone(false); setRemaining(null);
    clearInterval(intervalRef.current!);
  };

  const display = remaining !== null ? remaining : totalSeconds();
  const h = Math.floor(display / 3600);
  const m = Math.floor((display % 3600) / 60);
  const s = display % 60;
  const pad = (n: number) => String(n).padStart(2, "0");
  const total = remaining !== null ? totalSeconds() : display;
  const pct = total > 0 ? (display / total) * 100 : 0;

  return (
    <div className="flex flex-col gap-6 w-full max-w-md mx-auto items-center">
      {/* Time inputs */}
      {remaining === null && (
        <div className="flex items-center gap-3 w-full">
          {[
            { label: "Hours", val: hours, set: setHours, max: 99 },
            { label: "Minutes", val: minutes, set: setMinutes, max: 59 },
            { label: "Seconds", val: seconds, set: setSeconds, max: 59 },
          ].map(({ label, val, set, max }, i) => (
            <div key={label} className="flex-1 flex flex-col items-center gap-1.5">
              <input type="number" value={val} min={0} max={max}
                onChange={e => set(String(Math.min(max, Math.max(0, parseInt(e.target.value) || 0))))}
                className="w-full px-2 py-3 rounded-xl border border-border bg-background text-center text-xl font-bold focus:outline-none focus:ring-2 focus:ring-primary/30" />
              <span className="text-xs text-muted-foreground font-semibold">{label}</span>
              {i < 2 && <span className="absolute text-2xl font-bold text-muted-foreground hidden" />}
            </div>
          ))}
        </div>
      )}

      {/* Circular display */}
      {remaining !== null && (
        <div className="relative w-48 h-48">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="44" fill="none" stroke="hsl(var(--border))" strokeWidth="8" />
            <circle cx="50" cy="50" r="44" fill="none" stroke="hsl(var(--primary))" strokeWidth="8"
              strokeDasharray={`${2 * Math.PI * 44}`}
              strokeDashoffset={`${2 * Math.PI * 44 * (1 - pct / 100)}`}
              strokeLinecap="round"
              style={{ transition: "stroke-dashoffset 1s linear" }} />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <p className={`text-4xl font-extrabold tabular-nums ${done ? "text-green-500" : ""}`}>
              {pad(h)}:{pad(m)}:{pad(s)}
            </p>
            {done && <p className="text-xs font-bold text-green-500 mt-1">✓ Done!</p>}
          </div>
        </div>
      )}

      {/* Controls */}
      <div className="flex gap-3">
        {!running ? (
          <button onClick={start} disabled={totalSeconds() === 0 && remaining === null}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-bold text-sm hover:bg-primary/90 transition-all disabled:opacity-40">
            <Play className="w-4 h-4" /> {remaining !== null ? "Resume" : "Start"}
          </button>
        ) : (
          <button onClick={pause}
            className="flex items-center gap-2 px-6 py-3 rounded-xl border border-border bg-card font-bold text-sm hover:bg-muted transition-all">
            <Pause className="w-4 h-4" /> Pause
          </button>
        )}
        <button onClick={reset}
          className="flex items-center gap-2 px-4 py-3 rounded-xl border border-border bg-card font-bold text-sm hover:bg-muted transition-all">
          <RotateCcw className="w-4 h-4" /> Reset
        </button>
      </div>
    </div>
  );
};

export default CountdownTimer;
