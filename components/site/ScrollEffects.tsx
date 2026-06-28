"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function ScrollEffects() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 0.9,
      smoothWheel: true,
      wheelMultiplier: 1,
    });

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };

    rafId = requestAnimationFrame(raf);
    lenis.on("scroll", ScrollTrigger.update);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-word-animated",
        { opacity: 0, y: 72, filter: "blur(8px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          delay: 0.12,
          duration: 1,
          stagger: 0.08,
          ease: "power4.out",
        }
      );

      gsap.fromTo(
        ".hero-profile-shell",
        { opacity: 0, scale: 0.82, rotate: -12, filter: "blur(10px)" },
        {
          opacity: 1,
          scale: 1,
          rotate: 0,
          filter: "blur(0px)",
          delay: 0.18,
          duration: 1.15,
          ease: "power4.out",
        }
      );

      gsap.fromTo(
        ".hero-floating-note",
        { opacity: 0, y: 24, scale: 0.94 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          delay: 0.3,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
        }
      );

      gsap.utils.toArray<HTMLElement>(".gsap-reveal").forEach((element) => {
        gsap.to(element, {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start: "top 82%",
          },
        });
      });

      gsap.fromTo(
        ".capability-chip",
        { opacity: 0, filter: "blur(8px)" },
        {
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.7,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".capability-section",
            start: "top 68%",
          },
        }
      );

      gsap.utils.toArray<HTMLElement>(".project-phone-card").forEach((card, index) => {
        gsap.fromTo(
          card,
          {
            opacity: 0,
            y: 70,
            rotate: index % 2 === 0 ? 4 : -4,
          },
          {
            opacity: 1,
            y: 0,
            rotate: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 78%",
            },
          }
        );
      });

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

      gsap.fromTo(
        "footer .section-shell",
        { opacity: 0, y: 42 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: "footer",
            start: "top 82%",
          },
        }
      );

      const storySection = document.querySelector<HTMLElement>(".story-section");
      const storyPin = document.querySelector<HTMLElement>(".story-pin");
      const storyLines = gsap.utils.toArray<HTMLElement>(".story-line");
      const storyResult = document.querySelector<HTMLElement>(".story-result-panel");
      const storyPortrait = document.querySelector<HTMLElement>(".story-portrait-chip");
      const storyIntro = document.querySelector<HTMLElement>(".story-intro-copy");

      if (storySection && storyPin && storyLines.length > 0) {
        gsap.set(storyLines, { opacity: 0.52, y: 22, filter: "blur(0px)" });
        if (storyResult) {
          gsap.set(storyResult, { opacity: 0, y: 34 });
        }
        if (storyPortrait) {
          gsap.set(storyPortrait, { opacity: 0, y: 20, scale: 0.82, filter: "blur(8px)" });
        }
        if (storyIntro) {
          gsap.set(storyIntro, { opacity: 0, y: 18, filter: "blur(6px)" });
        }

        const storyTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: storySection,
            start: "top 12%",
            end: () => `+=${window.innerHeight * 1.3}`,
            scrub: 0.5,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        if (storyPortrait) {
          storyTimeline.to(
            storyPortrait,
            {
              opacity: 1,
              y: 0,
              scale: 1,
              filter: "blur(0px)",
              duration: 0.55,
              ease: "power3.out",
            },
            0
          );
        }

        if (storyIntro) {
          storyTimeline.to(
            storyIntro,
            {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              duration: 0.65,
              ease: "power3.out",
            },
            0.08
          );
        }

        storyLines.forEach((line, index) => {
          storyTimeline.to(
            line,
            {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              duration: 0.7,
              ease: "power2.out",
            },
            0.36 + index * 0.42
          );

          if (index > 0) {
            storyTimeline.to(
              storyLines[index - 1],
              {
                opacity: 0.62,
                y: -8,
                duration: 0.6,
                ease: "power2.out",
              },
              0.36 + index * 0.42
            );
          }
        });

        if (storyResult) {
          storyTimeline.to(
            storyResult,
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power2.out",
            },
            0.36 + storyLines.length * 0.42
          );
        }
      }

      gsap.utils.toArray<HTMLElement>(".parallax-soft").forEach((element) => {
        gsap.to(element, {
          yPercent: -8,
          ease: "none",
          scrollTrigger: {
            trigger: element,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });

      gsap.utils.toArray<HTMLElement>(".background-shader__orb").forEach((orb, index) => {
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
    });

    const refreshId = window.setTimeout(() => ScrollTrigger.refresh(), 120);

    return () => {
      window.clearTimeout(refreshId);
      cancelAnimationFrame(rafId);
      ctx.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      lenis.destroy();
    };
  }, []);

  return null;
}
