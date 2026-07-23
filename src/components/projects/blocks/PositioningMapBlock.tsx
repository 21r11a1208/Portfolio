"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Block } from "@/lib/content/schema";

type PositioningMapBlockData = Extract<Block, { type: "positioning-map" }>;
type Point = PositioningMapBlockData["points"][number];

// Fixed plot chrome (viewBox + margins) — not content-dependent, so it's
// hardcoded the same way FishboneBlock hardcodes its top/bottom margins.
// Content only ever supplies axis labels, an optional highlight zone, and
// points as 0-100 percentages, mirroring the reference's per-point pixel
// cx/cy (CluelyTeardown.tsx's COMPETITORS) with percentages instead so the
// component — not hand-placed content — owns the actual geometry.
const VIEW_W = 640;
const VIEW_H = 400;
const PLOT = { left: 60, right: 620, top: 20, bottom: 368 };

function pct(v: number, lo: number, hi: number) {
  return lo + (hi - lo) * (v / 100);
}

export function PositioningMapBlock({ data }: { data: PositioningMapBlockData }) {
  const [activeId, setActiveId] = useState<string | null>(data.points[0]?.id ?? null);
  const active: Point | null = data.points.find((p) => p.id === activeId) ?? null;

  const xDividers = Array.from({ length: data.xLabels.length - 1 }, (_, i) =>
    PLOT.left + ((i + 1) / data.xLabels.length) * (PLOT.right - PLOT.left)
  );
  const yMid = (PLOT.top + PLOT.bottom) / 2;

  return (
    <div>
      <div className="rounded-xl overflow-hidden border border-[var(--border)] bg-[var(--surface)]">
        <div className="relative w-full" style={{ paddingBottom: "62.5%" }}>
          <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid meet">
            {data.xLabels.map((_, i) => {
              const x0 = i === 0 ? PLOT.left : xDividers[i - 1];
              const x1 = i === data.xLabels.length - 1 ? PLOT.right : xDividers[i];
              return (
                <g key={`col-${i}`}>
                  <rect x={x0} y={PLOT.top} width={x1 - x0} height={(PLOT.bottom - PLOT.top) / 2} fill="var(--surface-2)" opacity="0.4" />
                  <rect x={x0} y={yMid} width={x1 - x0} height={(PLOT.bottom - PLOT.top) / 2} fill="var(--surface-2)" opacity="0.4" />
                </g>
              );
            })}

            {data.highlight && (
              <>
                <rect
                  x={pct(data.highlight.xRange[0], PLOT.left, PLOT.right)}
                  y={pct(data.highlight.yRange[0], PLOT.top, PLOT.bottom)}
                  width={pct(data.highlight.xRange[1], PLOT.left, PLOT.right) - pct(data.highlight.xRange[0], PLOT.left, PLOT.right)}
                  height={pct(data.highlight.yRange[1], PLOT.top, PLOT.bottom) - pct(data.highlight.yRange[0], PLOT.top, PLOT.bottom)}
                  rx={8}
                  fill="var(--accent-08)"
                  stroke="var(--accent-25)"
                  strokeWidth="1"
                />
                <text
                  x={(pct(data.highlight.xRange[0], PLOT.left, PLOT.right) + pct(data.highlight.xRange[1], PLOT.left, PLOT.right)) / 2}
                  y={pct(data.highlight.yRange[0], PLOT.top, PLOT.bottom) + 21}
                  fill="var(--accent-text)" fontSize="9.5" textAnchor="middle" fontWeight="600" opacity="0.8"
                >
                  {data.highlight.label}
                </text>
              </>
            )}

            <line x1={PLOT.left} y1={PLOT.top} x2={PLOT.left} y2={PLOT.bottom} stroke="var(--border-15)" strokeWidth="1.5" />
            <line x1={PLOT.left} y1={PLOT.bottom} x2={PLOT.right} y2={PLOT.bottom} stroke="var(--border-15)" strokeWidth="1.5" />
            {xDividers.map((x, i) => (
              <line key={i} x1={x} y1={PLOT.top} x2={x} y2={PLOT.bottom} stroke="var(--border-15)" strokeWidth="1" strokeDasharray="5,4" opacity="0.5" />
            ))}
            <line x1={PLOT.left} y1={yMid} x2={PLOT.right} y2={yMid} stroke="var(--border-15)" strokeWidth="1" strokeDasharray="5,4" opacity="0.5" />

            {data.xLabels.map((label, i) => {
              const x0 = i === 0 ? PLOT.left : xDividers[i - 1];
              const x1 = i === data.xLabels.length - 1 ? PLOT.right : xDividers[i];
              return (
                <text key={label} x={(x0 + x1) / 2} y={PLOT.bottom + 20} fill="var(--text-50)" fontSize="11" textAnchor="middle">
                  {label}
                </text>
              );
            })}
            {data.yLabels.map((label, i) => {
              const y = i === 0 ? (PLOT.top + yMid) / 2 : (yMid + PLOT.bottom) / 2;
              return (
                <text key={label} x={PLOT.left - 22} y={y} fill="var(--text-50)" fontSize="11" textAnchor="middle" transform={`rotate(-90, ${PLOT.left - 22}, ${y})`}>
                  {label}
                </text>
              );
            })}

            {data.points.map((p) => {
              const isActive = activeId === p.id;
              const cx = pct(p.x, PLOT.left, PLOT.right);
              const cy = pct(p.y, PLOT.top, PLOT.bottom);
              return (
                <g key={p.id} style={{ cursor: "pointer" }} onClick={() => setActiveId(p.id)}>
                  {isActive && <circle cx={cx} cy={cy} r={18} fill={p.color} opacity={0.12} />}
                  <circle cx={cx} cy={cy} r={isActive ? 8 : 6} fill={p.color} opacity={isActive ? 1 : 0.55} />
                  <text x={cx + 13} y={cy + 4} fill={isActive ? p.color : "var(--text-50)"} fontSize="11" fontWeight={isActive ? "600" : "400"}>
                    {p.label}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        <AnimatePresence mode="wait">
          {active && (
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.15 }}
              className="px-5 py-4 border-t border-[var(--border)]"
            >
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: active.color }} />
                <span className="font-display font-semibold text-[var(--text)]">{active.label}</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-[var(--surface-2)] border border-[var(--border)] text-[var(--text-50)]">
                  {active.category}
                </span>
              </div>
              <p className="text-sm font-body text-[var(--text-65)]">{active.description}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
