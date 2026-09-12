"use client";

import { SkillOrbit } from "./SkillOrbit";

export function Skills() {
  return (
    <section
      id="stack"
      className="relative min-h-screen px-6 py-32 md:px-16 lg:px-24"
      aria-labelledby="skills-heading"
    >
      <div className="mx-auto max-w-6xl">
        <p className="section-label mb-4" data-reveal>
          04 / STACK
        </p>
        <h2
          id="skills-heading"
          className="font-display mb-16 text-4xl md:text-6xl"
          data-chars
        >
          {"TOOLS I BUILD WITH".split("").map((char, i) => (
            <span key={i} className="inline-block overflow-hidden">
              <span className="char inline-block">{char === " " ? "\u00A0" : char}</span>
            </span>
          ))}
        </h2>
        <div data-reveal>
          <SkillOrbit />
        </div>
      </div>
    </section>
  );
}
