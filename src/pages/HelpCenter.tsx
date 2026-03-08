import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Search, ChevronDown, ChevronRight, FileText, Image, Type, Code2,
  Shield, Globe, Calculator, Upload, Download, Zap, HelpCircle,
} from "lucide-react";
import AppNavbar from "@/components/AppNavbar";
import Footer from "@/components/Footer";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.08 } }),
};

const faqs = [
  {
    q: "Is Viadocs completely free?",
    a: "Yes! All 100 tools on Viadocs are completely free. There are no hidden charges, subscriptions, or premium plans. Every tool is available at no cost — forever.",
  },
  {
    q: "Do I need to create an account to use the tools?",
    a: "No. Most tools work without any sign-up or login. Simply open a tool and start using it. An optional account lets you track your activity and access your history.",
  },
  {
    q: "Are my files safe? Do you store my uploaded files?",
    a: "Your files are completely safe. All file-processing tools (PDF, Image) run entirely in your browser using client-side technology. Your files never leave your device and are never uploaded to our servers. We have zero access to your file content.",
  },
  {
    q: "What file formats does Viadocs support?",
    a: "Viadocs supports a wide range of formats: PDFs, Word documents (.docx/.doc), Excel spreadsheets (.xlsx), PowerPoint (.pptx), images (JPG, PNG, WebP, BMP, GIF, TIFF), and many more. Each tool page shows the accepted formats.",
  },
  {
    q: "What is the maximum file size?",
    a: "Most tools support files up to 20MB. Since processing happens in your browser, larger files may take more time depending on your device's processing power.",
  },
  {
    q: "Which tools are browser-based vs. server-based?",
    a: "Text tools, Developer tools, Security/Generator tools, and Utility calculators all run 100% in your browser with no server involved. PDF and Image processing tools also run client-side where possible. Look for the '⚡ Browser' badge on tool cards.",
  },
  {
    q: "Who made Viadocs?",
    a: "Viadocs is the debut product of Work Wizards Innovations (WWI), a next-gen tech startup dedicated to building innovative digital solutions. Visit wwi.org.in to learn more.",
  },
  {
    q: "How do I report a bug or request a feature?",
    a: "You can report bugs or request features through our Contact Us page. We actively monitor feedback and prioritize improvements based on user requests.",
  },
];

const guides = [
  {
    icon: FileText,
    color: "hsl(var(--brand-blue))",
    bg: "hsl(var(--brand-blue) / 0.1)",
    title: "Using PDF Tools",
    slug: "pdf-to-word",
    steps: [
      "Go to Tools → PDF Tools",
      "Click on any PDF tool (e.g. PDF to Word)",
      "Click the upload area or drag & drop your file",
      "Wait for processing to complete (progress bar shown)",
      "Click 'Download' to save your converted file",
    ],
  },
  {
    icon: Image,
    color: "hsl(var(--brand-teal))",
    bg: "hsl(var(--brand-teal) / 0.1)",
    title: "Using Image Tools",
    slug: "compress-image",
    steps: [
      "Navigate to Tools → Image Tools",
      "Choose your desired tool (e.g. Image Compressor)",
      "Upload your image using drag & drop or click to browse",
      "Adjust any settings (quality, dimensions, format)",
      "Download your processed image instantly",
    ],
  },
  {
    icon: Calculator,
    color: "hsl(345 80% 55%)",
    bg: "hsl(345 80% 55% / 0.1)",
    title: "Using Calculator Tools",
    slug: "bmi-calculator",
    steps: [
      "Go to Tools → Utility Tools",
      "Select a calculator (e.g. BMI Calculator, EMI Calculator)",
      "Fill in the required fields (height, weight, loan amount, etc.)",
      "Results appear instantly — no button needed for most calculators",
      "Copy or note down your result",
    ],
  },
  {
    icon: Code2,
    color: "hsl(var(--brand-indigo))",
    bg: "hsl(var(--brand-indigo) / 0.1)",
    title: "Using Developer Tools",
    slug: "json-formatter",
    steps: [
      "Go to Tools → Developer Tools",
      "Open a tool like JSON Formatter or Base64 Encoder",
      "Paste your code or text into the input area",
      "Results are shown instantly in the output panel",
      "Click 'Copy' to copy the result to your clipboard",
    ],
  },
  {
    icon: Shield,
    color: "hsl(25 95% 55%)",
    bg: "hsl(25 95% 55% / 0.1)",
    title: "Using Security & Generator Tools",
    slug: "password-generator",
    steps: [
      "Navigate to Tools → Security & Generator Tools",
      "Choose a generator (e.g. Password Generator, UUID Generator)",
      "Configure your options (length, character types, format)",
      "Click 'Generate' to create your secure output",
      "Copy the result using the 'Copy' button",
    ],
  },
  {
    icon: Type,
    color: "hsl(220 80% 60%)",
    bg: "hsl(220 80% 60% / 0.1)",
    title: "Using Text Tools",
    slug: "word-counter",
    steps: [
      "Go to Tools → Text Tools",
      "Open any text tool (e.g. Word Counter, Case Converter)",
      "Type or paste your text into the input field",
      "Stats and results update in real-time as you type",
      "Copy your transformed text with the copy button",
    ],
  },
];

