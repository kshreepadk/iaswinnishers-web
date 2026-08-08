"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/programs", label: "Programs" },
  { href: "/resources", label: "Resources" },
  { href: "/career-counselling", label: "Career Counselling" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About Us" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/95">
      <nav className="mx-auto flex max-w-[1200px] items-center justify-between gap-5 px-6 py-3.5">
        <Link href="/" aria-label="IAS Winnishers home" className="flex items-center">
          <Image
            src="/logo.png"
            alt="IAS Winnishers — An Institute for Winning Finish in IAS Exam"
            width={619}
            height={100}
            priority
            className="h-11 w-auto"
          />
        </Link>

        {/* Desktop nav — hidden below md, no interactivity needed so no JS required for this part */}
        <ul className="hidden md:flex md:flex-1 md:items-center md:justify-evenly md:gap-8">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-[15px] font-semibold text-ink hover:text-coral-dark"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3.5">
          <Link
            href="/contact"
            className="hidden text-[15px] font-bold text-coral-dark hover:text-coral md:inline"
          >
            Contact
          </Link>

          {/* Hamburger button — only visible below md */}
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex flex-col gap-[5px] p-1.5 md:hidden"
          >
            <span className="block h-[2.5px] w-6 rounded bg-ink" />
            <span className="block h-[2.5px] w-6 rounded bg-ink" />
            <span className="block h-[2.5px] w-6 rounded bg-ink" />
          </button>
        </div>
      </nav>

      {/*
        Mobile drawer + backdrop.
        Built with standard Tailwind transform utilities (translate-x-full / translate-x-0)
        instead of hand-written inset/transform CSS — this is the exact pattern that avoids
        the bugs we hit in the old hand-rolled version (backdrop-filter breaking fixed
        positioning, `inset` shorthand not resolving reliably). React conditionally renders
        the backdrop entirely rather than toggling opacity, so there's no invisible
        full-screen div sitting in the DOM when closed.
      */}
      <div
        className={`fixed inset-y-0 right-0 z-[60] w-[72%] max-w-[300px] transform overflow-y-auto bg-paper px-6 pb-7 pt-[88px] shadow-[-10px_0_40px_rgba(0,0,0,0.15)] transition-transform duration-300 ease-in-out md:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <ul className="flex flex-col">
          {NAV_LINKS.map((link) => (
            <li key={link.href} className="border-b border-line">
              <Link
                href={link.href}
                onClick={() => setOpen(false)}
                className="block py-3 text-[16px] font-semibold text-ink"
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li className="pt-3">
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="block py-3 text-[16px] font-bold text-coral-dark"
            >
              Contact
            </Link>
          </li>
        </ul>
      </div>

      {open && (
        <div
          role="presentation"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-[55] bg-ink/40 md:hidden"
        />
      )}
    </header>
  );
}
