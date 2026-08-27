"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { Bot, CheckCircle2, MessageCircle, Sparkles } from "lucide-react";

type ChatRole = "visitor" | "assaf";

type HeroMessage = {
  id: number;
  role: ChatRole;
  label: string;
  text: string;
  pauseAfter?: number;
};

const heroMessages: HeroMessage[] = [
  {
    id: 1,
    role: "visitor",
    label: "לקוח",
    text: "היי אסף, יש לי מוסך ואני מפספס שיחות של לקוחות אחרי שש בערב.",
    pauseAfter: 420,
  },
  {
    id: 2,
    role: "assaf",
    label: "אסף",
    text: "וכל שיחה כזאת היא לקוח שממשיך למוסך הבא בגוגל. בוא נסגור את החור הזה.",
    pauseAfter: 500,
  },
  {
    id: 3,
    role: "visitor",
    label: "לקוח",
    text: "רק בלי מערכות מסובכות. אין לי זמן ללמוד תוכנה חדשה.",
    pauseAfter: 440,
  },
  {
    id: 4,
    role: "assaf",
    label: "אסף",
    text: "לא תצטרך. סוכן קולי שעונה אחרי שעות הפעילות, קובע תור ושולח לך סיכום לוואטסאפ. ואוטומציה שעושה פולואפ להצעות מחיר.",
    pauseAfter: 520,
  },
  {
    id: 5,
    role: "assaf",
    label: "אסף",
    text: "זו לא עוד תוכנה שצריך לתחזק. זה עובד שעובד בשבילך.",
    pauseAfter: 0,
  },
];

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

function TypedMessage({
  message,
  active,
  instant,
  onDone,
}: {
  message: HeroMessage;
  active: boolean;
  instant: boolean;
  onDone: () => void;
}) {
  const [typed, setTyped] = useState(instant || !active ? message.text : "");

  useEffect(() => {
    if (instant || !active) {
      setTyped(message.text);
      return;
    }

    let cancelled = false;
    let index = 0;
    setTyped("");

    const letters = Array.from(message.text);
    const speed = message.role === "assaf" ? 18 : 13;
    const timer = window.setInterval(() => {
      index += 1;
      setTyped(letters.slice(0, index).join(""));

      if (index >= letters.length) {
        window.clearInterval(timer);
        window.setTimeout(() => {
          if (!cancelled) onDone();
        }, 260);
      }
    }, speed);

    return () => {
      cancelled = true;
      window.clearInterval(timer);
    };
  }, [active, instant, message.role, message.text, onDone]);

  return (
    <p>
      {typed}
      {active && !instant ? <span className="ai-chat-caret" aria-hidden="true" /> : null}
    </p>
  );
}

export function AiHeroChat({ onComplete }: { onComplete?: () => void }) {
  const reduceMotion = usePrefersReducedMotion();
  const [activeIndex, setActiveIndex] = useState(-1);
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    if (reduceMotion) {
      setActiveIndex(heroMessages.length - 1);
      setComplete(true);
      return;
    }

    const timer = window.setTimeout(() => setActiveIndex(0), 360);
    return () => window.clearTimeout(timer);
  }, [reduceMotion]);

  useEffect(() => {
    if (!complete) return;
    onComplete?.();
  }, [complete, onComplete]);

  const visibleMessages = useMemo(() => {
    if (reduceMotion) return heroMessages;
    return heroMessages.slice(0, activeIndex + 1);
  }, [activeIndex, reduceMotion]);

  const handleDone = (messageId: number) => {
    const currentIndex = heroMessages.findIndex((message) => message.id === messageId);
    if (currentIndex !== activeIndex) return;

    if (currentIndex >= heroMessages.length - 1) {
      window.setTimeout(() => setComplete(true), 320);
      return;
    }

    const delay = heroMessages[currentIndex].pauseAfter ?? 420;
    window.setTimeout(() => setActiveIndex(currentIndex + 1), delay);
  };

  return (
    <div className="ai-hero-chat" dir="rtl" aria-label="הדגמת שיחת אבחון לפתרון AI">
      <div className="ai-hero-chat__topbar">
        <div className="ai-hero-chat__brand">
          <span className="ai-hero-chat__bot">
            <Bot size={17} />
          </span>
          <span>
            <strong>סטודיו ה-AI של אסף</strong>
            <small>ככה נראית שיחת אבחון</small>
          </span>
        </div>
        <span className="ai-hero-chat__status">
          <span />
          פעיל
        </span>
      </div>

      <div className="ai-hero-chat__messages" aria-live="polite">
        {visibleMessages.map((message, index) => {
          const isAssaf = message.role === "assaf";
          const isActive = index === activeIndex && !complete;

          return (
            <div
              key={message.id}
              className={`ai-hero-message ${isAssaf ? "ai-hero-message--assaf" : "ai-hero-message--visitor"}`}
            >
              <div className="ai-hero-message__avatar" aria-hidden="true">
                {isAssaf ? (
                  <Image
                    src="/assets/assaf-photo.jpg"
                    alt="אסף בוסקילה"
                    width={44}
                    height={44}
                    sizes="44px"
                  />
                ) : (
                  <MessageCircle size={17} />
                )}
              </div>
              <div className="ai-hero-message__content">
                <span className="ai-hero-message__label">{message.label}</span>
                <div className="ai-hero-message__bubble">
                  <TypedMessage
                    message={message}
                    active={isActive}
                    instant={reduceMotion || index < activeIndex || complete}
                    onDone={() => handleDone(message.id)}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className={`ai-hero-insight ${complete ? "ai-hero-insight--visible" : ""}`}>
        <span className="ai-hero-insight__icon" aria-hidden="true">
          <Sparkles size={17} />
        </span>
        <div>
          <strong>כיוון ראשון לפתרון</strong>
          <p>סוכן קולי אחרי שעות, פולואפ אוטומטי, והכול מתנקז לוואטסאפ שכבר יש לך.</p>
        </div>
        <CheckCircle2 className="ai-hero-insight__check" size={20} aria-hidden="true" />
      </div>
    </div>
  );
}
