import { defineConfig, loadEnv, type Plugin, type ViteDevServer } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { seoContent } from './vite-plugins/seoContent'

// Dev-only bridge: serves /api/chat (the Vercel edge function) inside `npm run dev`
// so KAI works locally without `vercel dev`. Production routing is Vercel's.
function devApiBridge(): Plugin {
  return {
    name: 'dev-api-bridge',
    apply: 'serve',
    configureServer(server: ViteDevServer) {
      const env = loadEnv(server.config.mode, process.cwd(), '')
      if (env.OPENROUTER_API_KEY) process.env.OPENROUTER_API_KEY = env.OPENROUTER_API_KEY
      if (env.OPENROUTER_MODEL) process.env.OPENROUTER_MODEL = env.OPENROUTER_MODEL

      server.middlewares.use('/api/chat', (req, res) => {
        void (async () => {
          try {
            const mod = await server.ssrLoadModule('/api/chat.ts')
            const chunks: Buffer[] = []
            for await (const chunk of req) chunks.push(chunk as Buffer)
            const request = new Request(`http://${req.headers.host}/api/chat`, {
              method: req.method,
              headers: Object.fromEntries(
                Object.entries(req.headers).filter(([, v]) => typeof v === 'string')
              ) as Record<string, string>,
              body: chunks.length ? Buffer.concat(chunks) : undefined,
            })
            const response: Response = await mod.default(request)
            res.statusCode = response.status
            response.headers.forEach((v, k) => res.setHeader(k, v))
            if (response.body) {
              const reader = response.body.getReader()
              for (;;) {
                const { done, value } = await reader.read()
                if (done) break
                res.write(value)
              }
            }
            res.end()
          } catch (e) {
            res.statusCode = 500
            res.end(JSON.stringify({ error: String(e) }))
          }
        })()
      })
    },
  }
}

function figmaAssetResolver(): Plugin {
  return {
    name: 'figma-asset-resolver',
    resolveId(id) {
      if (id.startsWith('figma:asset/')) {
        const filename = id.replace('figma:asset/', '')
        return path.resolve(__dirname, 'src/assets', filename)
      }
    },
  }
}

export default defineConfig({
  plugins: [
    devApiBridge(),
    figmaAssetResolver(),
    seoContent(),
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': path.resolve(__dirname, './src'),
    },
  },

  // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
  assetsInclude: ['**/*.svg', '**/*.csv', '**/*.pdf'],
})
