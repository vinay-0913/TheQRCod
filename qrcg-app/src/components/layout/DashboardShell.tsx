"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  QrCode,
  LayoutDashboard,
  PlusCircle,
  CreditCard,
  LogOut,
  User,
  Zap,
  Menu,
  X,
} from "lucide-react";

export default function DashboardShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [plan, setPlan] = useState<string>("free");

  // Fetch user plan
  useEffect(() => {
    fetch("/api/user/me")
      .then((res) => res.json())
      .then((data) => {
        if (data?.plan) setPlan(data.plan);
      })
      .catch(() => {});
  }, [pathname]);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const isPro = plan === "pro";

  const navItems = [
    { href: "/dashboard", label: "My QR Codes", icon: LayoutDashboard },
    { href: "/dashboard/create", label: "Create New", icon: PlusCircle },
    ...(isPro
      ? [
          { href: "/dashboard/account", label: "Account", icon: User },
          { href: "/dashboard/billing", label: "Billing", icon: CreditCard },
        ]
      : [
          { href: "/pricing", label: "Upgrade to Pro", icon: Zap },
        ]),
  ];

  return (
    <div className="min-h-screen bg-canvas-alt flex flex-col lg:flex-row">
      {/* ─── MOBILE TOP HEADER (< lg) ─── */}
      <header className="lg:hidden sticky top-0 z-40 bg-canvas/95 backdrop-blur-sm border-b border-hairline px-4 h-16 flex items-center justify-between shadow-xs">
        <Link href="/" className="flex items-center gap-2 text-ink font-semibold text-base tracking-tight">
          <QrCode className="h-6 w-6 text-ink" aria-hidden="true" />
          <span>TheQRCod</span>
        </Link>

        <div className="flex items-center gap-3">
          <span
            className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full ${
              isPro
                ? "bg-amber-50 text-amber-700 border border-amber-200"
                : "bg-surface-card text-body-mid border border-hairline"
            }`}
          >
            <CreditCard className="h-3 w-3" aria-hidden="true" />
            {isPro ? "Pro" : "Free"}
          </span>

          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 text-ink hover:bg-surface-soft rounded-md transition-colors cursor-pointer"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </header>

      {/* ─── MOBILE DRAWER MENU OVERLAY (< lg) ─── */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-ink/50 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer content */}
          <div className="relative flex-1 max-w-xs w-full bg-canvas h-full flex flex-col p-5 shadow-2xl z-10 animate-in slide-in-from-left duration-200">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-hairline">
              <Link href="/" className="flex items-center gap-2 text-ink font-semibold text-lg" onClick={() => setMobileOpen(false)}>
                <QrCode className="h-6 w-6 text-ink" />
                TheQRCod
              </Link>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="p-1.5 rounded-md text-body-mid hover:text-ink hover:bg-surface-soft transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Plan Badge */}
            <div className="mb-4">
              <span
                className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${
                  isPro
                    ? "bg-amber-50 text-amber-700 border border-amber-200"
                    : "bg-surface-card text-body-mid border border-hairline"
                }`}
              >
                <CreditCard className="h-3.5 w-3.5" aria-hidden="true" />
                {isPro ? "Pro Plan" : "Free Plan"}
              </span>
            </div>

            {/* Navigation links */}
            <nav className="space-y-1.5 flex-1" aria-label="Mobile navigation">
              {navItems.map(({ href, label, icon: Icon }) => {
                const isActive =
                  href === "/dashboard"
                    ? pathname === "/dashboard"
                    : pathname.startsWith(href);

                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setMobileOpen(false)}
                    className={`
                      flex items-center gap-3 px-3.5 py-3 rounded-md text-sm font-medium
                      transition-colors duration-150
                      ${isActive
                        ? "bg-surface-card text-ink shadow-sm font-semibold"
                        : "text-body-mid hover:text-ink hover:bg-surface-soft"
                      }
                    `}
                  >
                    <Icon className="h-5 w-5 shrink-0" aria-hidden="true" />
                    {label}
                  </Link>
                );
              })}
            </nav>

            {/* Sign out */}
            <div className="pt-4 border-t border-hairline mt-auto">
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  signOut({ callbackUrl: "/" });
                }}
                className="flex items-center gap-3 px-3.5 py-3 rounded-md text-sm font-medium text-body-mid hover:text-error hover:bg-error-light transition-colors duration-150 w-full cursor-pointer"
              >
                <LogOut className="h-5 w-5 shrink-0" aria-hidden="true" />
                Sign out
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── DESKTOP SIDEBAR (≥ lg) ─── */}
      <aside className="w-64 bg-canvas border-r border-hairline h-screen sticky top-0 flex-col p-4 hidden lg:flex overflow-y-auto shrink-0">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-ink font-semibold text-lg tracking-tight mb-8 px-3"
        >
          <QrCode className="h-6 w-6 text-ink" aria-hidden="true" />
          TheQRCod
        </Link>

        {/* Plan badge */}
        <div className="mb-4 px-3">
          <span
            className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${
              isPro
                ? "bg-amber-50 text-amber-700 border border-amber-200"
                : "bg-surface-card text-body-mid border border-hairline"
            }`}
          >
            <CreditCard className="h-3 w-3" aria-hidden="true" />
            {isPro ? "Pro Plan" : "Free Plan"}
          </span>
        </div>

        {/* Nav */}
        <nav className="space-y-1 flex-1" aria-label="Dashboard navigation">
          {navItems.map(({ href, label, icon: Icon }) => {
            const isActive =
              href === "/dashboard"
                ? pathname === "/dashboard"
                : pathname.startsWith(href);

            return (
              <Link
                key={href}
                href={href}
                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium
                  transition-colors duration-150
                  ${isActive
                    ? "bg-surface-card text-ink shadow-sm"
                    : "text-body-mid hover:text-ink hover:bg-surface-soft"
                  }
                `}
              >
                <Icon className="h-5 w-5" aria-hidden="true" />
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Sign out */}
        <div className="mt-auto">
          <button
            type="button"
            onClick={() => signOut({ callbackUrl: "/" })}
            className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium text-body-mid hover:text-error hover:bg-error-light transition-colors duration-150 w-full cursor-pointer"
          >
            <LogOut className="h-5 w-5" aria-hidden="true" />
            Sign out
          </button>
        </div>
      </aside>

      {/* ─── MAIN CONTENT ─── */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0">{children}</main>
    </div>
  );
}
