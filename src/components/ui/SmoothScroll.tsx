"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import { registerGSAP, ScrollTrigger } from "@/lib/animations/gsap";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { useScrollContext } from "@/lib/context/ScrollContext";

interface SmoothScrollProps {
  children: ReactNode;
}

export function SmoothScroll({ children }: SmoothScrollProps) {
  const reducedMotion = useReducedMotion();
  const { heroProgress, mouseX, mouseY, activeSection } = useScrollContext();

  useEffect(() => {
    if (reducedMotion) return;

    registerGSAP();
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    const onMouseMove = (e: MouseEvent) => {
      mouseX.current = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY.current = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", onMouseMove);

    const heroEl = document.getElementById("hero");
    if (heroEl) {
      ScrollTrigger.create({
        trigger: heroEl,
        start: "top top",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => {
          heroProgress.current = self.progress;
        },
      });
    }

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            activeSection.current = entry.target.id;
          }
        });
      },
      { threshold: 0.3 }
    );

    document.querySelectorAll("section[id]").forEach((el) => sectionObserver.observe(el));

    return () => {
      lenis.destroy();
      window.removeEventListener("mousemove", onMouseMove);
      sectionObserver.disconnect();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [reducedMotion, heroProgress, mouseX, mouseY, activeSection]);

  return <>{children}</>;
}
