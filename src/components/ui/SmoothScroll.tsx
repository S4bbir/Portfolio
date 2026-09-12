"use client";

import { useEffect, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap, registerGSAP, ScrollTrigger } from "@/lib/animations/gsap";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { useScrollContext } from "@/lib/context/ScrollContext";

export function SmoothScroll({ children }: { children: ReactNode }) {
  const reducedMotion = useReducedMotion();
  const pathname = usePathname();
  const { heroProgress, mouseX, mouseY, activeSection } = useScrollContext();

  useEffect(() => {
    if (reducedMotion) return;

    registerGSAP();
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => 1 - Math.pow(1 - t, 4),
      smoothWheel: true,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const ticker = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);

    const onMouseMove = (e: MouseEvent) => {
      mouseX.current = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY.current = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", onMouseMove);

    const heroEl = document.getElementById("hero");
    let heroTrigger: ScrollTrigger | undefined;
    if (heroEl) {
      heroTrigger = ScrollTrigger.create({
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

    if (window.location.hash) {
      const target = document.querySelector(window.location.hash);
      if (target) {
        requestAnimationFrame(() => {
          lenis.scrollTo(target as HTMLElement, { offset: 0, immediate: false });
        });
      }
    }

    const refresh = window.setTimeout(() => ScrollTrigger.refresh(), 80);

    return () => {
      window.clearTimeout(refresh);
      gsap.ticker.remove(ticker);
      gsap.ticker.lagSmoothing(500, 33);
      lenis.destroy();
      window.removeEventListener("mousemove", onMouseMove);
      sectionObserver.disconnect();
      heroTrigger?.kill();
    };
  }, [reducedMotion, pathname, heroProgress, mouseX, mouseY, activeSection]);

  return <>{children}</>;
}
