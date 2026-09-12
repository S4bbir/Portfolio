"use client";

export function Marquee() {
  const phrase =
    "SABBIR  ·  CREATIVE DEVELOPER  ·  AI  ·  SOFTWARE  ·  DIGITAL EXPERIENCES  ·  ";

  return (
    <div
      className="relative overflow-hidden border-y border-white/5 py-5"
      aria-hidden="true"
    >
      <div className="marquee-track flex w-max">
        {Array.from({ length: 4 }).map((_, i) => (
          <p
            key={i}
            className="section-label px-4 whitespace-nowrap text-text-muted"
          >
            {phrase}
            {phrase}
          </p>
        ))}
      </div>
    </div>
  );
}
