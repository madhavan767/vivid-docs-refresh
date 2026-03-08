import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Sparkles, FileText, FileDown, GitMerge, Scissors, Minimize2, Image,
  Download, Lock, Unlock, Table, Monitor, Zap, Shield, Globe, Users,
  ArrowRight, CheckCircle, Star, ChevronRight,
  Crop, Maximize2, ImageDown, ScanLine, RefreshCw, PenTool,
  Type, Code2, Key, Calculator, RotateCw, Hash, Code, Binary,
  Link as LinkIcon, Braces, Terminal, Regex, Percent, DollarSign,
  Activity, MapPin, Timer, Shuffle, ArrowUpDown, QrCode, Search,
  BarChart2, Filter, Palette, Camera, Fingerprint, Cpu, AtSign, User,
  Frame, Eye, Tag, Rss, FileCode, BookOpen, Dice1, Clock,
} from "lucide-react";
import logo from "@/assets/viadocs-logo.png";
import Footer from "@/components/Footer";
import { toolCategories } from "@/data/toolsData";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const testimonials = [
  {
    name: "Priya Sharma", role: "Engineering Student, VIT", avatar: "PS",
    text: "Viadocs saves me hours every week. The PDF to Word converter is incredibly accurate — no formatting loss at all!",
  },
  {
    name: "Arjun Mehta", role: "Product Manager, TCS", avatar: "AM",
    text: "I use Viadocs to convert client proposals and merge reports. Fast, clean, and completely browser-based.",
  },
  {
    name: "Sneha Rajan", role: "MBA Student, IIM", avatar: "SR",
    text: "The tools are incredibly fast and accurate. I compressed and converted my reports in under a minute!",
  },
];

const categoryColorMap: Record<string, { bg: string; text: string; border: string; grad: string }> = {
  pdf:       { bg: "hsl(var(--brand-blue) / 0.1)",   text: "hsl(var(--brand-blue))",   border: "hsl(var(--brand-blue) / 0.25)",   grad: "var(--gradient-brand)" },
  image:     { bg: "hsl(var(--brand-teal) / 0.1)",   text: "hsl(var(--brand-teal))",   border: "hsl(var(--brand-teal) / 0.25)",   grad: "linear-gradient(135deg, hsl(var(--brand-teal)), hsl(var(--brand-teal) / 0.7))" },
  text:      { bg: "hsl(220 80% 60% / 0.1)",         text: "hsl(220 80% 60%)",         border: "hsl(220 80% 60% / 0.25)",         grad: "linear-gradient(135deg, hsl(220 80% 60%), hsl(220 80% 45%))" },
  developer: { bg: "hsl(var(--brand-indigo) / 0.1)", text: "hsl(var(--brand-indigo))", border: "hsl(var(--brand-indigo) / 0.25)", grad: "linear-gradient(135deg, hsl(var(--brand-indigo)), hsl(var(--brand-indigo) / 0.7))" },
  security:  { bg: "hsl(25 95% 55% / 0.1)",          text: "hsl(25 95% 55%)",          border: "hsl(25 95% 55% / 0.25)",          grad: "linear-gradient(135deg, hsl(25 95% 55%), hsl(20 95% 45%))" },
  web:       { bg: "hsl(145 65% 42% / 0.1)",         text: "hsl(145 65% 42%)",         border: "hsl(145 65% 42% / 0.25)",         grad: "linear-gradient(135deg, hsl(145 65% 42%), hsl(145 65% 30%))" },
  utility:   { bg: "hsl(345 80% 55% / 0.1)",         text: "hsl(345 80% 55%)",         border: "hsl(345 80% 55% / 0.25)",         grad: "linear-gradient(135deg, hsl(345 80% 55%), hsl(345 80% 40%))" },
};

