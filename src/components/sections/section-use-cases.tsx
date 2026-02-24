"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "@/lib/gsap";
import { Plane, Wallet, Network, Shield, User, ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";

const USE_CASE_META = [
	{ key: "travel", color: "#D97706", icon: Plane },
	{ key: "finance", color: "#059669", icon: Wallet },
	{ key: "multiAgent", color: "#7C3AED", icon: Network },
	{ key: "devPlatform", color: "#2563EB", icon: Shield },
	{ key: "personalAgent", color: "#DC2626", icon: User },
] as const;

export function SectionUseCases() {
	const t = useTranslations("UseCases");
	const sectionRef = useRef<HTMLElement>(null);
	const pillRef = useRef<HTMLDivElement>(null);
	const headlineRef = useRef<HTMLHeadingElement>(null);
	const scrollRef = useRef<HTMLDivElement>(null);
	const [canScrollLeft, setCanScrollLeft] = useState(false);
	const [canScrollRight, setCanScrollRight] = useState(true);

	const checkScroll = useCallback(() => {
		const el = scrollRef.current;
		if (!el) return;
		setCanScrollLeft(el.scrollLeft > 10);
		setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
	}, []);

	const scroll = useCallback((direction: "left" | "right") => {
		const el = scrollRef.current;
		if (!el) return;
		const cardWidth = el.querySelector(".use-case-card")?.clientWidth ?? 400;
		el.scrollBy({ left: direction === "left" ? -cardWidth - 24 : cardWidth + 24, behavior: "smooth" });
	}, []);

	useEffect(() => {
		const el = scrollRef.current;
		if (!el) return;
		el.addEventListener("scroll", checkScroll, { passive: true });
		checkScroll();

		// Convert vertical mouse wheel to horizontal scroll on desktop
		const onWheel = (e: WheelEvent) => {
			// Only intercept on desktop (lg+)
			if (window.innerWidth < 1024) return;
			const delta = e.deltaY || e.deltaX;
			if (Math.abs(delta) < 2) return;
			const atStart = el.scrollLeft <= 0;
			const atEnd = el.scrollLeft >= el.scrollWidth - el.clientWidth - 1;
			if ((delta < 0 && atStart) || (delta > 0 && atEnd)) return;
			e.preventDefault();
			e.stopPropagation();
			el.scrollBy({ left: delta * 1.5 });
		};
		el.addEventListener("wheel", onWheel, { passive: false });

		return () => {
			el.removeEventListener("scroll", checkScroll);
			el.removeEventListener("wheel", onWheel);
		};
	}, [checkScroll]);

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
				<div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
					<div className="section-textbox !items-start !text-left">
						<div ref={pillRef} className="pill-badge">
							<span className="w-2 h-2 rounded-full bg-accent" />
							<span className="text-xs font-medium text-foreground-secondary">{t("badge")}</span>
						</div>
						<h2 ref={headlineRef} className="headline-lg text-foreground">
							{t("title")}
						</h2>
					</div>

					{/* Arrow controls */}
					<div className="flex items-center gap-3 shrink-0">
						<button
							onClick={() => scroll("left")}
							disabled={!canScrollLeft}
							className="embla__arrow"
							aria-label={t("scrollLeft")}
						>
							<ChevronLeft style={{ width: 18, height: 18 }} />
						</button>
						<button
							onClick={() => scroll("right")}
							disabled={!canScrollRight}
							className="embla__arrow"
							aria-label={t("scrollRight")}
						>
							<ChevronRight style={{ width: 18, height: 18 }} />
						</button>
					</div>
				</div>
			</div>

			{/* Horizontal scroll container */}
			<div
				ref={scrollRef}
				className="use-cases-scroll flex gap-4 lg:gap-6 overflow-x-auto px-6 lg:px-[10vw] pb-4 snap-x snap-mandatory"
				style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
			>
				{USE_CASE_META.map((uc) => (
					<div
						key={uc.key}
						className="use-case-card snap-start shrink-0 w-[85vw] sm:w-[65vw] md:w-[45vw] lg:w-[calc((100vw-20vw-48px)/3)]"
					>
						<div className="glass-card p-8 md:p-12 min-h-[320px] h-full flex flex-col justify-between">
							<div className="grid-overlay" />
							<div className="relative z-10">
								<div className="mb-6 w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${uc.color}12` }}>
									<uc.icon className="w-5 h-5" style={{ color: uc.color }} strokeWidth={1.5} />
								</div>
								<h3 className="headline-md text-foreground mb-4">{t(`items.${uc.key}.title`)}</h3>
								<p className="body-lg max-w-lg">{t(`items.${uc.key}.description`)}</p>
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

			{/* Progress bar */}
			<div className="px-6 lg:px-[10vw] mt-4">
				<ScrollProgress scrollRef={scrollRef} />
			</div>
		</section>
	);
}

function ScrollProgress({ scrollRef }: { scrollRef: React.RefObject<HTMLDivElement | null> }) {
	const barRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const el = scrollRef.current;
		if (!el) return;

		const update = () => {
			if (!barRef.current || !el) return;
			const max = el.scrollWidth - el.clientWidth;
			const progress = max > 0 ? el.scrollLeft / max : 0;
			barRef.current.style.width = `${Math.max(5, progress * 100)}%`;
		};

		el.addEventListener("scroll", update, { passive: true });
		update();
		return () => el.removeEventListener("scroll", update);
	}, [scrollRef]);

	return (
		<div className="embla__progress mx-auto max-w-7xl">
			<div ref={barRef} className="embla__progress-bar" style={{ width: "5%" }} />
		</div>
	);
}
