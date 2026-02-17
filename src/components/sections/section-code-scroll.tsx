"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger, SplitText } from "@/lib/gsap";
import { useTranslations } from "next-intl";

const CODE_LINES = [
  { code: 'import { Credat } from "credat"', type: "import" },
  { code: "", type: "empty" },
  { code: "// 1. Create a client", type: "comment" },
  { code: 'const client = Credat.create({', type: "code" },
  { code: '  format: "sd-jwt-vc",', type: "code" },
  { code: '  issuer: "did:web:example.com"', type: "code" },
  { code: "})", type: "code" },
  { code: "", type: "empty" },
  { code: "// 2. Issue a credential", type: "comment" },
  { code: "const credential = await client.issue({", type: "code" },
  { code: '  type: "VerifiableId",', type: "code" },
  { code: "  claims: {", type: "code" },
  { code: '    given_name: "Marie",', type: "code" },
  { code: '    family_name: "Dupont",', type: "code" },
  { code: '    birth_date: "1990-01-15"', type: "code" },
  { code: "  }", type: "code" },
  { code: "})", type: "code" },
  { code: "", type: "empty" },
  { code: "// 3. Verify it", type: "comment" },
  { code: "const result = await client.verify(credential)", type: "code" },
  { code: "console.log(result.valid) // true", type: "code" },
];

const STEP_META = [
  { key: "import", start: 0, end: 1 },
  { key: "create", start: 2, end: 7 },
  { key: "issue", start: 8, end: 17 },
  { key: "verify", start: 18, end: 21 },
] as const;

const kwPattern = new RegExp(`(${["const", "await", "import", "from", "true", "false"].map(k => `\\b${k}\\b`).join("|")})`);
const KEYWORDS = ["const", "await", "import", "from", "true", "false"];

function syntaxHighlight(line: string, type: string) {
  if (type === "comment") return <span className="code-comment">{line}</span>;
  if (type === "empty") return <br />;
  if (type === "import") {
    return (
      <>
        <span className="code-keyword">import</span>
        {" { "}<span className="code-function">Credat</span>{" } "}
        <span className="code-keyword">from</span>{" "}
        <span className="code-string">&quot;credat&quot;</span>
      </>
    );
  }

  return line.split(/(".*?"|'.*?')/g).map((part, i) => {
    if (part.startsWith('"') || part.startsWith("'")) {
      return <span key={i} className="code-string">{part}</span>;
    }
    const segments = part.split(kwPattern);
    if (segments.length === 1) return <span key={i}>{part}</span>;
    return (
      <span key={i}>
        {segments.map((seg, j) =>
          KEYWORDS.includes(seg) ? <span key={j} className="code-keyword">{seg}</span> : seg
        )}
      </span>
    );
  });
}

function renderCodeLines(lines: typeof CODE_LINES, activeStep?: number) {
  return lines.map((line, i) => {
    const step = activeStep !== undefined ? STEP_META[activeStep] : undefined;
    const isActive = step ? i >= step.start && i <= step.end : true;
    return (
      <div
        key={i}
        className={`code-line ${isActive ? "active" : ""}`}
        style={{ minHeight: line.type === "empty" ? "1.7em" : undefined }}
      >
        {line.type !== "empty" && (
          <span className="inline-block w-8 text-right mr-4 text-white/20 select-none text-xs">
            {i + 1}
          </span>
        )}
        {syntaxHighlight(line.code, line.type)}
      </div>
    );
  });
}

export function SectionCodeScroll() {
  const t = useTranslations("CodeScroll");
  const sectionRef = useRef<HTMLElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  // Desktop GSAP — exact same setup as original, [] dependency
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

      // ScrollTrigger for step tracking — only fires when the desktop
      // layout is visible (lg:), but creating it unconditionally is safe
      // because it triggers based on scroll position of the section.
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          const step = Math.min(
            STEP_META.length - 1,
            Math.floor(self.progress * STEP_META.length)
          );
          setActiveStep(step);
        },
      });

      // Animate step description characters on desktop
      const stepEls = sectionRef.current?.querySelectorAll(".step-text");
      if (stepEls) {
        stepEls.forEach((el) => {
          const descEl = el.querySelector(".step-desc") as HTMLElement;
          if (!descEl) return;
          const split = new SplitText(descEl, { type: "chars" });
          gsap.set(split.chars, { opacity: 0.25 });
          gsap.to(split.chars, {
            opacity: 1,
            stagger: 0.01,
            scrollTrigger: {
              trigger: el,
              start: "top 80%",
              end: "top 40%",
              scrub: 1,
            },
          });
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="how-it-works" className="relative code-scroll-section">
      <div className="px-6 lg:px-[10vw]">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="section-textbox mb-10 lg:mb-12">
            <div ref={pillRef} className="pill-badge">
              <span className="w-2 h-2 rounded-full bg-accent" />
              <span className="text-xs font-medium text-foreground-secondary">{t("badge")}</span>
            </div>
          </div>

          {/* ========== DESKTOP: scroll-triggered two-column layout ========== */}
          <div className="desktop-only grid-cols-2 gap-8 items-start">
            {/* Left: Code editor — sticky */}
            <div className="code-editor lg:sticky lg:top-[15vh]">
              <div className="code-editor-header">
                <div className="code-editor-dot" />
                <div className="code-editor-dot" />
                <div className="code-editor-dot" />
                <span className="ml-3 text-xs text-white/30">quickstart.ts</span>
              </div>
              <div className="code-editor-body">
                {renderCodeLines(CODE_LINES, activeStep)}
              </div>
            </div>

            {/* Right: Step descriptions */}
            <div className="flex flex-col gap-[40vh] py-[20vh]">
              {STEP_META.map((step, i) => (
                <div key={step.key} className="step-text">
                  <div className={`transition-opacity duration-500 ${activeStep === i ? "opacity-100" : "opacity-30"}`}>
                    <span className="text-xs font-mono text-accent mb-2 block">
                      {t(`steps.${step.key}.step`)}
                    </span>
                    <h3 className="headline-md text-foreground mb-3">{t(`steps.${step.key}.title`)}</h3>
                    <p className="step-desc body-lg max-w-sm">{t(`steps.${step.key}.description`)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ========== MOBILE: stacked steps with individual code blocks ========== */}
          <div className="mobile-only flex-col gap-8">
            {STEP_META.map((step, i) => (
              <div key={step.key} className="flex flex-col gap-4">
                <div>
                  <span className="text-xs font-mono text-accent mb-2 block">
                    {t(`steps.${step.key}.step`)}
                  </span>
                  <h3 className="headline-sm text-foreground mb-2">{t(`steps.${step.key}.title`)}</h3>
                  <p className="body-md">{t(`steps.${step.key}.description`)}</p>
                </div>
                <div className="code-editor">
                  <div className="code-editor-header">
                    <div className="code-editor-dot" />
                    <div className="code-editor-dot" />
                    <div className="code-editor-dot" />
                    <span className="ml-3 text-xs text-white/30">quickstart.ts</span>
                  </div>
                  <div className="code-editor-body !text-[13px]">
                    {CODE_LINES.slice(step.start, step.end + 1).map((line, j) => (
                      <div
                        key={j}
                        className="code-line active"
                        style={{ minHeight: line.type === "empty" ? "1.7em" : undefined }}
                      >
                        {line.type !== "empty" && (
                          <span className="inline-block w-6 text-right mr-3 text-white/20 select-none text-xs">
                            {step.start + j + 1}
                          </span>
                        )}
                        {syntaxHighlight(line.code, line.type)}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
