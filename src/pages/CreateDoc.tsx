import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bold, Italic, Underline, List, AlignLeft, AlignCenter, AlignRight,
  Type, Heading1, Heading2, Download, Save, Trash2, FileText,
  Sparkles, Clock, Rocket, X,
} from "lucide-react";
import AppNavbar from "@/components/AppNavbar";
import Footer from "@/components/Footer";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const ToolbarBtn = ({
  onClick, title, children, active = false,
}: {
  onClick: () => void; title: string; children: React.ReactNode; active?: boolean;
}) => (
  <button
    onMouseDown={(e) => { e.preventDefault(); onClick(); }}
    title={title}
    className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm transition-all duration-150 ${
      active
        ? "text-white shadow-sm"
        : "text-foreground/70 hover:text-foreground hover:bg-accent"
    }`}
    style={active ? { background: "var(--gradient-brand)" } : {}}
  >
    {children}
  </button>
);

// ── Coming Soon Modal ─────────────────────────────────────────────────────────
const ComingSoonModal = ({ onClose }: { onClose: () => void }) => (
  <AnimatePresence>
    <motion.div
      className="fixed inset-0 z-[80] bg-background/60 backdrop-blur-sm"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onClose}
    />
    <motion.div
      className="fixed inset-0 z-[90] flex items-center justify-center px-4 pointer-events-none"
      initial={{ opacity: 0, scale: 0.95, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 16 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="card-glass rounded-3xl border border-border shadow-hover w-full max-w-sm pointer-events-auto overflow-hidden">
        <div className="h-1.5 w-full" style={{ background: "var(--gradient-brand)" }} />
        <div className="p-7 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Animated icon */}
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-soft relative overflow-hidden"
            style={{ background: "var(--gradient-brand)" }}>
            <motion.div
              animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Rocket className="w-7 h-7 text-white" />
            </motion.div>
          </div>

          <h2 className="text-xl font-extrabold text-center mb-2">Coming Soon! 🚀</h2>
          <p className="text-sm text-muted-foreground text-center mb-6 leading-relaxed">
            The AI-powered Document Editor is under active development. You'll be able to generate full documents, resumes, and assignments from a simple prompt.
          </p>

          {/* Feature preview list */}
          <div className="space-y-2.5 mb-6">
            {[
              { icon: Sparkles, label: "Generate docs from a prompt" },
              { icon: FileText,  label: "AI resume & cover letter builder" },
              { icon: Clock,     label: "Auto-formatting & styles" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-muted/40 border border-border">
                <Icon className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="text-xs font-semibold">{label}</span>
                <span className="ml-auto text-[10px] font-bold px-2 py-0.5 rounded-full border border-dashed border-primary/40 text-primary">
                  Soon
                </span>
              </div>
            ))}
          </div>

          <button
            onClick={onClose}
            className="btn-gradient w-full py-3 rounded-xl font-bold text-sm shadow-soft"
          >
            Got it, I'll wait!
          </button>
        </div>
      </div>
    </motion.div>
  </AnimatePresence>
);

// ── Main Page ─────────────────────────────────────────────────────────────────
const CreateDoc = () => {
  const [title, setTitle] = useState("Untitled Document");
  const [saved, setSaved] = useState(false);
  const [showAiModal, setShowAiModal] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);

  const exec = useCallback((command: string, value?: string) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
  }, []);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleExport = () => {
    const content = editorRef.current?.innerHTML ?? "";
    const blob = new Blob([`<html><body><h1>${title}</h1>${content}</body></html>`], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${title}.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleClear = () => {
    if (editorRef.current) editorRef.current.innerHTML = "";
  };

  const toolbarGroups = [
    [
      { icon: <Bold className="w-3.5 h-3.5" />, cmd: "bold", title: "Bold" },
      { icon: <Italic className="w-3.5 h-3.5" />, cmd: "italic", title: "Italic" },
      { icon: <Underline className="w-3.5 h-3.5" />, cmd: "underline", title: "Underline" },
    ],
    [
      { icon: <Heading1 className="w-3.5 h-3.5" />, cmd: "formatBlock", value: "h1", title: "Heading 1" },
      { icon: <Heading2 className="w-3.5 h-3.5" />, cmd: "formatBlock", value: "h2", title: "Heading 2" },
      { icon: <Type className="w-3.5 h-3.5" />, cmd: "formatBlock", value: "p", title: "Paragraph" },
    ],
    [
      { icon: <AlignLeft className="w-3.5 h-3.5" />, cmd: "justifyLeft", title: "Align Left" },
      { icon: <AlignCenter className="w-3.5 h-3.5" />, cmd: "justifyCenter", title: "Align Center" },
      { icon: <AlignRight className="w-3.5 h-3.5" />, cmd: "justifyRight", title: "Align Right" },
    ],
    [
      { icon: <List className="w-3.5 h-3.5" />, cmd: "insertUnorderedList", title: "Bullet List" },
    ],
  ];

  return (
    <div className="min-h-screen bg-background">
      {showAiModal && <ComingSoonModal onClose={() => setShowAiModal(false)} />}
      <AppNavbar />

      <div className="pt-20 max-w-5xl mx-auto px-4 pb-24">
        {/* Page header */}
        <motion.div className="py-8 flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between"
          variants={fadeUp} initial="hidden" animate="visible">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-soft"
              style={{ background: "var(--gradient-brand)" }}>
              <FileText className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-extrabold">Document Editor</h1>
          </div>
          <div className="flex items-center gap-2">
            {/* AI Button — Coming Soon */}
            <button
              onClick={() => setShowAiModal(true)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold border border-dashed transition-all duration-200 relative group"
              style={{ borderColor: "hsl(var(--brand-blue) / 0.4)", color: "hsl(var(--brand-blue))" }}
            >
              <Sparkles className="w-3.5 h-3.5" />
              AI Generate
              <span className="absolute -top-2 -right-2 text-[9px] font-extrabold px-1.5 py-0.5 rounded-full text-white shadow-sm"
                style={{ background: "var(--gradient-brand)" }}>
                Soon
              </span>
            </button>

            <button
              onClick={handleSave}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                saved
                  ? "bg-green-100 text-green-700 border border-green-200"
                  : "border border-border hover:border-primary hover:text-primary"
              }`}
            >
              <Save className="w-3.5 h-3.5" />
              {saved ? "Saved!" : "Save"}
            </button>
            <button
              onClick={handleExport}
              className="btn-gradient flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold shadow-soft"
            >
              <Download className="w-3.5 h-3.5" /> Export
            </button>
          </div>
        </motion.div>

        {/* Editor card */}
        <motion.div
          className="card-glass rounded-3xl shadow-hover border border-border overflow-hidden"
          variants={fadeUp} initial="hidden" animate="visible" custom={1}
        >
          {/* Title bar */}
          <div className="px-8 pt-8 pb-4 border-b border-border bg-background/50">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full text-2xl font-extrabold bg-transparent focus:outline-none text-foreground placeholder:text-muted-foreground/40"
              placeholder="Document Title"
            />
          </div>

          {/* Toolbar */}
          <div className="px-6 py-3 border-b border-border bg-background/30 flex items-center gap-1 flex-wrap">
            {toolbarGroups.map((group, gi) => (
              <div key={gi} className="flex items-center gap-0.5">
                {gi > 0 && <div className="w-px h-5 bg-border mx-1" />}
                {group.map((btn) => (
                  <ToolbarBtn
                    key={btn.title}
                    title={btn.title}
                    onClick={() => exec(btn.cmd, (btn as { value?: string }).value)}
                  >
                    {btn.icon}
                  </ToolbarBtn>
                ))}
              </div>
            ))}

            <div className="w-px h-5 bg-border mx-1" />
            <select
              onChange={(e) => exec("fontSize", e.target.value)}
              className="text-xs px-2 py-1 rounded-lg border border-border bg-background/60 focus:outline-none"
              defaultValue="3"
            >
              <option value="1">10</option>
              <option value="2">13</option>
              <option value="3">16</option>
              <option value="4">18</option>
              <option value="5">24</option>
              <option value="6">32</option>
            </select>

            <div className="w-px h-5 bg-border mx-1" />
            <button
              onMouseDown={(e) => { e.preventDefault(); handleClear(); }}
              title="Clear"
              className="w-8 h-8 flex items-center justify-center rounded-lg text-muted-foreground hover:text-red-500 hover:bg-red-50 transition-all"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Editable area */}
          <div
            ref={editorRef}
            contentEditable
            suppressContentEditableWarning
            className="min-h-[500px] px-8 py-6 focus:outline-none text-foreground text-[15px] leading-relaxed"
            style={{ fontFamily: "inherit" }}
            data-placeholder="Start typing your document here..."
            onInput={() => setSaved(false)}
          />

          {/* Bottom bar */}
          <div className="px-8 py-4 border-t border-border bg-background/30 flex items-center justify-between">
            <button
              onClick={() => setShowAiModal(true)}
              className="flex items-center gap-2 text-xs font-semibold transition-colors hover:opacity-80"
              style={{ color: "hsl(var(--brand-blue))" }}
            >
              <Sparkles className="w-3.5 h-3.5" />
              AI Editor — Coming Soon
              <span className="px-1.5 py-0.5 rounded-full text-[9px] font-extrabold text-white"
                style={{ background: "var(--gradient-brand)" }}>
                🚀
              </span>
            </button>
            <p className="text-xs text-muted-foreground">Changes auto-tracked</p>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default CreateDoc;
