"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { gsap } from "@/lib/gsap";
import { useTranslations } from "next-intl";

const FOOTER_COLUMNS = [
  {
    key: "product",
    links: [
      { key: "github", href: "https://github.com/credat/credat", external: true },
      { key: "documentation", href: "https://docs.credat.io", external: true },
      { key: "npmPackage", href: "https://www.npmjs.com/package/credat", external: true },
      { key: "changelog", href: "https://github.com/credat/credat/releases", external: true },
    ],
  },
  {
    key: "resources",
    links: [
      { key: "gettingStarted", href: "https://docs.credat.io", external: true },
      { key: "apiReference", href: "https://docs.credat.io/api", external: true },
      { key: "examples", href: "https://github.com/credat/credat/tree/main/examples", external: true },
    ],
  },
  {
    key: "legal",
    links: [
      { key: "privacyPolicy", href: "/privacy", external: false },
      { key: "termsOfService", href: "/terms", external: false },
      { key: "license", href: "https://github.com/credat/credat/blob/main/LICENSE", external: true },
    ],
  },
] as const;

const SOCIAL_LINKS = [
  {
    label: "GitHub",
    href: "https://github.com/credat/credat",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    label: "X",
    href: "https://x.com/credat_io",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/company/credat",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
];

export function SectionFooter() {
  const t = useTranslations("Footer");
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const els = footerRef.current?.querySelectorAll(".footer-animate");
      if (els) {
        gsap.from(els, {
          opacity: 0,
          filter: "blur(4px)",
          y: 20,
          stagger: 0.06,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 90%",
          },
        });
      }
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="relative">
      {/* Top accent line */}
      <div className="h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />

      <div className="px-6 lg:px-[10vw] pt-16 pb-8 lg:pt-20 lg:pb-10">
        <div className="mx-auto max-w-7xl">
          {/* Main grid: Brand + Nav columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] gap-12 lg:gap-8">
            {/* Brand block */}
            <div className="footer-animate flex flex-col gap-5">
              <div className="flex items-center gap-2.5">
                <Image src="/logo.png" alt="Credat" width={28} height={28} className="rounded-md" />
                <span className="text-base font-bold tracking-tight text-foreground">credat</span>
              </div>
              <p className="body-md max-w-xs !text-sm">
                {t("brand")}
              </p>

              {/* Social icons */}
              <div className="flex items-center gap-3 mt-1">
                {SOCIAL_LINKS.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full border border-black/6 bg-white/80 flex items-center justify-center text-foreground-secondary hover:text-foreground hover:border-accent/20 hover:bg-accent/5 transition-all duration-200"
                    aria-label={link.label}
                  >
                    {link.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Nav columns */}
            {FOOTER_COLUMNS.map((col) => (
              <div key={col.key} className="footer-animate">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground mb-4">
                  {t(`columns.${col.key}.title`)}
                </h4>
                <ul className="flex flex-col gap-2.5">
                  {col.links.map((link) => (
                    <li key={link.key}>
                      {link.external ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-foreground-secondary hover:text-foreground transition-colors inline-flex items-center gap-1 group"
                        >
                          {t(`columns.${col.key}.${link.key}`)}
                          <ArrowUpRight
                            style={{ width: 12, height: 12 }}
                            className="opacity-0 group-hover:opacity-100 transition-opacity -translate-y-px"
                          />
                        </a>
                      ) : (
                        <Link
                          href={link.href}
                          className="text-sm text-foreground-secondary hover:text-foreground transition-colors"
                        >
                          {t(`columns.${col.key}.${link.key}`)}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="h-px bg-black/6 my-8 lg:my-10" />

          {/* Bottom row */}
          <div className="footer-animate flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="text-xs text-foreground-secondary">
              {t("copyright", { year: new Date().getFullYear() })}
            </span>
            <div className="flex items-center gap-1 text-xs text-foreground-secondary">
              <span>{t("builtWith")}</span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/[0.03] font-mono text-[11px]">
                TypeScript
              </span>
              <span>&</span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/[0.03] font-mono text-[11px]">
                Next.js
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
