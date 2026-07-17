import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import JsonLd from "@/components/seo/JsonLd";
import { generatePageMetadata, generateBreadcrumbJsonLd } from "@/lib/seo";
import StaticQRGenerator from "@/components/qr/StaticQRGenerator";

export const metadata: Metadata = generatePageMetadata({
  title: "Free QR Code Generator — Create Custom QR Codes Online",
  description:
    "Create free QR codes with custom colors, dot styles, corner shapes, and logos. Download as PNG or SVG. Supports URLs, text, WiFi, vCard, email, and more. No signup required.",
  path: "/generator",
});

export default function GeneratorPage() {
  return (
    <>
      <JsonLd
        data={generateBreadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "QR Generator", path: "/generator" },
        ])}
      />
      <Navbar />
      <main className="bg-canvas-alt min-h-screen">
        <div className="container-main py-10 md:py-14">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-semibold text-ink tracking-tight">
              <span className="inline-block bg-accent text-white px-3 py-1 rounded-sm mr-2">
                Free
              </span>
              QR Code Generator
            </h1>
            <p className="mt-4 text-base text-body-mid max-w-xl mx-auto">
              Create custom QR codes for links, text, WiFi, contacts, and more.
              Download in PNG or SVG — no signup required.
            </p>
          </div>
          <StaticQRGenerator />
        </div>
      </main>
      <Footer />
    </>
  );
}
