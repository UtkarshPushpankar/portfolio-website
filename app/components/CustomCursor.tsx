"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const INTERACTIVE_SELECTOR = [
  "a[href]",
  "button",
  "[role='button']",
  "summary",
  ".project-card",
  ".dock-item",
  ".deans-step-card",
  ".deans-nav-btn",
  "[data-cursor='hand']",
].join(", ");

type CursorVariant = "default" | "hand";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);
  const currentRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [variant, setVariant] = useState<CursorVariant>("default");
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const finePointerQuery = window.matchMedia("(pointer: fine)");
    const hoverQuery = window.matchMedia("(hover: hover)");
    const root = document.documentElement;

    const syncEnabled = () => {
      const nextEnabled =
        finePointerQuery.matches || hoverQuery.matches || navigator.maxTouchPoints === 0;

      setEnabled(nextEnabled);
      setVisible(false);
      setPressed(false);

      if (nextEnabled) {
        root.classList.add("has-custom-cursor");
      } else {
        root.classList.remove("has-custom-cursor");
      }
    };

    syncEnabled();
    finePointerQuery.addEventListener("change", syncEnabled);
    hoverQuery.addEventListener("change", syncEnabled);

    return () => {
      finePointerQuery.removeEventListener("change", syncEnabled);
      hoverQuery.removeEventListener("change", syncEnabled);
      root.classList.remove("has-custom-cursor");
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const updateVariant = (target: EventTarget | null) => {
      if (!(target instanceof Element)) {
        setVariant("default");
        return;
      }

      setVariant(target.closest(INTERACTIVE_SELECTOR) ? "hand" : "default");
    };

    const onPointerMove = (event: PointerEvent) => {
      targetRef.current.x = event.clientX;
      targetRef.current.y = event.clientY;
      updateVariant(event.target);
      setVisible(true);
    };

    const onPointerDown = () => setPressed(true);
    const onPointerUp = () => setPressed(false);
    const onPointerLeave = () => {
      setVisible(false);
      setPressed(false);
    };

    const tick = () => {
      const cursor = cursorRef.current;

      if (cursor) {
        currentRef.current.x += (targetRef.current.x - currentRef.current.x) * 0.24;
        currentRef.current.y += (targetRef.current.y - currentRef.current.y) * 0.24;

        const offsetX = variant === "hand" ? -10 : -2;
        const offsetY = variant === "hand" ? -8 : -2;

        cursor.style.transform = `translate3d(${currentRef.current.x + offsetX}px, ${currentRef.current.y + offsetY}px, 0) scale(${pressed ? 0.92 : 1})`;
      }

      frameRef.current = window.requestAnimationFrame(tick);
    };

    frameRef.current = window.requestAnimationFrame(tick);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("blur", onPointerLeave);
    document.addEventListener("mouseleave", onPointerLeave);

    return () => {
      if (frameRef.current) {
        window.cancelAnimationFrame(frameRef.current);
      }

      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("blur", onPointerLeave);
      document.removeEventListener("mouseleave", onPointerLeave);
    };
  }, [enabled, pressed, variant]);

  if (!enabled) return null;

  return (
    <div
      ref={cursorRef}
      className={`custom-cursor ${visible ? "is-visible" : ""} ${variant === "hand" ? "is-hand" : "is-arrow"}`}
      aria-hidden="true"
    >
      {variant === "hand" ? (
        <Image src="/cursor-hand.svg" alt="" width={40} height={40} priority />
      ) : (
        <Image src="/cursor-arrow.svg" alt="" width={36} height={36} priority />
      )}
    </div>
  );
}
