"use client";

import { MessageCircle, Mic } from "lucide-react";

// The live ElevenLabs conversation UI mounts here once the server has
// ELEVENLABS_API_KEY + ELEVENLABS_AGENT_ID configured. Until then this stage
// renders the "coming soon" card so the section never breaks in production.
export function VoiceAgentSection({ whatsapp }: { whatsapp: string }) {
  return (
    <div className="voice-stage premium-panel">
      <div className="voice-orb" aria-hidden="true">
        <span className="voice-orb__ring" />
        <span className="voice-orb__core" />
      </div>

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
    </div>
  );
}
