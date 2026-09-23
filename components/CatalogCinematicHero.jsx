"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import RevealText from "./RevealText";

gsap.registerPlugin(ScrollTrigger);

/**
 * Static full-bleed hero for /cardapio — no zoom/pan on the photo. The
 * handoff to the next section is an actual scroll-driven animation: a
 * cream curtain rises from the bottom, tied to scroll progress through the
 * hero's own height, instead of a pre-painted CSS gradient.
 */
export default function CatalogCinematicHero() {
  const sectionRef = useRef(null);
  const curtainRef = useRef(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced) {
      gsap.set(curtainRef.current, { yPercent: 55 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(curtainRef.current, { yPercent: 100 });
      gsap.to(curtainRef.current, {
        yPercent: 0,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "bottom bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative h-screen w-full overflow-hidden bg-verde">
      <Image
        src="/img/brigadeiro-hero.png"
        alt="Brigadeiro gourmet da Fer Soares em bowl verde com detalhe dourado"
        fill
        sizes="100vw"
        quality={90}
        className="object-cover [filter:brightness(0.78)_blur(0.4px)] scale-[1.01]"
        priority
      />

      {/* Top scrim — keeps the title legible over the photo */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[52%]"
        style={{
          background:
            "linear-gradient(to bottom, rgba(8,16,13,0.9), rgba(8,16,13,0.48) 55%, transparent 100%)",
        }}
      />

      {/* Vignette — darkens the edges, keeps focus on the product at center */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 55%, transparent 32%, rgba(0,0,0,0.5) 100%)",
        }}
      />

      <div className="absolute inset-x-0 top-[14%] z-30 px-6 text-center">
        <RevealText
          as="h1"
          text="CARDÁPIO"
          mode="char"
          className="font-heading font-semibold uppercase tracking-[0.1em] text-dourado text-[clamp(2.4rem,7vw,4.5rem)] [text-shadow:0_1px_3px_rgba(0,0,0,0.9),0_6px_28px_rgba(0,0,0,0.7)]"
        />
        <RevealText
          as="p"
          text="Preços de referência — a disponibilidade da sua data é sempre confirmada antes, já que a Fer atende por agenda de eventos."
          mode="word"
          delay={0.35}
          className="mx-auto mt-5 block max-w-lg text-creme [text-shadow:0_1px_3px_rgba(0,0,0,0.9),0_4px_20px_rgba(0,0,0,0.65)]"
        />
      </div>

      {/* Curtain — rises from the bottom as the hero scrolls out, animated by scroll position */}
      <div
        ref={curtainRef}
        className="pointer-events-none absolute inset-x-0 bottom-0 z-40 h-56 rounded-t-[2.5rem] bg-creme shadow-[0_-24px_50px_-24px_rgba(0,0,0,0.35)]"
      />
    </section>
  );
}
