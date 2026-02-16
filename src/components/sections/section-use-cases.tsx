"use client";

import { useEffect, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { gsap } from "@/lib/gsap";
import { useDotButton, DotButton } from "@/components/carousel/embla-dot-button";
import { ShieldCheck, GraduationCap, Landmark, HeartPulse, Plane, type LucideIcon } from "lucide-react";

const USE_CASES: {
  title: string;
  description: string;
  color: string;
  icon: LucideIcon;
}[] = [
  {
    title: "National ID Wallet",
    description: "Issue government-backed digital identity credentials compliant with the EU Digital Identity Wallet architecture. Support selective disclosure so citizens share only what's needed.",
    color: "#2563EB",
    icon: ShieldCheck,
  },
  {
    title: "Digital Diploma",
    description: "Universities and training providers can issue tamper-proof educational credentials. Employers verify qualifications instantly without contacting the institution.",
    color: "#7C3AED",
    icon: GraduationCap,
  },
  {
    title: "Banking KYC",
    description: "Streamline customer onboarding with reusable identity credentials. Reduce KYC costs while maintaining regulatory compliance across jurisdictions.",
    color: "#059669",
    icon: Landmark,
  },
  {
    title: "Healthcare Credentials",
    description: "Issue and verify professional medical licenses, vaccination records, and patient consent credentials with privacy-preserving selective disclosure.",
    color: "#DC2626",
    icon: HeartPulse,
  },
  {
    title: "Travel Documents",
    description: "Enable seamless border crossing with mobile driving licenses and travel credentials based on ISO 18013-5 and mDoc formats.",
    color: "#D97706",
    icon: Plane,
  },
];

export function SectionUseCases() {
  const sectionRef = useRef<HTMLElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    slidesToScroll: 1,
  });
  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi);

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
    <section ref={sectionRef} id="use-cases" className="relative">
      <div className="px-6 lg:px-[10vw]">
        <div className="section-textbox mb-12">
          <div ref={pillRef} className="pill-badge">
            <span className="w-2 h-2 rounded-full bg-accent" />
            <span className="text-xs font-medium text-foreground-secondary">Use Cases</span>
          </div>
          <h2 ref={headlineRef} className="headline-lg text-foreground">
            What You Can Build
          </h2>
        </div>
      </div>

      {/* Carousel */}
      <div className="relative">
        <div ref={emblaRef} className="embla px-6 lg:px-[10vw]">
          <div className="embla__container">
            {USE_CASES.map((uc) => (
              <div key={uc.title} className="embla__slide--use-case py-4">
                <div className="glass-card p-8 md:p-12 min-h-[320px] flex flex-col justify-between">
                  <div className="grid-overlay" />
                  <div className="relative z-10">
                    <div className="mb-6 w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${uc.color}12` }}>
                      <uc.icon className="w-5 h-5" style={{ color: uc.color }} strokeWidth={1.5} />
                    </div>
                    <h3 className="headline-md text-foreground mb-4">{uc.title}</h3>
                    <p className="body-lg max-w-lg">{uc.description}</p>
                  </div>
                  <div className="relative z-10 mt-8">
                    <div className="w-12 h-1 rounded-full" style={{ backgroundColor: uc.color }} />
                  </div>
                  {/* Ambient glow */}
                  <div
                    className="ambient-glow-soft"
                    style={{
                      width: "300px",
                      height: "300px",
                      right: "-50px",
                      bottom: "-50px",
                      backgroundColor: `${uc.color}10`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots */}
        <div className="embla__dots mt-4">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              selected={index === selectedIndex}
              onClick={() => onDotButtonClick(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
