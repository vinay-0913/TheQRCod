import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import DynamicQR from "@/models/DynamicQR";
import { generateShortCode } from "@/lib/utils";

// GET /api/qr — list user's dynamic QR codes
export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();

  const userId = (session.user as { id: string }).id;
  const qrCodes = await DynamicQR.find({ userId })
    .sort({ createdAt: -1 })
    .lean();

  return NextResponse.json(qrCodes);
}

// POST /api/qr — create a new dynamic QR code
export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { name, targetUrl, qrDesign } = body;

    if (!name || !targetUrl) {
      return NextResponse.json(
        { error: "Name and target URL are required" },
        { status: 400 }
      );
    }

    await connectDB();

    const userId = (session.user as { id: string }).id;

    // Generate a unique short code
    let shortCode = generateShortCode();
    let attempts = 0;
    while (await DynamicQR.findOne({ shortCode })) {
      shortCode = generateShortCode();
      attempts++;
      if (attempts > 10) {
        return NextResponse.json(
          { error: "Failed to generate unique code. Try again." },
          { status: 500 }
        );
      }
    }

    const qr = await DynamicQR.create({
      userId,
      name,
      shortCode,
      targetUrl,
      qrDesign: qrDesign || {},
    });

    return NextResponse.json(qr, { status: 201 });
  } catch (error) {
    console.error("Create QR error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
