import { useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  FileText, FileDown, GitMerge, Scissors, Minimize2, Image, Download,
  Lock, Unlock, Table, Monitor, ArrowLeft, Upload, CheckCircle
} from "lucide-react";
import { Link, useParams, useNavigate } from "react-router-dom";
import AppNavbar from "@/components/AppNavbar";
import Footer from "@/components/Footer";
import { filesApi } from "@/config/api";
import { useAuth } from "@/contexts/AuthContext";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const toolMap: Record<string, {
  icon: React.ElementType; label: string; inputLabel: string; inputFormat: string;
  desc: string; seoTitle: string; seoDesc: string;
}> = {
  "pdf-to-word": {
    icon: FileText, label: "PDF to Word Converter", inputLabel: "PDF", inputFormat: "PDF",
    desc: "Convert your PDF documents into editable Word files",
    seoTitle: "Convert PDF to Word – Editable, Accurate & Free",
    seoDesc: "Convert your PDF files into fully editable Word documents online with Viadocs. Retain fonts, images, and formatting with precision using our AI-powered PDF converter. No signup, no watermarks, and 100% secure file handling.",
  },
  "word-to-pdf": {
    icon: FileDown, label: "Word to PDF Converter", inputLabel: "Word", inputFormat: "DOCX",
    desc: "Export your Word documents into professional PDF files",
    seoTitle: "Convert Word to PDF – Fast, Free & Accurate",
    seoDesc: "Instantly convert Word documents to PDF online with Viadocs. Retain fonts, images, and formatting. No signup required.",
  },
  "pdf-merge": {
    icon: GitMerge, label: "PDF Merge", inputLabel: "PDF files", inputFormat: "PDF",
    desc: "Combine multiple PDF files into one seamless document",
    seoTitle: "Merge PDF Files – Combine PDFs Online Free",
    seoDesc: "Merge multiple PDFs into one file instantly with Viadocs. Easy, fast, and secure PDF merging online.",
  },
  "pdf-split": {
    icon: Scissors, label: "PDF Split", inputLabel: "PDF", inputFormat: "PDF",
    desc: "Extract specific pages from your PDF document",
    seoTitle: "Split PDF – Extract Pages Online Free",
    seoDesc: "Split PDF files and extract specific pages online. Fast and secure with Viadocs.",
  },
  "pdf-compress": {
    icon: Minimize2, label: "PDF Compress", inputLabel: "PDF", inputFormat: "PDF",
    desc: "Reduce the size of your PDF without losing quality",
    seoTitle: "Compress PDF – Reduce PDF Size Online Free",
    seoDesc: "Compress PDF files online to reduce file size. Maintain quality while making PDFs smaller with Viadocs.",
  },
  "image-to-pdf": {
    icon: Image, label: "Image to PDF", inputLabel: "Image", inputFormat: "JPG/PNG",
    desc: "Convert images into a PDF file seamlessly",
    seoTitle: "Convert Image to PDF – Free Online Converter",
    seoDesc: "Convert JPG, PNG, and other image files to PDF online with Viadocs. Fast, free, and easy to use.",
  },
  "pdf-to-image": {
    icon: Download, label: "PDF to Image", inputLabel: "PDF", inputFormat: "PDF",
    desc: "Save PDF pages as high-quality images",
    seoTitle: "Convert PDF to Image – Extract Pages as Images",
    seoDesc: "Convert PDF pages to JPG or PNG images online. Easy, free PDF to image converter with Viadocs.",
  },
  "password-protect": {
    icon: Lock, label: "Password Protect PDF", inputLabel: "PDF", inputFormat: "PDF",
    desc: "Add a password to secure your PDF document",
    seoTitle: "Password Protect PDF – Secure Your Documents",
    seoDesc: "Add a password to your PDF files online. Secure and encrypt PDF documents with Viadocs.",
  },
  "unlock-pdf": {
    icon: Unlock, label: "Unlock PDF", inputLabel: "PDF", inputFormat: "PDF",
    desc: "Remove password restrictions from PDF files",
    seoTitle: "Unlock PDF – Remove PDF Password Online",
    seoDesc: "Remove password protection from PDF files online with Viadocs. Fast, free, and secure.",
  },
  "excel-to-pdf": {
    icon: Table, label: "Excel to PDF", inputLabel: "Excel", inputFormat: "XLSX/XLS",
    desc: "Convert spreadsheets into professional PDF documents",
    seoTitle: "Convert Excel to PDF – Free Online Converter",
    seoDesc: "Convert Excel spreadsheets to PDF online. Preserve formatting and data with Viadocs.",
  },
  "powerpoint-to-pdf": {
    icon: Monitor, label: "PowerPoint to PDF", inputLabel: "PowerPoint", inputFormat: "PPTX/PPT",
    desc: "Save your slides into PDF format with ease",
    seoTitle: "Convert PowerPoint to PDF – Free Slides Converter",
    seoDesc: "Convert PowerPoint presentations to PDF online. Save slides into PDF format with Viadocs.",
  },
};

