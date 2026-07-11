import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, Smartphone, Globe, Wallet, MessageSquare, PawPrint, Gem } from "lucide-react";
import { SectionLabel, AppTitle, stagger, EASE } from "./shared";

type Project = {
  title: string;
  type: string;
  icon: React.ReactNode;
  status: string;
  statusColor: string;
  description: string;
  tags: string[];
  year: string;
  role: string;
  highlights: string[];
};

const projects: Project[] = [
  {
    title: "iReserb",
    type: "Mobile · Flutter",
    icon: <Smartphone size={20} />,
    status: "Active",
    statusColor: "var(--color-teal)",
    description:
      "All-in-one service booking platform built in Flutter. Integrates Firebase for real-time sync, Google Maps API for location services, and multiple third-party SDKs. Led mobile architecture from scratch.",
    tags: ["Flutter", "Firebase", "Google Maps API", "Dart", "Riverpod"],
    year: "2026",
    role: "Mobile Lead",
    highlights: [
      "Full mobile architecture from scratch",
      "Real-time booking system with Firebase",
      "Google Maps integration for service discovery",
      "Clean architecture with Riverpod state management",
    ],
  },
  {
    title: "Quorfin",
    type: "Mobile · Flutter",
    icon: <Wallet size={20} />,
    status: "Personal",
    statusColor: "var(--color-accent)",
    description:
      "Offline-first personal finance app built solo across 10 AI-paired development waves. Budgeting, recurring transactions, goals, reports, and reminders — all local, all encrypted, no account required.",
    tags: ["Flutter", "Isar", "Riverpod", "Encryption", "Local Notifications"],
    year: "2026",
    role: "Solo Builder",
    highlights: [
      "Field-level AES encryption at rest + encrypted password-protected backups",
      "Biometric app lock (Face ID / BiometricPrompt)",
      "Recurring transactions materialized lazily — no background scheduler needed",
      "PDF/CSV export, budget alerts, and goal automation, fully offline",
      "Built in 10 structured waves pairing with AI agents end-to-end",
    ],
  },
  {
    title: "Al-Fardan Living",
    type: "Mobile · iOS",
    icon: <MessageSquare size={20} />,
    status: "Shipped",
    statusColor: "var(--color-amber)",
    description:
      "Resident-services iOS app for a Qatar-based property group. Owned the native Swift/UIKit codebase — most notably the customer-service chat: attachments, image messaging, and the server contract quirks behind them.",
    tags: ["Swift", "UIKit", "Objective-C", "REST", "SDWebImage"],
    year: "2025–2026",
    role: "iOS Developer",
    highlights: [
      "Rebuilt chat attachments: file cards, image upload, and rendering pipeline",
      "Debugged silent image-load failures down to the API's message/file contract",
      "Maintained parity with the Android reference implementation",
    ],
  },
  {
    title: "Oyster Privilege",
    type: "Mobile · React Native",
    icon: <Gem size={20} />,
    status: "Live",
    statusColor: "var(--color-teal)",
    description:
      "Membership privileges app for Al Fardan's Oyster Privilege Club — a digital membership card with QR verification plus a catalog of member privileges across the group's hotels, vendors, and business units. Shipped to both stores via Expo EAS, currently at v1.2.11.",
    tags: ["React Native", "Expo", "Redux", "NativeWind", "EAS"],
    year: "2025–Present",
    role: "Mobile Engineer",
    highlights: [
      "Digital membership card with QR code verification",
      "Privileges and offers catalog with rich detail views",
      "Hotel, vendor, and business-unit directory with discovery feed",
      "OTP-verified registration and password recovery flows",
      "Redux state, NativeWind styling, EAS builds to App Store and Play Store",
    ],
  },
  {
    title: "PCCMobile",
    type: "Mobile · Android",
    icon: <PawPrint size={20} />,
    status: "In Development",
    statusColor: "var(--color-accent)",
    description:
      "Livestock herd-management field app for the Philippine Carabao Center — digitizes animal, herd, and farmer registries with a Buffalo Herd Recording System (BHRS) used in the field by technicians and farmers.",
    tags: ["Kotlin", "Android", "MVVM", "Hilt", "Retrofit"],
    year: "2026",
    role: "Mobile Engineer",
    highlights: [
      "BHRS modules for growth, milk, and reproduction records",
      "Animal, herd, and farmer registries with pedigree, breed, and blood-composition tools across 18 API services",
      "QR-based animal scanning for instant record lookup",
      "Role-based access — farmers auto-assigned to their center, technicians pick theirs",
      "MVVM with Hilt DI, coroutines, and encrypted SharedPreferences",
    ],
  },
  {
    title: "Gold One Lending",
    type: "Web · Laravel",
    icon: <Globe size={20} />,
    status: "Shipped",
    statusColor: "var(--color-amber)",
    description:
      "Lending management system migrated from microservices to a clean monolith. Built UI/UX in Figma, implemented frontend, and designed the future system architecture roadmap.",
    tags: ["Laravel", "PHP", "Figma", "MySQL", "Livewire"],
    year: "2023–2024",
    role: "Full Stack Dev",
    highlights: [
      "Migrated from microservices to clean monolith",
      "Designed complete system architecture roadmap",
      "Full UI/UX from Figma to implementation",
      "Laravel + Livewire for reactive UI",
    ],
  },
  {
    title: "PUP Procurement Tracker",
    type: "Web · Laravel",
    icon: <Globe size={20} />,
    status: "Ongoing",
    statusColor: "var(--color-accent)",
    description:
      "Internal procurement project tracker for Polytechnic University of the Philippines. Completed full SDLC — from requirements gathering to deployment and ongoing maintenance.",
    tags: ["Laravel", "PHP", "MySQL", "Tailwind CSS", "Alpine.js"],
    year: "2024–Present",
    role: "Full Stack Dev",
    highlights: [
      "Full SDLC ownership from requirements to deployment",
      "Procurement workflow automation",
      "Role-based access control",
      "Ongoing support and enhancements",
    ],
  },
];

