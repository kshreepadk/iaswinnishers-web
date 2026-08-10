"use client";

import { useEffect, useState } from "react";

const STEPS = [
  { x: 40, y: 270, w: 80, h: 60, fillOpacity: "0.35", label: "Foundation", labelX: 80 },
  { x: 160, y: 220, w: 80, h: 110, fillOpacity: "0.65", label: "Prelims", labelX: 200 },
  { x: 280, y: 150, w: 80, h: 180, fillOpacity: "1", label: "Mains", labelX: 320 },
  { x: 400, y: 70, w: 80, h: 260, fillOpacity: "1", label: "Interview", labelX: 440, coral: true },
];

export default function HeroStaircase() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // A tiny delay so the very first paint isn't mid-animation — feels
    // more deliberate than firing the instant the component exists.
    const t = setTimeout(() => setMounted(true), 150);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="mx-auto w-full max-w-[520px]">
      <svg
        viewBox="0 0 480 380"
        className="w-full"
        role="img"
        aria-label="Four rising steps — Foundation, Prelims, Mains, Interview — leading to a flag at the winning finish"
      >
        <line x1="20" y1="330" x2="460" y2="330" stroke="#E7D9C3" strokeWidth="2" />

        {STEPS.map((s, i) => (
          <g
            key={s.label}
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(16px)",
              transition: `opacity 0.5s ease ${i * 0.15}s, transform 0.5s ease ${i * 0.15}s`,
            }}
          >
            <rect
              x={s.x}
              y={s.y}
              width={s.w}
              height={s.h}
              rx="10"
              fill={s.coral ? "#FF5A36" : "#FFB627"}
              fillOpacity={s.fillOpacity}
            />
            <text
              x={s.labelX}
              y="358"
              fontFamily="Inter, sans-serif"
              fontSize="14"
              fontWeight="700"
              fill="#26180F"
              textAnchor="middle"
            >
              {s.label}
            </text>
          </g>
        ))}

        <g transform="translate(440,70)">
          <g
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "scale(1)" : "scale(0.5)",
              transformOrigin: "0px 0px",
              transformBox: "fill-box",
              transition: `opacity 0.4s ease ${STEPS.length * 0.15 + 0.1}s, transform 0.4s ease ${STEPS.length * 0.15 + 0.1}s`,
            }}
          >
            <rect x="-2" y="-52" width="4" height="52" fill="#26180F" />
            <path d="M2 -50 L38 -40 L2 -30 Z" fill="#26180F" />
          </g>
        </g>
      </svg>
    </div>
  );
}
