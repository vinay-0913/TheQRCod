"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { User, Mail, Calendar, Shield } from "lucide-react";

interface UserInfo {
  name: string;
  email: string;
  plan: string;
  createdAt: string;
}

export default function AccountPage() {
  const { data: session } = useSession();
  const [user, setUser] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/user/me")
      .then((r) => r.json())
      .then((data) => { setUser(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin h-8 w-8 border-2 border-accent border-t-transparent rounded-full" />
      </div>
    );
  }

  const joinDate = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-IN", {
        year: "numeric", month: "long", day: "numeric",
      })
    : "—";

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-semibold text-ink mb-2">Account</h1>
      <p className="text-sm text-body-mid mb-8">Your profile and account information.</p>

      {/* Profile card */}
      <div className="bg-canvas rounded-md border border-hairline divide-y divide-hairline">

        {/* Avatar + name header */}
        <div className="p-4 sm:p-6 flex items-center gap-4">
          <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-full bg-surface-card flex items-center justify-center text-xl sm:text-2xl font-semibold text-ink shrink-0">
            {user?.name?.charAt(0).toUpperCase() ?? "?"}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-base font-semibold text-ink truncate">{user?.name}</p>
            <p className="text-xs sm:text-sm text-body-mid truncate">{user?.email}</p>
          </div>
        </div>

        {/* Fields */}
        {[
          { icon: User, label: "Full Name", value: user?.name ?? "—" },
          { icon: Mail, label: "Email Address", value: user?.email ?? "—" },
          {
            icon: Shield,
            label: "Plan",
            value: user?.plan === "pro" ? "Pro" : "Free",
            badge: user?.plan === "pro",
          },
          { icon: Calendar, label: "Member Since", value: joinDate },
        ].map(({ icon: Icon, label, value, badge }) => (
          <div key={label} className="px-4 sm:px-6 py-4 flex items-center gap-4">
            <Icon className="h-4 w-4 text-mute shrink-0" aria-hidden="true" />
            <div className="flex-1 min-w-0">
              <p className="text-xs text-body-mid">{label}</p>
              <p className="text-sm font-medium text-ink flex items-center gap-2 mt-0.5 truncate">
                <span className="truncate">{value}</span>
                {badge && (
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 shrink-0">
                    Pro
                  </span>
                )}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Security note */}
      <p className="text-xs text-mute mt-6">
        To change your email or password, please contact support.
        {session && " Your account is secured with NextAuth."}
      </p>
    </div>
  );
}
