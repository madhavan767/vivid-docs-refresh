import { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, User, Sparkles, ArrowLeft } from "lucide-react";
import logo from "@/assets/viadocs-logo.png";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const Login = () => {
  const [searchParams] = useSearchParams();
  const [tab, setTab] = useState<"login" | "signup">(
    searchParams.get("tab") === "signup" ? "signup" : "login"
  );
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) navigate("/home");
  }, [user, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    if (tab === "signup") {
      const { error } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
        options: {
          data: { full_name: form.name },
          emailRedirectTo: window.location.origin + "/home",
        },
      });
      if (error) setError(error.message);
      else setSuccess("Check your email to confirm your account.");
    } else {
      const { error } = await supabase.auth.signInWithPassword({
        email: form.email,
        password: form.password,
      });
      if (error) setError(error.message);
      else navigate("/home");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden px-4">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "var(--gradient-hero-glow), var(--gradient-teal-glow)" }} />
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-[0.07] blur-3xl"
        style={{ background: "hsl(var(--brand-blue))" }} />

      <motion.div
        className="relative z-10 w-full max-w-md"
        variants={fadeUp} initial="hidden" animate="visible"
      >
        {/* Card */}
        <div className="card-glass rounded-3xl p-8 shadow-hover border border-border">
          {/* Header */}
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-2 mb-6">
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
          <div className="flex rounded-xl overflow-hidden border border-border mb-7 p-1 bg-background/50">
            {(["login", "signup"] as const).map((t) => (
              <button
                key={t}
                onClick={() => { setTab(t); setError(""); setSuccess(""); }}
                className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  tab === t
                    ? "btn-gradient shadow-soft text-white"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {t === "login" ? "Login" : "Sign Up"}
              </button>
            ))}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {tab === "signup" && (
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  name="name"
                  type="text"
                  placeholder="Full Name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-background/60 text-sm focus:outline-none focus:ring-2 focus:border-transparent transition-all"
                  style={{ "--tw-ring-color": "hsl(var(--brand-blue))" } as React.CSSProperties}
                />
              </div>
            )}

            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                name="email"
                type="email"
                placeholder="Email address"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-background/60 text-sm focus:outline-none focus:ring-2 focus:border-transparent transition-all"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                name="password"
                type={showPass ? "text" : "password"}
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                required
                minLength={6}
                className="w-full pl-10 pr-11 py-3 rounded-xl border border-border bg-background/60 text-sm focus:outline-none focus:ring-2 focus:border-transparent transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {error && (
              <div className="text-xs text-red-500 bg-red-50 border border-red-200 rounded-xl px-3 py-2.5">
                {error}
              </div>
            )}
            {success && (
              <div className="text-xs text-green-700 bg-green-50 border border-green-200 rounded-xl px-3 py-2.5">
                {success}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-gradient w-full py-3.5 rounded-xl font-bold text-sm shadow-soft disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              ) : (
                <><Sparkles className="w-4 h-4" /> {tab === "login" ? "Sign In" : "Create Account"}</>
              )}
            </button>
          </form>

          {tab === "login" && (
            <p className="text-xs text-center text-muted-foreground mt-4">
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
