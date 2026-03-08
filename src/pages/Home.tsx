import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FileText, FileDown, GitMerge, Scissors, Minimize2, Image, Download,
  Lock, Unlock, Table, Monitor, Plus, Sparkles, Zap, Shield,
  Users, Globe, Gift, ChevronRight, CheckCircle, Clock, Star,
  ArrowRight, BookOpen, TrendingUp,
} from "lucide-react";
import AppNavbar from "@/components/AppNavbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import { filesApi, Conversion } from "@/config/api";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const quickTools = [
  { icon: FileText,  label: "PDF to Word",   slug: "pdf-to-word" },
  { icon: FileDown,  label: "Word to PDF",   slug: "word-to-pdf" },
  { icon: GitMerge,  label: "PDF Merge",     slug: "pdf-merge" },
  { icon: Scissors,  label: "PDF Split",     slug: "pdf-split" },
  { icon: Minimize2, label: "PDF Compress",  slug: "pdf-compress" },
  { icon: Image,     label: "Image to PDF",  slug: "image-to-pdf" },
  { icon: Download,  label: "PDF to Image",  slug: "pdf-to-image" },
  { icon: Lock,      label: "Protect PDF",   slug: "password-protect" },
  { icon: Unlock,    label: "Unlock PDF",    slug: "unlock-pdf" },
  { icon: Table,     label: "Excel to PDF",  slug: "excel-to-pdf" },
  { icon: Monitor,   label: "PPT to PDF",    slug: "powerpoint-to-pdf" },
];

const stats = [
  { value: "11+",   label: "PDF Tools" },
  { value: "100%",  label: "Free Plan" },
  { value: "AI",    label: "Powered" },
  { value: "0",     label: "File Storage" },
];

const features = [
  {
    icon: Plus,
    title: "Create Documents Instantly",
    desc: "Generate professional projects, assignments, and resumes in seconds using Viadocs' AI document builder — built for students and employees.",
    link: "/create-doc",
    cta: "Open Editor",
  },
  {
    icon: Zap,
    title: "All-in-One PDF Tools",
    desc: "Merge, split, compress, or convert PDFs instantly. Manage your files securely — anytime, anywhere.",
    link: "/tools",
    cta: "Browse Tools",
  },
  {
    icon: Sparkles,
    title: "AI-Powered Assistance",
    desc: "Let our AI help summarize, rewrite, or extract key data from documents — boosting your productivity and creativity.",
    link: "/create-doc",
    cta: "Try AI",
  },
];

const whyPoints = [
  { icon: Zap,      title: "Instant Conversions",       desc: "Convert Word, Excel, PowerPoint, and images into PDFs instantly — without losing formatting." },
  { icon: Shield,   title: "Safe and Secure",            desc: "Your files remain private and encrypted. We never store or share your documents." },
  { icon: Sparkles, title: "AI-Powered Features",        desc: "Let our AI assistant summarize reports, extract data, or auto-format content with precision." },
  { icon: Globe,    title: "Works on All Devices",       desc: "Access Viadocs tools anywhere — desktop, tablet, or mobile. 100% browser-based." },
  { icon: Users,    title: "Built for Students & Teams", desc: "Specially crafted for academic and corporate use — simplify project reports and documentation." },
  { icon: Gift,     title: "Free Forever Plan",          desc: "Start with all essential tools for free — no sign-up required for most PDF functions." },
];

const faqs = [
  { q: "Is Viadocs free to use?",                    a: "Yes, Viadocs offers a free plan that lets users create and manage documents without any cost. Premium features offer unlimited AI usage and advanced document tools." },
  { q: "Who can use Viadocs?",                       a: "Viadocs is designed for engineering students, professionals, teachers, and employees who need efficient tools for document creation, PDF editing, and AI assistance." },
  { q: "Is my data safe on Viadocs?",               a: "Absolutely. Viadocs handles your uploaded files securely only. We never store your files for longer than necessary." },
  { q: "Does Viadocs work on mobile?",              a: "Yes, Viadocs is fully responsive, accessible on mobile, tablets, and desktop devices." },
  { q: "How is Viadocs different from other PDF tools?", a: "Viadocs is uniquely built for students and professionals in India. It combines PDF tools, AI-powered document creation, and a user-friendly interface in one platform." },
];

