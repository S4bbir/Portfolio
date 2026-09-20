"use client";

import { siteConfig } from "@/config/site";
import { useEffect, useRef } from "react";
import { gsap, registerGSAP } from "@/lib/animations/gsap";

export function Footer() {
  const lineRef = useRef<HTMLDivElement>(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    if (!lineRef.current) return;
    registerGSAP();
    gsap.fromTo(
      lineRef.current,
      { scaleX: 0 },
      { scaleX: 1, duration: 1.5, ease: "power3.out", delay: 0.3 }
    );
  }, []);

  return (
    <footer className="relative overflow-hidden border-t border-white/5 px-6 py-10 md:px-16 lg:px-24">
      {/* Top divider line that draws in */}
      <div
        ref={lineRef}
        className="absolute top-0 left-0 right-0 h-[1px] origin-left bg-gradient-to-r from-accent-blue/50 via-accent-violet/30 to-transparent"
      />

      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 md:flex-row">
        <p className="section-label text-text-muted">
          © {siteConfig.year}{" "}
          <span className="font-display text-sm text-text-secondary">{siteConfig.displayName}</span>
        </p>

        <p className="section-label text-text-muted">
          BUILT WITH{" "}
          <span className="text-accent-blue">REACT</span>
          {" / "}
          <span className="text-accent-violet">THREE.JS</span>
          {" / "}
          <span className="text-accent-glow">GSAP</span>
        </p>

        <button
          type="button"
          onClick={scrollToTop}
          className="interactive group flex items-center gap-2 section-label text-text-muted transition-colors hover:text-text-primary"
          data-cursor="open"
          aria-label="Back to top"
        >
          <span>BACK TO TOP</span>
          <span className="transition-transform duration-300 group-hover:-translate-y-1">↑</span>
        </button>
      </div>
    </footer>
  );
}
