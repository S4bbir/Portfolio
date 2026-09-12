"use client";

import { experiments } from "@/config/projects";
import { ExperimentCard } from "./ExperimentCard";
import { SplitText } from "@/components/ui/SplitText";

export function Lab() {
  return (
    <section
      id="lab"
      className="relative px-6 py-32 md:px-16 lg:px-24"
      aria-labelledby="lab-heading"
    >
      <div className="mx-auto max-w-6xl">
        <p className="section-label mb-4">06 / LAB</p>
        <SplitText text="THE LAB" as="h2" className="font-display mb-4 text-4xl md:text-6xl" />
        <p className="mb-16 max-w-lg text-text-secondary">
          Experiments, prototypes, and things I built just to see what was possible.
        </p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {experiments.map((experiment) => (
            <ExperimentCard key={experiment.id} experiment={experiment} />
          ))}
        </div>
      </div>
    </section>
  );
}
