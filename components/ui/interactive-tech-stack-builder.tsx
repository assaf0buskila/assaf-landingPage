"use client";

import Image from "next/image";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useAnimation, useMotionTemplate, useMotionValue, MotionValue } from "framer-motion";
import { MessageCircle } from "lucide-react";

// 21st.dev "interactive-tech-stack-builder", adapted for this site:
// RTL/Hebrew labels, section-embedded (no full-screen wrapper), palette
// mapped to the studio tokens, reduced-motion support, WhatsApp CTA.
// Placement math uses PHYSICAL left-based coordinates on purpose - both the
// grid solver and the renderer share them, so RTL never enters the equation.

const GRID = {
  STUD_WIDTH: 65,
  ROW_HEIGHT: 80,
  MAX_ROWS: 20,
  COLS: 6,
  APEX_HEIGHT: 130,
};

type ThemeName = "action" | "navy" | "ink" | "steel" | "sky" | "mist" | "gold";

const THEMES: Record<
  ThemeName,
  { top: string; faceFrom: string; faceMid: string; faceTo: string; bottom: string; capFrom: string; capTo: string; dark: boolean }
> = {
  action: { top: "#60a5fa", faceFrom: "#3b82f6", faceMid: "#2563eb", faceTo: "#1d4ed8", bottom: "#1e40af", capFrom: "#93c5fd", capTo: "#2563eb", dark: false },
  navy: { top: "#4a7db3", faceFrom: "#3b74ad", faceMid: "#2f5f93", faceTo: "#254c76", bottom: "#1f405f", capFrom: "#7ba7d3", capTo: "#2f5f93", dark: false },
  ink: { top: "#2c4a6b", faceFrom: "#1b3a5c", faceMid: "#0c2440", faceTo: "#061b35", bottom: "#03101f", capFrom: "#41618a", capTo: "#0c2440", dark: false },
  steel: { top: "#a5c4e3", faceFrom: "#8fb5da", faceMid: "#7ba7d3", faceTo: "#6690bd", bottom: "#58799c", capFrom: "#c3daf0", capTo: "#7ba7d3", dark: true },
  sky: { top: "#c9e4f7", faceFrom: "#b9dbf4", faceMid: "#a8d1f0", faceTo: "#8fbfe4", bottom: "#7fa9c9", capFrom: "#e2f2fd", capTo: "#a8d1f0", dark: true },
  mist: { top: "#eef8ff", faceFrom: "#e6f4ff", faceMid: "#d9eeff", faceTo: "#c4e2fa", bottom: "#a9cbe6", capFrom: "#f6fbff", capTo: "#d9eeff", dark: true },
  gold: { top: "#ffffff", faceFrom: "#ffffff", faceMid: "#f4f9ff", faceTo: "#e8f2fc", bottom: "#c9ddf0", capFrom: "#ffffff", capTo: "#e8f2fc", dark: true },
};

export type BrickDef = {
  id: string;
  label: string;
  studs: 2 | 4;
  theme: ThemeName;
};

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return reduced;
}

function LegoStud({ theme, yOffset = 12 }: { theme: ThemeName; yOffset?: number }) {
  const t = THEMES[theme];
  return (
    <div className="relative flex flex-1 items-end justify-center" style={{ transform: `translateY(${yOffset}px)` }}>
      <div
        className="absolute bottom-[-3px] left-1/2 z-0 w-[75%] -translate-x-1/2 rounded-[50%]"
        style={{ height: "10px", background: "radial-gradient(ellipse, rgba(6,27,53,0.35) 0%, transparent 70%)" }}
      />
      <div className="relative z-10" style={{ width: "72%", maxWidth: "42px", marginBottom: "-1px" }}>
        <div
          className="relative w-full overflow-hidden"
          style={{
            height: "16px",
            borderRadius: "50% / 20%",
            background: `linear-gradient(90deg, ${t.faceTo} 0%, ${t.faceMid} 38%, ${t.faceFrom} 50%, ${t.faceMid} 62%, ${t.faceTo} 100%)`,
          }}
        >
          <div
            className="absolute top-0 h-full w-[25%] left-[20%]"
            style={{ background: "linear-gradient(to right, transparent, rgba(255,255,255,0.25), transparent)" }}
          />
        </div>
        <div
          className="absolute left-0 flex w-full items-center justify-center overflow-hidden rounded-[50%]"
          style={{
            top: "-8px",
            height: "16px",
            background: `linear-gradient(135deg, ${t.capFrom} 0%, ${t.capTo} 100%)`,
            boxShadow: "inset 0px 2px 4px rgba(255,255,255,0.6), inset 0px -2px 4px rgba(0,0,0,0.18), 0px 1px 1px rgba(0,0,0,0.3)",
            borderTop: "1px solid rgba(255,255,255,0.65)",
          }}
        >
          <span
            className="pointer-events-none select-none text-[10px] font-black tracking-widest opacity-80"
            style={{
              color: "rgba(6,27,53,0.16)",
              textShadow: "0px 1px 0px rgba(255,255,255,0.5)",
              transform: "scaleY(0.55) translateY(-1px)",
            }}
          >
            AI
          </span>
        </div>
      </div>
    </div>
  );
}

