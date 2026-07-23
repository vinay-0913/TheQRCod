import { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import JsonLd from "@/components/seo/JsonLd";
import { generatePageMetadata, generateBreadcrumbJsonLd } from "@/lib/seo";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { QrCode, Shield, Zap, BarChart3, Users, Globe, ArrowRight } from "lucide-react";

export const metadata: Metadata = generatePageMetadata({
  title: "About Us — The QR Code Generator",
  description:
    "Learn about The QR Code Generator. Our mission is to provide fast, reliable, and accessible static and dynamic QR code generation for individuals and businesses worldwide.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={generateBreadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "About Us", path: "/about" },
        ])}
      />

      <Navbar />

      <main className="bg-canvas py-16 md:py-24">
        <div className="container-main max-w-4xl">
          {/* Header */}
          <div className="text-center mb-16">
            <span className="text-xs font-semibold uppercase tracking-wider text-accent bg-accent/10 px-3 py-1 rounded-full">
              About The QR Code Generator
            </span>
            <h1 className="display-heading text-4xl md:text-5xl font-semibold text-ink mt-4 leading-tight">
              Empowering Digital Connections Worldwide
            </h1>
            <p className="mt-4 text-lg text-body-mid max-w-2xl mx-auto">
              We build fast, privacy-focused, and accessible QR code software designed to bridge the physical and digital worlds seamlessly.
            </p>
          </div>

          {/* Mission Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="bg-surface-soft p-6 rounded-lg border border-hairline">
              <div className="h-10 w-10 rounded-md bg-canvas flex items-center justify-center mb-4 text-ink shadow-xs">
                <Zap className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold text-ink mb-2">Instant &amp; Accessible</h3>
              <p className="text-sm text-body-mid leading-relaxed">
                Generate 100% free static QR codes instantly with zero registration or forced paywalls.
              </p>
            </div>
            <div className="bg-surface-soft p-6 rounded-lg border border-hairline">
              <div className="h-10 w-10 rounded-md bg-canvas flex items-center justify-center mb-4 text-ink shadow-xs">
                <BarChart3 className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold text-ink mb-2">Powerful Analytics</h3>
              <p className="text-sm text-body-mid leading-relaxed">
                Track scan locations, device types, and temporal metrics to optimize physical marketing campaigns.
              </p>
            </div>
            <div className="bg-surface-soft p-6 rounded-lg border border-hairline">
              <div className="h-10 w-10 rounded-md bg-canvas flex items-center justify-center mb-4 text-ink shadow-xs">
                <Shield className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold text-ink mb-2">Privacy &amp; Reliability</h3>
              <p className="text-sm text-body-mid leading-relaxed">
                Enterprise-grade infrastructure ensures fast redirection speed and robust data privacy compliance.
              </p>
            </div>
          </div>

          {/* Detailed Story */}
          <div className="prose prose-slate max-w-none space-y-6 text-body leading-relaxed border-t border-hairline pt-12">
            <h2 className="text-2xl font-semibold text-ink">Our Story</h2>
            <p>
              Founded with the vision of making digital interactions frictionless, <strong>The QR Code Generator</strong> provides individuals, small business owners, and global enterprise teams with intuitive QR creation tools.
            </p>
            <p>
              Whether you need a quick static QR code for a personal WiFi network, a customized business card vCard, or thousands of trackable dynamic codes for product packaging, our infrastructure is engineered to deliver high-resolution vector exports (SVG) and PNG graphics instantly.
            </p>

            <h2 className="text-2xl font-semibold text-ink pt-6">Why Millions Trust Us</h2>
            <ul className="space-y-3 list-disc pl-5">
              <li><strong>Free Forever Guarantee:</strong> All static QR codes generated on our platform are 100% free and never expire.</li>
              <li><strong>Custom Design Customization:</strong> Adjust dot patterns, corner eye shapes, colors, and embed brand logos easily.</li>
              <li><strong>Dynamic URL Editing:</strong> Update your destination web link anytime without reprinting physical materials.</li>
              <li><strong>High-Speed Global Network:</strong> Fast redirection servers ensure high scan conversion rates worldwide.</li>
            </ul>
          </div>

          {/* CTA Banner */}
          <div className="mt-16 bg-surface-dark text-on-dark rounded-lg p-8 text-center">
            <h2 className="text-2xl font-semibold text-white mb-3">Ready to Create Your QR Code?</h2>
            <p className="text-on-dark-soft text-sm max-w-lg mx-auto mb-6">
              Start generating custom static and dynamic QR codes in seconds.
            </p>
            <Link href="/">
              <Button variant="secondary" className="bg-white text-ink hover:bg-white/90">
                Create Free QR Code
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
