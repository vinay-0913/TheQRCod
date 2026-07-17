import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#4F46E5",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://theqrcod.com"),
  title: {
    default: "The QR Code Generator — Free Static & Dynamic QR Codes",
    template: "%s | The QR Code Generator",
  },
  description:
    "Create free static QR codes instantly or generate trackable dynamic QR codes with scan analytics. Customize colors, shapes, and logos. No signup required for static codes.",
  keywords: [
    "qr code generator",
    "free qr code",
    "dynamic qr code",
    "qr code maker",
    "custom qr code",
    "qr code with logo",
    "trackable qr code",
  ],
  authors: [{ name: "The QR Code Generator" }],
  creator: "The QR Code Generator",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://theqrcod.com",
    siteName: "The QR Code Generator",
    title: "The QR Code Generator — Free Static & Dynamic QR Codes",
    description:
      "Create free static QR codes instantly or generate trackable dynamic QR codes with scan analytics.",
  },
  twitter: {
    card: "summary_large_image",
    title: "The QR Code Generator — Free Static & Dynamic QR Codes",
    description:
      "Create free static QR codes instantly or generate trackable dynamic QR codes with scan analytics.",
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
    <html lang="en" className={inter.variable}>
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
        {children}
      </body>
    </html>
  );
}
