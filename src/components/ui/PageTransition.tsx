"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { gsap, registerGSAP } from "@/lib/animations/gsap";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { siteConfig } from "@/config/site";

export function PageTransition() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const reduced = useReducedMotion();
  const first = useRef(true);

  useEffect(() => {
    if (reduced || !overlayRef.current) return;
    registerGSAP();

    const overlay = overlayRef.current;
    if (first.current) {
      first.current = false;
      gsap.set(overlay, { yPercent: -100 });
      return;
    }

    const tl = gsap.timeline();
    tl.set(overlay, { yPercent: 0 })
      .fromTo(
        overlay.querySelector(".wipe-panel"),
        { clipPath: "inset(100% 0 0 0)" },
        { clipPath: "inset(0% 0 0 0)", duration: 0.45, ease: "power4.inOut" }
      )
      .fromTo(
        overlay.querySelector(".wipe-inner"),
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.28, ease: "power3.out" },
        "-=0.15"
      )
      .to(overlay.querySelector(".wipe-inner"), {
        y: -20,
        opacity: 0,
        duration: 0.25,
        delay: 0.08,
        ease: "power3.in",
      })
      .to(
        overlay.querySelector(".wipe-panel"),
        { clipPath: "inset(0 0 100% 0)", duration: 0.5, ease: "power4.inOut" },
        "-=0.05"
      )
      .set(overlay, { yPercent: -100 });

    return () => {
      tl.kill();
    };
  }, [pathname, reduced]);

  return (
    <div
      ref={overlayRef}
      className="pointer-events-none fixed inset-0 z-[9997]"
      style={{ transform: "translateY(-100%)" }}
      aria-hidden="true"
    >
      <div className="wipe-panel flex h-full w-full items-center justify-center bg-bg-primary">
        <p className="wipe-inner font-display text-4xl tracking-[0.2em] text-text-primary md:text-6xl">
          {siteConfig.shortName}
        </p>
      </div>
    </div>
  );
}
