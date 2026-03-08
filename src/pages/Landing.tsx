import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Sparkles, FileText, FileDown, GitMerge, Scissors, Minimize2, Image,
  Download, Lock, Unlock, Table, Monitor, Zap, Shield, Globe, Users,
  ArrowRight, CheckCircle, Star, ChevronRight,
  Crop, Maximize2, ImageDown, ScanLine, RefreshCw, Layers, PenTool,
} from "lucide-react";
import logo from "@/assets/viadocs-logo.png";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const pdfTools = [
  { icon: FileText,  label: "PDF to Word",        slug: "pdf-to-word" },
  { icon: FileDown,  label: "Word to PDF",         slug: "word-to-pdf" },
  { icon: GitMerge,  label: "Merge PDF",           slug: "pdf-merge" },
  { icon: Scissors,  label: "Split PDF",           slug: "pdf-split" },
  { icon: Minimize2, label: "Compress PDF",        slug: "pdf-compress" },
  { icon: Image,     label: "Image to PDF",        slug: "image-to-pdf" },
  { icon: Download,  label: "PDF to Image",        slug: "pdf-to-image" },
  { icon: Lock,      label: "Protect PDF",         slug: "password-protect" },
  { icon: Unlock,    label: "Unlock PDF",          slug: "unlock-pdf" },
  { icon: Table,     label: "Excel to PDF",        slug: "excel-to-pdf" },
  { icon: Monitor,   label: "PowerPoint to PDF",   slug: "powerpoint-to-pdf" },
];

const imageTools = [
  { icon: Crop,      label: "Image Resize",        slug: "image-resize" },
  { icon: Maximize2, label: "Image Upscale",        slug: "image-upscale" },
  { icon: ImageDown, label: "Image to ICO",         slug: "image-to-ico" },
  { icon: ScanLine,  label: "Image to SVG",         slug: "image-to-svg" },
  { icon: Minimize2, label: "Compress Image",       slug: "compress-image" },
  { icon: RefreshCw, label: "Remove Background",    slug: "remove-background" },
  { icon: Layers,    label: "Merge Photo & Sign",   slug: "merge-photo-sign" },
  { icon: PenTool,   label: "Add Watermark",        slug: "add-watermark-image" },
];

const features = [
  {
    icon: Zap,
    title: "Instant Conversions",
    desc: "Convert Word, Excel, PowerPoint, and images into PDFs in seconds — without losing formatting.",
    color: "hsl(var(--brand-blue))",
  },
  {
    icon: Shield,
    title: "Secure & Private",
    desc: "Your files are encrypted and processed securely on Cloudflare's global edge network.",
    color: "hsl(var(--brand-teal))",
  },
  {
    icon: Sparkles,
    title: "AI Document Builder",
    desc: "Generate professional reports, assignments, and resumes with our AI-powered editor.",
    color: "hsl(var(--brand-indigo))",
  },
  {
    icon: Globe,
    title: "Works Everywhere",
    desc: "100% browser-based. No installation required. Access from any device, anywhere.",
    color: "hsl(var(--brand-blue))",
  },
  {
    icon: Users,
    title: "Built for Students & Teams",
    desc: "Crafted for academic and corporate use. Simplify project reports and documentation.",
    color: "hsl(var(--brand-teal))",
  },
  {
    icon: Star,
    title: "Free Forever Plan",
    desc: "Start with all essential tools for free. Upgrade for unlimited AI and priority processing.",
    color: "hsl(var(--brand-indigo))",
  },
];

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Engineering Student, VIT",
    avatar: "PS",
    text: "Viadocs saves me hours every week. The PDF to Word converter is incredibly accurate — no formatting loss at all!",
  },
  {
    name: "Arjun Mehta",
    role: "Product Manager, TCS",
    avatar: "AM",
    text: "I use Viadocs to convert client proposals and merge reports. Fast, clean, and completely browser-based.",
  },
  {
    name: "Sneha Rajan",
    role: "MBA Student, IIM",
    avatar: "SR",
    text: "The AI document builder helped me create a full project report in under 10 minutes. Absolutely brilliant.",
  },
];

