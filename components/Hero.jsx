"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import RevealText from "./RevealText";
import { SITE, waLink } from "@/lib/data";

export default function Hero() {
  const glowRef = useRef(null);
  const emblemRef = useRef(null);
  const btnRef = useRef(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced) {
      gsap.set([glowRef.current, emblemRef.current, btnRef.current], {
        opacity: 1,
        scale: 1,
        y: 0,
        filter: "blur(0px)",
      });
      return;
    }

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.fromTo(
      glowRef.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 2.2, ease: "power2.out" },
      0.1
    ).fromTo(
      emblemRef.current,
      { opacity: 0, y: 18, filter: "blur(8px)" },
      { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8 },
      0.1
    ).fromTo(
      btnRef.current,
      { opacity: 0, y: 18, filter: "blur(8px)" },
      { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8 },
      0.85
    );

    return () => tl.kill();
  }, []);

  return (
    <header className="relative overflow-hidden bg-verde px-6 pb-24 pt-28 text-center text-creme">
      <div
        ref={glowRef}
        className="pointer-events-none absolute left-1/2 top-[46%] h-[480px] w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 blur-[40px]"
        style={{
          background:
            "radial-gradient(circle, rgba(201,164,104,0.35), transparent 70%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.4'/%3E%3C/svg%3E\")",
        }}
      />

      <div className="relative z-10 mx-auto flex max-w-xl flex-col items-center">
        <div
          ref={emblemRef}
          className="mb-7 flex h-16 w-16 items-center justify-center rounded-full border border-dourado"
        >
          <span className="text-2xl text-dourado">❈</span>
        </div>

        <RevealText
          as="h1"
          text={SITE.nome.toUpperCase()}
          mode="char"
          delay={0.25}
          className="font-semibold uppercase tracking-[0.16em] text-dourado text-[clamp(2.4rem,6vw,4rem)]"
        />

        <RevealText
          as="p"
          text={SITE.tagline}
          mode="word"
          delay={0.55}
          className="mt-2 block text-sm uppercase tracking-[0.28em] text-dourado/85"
        />

        <RevealText
          as="p"
          text="Doces personalizados para casamentos, aniversários, festas em geral e comemorações — feitos sob medida pra cada ocasião."
          mode="word"
          delay={0.7}
          className="mx-auto mt-8 mb-10 block max-w-md text-[1.05rem] text-creme/90"
        />

        <a
          ref={btnRef}
          href={waLink()}
          target="_blank"
          rel="noopener"
          className="inline-block rounded-md bg-dourado px-7 py-3 text-sm font-medium uppercase tracking-[0.06em] text-verde shadow-[0_6px_16px_-10px_rgba(201,164,104,0.6)] transition-transform duration-200 ease-out hover:-translate-y-0.5 active:scale-95"
        >
          Peça pelo WhatsApp
        </a>
      </div>
    </header>
  );
}
