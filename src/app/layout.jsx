import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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
          <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-3 px-6 py-2">
            <div className="flex flex-wrap gap-4">
              <a href="tel:+919886273325" className="opacity-90 hover:opacity-100 hover:text-marigold">
                +91 98862 73325
              </a>
              <a href="mailto:vinayenterprising@gmail.com" className="opacity-90 hover:opacity-100 hover:text-marigold">
                vinayenterprising@gmail.com
              </a>
            </div>
            <div className="flex gap-3.5">
              <a href="https://www.facebook.com/iaswinnisher/" target="_blank" rel="noopener noreferrer" className="opacity-90 hover:opacity-100 hover:text-marigold">Facebook</a>
              <a href="https://www.instagram.com/iaswinnishers/" target="_blank" rel="noopener noreferrer" className="opacity-90 hover:opacity-100 hover:text-marigold">Instagram</a>
            </div>
          </div>
        </div>

        <Header />

        <main>{children}</main>

        <Footer />
      </body>
    </html>
  );
}
