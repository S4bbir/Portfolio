"use client";

import { useRef, type ReactNode, type MouseEvent } from "react";
import Link from "next/link";
import { gsap, registerGSAP } from "@/lib/animations/gsap";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { cn } from "@/lib/utils/cn";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  dataCursor?: "view" | "open" | "drag";
  ariaLabel?: string;
}

export function MagneticButton({
  children,
  className,
  href,
  onClick,
  dataCursor = "open",
  ariaLabel,
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const reducedMotion = useReducedMotion();

  const handleMove = (e: MouseEvent) => {
    const el = ref.current ?? btnRef.current;
    if (reducedMotion || !el) return;
    registerGSAP();
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(el, { x: x * 0.2, y: y * 0.2, duration: 0.3, ease: "power2.out" });
  };

  const handleLeave = () => {
    const el = ref.current ?? btnRef.current;
    if (!el) return;
    gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: "power3.out" });
  };

  const handleClick = () => {
    const el = ref.current ?? btnRef.current;
    if (!el) return;
    gsap.to(el, {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: "power2.inOut",
    });
    onClick?.();
  };

  const shared = cn(
    "magnetic-btn interactive section-label text-text-secondary hover:text-text-primary",
    className
  );

  if (href) {
    const internal = href.startsWith("/") && !href.startsWith("//");
    if (internal) {
      return (
        <Link
          ref={ref}
          href={href}
          className={shared}
          data-cursor={dataCursor}
          aria-label={ariaLabel}
          onMouseMove={handleMove}
          onMouseLeave={handleLeave}
          onClick={handleClick}
        >
          {children}
        </Link>
      );
    }

    return (
      <a
        ref={ref}
        href={href}
        className={shared}
        data-cursor={dataCursor}
        aria-label={ariaLabel}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        onClick={handleClick}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      ref={btnRef}
      type="button"
      className={shared}
      data-cursor={dataCursor}
      aria-label={ariaLabel}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onClick={handleClick}
    >
      {children}
    </button>
  );
}
