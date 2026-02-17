"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { gsap } from "@/lib/gsap";

const KPI_KEYS = ["eidas", "bundle", "formats"] as const;

export function SectionKpi() {
  const t = useTranslations("Kpi");
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll(".kpi-card");
        gsap.from(cards, {
          rotationY: 30,
          scale: 0.6,
          opacity: 0,
          stagger: 0.15,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 80%",
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative px-6 lg:px-[10vw]">
      <div
        ref={cardsRef}
        className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-5"
        style={{ perspective: "1000px" }}
      >
        {KPI_KEYS.map((key) => (
          <div key={key} className="kpi-card glass-card p-8 flex flex-col min-h-[260px]">
            <div className="grid-overlay" />
            <div className="relative z-10 flex-1 flex flex-col">
              <div className="relative">
                <div className="gradient-text headline-xl">{t(`items.${key}.number`)}</div>
                <div className="number-gradient-softener" />
              </div>
              <div className="mt-auto">
                <h3 className="text-sm font-semibold text-foreground mb-2">{t(`items.${key}.label`)}</h3>
                <p className="text-xs text-foreground-secondary leading-relaxed">{t(`items.${key}.description`)}</p>
              </div>
            </div>
            <div className="ambient-glow-soft" style={{ width: "200px", height: "200px", left: "-40px", bottom: "-40px" }} />
          </div>
        ))}
      </div>
    </section>
  );
}
