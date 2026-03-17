"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TEXT = "Loading Anish's brain...";

export function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [chars, setChars] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (typeof sessionStorage !== "undefined" && sessionStorage.getItem("loaded")) {
      setVisible(false);
      return;
    }

    let i = 0;
    const type = setInterval(() => {
      i++;
      setChars(i);
      if (i >= TEXT.length) {
        clearInterval(type);
        setTimeout(() => {
          setVisible(false);
          sessionStorage.setItem("loaded", "1");
        }, 500);
      }
    }, 45);

    return () => clearInterval(type);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[99999] bg-[var(--bg)] flex items-center justify-center"
        >
          <div className="flex flex-col items-center gap-4">
            <span className="text-lg md:text-2xl font-display font-semibold text-[var(--text)] tracking-tight min-h-[1.5em]">
              {TEXT.slice(0, chars)}
              <span className="animate-pulse text-[var(--accent)]">|</span>
            </span>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: chars / TEXT.length }}
              className="h-[2px] w-48 bg-[var(--accent)] origin-left rounded-full"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
