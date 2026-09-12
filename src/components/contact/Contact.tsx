"use client";

import { siteConfig, socialLinks } from "@/config/site";
import { MagneticButton } from "@/components/ui/MagneticButton";

export function Contact() {
  return (
    <section
      id="contact"
      className="relative min-h-screen px-6 py-32 md:px-16 lg:px-24"
      aria-labelledby="contact-heading"
    >
      <div className="absolute inset-0 hero-glow opacity-50" />

      <div className="relative mx-auto max-w-4xl text-center">
        <p className="section-label mb-8" data-reveal>
          07 / CONTACT
        </p>

        <h2
          id="contact-heading"
          className="font-display mb-12 text-5xl leading-tight md:text-7xl lg:text-8xl"
        >
          <span className="block" data-reveal>
            LET&apos;S BUILD
          </span>
          <span className="block" data-reveal>
            SOMETHING
          </span>
          <span className="block text-text-secondary" data-reveal>
            INTERESTING.
          </span>
        </h2>

        <div data-reveal>
          <MagneticButton
            href={`mailto:${siteConfig.email}`}
            className="mb-16 text-lg text-accent-blue md:text-xl"
            dataCursor="open"
          >
            GET IN TOUCH ↗
          </MagneticButton>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-8" data-stagger>
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
