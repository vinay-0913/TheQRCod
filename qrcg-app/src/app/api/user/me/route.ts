import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import User from "@/models/User";

export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();
  const userId = (session.user as { id: string }).id;
  const user = await User.findById(userId).select(
    "name email plan qrLimit planExpiresAt razorpayPaymentId createdAt"
  );

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json({
    name: user.name,
    email: user.email,
    plan: user.plan,
    qrLimit: user.qrLimit ?? 0,
    planExpiresAt: user.planExpiresAt,
    razorpayPaymentId: user.razorpayPaymentId,
    createdAt: user.createdAt,
  });
}
