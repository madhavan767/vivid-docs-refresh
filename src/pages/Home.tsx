import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FileText, FileDown, GitMerge, Scissors, Minimize2, Image, Download,
  Lock, Unlock, Table, Monitor, Plus, Sparkles, Zap, Shield,
  Users, Globe, Gift, ChevronRight, CheckCircle, Clock, Star
} from "lucide-react";
import AppNavbar from "@/components/AppNavbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const quickTools = [
  { icon: FileText, label: "PDF to Word", slug: "pdf-to-word" },
  { icon: FileDown, label: "Word to PDF", slug: "word-to-pdf" },
  { icon: GitMerge, label: "PDF Merge", slug: "pdf-merge" },
  { icon: Scissors, label: "PDF Split", slug: "pdf-split" },
  { icon: Minimize2, label: "PDF Compress", slug: "pdf-compress" },
  { icon: Image, label: "Image to PDF", slug: "image-to-pdf" },
];

const features = [
  {
    icon: Plus,
    title: "Create Documents Instantly",
    desc: "Generate professional projects, assignments, and resumes in seconds using Viadocs' AI document builder — built for students and employees.",
  },
  {
    icon: Zap,
    title: "All-in-One PDF Tools",
    desc: "Merge, split, compress, or convert PDFs instantly. Manage your files securely — anytime, anywhere.",
  },
  {
    icon: Sparkles,
    title: "AI-Powered Assistance",
    desc: "Let our AI help summarize, rewrite, or extract key data from documents — boosting your productivity and creativity.",
  },
];

const whyPoints = [
  { icon: Zap, title: "Instant Conversions", desc: "Convert Word, Excel, PowerPoint, and images into PDFs instantly — without losing formatting." },
  { icon: Shield, title: "Safe and Secure", desc: "Your files remain private and encrypted. We never store or share your documents." },
  { icon: Sparkles, title: "AI-Powered Features", desc: "Let our AI assistant summarize reports, extract data, or auto-format content with precision." },
  { icon: Globe, title: "Works on All Devices", desc: "Access Viadocs tools anywhere — desktop, tablet, or mobile. 100% browser-based." },
  { icon: Users, title: "Built for Students & Teams", desc: "Specially crafted for academic and corporate use — simplify project reports and documentation." },
  { icon: Gift, title: "Free Forever Plan", desc: "Start with all essential tools for free — no sign-up required for most PDF functions." },
];

const faqs = [
  { q: "Is Viadocs free to use?", a: "Yes, Viadocs offers a free plan that lets users create and manage documents without any cost. Premium features offer unlimited AI usage and advanced document tools." },
  { q: "Who can use Viadocs?", a: "Viadocs is designed for engineering students, professionals, teachers, and employees who need efficient tools for document creation, PDF editing, and AI assistance." },
  { q: "Is my data safe on Viadocs?", a: "Absolutely. Viadocs handles your uploaded files securely only. We never store your files for longer than necessary." },
  { q: "Does Viadocs work on mobile?", a: "Yes, Viadocs is fully responsive, accessible on mobile, tablets, and desktop devices." },
  { q: "How is Viadocs different from other PDF tools?", a: "Viadocs is uniquely built for students and professionals in India. It combines PDF tools, AI-powered document creation, and a user-friendly interface in one platform." },
];

type Conversion = { id: string; tool_label: string; file_name: string; created_at: string };

