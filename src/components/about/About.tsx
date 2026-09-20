"use client";

import { siteConfig } from "@/config/site";

function WordReveal({ text, className }: { text: string; className?: string }) {
  const words = text.split(" ");
  return (
    <span className={className} data-word>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block overflow-hidden mr-[0.25em]">
          <span className="word-inner inline-block will-change-transform">
            {word}
          </span>
        </span>
      ))}
    </span>
  );
}

export function About() {
  return (
    <section
      id="about"
      className="relative min-h-screen overflow-hidden px-6 py-32 md:px-16 lg:px-24"
      aria-labelledby="about-heading"
    >
      {/* Ambient blue glow left */}
      <div
        className="pointer-events-none absolute -left-32 top-1/3 h-[500px] w-[500px] rounded-full opacity-10 blur-3xl"
        style={{ background: "radial-gradient(circle, #4D7CFF 0%, transparent 70%)" }}
      />
      {/* Violet glow right */}
      <div
        className="pointer-events-none absolute -right-32 bottom-1/3 h-[400px] w-[400px] rounded-full opacity-8 blur-3xl"
        style={{ background: "radial-gradient(circle, #8B5CF6 0%, transparent 70%)" }}
      />

      <div className="relative mx-auto max-w-5xl">
        <p className="section-label mb-10" data-reveal>
          03 / ABOUT
        </p>

        {/* Big headline with word reveal */}
        <h2 id="about-heading" className="mb-16 space-y-3">
          {siteConfig.about.heading.map((line) => (
            <div key={line} className="block overflow-hidden">
              <div
                className="font-display text-5xl leading-tight md:text-7xl lg:text-8xl"
                data-chars
              >
                {line.split("").map((char, i) => (
                  <span key={`${line}-${i}`} className="inline-block overflow-hidden">
                    <span className="char inline-block will-change-transform">
                      {char === " " ? "\u00A0" : char}
                    </span>
                  </span>
                ))}
              </div>
            </div>
          ))}
        </h2>

        {/* Body paragraph — large with word reveal */}
        <div className="mb-20 max-w-2xl" data-reveal data-delay="0.2">
          <p className="text-xl leading-relaxed text-text-secondary md:text-2xl">
            {siteConfig.about.paragraph}
          </p>
        </div>

        {/* Three stat/info blocks */}
        <div
          className="grid gap-12 border-t border-white/5 pt-16 md:grid-cols-3"
          data-stagger
        >
          <div className="group">
            <p className="section-label mb-3 text-accent-blue">ROLE</p>
            <p className="text-lg text-text-primary transition-colors duration-300 group-hover:text-text-primary">
              {siteConfig.role}
            </p>
          </div>
          <div className="group">
            <p className="section-label mb-3 text-accent-blue">FOCUS</p>
            <p className="text-lg text-text-primary">
              {siteConfig.tagline}
            </p>
          </div>
          <div className="group">
            <p className="section-label mb-3 text-accent-blue">LOCATION</p>
            <p className="text-lg text-text-primary">{siteConfig.location}</p>
          </div>
        </div>

        {/* Decorative horizontal line that draws */}
        <div
          className="mt-20 h-px origin-left bg-gradient-to-r from-accent-blue/30 to-transparent"
          data-line
        />
      </div>
    </section>
  );
}
