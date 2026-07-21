import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import DynamicQR from "@/models/DynamicQR";
import Scan from "@/models/Scan";
import User from "@/models/User";

// GET /api/qr/[id]/analytics — get scan analytics for a QR code
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();

  const { id } = await params;
  const userId = (session.user as { id: string }).id;

  // Verify ownership
  const qr = await DynamicQR.findOne({ _id: id, userId }).lean();
  if (!qr) {
    return NextResponse.json({ error: "QR code not found" }, { status: 404 });
  }

  const dbUser = await User.findById(userId).select("plan").lean();
  const isPro = dbUser?.plan === "pro";

  const { searchParams } = new URL(request.url);
  let period = searchParams.get("period") || "7d";
  
  if (!isPro && ["30d", "all"].includes(period)) {
    period = "7d";
  }

  let dateFilter: Date;
  const now = new Date();
  switch (period) {
    case "24h":
      dateFilter = new Date(now.getTime() - 24 * 60 * 60 * 1000);
      break;
    case "7d":
      dateFilter = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      break;
    case "30d":
      dateFilter = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      break;
    case "all":
      dateFilter = new Date(0);
      break;
    default:
      dateFilter = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  }

  // Aggregate scan data
  const [scansOverTime, deviceBreakdown, browserBreakdown, totalScans, recentScans] =
    await Promise.all([
      // Scans over time (grouped by day)
      Scan.aggregate([
        { $match: { qrId: qr._id, timestamp: { $gte: dateFilter } } },
        {
          $group: {
            _id: {
              $dateToString: { format: "%Y-%m-%d", date: "$timestamp" },
            },
            count: { $sum: 1 },
          },
        },
        { $sort: { _id: 1 } },
      ]),

      // Device breakdown
      Scan.aggregate([
        { $match: { qrId: qr._id, timestamp: { $gte: dateFilter } } },
        { $group: { _id: "$device", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
      ]),

      // Browser breakdown
      Scan.aggregate([
        { $match: { qrId: qr._id, timestamp: { $gte: dateFilter } } },
        { $group: { _id: "$browser", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
      ]),

      // Total scans in period
      Scan.countDocuments({
        qrId: qr._id,
        timestamp: { $gte: dateFilter },
      }),

      // Recent scans (last 20)
      Scan.find(
        isPro 
          ? { qrId: qr._id } 
          : { qrId: qr._id, timestamp: { $gte: dateFilter } }
      )
        .sort({ timestamp: -1 })
        .limit(20)
        .lean(),
    ]);

  return NextResponse.json({
    totalScans,
    scansOverTime: scansOverTime.map((s) => ({
      date: s._id,
      count: s.count,
    })),
    deviceBreakdown: deviceBreakdown.map((d) => ({
      device: d._id,
      count: d.count,
    })),
    browserBreakdown: browserBreakdown.map((b) => ({
      browser: b._id,
      count: b.count,
    })),
    recentScans,
  });
}
