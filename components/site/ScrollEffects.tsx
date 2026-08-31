"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// ─── tiny typed helper ────────────────────────────────────────────────────────
function qs<T extends HTMLElement>(selector: string, root: Document | HTMLElement = document): T | null {
  return root.querySelector<T>(selector);
}
function qsa<T extends HTMLElement>(selector: string, root: Document | HTMLElement = document): T[] {
  return gsap.utils.toArray<T>(root.querySelectorAll<T>(selector));
}

export function ScrollEffects() {
  useEffect(() => {
    // ── 1. Reduced-motion guard ──────────────────────────────────────────────
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // ── 2. Register plugin (idempotent) ──────────────────────────────────────
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.config({ ignoreMobileResize: true });

    const isTouchDevice =
      ScrollTrigger.isTouch === 1 || window.matchMedia("(pointer: coarse)").matches;

    // ── 3. Lenis smooth scroll ───────────────────────────────────────────────
    let rafId = 0;
    let lenis: Lenis | null = null;

    if (!isTouchDevice) {
      lenis = new Lenis({
        duration: 0.9,
        smoothWheel: true,
        wheelMultiplier: 1,
      });

      const raf = (time: number) => {
        lenis?.raf(time);
        rafId = requestAnimationFrame(raf);
      };

      rafId = requestAnimationFrame(raf);
      lenis.on("scroll", ScrollTrigger.update);
    }

    // ── matchMedia instances ─────────────────────────────────────────────────
    const mm = gsap.matchMedia();

    // ── main context ─────────────────────────────────────────────────────────
    const ctx = gsap.context(() => {
      // ────────────────────────────────────────────────────────────────────────
      // 3. BACKGROUND COLOUR MORPH
      // ────────────────────────────────────────────────────────────────────────
      qsa<HTMLElement>("section[data-bg]").forEach((section) => {
        const color = section.dataset.bg ?? "#ffffff";
        ScrollTrigger.create({
          trigger: section,
          start: "top 58%",
          end: "bottom 58%",
          onEnter: () =>
            gsap.to(".bg-morph", { backgroundColor: color, duration: 0.75, ease: "sine.inOut", overwrite: "auto" }),
          onEnterBack: () =>
            gsap.to(".bg-morph", { backgroundColor: color, duration: 0.75, ease: "sine.inOut", overwrite: "auto" }),
        });
      });

      // ────────────────────────────────────────────────────────────────────────
      // 4. NAV PROGRESS BAR
      // ────────────────────────────────────────────────────────────────────────
      gsap.fromTo(
        ".nav-progress",
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            start: 0,
            end: "max",
            scrub: true,
          },
        }
      );

      // ────────────────────────────────────────────────────────────────────────
      // 5. SCROLL-SPY NAV LINKS
      // ────────────────────────────────────────────────────────────────────────
      (["solutions", "voice", "works", "contact"] as const).forEach((id) => {
        const section = document.getElementById(id);
        const link = qs<HTMLAnchorElement>(`header .nav-link[href="#${id}"]`);
        if (!section || !link) return;

        ScrollTrigger.create({
          trigger: section,
          start: "top 50%",
          end: "bottom 50%",
          onEnter: () => link.classList.add("nav-link--active"),
          onLeave: () => link.classList.remove("nav-link--active"),
          onEnterBack: () => link.classList.add("nav-link--active"),
          onLeaveBack: () => link.classList.remove("nav-link--active"),
        });
      });

      // ────────────────────────────────────────────────────────────────────────
      // 6. HERO: entrance is pure CSS (hero-word-in / hero-kicker-in keyframes).
      // GSAP used to double-animate the same elements and could freeze mid-tween
      // on remount, leaving the H1 permanently blurred.
      // ────────────────────────────────────────────────────────────────────────

      // 6c. Scroll-cue fast fade (first 14% of hero scroll)
      const heroSection = qs<HTMLElement>(".hero-section");
      if (heroSection) {
        gsap.fromTo(
          ".hero-scroll-cue",
          { autoAlpha: 1 },
          {
            autoAlpha: 0,
            ease: "none",
            scrollTrigger: {
              trigger: heroSection,
              start: "top top",
              end: "14% top",
              scrub: true,
            },
          }
        );

        // 6b. Hero content exit
        gsap.to(".hero-section .section-shell", {
          autoAlpha: 0.35,
          yPercent: -5,
          ease: "none",
          scrollTrigger: {
            trigger: heroSection,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      // ────────────────────────────────────────────────────────────────────────
      // 8. STATS COUNT-UP
      // ────────────────────────────────────────────────────────────────────────
      qsa<HTMLElement>(".count-target[data-countup]").forEach((el) => {
        const target = parseInt(el.dataset.countup ?? "0", 10);

        ScrollTrigger.create({
          trigger: el,
          start: "top 82%",
          once: true,
          onEnter: () => {
            // Zero only once the count is about to run. Zeroing on mount left
            // the server-rendered number as "0 פרויקטים" / "0/7" for anything
            // that renders JS without scrolling: crawlers, link previews and
            // any visitor whose ScrollTrigger never fires.
            el.textContent = "0";
            const proxy = { value: 0 };
            gsap.to(proxy, {
              value: target,
              duration: 1.3,
              ease: "power2.out",
              onUpdate() {
                el.textContent = String(Math.round(proxy.value));
              },
            });
          },
        });
      });

      // ────────────────────────────────────────────────────────────────────────
      // 9-12. Card entrances are handled by the single generic .gsap-reveal
      // pattern below, one motion voice for every card on the page.
      // ────────────────────────────────────────────────────────────────────────

      // ────────────────────────────────────────────────────────────────────────
      // 13. CONTACT: card 3D entrance + form controls stagger
      // ────────────────────────────────────────────────────────────────────────
      // Transform-only, like the fields below: fromTo applies its from-state at
      // page load, so an opacity 0 start hides the site's only lead form until
      // a trigger fires. A slide-and-turn entrance reads the same and can never
      // cost a lead.
      gsap.fromTo(
        ".contact-form-card",
        { y: 46, rotateY: -7 },
        {
          y: 0,
          rotateY: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".contact-section",
            start: "top 90%",
            once: true,
          },
        }
      );

      // Transform-only: a fromTo opacity would hold the fields at 0 from page
      // load until its trigger fires, so any missed trigger (anchor jump,
      // smooth-scroll desync) leaves the site's only lead form invisible.
      const formControls = qsa<HTMLElement>(".form-control");
      if (formControls.length > 0) {
        gsap.fromTo(
          formControls,
          { y: 16 },
          {
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            stagger: 0.06,
            scrollTrigger: {
              trigger: ".contact-form-card",
              start: "top 82%",
            },
          }
        );
      }

      // ────────────────────────────────────────────────────────────────────────
      // 14. FOOTER REVEAL
      // ────────────────────────────────────────────────────────────────────────
      gsap.fromTo(
        ".site-footer .section-shell",
        { opacity: 0, y: 42 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".site-footer",
            start: "top 82%",
          },
        }
      );

      // ────────────────────────────────────────────────────────────────────────
      // 15. GENERIC .gsap-reveal, the one entrance pattern for cards
      // ────────────────────────────────────────────────────────────────────────
      qsa<HTMLElement>(".gsap-reveal").forEach((el) => {
        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 82%",
          },
        });
      });

    }); // end ctx

    // ────────────────────────────────────────────────────────────────────────
    // 6a & 10b. DESKTOP-ONLY: hero parallax + phone inner parallax
    // wrapped in matchMedia so mobile skips them for performance
    // ────────────────────────────────────────────────────────────────────────
    // (Former hero aura/holo/lume parallax removed: those layers no longer
    // exist in the hero markup and only produced GSAP target warnings.)

    // ────────────────────────────────────────────────────────────────────────
    // 16. MAGNETIC BUTTONS (hover devices only)
    // ────────────────────────────────────────────────────────────────────────
    mm.add("(hover: hover) and (pointer: fine)", () => {
      const magneticEls = qsa<HTMLElement>(".magnetic");
      const cleanups: (() => void)[] = [];

      magneticEls.forEach((el) => {
        const xTo = gsap.quickTo(el, "x", { duration: 0.3, ease: "power3.out" });
        const yTo = gsap.quickTo(el, "y", { duration: 0.3, ease: "power3.out" });

        const onMove = (event: PointerEvent) => {
          const rect = el.getBoundingClientRect();
          const cx = rect.left + rect.width / 2;
          const cy = rect.top + rect.height / 2;
          const dx = Math.max(-7, Math.min(7, event.clientX - cx));
          const dy = Math.max(-7, Math.min(7, event.clientY - cy));
          xTo(dx);
          yTo(dy);
        };

        const onLeave = () => {
          xTo(0);
          yTo(0);
        };

        el.addEventListener("pointermove", onMove);
        el.addEventListener("pointerleave", onLeave);
        cleanups.push(() => {
          el.removeEventListener("pointermove", onMove);
          el.removeEventListener("pointerleave", onLeave);
        });
      });

      // Return cleanup function for this matchMedia condition
      return () => {
        cleanups.forEach((fn) => fn());
      };
    });

    // ────────────────────────────────────────────────────────────────────────
    // 17. REFRESH
    // ────────────────────────────────────────────────────────────────────────
    const onLoad = () => ScrollTrigger.refresh();
    const refreshId = window.setTimeout(() => ScrollTrigger.refresh(), 120);
    window.addEventListener("load", onLoad);

    // ────────────────────────────────────────────────────────────────────────
    // 18. CLEANUP
    // ────────────────────────────────────────────────────────────────────────
    return () => {
      window.clearTimeout(refreshId);
      window.removeEventListener("load", onLoad);
      if (rafId) cancelAnimationFrame(rafId);
      mm.revert();
      ctx.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
      lenis?.destroy();
    };
  }, []);

  return null;
}
