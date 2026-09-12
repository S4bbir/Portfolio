"use client";

import { useEffect, useState } from "react";
import { gsap, registerGSAP } from "@/lib/animations/gsap";
import { siteConfig } from "@/config/site";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

interface LoadingScreenProps {
  onComplete: () => void;
}

const STEPS = ["00%", "17%", "42%", "68%", "91%", "100%"];

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [phase, setPhase] = useState<"init" | "system" | "progress" | "done">("init");
  const [progressIndex, setProgressIndex] = useState(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) {
      onComplete();
      return;
    }

    registerGSAP();
    const tl = gsap.timeline();

    const initTimer = setTimeout(() => setPhase("system"), 200);
    const systemTimer = setTimeout(() => setPhase("progress"), 500);

    let step = 0;
    const progressInterval = setInterval(() => {
      step++;
      setProgressIndex(step);
      if (step >= STEPS.length - 1) {
        clearInterval(progressInterval);
        setTimeout(() => {
          setPhase("done");
          tl.to(".loader-screen", {
            opacity: 0,
            duration: 0.6,
            ease: "power3.inOut",
            onComplete,
          });
        }, 200);
      }
    }, 180);

    return () => {
      clearTimeout(initTimer);
      clearTimeout(systemTimer);
      clearInterval(progressInterval);
      tl.kill();
    };
  }, [onComplete, reducedMotion]);

  if (reducedMotion) return null;

  return (
    <div
      className="loader-screen fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-bg-primary"
      aria-live="polite"
      aria-label="Loading"
    >
      {phase === "init" && (
        <p className="section-label animate-pulse">INITIALIZING DIGITAL ARCHIVE</p>
      )}
      {phase === "system" && (
        <div className="text-center">
          <p className="section-label mb-2">SYSTEM</p>
          <p className="font-display text-3xl tracking-wider">{siteConfig.shortName}</p>
        </div>
      )}
      {(phase === "progress" || phase === "done") && (
        <div className="text-center">
          <p className="font-mono text-4xl font-light tabular-nums text-text-secondary">
            {STEPS[progressIndex]}
          </p>
          <div className="mt-4 h-px w-32 overflow-hidden bg-bg-surface">
            <div
              className="h-full bg-accent-blue transition-all duration-300 ease-out"
              style={{ width: STEPS[progressIndex] }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
