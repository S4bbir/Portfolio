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
    const letters = containerRef.current.querySelectorAll(".hero-letter");
    const lines = containerRef.current.querySelectorAll(".hero-line");

    const tl = gsap.timeline();
    tl.fromTo(
      letters,
      { y: "120%", rotateX: 70, opacity: 0 },
      {
        y: "0%",
        rotateX: 0,
        opacity: 1,
        duration: 0.95,
        stagger: 0.05,
        ease: "power4.out",
      }
    ).fromTo(
      lines,
      { y: 28, opacity: 0, filter: "blur(8px)" },
      {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        duration: 0.8,
        stagger: 0.08,
        ease: "power3.out",
      },
      "-=0.45"
    );

    return () => {
      tl.kill();
    };
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
      style={{ perspective: "900px" }}
    >
      <h1 className="font-display mb-8 text-6xl tracking-tight md:text-8xl lg:text-9xl">
        {siteConfig.shortName.split("").map((char, i) => (
          <span key={`${char}-${i}`} className="inline-block overflow-hidden">
            <span className="hero-letter inline-block will-change-transform">{char}</span>
          </span>
        ))}
      </h1>

      <div className="max-w-2xl space-y-1">
        {lines.map((line, i) => (
          <div key={line} className="overflow-hidden">
            <p
              className={`hero-line font-display text-xl tracking-wide md:text-3xl lg:text-4xl ${
                i >= 2 ? "text-text-secondary" : "text-text-primary"
              }`}
            >
              {line}
            </p>
          </div>
        ))}
      </div>

      <p className="hero-line section-label mt-8 text-text-muted">{siteConfig.tagline}</p>
    </div>
  );
}