function LegoBlock({
  mouseX,
  mouseY,
  theme,
  roundedTop = true,
  roundedBottom = true,
  studs = 0,
  hideStuds = [],
  children,
  className = "",
}: {
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  theme: ThemeName;
  roundedTop?: boolean;
  roundedBottom?: boolean;
  studs?: number;
  hideStuds?: number[];
  children: React.ReactNode;
  className?: string;
}) {
  const t = THEMES[theme];
  const highlightBg = useMotionTemplate`radial-gradient(circle 120px at ${mouseX}% ${mouseY}%, rgba(255,255,255,0.25), transparent)`;

  return (
    <div className={`relative w-full ${className}`}>
      <div
        className="relative w-full"
        style={{
          height: "19px",
          background: `linear-gradient(to bottom, ${t.top}, ${t.faceFrom})`,
          boxShadow: "inset 0px 0px 4px rgba(6,27,53,0.28)",
          borderRadius: roundedTop ? "4px 4px 0 0" : "0",
        }}
      >
        {studs > 0 ? (
          <div className="absolute bottom-full left-0 flex w-full">
            {Array.from({ length: studs }, (_, i) =>
              hideStuds.includes(i) ? <div key={i} className="flex-1" /> : <LegoStud key={i} theme={theme} />
            )}
          </div>
        ) : null}
      </div>
      <div
        className="relative w-full overflow-hidden border-x border-black/5"
        style={{
          background: `linear-gradient(180deg, ${t.faceFrom} 0%, ${t.faceMid} 50%, ${t.faceTo} 100%)`,
          boxShadow: "inset 0px 2px 6px rgba(255,255,255,0.4)",
        }}
      >
        <motion.div className="pointer-events-none absolute inset-0 z-20 opacity-60" style={{ background: highlightBg }} />
        <div className="relative z-30">{children}</div>
      </div>
      <div
        className="relative w-full"
        style={{
          height: "15px",
          background: t.bottom,
          boxShadow: "inset 0px 2px 4px rgba(6,27,53,0.15)",
          borderRadius: roundedBottom ? "0 0 4px 4px" : "0",
        }}
      />
    </div>
  );
}

