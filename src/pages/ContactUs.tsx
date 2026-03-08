import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Globe, ExternalLink, Send, MessageSquare, MapPin, Clock } from "lucide-react";
import AppNavbar from "@/components/AppNavbar";
import Footer from "@/components/Footer";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.1 } }),
};

const ContactUs = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, subject, message } = form;
    if (!name || !email || !message) return;
    const mailto = `mailto:contact@wwi.org.in?subject=${encodeURIComponent(subject || "Viadocs Contact")}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`;
    window.open(mailto);
    setSent(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <AppNavbar />

      {/* Hero */}
      <section className="pt-32 pb-12 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "var(--gradient-hero-glow)" }} />
        <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
          <motion.div variants={fadeUp} initial="hidden" animate="visible">
            <span className="inline-block text-xs font-bold px-3 py-1 rounded-full mb-5"
              style={{ background: "hsl(var(--brand-indigo) / 0.1)", color: "hsl(var(--brand-indigo))" }}>
              Get in Touch
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Contact <span className="gradient-text">Us</span></h1>
            <p className="text-muted-foreground text-base leading-relaxed max-w-xl mx-auto">
              Have a question, feedback, or a bug to report? We'd love to hear from you.
              The team at Work Wizards Innovations is here to help.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="pb-20 max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-5 gap-10">

          {/* Contact Info */}
          <motion.div className="md:col-span-2 space-y-5"
            variants={fadeUp} initial="hidden" animate="visible" custom={1}>
            {[
              {
                icon: Mail, label: "Email",
                value: "contact@wwi.org.in",
                link: "mailto:contact@wwi.org.in",
              },
              {
                icon: Globe, label: "Website",
                value: "wwi.org.in",
                link: "https://wwi.org.in",
                external: true,
              },
              {
                icon: MessageSquare, label: "Product",
                value: "Viadocs by WWI",
              },
              {
                icon: Clock, label: "Response Time",
                value: "Usually within 24–48 hours",
              },
            ].map(item => (
              <div key={item.label} className="card-glass rounded-2xl p-5 border border-border shadow-card flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "hsl(var(--brand-blue) / 0.1)" }}>
                  <item.icon className="w-5 h-5" style={{ color: "hsl(var(--brand-blue))" }} />
                </div>
                <div>
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-0.5">{item.label}</p>
                  {item.link ? (
                    <a href={item.link} target={item.external ? "_blank" : undefined} rel="noopener noreferrer"
                      className="text-sm font-semibold hover:text-primary transition-colors flex items-center gap-1">
                      {item.value}
                      {item.external && <ExternalLink className="w-3 h-3 opacity-50" />}
                    </a>
                  ) : (
                    <p className="text-sm font-semibold">{item.value}</p>
                  )}
                </div>
              </div>
            ))}

            <div className="card-glass rounded-2xl p-5 border border-border shadow-card">
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">About WWI</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Work Wizards Innovations is a next-gen tech startup dedicated to building innovative digital solutions. Viadocs is our debut product.
              </p>
              <a href="https://wwi.org.in" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 mt-3 text-xs font-bold hover:text-primary transition-colors"
                style={{ color: "hsl(var(--brand-blue))" }}>
                Visit wwi.org.in <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div className="md:col-span-3"
            variants={fadeUp} initial="hidden" animate="visible" custom={2}>
            <div className="card-glass rounded-3xl p-8 border border-border shadow-card">
              {sent ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
                    style={{ background: "hsl(145 65% 42% / 0.1)" }}>
                    <Send className="w-8 h-8" style={{ color: "hsl(145 65% 42%)" }} />
                  </div>
                  <h3 className="font-extrabold text-xl mb-2">Message Sent!</h3>
                  <p className="text-muted-foreground text-sm">Your email client has been opened. We'll get back to you within 24–48 hours.</p>
                  <button onClick={() => setSent(false)} className="mt-5 text-xs font-semibold hover:text-primary transition-colors text-muted-foreground">
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h2 className="font-extrabold text-xl mb-6">Send us a Message</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Your Name *</label>
                      <input required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                        placeholder="John Doe"
                        className="px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Email *</label>
                      <input required type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                        placeholder="john@example.com"
                        className="px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Subject</label>
                    <input value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                      placeholder="e.g. Bug report / Feature request / General query"
                      className="px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Message *</label>
                    <textarea required value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                      rows={5} placeholder="Tell us how we can help you..."
                      className="px-4 py-3 rounded-xl border border-border bg-background text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/30" />
                  </div>
                  <button type="submit"
                    className="w-full py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-soft transition-all hover:opacity-90 text-white"
                    style={{ background: "var(--gradient-brand)" }}>
                    <Send className="w-4 h-4" /> Send Message
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContactUs;
