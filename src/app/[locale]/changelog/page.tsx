import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ArrowUpRight } from "lucide-react";

const GITHUB_RELEASES_URL =
  "https://api.github.com/repos/credat/credat/releases";

type Release = {
  tag_name: string;
  published_at: string;
  html_url: string;
  body: string;
};

type ParsedSection = {
  title: string;
  items: string[];
};

function parseReleaseBody(body: string): ParsedSection[] {
  const sections: ParsedSection[] = [];
  let currentSection: ParsedSection | null = null;

  for (const line of body.split("\n")) {
    const sectionMatch = line.match(/^### (.+)/);
    if (sectionMatch) {
      currentSection = { title: sectionMatch[1].trim(), items: [] };
      sections.push(currentSection);
      continue;
    }

    if (currentSection && line.startsWith("* ")) {
      const text = line
        .slice(2)
        .replace(/\s*\(\[[\da-f]+\]\([^)]+\)\)/g, "")
        .replace(/\s*\(\[#(\d+)\]\([^)]+\)\)/g, " (#$1)")
        .trim();
      if (text) currentSection.items.push(text);
    }
  }

  return sections;
}

function formatDate(iso: string, locale: string): string {
  return new Date(iso).toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

async function fetchReleases(): Promise<Release[]> {
  const res = await fetch(`${GITHUB_RELEASES_URL}?per_page=10`, {
    next: { revalidate: 3600 },
    headers: {
      Accept: "application/vnd.github+json",
    },
  });

  if (!res.ok) return [];
  return res.json();
}

export default async function ChangelogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Changelog" });
  const tLegal = await getTranslations({ locale, namespace: "Legal" });

  const releases = await fetchReleases();

  return (
    <main className="min-h-screen pt-[120px] pb-20 px-6 lg:px-[10vw]">
      <div className="mx-auto max-w-3xl">
        <h1 className="headline-lg text-foreground mb-3">{t("title")}</h1>
        <p className="body-lg text-foreground-secondary mb-12">
          {t("description")}
        </p>

        {releases.length === 0 ? (
          <p className="body-lg text-foreground-secondary">{t("noReleases")}</p>
        ) : (
          <div className="space-y-10">
            {releases.map((release) => {
              const sections = parseReleaseBody(release.body);

              return (
                <article
                  key={release.tag_name}
                  className="relative pl-6 border-l-2 border-accent/20"
                >
                  <div className="absolute -left-[7px] top-1 w-3 h-3 rounded-full bg-accent/30 border-2 border-white" />

                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold bg-accent/10 text-accent">
                      {release.tag_name}
                    </span>
                    <time
                      dateTime={release.published_at}
                      className="text-sm text-foreground-secondary"
                    >
                      {formatDate(release.published_at, locale)}
                    </time>
                    <a
                      href={release.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-accent hover:underline inline-flex items-center gap-0.5"
                    >
                      {t("viewOnGithub")}
                      <ArrowUpRight style={{ width: 12, height: 12 }} />
                    </a>
                  </div>

                  {sections.map((section) => (
                    <div key={section.title} className="mb-4 last:mb-0">
                      <h3 className="text-sm font-semibold text-foreground mb-2">
                        {section.title}
                      </h3>
                      <ul className="space-y-1.5">
                        {section.items.map((item, i) => (
                          <li
                            key={i}
                            className="text-sm text-foreground-secondary pl-4 relative before:content-[''] before:absolute before:left-0 before:top-[9px] before:w-1.5 before:h-1.5 before:rounded-full before:bg-foreground-secondary/30"
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </article>
              );
            })}
          </div>
        )}

        <Link
          href="/"
          className="inline-block mt-12 text-sm text-accent hover:underline"
        >
          &larr; {tLegal("backToHome")}
        </Link>
      </div>
    </main>
  );
}
