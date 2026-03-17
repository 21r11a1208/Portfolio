"use client";
import { useRef, useState, useCallback } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Tag } from "@/components/ui/Tag";
import { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
}

function ProjectLogo({ project }: { project: Project }) {
  const [imgError, setImgError] = useState(false);

  if (project.logo && !imgError) {
    return (
      <div
        className="w-full h-16 rounded-xl overflow-hidden flex items-center justify-center mb-5"
        style={{ background: project.logoBg ?? "var(--surface-2)" }}
      >
        <Image
          src={project.logo}
          alt={project.title}
          width={120}
          height={40}
          className="object-contain max-h-9"
          onError={() => setImgError(true)}
        />
      </div>
    );
  }

  return (
    <div
      className="w-full h-16 rounded-xl flex items-center justify-center mb-5"
      style={{ background: project.logoBg ?? "var(--surface-2)" }}
    >
      <span className="text-lg font-display font-bold tracking-widest text-[var(--accent-text)] opacity-60">
        {project.logoInitials ?? project.title.slice(0, 2).toUpperCase()}
      </span>
    </div>
  );
}

export function ProjectCard({ project }: ProjectCardProps) {
  const router = useRouter();
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);
  const [hint, setHint] = useState(false);
  const [navigating, setNavigating] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -12;
    setTilt({ x, y });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setHovering(false);
  };

  const handleClick = useCallback(() => {
    setHint(true);
    setTimeout(() => setHint(false), 1800);
  }, []);

  const handleDoubleClick = useCallback(() => {
    setNavigating(true);
    sessionStorage.setItem("portfolioScrollY", String(window.scrollY));
    router.push(`/projects/${project.slug}`);
  }, [router, project.slug]);

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      style={{
        transform: `perspective(1000px) rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`,
        transition: hovering ? "transform 0.1s ease" : "transform 0.4s ease",
        cursor: "none",
      }}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      className="group relative flex flex-col p-5 rounded-2xl bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--accent-25)] hover:shadow-[0_0_40px_var(--accent-08)] transition-all duration-300 select-none"
      data-cursor="view"
    >
      <ProjectLogo project={project} />

      <div className="flex items-center justify-between mb-3">
        <Tag variant="type">{project.type}</Tag>
        {project.status && (
          <span className={`text-[10px] font-body uppercase tracking-wider ${project.status === "Production" ? "text-[var(--accent-text)]" : "text-[var(--text-35)]"}`}>
            {project.status}
          </span>
        )}
      </div>

      <h3 className="text-lg font-display font-semibold text-[var(--text)] group-hover:text-[var(--accent-text)] transition-colors mb-2 leading-tight">
        {project.title}
      </h3>

      <p className="text-sm font-body text-[var(--text-55)] leading-relaxed flex-1 mb-5">
        {project.description}
      </p>

      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-2 text-sm font-display font-semibold text-[var(--text-50)] group-hover:text-[var(--accent-text)] transition-colors">
          Read case study
          <motion.span animate={{ x: hovering ? 4 : 0 }} transition={{ duration: 0.2 }}>
            →
          </motion.span>
        </span>
        <AnimatePresence>
          {hint && !navigating && (
            <motion.span
              key="hint"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="text-[11px] font-body text-[var(--accent-text)]"
            >
              double-click to open
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Optimistic navigation overlay */}
      <AnimatePresence>
        {navigating && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.15 }}
            className="absolute inset-0 rounded-2xl flex items-center justify-center"
            style={{ background: "var(--surface)", opacity: 0.88, zIndex: 10 }}
          >
            <div
              className="w-5 h-5 rounded-full border-2"
              style={{
                borderColor: "var(--accent-25)",
                borderTopColor: "var(--accent)",
                animation: "spin 0.7s linear infinite",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
