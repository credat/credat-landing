"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";
import { gsap } from "@/lib/gsap";
import {
  usePrevNextButtons,
  PrevButton,
  NextButton,
} from "@/components/carousel/embla-arrow-buttons";
import { Star } from "lucide-react";

const TESTIMONIALS = [
  {
    quote: "Credat made our eIDAS 2.0 integration effortless. We went from zero to issuing credentials in a single sprint.",
    name: "Sophie L.",
    role: "CTO",
    avatar: "https://i.pravatar.cc/80?img=5",
  },
  {
    quote: "The SD-JWT VC implementation is rock-solid. Selective disclosure just works out of the box with clean APIs.",
    name: "Marcus W.",
    role: "Lead Engineer",
    avatar: "https://i.pravatar.cc/80?img=12",
  },
  {
    quote: "Finally an SDK that takes both credential formats seriously. The mDoc support saved us months of development.",
    name: "Elena R.",
    role: "Head of Digital ID",
    avatar: "https://i.pravatar.cc/80?img=20",
  },
  {
    quote: "TypeScript-first with incredible DX. The type safety across credential schemas caught bugs we would have shipped.",
    name: "James C.",
    role: "Senior Developer",
    avatar: "https://i.pravatar.cc/80?img=8",
  },
  {
    quote: "We evaluated three SSI SDKs. Credat was the only one that handled OpenID4VC protocols correctly and at scale.",
    name: "Anna K.",
    role: "VP Engineering",
    avatar: "https://i.pravatar.cc/80?img=16",
  },
  {
    quote: "Open source, spec-compliant, and maintained by people who understand the European identity landscape. Highly recommended.",
    name: "Pierre D.",
    role: "Founder",
    avatar: "https://i.pravatar.cc/80?img=11",
  },
];

export function SectionTestimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      dragFree: true,
    },
    [AutoScroll({ speed: 0.5, stopOnInteraction: false, stopOnMouseEnter: true })]
  );
  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } =
    usePrevNextButtons(emblaApi);

  const onScroll = useCallback(() => {
    if (!emblaApi) return;
    setScrollProgress(emblaApi.scrollProgress());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("scroll", onScroll);
    requestAnimationFrame(() => onScroll());
    return () => { emblaApi.off("scroll", onScroll); };
  }, [emblaApi, onScroll]);

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
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative">
      <div className="px-6 lg:px-[10vw]">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10">
          <div>
            <div ref={pillRef} className="pill-badge mb-4">
              <span className="w-2 h-2 rounded-full bg-accent" />
              <span className="text-xs font-medium text-foreground-secondary">Testimonials</span>
            </div>
            <h2 ref={headlineRef} className="headline-lg text-foreground">
              Trusted by Developers
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <PrevButton disabled={prevBtnDisabled} onClick={onPrevButtonClick} />
            <NextButton disabled={nextBtnDisabled} onClick={onNextButtonClick} />
          </div>
        </div>
      </div>

      {/* Carousel */}
      <div ref={emblaRef} className="embla px-6 lg:px-[10vw]">
        <div className="embla__container">
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className="embla__slide--partial">
              <div className="glass-card p-6 md:p-8 h-full flex flex-col justify-between min-h-[220px]">
                <div className="grid-overlay" />
                <p className="relative z-10 text-sm leading-relaxed text-foreground mb-6">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="relative z-10 flex items-center gap-3">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    width={36}
                    height={36}
                    className="w-9 h-9 rounded-full object-cover shrink-0"
                  />
                  <div>
                    <div className="text-sm font-semibold text-foreground">{t.name}</div>
                    <div className="text-xs text-foreground-secondary">{t.role}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* CTA card */}
          <div className="embla__slide--partial">
            <div className="glass-card-accent p-6 md:p-8 h-full flex flex-col items-center justify-center min-h-[220px] text-center">
              <div className="grid-overlay" />
              <div className="relative z-10">
                <p className="headline-sm text-foreground mb-4">Join the Community</p>
                <a
                  href="https://github.com/credat/credat"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-scroll btn-scroll-primary"
                  style={{ height: "40px", padding: "0 16px", paddingRight: "6px" }}
                >
                  <div className="btn-scroll-content">
                    <span>Star on GitHub</span>
                    <span>Star on GitHub</span>
                  </div>
                  <div className="btn-scroll-circle" style={{ width: "28px", height: "28px" }}>
                    <Star className="w-3.5 h-3.5 fill-current" />
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="px-6 lg:px-[10vw] mt-6">
        <div className="embla__progress mx-auto max-w-7xl">
          <div
            className="embla__progress-bar"
            style={{ width: `${Math.max(5, scrollProgress * 100)}%` }}
          />
        </div>
      </div>
    </section>
  );
}
