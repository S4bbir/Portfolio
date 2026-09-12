"use client";

import { useEffect, useRef } from "react";
import { gsap, registerGSAP } from "@/lib/animations/gsap";
import { siteConfig } from "@/config/site";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

export function HeroTypography({ visible }: { visible: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!visible || reducedMotion || !containerRef.current) return;

    registerGSAP();
    const words = containerRef.current.querySelectorAll(".hero-word");

    gsap.fromTo(
      words,
      { y: "100%", opacity: 0, filter: "blur(6px)" },
      {
        y: "0%",
        opacity: 1,
        filter: "blur(0px)",
        duration: 0.9,
        stagger: 0.08,
        delay: 0.2,
        ease: "power3.out",
      }
    );
  }, [visible, reducedMotion]);

  const lines = [
    siteConfig.hero.line1,
    siteConfig.hero.line2,
    siteConfig.hero.line3,
    siteConfig.hero.line4,
  ];

  return (
    <div
      ref={containerRef}
      className="pointer-events-none relative z-10 flex flex-col items-center text-center"
    >
      <h1 className="font-display mb-2 text-5xl tracking-tight md:text-7xl lg:text-8xl">
        {siteConfig.displayName.split("").map((char, i) => (
          <span key={i} className="inline-block overflow-hidden">
            <span className="hero-word inline-block">{char}</span>
          </span>
        ))}
      </h1>

      <div className="mb-8 overflow-hidden">
        <p className="hero-word section-label text-text-secondary">
          CREATIVE DEVELOPER
        </p>
      </div>

      <div className="max-w-2xl space-y-1">
        {lines.map((line, i) => (
          <div key={i} className="overflow-hidden">
            <p
              className={`hero-word font-display text-xl tracking-wide md:text-3xl lg:text-4xl ${
                i >= 2 ? "text-text-secondary" : "text-text-primary"
              }`}
            >
              {line}
            </p>
          </div>
        ))}
      </div>

      <p className="hero-word section-label mt-6 text-text-muted">{siteConfig.tagline}</p>
    </div>
  );
}
