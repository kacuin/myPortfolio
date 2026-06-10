// import { useState } from "react";
// import { motion, AnimatePresence } from "motion/react";
// import { ExternalLink, Smartphone, Globe, X } from "lucide-react";

// const projects = [
//   {
//     title: "iReserb",
//     type: "Mobile · Flutter",
//     icon: <Smartphone size={20} />,
//     status: "Active",
//     statusColor: "#64FFDA",
//     description:
//       "All-in-one service booking platform built in Flutter. Integrates Firebase for real-time sync, Google Maps API for location services, and multiple third-party SDKs. Led mobile architecture from scratch.",
//     tags: ["Flutter", "Firebase", "Google Maps API", "Dart", "Riverpod"],
//     color: "#4F6EF7",
//     year: "2026",
//     role: "Mobile Lead",
//     highlights: [
//       "Full mobile architecture from scratch",
//       "Real-time booking system with Firebase",
//       "Google Maps integration for service discovery",
//       "Clean architecture with Riverpod state management",
//     ],
//   },
//   {
//     title: "Gold One Lending",
//     type: "Web · Laravel",
//     icon: <Globe size={20} />,
//     status: "Shipped",
//     statusColor: "#F5A623",
//     description:
//       "Lending management system migrated from microservices to a clean monolith. Built UI/UX in Figma, implemented frontend, and designed the future system architecture roadmap.",
//     tags: ["Laravel", "PHP", "Figma", "MySQL", "Livewire"],
//     color: "#64FFDA",
//     year: "2023–2024",
//     role: "Full Stack Dev",
//     highlights: [
//       "Migrated from microservices to clean monolith",
//       "Designed complete system architecture roadmap",
//       "Full UI/UX from Figma to implementation",
//       "Laravel + Livewire for reactive UI",
//     ],
//   },
//   {
//     title: "PUP Procurement Tracker",
//     type: "Web · Laravel",
//     icon: <Globe size={20} />,
//     status: "Ongoing",
//     statusColor: "#4F6EF7",
//     description:
//       "Internal procurement project tracker for Polytechnic University of the Philippines. Completed full SDLC — from requirements gathering to deployment and ongoing maintenance.",
//     tags: ["Laravel", "PHP", "MySQL", "Tailwind CSS", "Alpine.js"],
//     color: "#F5A623",
//     year: "2024–Present",
//     role: "Full Stack Dev",
//     highlights: [
//       "Full SDLC ownership from requirements to deployment",
//       "Procurement workflow automation",
//       "Role-based access control",
//       "Ongoing support and enhancements",
//     ],
//   },
// ];

// export function Projects() {
//   const [selected, setSelected] = useState<(typeof projects)[0] | null>(null);

//   return (
//     <section id="projects" style={{ padding: "100px 0", background: "#0F1729" }}>
//       <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 32px" }}>
//         <motion.div
//           initial={{ opacity: 0, y: 16 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           style={{
//             fontFamily: "'JetBrains Mono', monospace",
//             fontSize: 12,
//             color: "#4F6EF7",
//             letterSpacing: "0.15em",
//             marginBottom: 12,
//             display: "flex",
//             alignItems: "center",
//             gap: 10,
//           }}
//         >
//           03.5 · PROJECTS
//           <span
//             style={{
//               flex: 1,
//               maxWidth: 60,
//               height: 1,
//               background: "#4F6EF7",
//               opacity: 0.4,
//               display: "block",
//             }}
//           />
//         </motion.div>

//         <motion.h2
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ delay: 0.1 }}
//           style={{
//             fontFamily: "'Space Grotesk', sans-serif",
//             fontSize: "clamp(28px, 4vw, 42px)",
//             fontWeight: 700,
//             letterSpacing: "-0.02em",
//             color: "#F0F4FF",
//             marginBottom: 12,
//           }}
//         >
//           Things I've shipped.
//         </motion.h2>

