import { renderToString } from 'react-dom/server'
import App from './App'
import { site } from './config/site'
import { services, notOffered } from './content/services'
import { faq } from './content/faq'
import { buildHead, buildBodyStart } from './seo/head'
import { homeMeta, privacyMeta } from './seo/meta'
import { routes, resolveRoute } from './routes'

/** Usado em build (scripts/prerender.mjs) e no dev (vite.config.js). Renderiza uma rota. */
export function render(path = '/') {
  const { meta } = resolveRoute(path)
  return {
    html: renderToString(<App path={path} />),
    head: buildHead(meta()),
    bodyStart: buildBodyStart(),
  }
}

// Dados expostos ao script de build para gerar páginas, sitemap, robots.txt e llms.txt.
export const paths = Object.keys(routes)
export const pageMeta = (path) => resolveRoute(path).meta()
export { site, services, faq, notOffered, homeMeta, privacyMeta, routes }
