import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import User from "@/models/User";

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const {
    razorpay_payment_id,
    razorpay_order_id,
    razorpay_signature,
    plan,
    billing,
    qrLimit,
  } = body as {
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
    plan: string;
    billing: string;
    qrLimit: number;
  };

  if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
    return NextResponse.json({ error: "Missing payment fields" }, { status: 400 });
  }

  // Verify HMAC-SHA256 signature
  const signatureBody = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
    .update(signatureBody)
    .digest("hex");

  if (expectedSignature !== razorpay_signature) {
    return NextResponse.json({ error: "Invalid payment signature" }, { status: 400 });
  }

  const expiresAt = new Date();
  if (billing === "yearly") {
    expiresAt.setFullYear(expiresAt.getFullYear() + 1);
  } else {
    expiresAt.setMonth(expiresAt.getMonth() + 1);
  }

  const parsedQrLimit = Math.max(5, Math.min(100, Number(qrLimit) || 5));

  try {
    await connectDB();
    const userId = (session.user as { id: string }).id;
    await User.findByIdAndUpdate(userId, {
      plan,
      qrLimit: parsedQrLimit,
      planExpiresAt: expiresAt,
      razorpayPaymentId: razorpay_payment_id,
    });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[verify-payment]", err);
    return NextResponse.json({ error: "Failed to update plan" }, { status: 500 });
  }
}
