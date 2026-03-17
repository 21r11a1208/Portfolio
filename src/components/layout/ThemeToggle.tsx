"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/** Aperture / iris — 8 radial spokes radiating from a center ring.
 *  Shown in dark mode → click to go light. */
function ApertureIcon() {
  const spokes = Array.from({ length: 8 }, (_, i) => {
    const angle = (i * 45 * Math.PI) / 180;
    return {
      x1: 8 + Math.cos(angle) * 4.6,
      y1: 8 + Math.sin(angle) * 4.6,
      x2: 8 + Math.cos(angle) * 6.8,
      y2: 8 + Math.sin(angle) * 6.8,
    };
  });
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="2.8" fill="currentColor" />
      <circle cx="8" cy="8" r="4.5" stroke="currentColor" strokeWidth="1.2" fill="none" />
      {spokes.map((s, i) => (
        <line
          key={i}
          x1={s.x1} y1={s.y1} x2={s.x2} y2={s.y2}
          stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"
        />
      ))}
    </svg>
  );
}

/** Eclipse crescent — a circle with another circle "bitten" out via clipPath.
 *  Shown in light mode → click to go dark. */
function EclipseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
      <defs>
        <clipPath id="eclipse-clip">
          <circle cx="8" cy="8" r="6" />
        </clipPath>
      </defs>
      <circle cx="8" cy="8" r="6" fill="currentColor" />
      <circle
        cx="11.5" cy="8" r="5"
        fill="var(--bg)"
        clipPath="url(#eclipse-clip)"
      />
    </svg>
  );
}

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch — only render after mount
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="w-8 h-8" />;

  const isDark = theme === "dark";

  return (
    <motion.button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      data-cursor="hover"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="relative w-8 h-8 flex items-center justify-center rounded-full border border-[var(--border-8)] bg-[var(--surface)] text-[var(--text-60)] hover:text-[var(--accent-text)] hover:border-[var(--accent-15)] transition-colors duration-200"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isDark ? "aperture" : "eclipse"}
          initial={{ opacity: 0, rotate: -30, scale: 0.7 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 30, scale: 0.7 }}
          transition={{ duration: 0.2 }}
          className="flex items-center justify-center"
        >
          {isDark ? <ApertureIcon /> : <EclipseIcon />}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
}
