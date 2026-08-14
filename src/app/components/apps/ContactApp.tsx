import { useState } from "react";
import { motion } from "motion/react";
import { Mail, Linkedin, Phone, Github, Download, Send, CheckCircle, AlertCircle } from "lucide-react";
import { AppShell, stagger } from "./shared";
import { celebrate } from "../../../os/confetti";
import { playSound } from "../../../os/sounds";
import cvFile from "../../../assets/KC_Acuin_CV.pdf";

const EMAIL = "hello@kcacuin.com";

const links = [
  { icon: <Mail size={16} />, label: EMAIL, href: `mailto:${EMAIL}` },
  { icon: <Github size={16} />, label: "github.com/kcacuin", href: "https://github.com/kcacuin" },
  { icon: <Linkedin size={16} />, label: "linkedin.com/in/kcacuin", href: "https://linkedin.com/in/kcacuin" },
  { icon: <Phone size={16} />, label: "+63 956 512 7734", href: "tel:+639565127734" },
];

export function ContactApp() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  // Honeypot. Hidden from humans and from assistive tech; bots fill it in.
  const [company, setCompany] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /** Escape hatch for when delivery fails: hands the visitor their own message
   *  back in their mail client rather than losing it. */
  const mailtoFallback =
    `mailto:${EMAIL}` +
    `?subject=${encodeURIComponent(`Portfolio enquiry from ${form.name || "a visitor"}`)}` +
    `&body=${encodeURIComponent(form.message)}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, company }),
      });
      const data: { error?: string } = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Something went wrong.");

      setSent(true);
      setForm({ name: "", email: "", message: "" });
      playSound("send");
      celebrate();
      setTimeout(() => setSent(false), 5000);
    } catch (err) {
      // Deliberately not a success state: the previous version celebrated here
      // and dropped the message on the floor.
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "var(--color-input-bg)",
    border: "1px solid var(--color-border)",
    borderRadius: 10,
    padding: "12px 14px",
    color: "var(--color-text)",
    fontFamily: "var(--font-sans)",
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
    <AppShell
      title="Let's build something."
      lede="Open to remote roles, freelance work, and senior/lead positions. The fastest way to reach me is email, or drop a message right here."
    >

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
              fontFamily: "var(--font-mono)",
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

        {/* Honeypot: off-screen rather than display:none, since some bots skip
            hidden fields. aria-hidden + tabIndex keep it away from real users. */}
        <input
          type="text"
          name="company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
        />

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <button
            type="submit"
            disabled={loading || sent}
            style={{
              flex: 1,
              minWidth: 140,
              background: sent ? "var(--color-teal)" : "var(--color-accent)",
              color: sent ? "#0A0F1E" : "#fff",
              padding: "12px 20px",
              borderRadius: 10,
              fontFamily: "var(--font-ui)",
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
              minWidth: 140,
              border: "1px solid var(--color-border)",
              color: "var(--color-text)",
              padding: "12px 20px",
              borderRadius: 10,
              fontFamily: "var(--font-ui)",
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

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            role="alert"
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 10,
              padding: "12px 14px",
              borderRadius: 10,
              border: "1px solid rgba(228, 87, 61, 0.35)",
              background: "rgba(228, 87, 61, 0.10)",
              fontSize: 13,
              lineHeight: 1.6,
              color: "var(--color-text)",
            }}
          >
            <AlertCircle size={15} style={{ flexShrink: 0, marginTop: 2, color: "#E4573D" }} />
            <span>
              {error} You can{" "}
              <a href={mailtoFallback} style={{ color: "var(--color-accent)" }}>
                email me directly
              </a>{" "}
              instead. Your message is already in the link.
            </span>
          </motion.div>
        )}
      </motion.form>

      <motion.div
        {...stagger(5)}
        style={{
          marginTop: 24,
          paddingTop: 16,
          borderTop: "1px solid var(--color-border)",
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          color: "var(--color-text-subtle)",
          textAlign: "center",
        }}
      >
        © 2026 KC Acuin · Caloocan, Philippines · Built as a tiny operating system.
      </motion.div>
    </AppShell>
  );
}
