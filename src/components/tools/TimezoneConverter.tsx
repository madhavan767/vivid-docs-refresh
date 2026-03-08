import { useState } from "react";

const TIMEZONES = [
  { label: "UTC", tz: "UTC" },
  { label: "IST – India Standard Time", tz: "Asia/Kolkata" },
  { label: "EST – Eastern Standard Time", tz: "America/New_York" },
  { label: "CST – Central Standard Time", tz: "America/Chicago" },
  { label: "MST – Mountain Standard Time", tz: "America/Denver" },
  { label: "PST – Pacific Standard Time", tz: "America/Los_Angeles" },
  { label: "GMT – Greenwich Mean Time", tz: "Europe/London" },
  { label: "CET – Central European Time", tz: "Europe/Paris" },
  { label: "EET – Eastern European Time", tz: "Europe/Athens" },
  { label: "MSK – Moscow Standard Time", tz: "Europe/Moscow" },
  { label: "GST – Gulf Standard Time", tz: "Asia/Dubai" },
  { label: "PKT – Pakistan Standard Time", tz: "Asia/Karachi" },
  { label: "BST – Bangladesh Standard Time", tz: "Asia/Dhaka" },
  { label: "ICT – Indochina Time", tz: "Asia/Bangkok" },
  { label: "SGT – Singapore Time", tz: "Asia/Singapore" },
  { label: "CST – China Standard Time", tz: "Asia/Shanghai" },
  { label: "JST – Japan Standard Time", tz: "Asia/Tokyo" },
  { label: "AEST – Australian Eastern Time", tz: "Australia/Sydney" },
  { label: "NZST – New Zealand Standard Time", tz: "Pacific/Auckland" },
  { label: "BRT – Brasilia Time", tz: "America/Sao_Paulo" },
  { label: "ART – Argentina Time", tz: "America/Argentina/Buenos_Aires" },
  { label: "CAT – Central Africa Time", tz: "Africa/Johannesburg" },
  { label: "WAT – West Africa Time", tz: "Africa/Lagos" },
];

const TimezoneConverter = () => {
  const now = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  const localDateTime = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}T${pad(now.getHours())}:${pad(now.getMinutes())}`;

  const [datetime, setDatetime] = useState(localDateTime);
  const [fromTz, setFromTz] = useState("UTC");
  const [toTz, setToTz] = useState("Asia/Kolkata");

  const convert = () => {
    try {
      const localStr = datetime.replace("T", " ");
      const sourceDate = new Date(
        new Date(localStr).toLocaleString("en-US", { timeZone: fromTz })
      );
      const diff = new Date(localStr).getTime() - sourceDate.getTime();
      const utcTime = new Date(new Date(localStr).getTime() + diff);
      return utcTime.toLocaleString("en-US", {
        timeZone: toTz,
        weekday: "short", year: "numeric", month: "short",
        day: "numeric", hour: "2-digit", minute: "2-digit", second: "2-digit",
        timeZoneName: "short",
      });
    } catch {
      return "Invalid date";
    }
  };

  const swap = () => { setFromTz(toTz); setToTz(fromTz); };

  return (
    <div className="flex flex-col gap-5 w-full max-w-md mx-auto">
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Date & Time</label>
        <input type="datetime-local" value={datetime} onChange={e => setDatetime(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">From Timezone</label>
        <select value={fromTz} onChange={e => setFromTz(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30">
          {TIMEZONES.map(tz => <option key={tz.tz} value={tz.tz}>{tz.label}</option>)}
        </select>
      </div>

      <button onClick={swap}
        className="self-center px-6 py-2 rounded-xl border border-border bg-card text-sm font-semibold hover:bg-muted transition-all flex items-center gap-2">
        ⇅ Swap Timezones
      </button>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">To Timezone</label>
        <select value={toTz} onChange={e => setToTz(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30">
          {TIMEZONES.map(tz => <option key={tz.tz} value={tz.tz}>{tz.label}</option>)}
        </select>
      </div>

      <div className="rounded-2xl border border-border bg-card p-6 text-center">
        <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wide mb-2">Converted Time</p>
        <p className="text-lg font-extrabold text-primary leading-snug">{convert()}</p>
      </div>
    </div>
  );
};

export default TimezoneConverter;
