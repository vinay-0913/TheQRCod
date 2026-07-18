"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import QRCustomizer from "@/components/qr/QRCustomizer";
import { QRConfig } from "@/components/qr/StaticQRGenerator";
import { ArrowLeft } from "lucide-react";
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

      <h1 className="text-2xl font-semibold text-ink mb-2">
        Create Dynamic QR Code
      </h1>
      <p className="text-sm text-body-mid mb-8">
        Create a trackable QR code with editable destination and scan analytics.
      </p>

      {error && (
        <div className="mb-6 p-3 rounded-sm bg-error-light text-error text-sm" role="alert">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-canvas rounded-md border border-hairline p-6 space-y-4">
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
              <p className="text-sm text-body-mid">
                This destination can be changed anytime after creation.
              </p>
            </div>

            <div className="bg-canvas rounded-md border border-hairline p-6">
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

          <div className="lg:sticky lg:top-24 h-fit">
            <QRPreview
              config={{
                ...design,
                data: "https://theqrcod.com/r/preview",
                dataType: "url",
              }}
            />
          </div>
        </div>
      </form>
    </div>
  );
}
