"use client";
import { useCallback } from "react";
import { useKonamiCode } from "@/hooks/useKonamiCode";

export function KonamiCode() {
  const trigger = useCallback(() => {
    import("canvas-confetti").then(({ default: confetti }) => {
      const duration = 3000;
      const end = Date.now() + duration;
      const colors = ["#c8f060", "#f0ede6", "#0f0f14"];

      (function frame() {
        confetti({ particleCount: 3, angle: 60, spread: 55, origin: { x: 0 }, colors });
        confetti({ particleCount: 3, angle: 120, spread: 55, origin: { x: 1 }, colors });
        if (Date.now() < end) requestAnimationFrame(frame);
      })();
    });
  }, []);

  useKonamiCode(trigger);
  return null;
}
