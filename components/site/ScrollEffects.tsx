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
      (["works", "story", "process", "contact"] as const).forEach((id) => {
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
      // 6. HERO — entrance is pure CSS (hero-word-in / hero-kicker-in keyframes).
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
      // 7. STORY PER-WORD REVEAL (Magic-UI-style)
      // ────────────────────────────────────────────────────────────────────────
      const storySection = qs<HTMLElement>(".story-section");
      const storyWords = qsa<HTMLElement>(".story-word");
      const storyResultPanel = qs<HTMLElement>(".story-result-panel");

      // Also keep existing portrait / intro tweens that live inside the old
      // per-LINE scrub. We layer the new per-WORD spec on top with its own
      // trigger while preserving the portrait/intro chip intro.
      const storyPortrait = qs<HTMLElement>(".story-portrait-chip");
      const storyIntro = qs<HTMLElement>(".story-intro-copy");
      const storyPin = qs<HTMLElement>(".story-pin");
      const storyLines = qsa<HTMLElement>(".story-line");

      if (storySection && storyWords.length > 0) {
        // Set initial word state
        gsap.set(storyWords, { opacity: 0.12, yPercent: 18 });

        if (storyResultPanel) {
          gsap.set(storyResultPanel, { opacity: 0, y: 34 });
        }

        // Per-word scrub timeline
        const wordTl = gsap.timeline({
          scrollTrigger: {
            trigger: storySection,
            start: "top 30%",
            end: () => `+=${window.innerHeight * 1.35}`,
            scrub: 0.5,
            invalidateOnRefresh: true,
          },
        });

        wordTl.to(storyWords, {
          opacity: 1,
          yPercent: 0,
          duration: 0.35,
          ease: "none",
          stagger: 0.05,
        });

        if (storyResultPanel) {
          wordTl.fromTo(
            storyResultPanel,
            { opacity: 0, y: 34 },
            { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
            ">-0.1"
          );
        }
      }

      // Preserve the portrait chip + intro copy entrance (from original per-LINE timeline)
      // if the pinned story block exists — run a separate non-scrubbed reveal
      if (storySection && storyPin && storyLines.length > 0) {
        const isMobile = window.matchMedia("(max-width: 640px)").matches;
        const storyStep = isMobile ? 0.54 : 0.44;
        const introOffset = isMobile ? 0.26 : 0.34;
        const dimOpacity = isMobile ? 0.24 : 0.34;

        gsap.set(storyLines, {
          opacity: isMobile ? 0.18 : 0.36,
          y: isMobile ? 16 : 22,
          filter: "blur(0px)",
        });

        if (storyPortrait) {
          gsap.set(storyPortrait, {
            opacity: 0,
            y: isMobile ? 12 : 20,
            scale: 0.88,
            filter: isMobile ? "blur(0px)" : "blur(8px)",
          });
        }
        if (storyIntro) {
          gsap.set(storyIntro, {
            opacity: 0,
            y: isMobile ? 12 : 18,
            filter: isMobile ? "blur(0px)" : "blur(6px)",
          });
        }

        const storyTl = gsap.timeline({
          scrollTrigger: {
            trigger: storySection,
            start: isMobile ? "top top" : "top 8%",
            end: () => `+=${window.innerHeight * (isMobile ? 2.55 : 1.9)}`,
            scrub: isMobile ? 0.7 : 0.5,
            pin: storyPin,
            pinSpacing: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        if (storyPortrait) {
          storyTl.to(
            storyPortrait,
            {
              opacity: 1,
              y: 0,
              scale: 1,
              filter: "blur(0px)",
              duration: isMobile ? 0.45 : 0.55,
              ease: "power3.out",
            },
            0
          );
        }

        if (storyIntro) {
          storyTl.to(
            storyIntro,
            {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              duration: isMobile ? 0.5 : 0.65,
              ease: "power3.out",
            },
            0.08
          );
        }

        storyLines.forEach((line, index) => {
          storyTl.to(
            line,
            { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.7, ease: "power2.out" },
            introOffset + index * storyStep
          );
          if (index > 0) {
            storyTl.to(
              storyLines[index - 1],
              { opacity: dimOpacity, y: isMobile ? -5 : -8, duration: 0.6, ease: "power2.out" },
              introOffset + index * storyStep
            );
          }
        });
      }

      // ────────────────────────────────────────────────────────────────────────
      // 8. STATS COUNT-UP
      // ────────────────────────────────────────────────────────────────────────
      qsa<HTMLElement>(".count-target[data-countup]").forEach((el) => {
        const target = parseInt(el.dataset.countup ?? "0", 10);
        el.textContent = "0";

        ScrollTrigger.create({
          trigger: el,
          start: "top 82%",
          once: true,
          onEnter: () => {
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
      // 9. CAPABILITY CHIPS
      // ────────────────────────────────────────────────────────────────────────
      const chips = qsa<HTMLElement>(".capability-chip");
      if (chips.length > 0) {
        gsap.fromTo(
          chips,
          (index: number) => ({
            opacity: 0,
            y: 34,
            rotateY: index % 2 ? 9 : -9,
            transformPerspective: 900,
          }),
          {
            opacity: 1,
            y: 0,
            rotateY: 0,
            duration: 0.75,
            ease: "power3.out",
            stagger: 0.07,
            scrollTrigger: {
              trigger: ".capability-section",
              start: "top 70%",
            },
          }
        );
      }

      // ────────────────────────────────────────────────────────────────────────
      // 11. PROCESS PANEL CLIP-PATH REVEAL
      // ────────────────────────────────────────────────────────────────────────
      const processPanels = qsa<HTMLElement>("#process .premium-panel");
      if (processPanels.length > 0) {
        gsap.fromTo(
          processPanels,
          { clipPath: "inset(0 0 100% 0)", y: 26, opacity: 0.35 },
          {
            clipPath: "inset(0 0 0% 0)",
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.inOut",
            stagger: 0.09,
            scrollTrigger: {
              trigger: "#process",
              start: "top 72%",
            },
          }
        );
      }

      // ────────────────────────────────────────────────────────────────────────
      // 12. TESTIMONIALS — alternating x slide-in
      // ────────────────────────────────────────────────────────────────────────
      const figures = qsa<HTMLElement>(".testimonials-section figure");
      if (figures.length > 0) {
        gsap.fromTo(
          figures,
          (index: number) => ({ x: index % 2 === 0 ? 42 : -42, opacity: 0 }),
          {
            x: 0,
            opacity: 1,
            duration: 0.75,
            ease: "power3.out",
            stagger: 0.1,
            scrollTrigger: {
              trigger: ".testimonials-section",
              start: "top 75%",
            },
          }
        );
      }

      // ────────────────────────────────────────────────────────────────────────
      // 13. CONTACT — card 3D entrance + form controls stagger
      // ────────────────────────────────────────────────────────────────────────
      gsap.fromTo(
        ".contact-form-card",
        { opacity: 0, y: 46, rotateY: -7 },
        {
          opacity: 1,
          y: 0,
          rotateY: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".contact-section",
            start: "top 66%",
          },
        }
      );

      const formControls = qsa<HTMLElement>(".form-control");
      if (formControls.length > 0) {
        gsap.fromTo(
          formControls,
          { y: 16, opacity: 0 },
          {
            y: 0,
            opacity: 1,
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
      // 15. GENERIC .gsap-reveal (exclude #process and .testimonials-section)
      // ────────────────────────────────────────────────────────────────────────
      qsa<HTMLElement>(".gsap-reveal").forEach((el) => {
        if (el.closest("#process") || el.closest(".testimonials-section")) return;

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

      // ────────────────────────────────────────────────────────────────────────
      // Existing misc parallax helpers (kept from original)
      // ────────────────────────────────────────────────────────────────────────
      qsa<HTMLElement>(".parallax-soft").forEach((el) => {
        gsap.to(el, {
          yPercent: -8,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });

      qsa<HTMLElement>(".background-shader__orb").forEach((orb, index) => {
        gsap.to(orb, {
          xPercent: index % 2 === 0 ? 8 : -8,
          yPercent: index % 2 === 0 ? -6 : 6,
          ease: "none",
          scrollTrigger: {
            trigger: ".story-section",
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });

      // ── About points (kept from original) ───────────────────────────────────
      gsap.fromTo(
        ".about-point",
        { opacity: 0, x: 28 },
        {
          opacity: 1,
          x: 0,
          duration: 0.55,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".about-section",
            start: "top 64%",
          },
        }
      );
    }); // end ctx

    // ────────────────────────────────────────────────────────────────────────
    // 6a & 10b. DESKTOP-ONLY: hero parallax + phone inner parallax
    // wrapped in matchMedia so mobile skips them for performance
    // ────────────────────────────────────────────────────────────────────────
    mm.add("(min-width: 900px)", () => {
      const heroEl = qs<HTMLElement>(".hero-section");

      if (heroEl) {
        const heroParallaxTl = gsap.timeline({
          scrollTrigger: {
            trigger: heroEl,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });

        heroParallaxTl
          .to(".hero-aura-layer", { yPercent: 16, ease: "none" }, 0)
          .to(".hero-holo-layer", { yPercent: -12, ease: "none" }, 0)
          .to(".hero-lume--right", { y: -70, ease: "none" }, 0)
          .to(".hero-lume--left", { y: 60, ease: "none" }, 0);
      }

    });

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
