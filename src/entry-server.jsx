import { renderToString } from 'react-dom/server'
import App from './App'
import { site } from './config/site'
import { services, notOffered } from './content/services'
import { faq } from './content/faq'
import { buildHead, buildBodyStart } from './seo/head'
import { homeMeta } from './seo/meta'

/** Usado em build (scripts/prerender.mjs) e no dev (vite.config.js). */
export function render() {
  const page = homeMeta()
  return {
    html: renderToString(<App />),
    head: buildHead(page),
    bodyStart: buildBodyStart(),
  }
}

// Dados expostos ao script de build para gerar sitemap.xml, robots.txt e llms.txt.
export { site, services, faq, notOffered, homeMeta }
