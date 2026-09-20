"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { gsap, registerGSAP } from "@/lib/animations/gsap";
import { useWebGL } from "@/lib/hooks/useWebGL";
import { useIsMobile } from "@/lib/hooks/useIsMobile";
import { HeroTypography } from "./HeroTypography";
import { HeroEdgeUI } from "./HeroEdgeUI";
import { HeroFallback } from "./HeroFallback";
import { MagneticButton } from "@/components/ui/MagneticButton";

const HeroScene = dynamic(() => import("./HeroScene").then((m) => m.HeroScene), {
  ssr: false,
  loading: () => <HeroFallback />,
});

export function Hero() {
  const [revealed, setRevealed] = useState(false);
  const { supported, checked } = useWebGL();
  const isMobile = useIsMobile();

  useEffect(() => {
    registerGSAP();

    // Staggered cinematic entrance sequence
    const tl = gsap.timeline({ delay: 0.2 });

    tl
      // 1. Background fades in
      .to(".hero-bg", { opacity: 1, duration: 1.0, ease: "power2.out" })
      // 2. 3D scene fades in
      .to(".hero-scene", { opacity: 1, duration: 1.2, ease: "power2.out" }, "-=0.6")
      // 3. Trigger typography + UI
      .call(() => setRevealed(true), [], "-=0.5");

    return () => { tl.kill(); };
  }, []);

  return (
    <section
      id="hero"
      className="relative flex h-screen min-h-[600px] items-center justify-center overflow-hidden"
      aria-label="Introduction"
    >
      {/* Background layers */}
      <div className="hero-bg absolute inset-0 opacity-0">
        <div className="absolute inset-0 bg-bg-primary" />
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(77,124,255,0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(77,124,255,0.5) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
        />
        <div className="hero-glow absolute inset-0" />
        <div className="hero-vignette absolute inset-0" />
      </div>

      {/* 3D Scene */}
      <div className="hero-scene absolute inset-0 opacity-0">
        {checked && supported ? <HeroScene /> : <HeroFallback />}
      </div>

      {/* Edge UI labels */}
      <HeroEdgeUI visible={revealed} />

      {/* Typography overlay */}
      <div className="relative z-10 flex flex-col items-center px-6">
        <HeroTypography visible={revealed} />

        {isMobile && (
          <MagneticButton
            href="#projects"
            className="interactive mt-10 rounded-full border border-accent-blue/30 px-6 py-3 text-accent-blue"
            dataCursor="open"
          >
            EXPLORE WORK ↓
          </MagneticButton>
        )}
      </div>

      {/* Screen reader accessible project list */}
      <div className="sr-only">
        <h2>Featured Projects</h2>
        <ul>
          {["SynaptiQ", "ShortcutX", "Vibeo", "TastyBite"].map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
