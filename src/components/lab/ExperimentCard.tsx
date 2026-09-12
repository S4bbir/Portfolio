"use client";

import { cn } from "@/lib/utils/cn";
import type { Experiment } from "@/types";

interface ExperimentCardProps {
  experiment: Experiment;
}

export function ExperimentCard({ experiment }: ExperimentCardProps) {
  return (
    <article
      className="experiment-card group relative aspect-[4/3] overflow-hidden rounded-sm border border-white/5"
      data-cursor="view"
    >
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-br transition-all duration-700 group-hover:scale-110",
          experiment.gradient
        )}
      />
      <div className="absolute inset-0 bg-bg-primary/40 transition-opacity duration-500 group-hover:opacity-20" />

      <div className="relative flex h-full flex-col justify-between p-6">
        <div>
          <span className="section-label text-text-muted">{experiment.id}</span>
          <h3 className="mt-2 font-display text-2xl">{experiment.title}</h3>
          <p className="mt-2 text-sm text-text-secondary">{experiment.description}</p>
        </div>

        <div className="flex items-end justify-between">
          <div className="flex flex-wrap gap-2">
            {experiment.tags.map((tag) => (
              <span key={tag} className="section-label text-text-muted">
                {tag}
              </span>
            ))}
          </div>
          <span className="section-label translate-y-4 text-accent-blue opacity-0 transition-all duration-400 group-hover:translate-y-0 group-hover:opacity-100">
            OPEN EXPERIMENT ↗
          </span>
        </div>
      </div>
    </article>
  );
}
