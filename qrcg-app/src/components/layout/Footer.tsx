import Link from "next/link";
import { QrCode } from "lucide-react";

const footerLinks = {
  Product: [
    { href: "/generator", label: "QR Generator" },
    { href: "/pricing", label: "Pricing" },
    { href: "/dashboard", label: "Dashboard" },
  ],
  Resources: [
    { href: "/what-is-qr-code", label: "What Is a QR Code?" },
    { href: "/static-vs-dynamic-qr-code", label: "Static vs Dynamic" },
    { href: "/how-to-create-qr-code", label: "How to Create" },
  ],
  Company: [
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-surface-dark text-on-dark-soft" role="contentinfo">
      <div className="container-main py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link
              href="/"
              className="flex items-center gap-2 text-on-dark font-semibold text-lg tracking-tight mb-4"
            >
              <QrCode className="h-6 w-6" aria-hidden="true" />
              TheQRCod
            </Link>
            <p className="text-sm text-on-dark-soft leading-relaxed max-w-xs">
              Free static QR codes. Powerful dynamic QR codes with analytics.
              Built for simplicity.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-sm font-semibold text-on-dark mb-4">
                {category}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-on-dark-soft hover:text-on-dark transition-colors duration-150"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <p className="text-sm text-on-dark-soft text-center">
            © {new Date().getFullYear()} The QR Code Generator. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
