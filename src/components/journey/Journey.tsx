"use client";

import { education, experience } from "@/config/site";

function splitChars(text: string) {
  return text.split("").map((char, i) => (
    <span key={i} className="inline-block overflow-hidden">
      <span className="char inline-block will-change-transform">
        {char === " " ? "\u00A0" : char}
      </span>
    </span>
  ));
}

export function Journey() {
  const allEntries = [
    ...education.map((e) => ({ ...e, type: "education" as const })),
    ...experience.map((e) => ({ ...e, type: "experience" as const })),
  ];

  return (
    <section
      id="journey"
      className="relative overflow-hidden px-6 py-32 md:px-16 lg:px-24"
      aria-labelledby="journey-heading"
    >
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute -left-24 top-1/2 h-[400px] w-[400px] -translate-y-1/2 rounded-full opacity-8 blur-3xl"
        style={{ background: "radial-gradient(circle, #4D7CFF 0%, transparent 70%)" }}
      />

      <div className="relative mx-auto max-w-3xl">
        <p className="section-label mb-4" data-reveal>
          05 / JOURNEY
        </p>
        <h2
          id="journey-heading"
          className="font-display mb-20 text-4xl md:text-6xl"
          data-chars
        >
          {splitChars("TIMELINE")}
        </h2>

        <div className="relative pl-10">
          {/* Scroll-drawn vertical line */}
          <div
            data-line
            className="absolute top-0 left-3 h-full w-px origin-top bg-gradient-to-b from-accent-blue via-accent-violet to-text-muted/20"
          />

          <div className="space-y-16" data-stagger>
            {allEntries.map((entry, i) => (
              <div key={i} className="timeline-entry group relative">
                {/* Dot */}
                <div className="absolute -left-7 top-1.5 flex h-3 w-3 items-center justify-center">
                  <div className="h-2 w-2 rounded-full bg-accent-blue transition-all duration-500 group-hover:h-3 group-hover:w-3 group-hover:bg-accent-glow group-hover:shadow-[0_0_8px_#4D7CFF]" />
                </div>

                {/* Year */}
                <p className="section-label mb-2 text-accent-blue">{entry.year}</p>

                {"degree" in entry ? (
                  <>
                    <h3 className="text-xl font-medium text-text-primary transition-colors duration-300 group-hover:text-accent-blue">
                      {entry.degree}
                    </h3>
                    <p className="mt-1.5 text-text-secondary">{entry.institution}</p>
                  </>
                ) : (
                  <>
                    <h3 className="text-xl font-medium text-text-primary transition-colors duration-300 group-hover:text-accent-blue">
                      {entry.title}
                    </h3>
                    <p className="mt-1.5 text-text-secondary">{entry.organization}</p>
                    {entry.description && (
                      <p className="mt-2 text-sm leading-relaxed text-text-muted">{entry.description}</p>
                    )}
                  </>
                )}

                {/* Bottom rule */}
                <div className="mt-6 h-px w-0 bg-white/5 transition-all duration-700 group-hover:w-full" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
