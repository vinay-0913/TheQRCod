"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  QrCode,
  LayoutDashboard,
  PlusCircle,
  CreditCard,
  LogOut,
} from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "My QR Codes", icon: LayoutDashboard },
  { href: "/dashboard/create", label: "Create New", icon: PlusCircle },
  { href: "/pricing", label: "Upgrade", icon: CreditCard },
];

export default function DashboardSidebar() {
  const pathname = usePathname();

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
