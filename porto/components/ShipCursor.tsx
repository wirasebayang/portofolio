"use client";

import { useEffect, useRef, useState } from "react";
import { ShipSprite, type ShipId } from "@/components/ships";

type ShipCursorProps = {
  shipId: ShipId;
};

/**
 * Replaces the system cursor with the selected retro ship (desktop / fine pointer only).
 */
export default function ShipCursor({ shipId }: ShipCursorProps) {
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const pos = useRef({ x: 0, y: 0 });
  const renderPos = useRef({ x: 0, y: 0 });
  const angle = useRef(0);
  const cursorRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef(0);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const sync = () => setEnabled(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    document.documentElement.classList.add("ship-cursor-active");

    const onMove = (e: PointerEvent) => {
      pos.current.x = e.clientX;
      pos.current.y = e.clientY;
      setVisible(true);
    };
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);

    const tick = () => {
      const el = cursorRef.current;
      const dx = pos.current.x - renderPos.current.x;
      const dy = pos.current.y - renderPos.current.y;
      renderPos.current.x += dx * 0.28;
      renderPos.current.y += dy * 0.28;

      if (Math.abs(dx) + Math.abs(dy) > 0.4) {
        // SVG nose points up (-Y); atan2(dx,-dy) aligns flight direction
        const target = (Math.atan2(dx, -dy) * 180) / Math.PI;
        let diff = target - angle.current;
        while (diff > 180) diff -= 360;
        while (diff < -180) diff += 360;
        angle.current += diff * 0.18;
      }

      if (el) {
        el.style.transform = `translate3d(${renderPos.current.x}px, ${renderPos.current.y}px, 0) translate(-50%, -50%) rotate(${angle.current}deg)`;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      document.documentElement.classList.remove("ship-cursor-active");
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
      cancelAnimationFrame(rafRef.current);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={cursorRef}
      className={[
        "pointer-events-none fixed top-0 left-0 z-[9999]",
        "drop-shadow-[0_0_10px_rgba(199,85,247,0.75)]",
        visible ? "opacity-100" : "opacity-0",
        "transition-opacity duration-150",
      ].join(" ")}
      aria-hidden
    >
      <ShipSprite id={shipId} className="h-8 w-8 sm:h-9 sm:w-9" />
    </div>
  );
}
