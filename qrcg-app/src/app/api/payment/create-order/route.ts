import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";
import { auth } from "@/lib/auth";
import { nanoid } from "nanoid";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

// Pricing config (INR, in paise)
const BASE_QR = 5;
const STEP_QR = 5;
const BASE_PRICE_INR = 19900;   // Rs.199 in paise
const PER_STEP_INR = 5000;      // Rs.50 per extra 5 QRs in paise

export function calcAmountInr(qrLimit: number, billing: "monthly" | "yearly"): number {
  const steps = Math.max(0, Math.floor((qrLimit - BASE_QR) / STEP_QR));
  const monthly = BASE_PRICE_INR + steps * PER_STEP_INR;
  return billing === "yearly" ? monthly * 10 : monthly;
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { plan, billing, qrLimit } = body as {
    plan: string;
    billing: string;
    qrLimit: number;
  };

  if (plan !== "pro" || !["monthly", "yearly"].includes(billing)) {
    return NextResponse.json({ error: "Invalid plan or billing cycle" }, { status: 400 });
  }

  const parsedQrLimit = Math.max(BASE_QR, Math.min(100, Number(qrLimit) || BASE_QR));
  const amount = calcAmountInr(parsedQrLimit, billing as "monthly" | "yearly");

  if (amount < 100) {
    return NextResponse.json({ error: "Amount too low" }, { status: 400 });
  }

  try {
    const order = await razorpay.orders.create({
      amount,
      currency: "INR",
      receipt: `rcpt_${nanoid(10)}`,
      notes: {
        plan,
        billing,
        qrLimit: String(parsedQrLimit),
      },
    });

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: process.env.RAZORPAY_KEY_ID,
      qrLimit: parsedQrLimit,
    });
  } catch (err) {
    console.error("[create-order]", err);
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}
