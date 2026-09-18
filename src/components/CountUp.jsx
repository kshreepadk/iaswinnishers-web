"use client";

import { useEffect, useRef, useState } from "react";

export default function CountUp({ end, suffix = "", duration = 1200 }) {
  // Starts at the real target value (not 0) so the server-rendered HTML —
  // and anything that doesn't execute JS or simulate scrolling (search
  // crawlers, WhatsApp/social link-preview bots) — always sees the actual
  // number. The 0-to-end animation is a bonus for real visitors who
  // scroll it into view, triggered client-side only.
  const [value, setValue] = useState(end);
  const ref = useRef(null);
  const startedRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !startedRef.current) {
          startedRef.current = true;
          setValue(0);
          const startTime = performance.now();

          function tick(now) {
            const progress = Math.min((now - startTime) / duration, 1);
            setValue(Math.round(progress * end));
            if (progress < 1) requestAnimationFrame(tick);
          }
          requestAnimationFrame(tick);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [end, duration]);

  return (
    <span ref={ref}>
      {value}
      {suffix}
    </span>
  );
}
