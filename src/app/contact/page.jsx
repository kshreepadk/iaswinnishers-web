import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";

export const metadata = {
  title: "Contact & Free Counselling",
  description:
    "Book a free counselling call with an IAS Winnishers coach or get in touch with our Bengaluru-based coaching team.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        crumb="Contact"
        eyebrow="Let's Talk"
        title="Start with one honest conversation"
        description="Book a free counselling call, or reach out directly — whichever feels right for where you are."
      />

      <section id="counselling" className="bg-white px-6 py-16">
        <div className="mx-auto grid max-w-[1200px] gap-10 md:grid-cols-[1.3fr_1fr]">
          <div className="rounded-lg2 border border-line bg-white p-8 md:p-9">
            <h2 className="mb-2 font-display text-2xl font-semibold">Book a Free Counselling Call</h2>
            <p className="mb-6 text-ink-2">
              20 minutes with a coach — where you stand, what&apos;s realistic,
              and what your first month could look like.
            </p>
            <ContactForm />
          </div>

          <aside className="flex flex-col gap-5">
            <div className="side-card">
              <h4 className="mb-3.5 font-display text-[15px] font-semibold">Reach us directly</h4>
              <ul className="flex flex-col gap-3 text-sm text-ink-2">
                <li>+91 98862 73325 · +91 99165 27480</li>
                <li>vinayenterprising@gmail.com</li>
                <li>Bengaluru, Karnataka</li>
              </ul>
            </div>
            <div className="h-[300px] overflow-hidden rounded-md2 border border-line">
              <iframe
                title="IAS Winnishers location map"
                loading="lazy"
                src="https://www.google.com/maps?q=Bengaluru,Karnataka&output=embed"
                className="h-full w-full border-0"
              />
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
