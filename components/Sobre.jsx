"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Reveal from "./Reveal";

gsap.registerPlugin(ScrollTrigger);

export default function Sobre() {
  const photoRef = useRef(null);

  useEffect(() => {
    const el = photoRef.current;
    if (!el) return;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const tween = gsap.fromTo(
      el,
      { y: -24 },
      {
        y: 24,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      }
    );

    return () => {
      tween.kill();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === el) st.kill();
      });
    };
  }, []);

  return (
    <section className="mx-auto max-w-5xl px-6 py-20">
      <div className="grid grid-cols-1 items-center gap-14 md:grid-cols-[0.9fr_1.1fr]">
        <Reveal className="mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-lg shadow-[0_30px_60px_-30px_rgba(28,58,46,0.35)] md:mx-0">
          <div ref={photoRef} className="relative -top-6 h-[calc(100%+48px)]">
            <Image
              src="/img/fer-retrato-bandeja.jpg"
              alt="Fer Soares segurando uma bandeja com doces finos variados"
              fill
              sizes="(max-width: 768px) 90vw, 400px"
              className="object-cover"
            />
          </div>
        </Reveal>

        <Reveal className="text-center md:text-left">
          <h2 className="text-[clamp(1.8rem,4vw,2.4rem)] font-semibold uppercase tracking-[0.08em] text-verde">
            Sobre
          </h2>
          <div className="mx-auto mt-4 mb-8 h-px w-12 bg-dourado md:mx-0" />
          <p className="text-[1.05rem]">
            A Fer Soares cria doces finos e personalizados para tornar cada
            celebração única — de casamentos a aniversários, festas e
            comemorações de todo tipo. Cada encomenda é pensada sob medida
            para o evento e o gosto de quem pede.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
