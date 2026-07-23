import Link from "next/link";
import { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Button from "@/components/ui/Button";
import { QrCode, Home, ArrowLeft, PlusCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "404 - Page Not Found | The QR Code Generator",
  description: "The page you are looking for does not exist on The QR Code Generator.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <>
      <Navbar />

      <main className="bg-canvas min-h-[70vh] flex items-center justify-center py-16 px-4">
        <div className="text-center max-w-lg mx-auto">
          {/* 404 Badge & Icon */}
          <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-accent/10 text-accent mb-6 border border-accent/20">
            <QrCode className="h-10 w-10" />
          </div>

          <p className="text-xs font-semibold uppercase tracking-wider text-accent mb-2">
            Error 404
          </p>
          <h1 className="display-heading text-4xl md:text-5xl font-semibold text-ink leading-tight mb-4">
            Page Not Found
          </h1>
          <p className="text-base text-body-mid leading-relaxed mb-8">
            Sorry, the page you are looking for doesn&apos;t exist, has been removed, or the link may be broken.
          </p>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/" className="w-full sm:w-auto">
              <Button size="lg" className="w-full">
                <Home className="h-4 w-4 mr-2" />
                Return to Home
              </Button>
            </Link>
            <Link href="/dashboard" className="w-full sm:w-auto">
              <Button variant="secondary" size="lg" className="w-full">
                <PlusCircle className="h-4 w-4 mr-2" />
                My Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
