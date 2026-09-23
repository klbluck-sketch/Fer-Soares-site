"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { SITE, waLink } from "@/lib/data";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 12);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`sticky top-0 z-50 flex items-center justify-between gap-4 bg-verde px-6 py-4 transition-[box-shadow,backdrop-filter] duration-300 ${
        scrolled ? "shadow-[0_10px_30px_-16px_rgba(0,0,0,0.55)] backdrop-blur-md" : ""
      }`}
    >
      <Link href="/" className="font-heading font-semibold uppercase tracking-[0.08em] text-dourado text-lg">
        {SITE.nome}
      </Link>
      <div className="flex items-center gap-5">
        <a
          href={waLink()}
          target="_blank"
          rel="noopener"
          className="rounded-md bg-dourado px-5 py-2 text-xs font-medium uppercase tracking-[0.06em] text-verde shadow-[0_6px_16px_-10px_rgba(201,164,104,0.6)] transition-transform duration-200 ease-out hover:-translate-y-0.5 active:scale-95"
        >
          WhatsApp
        </a>
      </div>
    </div>
  );
}
