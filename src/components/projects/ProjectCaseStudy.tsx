"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap, registerGSAP, ScrollTrigger } from "@/lib/animations/gsap";
import type { Project } from "@/types";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

interface ProjectCaseStudyProps {
  project: Project;
  nextProject: Project;
}

function splitChars(text: string) {
  return text.split("").map((char, i) => (
    <span key={`${char}-${i}`} className="inline-block overflow-hidden">
      <span className="char inline-block will-change-transform">
        {char === " " ? "\u00A0" : char}
      </span>
    </span>
  ));
}

export function ProjectCaseStudy({ project, nextProject }: ProjectCaseStudyProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useLayoutEffect(() => {
    if (!containerRef.current) return;
    registerGSAP();

    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set(".case-curtain", { yPercent: -100 });
        gsap.set(".case-progress", { scaleX: 0 });
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.fromTo(
        ".case-curtain",
        { yPercent: 0 },
        { yPercent: -100, duration: 0.85, ease: "power4.inOut" }
      )
        .fromTo(
          ".case-hero-media",
          { scale: 1.16 },
          { scale: 1, duration: 1.35, ease: "power3.out" },
          "-=0.5"
        )
        .fromTo(
          ".case-meta",
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.08 },
          "-=1"
        )
        .fromTo(
          ".case-title .char",
          { y: "110%" },
          { y: "0%", duration: 0.9, stagger: 0.03, ease: "power4.out" },
          "-=0.85"
        )
        .fromTo(
          ".case-year",
          { opacity: 0, x: -16 },
          { opacity: 1, x: 0, duration: 0.5 },
          "-=0.5"
        );

      gsap.to(".case-hero-media", {
        yPercent: 18,
        ease: "none",
        scrollTrigger: {
          trigger: ".case-hero",
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
        },
      });

      gsap.to(".case-hero-copy", {
        y: -80,
        opacity: 0.15,
        ease: "none",
        scrollTrigger: {
          trigger: ".case-hero",
          start: "top top",
          end: "bottom top",
          scrub: 0.4,
        },
      });

      gsap.to(".case-progress", {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.3,
        },
      });

      gsap.utils.toArray<HTMLElement>(".case-block").forEach((block) => {
        const line = block.querySelector(".case-line");
        const heading = block.querySelector(".case-heading");
        const body = block.querySelectorAll(".case-body");

        const local = gsap.timeline({
          scrollTrigger: {
            trigger: block,
            start: "top 82%",
            once: true,
          },
        });

        if (line) {
          local.fromTo(
            line,
            { scaleX: 0 },
            { scaleX: 1, duration: 0.7, ease: "power3.out" }
          );
        }
        if (heading) {
          local.fromTo(
            heading,
            { y: 28, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" },
            "-=0.35"
          );
        }
        local.fromTo(
          body,
          { y: 32, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.08, ease: "power3.out" },
          "-=0.4"
        );
      });

      gsap.fromTo(
        ".case-feature",
        { x: -20, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.65,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".case-features",
            start: "top 80%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        ".case-chip",
        { y: 16, opacity: 0, scale: 0.92 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.5,
          stagger: 0.06,
          ease: "back.out(1.4)",
          scrollTrigger: {
            trigger: ".case-tech",
            start: "top 85%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        ".case-visual",
        { clipPath: "inset(20% 12% 20% 12%)", scale: 1.08 },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          scale: 1,
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: ".case-visual",
            start: "top 80%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        ".case-next",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".case-next",
            start: "top 88%",
            once: true,
          },
        }
      );
    }, containerRef);

    const refresh = window.setTimeout(() => ScrollTrigger.refresh(), 150);

    return () => {
      window.clearTimeout(refresh);
      ctx.revert();
    };
  }, [project.slug, reduced]);

  return (
    <div ref={containerRef} className="relative min-h-screen overflow-hidden bg-bg-primary">
      <div
        className="case-progress pointer-events-none fixed top-0 left-0 z-[60] h-[2px] w-full origin-left scale-x-0 bg-gradient-to-r from-accent-blue to-accent-violet"
        aria-hidden="true"
      />

      <div className="case-curtain pointer-events-none fixed inset-0 z-[70] bg-bg-primary" />

      <header className="fixed top-20 z-40 flex w-full items-center justify-between px-6 md:px-16">
        <Link
          href="/#projects"
          className="interactive section-label text-text-muted transition-colors hover:text-text-primary"
          data-cursor="open"
        >
          ← ARCHIVE
        </Link>
        <span className="section-label text-text-muted">{project.id} / 04</span>
      </header>

      <section className="case-hero relative h-[88vh] min-h-[520px] overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="case-hero-media object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-bg-primary/50 to-bg-primary/20" />
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{ boxShadow: `inset 0 0 180px ${project.color}33` }}
        />

        <div className="case-hero-copy absolute inset-x-0 bottom-0 p-6 pb-16 md:p-16">
          <p className="case-meta section-label mb-4 text-accent-blue">{project.category}</p>
          <h1 className="case-title font-display text-5xl leading-[0.95] md:text-8xl">
            {splitChars(project.title)}
          </h1>
          <p className="case-year section-label mt-5 text-text-muted">{project.year}</p>
        </div>
      </section>

      <article className="mx-auto max-w-3xl px-6 py-24 md:px-0">
        <section className="case-block mb-24">
          <div className="case-line mb-6 h-px origin-left bg-white/10" />
          <h2 className="case-heading section-label mb-5">OVERVIEW</h2>
          <p className="case-body text-xl leading-relaxed text-text-secondary md:text-2xl">
            {project.overview}
          </p>
        </section>

        <div className="case-visual relative mb-24 aspect-[16/9] overflow-hidden rounded-sm">
          <Image
            src={project.image}
            alt={`${project.title} frame`}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-bg-primary/40 to-transparent" />
        </div>

        <section className="case-block mb-24">
          <div className="case-line mb-6 h-px origin-left bg-white/10" />
          <h2 className="case-heading section-label mb-5">PROBLEM</h2>
          <p className="case-body leading-relaxed text-text-secondary">{project.problem}</p>
        </section>

        <section className="case-block mb-24">
          <div className="case-line mb-6 h-px origin-left bg-white/10" />
          <h2 className="case-heading section-label mb-5">SOLUTION</h2>
          <p className="case-body leading-relaxed text-text-secondary">{project.solution}</p>
        </section>

        <section className="case-block case-features mb-24">
          <div className="case-line mb-6 h-px origin-left bg-white/10" />
          <h2 className="case-heading section-label mb-8">FEATURES</h2>
          <ul className="space-y-5">
            {project.features.map((feature, i) => (
              <li key={feature} className="case-feature flex items-start gap-4 text-text-secondary">
                <span className="section-label mt-1 text-accent-blue">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-lg">{feature}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="case-block case-tech mb-24">
          <div className="case-line mb-6 h-px origin-left bg-white/10" />
          <h2 className="case-heading section-label mb-8">TECHNOLOGIES</h2>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="case-chip section-label rounded-full border border-white/10 px-4 py-2"
              >
                {tech}
              </span>
            ))}
          </div>
        </section>

        <section className="case-block mb-16">
          <div className="case-line mb-6 h-px origin-left bg-white/10" />
          <h2 className="case-heading section-label mb-5">RESULTS</h2>
          <p className="case-body text-text-secondary">{project.results}</p>
        </section>

        {(project.live && !project.live.startsWith("[")) ||
        (project.github && !project.github.startsWith("[")) ? (
          <div className="flex flex-wrap gap-6 border-t border-white/5 pt-8" data-reveal>
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
        ) : null}
      </article>

      <section className="case-next relative overflow-hidden border-t border-white/5">
        <Link
          href={`/projects/${nextProject.slug}`}
          className="interactive group relative block min-h-[40vh] px-6 py-20 md:px-16"
          data-cursor="view"
        >
          <div className="absolute inset-0 opacity-30 transition-opacity duration-700 group-hover:opacity-50">
            <Image
              src={nextProject.image}
              alt=""
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-bg-primary/70" />
          </div>
          <div className="relative">
            <p className="section-label mb-4">NEXT PROJECT</p>
            <h3 className="font-display text-4xl transition-colors duration-500 group-hover:text-accent-blue md:text-7xl">
              {nextProject.title}
            </h3>
            <p className="section-label mt-4 text-text-muted">{nextProject.category}</p>
          </div>
        </Link>
      </section>
    </div>
  );
}
