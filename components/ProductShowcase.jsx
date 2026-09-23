"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ProductShowcase() {
  const sectionRef = useRef(null);
  const cardRef = useRef(null);
  const captionRef = useRef(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced) {
      gsap.set(cardRef.current, { rotateY: 0, scale: 1, opacity: 1 });
      gsap.set(captionRef.current, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(cardRef.current, { rotateY: -28, scale: 0.82, opacity: 0.5 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=140%",
          scrub: 0.6,
          pin: true,
        },
      });

      tl.to(cardRef.current, {
        rotateY: 0,
        scale: 1.08,
        opacity: 1,
        ease: "none",
      }).to(
        cardRef.current,
        { rotateY: 20, scale: 1, ease: "none" },
        ">"
      );

      gsap.fromTo(
        captionRef.current,
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 40%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex h-screen items-center justify-center overflow-hidden bg-marrom px-6"
      style={{ perspective: "1200px" }}
    >
      <div className="flex flex-col items-center">
        <div
          ref={cardRef}
          className="relative aspect-[4/5] w-[min(78vw,380px)] overflow-hidden rounded-lg shadow-[0_40px_80px_-30px_rgba(0,0,0,0.6)]"
          style={{ transformStyle: "preserve-3d" }}
        >
          <Image
            src="/img/fer-retrato-bandeja.jpg"
            alt="Bandeja com uma seleção de doces finos da Fer Soares"
            fill
            sizes="(max-width: 768px) 78vw, 380px"
            className="object-cover"
            priority={false}
          />
        </div>
        <p
          ref={captionRef}
          className="mt-8 max-w-sm text-center text-sm uppercase tracking-[0.1em] text-creme/80"
        >
          Cada doce, pensado pra sua ocasião
        </p>
      </div>
    </section>
  );
}
