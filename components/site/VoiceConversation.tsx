"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ConversationProvider, useConversation } from "@elevenlabs/react";
import { MessageCircle, Mic, PhoneOff } from "lucide-react";

const MAX_SESSION_MS = 180_000;
const COUNTDOWN_FROM_S = 30;

type UiState = "connecting" | "live" | "ended" | "error";

// Loaded dynamically (client-only) the moment the visitor asks to talk, so
// the ElevenLabs WebRTC stack never touches the initial bundle.
//
// useConversation() throws "must be used within a ConversationProvider" unless
// a provider sits ABOVE the component calling it, so the hook cannot live in
// this outer component. TypeScript cannot catch a missing provider (it is a
// runtime context lookup), which is how this shipped green and still broke the
// page in production.
export function VoiceConversation(props: { whatsapp: string; onClose: () => void }) {
  return (
    <ConversationProvider>
      <VoiceConversationInner {...props} />
    </ConversationProvider>
  );
}

function VoiceConversationInner({ whatsapp, onClose }: { whatsapp: string; onClose: () => void }) {
  const [uiState, setUiState] = useState<UiState>("connecting");
  const [mode, setMode] = useState<"listening" | "speaking">("listening");
  const [secondsLeft, setSecondsLeft] = useState<number | null>(null);
  const startedAt = useRef<number>(0);
  const startedRef = useRef(false);

  const conversation = useConversation({
    onConnect: () => {
      startedAt.current = Date.now();
      setUiState("live");
    },
    onDisconnect: () => setUiState((prev) => (prev === "error" ? prev : "ended")),
    onError: () => setUiState("error"),
    onModeChange: ({ mode: nextMode }: { mode: "listening" | "speaking" }) => setMode(nextMode),
  });

  const endSession = useCallback(() => {
    try {
      void conversation.endSession();
    } catch {
      // already closed
    }
  }, [conversation]);

  // Single-flight start on mount: signed URL -> mic permission -> session.
  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/voice/signed-url", { cache: "no-store" });
        if (!res.ok) throw new Error("signed-url-failed");
        const { signedUrl } = (await res.json()) as { signedUrl?: string };
        if (!signedUrl) throw new Error("signed-url-missing");
        if (cancelled) return;
        await conversation.startSession({ signedUrl });
      } catch {
        if (!cancelled) setUiState("error");
      }
    })();

    return () => {
      cancelled = true;
      endSession();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Cost guardrails: hard 3-minute cap with a visible countdown, and end the
  // session when the tab goes to the background.
  useEffect(() => {
    if (uiState !== "live") return;

    const tick = window.setInterval(() => {
      const elapsed = Date.now() - startedAt.current;
      const left = Math.max(0, Math.ceil((MAX_SESSION_MS - elapsed) / 1000));
      setSecondsLeft(left <= COUNTDOWN_FROM_S ? left : null);
      if (elapsed >= MAX_SESSION_MS) endSession();
    }, 1000);

    const onVisibility = () => {
      if (document.visibilityState === "hidden") endSession();
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      window.clearInterval(tick);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [uiState, endSession]);

  if (uiState === "error") {
    return (
      <div className="voice-live" dir="rtl">
        <p className="voice-live__status voice-live__status--error">
          לא הצלחנו לפתוח שיחה כרגע. יכול להיות שאין גישה למיקרופון, או שהסוכן עמוס.
        </p>
        <div className="voice-live__actions">
          <a href={whatsapp} target="_blank" rel="noreferrer" className="btn-primary">
            דברו איתי בוואטסאפ
            <MessageCircle size={18} />
          </a>
          <button type="button" className="btn-secondary" onClick={onClose}>
            סגירה
          </button>
        </div>
      </div>
    );
  }

  if (uiState === "ended") {
    return (
      <div className="voice-live" dir="rtl">
        <p className="voice-live__status">השיחה הסתיימה. ככה בדיוק זה יכול להישמע גם אצלכם בעסק.</p>
        <div className="voice-live__actions">
          <a href={whatsapp} target="_blank" rel="noreferrer" className="btn-primary">
            רוצים סוכן כזה? דברו איתי
            <MessageCircle size={18} />
          </a>
          <button type="button" className="btn-secondary" onClick={onClose}>
            סגירה
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="voice-live" dir="rtl">
      <div className={`voice-live__indicator voice-live__indicator--${mode}`} aria-hidden="true">
        <Mic size={18} />
      </div>
      <p className="voice-live__status" aria-live="polite">
        {uiState === "connecting"
          ? "פותח שיחה... נבקש גישה למיקרופון"
          : mode === "speaking"
            ? "הסוכן מדבר"
            : "הסוכן מקשיב, אפשר לדבר"}
      </p>
      {secondsLeft !== null ? (
        <p className="voice-live__countdown" dir="rtl">
          השיחה תסתיים בעוד {secondsLeft} שניות
        </p>
      ) : null}
      <button type="button" className="btn-secondary" onClick={endSession}>
        סיום שיחה
        <PhoneOff size={17} />
      </button>
    </div>
  );
}
