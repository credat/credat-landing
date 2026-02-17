import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { routing } from "@/i18n/routing";
import Script from "next/script";
import { Inter, JetBrains_Mono } from "next/font/google";
import { SmoothScroll } from "@/components/smooth-scroll";
import { Navbar } from "@/components/navbar";
import { LoadingScreen } from "@/components/loading-screen";
import "../globals.css";

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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  const localeMap: Record<string, string> = {
    en: "en_US",
    fr: "fr_FR",
    de: "de_DE",
    es: "es_ES",
  };

  return {
    title: t("title"),
    description: t("description"),
    keywords: [
      "eIDAS 2.0", "verifiable credentials", "SD-JWT VC", "mDoc",
      "OpenID4VCI", "OpenID4VP", "digital identity", "SSI",
      "self-sovereign identity", "TypeScript SDK", "EUDIW",
      "EU Digital Identity Wallet", "DIDComm",
      "credential issuance", "credential verification",
    ],
    metadataBase: new URL("https://credat.io"),
    openGraph: {
      title: t("title"),
      description: t("ogDescription"),
      url: "https://credat.io",
      siteName: "Credat",
      type: "website",
      locale: localeMap[locale] ?? "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("twitterDescription"),
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
    alternates: {
      languages: {
        en: "/",
        fr: "/fr",
        de: "/de",
        es: "/es",
      },
    },
    other: {
      "theme-color": "#FFFFFF",
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as typeof routing.locales[number])) {
    notFound();
  }

  const messages = await getMessages();

  const tMeta = await getTranslations({ locale, namespace: "Metadata" });

  const jsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Credat",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Cross-platform",
    description: tMeta("description"),
    url: "https://credat.io",
    inLanguage: locale,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    author: { "@type": "Organization", name: "Credat", url: "https://credat.io" },
  });

  return (
    <html lang={locale} className={`${inter.variable} ${jetbrains.variable}`}>
      <head>
        <Script
          id="json-ld"
          type="application/ld+json"
          strategy="beforeInteractive"
        >{jsonLd}</Script>
      </head>
      <body className="bg-background text-foreground font-sans antialiased">
        <NextIntlClientProvider messages={messages}>
          <LoadingScreen />
          <Navbar />
          <SmoothScroll>{children}</SmoothScroll>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