//         <motion.p
//           initial={{ opacity: 0, y: 16 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ delay: 0.15 }}
//           style={{ color: "#8892B0", fontSize: 16, marginBottom: 64, maxWidth: 500 }}
//         >
//           Production apps across mobile and web — each one owned end-to-end. Click any card to see details.
//         </motion.p>

//         <div
//           style={{
//             display: "grid",
//             gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
//             gap: 24,
//           }}
//         >
//           {projects.map((p, i) => (
//             <motion.div
//               key={p.title}
//               initial={{ opacity: 0, y: 24 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ delay: i * 0.1, duration: 0.5 }}
//               whileHover={{ y: -6 }}
//               onClick={() => setSelected(p)}
//               style={{
//                 background: "#131C35",
//                 border: "1px solid #1E2D50",
//                 borderRadius: 16,
//                 padding: 28,
//                 cursor: "pointer",
//                 transition: "border-color 0.2s",
//                 position: "relative",
//                 overflow: "hidden",
//               }}
//               onMouseEnter={(e) => {
//                 (e.currentTarget as HTMLElement).style.borderColor = p.color;
//               }}
//               onMouseLeave={(e) => {
//                 (e.currentTarget as HTMLElement).style.borderColor = "#1E2D50";
//               }}
//             >
//               {/* Subtle gradient top accent */}
//               <div
//                 style={{
//                   position: "absolute",
//                   top: 0,
//                   left: 0,
//                   right: 0,
//                   height: 2,
//                   background: `linear-gradient(to right, ${p.color}, transparent)`,
//                   opacity: 0.6,
//                 }}
//               />

//               <div
//                 style={{
//                   display: "flex",
//                   justifyContent: "space-between",
//                   alignItems: "flex-start",
//                   marginBottom: 20,
//                 }}
//               >
//                 <div
//                   style={{
//                     width: 44,
//                     height: 44,
//                     borderRadius: 12,
//                     background: `${p.color}18`,
//                     border: `1px solid ${p.color}30`,
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     color: p.color,
//                   }}
//                 >
//                   {p.icon}
//                 </div>
//                 <span
//                   style={{
//                     fontFamily: "'JetBrains Mono', monospace",
//                     fontSize: 11,
//                     color: p.statusColor,
//                     background: `${p.statusColor}15`,
//                     border: `1px solid ${p.statusColor}30`,
//                     padding: "3px 10px",
//                     borderRadius: 100,
//                   }}
//                 >
//                   {p.status}
//                 </span>
//               </div>

//               <div
//                 style={{
//                   fontFamily: "'Space Grotesk', sans-serif",
//                   fontSize: 20,
//                   fontWeight: 700,
//                   color: "#F0F4FF",
//                   marginBottom: 6,
//                 }}
//               >
//                 {p.title}
//               </div>

//               <div
//                 style={{
//                   fontFamily: "'JetBrains Mono', monospace",
//                   fontSize: 12,
//                   color: "#4A5578",
//                   marginBottom: 16,
//                 }}
//               >
//                 {p.type} · {p.year}
//               </div>

//               <p
//                 style={{
//                   fontSize: 14,
//                   color: "#8892B0",
//                   lineHeight: 1.7,
//                   marginBottom: 20,
//                 }}
//               >
//                 {p.description}
//               </p>

//               <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
//                 {p.tags.map((t) => (
//                   <span
//                     key={t}
//                     style={{
//                       fontFamily: "'JetBrains Mono', monospace",
//                       fontSize: 11,
//                       color: "#8892B0",
//                       background: "rgba(136,146,176,0.08)",
//                       border: "1px solid #4A5578",
//                       padding: "3px 10px",
//                       borderRadius: 100,
//                     }}
//                   >
//                     {t}
//                   </span>
//                 ))}
//               </div>

//               <div
//                 style={{
//                   display: "flex",
//                   alignItems: "center",
//                   gap: 6,
//                   marginTop: 20,
//                   color: "#4F6EF7",
//                   fontFamily: "'JetBrains Mono', monospace",
//                   fontSize: 12,
//                 }}
//               >
//                 <ExternalLink size={14} /> View details
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </div>

