"use client";

import { experiments } from "@/config/projects";
import { ExperimentCard } from "./ExperimentCard";

export function Lab() {
  return (
    <section
      id="lab"
      className="relative px-6 py-32 md:px-16 lg:px-24"
      aria-labelledby="lab-heading"
    >
      <div className="mx-auto max-w-6xl">
        <p className="section-label mb-4" data-reveal>
          06 / LAB
        </p>
        <h2 id="lab-heading" className="font-display mb-4 text-4xl md:text-6xl" data-chars>
          {"THE LAB".split("").map((char, i) => (
            <span key={i} className="inline-block overflow-hidden">
              <span className="char inline-block">{char === " " ? "\u00A0" : char}</span>
            </span>
          ))}
        </h2>
        <p className="mb-16 max-w-lg text-text-secondary" data-reveal>
          Experiments, prototypes, and things I built just to see what was possible.
        </p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" data-stagger>
          {experiments.map((experiment) => (
            <ExperimentCard key={experiment.id} experiment={experiment} />
          ))}
        </div>
      </div>
    </section>
  );
}
