"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

export type GalleryItem = {
  src: string;
  alt: string;
  href?: string;
  name: string;
};

// Shadow falls toward the inline-start side, matching the cards' 3D turn.
const CARD_SHADOW = `
  rgba(6, 27, 53, 0.03) -1px 2px 1px 0px,
  rgba(6, 27, 53, 0.05) -3px 6px 3px 0px,
  rgba(6, 27, 53, 0.09) -8px 14px 8px 0px,
  rgba(6, 27, 53, 0.20) -22px 26px 26px 0px
`;

export function PortfolioGallery({ items }: { items: GalleryItem[] }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const reduced = useReducedMotion();
  const middle = (items.length - 1) / 2;

  return (
    <div className="portfolio-gallery">
      {/* Desktop: a balanced arc. Two rules keep it honest:
          1. the overlap is margin-inline-start (Tailwind's -space-x is a
             physical margin-left, which in RTL piles the cards off the
             inline-start edge — the last card rendered at x=-21);
          2. the stage is sized from the card height + lift, so nothing is
             clipped (the old fixed 400px box cut 160px off every card). */}
      <div className="portfolio-gallery__stage hidden md:block">
        <div className="portfolio-gallery__row">
          {items.map((item, index) => {
            const lift = 40 - Math.abs(index - middle) * 26;
            const tilt = (index - middle) * 3.5;
            const isHovered = hoveredIndex === index;
            const isOtherHovered = hoveredIndex !== null && !isHovered;

            const restY = -lift;
            const y = reduced
              ? restY
              : isHovered
                ? restY - 18
                : isOtherHovered
                  ? restY + 8
                  : [restY, restY - 7, restY];

            return (
              <motion.a
                key={item.name}
                href={item.href}
                target={item.href ? "_blank" : undefined}
                rel={item.href ? "noreferrer" : undefined}
                aria-label={item.href ? `לפתוח את ${item.name}` : item.name}
                className={`portfolio-gallery__card ${item.href ? "cursor-pointer" : "cursor-default"}`}
                style={{
                  zIndex: isHovered ? 50 : items.length - index,
                  marginInlineStart: index === 0 ? 0 : "var(--gallery-overlap)",
                  transformPerspective: 1600,
                }}
                /* Never start at opacity 0: if the entrance never runs (a
                   backgrounded tab at mount, a hydration hiccup) the cards
                   would stay invisible and the section reads as empty. The
                   entrance is transform-only, so the worst failure mode is a
                   slightly-offset card, not a missing one. */
                initial={reduced ? false : { y: 26, rotateY: 20 }}
                animate={{
                  opacity: isOtherHovered ? 0.82 : 1,
                  y,
                  rotateY: isHovered ? 4 : 20,
                  rotate: isHovered ? 0 : tilt,
                  scale: isHovered ? 1.05 : isOtherHovered ? 0.98 : 1,
                }}
                transition={{
                  opacity: { duration: 0.35 },
                  rotateY: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] },
                  rotate: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] },
                  scale: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] },
                  y:
                    reduced || hoveredIndex !== null
                      ? { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }
                      : {
                          duration: 4.6 + index * 0.9,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: index * 0.4,
                        },
                }}
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
              >
                <div className="portfolio-gallery__frame" style={{ boxShadow: CARD_SHADOW }}>
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="portfolio-gallery__shot"
                    loading="lazy"
                    decoding="async"
                  />
                  <span className="portfolio-gallery__badge">{item.name}</span>
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>

      {/* Mobile: a swipeable snap strip. The CSS marquee kept walking the
          cards out of the RTL viewport (tracks started 449px off-screen, only
          2 of 9 cards ever on screen); a snap strip always shows a card and
          lets the visitor drive. */}
      <div className="portfolio-gallery__strip md:hidden" dir="rtl">
        {items.map((item) => (
          <a
            key={item.name}
            href={item.href}
            target={item.href ? "_blank" : undefined}
            rel={item.href ? "noreferrer" : undefined}
            aria-label={item.href ? `לפתוח את ${item.name}` : item.name}
            className="portfolio-gallery__slide"
          >
            <div className="portfolio-gallery__frame" style={{ boxShadow: CARD_SHADOW }}>
              <img
                src={item.src}
                alt={item.alt}
                className="portfolio-gallery__shot"
                decoding="async"
              />
              <span className="portfolio-gallery__badge">{item.name}</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
