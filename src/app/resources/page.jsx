import Link from "next/link";
import PageHero from "@/components/PageHero";
import LeadForm from "@/components/LeadForm";
import VideoEmbed from "@/components/VideoEmbed";
import { getLatestVideos, YOUTUBE_CHANNEL_URL } from "@/lib/youtube";

export const metadata = {
  title: "Free UPSC Resources | NCERT Booklist, PYQs & Syllabus Map",
  description:
    "Free UPSC resources from IAS Winnishers — a prioritized NCERT booklist, 5 years of topic-wise PYQs, and a full syllabus map. No cost, no obligation.",
  alternates: { canonical: "/resources" },
};

const RESOURCES = [
  {
    slug: "ncert-booklist",
    title: "NCERT Booklist, Prioritized",
    body: "The exact NCERTs to read, and the order to read them in, for every GS subject — no more guessing where to start.",
    file: "/resources/ncert-booklist.pdf",
  },
  {
    slug: "pyqs-topic-wise",
    title: "5 Years of PYQs, Topic-Wise",
    body: "Real UPSC questions from the last 5 years, organized by subject instead of by year — revise a topic, then test it immediately.",
    file: "/resources/pyqs-topic-wise.pdf",
  },
  {
    slug: "syllabus-map",
    title: "One-Page UPSC Syllabus Map",
    body: "The entire GS syllabus laid out visually on a single page you can keep in front of you.",
    file: "/resources/syllabus-map.pdf",
  },
];

export default async function ResourcesPage() {
  const videos = await getLatestVideos(3);

  return (
    <>
      <PageHero
        center
        eyebrow="Take Your Next Step"
        title="Tools to help you get moving today"
        description="A booklist, 5 years of topic-wise PYQs, and a full syllabus map — built to help you make progress right now, whether or not you ever join us."
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
              <LeadForm source={`resources-${r.slug}`} downloadUrl={r.file} buttonLabel="Get it now" />
            </div>
          ))}
        </div>
      </section>

      {videos.length > 0 && (
        <section className="bg-paper-2 px-6 py-16">
          <div className="mx-auto max-w-[1200px]">
            <div className="mx-auto max-w-[680px] text-center">
              <span className="eyebrow justify-center">From Our Channel</span>
              <h2 className="mt-3.5 font-display text-2xl font-semibold md:text-[30px]">
                Free videos to help you along the way
              </h2>
              <p className="mt-3.5 text-ink-2">
                A few recent uploads from our YouTube channel — useful on
                their own, whether or not you ever join us.
              </p>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {videos.map((v) => (
                <div key={v.videoId} className="flex flex-col gap-3">
                  <VideoEmbed videoId={v.videoId} title={v.title} />
                  <h3 className="font-display text-[15px] font-semibold leading-snug">{v.title}</h3>
                </div>
              ))}
            </div>
            <div className="mt-9 text-center">
              <a href={YOUTUBE_CHANNEL_URL} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                Explore More on YouTube
              </a>
            </div>
          </div>
        </section>
      )}

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
