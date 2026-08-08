import Link from "next/link";
import { notFound } from "next/navigation";
import { posts, getPostBySlug } from "@/content/blog-posts";

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }) {
  const post = getPostBySlug(params.slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
  };
}

function Block({ block }) {
  if (block.type === "h2") {
    return <h2>{block.text}</h2>;
  }
  if (block.type === "h3") {
    return <h3>{block.text}</h3>;
  }
  if (block.type === "ul") {
    return (
      <ul>
        {block.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    );
  }
  return <p>{block.text}</p>;
}

export default function BlogPostPage({ params }) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  const related = posts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <>
      <section className="border-b border-line px-6 py-14">
        <div className="mx-auto max-w-[1200px]">
          <div className="mb-3.5 text-[13.5px] text-ink-2">
            <Link href="/" className="hover:text-coral">Home</Link> / <Link href="/blog" className="hover:text-coral">Blog</Link> / {post.category}
          </div>
          <span className="eyebrow">{post.category} · {post.readTime}</span>
          <h1 className="mt-3.5 font-display text-[28px] font-semibold leading-tight md:text-[40px]">
            {post.title}
          </h1>
        </div>
      </section>

      <section className="bg-white px-6 py-16">
        <div className="mx-auto grid max-w-[1200px] gap-12 md:grid-cols-[2fr_1fr]">
          <article className="prose-content">
            {post.body.map((block, i) => (
              <Block key={i} block={block} />
            ))}
          </article>

          <aside className="flex flex-col gap-5">
            <div className="side-card">
              <h4 className="mb-3.5 font-display text-[15px] font-semibold">Free resources to get moving</h4>
              <p className="mb-4 text-sm text-ink-2">An NCERT booklist, topic-mapped PYQs, and a full syllabus map — all free.</p>
              <Link href="/resources" className="btn btn-primary w-full !py-2.5 text-sm">Browse Free Resources</Link>
            </div>
            {post.sidebarCta && (
              <div className="side-card">
                <h4 className="mb-3.5 font-display text-[15px] font-semibold">{post.sidebarCta.title}</h4>
                <p className="mb-4 text-sm text-ink-2">{post.sidebarCta.body}</p>
                <Link href={post.sidebarCta.href} className="btn btn-ghost w-full !py-2.5 text-sm">
                  {post.sidebarCta.label}
                </Link>
              </div>
            )}
          </aside>
        </div>
      </section>

      <section className="bg-paper-2 px-6 py-16">
        <div className="mx-auto max-w-[1200px]">
          <span className="eyebrow">Keep Reading</span>
          <h2 className="mt-3.5 mb-8 font-display text-2xl font-semibold md:text-[30px]">More from the blog</h2>
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {related.map((p) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="overflow-hidden rounded-md2 border border-line bg-white transition-all hover:-translate-y-1.5 hover:shadow-soft"
              >
                <div className="flex h-[140px] items-center justify-center bg-gradient-to-br from-marigold to-coral p-4 text-center text-sm font-semibold text-white/90">
                  {p.title.split(":")[0]}
                </div>
                <div className="p-5">
                  <span className="text-[11px] font-bold uppercase text-coral-dark">{p.category}</span>
                  <h3 className="mt-2 font-display text-[15px] font-semibold leading-snug">{p.title}</h3>
                  <div className="mt-2.5 text-xs text-ink-2">{p.readTime}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
