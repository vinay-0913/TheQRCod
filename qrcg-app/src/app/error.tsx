"use client";

import { useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Button from "@/components/ui/Button";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application runtime error:", error);
  }, [error]);

  return (
    <>
      <Navbar />

      <main className="bg-canvas min-h-[70vh] flex items-center justify-center py-16 px-4">
        <div className="text-center max-w-lg mx-auto">
          {/* Error Icon */}
          <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-error-light text-error mb-6 border border-error/20">
            <AlertTriangle className="h-10 w-10" />
          </div>

          <p className="text-xs font-semibold uppercase tracking-wider text-error mb-2">
            Error 500
          </p>
          <h1 className="display-heading text-3xl md:text-4xl font-semibold text-ink leading-tight mb-4">
            Something Went Wrong
          </h1>
          <p className="text-base text-body-mid leading-relaxed mb-8">
            An unhandled application error occurred. Don&apos;t worry, our system has logged the issue.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button size="lg" onClick={() => reset()} className="w-full sm:w-auto">
              <RefreshCw className="h-4 w-4 mr-2" />
              Try Again
            </Button>
            <Link href="/" className="w-full sm:w-auto">
              <Button variant="secondary" size="lg" className="w-full">
                <Home className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