const Home = () => {
  const { user } = useAuth();
  const [recentConversions, setRecentConversions] = useState<Conversion[]>([]);
  const displayName = user?.user_metadata?.full_name || user?.email?.split("@")[0] || "there";

  useEffect(() => {
    if (!user) return;
    supabase
      .from("conversions")
      .select("id, tool_label, file_name, created_at")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(3)
      .then(({ data }) => {
        if (data) setRecentConversions(data);
      });
  }, [user]);

  return (
    <div className="min-h-screen bg-background">
      <AppNavbar />

      {/* ── Hero ── */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "var(--gradient-hero-glow), var(--gradient-teal-glow)" }} />
        <div className="absolute top-20 right-[-8%] w-96 h-96 rounded-full opacity-[0.08] blur-3xl"
          style={{ background: "hsl(var(--brand-blue))" }} />
        <div className="absolute bottom-0 left-[-5%] w-72 h-72 rounded-full opacity-[0.06] blur-3xl"
          style={{ background: "hsl(var(--brand-teal))" }} />

        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-10">
            {/* Left */}
            <div className="flex-1 text-center md:text-left">
              <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0}>
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase mb-5"
                  style={{ background: "hsl(var(--brand-blue) / 0.1)", color: "hsl(var(--brand-blue))", border: "1px solid hsl(var(--brand-blue) / 0.25)" }}>
                  <Sparkles className="w-3.5 h-3.5" /> AI-Powered Document Platform
                </span>
              </motion.div>

              <motion.h1
                className="text-4xl md:text-5xl font-extrabold leading-tight mb-4"
                variants={fadeUp} initial="hidden" animate="visible" custom={1}
              >
                Welcome back,{" "}
                <span className="gradient-text">{displayName}!</span>
              </motion.h1>

              <motion.p
                className="text-muted-foreground text-base mb-8 leading-relaxed max-w-lg"
                variants={fadeUp} initial="hidden" animate="visible" custom={2}
              >
                Create professional documents, collaborate with your team, and manage projects efficiently using our AI-powered tools.
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-3"
                variants={fadeUp} initial="hidden" animate="visible" custom={3}
              >
                <Link to="/tools"
                  className="btn-gradient inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm shadow-soft">
                  Explore Tools <ChevronRight className="w-4 h-4" />
                </Link>
                <Link to="/create-doc"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm bg-card border border-border text-foreground hover:border-primary hover:text-primary transition-all duration-300 shadow-card">
                  <Plus className="w-4 h-4" /> Create Document
                </Link>
              </motion.div>
            </div>

            {/* Right — quick tools */}
            <motion.div
              className="flex-1 w-full max-w-sm"
              variants={fadeUp} initial="hidden" animate="visible" custom={4}
            >
              <div className="card-glass rounded-2xl p-5 shadow-card border border-border">
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Zap className="w-3.5 h-3.5" /> Quick Tools
                </p>
                <div className="grid grid-cols-3 gap-3">
                  {quickTools.map((t) => (
                    <Link key={t.slug} to={`/tools/${t.slug}`}
                      className="flex flex-col items-center gap-2 p-3 rounded-xl border border-border hover:border-primary/40 hover:bg-primary/5 transition-all duration-200 text-center group">
                      <div className="w-9 h-9 rounded-lg flex items-center justify-center"
                        style={{ background: "var(--gradient-brand)" }}>
                        <t.icon className="w-4.5 h-4.5 text-white w-[18px] h-[18px]" />
                      </div>
                      <span className="text-[10px] font-semibold leading-tight">{t.label}</span>
                    </Link>
                  ))}
                </div>
                <Link to="/tools"
                  className="mt-4 w-full flex items-center justify-center gap-1.5 text-xs font-semibold text-primary hover:text-primary/80 transition-colors py-2">
                  View all tools <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Recent Conversions */}
              {recentConversions.length > 0 && (
                <div className="card-glass rounded-2xl p-5 shadow-card border border-border mt-4">
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5" /> Recent Activity
                  </p>
                  <div className="space-y-2.5">
                    {recentConversions.map((c) => (
                      <div key={c.id} className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                          style={{ background: "var(--gradient-brand)" }}>
                          <CheckCircle className="w-3.5 h-3.5 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold truncate">{c.file_name}</p>
                          <p className="text-[10px] text-muted-foreground">{c.tool_label}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Simplify Your Document Work ── */}
      <section className="py-24 bg-card">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div className="text-center mb-14" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h2 className="text-3xl md:text-5xl font-extrabold mb-4">
              Simplify Your <span className="gradient-text">Document Work</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-base leading-relaxed">
              Create, edit, and collaborate on documents with smart, AI-powered tools that understand your needs.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <motion.div className="card-glass rounded-2xl p-8 shadow-card" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1}>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <Link to="/create-doc" className="flex flex-col items-center gap-2 p-5 rounded-xl border border-border hover:border-primary/40 transition-all duration-300 bg-background/50 hover:bg-primary/5">
                  <Plus className="w-7 h-7 text-primary" />
                  <span className="text-sm font-semibold">Create a Doc</span>
                </Link>
                <Link to="/tools" className="flex flex-col items-center gap-2 p-5 rounded-xl border border-border hover:border-accent/40 transition-all duration-300 bg-background/50 hover:bg-accent/5">
                  <Zap className="w-7 h-7 text-accent" />
                  <span className="text-sm font-semibold">PDF Tools</span>
                </Link>
              </div>
              <div className="flex items-center gap-4 p-5 rounded-xl border border-border bg-background/50">
                <div className="flex-1">
                  <p className="text-sm font-bold mb-1">Use Viadocs to create your project doc</p>
                </div>
                <Link to="/create-doc"
                  className="btn-gradient text-xs font-bold px-4 py-2 rounded-full whitespace-nowrap flex items-center gap-1 flex-shrink-0">
                  <Sparkles className="w-3 h-3" /> Make my Project Doc
                </Link>
              </div>
            </motion.div>

            <motion.div className="text-center md:text-left" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={2}>
              <h3 className="text-2xl md:text-3xl font-extrabold mb-4 leading-snug">
                Your Smart<br /><span className="gradient-text">Document Workspace</span>
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                From academic reports to professional documentation — Viadocs gives you AI-powered tools to work smarter.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                <Link to="/tools" className="btn-gradient inline-flex items-center gap-2 px-7 py-3 rounded-full font-bold text-sm shadow-soft">
                  Try Tools
                </Link>
                <Link to="/create-doc" className="inline-flex items-center gap-2 px-7 py-3 rounded-full font-bold text-sm bg-background border border-border text-foreground hover:border-primary hover:text-primary transition-all duration-300">
                  Create Document
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── How Viadocs Works ── */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.h2 className="text-3xl md:text-5xl font-extrabold mb-6" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            How <span className="gradient-text">Viadocs</span> Works
          </motion.h2>
          <motion.div className="rounded-3xl overflow-hidden shadow-hover border border-border bg-card" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1}>
            <div className="p-10 flex flex-col items-center gap-6">
              <div className="w-28 h-28 rounded-full flex items-center justify-center shadow-soft"
                style={{ background: "var(--gradient-brand)" }}>
                <FileText className="w-14 h-14 text-white" />
              </div>
              <div className="flex items-center justify-center gap-6 flex-wrap">
                {["Upload / Create", "AI Processes", "Download Result"].map((step, i) => (
                  <div key={step} className="flex items-center gap-3">
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-sm font-bold"
                        style={{ background: "var(--gradient-brand)" }}>
                        {i + 1}
                      </div>
                      <span className="text-xs font-semibold text-muted-foreground">{step}</span>
                    </div>
                    {i < 2 && <ChevronRight className="w-5 h-5 text-muted-foreground/40 mt-[-12px]" />}
                  </div>
                ))}
              </div>
              <p className="text-muted-foreground text-sm max-w-md">© 2025 — Viadocs document and tool processor</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Work Smarter with Viadocs ── */}
      <section className="py-24 bg-card">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div className="text-center mb-14" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h2 className="text-3xl md:text-5xl font-extrabold mb-4">
              Work Smarter with <span className="gradient-text">Viadocs</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-base leading-relaxed">
              Whether you're a student preparing reports or an employee managing PDFs, Viadocs brings everything together in one seamless, powerful workspace.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div key={f.title} className="card-glass rounded-2xl p-7 shadow-card" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i}>
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 shadow-soft"
                  style={{ background: "var(--gradient-brand)" }}>
                  <f.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-base font-bold mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Premium CTA ── */}
      <section className="py-20 mx-6 md:mx-16 my-16 rounded-3xl overflow-hidden relative"
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

      {/* ── Built for Engineering Students & Employees ── */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h2 className="text-3xl md:text-5xl font-extrabold mb-4">
              Built for Engineering Students &amp; Employees
            </h2>
            <p className="text-muted-foreground text-base">
              It's a better idea to <span className="gradient-text font-bold">Viadocs</span>ing meeting agendas and partner inform having documentation ideas, strong for your success.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Why Viadocs is Used ── */}
      <section className="py-24 bg-card">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div className="text-center mb-14" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h2 className="text-3xl md:text-5xl font-extrabold mb-4">
              Why Viadocs is Used by <span className="gradient-text">Engineering Students and Employees</span>
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {whyPoints.map((w, i) => (
              <motion.div key={w.title} className="card-glass rounded-2xl p-6 shadow-card" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i}>
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

      {/* ── FAQ ── */}
      <section className="py-24">
        <div className="max-w-3xl mx-auto px-6">
          <motion.h2 className="text-3xl md:text-4xl font-extrabold text-center mb-12" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            Frequently Asked <span className="gradient-text">Questions</span>
          </motion.h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <motion.div key={faq.q} className="card-glass rounded-2xl p-6 shadow-card border border-border" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i}>
                <h3 className="font-bold text-sm mb-2">{faq.q}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{faq.a}</p>
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
