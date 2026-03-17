export interface Project {
  slug: string;
  title: string;
  type: "Case Study" | "Product Breakdown" | "PRD" | "Product Teardown" | "RCA" | "Product Enhancement" | "Metrics";
  description: string;
  status?: "Production" | "Conceptual";
  tags?: string[];
  logo?: string;        // path to logo image in /public, e.g. "/logos/realpage.png"
  logoBg?: string;      // fallback bg color if no logo image, e.g. "#1a1a22"
  logoInitials?: string; // fallback initials if no logo image, e.g. "RP"
}

export interface ExperienceEntry {
  company: string;
  role: string;
  duration: string;
  location: string;
  highlight?: string;
  achievements: string[];
  link?: string;
}

export interface Article {
  title: string;
  subtitle: string;
  readTime: string;
  url: string;
}

export interface Stat {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
}

export interface SkillGroup {
  category: string;
  skills: string[];
}
