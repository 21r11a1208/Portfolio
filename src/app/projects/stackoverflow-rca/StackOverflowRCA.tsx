"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ReadingProgressBar } from "@/components/ui/ReadingProgressBar";
import { Tag } from "@/components/ui/Tag";

const TOC = [
  { id: "so-clarify",    label: "1. Clarify"         },
  { id: "so-sanity",     label: "2. Sanity Checks"   },
  { id: "so-segment",    label: "3. Segment"         },
  { id: "so-hypotheses", label: "4. Hypotheses"      },
  { id: "so-prioritise", label: "5. Prioritise"      },
  { id: "so-diagnosis",  label: "6. Diagnosis"       },
  { id: "so-bet",        label: "7. My Bet"          },
  { id: "so-recommend",  label: "8. Recommendations" },
];

const CATEGORIES = [
  {
    id: "ai",
    label: "AI & Technology",
    tipX: 90, tipY: 60, spineX: 215, spineY: 192,
    color: "#f97316",
    colorDim: "rgba(249,115,22,0.1)",
    icon: "⚡",
    causes: [
      "ChatGPT (Nov 2022) delivers instant, contextual answers",
      "GitHub Copilot eliminates the question before it's asked",
      "Google AI Overviews bypass Stack Overflow in search",
      "Conversational AI format vs async Q&A is frictionless",
    ],
    detail: "This is my primary hypothesis. ChatGPT's November 2022 launch was the single biggest inflection point — the timing correlation is almost perfect. For the first time, developers could ask questions conversationally and get instant, contextual answers. No searching, no reading 12 answers to find the accepted one, no reputation required. GitHub Copilot went further by predicting the question before it was asked. By 2024, Google AI Overviews began directly answering programming queries in search results — eliminating the need to click through to Stack Overflow at all. The supply of the service SO provided became essentially free.",
  },
  {
    id: "community",
    label: "Community",
    tipX: 90, tipY: 324, spineX: 215, spineY: 192,
    color: "#a855f7",
    colorDim: "rgba(168,85,247,0.1)",
    icon: "👥",
    causes: [
      ">50% of new-user questions closed or downvoted",
      "Hostile culture structurally deters newcomers",
      "Jun 2023 mod strike — 80K actions paused for 6 weeks",
      "Experienced mods resigned or permanently disengaged",
    ],
    detail: "This is a real contributing factor, but I'd classify it as secondary — and pre-existing. The hostile community didn't cause the 2022–2024 traffic drop; it was a slow-burning problem that made SO structurally unable to respond when the AI threat arrived. A healthy community might have evolved the platform. This one couldn't. The June 2023 mod strike made the dysfunction globally visible and accelerated trust collapse at the worst possible moment.",
  },
  {
    id: "product",
    label: "Product",
    tipX: 318, tipY: 60, spineX: 420, spineY: 192,
    color: "#3b82f6",
    colorDim: "rgba(59,130,246,0.1)",
    icon: "📦",
    causes: [
      "UI unchanged since 2010 — zero personalisation",
      "Hostile new-user onboarding (minefield of closures)",
      "No conversational or contextual search capability",
      "Zero integration with IDEs or developer tooling",
    ],
    detail: "Product stagnation is a contributing factor, but I'd frame it as the failure mode that made SO unable to defend. If the product had evolved — conversational search, IDE integration — it could have absorbed the AI threat rather than being displaced by it. Stagnation turned a manageable competitive threat into an existential one. I'd test this hypothesis by looking at whether SO's product release cadence dropped after 2018 and whether user satisfaction metrics began declining before the AI era.",
  },
  {
    id: "competition",
    label: "Competition",
    tipX: 318, tipY: 324, spineX: 420, spineY: 192,
    color: "#ef4444",
    colorDim: "rgba(239,68,68,0.1)",
    icon: "⚔️",
    causes: [
      "Reddit r/learnprogramming — more welcoming, async",
      "GitHub Discussions — contextual, near the source code",
      "Discord servers per framework with maintainer support",
      "Slack communities for specific enterprise stacks",
    ],
    detail: "I'd bucket this as a pre-2022 trend that was already chipping away at SO's edges but wasn't the decisive factor. GitHub Discussions, Discord, and Reddit took specific use cases — not the core use case. The decisive factor was AI, which eliminated the core use case entirely. I'd verify this by checking if SO's traffic decline rate accelerated specifically after Nov 2022 vs the gradual decline from 2018–2022.",
  },
  {
    id: "market",
    label: "Market Shift",
    tipX: 548, tipY: 60, spineX: 630, spineY: 192,
    color: "#22c55e",
    colorDim: "rgba(34,197,94,0.1)",
    icon: "📈",
    causes: [
      "Developers expect instant answers, not async wait",
      "Documentation quality improved dramatically 2019–2024",
      "Cloud providers publish proprietary developer Q&A hubs",
      "LLM-native developers skip search entirely",
    ],
    detail: "This is downstream of the AI hypothesis, not independent of it. Developer expectations shifted because a better format existed — conversational AI. Better documentation is also partially AI-driven. I wouldn't treat this as a separate root cause; it's the market response to the primary cause (AI tools). I'd test by asking: did expectations shift before AI tools existed? The data suggests no — SO's engagement was stable or growing until late 2022.",
  },
  {
    id: "leadership",
    label: "Leadership",
    tipX: 548, tipY: 324, spineX: 630, spineY: 192,
    color: "#eab308",
    colorDim: "rgba(234,179,8,0.1)",
    icon: "🏛️",
    causes: [
      "OpenAI data deal announced without community consent",
      "Mod strike resolution was cosmetic, not structural",
      "28% staff layoffs gutted product and engineering",
      "Ad-based revenue model structurally threatened by AI",
    ],
    detail: "Leadership failures accelerated and worsened the decline, but didn't cause it. The OpenAI data partnership — selling community-generated content — was executed without community consent during an AI-trust crisis. The mod strike was managed poorly. 28% layoffs reduced the team's capacity to respond. These are compounding errors that turned a difficult situation into a crisis. I'd classify this as 'how they made it worse', not 'why it started'.",
  },
];

