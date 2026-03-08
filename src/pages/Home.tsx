import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FileText, FileDown, GitMerge, Scissors, Minimize2, Image, Download,
  Lock, Unlock, Table, Monitor, Plus, Sparkles, Zap, Shield,
  Users, Globe, Gift, ChevronRight, CheckCircle, Clock, Star,
  ArrowRight, BookOpen, TrendingUp,
  Crop, Maximize2, ImageDown, ScanLine, RefreshCw, Layers, PenTool,
} from "lucide-react";
import AppNavbar from "@/components/AppNavbar";
import Footer from "@/components/Footer";
import { useState } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const pdfTools = [
  { icon: FileText,  label: "PDF to Word",   slug: "pdf-to-word" },
  { icon: FileDown,  label: "Word to PDF",   slug: "word-to-pdf" },
  { icon: GitMerge,  label: "Merge PDF",     slug: "pdf-merge" },
  { icon: Scissors,  label: "Split PDF",     slug: "pdf-split" },
  { icon: Minimize2, label: "Compress",      slug: "pdf-compress" },
  { icon: Image,     label: "Img to PDF",    slug: "image-to-pdf" },
  { icon: Download,  label: "PDF to Img",    slug: "pdf-to-image" },
  { icon: Lock,      label: "Protect PDF",   slug: "password-protect" },
  { icon: Unlock,    label: "Unlock PDF",    slug: "unlock-pdf" },
  { icon: Table,     label: "Excel to PDF",  slug: "excel-to-pdf" },
  { icon: Monitor,   label: "PPT to PDF",    slug: "powerpoint-to-pdf" },
];

const imageTools = [
  { icon: Crop,      label: "Resize",        slug: "image-resize" },
  { icon: Maximize2, label: "Upscale",       slug: "image-upscale" },
  { icon: ImageDown, label: "To ICO",        slug: "image-to-ico" },
  { icon: ScanLine,  label: "To SVG",        slug: "image-to-svg" },
  { icon: Minimize2, label: "Compress",      slug: "compress-image" },
  { icon: RefreshCw, label: "Remove BG",     slug: "remove-background" },
  { icon: Layers,    label: "Merge Sign",    slug: "merge-photo-sign" },
  { icon: PenTool,   label: "Watermark",     slug: "add-watermark-image" },
];

const quickTools = pdfTools.slice(0, 8);

const features = [
  {
    icon: Zap,
    title: "PDF Tools",
    desc: "Merge, split, compress, or convert PDFs — all in one place, completely free.",
    link: "/tools",
    cta: "Browse Tools",
  },
  {
    icon: Sparkles,
    title: "Image Tools",
    desc: "Resize, compress, remove backgrounds, and convert images in seconds.",
    link: "/tools",
    cta: "Try Tools",
  },
  {
    icon: Shield,
    title: "Safe & Secure",
    desc: "Files are processed privately and never stored longer than needed.",
    link: "/tools",
    cta: "Get Started",
  },
];

const whyPoints = [
  { icon: Zap,      title: "Instant Conversions",       desc: "Convert documents instantly — no formatting loss." },
  { icon: Shield,   title: "Safe and Secure",            desc: "Files are encrypted, private and never shared." },
  { icon: Sparkles, title: "AI-Powered Features",        desc: "AI summaries, rewrites, and auto-formatting." },
  { icon: Globe,    title: "Works on All Devices",       desc: "100% browser-based. Desktop, tablet, or mobile." },
  { icon: Users,    title: "Built for Students & Teams", desc: "Designed for academic and corporate use." },
  { icon: Gift,     title: "Free Forever Plan",          desc: "Essential tools always free — no sign-up tricks." },
];

const faqs = [
  { q: "Is Viadocs free to use?",              a: "Yes! Viadocs offers a free plan with all essential tools. Premium plans unlock unlimited AI usage and advanced features." },
  { q: "Is my data safe?",                     a: "Absolutely. Files are processed securely on Cloudflare's edge network. We never store files longer than needed." },
  { q: "Does it work on mobile?",              a: "Yes — Viadocs is fully responsive across mobile, tablets and desktop." },
  { q: "How is this different from ilovepdf?", a: "Viadocs is built specifically for Indian students and professionals, with AI document creation and a unified workspace." },
  { q: "Can I use it without signing up?",     a: "Most PDF tools are available to use, but signing in lets you track conversion history and use the AI builder." },
];

