import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText, FileDown, GitMerge, Scissors, Minimize2, Image, Download,
  Lock, Unlock, Table, Monitor, ArrowLeft, Upload, CheckCircle,
  File, X, AlertCircle, Crop, Maximize2, ImageDown, ScanLine,
  RefreshCw, Layers, PenTool,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import AppNavbar from "@/components/AppNavbar";
import Footer from "@/components/Footer";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const toolMap: Record<string, {
  icon: React.ElementType; label: string; inputLabel: string; inputFormat: string;
  desc: string; seoTitle: string; seoDesc: string; steps: string[];
}> = {
  "pdf-to-word": {
    icon: FileText, label: "PDF to Word Converter", inputLabel: "PDF", inputFormat: ".pdf",
    desc: "Convert your PDF documents into fully editable Word files — fonts, images, and layout preserved.",
    seoTitle: "Convert PDF to Word – Editable, Accurate & Free",
    seoDesc: "Convert your PDF files into fully editable Word documents online with Viadocs. Retain fonts, images, and formatting with precision.",
    steps: ["Upload your PDF file", "Our AI processes the layout", "Download your Word file"],
  },
  "word-to-pdf": {
    icon: FileDown, label: "Word to PDF Converter", inputLabel: "Word", inputFormat: ".docx,.doc",
    desc: "Export your Word documents into professional PDF files instantly.",
    seoTitle: "Convert Word to PDF – Fast, Free & Accurate",
    seoDesc: "Instantly convert Word documents to PDF online with Viadocs.",
    steps: ["Upload your Word file", "We convert to PDF format", "Download your PDF"],
  },
  "pdf-merge": {
    icon: GitMerge, label: "Merge PDF", inputLabel: "PDF files", inputFormat: ".pdf",
    desc: "Combine multiple PDF files into one seamless document in seconds.",
    seoTitle: "Merge PDF Files – Combine PDFs Online Free",
    seoDesc: "Merge multiple PDFs into one file instantly with Viadocs.",
    steps: ["Upload your PDF files", "We merge them in order", "Download the merged PDF"],
  },
  "pdf-split": {
    icon: Scissors, label: "Split PDF", inputLabel: "PDF", inputFormat: ".pdf",
    desc: "Extract specific pages or split your PDF into multiple files.",
    seoTitle: "Split PDF – Extract Pages Online Free",
    seoDesc: "Split PDF files and extract specific pages online.",
    steps: ["Upload your PDF file", "Select pages to extract", "Download split files"],
  },
  "pdf-compress": {
    icon: Minimize2, label: "Compress PDF", inputLabel: "PDF", inputFormat: ".pdf",
    desc: "Reduce the size of your PDF without losing quality.",
    seoTitle: "Compress PDF – Reduce PDF Size Online Free",
    seoDesc: "Compress PDF files online to reduce file size while maintaining quality.",
    steps: ["Upload your PDF file", "AI compresses intelligently", "Download smaller PDF"],
  },
  "image-to-pdf": {
    icon: Image, label: "Image to PDF", inputLabel: "Image", inputFormat: ".jpg,.jpeg,.png,.webp",
    desc: "Convert images into a polished PDF file seamlessly.",
    seoTitle: "Convert Image to PDF – Free Online Converter",
    seoDesc: "Convert JPG, PNG, and other image files to PDF online.",
    steps: ["Upload your image file", "We layout it as PDF", "Download the PDF"],
  },
  "pdf-to-image": {
    icon: Download, label: "PDF to Image", inputLabel: "PDF", inputFormat: ".pdf",
    desc: "Save every PDF page as a high-quality PNG or JPG image.",
    seoTitle: "Convert PDF to Image – Extract Pages as Images",
    seoDesc: "Convert PDF pages to JPG or PNG images online.",
    steps: ["Upload your PDF file", "Pages are rendered as images", "Download image files"],
  },
  "password-protect": {
    icon: Lock, label: "Password Protect PDF", inputLabel: "PDF", inputFormat: ".pdf",
    desc: "Add a password to secure and encrypt your PDF document.",
    seoTitle: "Password Protect PDF – Secure Your Documents",
    seoDesc: "Add a password to your PDF files online.",
    steps: ["Upload your PDF file", "Set a secure password", "Download protected PDF"],
  },
  "unlock-pdf": {
    icon: Unlock, label: "Unlock PDF", inputLabel: "PDF", inputFormat: ".pdf",
    desc: "Remove password restrictions from protected PDF files.",
    seoTitle: "Unlock PDF – Remove PDF Password Online",
    seoDesc: "Remove password protection from PDF files online.",
    steps: ["Upload your locked PDF", "We remove restrictions", "Download unlocked PDF"],
  },
  "excel-to-pdf": {
    icon: Table, label: "Excel to PDF", inputLabel: "Excel", inputFormat: ".xlsx,.xls",
    desc: "Convert spreadsheets into professional PDF documents.",
    seoTitle: "Convert Excel to PDF – Free Online Converter",
    seoDesc: "Convert Excel spreadsheets to PDF online.",
    steps: ["Upload your Excel file", "We convert the sheet", "Download as PDF"],
  },
  "powerpoint-to-pdf": {
    icon: Monitor, label: "PowerPoint to PDF", inputLabel: "PowerPoint", inputFormat: ".pptx,.ppt",
    desc: "Save your presentation slides into PDF format effortlessly.",
    seoTitle: "Convert PowerPoint to PDF – Free Slides Converter",
    seoDesc: "Convert PowerPoint presentations to PDF online.",
    steps: ["Upload your PPT file", "Slides are exported as PDF", "Download your PDF"],
  },
  // ── Image Tools ──────────────────────────────────────────────────────────
  "image-resize": {
    icon: Crop, label: "Image Resize", inputLabel: "Image", inputFormat: ".jpg,.jpeg,.png,.webp,.gif,.bmp",
    desc: "Resize images to any dimension while maintaining quality.",
    seoTitle: "Resize Image Online – Free Image Resizer",
    seoDesc: "Resize any image to custom dimensions online for free with Viadocs.",
    steps: ["Upload your image", "Set target dimensions", "Download resized image"],
  },
  "image-upscale": {
    icon: Maximize2, label: "Image Upscale", inputLabel: "Image", inputFormat: ".jpg,.jpeg,.png,.webp",
    desc: "Upscale images up to 4× using high-quality resampling.",
    seoTitle: "Upscale Image Online – Enhance Image Resolution",
    seoDesc: "Upscale and enhance image resolution online with Viadocs.",
    steps: ["Upload your image", "AI upscales resolution", "Download enhanced image"],
  },
  "image-to-ico": {
    icon: ImageDown, label: "Image to ICO", inputLabel: "Image", inputFormat: ".jpg,.jpeg,.png,.webp,.bmp",
    desc: "Convert any image into a .ico favicon file with multiple sizes.",
    seoTitle: "Convert Image to ICO – Free Favicon Converter",
    seoDesc: "Convert JPG or PNG images to .ico favicon format online.",
    steps: ["Upload your image", "We generate ICO sizes", "Download .ico file"],
  },
  "image-to-svg": {
    icon: ScanLine, label: "Image to SVG", inputLabel: "Image", inputFormat: ".jpg,.jpeg,.png,.bmp",
    desc: "Vectorize raster images into scalable SVG format.",
    seoTitle: "Convert Image to SVG – Free Vectorizer",
    seoDesc: "Convert PNG or JPG images to scalable SVG vector format online.",
    steps: ["Upload your image", "We trace & vectorize", "Download SVG file"],
  },
  "compress-image": {
    icon: Minimize2, label: "Compress Image", inputLabel: "Image", inputFormat: ".jpg,.jpeg,.png,.webp",
    desc: "Reduce image file size without visible quality loss.",
    seoTitle: "Compress Image Online – Reduce Image Size Free",
    seoDesc: "Compress and reduce image file size online without losing quality.",
    steps: ["Upload your image", "We optimise compression", "Download smaller image"],
  },
  "remove-background": {
    icon: RefreshCw, label: "Remove Background", inputLabel: "Image", inputFormat: ".jpg,.jpeg,.png,.webp",
    desc: "Automatically remove the background from any photo.",
    seoTitle: "Remove Background from Image – Free AI Tool",
    seoDesc: "Remove image backgrounds automatically online with Viadocs AI.",
    steps: ["Upload your image", "AI removes background", "Download transparent PNG"],
  },
  "merge-photo-sign": {
    icon: Layers, label: "Merge Photo & Sign", inputLabel: "Image", inputFormat: ".jpg,.jpeg,.png,.webp",
    desc: "Overlay a signature or stamp onto a photo or document.",
    seoTitle: "Merge Photo and Signature – Free Online Tool",
    seoDesc: "Overlay a signature onto a photo or document image online.",
    steps: ["Upload base photo", "Upload signature image", "Download merged photo"],
  },
  "add-watermark-image": {
    icon: PenTool, label: "Add Watermark", inputLabel: "Image", inputFormat: ".jpg,.jpeg,.png,.webp",
    desc: "Stamp a text or image watermark onto your photos.",
    seoTitle: "Add Watermark to Image – Free Online Watermark Tool",
    seoDesc: "Add text or image watermarks to photos online with Viadocs.",
    steps: ["Upload your image", "Set watermark text", "Download watermarked image"],
  },
};

