import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Zap, Shield, Sparkles, Globe, Users, Gift,
  ChevronRight, CheckCircle, Clock, Star,
  ArrowRight,
} from "lucide-react";
import AppNavbar from "@/components/AppNavbar";
import Footer from "@/components/Footer";
import { useState } from "react";
import { toolCategories, getCategoryColorVars } from "@/data/toolsData";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const whyPoints = [
  { icon: Zap,      title: "Instant Conversions",       desc: "Convert documents instantly — no formatting loss." },
  { icon: Shield,   title: "Safe and Secure",            desc: "Files are encrypted, private and never shared." },
  { icon: Sparkles, title: "Fast & Reliable",            desc: "Optimised for speed — handle files in seconds." },
  { icon: Globe,    title: "Works on All Devices",       desc: "100% browser-based. Desktop, tablet, or mobile." },
  { icon: Users,    title: "Built for Students & Teams", desc: "Designed for academic and corporate use." },
  { icon: Gift,     title: "Free Forever",               desc: "All 100 tools are completely free — no tricks." },
];

const faqs = [
  { q: "Is Viadocs free to use?",              a: "Yes! All 100 tools on Viadocs are completely free to use, forever." },
  { q: "Is my data safe?",                     a: "Absolutely. Files are processed securely on Cloudflare's edge network. We never store files longer than needed." },
  { q: "Does it work on mobile?",              a: "Yes — Viadocs is fully responsive across mobile, tablets and desktop." },
  { q: "How is this different from ilovepdf?", a: "Viadocs is built specifically for Indian students and professionals, with 100 tools across PDF, Image, Text, Dev, Security, Web & Utility categories — all in one place." },
  { q: "Can I use it without signing up?",     a: "Yes — most tools are available without signing in. Signing in lets you track your conversion history." },
];

const mockRecent = [
  { id: "1", tool_label: "PDF to Word", file_name: "report.pdf" },
  { id: "2", tool_label: "PDF Merge",   file_name: "slides.pdf" },
];

