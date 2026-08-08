import Link from "next/link";
import PageHero from "@/components/PageHero";
import LeadForm from "@/components/LeadForm";

export const metadata = {
  title: "Free UPSC Resources | NCERT Booklist, PYQs & Syllabus Map",
  description:
    "Free UPSC resources from IAS Winnishers — a prioritized NCERT booklist, topic-mapped PYQs, and a full syllabus map. No cost, no obligation.",
  alternates: { canonical: "/resources" },
};

const RESOURCES = [
  {
    slug: "ncert-booklist",
    title: "NCERT Booklist, Prioritized",
    body: "The exact NCERTs to read, and the order to read them in, for every GS subject — no more guessing where to start.",
  },
  {
    slug: "pyqs-by-topic",
    title: "PYQs, Mapped by Topic",
    body: "Previous year questions organized by syllabus topic instead of by year — revise a topic, then test it immediately.",
  },
  {
    slug: "syllabus-map",
    title: "One-Page UPSC Syllabus Map",
    body: "The entire GS syllabus laid out visually on a single page you can keep in front of you.",
  },
];

export default function ResourcesPage() {
  return (
    <>
      <PageHero
        center
        eyebrow="Take Your Next Step"
        title="Tools to help you get moving today"
        description="A booklist, real PYQs, and a full syllabus map — built to help you make progress right now, whether or not you ever join us."
      />

      <section className="bg-white px-6 py-16">
        <div className="mx-auto grid max-w-[1200px] gap-6 md:grid-cols-3">
          {RESOURCES.map((r) => (
            <div key={r.title} className="flex flex-col gap-3.5 rounded-lg2 border border-line bg-white p-8">
              <div className="flex h-[52px] w-[52px] items-center justify-center rounded-2xl bg-coral">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M12 3v12m0 0l-4-4m4 4l4-4M5 21h14" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className="font-display text-lg font-semibold">{r.title}</h3>
              <p className="flex-1 text-sm text-ink-2">{r.body}</p>
              <LeadForm source={`resources-${r.slug}`} />
            </div>
          ))}
        </div>
      </section>

      <section className="bg-ink px-6 py-16">
        <div className="mx-auto max-w-[720px] text-center">
          <span className="eyebrow justify-center text-marigold">Not Sure What&apos;s Next?</span>
          <h2 className="mt-3.5 font-display text-2xl font-semibold text-white md:text-[30px]">
            Get a clear picture of where you actually stand
          </h2>
          <p className="mt-3.5 text-[16.5px] text-white/70">
            Downloads are a good start, but they can only tell you so much. A
            career counselling conversation looks at your specific background,
            timeline, and options — UPSC and beyond.
          </p>
          <Link href="/career-counselling" className="btn mt-7 bg-marigold text-ink hover:bg-marigold-dark">
            Start Your Career Counselling Conversation
          </Link>
        </div>
      </section>

      <section className="bg-paper-2 px-6 py-16">
        <div className="mx-auto max-w-[1200px] text-center">
          <span className="eyebrow justify-center">More to Explore</span>
          <h2 className="mt-3.5 font-display text-2xl font-semibold md:text-[30px]">Prefer to read first?</h2>
          <p className="mt-3.5 text-ink-2">The blog covers strategy, answer writing, and staying steady through a multi-year UPSC journey.</p>
          <Link href="/blog" className="btn btn-ghost mt-7">Read the Blog</Link>
        </div>
      </section>
    </>
  );
}
