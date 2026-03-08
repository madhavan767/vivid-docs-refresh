import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FileText, FileDown, GitMerge, Scissors, Minimize2, Image, Download,
  Lock, Unlock, Table, Monitor, ArrowLeft, Zap, Shield, Sparkles, Globe, Users, Gift
} from "lucide-react";
import AppNavbar from "@/components/AppNavbar";
import Footer from "@/components/Footer";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const tools = [
  { icon: FileText, label: "PDF to Word", desc: "Convert PDF into editable Word docs", slug: "pdf-to-word" },
  { icon: FileDown, label: "Word to PDF", desc: "Export Word files into PDF", slug: "word-to-pdf" },
  { icon: GitMerge, label: "PDF Merge", desc: "Combine multiple PDFs into one", slug: "pdf-merge" },
  { icon: Scissors, label: "PDF Split", desc: "Extract specific pages from PDF", slug: "pdf-split" },
  { icon: Minimize2, label: "PDF Compress", desc: "Reduce the size of PDFs", slug: "pdf-compress" },
  { icon: Image, label: "Image to PDF", desc: "Convert images into a PDF file", slug: "image-to-pdf" },
  { icon: Download, label: "PDF to Image", desc: "Save PDF pages as images", slug: "pdf-to-image" },
  { icon: Lock, label: "Password Protect", desc: "Add password to a PDF", slug: "password-protect" },
  { icon: Unlock, label: "Unlock PDF", desc: "Remove PDF restrictions", slug: "unlock-pdf" },
  { icon: Table, label: "Excel to PDF", desc: "Convert spreadsheets into PDF", slug: "excel-to-pdf" },
  { icon: Monitor, label: "PowerPoint to PDF", desc: "Save slides into PDF format", slug: "powerpoint-to-pdf" },
];

const features = [
  {
    icon: Sparkles,
    title: "Create Documents Instantly",
    desc: "Generate professional projects, assignments, and resumes in seconds using Viadocs' AI document builder — built for students and employees.",
  },
  {
    icon: Zap,
    title: "All-in-One PDF Tools",
    desc: "Merge, split, compress, or convert PDFs instantly. Manage your files securely — anytime, anywhere.",
  },
  {
    icon: Shield,
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

const Tools = () => {
  return (
    <div className="min-h-screen bg-background">
      <AppNavbar />

      <div className="pt-24 pb-4 max-w-7xl mx-auto px-6">
        <Link
          to="/home"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold bg-foreground text-background hover:opacity-90 transition-all duration-200 mt-4"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </Link>
      </div>

      {/* Hero */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "var(--gradient-hero-glow), var(--gradient-teal-glow)" }} />
        <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
          <motion.h1
            className="text-3xl md:text-5xl font-extrabold mb-4"
            variants={fadeUp} initial="hidden" animate="visible"
          >
            All Your PDF Tools —{" "}
            <span className="gradient-text">Smart, Fast &amp; Free!</span>
          </motion.h1>
          <motion.p
            className="text-muted-foreground text-base leading-relaxed"
            variants={fadeUp} initial="hidden" animate="visible" custom={1}
          >
            Merge, split, compress, edit, convert, and secure your PDFs effortlessly. Everything you need to manage documents — beautifully designed and easy to use.
          </motion.p>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="pb-20 max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {tools.map((tool, i) => (
            <motion.div
              key={tool.slug}
              variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i % 8}
            >
              <Link
                to={`/tools/${tool.slug}`}
                className="card-glass rounded-2xl p-6 flex flex-col items-center gap-3 shadow-card text-center group"
              >
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-soft transition-transform duration-300 group-hover:scale-110"
                  style={{ background: "var(--gradient-brand)" }}>
                  <tool.icon className="w-7 h-7 text-white" />
                </div>
                <p className="font-bold text-sm">{tool.label}</p>
                <p className="text-xs text-muted-foreground leading-snug">{tool.desc}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Work Smarter */}
      <section className="py-24 bg-card">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            className="text-center mb-14"
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
              Work Smarter with <span className="gradient-text">Viadocs</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-sm leading-relaxed">
              Whether you're a student preparing reports or an employee managing PDFs, Viadocs brings everything together in one seamless, powerful workspace.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                className="card-glass rounded-2xl p-7 shadow-card text-center"
                variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i}
              >
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5 shadow-soft mx-auto"
                  style={{ background: "var(--gradient-brand)" }}>
                  <f.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-sm mb-2">{f.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium CTA */}
      <section className="py-20 mx-6 md:mx-16 my-16 rounded-3xl overflow-hidden relative"
        style={{ background: "linear-gradient(135deg, hsl(255 39% 40% / 0.08), hsl(228 70% 54% / 0.08))", border: "1px solid hsl(228 70% 54% / 0.15)" }}>
        <div className="max-w-2xl mx-auto px-6 text-center">
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-4xl font-extrabold mb-4">
              Unlock More with <span className="gradient-text">Viadocs Premium</span>
            </h2>
            <p className="text-muted-foreground text-sm mb-8 max-w-xl mx-auto leading-relaxed">
              Upgrade to Viadocs Premium for faster performance, unlimited AI usage, and advanced document tools — designed to empower your work and studies.
            </p>
            <Link
              to="/premium"
              className="btn-gradient inline-flex items-center gap-2 px-10 py-3.5 rounded-full font-bold text-sm shadow-hover"
            >
              Go Premium
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Built for */}
      <section className="py-20 text-center">
        <div className="max-w-3xl mx-auto px-6">
          <motion.h2
            className="text-3xl md:text-4xl font-extrabold mb-4"
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          >
            Built for Engineering Students &amp; Employees
          </motion.h2>
          <motion.p
            className="text-muted-foreground text-sm leading-relaxed"
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1}
          >
            I'm a fresher who built <span className="gradient-text font-bold">Viadocs</span> for engineering students and professionals — making document creation, editing, and PDF tools smarter and easier to use.
          </motion.p>
        </div>
      </section>

      {/* Why Use Viadocs PDF Tools */}
      <section className="py-24 bg-card">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            className="text-center mb-14"
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
              Why Use <span className="gradient-text">Viadocs PDF Tools?</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-sm leading-relaxed">
              Viadocs offers a seamless experience for document handling — whether you're converting, merging, or compressing files. Our AI-powered tools are designed to help students, professionals, and educators save time, maintain quality, and ensure document safety.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {whyPoints.map((w, i) => (
              <motion.div
                key={w.title}
                className="card-glass rounded-2xl p-6 shadow-card"
                variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i}
              >
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

      <Footer />
    </div>
  );
};

export default Tools;
