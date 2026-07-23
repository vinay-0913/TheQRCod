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
import HeroGenerator from "@/components/qr/HeroGenerator";
import StaticQRGenerator from "@/components/qr/StaticQRGenerator";
import HomepagePricingCards from "@/components/pricing/HomepagePricingCards";
import {
  generateSoftwareAppJsonLd,
  generateFAQJsonLd,
} from "@/lib/seo";
import ScrollLink from "@/components/ui/ScrollLink";

const faqs = [
  {
    question: "Are QR codes created on this generator really free forever?",
    answer:
      "Yes, absolutely. All static QR codes generated on our platform are 100% free forever. There are no hidden fees, no trial periods, no scan limits, and no registration required. Your static QR codes will continue working permanently.",
  },
  {
    question: "What makes this the best free QR code generator online?",
    answer:
      "Our platform combines unlimited free static QR code creation with premium design customization — including custom dot styles, corner eye shapes, color gradients, brand logo uploads, and high-resolution vector SVG exports — without ads or paywalls.",
  },
  {
    question: "What is the difference between a static QR code and a dynamic QR code?",
    answer:
      "Static QR codes directly encode data into the code matrix permanently — the destination URL or text cannot be changed after creation, but they are 100% free and never expire. Dynamic QR codes route through a short redirect link, enabling you to edit the destination URL anytime without reprinting, while also tracking real-time scan analytics.",
  },
  {
    question: "What is a dynamic QR code and how does it work?",
    answer:
      "A dynamic QR code uses a short redirect URL, allowing you to edit the destination link anytime without reprinting your physical flyers or packaging. It also tracks real-time scan analytics, including scan volume, device types, operating systems, and geographic locations.",
  },
  {
    question: "Can I create a free dynamic QR code?",
    answer:
      "Yes! Our free plan includes a dynamic QR code so you can experience editable links, status toggling, and real-time scan analytics at zero cost.",
  },
  {
    question: "Do QR codes ever expire?",
    answer:
      "Static QR codes never expire because your data is directly encoded into the matrix pattern itself. Dynamic QR codes remain active as long as your account and redirect destination remain maintained.",
  },
  {
    question: "What data types can I encode into a QR code?",
    answer:
      "Our generator supports website URLs, plain text messages, WiFi access credentials, UPI payment details, email addresses, phone numbers, SMS messages, vCard digital business cards, and geographic location coordinates.",
  },
  {
    question: "Can I customize the design and add my company logo?",
    answer:
      "Yes! You can customize background and foreground colors, select custom dot patterns and eye shapes, adjust margins and corner roundness, and upload your company logo for seamless brand identity.",
  },
  {
    question: "Do I need an account to create QR codes?",
    answer:
      "No account is required to generate, customize, and download static QR codes. An account is only needed for dynamic QR codes so you can manage destination URLs and access scan analytics in your dashboard.",
  },
];

