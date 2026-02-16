import type { Metadata } from "next";
import Script from "next/script";
import { Inter, JetBrains_Mono } from "next/font/google";
import { SmoothScroll } from "@/components/smooth-scroll";
import { Navbar } from "@/components/navbar";
import { LoadingScreen } from "@/components/loading-screen";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Credat — The Developer SDK for EU Digital Identity",
  description:
    "Issue and verify eIDAS 2.0 verifiable credentials in 10 lines of TypeScript. SD-JWT VC & mDoc formats, OpenID4VC protocols, zero vendor lock-in. Open-source TypeScript SDK for eIDAS 2.0.",
  keywords: [
    "eIDAS 2.0",
    "verifiable credentials",
    "SD-JWT VC",
    "mDoc",
    "OpenID4VCI",
    "OpenID4VP",
    "digital identity",
    "SSI",
    "self-sovereign identity",
    "TypeScript SDK",
    "EUDIW",
    "EU Digital Identity Wallet",
    "DIDComm",
    "credential issuance",
    "credential verification",
  ],
  metadataBase: new URL("https://credat.io"),
  openGraph: {
    title: "Credat — The Developer SDK for EU Digital Identity",
    description:
      "Issue and verify eIDAS 2.0 verifiable credentials in 10 lines of TypeScript. SD-JWT VC & mDoc formats, OpenID4VC protocols.",
    url: "https://credat.io",
    siteName: "Credat",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Credat — The Developer SDK for EU Digital Identity",
    description:
      "Issue and verify eIDAS 2.0 verifiable credentials in 10 lines of TypeScript.",
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
  other: {
    "theme-color": "#FFFFFF",
  },
};

// Static JSON-LD — safe since it's hardcoded, not user-supplied
const JSON_LD = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Credat",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Cross-platform",
  description:
    "Open-source TypeScript SDK for issuing and verifying eIDAS 2.0 verifiable credentials. Supports SD-JWT VC, mDoc, OpenID4VCI, and OpenID4VP.",
  url: "https://credat.io",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  author: {
    "@type": "Organization",
    name: "Credat",
    url: "https://credat.io",
  },
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrains.variable}`}>
      <head>
        <Script
          id="json-ld"
          type="application/ld+json"
          strategy="beforeInteractive"
        >{JSON_LD}</Script>
      </head>
      <body className="bg-background text-foreground font-sans antialiased">
        <LoadingScreen />
        <Navbar />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
