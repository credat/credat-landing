"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { ArrowUpRight } from "lucide-react";
import { gsap, SplitText } from "@/lib/gsap";

export function SectionDx() {
	const t = useTranslations("Dx");
	const sectionRef = useRef<HTMLElement>(null);
	const pillRef = useRef<HTMLDivElement>(null);
	const headlineRef = useRef<HTMLHeadingElement>(null);
	const descRef = useRef<HTMLParagraphElement>(null);
	const ctaRef = useRef<HTMLAnchorElement>(null);
	const codeRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const ctx = gsap.context(() => {
			// Pill badge
			if (pillRef.current) {
				gsap.from(pillRef.current, {
					opacity: 0,
					filter: "blur(8px)",
					duration: 0.6,
					scrollTrigger: { trigger: pillRef.current, start: "top 95%" },
				});
			}

			// Headline SplitText
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

			// Description
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

			// CTA button
			if (ctaRef.current) {
				gsap.from(ctaRef.current, {
					opacity: 0,
					y: 15,
					duration: 0.6,
					delay: 0.3,
					scrollTrigger: { trigger: ctaRef.current, start: "top 95%" },
				});
			}

			// Code block entrance
			if (codeRef.current) {
				gsap.from(codeRef.current, {
					opacity: 0,
					scale: 0.95,
					y: 40,
					duration: 1,
					ease: "power2.out",
					scrollTrigger: { trigger: codeRef.current, start: "top 85%" },
				});
			}
		}, sectionRef);

		return () => ctx.revert();
	}, []);

	return (
		<section ref={sectionRef} className="relative px-6 lg:px-[10vw]">
			<div className="mx-auto max-w-7xl">
				{/* Text */}
				<div className="section-textbox mb-12">
					<div ref={pillRef} className="pill-badge">
						<span className="w-2 h-2 rounded-full bg-accent" />
						<span className="text-xs font-medium text-foreground-secondary">{t("badge")}</span>
					</div>

					<h2 ref={headlineRef} className="headline-lg text-foreground max-w-3xl">
						{t("title")}
					</h2>

					<p ref={descRef} className="body-lg max-w-2xl">
						{t("description")}
					</p>

					<a
						ref={ctaRef}
						href="https://docs.credat.io"
						target="_blank"
						rel="noopener noreferrer"
						className="btn-scroll btn-scroll-primary"
					>
						<div className="btn-scroll-content">
							<span>{t("cta")}</span>
							<span>{t("cta")}</span>
						</div>
						<div className="btn-scroll-circle">
							<ArrowUpRight className="btn-scroll-icon" />
						</div>
					</a>
				</div>

				{/* Full-bleed code block */}
				<div ref={codeRef} className="relative w-full">
					<div className="code-editor">
						<div className="code-editor-header">
							<div className="code-editor-dot" />
							<div className="code-editor-dot" />
							<div className="code-editor-dot" />
							<span className="ml-3 text-xs text-white/30">agent-trust.ts</span>
						</div>
						<div className="code-editor-body">
							<pre>
								<code>
									<span className="code-keyword">import</span>{" "}
									{"{ "}
									<span className="code-function">createAgent</span>,{" "}
									<span className="code-function">delegate</span>,{" "}
									<span className="code-function">verifyPresentation</span>
									{" }"}{" "}
									<span className="code-keyword">from</span>{" "}
									<span className="code-string">&quot;credat&quot;</span>{"\n"}
									{"\n"}
									<span className="code-comment">{"// 1. Create an agent identity"}</span>{"\n"}
									<span className="code-keyword">const</span> agent = <span className="code-keyword">await</span> <span className="code-function">createAgent</span>({"{\n"}
									{"  "}<span className="code-property">domain</span>: <span className="code-string">&quot;agent.acme.com&quot;</span>{"\n"}
									{"}"}){"\n"}
									{"\n"}
									<span className="code-comment">{"// 2. Delegate scoped permissions"}</span>{"\n"}
									<span className="code-keyword">const</span> delegation = <span className="code-keyword">await</span> <span className="code-function">delegate</span>({"{\n"}
									{"  "}<span className="code-property">agent</span>: agent.did,{"\n"}
									{"  "}<span className="code-property">owner</span>: ownerDid,{"\n"}
									{"  "}<span className="code-property">scopes</span>: [<span className="code-string">&quot;book:travel&quot;</span>, <span className="code-string">&quot;spend:500usd&quot;</span>]{"\n"}
									{"}"}){"\n"}
									{"\n"}
									<span className="code-comment">{"// 3. Verify trust"}</span>{"\n"}
									<span className="code-keyword">const</span> result = <span className="code-keyword">await</span> <span className="code-function">verifyPresentation</span>(presentation){"\n"}
									<span className="code-function">console</span>.log(result.<span className="code-property">trusted</span>) <span className="code-comment">{"// true"}</span>
								</code>
							</pre>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
