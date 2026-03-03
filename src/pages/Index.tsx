import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FileText, FileDown, GitMerge, Scissors, Minimize2, Image, Download,
  Lock, Unlock, Table, Monitor, Plus, Upload, Sparkles, Zap, Shield,
  Users, Globe, Gift, ChevronRight, CheckCircle
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as const },
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
  {
    icon: Zap,
    title: "Instant Conversions",
    desc: "Convert Word, Excel, PowerPoint, and images into PDFs instantly — without losing formatting.",
  },
  {
    icon: Shield,
    title: "Safe and Secure",
    desc: "Your files remain private and encrypted. We never store or share your documents.",
  },
  {
    icon: Sparkles,
    title: "AI-Powered Features",
    desc: "Let our AI assistant summarize reports, extract data, or auto-format content with precision.",
  },
  {
    icon: Globe,
    title: "Works on All Devices",
    desc: "Access Viadocs tools anywhere — desktop, tablet, or mobile. 100% browser-based.",
  },
  {
    icon: Users,
    title: "Built for Students & Teams",
    desc: "Specially crafted for academic and corporate use — simplify project reports and documentation.",
  },
  {
    icon: Gift,
    title: "Free Forever Plan",
    desc: "Start with all essential tools for free — no sign-up required for most PDF functions.",
  },
];

