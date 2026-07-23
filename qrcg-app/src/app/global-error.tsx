"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global root layout error:", error);
  }, [error]);

  return (
    <html lang="en">
      <body className="min-h-screen bg-canvas text-ink antialiased flex items-center justify-center p-4">
        <div className="text-center max-w-md mx-auto bg-surface-card p-8 rounded-lg border border-hairline shadow-lg">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-error-light text-error mb-4">
            <AlertTriangle className="h-8 w-8" />
          </div>

          <h1 className="text-2xl font-semibold text-ink mb-2">
            Critical System Error
          </h1>
          <p className="text-sm text-body-mid mb-6">
            A critical error interrupted the system loading. Please click below to refresh and retry.
          </p>

          <button
            type="button"
            onClick={() => reset()}
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-md bg-ink text-white font-medium text-sm hover:opacity-90 transition-opacity cursor-pointer w-full"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Reload Application
          </button>
        </div>
      </body>
    </html>
  );
}
