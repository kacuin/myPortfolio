import type { ComponentType } from "react";
import {
  User,
  Briefcase,
  Rocket,
  Layers,
  TerminalSquare,
  Mail,
  Sparkles,
} from "lucide-react";
import { KaiApp } from "../app/components/apps/KaiApp";
import { AboutApp } from "../app/components/apps/AboutApp";
import { ExperienceApp } from "../app/components/apps/ExperienceApp";
import { ProjectsApp } from "../app/components/apps/ProjectsApp";
import { SkillsApp } from "../app/components/apps/SkillsApp";
import { MemoryApp } from "../app/components/apps/MemoryApp";
import { ContactApp } from "../app/components/apps/ContactApp";
import { TrashApp } from "../app/components/apps/TrashApp";
import { Trash2 } from "lucide-react";

export type AppId =
  | "about"
  | "experience"
  | "projects"
  | "skills"
  | "kai"
  | "memory"
  | "contact"
  | "trash";

export type AppDef = {
  id: AppId;
  name: string;
  icon: ComponentType<{ size?: number | string; strokeWidth?: number; color?: string }>;
  /** Icon tile gradient stops */
  tint: [string, string];
  component: ComponentType;
  size: { w: number; h: number };
};

export const APPS: AppDef[] = [
  {
    id: "about",
    name: "About Me",
    icon: User,
    tint: ["#4F6EF7", "#3A55D4"],
    component: AboutApp,
    size: { w: 720, h: 620 },
  },
  {
    id: "experience",
    name: "Experience",
    icon: Briefcase,
    tint: ["#F5A623", "#D4881A"],
    component: ExperienceApp,
    size: { w: 680, h: 620 },
  },
  {
    id: "projects",
    name: "Projects",
    icon: Rocket,
    tint: ["#7C5CFC", "#5A3FE0"],
    component: ProjectsApp,
    size: { w: 900, h: 640 },
  },
  {
    id: "skills",
    name: "Skills & Stack",
    icon: Layers,
    tint: ["#2AB3A6", "#1B8A80"],
    component: SkillsApp,
    size: { w: 760, h: 620 },
  },
  {
    id: "kai",
    name: "KAI — KC's AI",
    icon: Sparkles,
    tint: ["#7C5CFC", "#4F6EF7"],
    component: KaiApp,
    size: { w: 460, h: 620 },
  },
  {
    id: "memory",
    name: "Claude — memory of KC",
    icon: TerminalSquare,
    tint: ["#0E1B33", "#1E2D50"],
    component: MemoryApp,
    size: { w: 720, h: 520 },
  },
  {
    id: "contact",
    name: "Contact",
    icon: Mail,
    tint: ["#E4573D", "#C23C24"],
    component: ContactApp,
    size: { w: 600, h: 640 },
  },
];

const TRASH_APP: AppDef = {
  id: "trash",
  name: "Trash",
  icon: Trash2,
  tint: ["#3A4568", "#232C4A"],
  component: TrashApp,
  size: { w: 380, h: 260 },
};

/** Every app that can own a window (dock apps + Trash). */
export const ALL_APPS: AppDef[] = [...APPS, TRASH_APP];

export const appById = (id: AppId) => ALL_APPS.find((a) => a.id === id);
