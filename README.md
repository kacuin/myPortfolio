# kcacuin.vercel.app

My portfolio, built as a macOS-style desktop that runs in the browser. Each section of a
conventional portfolio — about, experience, projects, contact — is a window you open from the dock.

**Live:** [kcacuin.vercel.app](https://kcacuin.vercel.app)

React 18 · TypeScript · Vite 6 · [motion](https://motion.dev) · Vercel edge function.
Five runtime dependencies total.

---

## Why a desktop

A portfolio has one job: hold attention long enough to be read. A scrolling page asks nothing of the
visitor and usually gets nothing back.

The desktop metaphor is a bet that a familiar interface in an unfamiliar place makes people curious
enough to open a second window. It also solves a real problem — a recruiter who wants the CV and an
engineer who wants the architecture want different things first, and a desktop lets both choose
without either being buried under the other.

The tradeoffs are real, and they're listed at the bottom rather than left for you to find.

## Architecture

```
src/
├── os/          window manager, dock, menu bar, spotlight, boot sequence
├── app/         the apps themselves — About, Experience, Projects, Contact, KAI…
├── content/     profile.ts — single source of truth for shared copy
└── styles/      tokens, light/dark themes
api/             chat.ts — edge function backing the KAI assistant
vite-plugins/    seoContent.ts — build-time HTML injection
```

**Window manager.** `os/WindowManagerContext.tsx` owns open windows, z-order, focus, minimise and
per-app geometry. Apps are registered declaratively in `os/apps.ts` — id, icon, default size,
component — so adding one is a single entry rather than a wiring exercise.

**Content lives in one place.** `src/content/profile.ts` is read by both the React UI and the
build-time SEO injector. Two readers, one object, so the indexable text can't drift from what a
visitor actually sees. That file's comments mark which claims are load-bearing and where duplicated
copy still lives.

### The SEO problem, and the honest fix

A client-rendered app with no routes ships `<div id="root"></div>` and nothing else. Crawlers and
link-preview bots see an empty page.

`vite-plugins/seoContent.ts` injects the real copy — the same strings the UI renders, from
`profile.ts` — as actual HTML in `<body>` at build time, along with the head metadata and JSON-LD
the page never had. React removes the block when it mounts.

This is deliberately **not cloaking**: identical bytes go to every client, the injected block is a
genuine no-JS fallback a human can read, and every claim in it is one the visible app also makes.
That distinction matters, so it's argued at the top of the file rather than left implicit.

### KAI

An in-portfolio assistant that answers questions about my work, backed by a Vercel edge function
(`api/chat.ts`) so no API key reaches the client. Client engagements are under NDA, so the system
prompt forbids naming any client, product or identifying detail — including when a visitor asserts
one, claims to already know it, or says they work there. Rate limited per isolate.

## Details worth the effort

- **Reduced motion is honoured properly** — including skipping the boot sequence outright rather
  than playing it at zero duration. `prefers-reduced-motion` means *don't*, not *do it faster*.
- **Both themes are first-class.** The toggle stamps `data-theme` on the root and wins over the
  system preference in both directions.
- **Spotlight** (`⌘K` / `Ctrl+K`) opens any app without touching the dock; dock icons carry
  accessible names.
- **409 kB JS, 130 kB gzipped**, with no UI framework and no icon font.

## Running it

```sh
npm install
npm run dev        # vite dev server
npm run typecheck  # tsc --noEmit
npm run build      # production build to dist/
```

KAI needs `OPENROUTER_API_KEY` in the environment, and optionally `OPENROUTER_MODEL`. Everything
else runs with no configuration.

## Known tradeoffs

- **Mobile gets a different experience.** Overlapping draggable windows don't work on a phone, so
  `useIsMobile` switches to a stacked layout. The desktop conceit is a desktop conceit.
- **First paint carries the boot sequence.** Skippable, and reduced-motion users never see it, but
  it's still a deliberate delay in front of the content — a real cost for a portfolio.
- **A wallpaper image dominates the bundle** at 1.25 MB, several times the JavaScript. The single
  most worthwhile thing left to fix.

## Credit and reuse

Initial visual direction came from a Figma community design. The desktop shell, window manager, SEO
injection, KAI integration and everything under `src/os/` are mine.

No licence is currently declared, so default copyright applies — if you want to reuse a piece of it,
ask me and the answer is likely yes. The content is a biography, so please take the code and leave
the life.
