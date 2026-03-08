import { useState } from "react";

const AgeCalculator = () => {
  const [dob, setDob] = useState("");
  const [result, setResult] = useState<null | {
    years: number; months: number; days: number;
    totalDays: number; nextBirthday: number;
  }>(null);

  const calculate = () => {
    if (!dob) return;
    const birth = new Date(dob);
    const now = new Date();
    if (birth > now) return;

    let years = now.getFullYear() - birth.getFullYear();
    let months = now.getMonth() - birth.getMonth();
    let days = now.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
      days += prevMonth.getDate();
    }
    if (months < 0) { years--; months += 12; }

    const totalDays = Math.floor((now.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24));

    const nextBd = new Date(now.getFullYear(), birth.getMonth(), birth.getDate());
    if (nextBd <= now) nextBd.setFullYear(now.getFullYear() + 1);
    const nextBirthday = Math.ceil((nextBd.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

    setResult({ years, months, days, totalDays, nextBirthday });
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-md mx-auto">
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Date of Birth</label>
        <input type="date" value={dob} onChange={e => setDob(e.target.value)}
          max={new Date().toISOString().split("T")[0]}
          className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
      </div>

      <button onClick={calculate}
        className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-bold text-sm hover:bg-primary/90 transition-all">
        Calculate Age
      </button>

      {result && (
        <div className="rounded-2xl border border-border bg-card p-6 space-y-4">
          <div className="grid grid-cols-3 gap-3 text-center">
            {[
              { val: result.years, label: "Years" },
              { val: result.months, label: "Months" },
              { val: result.days, label: "Days" },
            ].map(i => (
              <div key={i.label} className="rounded-xl bg-primary/5 py-4">
                <p className="text-3xl font-extrabold text-primary">{i.val}</p>
                <p className="text-xs text-muted-foreground font-semibold mt-1">{i.label}</p>
              </div>
            ))}
          </div>
          <div className="border-t border-border pt-4 grid grid-cols-2 gap-3 text-center text-sm">
            <div>
              <p className="font-bold text-lg">{result.totalDays.toLocaleString()}</p>
              <p className="text-muted-foreground text-xs">Total days lived</p>
            </div>
            <div>
              <p className="font-bold text-lg">{result.nextBirthday}</p>
              <p className="text-muted-foreground text-xs">Days until next birthday</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AgeCalculator;
