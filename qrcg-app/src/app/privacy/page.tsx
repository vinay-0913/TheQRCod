import { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import JsonLd from "@/components/seo/JsonLd";
import { generatePageMetadata, generateBreadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata({
  title: "Privacy Policy — The QR Code Generator",
  description:
    "Read The QR Code Generator Privacy Policy. Learn how we collect, protect, and process user data for static and dynamic QR code generation.",
  path: "/privacy",
});

export default function PrivacyPolicyPage() {
  return (
    <>
      <JsonLd
        data={generateBreadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Privacy Policy", path: "/privacy" },
        ])}
      />

      <Navbar />

      <main className="bg-canvas py-16 md:py-24">
        <div className="container-main max-w-3xl">
          <div className="text-center mb-12">
            <h1 className="display-heading text-4xl font-semibold text-ink leading-tight">
              Privacy Policy
            </h1>
            <p className="mt-2 text-sm text-body-mid">
              Last updated: July 2026
            </p>
          </div>

          <div className="prose prose-slate max-w-none space-y-6 text-body leading-relaxed border-t border-hairline pt-8">
            <p>
              At <strong>The QR Code Generator</strong> (accessible from TheQRCod.com), accessible privacy and data protection are among our top priorities. This Privacy Policy document outlines the types of information collected and recorded by our platform and how we use it.
            </p>

            <h2 className="text-xl font-semibold text-ink pt-4">1. Information We Collect</h2>
            <p>
              We collect information to provide better services to all our users. Depending on how you interact with our platform:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Static QR Codes:</strong> No personal information or registration is required to create static QR codes. The data you input (such as URLs or plain text) is processed directly in your browser.</li>
              <li><strong>Account Information:</strong> When you register for an account (e.g. for dynamic QR codes), we collect your name, email address, and encrypted authentication credentials.</li>
              <li><strong>Dynamic Scan Analytics:</strong> When someone scans a dynamic QR code created through our platform, we record anonymized operational metrics including scan timestamp, user agent device type, browser, and approximate geographical location (country/city level).</li>
            </ul>

            <h2 className="text-xl font-semibold text-ink pt-4">2. How We Use Your Information</h2>
            <p>We use the collected information for various legitimate purposes:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>To provide, operate, and maintain our QR code generation service.</li>
              <li>To deliver real-time scan analytics and reporting in your user dashboard.</li>
              <li>To detect and prevent fraudulent activity or security vulnerabilities.</li>
              <li>To process subscriptions and billing transactions via secure PCI-DSS payment gateways.</li>
            </ul>

            <h2 className="text-xl font-semibold text-ink pt-4">3. Data Security &amp; Retention</h2>
            <p>
              We implement industry-standard encryption protocols (HTTPS/TLS) to safeguard your data in transit and at rest. We do not sell or rent personal information to third-party advertisers.
            </p>

            <h2 className="text-xl font-semibold text-ink pt-4">4. Your Data Rights</h2>
            <p>
              Under applicable data protection laws (GDPR, CCPA), you have the right to access, update, or request deletion of your personal account information at any time through your dashboard or by contacting support.
            </p>

            <h2 className="text-xl font-semibold text-ink pt-4">5. Contact Us</h2>
            <p>
              If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us at <strong>privacy@theqrcod.com</strong>.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
