"use client";

import { useState } from "react";
import Link from "next/link";

const STAGES = [
  {
    key: "starting",
    label: "Just starting out",
    program: "Foundation to Winning Finish Program",
    href: "/programs#foundation-to-finish",
    blurb: "One continuous journey from your first NCERT to your final interview — the natural starting point if you're new to UPSC prep.",
  },
  {
    key: "prelims",
    label: "Preparing for Prelims",
    program: "Prelims Mastery Program",
    href: "/programs#prelims-mastery",
    blurb: "Timed test series and topic-wise error analysis, built for exactly this stage.",
  },
  {
    key: "mains",
    label: "Preparing for Mains",
    program: "Mains Mastery Program",
    href: "/programs#mains-mastery",
    blurb: "Weekly answer writing across all GS papers and your optional subject, reviewed line by line by your coach.",
  },
  {
    key: "interview",
    label: "Preparing for Interview",
    program: "Interview Guidance",
    href: "/programs#interview",
    blurb: "One-on-one DAF review and steady confidence coaching before the big day.",
  },
];

export default function ProgramFinder() {
  const [selected, setSelected] = useState(null);
  const result = STAGES.find((s) => s.key === selected);

  return (
    <section className="bg-white px-6 py-16">
      <div className="mx-auto max-w-[820px] text-center">
        <span className="eyebrow justify-center">Find Your Program</span>
        <h2 className="mt-3.5 font-display text-2xl font-semibold md:text-[32px]">
          Where are you in your journey?
        </h2>
        <p className="mt-2.5 text-ink-2">Tell us, and we'll point you to the right place to start.</p>

        <div className="mt-7 grid grid-cols-2 gap-3 md:grid-cols-4">
          {STAGES.map((s) => (
            <button
              key={s.key}
              type="button"
              onClick={() => setSelected(s.key)}
              className={`rounded-md2 border-2 px-4 py-4 text-sm font-semibold transition-colors ${
                selected === s.key
                  ? "border-coral bg-coral text-white"
                  : "border-line bg-paper text-ink hover:border-coral"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        {result && (
          <div className="mt-7 rounded-lg2 border border-line bg-paper-2 p-7 text-left">
            <span className="eyebrow">We&apos;d suggest</span>
            <h3 className="mt-2.5 font-display text-xl font-semibold text-ink">{result.program}</h3>
            <p className="mt-2 text-sm text-ink-2">{result.blurb}</p>
            <div className="mt-5 flex flex-col gap-2.5 sm:flex-row">
              <Link href={result.href} className="btn btn-primary flex-1 justify-center">
                View This Program
              </Link>
              <Link href="/contact#counselling" className="btn btn-ghost flex-1 justify-center">
                Talk to a Coach First
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
