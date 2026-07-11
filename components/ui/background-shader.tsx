"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

// Loaded client-only: the MeshGradient renders a WebGL canvas, so we keep it out
// of server render to avoid SSR/window crashes.
const MeshGradient = dynamic(
  () => import("@paper-design/shaders-react").then((m) => m.MeshGradient),
  { ssr: false }
);

export function BackgroundShader({ className }: { className?: string }) {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [canUseWebGL, setCanUseWebGL] = useState(false);
  const [intersecting, setIntersecting] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(mq.matches);
    const canvas = document.createElement("canvas");

    update();
    setCanUseWebGL(
      Boolean(
        canvas.getContext("webgl2") ||
          canvas.getContext("webgl") ||
          canvas.getContext("experimental-webgl")
      )
    );
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIntersecting(entry.isIntersecting);
      },
      { rootMargin: "240px 0px", threshold: 0 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={wrapperRef}
      className={cn("absolute inset-0 z-0 overflow-hidden", className)}
      aria-hidden="true"
    >
      <div className="background-shader-fallback" />
      {canUseWebGL && intersecting ? (
        <>
          <MeshGradient
            style={{ height: "100%", width: "100%" }}
            distortion={0.8}
            swirl={0.6}
            offsetX={0.08}
            offsetY={0}
            scale={1}
            rotation={0}
            speed={reducedMotion ? 0 : 0.42}
            colors={["#72b9bb", "#b5d9d9", "#ffd1bd", "#ffebe0", "#8cc5b8", "#dbf4a4"]}
          />
          {/* soft veil keeps the hero text readable over the gradient */}
          <div className="pointer-events-none absolute inset-0 bg-white/20" />
        </>
      ) : null}
      {/* Fade the bottom of the shader into the next (light) section */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-48"
        style={{
          background:
            "linear-gradient(180deg, rgba(238,247,255,0), rgba(248,251,255,0.96))",
        }}
      />
    </div>
  );
}
