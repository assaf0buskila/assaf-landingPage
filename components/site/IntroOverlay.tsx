"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, Sparkles } from "lucide-react";
import { AiHeroChat } from "@/components/site/AiHeroChat";

export function IntroOverlay() {
  const [visible, setVisible] = useState(true);
  const [chatDone, setChatDone] = useState(false);
  const [exiting, setExiting] = useState(false);
  const exitTimer = useRef<number | null>(null);

  const dismiss = useCallback(() => {
    if (exiting) return;
    setExiting(true);
    try {
      sessionStorage.setItem("assaf-intro-seen", "1");
    } catch {
      // storage unavailable (private mode) — overlay will just replay next visit
    }
    exitTimer.current = window.setTimeout(() => setVisible(false), 460);
  }, [exiting]);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem("assaf-intro-seen") === "1";
    } catch {
      seen = false;
    }

    if (seen || window.location.search.includes("skipIntro=1")) {
      setVisible(false);
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
      if (exitTimer.current) window.clearTimeout(exitTimer.current);
    };
  }, []);

  useEffect(() => {
    if (!visible) document.body.style.overflow = "";
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      className={`intro-overlay ${exiting ? "intro-overlay--exit" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-label="פתיחת אתר אסף בוסקילה"
      dir="rtl"
    >
      <video
        className="intro-overlay__video"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
      >
        <source src="/assets/inspiration/element1.mp4" type="video/mp4" />
      </video>

      <div className="intro-overlay__wash" />
      <div className="intro-overlay__content">
        <div className="intro-overlay__header">
          <Image
            src="/assets/about-me.png"
            alt="אסף בוסקילה"
            width={72}
            height={72}
            priority
            className="intro-overlay__avatar"
          />
          <div>
            <span className="intro-overlay__eyebrow">
              <Sparkles size={15} />
              הדגמה חיה לפני הכניסה
            </span>
            <p className="intro-overlay__title">האתר של אסף</p>
            <p className="intro-overlay__sub">תראו איך רעיון לאתר הופך לכיוון ברור תוך כמה שניות.</p>
          </div>
        </div>

        <div className="intro-overlay__chat">
          <AiHeroChat onComplete={() => setChatDone(true)} />
        </div>

        <button
          type="button"
          className="intro-overlay__button"
          aria-label="כניסה לאתר של אסף"
          onClick={dismiss}
        >
          {chatDone ? "כניסה לאתר" : "דלגו לאתר"}
          <ChevronLeft size={18} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
