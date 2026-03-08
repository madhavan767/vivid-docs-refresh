import { motion } from "framer-motion";
import AppNavbar from "@/components/AppNavbar";
import Footer from "@/components/Footer";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.08 } }),
};

const sections = [
  {
    title: "1. Acceptance of Terms",
    content: `By accessing or using Viadocs (available at viadocs.lovable.app or viadocs.app), you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, please do not use our platform.

These terms apply to all users of the service, including but not limited to browsers, customers, merchants, and contributors of content.`,
  },
  {
    title: "2. Description of Service",
    content: `Viadocs is a free, open-source online toolkit offering 100+ browser-based tools for document processing, image editing, text manipulation, developer utilities, security generators, SEO tools, and calculators.

Viadocs is a debut product of **Work Wizards Innovations (WWI)**. The service is provided "as-is" and "as available" without warranties of any kind.`,
  },
  {
    title: "3. Free & Open Source",
    content: `Viadocs is completely free to use. There are no hidden charges, subscriptions, or premium tiers.

• All 100 tools are available at no cost
• No account is required for most tools
• The platform is open source — contributions are welcome
• We reserve the right to add optional features in the future while keeping core tools free`,
  },
  {
    title: "4. User Responsibilities",
    content: `When using Viadocs, you agree to:

• Use the service only for lawful purposes
• Not attempt to disrupt, hack, or overload our servers or infrastructure
• Not use the tools to process illegal, malicious, or harmful content
• Not redistribute or resell our tools as your own product without permission
• Respect intellectual property rights of content you process through our tools`,
  },
  {
    title: "5. Intellectual Property",
    content: `The Viadocs name, logo, branding, and the source code are owned by Work Wizards Innovations.

• The underlying tools and algorithms may use open-source libraries subject to their respective licenses
• Content you process through Viadocs remains your own — we claim no rights over your files or data
• Screenshots, marketing materials, and documentation are property of WWI`,
  },
  {
    title: "6. Disclaimer of Warranties",
    content: `Viadocs is provided on an "AS IS" and "AS AVAILABLE" basis without any warranties, either express or implied.

• We do not guarantee that the service will be error-free, uninterrupted, or fully accurate
• Tool outputs (conversions, calculations, etc.) are provided for convenience — always verify critical results
• We are not liable for any loss or damage resulting from the use of our tools`,
  },
  {
    title: "7. Limitation of Liability",
    content: `To the maximum extent permitted by law, Work Wizards Innovations shall not be liable for any:

• Indirect, incidental, or consequential damages
• Loss of data, business, or profits arising from use of Viadocs
• Errors or inaccuracies in tool outputs
• Service interruptions or downtime

Your use of Viadocs is entirely at your own risk.`,
  },
  {
    title: "8. Third-Party Links",
    content: `Viadocs may contain links to third-party websites (e.g., wwi.org.in, GitHub). We are not responsible for the content, privacy practices, or terms of those external sites. Visiting them is at your own discretion.`,
  },
  {
    title: "9. Modifications",
    content: `We reserve the right to modify these Terms and Conditions at any time. Changes will be effective immediately upon posting. Continued use of Viadocs after changes constitutes acceptance of the new terms.`,
  },
  {
    title: "10. Governing Law",
    content: `These terms are governed by the laws of India. Any disputes shall be resolved under Indian jurisdiction in the appropriate courts.`,
  },
  {
    title: "11. Contact",
    content: `If you have questions about these Terms, please contact us at:

**Work Wizards Innovations**
Website: wwi.org.in
Email: contact@wwi.org.in`,
  },
];

const TermsConditions = () => (
  <div className="min-h-screen bg-background">
    <AppNavbar />
    <div className="pt-28 pb-20 max-w-4xl mx-auto px-6">
      <motion.div className="mb-12" variants={fadeUp} initial="hidden" animate="visible">
        <span className="inline-block text-xs font-bold px-3 py-1 rounded-full mb-4"
          style={{ background: "hsl(var(--brand-teal) / 0.1)", color: "hsl(var(--brand-teal))" }}>
          Legal
        </span>
        <h1 className="text-4xl font-extrabold mb-3">Terms & Conditions</h1>
        <p className="text-muted-foreground text-sm">Last updated: March 2026 · Effective: March 2026</p>
        <p className="text-muted-foreground text-sm mt-4 leading-relaxed max-w-2xl">
          Please read these Terms and Conditions carefully before using Viadocs. By using our service, you agree to these terms.
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

export default TermsConditions;
