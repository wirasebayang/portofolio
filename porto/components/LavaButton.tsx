"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";

type LavaButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
};

/**
 * Purple lava CTA — CSS gooey blobs (no WebGL).
 * Readable label sits above a dark glass plate; lava flows behind/around it.
 */
export default function LavaButton({
  children,
  className = "",
  ...props
}: LavaButtonProps) {
  return (
    <button
      type="button"
      className={[
        "lava-btn group relative isolate overflow-hidden rounded-lg",
        "px-11 py-5 sm:px-14 sm:py-5",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-fuchsia-300",
        className,
      ].join(" ")}
      {...props}
    >
      {/* Molten field */}
      <span className="lava-btn__field pointer-events-none absolute inset-0" aria-hidden>
        <span className="lava-btn__blob lava-btn__blob--a" />
        <span className="lava-btn__blob lava-btn__blob--b" />
        <span className="lava-btn__blob lava-btn__blob--c" />
        <span className="lava-btn__blob lava-btn__blob--d" />
      </span>

      {/* Heat glow rim */}
      <span
        className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-fuchsia-300/40"
        aria-hidden
      />

      {/* Dark plate so text stays crisp */}
      <span
        className="pointer-events-none absolute inset-[3px] rounded-md bg-black/45 backdrop-blur-[1px]"
        aria-hidden
      />

      <span className="relative z-10 font-arcade text-[9px] uppercase leading-none tracking-wide text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)] sm:text-[10px]">
        {children}
      </span>
    </button>
  );
}
