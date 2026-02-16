"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Image from "next/image";

export function LoadingScreen() {
  const containerRef = useRef<HTMLDivElement>(null);
  const barFillRef = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => setDone(true),
    });

    tl.to(barFillRef.current, {
      width: "100%",
      duration: 0.5,
      ease: "power2.inOut",
    });

    tl.to(containerRef.current, {
      opacity: 0,
      duration: 0.3,
      ease: "power2.in",
    });
  }, []);

  if (done) return null;

  return (
    <div ref={containerRef} className="loading-screen" aria-hidden="true">
      <Image src="/logo.png" alt="" width={32} height={32} className="rounded-sm" priority />
      <div className="loading-bar">
        <div ref={barFillRef} className="loading-bar-fill" />
      </div>
    </div>
  );
}
