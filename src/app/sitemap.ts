import type { MetadataRoute } from "next";

const locales = ["en", "fr", "de", "es"];
const baseUrl = "https://credat.io";

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.map((locale) => ({
    url: locale === "en" ? baseUrl : `${baseUrl}/${locale}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 1,
    alternates: {
      languages: Object.fromEntries(
        locales.map((l) => [l, l === "en" ? baseUrl : `${baseUrl}/${l}`])
      ),
    },
  }));
}
