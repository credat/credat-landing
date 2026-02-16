"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Menu, X } from "lucide-react";

export function Navbar() {
  const navBarRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const scrollTo = useCallback((e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  }, []);

  useEffect(() => {
    if (!navBarRef.current) return;

    gsap.fromTo(
      navBarRef.current,
      { opacity: 0, rotateY: 20, scale: 0.7, rotateX: 5, translateY: "-60px", width: "30%" },
      { opacity: 1, rotateY: 0, scale: 1, rotateX: 0, translateY: "0px", width: "100%", duration: 1, ease: "power2.out", delay: 0.5 }
    );

    if (centerRef.current) {
      const links = centerRef.current.querySelectorAll("a");
      gsap.fromTo(links, { opacity: 0 }, { opacity: 1, duration: 0.6, stagger: 0.1, delay: 1.3 });
    }

    const scrollSt = ScrollTrigger.create({
      start: "top -100px",
      onUpdate: (self) => {
        setScrolled(self.progress > 0);
      },
    });

    return () => {
      scrollSt.kill();
    };
  }, []);

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-[80px] flex justify-center items-center px-6 lg:px-[10vw] z-50" style={{ perspective: "500px" }}>
        <div
          ref={navBarRef}
          className={`w-full h-[56px] border flex justify-between items-center px-6 pr-3 rounded-full opacity-0 transition-colors duration-300 ${
            scrolled
              ? "border-black/8 bg-white/80 backdrop-blur-xl shadow-sm"
              : "border-black/5 bg-white/60 backdrop-blur-md"
          }`}
          style={{ boxShadow: scrolled ? "0 2px 8px rgba(0,0,0,0.06)" : "0 1px 3px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.9)" }}
        >
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.png" alt="Credat" width={24} height={24} className="rounded-sm" />
            <span className="text-sm font-bold tracking-tight text-foreground">credat</span>
          </Link>

          <div ref={centerRef} className="hidden md:flex items-center gap-6 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <a href="#use-cases" onClick={(e) => scrollTo(e, "use-cases")} className="text-sm text-foreground-secondary hover:text-foreground transition-colors">
              Use Cases
            </a>
            <a href="#integrations" onClick={(e) => scrollTo(e, "integrations")} className="text-sm text-foreground-secondary hover:text-foreground transition-colors">
              Integrations
            </a>
            <a href="#how-it-works" onClick={(e) => scrollTo(e, "how-it-works")} className="text-sm text-foreground-secondary hover:text-foreground transition-colors">
              How it Works
            </a>
            <a href="https://docs.credat.io" target="_blank" rel="noopener noreferrer" className="text-sm text-foreground-secondary hover:text-foreground transition-colors">
              Docs
            </a>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://github.com/credat/credat"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-scroll btn-scroll-primary"
              style={{ height: "40px", padding: "0 16px", paddingRight: "6px" }}
            >
              <div className="btn-scroll-content">
                <span>GitHub</span>
                <span>GitHub</span>
              </div>
              <div className="btn-scroll-circle" style={{ width: "28px", height: "28px" }}>
                <ArrowUpRight className="btn-scroll-icon" style={{ width: "14px", height: "14px" }} />
              </div>
            </a>

            <button
              className="md:hidden w-9 h-9 flex items-center justify-center rounded-full border border-black/6 bg-white/80"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X style={{ width: 16, height: 16 }} /> : <Menu style={{ width: 16, height: 16 }} />}
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-white/95 backdrop-blur-xl pt-[100px] px-8 flex flex-col gap-6 md:hidden">
          <a href="#use-cases" onClick={(e) => scrollTo(e, "use-cases")} className="text-lg font-medium text-foreground hover:text-accent transition-colors">
            Use Cases
          </a>
          <a href="#integrations" onClick={(e) => scrollTo(e, "integrations")} className="text-lg font-medium text-foreground hover:text-accent transition-colors">
            Integrations
          </a>
          <a href="#how-it-works" onClick={(e) => scrollTo(e, "how-it-works")} className="text-lg font-medium text-foreground hover:text-accent transition-colors">
            How it Works
          </a>
          <a href="https://docs.credat.io" target="_blank" rel="noopener noreferrer" className="text-lg font-medium text-foreground hover:text-accent transition-colors flex items-center gap-2">
            Docs <ArrowUpRight style={{ width: 16, height: 16 }} />
          </a>
          <a href="https://github.com/credat/credat" target="_blank" rel="noopener noreferrer" className="btn-scroll btn-scroll-primary mt-4 w-fit">
            <div className="btn-scroll-content">
              <span>GitHub</span>
              <span>GitHub</span>
            </div>
            <div className="btn-scroll-circle">
              <ArrowUpRight className="btn-scroll-icon" />
            </div>
          </a>
        </div>
      )}
    </>
  );
}
