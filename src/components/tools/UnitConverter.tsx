import { useState } from "react";
import { ArrowLeftRight } from "lucide-react";

type Category = "length" | "weight" | "temperature" | "area" | "volume" | "speed";

const units: Record<Category, { label: string; toBase: (v: number) => number; fromBase: (v: number) => number }[]> = {
  length: [
    { label: "Millimeter (mm)", toBase: v => v / 1000, fromBase: v => v * 1000 },
    { label: "Centimeter (cm)", toBase: v => v / 100, fromBase: v => v * 100 },
    { label: "Meter (m)", toBase: v => v, fromBase: v => v },
    { label: "Kilometer (km)", toBase: v => v * 1000, fromBase: v => v / 1000 },
    { label: "Inch (in)", toBase: v => v * 0.0254, fromBase: v => v / 0.0254 },
    { label: "Foot (ft)", toBase: v => v * 0.3048, fromBase: v => v / 0.3048 },
    { label: "Yard (yd)", toBase: v => v * 0.9144, fromBase: v => v / 0.9144 },
    { label: "Mile (mi)", toBase: v => v * 1609.34, fromBase: v => v / 1609.34 },
  ],
  weight: [
    { label: "Milligram (mg)", toBase: v => v / 1e6, fromBase: v => v * 1e6 },
    { label: "Gram (g)", toBase: v => v / 1000, fromBase: v => v * 1000 },
    { label: "Kilogram (kg)", toBase: v => v, fromBase: v => v },
    { label: "Metric Ton", toBase: v => v * 1000, fromBase: v => v / 1000 },
    { label: "Ounce (oz)", toBase: v => v * 0.0283495, fromBase: v => v / 0.0283495 },
    { label: "Pound (lb)", toBase: v => v * 0.453592, fromBase: v => v / 0.453592 },
  ],
  temperature: [
    { label: "Celsius (°C)", toBase: v => v, fromBase: v => v },
    { label: "Fahrenheit (°F)", toBase: v => (v - 32) * 5 / 9, fromBase: v => v * 9 / 5 + 32 },
    { label: "Kelvin (K)", toBase: v => v - 273.15, fromBase: v => v + 273.15 },
  ],
  area: [
    { label: "Square Meter (m²)", toBase: v => v, fromBase: v => v },
    { label: "Square Kilometer (km²)", toBase: v => v * 1e6, fromBase: v => v / 1e6 },
    { label: "Square Foot (ft²)", toBase: v => v * 0.092903, fromBase: v => v / 0.092903 },
    { label: "Acre", toBase: v => v * 4046.86, fromBase: v => v / 4046.86 },
    { label: "Hectare (ha)", toBase: v => v * 10000, fromBase: v => v / 10000 },
  ],
  volume: [
    { label: "Milliliter (ml)", toBase: v => v / 1000, fromBase: v => v * 1000 },
    { label: "Liter (L)", toBase: v => v, fromBase: v => v },
    { label: "Cubic Meter (m³)", toBase: v => v * 1000, fromBase: v => v / 1000 },
    { label: "Gallon (US)", toBase: v => v * 3.78541, fromBase: v => v / 3.78541 },
    { label: "Cup (US)", toBase: v => v * 0.236588, fromBase: v => v / 0.236588 },
  ],
  speed: [
    { label: "m/s", toBase: v => v, fromBase: v => v },
    { label: "km/h", toBase: v => v / 3.6, fromBase: v => v * 3.6 },
    { label: "mph", toBase: v => v * 0.44704, fromBase: v => v / 0.44704 },
    { label: "Knot", toBase: v => v * 0.514444, fromBase: v => v / 0.514444 },
  ],
};

const UnitConverter = () => {
  const [category, setCategory] = useState<Category>("length");
  const [fromIdx, setFromIdx] = useState(2);
  const [toIdx, setToIdx] = useState(3);
  const [value, setValue] = useState("");

  const list = units[category];
  const result = (() => {
    const v = parseFloat(value);
    if (isNaN(v)) return "";
    const base = list[fromIdx].toBase(v);
    const converted = list[toIdx].fromBase(base);
    return parseFloat(converted.toPrecision(8)).toString();
  })();

  const swap = () => { setFromIdx(toIdx); setToIdx(fromIdx); };

  return (
    <div className="flex flex-col gap-5 w-full max-w-md mx-auto">
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Category</label>
        <select value={category} onChange={e => { setCategory(e.target.value as Category); setFromIdx(0); setToIdx(1); setValue(""); }}
          className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30">
          {(Object.keys(units) as Category[]).map(c => (
            <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
          ))}
        </select>
      </div>

      <div className="flex items-end gap-3">
        <div className="flex-1 flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">From</label>
          <select value={fromIdx} onChange={e => setFromIdx(parseInt(e.target.value))}
            className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30">
            {list.map((u, i) => <option key={i} value={i}>{u.label}</option>)}
          </select>
        </div>
        <button onClick={swap} className="mb-0.5 p-2.5 rounded-xl border border-border bg-card hover:bg-muted transition-all">
          <ArrowLeftRight className="w-4 h-4" />
        </button>
        <div className="flex-1 flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">To</label>
          <select value={toIdx} onChange={e => setToIdx(parseInt(e.target.value))}
            className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30">
            {list.map((u, i) => <option key={i} value={i}>{u.label}</option>)}
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Value</label>
        <input type="number" value={value} onChange={e => setValue(e.target.value)} placeholder="Enter value to convert"
          className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
      </div>

      {result && (
        <div className="rounded-2xl border border-border bg-card p-6 text-center">
          <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wide mb-2">Result</p>
          <p className="text-3xl font-extrabold text-primary break-all">{result}</p>
          <p className="text-sm text-muted-foreground mt-1">{list[toIdx].label}</p>
        </div>
      )}
    </div>
  );
};

export default UnitConverter;
