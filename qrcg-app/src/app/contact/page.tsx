import { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import JsonLd from "@/components/seo/JsonLd";
import { generatePageMetadata, generateBreadcrumbJsonLd } from "@/lib/seo";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { Mail, Send } from "lucide-react";

export const metadata: Metadata = generatePageMetadata({
  title: "Contact Us — The QR Code Generator",
  description:
    "Have questions or need technical support? Contact The QR Code Generator team. We are here to help with all your static and dynamic QR code needs.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={generateBreadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Contact Us", path: "/contact" },
        ])}
      />

      <Navbar />

      <main className="bg-canvas py-16 md:py-24">
        <div className="container-main max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <span className="text-xs font-semibold uppercase tracking-wider text-accent bg-accent/10 px-3 py-1 rounded-full">
              Get In Touch
            </span>
            <h1 className="display-heading text-3xl md:text-4xl font-semibold text-ink mt-3 leading-tight">
              Contact Us
            </h1>
            <p className="mt-3 text-base text-body-mid max-w-lg mx-auto">
              Have questions about QR codes, account management, or technical support? Send us a message below.
            </p>
          </div>

          {/* Email Support Banner */}
          <div className="bg-surface-soft p-5 rounded-lg border border-hairline flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 shadow-xs">
            <div className="flex items-center gap-3.5">
              <div className="h-10 w-10 rounded-full bg-canvas flex items-center justify-center text-ink shrink-0 shadow-xs border border-hairline">
                <Mail className="h-5 w-5 text-accent" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-ink">Direct Email Support</h3>
                <a
                  href="mailto:contact@theqrcod.com"
                  className="text-sm font-medium text-accent hover:underline"
                >
                  contact@theqrcod.com
                </a>
              </div>
            </div>
            <span className="text-xs text-mute bg-canvas px-3 py-1.5 rounded-full border border-hairline self-start sm:self-auto font-medium">
              24/7 Response Time
            </span>
          </div>

          {/* Contact Form */}
          <div className="bg-canvas p-6 sm:p-8 rounded-lg border border-hairline shadow-card">
            <h2 className="text-lg font-semibold text-ink mb-6">Send Us a Message</h2>
            <form className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input label="Your Name" placeholder="e.g. John Doe" required />
                <Input label="Email Address" type="email" placeholder="john@example.com" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-ink mb-1.5">Subject</label>
                <select className="w-full h-11 px-3 rounded-md bg-canvas border border-hairline text-sm text-ink focus:outline-none focus:ring-2 focus:ring-accent">
                  <option>General Inquiry</option>
                  <option>Technical Support</option>
                  <option>Billing &amp; Subscription</option>
                  <option>Feature Request</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-ink mb-1.5">Your Message</label>
                <textarea
                  rows={5}
                  className="w-full p-3 rounded-md bg-canvas border border-hairline text-sm text-ink focus:outline-none focus:ring-2 focus:ring-accent"
                  placeholder="How can we help you?"
                  required
                />
              </div>
              <Button type="submit" size="lg" className="w-full">
                <Send className="h-4 w-4 mr-2" />
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
