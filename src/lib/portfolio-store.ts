import { useEffect, useState } from "react";

export type Project = {
  id: string;
  name: string;
  description: string;
  tech: string;
  link: string;
  image?: string; // data URL or remote URL
};

export type Experience = {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
};

export type Education = {
  id: string;
  school: string;
  degree: string;
  period: string;
};

export type PortfolioData = {
  name: string;
  title: string;
  location: string;
  email: string;
  phone: string;
  website: string;
  github: string;
  linkedin: string;
  bio: string;
  summary: string;
  skills: string;
  /** Profile photo (portrait). Data URL or remote URL. */
  avatar?: string;
  /** Optional hero background image. Data URL or remote URL. */
  hero?: string;
  projects: Project[];
  experience: Experience[];
  education: Education[];
  theme: "noir" | "ivory" | "ember";
  template: "editorial" | "minimal" | "cinematic";
};

/** Empty starting state — no fake data. */
export const DEFAULT_PORTFOLIO: PortfolioData = {
  name: "",
  title: "",
  location: "",
  email: "",
  phone: "",
  website: "",
  github: "",
  linkedin: "",
  bio: "",
  summary: "",
  skills: "",
  avatar: undefined,
  hero: undefined,
  projects: [],
  experience: [],
  education: [],
  theme: "noir",
  template: "editorial",
};

/** A neutral, illustrative sample used ONLY on the marketing landing page mockups. */
export const SAMPLE_PORTFOLIO: PortfolioData = {
  name: "Your Name",
  title: "Your Role · Your Craft",
  location: "Your City",
  email: "you@yourdomain.com",
  phone: "",
  website: "yourname.portfolioai.dev",
  github: "",
  linkedin: "",
  bio: "A short, confident introduction about who you are and what you build.",
  summary:
    "A professional summary tailored to the roles you want. Generated and polished by AI.",
  skills: "Your, Skills, Here",
  projects: [
    {
      id: "demo-1",
      name: "Your project name",
      description: "What it is. Who it's for. Why it matters.",
      tech: "Your stack",
      link: "",
    },
    {
      id: "demo-2",
      name: "Another project",
      description: "A second case study with measurable impact.",
      tech: "Your stack",
      link: "",
    },
  ],
  experience: [
    {
      id: "demo-e",
      role: "Your role",
      company: "Company",
      period: "Year — Year",
      description: "One strong line about scope and impact.",
    },
  ],
  education: [
    {
      id: "demo-ed",
      school: "Your school",
      degree: "Your degree",
      period: "Year — Year",
    },
  ],
  theme: "noir",
  template: "editorial",
};

const KEY = "portfolioai:data:v2";

export function loadPortfolio(): PortfolioData {
  if (typeof window === "undefined") return DEFAULT_PORTFOLIO;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return DEFAULT_PORTFOLIO;
    return { ...DEFAULT_PORTFOLIO, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_PORTFOLIO;
  }
}

export function savePortfolio(data: PortfolioData) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(KEY, JSON.stringify(data));
  } catch (err) {
    // Most likely storage quota — images are stored as base64 and can be large.
    console.warn("Could not persist portfolio (quota?)", err);
  }
}

export function usePortfolio() {
  const [data, setData] = useState<PortfolioData>(DEFAULT_PORTFOLIO);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setData(loadPortfolio());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) savePortfolio(data);
  }, [data, hydrated]);

  return { data, setData, hydrated };
}

export function uid() {
  return Math.random().toString(36).slice(2, 9);
}
