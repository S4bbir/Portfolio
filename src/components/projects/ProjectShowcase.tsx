"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap, registerGSAP } from "@/lib/animations/gsap";
import { projects } from "@/config/projects";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { MagneticButton } from "@/components/ui/MagneticButton";

export function ProjectShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || !sectionRef.current) return;

    registerGSAP();
    const items = sectionRef.current.querySelectorAll(".project-item");

    items.forEach((item) => {
      gsap.fromTo(
        item,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });
  }, [reducedMotion]);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative px-6 py-32 md:px-16 lg:px-24"
      aria-labelledby="projects-heading"
    >
      <div className="mx-auto max-w-6xl">
        <p className="section-label mb-4">02 / PROJECTS</p>
        <h2 id="projects-heading" className="font-display mb-4 text-4xl md:text-6xl">
          SELECTED WORK
        </h2>
        <p className="mb-20 max-w-xl text-text-secondary">
          A collection of things I&apos;ve designed, engineered, experimented with, and shipped.
        </p>

        <div className="space-y-32">
          {projects.map((project) => (
            <article
              key={project.slug}
              className="project-item group"
              data-cursor="view"
            >
              <div className="mb-6 flex items-baseline gap-4">
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
              >
                <div
                  className="aspect-[16/9] overflow-hidden transition-transform duration-500 group-hover:scale-[1.02]"
                  style={{ boxShadow: `0 0 60px ${project.color}15` }}
                >
                  <Image
                    src={project.image}
                    alt={`${project.title} preview`}
                    width={1200}
                    height={675}
                    className="h-full w-full object-cover transition-all duration-500 group-hover:brightness-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/80 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                </div>
              </Link>

              <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
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
