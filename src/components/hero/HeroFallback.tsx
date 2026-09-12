"use client";

import { projects } from "@/config/projects";
import Image from "next/image";

export function HeroFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="hero-glow absolute inset-0" />
      <div className="relative grid grid-cols-2 gap-4 p-8 opacity-60 md:grid-cols-4">
        {projects.map((project) => (
          <div
            key={project.slug}
            className="aspect-[4/3] overflow-hidden rounded-sm border border-white/5"
            style={{ boxShadow: `0 0 30px ${project.color}20` }}
          >
            <Image
              src={project.image}
              alt={project.title}
              width={320}
              height={240}
              className="h-full w-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
