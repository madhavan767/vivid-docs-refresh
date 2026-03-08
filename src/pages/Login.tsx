import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, User, Sparkles, ArrowLeft } from "lucide-react";
import logo from "@/assets/viadocs-logo.png";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

const Login = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [tab, setTab]           = useState<"login" | "signup">(searchParams.get("tab") === "signup" ? "signup" : "login");
  const [showPass, setShowPass] = useState(false);
  const [form, setForm]         = useState({ name: "", email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/home");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden px-4">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "var(--gradient-hero-glow), var(--gradient-teal-glow)" }} />
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-[0.07] blur-3xl"
        style={{ background: "hsl(var(--brand-blue))" }} />

      <motion.div className="relative z-10 w-full max-w-md"
        variants={fadeUp} initial="hidden" animate="visible">
        <div className="card-glass rounded-3xl p-8 shadow-hover border border-border">

          {/* Header */}
          <div className="text-center mb-7">
            <Link to="/" className="inline-flex items-center gap-2 mb-5">
              <img src={logo} alt="Viadocs" className="w-9 h-9 object-contain" />
              <span className="font-extrabold text-lg tracking-widest gradient-text uppercase">Viadocs</span>
            </Link>
            <h1 className="text-2xl font-extrabold mb-1">
              {tab === "login" ? "Welcome back" : "Create your account"}
            </h1>
            <p className="text-sm text-muted-foreground">
              {tab === "login" ? "Sign in to your Viadocs workspace" : "Start your free Viadocs journey"}
            </p>
          </div>

          {/* Tabs */}
          <div className="flex rounded-xl overflow-hidden border border-border mb-6 p-1 bg-background/50">
            {(["login", "signup"] as const).map((t) => (
              <button key={t} onClick={() => setTab(t)}
                className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  tab === t ? "btn-gradient shadow-soft text-white" : "text-muted-foreground hover:text-foreground"
                }`}>
                {t === "login" ? "Login" : "Sign Up"}
              </button>
            ))}
          </div>

          {/* Google */}
          <button type="button" onClick={() => navigate("/home")}
            className="w-full flex items-center justify-center gap-3 py-3 rounded-xl border border-border bg-background/60 text-sm font-semibold hover:border-primary/40 hover:bg-primary/5 transition-all duration-200 mb-4">
            <GoogleIcon /> Continue with Google
          </button>

          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs text-muted-foreground font-medium">or</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {tab === "signup" && (
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input name="name" type="text" placeholder="Full Name"
                  value={form.name} onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-background/60 text-sm focus:outline-none focus:ring-2 focus:border-transparent transition-all" />
              </div>
            )}
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input name="email" type="email" placeholder="Email address"
                value={form.email} onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-background/60 text-sm focus:outline-none focus:ring-2 focus:border-transparent transition-all" />
            </div>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input name="password" type={showPass ? "text" : "password"} placeholder="Password"
                value={form.password} onChange={handleChange}
                className="w-full pl-10 pr-11 py-3 rounded-xl border border-border bg-background/60 text-sm focus:outline-none focus:ring-2 focus:border-transparent transition-all" />
              <button type="button" onClick={() => setShowPass(!showPass)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            <button type="submit"
              className="btn-gradient w-full py-3.5 rounded-xl font-bold text-sm shadow-soft flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4" />
              {tab === "login" ? "Sign In" : "Create Account"}
            </button>
          </form>

          {tab === "login" && (
            <p className="text-xs text-center text-muted-foreground mt-3">
              Don't have an account?{" "}
              <button onClick={() => setTab("signup")} className="font-semibold gradient-text hover:opacity-80 transition-opacity">
                Sign up free
              </button>
            </p>
          )}
        </div>

        <div className="text-center mt-4">
          <Link to="/" className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to home
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
