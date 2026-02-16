"use client";

import { useEffect, useRef } from "react";
import Marquee from "react-fast-marquee";
import { ArrowUpRight, BookOpen } from "lucide-react";
import { gsap, SplitText } from "@/lib/gsap";
import { HeroFlow } from "@/components/hero-flow";

const MARQUEE_ITEMS = [
  "eIDAS 2.0",
  "SD-JWT VC",
  "mDoc / mDL",
  "OpenID4VCI",
  "OpenID4VP",
  "DIDComm v2",
  "TypeScript",
  "W3C VCDM",
  "ISO 18013-5",
  "IETF SD-JWT",
];

export function SectionHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headlineRef.current) {
        const split = new SplitText(headlineRef.current, { type: "words,chars" });
        gsap.from(split.chars, {
          opacity: 0,
          filter: "blur(8px)",
          yPercent: 50,
          stagger: 0.02,
          duration: 0.8,
          ease: "power2.out",
          delay: 0.9,
        });
      }

      if (descRef.current) {
        gsap.from(descRef.current, {
          opacity: 0,
          filter: "blur(8px)",
          y: 20,
          duration: 0.8,
          ease: "power2.out",
          delay: 1.2,
        });
      }

      if (ctaRef.current) {
        gsap.from(ctaRef.current.children, {
          opacity: 0,
          y: 20,
          stagger: 0.1,
          duration: 0.6,
          ease: "power2.out",
          delay: 1.4,
        });
      }

      if (marqueeRef.current) {
        gsap.from(marqueeRef.current, {
          opacity: 0,
          y: 30,
          duration: 0.8,
          ease: "power2.out",
          delay: 1.6,
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-center overflow-x-clip pt-[80px]"
    >
      {/* Background elements */}
      <div className="hero-bg-blur" />
      <div className="grid-overlay-hero" />

      <div className="mx-auto w-full max-w-7xl px-6 lg:px-[6vw] py-12 lg:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-8 lg:gap-12 items-center">
          {/* Left: Text content */}
          <div className="relative z-10 flex flex-col gap-6">
            <div className="pill-badge opacity-blur">
              <span className="w-2 h-2 rounded-full bg-accent" />
              <span className="text-xs font-medium text-foreground-secondary">Open Source SDK</span>
            </div>

            <h1 ref={headlineRef} className="headline-xl text-foreground">
              The Developer SDK for EU Digital Identity
            </h1>

            <p ref={descRef} className="body-lg max-w-lg">
              Issue and verify eIDAS 2.0 verifiable credentials in 10 lines of TypeScript.
              SD-JWT VC &amp; mDoc formats, OpenID4VC protocols, zero vendor lock-in.
            </p>

            <div ref={ctaRef} className="flex flex-wrap items-center gap-4">
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

          {/* Right: Verification flow SVG */}
          <div className="relative h-[350px] lg:h-[500px] lg:-my-8 lg:-mr-[4vw]">
            <HeroFlow />
          </div>
        </div>
      </div>

      {/* Bottom marquee */}
      <div ref={marqueeRef} className="w-full mt-8 lg:mt-16 pb-8">
        <Marquee speed={35} gradient gradientColor="#FFFFFF" gradientWidth={80} autoFill>
          {MARQUEE_ITEMS.map((item) => (
            <div key={item} className="marquee-pill mx-2">
              {item}
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