const Landing = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* ── Navbar ── */}
      <nav className="nav-blur fixed top-0 left-0 right-0 z-50 border-b border-border">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="Viadocs" className="h-9 w-9 object-contain" />
            <span className="font-extrabold text-lg tracking-widest gradient-text uppercase">Viadocs</span>
          </Link>
          <div className="hidden md:flex items-center gap-6">
            <a href="#tools" className="text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors">Tools</a>
            <a href="#features" className="text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors">Features</a>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/login" className="text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors hidden md:block">
              Sign In
            </Link>
            <Link to="/login?tab=signup" className="btn-gradient px-5 py-2.5 rounded-full text-sm font-bold shadow-soft">
              Get Started Free
            </Link>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "var(--gradient-hero-glow), var(--gradient-teal-glow)" }} />
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full opacity-[0.07] blur-3xl"
          style={{ background: "hsl(var(--brand-blue))" }} />
        <div className="absolute bottom-0 left-[-5%] w-[400px] h-[400px] rounded-full opacity-[0.05] blur-3xl"
          style={{ background: "hsl(var(--brand-teal))" }} />

        <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase mb-6"
              style={{ background: "hsl(var(--brand-blue) / 0.1)", color: "hsl(var(--brand-blue))", border: "1px solid hsl(var(--brand-blue) / 0.25)" }}>
              <Sparkles className="w-3.5 h-3.5" /> Free · Open Source · No Sign-up Required
            </span>
          </motion.div>

          <motion.h1 className="text-5xl md:text-7xl font-extrabold leading-[1.05] mb-6"
            variants={fadeUp} initial="hidden" animate="visible" custom={1}>
            {/* "100 Tools" highlighted with glow + gradient */}
            <span className="relative inline-block">
              <span className="relative z-10 gradient-text" style={{
                textShadow: "0 0 60px hsl(var(--brand-blue) / 0.4), 0 0 120px hsl(var(--brand-teal) / 0.2)",
              }}>100 Tools</span>
              {/* underline accent */}
              <span className="absolute -bottom-1 left-0 right-0 h-1 rounded-full" style={{ background: "var(--gradient-brand)" }} />
            </span>
            {" "}at{" "}
            <span className="gradient-text">One Place</span>
          </motion.h1>

          <motion.p className="text-muted-foreground text-lg md:text-xl leading-relaxed mb-8 max-w-2xl mx-auto"
            variants={fadeUp} initial="hidden" animate="visible" custom={2}>
            PDF tools, Image tools, Text tools, Developer tools, Security generators, SEO tools &amp; Utility calculators —
            all <strong className="text-foreground">free</strong>, all <strong className="text-foreground">browser-based</strong>, no sign-up needed.
          </motion.p>

          <motion.div className="flex flex-col sm:flex-row gap-3 justify-center mb-12"
            variants={fadeUp} initial="hidden" animate="visible" custom={3}>
            <a href="#tools"
              className="btn-gradient inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-sm shadow-soft">
              Explore All 100 Tools <ArrowRight className="w-4 h-4" />
            </a>
            <Link to="/tools"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-sm bg-card border border-border text-foreground hover:border-primary hover:text-primary transition-all duration-300 shadow-card">
              Browse by Category
            </Link>
          </motion.div>

          {/* ── Stats row ── */}
          <motion.div className="flex flex-wrap items-center justify-center gap-8"
            variants={fadeUp} initial="hidden" animate="visible" custom={4}>
            {[
              { v: "100", l: "Free Tools", highlight: true },
              { v: "7", l: "Categories" },
              { v: "10K+", l: "Users" },
              { v: "0", l: "Sign-up required" },
              { v: "100%", l: "Browser-based" },
            ].map(s => (
              <div key={s.l} className="flex flex-col items-center">
                <span className={`text-2xl font-extrabold ${s.highlight ? "gradient-text" : "gradient-text"}`}>{s.v}</span>
                <span className="text-xs text-muted-foreground font-semibold">{s.l}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── All 100 Tools by Category ── */}
      <section id="tools" className="py-20">
        <div className="max-w-7xl mx-auto px-6">

          <motion.div className="text-center mb-16" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase mb-5"
              style={{ background: "hsl(var(--brand-blue) / 0.1)", color: "hsl(var(--brand-blue))", border: "1px solid hsl(var(--brand-blue) / 0.25)" }}>
              <Zap className="w-3.5 h-3.5" /> All 100 Tools — Pick Yours
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
              Every Tool You'll{" "}
              <span className="relative inline-block">
                <span className="gradient-text">Ever Need</span>
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full" style={{ background: "var(--gradient-brand)" }} />
              </span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-sm leading-relaxed">
              From PDF conversions to developer utilities — all 100 tools are completely free and run in your browser.
            </p>
          </motion.div>

          <div className="space-y-14">
            {toolCategories.map((cat, catIdx) => {
              const colors = categoryColorMap[cat.id] ?? categoryColorMap.pdf;
              const CatIcon = cat.icon;
              return (
                <motion.div key={cat.id}
                  variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={catIdx * 0.5}>

                  {/* Category header */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center shadow-soft flex-shrink-0"
                      style={{ background: colors.grad }}>
                      <CatIcon className="w-4.5 h-4.5 text-white w-[18px] h-[18px]" />
                    </div>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
                      style={{ background: colors.bg, color: colors.text, border: `1px solid ${colors.border}` }}>
                      {cat.label}
                    </span>
                    <span className="text-xs text-muted-foreground font-semibold">
                      {cat.tools.length} tools
                    </span>
                    <div className="flex-1 h-px bg-border" />
                  </div>

                  {/* Tool cards grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                    {cat.tools.map((tool, i) => {
                      const ToolIcon = tool.icon;
                      return (
                        <motion.div key={tool.slug}
                          variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={(i % 10) * 0.08}>
                          <Link to={`/tools/${tool.slug}`}
                            className="card-glass rounded-2xl p-4 flex flex-col items-center gap-2.5 shadow-card text-center group block hover:border-primary/40 border border-border transition-all duration-200">
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-soft transition-transform duration-300 group-hover:scale-110"
                              style={{ background: colors.grad }}>
                              <ToolIcon className="w-5 h-5 text-white" />
                            </div>
                            <p className="font-semibold text-xs leading-tight">{tool.label}</p>
                            {tool.isBrowserTool ? (
                              <span className="text-[9px] font-bold px-2 py-0.5 rounded-full"
                                style={{ background: colors.bg, color: colors.text }}>
                                ⚡ Browser
                              </span>
                            ) : (
                              <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                                Free
                              </span>
                            )}
                          </Link>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* View all CTA */}
          <motion.div className="mt-12 text-center"
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <Link to="/tools"
              className="btn-gradient inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-sm shadow-soft">
              Open the Full Tools Dashboard <ChevronRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── Features ── */}
      <section id="features" className="py-24 bg-card">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div className="text-center mb-14" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
              Why <span className="gradient-text">Viadocs?</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-sm leading-relaxed">
              Built from the ground up for students and professionals who need powerful tools without the complexity.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Zap,      title: "Instant Conversions",     desc: "Convert documents and images in seconds — no lag, no queue." },
              { icon: Shield,   title: "Secure & Private",        desc: "Your files are processed in your browser. Nothing is uploaded to our servers." },
              { icon: Sparkles, title: "100 Powerful Tools",      desc: "From PDF merging to JSON formatting — everything you need in one platform." },
              { icon: Globe,    title: "Works Everywhere",        desc: "100% browser-based. No installation. Works on any device, any OS." },
              { icon: Users,    title: "Built for Everyone",      desc: "Students, developers, designers, marketers — one platform fits all." },
              { icon: Star,     title: "Forever Free",            desc: "All 100 tools are completely free with no hidden charges or limits." },
            ].map((f, i) => (
              <motion.div key={f.title}
                className="card-glass rounded-2xl p-7 shadow-card flex flex-col gap-4"
                variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i}>
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-soft"
                  style={{ background: "var(--gradient-brand)" }}>
                  <f.icon className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base mb-2">{f.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div className="text-center mb-14" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
              Loved by <span className="gradient-text">Users</span>
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div key={t.name}
                className="card-glass rounded-2xl p-7 shadow-card flex flex-col gap-4"
                variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i}>
                <div className="flex gap-1 mb-1">
                  {[1,2,3,4,5].map(s => <Star key={s} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">"{t.text}"</p>
                <div className="flex items-center gap-3 pt-3 border-t border-border">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white"
                    style={{ background: "var(--gradient-brand)" }}>
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-bold text-sm">{t.name}</p>
                    <p className="text-[11px] text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "var(--gradient-hero-glow), var(--gradient-teal-glow)" }} />
        <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-5">
              Ready to use all{" "}
              <span className="relative inline-block">
                <span className="gradient-text" style={{ textShadow: "0 0 40px hsl(var(--brand-blue) / 0.5)" }}>100 tools</span>
                <span className="absolute -bottom-1 left-0 right-0 h-1 rounded-full" style={{ background: "var(--gradient-brand)" }} />
              </span>
              {" "}for free?
            </h2>
            <p className="text-muted-foreground text-base mb-8 max-w-xl mx-auto leading-relaxed">
              No account needed for most tools. Just open and use.
            </p>
            <Link to="/tools"
              className="btn-gradient inline-flex items-center gap-2 px-10 py-4 rounded-full font-bold text-base shadow-hover">
              Start Using Free Tools <ChevronRight className="w-5 h-5" />
            </Link>
            <p className="text-xs text-muted-foreground mt-4">100% free · Open source · No sign-up required</p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Landing;
