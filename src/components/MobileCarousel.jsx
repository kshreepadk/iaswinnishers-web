"use client";

import { useRef, useState, useCallback } from "react";

/**
 * A self-contained mobile carousel: horizontal swipe with snap points and
 * live dot indicators. Deliberately kept completely separate from the
 * desktop grid (rendered alongside it, hidden/shown via the `hiddenAbove`
 * breakpoint) rather than trying to make one container behave as both a
 * grid and a carousel — that combined approach is what looked broken
 * before.
 */
export default function MobileCarousel({ items, itemWidthClass = "w-[82%]", hiddenAbove = "sm", className = "" }) {
  const scrollRef = useRef(null);
  const [active, setActive] = useState(0);

  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const kids = Array.from(el.children);
    const center = el.scrollLeft + el.clientWidth / 2;
    let closest = 0;
    let closestDist = Infinity;
    kids.forEach((child, i) => {
      const dist = Math.abs(child.offsetLeft + child.offsetWidth / 2 - center);
      if (dist < closestDist) {
        closestDist = dist;
        closest = i;
      }
    });
    setActive(closest);
  }, []);

  const hiddenClass = hiddenAbove === "none" ? "" : hiddenAbove === "md" ? "md:hidden" : "sm:hidden";

  return (
    <div className={`${hiddenClass} ${className}`}>
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="no-scrollbar -mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-1"
      >
        {items.map((item, i) => (
          <div key={i} className={`shrink-0 snap-center ${itemWidthClass}`}>
            {item}
          </div>
        ))}
      </div>

      {items.length > 1 && (
        <div className="mt-4 flex justify-center gap-1.5">
          {items.map((_, i) => (
            <span
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === active ? "w-5 bg-coral" : "w-1.5 bg-line"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
