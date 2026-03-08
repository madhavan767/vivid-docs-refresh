import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Sparkles, FileText, Zap, Shield, ArrowRight } from "lucide-react";
import logo from "@/assets/viadocs-logo.png";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const Landing = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "var(--gradient-hero-glow), var(--gradient-teal-glow)" }} />
      <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full opacity-[0.07] blur-3xl"
        style={{ background: "hsl(var(--brand-blue))" }} />
      <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] rounded-full opacity-[0.06] blur-3xl"
        style={{ background: "hsl(var(--brand-teal))" }} />

      <div className="relative z-10 max-w-lg mx-auto px-6 text-center flex flex-col items-center gap-8">
        {/* Logo + Brand */}
        <motion.div
          className="flex flex-col items-center gap-3"
          variants={fadeUp} initial="hidden" animate="visible" custom={0}
        >
          <img src={logo} alt="Viadocs" className="w-16 h-16 object-contain" />
          <span className="font-extrabold text-2xl tracking-widest gradient-text uppercase">Viadocs</span>
        </motion.div>

        {/* Headline */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={1}>
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase mb-4"
            style={{ background: "hsl(var(--brand-blue) / 0.1)", color: "hsl(var(--brand-blue))", border: "1px solid hsl(var(--brand-blue) / 0.25)" }}>
            <Sparkles className="w-3.5 h-3.5" /> AI-Powered Document Platform
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mt-3">
            Try <span className="gradient-text">Viadocs</span> Tools for Free
          </h1>
        </motion.div>

        {/* Subtext */}
        <motion.p
          className="text-muted-foreground text-base leading-relaxed max-w-sm"
          variants={fadeUp} initial="hidden" animate="visible" custom={2}
        >
          Convert PDFs, create documents, and manage files — all in one smart workspace built for students and professionals.
        </motion.p>

        {/* Pills */}
        <motion.div
          className="flex flex-wrap gap-3 justify-center"
          variants={fadeUp} initial="hidden" animate="visible" custom={3}
        >
          {[
            { icon: FileText, label: "PDF Tools" },
            { icon: Zap, label: "Instant Convert" },
            { icon: Shield, label: "Secure Files" },
          ].map(({ icon: Icon, label }) => (
            <div key={label}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold bg-card border border-border text-muted-foreground">
              <Icon className="w-3.5 h-3.5" /> {label}
            </div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-3 w-full max-w-xs"
          variants={fadeUp} initial="hidden" animate="visible" custom={4}
        >
          <Link
            to="/login"
            className="btn-gradient flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-bold text-sm shadow-soft"
          >
            Get Started Free <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/login?tab=signup"
            className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-bold text-sm bg-card border border-border text-foreground hover:border-primary hover:text-primary transition-all duration-300 shadow-card"
          >
            Sign Up
          </Link>
        </motion.div>

        {/* Footer note */}
        <motion.p
          className="text-xs text-muted-foreground"
          variants={fadeUp} initial="hidden" animate="visible" custom={5}
        >
          No credit card required · Free forever plan
        </motion.p>
      </div>
    </div>
  );
};

export default Landing;
