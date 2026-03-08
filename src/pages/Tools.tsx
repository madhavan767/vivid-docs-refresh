import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Search, X } from "lucide-react";
import { useState, useMemo } from "react";
import AppNavbar from "@/components/AppNavbar";
import Footer from "@/components/Footer";
import { toolCategories, getCategoryColorVars, allTools } from "@/data/toolsData";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const Tools = () => {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query.trim()) return null;
    const q = query.toLowerCase();
    return allTools.filter(
      t => t.label.toLowerCase().includes(q) || t.desc.toLowerCase().includes(q) || t.category.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <div className="min-h-screen bg-background">
      <AppNavbar />

      {/* ── Hero ── */}
      <section className="relative pt-32 pb-14 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "var(--gradient-hero-glow), var(--gradient-teal-glow)" }} />
        <div className="absolute top-16 right-[-6%] w-80 h-80 rounded-full opacity-[0.07] blur-3xl"
          style={{ background: "hsl(var(--brand-blue))" }} />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0} className="mb-8">
            <Link to="/home"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border border-border bg-card/60 hover:border-primary/40 hover:text-primary transition-all duration-200">
              <ArrowLeft className="w-4 h-4" /> Back to Home
            </Link>
          </motion.div>

          <div className="text-center max-w-3xl mx-auto">
            <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={1}>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase mb-5"
                style={{ background: "hsl(var(--brand-blue) / 0.1)", color: "hsl(var(--brand-blue))", border: "1px solid hsl(var(--brand-blue) / 0.25)" }}>
                100 Free Tools
              </span>
            </motion.div>

            <motion.h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4"
              variants={fadeUp} initial="hidden" animate="visible" custom={2}>
              All <span className="gradient-text">100 Tools</span> — Free Forever
            </motion.h1>

            <motion.p className="text-muted-foreground text-base leading-relaxed mb-8 max-w-2xl mx-auto"
              variants={fadeUp} initial="hidden" animate="visible" custom={3}>
              PDF, Image, Text, Developer, Security, Web & Utility tools — everything in one place.
            </motion.p>

            {/* Search */}
            <motion.div className="relative max-w-xl mx-auto"
              variants={fadeUp} initial="hidden" animate="visible" custom={4}>
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search any tool..."
                value={query}
                onChange={e => setQuery(e.target.value)}
                className="w-full pl-11 pr-10 py-3.5 rounded-2xl border border-border bg-card text-sm font-medium focus:outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/10 transition-all"
              />
              {query && (
                <button onClick={() => setQuery("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  <X className="w-4 h-4" />
                </button>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Search Results ── */}
      {filtered && (
        <section className="max-w-7xl mx-auto px-6 pb-10">
          <p className="text-sm text-muted-foreground mb-4 font-semibold">
            {filtered.length} result{filtered.length !== 1 ? "s" : ""} for "<span className="text-foreground">{query}</span>"
          </p>
          {filtered.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">
              <p className="font-semibold text-base">No tools found for "{query}"</p>
              <p className="text-sm mt-1">Try a different keyword</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-3">
              {filtered.map((tool, i) => {
                const cat = toolCategories.find(c => c.id === tool.category)!;
                const colorVar = getCategoryColorVars(cat.color);
                return (
                  <motion.div key={tool.slug} variants={fadeUp} initial="hidden" animate="visible" custom={i % 12}>
                    <Link to={`/tools/${tool.slug}`}
                      className="card-glass rounded-2xl p-4 flex flex-col items-center gap-2.5 shadow-card text-center group block hover:border-primary/30 transition-all duration-200 border border-border">
                      <div className="w-11 h-11 rounded-xl flex items-center justify-center shadow-soft transition-transform duration-300 group-hover:scale-110"
                        style={{ background: `linear-gradient(135deg, hsl(${colorVar} / 0.9), hsl(${colorVar} / 0.7))` }}>
                        <tool.icon className="w-5 h-5 text-white" />
                      </div>
                      <p className="font-bold text-xs leading-tight">{tool.label}</p>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          )}
        </section>
      )}

      {/* ── Category Sections ── */}
      {!filtered && (
        <section id="tools-grid" className="pb-24 max-w-7xl mx-auto px-6">
          {toolCategories.map((cat, catIdx) => {
            const colorVar = getCategoryColorVars(cat.color);
            const CatIcon = cat.icon;
            return (
              <motion.div key={cat.id} className="mb-14"
                variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={catIdx}>

                {/* Category header */}
                <div className="flex items-center gap-3 mb-5">
                  <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider"
                    style={{ background: `hsl(${colorVar} / 0.1)`, color: `hsl(${colorVar})`, border: `1px solid hsl(${colorVar} / 0.25)` }}>
                    <CatIcon className="w-3.5 h-3.5" />
                    {cat.label}
                    <span className="ml-1 px-1.5 py-0.5 rounded-full text-[10px] font-extrabold"
                      style={{ background: `hsl(${colorVar} / 0.2)` }}>
                      {cat.tools.length}
                    </span>
                  </span>
                  <div className="flex-1 h-px bg-border" />
                </div>

                {/* Tool cards */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                  {cat.tools.map((tool, i) => (
                    <motion.div key={tool.slug}
                      variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i % 10}>
                      <Link to={`/tools/${tool.slug}`}
                        className="card-glass rounded-2xl p-5 flex flex-col items-center gap-3 shadow-card text-center group block border border-border hover:border-primary/30 transition-all duration-200">
                        <div className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-soft transition-transform duration-300 group-hover:scale-110"
                          style={{ background: `linear-gradient(135deg, hsl(${colorVar} / 0.9), hsl(${colorVar} / 0.65))` }}>
                          <tool.icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <p className="font-bold text-xs leading-tight mb-1">{tool.label}</p>
                          {tool.isBrowserTool && (
                            <span className="inline-block text-[9px] font-bold px-2 py-0.5 rounded-full"
                              style={{ background: `hsl(${colorVar} / 0.12)`, color: `hsl(${colorVar})` }}>
                              Instant
                            </span>
                          )}
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </section>
      )}

      <Footer />
    </div>
  );
};

export default Tools;
