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

    // Optimistic: show success immediately — roll back if the request fails
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
              Get on my radar
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-[var(--text)] mb-4 leading-tight">
              Interested? Drop your info.
            </h2>
            <p className="text-[var(--text-55)] font-body text-[15px] leading-relaxed mb-8 max-w-lg">
              Leave your email or LinkedIn and I&apos;ll reach out. No back-and-forth required — just a way for me to find you.
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
                  {/* Contact field */}
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

                  {/* Context field */}
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
                      Something went wrong. Try again or reach me on LinkedIn.
                    </p>
                  )}

                  <MagneticButton>
                    <button
                      type="submit"
                      disabled={submitting}
                      data-cursor="hover"
                      className="px-7 py-3.5 bg-[var(--accent)] text-[var(--text-on-accent)] rounded-full font-display font-semibold text-sm hover:bg-[var(--accent-hover)] transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-60 disabled:pointer-events-none"
                    >
                      I&apos;m interested →
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

            {/* Secondary links */}
            <div className="flex flex-wrap gap-3 mt-8 pt-8 border-t border-[var(--border)]">
              <a
                href="https://www.linkedin.com/in/b-anish-a963bb337/"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="hover"
                className="inline-flex items-center gap-2 px-4 py-2 border border-[var(--border-15)] text-[var(--text-50)] rounded-full font-display font-semibold text-xs hover:border-[var(--accent-text)] hover:text-[var(--accent-text)] transition-all duration-200"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
                LinkedIn
              </a>
              <a
                href="https://github.com/Ailur0"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="hover"
                className="inline-flex items-center gap-2 px-4 py-2 border border-[var(--border-15)] text-[var(--text-50)] rounded-full font-display font-semibold text-xs hover:border-[var(--accent-text)] hover:text-[var(--accent-text)] transition-all duration-200"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
                GitHub
              </a>
            </div>

          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
