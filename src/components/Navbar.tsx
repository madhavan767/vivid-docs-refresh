import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X, User } from "lucide-react";
import logo from "@/assets/viadocs-logo.png";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { label: "Home", to: "/" },
    { label: "Tools", to: "/tools" },
  ];

  return (
    <nav className="nav-blur fixed top-0 left-0 right-0 z-50 border-b border-border">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Viadocs" className="h-9 w-9 object-contain" />
          <span className="font-extrabold text-lg tracking-widest gradient-text uppercase">Viadocs</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => (
            <Link
              key={l.label}
              to={l.to}
              className={`text-sm font-semibold transition-colors duration-200 ${
                location.pathname === l.to
                  ? "text-primary"
                  : "text-foreground/70 hover:text-primary"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/login"
            className="flex items-center gap-2 text-sm font-semibold text-foreground/70 hover:text-primary transition-colors duration-200"
          >
            <User className="w-4 h-4" />
            Login / Signup
          </Link>
        </div>

        <button
          className="md:hidden p-2 rounded-xl text-foreground/70"
          onClick={() => setOpen(!open)}
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-card/95 backdrop-blur border-b border-border px-6 py-4 flex flex-col gap-4">
          {navLinks.map((l) => (
            <Link
              key={l.label}
              to={l.to}
              onClick={() => setOpen(false)}
              className="text-sm font-semibold text-foreground/80 hover:text-primary transition-colors"
            >
              {l.label}
            </Link>
          ))}
          <Link
            to="/login"
            onClick={() => setOpen(false)}
            className="text-sm font-semibold text-foreground/70 hover:text-primary transition-colors flex items-center gap-2"
          >
            <User className="w-4 h-4" /> Login / Signup
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
