"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, registerGSAP } from "@/lib/animations/gsap";
import { siteConfig } from "@/config/site";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

interface LoadingScreenProps {
  onComplete: () => void;
}

const STEPS = [
  { label: "00%", val: 0 },
  { label: "17%", val: 17 },
  { label: "42%", val: 42 },
  { label: "68%", val: 68 },
  { label: "91%", val: 91 },
  { label: "100%", val: 100 },
];

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [phase, setPhase] = useState<"init" | "system" | "progress" | "done">("init");
  const [stepIdx, setStepIdx] = useState(0);
  const reducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const numRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (reducedMotion) { onComplete(); return; }

    registerGSAP();

    // Phase 1: init label
    const t1 = setTimeout(() => setPhase("system"), 300);
    // Phase 2: system / name
    const t2 = setTimeout(() => setPhase("progress"), 700);

    // Phase 3: progress steps
    let step = 0;
    const progressInterval = setInterval(() => {
      step++;
      setStepIdx(step);
      // animate bar
      if (barRef.current) {
        gsap.to(barRef.current, { width: `${STEPS[step].val}%`, duration: 0.25, ease: "power2.out" });
      }
      if (step >= STEPS.length - 1) {
        clearInterval(progressInterval);
        setTimeout(() => {
          setPhase("done");
          const tl = gsap.timeline();
          // dramatic exit: flash + wipe
          tl.to(".loader-chars", { opacity: 0, y: -20, duration: 0.4, ease: "power3.in" })
            .to(".loader-line", { scaleX: 0, duration: 0.3, ease: "power2.in" }, "-=0.2")
            .to(".loader-screen", {
              clipPath: "inset(0% 0% 100% 0%)",
              duration: 0.7,
              ease: "power4.inOut",
              onComplete,
            }, "-=0.05");
        }, 220);
      }
    }, 200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearInterval(progressInterval);
    };
  }, [onComplete, reducedMotion]);

  if (reducedMotion) return null;

  return (
    <div
      ref={containerRef}
      className="loader-screen fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-bg-primary"
      style={{ clipPath: "inset(0% 0% 0% 0%)" }}
      aria-live="polite"
      aria-label="Loading"
    >
      {/* Subtle background radial */}
      <div className="pointer-events-none absolute inset-0 opacity-30"
        style={{ background: "radial-gradient(ellipse 60% 50% at 50% 50%, #4D7CFF18 0%, transparent 70%)" }} />

      {/* Corner decorations */}
      <div className="pointer-events-none absolute top-8 left-8">
        <span className="section-label opacity-30">S4BBIR / SYSTEM</span>
      </div>
      <div className="pointer-events-none absolute top-8 right-8">
        <span className="section-label opacity-30">{siteConfig.year}</span>
      </div>
      <div className="pointer-events-none absolute bottom-8 left-8">
        <span className="section-label opacity-30">{siteConfig.location.toUpperCase()}</span>
      </div>

      {/* Center content */}
      <div className="relative flex flex-col items-center gap-8">
        {phase === "init" && (
          <p className="loader-chars section-label tracking-[0.4em] text-text-muted animate-pulse">
            INITIALIZING DIGITAL ARCHIVE
          </p>
        )}

        {phase === "system" && (
          <div className="loader-chars flex flex-col items-center gap-2 text-center">
            <p className="section-label tracking-[0.5em] text-text-muted">SYSTEM</p>
            <p className="font-display text-5xl tracking-[0.15em] text-text-primary md:text-7xl">
              {siteConfig.displayName}
            </p>
            <p className="section-label text-accent-blue tracking-[0.35em]">
              {siteConfig.tagline}
            </p>
          </div>
        )}

        {(phase === "progress" || phase === "done") && (
          <div className="loader-chars flex flex-col items-center gap-6">
            <p
              ref={numRef}
              className="font-mono text-6xl font-thin tabular-nums text-text-secondary md:text-8xl"
            >
              {STEPS[stepIdx].label}
            </p>

            {/* Progress bar */}
            <div className="loader-line relative h-px w-48 overflow-hidden bg-bg-surface">
              <div ref={barRef} className="absolute inset-y-0 left-0 bg-accent-blue" style={{ width: "0%" }} />
            </div>

            <p className="section-label tracking-[0.4em] text-text-muted">
              LOADING DIGITAL ARCHIVE
            </p>
          </div>
        )}
      </div>

      {/* Animated corner lines */}
      <div className="pointer-events-none absolute bottom-8 right-8 flex flex-col items-end gap-1">
        <div className="h-px w-16 bg-white/10" />
        <div className="h-px w-8 bg-white/5" />
      </div>
    </div>
  );
}
