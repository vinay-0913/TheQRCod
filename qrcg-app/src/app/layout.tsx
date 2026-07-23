import type { Metadata, Viewport } from "next";
import { Inter, Manrope } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import AuthSessionProvider from "@/components/providers/SessionProvider";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
  weight: ["600", "700"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#111111",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://theqrcod.com"),
  title: {
    default: "QR Code Generator — Best Free QR Code Generator Online",
    template: "%s | The QR Code Generator",
  },
  description:
    "The best free QR code generator online. Create custom static and dynamic QR codes with logos, colors, and scan tracking. Fast, free, and no signup needed.",
  keywords: [
    "QR Code Generator",
    "qr code generator",
    "free qr code generator",
    "qr code generator free",
    "qr code generator free online",
    "best free qr code generator",
    "qr code generator canva",
    "google qr code generator",
    "the qr code generator",
    "bulk qr code generator",
    "qr code generator online",
    "UPI QR code generator",
    "Location QR code Generator",
    "QR Code generator text",
    "custom qr code with logo",
    "dynamic qr code generator",
  ],
  authors: [{ name: "The QR Code Generator" }],
  creator: "The QR Code Generator",
  alternates: {
    canonical: "https://theqrcod.com",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://theqrcod.com",
    siteName: "The QR Code Generator",
    title: "QR Code Generator — Best Free QR Code Generator Online",
    description:
      "Create free static and dynamic QR codes online with custom colors, logos, and scan analytics. Try the best free QR code generator online today.",
    images: [
      {
        url: "https://theqrcod.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "The Best Free QR Code Generator Online",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "QR Code Generator — Best Free QR Code Generator Online",
    description:
      "Create free static and dynamic QR codes online with custom colors, logos, and scan analytics. Try the best free QR code generator online today.",
    images: ["https://theqrcod.com/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${manrope.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "The QR Code Generator",
              url: "https://theqrcod.com",
              logo: "https://theqrcod.com/icon.png",
              sameAs: [],
            }),
          }}
        />
      </head>
      <body className="min-h-screen bg-canvas text-body antialiased">
        {/* Google Tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XVT5QWQESF"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-XVT5QWQESF');
          `}
        </Script>
        <AuthSessionProvider>{children}</AuthSessionProvider>
      </body>
    </html>
  );
}
