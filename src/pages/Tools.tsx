import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FileText, FileDown, GitMerge, Scissors, Minimize2, Image, Download,
  Lock, Unlock, Table, Monitor, Zap, Shield, Sparkles, Globe, Users,
  Gift, ChevronRight, ArrowLeft, ImageDown, Maximize2, Layers, Crop,
  RefreshCw, PenTool, ScanLine,
} from "lucide-react";
import AppNavbar from "@/components/AppNavbar";
import Footer from "@/components/Footer";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const pdfTools = [
  { icon: FileText,  label: "PDF to Word",       desc: "Convert PDF into editable Word docs",   slug: "pdf-to-word",       },
  { icon: FileDown,  label: "Word to PDF",        desc: "Export Word files into PDF",             slug: "word-to-pdf",       },
  { icon: GitMerge,  label: "PDF Merge",          desc: "Combine multiple PDFs into one",         slug: "pdf-merge",         },
  { icon: Scissors,  label: "PDF Split",          desc: "Extract specific pages from PDF",        slug: "pdf-split",         },
  { icon: Minimize2, label: "PDF Compress",       desc: "Reduce the size of PDFs",                slug: "pdf-compress",      },
  { icon: Image,     label: "Image to PDF",       desc: "Convert images into a PDF file",         slug: "image-to-pdf",      },
  { icon: Download,  label: "PDF to Image",       desc: "Save PDF pages as images",               slug: "pdf-to-image",      },
  { icon: Lock,      label: "Password Protect",   desc: "Add a password to your PDF",             slug: "password-protect",  },
  { icon: Unlock,    label: "Unlock PDF",         desc: "Remove PDF restrictions",                slug: "unlock-pdf",        },
  { icon: Table,     label: "Excel to PDF",       desc: "Convert spreadsheets into PDF",          slug: "excel-to-pdf",      },
  { icon: Monitor,   label: "PowerPoint to PDF",  desc: "Save slides into PDF format",            slug: "powerpoint-to-pdf", },
];

const imageTools = [
  { icon: Crop,       label: "Image Resize",        desc: "Resize images to any dimension",              slug: "image-resize",        },
  { icon: Maximize2,  label: "Image Upscale",        desc: "Upscale images up to 4× without quality loss", slug: "image-upscale",      },
  { icon: ImageDown,  label: "Image to ICO",         desc: "Convert images to .ico favicon format",       slug: "image-to-ico",        },
  { icon: ScanLine,   label: "Image to SVG",         desc: "Vectorize raster images into SVG",            slug: "image-to-svg",        },
  { icon: Minimize2,  label: "Compress Image",       desc: "Reduce image file size without quality loss", slug: "compress-image",      },
  { icon: RefreshCw,  label: "Remove Background",    desc: "Automatically remove image backgrounds",      slug: "remove-background",   },
  { icon: Layers,     label: "Merge Photo & Sign",   desc: "Overlay a signature onto a photo/doc",        slug: "merge-photo-sign",    },
  { icon: PenTool,    label: "Add Watermark",        desc: "Stamp text or image watermark on photos",     slug: "add-watermark-image", },
];

const features = [
  {
    icon: Sparkles,
    title: "Convert Files Instantly",
    desc: "Convert Word, Excel, PowerPoint, and images into PDFs in seconds — without losing formatting.",
  },
  {
    icon: Zap,
    title: "All-in-One PDF Tools",
    desc: "Merge, split, compress, or convert PDFs instantly. Manage your files securely — anytime, anywhere.",
  },
  {
    icon: Shield,
    title: "Secure & Private",
    desc: "Your files are encrypted and processed securely. We never store or share your documents.",
  },
];

