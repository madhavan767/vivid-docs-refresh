import { useState } from "react";

const TIP_PRESETS = [10, 15, 18, 20, 25];

const TipCalculator = () => {
  const [bill, setBill] = useState("");
  const [tipPct, setTipPct] = useState(15);
  const [customTip, setCustomTip] = useState("");
  const [people, setPeople] = useState("1");

  const activeTip = customTip ? parseFloat(customTip) : tipPct;
  const billAmt = parseFloat(bill) || 0;
  const numPeople = parseInt(people) || 1;
  const tipAmount = (billAmt * activeTip) / 100;
  const totalAmount = billAmt + tipAmount;
  const perPerson = totalAmount / numPeople;
  const tipPerPerson = tipAmount / numPeople;

  const fmt = (n: number) => n.toFixed(2);

  return (
    <div className="flex flex-col gap-5 w-full max-w-md mx-auto">
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Bill Amount ($)</label>
        <input type="number" value={bill} onChange={e => setBill(e.target.value)} placeholder="e.g. 45.00"
          className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Tip Percentage</label>
        <div className="flex gap-2 flex-wrap">
          {TIP_PRESETS.map(p => (
            <button key={p} onClick={() => { setTipPct(p); setCustomTip(""); }}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all border ${!customTip && tipPct === p ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border hover:border-primary/40"}`}>
              {p}%
            </button>
          ))}
          <input type="number" value={customTip} onChange={e => setCustomTip(e.target.value)} placeholder="Custom %"
            className="w-24 px-3 py-2 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Number of People</label>
        <div className="flex items-center gap-3">
          <button onClick={() => setPeople(p => String(Math.max(1, parseInt(p) - 1)))}
            className="w-10 h-10 rounded-xl border border-border bg-card font-bold hover:bg-muted transition-all">−</button>
          <input type="number" value={people} onChange={e => setPeople(e.target.value)} min={1}
            className="flex-1 px-4 py-2.5 rounded-xl border border-border bg-background text-sm text-center font-bold focus:outline-none focus:ring-2 focus:ring-primary/30" />
          <button onClick={() => setPeople(p => String(parseInt(p) + 1))}
            className="w-10 h-10 rounded-xl border border-border bg-card font-bold hover:bg-muted transition-all">+</button>
        </div>
      </div>

      {billAmt > 0 && (
        <div className="rounded-2xl border border-border bg-card p-6 space-y-4">
          <div className="grid grid-cols-3 gap-3 text-center">
            <div>
              <p className="text-xl font-extrabold text-primary">${fmt(tipAmount)}</p>
              <p className="text-xs text-muted-foreground mt-0.5">Tip ({activeTip}%)</p>
            </div>
            <div>
              <p className="text-xl font-extrabold">${fmt(totalAmount)}</p>
              <p className="text-xs text-muted-foreground mt-0.5">Total Bill</p>
            </div>
            <div className="bg-primary/8 rounded-xl py-2">
              <p className="text-xl font-extrabold text-primary">${fmt(perPerson)}</p>
              <p className="text-xs text-muted-foreground mt-0.5">Per Person</p>
            </div>
          </div>
          {numPeople > 1 && (
            <p className="text-center text-xs text-muted-foreground border-t border-border pt-3">
              Each person pays <strong>${fmt(tipPerPerson)}</strong> tip + <strong>${fmt(billAmt / numPeople)}</strong> bill share
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default TipCalculator;
