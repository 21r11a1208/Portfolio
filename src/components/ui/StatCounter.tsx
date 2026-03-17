"use client";
import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { Stat } from "@/types";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function StatCounter({ value, suffix = "", prefix = "", label }: Stat) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [count, setCount] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!isInView) return;
    if (reduced) { setCount(value); return; }
    const duration = 1400;
    const steps = 40;
    const step = value / steps;
    const interval = duration / steps;
    let current = 0;
    const timer = setInterval(() => {
      current = Math.min(current + step, value);
      setCount(Math.round(current));
      if (current >= value) clearInterval(timer);
    }, interval);
    return () => clearInterval(timer);
  }, [isInView, value, reduced]);

  return (
    <div ref={ref} className="flex flex-col gap-1">
      <span className="text-4xl font-display font-bold text-[#c8f060] tabular-nums">
        {prefix}{count}{suffix}
      </span>
      <span className="text-sm text-[rgba(240,237,230,0.6)] font-body leading-tight">
        {label}
      </span>
    </div>
  );
}
