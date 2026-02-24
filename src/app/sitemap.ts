import type { MetadataRoute } from "next";

const locales = ["en", "fr", "de", "es"];
const baseUrl = "https://credat.io";

const pages = ["", "/privacy", "/terms"];

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.flatMap((page) =>
    locales.map((locale) => {
      const path = locale === "en" ? page : `/${locale}${page}`;
      return {
        url: `${baseUrl}${path}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: page === "" ? 1 : 0.3,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [
              l,
              l === "en" ? `${baseUrl}${page}` : `${baseUrl}/${l}${page}`,
            ])
          ),
        },
      };
    })
  );
}
