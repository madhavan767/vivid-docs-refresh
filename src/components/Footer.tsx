import { Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";
import logo from "@/assets/viadocs-logo.png";

const Footer = () => (
  <footer
    className="text-white pt-16 pb-8"
    style={{ background: "var(--gradient-footer)" }}
  >
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
        {/* Brand */}
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <img src={logo} alt="Viadocs" className="h-9 w-9 object-contain brightness-200" />
            <span className="font-extrabold text-lg tracking-widest text-white uppercase">Viadocs</span>
          </div>
          <p className="text-white/70 text-sm leading-relaxed mb-4">
            Built with passion by{" "}
            <a href="https://wwi.org.in" target="_blank" rel="noopener noreferrer"
              className="text-white font-semibold hover:underline inline-flex items-center gap-1">
              Work Wizards Innovations <ExternalLink className="w-3 h-3" />
            </a>
            <br />
            Viadocs is WWI's debut product — 100 free tools for everyone.
          </p>
          <a href="https://wwi.org.in" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/60 hover:text-white transition-colors border border-white/20 px-3 py-1.5 rounded-full">
            Visit wwi.org.in <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {/* Main Pages */}
        <div>
          <h4 className="text-xs font-bold tracking-widest uppercase text-white/50 mb-4">Platform</h4>
          <ul className="space-y-3">
            {[
              { label: "Home", to: "/" },
              { label: "All Tools", to: "/tools" },
              { label: "About Viadocs", to: "/about" },
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
              { label: "Help Center", to: "/help" },
              { label: "Contact Us", to: "/contact" },
              { label: "Privacy Policy", to: "/privacy" },
              { label: "Terms & Conditions", to: "/terms" },
            ].map((item) => (
              <li key={item.label}>
                <Link to={item.to} className="text-white/75 hover:text-white text-sm transition-colors duration-200">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/20 pt-6 flex flex-col md:flex-row items-center justify-between gap-2">
        <p className="text-white/60 text-sm">
          © 2026{" "}
          <span className="text-white font-semibold">Viadocs</span> by Work Wizards Innovations. All rights reserved.
        </p>
        <a href="https://wwi.org.in" target="_blank" rel="noopener noreferrer"
          className="text-white/50 text-sm hover:text-white/80 transition-colors flex items-center gap-1">
          A product of <span className="text-white/80 font-semibold ml-1">Work Wizards Innovations</span>
          <ExternalLink className="w-3 h-3 ml-1" />
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
