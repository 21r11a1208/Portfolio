"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function BackToTop() {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.25 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          data-cursor="hover"
          aria-label="Back to top"
          className="fixed bottom-6 left-6 z-40 flex items-center justify-center gap-2 h-9 lg:h-10 rounded-full border border-[var(--border-15)] bg-[var(--surface)] text-[var(--text-50)] hover:border-[var(--accent-text)] hover:text-[var(--accent-text)] transition-all duration-200 overflow-hidden"
          style={{
            width: hovered ? "auto" : "2.25rem",
            paddingLeft: hovered ? "1rem" : "0",
            paddingRight: hovered ? "1rem" : "0",
          }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="shrink-0">
            <polyline points="18 15 12 9 6 15" />
          </svg>
          <AnimatePresence>
            {hovered && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.2 }}
                className="text-[11px] font-display font-semibold tracking-[0.12em] uppercase whitespace-nowrap overflow-hidden"
              >
                Back to top
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