//       {/* Modal */}
//       <AnimatePresence>
//         {selected && (
//           <>
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               onClick={() => setSelected(null)}
//               style={{
//                 position: "fixed",
//                 inset: 0,
//                 background: "rgba(10,15,30,0.85)",
//                 backdropFilter: "blur(8px)",
//                 zIndex: 200,
//               }}
//             />
//             <motion.div
//               initial={{ opacity: 0, scale: 0.92, y: 20 }}
//               animate={{ opacity: 1, scale: 1, y: 0 }}
//               exit={{ opacity: 0, scale: 0.92, y: 20 }}
//               transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
//               style={{
//                 position: "fixed",
//                 top: "25%",
//                 left: "25%",
//                 zIndex: 201,
//                 background: "#131C35",
//                 border: `1px solid ${selected.color}50`,
//                 borderRadius: 20,
//                 padding: 40,
//                 maxWidth: 560,
//                 width: "calc(100vw - 40px)",
//                 maxHeight: "80vh",
//                 overflowY: "auto",
//               }}
//             >
//               <button
//                 onClick={() => setSelected(null)}
//                 style={{
//                   position: "absolute",
//                   top: 20,
//                   right: 20,
//                   background: "rgba(136,146,176,0.1)",
//                   border: "none",
//                   borderRadius: 8,
//                   color: "#8892B0",
//                   cursor: "pointer",
//                   padding: 8,
//                   display: "flex",
//                 }}
//               >
//                 <X size={18} />
//               </button>

//               <div
//                 style={{
//                   width: 52,
//                   height: 52,
//                   borderRadius: 14,
//                   background: `${selected.color}18`,
//                   border: `1px solid ${selected.color}30`,
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   color: selected.color,
//                   marginBottom: 20,
//                 }}
//               >
//                 {selected.icon}
//               </div>

//               <div
//                 style={{
//                   fontFamily: "'Space Grotesk', sans-serif",
//                   fontSize: 26,
//                   fontWeight: 700,
//                   color: "#F0F4FF",
//                   marginBottom: 4,
//                 }}
//               >
//                 {selected.title}
//               </div>
//               <div
//                 style={{
//                   fontFamily: "'JetBrains Mono', monospace",
//                   fontSize: 12,
//                   color: "#4A5578",
//                   marginBottom: 20,
//                 }}
//               >
//                 {selected.type} · {selected.year} · {selected.role}
//               </div>

//               <p
//                 style={{
//                   color: "#8892B0",
//                   fontSize: 15,
//                   lineHeight: 1.8,
//                   marginBottom: 28,
//                 }}
//               >
//                 {selected.description}
//               </p>

//               <div
//                 style={{
//                   fontFamily: "'JetBrains Mono', monospace",
//                   fontSize: 11,
//                   color: "#4F6EF7",
//                   letterSpacing: "0.1em",
//                   marginBottom: 14,
//                 }}
//               >
//                 KEY HIGHLIGHTS
//               </div>
//               <ul style={{ listStyle: "none", marginBottom: 28 }}>
//                 {selected.highlights.map((h, i) => (
//                   <li
//                     key={i}
//                     style={{
//                       fontSize: 14,
//                       color: "#8892B0",
//                       padding: "6px 0 6px 18px",
//                       position: "relative",
//                       lineHeight: 1.6,
//                       borderBottom: i < selected.highlights.length - 1 ? "1px solid #1E2D50" : "none",
//                     }}
//                   >
//                     <span
//                       style={{
//                         position: "absolute",
//                         left: 0,
//                         top: 8,
//                         color: selected.color,
//                         fontSize: 11,
//                       }}
//                     >
//                       ▸
//                     </span>
//                     {h}
//                   </li>
//                 ))}
//               </ul>

