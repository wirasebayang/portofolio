"use client";

import type { CSSProperties } from "react";
import { THEMES, type ThemeId } from "@/components/landing/themes";

export type LazyLandingSkinProps = {
  selectedTheme: ThemeId;
  onSelectTheme: (id: ThemeId) => void;
  canStart: boolean;
  onStart: () => void;
};

const page: CSSProperties = {
  fontFamily: '"Times New Roman", Times, serif',
  fontSize: 16,
  lineHeight: 1.35,
  color: "#000",
  background: "#fff",
};

const comic: CSSProperties = {
  fontFamily: '"Comic Sans MS", "Comic Sans", cursive',
};

const linkBtn = (selected: boolean): CSSProperties => ({
  display: "block",
  width: "100%",
  textAlign: "left",
  padding: "4px 0",
  border: "none",
  background: "transparent",
  cursor: "pointer",
  fontFamily: '"Times New Roman", Times, serif',
  fontSize: 18,
  color: selected ? "#000" : "#00c",
  textDecoration: selected ? "none" : "underline",
  fontWeight: selected ? 700 : 400,
});

export default function LazyLandingSkin({
  selectedTheme,
  onSelectTheme,
  canStart,
  onStart,
}: LazyLandingSkinProps) {
  return (
    <div className="relative h-dvh w-full overflow-auto" style={page}>
      <style>{`
        @keyframes lazy-landing-marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .lazy-landing-marquee {
          display: inline-block;
          white-space: nowrap;
          animation: lazy-landing-marquee 16s linear infinite;
        }
      `}</style>

      <div
        style={{
          background: "#ffff00",
          borderBottom: "3px solid red",
          padding: "6px 8px",
          ...comic,
          fontSize: 13,
          textAlign: "center",
          overflow: "hidden",
        }}
      >
        🚧 LAZY MODE SELECTED 🚧 landing also half-finished 🚧
        <div style={{ marginTop: 4, overflow: "hidden" }}>
          <div className="lazy-landing-marquee">
            no warp drive · no ship cursor · no lava button · just vibes of
            giving up&nbsp;&nbsp;&nbsp;no warp drive · no ship cursor · no lava
            button · just vibes of giving up&nbsp;&nbsp;&nbsp;
          </div>
        </div>
      </div>

      <div
        style={{
          padding: "20px 16px 32px",
          maxWidth: 420,
          margin: "0 auto",
        }}
      >
        <p
          style={{
            margin: "0 0 4px",
            color: "#090",
            fontFamily: '"Courier New", monospace',
            fontSize: 12,
          }}
        >
          {"<!-- TODO: restyle title screen. shipping. -->"}
        </p>

        <h1
          style={{
            ...comic,
            fontSize: 28,
            margin: "8px 0 4px",
            color: "#000080",
          }}
        >
          wira&apos;s portofolio
        </h1>
        <p style={{ margin: "0 0 16px", fontStyle: "italic", color: "#555" }}>
          pick a mode. or don&apos;t. whatever.
        </p>

        <p style={{ margin: "0 0 6px", fontSize: 14, fontWeight: 700 }}>
          modes:
        </p>
        <div role="group" aria-label="Theme selection">
          {THEMES.map((theme) => {
            const isSelected = theme.id === selectedTheme;
            return (
              <button
                key={theme.id}
                type="button"
                aria-pressed={isSelected}
                onClick={() => onSelectTheme(theme.id)}
                style={linkBtn(isSelected)}
              >
                {isSelected ? "→ " : ""}
                {theme.label}
                {!theme.href && isSelected ? " (not done lol)" : ""}
                {isSelected && theme.id === "lazy" ? " ← you are here" : ""}
              </button>
            );
          })}
        </div>

        <p style={{ margin: "20px 0 8px", fontSize: 13, color: "#666" }}>
          ship select? skipped. too much work for this skin.
        </p>

        {canStart ? (
          <button
            type="button"
            onClick={onStart}
            style={{
              fontSize: 18,
              color: "#00c",
              textDecoration: "underline",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
              fontFamily: '"Times New Roman", Times, serif',
            }}
          >
            start →
          </button>
        ) : (
          <p style={{ margin: 0, color: "#999", fontSize: 14 }}>
            can&apos;t start this one yet. pick professional or lazy.
          </p>
        )}

        <p
          style={{
            margin: "28px 0 0",
            fontSize: 12,
            color: "#888",
            ...comic,
          }}
        >
          © 2026 · lazy title screen edition
        </p>
      </div>
    </div>
  );
}
