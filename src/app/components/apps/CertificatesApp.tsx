import { motion } from "motion/react";
import { Cloud, Code2, Download, Network, ShieldCheck, Users } from "lucide-react";
import { AppShell, Card, IconTile, stagger } from "./shared";
import awsDataAnalytics from "../../../assets/certificates/aws-data-analytics.pdf";
import fccResponsiveWebDesign from "../../../assets/certificates/fcc-responsive-web-design.pdf";
import fccJavascriptAlgorithms from "../../../assets/certificates/fcc-javascript-algorithms.pdf";
import fccFrontEndLibraries from "../../../assets/certificates/fcc-front-end-libraries.pdf";
import comptiaNetworkPlus from "../../../assets/certificates/comptia-network-plus.pdf";
import comptiaAPlus from "../../../assets/certificates/comptia-a-plus.pdf";
import projectManagementFoundations from "../../../assets/certificates/project-management-foundations.pdf";

const certificates = [
  {
    icon: <Cloud size={16} />,
    title: "Getting Started with Data Analytics on AWS",
    issuer: "AWS",
    date: "Sep 2021",
    file: awsDataAnalytics,
  },
  {
    icon: <Code2 size={16} />,
    title: "Responsive Web Design",
    issuer: "freeCodeCamp",
    date: "Sep 2021",
    file: fccResponsiveWebDesign,
  },
  {
    icon: <Code2 size={16} />,
    title: "JavaScript Algorithms and Data Structures",
    issuer: "freeCodeCamp",
    date: "Sep 2021",
    file: fccJavascriptAlgorithms,
  },
  {
    icon: <Code2 size={16} />,
    title: "Front End Development Libraries",
    issuer: "freeCodeCamp",
    date: "Sep 2021",
    file: fccFrontEndLibraries,
  },
  {
    icon: <Network size={16} />,
    title: "CompTIA Network+ Certification Prep",
    issuer: "LinkedIn Learning · 9-part series",
    date: "Aug 2021",
    file: comptiaNetworkPlus,
  },
  {
    icon: <ShieldCheck size={16} />,
    title: "CompTIA A+ Certification Prep",
    issuer: "LinkedIn Learning · 2-part series",
    date: "Aug 2021",
    file: comptiaAPlus,
  },
  {
    icon: <Users size={16} />,
    title: "Project Management Foundations",
    issuer: "LinkedIn Learning",
    date: "Aug 2021",
    file: projectManagementFoundations,
  },
];

function download(file: string, title: string) {
  const a = document.createElement("a");
  a.href = file;
  a.download = `${title}.pdf`;
  a.click();
}

export function CertificatesApp() {
  return (
    <AppShell
      title="Credentials that trace back to fundamentals."
      lede={
        <>
          Before the production apps and the Tech Lead title, there was self-directed study: web
          fundamentals, networking, cloud, and project management, built one course at a time. A
          selection of that record below, kept because the habit it represents never stopped.
        </>
      }
    >
      <motion.div {...stagger(3)}>
        <Card padded={false}>
          {certificates.map((cert, i) => (
            <a
              key={i}
              href={cert.file}
              download={`${cert.title}.pdf`}
              onClick={(e) => {
                e.preventDefault();
                download(cert.file, cert.title);
              }}
              className="cert-row"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                padding: "14px 0",
                borderBottom:
                  i < certificates.length - 1 ? "1px solid var(--color-border)" : "none",
                textDecoration: "none",
                cursor: "pointer",
              }}
            >
              <IconTile>{cert.icon}</IconTile>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 500,
                    color: "var(--color-text)",
                    marginBottom: 2,
                  }}
                >
                  {cert.title}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 11.5,
                    color: "var(--color-text-muted)",
                  }}
                >
                  {cert.issuer} · {cert.date}
                </div>
              </div>
              <Download
                size={15}
                aria-hidden
                style={{ color: "var(--color-text-subtle)", flexShrink: 0 }}
              />
            </a>
          ))}
        </Card>
      </motion.div>
    </AppShell>
  );
}
