"use client";

import { useRef, type ReactNode, type MouseEvent } from "react";
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
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null);
  const reducedMotion = useReducedMotion();

  const handleMove = (e: MouseEvent) => {
    if (reducedMotion || !ref.current) return;
    registerGSAP();
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(ref.current, { x: x * 0.2, y: y * 0.2, duration: 0.3, ease: "power2.out" });
  };

  const handleLeave = () => {
    if (!ref.current) return;
    gsap.to(ref.current, { x: 0, y: 0, duration: 0.5, ease: "power3.out" });
  };

  const handleClick = () => {
    if (!ref.current) return;
    gsap.to(ref.current, {
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
      ref={ref}
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
