import type { Metadata } from "next";
import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Button from "@/components/ui/Button";
import { generatePageMetadata } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata({
  title: "Pricing — Dynamic QR Codes with Analytics",
  description:
    "Free static QR codes forever. Upgrade to Pro for dynamic QR codes with scan analytics, editable destinations, and unlimited tracking. Starting at $6.99/month.",
  path: "/pricing",
});

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "/forever",
    description: "Everything you need for static QR codes.",
    features: [
      "Unlimited static QR codes",
      "Full customization (colors, shapes, logo)",
      "Download PNG & SVG",
      "All data types (URL, text, WiFi, vCard...)",
      "No account required",
      "No watermarks",
    ],
    cta: "Get Started Free",
    ctaHref: "/generator",
    featured: false,
  },
  {
    name: "Pro",
    price: "$6.99",
    period: "/month",
    description: "Dynamic QR codes with full analytics.",
    features: [
      "Everything in Free",
      "Unlimited dynamic QR codes",
      "Scan analytics dashboard",
      "Edit destination URL anytime",
      "Device & location tracking",
      "Bulk QR code creation",
      "Priority support",
      "API access (coming soon)",
    ],
    cta: "Start Free Trial",
    ctaHref: "/signup",
    featured: true,
  },
  {
    name: "Business",
    price: "$29.99",
    period: "/month",
    description: "For teams and high-volume needs.",
    features: [
      "Everything in Pro",
      "Team collaboration (up to 10 users)",
      "Custom short domain",
      "Branded QR code templates",
      "Advanced analytics & exports",
      "Webhook integrations",
      "Dedicated support",
      "SLA guarantee",
    ],
    cta: "Contact Sales",
    ctaHref: "/signup",
    featured: false,
  },
];

export default function PricingPage() {
  return (
    <>
      <Navbar />
      <main className="bg-canvas min-h-screen">
        <section className="container-main py-20 md:py-28">
          <div className="text-center mb-16">
            <h1 className="display-heading text-4xl md:text-5xl font-semibold text-ink leading-tight">
              Simple, Transparent Pricing
            </h1>
            <p className="mt-4 text-lg text-body max-w-xl mx-auto">
              Start free with unlimited static QR codes. Upgrade when you need
              dynamic features and analytics.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-lg p-8 flex flex-col relative shadow-card ${plan.featured
                    ? "bg-surface-dark text-on-dark"
                    : "bg-canvas border border-hairline"
                  }`}
              >
                {plan.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-surface-dark-elevated text-on-dark text-xs font-semibold border border-white/10">
                    Most Popular
                  </div>
                )}
                <h2
                  className={`text-lg font-semibold ${plan.featured ? "text-white" : "text-ink"
                    }`}
                >
                  {plan.name}
                </h2>
                <div className="mt-4 flex items-baseline gap-1">
                  <span
                    className={`display-heading text-4xl font-semibold ${plan.featured ? "text-white" : "text-ink"
                      }`}
                  >
                    {plan.price}
                  </span>
                  <span
                    className={
                      plan.featured ? "text-on-dark-soft" : "text-body-mid"
                    }
                  >
                    {plan.period}
                  </span>
                </div>
                <p
                  className={`mt-4 text-sm ${plan.featured ? "text-on-dark-soft" : "text-body"
                    }`}
                >
                  {plan.description}
                </p>
                <ul className="mt-8 space-y-3 flex-1">
                  {plan.features.map((f) => (
                    <li
                      key={f}
                      className={`flex items-start gap-3 text-sm ${plan.featured ? "text-white/80" : "text-body"
                        }`}
                    >
                      <Check
                        className={`h-4 w-4 shrink-0 mt-0.5 ${plan.featured ? "text-badge-emerald" : "text-success"
                          }`}
                        aria-hidden="true"
                      />
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <Link href={plan.ctaHref}>
                    <Button
                      variant={plan.featured ? "secondary" : "primary"}
                      className={`w-full ${plan.featured
                          ? "bg-white text-ink hover:bg-white/90 border-none"
                          : ""
                        }`}
                    >
                      {plan.cta}
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
