import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import {
  Menu, X, Home, Wrench, LogOut, ChevronDown, UserCircle,
} from "lucide-react";

const navLinks = [
  { label: "Home",  to: "/home",  icon: Home },
  { label: "Tools", to: "/tools", icon: Wrench },
];

const AppNavbar = () => {
  const [open, setOpen]               = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const location                      = useLocation();

  const displayName = "User";
  const initials    = "U";

  return (
    <nav className="nav-blur fixed top-0 left-0 right-0 z-50 border-b border-border">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link to="/home" className="flex items-center gap-2">
          <img src={logo} alt="Viadocs" className="h-9 w-9 object-contain" />
          <span className="font-extrabold text-lg tracking-widest gradient-text uppercase">Viadocs</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((l) => {
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

        {/* Right: profile dropdown */}
        <div className="hidden md:flex items-center gap-3 relative">
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-2 px-3 py-2 rounded-full border border-border hover:border-primary/40 transition-all duration-200 bg-card/50"
          >
            <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold"
              style={{ background: "var(--gradient-brand)" }}>
              {initials}
            </div>
            <span className="text-sm font-semibold max-w-[100px] truncate">{displayName}</span>
            <ChevronDown className={`w-3.5 h-3.5 text-muted-foreground transition-transform duration-200 ${profileOpen ? "rotate-180" : ""}`} />
          </button>

          {profileOpen && (
            <div className="absolute top-full right-0 mt-2 w-52 card-glass rounded-2xl border border-border shadow-hover overflow-hidden z-50">
              <Link to="/profile" onClick={() => setProfileOpen(false)}
                className="w-full flex items-center gap-2 px-4 py-3 text-sm font-semibold hover:bg-muted/50 transition-colors">
                <UserCircle className="w-4 h-4 text-muted-foreground" /> My Profile
              </Link>
              <Link to="/login" onClick={() => setProfileOpen(false)}
                className="w-full flex items-center gap-2 px-4 py-3 text-sm font-semibold text-red-500 hover:bg-red-50 transition-colors">
                <LogOut className="w-4 h-4" /> Sign Out
              </Link>
            </div>
          )}
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden p-2 rounded-xl text-foreground/70" onClick={() => setOpen(!open)}>
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-card/95 backdrop-blur border-b border-border px-6 py-4 flex flex-col gap-3">
          {navLinks.map((l) => (
            <Link key={l.label} to={l.to} onClick={() => setOpen(false)}
              className={`flex items-center gap-2 text-sm font-semibold transition-colors ${
                location.pathname === l.to ? "text-primary" : "text-foreground/80 hover:text-primary"
              }`}>
              <l.icon className="w-4 h-4" /> {l.label}
            </Link>
          ))}
          <div className="border-t border-border pt-3 mt-1 flex flex-col gap-2">
            <Link to="/profile" onClick={() => setOpen(false)}
              className="flex items-center gap-2 text-sm font-semibold hover:text-primary transition-colors">
              <UserCircle className="w-4 h-4" /> My Profile
            </Link>
            <Link to="/login" onClick={() => setOpen(false)}
              className="flex items-center gap-2 text-sm font-semibold text-red-500 hover:text-red-600 transition-colors">
              <LogOut className="w-4 h-4" /> Sign Out
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default AppNavbar;
