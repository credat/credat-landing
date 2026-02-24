"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { gsap } from "@/lib/gsap";

export function HeroFlow() {
	const t = useTranslations("HeroFlow");
	const svgRef = useRef<SVGSVGElement>(null);

	useEffect(() => {
		if (!svgRef.current) return;

		const ctx = gsap.context(() => {
			const tl = gsap.timeline({ delay: 1.0 });

			// 1. Draw in the nodes
			tl.from(".flow-node", {
				scale: 0,
				opacity: 0,
				transformOrigin: "center center",
				stagger: 0.15,
				duration: 0.6,
				ease: "back.out(1.7)",
			});

			// 2. Draw in the labels
			tl.from(
				".flow-label",
				{
					opacity: 0,
					y: 8,
					stagger: 0.1,
					duration: 0.4,
					ease: "power2.out",
				},
				"-=0.3"
			);

			// 3. Animate the connection paths (stroke-dashoffset)
			tl.from(
				".flow-path",
				{
					strokeDashoffset: 300,
					stagger: 0.15,
					duration: 1,
					ease: "power2.inOut",
				},
				"-=0.3"
			);

			// 4. Fade in the delegation card
			tl.from(
				".flow-card",
				{
					opacity: 0,
					scale: 0.8,
					transformOrigin: "center center",
					duration: 0.5,
					ease: "power2.out",
				},
				"-=0.4"
			);

			// 5. Fade in the flowing dots
			tl.from(
				".flow-dot",
				{
					opacity: 0,
					duration: 0.3,
				},
				"-=0.2"
			);

			// 6. Fade in the checkmark
			tl.from(".flow-check", {
				scale: 0,
				opacity: 0,
				transformOrigin: "center center",
				duration: 0.4,
				ease: "back.out(2)",
			});
		}, svgRef);

		return () => ctx.revert();
	}, []);

	return (
		<svg
			ref={svgRef}
			viewBox="0 0 480 400"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className="w-full h-full"
			aria-label={t("ariaLabel")}
			role="img"
		>
			<defs>
				{/* Gradient for paths */}
				<linearGradient id="pathGradOA" x1="0%" y1="0%" x2="100%" y2="100%">
					<stop offset="0%" stopColor="#2563EB" stopOpacity="0.6" />
					<stop offset="100%" stopColor="#7C3AED" stopOpacity="0.6" />
				</linearGradient>
				<linearGradient id="pathGradAS" x1="0%" y1="0%" x2="100%" y2="0%">
					<stop offset="0%" stopColor="#7C3AED" stopOpacity="0.6" />
					<stop offset="100%" stopColor="#059669" stopOpacity="0.6" />
				</linearGradient>
				<linearGradient id="pathGradOS" x1="0%" y1="0%" x2="100%" y2="100%">
					<stop offset="0%" stopColor="#2563EB" stopOpacity="0.2" />
					<stop offset="100%" stopColor="#059669" stopOpacity="0.2" />
				</linearGradient>
				{/* Card shadow */}
				<filter id="cardShadow" x="-20%" y="-20%" width="140%" height="140%">
					<feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#000" floodOpacity="0.08" />
				</filter>
				{/* Node glow */}
				<filter id="nodeGlow" x="-50%" y="-50%" width="200%" height="200%">
					<feGaussianBlur stdDeviation="6" result="blur" />
					<feMerge>
						<feMergeNode in="blur" />
						<feMergeNode in="SourceGraphic" />
					</feMerge>
				</filter>
			</defs>

			{/* -- Connection paths -- */}
			{/* Owner -> Agent */}
			<path
				className="flow-path"
				d="M 130 105 Q 100 200 175 270"
				stroke="url(#pathGradOA)"
				strokeWidth="2"
				strokeDasharray="6 4"
				fill="none"
				pathLength="300"
				strokeDashoffset="0"
			/>
			{/* Agent -> Service */}
			<path
				className="flow-path"
				d="M 225 270 Q 310 210 350 150"
				stroke="url(#pathGradAS)"
				strokeWidth="2"
				strokeDasharray="6 4"
				fill="none"
				pathLength="300"
				strokeDashoffset="0"
			/>
			{/* Owner -> Service (trust line, dashed lighter) */}
			<path
				className="flow-path"
				d="M 165 80 Q 260 50 350 105"
				stroke="url(#pathGradOS)"
				strokeWidth="1.5"
				strokeDasharray="4 6"
				fill="none"
				pathLength="300"
				strokeDashoffset="0"
			/>

			{/* -- Flowing dots (animated) -- */}
			{/* Owner -> Agent dots */}
			<circle className="flow-dot flow-dot-oa" r="3" fill="#2563EB">
				<animateMotion
					dur="3s"
					repeatCount="indefinite"
					path="M 130 105 Q 100 200 175 270"
				/>
			</circle>
			<circle className="flow-dot flow-dot-oa" r="2.5" fill="#7C3AED" opacity="0.7">
				<animateMotion
					dur="3s"
					repeatCount="indefinite"
					begin="1s"
					path="M 130 105 Q 100 200 175 270"
				/>
			</circle>

			{/* Agent -> Service dots */}
			<circle className="flow-dot flow-dot-as" r="3" fill="#059669">
				<animateMotion
					dur="3.5s"
					repeatCount="indefinite"
					begin="0.5s"
					path="M 225 270 Q 310 210 350 150"
				/>
			</circle>
			<circle className="flow-dot flow-dot-as" r="2.5" fill="#7C3AED" opacity="0.7">
				<animateMotion
					dur="3.5s"
					repeatCount="indefinite"
					begin="2s"
					path="M 225 270 Q 310 210 350 150"
				/>
			</circle>

			{/* -- Delegation card (between Owner and Agent) -- */}
			<g className="flow-card" filter="url(#cardShadow)">
				<rect x="60" y="155" width="100" height="64" rx="8" fill="white" stroke="#E5E7EB" strokeWidth="1" />
				<rect x="68" y="163" width="40" height="4" rx="2" fill="#7C3AED" />
				<rect x="68" y="173" width="60" height="3" rx="1.5" fill="#D1D5DB" />
				<rect x="68" y="180" width="45" height="3" rx="1.5" fill="#D1D5DB" />
				<rect x="68" y="195" width="30" height="16" rx="3" fill="#EDE9FE" />
				<text x="83" y="206" fontSize="6.5" fontWeight="600" fill="#7C3AED" textAnchor="middle">scope</text>
				<rect x="102" y="195" width="46" height="3" rx="1.5" fill="#E5E7EB" />
				<rect x="102" y="202" width="34" height="3" rx="1.5" fill="#E5E7EB" />
			</g>

			{/* -- Owner node -- */}
			<g className="flow-node" filter="url(#nodeGlow)">
				<circle cx="145" cy="80" r="28" fill="#EFF6FF" stroke="#2563EB" strokeWidth="2" />
				<circle cx="145" cy="80" r="18" fill="#2563EB" opacity="0.1" />
				{/* Person icon */}
				<g transform="translate(133, 68)">
					<circle cx="12" cy="7" r="5" fill="none" stroke="#2563EB" strokeWidth="1.5" />
					<path d="M 3 21 Q 3 14 12 14 Q 21 14 21 21" fill="none" stroke="#2563EB" strokeWidth="1.5" />
				</g>
			</g>
			<text className="flow-label" x="145" y="125" textAnchor="middle" fontSize="12" fontWeight="600" fill="#1E40AF">{t("owner")}</text>
			<text className="flow-label" x="145" y="138" textAnchor="middle" fontSize="9" fill="#6B7280">{t("ownerDesc")}</text>

			{/* -- Agent node -- */}
			<g className="flow-node" filter="url(#nodeGlow)">
				<circle cx="200" cy="285" r="34" fill="#F5F3FF" stroke="#7C3AED" strokeWidth="2" />
				<circle cx="200" cy="285" r="22" fill="#7C3AED" opacity="0.1" />
				{/* Bot/Agent icon */}
				<g transform="translate(186, 271)">
					<rect x="3" y="6" width="22" height="16" rx="3" fill="none" stroke="#7C3AED" strokeWidth="1.5" />
					<circle cx="10" cy="14" r="2" fill="#7C3AED" opacity="0.6" />
					<circle cx="18" cy="14" r="2" fill="#7C3AED" opacity="0.6" />
					<line x1="14" y1="2" x2="14" y2="6" stroke="#7C3AED" strokeWidth="1.5" />
					<circle cx="14" cy="2" r="1.5" fill="#7C3AED" opacity="0.4" />
				</g>
			</g>
			<text className="flow-label" x="200" y="337" textAnchor="middle" fontSize="12" fontWeight="600" fill="#6D28D9">{t("agent")}</text>
			<text className="flow-label" x="200" y="350" textAnchor="middle" fontSize="9" fill="#6B7280">{t("agentDesc")}</text>

			{/* -- Service node -- */}
			<g className="flow-node" filter="url(#nodeGlow)">
				<circle cx="370" cy="120" r="28" fill="#ECFDF5" stroke="#059669" strokeWidth="2" />
				<circle cx="370" cy="120" r="18" fill="#059669" opacity="0.1" />
				{/* Shield/check icon */}
				<g transform="translate(358, 107)">
					<path d="M 12 2 L 3 6 L 3 13 Q 3 20 12 24 Q 21 20 21 13 L 21 6 Z" fill="none" stroke="#059669" strokeWidth="1.5" />
					<polyline points="8,13 11,16 16,11" fill="none" stroke="#059669" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
				</g>
			</g>
			<text className="flow-label" x="370" y="165" textAnchor="middle" fontSize="12" fontWeight="600" fill="#047857">{t("service")}</text>
			<text className="flow-label" x="370" y="178" textAnchor="middle" fontSize="9" fill="#6B7280">{t("serviceDesc")}</text>

			{/* -- Verification checkmark badge -- */}
			<g className="flow-check">
				<circle cx="400" cy="92" r="11" fill="#059669" />
				<polyline
					points="394,92 398,96 406,88"
					fill="none"
					stroke="white"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</g>

			{/* -- Flow labels on paths -- */}
			<text className="flow-label" x="80" y="195" fontSize="8" fill="#6B7280" opacity="0">
				{/* Hidden -- card is the visual */}
			</text>
			<g className="flow-label">
				<rect x="275" y="198" width="74" height="20" rx="10" fill="white" stroke="#E5E7EB" strokeWidth="1" />
				<text x="312" y="212" textAnchor="middle" fontSize="8" fontWeight="500" fill="#6B7280">{t("delegation")}</text>
			</g>

			{/* -- Trust line label -- */}
			<g className="flow-label">
				<rect x="224" y="48" width="60" height="18" rx="9" fill="white" stroke="#E5E7EB" strokeWidth="0.5" opacity="0.8" />
				<text x="254" y="60" textAnchor="middle" fontSize="7" fill="#9CA3AF">{t("trustChain")}</text>
			</g>
		</svg>
	);
}
