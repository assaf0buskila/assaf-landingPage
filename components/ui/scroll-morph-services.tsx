"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, useSpring } from "framer-motion";

export type ServiceCard = { src: string; label: string };

type Target = { x: number; y: number; rotation: number; scale: number; opacity: number };
type IntroPhase = "scatter" | "line" | "circle";

const CARD_W = 120;
const CARD_H = 90;
// Fraction of the pinned scroll spent morphing circle -> arc; the rest shuffles the arc.
const MORPH_END = 0.45;
const ROTATE_START = 0.5;

const lerp = (a: number, b: number, t: number) => a * (1 - t) + b * t;
const clamp01 = (v: number) => Math.min(Math.max(v, 0), 1);

function FlipCard({ card, target }: { card: ServiceCard; target: Target }) {
  return (
    <motion.div
      animate={{
        x: target.x,
        y: target.y,
        rotate: target.rotation,
        scale: target.scale,
        opacity: target.opacity,
      }}
      transition={{ type: "spring", stiffness: 40, damping: 15 }}
      style={{
        position: "absolute",
        width: CARD_W,
        height: CARD_H,
        transformStyle: "preserve-3d",
        perspective: "1000px",
      }}
      className="group cursor-pointer"
    >
      <motion.div
        className="relative h-full w-full"
        style={{ transformStyle: "preserve-3d" }}
        transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
        whileHover={{ rotateY: 180 }}
      >
        <div
          className="absolute inset-0 h-full w-full overflow-hidden rounded-xl bg-mist shadow-lg"
          style={{ backfaceVisibility: "hidden" }}
        >
          {/* Plain img: tiny decorative card, webp already optimized */}
          <img src={card.src} alt={card.label} className="h-full w-full object-cover" loading="lazy" decoding="async" />
          <div className="absolute inset-0 bg-navy/10 transition-colors group-hover:bg-transparent" />
        </div>

        <div
          className="absolute inset-0 flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-xl border border-white/60 bg-white/95 p-2 shadow-lg"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
          dir="rtl"
        >
          <p className="text-center text-[11px] font-black leading-tight text-ink">{card.label}</p>
          <span className="mt-1 text-[9px] font-bold tracking-wide text-action">אפשר לדבר על זה</span>
        </div>
      </motion.div>
    </motion.div>
  );
}

function StaticStrip({ cards }: { cards: ServiceCard[] }) {
  return (
    <div className="smorph-strip" dir="rtl">
      {cards.map((card) => (
        <figure key={card.label} className="smorph-strip__item">
          <img src={card.src} alt={card.label} loading="lazy" decoding="async" />
          <figcaption>{card.label}</figcaption>
        </figure>
      ))}
    </div>
  );
}