const ToolPage = () => {
  const { slug = "pdf-to-word" } = useParams<{ slug: string }>();
  const tool = toolMap[slug] ?? toolMap["pdf-to-word"];
  const Icon = tool.icon;
  const { user } = useAuth();

  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [converting, setConverting] = useState(false);
  const [done, setDone] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const f = e.dataTransfer.files[0];
    if (f) { setFile(f); setDone(false); }
  };

  const handleConvert = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!file) return;
    setConverting(true);

    // Simulate conversion (real backend integration can be added later)
    await new Promise((r) => setTimeout(r, 2000));

    // Save conversion record to Supabase if logged in
    if (user) {
      await supabase.from("conversions").insert({
        user_id: user.id,
        tool_slug: slug,
        tool_label: tool.label,
        file_name: file.name,
        file_size: file.size,
        status: "completed",
      });
    }

    setConverting(false);
    setDone(true);
  };

  const reset = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFile(null);
    setDone(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <AppNavbar />

      <div className="pt-24 pb-4 max-w-4xl mx-auto px-6">
        <Link to="/tools"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold bg-foreground text-background hover:opacity-90 transition-all duration-200 mt-4">
          <ArrowLeft className="w-4 h-4" /> Back to Tools
        </Link>
      </div>

      {/* Tool hero */}
      <section className="py-12 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-hover"
          style={{ background: "var(--gradient-brand)" }}
          variants={fadeUp} initial="hidden" animate="visible"
        >
          <Icon className="w-10 h-10 text-white" />
        </motion.div>
        <motion.h1 className="text-3xl md:text-4xl font-extrabold mb-3" variants={fadeUp} initial="hidden" animate="visible" custom={1}>
          {tool.label}
        </motion.h1>
        <motion.p className="text-muted-foreground text-base" variants={fadeUp} initial="hidden" animate="visible" custom={2}>
          {tool.desc}
        </motion.p>
      </section>

      {/* Upload box */}
      <section className="max-w-3xl mx-auto px-6 pb-16">
        <motion.div
          variants={fadeUp} initial="hidden" animate="visible" custom={3}
          className={`rounded-3xl border-2 border-dashed transition-all duration-300 p-16 flex flex-col items-center gap-4 cursor-pointer bg-card shadow-card ${
            dragging ? "border-primary bg-primary/5 scale-[1.01]" : "border-border hover:border-primary/50 hover:bg-primary/3"
          }`}
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          onClick={() => !file && inputRef.current?.click()}
        >
          <input
            ref={inputRef}
            type="file"
            className="hidden"
            onChange={(e) => { if (e.target.files?.[0]) { setFile(e.target.files[0]); setDone(false); } }}
          />

          {done ? (
            <div className="text-center flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-full flex items-center justify-center bg-green-100">
                <CheckCircle className="w-9 h-9 text-green-600" />
              </div>
              <div>
                <p className="font-bold text-base text-green-700">Conversion Complete!</p>
                <p className="text-sm text-muted-foreground mt-1">{file!.name} processed successfully.</p>
              </div>
              <div className="flex gap-3">
                <button
                  className="btn-gradient px-7 py-2.5 rounded-full font-bold text-sm shadow-soft"
                  onClick={(e) => { e.stopPropagation(); alert("Download would start here with real backend."); }}
                >
                  Download File
                </button>
                <button
                  className="px-7 py-2.5 rounded-full font-bold text-sm border border-border hover:border-primary hover:text-primary transition-all duration-200"
                  onClick={reset}
                >
                  Convert Another
                </button>
              </div>
            </div>
          ) : file ? (
            <div className="text-center flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-soft"
                style={{ background: "var(--gradient-brand)" }}>
                <Upload className="w-8 h-8 text-white" />
              </div>
              <div>
                <p className="font-bold text-base">{file.name}</p>
                <p className="text-sm text-muted-foreground mt-1">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
              <div className="flex gap-3">
                <button
                  className="btn-gradient px-8 py-3 rounded-full font-bold text-sm shadow-soft flex items-center gap-2 disabled:opacity-60"
                  disabled={converting}
                  onClick={handleConvert}
                >
                  {converting ? (
                    <><span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" /> Converting...</>
                  ) : (
                    "Convert Now"
                  )}
                </button>
                <button
                  className="px-6 py-3 rounded-full font-bold text-sm border border-border hover:border-primary hover:text-primary transition-all duration-200"
                  onClick={reset}
                >
                  Remove
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-soft"
                style={{ background: "var(--gradient-brand)" }}>
                <Upload className="w-8 h-8 text-white" />
              </div>
              <p className="font-bold text-lg text-center">Drop your {tool.inputLabel} file here</p>
              <p className="text-muted-foreground text-sm">or click to browse files</p>
              <div className="mt-2 space-y-1 text-center">
                <p className="text-xs text-muted-foreground">Supported format: {tool.inputFormat}</p>
                <p className="text-xs text-muted-foreground">Maximum file size: 10MB</p>
              </div>
            </>
          )}
        </motion.div>
      </section>

      {/* SEO section */}
      <section className="max-w-4xl mx-auto px-6 pb-24 text-center">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <h2 className="text-xl font-extrabold mb-4">{tool.seoTitle}</h2>
          <p className="text-sm leading-relaxed max-w-2xl mx-auto" style={{ color: "hsl(var(--brand-blue))" }}>
            {tool.seoDesc}
          </p>
          <p className="text-sm text-muted-foreground mt-3 max-w-2xl mx-auto">
            Viadocs makes it easy to transform reports, resumes, and scanned {tool.inputLabel}s into editable files anytime.
          </p>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
};

export default ToolPage;
