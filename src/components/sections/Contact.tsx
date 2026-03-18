"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { MagneticButton } from "@/components/ui/MagneticButton";

const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID ?? "";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const LINKEDIN_RE = /^(https?:\/\/)?(www\.)?linkedin\.com\/in\/[\w-]+\/?$/i;

function validate(value: string): string | null {
  if (!value.trim()) return "This field is required.";
  if (EMAIL_RE.test(value) || LINKEDIN_RE.test(value)) return null;
  return "Enter a valid email or LinkedIn URL (linkedin.com/in/you).";
}

const directLinks = [
  {
    label: "anibaaabuuu@gmail.com",
    href: "mailto:anibaaabuuu@gmail.com",
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
  },
  {
    label: "+91 94937 65617",
    href: "tel:+919493765617",
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.17 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16.92z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/b-anish-a963bb337/",
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
    external: true,
  },
  {
    label: "Resume (PDF)",
    href: "/Anish_Resume_Product.pdf",
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
  },
];

export function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState(false);
  const [contactVal, setContactVal] = useState("");
  const [contextVal, setContextVal] = useState("");
  const [contactError, setContactError] = useState<string | null>(null);
  const [touched, setTouched] = useState(false);

  const handleBlur = () => {
    setTouched(true);
    setContactError(validate(contactVal));
  };

  const handleChange = (v: string) => {
    setContactVal(v);
    if (touched) setContactError(validate(v));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTouched(true);
    const err = validate(contactVal);
    if (err) { setContactError(err); return; }

    setSubmitting(true);
    setServerError(false);
    setSubmitted(true);

    try {
      const body = new FormData();
      body.append("contact", contactVal);
      body.append("context", contextVal);

      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        body,
        headers: { Accept: "application/json" },
      });
      if (!res.ok) {
        setSubmitted(false);
        setServerError(true);
      }
    } catch {
      setSubmitted(false);
      setServerError(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 md:py-32 px-6 md:px-12 lg:px-24">
      <div className="max-w-3xl mx-auto">
        <ScrollReveal>
          <div className="p-10 md:p-14 rounded-3xl bg-[var(--surface)] border border-[var(--border-8)]">
            <span className="text-xs font-display font-semibold tracking-[0.2em] uppercase text-[var(--accent-text)] mb-4 block">
              Contact
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-[var(--text)] mb-2 leading-tight">
              Let&apos;s talk.
            </h2>
            <p className="text-[var(--text-55)] font-body text-[15px] leading-relaxed mb-2">
              Hyderabad &mdash; open to relocating &middot; <span className="text-[var(--accent-text)] font-semibold">Available immediately</span>
            </p>

            {/* Direct contact links */}
            <div className="flex flex-wrap gap-3 mt-6 mb-10">
              {directLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  {...(link.href === "/resume.pdf" ? { download: true } : {})}
                  data-cursor="hover"
                  className="inline-flex items-center gap-2 px-4 py-2 border border-[var(--border-15)] text-[var(--text-65)] rounded-full font-display font-semibold text-xs hover:border-[var(--accent-text)] hover:text-[var(--accent-text)] transition-all duration-200"
                >
                  {link.icon}
                  {link.label}
                </a>
              ))}
            </div>

            <div className="border-t border-[var(--border)] pt-8">
              <p className="text-[var(--text-40)] font-body text-[13px] mb-5">
                Or leave a note and I&apos;ll reply directly.
              </p>

              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    exit={{ opacity: 0, y: -8 }}
                    className="flex flex-col gap-4 max-w-md"
                    noValidate
                  >
                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="contact-input"
                        className="text-[11px] font-display font-semibold tracking-[0.15em] uppercase text-[var(--text-40)]"
                      >
                        Your email or LinkedIn URL
                      </label>
                      <input
                        id="contact-input"
                        name="contact"
                        type="text"
                        value={contactVal}
                        onChange={(e) => handleChange(e.target.value)}
                        onBlur={handleBlur}
                        placeholder="you@company.com or linkedin.com/in/you"
                        aria-invalid={!!contactError}
                        aria-describedby={contactError ? "contact-error" : undefined}
                        className={`w-full px-4 py-3 rounded-xl bg-[var(--surface-2)] border text-[var(--text)] placeholder:text-[var(--text-25)] text-sm font-body focus:outline-none transition-colors ${
                          contactError
                            ? "border-red-400/60 focus:border-red-400"
                            : "border-[var(--border)] focus:border-[var(--accent-text)]"
                        }`}
                      />
                      <AnimatePresence>
                        {contactError && (
                          <motion.p
                            id="contact-error"
                            role="alert"
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -4 }}
                            transition={{ duration: 0.15 }}
                            className="text-[12px] font-body text-red-400"
                          >
                            {contactError}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-baseline justify-between">
                        <label
                          htmlFor="context-input"
                          className="text-[11px] font-display font-semibold tracking-[0.15em] uppercase text-[var(--text-40)]"
                        >
                          Context{" "}
                          <span className="normal-case tracking-normal font-body font-normal text-[var(--text-30)]">
                            (optional)
                          </span>
                        </label>
                        <span className={`text-[11px] font-body tabular-nums transition-colors ${contextVal.length > 240 ? "text-red-400" : "text-[var(--text-25)]"}`}>
                          {contextVal.length}/280
                        </span>
                      </div>
                      <textarea
                        id="context-input"
                        name="context"
                        rows={3}
                        maxLength={280}
                        value={contextVal}
                        onChange={(e) => setContextVal(e.target.value)}
                        placeholder="Company, role, or what you're working on..."
                        className="w-full px-4 py-3 rounded-xl bg-[var(--surface-2)] border border-[var(--border)] text-[var(--text)] placeholder:text-[var(--text-25)] text-sm font-body focus:outline-none focus:border-[var(--accent-text)] transition-colors resize-none"
                      />
                    </div>

                    {serverError && (
                      <p className="text-[13px] font-body text-red-400">
                        Something went wrong. Email me directly at anibaaabuuu@gmail.com.
                      </p>
                    )}

                    <MagneticButton>
                      <button
                        type="submit"
                        disabled={submitting}
                        data-cursor="hover"
                        className="px-7 py-3.5 bg-[var(--accent)] text-[var(--text-on-accent)] rounded-full font-display font-semibold text-sm hover:bg-[var(--accent-hover)] transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-60 disabled:pointer-events-none"
                      >
                        Send →
                      </button>
                    </MagneticButton>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-3 px-5 py-4 rounded-xl bg-[var(--accent-08)] border border-[var(--accent-15)] max-w-md"
                  >
                    <span className="text-[var(--accent-text)] text-base font-bold">✓</span>
                    <p className="text-sm font-body text-[var(--text-65)]">
                      Got it. I&apos;ll be in touch.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
