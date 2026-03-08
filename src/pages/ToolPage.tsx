import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, Upload, CheckCircle, File, X, AlertCircle,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import AppNavbar from "@/components/AppNavbar";
import Footer from "@/components/Footer";
import { getToolBySlug, toolCategories, getCategoryColorVars } from "@/data/toolsData";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

type Step = "idle" | "ready" | "converting" | "done" | "error";

const ToolPage = () => {
  const { slug = "pdf-to-word" } = useParams<{ slug: string }>();
  const tool = getToolBySlug(slug) ?? getToolBySlug("pdf-to-word")!;
  const Icon = tool.icon;

  const cat = toolCategories.find(c => c.id === tool.category)!;
  const colorVar = getCategoryColorVars(cat?.color ?? "blue");
  const gradientStyle = { background: `linear-gradient(135deg, hsl(${colorVar} / 0.9), hsl(${colorVar} / 0.65))` };

  const [dragging, setDragging] = useState(false);
  const [file, setFile]         = useState<File | null>(null);
  const [step, setStep]         = useState<Step>("idle");
  const [progress, setProgress] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const pickFile = (f: File) => { setFile(f); setStep("ready"); setErrorMsg(""); setProgress(0); };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault(); setDragging(false);
    const f = e.dataTransfer.files[0];
    if (f) pickFile(f);
  };

  const handleConvert = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!file) return;
    setStep("converting");
    setProgress(0);
    const ticker = setInterval(() => {
      setProgress(p => { if (p >= 90) { clearInterval(ticker); return 90; } return p + Math.random() * 12; });
    }, 200);
    await new Promise(r => setTimeout(r, 2000));
    clearInterval(ticker);
    setProgress(100);
    await new Promise(r => setTimeout(r, 400));
    setStep("done");
  };

  const reset = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setFile(null); setStep("idle"); setProgress(0); setErrorMsg("");
  };

  // Browser-only tools (no file upload) show a text-area / interactive UI placeholder
  if (tool.isBrowserTool) {
    return (
      <div className="min-h-screen bg-background">
        <AppNavbar />
        <div className="pt-24 pb-0 max-w-4xl mx-auto px-6">
          <Link to="/tools"
            className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-full text-sm font-semibold bg-foreground text-background hover:opacity-90 transition-all duration-200">
            <ArrowLeft className="w-4 h-4" /> Back to Tools
          </Link>
        </div>

        <section className="py-12 max-w-4xl mx-auto px-6 text-center">
          <motion.div className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-hover"
            style={gradientStyle} variants={fadeUp} initial="hidden" animate="visible">
            <Icon className="w-10 h-10 text-white" />
          </motion.div>
          <motion.h1 className="text-3xl md:text-4xl font-extrabold mb-3"
            variants={fadeUp} initial="hidden" animate="visible" custom={1}>
            {tool.label}
          </motion.h1>
          <motion.p className="text-muted-foreground text-base max-w-md mx-auto mb-2"
            variants={fadeUp} initial="hidden" animate="visible" custom={2}>
            {tool.desc}
          </motion.p>
          <motion.span className="inline-block text-xs font-bold px-3 py-1 rounded-full mb-8"
            style={{ background: `hsl(${colorVar} / 0.12)`, color: `hsl(${colorVar})` }}
            variants={fadeUp} initial="hidden" animate="visible" custom={3}>
            ⚡ Runs instantly in your browser
          </motion.span>
        </section>

        <section className="max-w-3xl mx-auto px-6 pb-16">
          <motion.div className="card-glass rounded-3xl border border-border p-10 text-center shadow-card"
            variants={fadeUp} initial="hidden" animate="visible" custom={4}>
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-soft"
              style={gradientStyle}>
              <Icon className="w-8 h-8 text-white" />
            </div>
            <p className="font-bold text-lg mb-2">Full Tool Interface Coming Soon</p>
            <p className="text-muted-foreground text-sm max-w-sm mx-auto leading-relaxed">
              The interactive UI for <strong>{tool.label}</strong> is being built. Check back shortly — this tool runs entirely in your browser, no uploads needed.
            </p>
            <Link to="/tools"
              className="inline-flex items-center gap-2 mt-6 px-6 py-3 rounded-full font-bold text-sm border border-border hover:border-primary hover:text-primary transition-all">
              <ArrowLeft className="w-4 h-4" /> Browse Other Tools
            </Link>
          </motion.div>
        </section>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <AppNavbar />

      <div className="pt-24 pb-0 max-w-4xl mx-auto px-6">
        <Link to="/tools"
          className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-full text-sm font-semibold bg-foreground text-background hover:opacity-90 transition-all duration-200">
          <ArrowLeft className="w-4 h-4" /> Back to Tools
        </Link>
      </div>

      {/* ── Tool Hero ── */}
      <section className="py-12 max-w-4xl mx-auto px-6 text-center">
        <motion.div className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-hover"
          style={gradientStyle} variants={fadeUp} initial="hidden" animate="visible">
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
                  style={(
                    (i === 0 && (step === "ready" || step === "converting" || step === "done")) ||
                    (i === 1 && (step === "converting" || step === "done")) ||
                    (i === 2 && step === "done")
                  ) ? gradientStyle : {}}>
                  {(i === 2 && step === "done") ? <CheckCircle className="w-4 h-4" /> : i + 1}
                </div>
                <p className="text-[10px] text-muted-foreground mt-1.5 max-w-[80px] text-center font-medium leading-tight">{s}</p>
              </div>
              {i < tool.steps.length - 1 && (
                <div className={`h-0.5 w-14 mx-1 mb-5 rounded-full transition-all duration-500 ${
                  (i === 0 && (step === "converting" || step === "done")) || (i === 1 && step === "done") ? "" : "bg-border"
                }`}
                  style={(
                    (i === 0 && (step === "converting" || step === "done")) || (i === 1 && step === "done")
                  ) ? gradientStyle : {}} />
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
            dragging ? "scale-[1.01]" : "border-border hover:border-primary/50 hover:bg-primary/3"
          } ${step === "idle" ? "cursor-pointer" : ""}`}
          style={dragging ? { borderColor: `hsl(${colorVar})`, background: `hsl(${colorVar} / 0.05)` } : {}}
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          onClick={() => step === "idle" && inputRef.current?.click()}
        >
          <input ref={inputRef} type="file" accept={tool.inputFormat} className="hidden"
            onChange={(e) => { if (e.target.files?.[0]) pickFile(e.target.files[0]); }} />

          <AnimatePresence mode="wait">
            {/* ── IDLE ── */}
            {step === "idle" && (
              <motion.div key="idle" className="flex flex-col items-center gap-4 text-center"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div className="w-20 h-20 rounded-3xl flex items-center justify-center shadow-soft" style={gradientStyle}>
                  <Upload className="w-10 h-10 text-white" />
                </div>
                <div>
                  <p className="font-bold text-lg">Drop your {tool.inputLabel ?? "file"} here</p>
                  <p className="text-muted-foreground text-sm mt-1">or <span className="text-primary font-semibold">click to browse files</span></p>
                </div>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5 bg-muted/60 px-3 py-1.5 rounded-full font-medium">
                    <File className="w-3.5 h-3.5" /> {tool.inputFormat?.toUpperCase() ?? "ANY"}
                  </span>
                  <span className="flex items-center gap-1.5 bg-muted/60 px-3 py-1.5 rounded-full font-medium">
                    Max 20MB
                  </span>
                </div>
              </motion.div>
            )}

            {/* ── READY ── */}
            {step === "ready" && file && (
              <motion.div key="ready" className="flex flex-col items-center gap-5 text-center w-full max-w-sm"
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-soft" style={gradientStyle}>
                  <File className="w-8 h-8 text-white" />
                </div>
                <div>
                  <p className="font-bold text-base">{file.name}</p>
                  <p className="text-sm text-muted-foreground mt-1">{(file.size / 1024 / 1024).toFixed(2)} MB · Ready to convert</p>
                </div>
                <div className="flex gap-3 w-full">
                  <button className="flex-1 py-3 rounded-full font-bold text-sm shadow-soft flex items-center justify-center gap-2 text-white"
                    style={gradientStyle} onClick={handleConvert}>
                    Convert Now
                  </button>
                  <button className="px-5 py-3 rounded-full font-bold text-sm border border-border hover:border-destructive hover:text-destructive transition-all duration-200 flex items-center gap-1.5"
                    onClick={reset}>
                    <X className="w-4 h-4" /> Remove
                  </button>
                </div>
              </motion.div>
            )}

            {/* ── CONVERTING ── */}
            {step === "converting" && (
              <motion.div key="converting" className="flex flex-col items-center gap-5 text-center w-full max-w-sm"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div className="relative w-20 h-20">
                  <div className="w-20 h-20 rounded-3xl flex items-center justify-center shadow-soft" style={gradientStyle}>
                    <Icon className="w-10 h-10 text-white" />
                  </div>
                  <motion.div className="absolute -top-1 -right-1 w-6 h-6 rounded-full border-2 border-background"
                    style={gradientStyle}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}>
                    <div className="w-full h-full rounded-full border-2 border-transparent border-t-white" />
                  </motion.div>
                </div>
                <div>
                  <p className="font-bold text-base">Converting…</p>
                  <p className="text-sm text-muted-foreground mt-1">{file?.name}</p>
                </div>
                <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                  <motion.div className="h-full rounded-full" style={{ ...gradientStyle, width: `${progress}%` }}
                    transition={{ duration: 0.3 }} />
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
                  <p className="text-sm text-muted-foreground mt-1">{file?.name} processed successfully.</p>
                </div>
                <div className="flex gap-3 w-full">
                  <button className="flex-1 py-3 rounded-full font-bold text-sm shadow-soft flex items-center justify-center gap-2 text-white"
                    style={gradientStyle}
                    onClick={(e) => { e.stopPropagation(); alert("Download will be available once the FastAPI backend is connected."); }}>
                    Download File
                  </button>
                  <button className="px-5 py-3 rounded-full font-bold text-sm border border-border hover:border-primary hover:text-primary transition-all duration-200"
                    onClick={reset}>
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
                <button className="px-7 py-2.5 rounded-full font-bold text-sm text-white" style={gradientStyle} onClick={reset}>
                  Try Again
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* ── SEO section ── */}
      <section className="max-w-4xl mx-auto px-6 pb-24 text-center">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <h2 className="text-xl font-extrabold mb-4">{tool.seoTitle}</h2>
          <p className="text-sm leading-relaxed max-w-2xl mx-auto text-muted-foreground">{tool.seoDesc}</p>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
};

export default ToolPage;
