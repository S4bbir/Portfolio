"use client";

import { useEffect, useRef, useState } from "react";
import { siteConfig } from "@/config/site";

export function HeroEdgeUI({ visible }: { visible: boolean }) {
  const lineRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const progress = Math.min(window.scrollY / 400, 1);
      setScrollProgress(progress);
      setHidden(window.scrollY > 300);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div
        className={`pointer-events-none absolute top-8 left-8 z-20 transition-opacity duration-700 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      >
        <span className="font-display text-lg text-text-muted">S</span>
      </div>

      <div
        className={`pointer-events-none absolute top-8 right-8 z-20 transition-opacity duration-700 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      >
        <span className="section-label">{siteConfig.year}</span>
      </div>

      <div
        className={`pointer-events-none absolute bottom-8 left-8 z-20 transition-opacity duration-700 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      >
        <span className="section-label">{siteConfig.locationShort}</span>
      </div>

      <div
        className={`pointer-events-none absolute bottom-8 right-8 z-20 flex flex-col items-center gap-2 transition-all duration-500 ${
          visible && !hidden ? "opacity-100" : "opacity-0"
        }`}
      >
        <span className="section-label">SCROLL ↓</span>
        <div className="scroll-line h-8" ref={lineRef}>
          <div
            className="h-full w-full bg-accent-blue transition-transform duration-100"
            style={{ transform: `scaleY(${scrollProgress})` }}
          />
        </div>
      </div>

      <div
        className={`pointer-events-none absolute top-1/2 left-8 z-20 hidden -translate-y-1/2 lg:block transition-opacity duration-700 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      >
        <span className="section-label">01 / 07</span>
      </div>
    </>
  );
}
