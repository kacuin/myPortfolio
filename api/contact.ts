/**
 * Contact form delivery — Vercel Edge Function.
 *
 * Until this existed, ContactApp faked a send with a setTimeout and threw the
 * message away, so every lead the form collected was lost. The one job here is
 * that a submitted message reaches a real inbox, or that the caller finds out
 * it didn't — the client falls back to a prefilled mailto on any non-2xx.
 *
 * Mirrors api/chat.ts: same runtime, same origin check, same per-isolate rate
 * limit, same JSON error envelope.
 */

export const config = { runtime: "edge" };

const BREVO_URL = "https://api.brevo.com/v3/smtp/email";

const MAX_NAME = 100;
const MAX_EMAIL = 200;
const MAX_MESSAGE = 4000;
const MIN_MESSAGE = 10;
const MAX_BODY_BYTES = 16_000;

// Deliberately tighter than the chat limit: a human sends one message, not eight.
const RATE_LIMIT = 3; // submissions
const RATE_WINDOW_MS = 600_000; // per 10 minutes

// kcacuin.com is verified as a sending domain in Brevo, so the default sender
// and recipient both live there — override via CONTACT_FROM/CONTACT_TO if needed.
const DEFAULT_FROM = "Portfolio <hello@kcacuin.com>";
const DEFAULT_TO = "hello@kcacuin.com";

/** Best-effort per-isolate rate limiting (resets on cold start — fine for a portfolio). */
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear(); // memory guard
  return recent.length > RATE_LIMIT;
}

function json(status: number, body: object): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

/** Permissive on purpose: the delivery attempt is the real validator, and a
 *  regex that rejects a valid address costs a lead. */
function looksLikeEmail(v: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
}

/** Brevo wants sender as a {name, email} object; CONTACT_FROM/DEFAULT_FROM are
 *  written as "Name <email>" (matches how mail clients display a From header). */
function parseAddress(v: string): { name?: string; email: string } {
  const m = v.match(/^(.*)<(.+)>$/);
  return m ? { name: m[1].trim() || undefined, email: m[2].trim() } : { email: v.trim() };
}

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

type Body = { name?: unknown; email?: unknown; message?: unknown; company?: unknown };

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== "POST") return json(405, { error: "Method not allowed" });

  // Same-origin check: browsers send Origin on cross-site POSTs.
  const origin = req.headers.get("origin");
  const host = req.headers.get("host");
  if (origin) {
    const originHost = new URL(origin).host;
    const isLocal = originHost.startsWith("localhost") || originHost.startsWith("127.0.0.1");
    if (originHost !== host && !isLocal) return json(403, { error: "Forbidden" });
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (rateLimited(ip)) {
    return json(429, { error: "That's a few messages in a row. Try again in a few minutes." });
  }

  const raw = await req.text();
  if (raw.length > MAX_BODY_BYTES) return json(413, { error: "Message too long" });

  let body: Body;
  try {
    body = JSON.parse(raw) as Body;
  } catch {
    return json(400, { error: "Invalid JSON" });
  }

  // Honeypot: a field no human sees and no human fills. Answer 200 so the bot
  // records a success and doesn't retry, but send nothing.
  if (typeof body.company === "string" && body.company.trim() !== "") {
    return json(200, { ok: true });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (!name || name.length > MAX_NAME) return json(400, { error: "Please enter your name." });
  if (!email || email.length > MAX_EMAIL || !looksLikeEmail(email)) {
    return json(400, { error: "Please enter a valid email address." });
  }
  if (message.length < MIN_MESSAGE) {
    return json(400, { error: "Please add a little more detail to your message." });
  }
  if (message.length > MAX_MESSAGE) return json(400, { error: "Message too long" });

  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) return json(503, { error: "The form isn't connected yet." });

  const to = process.env.CONTACT_TO || DEFAULT_TO;
  const from = process.env.CONTACT_FROM || DEFAULT_FROM;

  let upstream: Response;
  try {
    upstream = await fetch(BREVO_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "api-key": apiKey,
      },
      body: JSON.stringify({
        sender: parseAddress(from),
        to: [parseAddress(to)],
        // So hitting Reply in the inbox answers the visitor, not the sender domain.
        replyTo: { email, name },
        subject: `Portfolio enquiry from ${name}`,
        textContent: `${name} <${email}>\n\n${message}`,
        htmlContent:
          `<p><strong>${esc(name)}</strong> &lt;${esc(email)}&gt;</p>` +
          `<p style="white-space:pre-wrap">${esc(message)}</p>`,
      }),
    });
  } catch {
    return json(502, { error: "Couldn't reach the mail service." });
  }

  if (!upstream.ok) {
    console.error("Brevo send failed", upstream.status, await upstream.text().catch(() => ""));
    return json(502, { error: "Couldn't send that message." });
  }

  return json(200, { ok: true });
}
