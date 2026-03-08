import { useState } from "react";

type CalcType = "percent-of" | "what-percent" | "percent-change";

const PercentageCalculator = () => {
  const [type, setType] = useState<CalcType>("percent-of");
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [result, setResult] = useState<string | null>(null);

  const calculate = () => {
    const x = parseFloat(a), y = parseFloat(b);
    if (isNaN(x) || isNaN(y)) return;
    if (type === "percent-of") setResult(`${((x / 100) * y).toFixed(4).replace(/\.?0+$/, "")}`);
    else if (type === "what-percent") {
      if (y === 0) return;
      setResult(`${((x / y) * 100).toFixed(4).replace(/\.?0+$/, "")}%`);
    } else {
      if (x === 0) return;
      const change = ((y - x) / Math.abs(x)) * 100;
      setResult(`${change >= 0 ? "+" : ""}${change.toFixed(2)}%`);
    }
  };

  const configs: Record<CalcType, { labelA: string; labelB: string; placeholder: string }> = {
    "percent-of":    { labelA: "Percentage (%)", labelB: "Of value", placeholder: "e.g. 15% of 200 = 30" },
    "what-percent":  { labelA: "Value A", labelB: "Of value B", placeholder: "e.g. 30 is what % of 200?" },
    "percent-change":{ labelA: "Original value", labelB: "New value", placeholder: "e.g. 100 → 120 = +20%" },
  };

  const cfg = configs[type];

  return (
    <div className="flex flex-col gap-5 w-full max-w-md mx-auto">
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Calculation Type</label>
        <select value={type} onChange={e => { setType(e.target.value as CalcType); setResult(null); }}
          className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30">
          <option value="percent-of">What is X% of Y?</option>
          <option value="what-percent">X is what % of Y?</option>
          <option value="percent-change">Percentage change from X to Y</option>
        </select>
      </div>

      <p className="text-xs text-muted-foreground bg-muted rounded-xl px-4 py-2.5">{cfg.placeholder}</p>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">{cfg.labelA}</label>
          <input type="number" value={a} onChange={e => setA(e.target.value)} placeholder="Enter value"
            className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">{cfg.labelB}</label>
          <input type="number" value={b} onChange={e => setB(e.target.value)} placeholder="Enter value"
            className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
        </div>
      </div>

      <button onClick={calculate}
        className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-bold text-sm hover:bg-primary/90 transition-all">
        Calculate
      </button>

      {result !== null && (
        <div className="rounded-2xl border border-border bg-card p-6 text-center">
          <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wide mb-2">Result</p>
          <p className="text-4xl font-extrabold text-primary">{result}</p>
        </div>
      )}
    </div>
  );
};

export default PercentageCalculator;