function BrickModule({
  brick,
  hiddenStuds = [],
  onClick,
  isAnimating,
  startRect,
  mouseX,
  mouseY,
  instant,
  onAnimationComplete,
}: {
  brick: BrickDef;
  hiddenStuds?: number[];
  onClick: (e: React.MouseEvent) => void;
  isAnimating?: boolean;
  startRect?: DOMRect | null;
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  instant: boolean;
  onAnimationComplete?: () => void;
}) {
  const widthPx = brick.studs * GRID.STUD_WIDTH;
  const wrapperRef = useRef<HTMLDivElement>(null);
  const t = THEMES[brick.theme];

  useEffect(() => {
    if (!isAnimating || !startRect || !wrapperRef.current) return;
    if (instant) {
      onAnimationComplete?.();
      return;
    }

    const endRect = wrapperRef.current.getBoundingClientRect();
    const dx = startRect.left - endRect.left;
    const dy = startRect.top - endRect.top;
    // Arc apex must clear both endpoints; dx keeps its sign so the jump
    // travels the correct direction in RTL layouts too.
    const apexY = Math.min(dy, 0) - GRID.APEX_HEIGHT;

    const animation = wrapperRef.current.animate(
      [
        { transform: `translate(${dx}px, ${dy}px) scale(1, 1)`, offset: 0 },
        { transform: `translate(${dx}px, ${dy}px) scale(1.1, 0.85)`, offset: 0.15 },
        { transform: `translate(${dx * 0.75}px, ${dy + (apexY - dy) * 0.5}px) scale(0.9, 1.15)`, offset: 0.35 },
        { transform: `translate(${dx * 0.5}px, ${apexY}px) scale(1, 1)`, offset: 0.55 },
        { transform: `translate(${dx * 0.25}px, ${apexY * 0.5}px) scale(0.9, 1.15)`, offset: 0.75 },
        { transform: "translate(0px, 0px) scale(1.15, 0.85)", offset: 0.9 },
        { transform: "translate(0px, 0px) scale(1, 1)", offset: 1 },
      ],
      { duration: 1100, easing: "cubic-bezier(0.25, 1, 0.5, 1)", fill: "both" }
    );

    animation.onfinish = () => onAnimationComplete?.();
    return () => animation.cancel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAnimating, startRect]);

  return (
    <div ref={wrapperRef} className="lego-block-wrapper relative z-50" style={{ width: widthPx }}>
      <button
        type="button"
        onClick={onClick}
        aria-label={`להוסיף את ${brick.label}`}
        className="group relative w-full shrink-0 cursor-pointer rounded-lg text-right transition-all duration-200 hover:-translate-y-1.5 active:scale-95 focus:outline-none focus-visible:ring-4 focus-visible:ring-action/50"
      >
        <div className="pointer-events-none absolute inset-0 z-30 rounded-lg bg-white/0 transition-colors group-hover:bg-white/10" />
        <LegoBlock mouseX={mouseX} mouseY={mouseY} theme={brick.theme} studs={brick.studs} hideStuds={hiddenStuds}>
          <div className="flex h-[58px] w-full items-center justify-center px-3" dir="rtl">
            <span
              className={`truncate text-[15px] font-black tracking-wide ${t.dark ? "text-ink" : "text-white drop-shadow-[0_1px_1px_rgba(6,27,53,0.5)]"}`}
            >
              {brick.label}
            </span>
          </div>
        </LegoBlock>
      </button>
    </div>
  );
}

