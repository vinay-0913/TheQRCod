"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { QRConfig } from "./StaticQRGenerator";
import { Download } from "lucide-react";
import Button from "@/components/ui/Button";

interface QRPreviewProps {
  config: QRConfig;
}

export default function QRPreview({ config }: QRPreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const qrInstanceRef = useRef<unknown>(null);
  const [logoDataUrl, setLogoDataUrl] = useState<string | undefined>(undefined);
  const [exportSize, setExportSize] = useState(1024);

  // Read logo file into data URL
  useEffect(() => {
    if (config.logoFile) {
      const reader = new FileReader();
      reader.onload = () => setLogoDataUrl(reader.result as string);
      reader.readAsDataURL(config.logoFile);
    } else {
      setLogoDataUrl(undefined);
    }
  }, [config.logoFile]);

  // Render QR code
  useEffect(() => {
    let cancelled = false;

    const render = async () => {
      const QRCodeStyling = (await import("qr-code-styling")).default;

      if (cancelled) return;

      const options: Record<string, unknown> = {
        width: config.width || 300,
        height: config.width || 300,
        data: config.data || "https://theqrcod.com",
        margin: config.margin,
        type: "svg",
        dotsOptions: {
          color: config.dotsColor,
          type: config.dotsStyle,
        },
        cornersSquareOptions: {
          color: config.cornersSquareColor,
          type: config.cornersSquareStyle,
        },
        cornersDotOptions: {
          color: config.cornersDotColor,
          type: config.cornersDotStyle,
        },
        backgroundOptions: config.transparentBackground
          ? { color: "transparent" }
          : {
            color: config.backgroundColor,
            round: config.backgroundRoundness / 100,
          },
        imageOptions: {
          crossOrigin: "anonymous",
          margin: 8,
          imageSize: config.logoSize,
        },
        ...(logoDataUrl || (config as any).logoUrl ? { image: logoDataUrl || (config as any).logoUrl } : {}),
      };

      if (qrInstanceRef.current) {
        (qrInstanceRef.current as { update: (o: Record<string, unknown>) => void }).update(options);
      } else {
        const qr = new QRCodeStyling(options);
        qrInstanceRef.current = qr;
        if (containerRef.current) {
          containerRef.current.innerHTML = "";
          qr.append(containerRef.current);
        }
      }
    };

    render();

    return () => {
      cancelled = true;
    };
  }, [
    config.data,
    config.width,
    config.margin,
    config.dotsStyle,
    config.dotsColor,
    config.cornersSquareStyle,
    config.cornersSquareColor,
    config.cornersDotStyle,
    config.cornersDotColor,
    config.backgroundColor,
    config.backgroundRoundness,
    config.transparentBackground,
    config.logoSize,
    logoDataUrl,
  ]);

  const handleDownload = useCallback(
    async (format: "png" | "svg") => {
      if (!qrInstanceRef.current) return;
      const qr = qrInstanceRef.current as {
        update: (o: Record<string, unknown>) => void;
        download: (o: { extension: string; name: string }) => void;
      };

      if (format === "png") {
        // Temporarily set higher resolution for export
        qr.update({ width: exportSize, height: exportSize });
        // Small delay for re-render
        await new Promise((r) => setTimeout(r, 100));
        qr.download({ extension: "png", name: "qr-code" });
        // Revert to preview size
        qr.update({ width: config.width, height: config.width });
      } else {
        qr.download({ extension: "svg", name: "qr-code" });
      }
    },
    [config.width, exportSize]
  );

  return (
    <div className="bg-canvas rounded-md border border-hairline p-6">
      <h2 className="text-base font-semibold text-ink mb-4">Preview</h2>

      {/* QR preview */}
      <div className="flex justify-center p-4 bg-canvas-alt rounded-md mb-6">
        <div
          ref={containerRef}
          className="[&>svg]:w-full [&>svg]:h-auto [&>svg]:max-w-[280px] [&>canvas]:w-full [&>canvas]:h-auto [&>canvas]:max-w-[280px]"
        />
      </div>

      {/* Export size selector */}
      <div className="mb-4">
        <label className="text-sm font-medium text-ink block mb-1.5">
          PNG Export Size
        </label>
        <select
          value={exportSize}
          onChange={(e) => setExportSize(Number(e.target.value))}
          className="w-full px-3 py-2 rounded-sm bg-canvas text-ink border border-hairline text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
        >
          <option value={512}>512 × 512 px</option>
          <option value={1024}>1024 × 1024 px</option>
          <option value={2048}>2048 × 2048 px</option>
          <option value={4096}>4096 × 4096 px (Print)</option>
        </select>
      </div>

      {/* Download buttons */}
      <div className="space-y-2">
        <Button
          variant="primary"
          className="w-full"
          onClick={() => handleDownload("png")}
        >
          <Download className="h-4 w-4" aria-hidden="true" />
          Download PNG
        </Button>
        <Button
          variant="secondary"
          className="w-full"
          onClick={() => handleDownload("svg")}
        >
          <Download className="h-4 w-4" aria-hidden="true" />
          Download SVG
        </Button>
      </div>
    </div>
  );
}
