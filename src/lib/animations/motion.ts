"use client";

import { gsap, registerGSAP, ScrollTrigger } from "@/lib/animations/gsap";

type MotionHandle = { revert: () => void };

export function initPageMotion(root: HTMLElement, reduced: boolean): MotionHandle {
  registerGSAP();
  let observer: IntersectionObserver | null = null;

  const ctx = gsap.context(() => {
    if (reduced) {
      gsap.set(
        "[data-reveal], [data-clip], [data-chars] .char, [data-mask], [data-line], [data-scale], [data-stagger] > *",
        { clearProps: "all", opacity: 1, y: 0, scale: 1, clipPath: "none" }
      );
      return;
    }

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement & { __toVars?: gsap.TweenVars };
          if (el.dataset.played === "1") return;
          el.dataset.played = "1";
          observer?.unobserve(el);

          if (el.dataset.staggerGroup === "1") {
            gsap.to(el.children, {
              y: 0,
              opacity: 1,
              duration: 0.85,
              stagger: 0.1,
              ease: "power3.out",
              overwrite: "auto",
            });
            return;
          }

          if ("chars" in el.dataset) {
            gsap.to(el.querySelectorAll(".char"), {
              y: "0%",
              opacity: 1,
              rotateX: 0,
              duration: 0.9,
              stagger: 0.028,
              ease: "power4.out",
              overwrite: "auto",
            });
            return;
          }

          gsap.to(el, {
            ...(el.__toVars ?? { y: 0, opacity: 1, duration: 1, ease: "power4.out" }),
            overwrite: "auto",
          });
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -6% 0px" }
    );

    root.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
      const delay = Number(el.dataset.delay ?? 0);
      const toVars: gsap.TweenVars = {
        y: 0,
        opacity: 1,
        rotateX: 0,
        duration: 1.05,
        delay,
        ease: "power4.out",
      };
      gsap.set(el, { y: 56, opacity: 0, rotateX: 8 });
      (el as HTMLElement & { __toVars?: gsap.TweenVars }).__toVars = toVars;
      observer?.observe(el);
    });

    root.querySelectorAll<HTMLElement>("[data-mask]").forEach((el) => {
      gsap.set(el, { clipPath: "inset(100% 0% 0% 0%)", y: 24 });
      (el as HTMLElement & { __toVars?: gsap.TweenVars }).__toVars = {
        clipPath: "inset(0% 0% 0% 0%)",
        y: 0,
        duration: 1.15,
        ease: "power4.out",
      };
      observer?.observe(el);
    });

    root.querySelectorAll<HTMLElement>("[data-clip]").forEach((el) => {
      gsap.set(el, { clipPath: "inset(18% 14% 18% 14%)", scale: 1.08 });
      (el as HTMLElement & { __toVars?: gsap.TweenVars }).__toVars = {
        clipPath: "inset(0% 0% 0% 0%)",
        scale: 1,
        duration: 1.35,
        ease: "power4.out",
      };
      observer?.observe(el);
    });

    root.querySelectorAll<HTMLElement>("[data-scale]").forEach((el) => {
      gsap.set(el, { scale: 0.92, opacity: 0 });
      (el as HTMLElement & { __toVars?: gsap.TweenVars }).__toVars = {
        scale: 1,
        opacity: 1,
        duration: 0.9,
        ease: "power3.out",
      };
      observer?.observe(el);
    });

    root.querySelectorAll<HTMLElement>("[data-chars]").forEach((el) => {
      gsap.set(el.querySelectorAll(".char"), { y: "115%", opacity: 0, rotateX: 40 });
      observer?.observe(el);
    });

    root.querySelectorAll<HTMLElement>("[data-stagger]").forEach((group) => {
      gsap.set(group.children, { y: 40, opacity: 0 });
      group.dataset.staggerGroup = "1";
      observer?.observe(group);
    });

    root.querySelectorAll<HTMLElement>("[data-line]").forEach((el) => {
      gsap.fromTo(
        el,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: el.parentElement ?? el,
            start: "top 75%",
            end: "bottom 35%",
            scrub: 0.6,
          },
        }
      );
    });

    root.querySelectorAll<HTMLElement>("[data-parallax]").forEach((el) => {
      const parent = el.parentElement;
      if (!parent) return;
      gsap.fromTo(
        el,
        { yPercent: -10 },
        {
          yPercent: 12,
          ease: "none",
          scrollTrigger: {
            trigger: parent,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.9,
          },
        }
      );
    });

    ScrollTrigger.refresh();
  }, root);

  return {
    revert() {
      observer?.disconnect();
      observer = null;
      ctx.revert();
    },
  };
}
