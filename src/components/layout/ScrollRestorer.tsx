"use client";
import { useEffect } from "react";

export function ScrollRestorer() {
  useEffect(() => {
    const saved = sessionStorage.getItem("portfolioScrollY");
    if (!saved) return;
    sessionStorage.removeItem("portfolioScrollY");
    const y = parseInt(saved, 10);
    // rAF ensures the page has painted before we scroll
    requestAnimationFrame(() => {
      window.scrollTo({ top: y, behavior: "instant" });
    });
  }, []);

  return null;
}
