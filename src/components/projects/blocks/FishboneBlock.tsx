"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Block } from "@/lib/content/schema";

type FishboneBlockData = Extract<Block, { type: "fishbone" }>;
type Category = FishboneBlockData["categories"][number];

// Converts a category's hex `color` into a low-alpha rgba fill — the
// reference RCAs (ArattaiRCA.tsx/StackOverflowRCA.tsx) hand-wrote this as a
// second `colorDim` field alongside every color (e.g. "#f97316" paired with
// "rgba(249,115,22,0.1)"); deriving it here means content only ever supplies
// one color per category, not two kept in sync by hand.
function hexToRgba(hex: string, alpha: number): string {
  const h = hex.replace("#", "");
  const full = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  const n = parseInt(full, 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${alpha})`;
}

// Every other layout number below (viewBox size, spine/tip coordinates) is
// likewise computed from `categories.length` rather than stored in content —
// the references hand-placed 6-7 bones once; a CMS editor adding/removing a
// hypothesis category needs the diagram to relayout itself instead.
function layout(n: number) {
  const width = 140 + 110 * n;
  const height = 400;
  const spineY = height / 2;
  const marginTop = 65;
  const marginBottom = height - 65;
  const spineStartX = 70;
  const effectBoxX = width - 126;
  const spineEndX = effectBoxX - 16;
  const attachMargin = 60;
  const boneOffsetX = 90;

  const bones = Array.from({ length: n }, (_, i) => {
    const toTop = i % 2 === 0;
    const spineX = spineStartX + attachMargin + i * ((spineEndX - spineStartX - attachMargin * 1.5) / Math.max(1, n - 1));
    const tipY = toTop ? marginTop : marginBottom;
    const tipX = spineX - boneOffsetX;
    return { spineX, spineY, tipX, tipY };
  });

  return { width, height, spineY, spineStartX, spineEndX, effectBoxX, bones };
}

export function FishboneBlock({ data }: { data: FishboneBlockData }) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const active: Category | null = data.categories.find((c) => c.id === activeId) ?? null;
  const { width, height, spineY, spineStartX, spineEndX, effectBoxX, bones } = layout(data.categories.length);

  return (
    <div>
      <div className="overflow-x-auto rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full" style={{ minWidth: 560, maxHeight: 440 }}>
          <line x1={spineStartX} y1={spineY} x2={spineEndX} y2={spineY} stroke="var(--border-15)" strokeWidth="2.5" />
          <polygon points={`${spineEndX},${spineY - 7} ${spineEndX + 16},${spineY} ${spineEndX},${spineY + 7}`} fill="var(--border-15)" />
          <rect x={effectBoxX} y={spineY - 35} width="58" height="70" rx="6" fill="var(--surface-2)" stroke="var(--border-15)" strokeWidth="1.5" />
          <text x={effectBoxX + 29} y={spineY - 12} textAnchor="middle" fill="var(--accent-text)" fontSize="7" fontFamily="monospace" fontWeight="bold">EFFECT</text>
          {data.effectLines.map((line, i) => (
            <text key={i} x={effectBoxX + 29} y={spineY + i * 11} textAnchor="middle" fill="var(--text)" fontSize="7" fontFamily="sans-serif" fontWeight="bold">
              {line}
            </text>
          ))}
          {data.categories.map((cat, i) => {
            const { spineX, tipX, tipY } = bones[i];
            const isActive = activeId === cat.id;
            const strokeColor = isActive ? cat.color : "var(--text-40)";
            const labelY = tipY < spineY ? tipY - 20 : tipY + 14;
            const ticks = [0.28, 0.52, 0.76].map((t) => ({
              x: tipX + (spineX - tipX) * t,
              y: tipY + (spineY - tipY) * t,
              dx: tipY < spineY ? -9 : 9,
            }));
            return (
              <g key={cat.id} style={{ cursor: "pointer" }} onClick={() => setActiveId(isActive ? null : cat.id)}>
                <line x1={tipX} y1={tipY} x2={spineX} y2={spineY}
                  stroke={strokeColor} strokeWidth={isActive ? 2.5 : 1.5} style={{ transition: "all 0.25s" }} />
                {ticks.map((t, ti) => (
                  <line key={ti} x1={t.x} y1={t.y} x2={t.x + t.dx} y2={t.y}
                    stroke={strokeColor} strokeWidth={1} style={{ transition: "all 0.25s" }} />
                ))}
                <circle cx={spineX} cy={spineY} r={isActive ? 5 : 3.5}
                  fill={isActive ? cat.color : "var(--surface)"}
                  stroke={strokeColor} strokeWidth={1.5} style={{ transition: "all 0.25s" }} />
                <rect x={tipX - 54} y={labelY - 13} width={108} height={22} rx={5}
                  fill={isActive ? hexToRgba(cat.color, 0.1) : "var(--surface-2)"}
                  stroke={isActive ? cat.color : "var(--border-15)"}
                  strokeWidth={isActive ? 1.5 : 1} style={{ transition: "all 0.25s" }} />
                <text x={tipX} y={labelY + 2} textAnchor="middle"
                  fill={isActive ? cat.color : "var(--text-50)"}
                  fontSize="8.5" fontFamily="sans-serif" fontWeight={isActive ? "bold" : "normal"}
                  style={{ transition: "all 0.25s" }}>{cat.label}</text>
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
            style={{ borderColor: hexToRgba(active.color, 0.35), background: hexToRgba(active.color, 0.08) }}>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">{active.icon}</span>
              <h3 className="font-display font-bold" style={{ color: active.color }}>{active.label}</h3>
            </div>
            <ul className="space-y-1.5 mb-4">
              {active.causes.map((c, i) => (
                <li key={i} className="flex items-start gap-2 text-sm font-body text-[var(--text-65)]">
                  <span style={{ color: active.color, marginTop: 3, flexShrink: 0 }}>→</span>{c}
                </li>
              ))}
            </ul>
            <p className="text-sm font-body leading-relaxed text-[var(--text-65)]">{active.detail}</p>
          </motion.div>
        ) : (
          data.hint && (
            <motion.p key="hint" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="mt-4 text-center text-xs font-body py-3 text-[var(--text-35)]">
              {data.hint}
            </motion.p>
          )
        )}
      </AnimatePresence>
    </div>
  );
}
