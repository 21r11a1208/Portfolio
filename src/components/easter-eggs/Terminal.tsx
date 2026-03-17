"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type OutputLine = { type: "cmd" | "response" | "error"; text: string };

const COMMANDS: Record<string, string[]> = {
  help: [
    "Available commands:",
    "  hire anish   — make the best decision of your quarter",
    "  about        — who is this person",
    "  skills       — what can he do",
    "  show resume  — open resume PDF",
    "  clear        — clear terminal",
    "",
    "Keyboard shortcuts:",
    "  Esc          — scroll back to top",
  ],
  about: [
    "B Anish — Engineer turned Product Thinker.",
    "Built PMOrbit at RealPage from 0 to production.",
    "Currently looking for APM/PM roles in Hyderabad.",
    "Email: anibaaabuuu@gmail.com",
  ],
  skills: [
    "Product: Requirements Gathering, PRD Writing, Roadmap Planning,",
    "         User Interviews, Funnel Analysis, Metrics & RCA",
    "Technical: React, TypeScript, .NET Core, SQL, Python, Figma",
  ],
  "show resume": ["Opening resume..."],
};

function fireConfetti() {
  import("canvas-confetti").then(({ default: confetti }) => {
    confetti({ particleCount: 120, spread: 80, origin: { y: 0.7 }, colors: ["#c8f060", "#f0ede6", "#4a6e00"] });
  });
}

export function Terminal() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState<OutputLine[]>([
    { type: "response", text: 'Type "help" to see available commands. Press Esc to go back to top.' },
  ]);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [output]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    const newOutput: OutputLine[] = [...output, { type: "cmd", text: `> ${input.trim()}` }];

    if (!cmd) { setInput(""); return; }

    if (cmd === "clear") { setOutput([]); setInput(""); return; }

    if (cmd === "hire anish") {
      fireConfetti();
      newOutput.push({ type: "response", text: "Excellent choice. 🎉 Reach out at anibaaabuuu@gmail.com" });
      setOutput(newOutput); setInput(""); return;
    }

    if (cmd === "show resume") {
      window.open("/resume.pdf", "_blank");
      newOutput.push({ type: "response", text: "Resume opened in new tab." });
      setOutput(newOutput); setInput(""); return;
    }

    const response = COMMANDS[cmd];
    if (response) {
      response.forEach((line) => newOutput.push({ type: "response", text: line }));
    } else {
      newOutput.push({ type: "error", text: `Command not found: "${cmd}". Type "help" for options.` });
    }

    setOutput(newOutput);
    setInput("");
  };

  return (
    <div
      className="mt-10 rounded-2xl bg-[var(--bg)] border border-[var(--border-8)] overflow-hidden font-mono text-sm"
      onClick={() => inputRef.current?.focus()}
      data-cursor="hover"
    >
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-3 bg-[var(--surface)] border-b border-[var(--border)]">
        <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
        <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
        <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
        <span className="ml-3 text-[11px] text-[var(--text-30)] tracking-wider">anish-terminal</span>
      </div>

      {/* Output */}
      <div className="px-5 pt-4 pb-2 max-h-52 overflow-y-auto">
        <AnimatePresence initial={false}>
          {output.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              className={
                line.type === "cmd"
                  ? "text-[var(--accent-text)] mb-0.5"
                  : line.type === "error"
                  ? "text-red-400 mb-0.5"
                  : "text-[var(--text-60)] mb-0.5"
              }
            >
              {line.text}
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="flex items-center gap-2 px-5 py-3 border-t border-[var(--border)]">
        <span className="text-[var(--accent-text)]">$</span>
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="type a command..."
          className="flex-1 bg-transparent text-[var(--text)] outline-none placeholder-[var(--text-20)] caret-[var(--accent)]"
          aria-label="Terminal input"
          autoComplete="off"
          spellCheck={false}
          style={{ cursor: "text" }}
        />
      </form>
    </div>
  );
}
