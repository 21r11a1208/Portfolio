"use client";
import { useEffect, useState } from "react";
import { motion, useSpring, AnimatePresence } from "framer-motion";
import { useMousePosition } from "@/hooks/useMousePosition";

type CursorState = "default" | "hover" | "view";

export function CustomCursor() {
  const { x, y } = useMousePosition();
  const [cursorState, setCursorState] = useState<CursorState>("default");
  const [isTouchDevice, setIsTouchDevice] = useState(true);
  const [isInWindow, setIsInWindow] = useState(true);

  const springConfig = { stiffness: 600, damping: 35 };
  const dotX = useSpring(x, springConfig);
  const dotY = useSpring(y, springConfig);

  const ringSpring = { stiffness: 150, damping: 20 };
  const ringX = useSpring(x, ringSpring);
  const ringY = useSpring(y, ringSpring);

  useEffect(() => {
    // Dynamically track input type — supports hybrid touch+mouse laptops
    const onMouseMove = () => setIsTouchDevice(false);
    const onTouchStart = () => setIsTouchDevice(true);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("touchstart", onTouchStart);

    const onEnter = () => setIsInWindow(true);
    const onLeave = () => setIsInWindow(false);
    document.addEventListener("mouseenter", onEnter);
    document.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchstart", onTouchStart);
      document.removeEventListener("mouseenter", onEnter);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  // Event delegation — runs once, no leak, handles dynamically added elements
  useEffect(() => {
    const handleOver = (e: MouseEvent) => {
      const el = (e.target as Element).closest<HTMLElement>("[data-cursor]");
      if (!el) return;
      const type = el.dataset.cursor;
      setCursorState(type === "view" ? "view" : type === "hover" ? "hover" : "default");
    };
    const handleOut = (e: MouseEvent) => {
      const to = (e as MouseEvent & { relatedTarget: Element | null }).relatedTarget;
      if (!to || !to.closest?.("[data-cursor]")) setCursorState("default");
    };
    document.addEventListener("mouseover", handleOver);
    document.addEventListener("mouseout", handleOut);
    return () => {
      document.removeEventListener("mouseover", handleOver);
      document.removeEventListener("mouseout", handleOut);
    };
  }, []);

  if (isTouchDevice) return null;
  if (!isInWindow) return null;

  const isHovering = cursorState !== "default";
  const isView = cursorState === "view";

  return (
    <>
      {/* Dot */}
      <motion.div
        style={{ x: dotX, y: dotY, translateX: "-50%", translateY: "-50%" }}
        animate={{ scale: isView ? 0 : isHovering ? 1.5 : 1, opacity: isView ? 0 : 1 }}
        transition={{ duration: 0.15 }}
        className="fixed top-0 left-0 w-2 h-2 bg-[#c8f060] rounded-full pointer-events-none z-[9999] mix-blend-difference"
      />

      {/* Ring */}
      <motion.div
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          scale: isView ? 2.8 : isHovering ? 1.8 : 1,
          opacity: isView ? 1 : isHovering ? 0.6 : 0.3,
        }}
        transition={{ duration: 0.2 }}
        className="fixed top-0 left-0 w-10 h-10 border border-[#c8f060] rounded-full pointer-events-none z-[9999] flex items-center justify-center"
      >
        <AnimatePresence>
          {isView && (
            <motion.span
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.15 }}
              className="text-[6px] font-display font-bold tracking-[0.18em] text-[#c8f060] uppercase select-none"
            >
              VIEW
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
