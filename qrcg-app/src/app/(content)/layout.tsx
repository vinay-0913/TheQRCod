import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function ContentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="bg-canvas min-h-screen">
        <article className="container-main py-16 md:py-20 max-w-3xl">
          {children}
        </article>
      </main>
      <Footer />
    </>
  );
}
