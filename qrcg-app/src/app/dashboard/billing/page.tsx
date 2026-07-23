"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CreditCard, Calendar, CheckCircle2, ArrowRight, Receipt } from "lucide-react";

interface UserInfo {
  name: string;
  email: string;
  plan: string;
  qrLimit?: number;
  planExpiresAt?: string;
  razorpayPaymentId?: string;
  createdAt: string;
}

export default function BillingPage() {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/user/me")
      .then((r) => r.json())
      .then((data) => { setUser(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin h-8 w-8 border-2 border-accent border-t-transparent rounded-full" />
      </div>
    );
  }

  const isPro = user?.plan === "pro";

  const expiresDate = user?.planExpiresAt
    ? new Date(user.planExpiresAt).toLocaleDateString("en-IN", {
        year: "numeric", month: "long", day: "numeric",
      })
    : null;

  const daysLeft = user?.planExpiresAt
    ? Math.max(
        0,
        Math.ceil(
          (new Date(user.planExpiresAt).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
        )
      )
    : null;

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-semibold text-ink mb-2">Billing</h1>
      <p className="text-sm text-body-mid mb-8">Manage your subscription and payment details.</p>

      {/* Current plan card */}
      <div className="bg-canvas rounded-md border border-hairline p-4 sm:p-6 mb-4">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs text-body-mid uppercase tracking-wide font-medium mb-1">Current Plan</p>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-semibold text-ink">
                {isPro ? "Pro" : "Free"}
              </h2>
              {isPro && (
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                  Active
                </span>
              )}
            </div>
          </div>
          <div
            className={`h-10 w-10 sm:h-12 sm:w-12 rounded-full flex items-center justify-center ${
              isPro ? "bg-amber-50" : "bg-surface-card"
            }`}
          >
            <CreditCard
              className={`h-5 w-5 ${isPro ? "text-amber-600" : "text-mute"}`}
              aria-hidden="true"
            />
          </div>
        </div>

        {isPro && expiresDate && (
          <div className="mt-4 pt-4 border-t border-hairline grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <p className="text-xs text-body-mid mb-1">Renews / Expires</p>
              <p className="text-sm font-medium text-ink flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 text-mute" aria-hidden="true" />
                {expiresDate}
              </p>
            </div>
            <div>
              <p className="text-xs text-body-mid mb-1">Days Remaining</p>
              <p
                className={`text-sm font-medium ${
                  (daysLeft ?? 0) <= 7 ? "text-error" : "text-ink"
                }`}
              >
                {daysLeft} day{daysLeft !== 1 ? "s" : ""}
                {(daysLeft ?? 0) <= 7 && (
                  <span className="ml-1 text-xs text-error">(expiring soon)</span>
                )}
              </p>
            </div>
            <div>
              <p className="text-xs text-body-mid mb-1">Dynamic QR Codes</p>
              <p className="text-sm font-medium text-ink">
                {user?.qrLimit ?? 0} included
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Payment record */}
      {isPro && user?.razorpayPaymentId && (
        <div className="bg-canvas rounded-md border border-hairline p-6 mb-4">
          <p className="text-xs text-body-mid uppercase tracking-wide font-medium mb-4">
            Payment History
          </p>
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-green-50 flex items-center justify-center shrink-0">
              <CheckCircle2 className="h-4 w-4 text-success" aria-hidden="true" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-ink">Pro Plan — Razorpay</p>
              <p className="text-xs text-mute font-mono truncate">{user.razorpayPaymentId}</p>
            </div>
            <span className="text-xs text-success font-medium">Paid</span>
          </div>
        </div>
      )}

      {/* Invoices note */}
      {isPro && (
        <div className="bg-canvas rounded-md border border-hairline p-6 mb-4 flex items-start gap-3">
          <Receipt className="h-4 w-4 text-mute shrink-0 mt-0.5" aria-hidden="true" />
          <div>
            <p className="text-sm font-medium text-ink">Invoices &amp; Receipts</p>
            <p className="text-sm text-body-mid mt-0.5">
              Download invoices from your Razorpay payment confirmation email,
              or contact support for a copy.
            </p>
          </div>
        </div>
      )}

      {/* Free plan — upgrade CTA */}
      {!isPro && (
        <div className="bg-surface-dark rounded-md p-6">
          <h2 className="text-base font-semibold text-white mb-1">
            Upgrade to Pro
          </h2>
          <p className="text-sm text-white/60 mb-4">
            Get dynamic QR codes, scan analytics, editable destinations and more.
          </p>
          <Link
            href="/pricing"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-sm bg-white text-ink text-sm font-medium hover:bg-white/90 transition-colors"
          >
            View Plans
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      )}

      {/* Pro — renew note */}
      {isPro && (
        <p className="text-xs text-mute mt-4">
          Need to renew or switch plans?{" "}
          <Link href="/pricing" className="underline hover:text-ink">
            Visit pricing page
          </Link>{" "}
          or contact support.
        </p>
      )}
    </div>
  );
}
