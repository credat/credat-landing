"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger, SplitText } from "@/lib/gsap";

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

const STEPS = [
  { start: 0, end: 1, title: "Import the SDK", desc: "A single import gives you everything — issuance, verification, and credential management." },
  { start: 2, end: 7, title: "Create a Client", desc: "Configure your credential format and issuer identity. Supports SD-JWT VC and mDoc out of the box." },
  { start: 8, end: 17, title: "Issue a Credential", desc: "Define the credential type and claims. The SDK handles schema validation, signing, and encoding." },
  { start: 18, end: 21, title: "Verify Instantly", desc: "One-line verification with full status checking, signature validation, and revocation support." },
];

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

  // Generic code highlighting
  const keywords = ["const", "await", "import", "from", "true", "false"];
  const kwPattern = new RegExp(`(${keywords.map(k => `\\b${k}\\b`).join("|")})`);

  return line.split(/(".*?"|'.*?')/g).map((part, i) => {
    if (part.startsWith('"') || part.startsWith("'")) {
      return <span key={i} className="code-string">{part}</span>;
    }
    const segments = part.split(kwPattern);
    if (segments.length === 1) return <span key={i}>{part}</span>;
    return (
      <span key={i}>
        {segments.map((seg, j) =>
          keywords.includes(seg) ? <span key={j} className="code-keyword">{seg}</span> : seg
        )}
      </span>
    );
  });
}

export function SectionCodeScroll() {
  const sectionRef = useRef<HTMLElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);

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

      // Track scroll progress through the section to update activeStep
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          const step = Math.min(
            STEPS.length - 1,
            Math.floor(self.progress * STEPS.length)
          );
          setActiveStep(step);
        },
      });

      // Animate step descriptions
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
    <section ref={sectionRef} id="how-it-works" className="relative min-h-[300vh]">
      <div className="px-6 lg:px-[10vw]">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="section-textbox mb-12">
            <div ref={pillRef} className="pill-badge">
              <span className="w-2 h-2 rounded-full bg-accent" />
              <span className="text-xs font-medium text-foreground-secondary">How It Works</span>
            </div>
          </div>

          {/* Two columns */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Left: Code editor - sticky so it stays visible while right column scrolls */}
            <div className="code-editor lg:sticky lg:top-[15vh]">
              <div className="code-editor-header">
                <div className="code-editor-dot" />
                <div className="code-editor-dot" />
                <div className="code-editor-dot" />
                <span className="ml-3 text-xs text-white/30">quickstart.ts</span>
              </div>
              <div className="code-editor-body">
                {CODE_LINES.map((line, i) => {
                  const step = STEPS[activeStep];
                  const isActive = step && i >= step.start && i <= step.end;
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
                })}
              </div>
            </div>

            {/* Right: Step descriptions - these scroll naturally */}
            <div className="flex flex-col gap-[40vh] py-[20vh]">
              {STEPS.map((step, i) => (
                <div key={step.title} className="step-text">
                  <div className={`transition-opacity duration-500 ${activeStep === i ? "opacity-100" : "opacity-30"}`}>
                    <span className="text-xs font-mono text-accent mb-2 block">
                      Step {i + 1}
                    </span>
                    <h3 className="headline-md text-foreground mb-3">{step.title}</h3>
                    <p className="step-desc body-lg max-w-sm">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
