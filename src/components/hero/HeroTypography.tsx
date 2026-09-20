"use client";

import { useEffect, useRef } from "react";
import { gsap, registerGSAP } from "@/lib/animations/gsap";
import { siteConfig } from "@/config/site";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

const ROLE_LINES = ["CREATIVE DEVELOPER", "AI × SOFTWARE × WEB"];

export function HeroTypography({ visible }: { visible: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!visible || !containerRef.current) return;

    registerGSAP();

    if (reducedMotion) {
      gsap.set(containerRef.current.querySelectorAll(".hero-letter, .hero-sub, .hero-tagline, .hero-cta"), {
        opacity: 1, y: 0, rotateX: 0, filter: "none",
      });
      return;
    }

    const letters = containerRef.current.querySelectorAll(".hero-letter");
    const subLines = containerRef.current.querySelectorAll(".hero-sub");
    const tagline = containerRef.current.querySelector(".hero-tagline");
    const cta = containerRef.current.querySelector(".hero-cta");
    const divider = containerRef.current.querySelector(".hero-divider");

    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    // 1. Name letter pop
    tl.fromTo(
      letters,
      { y: "130%", rotateX: 80, opacity: 0, filter: "blur(8px)" },
      { y: "0%", rotateX: 0, opacity: 1, filter: "blur(0px)", duration: 1.0, stagger: 0.055 }
    )
    // 2. Divider line draws
    .fromTo(
      divider,
      { scaleX: 0, opacity: 0 },
      { scaleX: 1, opacity: 1, duration: 0.7, ease: "power3.out" },
      "-=0.5"
    )
    // 3. Sub-heading lines rise
    .fromTo(
      subLines,
      { y: 32, opacity: 0, filter: "blur(6px)" },
      { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.8, stagger: 0.12 },
      "-=0.4"
    )
    // 4. Tagline fades
    .fromTo(
      tagline,
      { opacity: 0, y: 12, letterSpacing: "0.5em" },
      { opacity: 1, y: 0, letterSpacing: "0.3em", duration: 0.8 },
      "-=0.35"
    )
    // 5. CTA button appears
    .fromTo(
      cta,
      { opacity: 0, y: 20, scale: 0.92 },
      { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "back.out(1.4)" },
      "-=0.3"
    );

    return () => { tl.kill(); };
  }, [visible, reducedMotion]);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none relative z-10 flex flex-col items-center text-center"
      style={{ perspective: "1000px" }}
    >
      {/* Giant display name */}
      <h1 className="mb-4 overflow-hidden leading-none">
        <span className="flex items-center justify-center gap-0">
          {"S4BBIR".split("").map((char, i) => (
            <span key={`${char}-${i}`} className="inline-block overflow-hidden">
              <span
                className="hero-letter inline-block will-change-transform font-display"
                style={{
                  fontSize: "clamp(4rem, 14vw, 12rem)",
                  letterSpacing: "-0.02em",
                  lineHeight: 1,
                }}
              >
                {char}
              </span>
            </span>
          ))}
        </span>
      </h1>

      {/* Horizontal divider */}
      <div
        className="hero-divider mb-6 h-px origin-left bg-gradient-to-r from-transparent via-accent-blue/50 to-transparent"
        style={{ width: "clamp(240px, 40vw, 560px)" }}
      />

      {/* Role + tagline */}
      <div className="mb-6 space-y-1">
        {ROLE_LINES.map((line) => (
          <div key={line} className="overflow-hidden">
            <p className="hero-sub section-label text-base tracking-[0.3em] text-text-secondary md:text-lg">
              {line}
            </p>
          </div>
        ))}
      </div>

      {/* Animated tagline */}
      <p className="hero-tagline mb-10 max-w-md text-sm leading-relaxed text-text-muted md:text-base">
        {siteConfig.tagline}
      </p>

      {/* Desktop CTA */}
      <div className="hero-cta pointer-events-auto hidden md:block">
        <a
          href="#projects"
          className="interactive group inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-7 py-3 text-xs tracking-[0.2em] text-text-secondary backdrop-blur-sm transition-all duration-500 hover:border-accent-blue/40 hover:bg-accent-blue/5 hover:text-text-primary"
          data-cursor="open"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <span>EXPLORE WORK</span>
          <span className="transition-transform duration-300 group-hover:translate-x-1">↓</span>
        </a>
      </div>
    </div>
  );
}
