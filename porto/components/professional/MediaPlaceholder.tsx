"use client";

import { useState } from "react";

type MediaPlaceholderProps = {
  /** Expected public path, e.g. /projects/shelter/cover.jpg */
  src: string;
  label: string;
  hint?: string;
  className?: string;
  aspect?: "video" | "square" | "portrait";
  /** No fill behind the image (useful for cutout portraits) */
  noBackground?: boolean;
};

/**
 * Shows project/about media when the file exists; otherwise a labeled placeholder.
 * Replace files under public/ — no code change needed once cover.jpg is added.
 */
export default function MediaPlaceholder({
  src,
  label,
  hint,
  className = "",
  aspect = "video",
  noBackground = false,
}: MediaPlaceholderProps) {
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const aspectClass =
    aspect === "square"
      ? "aspect-square"
      : aspect === "portrait"
        ? "aspect-[3/4]"
        : "aspect-video";

  const showPlaceholder = failed || !loaded;

  return (
    <div
      className={[
        "relative overflow-hidden",
        noBackground ? "bg-transparent" : "bg-[#121018]",
        aspectClass,
        className,
      ].join(" ")}
    >
      {!failed && (
        // Native img: optional files under public/ — Next Image needs known files
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={label}
          className={[
            "absolute inset-0 h-full w-full object-cover transition-opacity duration-500",
            loaded ? "opacity-100" : "opacity-0",
            noBackground ? "object-contain" : "object-cover",
          ].join(" ")}
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
        />
      )}

      {showPlaceholder && (
        <div
          className={[
            "absolute inset-0 flex flex-col items-center justify-center gap-2 px-4 text-center",
            noBackground
              ? "border border-dashed border-white/15 bg-transparent"
              : "bg-[linear-gradient(145deg,#14101c_0%,#1a1228_50%,#0e0c14_100%)]",
          ].join(" ")}
          aria-hidden={loaded && !failed}
        >
          <p className="font-display text-xs font-semibold tracking-[0.2em] text-fuchsia-300/80 uppercase sm:text-sm">
            {label}
          </p>
          <p className="max-w-[16rem] font-mono text-[9px] leading-relaxed text-white/35 sm:text-[10px]">
            {hint ?? src}
          </p>
        </div>
      )}
    </div>
  );
}
