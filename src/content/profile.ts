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
  jobTitle: "Tech Lead, Full Stack & Mobile Engineer",
  company: "Odecci Solutions Inc.",
  location: "Caloocan, Philippines",

  metaDescription:
    "Tech Lead and mobile engineer shipping production Flutter, iOS, and Android apps to the App Store and Google Play. Leads a four-engineer team across Gulf and Australian client engagements, delivered remotely.",

  /** Typewriter rotation in DesktopHero — AI leads, credentials support. */
  heroPhrases: [
    "AI-Accelerated Developer.",
    "Mobile Engineer.",
    "Full Stack Developer.",
    "Tech Lead & Architect.",
  ],

  summary:
    "Mobile-first developer from Caloocan, Philippines, shipping production Flutter, React Native, iOS, and Android apps. Tech Lead at Odecci Solutions Inc. — named by the CTO as owner of code quality, delivery progress, and documentation for a four-engineer team and an external vendor team. Delivers Gulf and Australian client engagements entirely remotely, backed by AI-driven workflows: agentic tooling, MCP, and a persistent knowledge vault.",

  /**
   * The full metric set for the crawlable SEO block. AboutApp animates the
   * four that fit its tile grid — a subset of these, never a contradiction of
   * them; if you change a number here, change it there too.
   *
   * Countable facts only — each one traces to a dated artifact. Percentage
   * self-estimates were removed in favour of numbers that survive scrutiny.
   */
  metrics: [
    "3+ years shipping to production",
    "5 production apps on the App Store and Google Play",
    "4 engineers led as Tech Lead",
    "6,878 active users served across the mobile portfolio",
    "99 of 102 support tickets resolved in seven months",
    "262-case cross-platform regression suite authored",
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

  /**
   * Condensed from the ProjectsApp array — same facts, no new claims.
   * Client work is anonymized: engagements are under NDA, so no client names,
   * product names, or identifying details belong here. This object is published
   * as crawlable HTML, so anything added here is public and indexable.
   */
  projects: [
    {
      name: "Service Booking Platform",
      role: "Mobile Lead · 2026",
      blurb:
        "All-in-one service booking platform in Flutter. Real-time sync with Firebase, Google Maps for service discovery, clean architecture with Riverpod. Led the mobile architecture from scratch.",
    },
    {
      name: "Resident Services App",
      role: "iOS Developer → Migration Lead · 2025–2026",
      blurb:
        "Resident-services iOS app for a regional property group, serving 6,878 active residents. Owned the native Swift/UIKit codebase, rebuilding the in-app customer-service chat attachment and image pipeline. Now leads the cross-platform React Native 2.0 migration — a 262-case regression suite across 16 modules, a 23-screen triaged punch list, and the deployment plan.",
    },
    {
      name: "Livestock Field App",
      role: "Mobile Engineer · 2026",
      blurb:
        "Offline-capable herd-management field app for an agricultural agency. Animal, herd, and farmer registries across 18 backend services, QR-based lookup, MVVM with Hilt.",
    },
    {
      name: "Membership Privileges App",
      role: "Mobile Engineer · 2025–Present",
      blurb:
        "React Native membership app shipped to both app stores via Expo EAS — digital membership card with QR verification and a privileges catalog, serving 1,559 active members.",
    },
    {
      name: "Quorfin",
      role: "Solo Builder · 2026",
      blurb:
        "Personal offline-first finance app in Flutter. Field-level AES encryption at rest, biometric app lock, crash-safe key rotation, encrypted backups, and PDF/CSV export — no account required. Includes a streaming AI advisor with bring-your-own-key and full offline fallback.",
    },
  ],

  contact: {
    email: "wkcacuin@gmail.com",
    github: "https://github.com/kcacuin",
    linkedin: "https://linkedin.com/in/kcacuin",
  },

  openTo: "Remote roles, freelance, and senior/lead positions",
} as const;
