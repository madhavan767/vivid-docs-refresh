import { useState } from "react";
import { Activity } from "lucide-react";

const BmiCalculator = () => {
  const [unit, setUnit] = useState<"metric" | "imperial">("metric");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [heightFt, setHeightFt] = useState("");
  const [heightIn, setHeightIn] = useState("");
  const [bmi, setBmi] = useState<number | null>(null);

  const calculate = () => {
    let h = parseFloat(height);
    let w = parseFloat(weight);
    if (unit === "imperial") {
      const ft = parseFloat(heightFt) || 0;
      const inches = parseFloat(heightIn) || 0;
      h = (ft * 12 + inches) * 2.54; // cm
      w = w * 0.453592; // kg
    }
    if (!h || !w || h <= 0 || w <= 0) return;
    const hm = h / 100;
    setBmi(parseFloat((w / (hm * hm)).toFixed(1)));
  };

  const getCategory = (b: number) => {
    if (b < 18.5) return { label: "Underweight", color: "text-blue-500" };
    if (b < 25) return { label: "Normal weight", color: "text-green-500" };
    if (b < 30) return { label: "Overweight", color: "text-yellow-500" };
    return { label: "Obese", color: "text-destructive" };
  };

  const reset = () => { setHeight(""); setWeight(""); setHeightFt(""); setHeightIn(""); setBmi(null); };

  return (
    <div className="flex flex-col gap-6 w-full max-w-md mx-auto">
      {/* Unit Toggle */}
      <div className="flex rounded-xl overflow-hidden border border-border">
        {(["metric", "imperial"] as const).map(u => (
          <button key={u} onClick={() => { setUnit(u); reset(); }}
            className={`flex-1 py-2.5 text-sm font-semibold transition-all ${unit === u ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground hover:bg-muted"}`}>
            {u === "metric" ? "Metric (kg/cm)" : "Imperial (lb/ft)"}
          </button>
        ))}
      </div>

      {unit === "metric" ? (
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Height (cm)</label>
            <input type="number" value={height} onChange={e => setHeight(e.target.value)} placeholder="e.g. 175"
              className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Weight (kg)</label>
            <input type="number" value={weight} onChange={e => setWeight(e.target.value)} placeholder="e.g. 70"
              className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Feet</label>
            <input type="number" value={heightFt} onChange={e => setHeightFt(e.target.value)} placeholder="5"
              className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Inches</label>
            <input type="number" value={heightIn} onChange={e => setHeightIn(e.target.value)} placeholder="9"
              className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Weight (lb)</label>
            <input type="number" value={weight} onChange={e => setWeight(e.target.value)} placeholder="154"
              className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
          </div>
        </div>
      )}

      <button onClick={calculate}
        className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-bold text-sm hover:bg-primary/90 transition-all">
        Calculate BMI
      </button>

      {bmi !== null && (
        <div className="rounded-2xl border border-border bg-card p-6 text-center space-y-2">
          <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wide">Your BMI</p>
          <p className="text-5xl font-extrabold">{bmi}</p>
          <p className={`text-lg font-bold ${getCategory(bmi).color}`}>{getCategory(bmi).label}</p>
          <div className="mt-4 grid grid-cols-4 gap-2 text-xs">
            {[
              { range: "< 18.5", label: "Underweight", color: "bg-blue-500/10 text-blue-600" },
              { range: "18.5–24.9", label: "Normal", color: "bg-green-500/10 text-green-600" },
              { range: "25–29.9", label: "Overweight", color: "bg-yellow-500/10 text-yellow-600" },
              { range: "≥ 30", label: "Obese", color: "bg-destructive/10 text-destructive" },
            ].map(c => (
              <div key={c.label} className={`rounded-lg px-2 py-2 font-medium ${c.color}`}>
                <p className="font-bold">{c.label}</p>
                <p className="opacity-70">{c.range}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BmiCalculator;
