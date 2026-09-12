"use client";

import { SkillOrbit } from "./SkillOrbit";
import { SplitText } from "@/components/ui/SplitText";

export function Skills() {
  return (
    <section
      id="stack"
      className="relative min-h-screen px-6 py-32 md:px-16 lg:px-24"
      aria-labelledby="skills-heading"
    >
      <div className="mx-auto max-w-6xl">
        <p className="section-label mb-4">04 / STACK</p>
        <SplitText
          text="TOOLS I BUILD WITH"
          as="h2"
          className="font-display mb-16 text-4xl md:text-6xl"
        />
        <SkillOrbit />
      </div>
    </section>
  );
}
