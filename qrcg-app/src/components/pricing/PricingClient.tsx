"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Check, ArrowRight, Loader2, Plus, Minus, Zap, QrCode } from "lucide-react";

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => RazorpayInstance;
  }
}

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: RazorpayResponse) => void;
  prefill?: { name?: string; email?: string };
  theme?: { color?: string };
  modal?: { ondismiss?: () => void };
}
interface RazorpayInstance { open(): void; on(event: string, handler: () => void): void; }
interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

interface PricingClientProps {
  userEmail?: string;
  userName?: string;
  isLoggedIn: boolean;
  currentPlan?: string;
  currentQrLimit?: number;
}

// Pricing constants
const BASE_QR = 5;
const MIN_QR = 5;
const STEP_QR = 5;
const MAX_QR = 50;
const BASE_INR = 199;
const PER_STEP_INR = 50;
const BASE_USD = 2.99;
const PER_STEP_USD = 0.99;

function calcPrice(qrLimit: number, currency: "inr" | "usd", billing: "monthly" | "yearly") {
  const steps = Math.max(0, Math.floor((qrLimit - BASE_QR) / STEP_QR));
  const monthly = currency === "inr"
    ? BASE_INR + steps * PER_STEP_INR
    : parseFloat((BASE_USD + steps * PER_STEP_USD).toFixed(2));
  const yearly = currency === "inr"
    ? monthly * 10
    : parseFloat((monthly * 10).toFixed(2));
  return billing === "yearly" ? yearly : monthly;
}

function isIndiaTimezone(): boolean {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    return tz === "Asia/Calcutta" || tz === "Asia/Kolkata";
  } catch { return true; }
}

function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (document.getElementById("razorpay-script")) { resolve(true); return; }
    const script = document.createElement("script");
    script.id = "razorpay-script";
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
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

