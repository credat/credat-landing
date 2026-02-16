"use client";

import { useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { gsap } from "@/lib/gsap";
import { Package, Code2, Zap, type LucideIcon } from "lucide-react";

const PROTOCOLS = [
  { name: "OpenID4VCI", desc: "Issue credentials using the OpenID for Verifiable Credential Issuance protocol." },
  { name: "OpenID4VP", desc: "Request and verify credential presentations with OpenID for Verifiable Presentations." },
  { name: "DIDComm v2", desc: "Secure, peer-to-peer messaging for credential exchange between agents." },
];

const STACK_CARDS: { icon: LucideIcon; label: string; sub: string }[] = [
  { icon: Package, label: "npm install credat", sub: "Zero-config setup" },
  { icon: Code2, label: "100% TypeScript", sub: "Full type safety" },
  { icon: Zap, label: "< 50kb gzipped", sub: "Tree-shakeable" },
];

export function SectionIntegrations() {
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
            <span className="text-xs font-medium text-foreground-secondary">Standards</span>
          </div>
          <h2 ref={headlineRef} className="headline-lg text-foreground">
            Built On Open Standards
          </h2>
        </div>

        {/* Bento grid */}
        <div ref={gridRef} className="bento-grid" style={{ perspective: "1000px" }}>
          {/* Big: Credential Formats */}
          <div className="bento-item md:row-span-2 flex flex-col">
            <div className="grid-overlay" />
            <div className="relative z-10">
              <h3 className="headline-sm text-foreground mb-2">Credential Formats</h3>
              <p className="body-md">
                First-class support for both EU-mandated credential formats,
                ready for the EUDIW ecosystem.
              </p>
            </div>
            <div className="relative z-10 flex gap-4 mt-auto pt-6">
              <div className="rounded-2xl border border-accent/15 bg-accent/5 p-4 flex-1 text-center">
                <div className="text-lg font-bold text-foreground">SD-JWT VC</div>
                <div className="text-xs text-foreground-secondary mt-1">Selective Disclosure</div>
              </div>
              <div className="rounded-2xl border border-accent/15 bg-accent/5 p-4 flex-1 text-center">
                <div className="text-lg font-bold text-foreground">mDoc</div>
                <div className="text-xs text-foreground-secondary mt-1">ISO 18013-5</div>
              </div>
            </div>
            <div className="ambient-glow" style={{ width: "200px", height: "200px", right: "-40px", top: "-40px" }} />
          </div>

          {/* Small: Protocol carousel */}
          <div className="bento-item flex flex-col justify-between min-h-[180px]">
            <div className="grid-overlay" />
            <div className="relative z-10">
              <h3 className="text-sm font-semibold text-foreground mb-3">Protocols</h3>
              <div ref={emblaRef} className="embla overflow-hidden">
                <div className="embla__container">
                  {PROTOCOLS.map((p) => (
                    <div key={p.name} className="embla__slide">
                      <div className="font-bold text-foreground mb-1">{p.name}</div>
                      <p className="text-xs text-foreground-secondary leading-relaxed">{p.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
              {/* Mini dots */}
              <div className="flex gap-1.5 mt-3">
                {PROTOCOLS.map((_, i) => (
                  <div
                    key={i}
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
              <h3 className="text-sm font-semibold text-foreground mb-3">Developer Tools</h3>
              <div className="stacked-cards flex flex-col gap-2.5">
                {STACK_CARDS.map((card, i) => (
                  <div
                    key={card.label}
                    className="stacked-card"
                    style={{ transform: `translateZ(${(2 - i) * 4}px)` }}
                  >
                    <card.icon className="w-5 h-5 text-accent" strokeWidth={1.5} />
                    <div>
                      <div className="text-sm font-medium text-foreground">{card.label}</div>
                      <div className="text-xs text-foreground-secondary">{card.sub}</div>
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
