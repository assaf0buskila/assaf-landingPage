"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
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
    text: "היי אסף, יש לי בית קפה קטן ואני צריך אתר שיעזור לי לקבל יותר הזמנות.",
    pauseAfter: 420,
  },
  {
    id: 2,
    role: "assaf",
    label: "אסף AI",
    text: "מעולה. קודם נסדר את המסר: למה לבוא דווקא אליכם, איפה רואים תפריט, ואיך מזמינים בלי להסתבך.",
    pauseAfter: 500,
  },
  {
    id: 3,
    role: "visitor",
    label: "לקוח",
    text: "חשוב לי שיפנו בוואטסאפ ושיראו שהתפריט איכותי.",
    pauseAfter: 440,
  },
  {
    id: 4,
    role: "assaf",
    label: "אסף AI",
    text: "אז הכיוון ברור: דף פתיחה חזק, תפריט דיגיטלי, כפתור וואטסאפ קבוע, תמונות שמרגישות אמיתיות, ועוזר AI קטן לשאלות חוזרות.",
    pauseAfter: 520,
  },
  {
    id: 5,
    role: "assaf",
    label: "אסף AI",
    text: "זה לא רק אתר. זה מסלול קצר מעניין לפנייה.",
    pauseAfter: 0,
  },
];

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
  const reduceMotion = Boolean(useReducedMotion());
  const [activeIndex, setActiveIndex] = useState(reduceMotion ? heroMessages.length - 1 : -1);
  const [complete, setComplete] = useState(reduceMotion);

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
    <div className="ai-hero-chat" dir="rtl" aria-label="הדגמת שיחת אפיון לאתר">
      <div className="ai-hero-chat__topbar">
        <div className="ai-hero-chat__brand">
          <span className="ai-hero-chat__bot">
            <Bot size={17} />
          </span>
          <span>
            <strong>סטודיו האתר של אסף</strong>
            <small>אפיון חכם בזמן אמת</small>
          </span>
        </div>
        <span className="ai-hero-chat__status">
          <span />
          פעיל
        </span>
      </div>

      <div className="ai-hero-chat__messages" aria-live="polite">
        <AnimatePresence initial={false}>
          {visibleMessages.map((message, index) => {
            const isAssaf = message.role === "assaf";
            const isActive = index === activeIndex && !complete;

            return (
              <motion.div
                key={message.id}
                className={`ai-hero-message ${isAssaf ? "ai-hero-message--assaf" : "ai-hero-message--visitor"}`}
                initial={reduceMotion ? false : { opacity: 0, y: 14, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.28, ease: "easeOut" }}
              >
                <div className="ai-hero-message__avatar" aria-hidden="true">
                  {isAssaf ? (
                    <Image
                      src="/assets/about-me.png"
                      alt=""
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
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      <motion.div
        className="ai-hero-insight"
        initial={reduceMotion ? false : { opacity: 0, y: 18 }}
        animate={complete ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
        transition={{ duration: 0.42, ease: "easeOut" }}
      >
        <span className="ai-hero-insight__icon" aria-hidden="true">
          <Sparkles size={17} />
        </span>
        <div>
          <strong>כיוון ראשון לאתר</strong>
          <p>מסר ברור, אמון מהיר, תפריט דיגיטלי ופנייה קלה בוואטסאפ.</p>
        </div>
        <CheckCircle2 className="ai-hero-insight__check" size={20} aria-hidden="true" />
      </motion.div>
    </div>
  );
}
