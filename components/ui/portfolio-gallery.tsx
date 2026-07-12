"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

export type GalleryItem = {
  src: string;
  alt: string;
  href?: string;
  name: string;
};

const CARD_SHADOW = `
  rgba(6, 27, 53, 0.02) -0.8px 0px 0.8px 0px,
  rgba(6, 27, 53, 0.04) -2.4px 0px 2.4px 0px,
  rgba(6, 27, 53, 0.09) -6.4px 0px 6.4px 0px,
  rgba(6, 27, 53, 0.22) -20px 0px 20px 0px
`;

export function PortfolioGallery({ items }: { items: GalleryItem[] }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const reduced = useReducedMotion();

  return (
    <div className="portfolio-gallery">
      {/* Desktop: balanced 3D arc — middle card highest, gentle idle float,
          hovered card turns toward the viewer and lifts above the others */}
      <div className="relative hidden h-[400px] overflow-hidden md:block">
        <div className="flex -space-x-40 lg:-space-x-48 items-end justify-center pb-10 pt-36">
          {items.map((item, index) => {
            const middle = (items.length - 1) / 2;
            const lift = 96 - Math.abs(index - middle) * 44;
            const isHovered = hoveredIndex === index;
            const isOtherHovered = hoveredIndex !== null && !isHovered;

            const restY = -lift;
            const y = reduced
              ? restY
              : isHovered
                ? restY - 24
                : isOtherHovered
                  ? restY + 10
                  : [restY, restY - 9, restY];

            return (
              <motion.a
                key={item.name}
                href={item.href}
                target={item.href ? "_blank" : undefined}
                rel={item.href ? "noreferrer" : undefined}
                aria-label={item.href ? `לפתוח את ${item.name}` : item.name}
                className={`flex-shrink-0 ${item.href ? "cursor-pointer" : "cursor-default"}`}
                style={{ zIndex: isHovered ? 50 : items.length - index, transformPerspective: 1400 }}
                initial={reduced ? false : { opacity: 0, y: 160, rotateY: 30 }}
                animate={{
                  opacity: isOtherHovered ? 0.75 : 1,
                  y,
                  rotateY: isHovered ? 6 : 30,
                  scale: isHovered ? 1.06 : isOtherHovered ? 0.97 : 1,
                }}
                transition={{
                  opacity: { duration: 0.35 },
                  rotateY: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] },
                  scale: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] },
                  y:
                    reduced || hoveredIndex !== null
                      ? { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }
                      : { duration: 4.6 + index * 0.9, repeat: Infinity, ease: "easeInOut", delay: index * 0.4 },
                }}
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
              >
                <div
                  className="relative aspect-video w-80 overflow-hidden rounded-xl bg-white lg:w-[26rem]"
                  style={{ boxShadow: CARD_SHADOW }}
                >
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="h-full w-full object-cover object-top"
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

      {/* Mobile: marquee strip */}
      <div className="relative block pb-4 md:hidden">
        <div className="group flex flex-row overflow-hidden p-2 [--duration:36s] [--gap:1rem] [gap:var(--gap)]">
          {[0, 1, 2].map((copy) => (
            <div
              key={copy}
              className="marquee-track flex shrink-0 flex-row justify-around [gap:var(--gap)]"
              aria-hidden={copy > 0}
            >
              {items.map((item) => (
                <a
                  key={`${copy}-${item.name}`}
                  href={item.href}
                  target={item.href ? "_blank" : undefined}
                  rel={item.href ? "noreferrer" : undefined}
                  tabIndex={copy > 0 || !item.href ? -1 : undefined}
                  className="flex-shrink-0"
                >
                  <div
                    className="relative aspect-video w-64 overflow-hidden rounded-lg bg-white"
                    style={{ boxShadow: CARD_SHADOW }}
                  >
                    <img
                      src={item.src}
                      alt={item.alt}
                      className="h-full w-full object-cover object-top"
                      loading="lazy"
                      decoding="async"
                    />
                    <span className="portfolio-gallery__badge">{item.name}</span>
                  </div>
                </a>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
