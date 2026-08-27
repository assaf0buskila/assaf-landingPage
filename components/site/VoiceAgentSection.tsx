"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { MessageCircle, Mic } from "lucide-react";
import { InteractiveRobotSpline } from "@/components/ui/interactive-3d-robot";
import { VoiceErrorBoundary } from "@/components/site/VoiceErrorBoundary";

const ROBOT_SCENE_URL = "https://prod.spline.design/PyzDhpQ9E5f1E3MT/scene.splinecode";

// The ElevenLabs stack loads only after the visitor clicks to talk.
const VoiceConversation = dynamic(
  () => import("@/components/site/VoiceConversation").then((m) => m.VoiceConversation),
  { ssr: false, loading: () => <p className="voice-stage__note">טוען את הסוכן...</p> }
);

// enabled=false (no ELEVENLABS_* env on the server) renders the "coming
// soon" card, so the section never breaks in production.
export function VoiceAgentSection({ whatsapp, enabled = false }: { whatsapp: string; enabled?: boolean }) {
  const stageRef = useRef<HTMLDivElement>(null);
  const [robotCapable, setRobotCapable] = useState(false);
  const [inView, setInView] = useState(false);
  const [robotReady, setRobotReady] = useState(false);
  const [launched, setLaunched] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const wide = window.matchMedia("(min-width: 900px)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const canvas = document.createElement("canvas");
    const webgl = Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl"));
    setRobotCapable(fine && wide && webgl && !reduced);
  }, []);

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting && entry.intersectionRatio >= 0.35),
      { rootMargin: "0px", threshold: 0.35 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!robotCapable || !inView || launched) {
      setRobotReady(false);
      return;
    }

    const timer = window.setTimeout(() => setRobotReady(true), 4_000);
    return () => window.clearTimeout(timer);
  }, [robotCapable, inView, launched]);

  const showRobot = robotCapable && inView && robotReady && !launched;

  return (
    <div ref={stageRef} className="voice-stage premium-panel">
      {showRobot ? (
        <div className="voice-robot" aria-hidden="true">
          <InteractiveRobotSpline scene={ROBOT_SCENE_URL} className="voice-robot__canvas" />
        </div>
      ) : (
        <div className="voice-orb" aria-hidden="true">
          <span className="voice-orb__ring" />
          <span className="voice-orb__core" />
        </div>
      )}

      {enabled ? (
        launched ? (
          <VoiceErrorBoundary whatsapp={whatsapp}>
            <VoiceConversation whatsapp={whatsapp} onClose={() => setLaunched(false)} />
          </VoiceErrorBoundary>
        ) : (
          <>
            <div className="voice-stage__copy">
              <strong>שיחה אמיתית, לא הקלטה</strong>
              <p>לוחצים, מדברים בעברית, ושומעים איך עובד דיגיטלי עונה לעסק.</p>
            </div>
            <button type="button" className="btn-primary" onClick={() => setLaunched(true)}>
              לדבר עם הסוכן עכשיו
              <Mic size={18} />
            </button>
            <span className="voice-stage__note">
              <Mic size={14} aria-hidden="true" />
              נבקש גישה למיקרופון · שיחה עד 3 דקות
            </span>
          </>
        )
      ) : (
        <>
          <div className="voice-stage__copy">
            <strong>הסוכן הקולי עולה לאוויר ממש בקרוב</strong>
            <p>
              אני מסיים לו את ההדרכה בימים אלה. רוצים לשמוע אותו ראשונים, או לבדוק
              סוכן כזה לעסק שלכם?
            </p>
          </div>
          <a href={whatsapp} target="_blank" rel="noreferrer" className="btn-primary">
            דברו איתי בינתיים
            <MessageCircle size={18} />
          </a>
          <span className="voice-stage__note">
            <Mic size={14} aria-hidden="true" />
            ההדגמה החיה תיפתח כאן, בלחיצה אחת
          </span>
        </>
      )}
    </div>
  );
}
