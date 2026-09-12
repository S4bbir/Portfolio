"use client";

import { useEffect, useRef } from "react";
import { gsap, registerGSAP } from "@/lib/animations/gsap";
import { education, experience } from "@/config/site";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

export function Journey() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || !sectionRef.current) return;

    registerGSAP();
    const entries = sectionRef.current.querySelectorAll(".timeline-entry");

    if (lineRef.current) {
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            end: "bottom 40%",
            scrub: true,
          },
        }
      );
    }

    entries.forEach((entry) => {
      gsap.fromTo(
        entry,
        { x: -30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: entry,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });
  }, [reducedMotion]);

  const allEntries = [
    ...education.map((e) => ({ ...e, type: "education" as const })),
    ...experience.map((e) => ({ ...e, type: "experience" as const })),
  ];

  return (
    <section
      id="journey"
      ref={sectionRef}
      className="relative px-6 py-32 md:px-16 lg:px-24"
      aria-labelledby="journey-heading"
    >
      <div className="mx-auto max-w-3xl">
        <p className="section-label mb-4">05 / JOURNEY</p>
        <h2 id="journey-heading" className="font-display mb-16 text-4xl md:text-6xl">
          TIMELINE
        </h2>

        <div className="relative pl-8">
          <div
            ref={lineRef}
            className="absolute top-0 left-3 h-full w-px origin-top bg-gradient-to-b from-accent-blue to-text-muted/30"
          />

          <div className="space-y-12">
            {allEntries.map((entry, i) => (
              <div key={i} className="timeline-entry relative">
                <div className="absolute -left-5 top-1 h-2 w-2 rounded-full bg-accent-blue" />
                <p className="section-label mb-2 text-accent-blue">{entry.year}</p>
                {"degree" in entry ? (
                  <>
                    <h3 className="text-xl text-text-primary">{entry.degree}</h3>
                    <p className="mt-1 text-text-secondary">{entry.institution}</p>
                  </>
                ) : (
                  <>
                    <h3 className="text-xl text-text-primary">{entry.title}</h3>
                    <p className="mt-1 text-text-secondary">{entry.organization}</p>
                    {entry.description && (
                      <p className="mt-2 text-sm text-text-muted">{entry.description}</p>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
