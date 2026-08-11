import Link from "next/link";
import Image from "next/image";
import HeroStaircase from "@/components/HeroStaircase";
import CountUp from "@/components/CountUp";
import MobileCarousel from "@/components/MobileCarousel";

export const metadata = {
  title: "Personalised UPSC & IAS Coaching with a Dedicated Coach for Every Aspirant",
  alternates: { canonical: "/" },
};

const FEATURES = [
  {
    title: "A dedicated personal coach",
    body: "One coach takes up full responsibility of your entire journey of the preparation. They know your strengths, consistently build on your potential areas of progress, and most importantly work on your cognitive and emotional quotient so as to help you achieve a winning finish in the exam.",
  },
  {
    title: "Structured, staged learning",
    body: "Foundation, Prelims, Mains and Interview each have a clear plan — you always know what to study next and why. We call our way of learning ORGANIC and ORGANISED.",
  },
  {
    title: "Confidence & wellbeing built in",
    body: "Regular observation of your levels of stress, motivation and mindset are an integral part of our weekly coaching cycle. We want your preparation to be enjoyable and sustainable.",
  },
];

const JOURNEY = [
  { n: "1", title: "Foundation Mastery", body: "NCERT base-building, syllabus mapping and a personalised coaching plan and expansion of horizons of your knowledge so that you become that well informed and educated person that UPSC aspires to recruit." },
  { n: "2", title: "Prelims Mastery", body: "Conceptual excellence, current affairs mastery and weekly tests which we proudly call individual excellence challenge." },
  { n: "3", title: "Mains Mastery", body: "Daily answer writing for general studies, optional subject depth, and essay practice — all with detailed review session." },
  { n: "4", title: "Interview Mastery", body: "Comprehensive one-on-one DAF review, confidence-building conversations, and high performance coaching." },
  { n: "🏁", title: "Winning Finish", body: "You walk in prepared and reassured of yourself and experience its natural consequence — success in the civil service exam." },
];

const PROGRAMS = [
  { tag: "18–22 Months", title: "Foundation to Winning Finish Program", body: "One continuous journey, from your first NCERT to your final interview — the same coach with you at every single stage.", href: "/programs#foundation-to-finish" },
  { tag: "For Repeat Attempts", title: "Reassess & Restart Program", body: "Didn't clear this attempt? A coach helps you honestly assess what happened and rebuild a plan from exactly where you actually are — not from scratch.", href: "/programs#reassess-restart" },
  { tag: "Objective Round", title: "Prelims Mastery Program", body: "Timed, full-length mock tests on the real exam pattern, with detailed error analysis after every attempt.", href: "/programs#prelims-mastery" },
  { tag: "Descriptive Round", title: "Mains Mastery Program", body: "Weekly answer writing across all GS papers, Essay, and your optional subject — Geography, Polity and Psychology especially well covered.", href: "/programs#mains-mastery" },
  { tag: "Personality Test", title: "Interview Guidance", body: "One-on-one DAF review, personality-test preparation, and steady confidence coaching before the big day.", href: "/programs#interview" },
];

const RESOURCES = [
  { title: "NCERT Booklist, Prioritized", body: "The exact NCERTs to read, and the order to read them in, for every GS subject." },
  { title: "The 12-Month Study Planner", body: "A fillable template built around three real phases, not twelve identical months." },
  { title: "One-Page UPSC Syllabus Map", body: "The entire GS syllabus laid out visually on a single page." },
];

