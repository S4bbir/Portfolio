"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap, registerGSAP } from "@/lib/animations/gsap";
import type { Project } from "@/types";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { GrainOverlay } from "@/components/ui/GrainOverlay";

interface ProjectCaseStudyProps {
  project: Project;
  nextProject: Project;
}

export function ProjectCaseStudy({ project, nextProject }: ProjectCaseStudyProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGSAP();
    if (!containerRef.current) return;

    const tl = gsap.timeline();
    tl.fromTo(
      ".case-hero",
      { scale: 1.1, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.8, ease: "power3.out" }
    ).fromTo(
      ".case-content > *",
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power3.out" },
      "-=0.3"
    );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-bg-primary">
      <GrainOverlay />

      <header className="fixed top-0 z-50 w-full px-6 py-6 md:px-16">
        <Link
          href="/#projects"
          className="interactive section-label text-text-muted transition-colors hover:text-text-primary"
          data-cursor="open"
        >
          ← BACK TO PROJECTS
        </Link>
      </header>

      <div className="case-hero relative h-[60vh] min-h-[400px] overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-bg-primary/40 to-transparent" />
        <div className="absolute bottom-0 left-0 p-6 md:p-16">
          <p className="section-label mb-2 text-accent-blue">{project.category}</p>
          <h1 className="font-display text-5xl md:text-7xl">{project.title}</h1>
          <p className="section-label mt-2 text-text-muted">{project.year}</p>
        </div>
      </div>

      <article className="case-content mx-auto max-w-3xl px-6 py-16 md:px-0">
        <section className="mb-16">
          <h2 className="section-label mb-4">OVERVIEW</h2>
          <p className="text-lg leading-relaxed text-text-secondary">{project.overview}</p>
        </section>

        <section className="mb-16">
          <h2 className="section-label mb-4">PROBLEM</h2>
          <p className="leading-relaxed text-text-secondary">{project.problem}</p>
        </section>

        <section className="mb-16">
          <h2 className="section-label mb-4">SOLUTION</h2>
          <p className="leading-relaxed text-text-secondary">{project.solution}</p>
        </section>

        <section className="mb-16">
          <h2 className="section-label mb-4">FEATURES</h2>
          <ul className="space-y-3">
            {project.features.map((feature) => (
              <li key={feature} className="flex items-start gap-3 text-text-secondary">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent-blue" />
                {feature}
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-16">
          <h2 className="section-label mb-4">TECHNOLOGIES</h2>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="section-label rounded-full border border-white/10 px-4 py-2"
              >
                {tech}
              </span>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="section-label mb-4">RESULTS</h2>
          <p className="text-text-secondary">{project.results}</p>
        </section>

        <div className="flex flex-wrap gap-6 border-t border-white/5 pt-8">
          {project.live && !project.live.startsWith("[") && (
            <MagneticButton href={project.live} dataCursor="open">
              LIVE DEMO ↗
            </MagneticButton>
          )}
          {project.github && !project.github.startsWith("[") && (
            <MagneticButton href={project.github} dataCursor="open">
              GITHUB ↗
            </MagneticButton>
          )}
        </div>
      </article>

      <section className="border-t border-white/5 px-6 py-16 md:px-16">
        <p className="section-label mb-4">NEXT PROJECT</p>
        <Link
          href={`/projects/${nextProject.slug}`}
          className="interactive group inline-block"
          data-cursor="view"
        >
          <h3 className="font-display text-3xl transition-colors group-hover:text-accent-blue md:text-5xl">
            {nextProject.title} →
          </h3>
        </Link>
      </section>
    </div>
  );
}
