import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, X } from "lucide-react";
import Button from "@/components/ui/Button";
import JsonLd from "@/components/seo/JsonLd";
import {
  generatePageMetadata,
  generateArticleJsonLd,
  generateBreadcrumbJsonLd,
} from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata({
  title: "Static vs Dynamic QR Codes — Which Should You Use?",
  description:
    "Compare static and dynamic QR codes side by side. Learn the differences in tracking, editability, cost, and use cases to choose the right type for your needs.",
  path: "/static-vs-dynamic-qr-code",
  ogType: "article",
});

const comparison = [
  { feature: "Editable destination", static: false, dynamic: true },
  { feature: "Scan analytics", static: false, dynamic: true },
  { feature: "Works offline", static: true, dynamic: false },
  { feature: "No expiry", static: true, dynamic: true },
  { feature: "Custom design", static: true, dynamic: true },
  { feature: "Track device & location", static: false, dynamic: true },
  { feature: "Requires account", static: false, dynamic: true },
  { feature: "Pause/deactivate", static: false, dynamic: true },
  { feature: "Free", static: true, dynamic: false },
];

export default function StaticVsDynamicPage() {
  return (
    <>
      <JsonLd
        data={generateBreadcrumbJsonLd([
          { name: "Home", path: "/" },
          {
            name: "Static vs Dynamic QR Codes",
            path: "/static-vs-dynamic-qr-code",
          },
        ])}
      />
      <JsonLd
        data={generateArticleJsonLd({
          title: "Static vs Dynamic QR Codes — Which Should You Use?",
          description:
            "Compare static and dynamic QR codes to choose the right type.",
          path: "/static-vs-dynamic-qr-code",
          datePublished: "2026-02-01",
          dateModified: "2026-07-01",
        })}
      />

      <h1 className="text-3xl md:text-4xl font-semibold text-ink tracking-tight mb-6">
        Static vs Dynamic QR Codes
      </h1>
      <p className="text-lg text-body-mid mb-12 leading-relaxed">
        Not sure which type of QR code you need? Here&apos;s a clear comparison
        to help you choose.
      </p>

      {/* Comparison table */}
      <div className="overflow-x-auto mb-12">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b-2 border-hairline">
              <th className="text-left text-sm font-semibold text-ink py-3 pr-4">
                Feature
              </th>
              <th className="text-center text-sm font-semibold text-ink py-3 px-4">
                Static
              </th>
              <th className="text-center text-sm font-semibold text-ink py-3 pl-4">
                Dynamic
              </th>
            </tr>
          </thead>
          <tbody>
            {comparison.map((row) => (
              <tr key={row.feature} className="border-b border-hairline">
                <td className="text-sm text-body py-3 pr-4">{row.feature}</td>
                <td className="text-center py-3 px-4">
                  {row.static ? (
                    <Check className="h-5 w-5 text-success mx-auto" aria-label="Yes" />
                  ) : (
                    <X className="h-5 w-5 text-mute mx-auto" aria-label="No" />
                  )}
                </td>
                <td className="text-center py-3 pl-4">
                  {row.dynamic ? (
                    <Check className="h-5 w-5 text-success mx-auto" aria-label="Yes" />
                  ) : (
                    <X className="h-5 w-5 text-mute mx-auto" aria-label="No" />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="text-2xl font-semibold text-ink mt-12 mb-4">
        When to Use Static QR Codes
      </h2>
      <ul className="list-disc pl-6 space-y-2 text-body mb-8">
        <li>Personal use (sharing WiFi passwords, contact info)</li>
        <li>Permanent links that will never change</li>
        <li>Offline environments where internet isn&apos;t guaranteed</li>
        <li>Quick one-time sharing (no tracking needed)</li>
        <li>Budget-conscious projects (always free)</li>
      </ul>

      <h2 className="text-2xl font-semibold text-ink mt-12 mb-4">
        When to Use Dynamic QR Codes
      </h2>
      <ul className="list-disc pl-6 space-y-2 text-body mb-8">
        <li>Marketing campaigns where you need to measure performance</li>
        <li>Print materials where the destination might change</li>
        <li>Business use where scan tracking is valuable</li>
        <li>Event management and time-limited promotions</li>
        <li>A/B testing different landing pages</li>
      </ul>

      {/* CTA */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-12">
        <div className="bg-canvas-alt rounded-md p-6 border border-hairline">
          <h3 className="text-lg font-semibold text-ink mb-2">
            Create Static QR Code
          </h3>
          <p className="text-sm text-body-mid mb-4">Free, instant, no signup.</p>
          <Link href="/">
            <Button variant="primary" className="w-full">
              Create Now <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </Link>
        </div>
        <div className="bg-primary rounded-md p-6">
          <h3 className="text-lg font-semibold text-white mb-2">
            Try Dynamic QR Codes
          </h3>
          <p className="text-sm text-mute-soft mb-4">
            Track, edit, and analyze.
          </p>
          <Link href="/signup">
            <Button
              variant="secondary"
              className="w-full bg-white text-ink hover:bg-white/90 border-none"
            >
              Get Started <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}