const TIMELINE = [
  { date: "Nov 2022", event: "ChatGPT launches", severity: "Inflection", detail: "Within weeks, developers begin using ChatGPT as a primary coding assistant. Google Trends shows 'Stack Overflow' queries declining against 'ChatGPT' for the first time. This is the clearest external signal I'd use to anchor the hypothesis." },
  { date: "Feb 2023", event: "Google Bard releases", severity: "Compounding", detail: "A second major AI tool targets the same developer Q&A use case. The displacement pressure is now coming from two of the world's largest platforms simultaneously." },
  { date: "Jun 2023", event: "Moderator strike begins", severity: "Critical", detail: "Over 80,000 moderation actions are paused. Triggered by SO's AI content policy reversal and OpenAI data partnership announcement — made without community consultation. This is leadership failure compounding the AI threat." },
  { date: "Aug 2023", event: "OpenAI data partnership announced", severity: "Trust collapse", detail: "SO announces it will license community Q&A to OpenAI. The community that generates the content doesn't consent. This is the moment internal trust collapse becomes irreversible." },
  { date: "Oct 2023", event: "28% staff layoffs", severity: "Structural", detail: "Stack Overflow cuts 28% of its workforce. The team most capable of responding to the AI threat is reduced at exactly the wrong moment." },
  { date: "May 2024", event: "Google AI Overviews launch", severity: "Existential", detail: "Google surfaces AI-generated answers directly in search results for programming queries. The primary traffic acquisition channel is now a direct competitor. The loop is closed." },
];

const FIVE_WHYS = [
  {
    symptom: "Traffic dropped 50%+ from peak",
    chain: [
      "Developers no longer need to search for answers externally",
      "AI tools provide instant, contextual answers with zero friction",
      "Stack Overflow's async Q&A model can't compete with zero-latency conversational AI",
      "Product was built for a pre-LLM world and never modernised to compete",
    ],
    root: "Stack Overflow solved a 2008 problem. The problem changed; the product didn't. The async, vote-curated format is structurally obsolete in a world where AI answers the question before the developer finishes typing it.",
    color: "#f97316",
  },
  {
    symptom: "New user acquisition collapsed",
    chain: [
      "New developers don't post questions on Stack Overflow",
      "New questions are closed or downvoted by established users",
      "The community optimised so hard for answer quality that contributing became hostile",
      "No investment in new-contributor experience or community moderation reform for years",
    ],
    root: "The platform's quality moat became its growth ceiling. When AI could match quality without the community overhead, the moat disappeared entirely and the cost remained.",
    color: "#a855f7",
  },
  {
    symptom: "Moderator strike damaged trust at the worst possible moment",
    chain: [
      "Moderators stopped moderating during the AI content controversy",
      "Leadership announced an AI policy without community consultation",
      "The volunteer mod community had no formal governance voice",
      "Leadership prioritised monetisation (OpenAI deal) over community consent",
    ],
    root: "A platform built on volunteer labour treated volunteers as a cost centre. When leadership decisions conflicted with community values, there was no resolution mechanism — just a walkout.",
    color: "#eab308",
  },
];

function Counter({ target, suffix = "", duration = 1500 }: { target: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    let current = 0;
    const step = target / (duration / 16);
    const id = setInterval(() => {
      current += step;
      if (current >= target) { setCount(target); clearInterval(id); }
      else setCount(Math.floor(current));
    }, 16);
    return () => clearInterval(id);
  }, [inView, target, duration]);
  return <span ref={ref}>{count}{suffix}</span>;
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="text-xs font-mono uppercase tracking-widest mb-2" style={{ color: "var(--accent)" }}>{children}</p>;
}
function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-2xl font-bold mb-2" style={{ color: "var(--text-primary)" }}>{children}</h2>;
}
function Divider() {
  return <div className="border-t my-12" style={{ borderColor: "var(--border)" }} />;
}

