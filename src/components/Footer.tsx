import { Link } from "react-router-dom";
import logo from "@/assets/viadocs-logo.png";

const Footer = () => (
  <footer
    className="text-white pt-16 pb-8"
    style={{ background: "var(--gradient-footer)" }}
  >
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <img src={logo} alt="Viadocs" className="h-9 w-9 object-contain brightness-200" />
            <span className="font-extrabold text-lg tracking-widest text-white uppercase">Viadocs</span>
          </div>
          <p className="text-white/70 text-sm leading-relaxed">
            Built with passion by{" "}
            <span className="text-white font-semibold">Work Wizards Innovations</span>.<br />
            Empowering creators, professionals, and teams with smarter document tools.
          </p>
        </div>

        {/* Main Pages */}
        <div>
          <h4 className="text-xs font-bold tracking-widest uppercase text-white/50 mb-4">Main Pages</h4>
          <ul className="space-y-3">
            {[
              { label: "Home", to: "/" },
              { label: "Tools", to: "/tools" },
            ].map((l) => (
              <li key={l.label}>
                <Link to={l.to} className="text-white/75 hover:text-white text-sm transition-colors duration-200">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Support & Legal */}
        <div>
          <h4 className="text-xs font-bold tracking-widest uppercase text-white/50 mb-4">Support & Legal</h4>
          <ul className="space-y-3">
            {[
              "About",
              "Privacy Policy",
              "Terms & Conditions",
              "Contact Us",
              "Help Center",
            ].map((item) => (
              <li key={item}>
                <a href="#" className="text-white/75 hover:text-white text-sm transition-colors duration-200">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/20 pt-6 flex flex-col md:flex-row items-center justify-between gap-2">
        <p className="text-white/60 text-sm">
          © 2025{" "}
          <span className="text-white font-semibold">Viadocs</span>. All rights reserved.
        </p>
        <p className="text-white/50 text-sm">
          Designed & Developed by{" "}
          <span className="text-white/80 font-semibold">Work Wizards Innovations</span>
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
