import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ExternalLink, Globe, Cpu, Zap, Shield, Users, Rocket, Calendar, Award } from "lucide-react";
import AppNavbar from "@/components/AppNavbar";
import Footer from "@/components/Footer";
import logo from "@/assets/viadocs-logo.png";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as const } }),
};

const team = [
  {
    name: "Nalla Venkat",
    role: "Founder & CEO",
    avatar: "NV",
    bio: "Visionary behind WWI's mission and long-term strategy. Leads the organization by defining direction, identifying new opportunities, and driving innovation across all projects.",
    img: "https://wwi.org.in/assets/team-venkat-BUyqk2wM.jpg",
  },
  {
    name: "Santhosh Boppudi",
    role: "Co-Founder & CTO",
    avatar: "SB",
    bio: "Leads technological development at WWI. Responsible for designing technical architecture, overseeing software development, and building scalable digital platforms.",
    img: "https://wwi.org.in/assets/team-santhosh-BngbjYlP.jpeg",
  },
  {
    name: "Govinda Sai Ram Thammisetty",
    role: "Chief Operating Officer (COO)",
    avatar: "GS",
    bio: "Manages WWI's operational structure and ensures smooth project execution and team coordination across all activities.",
    img: "https://wwi.org.in/assets/team-govind-Cwg24mID.jpeg",
  },
  {
    name: "Charan Teja Rajanala",
    role: "Chief Marketing Officer (CMO)",
    avatar: "CT",
    bio: "Responsible for marketing strategy and brand development, expanding market reach and promoting WWI's products to the right audience.",
    img: "https://wwi.org.in/assets/team-charan-iwx4M8wO.jpeg",
  },
  {
    name: "Prudhvi Duvvu",
    role: "Chief Financial Officer (CFO)",
    avatar: "PD",
    bio: "Oversees financial planning, budgeting, and ensuring sustainable financial growth while supporting the company's expansion strategy.",
    img: "https://wwi.org.in/assets/team-prudhvi-BqGZKZo8.jpeg",
  },
];

