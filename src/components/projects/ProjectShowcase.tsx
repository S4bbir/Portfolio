"use client";

import Image from "next/image";
import Link from "next/link";
import { projects } from "@/config/projects";
import { MagneticButton } from "@/components/ui/MagneticButton";

export function ProjectShowcase() {
  return (
    <section
      id="projects"
      className="relative px-6 py-32 md:px-16 lg:px-24"
      aria-labelledby="projects-heading"
    >
      <div className="mx-auto max-w-6xl">
        <p className="section-label mb-4" data-reveal>
          02 / PROJECTS
        </p>
        <h2
          id="projects-heading"
          className="font-display mb-4 text-4xl md:text-6xl"
          data-chars
        >
          {"SELECTED WORK".split("").map((char, i) => (
            <span key={i} className="inline-block overflow-hidden">
              <span className="char inline-block">{char === " " ? "\u00A0" : char}</span>
            </span>
          ))}
        </h2>
        <p className="mb-20 max-w-xl text-text-secondary" data-reveal>
          A collection of things I&apos;ve designed, engineered, experimented with, and shipped.
        </p>

        <div className="space-y-32">
          {projects.map((project) => (
            <article key={project.slug} className="group" data-cursor="view">
              <div className="mb-6 flex items-baseline gap-4" data-reveal>
                <span className="section-label text-accent-blue">{project.id}</span>
                <div>
                  <h3 className="font-display text-3xl md:text-5xl">{project.title}</h3>
                  <p className="section-label mt-1 text-text-muted">{project.category}</p>
                </div>
              </div>

              <Link
                href={`/projects/${project.slug}`}
                className="interactive relative block overflow-hidden rounded-sm"
                data-cursor="view"
                data-clip
              >
                <div
                  className="aspect-[16/9] overflow-hidden"
                  style={{ boxShadow: `0 0 60px ${project.color}15` }}
                >
                  <Image
                    src={project.image}
                    alt={`${project.title} preview`}
                    width={1200}
                    height={675}
                    data-parallax
                    className="h-[120%] w-full object-cover transition-all duration-700 group-hover:brightness-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/80 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                </div>
              </Link>

              <div className="mt-6 flex flex-wrap items-center justify-between gap-4" data-reveal>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="section-label rounded-full border border-white/5 px-3 py-1 text-text-muted"
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
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