export function TechStackBuilder({
  bricks,
  baseLabel,
  baseSubtitle,
  baseImage,
  whatsapp,
}: {
  bricks: BrickDef[];
  baseLabel: string;
  baseSubtitle: string;
  baseImage: string;
  whatsapp: string;
}) {
  const reduceMotion = usePrefersReducedMotion();
  const [equippedIds, setEquippedIds] = useState<string[]>([]);
  const [animatingBlocks, setAnimatingBlocks] = useState<Record<string, DOMRect>>({});
  const controls = useAnimation();
  const mouseX = useMotionValue(50);
  const mouseY = useMotionValue(50);

  const handlePointerMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    mouseX.set((e.clientX / window.innerWidth) * 100);
    mouseY.set((e.clientY / window.innerHeight) * 100);
  };

  const handleToggle = (id: string, e: React.MouseEvent) => {
    if (animatingBlocks[id]) return;
    const el = (e.currentTarget as HTMLElement).closest(".lego-block-wrapper");
    if (!el) return;
    const startRect = el.getBoundingClientRect();

    setAnimatingBlocks((prev) => ({ ...prev, [id]: startRect }));
    setEquippedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

    if (!reduceMotion) {
      window.setTimeout(() => {
        controls.start({ y: [0, 9, -3, 0], transition: { duration: 0.4, times: [0, 0.4, 0.7, 1], ease: "easeInOut" } });
      }, 990);
    }
  };

  const equipped = equippedIds
    .map((id) => bricks.find((b) => b.id === id))
    .filter((b): b is BrickDef => Boolean(b));
  const unequipped = bricks.filter((b) => !equippedIds.includes(b.id));

  const { grid, positioned } = useMemo(() => {
    const g: (string | null)[][] = [];
    const placed = equipped.map((brick) => {
      let row = -1;
      let col = -1;
      for (let r = 0; r < GRID.MAX_ROWS; r += 1) {
        if (!g[r]) g[r] = Array(GRID.COLS).fill(null);
        let run = 0;
        for (let c = 0; c < GRID.COLS; c += 1) {
          if (!g[r][c]) {
            run += 1;
            if (run === brick.studs) {
              row = r;
              col = c - brick.studs + 1;
              break;
            }
          } else {
            run = 0;
          }
        }
        if (row !== -1) break;
      }
      if (row !== -1) {
        for (let i = 0; i < brick.studs; i += 1) g[row][col + i] = brick.id;
      } else {
        row = 0;
        col = 0;
      }
      return { brick, row, col };
    });
    return { grid: g, positioned: placed };
  }, [equipped]);

  const hiddenBaseStuds: number[] = [];
  if (grid[0]) {
    grid[0].forEach((occupant, idx) => {
      if (occupant && !animatingBlocks[occupant]) hiddenBaseStuds.push(idx);
    });
  }

  const towerHeight = equipped.length > 0 ? (Math.max(...positioned.map((p) => p.row)) + 1) * GRID.ROW_HEIGHT : 0;

  return (
    <div onPointerMove={handlePointerMove} className="tech-stack-builder select-none" dir="rtl">
      <p className="tech-stack-builder__hint">
        לחצו על לבנה כדי להוסיף אותה לצוות. ככה נראה עובד דיגיטלי מבפנים.
      </p>

      <div className="relative z-20 flex min-h-[150px] flex-wrap items-start justify-center gap-4 pt-4">
        {unequipped.map((brick) => (
          <BrickModule
            key={brick.id}
            brick={brick}
            mouseX={mouseX}
            mouseY={mouseY}
            instant={reduceMotion}
            isAnimating={Boolean(animatingBlocks[brick.id])}
            startRect={animatingBlocks[brick.id] || null}
            onAnimationComplete={() =>
              setAnimatingBlocks((prev) => {
                const next = { ...prev };
                delete next[brick.id];
                return next;
              })
            }
            onClick={(e) => handleToggle(brick.id, e)}
          />
        ))}
      </div>

      <div className="mt-10 flex flex-col items-center">
        <div className="origin-bottom scale-[0.72] sm:scale-[0.85] lg:scale-100">
          <motion.div
            animate={controls}
            className="relative w-[390px] rounded-xl shadow-lift transition-all duration-700 ease-out"
            style={{ marginTop: `${towerHeight}px` }}
          >
            <div className="absolute left-0 z-20 h-0 w-full" style={{ bottom: "calc(100% - 14px)" }}>
              {positioned.map(({ brick, row, col }) => {
                const hiddenLocal: number[] = [];
                if (grid[row + 1]) {
                  for (let i = 0; i < brick.studs; i += 1) {
                    const occupant = grid[row + 1][col + i];
                    if (occupant && !animatingBlocks[occupant]) hiddenLocal.push(i);
                  }
                }

                return (
                  <div
                    key={brick.id}
                    className="absolute"
                    style={{ bottom: row * GRID.ROW_HEIGHT, left: col * GRID.STUD_WIDTH, zIndex: row * 10 }}
                  >
                    <BrickModule
                      brick={brick}
                      hiddenStuds={hiddenLocal}
                      mouseX={mouseX}
                      mouseY={mouseY}
                      instant={reduceMotion}
                      isAnimating={Boolean(animatingBlocks[brick.id])}
                      startRect={animatingBlocks[brick.id] || null}
                      onAnimationComplete={() =>
                        setAnimatingBlocks((prev) => {
                          const next = { ...prev };
                          delete next[brick.id];
                          return next;
                        })
                      }
                      onClick={(e) => handleToggle(brick.id, e)}
                    />
                  </div>
                );
              })}
            </div>

            <LegoBlock mouseX={mouseX} mouseY={mouseY} theme="gold" studs={GRID.COLS} hideStuds={hiddenBaseStuds} className="relative z-10">
              <div className="flex items-center gap-4 px-5 py-4 pt-5" dir="rtl">
                <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full border border-white shadow-soft">
                  <Image src={baseImage} alt="" width={88} height={88} sizes="44px" className="h-full w-full object-cover" />
                </span>
                <span className="grid text-right">
                  <strong className="text-[17px] font-black leading-tight text-ink">{baseLabel}</strong>
                  <small className="mt-1 text-[11px] font-bold uppercase tracking-[0.14em] text-muted" dir="ltr">
                    {baseSubtitle}
                  </small>
                </span>
              </div>
            </LegoBlock>
          </motion.div>
        </div>

        <div className="mt-6 flex h-16 w-full items-start justify-center">
          <AnimatePresence>
            {equipped.length >= 3 ? (
              <motion.a
                initial={{ opacity: 0, y: 16, scale: 0.94 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -12, scale: 0.94 }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                href={whatsapp}
                target="_blank"
                rel="noreferrer"
                className="btn-primary"
              >
                רוצים צוות כזה בעסק שלכם?
                <MessageCircle size={18} />
              </motion.a>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
