import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, Lock, Wrench, FilePlus, Star, UserCircle } from "lucide-react";
import { Link } from "react-router-dom";

interface GuestUpgradeModalProps {
  open: boolean;
  onClose: () => void;
  featureName?: string;
}

const lockedFeatures = [
  { icon: FilePlus, label: "Document Editor" },
  { icon: Star, label: "Favorites & History" },
  { icon: UserCircle, label: "Profile & Settings" },
  { icon: Sparkles, label: "AI-powered Tools" },
];

const GuestUpgradeModal = ({ open, onClose, featureName }: GuestUpgradeModalProps) => {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[80] bg-background/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-[90] flex items-center justify-center px-4 pointer-events-none"
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="card-glass rounded-3xl border border-border shadow-hover w-full max-w-sm pointer-events-auto overflow-hidden">
              {/* Top gradient bar */}
              <div className="h-1.5 w-full" style={{ background: "var(--gradient-brand)" }} />

              <div className="p-7">
                {/* Close */}
                <button
                  onClick={onClose}
                  className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Icon */}
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-soft"
                  style={{ background: "var(--gradient-brand)" }}>
                  <Lock className="w-6 h-6 text-white" />
                </div>

                {/* Copy */}
                <h2 className="text-xl font-extrabold text-center mb-1">
                  {featureName ? `Unlock ${featureName}` : "Unlock Full Access"}
                </h2>
                <p className="text-sm text-muted-foreground text-center mb-5 leading-relaxed">
                  You're browsing as a guest. Create a free account to access all features.
                </p>

                {/* Locked features list */}
                <div className="grid grid-cols-2 gap-2 mb-6">
                  {lockedFeatures.map(({ icon: Icon, label }) => (
                    <div key={label}
                      className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-muted/40 border border-border">
                      <Icon className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                      <span className="text-xs font-semibold">{label}</span>
                    </div>
                  ))}
                </div>

                {/* CTAs */}
                <Link
                  to="/login?tab=signup"
                  onClick={onClose}
                  className="btn-gradient w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-sm shadow-soft mb-3"
                >
                  <Sparkles className="w-4 h-4" />
                  Create Free Account
                </Link>
                <Link
                  to="/login"
                  onClick={onClose}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold border border-border hover:border-primary/40 hover:bg-primary/5 transition-all"
                >
                  Sign In
                </Link>

                {/* Guest info */}
                <div className="mt-4 flex items-center gap-2 px-3 py-2.5 rounded-xl border border-dashed border-border bg-background/50">
                  <Wrench className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
                  <p className="text-[11px] text-muted-foreground leading-tight">
                    As a guest, PDF tools are still available — no account needed.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default GuestUpgradeModal;
