import Link from "next/link";
import Image from "next/image";
import PageHero from "@/components/PageHero";

export const metadata = {
  title: "About Us",
  description:
    "Why IAS Winnishers exists, how our one-coach-per-aspirant model works, and the founder guiding UPSC Civil Services aspirants through Prelims, Mains and Interview.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        crumb="About Us"
        eyebrow="Our Story"
        title="We started IAS Winnishers around one idea: every aspirant deserves their own coach."
      />

      <section className="bg-white px-6 py-16">
        <div className="mx-auto grid max-w-[1200px] gap-12 md:grid-cols-[2fr_1fr]">
          <article className="prose-content">
            <h2 className="!mt-0">Why we exist</h2>
            <div className="mb-6 flex w-fit items-center gap-4 rounded-md2 bg-paper-2 px-5 py-4">
              <span className="font-display text-[32px] font-bold text-ink">1:1</span>
              <span className="font-mono text-[12.5px] font-semibold uppercase tracking-wide text-ink-2">
                Coach per aspirant
              </span>
            </div>
            <p>
              Most coaching is built for the batch of 150, not the one aspirant
              working through a tough optional subject. We spoke to hundreds of
              aspirants across Bengaluru and India, and designed Winnishers
              around what actually helps: a named coach, a plan that adapts to
              you, and steady support all the way to the interview.
            </p>
            <p>
              Every year, thousands of capable aspirants start their UPSC
              journey with energy, and lose it somewhere along the way. Not
              because they lack ability, but because the preparation itself is
              exhausting: scattered guidance, generic batches, and no one
              tracking how they&apos;re actually doing as a person, not just as
              a rank number.
            </p>

            <h3>Why &quot;Winnishers&quot;?</h3>
            <p>
              The name is a mash-up of &quot;Winning&quot; and &quot;Finish&quot;,
              the promise we make to every aspirant who walks through our
              doors: not just to win, but to finish what they started, all the
              way to the end. It&apos;s not enough to be sharp on exam day; you
              need to be the kind of aspirant who keeps showing up, stage after
              stage, and finishes strong.
            </p>
            <p>
              Founded in Bengaluru, IAS Winnishers grew out of one-on-one
              mentorship work: long conversations, weekly test discussions,
              and interview coaching that treated each aspirant as a whole
              person, not a batch number. That approach is now the foundation
              of everything we do.
            </p>

            <h2>How we coach differently</h2>
            <p>
              From the day you join, one coach is responsible for your
              progress: your weekly plan, your answer sheets, your doubts, and
              your morale. They adjust the plan as your strengths change, so
              you&apos;re never following a template built for someone else.
            </p>
            <ul>
              <li>Weekly one-on-one review with your coach</li>
              <li>A living, adjustable study plan, never fixed in stone</li>
              <li>Confidence and wellbeing check-ins woven into every coaching cycle</li>
            </ul>

            <h3>What we believe</h3>
            <ul>
              <li>Every aspirant prepares differently; a good coach adjusts the plan, not the aspirant.</li>
              <li>Confidence and clarity are exam skills, not soft extras.</li>
              <li>Consistent, honest feedback beats generic study material every time.</li>
            </ul>

            <h2>Our approach to each stage</h2>
            <h3>Foundation to Winning Finish Program</h3>
            <p>NCERT-based concept building and a syllabus map tailored to how much time you actually have, carried through every stage in one continuous journey.</p>
            <h3>Prelims Mastery</h3>
            <p>Timed test series that mirror the real exam, followed by error analysis that tells you exactly what to fix.</p>
            <h3>Mains Mastery</h3>
            <p>Weekly answer writing across all GS papers and your optional subject (Geography, Polity and Psychology are especially well covered), plus essay practice reviewed line by line by your coach.</p>
            <h3>Interview Mastery</h3>
            <p>One-on-one DAF review and steady, honest conversations that build real confidence for the personality test.</p>
          </article>

          <aside className="flex flex-col gap-5">
            <div className="side-card">
              <h4 className="mb-3.5 font-display text-[15px] font-semibold">What guides every decision here</h4>
              <ul className="flex flex-col gap-3">
                {[
                  "The aspirant's wellbeing matters as much as their score.",
                  "Personalised beats generic, every time.",
                  "Honest feedback, delivered kindly, moves people forward fastest.",
                ].map((item) => (
                  <li key={item} className="flex gap-2.5 text-sm text-ink-2">
                    <span className="mt-0.5 flex h-[18px] w-[18px] flex-none items-center justify-center rounded-full bg-leaf-light text-[10px] text-leaf">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="side-card">
              <h4 className="mb-3 font-display text-[15px] font-semibold">Talk to us</h4>
              <p className="mb-4 text-sm text-ink-2">
                Have questions about the coaching model or a program? We&apos;re happy to walk you through it.
              </p>
              <Link href="/contact" className="btn btn-primary w-full">Contact Us</Link>
            </div>
          </aside>
        </div>
      </section>

      <section id="founder" className="bg-paper-2 px-6 py-16">
        <div className="mx-auto max-w-[1200px] text-center">
          <span className="eyebrow justify-center">The Founder</span>
          <h2 className="mt-3.5 font-display text-3xl font-semibold md:text-[42px]">
            Meet the founder
          </h2>
          <div className="mx-auto mt-10 grid max-w-[1000px] items-start gap-8 rounded-lg2 border border-line bg-white p-7 text-left md:grid-cols-[240px_1fr] md:gap-10 md:p-10">
            <Image
              src="/team/vinay-kumar.jpg"
              alt="Vinay Kumar Rajgopal"
              width={480}
              height={480}
              className="mx-auto h-[200px] w-[200px] rounded-2xl object-cover md:h-[240px] md:w-[240px]"
            />
            <div>
              <h3 className="font-display text-2xl font-semibold">Vinay Kumar Rajgopal</h3>
              <p className="mb-4 mt-1 text-[13.5px] font-bold text-coral-dark">
                Founder &amp; Academic Director, IAS Winnishers
              </p>
              <div className="flex flex-col gap-3.5 text-[15px] leading-relaxed text-ink-2">
                <p>
                  Vinay Kumar Rajgopal is an Author, Speaker and High impact
                  personal transformation coach.
                </p>
                <p>
                  As a Master NLP practitioner and a Peak Performance IAS Mentor
                  and Coach, his expertise stems out of his 21 years of
                  experience of guiding and training thousands of IAS Aspirants
                  to excellence in civil service exam. His mission is to build
                  IAS aspirants into conscious, knowledgeable and principle
                  centered human beings who can be great assets to the pool of
                  country’s top notch administrative leadership. As the founder
                  and academic director of IAS Winnishers, he is engaged in
                  nurturing brilliant pedagogy and competent coaches who
                  facilitate the preparation of students in a highly
                  methodical and organic way.
                </p>
                <p>
                  As a soft skill trainer for more than a decade now and NLP
                  coach with international exposure along with his ongoing
                  research on neuroscience and positive psychology, he is an
                  interview guidance specialist.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-16">
        <div className="mx-auto max-w-[1200px]">
          <div className="flex flex-wrap items-center justify-between gap-6 rounded-lg2 bg-white p-8 border border-line md:p-12">
            <div>
              <h2 className="font-display text-2xl font-semibold text-ink md:text-[30px]">
                Curious how a coach would work with you specifically?
              </h2>
              <p className="mt-2 text-ink-2">Book a free counselling call and find out. No obligation.</p>
            </div>
            <Link href="/contact#counselling" className="btn btn-primary">Book Free Counselling</Link>
          </div>
        </div>
      </section>
    </>
  );
}
