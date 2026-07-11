import { useState } from "react";
import { motion } from "motion/react";
import { Mail, Linkedin, Phone, Github, Download, Send, CheckCircle } from "lucide-react";
import { SectionLabel, AppTitle, stagger } from "./shared";
import cvFile from "../../../assets/KC_Acuin_CV.pdf";

const links = [
  { icon: <Mail size={16} />, label: "wkcacuin@gmail.com", href: "mailto:wkcacuin@gmail.com" },
  { icon: <Github size={16} />, label: "github.com/kcacuin", href: "https://github.com/kcacuin" },
  { icon: <Linkedin size={16} />, label: "linkedin.com/in/kcacuin", href: "https://linkedin.com/in/kcacuin" },
  { icon: <Phone size={16} />, label: "+63 956 512 7734", href: "tel:+639565127734" },
];

export function ContactApp() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setSent(false), 5000);
    }, 1200);
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "var(--color-input-bg)",
    border: "1px solid var(--color-border)",
    borderRadius: 10,
    padding: "12px 14px",
    color: "var(--color-text)",
    fontFamily: "'Inter', sans-serif",
    fontSize: 14,
    outline: "none",
    transition: "border-color 0.2s",
  };

  const focusable = {
    onFocus: (e: React.FocusEvent<HTMLElement>) =>
      (e.currentTarget.style.borderColor = "var(--color-accent)"),
    onBlur: (e: React.FocusEvent<HTMLElement>) =>
      (e.currentTarget.style.borderColor = "var(--color-border)"),
  };

  return (
    <div style={{ padding: "28px 32px 32px" }}>
      <SectionLabel>06 · CONTACT</SectionLabel>
      <AppTitle>Let's build something.</AppTitle>
      <motion.p
        {...stagger(2)}
        style={{ color: "var(--color-text-muted)", fontSize: 14, lineHeight: 1.7, marginBottom: 24 }}
      >
        Open to remote roles, freelance work, and senior/lead positions. The fastest way to reach
        me is email — or drop a message right here.
      </motion.p>

      <motion.div {...stagger(3)} style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 26 }}>
        {links.map((l) => (
          <a
            key={l.label}
            href={l.href}
            target={l.href.startsWith("http") ? "_blank" : undefined}
            rel="noopener noreferrer"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              color: "var(--color-text-muted)",
              textDecoration: "none",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 13,
              padding: "8px 12px",
              borderRadius: 10,
              border: "1px solid var(--color-border)",
              background: "var(--color-surface)",
              transition: "border-color 0.2s, color 0.2s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "var(--color-accent)";
              (e.currentTarget as HTMLElement).style.color = "var(--color-accent)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "var(--color-border)";
              (e.currentTarget as HTMLElement).style.color = "var(--color-text-muted)";
            }}
          >
            <span style={{ color: "var(--color-accent)", display: "flex" }}>{l.icon}</span>
            {l.label}
          </a>
        ))}
      </motion.div>

      <motion.form {...stagger(4)} onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <input
          required
          placeholder="Your name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          style={inputStyle}
          {...focusable}
        />
        <input
          required
          type="email"
          placeholder="Your email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          style={inputStyle}
          {...focusable}
        />
        <textarea
          required
          placeholder="What are we building?"
          rows={4}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          style={{ ...inputStyle, resize: "vertical", minHeight: 90 }}
          {...focusable}
        />
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <button
            type="submit"
            disabled={loading || sent}
            style={{
              flex: 1,
              minWidth: 160,
              background: sent ? "var(--color-teal)" : "var(--color-accent)",
              color: sent ? "#0A0F1E" : "#fff",
              padding: "12px 20px",
              borderRadius: 10,
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 600,
              fontSize: 14,
              border: "none",
              cursor: loading || sent ? "default" : "pointer",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              transition: "background 0.25s",
            }}
          >
            {sent ? (
              <>
                <CheckCircle size={15} /> Message sent!
              </>
            ) : loading ? (
              "Sending…"
            ) : (
              <>
                Send message <Send size={15} />
              </>
            )}
          </button>
          <a
            href={cvFile}
            download="KC_Acuin_CV.pdf"
            style={{
              flex: 1,
              minWidth: 160,
              border: "1px solid var(--color-border)",
              color: "var(--color-text)",
              padding: "12px 20px",
              borderRadius: 10,
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 500,
              fontSize: 14,
              background: "transparent",
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              textDecoration: "none",
              transition: "border-color 0.2s",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.borderColor = "var(--color-accent)")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.borderColor = "var(--color-border)")
            }
          >
            <Download size={15} /> Download CV
          </a>
        </div>
      </motion.form>

      <motion.div
        {...stagger(5)}
        style={{
          marginTop: 24,
          paddingTop: 16,
          borderTop: "1px solid var(--color-border)",
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 11,
          color: "var(--color-text-subtle)",
          textAlign: "center",
        }}
      >
        © 2026 KC Acuin · Caloocan, Philippines · Built as a tiny operating system.
      </motion.div>
    </div>
  );
}