const plans = [
  {
    name: "Free",
    price: "₹0",
    period: "forever",
    desc: "Everything you need to get started.",
    features: ["11 PDF tools", "5 conversions/day", "10MB max file size", "Browser editor"],
    cta: "Get Started",
    gradient: false,
  },
  {
    name: "Pro",
    price: "₹199",
    period: "per month",
    desc: "Unlimited power for professionals.",
    features: ["Unlimited conversions", "100MB max file size", "AI document builder", "Conversion history", "Priority processing"],
    cta: "Start Free Trial",
    gradient: true,
    badge: "Most Popular",
  },
  {
    name: "Team",
    price: "₹599",
    period: "per month",
    desc: "For growing teams and enterprises.",
    features: ["Everything in Pro", "5 team members", "Shared workspace", "Admin dashboard", "API access"],
    cta: "Contact Sales",
    gradient: false,
  },
];

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
            <a href="#features" className="text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors">Features</a>
            <a href="#tools" className="text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors">Tools</a>
            <a href="#pricing" className="text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors">Pricing</a>
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
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "var(--gradient-hero-glow), var(--gradient-teal-glow)" }} />
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full opacity-[0.07] blur-3xl"
          style={{ background: "hsl(var(--brand-blue))" }} />
        <div className="absolute bottom-0 left-[-5%] w-[400px] h-[400px] rounded-full opacity-[0.05] blur-3xl"
          style={{ background: "hsl(var(--brand-teal))" }} />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left */}
            <div>
              <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0}>
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase mb-6"
                  style={{ background: "hsl(var(--brand-blue) / 0.1)", color: "hsl(var(--brand-blue))", border: "1px solid hsl(var(--brand-blue) / 0.25)" }}>
                  <Sparkles className="w-3.5 h-3.5" /> AI-Powered · Free · Instant
                </span>
              </motion.div>

              <motion.h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.05] mb-6"
                variants={fadeUp} initial="hidden" animate="visible" custom={1}>
                Document Tools{" "}
                <span className="gradient-text">Reimagined</span>
                {" "}for India
              </motion.h1>

              <motion.p className="text-muted-foreground text-lg leading-relaxed mb-8 max-w-lg"
                variants={fadeUp} initial="hidden" animate="visible" custom={2}>
                Convert PDFs, merge files, compress documents and build AI-powered reports — all in one free workspace built for students and professionals.
              </motion.p>

              <motion.div className="flex flex-col sm:flex-row gap-3 mb-10"
                variants={fadeUp} initial="hidden" animate="visible" custom={3}>
                <Link to="/login?tab=signup"
                  className="btn-gradient inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-sm shadow-soft">
                  Start for Free <ArrowRight className="w-4 h-4" />
                </Link>
                <a href="#tools"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-sm bg-card border border-border text-foreground hover:border-primary hover:text-primary transition-all duration-300 shadow-card">
                  Explore Tools
                </a>
              </motion.div>

              <motion.div className="flex items-center gap-6"
                variants={fadeUp} initial="hidden" animate="visible" custom={4}>
                <div className="flex -space-x-2">
                  {["AK", "PS", "MR", "SR"].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-background flex items-center justify-center text-[10px] font-bold text-white"
                      style={{ background: "var(--gradient-brand)" }}>
                      {i}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1 mb-0.5">
                    {[1,2,3,4,5].map(i => <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />)}
                  </div>
                  <p className="text-xs text-muted-foreground font-semibold">Loved by 10,000+ users</p>
                </div>
              </motion.div>
            </div>

            {/* Right: floating tool cards */}
            <motion.div className="relative h-[480px] hidden lg:block"
              variants={fadeUp} initial="hidden" animate="visible" custom={5}>
              {/* Main card */}
              <div className="absolute top-0 right-0 w-72 card-glass rounded-3xl p-6 shadow-hover border border-border">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-2xl flex items-center justify-center" style={{ background: "var(--gradient-brand)" }}>
                    <FileText className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-sm">PDF to Word</p>
                    <p className="text-[11px] text-muted-foreground">Converting…</p>
                  </div>
                </div>
                <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                  <motion.div className="h-full rounded-full"
                    style={{ background: "var(--gradient-brand)" }}
                    initial={{ width: "0%" }}
                    animate={{ width: "72%" }}
                    transition={{ duration: 2, delay: 1, ease: "easeInOut" }}
                  />
                </div>
                <p className="text-[11px] text-muted-foreground mt-2">72% — almost done</p>
              </div>

              {/* Success card */}
              <motion.div
                className="absolute top-28 right-4 w-64 card-glass rounded-2xl p-4 shadow-hover border border-border"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.5, duration: 0.5 }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-bold text-sm text-green-700">Conversion Complete!</p>
                    <p className="text-[11px] text-muted-foreground">report.pdf → report.docx</p>
                  </div>
                </div>
              </motion.div>

              {/* Stats card */}
              <div className="absolute bottom-12 left-4 w-56 card-glass rounded-2xl p-4 shadow-hover border border-border">
                <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider mb-3">Your Activity</p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { v: "47", l: "Files converted" },
                    { v: "11", l: "Tools used" },
                  ].map(s => (
                    <div key={s.l}>
                      <p className="text-xl font-extrabold gradient-text">{s.v}</p>
                      <p className="text-[10px] text-muted-foreground">{s.l}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tool pill chips floating */}
              {["PDF Merge", "Compress", "Unlock PDF"].map((t, i) => (
                <motion.div key={t}
                  className="absolute card-glass rounded-full px-3 py-1.5 text-xs font-semibold border border-border shadow-soft"
                  style={{ top: `${200 + i * 60}px`, left: `${i * 30}px` }}
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.8 }}
                >
                  {t}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Trust bar ── */}
      <section className="py-6 border-y border-border bg-card/50">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex flex-wrap items-center justify-center gap-8 text-center">
            {[
              { v: "10K+", l: "Users" },
              { v: "500K+", l: "Files Processed" },
              { v: "11", l: "PDF Tools" },
              { v: "99.9%", l: "Uptime" },
              { v: "100%", l: "Free Plan" },
            ].map(s => (
              <div key={s.l} className="flex flex-col items-center">
                <span className="text-2xl font-extrabold gradient-text">{s.v}</span>
                <span className="text-xs text-muted-foreground font-semibold">{s.l}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Tools Grid ── */}
      <section id="tools" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div className="text-center mb-14" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase mb-5"
              style={{ background: "hsl(var(--brand-teal) / 0.1)", color: "hsl(var(--brand-teal))", border: "1px solid hsl(var(--brand-teal) / 0.25)" }}>
              <Zap className="w-3.5 h-3.5" /> 19 Powerful Tools
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
              Everything You Need for <span className="gradient-text">PDFs & Images</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-sm leading-relaxed">
              Convert, merge, compress, protect PDFs — plus resize, upscale, and edit images. All free.
            </p>
          </motion.div>

          {/* PDF Tools */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
                style={{ background: "hsl(var(--brand-blue) / 0.1)", color: "hsl(var(--brand-blue))", border: "1px solid hsl(var(--brand-blue) / 0.2)" }}>
                <FileText className="w-3 h-3" /> PDF Tools
              </span>
              <div className="flex-1 h-px bg-border" />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {pdfTools.map((t, i) => (
                <motion.div key={t.slug}
                  variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i % 8}>
                  <Link to="/login?tab=signup"
                    className="card-glass rounded-2xl p-5 flex flex-col items-center gap-3 shadow-card text-center group block">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-soft transition-transform duration-300 group-hover:scale-110"
                      style={{ background: "var(--gradient-brand)" }}>
                      <t.icon className="w-6 h-6 text-white" />
                    </div>
                    <p className="font-bold text-sm">{t.label}</p>
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full"
                      style={{ background: "hsl(var(--brand-blue) / 0.1)", color: "hsl(var(--brand-blue))" }}>
                      Free
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Image Tools */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
                style={{ background: "hsl(var(--brand-teal) / 0.1)", color: "hsl(var(--brand-teal))", border: "1px solid hsl(var(--brand-teal) / 0.2)" }}>
                <Image className="w-3 h-3" /> Image Tools
              </span>
              <div className="flex-1 h-px bg-border" />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {imageTools.map((t, i) => (
                <motion.div key={t.slug}
                  variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i % 8}>
                  <Link to="/login?tab=signup"
                    className="card-glass rounded-2xl p-5 flex flex-col items-center gap-3 shadow-card text-center group block">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-soft transition-transform duration-300 group-hover:scale-110"
                      style={{ background: "var(--gradient-brand)" }}>
                      <t.icon className="w-6 h-6 text-white" />
                    </div>
                    <p className="font-bold text-sm">{t.label}</p>
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full"
                      style={{ background: "hsl(var(--brand-teal) / 0.12)", color: "hsl(var(--brand-teal))" }}>
                      Free
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
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
              Built from the ground up for Indian students and professionals who need powerful tools without the complexity.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
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

      {/* ── Pricing ── */}
      <section id="pricing" className="py-24 bg-card">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div className="text-center mb-14" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
              Simple <span className="gradient-text">Pricing</span>
            </h2>
            <p className="text-muted-foreground text-sm">Start free. Upgrade when you're ready.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {plans.map((p, i) => (
              <motion.div key={p.name}
                className={`rounded-2xl p-8 flex flex-col gap-5 relative overflow-hidden ${
                  p.gradient
                    ? "text-white shadow-hover"
                    : "card-glass shadow-card border border-border"
                }`}
                style={p.gradient ? { background: "var(--gradient-brand)" } : {}}
                variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i}>
                {p.badge && (
                  <span className="absolute top-4 right-4 text-[10px] font-bold px-2.5 py-1 rounded-full bg-white/20">
                    {p.badge}
                  </span>
                )}
                <div>
                  <p className={`font-bold text-sm uppercase tracking-wider mb-1 ${p.gradient ? "text-white/70" : "text-muted-foreground"}`}>{p.name}</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold">{p.price}</span>
                    <span className={`text-sm ${p.gradient ? "text-white/60" : "text-muted-foreground"}`}>/{p.period}</span>
                  </div>
                  <p className={`text-sm mt-1 ${p.gradient ? "text-white/70" : "text-muted-foreground"}`}>{p.desc}</p>
                </div>
                <ul className="flex flex-col gap-2.5 flex-1">
                  {p.features.map(f => (
                    <li key={f} className="flex items-center gap-2.5 text-sm font-medium">
                      <CheckCircle className={`w-4 h-4 flex-shrink-0 ${p.gradient ? "text-white/80" : "text-primary"}`} />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link to="/login?tab=signup"
                  className={`w-full py-3 rounded-xl font-bold text-sm text-center transition-all duration-200 ${
                    p.gradient
                      ? "bg-white/20 hover:bg-white/30 text-white"
                      : "btn-gradient text-white shadow-soft"
                  }`}>
                  {p.cta}
                </Link>
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
              Ready to work <span className="gradient-text">smarter?</span>
            </h2>
            <p className="text-muted-foreground text-base mb-8 max-w-xl mx-auto leading-relaxed">
              Join thousands of students and professionals who use Viadocs every day to manage documents effortlessly.
            </p>
            <Link to="/login?tab=signup"
              className="btn-gradient inline-flex items-center gap-2 px-10 py-4 rounded-full font-bold text-base shadow-hover">
              Get Started — It's Free <ChevronRight className="w-5 h-5" />
            </Link>
            <p className="text-xs text-muted-foreground mt-4">No credit card required · Free forever plan</p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Landing;
