import { motion } from "framer-motion";
import AppNavbar from "@/components/AppNavbar";
import Footer from "@/components/Footer";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.08 } }),
};

const sections = [
  {
    title: "1. Information We Collect",
    content: `We collect minimal information to provide and improve Viadocs. This may include:
    
• **Usage Data**: Anonymous information about how you interact with our tools (pages visited, tools used, browser type, device type).
• **Account Data** (if you sign up): Email address, display name, and profile preferences.
• **Files**: Files you upload for processing are handled entirely in your browser. We do NOT upload, store, or access your files on our servers.`,
  },
  {
    title: "2. How We Use Your Information",
    content: `We use the information we collect to:

• Operate and improve Viadocs and its tools
• Understand usage patterns to prioritize new features
• Send occasional product updates (only if you opt in)
• Ensure the security and stability of the platform`,
  },
  {
    title: "3. File Processing & Privacy",
    content: `All file-processing tools on Viadocs operate entirely within your browser using client-side JavaScript. This means:

• Your files **never leave your device**
• We have **zero access** to your documents, images, or any file content
• No files are stored on our servers
• Processing happens locally — your data stays yours`,
  },
  {
    title: "4. Cookies & Local Storage",
    content: `Viadocs uses minimal browser storage to:

• Remember your preferences (e.g., theme settings)
• Maintain your session if you are signed in
• Collect anonymous analytics (via privacy-safe tools)

You can clear cookies and local storage at any time through your browser settings.`,
  },
  {
    title: "5. Third-Party Services",
    content: `Viadocs may use trusted third-party services for:

• **Authentication**: Secure sign-in powered by our backend infrastructure
• **Analytics**: Anonymous usage tracking (no personal data shared)
• **CDN**: Content delivery for fast load times globally

We do not sell, trade, or rent your personal information to any third parties.`,
  },
  {
    title: "6. Data Security",
    content: `We implement industry-standard security measures to protect your data, including:

• Encrypted connections (HTTPS/TLS) on all pages
• Secure authentication token handling
• Regular security audits
• Minimal data collection by design`,
  },
  {
    title: "7. Your Rights",
    content: `You have the right to:

• Access, update, or delete your account information at any time
• Opt out of any non-essential communications
• Request a copy of your data
• Contact us with any privacy concerns

To exercise these rights, email us at **privacy@viadocs.app** or contact us through the Help Center.`,
  },
  {
    title: "8. Children's Privacy",
    content: `Viadocs is not directed to children under the age of 13. We do not knowingly collect personal information from children. If you believe a child has provided us with personal information, please contact us immediately.`,
  },
  {
    title: "9. Changes to This Policy",
    content: `We may update this Privacy Policy from time to time. We will notify you of significant changes by posting a notice on the site. The "Last Updated" date at the top of this page will reflect any changes.`,
  },
  {
    title: "10. Contact Us",
    content: `If you have questions or concerns about this Privacy Policy, please contact us at:

**Work Wizards Innovations**
Website: wwi.org.in
Email: contact@wwi.org.in`,
  },
];

const PrivacyPolicy = () => (
  <div className="min-h-screen bg-background">
    <AppNavbar />
    <div className="pt-28 pb-20 max-w-4xl mx-auto px-6">
      <motion.div className="mb-12" variants={fadeUp} initial="hidden" animate="visible">
        <span className="inline-block text-xs font-bold px-3 py-1 rounded-full mb-4"
          style={{ background: "hsl(var(--brand-blue) / 0.1)", color: "hsl(var(--brand-blue))" }}>
          Legal
        </span>
        <h1 className="text-4xl font-extrabold mb-3">Privacy Policy</h1>
        <p className="text-muted-foreground text-sm">Last updated: March 2026 · Effective: March 2026</p>
        <p className="text-muted-foreground text-sm mt-4 leading-relaxed max-w-2xl">
          At Viadocs (a product of Work Wizards Innovations), we take your privacy seriously. This policy explains how we collect, use, and protect your information when you use our platform.
        </p>
      </motion.div>

      <div className="space-y-8">
        {sections.map((s, i) => (
          <motion.div key={s.title} className="card-glass rounded-2xl p-7 border border-border shadow-card"
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i * 0.05}>
            <h2 className="font-extrabold text-base mb-3">{s.title}</h2>
            <div className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
              {s.content.split("**").map((part, idx) =>
                idx % 2 === 1 ? <strong key={idx} className="text-foreground font-semibold">{part}</strong> : <span key={idx}>{part}</span>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
    <Footer />
  </div>
);

export default PrivacyPolicy;
