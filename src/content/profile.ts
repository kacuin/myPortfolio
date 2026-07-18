/**
 * Single source of truth for the copy that has to exist in two places at once:
 * the animated desktop UI and the crawlable HTML injected at build time
 * (see vite-plugins/seoContent.ts).
 *
 * Keeping both readers on this one object is what stops the indexable text from
 * drifting away from what a visitor actually sees on the page.
 *
 * Scope note: this holds only the copy the hero and the SEO block need. The
 * fuller bios in AboutApp.tsx / ExperienceApp.tsx and the SYSTEM_PROMPT in
 * api/chat.ts are still separate — consolidating them is a later refactor.
 */

export const SITE_URL = "https://kcacuin.vercel.app";

export const PROFILE = {
  name: "KC Acuin",
  title: "AI-Accelerated Mobile Developer",
  jobTitle: "Full Stack & Mobile Developer, Team Lead",
  company: "Odecci Solutions Inc.",
  location: "Caloocan, Philippines",

  metaDescription:
    "Mobile developer shipping production Flutter, iOS, and Android apps — iReserb, Al-Fardan Living, PCCMobile. AI-driven workflows cut debug time 70%.",

  /** Typewriter rotation in DesktopHero — AI leads, credentials support. */
  heroPhrases: [
    "AI-Accelerated Developer.",
    "Mobile Engineer.",
    "Full Stack Developer.",
    "Team Lead & Architect.",
  ],

  summary:
    "Mobile-first developer from Caloocan, Philippines, shipping production Flutter, React Native, iOS, and Android apps. Team Lead and System Architect at Odecci Solutions Inc., where AI-driven workflows — agentic tooling, MCP, and a persistent knowledge vault — cut debug time by 70% and pulled release cycles from weeks down to four days.",

  /** Mirrors the metrics AboutApp animates, so the two never disagree. */
  metrics: [
    "3+ years shipping to production",
    "68% crash-rate reduction",
    "70% debug time cut via AI-driven workflows",
    "Release cycle from weeks to 4 days",
  ],

  skills: [
    "Flutter",
    "React Native",
    "iOS (Swift, UIKit)",
    "Android (Kotlin)",
    "Laravel",
    "Firebase",
    "CI/CD",
    "AI-driven development",
  ],

  /** Condensed from the ProjectsApp array — same facts, no new claims. */
  projects: [
    {
      name: "iReserb",
      role: "Mobile Lead · 2026",
      blurb:
        "All-in-one service booking platform in Flutter. Real-time sync with Firebase, Google Maps for service discovery, clean architecture with Riverpod. Led the mobile architecture from scratch.",
    },
    {
      name: "Al-Fardan Living",
      role: "iOS Developer · 2025–2026",
      blurb:
        "Resident-services iOS app for a Qatar-based property group. Owned the native Swift/UIKit codebase, rebuilding the customer-service chat attachment and image pipeline.",
    },
    {
      name: "PCCMobile",
      role: "Mobile Engineer · 2026",
      blurb:
        "Livestock herd-management field app for the Philippine Carabao Center. Buffalo Herd Recording System across 18 API services, QR-based animal lookup, MVVM with Hilt.",
    },
    {
      name: "Oyster Privilege",
      role: "Mobile Engineer · 2025–Present",
      blurb: "Live membership and privileges mobile app.",
    },
    {
      name: "Gold One Lending",
      role: "Full Stack Developer · 2023–2024",
      blurb: "Shipped lending platform covering loan origination and servicing.",
    },
  ],

  contact: {
    email: "wkcacuin@gmail.com",
    github: "https://github.com/kcacuin",
    linkedin: "https://linkedin.com/in/kcacuin",
  },

  openTo: "Remote roles, freelance, and senior/lead positions",
} as const;
