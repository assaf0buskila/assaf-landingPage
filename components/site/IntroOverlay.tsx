"use client";

import { useCallback, useEffect, useState } from "react";

export function IntroOverlay() {
  const [visible, setVisible] = useState(true);

  const dismiss = useCallback(() => {
    setVisible(false);
  }, []);

  useEffect(() => {
    if (window.location.search.includes("skipIntro=1")) {
      setVisible(false);
      return;
    }
    const timer = setTimeout(() => setVisible(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div
      className="intro-overlay"
      role="dialog"
      aria-label="assaf web is here"
      tabIndex={0}
      onClick={dismiss}
      onPointerDown={dismiss}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          dismiss();
        }
      }}
    >
      <video
        className="intro-overlay__video"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
      >
        <source src="/assets/inspiration/element1.mp4" type="video/mp4" />
      </video>

      <div className="intro-overlay__wash" />
      <div className="intro-overlay__content">
        <p className="intro-overlay__title" aria-label="assaf web is here">
          <span>assaf web</span>
          <span>is here</span>
        </p>
        <button type="button" className="intro-overlay__button" aria-label="כניסה לאתר של אסף">
          כניסה לאתר
        </button>
      </div>
    </div>
  );
}
