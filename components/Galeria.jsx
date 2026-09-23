"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Reveal from "./Reveal";
import { galeria } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

const AREAS = ["a", "b", "c", "d"];

function GaleriaItem({ item, area, index }) {
  const imgWrapRef = useRef(null);

  useEffect(() => {
    const el = imgWrapRef.current;
    if (!el) return;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const distance = index % 2 === 0 ? 18 : -18;
    const tween = gsap.fromTo(
      el,
      { y: -distance },
      {
        y: distance,
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
  }, [index]);

  return (
    <Reveal
      delay={index * 0.08}
      className="group relative overflow-hidden rounded-md"
      as="figure"
      style={{ gridArea: area }}
    >
      <div
        ref={imgWrapRef}
        className="relative -top-4 h-[calc(100%+32px)] w-full"
      >
        <Image
          src={item.src}
          alt={item.alt}
          fill
          sizes="(max-width: 640px) 100vw, 33vw"
          className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.07]"
        />
      </div>
      <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 to-transparent px-4 py-3 text-xs uppercase tracking-[0.08em] text-creme">
        {item.label}
      </figcaption>
    </Reveal>
  );
}

export default function Galeria() {
  return (
    <section className="bg-marrom px-6 py-20 text-creme">
      <Reveal className="text-center">
        <h2 className="text-[clamp(1.8rem,4vw,2.4rem)] font-semibold uppercase tracking-[0.08em]">
          O que fazemos
        </h2>
        <div className="mx-auto mt-4 mb-4 h-px w-12 bg-dourado" />
        <p className="mx-auto mb-10 max-w-md text-sm opacity-85">
          Um gostinho do que já saiu daqui — confira mais no Instagram
          @fersoaresdocesfinos.
        </p>
      </Reveal>

      <div
        className="mx-auto grid max-w-5xl gap-4 [grid-template-areas:'a_b_d'_'a_c_d'] grid-cols-3 [grid-template-rows:repeat(2,220px)] max-md:grid-cols-1 max-md:[grid-template-areas:'a'_'b'_'c'_'d'] max-md:[grid-template-rows:repeat(4,220px)]"
      >
        {galeria.map((item, i) => (
          <GaleriaItem key={item.src} item={item} area={AREAS[i]} index={i} />
        ))}
      </div>
    </section>
  );
}
