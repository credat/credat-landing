"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import dynamic from "next/dynamic";

gsap.registerPlugin(SplitText);

const CardScene = dynamic(
  () =>
    import("@/components/three/card-scene").then((mod) => ({
      default: mod.CardScene,
    })),
  { ssr: false }
);

export function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!titleRef.current || !subtitleRef.current || !ctaRef.current) return;

    const split = new SplitText(titleRef.current, { type: "words" });
    // Make parent visible — individual words handle their own opacity
    gsap.set(titleRef.current, { opacity: 1 });

    const tl = gsap.timeline({ delay: 0.3 });

    tl.fromTo(
      split.words,
      { opacity: 0, yPercent: 50, filter: "blur(8px)" },
      {
        opacity: 1,
        yPercent: 0,
        filter: "blur(0px)",
        stagger: 0.06,
        duration: 0.8,
        ease: "power2.out",
      }
    )
      .fromTo(
        subtitleRef.current,
        { opacity: 0, y: 20, filter: "blur(4px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.3"
      )
      .fromTo(
        ctaRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
        "-=0.2"
      );

    return () => {
      split.revert();
      tl.kill();
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
      <div className="mx-auto max-w-7xl px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left: text content */}
        <div className="relative z-10">
          <div className="inline-block rounded-full bg-accent-light px-4 py-1.5 text-sm font-medium text-accent mb-8">
            Open Source SDK
          </div>

          <h1
            ref={titleRef}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] opacity-0"
          >
            The developer SDK for EU Digital Identity
          </h1>

          <p
            ref={subtitleRef}
            className="mt-6 text-lg sm:text-xl text-foreground-secondary max-w-lg opacity-0"
          >
            Issue and verify eIDAS 2.0 credentials in 10 lines of TypeScript.
          </p>

          <div ref={ctaRef} className="mt-10 flex flex-wrap gap-4 opacity-0">
            <a
              href="https://github.com/credat/credat"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-base font-medium text-white hover:bg-accent-dark transition-colors"
            >
              <svg
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              View on GitHub
            </a>
            <a
              href="https://docs.credat.io"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-base font-medium text-foreground hover:bg-background-alt transition-colors"
            >
              Read the docs
            </a>
          </div>
        </div>

        {/* Right: 3D credential card */}
        <div className="relative h-[350px] sm:h-[450px] lg:h-[600px]">
          <CardScene />
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg
          className="h-6 w-6 text-foreground-secondary"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 14l-7 7m0 0l-7-7"
          />
        </svg>
      </div>
    </section>
  );
}
