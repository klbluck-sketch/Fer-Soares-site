"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Splits text into words (default) or characters and reveals them with a
 * staggered blur/opacity/translate tween. Falls back to an instant, fully
 * visible state under prefers-reduced-motion.
 */
export default function RevealText({
  text,
  as: Tag = "span",
  mode = "word",
  className = "",
  delay = 0,
  onScroll = false,
  triggerStart = "top 82%",
}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const pieces = el.querySelectorAll(mode === "char" ? ".char" : ".word");

    if (prefersReduced) {
      gsap.set(pieces, { opacity: 1, y: 0, filter: "blur(0px)" });
      return;
    }

    gsap.set(pieces, { opacity: 0, y: "0.6em", filter: "blur(6px)" });

    const tween = gsap.to(pieces, {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      duration: mode === "char" ? 0.6 : 0.9,
      ease: "power3.out",
      stagger: mode === "char" ? 0.018 : 0.07,
      delay,
      scrollTrigger: onScroll
        ? { trigger: el, start: triggerStart, once: true }
        : undefined,
    });

    return () => {
      tween.kill();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === el) st.kill();
      });
    };
  }, [mode, delay, onScroll, triggerStart]);

  const words = text.split(" ");

  return (
    <Tag ref={ref} className={className} aria-label={text}>
      {words.map((word, wi) => (
        <span
          key={wi}
          className="inline-block overflow-hidden align-top mr-[0.28em] pb-[0.15em]"
          aria-hidden="true"
        >
          {mode === "char" ? (
            word.split("").map((ch, ci) => (
              <span className="char inline-block" key={ci}>
                {ch}
              </span>
            ))
          ) : (
            <span className="word inline-block">{word}</span>
          )}
        </span>
      ))}
    </Tag>
  );
}
