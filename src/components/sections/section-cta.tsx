"use client";

import { useEffect, useRef } from "react";
import { ArrowUpRight, BookOpen } from "lucide-react";
import { gsap, SplitText } from "@/lib/gsap";

export function SectionCta() {
  const sectionRef = useRef<HTMLElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

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
        const split = new SplitText(headlineRef.current, { type: "words" });
        gsap.from(split.words, {
          opacity: 0,
          filter: "blur(8px)",
          yPercent: 50,
          stagger: 0.05,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: { trigger: headlineRef.current, start: "top 85%" },
        });
      }

      if (descRef.current) {
        gsap.from(descRef.current, {
          opacity: 0,
          filter: "blur(4px)",
          y: 20,
          duration: 0.8,
          delay: 0.2,
          scrollTrigger: { trigger: descRef.current, start: "top 90%" },
        });
      }

      if (ctaRef.current) {
        gsap.from(ctaRef.current.children, {
          opacity: 0,
          y: 15,
          stagger: 0.1,
          duration: 0.6,
          delay: 0.3,
          scrollTrigger: { trigger: ctaRef.current, start: "top 95%" },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative px-6 lg:px-[10vw]">
      <div className="ambient-glow w-[400px] h-[400px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />

      <div className="mx-auto max-w-7xl">
        <div className="glass-card-accent px-6 py-20 lg:px-12 lg:py-28">
          <div className="section-textbox relative z-10">
            <div ref={pillRef} className="pill-badge">
              <span className="w-2 h-2 rounded-full bg-accent" />
              <span className="text-xs font-medium text-foreground-secondary">Open Source</span>
            </div>

            <h2 ref={headlineRef} className="headline-lg text-foreground max-w-3xl">
              Build the Future of Digital Identity
            </h2>

            <p ref={descRef} className="body-lg max-w-2xl">
              Credat is open source and built for the community. Start issuing eIDAS 2.0 credentials
              in minutes — or contribute to shape the standard.
            </p>

            <div ref={ctaRef} className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="https://github.com/credat/credat"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-scroll btn-scroll-primary"
              >
                <div className="btn-scroll-content">
                  <span>View on GitHub</span>
                  <span>View on GitHub</span>
                </div>
                <div className="btn-scroll-circle">
                  <ArrowUpRight className="btn-scroll-icon" />
                </div>
              </a>

              <a
                href="https://docs.credat.io"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-scroll"
              >
                <div className="btn-scroll-content">
                  <span>Read the Docs</span>
                  <span>Read the Docs</span>
                </div>
                <div className="btn-scroll-circle">
                  <BookOpen className="btn-scroll-icon" />
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
