"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
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

  return (
    <div
      className={cn("absolute inset-0 z-0 overflow-hidden", className)}
      aria-hidden="true"
    >
      <div className="background-shader-fallback" />
      {canUseWebGL ? (
        <MeshGradient
          style={{ height: "100%", width: "100%" }}
          distortion={0.8}
          swirl={0.1}
          offsetX={0}
          offsetY={0}
          scale={1}
          rotation={0}
          speed={reducedMotion ? 0 : 1}
          colors={[
            "hsl(204, 92%, 92%)",
            "hsl(207, 78%, 78%)",
            "hsl(212, 76%, 66%)",
            "hsl(198, 82%, 84%)",
          ]}
        />
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