type Conversion = { id: string; tool_label: string; file_name: string; created_at: string };

const Home = () => {
  const { user } = useAuth();
  const [recentConversions, setRecentConversions] = useState<Conversion[]>([]);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const displayName = user?.user_metadata?.full_name || user?.email?.split("@")[0] || "there";

  useEffect(() => {
    if (!user) return;
    supabase
      .from("conversions")
      .select("id, tool_label, file_name, created_at")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(4)
      .then(({ data }) => { if (data) setRecentConversions(data); });
  }, [user]);

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
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* ── Left copy ── */}
            <div>
              <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0}>
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase mb-6"
                  style={{ background: "hsl(var(--brand-blue) / 0.1)", color: "hsl(var(--brand-blue))", border: "1px solid hsl(var(--brand-blue) / 0.25)" }}>
                  <Sparkles className="w-3.5 h-3.5" /> AI-Powered Document Platform
                </span>
              </motion.div>

              <motion.h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.1] mb-5"
                variants={fadeUp} initial="hidden" animate="visible" custom={1}>
                Welcome back,{" "}
                <span className="gradient-text">{displayName}!</span>
              </motion.h1>

              <motion.p className="text-muted-foreground text-base md:text-lg mb-8 leading-relaxed max-w-lg"
                variants={fadeUp} initial="hidden" animate="visible" custom={2}>
                Create professional documents, collaborate with your team, and manage projects efficiently using our AI-powered tools.
              </motion.p>

              <motion.div className="flex flex-col sm:flex-row gap-3 mb-10"
                variants={fadeUp} initial="hidden" animate="visible" custom={3}>
                <Link to="/tools"
                  className="btn-gradient inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm shadow-soft">
                  Explore Tools <ChevronRight className="w-4 h-4" />
                </Link>
                <Link to="/create-doc"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm bg-card border border-border text-foreground hover:border-primary hover:text-primary transition-all duration-300 shadow-card">
                  <Plus className="w-4 h-4" /> Create Document
                </Link>
              </motion.div>

              {/* Stats row */}
              <motion.div className="grid grid-cols-4 gap-4"
                variants={fadeUp} initial="hidden" animate="visible" custom={4}>
                {stats.map((s) => (
                  <div key={s.label} className="text-center">
                    <p className="text-xl font-extrabold gradient-text">{s.value}</p>
                    <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wide">{s.label}</p>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* ── Right panel ── */}
            <motion.div className="flex flex-col gap-4"
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
                      className="flex flex-col items-center gap-1.5 p-2.5 rounded-xl border border-border hover:border-primary/40 hover:bg-primary/5 transition-all duration-200 text-center group">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                        style={{ background: "var(--gradient-brand)" }}>
                        <t.icon className="w-[15px] h-[15px] text-white" />
                      </div>
                      <span className="text-[9px] font-semibold leading-tight text-muted-foreground group-hover:text-foreground transition-colors">{t.label}</span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Create Doc + Recent row */}
              <div className="grid grid-cols-2 gap-4">
                <Link to="/create-doc"
                  className="card-glass rounded-2xl p-5 shadow-card border border-border flex flex-col gap-3 group hover:border-primary/40 transition-all duration-200">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: "var(--gradient-brand)" }}>
                    <BookOpen className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-sm">Create a Doc</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">Word-style editor</p>
                  </div>
                  <span className="btn-gradient text-[10px] font-bold px-3 py-1 rounded-full inline-flex items-center gap-1 w-fit">
                    Open <ArrowRight className="w-2.5 h-2.5" />
                  </span>
                </Link>

                <div className="card-glass rounded-2xl p-5 shadow-card border border-border flex flex-col gap-2">
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5" /> Recent
                  </p>
                  {recentConversions.length === 0 ? (
                    <div className="flex-1 flex flex-col items-center justify-center text-center py-3">
                      <TrendingUp className="w-7 h-7 text-muted-foreground/30 mb-2" />
                      <p className="text-[10px] text-muted-foreground">No conversions yet</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {recentConversions.slice(0, 3).map((c) => (
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
                      <Link to="/favorites" className="text-[10px] font-bold text-primary flex items-center gap-1 hover:underline mt-1">
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
            <p className="text-muted-foreground max-w-2xl mx-auto text-sm leading-relaxed">
              Whether you're a student preparing reports or an employee managing PDFs, Viadocs brings everything together in one seamless, powerful workspace.
            </p>
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
              All <span className="gradient-text">PDF Tools</span>
            </h2>
            <p className="text-muted-foreground text-sm max-w-xl mx-auto">
              Pick any tool below to instantly upload, convert, and download your file.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
            {quickTools.map((t, i) => (
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

          <div className="text-center">
            <Link to="/tools"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full font-bold text-sm border border-border bg-card hover:border-primary hover:text-primary transition-all duration-300 shadow-card">
              View All Tools <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Premium CTA ── */}
      <section className="py-20 mx-6 md:mx-16 my-8 rounded-3xl overflow-hidden relative"
        style={{ background: "linear-gradient(135deg, hsl(var(--brand-indigo) / 0.08), hsl(var(--brand-blue) / 0.08))", border: "1px solid hsl(var(--brand-blue) / 0.15)" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: "var(--gradient-hero-glow)" }} />
        <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-5"
              style={{ background: "hsl(var(--brand-blue) / 0.12)", color: "hsl(var(--brand-blue))" }}>
              ✦ Premium
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold mb-5">
              Unlock More with <span className="gradient-text">Viadocs Premium</span>
            </h2>
            <p className="text-muted-foreground text-base mb-8 max-w-xl mx-auto leading-relaxed">
              Upgrade to Viadocs Premium for faster performance, unlimited AI usage, and advanced document tools — designed to empower your work and studies.
            </p>
            <Link to="/premium" className="btn-gradient inline-flex items-center gap-2 px-10 py-4 rounded-full font-bold text-base shadow-hover">
              Go Premium <ChevronRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── Why Viadocs ── */}
      <section className="py-24 bg-card">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div className="text-center mb-14" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
              Why Viadocs is Used by{" "}
              <span className="gradient-text">Engineering Students and Employees</span>
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {whyPoints.map((w, i) => (
              <motion.div key={w.title}
                className="card-glass rounded-2xl p-6 shadow-card"
                variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i}>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 shadow-soft"
                  style={{ background: "var(--gradient-brand)" }}>
                  <w.icon className="w-5 h-5 text-white" />
                </div>
                <h4 className="font-bold text-sm mb-2">{w.title}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">{w.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Built for ── */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase mb-6"
              style={{ background: "hsl(var(--brand-teal) / 0.1)", color: "hsl(var(--brand-teal))", border: "1px solid hsl(var(--brand-teal) / 0.25)" }}>
              <Users className="w-3.5 h-3.5" /> Our Story
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold mb-5">
              Built for Engineering Students &amp; Employees
            </h2>
            <p className="text-muted-foreground text-base leading-relaxed max-w-2xl mx-auto">
              I'm a fresher who built{" "}
              <span className="gradient-text font-bold">Viadocs</span>{" "}
              for engineering students and professionals — making document creation, editing, and PDF tools smarter and easier to use.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-24 bg-card">
        <div className="max-w-3xl mx-auto px-6">
          <motion.div className="text-center mb-12" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-extrabold">
              Frequently Asked <span className="gradient-text">Questions</span>
            </h2>
          </motion.div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div key={faq.q}
                className="card-glass rounded-2xl border border-border shadow-card overflow-hidden"
                variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i}>
                <button
                  className="w-full flex items-center justify-between px-6 py-4 text-left"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="font-bold text-sm">{faq.q}</span>
                  <ChevronRight className={`w-4 h-4 text-muted-foreground flex-shrink-0 transition-transform duration-200 ${openFaq === i ? "rotate-90" : ""}`} />
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5">
                    <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                  </div>
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