const mockRecent = [
  { id: "1", tool_label: "PDF to Word", file_name: "report.pdf" },
  { id: "2", tool_label: "PDF Merge",   file_name: "slides.pdf" },
];

const Home = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

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
                  <Sparkles className="w-3.5 h-3.5" /> AI-Powered Document Platform
                </span>
              </motion.div>

              <motion.h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.1] mb-5"
                variants={fadeUp} initial="hidden" animate="visible" custom={1}>
                Welcome back,{" "}
                <span className="gradient-text">User!</span>
              </motion.h1>

              <motion.p className="text-muted-foreground text-base md:text-lg mb-8 leading-relaxed max-w-lg"
                variants={fadeUp} initial="hidden" animate="visible" custom={2}>
                Create professional documents, convert PDFs, and manage your files with AI-powered tools built for you.
              </motion.p>

              <motion.div className="flex flex-wrap gap-3 mb-10"
                variants={fadeUp} initial="hidden" animate="visible" custom={3}>
                <Link to="/tools"
                  className="btn-gradient inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm shadow-soft">
                  Explore Tools <ChevronRight className="w-4 h-4" />
                </Link>
                <Link to="/create-doc"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm bg-card border border-border text-foreground hover:border-primary hover:text-primary transition-all duration-300 shadow-card">
                  <Plus className="w-4 h-4" /> Create Document
                </Link>
              </motion.div>

              {/* Stats row */}
              <motion.div className="grid grid-cols-4 gap-4 max-w-sm"
                variants={fadeUp} initial="hidden" animate="visible" custom={4}>
                {[
                  { v: "19", l: "Tools" },
                  { v: "100%", l: "Free Plan" },
                  { v: "AI", l: "Powered" },
                  { v: "R2", l: "Storage" },
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
                    See all <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {quickTools.slice(0, 8).map((t) => (
                    <Link key={t.slug} to={`/tools/${t.slug}`}
                      className="flex flex-col items-center gap-1.5 p-2 rounded-xl border border-border hover:border-primary/40 hover:bg-primary/5 transition-all duration-200 text-center group">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                        style={{ background: "var(--gradient-brand)" }}>
                        <t.icon className="w-[15px] h-[15px] text-white" />
                      </div>
                      <span className="text-[9px] font-semibold leading-tight text-muted-foreground group-hover:text-foreground transition-colors line-clamp-2 text-center">{t.label}</span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Bottom row */}
              <div className="grid grid-cols-2 gap-4">
                {/* Create Doc */}
                <Link to="/create-doc"
                  className="card-glass rounded-2xl p-4 shadow-card border border-border flex flex-col gap-3 group hover:border-primary/40 transition-all duration-200">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: "var(--gradient-brand)" }}>
                    <BookOpen className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-sm">Create Doc</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">Word-style editor</p>
                  </div>
                  <span className="btn-gradient text-[10px] font-bold px-3 py-1 rounded-full inline-flex items-center gap-1 w-fit">
                    Open <ArrowRight className="w-2.5 h-2.5" />
                  </span>
                </Link>

                {/* Recent activity */}
                <div className="card-glass rounded-2xl p-4 shadow-card border border-border flex flex-col gap-2">
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" /> Recent
                  </p>
                  {mockRecent.length === 0 ? (
                    <div className="flex-1 flex flex-col items-center justify-center text-center py-2">
                      <TrendingUp className="w-7 h-7 text-muted-foreground/30 mb-1" />
                      <p className="text-[10px] text-muted-foreground">No conversions yet</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
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
                      <Link to="/home" className="text-[10px] font-bold text-primary flex items-center gap-1 hover:underline mt-1">
                        View all <ArrowRight className="w-2.5 h-2.5" />
                      </Link>
                    </div>
                  )}
                </div>
              </div>

            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="py-24 bg-card">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div className="text-center mb-14" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase mb-5"
              style={{ background: "hsl(var(--brand-teal) / 0.1)", color: "hsl(var(--brand-teal))", border: "1px solid hsl(var(--brand-teal) / 0.25)" }}>
              <Star className="w-3.5 h-3.5" /> What Viadocs Offers
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
              Work Smarter with <span className="gradient-text">Viadocs</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div key={f.title}
                className="card-glass rounded-2xl p-7 shadow-card flex flex-col gap-4"
                variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i}>
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-soft"
                  style={{ background: "var(--gradient-brand)" }}>
                  <f.icon className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-base mb-2">{f.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
                </div>
                <Link to={f.link}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline">
                  {f.cta} <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── All Tools Grid ── */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div className="text-center mb-12" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
              All <span className="gradient-text">PDF & Image Tools</span>
            </h2>
            <p className="text-muted-foreground text-sm max-w-xl mx-auto">
              Pick any tool — upload, convert, download. That simple.
            </p>
          </motion.div>

          {/* PDF Tools */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
                style={{ background: "hsl(var(--brand-blue) / 0.1)", color: "hsl(var(--brand-blue))", border: "1px solid hsl(var(--brand-blue) / 0.2)" }}>
                <FileText className="w-3 h-3" /> PDF Tools
              </span>
              <div className="flex-1 h-px bg-border" />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {pdfTools.map((t, i) => (
                <motion.div key={t.slug} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i % 8}>
                  <Link to={`/tools/${t.slug}`}
                    className="card-glass rounded-2xl p-5 flex flex-col items-center gap-3 shadow-card text-center group block">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-soft transition-transform duration-300 group-hover:scale-110"
                      style={{ background: "var(--gradient-brand)" }}>
                      <t.icon className="w-6 h-6 text-white" />
                    </div>
                    <p className="font-bold text-sm">{t.label}</p>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Image Tools */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
                style={{ background: "hsl(var(--brand-teal) / 0.1)", color: "hsl(var(--brand-teal))", border: "1px solid hsl(var(--brand-teal) / 0.2)" }}>
                <Image className="w-3 h-3" /> Image Tools
              </span>
              <div className="flex-1 h-px bg-border" />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {imageTools.map((t, i) => (
                <motion.div key={t.slug} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i % 8}>
                  <Link to={`/tools/${t.slug}`}
                    className="card-glass rounded-2xl p-5 flex flex-col items-center gap-3 shadow-card text-center group block">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-soft transition-transform duration-300 group-hover:scale-110"
                      style={{ background: "var(--gradient-brand)" }}>
                      <t.icon className="w-6 h-6 text-white" />
                    </div>
                    <p className="font-bold text-sm">{t.label}</p>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="text-center">
            <Link to="/tools"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full font-bold text-sm border border-border bg-card hover:border-primary hover:text-primary transition-all duration-300 shadow-card">
              View All Tools <ChevronRight className="w-4 h-4" />
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

      {/* ── Premium CTA ── */}
      <section className="py-20 mx-4 md:mx-12 my-8 rounded-3xl overflow-hidden relative"
        style={{ background: "linear-gradient(135deg, hsl(var(--brand-indigo) / 0.08), hsl(var(--brand-blue) / 0.08))", border: "1px solid hsl(var(--brand-blue) / 0.15)" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: "var(--gradient-hero-glow)" }} />
        <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-5"
              style={{ background: "hsl(var(--brand-blue) / 0.12)", color: "hsl(var(--brand-blue))" }}>
              <Star className="w-3 h-3" /> Go Premium
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
              Unlock <span className="gradient-text">Unlimited Power</span>
            </h2>
            <p className="text-muted-foreground text-sm mb-8 max-w-xl mx-auto leading-relaxed">
              Get unlimited conversions, AI document generation, 100MB file uploads, and priority processing.
            </p>
            <Link to="/tools"
              className="btn-gradient inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-sm shadow-hover">
              Upgrade to Pro <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
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
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
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
                    className="px-6 pb-5 text-sm text-muted-foreground leading-relaxed border-t border-border pt-4"
                  >
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
