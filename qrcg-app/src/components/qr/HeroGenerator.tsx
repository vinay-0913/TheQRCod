"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { Download, ArrowRight, BarChart3, Link2, RefreshCw } from "lucide-react";

function useQR(data: string) {
  const containerRef = useRef<HTMLDivElement>(null);
  const qrRef = useRef<unknown>(null);

  useEffect(() => {
    let cancelled = false;

    const render = async () => {
      const QRCodeStyling = (await import("qr-code-styling")).default;
      if (cancelled) return;

      const options = {
        width: 240,
        height: 240,
        data: data || "https://theqrcod.com",
        margin: 10,
        type: "svg" as const,
        dotsOptions: { color: "#111111", type: "rounded" as const },
        cornersSquareOptions: { color: "#111111", type: "extra-rounded" as const },
        cornersDotOptions: { color: "#111111", type: "dot" as const },
        backgroundOptions: { color: "#ffffff" },
      };

      if (qrRef.current) {
        (qrRef.current as { update: (o: object) => void }).update(options);
      } else {
        const qr = new QRCodeStyling(options);
        qrRef.current = qr;
        if (containerRef.current) {
          containerRef.current.innerHTML = "";
          qr.append(containerRef.current);
        }
      }
    };

    render();
    return () => { cancelled = true; };
  }, [data]);

  const download = useCallback(async (fmt: "png" | "svg") => {
    if (!qrRef.current) return;
    const qr = qrRef.current as {
      update: (o: object) => void;
      download: (o: { extension: string; name: string }) => void;
    };
    if (fmt === "png") {
      qr.update({ width: 1024, height: 1024 });
      await new Promise((r) => setTimeout(r, 120));
      qr.download({ extension: "png", name: "qr-code" });
      qr.update({ width: 240, height: 240 });
    } else {
      qr.download({ extension: "svg", name: "qr-code" });
    }
  }, []);

  return { containerRef, download };
}

export default function HeroGenerator() {
  const [url, setUrl] = useState("https://");
  const { containerRef, download } = useQR(url);

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* ─── Static QR Hero ─── */}
      <div className="bg-canvas border border-hairline rounded-xl shadow-card overflow-hidden">
        {/* Header strip */}
        <div className="border-b border-hairline px-6 py-4 flex items-center gap-3">
          <div className="flex gap-1.5">
            <span className="h-3 w-3 rounded-full bg-red-400" />
            <span className="h-3 w-3 rounded-full bg-yellow-400" />
            <span className="h-3 w-3 rounded-full bg-green-400" />
          </div>
          <span className="text-xs text-body-mid font-mono">Static QR Code Generator — Free, no account needed</span>
        </div>

        <div className="p-6 md:p-8 flex flex-col md:flex-row gap-8 items-center">
          {/* Left: input + actions */}
          <div className="flex-1 w-full space-y-5">
            <div>
              <label htmlFor="hero-url" className="block text-sm font-semibold text-ink mb-2">
                Enter your URL
              </label>
              <div className="flex gap-2">
                <input
                  id="hero-url"
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://yourwebsite.com"
                  className="flex-1 px-4 py-2.5 rounded-md border border-hairline bg-canvas text-ink text-sm focus:outline-none focus:ring-2 focus:ring-ink/20 focus:border-ink transition-colors"
                />
              </div>
              <p className="text-xs text-body-mid mt-1.5">QR updates live as you type</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <button
                type="button"
                onClick={() => download("png")}
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-md bg-ink text-white text-sm font-medium hover:bg-ink/90 transition-colors cursor-pointer"
              >
                <Download className="h-4 w-4" />
                Download PNG
              </button>
              <button
                type="button"
                onClick={() => download("svg")}
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-md border border-hairline bg-canvas text-ink text-sm font-medium hover:bg-surface-card transition-colors cursor-pointer"
              >
                <Download className="h-4 w-4" />
                Download SVG
              </button>
            </div>

            <Link
              href="/generator"
              className="inline-flex items-center gap-1.5 text-sm text-body-mid hover:text-ink transition-colors group"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              Customize colors, shape, logo
              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          {/* Right: live QR preview */}
          <div className="shrink-0 flex flex-col items-center gap-3">
            <div className="p-4 bg-white border border-hairline rounded-lg shadow-sm">
              <div
                ref={containerRef}
                className="[&>svg]:w-[200px] [&>svg]:h-[200px] [&>canvas]:w-[200px] [&>canvas]:h-[200px]"
              />
            </div>
            <p className="text-xs text-body-mid">Scan to test</p>
          </div>
        </div>
      </div>

      {/* ─── Dynamic QR teaser ─── */}
      <div className="mt-4 rounded-xl border border-hairline bg-surface-dark text-white overflow-hidden">
        <div className="px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex gap-4 flex-1">
            <div className="h-10 w-10 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
              <BarChart3 className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Want dynamic QR codes with analytics?</p>
              <p className="text-xs text-white/60 mt-0.5">
                Edit the destination URL anytime · Track scans, devices, locations · No reprinting
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <div className="flex items-center gap-1.5 text-xs text-white/50">
              <Link2 className="h-3.5 w-3.5" />
              From ₹199/mo
            </div>
            <Link
              href="/pricing"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md bg-white text-ink text-sm font-medium hover:bg-white/90 transition-colors"
            >
              See Plans
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
