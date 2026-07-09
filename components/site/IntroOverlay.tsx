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
    if (!chatDone || exiting) return;
    setExiting(true);
    exitTimer.current = window.setTimeout(() => setVisible(false), 460);
  }, [chatDone, exiting]);

  useEffect(() => {
    if (window.location.search.includes("skipIntro=1")) {
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
            <h1>האתר של אסף</h1>
            <p>תראו איך רעיון לאתר הופך לכיוון ברור תוך כמה שניות.</p>
          </div>
        </div>

        <div className="intro-overlay__chat">
          <AiHeroChat onComplete={() => setChatDone(true)} />
        </div>

        <button
          type="button"
          className="intro-overlay__button"
          aria-label="כניסה לאתר של אסף"
          disabled={!chatDone}
          onClick={dismiss}
        >
          {chatDone ? "כניסה לאתר" : "מסיים לבנות כיוון"}
          <ChevronLeft size={18} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
