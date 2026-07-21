import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";
import JsonLd from "@/components/seo/JsonLd";
import {
  generatePageMetadata,
  generateBreadcrumbJsonLd,
} from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata({
  title: "How to Create a QR Code — Step-by-Step Guide",
  description:
    "Learn how to create a QR code in 3 easy steps. Customize colors, shapes, and add your logo. Free guide with tips for printing and sharing QR codes effectively.",
  path: "/how-to-create-qr-code",
  ogType: "article",
});

const howToSteps = [
  {
    name: "Choose your data type",
    text: "Select what kind of data your QR code should contain: a URL, text, WiFi credentials, contact card (vCard), email, phone number, SMS, or calendar event.",
  },
  {
    name: "Enter your content",
    text: "Type or paste the content for your QR code. For URLs, enter the full web address including https://. For WiFi, enter your network name and password.",
  },
  {
    name: "Customize the design",
    text: "Choose dot styles (rounded, square, classy), corner shapes, foreground and background colors, and optionally upload your logo. See changes in the live preview.",
  },
  {
    name: "Download your QR code",
    text: "Click Download PNG for digital use or Download SVG for print materials. Choose your export size (up to 4096×4096px for high-quality print).",
  },
];

export default function HowToCreatePage() {
  return (
    <>
      <JsonLd
        data={generateBreadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "How to Create a QR Code", path: "/how-to-create-qr-code" },
        ])}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "HowTo",
          name: "How to Create a QR Code",
          description:
            "Step-by-step guide to creating a custom QR code with our free generator.",
          totalTime: "PT2M",
          tool: {
            "@type": "HowToTool",
            name: "The QR Code Generator",
          },
          step: howToSteps.map((step, i) => ({
            "@type": "HowToStep",
            position: i + 1,
            name: step.name,
            text: step.text,
            url: `https://theqrcod.com/how-to-create-qr-code#step-${i + 1}`,
          })),
        }}
      />

      <h1 className="text-3xl md:text-4xl font-semibold text-ink tracking-tight mb-6">
        How to Create a QR Code
      </h1>
      <p className="text-lg text-body-mid mb-12 leading-relaxed">
        Create a custom QR code in under 2 minutes. Our free generator supports
        URLs, text, WiFi, contacts, and more — with full design customization.
      </p>

      {/* Steps */}
      <div className="space-y-8 mb-12">
        {howToSteps.map((step, i) => (
          <div
            key={i}
            id={`step-${i + 1}`}
            className="flex gap-5"
          >
            <div className="shrink-0 h-10 w-10 rounded-md bg-accent text-white flex items-center justify-center font-semibold text-sm">
              {i + 1}
            </div>
            <div>
              <h2 className="text-xl font-semibold text-ink mb-2">
                {step.name}
              </h2>
              <p className="text-body leading-relaxed">{step.text}</p>
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-semibold text-ink mt-12 mb-4">
        Tips for Better QR Codes
      </h2>
      <ul className="list-disc pl-6 space-y-2 text-body mb-8">
        <li>
          <strong>Keep it scannable:</strong> Ensure high contrast between the
          dots and background. Dark dots on light backgrounds work best.
        </li>
        <li>
          <strong>Test before printing:</strong> Always scan your QR code with
          multiple devices before printing in bulk.
        </li>
        <li>
          <strong>Size matters:</strong> For print, QR codes should be at least
          2cm × 2cm (0.8in × 0.8in). For billboards or distance scanning, scale
          up significantly.
        </li>
        <li>
          <strong>Use SVG for print:</strong> SVG files scale to any size without
          losing quality, making them ideal for professional print materials.
        </li>
        <li>
          <strong>Logo size:</strong> If adding a logo, keep it under 30% of
          the QR code area to maintain reliable scanning.
        </li>
        <li>
          <strong>Consider dynamic:</strong> If there&apos;s any chance you&apos;ll
          need to change the destination URL, use a{" "}
          <Link href="/static-vs-dynamic-qr-code" className="text-accent hover:underline">
            dynamic QR code
          </Link>{" "}
          instead of static.
        </li>
      </ul>

      {/* CTA */}
      <div className="bg-accent rounded-md p-8 mt-12 text-white">
        <h2 className="text-xl font-semibold mb-2">
          Ready to create your QR code?
        </h2>
        <p className="text-white/80 mb-4">
          Free, instant, no signup required for static QR codes.
        </p>
        <Link href="/">
          <Button className="bg-white text-ink hover:bg-white/90">
            Open QR Generator
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Button>
        </Link>
      </div>
    </>
  );
}
