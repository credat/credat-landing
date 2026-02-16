"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const steps = [
  {
    number: "01",
    title: "Install",
    code: "npm install credat",
    icon: (
      <svg className="h-8 w-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Configure",
    code: "createClient()",
    icon: (
      <svg className="h-8 w-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Ship",
    code: "credentials.issue()",
    icon: (
      <svg className="h-8 w-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
      </svg>
    ),
  },
];

export function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const stepsRef = useRef<HTMLDivElement[]>([]);
  const linesRef = useRef<SVGLineElement[]>([]);

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

      const tl = gsap.timeline({
        scrollTrigger: { trigger: sectionRef.current, start: "top 60%" },
      });

      stepsRef.current.forEach((step, i) => {
        tl.fromTo(
          step,
          { opacity: 0, y: 40, filter: "blur(4px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.6, ease: "power2.out" },
          i * 0.25
        );

        if (linesRef.current[i]) {
          tl.fromTo(
            linesRef.current[i],
            { strokeDashoffset: 100 },
            { strokeDashoffset: 0, duration: 0.5, ease: "power2.inOut" },
            i * 0.25 + 0.3
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-32 px-6">
      <div className="mx-auto max-w-5xl">
        <h2
          ref={titleRef}
          className="text-4xl sm:text-5xl font-bold tracking-tight text-center opacity-0"
        >
          Three steps to production
        </h2>

        <div className="mt-20 flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-0">
          {steps.map((step, i) => (
            <div key={step.number} className="flex flex-col lg:flex-row items-center flex-1">
              <div
                ref={(el) => {
                  if (el) stepsRef.current[i] = el;
                }}
                className="flex flex-col items-center text-center opacity-0 w-full"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-accent-light">
                  {step.icon}
                </div>
                <span className="mt-4 text-sm font-medium text-accent">{step.number}</span>
                <h3 className="mt-2 text-xl font-semibold">{step.title}</h3>
                <code className="mt-2 rounded-lg bg-background-alt px-3 py-1.5 text-sm font-mono text-foreground-secondary">
                  {step.code}
                </code>
              </div>

              {i < steps.length - 1 && (
                <svg
                  className="hidden lg:block w-24 h-[2px] shrink-0 mx-4"
                  viewBox="0 0 100 2"
                >
                  <line
                    ref={(el) => {
                      if (el) linesRef.current[i] = el;
                    }}
                    x1="0"
                    y1="1"
                    x2="100"
                    y2="1"
                    stroke="#E5E7EB"
                    strokeWidth="2"
                    strokeDasharray="100"
                    strokeDashoffset="100"
                  />
                </svg>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
