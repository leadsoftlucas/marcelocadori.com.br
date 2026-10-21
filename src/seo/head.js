import { site } from '../config/site'
import { buildJsonLd } from './jsonld'

const esc = (s = '') =>
  String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

const meta = (attrs) => `<meta ${Object.entries(attrs).map(([k, v]) => `${k}="${esc(v)}"`).join(' ')} />`

/**
 * Analytics NÃO entra no HTML: o GTM/GA só carrega no navegador depois que o visitante aceita os
 * cookies (src/scripts/consent.js), em conformidade com a LGPD. Por isso não há snippet no <head>
 * nem <noscript> do GTM (o noscript carregaria o Google sem consentimento).
 */
export const buildBodyStart = () => ''

/** Todas as tags do <head> (SEO, social, ícones, preload, JSON-LD, analytics). */
export function buildHead(page) {
  const url = `${site.url}${page.path}`
  const jsonLd = page.jsonld === false ? '' : JSON.stringify(buildJsonLd(page)).replace(/</g, '\\u003c')
  const hasGeo = site.address.lat && site.address.lng
  const tags = [
    `<title>${esc(page.title)}</title>`,
    meta({ name: 'description', content: page.description }),
    page.keywords?.length > 0 && meta({ name: 'keywords', content: page.keywords.join(', ') }),
    meta({ name: 'author', content: site.name }),
    meta({ name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' }),
    meta({ name: 'googlebot', content: 'index, follow' }),
    meta({ name: 'theme-color', content: site.themeColor }),
    meta({ name: 'format-detection', content: 'telephone=no' }),
    `<link rel="canonical" href="${esc(url)}" />`,
    `<link rel="alternate" hreflang="${site.lang}" href="${esc(url)}" />`,
    `<link rel="alternate" hreflang="x-default" href="${esc(url)}" />`,
    // Open Graph
    meta({ property: 'og:type', content: 'website' }),
    meta({ property: 'og:locale', content: site.locale }),
    meta({ property: 'og:site_name', content: site.name }),
    meta({ property: 'og:title', content: page.title }),
    meta({ property: 'og:description', content: page.description }),
    meta({ property: 'og:url', content: url }),
    meta({ property: 'og:image', content: page.image.url }),
    meta({ property: 'og:image:secure_url', content: page.image.url }),
    meta({ property: 'og:image:type', content: 'image/jpeg' }),
    meta({ property: 'og:image:width', content: page.image.width }),
    meta({ property: 'og:image:height', content: page.image.height }),
    meta({ property: 'og:image:alt', content: page.image.alt }),
    // Twitter / X
    meta({ name: 'twitter:card', content: 'summary_large_image' }),
    meta({ name: 'twitter:title', content: page.title }),
    meta({ name: 'twitter:description', content: page.description }),
    meta({ name: 'twitter:image', content: page.image.url }),
    meta({ name: 'twitter:image:alt', content: page.image.alt }),
    // SEO local
    site.hasAddress && meta({ name: 'geo.region', content: `BR${site.address.state ? `-${site.address.state}` : ''}` }),
    site.hasAddress && meta({ name: 'geo.placename', content: site.address.city }),
    hasGeo && meta({ name: 'geo.position', content: `${site.address.lat};${site.address.lng}` }),
    hasGeo && meta({ name: 'ICBM', content: `${site.address.lat}, ${site.address.lng}` }),
    // Verificações (Search Console / Bing)
    site.verification.google && meta({ name: 'google-site-verification', content: site.verification.google }),
    site.verification.bing && meta({ name: 'msvalidate.01', content: site.verification.bing }),
    // Ícones e PWA
    '<link rel="icon" href="/favicon.ico" sizes="48x48" />',
    '<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png" />',
    '<link rel="icon" type="image/png" sizes="192x192" href="/favicon-192.png" />',
    '<link rel="apple-touch-icon" href="/apple-touch-icon.png" />',
    '<link rel="manifest" href="/manifest.webmanifest" />',
    // Descoberta por LLMs
    '<link rel="alternate" type="text/markdown" title="Resumo para LLMs" href="/llms.txt" />',
    // Performance: imagem do hero (LCP) e conexão antecipada com o GTM
    page.preloadHero && '<link rel="preload" as="image" type="image/webp" href="/images/hero-1920.webp" imagesrcset="/images/hero-960.webp 960w, /images/hero-1920.webp 1920w" imagesizes="100vw" fetchpriority="high" />',
    jsonLd && `<script type="application/ld+json">${jsonLd}</script>`,
  ]
  return tags.filter(Boolean).join('\n    ')
}
