"use client";

import { useEffect, useRef } from "react";
import { gsap, registerGSAP } from "@/lib/animations/gsap";
import { siteConfig, socialLinks } from "@/config/site";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || !sectionRef.current) return;

    registerGSAP();
    gsap.fromTo(
      sectionRef.current.querySelector(".contact-content"),
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
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
      id="contact"
      ref={sectionRef}
      className="relative min-h-screen px-6 py-32 md:px-16 lg:px-24"
      aria-labelledby="contact-heading"
    >
      <div className="absolute inset-0 hero-glow opacity-50" />

      <div className="contact-content relative mx-auto max-w-4xl text-center">
        <p className="section-label mb-8">07 / CONTACT</p>

        <h2 id="contact-heading" className="font-display mb-12 text-5xl leading-tight md:text-7xl lg:text-8xl">
          LET&apos;S BUILD
          <br />
          SOMETHING
          <br />
          <span className="text-text-secondary">INTERESTING.</span>
        </h2>

        <MagneticButton
          href={`mailto:${siteConfig.email}`}
          className="mb-16 text-lg text-accent-blue md:text-xl"
          dataCursor="open"
        >
          GET IN TOUCH ↗
        </MagneticButton>

        <div className="flex flex-wrap items-center justify-center gap-8">
          {socialLinks.map(({ label, href, icon }) => (
            <a
              key={label}
              href={href}
              target={icon !== "email" ? "_blank" : undefined}
              rel={icon !== "email" ? "noopener noreferrer" : undefined}
              className="interactive section-label text-text-secondary transition-colors hover:text-text-primary"
              data-cursor="open"
              aria-label={label}
            >
              {label} ↗
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
