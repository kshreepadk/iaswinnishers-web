import Link from "next/link";

export default function PageHero({ crumb, eyebrow, title, description, center = false }) {
  return (
    <section className={`border-b border-line px-6 pb-10 pt-7 ${center ? "text-center" : ""}`}>
      <div className={`mx-auto max-w-[1200px] ${center ? "max-w-[640px]" : ""}`}>
        {crumb && (
          <div className="mb-3.5 text-[13.5px] text-ink-2">
            <Link href="/" className="hover:text-coral">Home</Link> / {crumb}
          </div>
        )}
        <span className={`eyebrow ${center ? "justify-center" : ""}`}>{eyebrow}</span>
        <h1 className="mt-3.5 font-display text-[30px] font-semibold leading-tight md:text-[46px]">
          {title}
        </h1>
        {description && (
          <p className={`mt-3.5 max-w-[60ch] text-base text-ink-2 md:text-[16.5px] ${center ? "mx-auto" : ""}`}>
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
