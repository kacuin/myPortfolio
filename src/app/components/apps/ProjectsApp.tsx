import { useState } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useMotionTemplate,
  useSpring,
  useTransform,
} from "motion/react";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Smartphone,
  Globe,
  Wallet,
  MessageSquare,
  PawPrint,
  Gem,
} from "lucide-react";
import { SectionLabel, AppTitle, stagger, EASE } from "./shared";
import { useIsMobile } from "../../../os/useIsMobile";

type Project = {
  slug: string;
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

// Screenshots live in src/assets/projects/<slug>/ — dropping files in is enough,
// no code changes needed (see src/assets/projects/README.md).
const screenModules = import.meta.glob<string>(
  "../../../assets/projects/*/*.{png,jpg,jpeg,webp}",
  { eager: true, import: "default" },
);
const screensBySlug: Record<string, string[]> = {};
for (const [path, url] of Object.entries(screenModules).sort(([a], [b]) => a.localeCompare(b))) {
  const slug = path.match(/projects\/([^/]+)\//)?.[1];
  if (slug) (screensBySlug[slug] ??= []).push(url);
}

const projects: Project[] = [
  {
    slug: "ireserb",
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
    slug: "quorfin",
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
    slug: "alfardan-living",
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
    slug: "oyster-privilege",
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
    slug: "pccmobile",
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
    slug: "goldone-lending",
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
    slug: "pup-procurement",
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

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 70 : -70, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -70 : 70, opacity: 0 }),
};

function CarouselArrow({ side, onClick }: { side: "left" | "right"; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label={side === "left" ? "Previous screen" : "Next screen"}
      style={{
        width: 30,
        height: 30,
        borderRadius: "50%",
        border: "1px solid var(--color-border)",
        background: "var(--color-surface)",
        color: "var(--color-text-muted)",
        display: "grid",
        placeItems: "center",
        cursor: "pointer",
        flexShrink: 0,
      }}
    >
      {side === "left" ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
    </button>
  );
}

function ScreensCarousel({ project, screens }: { project: Project; screens: string[] }) {
  const [[index, dir], setPage] = useState<[number, number]>([0, 0]);
  const isPhone = !project.type.startsWith("Web");
  const many = screens.length > 1;
  const paginate = (d: number) =>
    setPage(([i]) => [(i + d + screens.length) % screens.length, d]);

  return (
    <div style={{ marginBottom: 26 }}>
      <div
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 11.5,
          color: "var(--color-accent)",
          letterSpacing: "0.15em",
          marginBottom: 14,
        }}
      >
        SCREENS
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        {many && <CarouselArrow side="left" onClick={() => paginate(-1)} />}

        <div
          style={{
            position: "relative",
            overflow: "hidden",
            background: "#0b0b0f",
            display: "flex",
            flexDirection: "column",
            ...(isPhone
              ? {
                  width: "min(240px, 58vw)",
                  aspectRatio: "9 / 19",
                  borderRadius: 34,
                  border: "9px solid #15151a",
                  boxShadow: "0 18px 50px rgba(0,0,0,0.35)",
                }
              : {
                  width: "min(560px, 100%)",
                  aspectRatio: "16 / 10",
                  borderRadius: 12,
                  border: "1px solid var(--color-border)",
                  boxShadow: "0 18px 50px rgba(0,0,0,0.25)",
                }),
          }}
        >
          {!isPhone && (
            <div
              style={{
                height: 26,
                flexShrink: 0,
                display: "flex",
                alignItems: "center",
                gap: 5,
                padding: "0 10px",
                background: "var(--color-surface)",
                borderBottom: "1px solid var(--color-border)",
              }}
            >
              {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
                <span key={c} style={{ width: 8, height: 8, borderRadius: "50%", background: c }} />
              ))}
            </div>
          )}

          <div style={{ position: "relative", flex: 1, overflow: "hidden" }}>
            <AnimatePresence initial={false} custom={dir}>
              <motion.img
                key={index}
                src={screens[index]}
                alt={`${project.title} screen ${index + 1} of ${screens.length}`}
                custom={dir}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: EASE }}
                drag={many ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.5}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -50) paginate(1);
                  else if (info.offset.x > 50) paginate(-1);
                }}
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "top",
                }}
                draggable={false}
              />
            </AnimatePresence>
          </div>
        </div>

        {many && <CarouselArrow side="right" onClick={() => paginate(1)} />}
      </div>

      {many && (
        <div style={{ display: "flex", gap: 6, marginTop: 12, marginLeft: 44 }}>
          {screens.map((_, i) => (
            <button
              key={i}
              onClick={() => setPage([i, i > index ? 1 : -1])}
              aria-label={`Go to screen ${i + 1}`}
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                border: "none",
                padding: 0,
                cursor: "pointer",
                background: i === index ? "var(--color-accent)" : "var(--color-border)",
                transition: "background 0.2s",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function Detail({ project, onBack }: { project: Project; onBack: () => void }) {
  const screens = screensBySlug[project.slug] ?? [];
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

      {screens.length > 0 && <ScreensCarousel project={project} screens={screens} />}

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

const TILT = 7; // degrees at the card edges
const cardSpring = { stiffness: 260, damping: 20, mass: 0.6 };

function ParallaxCard({
  project,
  screens,
  index,
  onClick,
  tiltEnabled,
}: {
  project: Project;
  screens: string[];
  index: number;
  onClick: () => void;
  tiltEnabled: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  // Normalized cursor position within the card (0..1), center at rest.
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(my, [0, 1], [TILT, -TILT]), cardSpring);
  const rotateY = useSpring(useTransform(mx, [0, 1], [-TILT, TILT]), cardSpring);
  // Screenshot drifts opposite the cursor, harder than the tilt — the depth cue.
  const imgX = useSpring(useTransform(mx, [0, 1], [14, -14]), cardSpring);
  const imgY = useSpring(useTransform(my, [0, 1], [14, -14]), cardSpring);
  const glareX = useTransform(mx, (v) => v * 100);
  const glareY = useTransform(my, (v) => v * 100);
  const glare = useMotionTemplate`radial-gradient(240px circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.16), transparent 65%)`;

  const cover = screens[0];

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!tiltEnabled) return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  };
  const handleLeave = () => {
    mx.set(0.5);
    my.set(0.5);
    setHovered(false);
  };

  return (
    <div style={{ perspective: 900 }}>
      <motion.div
        {...stagger(3 + index)}
        onClick={onClick}
        onMouseMove={handleMove}
        onMouseEnter={() => tiltEnabled && setHovered(true)}
        onMouseLeave={handleLeave}
        style={{
          ...(tiltEnabled ? { rotateX, rotateY } : {}),
          transformStyle: "preserve-3d",
          position: "relative",
          height: "100%",
          background: "var(--color-surface)",
          border: `1px solid ${hovered ? "var(--color-border-hover)" : "var(--color-border)"}`,
          borderRadius: 14,
          padding: 20,
          cursor: "pointer",
          transition: "border-color 0.2s, box-shadow 0.3s",
          boxShadow: hovered ? "0 18px 40px rgba(0,0,0,0.25)" : "0 0 0 rgba(0,0,0,0)",
        }}
      >
        {cover && (
          <motion.div
            aria-hidden
            initial={false}
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: 13,
              overflow: "hidden",
              pointerEvents: "none",
            }}
          >
            <motion.img
              src={cover}
              alt=""
              draggable={false}
              style={{
                x: imgX,
                y: imgY,
                scale: 1.15,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "top",
              }}
            />
            {/* Scrim keeps card text readable over the screenshot in both themes. */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to bottom, color-mix(in srgb, var(--color-surface) 35%, transparent), var(--color-surface) 82%)",
              }}
            />
          </motion.div>
        )}

        <motion.div
          aria-hidden
          initial={false}
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.3, ease: EASE }}
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: 13,
            background: glare,
            pointerEvents: "none",
            zIndex: 2,
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 3,
            transform: "translateZ(30px)",
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}
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
              {project.icon}
            </div>
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 10.5,
                color: project.statusColor,
                border: `1px solid ${project.statusColor}`,
                padding: "2px 9px",
                borderRadius: 100,
                opacity: 0.9,
              }}
            >
              {project.status}
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
            {project.title}
          </div>
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
              color: "var(--color-text-muted)",
            }}
          >
            {project.type} · {project.year}
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
            {project.description}
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export function ProjectsApp() {
  const [selected, setSelected] = useState<Project | null>(null);
  const isMobile = useIsMobile();

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
              <ParallaxCard
                key={p.title}
                project={p}
                screens={screensBySlug[p.slug] ?? []}
                index={i}
                onClick={() => setSelected(p)}
                tiltEnabled={!isMobile}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
