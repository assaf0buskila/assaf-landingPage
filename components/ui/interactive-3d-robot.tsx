"use client";

import { Suspense, lazy } from "react";

// Spline runtime is heavy; it is lazy-loaded and only ever mounted by
// VoiceAgentSection once the section is actually near the viewport.
const Spline = lazy(() => import("@splinetool/react-spline"));

export function InteractiveRobotSpline({ scene, className }: { scene: string; className?: string }) {
  return (
    <Suspense fallback={<div className={`voice-robot__loading ${className ?? ""}`} aria-hidden="true" />}>
      <Spline scene={scene} className={className} />
    </Suspense>
  );
}