export default function PricingClient({
  userEmail,
  userName,
  isLoggedIn,
  currentPlan,
  currentQrLimit = 0,
}: PricingClientProps) {
  const router = useRouter();
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");
  const [currency, setCurrency] = useState<"inr" | "usd">("inr");
  const [qrLimit, setQrLimit] = useState(BASE_QR);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => { setCurrency(isIndiaTimezone() ? "inr" : "usd"); }, []);

  const isPro = currentPlan === "pro";
  const symbol = currency === "inr" ? "Rs." : "$";
  const monthlyPrice = calcPrice(qrLimit, currency, "monthly");
  const displayPrice = calcPrice(qrLimit, currency, billing);
  const yearlyTotal = calcPrice(qrLimit, currency, "yearly");
  const yearlyMonthly = currency === "inr"
    ? Math.round(yearlyTotal / 12)
    : parseFloat((yearlyTotal / 12).toFixed(2));
  const savedAmount = currency === "inr"
    ? Math.round(monthlyPrice * 12 - yearlyTotal)
    : parseFloat((monthlyPrice * 12 - yearlyTotal).toFixed(2));

  const adjustQr = (delta: number) => {
    setQrLimit((prev) => Math.max(MIN_QR, Math.min(MAX_QR, prev + delta)));
  };

  const handleUpgrade = useCallback(async () => {
    if (!isLoggedIn) { router.push("/signup?redirect=/pricing"); return; }
    setError("");
    setLoading(true);

    try {
      const loaded = await loadRazorpayScript();
      if (!loaded) { setError("Failed to load payment gateway. Please try again."); setLoading(false); return; }

      const orderRes = await fetch("/api/payment/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: "pro", billing, qrLimit }),
      });

      if (!orderRes.ok) {
        const data = await orderRes.json();
        setError(data.error || "Could not create order."); setLoading(false); return;
      }

      const { orderId, amount, currency: orderCurrency, keyId } = await orderRes.json();

      const rzp = new window.Razorpay({
        key: keyId || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
        amount,
        currency: orderCurrency,
        name: "TheQRCod",
        description: `Pro Plan ${qrLimit} QR codes - ${billing}`,
        order_id: orderId,
        prefill: { name: userName, email: userEmail },
        theme: { color: "#111111" },
        handler: async (response: RazorpayResponse) => {
          const verifyRes = await fetch("/api/payment/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              plan: "pro",
              billing,
              qrLimit,
            }),
          });
          if (verifyRes.ok) {
            router.push("/dashboard?upgraded=true");
          } else {
            const data = await verifyRes.json();
            setError(data.error || "Payment verification failed. Contact support.");
          }
          setLoading(false);
        },
        modal: { ondismiss: () => setLoading(false) },
      });
      rzp.on("payment.failed", () => { setError("Payment failed. Please try again."); setLoading(false); });
      rzp.open();
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  }, [isLoggedIn, currentPlan, billing, qrLimit, userEmail, userName, router]);

  return (
    <div className="space-y-8">

      {/* Billing toggle */}
      <div className="flex items-center justify-center gap-3">
        {(["monthly", "yearly"] as const).map((b) => (
          <button
            key={b}
            type="button"
            onClick={() => setBilling(b)}
            className={`px-5 py-2 rounded-sm text-sm font-medium border transition-colors cursor-pointer flex items-center gap-2 ${
              billing === b
                ? "bg-primary text-white border-primary"
                : "bg-canvas text-body border-hairline hover:border-hairline-strong"
            }`}
          >
            {b === "monthly" ? "Monthly" : "Yearly"}
            {b === "yearly" && (
              <span className="text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full font-semibold">
                2 months free
              </span>
            )}
          </button>
        ))}
      </div>

      {error && (
        <div className="max-w-xl mx-auto p-3 rounded-md bg-red-50 text-red-700 text-sm text-center">
          {error}
        </div>
      )}

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">

        {/* Free */}
        <div className="rounded-lg p-8 flex flex-col bg-canvas border border-hairline shadow-card">
          <h2 className="text-lg font-semibold text-ink">Free</h2>
          <div className="mt-4 flex items-baseline gap-1">
            <span className="display-heading text-4xl font-semibold text-ink">{symbol}0</span>
            <span className="text-body-mid">/forever</span>
          </div>
          <p className="mt-4 text-sm text-body">Static QR codes, forever free.</p>
          <ul className="mt-8 space-y-3 flex-1">
            {FREE_FEATURES.map((f) => (
              <li key={f} className="flex items-start gap-3 text-sm text-body">
                <Check className="h-4 w-4 shrink-0 mt-0.5 text-success" />
                {f}
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <a
              href="/"
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-sm border border-hairline bg-canvas text-ink text-sm font-medium hover:bg-surface-card transition-colors"
            >
              Get Started Free <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Pro — dynamic */}
        <div className="rounded-lg p-8 flex flex-col relative bg-surface-dark text-white shadow-card">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-surface-dark-elevated text-white text-xs font-semibold border border-white/10">
            Most Popular
          </div>
          <h2 className="text-lg font-semibold text-white">Pro</h2>

          {/* Price display */}
          <div className="mt-4 flex items-baseline gap-1">
            <span className="display-heading text-4xl font-semibold text-white">
              {symbol}{billing === "yearly" ? yearlyMonthly : displayPrice}
            </span>
            <span className="text-white/60">/month</span>
          </div>
          {billing === "yearly" && (
            <p className="text-xs text-green-400 mt-1">
              {symbol}{yearlyTotal} billed yearly &middot; Save {symbol}{savedAmount}
            </p>
          )}

          {/* QR limit stepper */}
          <div className="mt-6 bg-white/5 border border-white/10 rounded-md p-4">
            <p className="text-xs text-white/60 mb-3 flex items-center gap-1.5">
              <QrCode className="h-3.5 w-3.5" />
              Dynamic QR Codes included
            </p>
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => adjustQr(-STEP_QR)}
                disabled={qrLimit <= MIN_QR}
                className="h-8 w-8 rounded-md border border-white/20 bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Decrease QR codes"
              >
                <Minus className="h-4 w-4 text-white" />
              </button>

              <div className="text-center">
                <span className="text-3xl font-bold text-white">{qrLimit}</span>
                <p className="text-xs text-white/50 mt-0.5">QR codes</p>
              </div>

              <button
                type="button"
                onClick={() => adjustQr(STEP_QR)}
                disabled={qrLimit >= MAX_QR}
                className="h-8 w-8 rounded-md border border-white/20 bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Increase QR codes"
              >
                <Plus className="h-4 w-4 text-white" />
              </button>
            </div>
            {qrLimit > BASE_QR && (
              <p className="text-xs text-white/40 text-center mt-2">
                +{symbol}{currency === "inr" ? Math.floor((qrLimit - BASE_QR) / STEP_QR) * PER_STEP_INR : parseFloat((Math.floor((qrLimit - BASE_QR) / STEP_QR) * PER_STEP_USD).toFixed(2))}/mo for extra {qrLimit - BASE_QR} QR{qrLimit - BASE_QR > 1 ? "s" : ""}
              </p>
            )}
          </div>

          {/* Features */}
          <ul className="mt-6 space-y-2.5 flex-1">
            {[
              "Everything in Free",
              `${qrLimit} dynamic QR codes`,
              "Scan analytics dashboard",
              "Edit destination URL anytime",
              "Device & location tracking",
              "Priority support",
            ].map((f) => (
              <li key={f} className="flex items-start gap-3 text-sm text-white/80">
                <Check className="h-4 w-4 shrink-0 mt-0.5 text-green-400" />
                {f}
              </li>
            ))}
          </ul>

          <div className="mt-6">
            {isPro && currentQrLimit >= qrLimit ? (
              <div className="w-full text-center py-2.5 rounded-sm bg-white/10 text-white text-sm font-medium">
                Current Plan ({currentQrLimit} QR codes)
              </div>
            ) : isPro && qrLimit > currentQrLimit ? (
              <button
                type="button"
                onClick={handleUpgrade}
                disabled={loading}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-sm bg-amber-400 text-black text-sm font-semibold hover:bg-amber-300 transition-colors disabled:opacity-60 cursor-pointer"
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Zap className="h-4 w-4" />}
                {loading ? "Processing..." : `Upgrade to ${qrLimit} QR codes`}
              </button>
            ) : (
              <button
                type="button"
                onClick={handleUpgrade}
                disabled={loading}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-sm bg-white text-ink text-sm font-medium hover:bg-white/90 transition-colors disabled:opacity-60 cursor-pointer"
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                {loading ? "Processing..." : isLoggedIn ? `Get ${qrLimit} QR codes` : "Get Started"}
                {!loading && <ArrowRight className="h-4 w-4" />}
              </button>
            )}
          </div>

          <p className="text-xs text-white/30 text-center mt-3">
            {currency === "inr" ? "Billed in INR via Razorpay" : "Billed in INR equivalent via Razorpay"}
          </p>
        </div>
      </div>

      {/* Upgrade prompt for pro users at limit */}
      {isPro && (
        <div className="max-w-3xl mx-auto p-4 rounded-md bg-amber-50 border border-amber-200 flex items-center gap-3">
          <Zap className="h-5 w-5 text-amber-600 shrink-0" />
          <div className="flex-1">
            <p className="text-sm font-medium text-amber-900">
              You have {currentQrLimit} dynamic QR code{currentQrLimit !== 1 ? "s" : ""} on your current plan.
            </p>
            <p className="text-xs text-amber-700 mt-0.5">
              Use the + button above to add more and upgrade your plan.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