export function ScrollMorphServices({ cards }: { cards: ServiceCard[] }) {
  const [capable, setCapable] = useState<boolean | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [stageSize, setStageSize] = useState({ width: 1200, height: 800 });
  const [introPhase, setIntroPhase] = useState<IntroPhase>("scatter");
  const introStarted = useRef(false);

  // Scroll progress across the tall wrapper drives the morph; springs smooth it.
  // Stiffness tuned high enough to track the scrollbar without feeling laggy.
  const smoothMorph = useSpring(0, { stiffness: 75, damping: 22 });
  const smoothRotate = useSpring(0, { stiffness: 75, damping: 22 });
  const [morphValue, setMorphValue] = useState(0);
  const [rotateValue, setRotateValue] = useState(0);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const wide = window.matchMedia("(min-width: 900px)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setCapable(fine && wide && !reduced);
  }, []);

  useEffect(() => {
    if (!capable) return;
    const stage = stageRef.current;
    if (!stage) return;

    const measure = () => setStageSize({ width: stage.offsetWidth, height: stage.offsetHeight });
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(stage);
    return () => observer.disconnect();
  }, [capable]);

  useEffect(() => {
    if (!capable) return;
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const onScroll = () => {
      const rect = wrapper.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      if (scrollable <= 0) return;
      const p = clamp01(-rect.top / scrollable);
      smoothMorph.set(clamp01(p / MORPH_END));
      smoothRotate.set(clamp01((p - ROTATE_START) / (1 - ROTATE_START)));

      // Kick the intro sequence the first time the stage is on screen.
      if (!introStarted.current && rect.top < window.innerHeight * 0.7) {
        introStarted.current = true;
        window.setTimeout(() => setIntroPhase("line"), 400);
        window.setTimeout(() => setIntroPhase("circle"), 1900);
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [capable, smoothMorph, smoothRotate]);

  useEffect(() => {
    if (!capable) return;
    const offMorph = smoothMorph.on("change", setMorphValue);
    const offRotate = smoothRotate.on("change", setRotateValue);
    return () => {
      offMorph();
      offRotate();
    };
  }, [capable, smoothMorph, smoothRotate]);

  const scatterPositions = useMemo(
    () =>
      cards.map((_, i) => ({
        // Deterministic pseudo-random scatter (stable across renders/SSR)
        x: (((i * 137) % 100) / 100 - 0.5) * 1400,
        y: (((i * 71) % 100) / 100 - 0.5) * 900,
        rotation: (((i * 53) % 100) / 100 - 0.5) * 160,
        scale: 0.6,
        opacity: 0,
      })),
    [cards]
  );

  if (capable === null) return <div ref={wrapperRef} className="min-h-[200px]" />;
  if (!capable) return <StaticStrip cards={cards} />;

  const total = cards.length;
  const hintOpacity = introPhase === "circle" ? Math.max(0, 1 - morphValue * 3) : 0;

  return (
    <div ref={wrapperRef} className="smorph-wrapper" style={{ height: "175vh" }}>
      <div ref={stageRef} className="smorph-stage">
        <div className="smorph-hint" style={{ opacity: hintOpacity }} aria-hidden="true">
          <p>כל עסק מפסיד זמן במקום אחר.</p>
          <span>גללו כדי לראות מה אני בונה</span>
        </div>

        <div className="relative flex h-full w-full items-center justify-center">
          {cards.map((card, i) => {
            let target: Target = { x: 0, y: 0, rotation: 0, scale: 1, opacity: 1 };

            if (introPhase === "scatter") {
              target = scatterPositions[i];
            } else if (introPhase === "line") {
              const spacing = CARD_W + 16;
              target = { x: i * spacing - (total * spacing) / 2 + spacing / 2, y: 0, rotation: 0, scale: 1, opacity: 1 };
            } else {
              const minDim = Math.min(stageSize.width, stageSize.height);
              const circleRadius = Math.min(minDim * 0.37, 365);
              const circleAngle = (i / total) * 360;
              const circleRad = (circleAngle * Math.PI) / 180;
              const circlePos = {
                x: Math.cos(circleRad) * circleRadius,
                y: Math.sin(circleRad) * circleRadius,
                rotation: circleAngle + 90,
              };

              const arcRadius = Math.min(stageSize.width, stageSize.height * 1.5) * 1.1;
              const arcApexY = stageSize.height * 0.22;
              const arcCenterY = arcApexY + arcRadius - stageSize.height / 2;

              const spread = 120;
              const startAngle = -90 - spread / 2;
              const step = spread / (total - 1);
              // RTL page: shuffle travels to the right as the visitor scrolls on.
              const bounded = rotateValue * spread * 0.8;
              const angle = startAngle + i * step + bounded;
              const rad = (angle * Math.PI) / 180;

              const arcPos = {
                x: Math.cos(rad) * arcRadius,
                y: Math.sin(rad) * arcRadius + arcCenterY,
                rotation: angle + 90,
                scale: 1.9,
              };

              target = {
                x: lerp(circlePos.x, arcPos.x, morphValue),
                y: lerp(circlePos.y, arcPos.y, morphValue),
                rotation: lerp(circlePos.rotation, arcPos.rotation, morphValue),
                scale: lerp(1, arcPos.scale, morphValue),
                opacity: 1,
              };
            }

            return <FlipCard key={card.label} card={card} target={target} />;
          })}
        </div>
      </div>
    </div>
  );
}
