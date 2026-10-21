import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Em `npm run dev` o HTML ainda não foi pré-renderizado: injeta o <head> (SEO) e o corpo vazio
// para que o desenvolvimento se comporte como o build final.
function devHtml() {
  let server
  return {
    name: 'dev-html',
    apply: 'serve',
    configureServer(s) {
      server = s
    },
    async transformIndexHtml(html, ctx) {
      const { render } = await server.ssrLoadModule('/src/entry-server.jsx')
      const r = render((ctx && (ctx.originalUrl || ctx.path)) || '/')
      return html
        .replace('<!--app-head-->', r.head)
        .replace('<!--app-body-start-->', r.bodyStart)
        .replace('<!--app-html-->', '')
    },
  }
}

export default defineConfig({
  base: '/',
  plugins: [react(), devHtml()],
  build: { target: 'es2020', cssCodeSplit: false },
})
