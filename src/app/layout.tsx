import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { SmoothScroll } from "@/components/smooth-scroll";
import { Navbar } from "@/components/navbar";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  title: "Credat — The Developer SDK for EU Digital Identity",
  description:
    "Issue and verify eIDAS 2.0 verifiable credentials in 10 lines of TypeScript.",
  metadataBase: new URL("https://credat.io"),
  openGraph: {
    title: "Credat — The Developer SDK for EU Digital Identity",
    description:
      "Issue and verify eIDAS 2.0 verifiable credentials in 10 lines of TypeScript.",
    url: "https://credat.io",
    siteName: "Credat",
    type: "website",
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
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrains.variable}`}>
      <body className="bg-background text-foreground font-sans antialiased">
        <Navbar />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