const whyPoints = [
  { icon: Zap,      title: "Instant Conversions",       desc: "Convert Word, Excel, PowerPoint, and images into PDFs instantly — without losing formatting." },
  { icon: Shield,   title: "Safe and Secure",            desc: "Your files remain private and encrypted. We never store or share your documents." },
  { icon: Sparkles, title: "Fast & Reliable",            desc: "Optimised for speed — process and download your files in seconds." },
  { icon: Globe,    title: "Works on All Devices",       desc: "Access Viadocs tools anywhere — desktop, tablet, or mobile. 100% browser-based." },
  { icon: Users,    title: "Built for Students & Teams", desc: "Specially crafted for academic and corporate use — simplify project reports and documentation." },
  { icon: Gift,     title: "Free Forever Plan",          desc: "Start with all essential tools for free — no sign-up required for most PDF functions." },
];

const Tools = () => {
  return (
    <div className="min-h-screen bg-background">
      <AppNavbar />

      {/* ── Hero ── */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "var(--gradient-hero-glow), var(--gradient-teal-glow)" }} />
        <div className="absolute top-16 right-[-6%] w-80 h-80 rounded-full opacity-[0.07] blur-3xl"
          style={{ background: "hsl(var(--brand-blue))" }} />
        <div className="absolute bottom-0 left-[-4%] w-64 h-64 rounded-full opacity-[0.05] blur-3xl"
          style={{ background: "hsl(var(--brand-teal))" }} />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* Back button */}
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0} className="mb-8">
            <Link
              to="/home"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border border-border bg-card/60 hover:border-primary/40 hover:text-primary transition-all duration-200"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Home
            </Link>
          </motion.div>

          <div className="text-center max-w-3xl mx-auto">
            <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={1}>
              <span
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase mb-5"
                style={{ background: "hsl(var(--brand-blue) / 0.1)", color: "hsl(var(--brand-blue))", border: "1px solid hsl(var(--brand-blue) / 0.25)" }}
              >
                <Zap className="w-3.5 h-3.5" /> 19 Powerful Tools
              </span>
            </motion.div>

            <motion.h1
              className="text-4xl md:text-5xl font-extrabold leading-tight mb-5"
              variants={fadeUp} initial="hidden" animate="visible" custom={2}
            >
              All Your PDF Tools —{" "}
              <span className="gradient-text">Smart, Fast &amp; Free!</span>
            </motion.h1>

            <motion.p
              className="text-muted-foreground text-base leading-relaxed mb-8 max-w-2xl mx-auto"
              variants={fadeUp} initial="hidden" animate="visible" custom={3}
            >
              Merge, split, compress, edit, convert, and secure your PDFs effortlessly. Everything you need to manage documents — beautifully designed and easy to use.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-3 justify-center"
              variants={fadeUp} initial="hidden" animate="visible" custom={4}
            >
              <a href="#tools-grid"
                className="btn-gradient inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm shadow-soft">
                Browse All Tools <ChevronRight className="w-4 h-4" />
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Tools Grid ── */}
      <section id="tools-grid" className="pb-24 max-w-6xl mx-auto px-6">

        {/* PDF Tools */}
        <motion.div
          className="mb-6"
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-6">
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
              style={{ background: "hsl(var(--brand-blue) / 0.1)", color: "hsl(var(--brand-blue))", border: "1px solid hsl(var(--brand-blue) / 0.2)" }}
            >
              <FileText className="w-3 h-3" /> PDF Tools
            </span>
            <div className="flex-1 h-px bg-border" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {pdfTools.map((tool, i) => (
              <motion.div
                key={tool.slug}
                variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i % 8}
              >
                <Link
                  to={`/tools/${tool.slug}`}
                  className="card-glass rounded-2xl p-6 flex flex-col items-center gap-3 shadow-card text-center group block"
                >
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-soft transition-transform duration-300 group-hover:scale-110"
                    style={{ background: "var(--gradient-brand)" }}
                  >
                    <tool.icon className="w-7 h-7 text-white" />
                  </div>
                  <p className="font-bold text-sm">{tool.label}</p>
                  <p className="text-xs text-muted-foreground leading-snug">{tool.desc}</p>
                  <span
                    className="mt-1 text-[10px] font-bold px-2.5 py-0.5 rounded-full"
                    style={{ background: "hsl(var(--brand-blue) / 0.1)", color: "hsl(var(--brand-blue))" }}
                  >
                    Free
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Image Tools */}
        <motion.div
          className="mt-14"
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-6">
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
              style={{ background: "hsl(var(--brand-teal) / 0.1)", color: "hsl(var(--brand-teal))", border: "1px solid hsl(var(--brand-teal) / 0.2)" }}
            >
              <Image className="w-3 h-3" /> Image Tools
            </span>
            <div className="flex-1 h-px bg-border" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {imageTools.map((tool, i) => (
              <motion.div
                key={tool.slug}
                variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i % 8}
              >
                <Link
                  to={`/tools/${tool.slug}`}
                  className="card-glass rounded-2xl p-6 flex flex-col items-center gap-3 shadow-card text-center group block"
                >
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-soft transition-transform duration-300 group-hover:scale-110"
                    style={{ background: "var(--gradient-brand)" }}
                  >
                    <tool.icon className="w-7 h-7 text-white" />
                  </div>
                  <p className="font-bold text-sm">{tool.label}</p>
                  <p className="text-xs text-muted-foreground leading-snug">{tool.desc}</p>
                  <span
                    className="mt-1 text-[10px] font-bold px-2.5 py-0.5 rounded-full"
                    style={{ background: "hsl(var(--brand-teal) / 0.1)", color: "hsl(var(--brand-teal))" }}
                  >
                    Free
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </section>

      {/* ── Work Smarter ── */}
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
                className="card-glass rounded-2xl p-7 shadow-card"
                variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i}
              >
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 shadow-soft"
                  style={{ background: "var(--gradient-brand)" }}>
                  <f.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-bold text-sm mb-2">{f.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Premium CTA ── */}
      <section
        className="py-20 mx-6 md:mx-16 my-16 rounded-3xl overflow-hidden relative"
        style={{ background: "linear-gradient(135deg, hsl(var(--brand-indigo) / 0.08), hsl(var(--brand-blue) / 0.08))", border: "1px solid hsl(var(--brand-blue) / 0.15)" }}
      >
        <div className="absolute inset-0 pointer-events-none" style={{ background: "var(--gradient-hero-glow)" }} />
        <div className="max-w-2xl mx-auto px-6 text-center relative z-10">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-5"
              style={{ background: "hsl(var(--brand-blue) / 0.12)", color: "hsl(var(--brand-blue))" }}
            >
              ✦ Premium
            </span>
            <h2 className="text-2xl md:text-4xl font-extrabold mb-4">
              Unlock More with <span className="gradient-text">Viadocs Premium</span>
            </h2>
            <p className="text-muted-foreground text-sm mb-8 max-w-xl mx-auto leading-relaxed">
              Upgrade to Viadocs Premium for faster performance, unlimited conversions, and priority processing — designed to empower your work and studies.
            </p>
            <Link
              to="/premium"
              className="btn-gradient inline-flex items-center gap-2 px-10 py-3.5 rounded-full font-bold text-sm shadow-hover"
            >
              Go Premium <ChevronRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── Built for ── */}
      <section className="py-20 text-center">
        <div className="max-w-3xl mx-auto px-6">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <span
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase mb-5"
              style={{ background: "hsl(var(--brand-teal) / 0.1)", color: "hsl(var(--brand-teal))", border: "1px solid hsl(var(--brand-teal) / 0.25)" }}
            >
              <Users className="w-3.5 h-3.5" /> Built For
            </span>
          </motion.div>
          <motion.h2
            className="text-3xl md:text-4xl font-extrabold mb-4"
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1}
          >
            Built for Engineering Students &amp; Employees
          </motion.h2>
          <motion.p
            className="text-muted-foreground text-sm leading-relaxed"
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={2}
          >
            I'm a fresher who built{" "}
            <span className="gradient-text font-bold">Viadocs</span>{" "}
            for engineering students and professionals — making document creation, editing, and PDF tools smarter and easier to use.
          </motion.p>
        </div>
      </section>

      {/* ── Why Viadocs PDF Tools ── */}
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
              Viadocs offers a seamless experience for document handling — whether you're converting, merging, or compressing files. Our tools are designed to help students, professionals, and educators save time, maintain quality, and ensure document safety.
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
