"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const problems = [
  {
    icon: "📅",
    title: "eIDAS 2.0 is coming",
    description:
      "Every bank, fintech, and telecom in the EU must accept digital identity wallets by December 2027. The clock is ticking.",
  },
  {
    icon: "🔧",
    title: "Current SDKs are painful",
    description:
      "Thousands of lines of config, PhD-level complexity, months of integration work. Most developers give up.",
  },
  {
    icon: "⚡",
    title: "Credat makes it simple",
    description:
      "npm install, 10 lines of TypeScript, your first credential in minutes. Not months.",
  },
];

export function Problem() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (!sectionRef.current || !titleRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 30, filter: "blur(8px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: { trigger: titleRef.current, start: "top 85%" },
        }
      );

      cardsRef.current.forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 40, filter: "blur(4px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.7,
            ease: "power2.out",
            delay: i * 0.15,
            scrollTrigger: { trigger: card, start: "top 90%" },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-32 px-6">
      <div className="mx-auto max-w-7xl">
        <h2
          ref={titleRef}
          className="text-4xl sm:text-5xl font-bold tracking-tight text-center opacity-0"
        >
          Why Credat?
        </h2>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          {problems.map((item, i) => (
            <div
              key={item.title}
              ref={(el) => {
                if (el) cardsRef.current[i] = el;
              }}
              className="rounded-2xl border border-border p-8 opacity-0"
            >
              <span className="text-4xl">{item.icon}</span>
              <h3 className="mt-4 text-xl font-semibold">{item.title}</h3>
              <p className="mt-3 text-foreground-secondary leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
