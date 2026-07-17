import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import DynamicQR from "@/models/DynamicQR";

// GET /api/qr/[id] — get single QR code
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();

  const { id } = await params;
  const userId = (session.user as { id: string }).id;
  const qr = await DynamicQR.findOne({ _id: id, userId }).lean();

  if (!qr) {
    return NextResponse.json({ error: "QR code not found" }, { status: 404 });
  }

  return NextResponse.json(qr);
}

// PUT /api/qr/[id] — update QR code
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { name, targetUrl, qrDesign, status } = body;

    await connectDB();

    const { id } = await params;
    const userId = (session.user as { id: string }).id;

    const updateData: Record<string, unknown> = {};
    if (name) updateData.name = name;
    if (targetUrl) updateData.targetUrl = targetUrl;
    if (qrDesign) updateData.qrDesign = qrDesign;
    if (status) updateData.status = status;

    const qr = await DynamicQR.findOneAndUpdate(
      { _id: id, userId },
      { $set: updateData },
      { new: true }
    ).lean();

    if (!qr) {
      return NextResponse.json(
        { error: "QR code not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(qr);
  } catch (error) {
    console.error("Update QR error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// DELETE /api/qr/[id] — delete QR code
export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();

  const { id } = await params;
  const userId = (session.user as { id: string }).id;
  const qr = await DynamicQR.findOneAndDelete({ _id: id, userId });

  if (!qr) {
    return NextResponse.json({ error: "QR code not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
