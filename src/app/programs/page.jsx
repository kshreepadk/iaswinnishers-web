import Link from "next/link";
import PageHero from "@/components/PageHero";

export const metadata = {
  title: "UPSC Coaching Programs",
  description:
    "Explore IAS Winnishers' UPSC coaching programs — the Foundation to Winning Finish Program, Prelims Mastery, Mains Mastery, Geography/Economy/Current Affairs Made Easy, Interview Guidance, and our Reassess & Restart Program for repeat attempts — each with a dedicated personal coach.",
  alternates: { canonical: "/programs" },
};

function ProgramSection({ id, reverse, bg, eyebrow, title, description, bullets, side }) {
  return (
    <section id={id} className={`px-6 py-16 ${bg}`}>
      <div className="mx-auto grid max-w-[1200px] items-center gap-10 md:grid-cols-2">
        <div className={reverse ? "order-2 md:order-1" : "order-2"}>
          <div className="card">
            {side}
          </div>
        </div>
        <div className={reverse ? "order-1 md:order-2" : "order-1"}>
          <span className="eyebrow">{eyebrow}</span>
          <h2 className="mt-3.5 font-display text-2xl font-semibold md:text-[30px]">{title}</h2>
          <p className="mt-3.5 text-base text-ink-2">{description}</p>
          <ul className="prose-content mt-5">
            {bullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
          <Link href="/contact#counselling" className="btn btn-primary mt-3">
            Ask About This Program
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function ProgramsPage() {
  return (
    <>
      <PageHero
        crumb="Programs"
        eyebrow="Programs"
        title="A program for wherever you are in the journey"
        description="Every program below comes with a dedicated coach, a personalised plan and full access to the IAS Winnishers learning dashboard on web and mobile."
      />

      <ProgramSection
        id="foundation-to-finish"
        reverse
        bg="bg-white"
        eyebrow="Complete Journey · 18–22 Months"
        title="Foundation to Winning Finish Program"
        description={
          <>
            It&apos;s our most complete offering, and the name says exactly
            what it is: an 18–22 month journey that walks with you from your
            <strong> first NCERT to your final interview</strong> — Prelims,
            Mains and Interview, all in one continuous program with one coach
            throughout.
          </>
        }
        bullets={[
          "Full coverage of Prelims, Mains and Interview in one continuous program",
          "A personalised roadmap that evolves as you move through each stage",
          "Weekly one-on-one reviews with your dedicated coach throughout",
          "Built-in confidence coaching, so you finish preparation feeling ready",
        ]}
        side={
          <>
            <span className="mb-2 inline-block rounded-full bg-leaf-light px-3 py-1 text-[11.5px] font-bold uppercase text-leaf">Batch forming now</span>
            <h3 className="mb-1.5 font-display text-base font-semibold">Who it&apos;s for</h3>
            <p className="mb-4 text-sm text-ink-2">One continuous, fully supported journey from day one to interview day — without switching programs or coaches.</p>
            <h3 className="mb-1.5 font-display text-base font-semibold">Duration</h3>
            <p className="text-sm text-ink-2">18–22 months, personalised to your starting point.</p>
          </>
        }
      />

      <ProgramSection
        id="reassess-restart"
        bg="bg-white"
        eyebrow="For Repeat Attempts"
        title="Reassess & Restart Program"
        description="Not clearing an attempt doesn't mean starting over from zero — it means figuring out, honestly, what actually needs to change. This program is for aspirants regrouping after a result, especially the stretch right after Prelims results in June, who need a coach to help them see clearly where to restart rather than guessing on their own."
        bullets={[
          "An honest review of your last attempt — what worked, what didn't, and why",
          "A fresh study plan built from where you actually are, not from scratch",
          "Help deciding whether to revisit Foundation, focus on Prelims, or move straight to Mains prep",
          "The same steady, one-on-one coaching model as every other program here",
        ]}
        side={
          <>
            <span className="mb-2 inline-block rounded-full bg-leaf-light px-3 py-1 text-[11.5px] font-bold uppercase text-leaf">Rolling admission</span>
            <h3 className="mb-1.5 font-display text-base font-semibold">Who it&apos;s for</h3>
            <p className="mb-4 text-sm text-ink-2">Aspirants who've attempted before and need an honest, structured reset — not another generic restart.</p>
            <h3 className="mb-1.5 font-display text-base font-semibold">Best time to start</h3>
            <p className="text-sm text-ink-2">Right after any result — Prelims, Mains, or Interview — while it&apos;s still fresh.</p>
          </>
        }
      />

      <ProgramSection
        id="prelims-mastery"
        bg="bg-paper-2"
        eyebrow="Objective Round · Prelims"
        title="Prelims Mastery Program"
        description="Prelims rewards accuracy under pressure. This program mirrors the actual exam's difficulty and pacing, and every test is followed by a breakdown of exactly which concepts and question types are costing you marks."
        bullets={[
          "Timed, full-length mock tests on the real exam pattern",
          "Topic-wise and difficulty-wise error analysis",
          "CSAT-focused practice for aspirants who need it",
          "Coach review call after every 3 tests",
        ]}
        side={
          <>
            <span className="mb-2 inline-block rounded-full bg-leaf-light px-3 py-1 text-[11.5px] font-bold uppercase text-leaf">Rolling admission</span>
            <h3 className="mb-1.5 font-display text-base font-semibold">Format</h3>
            <p className="mb-4 text-sm text-ink-2">Full-length + sectional tests with instant scoring and topic-wise error analysis.</p>
            <h3 className="mb-1.5 font-display text-base font-semibold">Best paired with</h3>
            <p className="text-sm text-ink-2">Foundation to Winning Finish Program, or standalone for revision-stage aspirants.</p>
          </>
        }
      />

      <ProgramSection
        id="mains-mastery"
        reverse
        bg="bg-white"
        eyebrow="Descriptive Round · Mains"
        title="Mains Mastery Program"
        description="Mains is won or lost on the page. You'll write weekly answers under exam conditions and get detailed, line-by-line feedback from your coach — across all four GS papers, the Essay paper, and your optional subject."
        bullets={[
          "Weekly GS answer writing across GS I–IV",
          "Essay practice with structured feedback",
          "Dedicated optional subject coaching — Geography, Polity, and Psychology are especially well covered",
          "Full-length Mains test series closer to the exam",
        ]}
        side={
          <>
            <span className="mb-2 inline-block rounded-full bg-leaf-light px-3 py-1 text-[11.5px] font-bold uppercase text-leaf">Rolling admission</span>
            <h3 className="mb-1.5 font-display text-base font-semibold">Optional subjects offered</h3>
            <p className="mb-4 text-sm text-ink-2">Geography, Polity, and Psychology are covered in depth — ask your coach if yours isn&apos;t listed.</p>
            <h3 className="mb-1.5 font-display text-base font-semibold">Coach feedback turnaround</h3>
            <p className="text-sm text-ink-2">[Add your turnaround time, e.g. within 48 hours]</p>
          </>
        }
      />

      <ProgramSection
        id="geography"
        bg="bg-paper-2"
        eyebrow="Seasonal · Subject Program"
        title="Geography Made Easy Program"
        description={
          <>
            Geography intimidates a lot of aspirants — this program is built to
            fix that. Held annually in the <strong>last week of December</strong>,
            we break the subject down with maps, diagrams and memory techniques
            instead of dense text.
          </>
        }
        bullets={[
          "Map-based teaching for Physical and Indian Geography",
          "World Geography simplified with visual comparisons",
          "Direct linkages to current affairs and recent events",
          "Practice questions after every topic, reviewed by your coach",
        ]}
        side={
          <>
            <span className="mb-2 inline-block rounded-full bg-leaf-light px-3 py-1 text-[11.5px] font-bold uppercase text-leaf">Seasonal · Last week of December</span>
            <h3 className="mb-1.5 font-display text-base font-semibold">Format</h3>
            <p className="mb-4 text-sm text-ink-2">Visual, map-first sessions covering Physical, Indian and World Geography.</p>
            <h3 className="mb-1.5 font-display text-base font-semibold">Can&apos;t attend live?</h3>
            <p className="text-sm text-ink-2">Recordings are provided if you need them.</p>
          </>
        }
      />

      <ProgramSection
        id="economy"
        reverse
        bg="bg-white"
        eyebrow="Seasonal · Subject Program"
        title="Economy Made Easy Program"
        description={
          <>
            You don&apos;t need a commerce background to master Economy for
            UPSC. Held annually in the <strong>first week of February</strong>,
            this program explains the Budget, monetary policy, the Economic
            Survey and growth indicators in plain language.
          </>
        }
        bullets={[
          "Core concepts explained without jargon, from first principles",
          "Budget and Economic Survey walkthroughs every year",
          "Concepts linked directly to that week's current affairs",
          "Regular quizzes to check what's actually sticking",
        ]}
        side={
          <>
            <span className="mb-2 inline-block rounded-full bg-leaf-light px-3 py-1 text-[11.5px] font-bold uppercase text-leaf">Seasonal · First week of February</span>
            <h3 className="mb-1.5 font-display text-base font-semibold">Who it&apos;s for</h3>
            <p className="mb-4 text-sm text-ink-2">Aspirants from any background who find Economy the most confusing part of the syllabus.</p>
            <h3 className="mb-1.5 font-display text-base font-semibold">Can&apos;t attend live?</h3>
            <p className="text-sm text-ink-2">Recordings are provided if you need them.</p>
          </>
        }
      />

      <ProgramSection
        id="current-affairs"
        bg="bg-paper-2"
        eyebrow="Seasonal · Subject Program"
        title="Current Affairs Made Easy Program"
        description="Current affairs is the part of the syllabus that never stops growing — so we make it manageable instead of overwhelming. Offered in structured seasonal batches through the year, with concise briefings and static-syllabus linkages."
        bullets={[
          "Concise current affairs briefings, kept short and exam-focused",
          "Compilations for structured revision",
          "Explicit linkages to static syllabus topics",
          "Quizzes to test retention, not just reading",
        ]}
        side={
          <>
            <span className="mb-2 inline-block rounded-full bg-leaf-light px-3 py-1 text-[11.5px] font-bold uppercase text-leaf">Seasonal</span>
            <h3 className="mb-1.5 font-display text-base font-semibold">Format</h3>
            <p className="mb-4 text-sm text-ink-2">Digestible briefings and a compilation covering the season, with retention-focused quizzes.</p>
            <h3 className="mb-1.5 font-display text-base font-semibold">Best paired with</h3>
            <p className="text-sm text-ink-2">Every other program — it runs alongside your entire preparation.</p>
          </>
        }
      />

      <ProgramSection
        id="interview"
        reverse
        bg="bg-white"
        eyebrow="Personality Test · Interview"
        title="Interview Guidance"
        description="The interview tests composure as much as knowledge. We build that composure first — through one-on-one conversations grounded in your own DAF and background — rather than dropping you into an unfamiliar panel and hoping confidence follows."
        bullets={[
          "One-on-one DAF review, question by question, with your coach",
          "Steady, ongoing confidence-building conversations",
          "Current affairs and opinion-building sessions",
          "Personalised feedback as your preparation progresses",
        ]}
        side={
          <>
            <span className="mb-2 inline-block rounded-full bg-leaf-light px-3 py-1 text-[11.5px] font-bold uppercase text-leaf">Seasonal, post-results</span>
            <h3 className="mb-1.5 font-display text-base font-semibold">Format</h3>
            <p className="mb-4 text-sm text-ink-2">One-on-one sessions that build genuine confidence first, grounded in your own DAF.</p>
            <h3 className="mb-1.5 font-display text-base font-semibold">Also includes</h3>
            <p className="text-sm text-ink-2">Personality-test preparation and steady confidence coaching.</p>
          </>
        }
      />

      <section className="bg-paper-2 px-6 py-16">
        <div className="mx-auto max-w-[1200px]">
          <div className="flex flex-wrap items-center justify-between gap-6 rounded-lg2 border border-line bg-white p-8 md:p-12">
            <div>
              <h2 className="font-display text-2xl font-semibold text-ink md:text-[30px]">
                Not sure which program fits you?
              </h2>
              <p className="mt-2 text-ink-2">Book a free counselling call — a coach will help you pick the right starting point.</p>
            </div>
            <Link href="/contact#counselling" className="btn btn-primary">Book Free Counselling</Link>
          </div>
        </div>
      </section>
    </>
  );
}
