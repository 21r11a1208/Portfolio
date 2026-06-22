import { ExperienceEntry } from "@/types";

export const experience: ExperienceEntry[] = [
  {
    company: "RealPage, Inc.",
    role: "Software Development Intern",
    duration: "Nov 2024 – Nov 2025",
    location: "Hyderabad, On-site",
    problemStatement: "Fragmented workflows across Jira, Asana, and Monday.com caused low visibility and high handoff friction for leadership across 40+ teams.",
    businessImpact: "Reduced handoff friction by 40%, improved executive dashboard load times by 97.3%, and restored 100% notification delivery reliability.",
    highlight: "Co-owned PMOrbit from 0 to production",
    achievements: [
      "Conducted user interviews with PMO leads and executives, translated findings into requirements and user stories",
      "Co-owned product roadmap, maintained prioritised backlog across sprint cycles",
      "Delivered role-aware dashboards, automated RAID logs, and portfolio overviews — reducing handoff friction by 40%",
      "Shipped AskOrbit: an AI chatbot for querying project health in natural language",
      "Re-engineered KPI widgets and risk heatmaps, achieving 95% faster load times",
      "Built automated PDF executive report generation",
      "Restored 100% delivery reliability by migrating email/SMS orchestration into resilient config services",
      "Mapped login-to-dashboard funnel, uncovered two critical UX gaps resolved in next sprint",
    ],
  },
  {
    company: "1Stop.ai",
    role: "Web Developer Intern",
    duration: "Jun 2023 – Sep 2023",
    location: "Remote",
    problemStatement: "Lack of a centralized, API-driven task management ecosystem led to inefficient tracking and manual coordination overhead.",
    businessImpact: "Enabled scalable backend operations by building a centralized, REST API-integrated task management application.",
    achievements: [
      "Built PHP and Laravel applications including a REST API-integrated task manager",
    ],
  },
];
