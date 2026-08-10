"use client";

import { useEffect, useState } from "react";

const COLORS = ["#FF5A36", "#FFB627", "#166A4C", "#26180F"];

export default function Confetti({ fire, onDone }) {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    if (!fire) return;

    const items = Array.from({ length: 28 }).map((_, i) => ({
      id: i,
      left: 50 + (Math.random() * 60 - 30), // percent from center
      delay: Math.random() * 0.15,
      duration: 0.9 + Math.random() * 0.6,
      color: COLORS[i % COLORS.length],
      rotate: Math.round(Math.random() * 360),
      drift: Math.round(Math.random() * 80 - 40),
    }));
    setParticles(items);

    const timer = setTimeout(() => {
      setParticles([]);
      onDone?.();
    }, 1700);
    return () => clearTimeout(timer);
  }, [fire, onDone]);

  if (particles.length === 0) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[200] overflow-hidden">
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute top-1/3 h-2.5 w-2.5 rounded-sm"
          style={{
            left: `${p.left}%`,
            backgroundColor: p.color,
            animation: `confetti-fall ${p.duration}s ease-in ${p.delay}s forwards`,
            "--drift": `${p.drift}px`,
            "--rotate": `${p.rotate}deg`,
          }}
        />
      ))}
    </div>
  );
}
