import Link from "next/link";
import PageHero from "@/components/PageHero";
import LeadForm from "@/components/LeadForm";
import { posts } from "@/content/blog-posts";

export const metadata = {
  title: "UPSC Preparation Blog",
  description:
    "Practical, honest articles on UPSC strategy, answer writing, current affairs and staying steady through a multi-year IAS preparation journey.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  return (
    <>
      <PageHero
        crumb="Blog"
        eyebrow="The IAS Winnishers Blog"
        title="Practical writing for a long, honest journey"
        description="Strategy, answer writing, current affairs and the everyday realities of multi-year UPSC preparation — written to actually help, not to fill space."
      />

      <section className="bg-white px-6 py-16">
        <div className="mx-auto grid max-w-[1200px] gap-6 sm:grid-cols-2 md:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="overflow-hidden rounded-md2 border border-line bg-white transition-all hover:-translate-y-1.5 hover:shadow-soft"
            >
              <div className="flex h-[170px] items-center justify-center bg-gradient-to-br from-marigold to-coral p-4 text-center font-display text-sm font-semibold text-white/90">
                {post.title.split(":")[0]}
              </div>
              <div className="p-6">
                <span className="text-[11.5px] font-bold uppercase tracking-wide text-coral-dark">{post.category}</span>
                <h3 className="mt-2.5 font-display text-[17.5px] font-semibold leading-snug">{post.title}</h3>
                <div className="mt-3.5 text-xs text-ink-2">{post.readTime} · {post.category}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-paper-2 px-6 py-16 text-center">
        <div className="mx-auto max-w-[640px]">
          <span className="eyebrow justify-center">Stay Updated</span>
          <h2 className="mt-3.5 font-display text-2xl font-semibold md:text-[30px]">Get one useful UPSC email a week</h2>
          <p className="mt-3.5 text-ink-2">Strategy notes, current affairs digests and study tips — no noise, unsubscribe anytime.</p>
          <div className="mt-6 flex justify-center">
            <div className="w-full max-w-[440px]">
              <LeadForm buttonLabel="Subscribe" source="blog-newsletter" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
