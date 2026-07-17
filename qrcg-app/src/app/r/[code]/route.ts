import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import DynamicQR from "@/models/DynamicQR";
import Scan from "@/models/Scan";
import { parseUserAgent, hashIP } from "@/lib/utils";
import { headers } from "next/headers";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ code: string }> }
) {
  const { code } = await params;

  await connectDB();

  const qr = await DynamicQR.findOne({ shortCode: code });

  if (!qr) {
    return NextResponse.redirect(new URL("/", "https://theqrcod.com"), 302);
  }

  if (qr.status === "paused") {
    return new NextResponse(
      `<html><body style="display:flex;align-items:center;justify-content:center;height:100vh;font-family:system-ui;color:#6b7280;"><div style="text-align:center"><h1 style="color:#080808;font-size:24px;margin-bottom:8px">QR Code Paused</h1><p>This QR code has been temporarily deactivated.</p></div></body></html>`,
      { status: 200, headers: { "Content-Type": "text/html" } }
    );
  }

  // Log scan asynchronously (don't block the redirect)
  const headerStore = await headers();
  const ua = headerStore.get("user-agent") || "";
  const ip = headerStore.get("x-forwarded-for") || headerStore.get("x-real-ip") || "0.0.0.0";
  const referrer = headerStore.get("referer") || "";
  const { device, browser, os } = parseUserAgent(ua);

  // Fire-and-forget scan logging
  Promise.all([
    Scan.create({
      qrId: qr._id,
      timestamp: new Date(),
      ipHash: hashIP(typeof ip === "string" ? ip : "0.0.0.0"),
      userAgent: ua.substring(0, 500),
      device,
      browser,
      os,
      country: "unknown",
      city: "unknown",
      referrer: referrer.substring(0, 500),
    }),
    DynamicQR.updateOne({ _id: qr._id }, { $inc: { totalScans: 1 } }),
  ]).catch(console.error);

  return NextResponse.redirect(qr.targetUrl, 302);
}
