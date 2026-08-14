import { lazy, type ComponentType } from "react";
import type { LucideIcon } from "lucide-react";
import {
  User,
  Briefcase,
  Rocket,
  Layers,
  TerminalSquare,
  Mail,
  Sparkles,
  Award,
} from "lucide-react";
import { Trash2 } from "lucide-react";

/**
 * Apps are lazy so the initial payload carries the desktop shell only. A window
 * doesn't mount until it's opened, so nothing here is needed to paint the hero
 * — eagerly importing them put the whole KAI chat client, every project case
 * file and the terminal replay in front of the first frame.
 *
 * Window.tsx renders these inside a <Suspense>.
 */
const KaiApp = lazy(() =>
  import("../app/components/apps/KaiApp").then((m) => ({ default: m.KaiApp })),
);
const AboutApp = lazy(() =>
  import("../app/components/apps/AboutApp").then((m) => ({ default: m.AboutApp })),
);
const ExperienceApp = lazy(() =>
  import("../app/components/apps/ExperienceApp").then((m) => ({ default: m.ExperienceApp })),
);
const ProjectsApp = lazy(() =>
  import("../app/components/apps/ProjectsApp").then((m) => ({ default: m.ProjectsApp })),
);
const SkillsApp = lazy(() =>
  import("../app/components/apps/SkillsApp").then((m) => ({ default: m.SkillsApp })),
);
const CertificatesApp = lazy(() =>
  import("../app/components/apps/CertificatesApp").then((m) => ({ default: m.CertificatesApp })),
);
const MemoryApp = lazy(() =>
  import("../app/components/apps/MemoryApp").then((m) => ({ default: m.MemoryApp })),
);
const ContactApp = lazy(() =>
  import("../app/components/apps/ContactApp").then((m) => ({ default: m.ContactApp })),
);
const TrashApp = lazy(() =>
  import("../app/components/apps/TrashApp").then((m) => ({ default: m.TrashApp })),
);

export type AppId =
  | "about"
  | "experience"
  | "projects"
  | "skills"
  | "certificates"
  | "kai"
  | "memory"
  | "contact"
  | "trash";

export type AppDef = {
  id: AppId;
  name: string;
  /** Lucide's own type — the hand-written prop shape this replaced declared
   *  strokeWidth as number, while Lucide accepts string | number. */
  icon: LucideIcon;
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
    id: "certificates",
    name: "Certificates",
    icon: Award,
    tint: ["#E4A72A", "#B8841A"],
    component: CertificatesApp,
    size: { w: 680, h: 620 },
  },
  {
    id: "kai",
    name: "KAI: KC's AI",
    icon: Sparkles,
    tint: ["#7C5CFC", "#4F6EF7"],
    component: KaiApp,
    size: { w: 460, h: 620 },
  },
  {
    id: "memory",
    name: "Claude: memory of KC",
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
