"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ConversationProvider, useConversation } from "@elevenlabs/react";
import { MessageCircle, Mic, MicOff, PhoneOff } from "lucide-react";
import { collectVisitorContext, requestMicrophone } from "@/lib/voice-context";

const MAX_SESSION_MS = 180_000;
const COUNTDOWN_FROM_S = 30;

type UiState = "connecting" | "live" | "ended" | "error" | "mic-denied";

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
  // Bumped by the retry button: a denied mic is the one failure the visitor
  // can fix in place, so it gets a second run of the start effect.
  const [attempt, setAttempt] = useState(0);
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

  const retry = useCallback(() => {
    startedRef.current = false;
    setUiState("connecting");
    setAttempt((n) => n + 1);
  }, []);

  // Single-flight start: mic permission -> WebRTC token -> session.
  //
  // The mic comes first on purpose. It is the step most likely to fail, it is
  // the only one the visitor can fix, and asking for the signed URL first
  // would spend one of the five per-window issues from the rate limiter on a
  // call that never happens.
  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    let cancelled = false;
    (async () => {
      try {
        await requestMicrophone();
      } catch {
        if (!cancelled) setUiState("mic-denied");
        return;
      }
      if (cancelled) return;

      try {
        const res = await fetch("/api/voice/token", { cache: "no-store" });
        if (!res.ok) throw new Error("conversation-token-failed");
        const { conversationToken } = (await res.json()) as { conversationToken?: string };
        if (!conversationToken) throw new Error("conversation-token-missing");
        if (cancelled) return;
        // startSession() is void on the React hook, so a failure inside it
        // surfaces through onError rather than this catch.
        conversation.startSession({
          conversationToken,
          connectionType: "webrtc",
          // Where the visitor came from, on what device, at what hour in
          // Israel. Turns the agent's opener into something specific instead
          // of a question it already has the answer to.
          dynamicVariables: collectVisitorContext(),
        });
      } catch {
        if (!cancelled) setUiState("error");
      }
    })();

    return () => {
      cancelled = true;
      // React Strict Mode replays effects in development. Release the
      // single-flight guard so the second setup can start normally.
      startedRef.current = false;
      endSession();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attempt]);

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

  if (uiState === "mic-denied") {
    return (
      <div className="voice-live" dir="rtl">
        <div className="voice-live__indicator" aria-hidden="true">
          <MicOff size={18} />
        </div>
        <p className="voice-live__status voice-live__status--error">
          בלי מיקרופון אין שיחה. אפשר לאשר גישה בסמל שליד כתובת האתר, ולנסות שוב.
        </p>
        <div className="voice-live__actions">
          <button type="button" className="btn-primary" onClick={retry}>
            נסו שוב
            <Mic size={18} />
          </button>
          <a href={whatsapp} target="_blank" rel="noreferrer" className="btn-secondary">
            או דברו איתי בוואטסאפ
            <MessageCircle size={17} />
          </a>
        </div>
      </div>
    );
  }

  if (uiState === "error") {
    return (
      <div className="voice-live" dir="rtl">
        <p className="voice-live__status voice-live__status--error">
          לא הצלחנו לפתוח שיחה כרגע. יכול להיות שהסוכן עמוס, או שהחיבור נפל באמצע.
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
      <button
        type="button"
        className="btn-secondary"
        onClick={uiState === "connecting" ? onClose : endSession}
      >
        {uiState === "connecting" ? "ביטול" : "סיום שיחה"}
        <PhoneOff size={17} />
      </button>
    </div>
  );
}
