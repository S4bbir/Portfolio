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
    const tl = gsap.timeline({ delay: 0.3 });
    tl.to(".hero-bg", { opacity: 1, duration: 0.8, ease: "power2.out" })
      .to(".hero-scene", { opacity: 1, duration: 1, ease: "power2.out" }, "-=0.4")
      .call(() => setRevealed(true));
    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section
      id="hero"
      className="relative flex h-screen min-h-[600px] items-center justify-center overflow-hidden"
      aria-label="Introduction"
    >
      <div className="hero-bg absolute inset-0 opacity-0">
        <div className="absolute inset-0 bg-bg-primary" />
        <div className="hero-glow absolute inset-0" />
        <div className="hero-vignette absolute inset-0" />
      </div>

      <div className="hero-scene absolute inset-0 opacity-0">
        {checked && supported ? <HeroScene /> : <HeroFallback />}
      </div>

      <HeroEdgeUI visible={revealed} />

      <div className="relative z-10 flex flex-col items-center px-6">
        <HeroTypography visible={revealed} />

        {isMobile && (
          <MagneticButton
            href="#projects"
            className="interactive mt-8 text-accent-blue"
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