function Detail({ project, onBack }: { project: Project; onBack: () => void }) {
  return (
    <motion.div
      key="detail"
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 30 }}
      transition={{ duration: 0.3, ease: EASE }}
      style={{ padding: "24px 32px 32px" }}
    >
      <button
        onClick={onBack}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          border: "none",
          background: "transparent",
          color: "var(--color-accent)",
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 12,
          cursor: "pointer",
          padding: "4px 0",
          marginBottom: 18,
        }}
      >
        <ArrowLeft size={14} /> All projects
      </button>

      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8, flexWrap: "wrap" }}>
        <h3
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 26,
            fontWeight: 700,
            color: "var(--color-text)",
            letterSpacing: "-0.02em",
          }}
        >
          {project.title}
        </h3>
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11,
            color: project.statusColor,
            border: `1px solid ${project.statusColor}`,
            padding: "2px 10px",
            borderRadius: 100,
            opacity: 0.9,
          }}
        >
          {project.status}
        </span>
      </div>

      <div
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 12,
          color: "var(--color-text-muted)",
          marginBottom: 18,
        }}
      >
        {project.type} · {project.year} · {project.role}
      </div>

      <p style={{ color: "var(--color-text-muted)", fontSize: 14.5, lineHeight: 1.8, marginBottom: 22 }}>
        {project.description}
      </p>

      <div
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 11.5,
          color: "var(--color-accent)",
          letterSpacing: "0.15em",
          marginBottom: 12,
        }}
      >
        HIGHLIGHTS
      </div>
      <ul style={{ listStyle: "none", marginBottom: 24 }}>
        {project.highlights.map((h, i) => (
          <li
            key={i}
            style={{
              fontSize: 14,
              color: "var(--color-text-muted)",
              padding: "5px 0 5px 18px",
              position: "relative",
              lineHeight: 1.65,
            }}
          >
            <span style={{ position: "absolute", left: 0, top: 7, color: "var(--color-accent)", fontSize: 11 }}>
              ▸
            </span>
            {h}
          </li>
        ))}
      </ul>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {project.tags.map((t) => (
          <span
            key={t}
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11.5,
              color: "var(--color-teal)",
              background: "var(--color-teal-dim)",
              border: "1px solid rgba(100,255,218,0.15)",
              padding: "4px 12px",
              borderRadius: 100,
            }}
          >
            {t}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export function ProjectsApp() {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <AnimatePresence mode="wait">
      {selected ? (
        <Detail key="detail" project={selected} onBack={() => setSelected(null)} />
      ) : (
        <motion.div
          key="grid"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3, ease: EASE }}
          style={{ padding: "28px 32px 32px" }}
        >
          <SectionLabel>03 · PROJECTS</SectionLabel>
          <AppTitle>Things I've shipped.</AppTitle>
          <motion.p
            {...stagger(2)}
            style={{ color: "var(--color-text-muted)", fontSize: 14, marginBottom: 26 }}
          >
            Production apps and systems — click one to open its case file.
          </motion.p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
              gap: 16,
            }}
          >
            {projects.map((p, i) => (
              <motion.div
                key={p.title}
                {...stagger(3 + i)}
                whileHover={{ y: -4 }}
                onClick={() => setSelected(p)}
                style={{
                  background: "var(--color-surface)",
                  border: "1px solid var(--color-border)",
                  borderRadius: 14,
                  padding: 20,
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                  transition: "border-color 0.2s",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.borderColor = "var(--color-border-hover)")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.borderColor = "var(--color-border)")
                }
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 10,
                      background: "var(--color-accent-dim)",
                      border: "1px solid rgba(79,110,247,0.2)",
                      display: "grid",
                      placeItems: "center",
                      color: "var(--color-accent)",
                    }}
                  >
                    {p.icon}
                  </div>
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 10.5,
                      color: p.statusColor,
                      border: `1px solid ${p.statusColor}`,
                      padding: "2px 9px",
                      borderRadius: 100,
                      opacity: 0.9,
                    }}
                  >
                    {p.status}
                  </span>
                </div>
                <div
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: 16.5,
                    fontWeight: 600,
                    color: "var(--color-text)",
                  }}
                >
                  {p.title}
                </div>
                <div
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 11,
                    color: "var(--color-text-muted)",
                  }}
                >
                  {p.type} · {p.year}
                </div>
                <p
                  style={{
                    fontSize: 13,
                    color: "var(--color-text-muted)",
                    lineHeight: 1.6,
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {p.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
