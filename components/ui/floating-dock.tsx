"use client";

import { motion, useMotionValue, useSpring, useTransform, type MotionValue } from "framer-motion";
import {
  ArrowUp,
  Home,
  MessageCircle,
  PenTool,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { useRef } from "react";
import { cn } from "@/lib/utils";

type DockItem = {
  href: string;
  label: string;
  icon: LucideIcon;
};

const dockItems: DockItem[] = [
  { href: "#top", label: "בית", icon: Home },
  { href: "#story", label: "סיפור", icon: Sparkles },
  { href: "#process", label: "תהליך", icon: PenTool },
];

function DockIcon({
  href,
  label,
  icon: Icon,
  mouseX,
  solid = false,
}: DockItem & { mouseX: MotionValue<number>; solid?: boolean }) {
  const ref = useRef<HTMLAnchorElement>(null);

  const distance = useTransform(mouseX, (value) => {
    const bounds = ref.current?.getBoundingClientRect();
    if (!bounds) return 999;
    return value - bounds.left - bounds.width / 2;
  });

  const lift = useSpring(useTransform(distance, [-130, 0, 130], [0, -7, 0]), {
    mass: 0.12,
    stiffness: 180,
    damping: 15,
  });
  const scale = useSpring(useTransform(distance, [-130, 0, 130], [1, 1.13, 1]), {
    mass: 0.12,
    stiffness: 180,
    damping: 15,
  });

  return (
    <motion.a
      ref={ref}
      href={href}
      aria-label={label}
      title={label}
      className={cn(
        "dock-link group relative grid h-10 w-10 shrink-0 place-items-center rounded-full border border-transparent text-navy/75 transition-colors duration-200 hover:border-navy/10 hover:bg-mist/60 hover:text-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-action/45 sm:h-12 sm:w-12",
        solid &&
          "h-12 w-12 bg-navy text-white shadow-[0_16px_34px_rgba(2,16,36,0.22),inset_0_1px_0_rgba(255,255,255,0.16)] hover:border-transparent hover:bg-navy hover:text-white sm:h-14 sm:w-14",
      )}
      style={{ y: lift, scale }}
      whileTap={{ y: 1 }}
    >
      <Icon size={solid ? 22 : 20} strokeWidth={solid ? 2.25 : 2.05} />
    </motion.a>
  );
}

export function FloatingDock() {
  const mouseX = useMotionValue(Infinity);

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-50 flex justify-center px-2 md:bottom-6">
      <motion.nav
        aria-label="ניווט מהיר"
        className="floating-dock-shell pointer-events-auto flex max-w-[calc(100vw-16px)] items-center gap-0.5 rounded-full border border-white/80 bg-white/90 px-1.5 py-1.5 shadow-[0_24px_80px_rgba(2,16,36,0.16),inset_0_1px_0_rgba(255,255,255,0.94)] backdrop-blur-2xl sm:gap-1 sm:px-2 sm:py-2"
        initial={{ y: 80, opacity: 0, scale: 0.96 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 240, damping: 22, delay: 0.15 }}
        onMouseMove={(event) => mouseX.set(event.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
      >
        <motion.a
          href="#contact"
          className="group/contact inline-flex min-h-12 shrink-0 items-center gap-2 rounded-full px-3.5 text-sm font-black text-white shadow-[0_18px_46px_rgba(37,99,235,0.28),inset_0_1px_0_rgba(255,255,255,0.22)] transition hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-action/45 sm:min-h-14 sm:px-6 sm:text-base"
          style={{ background: "linear-gradient(135deg, var(--navy), var(--action))" }}
          whileHover={{ y: -3, scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
        >
          <span>בואו נדבר</span>
          <MessageCircle
            size={20}
            strokeWidth={2.2}
            className="transition-transform duration-200 group-hover/contact:-translate-y-0.5"
          />
        </motion.a>

        <div className="mx-1 h-8 w-px shrink-0 bg-navy/10 sm:mx-2 sm:h-9" />

        {dockItems.map((item) => (
          <DockIcon key={item.href} {...item} mouseX={mouseX} />
        ))}

        <DockIcon href="#top" label="חזרה להתחלה" icon={ArrowUp} mouseX={mouseX} solid />
      </motion.nav>
    </div>
  );
}
