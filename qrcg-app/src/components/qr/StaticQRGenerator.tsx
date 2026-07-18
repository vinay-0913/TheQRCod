"use client";

import { useState, useCallback } from "react";
import QRPreview from "./QRPreview";
import QRCustomizer from "./QRCustomizer";
import DataTypeSelector, { DataType } from "./DataTypeSelector";

export interface QRConfig {
  data: string;
  dataType: DataType;
  width: number;
  margin: number;
  dotsStyle: string;
  dotsColor: string;
  cornersSquareStyle: string;
  cornersSquareColor: string;
  cornersDotStyle: string;
  cornersDotColor: string;
  backgroundColor: string;
  backgroundRoundness: number;
  transparentBackground: boolean;
  logoFile: File | null;
  logoSize: number;
}

const defaultConfig: QRConfig = {
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

export default function StaticQRGenerator() {
  const [config, setConfig] = useState<QRConfig>(defaultConfig);

  const updateConfig = useCallback(
    (updates: Partial<QRConfig>) => {
      setConfig((prev) => ({ ...prev, ...updates }));
    },
    []
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6 items-start">
      {/* Left: Configuration panel */}
      <div className="space-y-6">
        {/* Data type selector + input */}
        <div className="bg-canvas rounded-md border border-hairline p-6">
          <DataTypeSelector
            dataType={config.dataType}
            data={config.data}
            onChange={(dataType, data) => updateConfig({ dataType, data })}
          />
        </div>

        {/* Customization tabs */}
        <div className="bg-canvas rounded-md border border-hairline p-6">
          <QRCustomizer config={config} onChange={updateConfig} />
        </div>

        {/* Dynamic QR upsell */}
        <div className="bg-accent rounded-md p-6 text-white">
          <h3 className="text-lg font-semibold mb-2">
            Need a dynamic QR code?
          </h3>
          <p className="text-sm text-white/80 mb-4 leading-relaxed">
            Dynamic QR codes let you change the destination URL anytime,
            track scan analytics (location, device, time), and never need to
            reprint.
          </p>
          <a
            href="/signup"
            className="inline-flex items-center gap-2 px-4 py-2 bg-white text-ink rounded-sm text-sm font-medium hover:bg-white/90 transition-colors"
          >
            Try Dynamic QR Codes →
          </a>
        </div>
      </div>

      {/* Right: Preview panel */}
      <div className="lg:sticky lg:top-24">
        <QRPreview config={config} />
      </div>
    </div>
  );
}