const Home = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Quick tools: first 2 from each of first 4 categories = 8 tools
  const quickTools = toolCategories.slice(0, 4).flatMap(c => c.tools.slice(0, 2));

  return (
    <div className="min-h-screen bg-background">
      <AppNavbar />

      {/* ── Hero ── */}
      <section className="relative pt-28 pb-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "var(--gradient-hero-glow), var(--gradient-teal-glow)" }} />
        <div className="absolute top-10 right-[-8%] w-96 h-96 rounded-full opacity-[0.07] blur-3xl"
          style={{ background: "hsl(var(--brand-blue))" }} />
        <div className="absolute bottom-0 left-[-5%] w-72 h-72 rounded-full opacity-[0.05] blur-3xl"
          style={{ background: "hsl(var(--brand-teal))" }} />

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-5 gap-10 items-start">

            {/* ── Left copy (3/5) ── */}
            <div className="lg:col-span-3">
              <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0}>
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase mb-6"
                  style={{ background: "hsl(var(--brand-blue) / 0.1)", color: "hsl(var(--brand-blue))", border: "1px solid hsl(var(--brand-blue) / 0.25)" }}>
                  <Sparkles className="w-3.5 h-3.5" /> All-in-One Tools Platform
                </span>
              </motion.div>

              <motion.h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.1] mb-5"
                variants={fadeUp} initial="hidden" animate="visible" custom={1}>
                Welcome back,{" "}
                <span className="gradient-text">User!</span>
              </motion.h1>

              <motion.p className="text-muted-foreground text-base md:text-lg mb-8 leading-relaxed max-w-lg"
                variants={fadeUp} initial="hidden" animate="visible" custom={2}>
                100 free tools — PDF, Image, Text, Developer, Security, Web & Utility. Everything in one place.
              </motion.p>

              <motion.div className="flex flex-wrap gap-3 mb-10"
                variants={fadeUp} initial="hidden" animate="visible" custom={3}>
                <Link to="/tools"
                  className="btn-gradient inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm shadow-soft">
                  Explore All 100 Tools <ChevronRight className="w-4 h-4" />
                </Link>
              </motion.div>

              {/* Stats row */}
              <motion.div className="grid grid-cols-4 gap-4 max-w-sm"
                variants={fadeUp} initial="hidden" animate="visible" custom={4}>
                {[
                  { v: "100", l: "Tools" },
                  { v: "7",   l: "Categories" },
                  { v: "100%", l: "Free" },
                  { v: "Safe", l: "& Secure" },
                ].map((s) => (
                  <div key={s.l} className="text-center">
                    <p className="text-xl font-extrabold gradient-text">{s.v}</p>
                    <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wide">{s.l}</p>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* ── Right panel (2/5) ── */}
            <motion.div className="lg:col-span-2 flex flex-col gap-4"
              variants={fadeUp} initial="hidden" animate="visible" custom={5}>

              {/* Quick Tools card */}
              <div className="card-glass rounded-2xl p-5 shadow-card border border-border">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                    <Zap className="w-3.5 h-3.5" /> Quick Tools
                  </p>
                  <Link to="/tools" className="text-xs font-bold text-primary flex items-center gap-1 hover:underline">
                    See all 100 <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {quickTools.map((t) => {
                    const cat = toolCategories.find(c => c.id === t.category)!;
                    const colorVar = getCategoryColorVars(cat.color);
                    return (
                      <Link key={t.slug} to={`/tools/${t.slug}`}
                        className="flex flex-col items-center gap-1.5 p-2 rounded-xl border border-border hover:border-primary/40 hover:bg-primary/5 transition-all duration-200 text-center group">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                          style={{ background: `linear-gradient(135deg, hsl(${colorVar} / 0.9), hsl(${colorVar} / 0.65))` }}>
                          <t.icon className="w-[15px] h-[15px] text-white" />
                        </div>
                        <span className="text-[9px] font-semibold leading-tight text-muted-foreground group-hover:text-foreground transition-colors line-clamp-2 text-center">{t.label}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Recent */}
              <div className="card-glass rounded-2xl p-4 shadow-card border border-border flex flex-col gap-2">
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" /> Recent
                </p>
                {mockRecent.map((c) => (
                  <div key={c.id} className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0"
                      style={{ background: "var(--gradient-brand)" }}>
                      <CheckCircle className="w-3 h-3 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] font-semibold truncate">{c.file_name}</p>
                      <p className="text-[9px] text-muted-foreground">{c.tool_label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── All Categories ── */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div className="text-center mb-12" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
              All <span className="gradient-text">100 Tools</span> — 7 Categories
            </h2>
            <p className="text-muted-foreground text-sm max-w-xl mx-auto">
              Pick any tool — upload or interact — and you're done.
            </p>
          </motion.div>

          {toolCategories.map((cat, catIdx) => {
            const colorVar = getCategoryColorVars(cat.color);
            const CatIcon = cat.icon;
            return (
              <div key={cat.id} className="mb-10">
                <div className="flex items-center gap-3 mb-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
                    style={{ background: `hsl(${colorVar} / 0.1)`, color: `hsl(${colorVar})`, border: `1px solid hsl(${colorVar} / 0.2)` }}>
                    <CatIcon className="w-3 h-3" /> {cat.label}
                    <span className="ml-1 px-1.5 py-0.5 rounded-full text-[10px] font-extrabold"
                      style={{ background: `hsl(${colorVar} / 0.2)` }}>
                      {cat.tools.length}
                    </span>
                  </span>
                  <div className="flex-1 h-px bg-border" />
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                  {cat.tools.map((t, i) => (
                    <motion.div key={t.slug} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i % 10}>
                      <Link to={`/tools/${t.slug}`}
                        className="card-glass rounded-2xl p-4 flex flex-col items-center gap-2.5 shadow-card text-center group block border border-border hover:border-primary/30 transition-all duration-200">
                        <div className="w-11 h-11 rounded-2xl flex items-center justify-center shadow-soft transition-transform duration-300 group-hover:scale-110"
                          style={{ background: `linear-gradient(135deg, hsl(${colorVar} / 0.9), hsl(${colorVar} / 0.65))` }}>
                          <t.icon className="w-5 h-5 text-white" />
                        </div>
                        <p className="font-bold text-xs leading-tight">{t.label}</p>
                      </Link>
                    </motion.div>
                  ))}
                </div>
                {catIdx < toolCategories.length - 1 && <div className="mt-6" />}
              </div>
            );
          })}

          <div className="text-center mt-6">
            <Link to="/tools"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full font-bold text-sm border border-border bg-card hover:border-primary hover:text-primary transition-all duration-300 shadow-card">
              View Full Tools Directory <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Why Viadocs ── */}
      <section className="py-24 bg-card">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div className="text-center mb-12" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
              Why Choose <span className="gradient-text">Viadocs?</span>
            </h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {whyPoints.map((w, i) => (
              <motion.div key={w.title}
                className="flex items-start gap-4 p-5 rounded-2xl border border-border bg-background hover:border-primary/30 transition-all duration-200"
                variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 shadow-soft"
                  style={{ background: "var(--gradient-brand)" }}>
                  <w.icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-sm mb-1">{w.title}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">{w.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-24">
        <div className="max-w-3xl mx-auto px-6">
          <motion.div className="text-center mb-12" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
              Frequently Asked <span className="gradient-text">Questions</span>
            </h2>
          </motion.div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div key={i}
                className="card-glass rounded-2xl border border-border overflow-hidden shadow-card"
                variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i}>
                <button
                  className="w-full flex items-center justify-between px-6 py-4 text-left font-bold text-sm hover:bg-primary/3 transition-colors"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  {faq.q}
                  <span className={`ml-4 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs transition-all duration-200 ${openFaq === i ? "btn-gradient text-white" : "bg-muted text-muted-foreground"}`}>
                    {openFaq === i ? "−" : "+"}
                  </span>
                </button>
                {openFaq === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="px-6 pb-5 text-sm text-muted-foreground leading-relaxed border-t border-border pt-4">
                    {faq.a}
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
