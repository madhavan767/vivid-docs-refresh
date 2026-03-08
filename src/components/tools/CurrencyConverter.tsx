import { useState } from "react";
import { ArrowLeftRight } from "lucide-react";

// Static rates relative to USD (updated periodically — no API needed)
const RATES: Record<string, number> = {
  USD: 1, EUR: 0.92, GBP: 0.79, INR: 83.12, JPY: 149.50,
  CAD: 1.36, AUD: 1.53, CHF: 0.89, CNY: 7.24, HKD: 7.82,
  SGD: 1.34, MXN: 17.15, BRL: 4.97, KRW: 1325, NOK: 10.55,
  SEK: 10.42, DKK: 6.89, NZD: 1.63, ZAR: 18.63, AED: 3.67,
  SAR: 3.75, TRY: 32.10, MYR: 4.73, IDR: 15700, PHP: 56.20,
  THB: 35.60, PKR: 278, BDT: 110, LKR: 315, NGN: 1590,
  EGP: 30.90, KES: 161, GHS: 12.80, XAF: 612, MAD: 10.02,
};

const SYMBOLS: Record<string, string> = {
  USD: "$", EUR: "€", GBP: "£", INR: "₹", JPY: "¥",
  CAD: "CA$", AUD: "A$", CHF: "Fr", CNY: "¥", HKD: "HK$",
  SGD: "S$", MXN: "MX$", BRL: "R$", KRW: "₩", AED: "د.إ",
  SAR: "﷼", TRY: "₺", PKR: "₨", NGN: "₦", EGP: "E£",
};

const CURRENCY_NAMES: Record<string, string> = {
  USD: "US Dollar", EUR: "Euro", GBP: "British Pound", INR: "Indian Rupee",
  JPY: "Japanese Yen", CAD: "Canadian Dollar", AUD: "Australian Dollar",
  CHF: "Swiss Franc", CNY: "Chinese Yuan", HKD: "Hong Kong Dollar",
  SGD: "Singapore Dollar", MXN: "Mexican Peso", BRL: "Brazilian Real",
  KRW: "South Korean Won", NOK: "Norwegian Krone", SEK: "Swedish Krona",
  DKK: "Danish Krone", NZD: "New Zealand Dollar", ZAR: "South African Rand",
  AED: "UAE Dirham", SAR: "Saudi Riyal", TRY: "Turkish Lira",
  MYR: "Malaysian Ringgit", IDR: "Indonesian Rupiah", PHP: "Philippine Peso",
  THB: "Thai Baht", PKR: "Pakistani Rupee", BDT: "Bangladeshi Taka",
  LKR: "Sri Lankan Rupee", NGN: "Nigerian Naira", EGP: "Egyptian Pound",
  KES: "Kenyan Shilling", GHS: "Ghanaian Cedi", XAF: "CFA Franc", MAD: "Moroccan Dirham",
};

const CurrencyConverter = () => {
  const [amount, setAmount] = useState("100");
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("INR");

  const convert = () => {
    const v = parseFloat(amount);
    if (isNaN(v)) return null;
    const usd = v / RATES[from];
    return (usd * RATES[to]).toFixed(2);
  };

  const result = convert();
  const sym = (c: string) => SYMBOLS[c] ?? "";

  const swap = () => { setFrom(to); setTo(from); };

  return (
    <div className="flex flex-col gap-5 w-full max-w-md mx-auto">
      <div className="rounded-xl border border-amber-200/50 bg-amber-50/50 dark:bg-amber-900/10 dark:border-amber-900/30 px-4 py-2.5 text-xs text-amber-700 dark:text-amber-400">
        ⚡ Uses fixed reference rates. For live trading, use a financial service.
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Amount</label>
        <input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="Enter amount"
          className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
      </div>

      <div className="flex items-end gap-3">
        <div className="flex-1 flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">From</label>
          <select value={from} onChange={e => setFrom(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30">
            {Object.keys(RATES).map(c => <option key={c} value={c}>{c} – {CURRENCY_NAMES[c] ?? c}</option>)}
          </select>
        </div>
        <button onClick={swap} className="mb-0.5 p-2.5 rounded-xl border border-border bg-card hover:bg-muted transition-all">
          <ArrowLeftRight className="w-4 h-4" />
        </button>
        <div className="flex-1 flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">To</label>
          <select value={to} onChange={e => setTo(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30">
            {Object.keys(RATES).map(c => <option key={c} value={c}>{c} – {CURRENCY_NAMES[c] ?? c}</option>)}
          </select>
        </div>
      </div>

      {result && (
        <div className="rounded-2xl border border-border bg-card p-6 text-center">
          <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wide mb-2">Converted Amount</p>
          <p className="text-4xl font-extrabold text-primary">{sym(to)}{parseFloat(result).toLocaleString()}</p>
          <p className="text-sm text-muted-foreground mt-2">
            {sym(from)}{parseFloat(amount || "0").toLocaleString()} {from} = {sym(to)}{parseFloat(result).toLocaleString()} {to}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            1 {from} = {sym(to)}{(RATES[to] / RATES[from]).toFixed(4)} {to}
          </p>
        </div>
      )}
    </div>
  );
};

export default CurrencyConverter;
