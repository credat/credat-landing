"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const stats = [
  { value: "eIDAS 2.0", label: "Regulation Ready", isText: true },
  { value: 50, suffix: "kb", prefix: "<", label: "Bundle Size", isText: false },
  { value: 2, suffix: "", prefix: "", label: "Credential Formats", isText: false },
  { value: "MIT", label: "Open Source License", isText: true },
];

export function Stats() {
  const sectionRef = useRef<HTMLElement>(null);
  const statRefs = useRef<HTMLDivElement[]>([]);
  const numberRefs = useRef<HTMLSpanElement[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      statRefs.current.forEach((stat, i) => {
        gsap.fromTo(
          stat,
          { opacity: 0, y: 40, filter: "blur(4px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.7,
            ease: "power2.out",
            delay: i * 0.12,
            scrollTrigger: { trigger: stat, start: "top 90%" },
          }
        );
      });

      numberRefs.current.forEach((numEl, i) => {
        const stat = stats[i];
        if (stat.isText || !numEl) return;

        const obj = { val: 0 };
        gsap.to(obj, {
          val: stat.value as number,
          duration: 1.5,
          ease: "power2.out",
          snap: { val: 1 },
          scrollTrigger: { trigger: numEl, start: "top 90%" },
          onUpdate: () => {
            numEl.textContent = `${stat.prefix || ""}${obj.val}${stat.suffix || ""}`;
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-32 px-6 bg-background-alt">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              ref={(el) => {
                if (el) statRefs.current[i] = el;
              }}
              className="text-center opacity-0"
            >
              <span
                ref={(el) => {
                  if (el) numberRefs.current[i] = el;
                }}
                className="block text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-foreground"
              >
                {stat.isText
                  ? (stat.value as string)
                  : `${stat.prefix || ""}0${stat.suffix || ""}`}
              </span>
              <span className="mt-3 block text-base text-foreground-secondary">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
