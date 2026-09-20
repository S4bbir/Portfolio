"use client";

import { useRef } from "react";
import { cn } from "@/lib/utils/cn";
import type { Experiment } from "@/types";

interface ExperimentCardProps {
  experiment: Experiment;
}

export function ExperimentCard({ experiment }: ExperimentCardProps) {
  const ref = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent<HTMLElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const rx = (y - 0.5) * -10;
    const ry = (x - 0.5) * 12;
    el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.025)`;

    // Spotlight follow
    if (glowRef.current) {
      glowRef.current.style.left = `${x * 100}%`;
      glowRef.current.style.top = `${y * 100}%`;
      glowRef.current.style.opacity = "1";
    }
  };

  const onLeave = () => {
    if (!ref.current) return;
    ref.current.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)";
    if (glowRef.current) glowRef.current.style.opacity = "0";
  };

  return (
    <article
      ref={ref}
      className="experiment-card group relative aspect-[4/3] cursor-none overflow-hidden rounded-sm border border-white/[0.06] bg-bg-surface/50"
      data-cursor="view"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {/* Background gradient */}
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-br opacity-60 transition-opacity duration-700 group-hover:opacity-90",
          experiment.gradient
        )}
      />

      {/* Spotlight follow glow */}
      <div
        ref={glowRef}
        className="pointer-events-none absolute h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/10 blur-2xl opacity-0 transition-opacity duration-300"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-bg-primary/30 transition-opacity duration-700 group-hover:opacity-10" />

      {/* Shimmer sweep */}
      <div className="pointer-events-none absolute -left-full top-0 h-full w-1/2 bg-gradient-to-r from-transparent via-white/8 to-transparent opacity-0 blur-sm transition-all duration-1000 group-hover:left-[120%] group-hover:opacity-100" />

      {/* Grid lines */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-30"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Content */}
      <div className="relative flex h-full flex-col justify-between p-6">
        <div>
          <span className="section-label text-text-muted">{experiment.id}</span>
          <h3 className="mt-3 font-display text-2xl text-text-primary transition-colors duration-300 group-hover:text-white">
            {experiment.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-text-secondary opacity-0 transition-all duration-500 group-hover:opacity-100">
            {experiment.description}
          </p>
        </div>

        <div className="flex items-end justify-between">
          <div className="flex flex-wrap gap-2">
            {experiment.tags.map((tag) => (
              <span
                key={tag}
                className="section-label rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-text-muted transition-colors duration-300 group-hover:border-white/20 group-hover:text-text-secondary"
              >
                {tag}
              </span>
            ))}
          </div>
          <span className="section-label translate-y-4 text-accent-blue opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
            OPEN ↗
          </span>
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-[1.5px] origin-left scale-x-0 bg-gradient-to-r from-accent-blue to-accent-violet transition-transform duration-700 group-hover:scale-x-100" />
    </article>
  );
}
