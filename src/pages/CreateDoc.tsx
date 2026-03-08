import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import {
  Bold, Italic, Underline, List, AlignLeft, AlignCenter, AlignRight,
  Type, Heading1, Heading2, Link2, Image as ImageIcon, Download,
  Sparkles, Save, Trash2, FileText
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

const CreateDoc = () => {
  const [title, setTitle] = useState("Untitled Document");
  const [saved, setSaved] = useState(false);
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
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-xs text-muted-foreground font-medium">Powered by Viadocs Editor</span>
            </div>
            <p className="text-xs text-muted-foreground">Changes auto-tracked</p>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default CreateDoc;
