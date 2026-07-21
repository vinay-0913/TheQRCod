"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";
import ScrollLink from "@/components/ui/ScrollLink";

function isIndiaTimezone(): boolean {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    return tz === "Asia/Calcutta" || tz === "Asia/Kolkata";
  } catch { return true; }
}

const FREE_FEATURES = [
  "1 dynamic QR code",
  "7-day scan analytics",
  "Unlimited static QR codes",
  "Full customization (colors, shapes, logo)",
  "Download PNG & SVG",
  "All data types (URL, WiFi, vCard...)",
  "No watermarks",
];

const PRO_FEATURES = [
  "Everything in Free",
  "5 dynamic QR codes (scalable to 50)",
  "Scan analytics dashboard",
  "Edit destination URL anytime",
  "Device & location tracking",
  "Priority support",
];

export default function HomepagePricingCards() {
  const [currency, setCurrency] = useState<"inr" | "usd">("inr");

  useEffect(() => {
    setCurrency(isIndiaTimezone() ? "inr" : "usd");
  }, []);

  const symbol = currency === "inr" ? "₹" : "$";
  const proPrice = currency === "inr" ? "199" : "2.99";

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
      {/* Free tier */}
      <div className="bg-canvas rounded-lg border border-hairline p-8 shadow-card flex flex-col">
        <h3 className="text-lg font-semibold text-ink">Free</h3>
        <div className="mt-4 flex items-baseline gap-1">
          <span className="display-heading text-4xl font-semibold text-ink">{symbol}0</span>
          <span className="text-body-mid">/forever</span>
        </div>
        <p className="mt-4 text-sm text-body">
          Static QR codes & 1 basic dynamic QR code.
        </p>
        <ul className="mt-8 space-y-3 flex-1">
          {FREE_FEATURES.map((f) => (
            <li key={f} className="flex items-start gap-3 text-sm text-body">
              <Check className="h-4 w-4 text-success shrink-0 mt-0.5" aria-hidden="true" />
              <span>{f}</span>
            </li>
          ))}
        </ul>
        <div className="mt-8">
          <ScrollLink href="/">
            <Button variant="secondary" className="w-full">
              Get Started Free
            </Button>
          </ScrollLink>
        </div>
      </div>

      {/* Pro tier — featured dark */}
      <div className="bg-surface-dark text-on-dark rounded-lg p-8 relative flex flex-col shadow-card">
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-surface-dark-elevated text-on-dark text-xs font-semibold border border-white/10">
          Most Popular
        </div>
        <h3 className="text-lg font-semibold text-white">Pro</h3>
        <div className="mt-4 flex items-baseline gap-1">
          <span className="display-heading text-4xl font-semibold text-white">
            {symbol}{proPrice}
          </span>
          <span className="text-on-dark-soft">/month</span>
        </div>
        <p className="mt-4 text-sm text-on-dark-soft">
          Dynamic QR codes with full analytics.
        </p>
        <ul className="mt-8 space-y-3 flex-1">
          {PRO_FEATURES.map((f) => (
            <li key={f} className="flex items-start gap-3 text-sm text-white/80">
              <Check className="h-4 w-4 text-badge-emerald shrink-0 mt-0.5" aria-hidden="true" />
              <span>{f}</span>
            </li>
          ))}
        </ul>
        <div className="mt-8">
          <Link href="/signup">
            <Button
              variant="secondary"
              className="w-full bg-white text-ink hover:bg-white/90 border-none"
            >
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
