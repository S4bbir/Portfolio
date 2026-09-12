"use client";

import { siteConfig } from "@/config/site";

export function About() {
  return (
    <section
      id="about"
      className="relative min-h-screen px-6 py-32 md:px-16 lg:px-24"
      aria-labelledby="about-heading"
    >
      <div className="mx-auto max-w-5xl">
        <p className="section-label mb-8" data-reveal>
          03 / ABOUT
        </p>

        <h2 id="about-heading" className="mb-12 space-y-2">
          {siteConfig.about.heading.map((line) => (
            <span
              key={line}
              className="block overflow-hidden font-display text-4xl leading-tight md:text-6xl lg:text-7xl"
              data-chars
            >
              {line.split("").map((char, i) => (
                <span key={`${line}-${i}`} className="inline-block overflow-hidden">
                  <span className="char inline-block">{char === " " ? "\u00A0" : char}</span>
                </span>
              ))}
            </span>
          ))}
        </h2>

        <p
          className="max-w-2xl text-lg leading-relaxed text-text-secondary md:text-xl"
          data-reveal
        >
          {siteConfig.about.paragraph}
        </p>

        <div className="mt-16 grid gap-8 border-t border-white/5 pt-16 md:grid-cols-3" data-stagger>
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
