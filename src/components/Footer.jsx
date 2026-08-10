import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-ink py-16 text-white/70">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="grid grid-cols-1 gap-10 border-b border-white/10 pb-11 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <Link href="/" className="inline-block">
              <span className="inline-flex items-center rounded-[10px] bg-paper px-4 py-2.5">
                <Image
                  src="/logo.png"
                  alt="IAS Winnishers logo"
                  width={619}
                  height={100}
                  className="h-[34px] w-auto"
                />
              </span>
            </Link>
            <p className="mt-4 max-w-[32ch] text-sm leading-relaxed">
              Personalised UPSC coaching from Bengaluru — one dedicated coach for
              every aspirant, from your first day to your winning finish.
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">
              Explore
            </h4>
            <ul className="flex flex-col gap-3 text-[14.5px]">
              <li><Link href="/about" className="hover:text-marigold">About Us</Link></li>
              <li><Link href="/programs" className="hover:text-marigold">Programs</Link></li>
              <li><Link href="/blog" className="hover:text-marigold">Blog</Link></li>
              <li><Link href="/contact" className="hover:text-marigold">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">
              Programs
            </h4>
            <ul className="flex flex-col gap-3 text-[14.5px]">
              <li><Link href="/programs#foundation-to-finish" className="hover:text-marigold">Foundation to Winning Finish Program</Link></li>
              <li><Link href="/programs#prelims-mastery" className="hover:text-marigold">Prelims Mastery Program</Link></li>
              <li><Link href="/programs#mains-mastery" className="hover:text-marigold">Mains Mastery Program</Link></li>
              <li><Link href="/programs#geography" className="hover:text-marigold">Geography Made Easy</Link></li>
              <li><Link href="/programs#economy" className="hover:text-marigold">Economy Made Easy</Link></li>
              <li><Link href="/programs#current-affairs" className="hover:text-marigold">Current Affairs Made Easy</Link></li>
              <li><Link href="/programs#interview" className="hover:text-marigold">Interview Guidance</Link></li>
              <li><Link href="/programs#reassess-restart" className="hover:text-marigold">Reassess &amp; Restart Program</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">
              Get in Touch
            </h4>
            <ul className="flex flex-col gap-3 text-[14.5px]">
              <li><a href="tel:+919886273325" className="hover:text-marigold">+91 98862 73325</a></li>
              <li><a href="tel:+919916527480" className="hover:text-marigold">+91 99165 27480</a></li>
              <li><a href="https://wa.me/919886273325" target="_blank" rel="noopener noreferrer" className="hover:text-marigold">WhatsApp Us</a></li>
              <li><a href="mailto:vinayenterprising@gmail.com" className="hover:text-marigold">vinayenterprising@gmail.com</a></li>
              <li><Link href="/contact" className="hover:text-marigold">Bengaluru, Karnataka</Link></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3.5 pt-6 text-[13px]">
          <span>© {new Date().getFullYear()} IAS Winnishers. All rights reserved.</span>
          <div className="flex gap-3.5">
            <a href="https://www.facebook.com/iaswinnisher/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-coral">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M13.5 21v-7.5h2.52l.38-3H13.5V8.48c0-.87.24-1.46 1.5-1.46h1.6V4.35C16.32 4.24 15.36 4.13 14.24 4.13c-2.35 0-3.95 1.43-3.95 4.06v2.36H7.75v3H10.29V21h3.21z" />
              </svg>
            </a>
            <a href="https://www.instagram.com/iaswinnishers/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-coral">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.3" cy="6.7" r="1" fill="currentColor" stroke="none" />
              </svg>
            </a>
            <a href="https://www.youtube.com/@vinaykumarr9273" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-coral">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8zM9.6 15.6V8.4L15.8 12z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