function FishboneDiagram() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const active = CATEGORIES.find(c => c.id === activeId) ?? null;
  return (
    <div>
      <div className="overflow-x-auto rounded-xl border p-4"
        style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
        <svg viewBox="0 0 780 384" className="w-full" style={{ minWidth: 560, maxHeight: 420 }}>
          <line x1="70" y1="192" x2="700" y2="192" stroke="var(--border)" strokeWidth="2.5" />
          <polygon points="700,185 716,192 700,199" fill="var(--border)" />
          <rect x="716" y="158" width="56" height="68" rx="6"
            fill="var(--surface-2)" stroke="var(--border)" strokeWidth="1.5" />
          <text x="744" y="183" textAnchor="middle" fill="var(--accent)" fontSize="7" fontFamily="monospace" fontWeight="bold">EFFECT</text>
          <text x="744" y="197" textAnchor="middle" fill="var(--text-primary)" fontSize="7.5" fontFamily="sans-serif" fontWeight="bold">Traffic</text>
          <text x="744" y="209" textAnchor="middle" fill="var(--text-primary)" fontSize="7.5" fontFamily="sans-serif" fontWeight="bold">Decline</text>
          {CATEGORIES.map((cat) => {
            const isActive = activeId === cat.id;
            const strokeColor = isActive ? cat.color : "var(--text-secondary)";
            const labelY = cat.tipY < cat.spineY ? cat.tipY - 20 : cat.tipY + 14;
            const ticks = [0.28, 0.52, 0.76].map((t) => ({
              x: cat.tipX + (cat.spineX - cat.tipX) * t,
              y: cat.tipY + (cat.spineY - cat.tipY) * t,
              dx: cat.tipY < cat.spineY ? -9 : 9,
            }));
            return (
              <g key={cat.id} style={{ cursor: "pointer" }} onClick={() => setActiveId(isActive ? null : cat.id)}>
                <line x1={cat.tipX} y1={cat.tipY} x2={cat.spineX} y2={cat.spineY}
                  stroke={strokeColor} strokeWidth={isActive ? 2.5 : 1.5} style={{ transition: "all 0.25s" }} />
                {ticks.map((t, i) => (
                  <line key={i} x1={t.x} y1={t.y} x2={t.x + t.dx} y2={t.y}
                    stroke={strokeColor} strokeWidth={1} style={{ transition: "all 0.25s" }} />
                ))}
                <circle cx={cat.spineX} cy={cat.spineY} r={isActive ? 5 : 3.5}
                  fill={isActive ? cat.color : "var(--surface)"}
                  stroke={strokeColor} strokeWidth={1.5} style={{ transition: "all 0.25s" }} />
                <rect x={cat.tipX - 54} y={labelY - 13} width={108} height={22} rx={5}
                  fill={isActive ? cat.colorDim : "var(--surface-2)"}
                  stroke={isActive ? cat.color : "var(--border)"}
                  strokeWidth={isActive ? 1.5 : 1} style={{ transition: "all 0.25s" }} />
                <text x={cat.tipX} y={labelY + 2} textAnchor="middle"
                  fill={isActive ? cat.color : "var(--text-secondary)"}
                  fontSize="8.5" fontFamily="sans-serif" fontWeight={isActive ? "bold" : "normal"}
                  style={{ transition: "all 0.25s" }}>{cat.label}</text>
                <rect x={cat.tipX - 54} y={labelY - 13} width={108} height={22} rx={5} fill="transparent" />
              </g>
            );
          })}
        </svg>
      </div>
      <AnimatePresence mode="wait">
        {active ? (
          <motion.div key={active.id}
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="mt-4 rounded-xl border p-5"
            style={{ borderColor: active.color + "55", background: active.colorDim }}>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">{active.icon}</span>
              <h3 className="font-bold" style={{ color: active.color }}>{active.label}</h3>
            </div>
            <ul className="space-y-1.5 mb-4">
              {active.causes.map((c, i) => (
                <li key={i} className="flex items-start gap-2 text-sm" style={{ color: "var(--text-secondary)" }}>
                  <span style={{ color: active.color, marginTop: 3, flexShrink: 0 }}>→</span>{c}
                </li>
              ))}
            </ul>
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{active.detail}</p>
          </motion.div>
        ) : (
          <motion.p key="hint" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="mt-4 text-center text-xs py-3" style={{ color: "var(--text-secondary)" }}>
            Click any hypothesis category to see the evidence and my read on it
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

function DiagnosisAccordion() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  return (
    <div className="space-y-3">
      {FIVE_WHYS.map(({ symptom, chain, root, color }, idx) => (
        <div key={idx} className="rounded-xl border overflow-hidden" style={{ borderColor: "var(--border)" }}>
          <button className="w-full text-left px-5 py-4 flex items-center justify-between gap-4"
            style={{ background: "var(--surface)" }}
            onClick={() => setOpenIdx(openIdx === idx ? null : idx)}>
            <div>
              <span className="text-xs font-mono uppercase tracking-wide" style={{ color }}>Observation</span>
              <p className="font-semibold text-sm mt-0.5" style={{ color: "var(--text-primary)" }}>{symptom}</p>
            </div>
            <motion.span animate={{ rotate: openIdx === idx ? 180 : 0 }} transition={{ duration: 0.2 }}
              style={{ color: "var(--text-secondary)", flexShrink: 0 }}>▼</motion.span>
          </button>
          <AnimatePresence>
            {openIdx === idx && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} style={{ overflow: "hidden" }}>
                <div className="px-5 pb-5 pt-3 border-t space-y-2.5"
                  style={{ borderColor: "var(--border)", background: "var(--surface-2)" }}>
                  <p className="text-xs font-mono uppercase tracking-wide mb-1" style={{ color }}>
                    Tracing back — why?
                  </p>
                  {chain.map((step, i) => (
                    <div key={i} className="flex gap-3 items-start">
                      <span className="text-xs font-mono shrink-0 mt-0.5" style={{ color, opacity: 1 - i * 0.15 }}>Why?</span>
                      <p className="text-sm" style={{ color: "var(--text-secondary)" }}>{step}</p>
                    </div>
                  ))}
                  <div className="mt-3 pt-3 border-t" style={{ borderColor: color + "44" }}>
                    <p className="text-xs font-mono uppercase tracking-wide mb-1" style={{ color }}>Where it bottoms out</p>
                    <p className="text-sm font-medium italic" style={{ color: "var(--text-primary)" }}>{root}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}

const SEVERITY_COLORS: Record<string, string> = {
  "Inflection":    "#f97316",
  "Compounding":   "#eab308",
  "Critical":      "#ef4444",
  "Trust collapse":"#a855f7",
  "Structural":    "#3b82f6",
  "Existential":   "#ef4444",
};

export function StackOverflowRCA() {
  const [activeSection, setActiveSection] = useState("so-clarify");
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id); }); },
      { rootMargin: "-30% 0px -60% 0px" }
    );
    TOC.forEach(({ id }) => { const el = document.getElementById(id); if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <ReadingProgressBar />
      <nav className="hidden xl:flex fixed top-32 flex-col gap-1.5 text-xs"
        style={{ right: "max(1rem, calc(50vw - 680px))", width: 148 }}>
        {TOC.map(({ id, label }) => (
          <a key={id} href={`#${id}`} className="transition-all duration-200"
            style={{ color: activeSection === id ? "var(--accent)" : "var(--text-secondary)", fontWeight: activeSection === id ? 600 : 400 }}>
            {label}
          </a>
        ))}
      </nav>

      <div className="space-y-0">

        {/* Header */}
        <div className="mb-10">
          <Tag variant="type">RCA</Tag>
          <h1 className="text-4xl font-bold mt-4 mb-2" style={{ color: "var(--text-primary)" }}>
            Stack Overflow: The AI Displacement
          </h1>
          <p className="text-lg mb-6" style={{ color: "var(--text-secondary)" }}>
            How I&apos;d diagnose a 50%+ traffic decline for a 15-year market leader
          </p>
          <div className="rounded-xl border p-5"
            style={{ borderColor: "var(--accent)44", background: "var(--accent-08, rgba(255,140,0,0.05))" }}>
            <p className="text-xs font-mono uppercase tracking-widest mb-2" style={{ color: "var(--accent)" }}>
              How I&apos;m approaching this
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              I&apos;m walking through this as I would in an RCA interview — not presenting a pre-formed conclusion, but showing the reasoning chain. I&apos;ll start by clarifying what metric I&apos;m diagnosing, run sanity checks before I hypothesize, generate a wide set of causes and classify them, then narrow to the primary hypothesis with explicit evidence. I&apos;ll also call out the hypothesis I considered and rejected, and why.
            </p>
          </div>
        </div>

        {/* ── Step 1: Clarify ─────────────────────────────────────────────── */}
        <section id="so-clarify">
          <SectionLabel>Step 1 of 8</SectionLabel>
          <SectionTitle>Clarify what I&apos;m diagnosing</SectionTitle>
          <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--text-secondary)" }}>
            Before I hypothesize anything, I&apos;d ask clarifying questions. &ldquo;Stack Overflow is declining&rdquo; is too vague — different metrics have different root causes and different fixes.
          </p>

          <div className="space-y-3 mb-8">
            {[
              {
                q: "Which metric are we diagnosing?",
                a: "Monthly unique visitors and organic search traffic. Not revenue, not community health, not new user registrations — though those matter downstream. I'm scoping to: why are fewer people reaching Stack Overflow pages? That's the primary signal.",
              },
              {
                q: "What does the decline look like — sudden drop or gradual erosion?",
                a: "Gradual erosion from 2019 accelerating into a sharp inflection in late 2022. The shape matters: a sudden drop points to a specific event (algorithm change, outage, product decision). A gradual-then-sharp decline points to a structural shift with a trigger. This pattern immediately makes me think: something changed in the market, not on the product.",
              },
              {
                q: "Is this Stack Overflow specifically, or the whole developer content category?",
                a: "Mostly Stack Overflow specifically. While AI has pressured all long-form content, SO's decline is steeper than comparable developer sites. That tells me it's not just the tide going out — something particular to SO's model is being displaced.",
              },
            ].map(({ q, a }, i) => (
              <motion.div key={i}
                whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 10 }} viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="rounded-xl border p-5"
                style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
                <p className="text-sm font-semibold mb-2" style={{ color: "var(--text-primary)" }}>Q: {q}</p>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  <span style={{ color: "var(--accent)" }}>→ </span>{a}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="grid sm:grid-cols-4 gap-3">
            {[
              { label: "Traffic decline", value: 50, suffix: "%+", note: "Peak vs 2024 estimate" },
              { label: "New questions", value: 35, suffix: "% ↓", note: "YoY decline in 2023" },
              { label: "Staff layoffs", value: 28, suffix: "%", note: "2023 workforce cut" },
              { label: "Mod strike", value: 6, suffix: " wks", note: "Jun–Jul 2023" },
            ].map(({ label, value, suffix, note }) => (
              <div key={label} className="rounded-lg p-4 text-center border"
                style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
                <div className="text-3xl font-bold mb-1" style={{ color: "var(--accent)" }}>
                  <Counter target={value} suffix={suffix} />
                </div>
                <div className="text-xs font-medium mb-0.5" style={{ color: "var(--text-primary)" }}>{label}</div>
                <div className="text-xs" style={{ color: "var(--text-secondary)" }}>{note}</div>
              </div>
            ))}
          </div>
        </section>

        <Divider />

        {/* ── Step 2: Sanity Checks ────────────────────────────────────────── */}
        <section id="so-sanity">
          <SectionLabel>Step 2 of 8</SectionLabel>
          <SectionTitle>Rule out the boring explanations first</SectionTitle>
          <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--text-secondary)" }}>
            Before I jump to interesting hypotheses, I&apos;d spend 5 minutes ruling out the boring ones. A lot of &ldquo;why did metric X drop&rdquo; answers are actually &ldquo;the measurement changed, not the behaviour.&rdquo;
          </p>

          <div className="space-y-3">
            {[
              { check: "Is this a measurement change?", verdict: "No", detail: "Stack Overflow's traffic decline is corroborated by multiple independent sources — SimilarWeb, Semrush, and their own publicly referenced figures. Not a reporting artifact." },
              { check: "Is this seasonal?", verdict: "No", detail: "The decline is secular, not cyclical. Year-over-year comparisons at the same calendar periods show consistent decline from late 2022 onward. Seasonality would show as annual dips with recovery; this doesn't recover." },
              { check: "Did SO make a product change that affected SEO?", verdict: "Partially", detail: "SO did make some site changes and added AI-generated content (which Google may have penalised), but these are downstream effects of the AI strategy — not independent causes. The core decline predates any SO product change." },
              { check: "Is this industry-wide developer content decline?", verdict: "Partially, but disproportionate", detail: "AI has pressured all long-form developer content. But SO's decline is steeper. If it were purely market-wide, we'd see similar curves on MDN, CSS-Tricks, and other developer reference sites. We don't — at least not at the same magnitude. Something specific to SO's model is being displaced more acutely." },
            ].map(({ check, verdict, detail }) => {
              const vc = verdict === "No" ? "#22c55e" : verdict === "Partially" ? "#eab308" : "#ef4444";
              return (
                <div key={check} className="rounded-xl border p-5"
                  style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
                  <div className="flex items-start gap-3">
                    <span className="text-xs px-2 py-0.5 rounded-full font-semibold shrink-0 mt-0.5"
                      style={{ background: vc + "22", color: vc }}>{verdict}</span>
                    <div>
                      <p className="text-sm font-semibold mb-1" style={{ color: "var(--text-primary)" }}>{check}</p>
                      <p className="text-sm" style={{ color: "var(--text-secondary)" }}>{detail}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-4 rounded-xl border-l-4 p-4"
            style={{ borderColor: "var(--accent)", background: "var(--surface)" }}>
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
              <strong style={{ color: "var(--text-primary)" }}>Conclusion: </strong>
              The decline is real and disproportionate to the market. I&apos;m now confident the problem is structural, not a measurement artifact or a one-time event. Time to hypothesize.
            </p>
          </div>
        </section>

        <Divider />

        {/* ── Step 3: Segment ─────────────────────────────────────────────── */}
        <section id="so-segment">
          <SectionLabel>Step 3 of 8</SectionLabel>
          <SectionTitle>Segment the cause space before hypothesizing</SectionTitle>
          <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--text-secondary)" }}>
            I wouldn&apos;t just brainstorm randomly. I&apos;d first build a mental taxonomy of where causes could live — then generate hypotheses within each bucket. This prevents me from missing whole categories.
          </p>

          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            {[
              {
                bucket: "External — Market & Technology",
                color: "#f97316",
                items: ["AI tools displacing the core use case", "Search algorithm changes reducing discoverability", "Market behaviour shifts (developer workflow evolution)", "Competition from niche communities"],
              },
              {
                bucket: "Internal — Product",
                color: "#3b82f6",
                items: ["Product stagnation — no evolution in 15 years", "Poor onboarding for new users", "No integration with developer tooling", "No conversational search capability"],
              },
              {
                bucket: "Internal — Community",
                color: "#a855f7",
                items: ["Hostile culture deterring new contributors", "Mod governance failure (strike 2023)", "Quality-over-growth optimisation that backfired"],
              },
              {
                bucket: "Internal — Leadership & Strategy",
                color: "#eab308",
                items: ["OpenAI data partnership destroying community trust", "Layoffs reducing response capacity", "Monetisation model threatened by traffic loss"],
              },
            ].map(({ bucket, color, items }) => (
              <div key={bucket} className="rounded-xl border p-4"
                style={{ borderColor: color + "44", background: "var(--surface)" }}>
                <p className="text-xs font-mono uppercase tracking-wide mb-2" style={{ color }}>{bucket}</p>
                <ul className="space-y-1">
                  {items.map((item, i) => (
                    <li key={i} className="text-sm flex items-start gap-2" style={{ color: "var(--text-secondary)" }}>
                      <span style={{ color, flexShrink: 0, marginTop: 2 }}>·</span>{item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="rounded-xl border p-4" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
              <strong style={{ color: "var(--text-primary)" }}>My instinct at this stage: </strong>
              The external bucket (AI) is doing the heavy lifting and the internal buckets are compounding. I&apos;d expect a well-run version of Stack Overflow to still decline in the AI era — just more slowly. The internal failures turned a manageable threat into an existential one.
            </p>
          </div>
        </section>

        <Divider />

        {/* ── Step 4: Hypothesis Map ───────────────────────────────────────── */}
        <section id="so-hypotheses">
          <SectionLabel>Step 4 of 8</SectionLabel>
          <SectionTitle>Map all the hypotheses</SectionTitle>
          <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--text-secondary)" }}>
            Now I&apos;d lay out every plausible cause on a map before I start eliminating. Click each bone to see my read on that hypothesis — whether I think it&apos;s primary, secondary, or contributing.
          </p>
          <FishboneDiagram />
        </section>

        <Divider />

        {/* ── Step 5: Prioritise & Test ────────────────────────────────────── */}
        <section id="so-prioritise">
          <SectionLabel>Step 5 of 8</SectionLabel>
          <SectionTitle>Which hypotheses would I test first, and how?</SectionTitle>
          <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--text-secondary)" }}>
            I can&apos;t test all six simultaneously. I&apos;d rank them by: how much of the decline does this explain if true? And how quickly can I confirm or reject it?
          </p>

          <div className="space-y-3 mb-6">
            {[
              {
                rank: "01",
                hypothesis: "AI tools displaced the core use case",
                test: "Look at Google Trends: 'how to X Python' vs ChatGPT queries. Look at SO's Search Console data: when did impressions start dropping, and does the date correlate with Nov 2022? Check SimilarWeb month-by-month. If the traffic inflection is within 60 days of ChatGPT's launch, this is my primary cause.",
                confidence: "Very High",
                color: "#f97316",
              },
              {
                rank: "02",
                hypothesis: "Community quality collapse deterred new contributors",
                test: "Look at first-time poster volume over time. Look at question-close rate for new users. If 50%+ of new-user questions are closed or downvoted, the contribution flywheel has broken. Cross-reference with mod activity data — did quality metrics actually improve while contributor volume fell?",
                confidence: "High",
                color: "#a855f7",
              },
              {
                rank: "03",
                hypothesis: "Google algorithm changes reduced discoverability",
                test: "Compare SO traffic decline vs Google Search Console impression decline for SO domains. If impressions dropped faster than CTR stayed stable, it's a Google-side change. If CTR dropped faster, it's a demand-side change (users are choosing AI over clicking SO results).",
                confidence: "Medium — needs data",
                color: "#3b82f6",
              },
              {
                rank: "04",
                hypothesis: "Leadership failures (OpenAI deal, layoffs) caused the decline",
                test: "Did traffic decline accelerate after the Aug 2023 OpenAI announcement? If yes, this is a contributing accelerant. If the decline curve is consistent before and after, it's a background factor, not a cause.",
                confidence: "Medium — likely compounding",
                color: "#eab308",
              },
            ].map(({ rank, hypothesis, test, confidence, color }) => (
              <div key={rank} className="rounded-xl border p-5"
                style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
                <div className="flex items-start gap-4 mb-3">
                  <span className="text-2xl font-bold shrink-0" style={{ color: "var(--accent)", opacity: 0.4 }}>{rank}</span>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-3 mb-1">
                      <p className="font-semibold text-sm" style={{ color: "var(--text-primary)" }}>{hypothesis}</p>
                      <span className="text-xs px-2 py-0.5 rounded-full shrink-0 font-medium"
                        style={{ background: color + "22", color }}>{confidence}</span>
                    </div>
                  </div>
                </div>
                <div className="ml-10">
                  <p className="text-xs font-mono uppercase tracking-wide mb-1" style={{ color: "var(--accent)" }}>How I&apos;d test it</p>
                  <p className="text-sm" style={{ color: "var(--text-secondary)" }}>{test}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Context timeline */}
          <p className="text-xs font-mono uppercase tracking-wide mb-4" style={{ color: "var(--accent)" }}>
            Key events — context for testing hypotheses
          </p>
          <div className="relative pl-7 border-l space-y-6" style={{ borderColor: "var(--border)" }}>
            {TIMELINE.map(({ date, event, severity, detail }) => (
              <div key={date} className="relative">
                <div className="absolute -left-9 top-1 w-4 h-4 rounded-full border-2 flex items-center justify-center"
                  style={{ borderColor: SEVERITY_COLORS[severity] ?? "var(--accent)", background: "var(--surface)" }}>
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: SEVERITY_COLORS[severity] ?? "var(--accent)" }} />
                </div>
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="text-xs font-mono" style={{ color: "var(--accent)" }}>{date}</span>
                  <span className="font-semibold text-sm" style={{ color: "var(--text-primary)" }}>{event}</span>
                  <span className="text-xs px-2 py-0.5 rounded-full"
                    style={{ background: (SEVERITY_COLORS[severity] ?? "#888") + "22", color: SEVERITY_COLORS[severity] ?? "#888" }}>
                    {severity}
                  </span>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{detail}</p>
              </div>
            ))}
          </div>
        </section>

        <Divider />

        {/* ── Step 6: Diagnosis ────────────────────────────────────────────── */}
        <section id="so-diagnosis">
          <SectionLabel>Step 6 of 8</SectionLabel>
          <SectionTitle>Trace each symptom to its root</SectionTitle>
          <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--text-secondary)" }}>
            For the three most significant observations, I&apos;d trace the causal chain backward until I hit something structural — something that isn&apos;t itself caused by something else. Click each to walk through the chain.
          </p>
          <DiagnosisAccordion />
        </section>

        <Divider />

        {/* ── Step 7: My Bet ───────────────────────────────────────────────── */}
        <section id="so-bet">
          <SectionLabel>Step 7 of 8</SectionLabel>
          <SectionTitle>What I&apos;d stake on as the root cause</SectionTitle>

          <div className="rounded-xl border p-6 mb-6"
            style={{ borderColor: "var(--accent)55", background: "var(--accent-08, rgba(255,140,0,0.05))" }}>
            <p className="text-xs font-mono uppercase tracking-wide mb-2" style={{ color: "var(--accent)" }}>Primary hypothesis</p>
            <p className="text-lg font-bold mb-3" style={{ color: "var(--text-primary)" }}>
              Stack Overflow&apos;s async, vote-curated Q&amp;A format is structurally obsolete in a world where AI answers the question before the developer finishes typing it.
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              This isn&apos;t a product problem that can be fixed with a redesign. It&apos;s a business model problem — the core value proposition (fast access to community-verified answers) is now delivered better, faster, and for free by a competitor. The community decline and leadership failures are real, but they&apos;re compounding factors. Without the AI threat, they would have been manageable. With it, they became terminal.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            <div className="rounded-xl border p-4" style={{ borderColor: "#22c55e44", background: "rgba(34,197,94,0.05)" }}>
              <p className="text-xs font-mono uppercase tracking-wide mb-2" style={{ color: "#22c55e" }}>Evidence that supports it</p>
              <ul className="space-y-1.5">
                {[
                  "Traffic inflection matches Nov 2022 ChatGPT launch within 60 days",
                  "Decline is steeper than comparable developer content sites",
                  "Developer surveys show shift from search to AI tools for coding questions",
                  "Google AI Overviews in 2024 closed the last remaining traffic loop",
                ].map((e, i) => (
                  <li key={i} className="text-sm flex items-start gap-2" style={{ color: "var(--text-secondary)" }}>
                    <span style={{ color: "#22c55e", flexShrink: 0 }}>✓</span>{e}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border p-4" style={{ borderColor: "#ef444444", background: "rgba(239,68,68,0.05)" }}>
              <p className="text-xs font-mono uppercase tracking-wide mb-2" style={{ color: "#ef4444" }}>Strongest counter-argument</p>
              <ul className="space-y-1.5">
                {[
                  "Community and product problems predate AI — decline started earlier",
                  "MDN and other developer reference sites didn't decline as steeply",
                  "Stack Overflow's Q&A format is still unique — AI answers aren't always correct",
                ].map((e, i) => (
                  <li key={i} className="text-sm flex items-start gap-2" style={{ color: "var(--text-secondary)" }}>
                    <span style={{ color: "#ef4444", flexShrink: 0 }}>✗</span>{e}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="rounded-xl border p-4" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
            <p className="text-xs font-mono uppercase tracking-wide mb-2" style={{ color: "var(--accent)" }}>
              How I&apos;d address the counter-argument
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              The pre-AI decline is real but small — a slow erosion, not a cliff. The cliff happens in late 2022. MDN didn&apos;t decline as steeply because MDN is reference documentation, not Q&amp;A — AI doesn&apos;t replace a spec sheet the way it replaces &ldquo;how do I fix this error.&rdquo; The Q&amp;A accuracy argument is valid but practically irrelevant: developers use AI answers anyway, tolerating some inaccuracy for the speed and convenience. Perceived utility beats objective accuracy in a frictionless-enough product.
            </p>
          </div>

          <div className="mt-6 grid sm:grid-cols-3 gap-3">
            {[
              { value: 200, suffix: "M", label: "Peak monthly visits", note: "~2020, pre-AI era" },
              { value: 90,  suffix: "M", label: "Est. 2024 monthly visits", note: "~55% of peak" },
              { value: 40,  suffix: "%", label: "New user registrations drop", note: "YoY decline in 2023" },
            ].map(({ value, suffix, label, note }) => (
              <motion.div key={label}
                whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 16 }} viewport={{ once: true }}
                className="rounded-lg p-4 border text-center"
                style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
                <div className="text-2xl font-bold" style={{ color: "var(--accent)" }}>
                  <Counter target={value} suffix={suffix} />
                </div>
                <div className="text-xs font-medium mt-1" style={{ color: "var(--text-primary)" }}>{label}</div>
                <div className="text-xs mt-0.5" style={{ color: "var(--text-secondary)" }}>{note}</div>
              </motion.div>
            ))}
          </div>
        </section>

        <Divider />

        {/* ── Step 8: Recommendations ──────────────────────────────────────── */}
        <section id="so-recommend">
          <SectionLabel>Step 8 of 8</SectionLabel>
          <SectionTitle>If my diagnosis is right, what would I do?</SectionTitle>
          <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--text-secondary)" }}>
            An RCA without a recommendation is just a post-mortem. Given the root cause, here&apos;s what I&apos;d prioritise — and I&apos;d be explicit about what I&apos;d NOT do.
          </p>

          <div className="space-y-4">
            {[
              {
                n: "01",
                action: "Compete on verified human expertise, not speed",
                rationale: "AI is faster but not always right, and it can't be cited, audited, or trusted in regulated contexts. Stack Overflow's defensible position is 'verified by practitioners' — the same reason Wikipedia survived Google. Lean into it: verified answers, expert badges, canonical sources. Stop trying to be faster than AI and start being more trustworthy.",
              },
              {
                n: "02",
                action: "Build AI as a contributor tool, not a replacement",
                rationale: "Rather than selling SO's content to AI companies (the OpenAI deal), use AI to help contributors write better answers, surface related questions, and reduce the friction of contribution. AI lowers the cost of contributing — that's the opportunity. SO missed it by treating AI as a competitor to monetise rather than a tool to leverage.",
              },
              {
                n: "03",
                action: "Reform mod governance before rebuilding trust",
                rationale: "The mod strike was symptomatic of a governance failure. Volunteers who moderate 80,000 posts/day have no formal voice. Before any community-building investment, I'd establish a formal mod council with real decision rights. Without this, any trust repair is cosmetic.",
              },
              {
                n: "04",
                action: "What I would NOT do: pivot to a general-purpose AI chatbot",
                rationale: "SO doesn't have the model, the infrastructure, or the brand to compete with ChatGPT, Copilot, or Gemini. Building SO AI would be under-resourced, late to market, and would strip SO of its differentiation (human expertise). It would be the wrong response to the right diagnosis.",
              },
            ].map(({ n, action, rationale }) => (
              <motion.div key={n}
                whileInView={{ opacity: 1, x: 0 }} initial={{ opacity: 0, x: -16 }} viewport={{ once: true }}
                className="flex gap-4 items-start">
                <span className="text-2xl font-bold shrink-0 mt-0.5" style={{ color: "var(--accent)", opacity: 0.35 }}>{n}</span>
                <div className="rounded-xl border p-4 flex-1"
                  style={{ borderColor: n === "04" ? "#ef444433" : "var(--border)", background: "var(--surface)" }}>
                  <h3 className="font-semibold text-sm mb-2"
                    style={{ color: n === "04" ? "#ef4444" : "var(--text-primary)" }}>{action}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{rationale}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

      </div>
    </>
  );
}
