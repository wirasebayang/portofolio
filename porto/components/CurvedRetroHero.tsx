"use client";

import { useId, useLayoutEffect, useRef, useState, type RefObject } from "react";

type CurvedRetroHeroProps = {
  text?: string;
};

const DEPTH = [
  { x: 7, y: 7, fill: "#3b0764" },
  { x: 6, y: 6, fill: "#4c1d95" },
  { x: 5, y: 5, fill: "#6b21a8" },
  { x: 4, y: 4, fill: "#86198f" },
  { x: 3, y: 3, fill: "#a21caf" },
  { x: 2, y: 2, fill: "#c026d3" },
  { x: 1, y: 1, fill: "#e879f9" },
];

const MAX_FONT = 96;
const MIN_FONT = 32;

/** Symmetric arc — nearly edge-to-edge for max glyph size. */
const PATH_D = "M 16 115 Q 600 22 1184 115";

function useFitFont(
  text: string,
  pathRef: RefObject<SVGPathElement | null>,
  measureRef: RefObject<SVGTextElement | null>,
) {
  const [fontSize, setFontSize] = useState(44);

  useLayoutEffect(() => {
    let cancelled = false;

    const fit = () => {
      const path = pathRef.current;
      const measure = measureRef.current;
      if (!path || !measure) return;

      const maxLen = path.getTotalLength() * 0.96;
      let lo = MIN_FONT;
      let hi = MAX_FONT;
      let best = MIN_FONT;

      for (let i = 0; i < 20; i++) {
        const mid = (lo + hi) / 2;
        measure.setAttribute("font-size", String(mid));
        if (measure.getComputedTextLength() <= maxLen) {
          best = mid;
          lo = mid;
        } else {
          hi = mid;
        }
      }

      if (!cancelled) setFontSize(Math.floor(best * 10) / 10);
    };

    const run = () => {
      void document.fonts.ready.then(() => {
        if (!cancelled) fit();
      });
    };

    run();
    window.addEventListener("resize", run);
    return () => {
      cancelled = true;
      window.removeEventListener("resize", run);
    };
  }, [text, pathRef, measureRef]);

  return fontSize;
}

/**
 * Single-line curved arcade hero — horizontally centered, auto-fit size.
 */
export default function CurvedRetroHero({
  text = "WELCOME TO MY PORTOFOLIO",
}: CurvedRetroHeroProps) {
  const uid = useId().replace(/:/g, "");
  const pathId = `hero-arc-${uid}`;
  const pathRef = useRef<SVGPathElement>(null);
  const measureRef = useRef<SVGTextElement>(null);
  const fontSize = useFitFont(text, pathRef, measureRef);

  return (
    <div className="relative mx-auto w-full">
      <svg
        viewBox="0 0 1200 160"
        width="100%"
        height="100%"
        className="mx-auto block h-auto w-full"
        role="img"
        aria-label={text}
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <path id={pathId} ref={pathRef} d={PATH_D} fill="none" />
        </defs>

        <text
          ref={measureRef}
          className="hero-pixel"
          x={-9999}
          y={-9999}
          style={{ fontSize: MAX_FONT }}
          aria-hidden
        >
          {text}
        </text>

        {DEPTH.map((layer) => (
          <g
            key={`${layer.x}-${layer.y}`}
            transform={`translate(${layer.x}, ${layer.y})`}
            aria-hidden
          >
            <text
              className="hero-pixel"
              fill={layer.fill}
              style={{ fontSize }}
            >
              <textPath
                href={`#${pathId}`}
                startOffset="50%"
                textAnchor="middle"
              >
                {text}
              </textPath>
            </text>
          </g>
        ))}

        <text className="hero-pixel" fill="#fdf4ff" style={{ fontSize }}>
          <textPath href={`#${pathId}`} startOffset="50%" textAnchor="middle">
            {text}
          </textPath>
        </text>
      </svg>
    </div>
  );
}
