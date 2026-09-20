"use client";

import { gsap, registerGSAP, ScrollTrigger } from "@/lib/animations/gsap";

type MotionHandle = { revert: () => void };

export function initPageMotion(root: HTMLElement, reduced: boolean): MotionHandle {
  registerGSAP();
  let observer: IntersectionObserver | null = null;

  const ctx = gsap.context(() => {
    if (reduced) {
      gsap.set(
        "[data-reveal], [data-clip], [data-chars] .char, [data-mask], [data-line], [data-scale], [data-stagger] > *, [data-word]",
        { clearProps: "all", opacity: 1, y: 0, scale: 1, clipPath: "none", filter: "none" }
      );
      return;
    }

    // ─── IntersectionObserver for one-shot reveals ─────────────────────────
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement & { __toVars?: gsap.TweenVars };
          if (el.dataset.played === "1") return;
          el.dataset.played = "1";
          observer?.unobserve(el);

          // Stagger groups
          if (el.dataset.staggerGroup === "1") {
            gsap.to(Array.from(el.children), {
              y: 0,
              opacity: 1,
              filter: "blur(0px)",
              duration: 0.9,
              stagger: { amount: 0.5, ease: "power2.out" },
              ease: "power3.out",
              overwrite: "auto",
            });
            return;
          }

          // Char-by-char reveals
          if ("chars" in el.dataset) {
            gsap.to(el.querySelectorAll(".char"), {
              y: "0%",
              opacity: 1,
              rotateX: 0,
              filter: "blur(0px)",
              duration: 1.0,
              stagger: 0.025,
              ease: "power4.out",
              overwrite: "auto",
            });
            return;
          }

          // Word-by-word reveals
          if ("word" in el.dataset) {
            const words = el.querySelectorAll(".word-inner");
            gsap.to(words, {
              y: "0%",
              opacity: 1,
              duration: 0.85,
              stagger: 0.06,
              ease: "power3.out",
              overwrite: "auto",
            });
            return;
          }

          // Default reveal
          gsap.to(el, {
            ...(el.__toVars ?? { y: 0, opacity: 1, filter: "blur(0px)", duration: 1, ease: "power4.out" }),
            overwrite: "auto",
          });
        });
      },
      { threshold: 0.06, rootMargin: "0px 0px -4% 0px" }
    );

    // ─── [data-reveal] — fade + rise + deblur ─────────────────────────────
    root.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
      const delay = Number(el.dataset.delay ?? 0);
      const toVars: gsap.TweenVars = {
        y: 0, opacity: 1, rotateX: 0, filter: "blur(0px)",
        duration: 1.05, delay, ease: "power4.out",
      };
      gsap.set(el, { y: 48, opacity: 0, rotateX: 6, filter: "blur(4px)", transformOrigin: "bottom" });
      (el as HTMLElement & { __toVars?: gsap.TweenVars }).__toVars = toVars;
      observer?.observe(el);
    });

    // ─── [data-mask] — clip-path wipe up ──────────────────────────────────
    root.querySelectorAll<HTMLElement>("[data-mask]").forEach((el) => {
      gsap.set(el, { clipPath: "inset(100% 0% 0% 0%)", y: 24 });
      (el as HTMLElement & { __toVars?: gsap.TweenVars }).__toVars = {
        clipPath: "inset(0% 0% 0% 0%)", y: 0,
        duration: 1.2, ease: "power4.out",
      };
      observer?.observe(el);
    });

    // ─── [data-clip] — iris-open reveal for images ────────────────────────
    root.querySelectorAll<HTMLElement>("[data-clip]").forEach((el) => {
      gsap.set(el, { clipPath: "inset(20% 14% 20% 14%)", scale: 1.1 });
      (el as HTMLElement & { __toVars?: gsap.TweenVars }).__toVars = {
        clipPath: "inset(0% 0% 0% 0%)", scale: 1,
        duration: 1.4, ease: "power4.out",
      };
      observer?.observe(el);
    });

    // ─── [data-scale] — scale + fade ──────────────────────────────────────
    root.querySelectorAll<HTMLElement>("[data-scale]").forEach((el) => {
      gsap.set(el, { scale: 0.88, opacity: 0, filter: "blur(8px)" });
      (el as HTMLElement & { __toVars?: gsap.TweenVars }).__toVars = {
        scale: 1, opacity: 1, filter: "blur(0px)",
        duration: 0.95, ease: "power3.out",
      };
      observer?.observe(el);
    });

    // ─── [data-chars] — init chars hidden ─────────────────────────────────
    root.querySelectorAll<HTMLElement>("[data-chars]").forEach((el) => {
      gsap.set(el.querySelectorAll(".char"), {
        y: "110%", opacity: 0, rotateX: 45, filter: "blur(6px)",
      });
      observer?.observe(el);
    });

    // ─── [data-word] — word-by-word split reveal ───────────────────────────
    root.querySelectorAll<HTMLElement>("[data-word]").forEach((el) => {
      gsap.set(el.querySelectorAll(".word-inner"), { y: "100%", opacity: 0 });
      observer?.observe(el);
    });

    // ─── [data-stagger] — stagger children ────────────────────────────────
    root.querySelectorAll<HTMLElement>("[data-stagger]").forEach((group) => {
      gsap.set(Array.from(group.children), { y: 44, opacity: 0, filter: "blur(4px)" });
      group.dataset.staggerGroup = "1";
      observer?.observe(group);
    });

    // ─── [data-line] — scroll-scrubbed line draw ──────────────────────────
    root.querySelectorAll<HTMLElement>("[data-line]").forEach((el) => {
      gsap.fromTo(
        el,
        { scaleY: 0, opacity: 0 },
        {
          scaleY: 1, opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: el.parentElement ?? el,
            start: "top 80%",
            end: "bottom 30%",
            scrub: 0.8,
          },
        }
      );
    });

    // ─── [data-parallax] — image parallax ────────────────────────────────
    root.querySelectorAll<HTMLElement>("[data-parallax]").forEach((el) => {
      const parent = el.parentElement;
      if (!parent) return;
      gsap.fromTo(
        el,
        { yPercent: -10 },
        {
          yPercent: 14,
          ease: "none",
          scrollTrigger: {
            trigger: parent,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.1,
          },
        }
      );
    });

    // ─── [data-skew] — horizontal skew on scroll ──────────────────────────
    root.querySelectorAll<HTMLElement>("[data-skew]").forEach((el) => {
      let lastScrollY = window.scrollY;
      let velocity = 0;
      const tick = () => {
        const current = window.scrollY;
        velocity += (current - lastScrollY - velocity) * 0.2;
        lastScrollY = current;
        gsap.set(el, { skewX: -velocity * 0.04 });
        requestAnimationFrame(tick);
      };
      tick();
    });

    // ─── [data-counter] — animated number counter ─────────────────────────
    root.querySelectorAll<HTMLElement>("[data-counter]").forEach((el) => {
      const target = Number(el.dataset.counter ?? 0);
      const obj = { val: 0 };
      ScrollTrigger.create({
        trigger: el,
        start: "top 85%",
        once: true,
        onEnter: () => {
          gsap.to(obj, {
            val: target, duration: 1.8, ease: "power2.out",
            onUpdate: () => { el.textContent = Math.round(obj.val).toString(); },
          });
        },
      });
    });

    // ─── [data-section] — full section entrance ───────────────────────────
    root.querySelectorAll<HTMLElement>("[data-section-enter]").forEach((el) => {
      ScrollTrigger.create({
        trigger: el,
        start: "top 88%",
        once: true,
        onEnter: () => {
          const label = el.querySelector("[data-section-label]");
          const heading = el.querySelector("[data-section-heading]");
          if (label) gsap.fromTo(label, { x: -24, opacity: 0 }, { x: 0, opacity: 1, duration: 0.7, ease: "power3.out" });
          if (heading) gsap.fromTo(heading.querySelectorAll(".char"),
            { y: "110%", opacity: 0 },
            { y: "0%", opacity: 1, duration: 1, stagger: 0.02, ease: "power4.out", delay: 0.15 }
          );
        },
      });
    });

    // ─── Horizontal marquee velocity effect ───────────────────────────────
    const marquees = root.querySelectorAll<HTMLElement>("[data-marquee]");
    marquees.forEach((track) => {
      let lastScrollY = window.scrollY;
      let velocity = 0;
      let normalSpeed = parseFloat(track.dataset.speed ?? "1");
      let currentSpeed = normalSpeed;

      const ticker = () => {
        const scrollY = window.scrollY;
        velocity = scrollY - lastScrollY;
        lastScrollY = scrollY;
        currentSpeed += (normalSpeed + Math.abs(velocity) * 0.4 - currentSpeed) * 0.12;
        gsap.set(track, { "--marquee-speed": `${currentSpeed}` });
      };
      gsap.ticker.add(ticker);
    });

    // ─── Project cards — cinematic hover prepare ──────────────────────────
    root.querySelectorAll<HTMLElement>(".project-article").forEach((article) => {
      const img = article.querySelector<HTMLElement>(".project-img-inner");
      const overlay = article.querySelector<HTMLElement>(".project-hover-overlay");
      const num = article.querySelector<HTMLElement>(".project-num");

      article.addEventListener("mouseenter", () => {
        if (img) gsap.to(img, { scale: 1.05, duration: 0.7, ease: "power2.out" });
        if (overlay) gsap.to(overlay, { opacity: 1, duration: 0.5, ease: "power2.out" });
        if (num) gsap.to(num, { color: "#4D7CFF", x: 4, duration: 0.4, ease: "power2.out" });
      });

      article.addEventListener("mouseleave", () => {
        if (img) gsap.to(img, { scale: 1, duration: 0.7, ease: "power2.out" });
        if (overlay) gsap.to(overlay, { opacity: 0, duration: 0.5, ease: "power2.out" });
        if (num) gsap.to(num, { color: "#666670", x: 0, duration: 0.4, ease: "power2.out" });
      });
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
