"use client";

import { useEffect, useRef, useState } from "react";

interface QRThumbnailProps {
  data: string;
  design: any;
  size?: number;
}

export default function QRThumbnail({ data, design, size = 64 }: QRThumbnailProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const qrInstanceRef = useRef<any>(null);

  useEffect(() => {
    let cancelled = false;

    const render = async () => {
      const QRCodeStyling = (await import("qr-code-styling")).default;

      if (cancelled) return;

      const options: any = {
        width: size,
        height: size,
        data: data || "https://theqrcod.com",
        margin: design.margin ? Math.max(0, Math.floor(design.margin * (size / 300))) : 0,
        type: "svg",
        dotsOptions: {
          color: design.dotsColor || "#080808",
          type: design.dotsStyle || "rounded",
        },
        cornersSquareOptions: {
          color: design.cornersSquareColor || "#080808",
          type: design.cornersSquareStyle || "extra-rounded",
        },
        cornersDotOptions: {
          color: design.cornersDotColor || "#080808",
          type: design.cornersDotStyle || "dot",
        },
        backgroundOptions: design.transparentBackground
          ? { color: "transparent" }
          : {
              color: design.backgroundColor || "#ffffff",
              round: (design.backgroundRoundness || 0) / 100,
            },
        imageOptions: {
          crossOrigin: "anonymous",
          margin: 2,
          imageSize: design.logoSize || 0.4,
        },
      };

      if (design.logoUrl) {
        options.image = design.logoUrl;
      }

      if (qrInstanceRef.current) {
        qrInstanceRef.current.update(options);
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
  }, [data, design, size]);

  return (
    <div
      ref={containerRef}
      className="shrink-0 overflow-hidden rounded-sm border border-hairline bg-canvas flex items-center justify-center"
      style={{ width: size, height: size }}
    />
  );
}
