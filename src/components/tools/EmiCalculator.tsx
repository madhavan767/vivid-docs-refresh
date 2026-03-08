import { useState } from "react";

const EmiCalculator = () => {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [tenure, setTenure] = useState("");
  const [tenureType, setTenureType] = useState<"months" | "years">("years");
  const [result, setResult] = useState<{ emi: number; totalAmount: number; totalInterest: number } | null>(null);

  const calculate = () => {
    const P = parseFloat(principal);
    const annualRate = parseFloat(rate);
    let N = parseFloat(tenure);
    if (!P || !annualRate || !N) return;
    if (tenureType === "years") N = N * 12;
    const r = annualRate / 12 / 100;
    const emi = (P * r * Math.pow(1 + r, N)) / (Math.pow(1 + r, N) - 1);
    const totalAmount = emi * N;
    const totalInterest = totalAmount - P;
    setResult({
      emi: parseFloat(emi.toFixed(2)),
      totalAmount: parseFloat(totalAmount.toFixed(2)),
      totalInterest: parseFloat(totalInterest.toFixed(2)),
    });
  };

  const fmt = (n: number) => n.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div className="flex flex-col gap-5 w-full max-w-md mx-auto">
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Loan Amount (₹)</label>
        <input type="number" value={principal} onChange={e => setPrincipal(e.target.value)} placeholder="e.g. 500000"
          className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Annual Interest Rate (%)</label>
        <input type="number" value={rate} onChange={e => setRate(e.target.value)} placeholder="e.g. 8.5"
          className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Loan Tenure</label>
        <div className="flex gap-2">
          <input type="number" value={tenure} onChange={e => setTenure(e.target.value)} placeholder={`e.g. ${tenureType === "years" ? "5" : "60"}`}
            className="flex-1 px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
          <div className="flex rounded-xl overflow-hidden border border-border">
            {(["years", "months"] as const).map(t => (
              <button key={t} onClick={() => setTenureType(t)}
                className={`px-4 py-2 text-xs font-semibold transition-all ${tenureType === t ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground hover:bg-muted"}`}>
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      <button onClick={calculate}
        className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-bold text-sm hover:bg-primary/90 transition-all">
        Calculate EMI
      </button>

      {result && (
        <div className="rounded-2xl border border-border bg-card p-6 space-y-4">
          <div className="text-center">
            <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wide">Monthly EMI</p>
            <p className="text-4xl font-extrabold text-primary mt-1">₹{fmt(result.emi)}</p>
          </div>
          <div className="border-t border-border pt-4 grid grid-cols-2 gap-4 text-center">
            <div>
              <p className="font-bold text-lg">₹{fmt(result.totalInterest)}</p>
              <p className="text-xs text-muted-foreground">Total Interest</p>
            </div>
            <div>
              <p className="font-bold text-lg">₹{fmt(result.totalAmount)}</p>
              <p className="text-xs text-muted-foreground">Total Amount</p>
            </div>
          </div>
          {/* Simple visual bar */}
          <div className="pt-2">
            <div className="flex rounded-full overflow-hidden h-3">
              <div className="bg-primary transition-all" style={{ width: `${(parseFloat(principal) / result.totalAmount) * 100}%` }} />
              <div className="bg-destructive/40 flex-1" />
            </div>
            <div className="flex justify-between text-xs text-muted-foreground mt-1.5">
              <span>Principal</span>
              <span>Interest</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmiCalculator;
