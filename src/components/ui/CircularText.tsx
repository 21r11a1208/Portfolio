"use client";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useEffect, useRef, useState } from "react";

export function CircularText() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [overContent, setOverContent] = useState(false);

  useEffect(() => {
    const check = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;

      const elements = document.elementsFromPoint(cx, cy);
      const contentTags = new Set(["p", "h1", "h2", "h3", "h4", "h5", "h6", "span", "a", "button", "img", "li", "article"]);
      const hasContent = elements.some((el) => {
        if (el === ref.current || ref.current?.contains(el)) return false;
        return contentTags.has(el.tagName.toLowerCase());
      });

      setOverContent(hasContent);
    };

    check();
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check, { passive: true });
    return () => {
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, []);

  return (
    <motion.div
      ref={ref}
      animate={{ opacity: overContent ? 0.25 : 1 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="fixed bottom-8 right-8 z-30 pointer-events-none hidden lg:flex items-center justify-center w-[130px] h-[130px] rounded-full"
      style={{
        background: "var(--widget-bg)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        border: "1px solid var(--border-8)",
      }}
      aria-hidden="true"
    >
      <motion.div
        animate={reduced ? {} : { rotate: 360 }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        className="w-[110px] h-[110px]"
      >
        <svg viewBox="0 0 100 100" width="100%" height="100%">
          <defs>
            <path
              id="circlePath"
              d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0"
            />
          </defs>
          <text
            fontSize="8.2"
            fill="rgba(200,240,96,0.75)"
            fontFamily="var(--font-syne)"
            fontWeight="600"
            letterSpacing="2.5"
          >
            <textPath href="#circlePath">
              ✦ AVAILABLE FOR PM ROLES ✦ OPEN TO WORK&nbsp;
            </textPath>
          </text>
          <circle cx="50" cy="50" r="3.5" fill="#c8f060" />
          <circle cx="50" cy="50" r="6" fill="none" stroke="rgba(200,240,96,0.2)" strokeWidth="1" />
        </svg>
      </motion.div>
    </motion.div>
  );
}
