import { useState } from "react";
import { motion } from "motion/react";
import { Mail, Linkedin, Phone, Download, Send, CheckCircle } from "lucide-react";

export function Contact() {
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

  const inputStyle = {
    width: "100%",
    background: "#131C35",
    border: "1px solid #1E2D50",
    borderRadius: 10,
    padding: "14px 16px",
    color: "#F0F4FF",
    fontFamily: "'Inter', sans-serif",
    fontSize: 15,
    outline: "none",
    transition: "border-color 0.2s",
  } as React.CSSProperties;

  const links = [
    {
      icon: <Mail size={18} />,
      label: "wkcacuin@gmail.com",
      href: "mailto:wkcacuin@gmail.com",
    },
    {
      icon: <Linkedin size={18} />,
      label: "linkedin.com/in/kcacuin",
      href: "https://linkedin.com/in/kcacuin",
    },
    {
      icon: <Phone size={18} />,
      label: "+63 956 512 7734",
      href: "tel:+639565127734",
    },
  ];

  return (
    <section
      id="contact"
      style={{ padding: "120px 0", background: "#0A0F1E", position: "relative", overflow: "hidden" }}
    >
      {/* Glow */}
      <div
        style={{
          position: "absolute",
          bottom: -200,
          left: "50%",
          transform: "translateX(-50%)",
          width: 800,
          height: 400,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(79,110,247,0.10) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: -100,
          right: -100,
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(100,255,218,0.05) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "0 32px",
          position: "relative",
          zIndex: 1,
        }}
      >
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
            justifyContent: "center",
          }}
        >
          05 · CONTACT
          <span
            style={{
              display: "block",
              width: 60,
              height: 1,
              background: "#4F6EF7",
              opacity: 0.4,
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
            fontSize: "clamp(36px, 6vw, 64px)",
            fontWeight: 700,
            letterSpacing: "-0.02em",
            color: "#F0F4FF",
            marginBottom: 16,
            textAlign: "center",
          }}
        >
          Let's build something.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          style={{
            color: "#8892B0",
            fontSize: 16,
            marginBottom: 64,
            textAlign: "center",
            maxWidth: 480,
            margin: "0 auto 64px",
          }}
        >
          Open to remote roles, freelance projects, and senior/lead opportunities. My inbox is always open.
        </motion.p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 48,
            alignItems: "start",
          }}
          className="grid-cols-1 md:grid-cols-2"
        >
          {/* Left — links + CV */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 20,
                fontWeight: 600,
                color: "#F0F4FF",
                marginBottom: 24,
              }}
            >
              Reach out directly
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 40 }}>
              {links.map((l, i) => (
                <motion.a
                  key={i}
                  href={l.href}
                  target={l.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  whileHover={{ x: 4 }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    background: "#131C35",
                    border: "1px solid #1E2D50",
                    color: "#F0F4FF",
                    textDecoration: "none",
                    padding: "16px 20px",
                    borderRadius: 12,
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: 14,
                    fontWeight: 500,
                    transition: "border-color 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "#4F6EF7";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "#1E2D50";
                  }}
                >
                  <span style={{ color: "#4F6EF7" }}>{l.icon}</span>
                  {l.label}
                </motion.a>
              ))}
            </div>

            <a
              href="KC_Acuin_CV_2026.docx"
              download
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                background: "#4F6EF7",
                color: "#fff",
                padding: "14px 28px",
                borderRadius: 10,
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 600,
                fontSize: 15,
                textDecoration: "none",
                transition: "background 0.2s, transform 0.15s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "#3A55D4";
                (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "#4F6EF7";
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              }}
            >
              <Download size={16} /> Download CV
            </a>
          </motion.div>

          {/* Right — contact form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25 }}
          >
            <div
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 20,
                fontWeight: 600,
                color: "#F0F4FF",
                marginBottom: 24,
              }}
            >
              Send a message
            </div>

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div>
                  <label
                    style={{
                      display: "block",
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 11,
                      color: "#8892B0",
                      letterSpacing: "0.08em",
                      marginBottom: 6,
                    }}
                  >
                    NAME
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="John Doe"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    style={inputStyle}
                    onFocus={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = "#4F6EF7";
                    }}
                    onBlur={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = "#1E2D50";
                    }}
                  />
                </div>
                <div>
                  <label
                    style={{
                      display: "block",
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 11,
                      color: "#8892B0",
                      letterSpacing: "0.08em",
                      marginBottom: 6,
                    }}
                  >
                    EMAIL
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    style={inputStyle}
                    onFocus={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = "#4F6EF7";
                    }}
                    onBlur={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = "#1E2D50";
                    }}
                  />
                </div>
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 11,
                    color: "#8892B0",
                    letterSpacing: "0.08em",
                    marginBottom: 6,
                  }}
                >
                  MESSAGE
                </label>
                <textarea
                  required
                  rows={5}
                  placeholder="Tell me about your project or opportunity..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  style={{
                    ...inputStyle,
                    resize: "vertical",
                    minHeight: 120,
                  }}
                  onFocus={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "#4F6EF7";
                  }}
                  onBlur={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "#1E2D50";
                  }}
                />
              </div>

              <motion.button
                type="submit"
                disabled={loading || sent}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  background: sent ? "#064e3b" : "#4F6EF7",
                  color: "#fff",
                  padding: "14px 28px",
                  borderRadius: 10,
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 600,
                  fontSize: 15,
                  border: "none",
                  cursor: loading || sent ? "default" : "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 10,
                  transition: "background 0.3s",
                  width: "100%",
                  opacity: loading ? 0.7 : 1,
                }}
              >
                {sent ? (
                  <>
                    <CheckCircle size={16} /> Message sent!
                  </>
                ) : loading ? (
                  "Sending..."
                ) : (
                  <>
                    <Send size={16} /> Send message
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
