import type { CSSProperties } from "react";

export const comic = '"Comic Sans MS", "Comic Sans", cursive';
export const script =
  '"Brush Script MT", "Segoe Script", "Lucida Handwriting", cursive';
export const impact = 'Impact, "Arial Black", sans-serif';

export const bigButton = (bg: string): CSSProperties => ({
  display: "inline-block",
  fontFamily: impact,
  fontSize: 18,
  letterSpacing: 1,
  color: "#fff",
  background: bg,
  border: "4px outset #ffd700",
  borderRadius: 12,
  padding: "10px 18px",
  textShadow: "2px 2px 0 #000",
  textDecoration: "none",
});

const CORNER_FLOWERS: {
  src: string;
  pos: CSSProperties;
  transform: string;
  origin: string;
}[] = [
  {
    src: "/dad/roses-pink.webp",
    pos: { top: 0, left: 0 },
    transform: "translate(-30%, -30%) rotate(-12deg)",
    origin: "top left",
  },
  {
    src: "/dad/bouquet-mix.webp",
    pos: { top: 0, right: 0 },
    transform: "translate(32%, -32%) rotate(10deg)",
    origin: "top right",
  },
  {
    src: "/dad/roses-red.webp",
    pos: { bottom: 0, left: 0 },
    transform: "translate(-12%, 12%)",
    origin: "bottom left",
  },
  {
    src: "/dad/roses-red.webp",
    pos: { bottom: 0, right: 0 },
    transform: "translate(12%, 12%) scaleX(-1)",
    origin: "bottom left",
  },
];

const SPARKLES: CSSProperties[] = [
  { top: "6%", left: "4%" },
  { top: "14%", left: "11%" },
  { top: "3%", left: "15%" },
  { top: "5%", right: "5%" },
  { top: "16%", right: "12%" },
  { top: "9%", right: "17%" },
  { bottom: "8%", left: "6%" },
  { bottom: "18%", left: "3%" },
  { bottom: "5%", left: "16%" },
  { bottom: "7%", right: "6%" },
  { bottom: "17%", right: "3%" },
  { bottom: "4%", right: "15%" },
];