export default function HomePage() {
  return (
    <>
      <JsonLd data={generateSoftwareAppJsonLd()} />
      <JsonLd data={generateFAQJsonLd(faqs)} />

      <Navbar />

      <main>
        {/* ─── HERO — Full QR Generator ─── */}
        <section id="generator" className="bg-canvas-alt py-12 md:py-16">
          <div className="container-main">
            {/* Heading */}
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-canvas text-ink text-sm font-medium mb-6 border border-hairline shadow-sm">
                <Zap className="h-4 w-4" aria-hidden="true" />
                Free forever · No signup needed
              </div>
              <h1 className="display-heading text-4xl md:text-5xl font-semibold text-ink leading-[1.05] mb-4">
                Free QR Code Generator
              </h1>
              <p className="text-base md:text-lg text-body max-w-xl mx-auto">
                Create custom QR codes with colors, shapes, and logos. Download PNG or SVG instantly.
              </p>
            </div>

            {/* Full generator */}
            <StaticQRGenerator />


          </div>
        </section>

        {/* ─── FEATURE SPLIT: Static vs Dynamic ─── */}
        <section className="bg-surface-soft py-24">
          <div className="container-main">
            <div className="text-center mb-16">
              <h2 className="display-heading text-3xl md:text-4xl font-semibold text-ink leading-tight">
                Two Tools, One Platform
              </h2>
              <p className="mt-4 text-lg text-body max-w-2xl mx-auto">
                Choose the right QR code for your needs. Static for quick
                sharing, dynamic for tracking and control.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Static card */}
              <div className="bg-canvas rounded-lg border border-hairline p-8 md:p-10 flex flex-col shadow-card">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-12 w-12 rounded-lg bg-surface-card flex items-center justify-center">
                    <QrCode className="h-6 w-6 text-ink" aria-hidden="true" />
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
                <p className="text-body mb-8 leading-relaxed">
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
                  <ScrollLink href="/">
                    <Button variant="primary" className="w-full">
                      Create Static QR Code
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Button>
                  </ScrollLink>
                </div>
              </div>

              {/* Dynamic card — dark featured */}
              <div className="bg-surface-dark text-on-dark rounded-lg p-8 md:p-10 flex flex-col relative overflow-hidden">
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-surface-dark-elevated text-on-dark text-xs font-semibold border border-white/10">
                  PRO
                </div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-12 w-12 rounded-lg bg-white/10 flex items-center justify-center">
                    <BarChart3 className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">
                      Dynamic QR Codes
                    </h3>
                    <span className="text-sm font-medium text-on-dark-soft">
                      Trackable & Editable
                    </span>
                  </div>
                </div>
                <p className="text-on-dark-soft mb-8 leading-relaxed">
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
                      <Check className="h-4 w-4 text-badge-emerald shrink-0" aria-hidden="true" />
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
        <section className="bg-canvas py-24">
          <div className="container-main">
            <div className="text-center mb-16">
              <h2 className="display-heading text-3xl md:text-4xl font-semibold text-ink leading-tight">
                Create a QR Code in Seconds
              </h2>
              <p className="mt-4 text-lg text-body">
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
                  <div className="h-14 w-14 rounded-lg bg-surface-card flex items-center justify-center mx-auto mb-5">
                    <step.icon className="h-7 w-7 text-ink" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-semibold text-ink mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-body leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── DYNAMIC QR BENEFITS ─── */}
        <section className="bg-surface-soft py-24">
          <div className="container-main">
            <div className="text-center mb-16">
              <h2 className="display-heading text-3xl md:text-4xl font-semibold text-ink leading-tight">
                Why Go Dynamic?
              </h2>
              <p className="mt-4 text-lg text-body max-w-2xl mx-auto">
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
                  className="bg-surface-card rounded-lg p-8 hover:shadow-card-hover transition-shadow duration-200"
                >
                  <benefit.icon className="h-6 w-6 text-ink mb-4" aria-hidden="true" />
                  <h3 className="text-base font-semibold text-ink mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-body leading-relaxed">
                    {benefit.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── PRICING ─── */}
        <section className="bg-canvas py-24" id="pricing">
          <div className="container-main">
            <div className="text-center mb-16">
              <h2 className="display-heading text-3xl md:text-4xl font-semibold text-ink leading-tight">
                Simple, Transparent Pricing
              </h2>
              <p className="mt-4 text-lg text-body">
                Start free. Upgrade when you need dynamic features.
              </p>
            </div>

            <HomepagePricingCards />
          </div>
        </section>

        {/* ─── SEO CONTENT SECTION (~600 Words) ─── */}
        <section className="bg-surface-soft py-20 border-t border-b border-hairline">
          <div className="container-main max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="display-heading text-3xl md:text-4xl font-semibold text-ink">
                The Ultimate Free QR Code Generator Online
              </h2>
              <p className="text-base text-body-mid mt-2 max-w-2xl mx-auto">
                Everything you need to know about creating, customizing, and tracking custom QR codes for your business or personal projects.
              </p>
            </div>

            <div className="prose prose-slate max-w-none space-y-8 text-body text-base leading-relaxed">
              {/* Block 1 */}
              <div>
                <h3 className="text-xl font-semibold text-ink mb-3">
                  Why You Need a Professional QR Code Generator
                </h3>
                <p className="mb-4">
                  In today’s fast-paced digital ecosystem, quick and seamless offline-to-online communication is vital. Whether you are running an omnichannel marketing campaign, sharing WiFi credentials, or printing contactless restaurant menus, utilizing a high-performance <strong>QR code generator</strong> enables your audience to access your digital destinations instantly. <strong>The QR code generator</strong> hosted on our platform delivers a reliable, instant, and 100% <strong>free QR code generator</strong> experience that requires no technical expertise or software downloads.
                </p>
                <p className="mb-4">
                  In addition to standard website links, our versatile system functions as a dedicated <strong>UPI QR code generator</strong> for instant digital payments, a pinpoint <strong>Location QR code Generator</strong> for sharing Google Maps directions, and a fast <strong>QR Code generator text</strong> tool for raw messages, serial numbers, and notes.
                </p>
                <p>
                  If you have been searching for the <strong>best free qr code generator</strong> to produce high-resolution vector codes, our <strong>qr code generator free online</strong> tool allows creators, small businesses, and enterprise teams to design stunning QR codes embedded with brand logos, custom color schemes, custom corner shapes, and high-contrast frames. Unlike basic tools like a standard <strong>google qr code generator</strong> or basic browser extensions, our dedicated <strong>qr code generator online</strong> offers full creative design control alongside real-time scan analytics.
                </p>
              </div>

              {/* Block 2 */}
              <div>
                <h3 className="text-xl font-semibold text-ink mb-3">
                  Why Choose Our Platform Over Generic Design Tools?
                </h3>
                <p className="mb-4">
                  Many marketers frequently turn to options such as a <strong>qr code generator canva</strong> plugin or basic online utilities when designing promotional print materials. While general graphic suites provide basic barcode creation, a specialized <strong>qr code generator free</strong> solution delivers deeper customization parameters, scalable SVG vector exports, and advanced dynamic URL management that standard visual tools lack.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
                  <div className="bg-canvas p-5 rounded-md border border-hairline">
                    <h4 className="font-semibold text-ink mb-2">Static QR Codes (100% Free Forever)</h4>
                    <p className="text-sm text-body-mid">
                      Directly encode permanent data into your QR matrix. Ideal for vCards, WiFi access, SMS triggers, and fixed links. Unlimited scans with zero hidden fees or expiration dates.
                    </p>
                  </div>
                  <div className="bg-canvas p-5 rounded-md border border-hairline">
                    <h4 className="font-semibold text-ink mb-2">Dynamic QR Codes (Editable &amp; Trackable)</h4>
                    <p className="text-sm text-body-mid">
                      Redirect your target URL anytime without reprinting physical flyers or product packaging. Monitor live scan metrics including scan counts, device types, and geographic locations.
                    </p>
                  </div>
                </div>
              </div>

              {/* Block 3 */}
              <div>
                <h3 className="text-xl font-semibold text-ink mb-3">
                  Enterprise Bulk QR Code Generator Capabilities
                </h3>
                <p className="mb-4">
                  For large-scale marketing teams, event coordinators, and product manufacturers, creating individual QR codes one by one can be time-consuming. That is why our robust <strong>bulk qr code generator</strong> features allow users to generate multiple dynamic and static QR codes efficiently. Whether you require a single high-impact <strong>qr code generator online</strong> link for your business card or a powerful <strong>bulk qr code generator</strong> workflow for hundreds of SKU labels, our engine delivers instant, print-ready vector files engineered for flawless scan reliability.
                </p>
              </div>

              {/* Block 4 */}
              <div>
                <h3 className="text-xl font-semibold text-ink mb-3">
                  How to Generate Your Custom QR Code in 3 Simple Steps
                </h3>
                <ol className="list-decimal pl-5 space-y-2 text-body">
                  <li>
                    <strong>Select Your Data Type:</strong> Choose from website URLs, plain text, email addresses, phone numbers, WiFi credentials, or digital business cards in our <strong>qr code generator free</strong> dashboard.
                  </li>
                  <li>
                    <strong>Customize Your QR Styling:</strong> Tailor eye styles, dot patterns, background colors, and upload your brand logo for maximum recognition.
                  </li>
                  <li>
                    <strong>Download &amp; Print:</strong> Export your code as a high-resolution PNG image or scalable SVG vector. Test scan with your smartphone camera before publishing.
                  </li>
                </ol>
                <p className="mt-4">
                  Discover why thousands of businesses and creators trust <strong>the qr code generator</strong> as their premier <strong>qr code generator free online</strong> resource. Start designing your custom code now!
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── FAQ ─── */}
        <section className="bg-canvas py-24">
          <div className="container-main max-w-3xl">
            <div className="text-center mb-12">
              <h2 className="display-heading text-3xl md:text-4xl font-semibold text-ink leading-tight">
                Frequently Asked Questions
              </h2>
            </div>
            <Accordion items={faqs} />
          </div>
        </section>

        {/* ─── FINAL CTA ─── */}
        <section className="bg-surface-card py-24">
          <div className="container-main text-center">
            <h2 className="display-heading text-3xl md:text-4xl font-semibold text-ink leading-tight">
              Ready to Create Your First QR Code?
            </h2>
            <p className="mt-4 text-lg text-body max-w-xl mx-auto">
              No signup. No credit card. Just paste your link and download a
              beautiful QR code in seconds.
            </p>
            <div className="mt-8">
              <ScrollLink href="/">
                <Button size="lg">
                  Create Free QR Code
                  <ArrowRight className="h-5 w-5" aria-hidden="true" />
                </Button>
              </ScrollLink>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
