"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger, SplitText } from "@/lib/gsap";
import { useTranslations } from "next-intl";

const CODE_LINES = [
	{ code: 'import { createAgent, delegate, createChallenge, presentCredentials, verifyPresentation } from "credat"', type: "import" },
	{ code: "", type: "empty" },
	{ code: "// 1. Create an agent identity", type: "comment" },
	{ code: 'const agent = await createAgent({', type: "code" },
	{ code: '  domain: "agent.acme.com"', type: "code" },
	{ code: "})", type: "code" },
	{ code: "", type: "empty" },
	{ code: "// 2. Delegate scoped permissions", type: "comment" },
	{ code: "const delegation = await delegate({", type: "code" },
	{ code: "  agent: agent.did,", type: "code" },
	{ code: "  owner: ownerDid,", type: "code" },
	{ code: '  scopes: ["book:travel", "spend:500usd"]', type: "code" },
	{ code: "})", type: "code" },
	{ code: "", type: "empty" },
	{ code: "// 3. Service challenges the agent", type: "comment" },
	{ code: "const challenge = createChallenge({ from: serviceDid })", type: "code" },
	{ code: "const presentation = await presentCredentials({", type: "code" },
	{ code: "  challenge, delegation, agent", type: "code" },
	{ code: "})", type: "code" },
	{ code: "", type: "empty" },
	{ code: "// 4. Verify trust", type: "comment" },
	{ code: "const result = await verifyPresentation(presentation, {", type: "code" },
	{ code: "  challenge, ownerPublicKey, agentPublicKey", type: "code" },
	{ code: "})", type: "code" },
	{ code: "console.log(result.trusted) // true", type: "code" },
];

const STEP_META = [
	{ key: "create", start: 0, end: 6 },
	{ key: "delegate", start: 7, end: 13 },
	{ key: "challenge", start: 14, end: 19 },
	{ key: "verify", start: 20, end: 25 },
] as const;

const KEYWORDS = ["const", "await", "import", "from", "true", "false"];
const kwPattern = new RegExp(`(${KEYWORDS.map(k => `\\b${k}\\b`).join("|")})`);

function syntaxHighlight(line: string, type: string) {
	if (type === "comment") return <span className="code-comment">{line}</span>;
	if (type === "empty") return <br />;
	if (type === "import") {
		return (
			<>
				<span className="code-keyword">import</span>
				{" { "}
				<span className="code-function">createAgent</span>,{" "}
				<span className="code-function">delegate</span>,{" "}
				<span className="code-function">createChallenge</span>,{" "}
				<span className="code-function">presentCredentials</span>,{" "}
				<span className="code-function">verifyPresentation</span>
				{" } "}
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

	// Desktop GSAP -- scroll-triggered
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
						{/* Left: Code editor -- sticky */}
						<div className="code-editor lg:sticky lg:top-[15vh]">
							<div className="code-editor-header">
								<div className="code-editor-dot" />
								<div className="code-editor-dot" />
								<div className="code-editor-dot" />
								<span className="ml-3 text-xs text-white/30">agent-trust.ts</span>
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
						{STEP_META.map((step) => (
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
										<span className="ml-3 text-xs text-white/30">agent-trust.ts</span>
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