export function CornerFlowers() {
  return (
    <div aria-hidden className="dad-corners">
      {CORNER_FLOWERS.map((f, i) => (
        <div
          key={i}
          className="dad-corner"
          style={{ ...f.pos, transform: f.transform }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={f.src}
            alt=""
            style={{ transformOrigin: f.origin, animationDelay: `${i * -0.8}s` }}
          />
        </div>
      ))}
      {SPARKLES.map((pos, i) => (
        <span
          key={i}
          className="dad-sparkle"
          style={{ ...pos, animationDelay: `${(i * 0.37) % 1.6}s` }}
        />
      ))}
    </div>
  );
}

function Cloud({ top, duration, delay, scale }: {
  top: string;
  duration: number;
  delay: number;
  scale: number;
}) {
  return (
    <svg
      aria-hidden
      className="dad-cloud"
      viewBox="0 0 200 100"
      style={{
        top,
        width: 200 * scale,
        animationDuration: `${duration}s`,
        animationDelay: `${delay}s`,
      }}
    >
      <g fill="#fff" stroke="#cfe8ff" strokeWidth="2">
        <ellipse cx="60" cy="62" rx="45" ry="28" />
        <ellipse cx="100" cy="45" rx="45" ry="35" />
        <ellipse cx="145" cy="62" rx="42" ry="27" />
        <rect x="40" y="60" width="130" height="30" rx="15" />
      </g>
    </svg>
  );
}

function Bird({ top, duration, delay }: {
  top: string;
  duration: number;
  delay: number;
}) {
  return (
    <svg
      aria-hidden
      className="dad-bird"
      viewBox="0 0 40 20"
      style={{
        top,
        animationDuration: `${duration}s`,
        animationDelay: `${delay}s`,
      }}
    >
      <path
        className="dad-wing"
        d="M2 12 Q10 2 20 12 Q30 2 38 12"
        fill="none"
        stroke="#222"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function DadSky() {
  return (
    <div className="dad-sky" aria-hidden>
      <div className="dad-sun" />
      <Cloud top="30px" duration={60} delay={0} scale={1} />
      <Cloud top="140px" duration={80} delay={-30} scale={0.7} />
      <Cloud top="260px" duration={70} delay={-50} scale={1.2} />
      <Cloud top="420px" duration={95} delay={-10} scale={0.8} />
      <Bird top="90px" duration={18} delay={0} />
      <Bird top="120px" duration={22} delay={-6} />
      <Bird top="200px" duration={26} delay={-12} />
      <Bird top="330px" duration={20} delay={-3} />
    </div>
  );
}

/** Shared by the /dad page and the dad landing skin; scope with `.dad-page`. */
export function DadStyles() {
  return (
    <style>{`
      .dad-page {
        position: relative;
        overflow-x: hidden;
        background:
          linear-gradient(180deg,
            #3fa9ff 0%, #7fd0ff 18%, #bdf0ff 30%,
            #9dff4f 42%, #4cd62b 70%, #2fae1a 100%);
        color: #000;
      }
      .dad-sky { position: absolute; inset: 0 0 auto 0; height: 900px; pointer-events: none; overflow: hidden; z-index: 0; }
      .dad-sun {
        position: absolute; top: 40px; right: 24%;
        width: 110px; height: 110px; border-radius: 50%;
        background: radial-gradient(circle, #fff96b 0%, #ffd000 55%, #ff9d00 100%);
        box-shadow: 0 0 40px 16px #fff27a;
        animation: dad-spin 18s linear infinite;
      }
      .dad-sun::after {
        content: ""; position: absolute; inset: -26px; border-radius: 50%;
        background: repeating-conic-gradient(#ffe24a 0 8deg, transparent 8deg 22deg);
        z-index: -1;
      }
      .dad-cloud { position: absolute; left: -260px; animation: dad-drift linear infinite; }
      .dad-bird { position: absolute; left: -60px; width: 44px; animation: dad-fly linear infinite; }
      .dad-wing { transform-origin: 20px 12px; animation: dad-flap 0.5s ease-in-out infinite alternate; }
      .dad-corners { position: fixed; inset: 0; z-index: 3; pointer-events: none; overflow: hidden; }
      .dad-corner { position: absolute; width: clamp(120px, 19vw, 270px); }
      .dad-corner img {
        display: block; width: 100%; height: auto;
        filter: drop-shadow(0 0 2px #fff) drop-shadow(0 0 10px #ff5fa2aa);
        animation: dad-bloom 3.2s ease-in-out infinite alternate;
      }
      .dad-sparkle {
        position: absolute; width: 18px; height: 18px;
        background: radial-gradient(circle, #fff 0 25%, #fff36b 45%, #ffd000 60%, transparent 72%);
        clip-path: polygon(50% 0, 60% 40%, 100% 50%, 60% 60%, 50% 100%, 40% 60%, 0 50%, 40% 40%);
        animation: dad-twinkle 1.6s ease-in-out infinite;
      }
      .dad-garland {
        display: block; width: min(100%, 620px); height: auto; margin: 4px auto 0;
        filter: drop-shadow(0 0 2px #fff) drop-shadow(2px 3px 0 #0003);
      }
      .dad-photo-rose { position: absolute; pointer-events: none; filter: drop-shadow(0 0 2px #fff); }
      .dad-rainbow {
        background: linear-gradient(90deg, #ff0000, #ff8a00, #ffe600, #00c800, #0077ff, #8a2be2, #ff00c8);
        -webkit-background-clip: text; background-clip: text; color: transparent;
        filter: drop-shadow(3px 3px 0 #000);
      }
      .dad-marquee { display: inline-block; white-space: nowrap; animation: dad-marquee 22s linear infinite; }
      .dad-blink { animation: dad-blink 0.9s step-end infinite; }
      .dad-glow { animation: dad-glow 1.2s ease-in-out infinite alternate; }
      .dad-wobble { display: inline-block; animation: dad-wobble 1.6s ease-in-out infinite; }

      @keyframes dad-drift { to { transform: translateX(calc(100vw + 520px)); } }
      @keyframes dad-fly {
        0% { transform: translate(0, 0); }
        25% { transform: translate(28vw, -20px); }
        50% { transform: translate(56vw, 10px); }
        75% { transform: translate(84vw, -14px); }
        100% { transform: translate(calc(100vw + 120px), 0); }
      }
      @keyframes dad-flap { from { transform: scaleY(1); } to { transform: scaleY(-0.4); } }
      @keyframes dad-spin { to { transform: rotate(360deg); } }
      @keyframes dad-bloom { from { transform: rotate(-3deg) scale(1); } to { transform: rotate(3deg) scale(1.04); } }
      @keyframes dad-twinkle {
        0%, 100% { opacity: 0; transform: scale(0.3) rotate(0deg); }
        50% { opacity: 1; transform: scale(1.1) rotate(45deg); }
      }
      @keyframes dad-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
      @keyframes dad-blink { 0%, 49% { opacity: 1; } 50%, 100% { opacity: 0.15; } }
      @keyframes dad-glow {
        from { box-shadow: 0 0 0 #ff00c8; transform: scale(1); }
        to { box-shadow: 0 0 22px #ff00c8; transform: scale(1.05); }
      }
      @keyframes dad-wobble { 0%, 100% { transform: rotate(-3deg); } 50% { transform: rotate(3deg); } }

      @media (max-width: 640px) {
        .dad-corner { width: 104px; }
        .dad-corner:nth-child(n + 3) { width: 78px; }
        .dad-sparkle { width: 12px; height: 12px; }
      }
      @media (prefers-reduced-motion: reduce) {
        .dad-page *, .dad-page *::before, .dad-page *::after {
          animation: none !important;
        }
        .dad-cloud { left: auto; right: 10%; }
        .dad-bird { display: none; }
        .dad-sparkle { opacity: 0.8; }
      }
    `}</style>
  );
}
