"use client";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ComponentPropsWithoutRef } from "react";

interface ButtonProps extends ComponentPropsWithoutRef<typeof motion.button> {
  variant?: "accent" | "ghost";
  size?: "sm" | "md" | "lg";
}

export function Button({ variant = "accent", size = "md", className, children, ...props }: ButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      data-cursor="hover"
      className={cn(
        "inline-flex items-center justify-center font-display font-semibold rounded-full transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]",
        size === "sm" && "px-4 py-2 text-sm",
        size === "md" && "px-6 py-3 text-sm",
        size === "lg" && "px-8 py-4 text-base",
        variant === "accent" && "bg-[var(--accent)] text-[var(--text-on-accent)] hover:bg-[var(--accent-hover)]",
        variant === "ghost" && "border border-[var(--border-15)] text-[var(--text)] hover:border-[var(--accent)] hover:text-[var(--accent-text)]",
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
}
