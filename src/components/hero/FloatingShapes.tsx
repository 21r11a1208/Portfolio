"use client";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const shapes = [
  { type: "circle", size: 120, x: "10%", y: "20%", duration: 7, delay: 0, color: "rgba(200,240,96,0.06)" },
  { type: "ring", size: 200, x: "80%", y: "15%", duration: 9, delay: 1, color: "rgba(200,240,96,0.05)" },
  { type: "circle", size: 60, x: "70%", y: "70%", duration: 6, delay: 2, color: "rgba(240,237,230,0.04)" },
  { type: "ring", size: 80, x: "15%", y: "75%", duration: 8, delay: 0.5, color: "rgba(200,240,96,0.07)" },
  { type: "dot", size: 12, x: "50%", y: "30%", duration: 5, delay: 1.5, color: "rgba(200,240,96,0.4)" },
];

export function FloatingShapes() {
  const reduced = useReducedMotion();

  if (reduced) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {shapes.map((shape, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: shape.x,
            top: shape.y,
            width: shape.size,
            height: shape.size,
            backgroundColor: shape.type === "ring" ? "transparent" : shape.color,
            border: shape.type === "ring" ? `1px solid ${shape.color}` : "none",
          }}
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
            rotate: [0, 5, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: shape.duration,
            delay: shape.delay,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
