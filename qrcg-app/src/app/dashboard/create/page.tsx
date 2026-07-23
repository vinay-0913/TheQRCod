"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import QRCustomizer from "@/components/qr/QRCustomizer";
import { QRConfig } from "@/components/qr/StaticQRGenerator";
import { ArrowLeft, QrCode, X } from "lucide-react";
import Link from "next/link";
import DataTypeSelector from "@/components/qr/DataTypeSelector";
import QRPreview from "@/components/qr/QRPreview";

const defaultDesign: QRConfig = {
  data: "",
  dataType: "url",
  width: 300,
  margin: 10,
  dotsStyle: "rounded",
  dotsColor: "#080808",
  cornersSquareStyle: "extra-rounded",
  cornersSquareColor: "#080808",
  cornersDotStyle: "dot",
  cornersDotColor: "#080808",
  backgroundColor: "#ffffff",
  backgroundRoundness: 0,
  transparentBackground: false,
  logoFile: null,
  logoSize: 0.4,
};

export default function CreateDynamicQRPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [targetUrl, setTargetUrl] = useState("");
  const [design, setDesign] = useState<QRConfig>(defaultDesign);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [mobilePreviewOpen, setMobilePreviewOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !targetUrl) {
      setError("Name and target URL are required");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/qr", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          targetUrl,
          qrDesign: {
            dotsStyle: design.dotsStyle,
            dotsColor: design.dotsColor,
            cornersSquareStyle: design.cornersSquareStyle,
            cornersSquareColor: design.cornersSquareColor,
            cornersDotStyle: design.cornersDotStyle,
            cornersDotColor: design.cornersDotColor,
            backgroundColor: design.backgroundColor,
            backgroundRoundness: design.backgroundRoundness,
            transparentBackground: design.transparentBackground,
            logoSize: design.logoSize,
            margin: design.margin,
          },
        }),
      });

      if (res.ok) {
        const data = await res.json();
        router.push(`/dashboard/${data._id}`);
      } else {
        const data = await res.json();
        setError(data.error || "Failed to create QR code");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl">
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-2 text-sm text-body-mid hover:text-ink mb-6"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Back to dashboard
      </Link>

      <h1 className="text-xl sm:text-2xl font-semibold text-ink mb-2">
        Create Dynamic QR Code
      </h1>
      <p className="text-xs sm:text-sm text-body-mid mb-6 sm:mb-8">
        Create a trackable QR code with editable destination and scan analytics.
      </p>

      {error && (
        <div className="mb-6 p-3 rounded-sm bg-error-light text-error text-sm" role="alert">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6 min-w-0">
            <div className="bg-canvas rounded-md border border-hairline p-4 sm:p-6 space-y-4 min-w-0 overflow-hidden">
              <h2 className="text-base font-semibold text-ink">Details</h2>
              <Input
                label="QR Code Name"
                placeholder="e.g., Summer Campaign Flyer"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <DataTypeSelector
                allowedTypes={["url", "email", "phone", "sms", "social", "app"]}
                dataType={design.dataType}
                data={targetUrl}
                onChange={(type, data) => {
                  setDesign((prev) => ({ ...prev, dataType: type }));
                  setTargetUrl(data);
                }}
              />
              <p className="text-xs sm:text-sm text-body-mid">
                This destination can be changed anytime after creation.
              </p>
            </div>

            <div className="bg-canvas rounded-md border border-hairline p-4 sm:p-6 min-w-0 overflow-hidden">
              <QRCustomizer
                config={design}
                onChange={(updates) =>
                  setDesign((prev) => ({ ...prev, ...updates }))
                }
              />
            </div>

            <Button type="submit" loading={loading} className="w-full" size="lg">
              Create Dynamic QR Code
            </Button>
          </div>

          {/* Desktop Preview */}
          <div className="hidden lg:block lg:sticky lg:top-24 h-fit">
            <QRPreview
              config={{
                ...design,
                data: targetUrl || "https://theqrcod.com/r/preview",
                dataType: "url",
              }}
            />
          </div>
        </div>
      </form>

      {/* Floating Mobile Preview Toggle */}
      <div className="lg:hidden fixed bottom-6 right-6 z-30">
        <button
          type="button"
          onClick={() => setMobilePreviewOpen(true)}
          className="flex items-center gap-2 bg-ink text-white px-4 py-3 rounded-full shadow-lg font-medium text-sm hover:opacity-90 transition-transform active:scale-95 cursor-pointer"
        >
          <QrCode className="h-5 w-5" />
          <span>Preview QR</span>
        </button>
      </div>

      {/* Mobile Preview Modal */}
      {mobilePreviewOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/80 backdrop-blur-sm">
          <div className="bg-canvas rounded-md max-w-sm w-full max-h-[90vh] overflow-y-auto relative p-6 shadow-xl">
            <button
              type="button"
              onClick={() => setMobilePreviewOpen(false)}
              className="absolute top-4 right-4 p-2 text-body-mid hover:text-ink transition-colors cursor-pointer"
              title="Close"
            >
              <X className="h-5 w-5" />
            </button>
            <h3 className="text-lg font-semibold text-ink mb-4 text-center">
              QR Code Preview
            </h3>
            <div className="flex justify-center">
              <QRPreview
                config={{
                  ...design,
                  data: targetUrl || "https://theqrcod.com/r/preview",
                  dataType: "url",
                }}
              />
            </div>
            <Button
              variant="secondary"
              className="w-full mt-6"
              onClick={() => setMobilePreviewOpen(false)}
            >
              Done Previewing
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

