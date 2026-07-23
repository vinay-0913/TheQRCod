"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Copy,
  Check,
  ExternalLink,
  Edit,
  Pause,
  Play,
  Smartphone,
  Monitor,
  Tablet,
  Globe,
  QrCode,
  X,
} from "lucide-react";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import QRPreview from "@/components/qr/QRPreview";

interface QRDetail {
  _id: string;
  name: string;
  shortCode: string;
  targetUrl: string;
  status: "active" | "paused";
  totalScans: number;
  createdAt: string;
  qrDesign: any;
}

interface Analytics {
  totalScans: number;
  scansOverTime: { date: string; count: number }[];
  deviceBreakdown: { device: string; count: number }[];
  browserBreakdown: { browser: string; count: number }[];
}

const deviceIcons: Record<string, typeof Monitor> = {
  desktop: Monitor,
  mobile: Smartphone,
  tablet: Tablet,
};

export default function QRDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [qr, setQr] = useState<QRDetail | null>(null);
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [period, setPeriod] = useState("7d");
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [showQRModal, setShowQRModal] = useState(false);

  useEffect(() => {
    Promise.all([
      fetch(`/api/qr/${id}`).then((r) => r.json()),
      fetch(`/api/qr/${id}/analytics?period=${period}`).then((r) => r.json()),
    ]).then(([qrData, analyticsData]) => {
      setQr(qrData);
      setAnalytics(analyticsData);
      setLoading(false);
    });
  }, [id, period]);

  const copyLink = () => {
    if (!qr) return;
    const url =
      typeof window !== "undefined"
        ? `${window.location.origin}/r/${qr.shortCode}`
        : `https://theqrcod.com/r/${qr.shortCode}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleStatus = async () => {
    if (!qr) return;
    const newStatus = qr.status === "active" ? "paused" : "active";
    const res = await fetch(`/api/qr/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });
    if (res.ok) setQr({ ...qr, status: newStatus });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin h-8 w-8 border-2 border-accent border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!qr) {
    return (
      <div className="text-center py-12">
        <p className="text-body-mid">QR code not found</p>
      </div>
    );
  }

  const shortUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/r/${qr.shortCode}`
      : `https://theqrcod.com/r/${qr.shortCode}`;

  return (
    <div>
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-2 text-sm text-body-mid hover:text-ink mb-6"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Back to dashboard
      </Link>

      {/* Header */}
      <div className="bg-canvas rounded-md border border-hairline p-4 sm:p-6 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="min-w-0">
            <div className="flex items-center gap-3 mb-1 flex-wrap">
              <h1 className="text-lg sm:text-xl font-semibold text-ink truncate">{qr.name}</h1>
              <Badge variant={qr.status === "active" ? "success" : "warning"}>
                {qr.status}
              </Badge>
            </div>
            <p className="text-xs sm:text-sm text-body-mid truncate">{qr.targetUrl}</p>
          </div>

          <div className="grid grid-cols-2 sm:flex items-center gap-2 w-full sm:w-auto">
            <Button variant="secondary" size="sm" onClick={copyLink} className="w-full sm:w-auto justify-center">
              {copied ? (
                <Check className="h-4 w-4 text-success" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
              {copied ? "Copied!" : "Copy Link"}
            </Button>
            <Button variant="secondary" size="sm" onClick={toggleStatus} className="w-full sm:w-auto justify-center">
              {qr.status === "active" ? (
                <Pause className="h-4 w-4" />
              ) : (
                <Play className="h-4 w-4" />
              )}
              {qr.status === "active" ? "Pause" : "Activate"}
            </Button>
            <Link href={`/dashboard/${qr._id}/edit`} className="w-full sm:w-auto">
              <Button variant="secondary" size="sm" className="w-full justify-center">
                <Edit className="h-4 w-4" />
                Edit
              </Button>
            </Link>
            <Button variant="secondary" size="sm" onClick={() => setShowQRModal(true)} className="w-full sm:w-auto justify-center">
              <QrCode className="h-4 w-4" />
              View QR
            </Button>
          </div>
        </div>

        {/* Short URL display */}
        <div className="mt-4 p-2.5 sm:p-3 bg-canvas-alt rounded-sm flex items-center gap-2.5 min-w-0">
          <Globe className="h-4 w-4 text-mute shrink-0" aria-hidden="true" />
          <code className="text-xs sm:text-sm text-accent font-mono flex-1 truncate">
            {shortUrl}
          </code>
          <a
            href={shortUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-body-mid hover:text-ink shrink-0 p-1"
          >
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>

      {/* Period selector */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
        {[
          { value: "24h", label: "24 Hours" },
          { value: "7d", label: "7 Days" },
          { value: "30d", label: "30 Days" },
          { value: "all", label: "All Time" },
        ].map((p) => (
          <button
            key={p.value}
            type="button"
            onClick={() => setPeriod(p.value)}
            className={`px-3 py-1.5 rounded-sm text-xs sm:text-sm font-medium border transition-colors shrink-0 cursor-pointer ${
              period === p.value
                ? "bg-primary text-white border-primary"
                : "bg-canvas text-body border-hairline hover:border-hairline-strong"
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6">
        <div className="bg-canvas rounded-md border border-hairline p-4 sm:p-5">
          <p className="text-xs sm:text-sm text-body-mid mb-1">Total Scans</p>
          <p className="text-2xl sm:text-3xl font-semibold text-ink">
            {analytics?.totalScans || 0}
          </p>
        </div>
        <div className="bg-canvas rounded-md border border-hairline p-4 sm:p-5">
          <p className="text-xs sm:text-sm text-body-mid mb-1">All-Time Scans</p>
          <p className="text-2xl sm:text-3xl font-semibold text-ink">{qr.totalScans}</p>
        </div>
        <div className="bg-canvas rounded-md border border-hairline p-4 sm:p-5">
          <p className="text-xs sm:text-sm text-body-mid mb-1">Status</p>
          <p className="text-2xl sm:text-3xl font-semibold text-ink capitalize">
            {qr.status}
          </p>
        </div>
      </div>

      {/* Scan timeline chart */}
      <div className="bg-canvas rounded-md border border-hairline p-4 sm:p-6 mb-6 overflow-hidden min-w-0">
        <h2 className="text-base font-semibold text-ink mb-4">
          Scans Over Time
        </h2>
        {analytics && analytics.scansOverTime.length > 0 ? (
          <div className="h-[220px] sm:h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={analytics.scansOverTime}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 11, fill: "#6B7280" }}
                  tickFormatter={(v) =>
                    new Date(v).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  }
                />
                <YAxis
                  tick={{ fontSize: 11, fill: "#6B7280" }}
                  allowDecimals={false}
                  width={30}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #E5E7EB",
                    borderRadius: "4px",
                    fontSize: "13px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="#4F46E5"
                  strokeWidth={2}
                  dot={{ fill: "#4F46E5", r: 3 }}
                  activeDot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <p className="text-sm text-body-mid text-center py-12">
            No scan data for this period yet.
          </p>
        )}
      </div>

      {/* Device & Browser breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-canvas rounded-md border border-hairline p-6">
          <h2 className="text-base font-semibold text-ink mb-4">
            Devices
          </h2>
          {analytics && analytics.deviceBreakdown.length > 0 ? (
            <div className="space-y-3">
              {analytics.deviceBreakdown.map((d) => {
                const Icon = deviceIcons[d.device] || Monitor;
                const total = analytics.deviceBreakdown.reduce(
                  (s, x) => s + x.count,
                  0
                );
                const pct = total > 0 ? Math.round((d.count / total) * 100) : 0;
                return (
                  <div key={d.device} className="flex items-center gap-3">
                    <Icon className="h-4 w-4 text-mute shrink-0" aria-hidden="true" />
                    <span className="text-sm text-ink capitalize flex-1">
                      {d.device}
                    </span>
                    <span className="text-sm font-medium text-ink">
                      {d.count}
                    </span>
                    <div className="w-20 h-1.5 bg-canvas-alt rounded-full overflow-hidden">
                      <div
                        className="h-full bg-ink rounded-full"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span className="text-xs text-mute w-8 text-right">
                      {pct}%
                    </span>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-sm text-body-mid text-center py-8">
              No data yet.
            </p>
          )}
        </div>

        <div className="bg-canvas rounded-md border border-hairline p-6">
          <h2 className="text-base font-semibold text-ink mb-4">
            Browsers
          </h2>
          {analytics && analytics.browserBreakdown.length > 0 ? (
            <div className="space-y-3">
              {analytics.browserBreakdown.map((b) => {
                const total = analytics.browserBreakdown.reduce(
                  (s, x) => s + x.count,
                  0
                );
                const pct = total > 0 ? Math.round((b.count / total) * 100) : 0;
                return (
                  <div key={b.browser} className="flex items-center gap-3">
                    <span className="text-sm text-ink flex-1">{b.browser}</span>
                    <span className="text-sm font-medium text-ink">
                      {b.count}
                    </span>
                    <div className="w-20 h-1.5 bg-canvas-alt rounded-full overflow-hidden">
                      <div
                        className="h-full bg-ink rounded-full"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span className="text-xs text-mute w-8 text-right">
                      {pct}%
                    </span>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-sm text-body-mid text-center py-8">
              No data yet.
            </p>
          )}
        </div>
      </div>

      {/* QR Preview Modal */}
      {showQRModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/80 backdrop-blur-sm">
          <div className="bg-canvas rounded-md max-w-md w-full max-h-[90vh] overflow-y-auto relative p-6">
            <button
              onClick={() => setShowQRModal(false)}
              className="absolute top-4 right-4 p-2 text-mute hover:text-ink transition-colors"
              title="Close"
            >
              <X className="h-5 w-5" />
            </button>
            <h2 className="text-xl font-semibold text-ink mb-6 text-center">QR Code Preview</h2>
            <div className="flex justify-center">
              <QRPreview
                config={{
                  ...qr.qrDesign,
                  data: shortUrl,
                  dataType: "url",
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
