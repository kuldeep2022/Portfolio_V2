"use client";

import { useEffect, useRef } from "react";

export function FxCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Skip on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;
    let rafId = 0;
    let isVisible = false;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const show = () => {
      if (!isVisible) {
        isVisible = true;
        dot.classList.add("is-visible");
        ring.classList.add("is-visible");
      }
    };

    const hide = () => {
      if (isVisible) {
        isVisible = false;
        dot.classList.remove("is-visible");
        ring.classList.remove("is-visible");
      }
    };

    const handleMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      show();
      // Dot follows instantly via transform
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
    };

    // Ring follows with lerp — single RAF loop
    const tick = () => {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    window.addEventListener("mouseleave", hide, { passive: true });
    window.addEventListener("mouseenter", show, { passive: true });
    rafId = requestAnimationFrame(tick);

    // Magnet effect — use MutationObserver-free approach with event delegation
    const handleMagnetMove = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("[data-magnet]") as HTMLElement | null;
      if (!target) return;
      const rect = target.getBoundingClientRect();
      const relX = e.clientX - rect.left - rect.width / 2;
      const relY = e.clientY - rect.top - rect.height / 2;
      target.style.transform = `translate3d(${relX * 0.12}px, ${relY * 0.12}px, 0)`;
    };

    const handleMagnetLeave = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("[data-magnet]") as HTMLElement | null;
      if (target) target.style.transform = "translate3d(0, 0, 0)";
    };

    document.addEventListener("mouseover", handleMagnetMove, { passive: true });
    document.addEventListener("mouseout", handleMagnetLeave, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseleave", hide);
      window.removeEventListener("mouseenter", show);
      document.removeEventListener("mouseover", handleMagnetMove);
      document.removeEventListener("mouseout", handleMagnetLeave);
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className="fx-cursor-ring" aria-hidden="true" />
      <div ref={dotRef} className="fx-cursor-dot" aria-hidden="true" />
    </>
  );
}
