import Link from "next/link";
import {
  QrCode,
  ArrowRight,
  Scan,
  Palette,
  BarChart3,
  Link2,
  Globe,
  Download,
  Edit,
  Shield,
  Zap,
  Check,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Button from "@/components/ui/Button";
import Accordion from "@/components/ui/Accordion";
import JsonLd from "@/components/seo/JsonLd";
import {
  generateSoftwareAppJsonLd,
  generateFAQJsonLd,
} from "@/lib/seo";

const faqs = [
  {
    question: "What is the difference between static and dynamic QR codes?",
    answer:
      "Static QR codes encode data directly — the destination is fixed permanently. Dynamic QR codes use a short redirect URL, so you can change the destination anytime, track scan analytics (location, device, time), and never need to reprint the code.",
  },
  {
    question: "Is the static QR code generator really free?",
    answer:
      "Yes, completely free with no limits. Generate unlimited static QR codes with full customization (colors, shapes, logos) and download in PNG or SVG. No account required.",
  },
  {
    question: "Do I need an account to create QR codes?",
    answer:
      "No account is needed for static QR codes. You can create, customize, and download them instantly. An account is only required for dynamic QR codes, which need server-side tracking for analytics and URL editing.",
  },
  {
    question: "What data types can I encode in a QR code?",
    answer:
      "Our generator supports URLs, plain text, email addresses, phone numbers, SMS messages, WiFi network credentials, vCard contacts, and calendar events.",
  },
  {
    question: "Can I customize the appearance of my QR code?",
    answer:
      "Absolutely. Customize dot style, corner shapes, colors (background and foreground), add your logo, adjust margin and roundness. All customization options are available for both static and dynamic QR codes.",
  },
  {
    question: "How do dynamic QR code analytics work?",
    answer:
      "When someone scans a dynamic QR code, our system records the scan timestamp, device type, browser, approximate location, and referrer. You can view this data in your dashboard with charts and tables — updated in real time.",
  },
];

const pricingFeatures = {
  free: [
    "Unlimited static QR codes",
    "Full customization (colors, shapes, logo)",
    "Download PNG & SVG",
    "All data types (URL, text, WiFi, vCard...)",
    "No account required",
    "No watermarks",
  ],
  pro: [
    "Everything in Free",
    "Unlimited dynamic QR codes",
    "Scan analytics dashboard",
    "Edit destination URL anytime",
    "Device & location tracking",
    "Bulk QR code creation",
    "Priority support",
  ],
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={generateSoftwareAppJsonLd()} />
      <JsonLd data={generateFAQJsonLd(faqs)} />

      <Navbar />

      <main>
        {/* ─── HERO ─── */}
        <section className="relative overflow-hidden bg-canvas">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--color-accent-light)_0%,_transparent_60%)] opacity-60" />
          <div className="container-main relative py-24 md:py-32 lg:py-40">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent-light text-accent text-sm font-medium mb-8">
                <Zap className="h-4 w-4" aria-hidden="true" />
                Free forever · No signup needed
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-ink tracking-tight leading-[1.1]">
                Generate QR Codes
                <br />
                <span className="text-accent">That Actually Work</span>
              </h1>
              <p className="mt-6 text-lg md:text-xl text-body-mid leading-relaxed prose-width mx-auto">
                Create free static QR codes instantly, or unlock dynamic QR
                codes with scan analytics, editable destinations, and real-time
                tracking.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/generator">
                  <Button size="lg" className="min-w-[200px]">
                    Create Free QR Code
                    <ArrowRight className="h-5 w-5" aria-hidden="true" />
                  </Button>
                </Link>
                <Link href="/pricing">
                  <Button variant="secondary" size="lg" className="min-w-[200px]">
                    View Dynamic Plans
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ─── FEATURE SPLIT: Static vs Dynamic ─── */}
        <section className="bg-canvas-alt py-20 md:py-28">
          <div className="container-main">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-semibold text-ink tracking-tight">
                Two Tools, One Platform
              </h2>
              <p className="mt-4 text-lg text-body-mid max-w-2xl mx-auto">
                Choose the right QR code for your needs. Static for quick
                sharing, dynamic for tracking and control.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Static card */}
              <div className="bg-canvas rounded-md border border-hairline p-8 md:p-10 flex flex-col">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-12 w-12 rounded-md bg-accent-light flex items-center justify-center">
                    <QrCode className="h-6 w-6 text-accent" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-ink">
                      Static QR Codes
                    </h3>
                    <span className="text-sm font-medium text-success">
                      100% Free
                    </span>
                  </div>
                </div>
                <p className="text-body-mid mb-8 leading-relaxed">
                  Generate QR codes that encode data directly. Perfect for
                  business cards, flyers, and one-time links. No account
                  needed — create and download instantly.
                </p>
                <ul className="space-y-3 mb-8">
                  {[
                    "Unlimited generations",
                    "Full design customization",
                    "PNG & SVG downloads",
                    "8+ data types supported",
                  ].map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-3 text-sm text-body"
                    >
                      <Check className="h-4 w-4 text-success shrink-0" aria-hidden="true" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto">
                  <Link href="/generator">
                    <Button variant="primary" className="w-full">
                      Create Static QR Code
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Dynamic card — visually distinct */}
              <div className="bg-primary text-on-primary rounded-md p-8 md:p-10 flex flex-col relative overflow-hidden">
                <div className="absolute top-4 right-4 px-2.5 py-1 rounded-sm bg-accent text-white text-xs font-semibold">
                  PRO
                </div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-12 w-12 rounded-md bg-white/10 flex items-center justify-center">
                    <BarChart3 className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">
                      Dynamic QR Codes
                    </h3>
                    <span className="text-sm font-medium text-accent-subtle">
                      Trackable & Editable
                    </span>
                  </div>
                </div>
                <p className="text-mute-soft mb-8 leading-relaxed">
                  QR codes that redirect through our servers. Edit the
                  destination URL anytime. Track every scan with detailed
                  analytics — device, location, time.
                </p>
                <ul className="space-y-3 mb-8">
                  {[
                    "Change URL without reprinting",
                    "Real-time scan analytics",
                    "Device & location tracking",
                    "Pause or deactivate anytime",
                  ].map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-3 text-sm text-white/80"
                    >
                      <Check className="h-4 w-4 text-accent shrink-0" aria-hidden="true" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto">
                  <Link href="/signup">
                    <Button
                      variant="secondary"
                      className="w-full bg-white text-ink hover:bg-white/90 border-none"
                    >
                      Start Free Trial
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── HOW IT WORKS ─── */}
        <section className="bg-canvas py-20 md:py-28">
          <div className="container-main">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-semibold text-ink tracking-tight">
                Create a QR Code in Seconds
              </h2>
              <p className="mt-4 text-lg text-body-mid">
                Three steps. No complexity.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {[
                {
                  icon: Link2,
                  title: "Choose Your Data",
                  desc: "Enter a URL, text, WiFi credentials, contact info, or any of 8+ supported data types.",
                },
                {
                  icon: Palette,
                  title: "Customize the Design",
                  desc: "Pick dot styles, corner shapes, colors, and add your logo. See changes in real-time preview.",
                },
                {
                  icon: Download,
                  title: "Download & Share",
                  desc: "Export as high-resolution PNG or scalable SVG. Ready for print or digital use.",
                },
              ].map((step, i) => (
                <div key={i} className="text-center">
                  <div className="h-14 w-14 rounded-md bg-accent-light flex items-center justify-center mx-auto mb-5">
                    <step.icon className="h-7 w-7 text-accent" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-semibold text-ink mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-body-mid leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── DYNAMIC QR BENEFITS ─── */}
        <section className="bg-canvas-alt py-20 md:py-28">
          <div className="container-main">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-semibold text-ink tracking-tight">
                Why Go Dynamic?
              </h2>
              <p className="mt-4 text-lg text-body-mid max-w-2xl mx-auto">
                Static QR codes are great for simple sharing. Dynamic QR codes
                give you control and insights.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {[
                {
                  icon: Edit,
                  title: "Edit Anytime",
                  desc: "Change where your QR code points without reprinting. Update campaigns on the fly.",
                },
                {
                  icon: Scan,
                  title: "Track Every Scan",
                  desc: "See when, where, and how people scan your codes. Real-time analytics dashboard.",
                },
                {
                  icon: Globe,
                  title: "Location Data",
                  desc: "Know which cities and countries your scans come from. Optimize local campaigns.",
                },
                {
                  icon: Shield,
                  title: "Full Control",
                  desc: "Pause or deactivate codes instantly. Protect against misuse with a single click.",
                },
              ].map((benefit, i) => (
                <div
                  key={i}
                  className="bg-canvas rounded-md border border-hairline p-6 hover:shadow-card-hover transition-shadow duration-200"
                >
                  <benefit.icon className="h-6 w-6 text-accent mb-4" aria-hidden="true" />
                  <h3 className="text-base font-semibold text-ink mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-body-mid leading-relaxed">
                    {benefit.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── PRICING ─── */}
        <section className="bg-canvas py-20 md:py-28" id="pricing">
          <div className="container-main">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-semibold text-ink tracking-tight">
                Simple, Transparent Pricing
              </h2>
              <p className="mt-4 text-lg text-body-mid">
                Start free. Upgrade when you need dynamic features.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              {/* Free tier */}
              <div className="bg-canvas rounded-md border border-hairline p-8">
                <h3 className="text-lg font-semibold text-ink">Free</h3>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-semibold text-ink">$0</span>
                  <span className="text-body-mid">/forever</span>
                </div>
                <p className="mt-4 text-sm text-body-mid">
                  Everything you need for static QR codes.
                </p>
                <ul className="mt-8 space-y-3">
                  {pricingFeatures.free.map((f) => (
                    <li
                      key={f}
                      className="flex items-center gap-3 text-sm text-body"
                    >
                      <Check className="h-4 w-4 text-success shrink-0" aria-hidden="true" />
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <Link href="/generator">
                    <Button variant="secondary" className="w-full">
                      Get Started Free
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Pro tier — featured */}
              <div className="bg-primary text-on-primary rounded-md p-8 relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-accent text-white text-xs font-semibold">
                  Most Popular
                </div>
                <h3 className="text-lg font-semibold text-white">Pro</h3>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-semibold text-white">
                    $6.99
                  </span>
                  <span className="text-mute-soft">/month</span>
                </div>
                <p className="mt-4 text-sm text-mute-soft">
                  Dynamic QR codes with full analytics.
                </p>
                <ul className="mt-8 space-y-3">
                  {pricingFeatures.pro.map((f) => (
                    <li
                      key={f}
                      className="flex items-center gap-3 text-sm text-white/80"
                    >
                      <Check className="h-4 w-4 text-accent shrink-0" aria-hidden="true" />
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <Link href="/signup">
                    <Button
                      variant="secondary"
                      className="w-full bg-white text-ink hover:bg-white/90 border-none"
                    >
                      Start Free Trial
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── FAQ ─── */}
        <section className="bg-canvas-alt py-20 md:py-28">
          <div className="container-main max-w-3xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-semibold text-ink tracking-tight">
                Frequently Asked Questions
              </h2>
            </div>
            <Accordion items={faqs} />
          </div>
        </section>

        {/* ─── FINAL CTA ─── */}
        <section className="bg-primary py-20 md:py-24">
          <div className="container-main text-center">
            <h2 className="text-3xl md:text-4xl font-semibold text-white tracking-tight">
              Ready to Create Your First QR Code?
            </h2>
            <p className="mt-4 text-lg text-mute-soft max-w-xl mx-auto">
              No signup. No credit card. Just paste your link and download a
              beautiful QR code in seconds.
            </p>
            <div className="mt-8">
              <Link href="/generator">
                <Button
                  size="lg"
                  className="bg-white text-ink hover:bg-white/90"
                >
                  Create Free QR Code
                  <ArrowRight className="h-5 w-5" aria-hidden="true" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
