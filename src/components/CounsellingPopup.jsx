"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const IDLE_THRESHOLD_MS = 8000; // 8 seconds of no activity
const SESSION_KEY = "counsellingPopupShown";
const ACTIVITY_EVENTS = ["mousemove", "mousedown", "keydown", "touchstart", "scroll"];

export default function CounsellingPopup() {
  const [open, setOpen] = useState(false);
  const lastActivityRef = useRef(Date.now());
  const pathname = usePathname();

  // Don't nag people who are already on the booking page, and never show
  // this marketing popup inside the internal admin tool.
  const suppressed = pathname === "/contact" || pathname?.startsWith("/admin");

  useEffect(() => {
    if (suppressed) return;

    // Already shown once this browser session — don't show it again on
    // every page navigation, that would just be annoying.
    if (typeof window !== "undefined" && sessionStorage.getItem(SESSION_KEY)) {
      return;
    }

    function markActivity() {
      lastActivityRef.current = Date.now();
    }
    ACTIVITY_EVENTS.forEach((evt) => window.addEventListener(evt, markActivity, { passive: true }));

    const interval = setInterval(() => {
      const idleFor = Date.now() - lastActivityRef.current;
      if (idleFor >= IDLE_THRESHOLD_MS) {
        setOpen(true);
        sessionStorage.setItem(SESSION_KEY, "1");
        clearInterval(interval);
      }
    }, 1000);

    return () => {
      ACTIVITY_EVENTS.forEach((evt) => window.removeEventListener(evt, markActivity));
      clearInterval(interval);
    };
  }, [suppressed]);

  if (!open || suppressed) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Book a free counselling call"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/50 px-6"
      onClick={() => setOpen(false)}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-[420px] rounded-lg2 bg-white p-7 shadow-soft sm:p-8"
      >
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Close"
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-ink-2 hover:bg-paper-2 hover:text-ink"
        >
          ✕
        </button>

        <span className="eyebrow">Still deciding?</span>
        <h2 className="mt-3 font-display text-xl font-semibold text-ink sm:text-2xl">
          Let&apos;s talk it through
        </h2>
        <p className="mt-2.5 text-sm text-ink-2">
          A short, honest conversation with an exam expert: where you stand, what&apos;s
          realistic, and what your first month could look like.
        </p>

        <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
          <Link
            href="/contact#counselling"
            onClick={() => setOpen(false)}
            className="btn btn-primary flex-1 justify-center"
          >
            Book Free Counselling
          </Link>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="btn btn-ghost flex-1 justify-center"
          >
            Maybe later
          </button>
        </div>
      </div>
    </div>
  );
}
