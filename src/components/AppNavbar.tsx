import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Menu, X, Home, Wrench, FilePlus, Star, LogOut, ChevronDown, UserCircle, Sparkles } from "lucide-react";
import logo from "@/assets/viadocs-logo.png";
import { useAuth } from "@/contexts/AuthContext";

const AppNavbar = () => {
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isGuest, signOut, exitGuest } = useAuth();

  // Guest-only nav: just tools
  const guestNavLinks = [
    { label: "Tools", to: "/tools", icon: Wrench },
  ];

  const navLinks = [
    { label: "Home", to: "/home", icon: Home },
    { label: "Tools", to: "/tools", icon: Wrench },
    { label: "Create Doc", to: "/create-doc", icon: FilePlus },
    { label: "Favorites", to: "/favorites", icon: Star },
  ];

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  // Firebase user uses displayName / email
  const displayName = user?.displayName || user?.email?.split("@")[0] || "User";
  const initials = displayName.charAt(0).toUpperCase();

  return (
    <nav className="nav-blur fixed top-0 left-0 right-0 z-50 border-b border-border">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to={isGuest ? "/tools" : "/home"} className="flex items-center gap-2">
          <img src={logo} alt="Viadocs" className="h-9 w-9 object-contain" />
          <span className="font-extrabold text-lg tracking-widest gradient-text uppercase">Viadocs</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {(isGuest ? guestNavLinks : navLinks).map((l) => {
            const active = location.pathname === l.to || (l.to !== "/home" && location.pathname.startsWith(l.to));
            return (
              <Link key={l.label} to={l.to}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                  active ? "text-white shadow-soft" : "text-foreground/70 hover:text-primary hover:bg-primary/5"
                }`}
                style={active ? { background: "var(--gradient-brand)" } : {}}>
                <l.icon className="w-3.5 h-3.5" />
                {l.label}
              </Link>
            );
          })}
        </div>

        {/* Right: guest CTA or profile dropdown */}
        <div className="hidden md:flex items-center gap-3 relative">
          {isGuest ? (
            /* Guest mode: show sign-up prompt */
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground font-semibold hidden lg:block">
                Guest mode · Tools only
              </span>
              <Link to="/login?tab=signup"
                className="btn-gradient px-4 py-2 rounded-full text-xs font-bold shadow-soft flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> Create Free Account
              </Link>
            </div>
          ) : (
            /* Logged-in profile */
            <>
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-full border border-border hover:border-primary/40 transition-all duration-200 bg-card/50"
              >
                {user?.photoURL ? (
                  <img src={user.photoURL} alt={displayName} className="w-7 h-7 rounded-full object-cover" />
                ) : (
                  <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold"
                    style={{ background: "var(--gradient-brand)" }}>
                    {initials}
                  </div>
                )}
                <span className="text-sm font-semibold max-w-[100px] truncate">{displayName}</span>
                <ChevronDown className={`w-3.5 h-3.5 text-muted-foreground transition-transform duration-200 ${profileOpen ? "rotate-180" : ""}`} />
              </button>

              {profileOpen && (
                <div className="absolute top-full right-0 mt-2 w-52 card-glass rounded-2xl border border-border shadow-hover overflow-hidden z-50">
                  <div className="px-4 py-3 border-b border-border">
                    <p className="text-xs text-muted-foreground">Signed in as</p>
                    <p className="text-sm font-semibold truncate">{user?.email}</p>
                  </div>
                  <Link to="/profile" onClick={() => setProfileOpen(false)}
                    className="w-full flex items-center gap-2 px-4 py-3 text-sm font-semibold hover:bg-muted/50 transition-colors">
                    <UserCircle className="w-4 h-4 text-muted-foreground" /> My Profile
                  </Link>
                  <button onClick={handleSignOut}
                    className="w-full flex items-center gap-2 px-4 py-3 text-sm font-semibold text-red-500 hover:bg-red-50 transition-colors">
                    <LogOut className="w-4 h-4" /> Sign Out
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden p-2 rounded-xl text-foreground/70" onClick={() => setOpen(!open)}>
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Guest banner strip */}
      {isGuest && (
        <div className="border-t border-border px-6 py-2 flex items-center justify-between gap-4"
          style={{ background: "hsl(var(--brand-blue) / 0.05)" }}>
          <p className="text-xs text-muted-foreground">
            <span className="font-semibold" style={{ color: "hsl(var(--brand-blue))" }}>Guest mode</span>
            {" "}· Only PDF tools are available.
          </p>
          <div className="flex items-center gap-2 flex-shrink-0">
            <Link to="/login?tab=signup"
              className="text-xs font-bold gradient-text hover:opacity-80 transition-opacity">
              Sign up free →
            </Link>
            <span className="text-border">|</span>
            <button onClick={() => { exitGuest(); navigate("/login"); }}
              className="text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors">
              Sign in
            </button>
          </div>
        </div>
      )}

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-card/95 backdrop-blur border-b border-border px-6 py-4 flex flex-col gap-3">
          {(isGuest ? guestNavLinks : navLinks).map((l) => (
            <Link key={l.label} to={l.to} onClick={() => setOpen(false)}
              className={`flex items-center gap-2 text-sm font-semibold transition-colors ${
                location.pathname === l.to ? "text-primary" : "text-foreground/80 hover:text-primary"
              }`}>
              <l.icon className="w-4 h-4" /> {l.label}
            </Link>
          ))}
          <div className="border-t border-border pt-3 mt-1">
            {isGuest ? (
              <Link to="/login?tab=signup" onClick={() => setOpen(false)}
                className="btn-gradient w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold shadow-soft">
                <Sparkles className="w-4 h-4" /> Create Free Account
              </Link>
            ) : (
              <>
                <p className="text-xs text-muted-foreground mb-2">{user?.email}</p>
                <button onClick={handleSignOut}
                  className="flex items-center gap-2 text-sm font-semibold text-red-500 hover:text-red-600 transition-colors">
                  <LogOut className="w-4 h-4" /> Sign Out
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default AppNavbar;
