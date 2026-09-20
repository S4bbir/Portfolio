"use client";

import { useEffect, useRef } from "react";
import { siteConfig, socialLinks } from "@/config/site";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { gsap, registerGSAP } from "@/lib/animations/gsap";

const HEADING = ["LET'S BUILD", "SOMETHING", "INTERESTING."];

function splitChars(text: string) {
  return text.split("").map((char, i) => (
    <span key={i} className="inline-block overflow-hidden">
      <span className="char inline-block will-change-transform">
        {char === " " ? "\u00A0" : char}
      </span>
    </span>
  ));
}

export function Contact() {
  const orbRef = useRef<HTMLDivElement>(null);

  // Floating orb pulse
  useEffect(() => {
    if (!orbRef.current) return;
    registerGSAP();
    gsap.to(orbRef.current, {
      scale: 1.15,
      opacity: 0.25,
      duration: 3.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  }, []);

  return (
    <section
      id="contact"
      className="relative min-h-screen overflow-hidden px-6 py-32 md:px-16 lg:px-24"
      aria-labelledby="contact-heading"
    >
      {/* Large pulsing orb */}
      <div
        ref={orbRef}
        className="pointer-events-none absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-15 blur-3xl"
        style={{ background: "radial-gradient(circle, #4D7CFF 0%, #8B5CF6 50%, transparent 70%)" }}
      />

      {/* Vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-transparent to-transparent" />

      {/* Corner decorations */}
      <div className="pointer-events-none absolute top-8 left-8 flex flex-col gap-1">
        <div className="h-8 w-px bg-white/10" />
        <div className="h-px w-8 bg-white/10" />
      </div>
      <div className="pointer-events-none absolute bottom-8 right-8 flex flex-col items-end gap-1">
        <div className="h-px w-12 bg-white/10" />
        <div className="h-8 w-px self-end bg-white/10" />
      </div>

      <div className="relative mx-auto max-w-5xl text-center">
        <p className="section-label mb-12" data-reveal>
          07 / CONTACT
        </p>

        {/* Giant heading — each line as separate char animation */}
        <h2
          id="contact-heading"
          className="mb-16 space-y-1"
        >
          {HEADING.map((line, lineIdx) => (
            <div key={line} className="block overflow-hidden">
              <div
                className="font-display leading-[0.92]"
                style={{ fontSize: "clamp(2.5rem, 8vw, 7rem)" }}
                data-chars
              >
                {line.split("").map((char, i) => (
                  <span key={`${line}-${i}`} className="inline-block overflow-hidden">
                    <span
                      className="char inline-block will-change-transform"
                      style={{
                        color: lineIdx === 2 ? "var(--text-secondary)" : undefined,
                      }}
                    >
                      {char === " " ? "\u00A0" : char}
                    </span>
                  </span>
                ))}
              </div>
            </div>
          ))}
        </h2>

        {/* CTA button */}
        <div data-reveal data-delay="0.3">
          <MagneticButton
            href={`mailto:${siteConfig.email}`}
            className="group mb-20 inline-flex items-center gap-3 rounded-full border border-accent-blue/30 bg-accent-blue/5 px-10 py-5 text-base text-accent-blue transition-all duration-500 hover:bg-accent-blue/10 hover:shadow-[0_0_40px_#4D7CFF25]"
            dataCursor="open"
          >
            GET IN TOUCH
            <span className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
          </MagneticButton>
        </div>

        {/* Social links */}
        <div className="flex flex-wrap items-center justify-center gap-10" data-stagger>
          {socialLinks.map(({ label, href, icon }) => (
            <a
              key={label}
              href={href}
              target={icon !== "email" ? "_blank" : undefined}
              rel={icon !== "email" ? "noopener noreferrer" : undefined}
              className="interactive group flex flex-col items-center gap-1 transition-all duration-300"
              data-cursor="open"
              aria-label={label}
            >
              <span className="section-label text-text-muted transition-colors duration-300 group-hover:text-text-primary">
                {label}
              </span>
              <div className="h-px w-0 bg-accent-blue transition-all duration-500 group-hover:w-full" />
            </a>
          ))}
        </div>

        {/* Email address */}
        <div className="mt-16" data-reveal data-delay="0.5">
          <p className="section-label text-text-muted">{siteConfig.email}</p>
        </div>
      </div>
    </section>
  );
}