const TESTIMONIALS = [
  { photo: "/testimonials/akash-shankar.jpg", name: "Dr. Akash Shankar, IAS", program: "Interview Guidance", quote: "My coach helped me build real clarity before the interview — patient, structured conversations that made me feel prepared instead of anxious on the actual day." },
  { photo: "/testimonials/shiva-shankar.jpg", name: "Shiva Shankar E, IFS", program: "Mains Test Series", quote: "Weekly tests with detailed, honest feedback made all the difference. Preparing here felt systematic rather than scattered across ten different sources." },
  { photo: "/testimonials/sandesh-nayak.jpg", name: "Sandesh Nayak, IAS", program: "Foundation to Winning Finish Program", quote: "My coach kept me engaged with exam-oriented questions even outside class hours — lively, energetic teaching that never let my momentum drop." },
  { photo: "/testimonials/radhika-g.jpg", name: "Radhika G, IPS", program: "Prelims Mastery Program", quote: "The test series felt exactly like the real exam, and the error analysis after every attempt told me precisely what to fix — nothing vague, always specific." },
];

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="px-6 pb-16 pt-3 md:pb-20 md:pt-4">
        <div className="mx-auto grid max-w-[1200px] items-center gap-10 md:grid-cols-[1.05fr_0.95fr]">
          <div>
            <span className="eyebrow">An Institute for Winning Finish in IAS Exam</span>
            <h1 className="mt-4 font-display text-[34px] font-semibold leading-[1.08] md:text-[54px]">
              Your journey to <em className="not-italic text-coral">winning finish</em> in civil service exam starts right here
            </h1>
            <p className="mt-6 max-w-[54ch] font-display text-lg leading-relaxed text-ink-2">
              At IAS Winnishers, you are cared for and hand-held in your
              preparation at every stage of the exam. The journey at IAS
              Winnishers is a journey of personal transformation. While
              planning your preparation, simplifying the concepts in the
              syllabus and evaluating your answers is something that we have
              traditionally been experts at, keeping you steady, consistent
              and focused throughout your preparation to help you excel in
              the exam and achieve your peak performance is the coaching
              challenge that IAS Winnishers loves to accept and fulfill.
            </p>
          </div>

          {/* Animated staircase illustration — steps rise into place on load */}
          <div className="self-start md:mt-8">
            <HeroStaircase />
          </div>
        </div>
      </section>

      {/* COACHING PHILOSOPHY STATEMENT */}
      <section className="border-y border-line bg-paper-2 px-6 py-10 text-center">
        <div className="mx-auto max-w-[760px]">
          <p className="font-display text-lg font-semibold leading-relaxed text-ink md:text-xl">
            Coaching is not a group activity, it&apos;s individualistic and
            personal. Group activity may generally be called teaching, guiding
            or training. WE COACH, TEACH AND MENTOR.
          </p>
          <p className="mt-3 text-[15px] text-ink-2">
            We teach in groups of small batches. We coach only one person at a
            time. We respect the difference.
          </p>
        </div>
      </section>

      {/* STAT STRIP */}
      <section className="border-y border-line px-6 py-10">
        <div className="mx-auto grid max-w-[1200px] grid-cols-2 gap-6 text-center md:grid-cols-4">
          {[
            { display: "1:1", label: "Coach-to-student pairing, for every aspirant" },
            { end: 5, label: "Stages covered — Foundation to Winning Finish" },
            { display: "Weekly", label: "One-on-one review sessions with your coach" },
            { end: 100, suffix: "%", label: "Personalised study plans — no fixed template" },
          ].map((s) => (
            <div key={s.label}>
              <div className="font-display text-3xl font-bold text-ink md:text-[34px]">
                {s.end !== undefined ? <CountUp end={s.end} suffix={s.suffix || ""} /> : s.display}
              </div>
              <div className="mt-1 text-[13px] text-ink-2">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* WHY US */}
      <section className="bg-white px-6 py-20">
        <div className="mx-auto max-w-[1200px]">
          <div className="mx-auto max-w-[680px] text-center">
            <span className="eyebrow justify-center">Why Aspirants Choose Us</span>
            <h2 className="mt-3.5 font-display text-3xl font-semibold leading-tight md:text-[42px]">
              Coaching built around one student, not one classroom
            </h2>
            <p className="mt-4 text-[16.5px] text-ink-2">
              The philosophical basis of our coaching stems from the fact that
              every student is unique, his/her needs and requirements are
              individualistic.
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {FEATURES.map((f) => (
              <div key={f.title} className="rounded-md2 border border-line bg-white p-7 transition-all hover:-translate-y-1.5 hover:shadow-soft">
                <h3 className="mb-2 font-display text-[19px] font-semibold">{f.title}</h3>
                <p className="text-[15px] text-ink-2">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* JOURNEY */}
      <section className="bg-paper-2 px-6 py-20">
        <div className="mx-auto max-w-[1200px]">
          <div className="mx-auto max-w-[680px] text-center">
            <span className="eyebrow justify-center">Your Preparation Path</span>
            <h2 className="mt-3.5 font-display text-3xl font-semibold leading-tight md:text-[42px]">
              From your first day to your winning finish
            </h2>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-5">
            {JOURNEY.map((step) => (
              <div key={step.title} className="flex items-start gap-4 text-left md:flex-col md:items-center md:text-center">
                <div className="flex h-16 w-16 flex-none items-center justify-center rounded-full border-[3px] border-marigold bg-white font-display text-lg font-bold text-ink shadow-tight last:border-coral last:bg-coral last:text-white md:mx-auto md:mb-4">
                  {step.n}
                </div>
                <div>
                  <h4 className="mb-1.5 text-[15.5px] font-bold">{step.title}</h4>
                  <p className="text-[13.5px] text-ink-2">{step.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COACH RESPONSIBILITY */}
      <section className="bg-white px-6 py-20">
        <div className="mx-auto max-w-[760px] text-center">
          <h2 className="font-display text-3xl font-semibold leading-tight md:text-[42px]">
            A coach who takes up your responsibility head on
          </h2>
          <p className="mt-5 text-[16.5px] text-ink-2">
            From the day you join, one coach is responsible for your progress
            — your weekly plan, your answer writing, your doubts, and most
            importantly your enthusiasm and morale. They adjust the plan as
            your strengths change, so you&apos;re never following a template
            built for someone else.
          </p>
          <Link href="/about" className="btn btn-primary mt-7">
            Meet the Coaching Team
          </Link>
        </div>
      </section>

      {/* PROGRAMS PREVIEW */}
      <section className="bg-white px-6 py-20">
        <div className="mx-auto max-w-[1200px]">
          <div className="max-w-[680px]">
            <span className="eyebrow">Programs</span>
            <h2 className="mt-3.5 font-display text-3xl font-semibold leading-tight md:text-[42px]">
              Choose the stage you're starting from
            </h2>
          </div>
          <MobileCarousel
            hiddenAbove="none"
            className="mt-10"
            itemWidthClass="w-[85%] sm:w-[47%]"
            items={PROGRAMS.map((p) => (
              <div key={p.title} className="flex h-full flex-col rounded-md2 border border-line bg-white transition-all hover:-translate-y-1.5 hover:shadow-soft">
                <div className="p-6 pb-0">
                  <span className="mb-3 inline-block rounded-full bg-leaf-light px-3 py-1 text-[11.5px] font-bold uppercase tracking-wide text-leaf">
                    {p.tag}
                  </span>
                  <h3 className="mb-2 font-display text-[19px] font-semibold">{p.title}</h3>
                </div>
                <p className="px-6 text-sm text-ink-2">{p.body}</p>
                <div className="mt-auto flex items-center justify-end border-t border-line p-6">
                  <Link href={p.href} className="btn btn-ghost !px-4 !py-2.5 text-sm">Details</Link>
                </div>
              </div>
            ))}
          />

          <div className="mt-10 text-center">
            <Link href="/programs" className="btn btn-primary">View All Programs</Link>
          </div>
        </div>
      </section>

      {/* RESOURCES */}
      <section className="bg-paper-2 px-6 py-20">
        <div className="mx-auto max-w-[1200px]">
          <div className="mx-auto max-w-[680px] text-center">
            <span className="eyebrow justify-center">Take Your Next Step</span>
            <h2 className="mt-3.5 font-display text-3xl font-semibold leading-tight md:text-[42px]">
              Tools to help you get moving today
            </h2>
            <p className="mt-4 text-[16.5px] text-ink-2">
              A booklist, a study planner, and a full syllabus map — built to help you make
              progress right now, whether or not you ever join us.
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {RESOURCES.map((r) => (
              <div key={r.title} className="flex flex-col gap-3 rounded-lg2 border border-line bg-white p-8">
                <div className="flex h-[52px] w-[52px] items-center justify-center rounded-2xl bg-coral">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M12 3v12m0 0l-4-4m4 4l4-4M5 21h14" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3 className="font-display text-[19px] font-semibold">{r.title}</h3>
                <p className="text-sm text-ink-2">{r.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-9 text-center">
            <Link href="/resources" className="btn btn-ghost">See All Free Resources</Link>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-white px-6 py-20">
        <div className="mx-auto max-w-[1200px]">
          <div className="mx-auto max-w-[680px] text-center">
            <span className="eyebrow justify-center">In Their Words</span>
            <h2 className="mt-3.5 font-display text-3xl font-semibold leading-tight md:text-[42px]">
              Aspirants who found their steady footing here
            </h2>
          </div>
          <MobileCarousel
            hiddenAbove="none"
            className="mt-12"
            itemWidthClass="w-[85%] sm:w-[47%]"
            items={TESTIMONIALS.map((t) => (
              <div key={t.name} className="h-full rounded-md2 border border-line bg-white p-7">
                <div className="mb-3.5 text-marigold">★★★★★</div>
                <p className="text-[15px] text-ink-2">{t.quote}</p>
                <div className="mt-5 flex items-center gap-3">
                  <Image
                    src={t.photo}
                    alt={t.name}
                    width={56}
                    height={56}
                    className="h-14 w-14 flex-none rounded-full border-2 border-paper-2 object-cover"
                  />
                  <div>
                    <strong className="block text-sm text-ink">{t.name}</strong>
                  </div>
                </div>
              </div>
            ))}
          />
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white px-6 py-20">
        <div className="mx-auto max-w-[1200px]">
          <div className="flex flex-wrap items-center justify-between gap-8 rounded-lg2 bg-ink p-8 md:p-14">
            <div>
              <h2 className="max-w-[520px] font-display text-2xl font-semibold text-white md:text-[34px]">
                Ready to meet your coach?
              </h2>
              <p className="mt-2.5 max-w-[460px] text-white/70">
                A short, honest conversation — where you stand, what's realistic,
                and what your first month could look like.
              </p>
            </div>
            <Link href="/contact#counselling" className="btn w-full justify-center bg-marigold text-ink hover:bg-marigold-dark sm:w-auto">
              Book Your Free Counselling Call
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
