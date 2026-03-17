"use client";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Case Studies", href: "#case-studies" },
  { label: "Writing", href: "#writing" },
  { label: "Contact", href: "#contact" },
];

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
          />
          <motion.nav
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed right-0 top-0 bottom-0 z-50 w-72 bg-[var(--surface)] border-l border-[var(--border-8)] flex flex-col px-8 pt-24 pb-12 gap-6"
          >
            <button
              onClick={onClose}
              className="absolute top-6 right-6 text-[var(--text-50)] hover:text-[var(--text)] transition-colors"
              aria-label="Close menu"
              data-cursor="hover"
            >
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
            {NAV_LINKS.map(({ label, href }, i) => (
              <motion.a
                key={href}
                href={href}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                onClick={onClose}
                data-cursor="hover"
                className="text-2xl font-display font-semibold text-[var(--text)] hover:text-[var(--accent-text)] transition-colors"
              >
                {label}
              </motion.a>
            ))}
            <a
              href="#contact"
              onClick={onClose}
              data-cursor="hover"
              className="mt-4 inline-flex items-center justify-center px-6 py-3 bg-[var(--accent)] text-[var(--text-on-accent)] rounded-full font-display font-semibold text-sm hover:bg-[var(--accent-hover)] transition-colors"
            >
              Hire Me
            </a>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  );
}