const timeline = [
  { date: "Sep 2025", event: "Founded by 5 passionate innovators", icon: Rocket },
  { date: "Dec 2025", event: "First collaboration with Glowvai", icon: Award },
  { date: "Early 2026", event: "Team stabilized with stronger strategies", icon: Users },
  { date: "Feb 2026", event: "First active clients — growing tech startup", icon: Zap },
  { date: "Mar 2026", event: "Viadocs launched — debut product of WWI", icon: Globe },
];

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <AppNavbar />

      {/* Hero */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "var(--gradient-hero-glow), var(--gradient-teal-glow)" }} />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase mb-6"
              style={{ background: "hsl(var(--brand-blue) / 0.1)", color: "hsl(var(--brand-blue))", border: "1px solid hsl(var(--brand-blue) / 0.25)" }}>
              About Viadocs
            </span>
          </motion.div>
          <motion.h1 className="text-4xl md:text-6xl font-extrabold mb-5 leading-tight"
            variants={fadeUp} initial="hidden" animate="visible" custom={1}>
            Built by{" "}
            <span className="gradient-text">Work Wizards</span>
            <br />of Innovations
          </motion.h1>
          <motion.p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed"
            variants={fadeUp} initial="hidden" animate="visible" custom={2}>
            Viadocs is the debut product of <strong className="text-foreground">Work Wizards Innovations (WWI)</strong> — a next-gen tech startup dedicated to building innovative digital solutions that empower businesses and professionals.
          </motion.p>
        </div>
      </section>

      {/* About WWI */}
      <section className="py-16 max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <div className="card-glass rounded-3xl p-8 border border-border shadow-card">
              <div className="flex items-center gap-4 mb-6">
                {/* WWI Logo placeholder */}
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-soft flex-shrink-0"
                  style={{ background: "var(--gradient-brand)" }}>
                  <span className="text-white font-extrabold text-xl">W</span>
                </div>
                <div>
                  <h2 className="font-extrabold text-xl">Work Wizards Innovations</h2>
                  <p className="text-muted-foreground text-sm">Innovating Web, Apps & Beyond</p>
                </div>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                At Work Wizards Innovations, we are a next-gen tech startup dedicated to providing innovative digital solutions that empower businesses and professionals. Our team specializes in web development, app development, AI integration, and building branded digital platforms that solve real-world problems.
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                Founded in September 2025 by a team of five passionate innovators, WWI has quickly grown into a promising startup with active clients and a growing suite of products — with Viadocs being our flagship debut.
              </p>
              <a href="https://wwi.org.in" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm border border-border hover:border-primary hover:text-primary transition-all">
                Visit wwi.org.in <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1}>
            <h2 className="text-2xl font-extrabold mb-4">What is Viadocs?</h2>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
              Viadocs is WWI's debut product — a comprehensive, free, open-source toolkit with <strong className="text-foreground">100 tools</strong> across 7 categories: PDF tools, Image tools, Text tools, Developer tools, Security generators, Web/SEO tools, and Utility calculators.
            </p>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              Every tool runs entirely in your browser. No file uploads to external servers. No sign-up required. Built for students, developers, designers, and professionals who want a powerful, privacy-respecting toolkit — completely free.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Globe, label: "100 Tools", sub: "Across 7 categories" },
                { icon: Shield, label: "100% Private", sub: "Browser-based processing" },
                { icon: Zap, label: "Instant", sub: "No upload, no wait" },
                { icon: Cpu, label: "Open Source", sub: "Free forever" },
              ].map(item => (
                <div key={item.label} className="card-glass rounded-xl p-4 border border-border flex gap-3 items-start">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: "hsl(var(--brand-blue) / 0.1)" }}>
                    <item.icon className="w-4 h-4" style={{ color: "hsl(var(--brand-blue))" }} />
                  </div>
                  <div>
                    <p className="font-bold text-sm">{item.label}</p>
                    <p className="text-xs text-muted-foreground">{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* WWI Website Screenshot */}
      <section className="py-8 max-w-6xl mx-auto px-6">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <h2 className="text-2xl font-extrabold mb-6 text-center">About Work Wizards Innovations</h2>
          <div className="rounded-3xl overflow-hidden border border-border shadow-hover">
            <div className="bg-muted/40 px-4 py-2.5 flex items-center gap-2 border-b border-border">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400/60" />
                <div className="w-3 h-3 rounded-full bg-yellow-400/60" />
                <div className="w-3 h-3 rounded-full bg-green-400/60" />
              </div>
              <span className="text-xs text-muted-foreground font-mono ml-2">wwi.org.in</span>
            </div>
            <img src="https://wwi.org.in/og-image.png" alt="WWI Website"
              className="w-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
            <div className="bg-card p-6 text-center">
              <p className="text-sm text-muted-foreground mb-3">Work Wizards Innovations — Innovating Web, Apps & Beyond</p>
              <a href="https://wwi.org.in" target="_blank" rel="noopener noreferrer"
                className="btn-gradient inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-bold text-sm shadow-soft">
                Visit wwi.org.in <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Timeline */}
      <section className="py-16 max-w-4xl mx-auto px-6">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <h2 className="text-2xl font-extrabold mb-10 text-center">Our Journey</h2>
        </motion.div>
        <div className="relative">
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-border -translate-x-0.5" />
          {timeline.map((item, i) => (
            <motion.div key={item.date}
              className={`relative flex items-start gap-6 mb-8 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} flex-row`}
              variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i * 0.15}>
              <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2 border-primary bg-background z-10" />
              <div className={`pl-16 md:pl-0 md:w-1/2 ${i % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                <div className="card-glass rounded-2xl p-5 border border-border shadow-card">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center"
                      style={{ background: "hsl(var(--brand-blue) / 0.1)" }}>
                      <item.icon className="w-3.5 h-3.5" style={{ color: "hsl(var(--brand-blue))" }} />
                    </div>
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full"
                      style={{ background: "hsl(var(--brand-blue) / 0.1)", color: "hsl(var(--brand-blue))" }}>
                      {item.date}
                    </span>
                  </div>
                  <p className="font-semibold text-sm">{item.event}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="py-16 bg-card">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div className="text-center mb-12" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h2 className="text-3xl font-extrabold mb-3">Meet the Leadership</h2>
            <p className="text-muted-foreground text-sm max-w-xl mx-auto">
              The passionate leaders behind Work Wizards Innovations, committed to driving digital transformation and delivering excellence.
            </p>
            <a href="https://wwi.org.in/team" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 mt-3 text-xs font-semibold hover:text-primary transition-colors"
              style={{ color: "hsl(var(--brand-blue))" }}>
              View full team on wwi.org.in <ExternalLink className="w-3 h-3" />
            </a>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map((member, i) => (
              <motion.div key={member.name}
                className="card-glass rounded-3xl p-6 border border-border shadow-card flex flex-col gap-4"
                variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i * 0.1}>
                <div className="flex items-center gap-4">
                  <img src={member.img} alt={member.name}
                    className="w-16 h-16 rounded-2xl object-cover border border-border"
                    onError={(e) => {
                      const el = e.target as HTMLImageElement;
                      el.style.display = "none";
                      el.nextElementSibling?.classList.remove("hidden");
                    }}
                  />
                  <div className="w-16 h-16 rounded-2xl hidden items-center justify-center text-white font-extrabold text-lg flex-shrink-0"
                    style={{ background: "var(--gradient-brand)" }}>
                    {member.avatar}
                  </div>
                  <div>
                    <h3 className="font-extrabold text-sm">{member.name}</h3>
                    <p className="text-xs text-muted-foreground">{member.role}</p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
