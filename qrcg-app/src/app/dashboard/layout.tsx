import DashboardSidebar from "@/components/layout/DashboardSidebar";

export const metadata = {
  robots: { index: false, follow: false },
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-canvas-alt">
      <DashboardSidebar />
      <main className="flex-1 p-6 lg:p-8">{children}</main>
    </div>
  );
}
