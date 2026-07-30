"use client";

import { Component, type ReactNode } from "react";
import { MessageCircle } from "lucide-react";

// A throw inside the ElevenLabs stack used to unmount the whole page: React has
// no boundary above it, so one bad render took the entire landing page with it.
// The voice demo is the least important thing on the page and the most likely
// to break (third-party SDK, mic permissions, WebRTC), so it gets contained
// here and always leaves the visitor a way to reach Assaf.
export class VoiceErrorBoundary extends Component<
  { whatsapp: string; children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error: unknown) {
    console.error("[voice] conversation UI crashed, showing fallback:", error);
  }

  render() {
    if (!this.state.failed) return this.props.children;

    return (
      <div className="voice-live" dir="rtl">
        <p className="voice-live__status voice-live__status--error">
          משהו נתקע בהדגמה הקולית. זה קורה, וזה בדיוק מה שאני מתקן לעסקים.
        </p>
        <div className="voice-live__actions">
          <a
            href={this.props.whatsapp}
            target="_blank"
            rel="noreferrer"
            className="btn-primary"
          >
            דברו איתי בוואטסאפ
            <MessageCircle size={18} />
          </a>
        </div>
      </div>
    );
  }
}