//               <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
//                 {selected.tags.map((t) => (
//                   <span
//                     key={t}
//                     style={{
//                       fontFamily: "'JetBrains Mono', monospace",
//                       fontSize: 11,
//                       color: "#8892B0",
//                       background: "rgba(136,146,176,0.08)",
//                       border: "1px solid #4A5578",
//                       padding: "4px 12px",
//                       borderRadius: 100,
//                     }}
//                   >
//                     {t}
//                   </span>
//                 ))}
//               </div>
//             </motion.div>
//           </>
//         )}
//       </AnimatePresence>
//     </section>
//   );
// }
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ExternalLink, Smartphone, Globe, X } from "lucide-react";

const projects = [
  {
    title: "iReserb",
    type: "Mobile · Flutter",
    icon: <Smartphone size={20} />,
    status: "Active",
    statusColor: "#64FFDA",
    description:
      "All-in-one service booking platform built in Flutter. Integrates Firebase for real-time sync, Google Maps API for location services, and multiple third-party SDKs. Led mobile architecture from scratch.",
    tags: ["Flutter", "Firebase", "Google Maps API", "Dart", "Riverpod"],
    color: "#4F6EF7",
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
    title: "Gold One Lending",
    type: "Web · Laravel",
    icon: <Globe size={20} />,
    status: "Shipped",
    statusColor: "#F5A623",
    description:
      "Lending management system migrated from microservices to a clean monolith. Built UI/UX in Figma, implemented frontend, and designed the future system architecture roadmap.",
    tags: ["Laravel", "PHP", "Figma", "MySQL", "Livewire"],
    color: "#64FFDA",
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
    statusColor: "#4F6EF7",
    description:
      "Internal procurement project tracker for Polytechnic University of the Philippines. Completed full SDLC — from requirements gathering to deployment and ongoing maintenance.",
    tags: ["Laravel", "PHP", "MySQL", "Tailwind CSS", "Alpine.js"],
    color: "#F5A623",
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

export function Projects() {
  const [selected, setSelected] = useState<(typeof projects)[0] | null>(null);

  const openModal = (project: (typeof projects)[0]) => {
    setSelected(project);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setSelected(null);
    document.body.style.overflow = "";
  };

  return (
    <section id="projects" style={{ padding: "100px 0", background: "#0F1729" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 32px" }}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 12,
            color: "#4F6EF7",
            letterSpacing: "0.15em",
            marginBottom: 12,
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          03.5 · PROJECTS
          <span
            style={{
              flex: 1,
              maxWidth: 60,
              height: 1,
              background: "#4F6EF7",
              opacity: 0.4,
              display: "block",
            }}
          />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "clamp(28px, 4vw, 42px)",
            fontWeight: 700,
            letterSpacing: "-0.02em",
            color: "#F0F4FF",
            marginBottom: 12,
          }}
        >
          Things I've shipped.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          style={{ color: "#8892B0", fontSize: 16, marginBottom: 64, maxWidth: 500 }}
        >
          Production apps across mobile and web — each one owned end-to-end. Click any card to see details.
        </motion.p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 24,
          }}
        >
          {projects.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -6 }}
              onClick={() => openModal(p)}
              style={{
                background: "#131C35",
                border: "1px solid #1E2D50",
                borderRadius: 16,
                padding: 28,
                cursor: "pointer",
                transition: "border-color 0.2s",
                position: "relative",
                overflow: "hidden",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = p.color;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "#1E2D50";
              }}
            >
              {/* Subtle gradient top accent */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 2,
                  background: `linear-gradient(to right, ${p.color}, transparent)`,
                  opacity: 0.6,
                }}
              />

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: 20,
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: `${p.color}18`,
                    border: `1px solid ${p.color}30`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: p.color,
                  }}
                >
                  {p.icon}
                </div>
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 11,
                    color: p.statusColor,
                    background: `${p.statusColor}15`,
                    border: `1px solid ${p.statusColor}30`,
                    padding: "3px 10px",
                    borderRadius: 100,
                  }}
                >
                  {p.status}
                </span>
              </div>

              <div
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: 20,
                  fontWeight: 700,
                  color: "#F0F4FF",
                  marginBottom: 6,
                }}
              >
                {p.title}
              </div>

              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 12,
                  color: "#4A5578",
                  marginBottom: 16,
                }}
              >
                {p.type} · {p.year}
              </div>

              <p
                style={{
                  fontSize: 14,
                  color: "#8892B0",
                  lineHeight: 1.7,
                  marginBottom: 20,
                }}
              >
                {p.description}
              </p>

              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {p.tags.map((t) => (
                  <span
                    key={t}
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 11,
                      color: "#8892B0",
                      background: "rgba(136,146,176,0.08)",
                      border: "1px solid #4A5578",
                      padding: "3px 10px",
                      borderRadius: 100,
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  marginTop: 20,
                  color: "#4F6EF7",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 12,
                }}
              >
                <ExternalLink size={14} /> View details
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              style={{
                position: "fixed",
                inset: 0,
                background: "rgba(10,15,30,0.85)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
                zIndex: 200,
              }}
            />

            {/* Centering wrapper — sits above the backdrop, fills the viewport */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                position: "fixed",
                inset: 0,
                zIndex: 201,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "20px",
                // Bottom-sheet feel on mobile: push to bottom edge
                // Remove the two lines below if you prefer centered on all screen sizes
              }}
              onClick={(e) => {
                if (e.target === e.currentTarget) closeModal();
              }}
            >
              {/* Modal box */}
              <motion.div
                initial={{ opacity: 0, scale: 0.92, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: 20 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                onClick={(e) => e.stopPropagation()}
                style={{
                  background: "#131C35",
                  border: `1px solid ${selected.color}50`,
                  borderRadius: 20,
                  padding: "40px",
                  width: "100%",
                  maxWidth: 560,
                  maxHeight: "85vh",
                  overflowY: "auto",
                  position: "relative",
                }}
              >
                <button
                  onClick={closeModal}
                  style={{
                    position: "absolute",
                    top: 20,
                    right: 20,
                    background: "rgba(136,146,176,0.1)",
                    border: "none",
                    borderRadius: 8,
                    color: "#8892B0",
                    cursor: "pointer",
                    padding: 8,
                    display: "flex",
                  }}
                >
                  <X size={18} />
                </button>

                <div
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: 14,
                    background: `${selected.color}18`,
                    border: `1px solid ${selected.color}30`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: selected.color,
                    marginBottom: 20,
                  }}
                >
                  {selected.icon}
                </div>

                <div
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: 26,
                    fontWeight: 700,
                    color: "#F0F4FF",
                    marginBottom: 4,
                  }}
                >
                  {selected.title}
                </div>
                <div
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 12,
                    color: "#4A5578",
                    marginBottom: 20,
                  }}
                >
                  {selected.type} · {selected.year} · {selected.role}
                </div>

                <p
                  style={{
                    color: "#8892B0",
                    fontSize: 15,
                    lineHeight: 1.8,
                    marginBottom: 28,
                  }}
                >
                  {selected.description}
                </p>

                <div
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 11,
                    color: "#4F6EF7",
                    letterSpacing: "0.1em",
                    marginBottom: 14,
                  }}
                >
                  KEY HIGHLIGHTS
                </div>
                <ul style={{ listStyle: "none", marginBottom: 28 }}>
                  {selected.highlights.map((h, i) => (
                    <li
                      key={i}
                      style={{
                        fontSize: 14,
                        color: "#8892B0",
                        padding: "6px 0 6px 18px",
                        position: "relative",
                        lineHeight: 1.6,
                        borderBottom:
                          i < selected.highlights.length - 1
                            ? "1px solid #1E2D50"
                            : "none",
                      }}
                    >
                      <span
                        style={{
                          position: "absolute",
                          left: 0,
                          top: 8,
                          color: selected.color,
                          fontSize: 11,
                        }}
                      >
                        ▸
                      </span>
                      {h}
                    </li>
                  ))}
                </ul>

                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {selected.tags.map((t) => (
                    <span
                      key={t}
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: 11,
                        color: "#8892B0",
                        background: "rgba(136,146,176,0.08)",
                        border: "1px solid #4A5578",
                        padding: "4px 12px",
                        borderRadius: 100,
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}