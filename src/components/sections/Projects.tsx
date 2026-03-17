"use client";
import { useRouter } from "next/navigation";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { projects } from "@/data/projects";
import { Tag } from "@/components/ui/Tag";
import { Project } from "@/types";

// Tab labels mapped to type values (null = "All")
const TAB_LABELS: { label: string; type: Project["type"] | null }[] = [
  { label: "All", type: null },
  { label: "Case Studies", type: "Case Study" },
  { label: "PRDs", type: "PRD" },
  { label: "Product Teardowns", type: "Product Teardown" },
  { label: "RCAs", type: "RCA" },
  { label: "Product Enhancements", type: "Product Enhancement" },
  { label: "Product Breakdowns", type: "Product Breakdown" },
  { label: "Metrics", type: "Metrics" },
];

function FeaturedProject() {
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);
  const [hint, setHint] = useState(false);
  const featured = projects[0];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 6;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -6;
    setTilt({ x, y });
  };

  const handleClick = () => {
    setHint(true);
    setTimeout(() => setHint(false), 1800);
  };

  return (
    <ScrollReveal>
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => { setTilt({ x: 0, y: 0 }); setHovering(false); }}
        onClick={handleClick}
        onDoubleClick={() => {
          sessionStorage.setItem("portfolioScrollY", String(window.scrollY));
          router.push(`/projects/${featured.slug}`);
        }}
        style={{
          transform: `perspective(1200px) rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`,
          transition: hovering ? "transform 0.1s ease" : "transform 0.5s ease",
        }}
        className="group relative w-full p-8 md:p-12 rounded-3xl bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--accent-25)] hover:shadow-[0_0_80px_var(--accent-08)] transition-all duration-300 mb-5 select-none overflow-hidden"
        data-cursor="view"
      >
        {/* Subtle background glow on hover */}
        <div
          className="absolute top-0 right-0 w-96 h-96 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          style={{ background: "radial-gradient(circle at 80% 20%, rgba(200,240,96,0.04) 0%, transparent 60%)" }}
          aria-hidden="true"
        />

        <div className="relative z-10 grid md:grid-cols-2 gap-8 md:gap-16 items-center">
          {/* Left: text */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Tag variant="type">{featured.type}</Tag>
              <span className="text-[10px] font-body uppercase tracking-wider text-[var(--accent-text)]">
                {featured.status}
              </span>
            </div>

            <h3 className="text-4xl md:text-5xl font-display font-bold text-[var(--text)] group-hover:text-[var(--accent-text)] transition-colors duration-300 mb-4 leading-tight">
              {featured.title}
            </h3>

            <p className="text-base font-body text-[var(--text-55)] leading-relaxed mb-8 max-w-md">
              {featured.description}
            </p>

            <div className="flex items-center gap-4">
              <motion.span
                animate={{ x: hovering ? 6 : 0 }}
                transition={{ duration: 0.25 }}
                className="inline-flex items-center gap-2 text-sm font-display font-semibold text-[var(--text-50)] group-hover:text-[var(--accent-text)] transition-colors"
              >
                Read case study →
              </motion.span>
              {hint && (
                <motion.span
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-[11px] font-body text-[var(--accent-text)]"
                >
                  double-click to open
                </motion.span>
              )}
            </div>
          </div>

          {/* Right: key metrics */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { value: "0→1", label: "Built from zero to production" },
              { value: "40%", label: "Reduction in handoff friction" },
              { value: "95%", label: "Faster dashboard load time" },
              { value: "50+", label: "User interviews conducted" },
            ].map((m) => (
              <div
                key={m.label}
                className="p-4 rounded-2xl bg-[var(--surface-2)] border border-[var(--border)]"
              >
                <p className="text-3xl font-display font-bold text-[var(--accent-text)] mb-1">
                  {m.value}
                </p>
                <p className="text-[11px] font-body text-[var(--text-40)] leading-snug">
                  {m.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </ScrollReveal>
  );
}

export function Projects() {
  const [activeTab, setActiveTab] = useState<Project["type"] | null>(null);

  // Only show tabs that have at least one project
  const availableTabs = TAB_LABELS.filter(
    (tab) => tab.type === null || projects.some((p) => p.type === tab.type)
  );

  const showAll = activeTab === null;
  const featured = projects[0];

  // When "All": featured card + rest as grid. Otherwise: filter all projects.
  const filtered = showAll
    ? projects.slice(1)
    : projects.filter((p) => p.type === activeTab);

  const showFeatured = showAll || featured.type === activeTab;

  return (
    <section id="case-studies" className="py-24 md:py-32 px-6 md:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <SectionHeading label="Work" title="What I've built & thought through" />
        </ScrollReveal>

        {/* Tabs */}
        <ScrollReveal delay={0.05}>
          <div className="flex flex-wrap gap-2 mb-8">
            {availableTabs.map((tab) => {
              const isActive = activeTab === tab.type;
              return (
                <button
                  key={tab.label}
                  onClick={() => setActiveTab(tab.type)}
                  data-cursor="hover"
                  className={`px-4 py-1.5 rounded-full text-[13px] font-display font-semibold transition-all duration-200 border ${
                    isActive
                      ? "bg-[var(--accent)] text-[#0f0f14] border-[var(--accent)]"
                      : "bg-transparent text-[var(--text-50)] border-[var(--border)] hover:border-[var(--accent-25)] hover:text-[var(--text)]"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </ScrollReveal>

        {/* Featured card — shown on "All" or when filter matches its type */}
        <AnimatePresence mode="wait">
          {showFeatured && showAll && (
            <motion.div
              key="featured"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              <FeaturedProject />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab ?? "all"}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {filtered.length === 0 ? (
              <div className="col-span-full py-16 text-center">
                <p className="text-[var(--text-35)] font-body text-sm">
                  No work in this category yet — coming soon.
                </p>
              </div>
            ) : (
              filtered.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
