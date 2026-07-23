"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  PlusCircle,
  ExternalLink,
  BarChart3,
  Pause,
  Play,
  Trash2,
  Copy,
  Check,
  QrCode,
  Zap,
  ArrowRight,
} from "lucide-react";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import QRThumbnail from "@/components/qr/QRThumbnail";

interface QRCode {
  _id: string;
  name: string;
  shortCode: string;
  targetUrl: string;
  status: "active" | "paused";
  totalScans: number;
  createdAt: string;
  qrDesign: any;
}

export default function DashboardPage() {
  const [qrCodes, setQrCodes] = useState<QRCode[]>([]);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [userPlan, setUserPlan] = useState<string>("free");
  const [qrLimit, setQrLimit] = useState<number>(1);

  useEffect(() => {
    fetchQRCodes();
    fetchUserInfo();
  }, []);

  const fetchUserInfo = async () => {
    try {
      const res = await fetch("/api/user/me");
      if (res.ok) {
        const data = await res.json();
        setUserPlan(data.plan || "free");
        setQrLimit(data.plan === "pro" ? (data.qrLimit || 5) : 1);
      }
    } catch { /* ignore */ }
  };

  const fetchQRCodes = async () => {
    try {
      const res = await fetch("/api/qr");
      if (res.ok) {
        const data = await res.json();
        setQrCodes(data);
      }
    } catch (err) {
      console.error("Failed to fetch QR codes:", err);
    } finally {
      setLoading(false);
    }
  };

  const toggleStatus = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === "active" ? "paused" : "active";
    try {
      const res = await fetch(`/api/qr/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setQrCodes((prev) =>
          prev.map((qr) =>
            qr._id === id ? { ...qr, status: newStatus } : qr
          )
        );
      }
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  const deleteQR = async (id: string) => {
    if (!confirm("Are you sure you want to delete this QR code?")) return;
    try {
      const res = await fetch(`/api/qr/${id}`, { method: "DELETE" });
      if (res.ok) {
        setQrCodes((prev) => prev.filter((qr) => qr._id !== id));
      }
    } catch (err) {
      console.error("Failed to delete QR code:", err);
    }
  };

  const copyLink = (shortCode: string, id: string) => {
    const url =
      typeof window !== "undefined"
        ? `${window.location.origin}/r/${shortCode}`
        : `https://theqrcod.com/r/${shortCode}`;
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin h-8 w-8 border-2 border-accent border-t-transparent rounded-full" />
      </div>
    );
  }

  const atLimit = qrCodes.length >= qrLimit;
  const isPro = userPlan === "pro";

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold text-ink">My QR Codes</h1>
          <p className="text-xs sm:text-sm text-body-mid mt-1">
            {qrCodes.length} of {qrLimit} dynamic QR code{qrLimit !== 1 ? "s" : ""} used
          </p>
        </div>
        {atLimit ? (
          <Link href="/pricing" className="w-full sm:w-auto">
            <Button className="w-full sm:w-auto">
              <Zap className="h-4 w-4" aria-hidden="true" />
              {isPro ? "Get More QR Codes" : "Upgrade to Pro"}
            </Button>
          </Link>
        ) : (
          <Link href="/dashboard/create" className="w-full sm:w-auto">
            <Button className="w-full sm:w-auto">
              <PlusCircle className="h-4 w-4" aria-hidden="true" />
              Create New
            </Button>
          </Link>
        )}
      </div>

      {/* Upgrade banner when at limit */}
      {atLimit && (
        <Link
          href="/pricing"
          className="mb-6 p-4 rounded-md bg-amber-50 border border-amber-200 flex flex-col sm:flex-row sm:items-center gap-3 hover:bg-amber-100 transition-colors group block"
        >
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
              <Zap className="h-5 w-5 text-amber-600" />
            </div>
            <div className="flex-1 min-w-0 sm:hidden">
              <p className="text-sm font-semibold text-amber-900">
                {isPro
                  ? "Need more dynamic QR codes?"
                  : "Upgrade to Pro for more dynamic QR codes"}
              </p>
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-amber-900 hidden sm:block">
              {isPro
                ? "Need more dynamic QR codes?"
                : "Upgrade to Pro for more dynamic QR codes"}
            </p>
            <p className="text-xs text-amber-700 mt-0.5">
              {isPro
                ? `You've used all ${qrLimit} QR codes on your plan. Upgrade to add more.`
                : "You've used your free QR code. Upgrade to Pro starting at ₹199/month for 5 QR codes."}
            </p>
          </div>
          <ArrowRight className="h-5 w-5 text-amber-600 shrink-0 hidden sm:block group-hover:translate-x-0.5 transition-transform" />
        </Link>
      )}

      {qrCodes.length === 0 ? (
        /* Empty state */
        <div className="bg-canvas rounded-md border border-hairline p-8 sm:p-12 text-center">
          <QrCode className="h-12 w-12 text-mute mx-auto mb-4" aria-hidden="true" />
          <h2 className="text-lg font-semibold text-ink mb-2">
            No dynamic QR codes yet
          </h2>
          <p className="text-sm text-body-mid mb-6 max-w-md mx-auto">
            Create your first dynamic QR code to start tracking scans,
            editing destinations, and accessing analytics.
          </p>
          <Link href="/dashboard/create" className="inline-block w-full sm:w-auto">
            <Button className="w-full sm:w-auto">
              <PlusCircle className="h-4 w-4" aria-hidden="true" />
              Create Your First QR Code
            </Button>
          </Link>
        </div>
      ) : (
        /* QR code list */
        <div className="space-y-3">
          {qrCodes.map((qr) => (
            <div
              key={qr._id}
              className="bg-canvas rounded-md border border-hairline p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center gap-4 hover:shadow-card transition-shadow duration-150"
            >
              {/* Top row / Left section with Thumbnail + Info */}
              <div className="flex items-start sm:items-center gap-3 flex-1 min-w-0">
                <div className="shrink-0">
                  <QRThumbnail
                    data={`${typeof window !== "undefined" ? window.location.origin : "https://theqrcod.com"}/r/${qr.shortCode}`}
                    design={qr.qrDesign || {}}
                    size={52}
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <Link
                      href={`/dashboard/${qr._id}`}
                      className="text-sm sm:text-base font-semibold text-ink hover:text-accent truncate max-w-[200px] sm:max-w-xs"
                    >
                      {qr.name}
                    </Link>
                    <Badge variant={qr.status === "active" ? "success" : "warning"}>
                      {qr.status}
                    </Badge>
                  </div>
                  <p className="text-xs sm:text-sm text-body-mid truncate">{qr.targetUrl}</p>
                  <p className="text-[11px] sm:text-xs text-mute mt-1">
                    Created {new Date(qr.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Bottom row / Right section with Stats + Actions */}
              <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0 pt-3 sm:pt-0 border-t sm:border-t-0 border-hairline">
                <div className="text-left sm:text-center pr-2 border-r sm:border-r-0 border-hairline sm:pr-0">
                  <p className="text-lg sm:text-xl font-semibold text-ink leading-none">{qr.totalScans}</p>
                  <p className="text-[11px] sm:text-xs text-mute mt-0.5">Scans</p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1 bg-surface-soft/60 sm:bg-transparent p-1 sm:p-0 rounded-md">
                  <button
                    type="button"
                    onClick={() => copyLink(qr.shortCode, qr._id)}
                    className="p-2 rounded-md sm:rounded-sm hover:bg-canvas-alt text-body-mid hover:text-ink transition-colors cursor-pointer"
                    title="Copy short link"
                  >
                    {copiedId === qr._id ? (
                      <Check className="h-4 w-4 text-success" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </button>
                  <Link
                    href={`/dashboard/${qr._id}`}
                    className="p-2 rounded-md sm:rounded-sm hover:bg-canvas-alt text-body-mid hover:text-ink transition-colors"
                    title="View analytics"
                  >
                    <BarChart3 className="h-4 w-4" />
                  </Link>
                  <a
                    href={qr.targetUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-md sm:rounded-sm hover:bg-canvas-alt text-body-mid hover:text-ink transition-colors"
                    title="Open target URL"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                  <button
                    type="button"
                    onClick={() => toggleStatus(qr._id, qr.status)}
                    className="p-2 rounded-md sm:rounded-sm hover:bg-canvas-alt text-body-mid hover:text-ink transition-colors cursor-pointer"
                    title={qr.status === "active" ? "Pause" : "Activate"}
                  >
                    {qr.status === "active" ? (
                      <Pause className="h-4 w-4" />
                    ) : (
                      <Play className="h-4 w-4" />
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => deleteQR(qr._id)}
                    className="p-2 rounded-md sm:rounded-sm hover:bg-error-light text-body-mid hover:text-error transition-colors cursor-pointer"
                    title="Delete"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
