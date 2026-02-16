"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const codeLines = [
  { tokens: [{ text: "import", cls: "text-purple-400" }, { text: " { ", cls: "text-gray-300" }, { text: "createClient", cls: "text-yellow-300" }, { text: " } ", cls: "text-gray-300" }, { text: "from", cls: "text-purple-400" }, { text: " 'credat'", cls: "text-green-400" }] },
  { tokens: [] },
  { tokens: [{ text: "const", cls: "text-purple-400" }, { text: " credat", cls: "text-blue-300" }, { text: " = ", cls: "text-gray-300" }, { text: "createClient", cls: "text-yellow-300" }, { text: "()", cls: "text-gray-300" }] },
  { tokens: [] },
  { tokens: [{ text: "const", cls: "text-purple-400" }, { text: " credential", cls: "text-blue-300" }, { text: " = ", cls: "text-gray-300" }, { text: "await", cls: "text-purple-400" }, { text: " credat", cls: "text-blue-300" }, { text: ".credentials.", cls: "text-gray-300" }, { text: "issue", cls: "text-yellow-300" }, { text: "({", cls: "text-gray-300" }] },
  { tokens: [{ text: "  type", cls: "text-blue-300" }, { text: ": ", cls: "text-gray-300" }, { text: "'VerifiableId'", cls: "text-green-400" }, { text: ",", cls: "text-gray-300" }] },
  { tokens: [{ text: "  claims", cls: "text-blue-300" }, { text: ": { ", cls: "text-gray-300" }, { text: "givenName", cls: "text-blue-300" }, { text: ": ", cls: "text-gray-300" }, { text: "'Marie'", cls: "text-green-400" }, { text: ", ", cls: "text-gray-300" }, { text: "familyName", cls: "text-blue-300" }, { text: ": ", cls: "text-gray-300" }, { text: "'Dupont'", cls: "text-green-400" }, { text: " },", cls: "text-gray-300" }] },
  { tokens: [{ text: "  format", cls: "text-blue-300" }, { text: ": ", cls: "text-gray-300" }, { text: "'sd-jwt-vc'", cls: "text-green-400" }] },
  { tokens: [{ text: "})", cls: "text-gray-300" }] },
];

export function CodePreview() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const linesRef = useRef<HTMLDivElement[]>([]);

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

      linesRef.current.forEach((line, i) => {
        gsap.fromTo(
          line,
          { opacity: 0, x: -10 },
          {
            opacity: 1,
            x: 0,
            duration: 0.4,
            ease: "power2.out",
            delay: i * 0.08,
            scrollTrigger: { trigger: sectionRef.current, start: "top 60%" },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-32 px-6">
      <div className="mx-auto max-w-3xl">
        <h2
          ref={titleRef}
          className="text-4xl sm:text-5xl font-bold tracking-tight text-center opacity-0"
        >
          10 lines to your first credential
        </h2>

        <div className="mt-16 rounded-2xl bg-[#0A0A0A] p-8 overflow-x-auto">
          <div className="flex items-center gap-2 mb-6">
            <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
            <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
            <span className="h-3 w-3 rounded-full bg-[#28c840]" />
            <span className="ml-4 text-xs text-gray-500 font-mono">index.ts</span>
          </div>

          <pre className="font-mono text-sm sm:text-base leading-7">
            {codeLines.map((line, i) => (
              <div
                key={i}
                ref={(el) => {
                  if (el) linesRef.current[i] = el;
                }}
                className="opacity-0 flex"
              >
                <span className="select-none text-gray-600 w-8 text-right mr-4 shrink-0">
                  {i + 1}
                </span>
                <span>
                  {line.tokens.length === 0 ? (
                    "\u00A0"
                  ) : (
                    line.tokens.map((token, j) => (
                      <span key={j} className={token.cls}>
                        {token.text}
                      </span>
                    ))
                  )}
                </span>
              </div>
            ))}
          </pre>
        </div>
      </div>
    </section>
  );
}
