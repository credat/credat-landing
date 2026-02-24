"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { gsap, SplitText } from "@/lib/gsap";
import { AlertTriangle, Users, KeyRound, ScanEye } from "lucide-react";

const PROBLEM_META = [
	{ key: "fraud", icon: AlertTriangle, color: "#DC2626" },
	{ key: "trust", icon: Users, color: "#D97706" },
	{ key: "delegation", icon: KeyRound, color: "#7C3AED" },
	{ key: "scope", icon: ScanEye, color: "#2563EB" },
] as const;

export function SectionShowreel() {
	const t = useTranslations("Problem");
	const sectionRef = useRef<HTMLElement>(null);
	const pillRef = useRef<HTMLDivElement>(null);
	const headlineRef = useRef<HTMLHeadingElement>(null);
	const cardsRef = useRef<HTMLDivElement>(null);

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

			// Cards stagger blur-in
			if (cardsRef.current) {
				const cards = cardsRef.current.querySelectorAll(".problem-card");
				gsap.from(cards, {
					opacity: 0,
					filter: "blur(8px)",
					y: 30,
					stagger: 0.1,
					duration: 0.8,
					ease: "power2.out",
					scrollTrigger: {
						trigger: cardsRef.current,
						start: "top 85%",
					},
				});
			}
		}, sectionRef);

		return () => ctx.revert();
	}, []);

	return (
		<section ref={sectionRef} className="relative px-6 lg:px-[10vw]">
			<div className="mx-auto max-w-7xl">
				<div className="section-textbox mb-12">
					<div ref={pillRef} className="pill-badge">
						<span className="w-2 h-2 rounded-full bg-accent" />
						<span className="text-xs font-medium text-foreground-secondary">{t("badge")}</span>
					</div>
					<h2 ref={headlineRef} className="headline-lg text-foreground max-w-3xl">
						{t("title")}
					</h2>
				</div>

				{/* Problem cards */}
				<div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
					{PROBLEM_META.map((item) => (
						<div key={item.key} className="problem-card glass-card p-6 md:p-8">
							<div className="grid-overlay" />
							<div className="relative z-10">
								<div className="mb-4 w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${item.color}12` }}>
									<item.icon className="w-5 h-5" style={{ color: item.color }} strokeWidth={1.5} />
								</div>
								<h3 className="text-base font-semibold text-foreground mb-2">{t(`items.${item.key}.title`)}</h3>
								<p className="text-sm text-foreground-secondary leading-relaxed">{t(`items.${item.key}.description`)}</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
