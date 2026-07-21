import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { generatePageMetadata } from "@/lib/seo";
import { auth } from "@/lib/auth";
import PricingClient from "@/components/pricing/PricingClient";

export const metadata: Metadata = generatePageMetadata({
  title: "Pricing — Dynamic QR Codes with Analytics",
  description:
    "Start with 5 dynamic QR codes at Rs.199/month. Add more as you grow. Full analytics, editable destinations, and more.",
  path: "/pricing",
});

export default async function PricingPage() {
  const session = await auth();
  const user = session?.user as
    | { id: string; name?: string; email?: string; plan?: string; qrLimit?: number }
    | undefined;

  return (
    <>
      <Navbar />
      <main className="bg-canvas min-h-screen">
        <section className="container-main py-20 md:py-28">
          <div className="text-center mb-16">
            <h1 className="display-heading text-4xl md:text-5xl font-semibold text-ink leading-tight">
              Pay for What You Need
            </h1>
            <p className="mt-4 text-lg text-body max-w-xl mx-auto">
              Start with 5 dynamic QR codes. Add more anytime with the{" "}
              <span className="font-medium text-ink">+</span> button — price updates instantly.
            </p>
          </div>

          <PricingClient
            isLoggedIn={!!session}
            userEmail={user?.email}
            userName={user?.name}
            currentPlan={user?.plan}
            currentQrLimit={user?.qrLimit ?? 0}
          />
        </section>
      </main>
      <Footer />
    </>
  );
}
