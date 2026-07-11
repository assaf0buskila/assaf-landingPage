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
      {/* Desktop: 3D overlapping fan */}
      <div className="relative hidden h-[400px] overflow-hidden md:block">
        <div className="flex -space-x-72 md:-space-x-80 items-end justify-center pb-8 pt-40">
          {items.map((item, index) => {
            const middle = Math.floor(items.length / 2);
            const staggerOffset = 120 - Math.abs(index - middle) * 26;
            const isHovered = hoveredIndex === index;
            const isOtherHovered = hoveredIndex !== null && !isHovered;
            const yOffset = reduced
              ? -staggerOffset
              : isHovered
                ? -140
                : isOtherHovered
                  ? 0
                  : -staggerOffset;

            return (
              <motion.a
                key={item.name}
                href={item.href}
                target={item.href ? "_blank" : undefined}
                rel={item.href ? "noreferrer" : undefined}
                aria-label={item.href ? `לפתוח את ${item.name}` : item.name}
                className={`group flex-shrink-0 ${item.href ? "cursor-pointer" : "cursor-default"}`}
                style={{ zIndex: items.length - index }}
                initial={
                  reduced
                    ? false
                    : { transform: "perspective(5000px) rotateY(45deg) translateY(200px)", opacity: 0 }
                }
                animate={{
                  transform: `perspective(5000px) rotateY(45deg) translateY(${yOffset}px)`,
                  opacity: 1,
                }}
                transition={{ duration: 0.25, delay: reduced ? 0 : index * 0.05, ease: [0.25, 0.1, 0.25, 1] }}
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
              >
                <div
                  className="relative aspect-video w-72 overflow-hidden rounded-lg bg-white transition-transform duration-300 group-hover:scale-105 lg:w-96"
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
