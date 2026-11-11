import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { AdSenseScript } from "@/components/AdSlot";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { SITE } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "CMtoIN – CM to Inches Converter & Conversion Charts",
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  manifest: "/manifest.webmanifest",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: `${SITE.url}/`,
    title: "CMtoIN – CM to Inches Converter & Conversion Charts",
    description: SITE.description,
    siteName: SITE.name,
    locale: SITE.locale,
    images: [
      {
        url: `${SITE.url}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "CMtoIN — Convert measurements instantly.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CMtoIN – CM to Inches Converter & Conversion Charts",
    description: SITE.description,
    images: [`${SITE.url}/og-image.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  category: "reference",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#2563EB",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-US" className={inter.variable}>
      <body className="flex min-h-dvh flex-col bg-white font-sans text-navy antialiased">
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <Header />
        <div className="flex-1">{children}</div>
        <Footer />
        <AdSenseScript />
        <Analytics />
      </body>
    </html>
  );
}
