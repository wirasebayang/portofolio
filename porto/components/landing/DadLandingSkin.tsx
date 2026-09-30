"use client";

import {
  CornerFlowers,
  DadSky,
  DadStyles,
  bigButton,
  comic,
  impact,
  script,
} from "@/components/dad/DadDecor";
import { THEMES, type ThemeId } from "@/components/landing/themes";

export type DadLandingSkinProps = {
  selectedTheme: ThemeId;
  onSelectTheme: (id: ThemeId) => void;
  canStart: boolean;
  onStart: () => void;
};

const MODE_COLORS = ["#ff4d4d", "#ff9d00", "#00b300", "#0077ff", "#9b30ff"];

export default function DadLandingSkin({
  selectedTheme,
  onSelectTheme,
  canStart,
  onStart,
}: DadLandingSkinProps) {
  return (
    <div className="dad-page h-dvh w-full overflow-y-auto">
      <DadStyles />
      <DadSky />
      <CornerFlowers />

      <div
        className="relative z-[2] mx-auto flex min-h-full w-full max-w-md flex-col items-center justify-center gap-4 px-8 py-10"
      >
        <div className="text-center">
          <p
            style={{
              margin: 0,
              fontFamily: script,
              fontSize: "clamp(1.3rem, 4vw, 1.8rem)",
              color: "#8b0000",
              textShadow: "2px 2px 0 #fff",
            }}
          >
            ~ Selamat Datang ~
          </p>
          <h1
            className="dad-rainbow"
            style={{
              margin: 0,
              fontFamily: impact,
              fontSize: "clamp(2.2rem, 9vw, 3.4rem)",
              lineHeight: 1.05,
              letterSpacing: 1,
            }}
          >
            MENU UTAMA
          </h1>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/dad/garland.webp"
            alt=""
            aria-hidden
            width={900}
            height={300}
            className="dad-garland"
          />
        </div>

        <div
          style={{
            width: "100%",
            background: "#fffbe6",
            border: "6px ridge #d4a017",
            borderRadius: 18,
            padding: "16px 16px 18px",
            boxShadow: "6px 6px 0 #8b0000",
          }}
        >
          <p
            style={{
              margin: "0 0 12px",
              textAlign: "center",
              fontFamily: comic,
              fontSize: 15,
              color: "#1a1a8c",
            }}
          >
            Silakan pilih mode di bawah ini 🙏
          </p>
          <div
            role="group"
            aria-label="Theme selection"
            className="flex flex-col gap-2.5"
          >
            {THEMES.map((theme, i) => {
              const isSelected = theme.id === selectedTheme;
              return (
                <button
                  key={theme.id}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => onSelectTheme(theme.id)}
                  className={isSelected ? "dad-wobble" : undefined}
                  style={{
                    width: "100%",
                    cursor: "pointer",
                    fontFamily: comic,
                    fontWeight: 700,
                    fontSize: 16,
                    color: "#fff",
                    background: MODE_COLORS[i % MODE_COLORS.length],
                    border: isSelected ? "4px solid #ffff00" : "3px outset #ffd700",
                    borderRadius: 12,
                    padding: "8px 12px",
                    textShadow: "1px 1px 0 #000",
                    boxShadow: isSelected ? "0 0 16px #ff00c8" : "3px 3px 0 #000",
                    opacity: isSelected ? 1 : 0.85,
                  }}
                >
                  {isSelected ? "👉 " : ""}
                  {theme.label}
                  {isSelected ? " 👈" : ""}
                  {!theme.href && isSelected ? (
                    <span style={{ display: "block", fontSize: 11, fontWeight: 400 }}>
                      (belum jadi, sabar ya Nak)
                    </span>
                  ) : null}
                </button>
              );
            })}
          </div>
        </div>

        {canStart ? (
          <button
            type="button"
            onClick={onStart}
            className="dad-glow"
            style={{ ...bigButton("#ff00c8"), cursor: "pointer" }}
          >
            👉 KLIK DISINI UNTUK MASUK!!! 👈
          </button>
        ) : (
          <p
            style={{
              margin: 0,
              fontFamily: comic,
              fontSize: 14,
              color: "#fff",
              textShadow: "1px 1px 0 #000",
              textAlign: "center",
            }}
          >
            Mode ini belum bisa dibuka. Pilih yang lain dulu ya 🙏
          </p>
        )}

        <p
          style={{
            margin: 0,
            fontFamily: comic,
            fontSize: 12,
            color: "#fff",
            textShadow: "1px 1px 0 #000",
          }}
        >
          Menu ini dibuat oleh Bapaknya Wira 🌹
        </p>
      </div>
    </div>
  );
}
