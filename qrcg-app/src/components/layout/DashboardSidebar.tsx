"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  QrCode,
  LayoutDashboard,
  PlusCircle,
  CreditCard,
  LogOut,
  User,
  Receipt,
  Zap,
} from "lucide-react";

export default function DashboardSidebar() {
  const pathname = usePathname();
  const [plan, setPlan] = useState<string>("free");

  // Fetch the real plan from the database on every mount
  useEffect(() => {
    fetch("/api/user/me")
      .then((res) => res.json())
      .then((data) => {
        if (data?.plan) setPlan(data.plan);
      })
      .catch(() => {});
  }, [pathname]); // re-fetch when navigating (e.g. after upgrade redirect)

  const isPro = plan === "pro";

  const navItems = [
    { href: "/dashboard", label: "My QR Codes", icon: LayoutDashboard },
    { href: "/dashboard/create", label: "Create New", icon: PlusCircle },
    ...(isPro
      ? [
          { href: "/dashboard/account", label: "Account", icon: User },
          { href: "/dashboard/billing", label: "Billing", icon: Receipt },
        ]
      : [
          { href: "/pricing", label: "Upgrade to Pro", icon: Zap },
        ]),
  ];

  return (
    <aside className="w-64 bg-canvas border-r border-hairline h-screen sticky top-0 flex-col p-4 hidden lg:flex overflow-y-auto">
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
  );
}
