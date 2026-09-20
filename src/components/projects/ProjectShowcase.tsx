"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { projects } from "@/config/projects";
import { MagneticButton } from "@/components/ui/MagneticButton";

function splitChars(text: string) {
  return text.split("").map((char, i) => (
    <span key={`${char}-${i}`} className="inline-block overflow-hidden">
      <span className="char inline-block will-change-transform">
        {char === " " ? "\u00A0" : char}
      </span>
    </span>
  ));
}

export function ProjectShowcase() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative px-6 py-32 md:px-16 lg:px-24"
      aria-labelledby="projects-heading"
    >
      {/* Ambient glow top */}
      <div
        className="pointer-events-none absolute -top-32 left-1/2 h-64 w-96 -translate-x-1/2 rounded-full opacity-20 blur-3xl"
        style={{ background: "radial-gradient(circle, #4D7CFF 0%, transparent 70%)" }}
      />

      <div className="mx-auto max-w-6xl">
        {/* Section header */}
        <div data-section-enter>
          <p className="section-label mb-4" data-section-label data-reveal>
            02 / PROJECTS
          </p>
          <h2
            id="projects-heading"
            className="font-display mb-4 text-4xl md:text-6xl lg:text-7xl"
            data-section-heading
            data-chars
          >
            {splitChars("SELECTED WORK")}
          </h2>
          <p className="mb-24 max-w-xl text-text-secondary" data-reveal data-delay="0.2">
            A collection of things I&apos;ve designed, engineered,
            experimented with, and shipped.
          </p>
        </div>

        {/* Project list */}
        <div className="space-y-40">
          {projects.map((project, idx) => (
            <article
              key={project.slug}
              className="project-article group"
              data-cursor="view"
            >
              {/* Project header row */}
              <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-baseline sm:gap-6" data-reveal>
                <span className="project-num section-label text-text-muted transition-colors duration-300">
                  {project.id}
                </span>
                <div className="flex-1">
                  <h3 className="font-display text-3xl leading-tight md:text-5xl lg:text-6xl" data-chars>
                    {splitChars(project.title)}
                  </h3>
                  <p className="section-label mt-2 text-text-muted">{project.category}</p>
                </div>
                <span className="section-label hidden text-text-muted sm:block">{project.year}</span>
              </div>

              {/* Image */}
              <Link
                href={`/projects/${project.slug}`}
                className="interactive relative block overflow-hidden"
                data-cursor="view"
                data-clip
              >
                <div
                  className="relative aspect-[16/9] overflow-hidden rounded-sm"
                  style={{ boxShadow: `0 0 80px ${project.color}18` }}
                >
                  {/* Inner image with scale on hover */}
                  <div className="project-img-inner h-full w-full transition-transform duration-700">
                    <Image
                      src={project.image}
                      alt={`${project.title} preview`}
                      width={1200}
                      height={675}
                      data-parallax
                      className="h-[115%] w-full object-cover"
                      style={{ marginTop: "-7.5%" }}
                    />
                  </div>

                  {/* Hover overlay gradient */}
                  <div
                    className="project-hover-overlay absolute inset-0 opacity-0"
                    style={{
                      background: `linear-gradient(135deg, ${project.color}22 0%, transparent 60%), linear-gradient(to top, rgba(5,5,5,0.85) 0%, transparent 50%)`,
                    }}
                  />

                  {/* View indicator */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    <div className="flex items-center gap-3 rounded-full border border-white/20 bg-bg-primary/60 px-6 py-3 backdrop-blur-md">
                      <span className="section-label text-text-primary">VIEW CASE STUDY</span>
                      <span className="text-accent-blue">↗</span>
                    </div>
                  </div>

                  {/* Color accent line bottom */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-[2px] origin-left scale-x-0 transition-transform duration-700 group-hover:scale-x-100"
                    style={{ background: `linear-gradient(90deg, ${project.color}, transparent)` }}
                  />
                </div>
              </Link>

              {/* Footer row */}
              <div className="mt-6 flex flex-wrap items-center justify-between gap-4" data-reveal>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="section-label rounded-full border border-white/5 bg-white/[0.02] px-3 py-1 text-text-muted transition-colors duration-300 hover:border-accent-blue/20 hover:text-text-secondary"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <MagneticButton
                  href={`/projects/${project.slug}`}
                  dataCursor="view"
                  className="text-accent-blue"
                >
                  VIEW CASE STUDY ↗
                </MagneticButton>
              </div>

              {/* Separator */}
              {idx < projects.length - 1 && (
                <div className="mt-40 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
