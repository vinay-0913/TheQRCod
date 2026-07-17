"use client";

import { useState } from "react";
import { QRConfig } from "./StaticQRGenerator";
import { Image, Circle, Square, Grid3x3, Paintbrush } from "lucide-react";

interface QRCustomizerProps {
  config: QRConfig;
  onChange: (updates: Partial<QRConfig>) => void;
}

type Tab = "background" | "dots" | "cornersSquare" | "cornersDot" | "logo";

const tabs: { id: Tab; label: string; icon: typeof Paintbrush }[] = [
  { id: "background", label: "Background", icon: Square },
  { id: "dots", label: "Dots", icon: Grid3x3 },
  { id: "cornersSquare", label: "Corner Squares", icon: Square },
  { id: "cornersDot", label: "Corner Dots", icon: Circle },
  { id: "logo", label: "Logo", icon: Image },
];

const dotStyles = [
  { value: "square", label: "Square" },
  { value: "dots", label: "Dots" },
  { value: "rounded", label: "Rounded" },
  { value: "extra-rounded", label: "Extra Rounded" },
  { value: "classy", label: "Classy" },
  { value: "classy-rounded", label: "Classy Rounded" },
];

const cornerSquareStyles = [
  { value: "square", label: "Square" },
  { value: "dot", label: "Dot" },
  { value: "extra-rounded", label: "Extra Rounded" },
];

const cornerDotStyles = [
  { value: "square", label: "Square" },
  { value: "dot", label: "Dot" },
];

function ColorPicker({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (color: string) => void;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-ink">{label}</label>
      <div className="flex items-center gap-3">
        <div className="relative">
          <input
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-10 h-10 rounded-sm border border-hairline cursor-pointer p-0.5"
          />
        </div>
        <input
          type="text"
          value={value.toUpperCase()}
          onChange={(e) => {
            const v = e.target.value;
            if (/^#[0-9A-Fa-f]{0,6}$/.test(v)) onChange(v);
          }}
          className="w-28 px-3 py-2 rounded-sm bg-canvas text-ink border border-hairline text-sm font-mono focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
          maxLength={7}
        />
      </div>
    </div>
  );
}

function StyleSelector({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-ink">{label}</label>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={`px-3 py-1.5 rounded-sm text-sm font-medium border transition-colors cursor-pointer ${
              value === opt.value
                ? "bg-primary text-white border-primary"
                : "bg-canvas text-body border-hairline hover:border-hairline-strong"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function QRCustomizer({ config, onChange }: QRCustomizerProps) {
  const [activeTab, setActiveTab] = useState<Tab>("background");

  const renderTabContent = () => {
    switch (activeTab) {
      case "background":
        return (
          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-ink">Margin</label>
                <input
                  type="range"
                  min={0}
                  max={50}
                  value={config.margin}
                  onChange={(e) =>
                    onChange({ margin: Number(e.target.value) })
                  }
                  className="w-full accent-accent"
                />
                <span className="text-xs text-mute">{config.margin}px</span>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-ink">
                  Roundness
                </label>
                <input
                  type="range"
                  min={0}
                  max={50}
                  value={config.backgroundRoundness}
                  onChange={(e) =>
                    onChange({
                      backgroundRoundness: Number(e.target.value),
                    })
                  }
                  className="w-full accent-accent"
                />
                <span className="text-xs text-mute">
                  {config.backgroundRoundness}px
                </span>
              </div>
            </div>
            <ColorPicker
              label="Background Color"
              value={config.backgroundColor}
              onChange={(c) => onChange({ backgroundColor: c })}
            />
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={config.transparentBackground}
                onChange={(e) =>
                  onChange({ transparentBackground: e.target.checked })
                }
                className="h-4 w-4 rounded-xs border-hairline text-accent focus:ring-accent accent-accent"
              />
              <span className="text-sm text-body">Transparent background</span>
            </label>
          </div>
        );
      case "dots":
        return (
          <div className="space-y-5">
            <StyleSelector
              label="Dot Style"
              options={dotStyles}
              value={config.dotsStyle}
              onChange={(v) => onChange({ dotsStyle: v })}
            />
            <ColorPicker
              label="Dot Color"
              value={config.dotsColor}
              onChange={(c) => onChange({ dotsColor: c })}
            />
          </div>
        );
      case "cornersSquare":
        return (
          <div className="space-y-5">
            <StyleSelector
              label="Corner Square Style"
              options={cornerSquareStyles}
              value={config.cornersSquareStyle}
              onChange={(v) => onChange({ cornersSquareStyle: v })}
            />
            <ColorPicker
              label="Corner Square Color"
              value={config.cornersSquareColor}
              onChange={(c) => onChange({ cornersSquareColor: c })}
            />
          </div>
        );
      case "cornersDot":
        return (
          <div className="space-y-5">
            <StyleSelector
              label="Corner Dot Style"
              options={cornerDotStyles}
              value={config.cornersDotStyle}
              onChange={(v) => onChange({ cornersDotStyle: v })}
            />
            <ColorPicker
              label="Corner Dot Color"
              value={config.cornersDotColor}
              onChange={(c) => onChange({ cornersDotColor: c })}
            />
          </div>
        );
      case "logo":
        return (
          <div className="space-y-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-ink">
                Upload Logo
              </label>
              <input
                type="file"
                accept="image/png,image/jpeg,image/svg+xml,image/webp"
                onChange={(e) => {
                  const file = e.target.files?.[0] || null;
                  onChange({ logoFile: file });
                }}
                className="text-sm text-body file:mr-4 file:py-2 file:px-4 file:rounded-sm file:border file:border-hairline file:text-sm file:font-medium file:bg-canvas file:text-ink file:cursor-pointer hover:file:bg-canvas-alt"
              />
              <p className="text-xs text-mute">PNG, JPG, SVG, or WebP</p>
            </div>
            {config.logoFile && (
              <div className="space-y-3">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-ink">
                    Logo Size
                  </label>
                  <input
                    type="range"
                    min={0.1}
                    max={0.5}
                    step={0.05}
                    value={config.logoSize}
                    onChange={(e) =>
                      onChange({ logoSize: Number(e.target.value) })
                    }
                    className="w-full accent-accent"
                  />
                  <span className="text-xs text-mute">
                    {Math.round(config.logoSize * 100)}%
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => onChange({ logoFile: null })}
                  className="text-sm text-error hover:underline cursor-pointer"
                >
                  Remove logo
                </button>
              </div>
            )}
          </div>
        );
    }
  };

  return (
    <div>
      <h2 className="text-base font-semibold text-ink mb-4">Customize</h2>
      {/* Tab navigation */}
      <div className="flex gap-1 overflow-x-auto pb-1 mb-6 -mx-1 px-1">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            type="button"
            onClick={() => setActiveTab(id)}
            className={`
              inline-flex items-center gap-1.5 px-3 py-2 rounded-sm text-sm font-medium
              whitespace-nowrap transition-colors duration-150 cursor-pointer border
              ${
                activeTab === id
                  ? "bg-primary text-white border-primary"
                  : "bg-canvas text-body border-hairline hover:border-hairline-strong"
              }
            `}
          >
            <Icon className="h-4 w-4" aria-hidden="true" />
            {label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {renderTabContent()}
    </div>
  );
}
