import { getTranslations } from "next-intl/server";
import { LegalLayout } from "@/components/legal-layout";
import { ReactNode } from "react";

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Terms" });
  const tLegal = await getTranslations({ locale, namespace: "Legal" });

  function richLink(href: string, external = false) {
    return function RichLinkTag(chunks: ReactNode) {
      return (
        <a
          href={href}
          className="text-accent hover:underline"
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {chunks}
        </a>
      );
    };
  }

  return (
    <LegalLayout
      title={t("title")}
      lastUpdated={t("lastUpdated")}
      lastUpdatedLabel={tLegal("lastUpdatedLabel")}
      backLabel={tLegal("backToHome")}
    >
      <section>
        <h2 className="text-xl font-semibold text-foreground mb-3">{t("s1Title")}</h2>
        <p>{t.rich("s1P1", { siteLink: richLink("https://credat.io") })}</p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-foreground mb-3">{t("s2Title")}</h2>
        <p>
          {t.rich("s2P1", {
            licenseLink: richLink(
              "https://github.com/credat/credat/blob/main/LICENSE",
              true
            ),
          })}
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-foreground mb-3">{t("s3Title")}</h2>
        <p>{t("s3P1")}</p>
        <ul className="list-disc pl-6 mt-3 space-y-2">
          <li>{t("s3Item1")}</li>
          <li>{t("s3Item2")}</li>
          <li>{t("s3Item3")}</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-foreground mb-3">{t("s4Title")}</h2>
        <p>{t("s4P1")}</p>
        <p className="mt-3">{t("s4P2")}</p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-foreground mb-3">{t("s5Title")}</h2>
        <p>
          {t.rich("s5P1", {
            docsLink: richLink("https://docs.credat.io", true),
          })}
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-foreground mb-3">{t("s6Title")}</h2>
        <p>{t("s6P1")}</p>
        <p className="mt-3">{t("s6P2")}</p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-foreground mb-3">{t("s7Title")}</h2>
        <p>{t("s7P1")}</p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-foreground mb-3">{t("s8Title")}</h2>
        <p>{t("s8P1")}</p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-foreground mb-3">{t("s9Title")}</h2>
        <p>{t("s9P1")}</p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-foreground mb-3">{t("s10Title")}</h2>
        <p>{t("s10P1")}</p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-foreground mb-3">{t("s11Title")}</h2>
        <p>
          {t.rich("s11P1", {
            emailLink: richLink("mailto:maxime.mansiet@gmail.com"),
          })}
        </p>
      </section>
    </LegalLayout>
  );
}
