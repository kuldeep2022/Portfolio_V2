"use client";

import { useEffect, useRef, useState } from "react";

export function FxCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const isCoarse = window.matchMedia("(pointer: coarse)").matches;
    if (isCoarse) return;

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;
    let rafId = 0;

    const handleMove = (event: MouseEvent) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
      if (!visible) setVisible(true);
      const dot = dotRef.current;
      if (dot) {
        dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }
    };

    const tick = () => {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      const ring = ringRef.current;
      if (ring) {
        ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }
      rafId = requestAnimationFrame(tick);
    };

    const handleMouseLeave = () => setVisible(false);
    const handleMouseEnter = () => setVisible(true);

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("mouseenter", handleMouseEnter);
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("mouseenter", handleMouseEnter);
      cancelAnimationFrame(rafId);
    };
  }, [visible]);

  useEffect(() => {
    const handleMagnetMove = (event: Event) => {
      const target = event.currentTarget as HTMLElement;
      const rect = target.getBoundingClientRect();
      const mouseEvent = event as MouseEvent;
      const relX = mouseEvent.clientX - rect.left - rect.width / 2;
      const relY = mouseEvent.clientY - rect.top - rect.height / 2;
      target.style.transform = `translate3d(${relX * 0.12}px, ${relY * 0.12}px, 0)`;
    };

    const handleMagnetLeave = (event: Event) => {
      const target = event.currentTarget as HTMLElement;
      target.style.transform = "translate3d(0, 0, 0)";
    };

    const magnets = Array.from(document.querySelectorAll("[data-magnet]"));
    magnets.forEach((el) => {
      el.addEventListener("mousemove", handleMagnetMove);
      el.addEventListener("mouseleave", handleMagnetLeave);
    });

    return () => {
      magnets.forEach((el) => {
        el.removeEventListener("mousemove", handleMagnetMove);
        el.removeEventListener("mouseleave", handleMagnetLeave);
      });
    };
  }, []);

  return (
    <>
      <div
        ref={ringRef}
        className={`fx-cursor-ring ${visible ? "is-visible" : ""}`}
        aria-hidden="true"
      />
      <div
        ref={dotRef}
        className={`fx-cursor-dot ${visible ? "is-visible" : ""}`}
        aria-hidden="true"
      />
    </>
  );
}
