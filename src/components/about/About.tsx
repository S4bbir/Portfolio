"use client";

import { useEffect, useRef } from "react";
import { gsap, registerGSAP } from "@/lib/animations/gsap";
import { siteConfig } from "@/config/site";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || !sectionRef.current) return;

    registerGSAP();
    const lines = sectionRef.current.querySelectorAll(".about-line");

    gsap.fromTo(
      lines,
      { y: 60, opacity: 0, filter: "blur(8px)" },
      {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        duration: 0.9,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, [reducedMotion]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative min-h-screen px-6 py-32 md:px-16 lg:px-24"
      aria-labelledby="about-heading"
    >
      <div className="mx-auto max-w-5xl">
        <p className="section-label mb-8">03 / ABOUT</p>

        <h2 id="about-heading" className="mb-12 space-y-2">
          {siteConfig.about.heading.map((line, i) => (
            <span
              key={i}
              className="about-line block font-display text-4xl leading-tight md:text-6xl lg:text-7xl"
            >
              {line}
            </span>
          ))}
        </h2>

        <p className="about-line max-w-2xl text-lg leading-relaxed text-text-secondary md:text-xl">
          {siteConfig.about.paragraph}
        </p>

        <div className="about-line mt-16 grid gap-8 border-t border-white/5 pt-16 md:grid-cols-3">
          <div>
            <p className="section-label mb-2">ROLE</p>
            <p className="text-text-primary">{siteConfig.role}</p>
          </div>
          <div>
            <p className="section-label mb-2">FOCUS</p>
            <p className="text-text-primary">{siteConfig.tagline}</p>
          </div>
          <div>
            <p className="section-label mb-2">LOCATION</p>
            <p className="text-text-primary">{siteConfig.location}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