const faqs = [
  {
    q: "Is Viadocs free to use?",
    a: "Yes, Viadocs offers a free plan that lets users create and manage documents without any cost. Premium features offer unlimited AI usage and advanced document tools.",
  },
  {
    q: "Who can use Viadocs?",
    a: "Viadocs is designed for engineering students, professionals, teachers, and employees who need efficient tools for document creation, PDF editing, and AI assistance.",
  },
  {
    q: "Is my data safe on Viadocs?",
    a: "Absolutely. Viadocs handles your uploaded files securely only. We never store your files for longer than necessary.",
  },
  {
    q: "Does Viadocs work on mobile?",
    a: "Yes, Viadocs is fully responsive, accessible on mobile, tablets, and desktop devices.",
  },
  {
    q: "How is Viadocs different from other PDF tools?",
    a: "Viadocs is uniquely built for students and professionals in India. It combines PDF tools, AI-powered document creation, and a user-friendly interface in one platform.",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* ── Hero ── */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        {/* Glow shapes */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "var(--gradient-hero-glow), var(--gradient-teal-glow)" }}
        />
        <div className="absolute top-20 right-[-8%] w-96 h-96 rounded-full opacity-10 blur-3xl"
          style={{ background: "hsl(228 70% 54%)" }} />
        <div className="absolute bottom-0 left-[-5%] w-72 h-72 rounded-full opacity-8 blur-3xl"
          style={{ background: "hsl(174 58% 47%)" }} />

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase mb-6"
              style={{ background: "hsl(228 70% 54% / 0.1)", color: "hsl(228 70% 54%)", border: "1px solid hsl(228 70% 54% / 0.25)" }}>
              <Sparkles className="w-3.5 h-3.5" /> AI-Powered Document Platform
            </span>
          </motion.div>

          <motion.h1
            className="text-4xl md:text-6xl font-extrabold leading-tight mb-6"
            variants={fadeUp} initial="hidden" animate="visible" custom={1}
          >
            Welcome to{" "}
            <span className="gradient-text">Viadocs</span>
          </motion.h1>

          <motion.p
            className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed"
            variants={fadeUp} initial="hidden" animate="visible" custom={2}
          >
            Create professional documents, collaborate with your team, and manage projects efficiently.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            variants={fadeUp} initial="hidden" animate="visible" custom={3}
          >
            <Link
              to="/login"
              className="btn-gradient inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-bold text-sm shadow-soft"
            >
              Get Started — Login
            </Link>
            <Link
              to="/create-doc"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-bold text-sm bg-card border border-border text-foreground hover:border-primary hover:text-primary transition-all duration-300 shadow-card"
            >
              Create Account
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── Simplify Your Document Work ── */}
      <section className="py-24 bg-card">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            className="text-center mb-14"
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-extrabold mb-4">
              Simplify Your <span className="gradient-text">Document Work</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-base leading-relaxed">
              Create, edit, and collaborate on documents with smart, AI-powered tools that understand your needs.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Left action panel */}
            <motion.div
              className="card-glass rounded-2xl p-8 shadow-card"
              variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1}
            >
              <div className="grid grid-cols-2 gap-4 mb-6">
                <button className="flex flex-col items-center gap-2 p-5 rounded-xl border border-border hover:border-primary/40 transition-all duration-300 bg-background/50 hover:bg-primary/5">
                  <Plus className="w-7 h-7 text-primary" />
                  <span className="text-sm font-semibold">Create a Doc</span>
                </button>
                <button className="flex flex-col items-center gap-2 p-5 rounded-xl border border-border hover:border-accent/40 transition-all duration-300 bg-background/50 hover:bg-accent/5">
                  <Upload className="w-7 h-7 text-accent" />
                  <span className="text-sm font-semibold">Clone</span>
                </button>
              </div>
              <div className="flex items-center gap-4 p-5 rounded-xl border border-border bg-background/50">
                <div className="flex-1">
                  <p className="text-sm font-bold mb-1">Use Viadocs to create your project doc</p>
                </div>
                <Link
                  to="/create-doc"
                  className="btn-gradient text-xs font-bold px-4 py-2 rounded-full whitespace-nowrap flex items-center gap-1"
                >
                  <Sparkles className="w-3 h-3" /> Make my Project Recommendation Doc
                </Link>
              </div>
            </motion.div>

            {/* Right CTA */}
            <motion.div
              className="text-center md:text-left"
              variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={2}
            >
              <h3 className="text-2xl md:text-3xl font-extrabold mb-4 leading-snug">
                Your Smart<br />
                <span className="gradient-text">Document Workspace</span>
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                From academic reports to professional documentation — Viadocs gives you AI-powered tools to work smarter.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                <Link to="/tools" className="btn-gradient inline-flex items-center gap-2 px-7 py-3 rounded-full font-bold text-sm shadow-soft">
                  Try Tools
                </Link>
                <Link to="/create-doc" className="inline-flex items-center gap-2 px-7 py-3 rounded-full font-bold text-sm bg-background border border-border text-foreground hover:border-primary hover:text-primary transition-all duration-300">
                  Learn More
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── How Viadocs Works ── */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.h2
            className="text-3xl md:text-5xl font-extrabold mb-6"
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          >
            How <span className="gradient-text">Viadocs</span> Works
          </motion.h2>
          <motion.div
            className="rounded-3xl overflow-hidden shadow-hover border border-border bg-card"
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1}
          >
            <div className="p-10 flex flex-col items-center gap-6">
              <img src="/favicon.ico" alt="" className="hidden" />
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
              <p className="text-muted-foreground text-sm max-w-md">
                © 2025 — Viadocs document and tool processor
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Work Smarter with Viadocs ── */}
      <section className="py-24 bg-card">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            className="text-center mb-14"
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-extrabold mb-4">
              Work Smarter with <span className="gradient-text">Viadocs</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-base leading-relaxed">
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
                <h3 className="text-base font-bold mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Premium CTA ── */}
      <section className="py-20 mx-6 md:mx-16 my-16 rounded-3xl overflow-hidden relative"
        style={{ background: "linear-gradient(135deg, hsl(255 39% 40% / 0.08), hsl(228 70% 54% / 0.08))", border: "1px solid hsl(228 70% 54% / 0.15)" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: "var(--gradient-hero-glow)" }} />
        <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-5"
              style={{ background: "hsl(228 70% 54% / 0.12)", color: "hsl(228 70% 54%)" }}>
              ✦ Premium
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold mb-5">
              Unlock More with{" "}
              <span className="gradient-text">Viadocs Premium</span>
            </h2>
            <p className="text-muted-foreground text-base mb-8 max-w-xl mx-auto leading-relaxed">
              Upgrade to Viadocs Premium for faster performance, unlimited AI usage, and advanced document tools — designed to empower your work and studies.
            </p>
            <Link
              to="/premium"
              className="btn-gradient inline-flex items-center gap-2 px-10 py-4 rounded-full font-bold text-base shadow-hover"
            >
              Go Premium <ChevronRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── Built for Engineering Students & Employees ── */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          >
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
          <motion.div
            className="text-center mb-14"
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-extrabold mb-4">
              Why Viadocs is Used by{" "}
              <span className="gradient-text">Engineering Students and Employees</span>
            </h2>
          </motion.div>

          <motion.div
            className="prose prose-sm max-w-4xl mx-auto text-muted-foreground leading-relaxed mb-12"
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          >
            <p>
              Viadocs was designed with one clear goal — to make documentation simple, smart, and accessible for everyone. Whether you are an engineering student managing digital project reports, or someone that runs a business maintaining HR files, and records, and profiles — Viadocs acts as your workspace powered by students AI. It bridges the gap between learners and professionals, adapting to your goals, schedule, and information workflows to make them really fantastic.
            </p>

            <h3 className="text-foreground font-bold mt-8 mb-3">For Engineering Students</h3>
            <p>Engineering students make massive document-to-work — from project abstracts to year-long internship documents, mini research papers, report board letters. Viadocs simplifies access to the complex details, useful for faculty, work with struggle, and with topics of internship challenges. It gives too extra time on advance solutions even to a regular student.</p>
            <ul className="list-disc pl-5 space-y-1 mt-3">
              <li>Create IEEE style academic product documentation software.</li>
              <li>Auto generate student with discuss title associations, conditions, and predicting progress.</li>
              <li>Share project summaries with discuss title discussions on a repository.</li>
              <li>Generate using a system that delivers this classroom to a repository.</li>
              <li>Find any document solutions — everything on cloud-based internship software.</li>
            </ul>

            <h3 className="text-foreground font-bold mt-8 mb-3">For Engineers and Professionals</h3>
            <p>A practical professional can process numerous tasks in a few seconds through customer-directly, personal friendly: writing, which approx multiPDF-presentation, balance their methodically till drive management bill, from learning, control your workload successfully! More real workflows: combine powerful collaboration. Viadocs uses professional (SSM) and enhancing providing coding with table-of-a and making corporate flow teams, and working life.</p>
            <ul className="list-disc pl-5 space-y-1 mt-3">
              <li>Generate professional project, reports for and company documents in four.</li>
              <li>Go access PDF tools in our easily by changing roles.</li>
              <li>Collaborate in collaborative role by doing projects.</li>
              <li>Manage confidentiality in managing to engineering to a considerable role.</li>
              <li>Ensure privacy with AI-based presentation using a comfortable role.</li>
            </ul>

            <h3 className="text-foreground font-bold mt-8 mb-3">Bridging Learning and Industry</h3>
            <p>Viadocs is not just one PDF tool — it is a foundation built for the full generations of creators and professionals. Engineering students, teachers and leaders may adopt main engineers, developers, and strategic movers. By using Viadocs, every student experiences journey, has better professional documentation and clients, school performance, and digitally seamless while in their work, transforms their workgroup into efficiency.</p>

            <h3 className="text-foreground font-bold mt-8 mb-3">Security and Data Privacy</h3>
            <p>Viadocs understands the importance of security, academics, and individual environments. Every document uploaded to this system is processed securely. We don't hold or sell any of your documentation — Viadocs gives you Enterprise-class privilege: visibility of resources, more office partnerships data safety. Employees just manage credential, evidence of more office partnerships data safety. Employees just manage students are all-out safe partners.</p>

            <h3 className="text-foreground font-bold mt-8 mb-3">AI That Understands You</h3>
            <p>Viadocs AI is personal, Friendly, and Give you personalized recommendations or partners. You can also Focus on advance of core documentation or AI-based individual project reports with context-aware formatting. AI-Recognition stands down a true for the managing back the formatting with precision.</p>

            <h3 className="text-foreground font-bold mt-8 mb-3">Empowering Indian Engineering Education</h3>
            <p>Viadocs was created with the aim of helping Indian engineering students' generation of professionals. Others student schools find success. Viadocs, business analysis starts with collaborative all content! Which products will only the community the platform, AI-created content for the material — your program-graded content for the essential year program created content for the material — your program-created content for the essential year, AI-created content for the material complete cultural.</p>

            <h3 className="text-foreground font-bold mt-8 mb-3">Built for the Future</h3>
            <p>Viadocs is a marvelously evolving service. Future updates include new user collaboration, cloud document storage, AI integrations, and AI suggestions and great goals. We aim to establish multi-functional tools, build digital components for industries with better with technology tool and technology.</p>

            <h3 className="text-foreground font-bold mt-8 mb-3">In Summary</h3>
            <p>Viadocs is the safe editing, power, and intelligence for individuals. It uses a clear secure decision, perfect documentation, perfect documentation only that creates the right justifications for the essential year project by collecting your main topic every time creating the meeting project in digital and process your output — Viadocs keeps.</p>
          </motion.div>
        </div>
      </section>

      {/* ── Why Use Viadocs: 6-card grid ── */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6">
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

      {/* ── FAQ ── */}
      <section className="py-24 bg-card">
        <div className="max-w-3xl mx-auto px-6">
          <motion.div
            className="text-center mb-14"
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-extrabold mb-4">
              Frequently Asked <span className="gradient-text">Questions</span>
            </h2>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                className="card-glass rounded-2xl p-6 shadow-card"
                variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i}
              >
                <div className="flex gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: "hsl(var(--brand-blue))" }} />
                  <div>
                    <p className="font-bold text-sm mb-1">{i + 1}. {faq.q}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">{faq.a}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
