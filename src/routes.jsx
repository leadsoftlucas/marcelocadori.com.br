import HomePage from './pages/HomePage'
import PrivacyPage from './pages/PrivacyPage'
import { homeMeta, privacyMeta } from './seo/meta'

/**
 * Páginas do site. Cada rota vira um HTML próprio no build (scripts/prerender.mjs) e entra no sitemap.
 * Para criar uma página: componente em src/pages/, função de meta em src/seo/meta.js e uma linha aqui.
 */
export const routes = {
  '/': { Page: HomePage, meta: homeMeta },
  '/politica-de-privacidade/': { Page: PrivacyPage, meta: privacyMeta },
}

export const normalizePath = (path = '/') => {
  let p = path.split(/[?#]/)[0].replace(/index\.html$/, '')
  if (!p.startsWith('/')) p = `/${p}`
  if (!p.endsWith('/')) p = `${p}/`
  return p
}

export const resolveRoute = (path) => routes[normalizePath(path)] || routes['/']
