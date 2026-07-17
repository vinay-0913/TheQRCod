import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";
import JsonLd from "@/components/seo/JsonLd";
import {
  generatePageMetadata,
  generateArticleJsonLd,
  generateBreadcrumbJsonLd,
} from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata({
  title: "What Is a QR Code? Complete Guide (2026)",
  description:
    "Learn what QR codes are, how they work, types of QR codes (static vs dynamic), common use cases, and why they matter in 2026. Complete beginner guide.",
  path: "/what-is-qr-code",
  ogType: "article",
});

export default function WhatIsQRCodePage() {
  return (
    <>
      <JsonLd
        data={generateBreadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "What Is a QR Code?", path: "/what-is-qr-code" },
        ])}
      />
      <JsonLd
        data={generateArticleJsonLd({
          title: "What Is a QR Code? Complete Guide (2026)",
          description:
            "Learn what QR codes are, how they work, and why they matter.",
          path: "/what-is-qr-code",
          datePublished: "2026-01-15",
          dateModified: "2026-07-01",
        })}
      />

      <h1 className="text-3xl md:text-4xl font-semibold text-ink tracking-tight mb-6">
        What Is a QR Code? Complete Guide
      </h1>

      <p className="text-lg text-body-mid mb-8 leading-relaxed">
        A QR code (Quick Response code) is a two-dimensional barcode that stores
        information in a pattern of black and white squares. Unlike traditional
        barcodes that hold data in one direction, QR codes encode data both
        horizontally and vertically, allowing them to store significantly more
        information.
      </p>

      <h2 className="text-2xl font-semibold text-ink mt-12 mb-4">
        How Do QR Codes Work?
      </h2>
      <p className="text-body leading-relaxed mb-4">
        QR codes work by encoding data into a matrix of dark and light modules.
        When you scan a QR code with a smartphone camera or QR reader app, the
        software decodes the pattern and extracts the embedded information — a
        URL, text, phone number, WiFi credentials, or other data.
      </p>
      <p className="text-body leading-relaxed mb-4">
        Every QR code contains three large squares in the corners (finder
        patterns) that help the scanner orient the code correctly, regardless of
        the angle it&apos;s scanned from. The actual data is encoded in the
        remaining space using Reed-Solomon error correction, which means QR
        codes can still be read even if up to 30% of the code is damaged or
        obscured.
      </p>

      <h2 className="text-2xl font-semibold text-ink mt-12 mb-4">
        Types of QR Codes
      </h2>

      <h3 className="text-xl font-semibold text-ink mt-8 mb-3">
        Static QR Codes
      </h3>
      <p className="text-body leading-relaxed mb-4">
        Static QR codes encode data directly into the code itself. Once
        generated, the destination cannot be changed. They work forever without
        any server or internet connection (the scanner just reads the embedded
        data). Static QR codes are ideal for permanent content like business
        cards, product labels, and printed materials where the destination
        won&apos;t change.
      </p>

      <h3 className="text-xl font-semibold text-ink mt-8 mb-3">
        Dynamic QR Codes
      </h3>
      <p className="text-body leading-relaxed mb-4">
        Dynamic QR codes contain a short redirect URL instead of the final
        destination. When scanned, the code sends the user to a redirect server
        which then forwards them to the actual target URL. This means you can
        change where the QR code points to without reprinting it. Dynamic QR
        codes also enable scan tracking — you can see how many times the code
        was scanned, from which devices, locations, and when.
      </p>

      <h2 className="text-2xl font-semibold text-ink mt-12 mb-4">
        Common Use Cases
      </h2>
      <ul className="list-disc pl-6 space-y-2 text-body mb-8">
        <li>Marketing campaigns and print advertising</li>
        <li>Restaurant menus and contactless ordering</li>
        <li>Event tickets and boarding passes</li>
        <li>Product packaging and authentication</li>
        <li>Business cards and contact sharing (vCard)</li>
        <li>WiFi network sharing</li>
        <li>Payment processing (many mobile payment apps use QR codes)</li>
        <li>Inventory management and asset tracking</li>
      </ul>

      <h2 className="text-2xl font-semibold text-ink mt-12 mb-4">
        Why QR Codes Matter in 2026
      </h2>
      <p className="text-body leading-relaxed mb-8">
        QR code usage has exploded since 2020, driven by contactless
        interactions and smartphone cameras with built-in QR readers. Today, QR
        codes are the standard bridge between physical and digital experiences.
        With dynamic QR codes, businesses can measure the ROI of print
        campaigns, update destinations in real time, and gather valuable
        analytics about their audience.
      </p>

      {/* CTA */}
      <div className="bg-accent-light rounded-md p-8 mt-12">
        <h2 className="text-xl font-semibold text-ink mb-2">
          Ready to create your QR code?
        </h2>
        <p className="text-body-mid mb-4">
          Generate free static QR codes instantly, or try dynamic QR codes with
          scan analytics.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/generator">
            <Button>
              Create Free QR Code
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </Link>
          <Link href="/static-vs-dynamic-qr-code">
            <Button variant="secondary">
              Static vs Dynamic →
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}
