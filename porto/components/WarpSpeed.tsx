"use client";

import { useEffect, useRef } from "react";

type Star = {
  x: number;
  y: number;
  z: number;
  pz: number;
  hue: number;
};

type WarpSpeedProps = {
  className?: string;
  /** 1 = cruise, higher = faster warp */
  speed?: number;
  starCount?: number;
};

/**
 * POV light-speed warp — radial streaks from vanishing point.
 * Purple arcade palette (not blue sci-fi).
 */
export default function WarpSpeed({
  className = "",
  speed = 1.15,
  starCount = 520,
}: WarpSpeedProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const speedRef = useRef(speed);

  useEffect(() => {
    speedRef.current = speed;
  }, [speed]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let raf = 0;
    let running = true;
    const stars: Star[] = [];
    let w = 0;
    let h = 0;
    let cx = 0;
    let cy = 0;

    const resetStar = (s: Star, randomZ = true) => {
      // Spawn in a disk around center, depth along z
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * Math.max(w, h) * 0.55;
      s.x = Math.cos(angle) * radius;
      s.y = Math.sin(angle) * radius;
      s.z = randomZ ? Math.random() * w : w;
      s.pz = s.z;
      // purple / magenta / soft pink accents
      const roll = Math.random();
      s.hue = roll < 0.55 ? 292 : roll < 0.85 ? 310 : 270;
    };

    const resize = () => {
      const parent = canvas.parentElement;
      const rect = parent?.getBoundingClientRect();
      w = Math.max(1, Math.floor(rect?.width ?? window.innerWidth));
      h = Math.max(1, Math.floor(rect?.height ?? window.innerHeight));
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cx = w / 2;
      cy = h / 2;

      if (stars.length === 0) {
        for (let i = 0; i < starCount; i++) {
          const s: Star = { x: 0, y: 0, z: 0, pz: 0, hue: 292 };
          resetStar(s, true);
          stars.push(s);
        }
      }
    };

    const draw = () => {
      if (!running) return;

      // Deep space / CRT black
      ctx.fillStyle = "#05010a";
      ctx.fillRect(0, 0, w, h);

      // Soft center glow (vanishing point heat)
      const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.min(w, h) * 0.35);
      glow.addColorStop(0, "rgba(199, 85, 247, 0.12)");
      glow.addColorStop(0.45, "rgba(126, 34, 206, 0.04)");
      glow.addColorStop(1, "rgba(5, 1, 10, 0)");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, w, h);

      const spd = speedRef.current;

      for (const s of stars) {
        s.pz = s.z;
        s.z -= 18 * spd + s.z * 0.02 * spd;

        if (s.z < 1) {
          resetStar(s, false);
          continue;
        }

        const k = 128 / s.z;
        const sx = cx + s.x * k;
        const sy = cy + s.y * k;

        const pk = 128 / s.pz;
        const px = cx + s.x * pk;
        const py = cy + s.y * pk;

        // Cull off-screen
        if (
          (sx < -40 && px < -40) ||
          (sx > w + 40 && px > w + 40) ||
          (sy < -40 && py < -40) ||
          (sy > h + 40 && py > h + 40)
        ) {
          continue;
        }

        const trail = Math.hypot(sx - px, sy - py);
        const alpha = Math.min(1, (1 - s.z / w) * 1.35);
        const lineW = Math.min(2.8, 0.35 + (1 - s.z / w) * 2.2);

        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(sx, sy);
        ctx.strokeStyle = `hsla(${s.hue}, 95%, ${58 + alpha * 28}%, ${0.25 + alpha * 0.75})`;
        ctx.lineWidth = lineW;
        ctx.lineCap = "round";
        ctx.stroke();

        // Hot white-pink core on longer streaks
        if (trail > 14) {
          ctx.beginPath();
          ctx.moveTo(px + (sx - px) * 0.55, py + (sy - py) * 0.55);
          ctx.lineTo(sx, sy);
          ctx.strokeStyle = `rgba(255, 240, 255, ${0.35 + alpha * 0.55})`;
          ctx.lineWidth = Math.max(0.6, lineW * 0.35);
          ctx.stroke();
        }
      }

      // Subtle scanline for arcade CRT feel
      ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
      for (let y = 0; y < h; y += 3) {
        ctx.fillRect(0, y, w, 1);
      }

      raf = requestAnimationFrame(draw);
    };

    const ro = new ResizeObserver(resize);
    if (canvas.parentElement) ro.observe(canvas.parentElement);
    resize();
    raf = requestAnimationFrame(draw);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [starCount]);

  return (
    <canvas
      ref={canvasRef}
      className={`block h-full w-full ${className}`}
      aria-hidden
    />
  );
}
