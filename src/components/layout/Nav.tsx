"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useScrolled } from "@/hooks/useScrolled";
import { MobileMenu } from "./MobileMenu";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Case Studies", href: "#case-studies" },
  { label: "Writing", href: "#writing" },
  { label: "Contact", href: "#contact" },
];

export function Nav() {
  const scrolled = useScrolled(80);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-30 transition-all duration-300",
          scrolled
            ? "py-3 bg-[var(--nav-bg)] backdrop-blur-md border-b border-[var(--border)]"
            : "py-5 bg-transparent"
        )}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <a
            href="/"
            data-cursor="hover"
            className="text-lg font-display font-bold text-[var(--text)] hover:text-[var(--accent-text)] transition-colors"
          >
            B Anish<span className="text-[var(--accent-text)]">.</span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                data-cursor="hover"
                className="text-sm font-body text-[var(--text-60)] hover:text-[var(--text)] transition-colors"
              >
                {label}
              </a>
            ))}
            <ThemeToggle />
            <a
              href="#contact"
              data-cursor="hover"
              className="px-5 py-2 bg-[var(--accent)] text-[#0f0f14] rounded-full text-sm font-display font-semibold hover:bg-[var(--accent-hover)] transition-colors"
            >
              Hire Me
            </a>
          </nav>

          {/* Mobile: theme toggle + hamburger */}
          <div className="md:hidden flex items-center gap-3">
            <ThemeToggle />
            <button
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              data-cursor="hover"
              className="flex flex-col gap-1.5 p-2"
            >
              <span className="block w-6 h-0.5 bg-[var(--text)] rounded" />
              <span className="block w-4 h-0.5 bg-[var(--text)] rounded" />
              <span className="block w-6 h-0.5 bg-[var(--text)] rounded" />
            </button>
          </div>
        </div>
      </motion.header>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
