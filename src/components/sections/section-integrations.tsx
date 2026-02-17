"use client";

import { useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { gsap } from "@/lib/gsap";
import { Package, Code2, Zap } from "lucide-react";
import { useTranslations } from "next-intl";

const PROTOCOL_KEYS = ["openid4vci", "openid4vp", "didcomm"] as const;

const DEV_TOOL_META = [
  { key: "install", icon: Package },
  { key: "typescript", icon: Code2 },
  { key: "bundle", icon: Zap },
] as const;

export function SectionIntegrations() {
  const t = useTranslations("Integrations");
  const sectionRef = useRef<HTMLElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, watchDrag: false });
  const [protocolIndex, setProtocolIndex] = useState(0);

  // Auto-rotate protocols
  useEffect(() => {
    const interval = setInterval(() => {
      if (emblaApi) {
        emblaApi.scrollNext();
      }
    }, 3500);
    return () => clearInterval(interval);
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setProtocolIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    return () => { emblaApi.off("select", onSelect); };
  }, [emblaApi]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (pillRef.current) {
        gsap.from(pillRef.current, {
          opacity: 0,
          filter: "blur(8px)",
          duration: 0.6,
          scrollTrigger: { trigger: pillRef.current, start: "top 95%" },
        });
      }
      if (headlineRef.current) {
        gsap.from(headlineRef.current, {
          opacity: 0,
          filter: "blur(8px)",
          y: 30,
          duration: 0.8,
          scrollTrigger: { trigger: headlineRef.current, start: "top 85%" },
        });
      }
      if (gridRef.current) {
        const items = gridRef.current.querySelectorAll(".bento-item");
        gsap.from(items, {
          rotationY: 30,
          scale: 0.6,
          opacity: 0,
          stagger: 0.15,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: { trigger: gridRef.current, start: "top 80%" },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="integrations" className="relative px-6 lg:px-[10vw]">
      <div className="mx-auto max-w-7xl">
        <div className="section-textbox mb-12">
          <div ref={pillRef} className="pill-badge">
            <span className="w-2 h-2 rounded-full bg-accent" />
            <span className="text-xs font-medium text-foreground-secondary">{t("badge")}</span>
          </div>
          <h2 ref={headlineRef} className="headline-lg text-foreground">
            {t("title")}
          </h2>
        </div>

        {/* Bento grid */}
        <div ref={gridRef} className="bento-grid" style={{ perspective: "1000px" }}>
          {/* Big: Credential Formats */}
          <div className="bento-item md:row-span-2 flex flex-col">
            <div className="grid-overlay" />
            <div className="relative z-10">
              <h3 className="headline-sm text-foreground mb-2">{t("credentialFormats.title")}</h3>
              <p className="body-md">
                {t("credentialFormats.description")}
              </p>
            </div>
            <div className="relative z-10 flex gap-4 mt-auto pt-6">
              <div className="rounded-2xl border border-accent/15 bg-accent/5 p-4 flex-1 text-center">
                <div className="text-lg font-bold text-foreground">{t("credentialFormats.sdjwt")}</div>
                <div className="text-xs text-foreground-secondary mt-1">{t("credentialFormats.sdjwtSub")}</div>
              </div>
              <div className="rounded-2xl border border-accent/15 bg-accent/5 p-4 flex-1 text-center">
                <div className="text-lg font-bold text-foreground">{t("credentialFormats.mdoc")}</div>
                <div className="text-xs text-foreground-secondary mt-1">{t("credentialFormats.mdocSub")}</div>
              </div>
            </div>
            <div className="ambient-glow" style={{ width: "200px", height: "200px", right: "-40px", top: "-40px" }} />
          </div>

          {/* Small: Protocol carousel */}
          <div className="bento-item flex flex-col justify-between min-h-[180px]">
            <div className="grid-overlay" />
            <div className="relative z-10">
              <h3 className="text-sm font-semibold text-foreground mb-3">{t("protocols.title")}</h3>
              <div ref={emblaRef} className="embla overflow-hidden">
                <div className="embla__container">
                  {PROTOCOL_KEYS.map((key) => (
                    <div key={key} className="embla__slide">
                      <div className="font-bold text-foreground mb-1">{t(`protocols.${key}.name`)}</div>
                      <p className="text-xs text-foreground-secondary leading-relaxed">{t(`protocols.${key}.description`)}</p>
                    </div>
                  ))}
                </div>
              </div>
              {/* Mini dots */}
              <div className="flex gap-1.5 mt-3">
                {PROTOCOL_KEYS.map((key, i) => (
                  <div
                    key={key}
                    className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
                      i === protocolIndex ? "bg-accent" : "bg-black/10"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Small: Stacked notification cards */}
          <div className="bento-item flex flex-col justify-between min-h-[180px]">
            <div className="grid-overlay" />
            <div className="relative z-10">
              <h3 className="text-sm font-semibold text-foreground mb-3">{t("devTools.title")}</h3>
              <div className="stacked-cards flex flex-col gap-2.5">
                {DEV_TOOL_META.map((card, i) => (
                  <div
                    key={card.key}
                    className="stacked-card"
                    style={{ transform: `translateZ(${(2 - i) * 4}px)` }}
                  >
                    <card.icon className="w-5 h-5 text-accent" strokeWidth={1.5} />
                    <div>
                      <div className="text-sm font-medium text-foreground">{t(`devTools.${card.key}.label`)}</div>
                      <div className="text-xs text-foreground-secondary">{t(`devTools.${card.key}.sub`)}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
