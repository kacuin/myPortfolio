# Learnings — myPortfolio

## [2026-07-10] macOS dock/window metaphor in motion (Framer Motion)

**Context:** Rebuilt the portfolio as a macOS desktop SPA (dock magnification, draggable windows, minimize-to-dock).

**Learnings:**
- **Dock magnification** is three motion primitives: dock-level `useMotionValue(Infinity)` fed by `onMouseMove(e.pageX)`, per-icon `useTransform(distance, [-150,0,150], [48,84,48])`, wrapped in `useSpring({mass:0.1, stiffness:170, damping:12})`. Reset to `Infinity` on mouse leave or icons stick enlarged.
- **Icon scaling:** lucide-react accepts `size="100%"` — wrap the icon in a `52%`-sized box inside the tile so the glyph scales with the magnified tile instead of staying fixed-px.
- **Layer drag and programmatic animation separately.** A window needs an OUTER motion.div owned by `useAnimationControls` (open/minimize/restore) and an INNER motion.div owning `drag` — combining them on one element makes the minimize animation fight the drag x/y motion values.
- **Minimize-to-dock targeting:** keep a ref map (`iconRefs` on the window-manager context, refs not state) that DockIcons register into; on minimize, diff `getBoundingClientRect()` centers and animate the delta. Keep minimized windows mounted (pointer-events: none) so restore can reverse the animation and drag position survives.
- **Terminal-style components must not use theme CSS variables** for text: over a fixed dark pane, light-theme values of `--color-text-muted` become dark-on-dark. Hard-code the dark palette inside the pane.
- **Playwright without downloads:** `playwright-core` + `chromium.launch({ channel: 'chrome' })` drives installed Google Chrome — no 130MB browser download for a screenshot verification loop.

## [2026-07-11] Dock/typewriter layout-isolation patterns

- **Fixed-height dock bar with magnifying icons:** the in-flow element per icon must be a *slot* that animates only `width` (fixed `height: 48`); the visible tile is `position:absolute; bottom:0` inside it with `height` driven by the same spring MotionValue. Growth escapes upward out of the bar, so the bar never stretches. Tooltip/bounce/running-dot anchor to the slot or the bottom-anchored wrapper.
- **Zero-reflow typewriter:** render an invisible sizer (`visibility:hidden`, longest phrase) in flow and the live typed text `position:absolute; inset:0` on top. Peers never shift during type/delete. Compute the longest phrase from the array (`reduce` by length), don't hard-code it.
- **Playwright verification of "no layout shift":** sample `getBoundingClientRect().y` of peer elements across the animation cycle into a `Set` of fixed-precision strings — set size 1 ⇒ stable. Same trick for the dock: compare bar height before/during a mouse hover sweep.
- **Playwright launches with light color-scheme by default** — a theme-context site renders light even if its CSS default is dark. Seed with `context.addInitScript(() => localStorage.setItem('theme','dark'))` + `colorScheme:'dark'` to verify the dark theme.

## [2026-07-11] Phase 3: AI proxy, Spotlight, OS interactions

- **Static SPA + secret API key = Vercel Edge Function proxy.** `api/chat.ts` at repo root with `export const config = { runtime: "edge" }` auto-routes on Vercel next to a Vite `dist`. Guardrails that matter: strip client `system` messages and inject the system prompt server-side (kills prompt-injection spend abuse), cap messages/chars, Origin-header same-host check, best-effort per-isolate rate-limit Map.
- **Edge handlers are unit-testable without Vercel:** transpile the TS with the project's own esbuild (`transformSync(src, {loader:'ts'})`), import the emitted module in Node ≥18 (global Request/Response), and assert on handler(Request) statuses. All 6 hardening paths verified this way in seconds.
- **Zoom + framer drag:** window drag offset must live in explicit `useMotionValue`s passed to the draggable's style — programmatic zoom then animates them back to 0; otherwise the stale drag transform offsets the zoomed rect.
- **Rounded windows clip resize handles:** `overflow:hidden` + border-radius clips hit-testing at the extreme corner pixels; grab points must be ≥ radius/2 inset (test at −6px, not −3px).
- **Qwen 3.x on OpenRouter are hybrid reasoning models** — a bare "say hello" burned 4,213 reasoning tokens (~$0.005, ~30s) and the SSE stream looked empty because every delta was reasoning, not content. Fix: `reasoning: { enabled: false }` in the request body (~350× cheaper, instant). Also: `qwen/qwen-turbo` no longer exists as a model id — current cheap chat tier is `qwen/qwen3.6-flash`; list live ids via GET /api/v1/models.
- **Vite dev can serve Vercel edge functions:** a `configureServer` plugin that `ssrLoadModule("/api/chat.ts")`s the handler and bridges Node req/res ↔ web Request/Response makes `/api/*` work under plain `npm run dev` — no `vercel dev`, no login. Load non-VITE_ env vars with `loadEnv(mode, cwd, "")` and copy them onto `process.env`.
- **WebAudio UI sounds need no assets** — short oscillator blips with exponential gain decay (sine pop for open, triangle down-sweep for minimize) read as "macOS-ish"; lazily create AudioContext on first gesture and guard everything in try/catch.

## [2026-07-11] Phase 4: CI/CD ship convention

- **Ship flow for this repo:** feature done → ask KC "commit & push to main?" → on yes, conventional commit(s) direct to main → `git push origin main`. GitHub Actions (`.github/workflows/ci.yml`) runs `npm ci && npm run build` as the gate; **deployment is Vercel Git integration** (push to main auto-deploys production) — deliberately NOT in the Actions workflow, so no Vercel tokens live in GitHub.
- Never push without asking; never commit `.env` (`OPENROUTER_API_KEY` lives only in local `.env` + Vercel env vars). `vault/dispatch-log.md` is gitignored noise; this file is committed.

## [2026-07-13] Phase 5: free-only KAI + Projects parallax previews

- **KAI is free-only now:** `api/chat.ts` defaults to `qwen/qwen3-next-80b-a3b-instruct:free` and the `OPENROUTER_MODEL` override is honored only if it ends in `":free"`. OpenRouter `models: [...]` array gives automatic fallback routing — free models 429 individually ("temporarily rate-limited upstream", provider Venice) even when the account's daily quota is untouched, so a fallback chain (`qwen3-coder:free`, `llama-3.3-70b-instruct:free`) + mapping upstream 429 → friendly 429 matters more than the model choice. Verified the guard with the esbuild-transpile + mocked-fetch unit trick (capture the request body, assert `model`/`models`).
- **Projects previews:** screenshots auto-discovered via `import.meta.glob("../../../assets/projects/*/*.{png,jpg,jpeg,webp}", { eager: true, import: "default" })` keyed by folder slug — adding files needs zero code changes.
- **3D tilt card + overflow:** `overflow: hidden` forces `transform-style` to flat, killing children's `translateZ`. Keep the tilting card overflow-visible with `preserve-3d`, and clip the screenshot inside an inner absolute wrapper (`inset: 0`, borderRadius, overflow hidden) instead.
- **Theme-proof scrim over screenshots:** `linear-gradient(to bottom, color-mix(in srgb, var(--color-surface) 35%, transparent), var(--color-surface) 82%)` keeps card text readable over any screenshot in both themes.
- **Playwright can open OS windows via the app's own CustomEvent** (`window.dispatchEvent(new CustomEvent("kc:spotlight"))` + type + Enter) — no dock selectors needed. Playwright also doubles as a placeholder-screenshot generator (`page.setContent` + `page.screenshot` at 390×844).
