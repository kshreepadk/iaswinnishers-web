import Link from "next/link";
import PageHero from "@/components/PageHero";

export const metadata = {
  title: "Career Counselling",
  description:
    "IAS Winnishers offers dedicated career counselling alongside UPSC coaching, grounded in a psychometric assessment — because preparation time should never feel wasted.",
  alternates: { canonical: "/career-counselling" },
};

export default function CareerCounsellingPage() {
  return (
    <>
      <PageHero
        crumb="Career Counselling"
        eyebrow="Plan B, Taken Seriously"
        title="Preparing for IAS shouldn't mean putting the rest of your career on hold."
        description="Every aspirant deserves a real Plan B — not as a sign of giving up on Plan A, but because time spent preparing is time that should count either way. That's why career counselling sits alongside your exam coaching, not after it — grounded in a psychometric assessment that maps your actual interests and aptitudes, not just your degree."
      />

      <section className="bg-white px-6 py-16">
        <div className="mx-auto grid max-w-[1200px] gap-12 md:grid-cols-[2fr_1fr]">
          <article className="prose-content">
            <h2 className="!mt-0">Why we built this in</h2>
            <p>
              Years of UPSC preparation are years of your career too. Aspirants
              who never map out an alternative path often feel every attempt is
              all-or-nothing — and that pressure makes the exam itself harder,
              not easier. A clear Plan B doesn&apos;t compete with your UPSC
              attempt; it takes the panic out of it.
            </p>
            <h3>What career counselling covers</h3>
            <ul>
              <li>A psychometric assessment that maps your genuine interests, aptitudes, and personality fit — not just your degree on paper.</li>
              <li>Mapping your existing skills and degree to real alternative career paths.</li>
              <li>Guidance on further studies, competitive exams, or private-sector roles that fit your timeline.</li>
              <li>Keeping your options current, so a change in direction is a decision — not a scramble.</li>
              <li>A written summary of your assessment results and recommended paths, so you have something concrete to refer back to.</li>
            </ul>
          </article>

          <aside className="flex flex-col gap-5">
            <div className="side-card">
              <span className="eyebrow">Start Here</span>
              <h4 className="mt-3.5 mb-2.5 font-display text-[15px] font-semibold">Take the Psychometric Assessment</h4>
              <p className="mb-4 text-sm text-ink-2">
                Every career counselling conversation starts with a
                psychometric assessment — a structured way to understand your
                real interests and strengths.
              </p>
              <Link href="/contact#counselling" className="btn btn-primary w-full !py-2.5 text-sm">
                Ask About the Assessment
              </Link>
            </div>
            <div className="side-card">
              <span className="eyebrow">How It Works</span>
              <h4 className="mt-3.5 mb-2.5 font-display text-[15px] font-semibold">A dedicated part of your coaching</h4>
              <p className="mb-4 text-sm text-ink-2">
                Career counselling is folded into your regular coaching
                relationship — the same coach who knows your UPSC plan can
                walk you through your Plan B.
              </p>
              <Link href="/contact#counselling" className="btn btn-primary w-full !py-2.5 text-sm">
                Ask Your Coach About It
              </Link>
            </div>
          </aside>
        </div>
      </section>

      <section className="bg-paper-2 px-6 py-16 text-center">
        <div className="mx-auto max-w-[680px]">
          <span className="eyebrow justify-center">Our Belief</span>
          <h2 className="mt-3.5 font-display text-2xl font-semibold md:text-[30px]">
            Preparation time is never wasted time.
          </h2>
          <p className="mt-3.5 text-ink-2">
            Our motto isn&apos;t just about the exam — it&apos;s about making
            sure every aspirant realises their full potential, whichever
            direction that ends up taking.
          </p>
        </div>
      </section>

      <section className="bg-white px-6 py-16">
        <div className="mx-auto max-w-[1200px]">
          <div className="flex flex-wrap items-center justify-between gap-6 rounded-lg2 bg-ink p-8 md:p-12">
            <div>
              <h2 className="font-display text-2xl font-semibold text-white md:text-[30px]">Questions first?</h2>
              <p className="mt-2 text-white/70">Ask your coach how career counselling fits your plan — on your free counselling call.</p>
            </div>
            <Link href="/contact#counselling" className="btn bg-marigold text-ink hover:bg-marigold-dark">
              Book Your Free Counselling Call
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
