"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { FloatingShapes } from "@/components/hero/FloatingShapes";
import { staggerContainer, fadeUp } from "@/lib/animations";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { MagneticButton } from "@/components/ui/MagneticButton";

const scrollTo = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
};

export function Hero() {
  const reduced = useReducedMotion();

  const container = reduced
    ? { hidden: {}, visible: { transition: { staggerChildren: 0.04 } } }
    : staggerContainer;

  const item = reduced
    ? { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.3 } } }
    : fadeUp;

  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-24 pt-24 pb-12 overflow-hidden">
      <FloatingShapes />

      {/* Radial gradient */}
      <div
        className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle at 70% 30%, rgba(200,240,96,0.05) 0%, transparent 60%)" }}
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">

          {/* Left: Text */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-5"
          >
            <motion.span
              variants={item}
              className="text-xs font-display font-semibold tracking-[0.25em] uppercase text-[var(--accent-text)]"
            >
              Available for APM & PM roles
            </motion.span>

            <motion.h1
              variants={item}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold text-[var(--text)] leading-[0.95] tracking-tight"
            >
              B Anish
            </motion.h1>

            <motion.p
              variants={item}
              className="text-2xl sm:text-3xl md:text-4xl font-display font-semibold text-[var(--text-50)] leading-tight"
            >
              PM by ambition. Engineer by training.{" "}
              <span className="text-[var(--accent-text)]">Reads RCA teardowns for fun.</span>
            </motion.p>

            <motion.p
              variants={item}
              className="mt-2 max-w-xl text-base md:text-lg font-body text-[var(--text-55)] leading-relaxed"
            >
              I built a production platform for PMO leads and executives at RealPage.
              Now I&apos;m looking for the next problem worth solving.
            </motion.p>

            <motion.div variants={item} className="flex flex-wrap gap-4 mt-4">
              <MagneticButton>
                <button
                  onClick={() => scrollTo("case-studies")}
                  data-cursor="hover"
                  className="px-7 py-3.5 bg-[var(--accent)] text-[#0f0f14] rounded-full font-display font-semibold text-sm hover:bg-[var(--accent-hover)] transition-all duration-200 hover:scale-105 active:scale-95"
                >
                  See My Work
                </button>
              </MagneticButton>
              <MagneticButton>
                <button
                  onClick={() => scrollTo("contact")}
                  data-cursor="hover"
                  className="px-7 py-3.5 border border-[var(--border-15)] text-[var(--text)] rounded-full font-display font-semibold text-sm hover:border-[var(--accent-text)] hover:text-[var(--accent-text)] transition-all duration-200"
                >
                  Get In Touch
                </button>
              </MagneticButton>
            </motion.div>
          </motion.div>

          {/* Photo — circular on mobile, portrait on desktop */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="order-first lg:order-none flex justify-center items-center"
          >
            {/* Mobile: circle avatar */}
            <div
              className="relative block lg:hidden w-28 h-28 sm:w-36 sm:h-36 rounded-full overflow-hidden"
              style={{
                boxShadow: "0 0 0 2px rgba(200,240,96,0.2), 0 0 32px rgba(200,240,96,0.1)",
              }}
            >
              <Image
                src="/nen.png"
                alt="B Anish"
                fill
                priority
                className="object-cover object-top"
                sizes="144px"
              />
            </div>

            {/* Desktop: tall portrait */}
            <div
              className="relative hidden lg:block w-[300px] xl:w-[340px] rounded-2xl overflow-hidden"
              style={{
                aspectRatio: "3/4",
                boxShadow:
                  "0 0 0 1px rgba(200,240,96,0.1), 0 0 60px rgba(200,240,96,0.08), 0 32px 64px rgba(0,0,0,0.4)",
              }}
            >
              <Image
                src="/nen.png"
                alt="B Anish"
                fill
                priority
                className="object-cover object-top"
                sizes="(max-width: 1280px) 300px, 340px"
              />
              <div
                className="absolute bottom-0 left-0 right-0 h-28 pointer-events-none"
                style={{ background: "linear-gradient(to top, var(--bg), transparent)" }}
                aria-hidden="true"
              />
              <div
                className="absolute top-0 left-0 w-12 h-12 pointer-events-none"
                style={{ background: "radial-gradient(circle at 0% 0%, rgba(200,240,96,0.18) 0%, transparent 70%)" }}
                aria-hidden="true"
              />
            </div>
          </motion.div>

        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <span className="text-[10px] font-body tracking-[0.2em] uppercase text-[var(--text-30)]">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.8 }}
          className="w-px h-8 bg-gradient-to-b from-[rgba(200,240,96,0.5)] to-transparent"
        />
      </motion.div>
    </section>
  );
}
