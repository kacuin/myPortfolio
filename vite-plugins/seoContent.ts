import type { Plugin } from 'vite'
import { PROFILE, SITE_URL } from '../src/content/profile'

/**
 * The app is a client-rendered macOS desktop shell with no routes, so the built
 * index.html would otherwise ship as an empty <div id="root">. Crawlers and
 * link-preview bots would see nothing.
 *
 * This injects the same copy the UI renders (from src/content/profile.ts) as
 * real HTML in <body>, plus the head metadata the page never had. React removes
 * the block once it mounts — see src/main.tsx.
 *
 * Not cloaking: identical bytes go to every client, the block is genuinely the
 * no-JS fallback a human would see, and every claim in it is one the visible
 * app also makes.
 */

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

function headTags(): string {
  const { name, title, metaDescription, contact, jobTitle, skills, location } = PROFILE
  const fullTitle = `${name} — ${title}`
  const ogImage = `${SITE_URL}/og-image.png`

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name,
    jobTitle,
    description: metaDescription,
    url: SITE_URL,
    image: ogImage,
    email: `mailto:${contact.email}`,
    address: { '@type': 'PostalAddress', addressLocality: location },
    worksFor: { '@type': 'Organization', name: PROFILE.company },
    knowsAbout: [...skills],
    sameAs: [contact.github, contact.linkedin],
  }

  return `
    <link rel="canonical" href="${SITE_URL}/" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${SITE_URL}/" />
    <meta property="og:title" content="${esc(fullTitle)}" />
    <meta property="og:description" content="${esc(metaDescription)}" />
    <meta property="og:image" content="${ogImage}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${esc(fullTitle)}" />
    <meta name="twitter:description" content="${esc(metaDescription)}" />
    <meta name="twitter:image" content="${ogImage}" />
    <script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`
}

function bodyContent(): string {
  const { name, title, summary, metrics, projects, contact, skills, openTo } = PROFILE

  return `
    <main id="seo-content">
      <h1>${esc(name)} — ${esc(title)}</h1>
      <p>${esc(summary)}</p>

      <h2>Highlights</h2>
      <ul>${metrics.map((m) => `<li>${esc(m)}</li>`).join('')}</ul>

      <h2>Selected Work</h2>
      ${projects
        .map(
          (p) => `<article>
        <h3>${esc(p.name)}</h3>
        <p><em>${esc(p.role)}</em></p>
        <p>${esc(p.blurb)}</p>
      </article>`
        )
        .join('')}

      <h2>Skills</h2>
      <ul>${skills.map((s) => `<li>${esc(s)}</li>`).join('')}</ul>

      <h2>Contact</h2>
      <p>${esc(openTo)}.</p>
      <ul>
        <li><a href="mailto:${contact.email}">${esc(contact.email)}</a></li>
        <li><a href="${contact.github}" rel="me">GitHub</a></li>
        <li><a href="${contact.linkedin}" rel="me">LinkedIn</a></li>
      </ul>
    </main>`
}

/** Readable if JS never runs; hidden the instant the desktop shell mounts. */
const FALLBACK_STYLE = `
    <style>
      #seo-content {
        position: absolute; top: 0; left: 0; right: 0;
        min-height: 100%; z-index: 0;
        /* Full-bleed background, content still capped at a readable measure. */
        padding: 48px max(24px, calc((100% - 720px) / 2));
        font-family: system-ui, -apple-system, sans-serif;
        line-height: 1.6; color: #1a1a1a; background: #fff;
      }
      #seo-content a { color: #3d5bf5; }
      @media (prefers-color-scheme: dark) {
        #seo-content { color: #e8e8ea; background: #0b0b10; }
        #seo-content a { color: #7f9bff; }
      }
    </style>`

export function seoContent(): Plugin {
  return {
    name: 'seo-content',
    transformIndexHtml: {
      order: 'post',
      handler(html) {
        return html
          .replace('</head>', `${headTags()}${FALLBACK_STYLE}\n    </head>`)
          .replace('<div id="root"></div>', `<div id="root"></div>${bodyContent()}`)
      },
    },
  }
}
