import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shuffle } from "lucide-react";

const RandomPicker = () => {
  const [input, setInput] = useState("Alice\nBob\nCharlie\nDiana\nEthan");
  const [winner, setWinner] = useState<string | null>(null);
  const [spinning, setSpinning] = useState(false);
  const [history, setHistory] = useState<string[]>([]);

  const pick = async () => {
    const names = input.split("\n").map(n => n.trim()).filter(Boolean);
    if (names.length < 2) return;
    setSpinning(true);
    setWinner(null);
    // Animate through random names briefly
    let count = 0;
    const total = 18;
    const ticker = setInterval(() => {
      const rand = names[Math.floor(Math.random() * names.length)];
      setWinner(rand);
      count++;
      if (count >= total) {
        clearInterval(ticker);
        const final = names[Math.floor(Math.random() * names.length)];
        setWinner(final);
        setHistory(h => [final, ...h.slice(0, 4)]);
        setSpinning(false);
      }
    }, 80);
  };

  const names = input.split("\n").map(n => n.trim()).filter(Boolean);

  return (
    <div className="flex flex-col gap-5 w-full max-w-md mx-auto">
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
          Enter Names (one per line) — {names.length} entries
        </label>
        <textarea value={input} onChange={e => setInput(e.target.value)} rows={6}
          placeholder={"Alice\nBob\nCharlie\nDiana"}
          className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm font-mono resize-none focus:outline-none focus:ring-2 focus:ring-primary/30" />
      </div>

      <button onClick={pick} disabled={names.length < 2 || spinning}
        className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-bold text-sm hover:bg-primary/90 transition-all disabled:opacity-50 flex items-center justify-center gap-2">
        <Shuffle className={`w-4 h-4 ${spinning ? "animate-spin" : ""}`} />
        {spinning ? "Picking..." : "Pick Random Winner"}
      </button>

      <AnimatePresence>
        {winner && (
          <motion.div key={winner + String(spinning)}
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
            className={`rounded-2xl border p-6 text-center transition-all ${spinning ? "border-border bg-card" : "border-primary/30 bg-primary/5"}`}>
            <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wide mb-2">
              {spinning ? "Spinning..." : "🎉 Winner!"}
            </p>
            <p className={`text-3xl font-extrabold ${spinning ? "text-muted-foreground" : "text-primary"}`}>{winner}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {history.length > 1 && (
        <div className="rounded-xl border border-border bg-card p-4">
          <p className="text-xs font-semibold text-muted-foreground mb-2">Recent picks</p>
          <div className="flex flex-wrap gap-2">
            {history.map((h, i) => (
              <span key={i} className={`px-3 py-1 rounded-full text-xs font-semibold ${i === 0 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                {h}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RandomPicker;
