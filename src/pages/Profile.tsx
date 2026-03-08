import { useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  User, Mail, Camera, LogOut, Shield, Bell, ChevronRight,
  Star, Zap, CheckCircle, Edit3, Save, X,
} from "lucide-react";
import AppNavbar from "@/components/AppNavbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const planFeatures = {
  Free: ["11 PDF Tools", "5 conversions/day", "10MB max file size", "Browser editor"],
  Pro:  ["Unlimited conversions", "100MB max file size", "AI document builder", "Conversion history", "Priority processing"],
};

const Profile = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const fileRef = useRef<HTMLInputElement>(null);

  const [editing, setEditing] = useState(false);
  const [displayName, setDisplayName] = useState(user?.displayName || user?.email?.split("@")[0] || "");
  const [tempName, setTempName] = useState(displayName);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(user?.photoURL || null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const initials = (displayName || "U").charAt(0).toUpperCase();

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const url = URL.createObjectURL(f);
    setAvatarPreview(url);
    // TODO: Upload to R2 via filesApi.profileApi.uploadAvatar(f)
  };

  const handleSave = async () => {
    setSaving(true);
    // TODO: await profileApi.update({ full_name: tempName })
    await new Promise(r => setTimeout(r, 800)); // simulate save
    setDisplayName(tempName);
    setSaving(false);
    setSaved(true);
    setEditing(false);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const plan: "Free" | "Pro" = "Free"; // TODO: fetch from API

  return (
    <div className="min-h-screen bg-background">
      <AppNavbar />

      <div className="max-w-4xl mx-auto px-6 pt-28 pb-24">
        <motion.h1 className="text-2xl font-extrabold mb-8"
          variants={fadeUp} initial="hidden" animate="visible">
          Your <span className="gradient-text">Profile</span>
        </motion.h1>

        <div className="grid lg:grid-cols-3 gap-6">

          {/* ── Left: Avatar + name ── */}
          <motion.div
            className="lg:col-span-1 card-glass rounded-3xl p-7 shadow-card border border-border flex flex-col items-center gap-5 text-center"
            variants={fadeUp} initial="hidden" animate="visible" custom={0}>

            {/* Avatar */}
            <div className="relative">
              <div className="w-24 h-24 rounded-full overflow-hidden ring-4 ring-border">
                {avatarPreview ? (
                  <img src={avatarPreview} alt={displayName} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-3xl font-extrabold text-white"
                    style={{ background: "var(--gradient-brand)" }}>
                    {initials}
                  </div>
                )}
              </div>
              <button
                className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full flex items-center justify-center border-2 border-background shadow-soft"
                style={{ background: "var(--gradient-brand)" }}
                onClick={() => fileRef.current?.click()}
              >
                <Camera className="w-3.5 h-3.5 text-white" />
              </button>
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
            </div>

            {/* Name */}
            {editing ? (
              <div className="flex flex-col items-center gap-3 w-full">
                <input
                  value={tempName}
                  onChange={e => setTempName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-border bg-background text-sm font-semibold text-center focus:outline-none focus:ring-2 transition-all"
                />
                <div className="flex gap-2">
                  <button onClick={handleSave} disabled={saving}
                    className="btn-gradient px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 disabled:opacity-60">
                    {saving ? <span className="w-3 h-3 border border-white/40 border-t-white rounded-full animate-spin" /> : <Save className="w-3 h-3" />}
                    Save
                  </button>
                  <button onClick={() => { setEditing(false); setTempName(displayName); }}
                    className="px-4 py-1.5 rounded-full text-xs font-bold border border-border hover:border-destructive hover:text-destructive transition-all flex items-center gap-1">
                    <X className="w-3 h-3" /> Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-1.5">
                <div className="flex items-center gap-2">
                  <p className="font-extrabold text-lg">{displayName}</p>
                  <button onClick={() => setEditing(true)}
                    className="text-muted-foreground hover:text-primary transition-colors">
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-sm text-muted-foreground">{user?.email}</p>
                {saved && (
                  <span className="text-xs text-green-600 font-semibold flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" /> Saved!
                  </span>
                )}
              </div>
            )}

            {/* Plan badge */}
            <div className={`w-full py-3 rounded-2xl flex items-center justify-center gap-2 ${
              plan === "Pro" ? "text-white" : "border border-border bg-muted/40"
            }`}
              style={plan === "Pro" ? { background: "var(--gradient-brand)" } : {}}>
              <Star className={`w-4 h-4 ${plan === "Pro" ? "text-white" : "text-amber-400"}`} />
              <span className="text-sm font-bold">{plan} Plan</span>
            </div>

            {plan === "Free" && (
              <div className="w-full p-4 rounded-2xl text-center"
                style={{ background: "hsl(var(--brand-blue) / 0.06)", border: "1px solid hsl(var(--brand-blue) / 0.15)" }}>
                <p className="text-xs text-muted-foreground mb-2">Unlock unlimited conversions</p>
                <button className="btn-gradient w-full py-2 rounded-xl text-xs font-bold shadow-soft flex items-center justify-center gap-1.5">
                  <Zap className="w-3.5 h-3.5" /> Upgrade to Pro
                </button>
              </div>
            )}
          </motion.div>

          {/* ── Right: Details ── */}
          <div className="lg:col-span-2 flex flex-col gap-5">

            {/* Account info */}
            <motion.div className="card-glass rounded-3xl p-6 shadow-card border border-border"
              variants={fadeUp} initial="hidden" animate="visible" custom={1}>
              <h2 className="font-extrabold text-base mb-5 flex items-center gap-2">
                <User className="w-4 h-4" /> Account Information
              </h2>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 rounded-2xl border border-border bg-background/60">
                  <Mail className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-muted-foreground font-semibold">Email Address</p>
                    <p className="text-sm font-bold truncate mt-0.5">{user?.email}</p>
                  </div>
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full"
                    style={{ background: "hsl(var(--brand-teal) / 0.12)", color: "hsl(var(--brand-teal))" }}>
                    Verified
                  </span>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-2xl border border-border bg-background/60">
                  <Shield className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground font-semibold">Sign-in Method</p>
                    <p className="text-sm font-bold mt-0.5">
                      {user?.providerData?.[0]?.providerId === "google.com" ? "Google Account" : "Email & Password"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-2xl border border-border bg-background/60">
                  <Star className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground font-semibold">Current Plan</p>
                    <p className="text-sm font-bold mt-0.5">{plan}</p>
                  </div>
                  <button className="text-xs font-bold text-primary hover:underline flex items-center gap-1">
                    Upgrade <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Plan features */}
            <motion.div className="card-glass rounded-3xl p-6 shadow-card border border-border"
              variants={fadeUp} initial="hidden" animate="visible" custom={2}>
              <h2 className="font-extrabold text-base mb-5 flex items-center gap-2">
                <Zap className="w-4 h-4" /> Plan Features
              </h2>
              <div className="grid grid-cols-2 gap-2">
                {planFeatures[plan as keyof typeof planFeatures].map(f => (
                  <div key={f} className="flex items-center gap-2 p-3 rounded-xl bg-background/60 border border-border">
                    <CheckCircle className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                    <span className="text-xs font-semibold">{f}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Notifications + Sign Out */}
            <motion.div className="card-glass rounded-3xl p-6 shadow-card border border-border"
              variants={fadeUp} initial="hidden" animate="visible" custom={3}>
              <h2 className="font-extrabold text-base mb-5 flex items-center gap-2">
                <Bell className="w-4 h-4" /> Preferences
              </h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 rounded-2xl border border-border bg-background/60">
                  <div>
                    <p className="text-sm font-semibold">Email Notifications</p>
                    <p className="text-xs text-muted-foreground mt-0.5">Conversion complete alerts</p>
                  </div>
                  <div className="w-10 h-5 rounded-full bg-primary cursor-pointer flex items-center justify-end pr-0.5">
                    <div className="w-4 h-4 rounded-full bg-white shadow" />
                  </div>
                </div>

                <button
                  onClick={handleSignOut}
                  className="w-full flex items-center gap-3 p-4 rounded-2xl border border-red-200 bg-red-50/50 text-red-500 hover:bg-red-50 transition-colors text-sm font-semibold"
                >
                  <LogOut className="w-4 h-4" /> Sign Out
                </button>
              </div>
            </motion.div>

          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Profile;
