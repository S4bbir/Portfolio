"use client";

import { experiments } from "@/config/projects";
import { ExperimentCard } from "./ExperimentCard";

function splitChars(text: string) {
  return text.split("").map((char, i) => (
    <span key={i} className="inline-block overflow-hidden">
      <span className="char inline-block will-change-transform">
        {char === " " ? "\u00A0" : char}
      </span>
    </span>
  ));
}

export function Lab() {
  return (
    <section
      id="lab"
      className="relative overflow-hidden px-6 py-32 md:px-16 lg:px-24"
      aria-labelledby="lab-heading"
    >
      {/* Multi-color ambient */}
      <div
        className="pointer-events-none absolute -bottom-32 left-1/3 h-[500px] w-[500px] rounded-full opacity-8 blur-3xl"
        style={{ background: "radial-gradient(circle, #6366F1 0%, transparent 70%)" }}
      />

      <div className="relative mx-auto max-w-6xl">
        <p className="section-label mb-4" data-reveal>
          06 / LAB
        </p>
        <h2
          id="lab-heading"
          className="font-display mb-4 text-4xl md:text-6xl lg:text-7xl"
          data-chars
        >
          {splitChars("THE LAB")}
        </h2>
        <p className="mb-20 max-w-lg text-text-secondary" data-reveal data-delay="0.15">
          Experiments, prototypes, and things I built
          <br className="hidden md:block" />
          just to see what was possible.
        </p>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" data-stagger>
          {experiments.map((experiment) => (
            <ExperimentCard key={experiment.id} experiment={experiment} />
          ))}
        </div>
      </div>
    </section>
  );
}
