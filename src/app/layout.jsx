import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CounsellingPopup from "@/components/CounsellingPopup";
import FloatingContact from "@/components/FloatingContact";

export const metadata = {
  metadataBase: new URL("https://iaswinnishers.com"),
  title: {
    default: "IAS Winnishers | Personalised UPSC & IAS Coaching",
    template: "%s | IAS Winnishers",
  },
  description:
    "IAS Winnishers pairs every UPSC aspirant with a dedicated personal coach — structured GS classes, answer-writing, test series, interview guidance and steady mentoring, from your first day to your winning finish.",
  icons: { icon: "data:," },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <div className="bg-coral-dark text-white text-sm">
          <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-3 px-6 py-2.5">
            <div className="flex flex-wrap items-center gap-5">
              <a href="tel:+919886273325" className="flex items-center gap-1.5 opacity-90 hover:opacity-100 hover:text-marigold">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                +91 98862 73325
              </a>
              <a href="mailto:vinayenterprising@gmail.com" className="flex items-center gap-1.5 opacity-90 hover:opacity-100 hover:text-marigold">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m2 6 10 7 10-7" />
                </svg>
                <span className="hidden sm:inline">vinayenterprising@gmail.com</span>
              </a>
            </div>
            <div className="flex items-center gap-2.5">
              <a
                href="https://www.facebook.com/iaswinnisher/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15 transition-colors hover:bg-white hover:text-coral-dark"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M13.5 21v-7.5h2.52l.38-3H13.5V8.48c0-.87.24-1.46 1.5-1.46h1.6V4.35C16.32 4.24 15.36 4.13 14.24 4.13c-2.35 0-3.95 1.43-3.95 4.06v2.36H7.75v3H10.29V21h3.21z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/iaswinnishers/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15 transition-colors hover:bg-white hover:text-coral-dark"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.3" cy="6.7" r="1" fill="currentColor" stroke="none" />
                </svg>
              </a>
              <a
                href="https://www.youtube.com/@vinaykumarr9273"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15 transition-colors hover:bg-white hover:text-coral-dark"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8zM9.6 15.6V8.4L15.8 12z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <Header />

        <main>{children}</main>

        <Footer />

        <CounsellingPopup />
        <FloatingContact />

        <Analytics />
      </body>
    </html>
  );
}
