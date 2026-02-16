"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { gsap } from "@/lib/gsap";

const PRODUCT_LINKS = [
  { label: "GitHub", href: "https://github.com/credat/credat", external: true },
  { label: "Documentation", href: "https://docs.credat.io", external: true },
  { label: "npm Package", href: "https://www.npmjs.com/package/credat", external: true },
];

const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/privacy", external: false },
  { label: "Terms of Service", href: "/terms", external: false },
  { label: "Apache-2.0 License", href: "https://github.com/credat/credat/blob/main/LICENSE", external: true },
];

const SOCIAL_LINKS = [
  { label: "GitHub", href: "https://github.com/credat/credat" },
  { label: "X", href: "https://x.com/credat_io" },
  { label: "LinkedIn", href: "https://linkedin.com/company/credat" },
];

export function SectionFooter() {
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
    <footer ref={footerRef} className="relative px-6 lg:px-[10vw] py-16 lg:py-24">
      <div className="mx-auto max-w-7xl">
        {/* Top: logo + link columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {/* Logo + description */}
          <div className="footer-animate flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <Image src="/logo.png" alt="Credat" width={24} height={24} className="rounded-sm" />
              <span className="text-sm font-bold tracking-tight text-foreground">credat</span>
            </div>
            <p className="body-md max-w-xs">
              The open-source TypeScript SDK for eIDAS 2.0 verifiable credentials.
            </p>
          </div>

          {/* Product */}
          <div className="footer-animate">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground-secondary mb-4">
              Product
            </h4>
            <ul className="flex flex-col gap-3">
              {PRODUCT_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    className="text-sm text-foreground-secondary hover:text-foreground transition-colors flex items-center gap-1"
                  >
                    {link.label}
                    {link.external && <ArrowUpRight style={{ width: 12, height: 12 }} />}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className="footer-animate">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground-secondary mb-4">
              Legal
            </h4>
            <ul className="flex flex-col gap-3">
              {LEGAL_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    className="text-sm text-foreground-secondary hover:text-foreground transition-colors flex items-center gap-1"
                  >
                    {link.label}
                    {link.external && <ArrowUpRight style={{ width: 12, height: 12 }} />}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="section-divider my-10 !w-full !max-w-none" />

        {/* Bottom: copyright + socials */}
        <div className="footer-animate flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-sm text-foreground-secondary">
            &copy; 2026 Credat. Open source under Apache-2.0.
          </span>
          <div className="flex items-center gap-6">
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-foreground-secondary hover:text-foreground transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
