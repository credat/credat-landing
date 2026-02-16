"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

const BADGES = [
  { title: "eIDAS 2.0 Ready", desc: "Full compliance with the EU Digital Identity framework" },
  { title: "TypeScript SDK", desc: "Type-safe APIs with complete IntelliSense support" },
  { title: "SD-JWT VC", desc: "Selective disclosure for privacy-preserving credentials" },
  { title: "OpenID4VC", desc: "Standard-compliant credential issuance and verification" },
];

export function SectionShowreel() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const badgesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Scroll-unwrap 3D effect on video container
      if (videoRef.current) {
        gsap.fromTo(
          videoRef.current,
          {
            rotateY: 30,
            scale: 0.6,
            rotateX: 2.5,
            y: "10vh",
            opacity: 0.5,
          },
          {
            rotateY: 0,
            scale: 1,
            rotateX: 0,
            y: 0,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: videoRef.current,
              start: "top 90%",
              end: "top 20%",
              scrub: 1,
            },
          }
        );
      }

      // Badges stagger blur-in
      if (badgesRef.current) {
        const cards = badgesRef.current.querySelectorAll(".badge-card");
        gsap.from(cards, {
          opacity: 0,
          filter: "blur(8px)",
          y: 30,
          stagger: 0.1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: badgesRef.current,
            start: "top 85%",
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative px-6 lg:px-[10vw]">
      {/* Video placeholder with 3D unwrap */}
      <div style={{ perspective: "1200px" }}>
        <div
          ref={videoRef}
          className="relative w-full rounded-[20px] bg-background-alt border border-black/6 overflow-hidden"
          style={{ aspectRatio: "16/9", maxHeight: "80vh" }}
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
            <div className="w-16 h-16 rounded-full border border-black/8 bg-white/80 backdrop-blur-md flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M6 4L16 10L6 16V4Z" fill="#0A0A0A" />
              </svg>
            </div>
            <span className="text-sm font-medium text-foreground-secondary">Product Demo Coming Soon</span>
          </div>
          <div className="grid-overlay" />
        </div>
      </div>

      {/* Feature badges */}
      <div ref={badgesRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
        {BADGES.map((badge) => (
          <div key={badge.title} className="badge-card glass-card p-5">
            <div className="grid-overlay" />
            <div className="relative z-10">
              <h3 className="text-sm font-semibold text-foreground mb-1">{badge.title}</h3>
              <p className="text-xs text-foreground-secondary leading-relaxed">{badge.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
