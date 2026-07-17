"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import DataTypeSelector from "@/components/qr/DataTypeSelector";

interface QRDetail {
  _id: string;
  name: string;
  targetUrl: string;
}

export default function EditQRPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const [qr, setQr] = useState<QRDetail | null>(null);
  const [name, setName] = useState("");
  const [targetUrl, setTargetUrl] = useState("");
  const [dataType, setDataType] = useState<any>("url");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    fetch(`/api/qr/${id}`)
      .then((r) => r.json())
      .then((data) => {
        setQr(data);
        setName(data.name);
        setTargetUrl(data.targetUrl);
        if (data.targetUrl.startsWith("mailto:")) setDataType("email");
        else if (data.targetUrl.startsWith("tel:")) setDataType("phone");
        else if (data.targetUrl.startsWith("sms:")) setDataType("sms");
        else setDataType("url");
        setFetching(false);
      });
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(`/api/qr/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, targetUrl }),
      });

      if (res.ok) {
        router.push(`/dashboard/${id}`);
      } else {
        const data = await res.json();
        setError(data.error || "Failed to update");
      }
    } catch {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin h-8 w-8 border-2 border-accent border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!qr) {
    return <p className="text-body-mid text-center py-12">QR code not found</p>;
  }

  return (
    <div className="max-w-xl">
      <Link
        href={`/dashboard/${id}`}
        className="inline-flex items-center gap-2 text-sm text-body-mid hover:text-ink mb-6"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Back to QR details
      </Link>

      <h1 className="text-2xl font-semibold text-ink mb-8">Edit QR Code</h1>

      {error && (
        <div className="mb-6 p-3 rounded-sm bg-error-light text-error text-sm" role="alert">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-canvas rounded-md border border-hairline p-6 space-y-4">
          <Input
            label="QR Code Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <DataTypeSelector
            allowedTypes={["url", "email", "phone", "sms"]}
            dataType={dataType}
            data={targetUrl}
            onChange={(type, data) => {
              setDataType(type);
              setTargetUrl(data);
            }}
          />
          <p className="text-sm text-body-mid">
            Change where this QR code redirects to. No need to reprint.
          </p>
        </div>
        <div className="flex gap-3">
          <Button type="submit" loading={loading} className="flex-1">
            Save Changes
          </Button>
          <Link href={`/dashboard/${id}`}>
            <Button variant="secondary" type="button">
              Cancel
            </Button>
          </Link>
        </div>
      </form>
    </div>
  );
}
