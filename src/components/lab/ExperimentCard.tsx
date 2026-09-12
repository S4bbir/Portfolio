"use client";

import { useRef } from "react";
import { cn } from "@/lib/utils/cn";
import type { Experiment } from "@/types";

interface ExperimentCardProps {
  experiment: Experiment;
}

export function ExperimentCard({ experiment }: ExperimentCardProps) {
  const ref = useRef<HTMLElement>(null);

  const onMove = (e: React.MouseEvent<HTMLElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(800px) rotateX(${y * -8}deg) rotateY(${x * 10}deg) scale(1.02)`;
  };

  const onLeave = () => {
    if (!ref.current) return;
    ref.current.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)";
  };

  return (
    <article
      ref={ref}
      className="experiment-card group relative aspect-[4/3] overflow-hidden rounded-sm border border-white/5"
      data-cursor="view"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-br transition-all duration-700 group-hover:scale-110",
          experiment.gradient
        )}
      />
      <div className="absolute inset-0 bg-bg-primary/40 transition-opacity duration-500 group-hover:opacity-20" />
      <div className="pointer-events-none absolute -left-1/2 top-0 h-full w-1/3 bg-white/10 opacity-0 blur-2xl transition-all duration-700 group-hover:left-1/2 group-hover:opacity-40" />

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
