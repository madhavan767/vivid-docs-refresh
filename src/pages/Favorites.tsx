import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Clock, FileText, CheckCircle, Search } from "lucide-react";
import AppNavbar from "@/components/AppNavbar";
import Footer from "@/components/Footer";
import { filesApi, Conversion } from "@/config/api";
import { useAuth } from "@/contexts/AuthContext";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const Favorites = () => {
  const { user } = useAuth();
  const [conversions, setConversions] = useState<Conversion[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchConversions = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const data = await filesApi.list();
      setConversions(data);
    } catch {
      setConversions([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConversions();
  }, [user]);

  const filtered = conversions.filter(
    (c) =>
      c.file_name.toLowerCase().includes(search.toLowerCase()) ||
      c.tool_label.toLowerCase().includes(search.toLowerCase())
  );

  const formatSize = (bytes: number) => {
    if (!bytes) return "—";
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
  };

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="min-h-screen bg-background">
      <AppNavbar />

      <div className="pt-24 pb-4 max-w-5xl mx-auto px-6">
        {/* Header */}
        <motion.div className="py-12" variants={fadeUp} initial="hidden" animate="visible">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-soft"
              style={{ background: "var(--gradient-brand)" }}>
              <Clock className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold">Recent Conversions</h1>
              <p className="text-sm text-muted-foreground">Your file conversion history</p>
            </div>
          </div>
        </motion.div>

        {/* Search */}
        <motion.div className="relative mb-8" variants={fadeUp} initial="hidden" animate="visible" custom={1}>
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by file name or tool..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-xl border border-border bg-card text-sm focus:outline-none focus:ring-2 transition-all"
          />
        </motion.div>

        {/* Content */}
        {loading ? (
          <div className="text-center py-20">
            <div className="w-8 h-8 border-2 border-border border-t-primary rounded-full animate-spin mx-auto" />
            <p className="text-sm text-muted-foreground mt-4">Loading conversions...</p>
          </div>
        ) : filtered.length === 0 ? (
          <motion.div className="text-center py-20" variants={fadeUp} initial="hidden" animate="visible">
            <div className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-5 shadow-soft"
              style={{ background: "var(--gradient-brand)" }}>
              <FileText className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-xl font-bold mb-2">
              {search ? "No results found" : "No conversions yet"}
            </h2>
            <p className="text-sm text-muted-foreground max-w-xs mx-auto">
              {search
                ? "Try a different search term."
                : "Start converting files using the Tools page — your history will appear here."}
            </p>
          </motion.div>
        ) : (
          <motion.div className="space-y-3 pb-16" variants={fadeUp} initial="hidden" animate="visible" custom={2}>
            {filtered.map((c, i) => (
              <motion.div
                key={c.id}
                className="card-glass rounded-2xl px-5 py-4 shadow-card border border-border flex items-center gap-4"
                variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i % 8}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "var(--gradient-brand)" }}>
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold truncate">{c.file_name}</p>
                  <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                    <span className="text-[11px] font-medium px-2 py-0.5 rounded-full"
                      style={{ background: "hsl(var(--brand-blue) / 0.1)", color: "hsl(var(--brand-blue))" }}>
                      {c.tool_label}
                    </span>
                    {c.file_size > 0 && (
                      <span className="text-[11px] text-muted-foreground">{formatSize(c.file_size)}</span>
                    )}
                  </div>
                  {/* R2 download link if available */}
                  {c.output_r2_url && (
                    <a
                      href={c.output_r2_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] font-semibold mt-1 inline-flex items-center gap-1 hover:underline"
                      style={{ color: "hsl(var(--brand-blue))" }}
                    >
                      ↓ Download converted file
                    </a>
                  )}
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-[11px] text-muted-foreground">{formatDate(c.created_at)}</p>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full mt-1 inline-block ${
                    c.status === "completed"
                      ? "text-green-600 bg-green-50"
                      : c.status === "failed"
                        ? "text-red-500 bg-red-50"
                        : "text-yellow-600 bg-yellow-50"
                  }`}>
                    {c.status}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Favorites;