type Step = "idle" | "ready" | "converting" | "done" | "error";

const ToolPage = () => {
  const { slug = "pdf-to-word" } = useParams<{ slug: string }>();
  const tool = toolMap[slug] ?? toolMap["pdf-to-word"];
  const Icon = tool.icon;

  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [step, setStep] = useState<Step>("idle");
  const [progress, setProgress] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const pickFile = (f: File) => { setFile(f); setStep("ready"); setErrorMsg(""); setProgress(0); };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const f = e.dataTransfer.files[0];
    if (f) pickFile(f);
  };

  const handleConvert = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!file) return;
    setStep("converting");
    setProgress(0);

    const ticker = setInterval(() => {
      setProgress((p) => {
        if (p >= 90) { clearInterval(ticker); return 90; }
        return p + Math.random() * 12;
      });
    }, 200);

    // Simulate conversion (no backend)
    await new Promise(r => setTimeout(r, 2000));

    clearInterval(ticker);
    setProgress(100);
    await new Promise(r => setTimeout(r, 400));
    setStep("done");
  };

  const reset = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setFile(null);
    setStep("idle");
    setProgress(0);
    setErrorMsg("");
  };

  return (
    <div className="min-h-screen bg-background">
      <AppNavbar />

      {/* Back button */}
      <div className="pt-24 pb-0 max-w-4xl mx-auto px-6">
        <Link to="/tools"
          className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-full text-sm font-semibold bg-foreground text-background hover:opacity-90 transition-all duration-200">
          <ArrowLeft className="w-4 h-4" /> Back to Tools
        </Link>
      </div>

      {/* ── Tool Hero ── */}
      <section className="py-12 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-hover"
          style={{ background: "var(--gradient-brand)" }}
          variants={fadeUp} initial="hidden" animate="visible"
        >
          <Icon className="w-10 h-10 text-white" />
        </motion.div>
        <motion.h1 className="text-3xl md:text-4xl font-extrabold mb-3"
          variants={fadeUp} initial="hidden" animate="visible" custom={1}>
          {tool.label}
        </motion.h1>
        <motion.p className="text-muted-foreground text-base max-w-md mx-auto"
          variants={fadeUp} initial="hidden" animate="visible" custom={2}>
          {tool.desc}
        </motion.p>
      </section>

      {/* ── Steps indicator ── */}
      <motion.div className="max-w-2xl mx-auto px-6 mb-10"
        variants={fadeUp} initial="hidden" animate="visible" custom={3}>
        <div className="flex items-center justify-center gap-0">
          {tool.steps.map((s, i) => (
            <div key={i} className="flex items-center gap-0">
              <div className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                  (i === 0 && (step === "ready" || step === "converting" || step === "done")) ||
                  (i === 1 && (step === "converting" || step === "done")) ||
                  (i === 2 && step === "done")
                    ? "text-white shadow-soft"
                    : "bg-muted text-muted-foreground"
                }`}
                  style={(i === 0 && (step === "ready" || step === "converting" || step === "done")) ||
                    (i === 1 && (step === "converting" || step === "done")) ||
                    (i === 2 && step === "done")
                    ? { background: "var(--gradient-brand)" } : {}}>
                  {(i === 2 && step === "done") ? <CheckCircle className="w-4 h-4" /> : i + 1}
                </div>
                <p className="text-[10px] text-muted-foreground mt-1.5 max-w-[80px] text-center font-medium leading-tight">{s}</p>
              </div>
              {i < tool.steps.length - 1 && (
                <div className={`h-0.5 w-14 mx-1 mb-5 rounded-full transition-all duration-500 ${
                  (i === 0 && (step === "converting" || step === "done")) ||
                  (i === 1 && step === "done")
                    ? "" : "bg-border"
                }`}
                  style={(i === 0 && (step === "converting" || step === "done")) ||
                    (i === 1 && step === "done")
                    ? { background: "var(--gradient-brand)" } : {}} />
              )}
            </div>
          ))}
        </div>
      </motion.div>

      {/* ── Upload / Convert Box ── */}
      <section className="max-w-3xl mx-auto px-6 pb-16">
        <motion.div
          variants={fadeUp} initial="hidden" animate="visible" custom={4}
          className={`rounded-3xl border-2 border-dashed transition-all duration-300 p-12 flex flex-col items-center gap-5 bg-card shadow-card ${
            dragging ? "border-primary bg-primary/5 scale-[1.01]" : "border-border hover:border-primary/50 hover:bg-primary/3"
          } ${step === "idle" ? "cursor-pointer" : ""}`}
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          onClick={() => step === "idle" && inputRef.current?.click()}
        >
          <input
            ref={inputRef}
            type="file"
            accept={tool.inputFormat}
            className="hidden"
            onChange={(e) => { if (e.target.files?.[0]) pickFile(e.target.files[0]); }}
          />

          <AnimatePresence mode="wait">
            {/* ── IDLE: drop zone ── */}
            {step === "idle" && (
              <motion.div key="idle" className="flex flex-col items-center gap-4 text-center"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div className="w-20 h-20 rounded-3xl flex items-center justify-center shadow-soft"
                  style={{ background: "var(--gradient-brand)" }}>
                  <Upload className="w-10 h-10 text-white" />
                </div>
                <div>
                  <p className="font-bold text-lg">Drop your {tool.inputLabel} file here</p>
                  <p className="text-muted-foreground text-sm mt-1">or <span className="text-primary font-semibold">click to browse files</span></p>
                </div>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5 bg-muted/60 px-3 py-1.5 rounded-full font-medium">
                    <File className="w-3.5 h-3.5" /> {tool.inputFormat.toUpperCase()}
                  </span>
                  <span className="flex items-center gap-1.5 bg-muted/60 px-3 py-1.5 rounded-full font-medium">
                    Max 10MB
                  </span>
                </div>
              </motion.div>
            )}

            {/* ── READY: file selected ── */}
            {step === "ready" && file && (
              <motion.div key="ready" className="flex flex-col items-center gap-5 text-center w-full max-w-sm"
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-soft"
                  style={{ background: "var(--gradient-brand)" }}>
                  <File className="w-8 h-8 text-white" />
                </div>
                <div>
                  <p className="font-bold text-base">{file.name}</p>
                  <p className="text-sm text-muted-foreground mt-1">{(file.size / 1024 / 1024).toFixed(2)} MB · Ready to convert</p>
                </div>
                <div className="flex gap-3 w-full">
                  <button
                    className="btn-gradient flex-1 py-3 rounded-full font-bold text-sm shadow-soft flex items-center justify-center gap-2"
                    onClick={handleConvert}
                  >
                    Convert Now
                  </button>
                  <button
                    className="px-5 py-3 rounded-full font-bold text-sm border border-border hover:border-destructive hover:text-destructive transition-all duration-200 flex items-center gap-1.5"
                    onClick={reset}
                  >
                    <X className="w-4 h-4" /> Remove
                  </button>
                </div>
              </motion.div>
            )}

            {/* ── CONVERTING: progress ── */}
            {step === "converting" && (
              <motion.div key="converting" className="flex flex-col items-center gap-5 text-center w-full max-w-sm"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div className="relative w-20 h-20">
                  <div className="w-20 h-20 rounded-3xl flex items-center justify-center shadow-soft"
                    style={{ background: "var(--gradient-brand)" }}>
                    <Icon className="w-10 h-10 text-white" />
                  </div>
                  <motion.div className="absolute -top-1 -right-1 w-6 h-6 rounded-full border-2 border-background"
                    style={{ background: "var(--gradient-brand)" }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}>
                    <div className="w-full h-full rounded-full border-2 border-transparent border-t-white" />
                  </motion.div>
                </div>
                <div>
                  <p className="font-bold text-base">Converting…</p>
                  <p className="text-sm text-muted-foreground mt-1">{file?.name}</p>
                </div>
                {/* Progress bar */}
                <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: "var(--gradient-brand)", width: `${progress}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                <p className="text-xs text-muted-foreground font-semibold">{Math.round(progress)}% — please wait</p>
              </motion.div>
            )}

            {/* ── DONE ── */}
            {step === "done" && (
              <motion.div key="done" className="flex flex-col items-center gap-5 text-center w-full max-w-sm"
                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
                <motion.div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center"
                  initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
                  <CheckCircle className="w-11 h-11 text-green-600" />
                </motion.div>
                <div>
                  <p className="font-extrabold text-lg text-green-700">Conversion Complete!</p>
                  <p className="text-sm text-muted-foreground mt-1">{file?.name} was processed successfully.</p>
                </div>
                <div className="flex gap-3 w-full">
                  <button
                    className="btn-gradient flex-1 py-3 rounded-full font-bold text-sm shadow-soft flex items-center justify-center gap-2"
                    onClick={(e) => { e.stopPropagation(); alert("File download will be available once FastAPI backend is connected."); }}
                  >
                    Download File
                  </button>
                  <button
                    className="px-5 py-3 rounded-full font-bold text-sm border border-border hover:border-primary hover:text-primary transition-all duration-200"
                    onClick={reset}
                  >
                    Convert Another
                  </button>
                </div>
              </motion.div>
            )}

            {/* ── ERROR ── */}
            {step === "error" && (
              <motion.div key="error" className="flex flex-col items-center gap-4 text-center"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center">
                  <AlertCircle className="w-9 h-9 text-red-500" />
                </div>
                <div>
                  <p className="font-bold text-base text-red-600">Conversion Failed</p>
                  <p className="text-sm text-muted-foreground mt-1">{errorMsg || "Something went wrong. Please try again."}</p>
                </div>
                <button className="btn-gradient px-7 py-2.5 rounded-full font-bold text-sm" onClick={reset}>
                  Try Again
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Not logged in notice */}
        {!user && (
          <motion.div
            className="mt-4 rounded-2xl px-5 py-4 flex items-center gap-3 border border-border"
            style={{ background: "hsl(var(--brand-blue) / 0.05)" }}
            variants={fadeUp} initial="hidden" animate="visible" custom={5}
          >
            <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: "var(--gradient-brand)" }}>
              <CheckCircle className="w-4 h-4 text-white" />
            </div>
            <p className="text-xs text-muted-foreground flex-1">
              <span className="font-semibold text-foreground">Sign in</span> to save conversion history and download files later.
            </p>
            <Link to="/login" className="btn-gradient px-4 py-1.5 rounded-full text-xs font-bold flex-shrink-0">
              Sign In
            </Link>
          </motion.div>
        )}
      </section>

      {/* ── SEO section ── */}
      <section className="max-w-4xl mx-auto px-6 pb-24 text-center">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <h2 className="text-xl font-extrabold mb-4">{tool.seoTitle}</h2>
          <p className="text-sm leading-relaxed max-w-2xl mx-auto text-muted-foreground">
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