const HelpCenter = () => {
  const [search, setSearch] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const filteredFaqs = faqs.filter(
    f => f.q.toLowerCase().includes(search.toLowerCase()) || f.a.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <AppNavbar />

      {/* Hero */}
      <section className="pt-32 pb-12 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "var(--gradient-hero-glow)" }} />
        <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
          <motion.div variants={fadeUp} initial="hidden" animate="visible">
            <span className="inline-block text-xs font-bold px-3 py-1 rounded-full mb-5"
              style={{ background: "hsl(var(--brand-teal) / 0.1)", color: "hsl(var(--brand-teal))" }}>
              Help Center
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">How can we <span className="gradient-text">help?</span></h1>
            <p className="text-muted-foreground text-base leading-relaxed mb-8">
              Find guides, FAQs, and tips to get the most out of Viadocs.
            </p>
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Search help articles..."
                className="w-full pl-12 pr-4 py-4 rounded-2xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 shadow-card" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-8 max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {[
            { icon: FileText, label: "PDF Tools", slug: "/tools" },
            { icon: Image, label: "Image Tools", slug: "/tools" },
            { icon: Type, label: "Text Tools", slug: "/tools" },
            { icon: Code2, label: "Dev Tools", slug: "/tools" },
            { icon: Calculator, label: "Calculators", slug: "/tools" },
            { icon: HelpCircle, label: "Contact Us", slug: "/contact" },
          ].map(item => (
            <Link key={item.label} to={item.slug}
              className="card-glass rounded-2xl p-4 flex flex-col items-center gap-2 border border-border hover:border-primary/40 transition-all text-center group">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: "var(--gradient-brand)" }}>
                <item.icon className="w-4 h-4 text-white" />
              </div>
              <p className="text-xs font-semibold">{item.label}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Step-by-Step Guides */}
      <section className="py-12 max-w-6xl mx-auto px-6">
        <motion.h2 className="text-2xl font-extrabold mb-8"
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          📖 Starter Guide — How to Use Each Category
        </motion.h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {guides.map((guide, i) => (
            <motion.div key={guide.title}
              className="card-glass rounded-2xl p-6 border border-border shadow-card flex flex-col gap-4"
              variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i * 0.1}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: guide.bg }}>
                  <guide.icon className="w-5 h-5" style={{ color: guide.color }} />
                </div>
                <h3 className="font-extrabold text-sm">{guide.title}</h3>
              </div>
              <ol className="space-y-2">
                {guide.steps.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-muted-foreground">
                    <span className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5"
                      style={{ background: guide.bg, color: guide.color }}>
                      {idx + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
              <Link to={`/tools/${guide.slug}`}
                className="inline-flex items-center gap-1.5 text-xs font-bold mt-auto hover:text-primary transition-colors"
                style={{ color: guide.color }}>
                Try it now <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How Viadocs Works — Visual Overview */}
      <section className="py-12 bg-card">
        <div className="max-w-5xl mx-auto px-6">
          <motion.h2 className="text-2xl font-extrabold mb-8 text-center"
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            ⚡ How Viadocs Works
          </motion.h2>
          <div className="grid md:grid-cols-4 gap-6 relative">
            {[
              { icon: Search, step: "1", title: "Browse", desc: "Find the tool you need from 100 tools across 7 categories." },
              { icon: Upload, step: "2", title: "Input", desc: "Upload a file, paste text, or fill in fields — depending on the tool." },
              { icon: Zap, step: "3", title: "Process", desc: "Your browser processes everything instantly. No server, no wait." },
              { icon: Download, step: "4", title: "Done", desc: "Download your result or copy the output. That's it!" },
            ].map((item, i) => (
              <motion.div key={item.step}
                className="card-glass rounded-2xl p-6 border border-border shadow-card text-center relative"
                variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i * 0.1}>
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-soft"
                  style={{ background: "var(--gradient-brand)" }}>
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -top-3 -right-3 w-7 h-7 rounded-full flex items-center justify-center text-xs font-extrabold text-white"
                  style={{ background: "var(--gradient-brand)" }}>
                  {item.step}
                </div>
                <h3 className="font-extrabold text-base mb-2">{item.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 max-w-3xl mx-auto px-6">
        <motion.h2 className="text-2xl font-extrabold mb-8"
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          ❓ Frequently Asked Questions
        </motion.h2>
        <div className="space-y-3">
          {filteredFaqs.length === 0 ? (
            <p className="text-muted-foreground text-sm text-center py-8">No results found for "{search}"</p>
          ) : (
            filteredFaqs.map((faq, i) => (
              <motion.div key={i}
                className="card-glass rounded-2xl border border-border overflow-hidden shadow-card"
                variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i * 0.05}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 p-5 text-left hover:bg-muted/30 transition-colors">
                  <span className="font-semibold text-sm">{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 flex-shrink-0 transition-transform duration-200 ${openFaq === i ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}>
                      <p className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed border-t border-border pt-4">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="pb-20 max-w-3xl mx-auto px-6 text-center">
        <motion.div className="card-glass rounded-3xl border border-border p-10 shadow-card"
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <h2 className="text-2xl font-extrabold mb-3">Still need help?</h2>
          <p className="text-muted-foreground text-sm mb-6">Our team at Work Wizards Innovations is happy to assist you.</p>
          <Link to="/contact"
            className="btn-gradient inline-flex items-center gap-2 px-8 py-3 rounded-full font-bold text-sm shadow-soft">
            Contact Us
          </Link>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
};

export default HelpCenter;
