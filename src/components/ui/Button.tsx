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
        "inline-flex items-center justify-center font-display font-semibold rounded-full transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-[#c8f060]",
        size === "sm" && "px-4 py-2 text-sm",
        size === "md" && "px-6 py-3 text-sm",
        size === "lg" && "px-8 py-4 text-base",
        variant === "accent" && "bg-[#c8f060] text-[#0f0f14] hover:bg-[#d4f570]",
        variant === "ghost" && "border border-[rgba(240,237,230,0.2)] text-[#f0ede6] hover:border-[#c8f060] hover:text-[#c8f060]",
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
}
