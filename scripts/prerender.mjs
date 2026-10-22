// Pós-build: pré-renderiza o React em HTML estático (SSG) e gera os arquivos de SEO/GEO.
//   dist/index.html (+ dist/<rota>/index.html) → HTML completo (conteúdo + <head> com meta tags, Open Graph, JSON-LD)
//   dist/404.html     → página de erro (GitHub Pages)
//   dist/sitemap.xml  → mapa do site (com imagens)
//   dist/robots.txt   → regras de rastreamento (inclui crawlers de IA liberados)
//   dist/llms.txt     → resumo em Markdown do negócio para LLMs (padrão llmstxt.org)
import { readFile, writeFile } from 'node:fs/promises'
import { pathToFileURL } from 'node:url'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const dist = (f) => resolve(root, 'dist', f)

const { render, paths, site, services, faq, notOffered, homeMeta } = await import(
  pathToFileURL(resolve(root, 'dist-server/entry-server.js')).href
)

// CSS crítico inline: elimina a requisição que bloqueia a renderização (o arquivo continua em dist/assets).
const cssCache = new Map()
async function inlineStyles(html) {
  const links = [...html.matchAll(/<link rel="stylesheet"[^>]*href="(\/assets\/[^"]+\.css)"[^>]*>/g)]
  for (const [tag, href] of links) {
    if (!cssCache.has(href)) cssCache.set(href, await readFile(resolve(root, 'dist', href.slice(1)), 'utf8'))
    html = html.replace(tag, () => `<style>${cssCache.get(href)}</style>`)
  }
  return html
}

// 1) HTML pré-renderizado (uma página por rota) ------------------------------------------------
import { mkdir } from 'node:fs/promises'
const template = await readFile(dist('index.html'), 'utf8') // lido uma vez, antes de sobrescrever
for (const path of paths) {
  const { html, head, bodyStart } = render(path)
  const page = (await inlineStyles(template))
    .replace('<!--app-head-->', head)
    .replace('<!--app-body-start-->', bodyStart)
    .replace('<!--app-html-->', html)
  if (page.includes('<!--app-')) throw new Error(`Placeholder não substituído em ${path}`)
  const file = path === '/' ? 'index.html' : `${path.slice(1)}index.html`
  await mkdir(dirname(dist(file)), { recursive: true })
  await writeFile(dist(file), page)
}

// 2) 404 --------------------------------------------------------------------------------------
await writeFile(
  dist('404.html'),
  `<!doctype html>
<html lang="pt-BR"><head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Página não encontrada | ${site.name}</title><meta name="robots" content="noindex" />
<link rel="icon" href="/favicon.ico" /><meta name="theme-color" content="${site.themeColor}" />
<style>body{margin:0;min-height:100vh;display:grid;place-items:center;background:${site.themeColor};color:#fff;font-family:system-ui,sans-serif;text-align:center;padding:2rem}a{color:#fff;font-weight:700}</style></head>
<body><main><h1>Página não encontrada</h1><p>O endereço que você acessou não existe.</p><p><a href="/">Voltar para ${site.name}</a></p></main></body></html>
`,
)

// 3) sitemap.xml ------------------------------------------------------------------------------
const meta = homeMeta()
const today = new Date().toISOString().slice(0, 10)
const images = [meta.image.url, `${site.url}/images/hero-1920.webp`]
const urlEntry = (path) => {
  const home = path === '/'
  return `  <url>
    <loc>${site.url}${path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${home ? 'monthly' : 'yearly'}</changefreq>
    <priority>${home ? '1.0' : '0.3'}</priority>${home ? '\n' + images.map((i) => `    <image:image><image:loc>${i}</image:loc></image:image>`).join('\n') : ''}
  </url>`
}
await writeFile(
  dist('sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${paths.map(urlEntry).join('\n')}
</urlset>
`,
)

// 4) robots.txt -------------------------------------------------------------------------------
const aiBots = [
  'GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-SearchBot', 'Claude-User',
  'PerplexityBot', 'Perplexity-User', 'Google-Extended', 'Applebot-Extended', 'Bingbot', 'DuckDuckBot', 'Googlebot',
]
await writeFile(
  dist('robots.txt'),
  `# ${site.name} — todos os rastreadores são bem-vindos (buscadores e IAs).
User-agent: *
Allow: /

${aiBots.map((b) => `User-agent: ${b}\nAllow: /`).join('\n\n')}

Sitemap: ${site.url}/sitemap.xml
`,
)

// 5) llms.txt ---------------------------------------------------------------------------------
const contact = [
  site.whatsapp.enabled && `- [WhatsApp](https://wa.me/${site.whatsapp.number}): ${site.whatsapp.display}, canal principal para agendar`,
  site.hasAddress && `- Endereço: ${site.addressLine}`,
  site.hours.text && `- Horário: ${site.hours.text}`,
  site.email && `- E-mail: ${site.email}`,
  site.legalName && `- Razão social: ${site.legalName}${site.cnpj ? ` (CNPJ ${site.cnpj})` : ''}`,
  site.foundingYear && `- Em atividade desde ${site.foundingYear}`,
  site.social.instagram && `- [Instagram](${site.social.instagram})`,
  site.social.facebook && `- [Facebook](${site.social.facebook})`,
  site.address.mapsUrl && `- [Google Maps](${site.address.mapsUrl}): localização da oficina`,
].filter(Boolean)

await writeFile(
  dist('llms.txt'),
  `# ${site.name}

> ${meta.description}

${site.name} é mecânico e atende em oficina própria${site.place ? ` em ${site.place}` : ''}, com mecânica geral, lataria e pintura. O foco é manutenção preventiva conforme o manual do fabricante, principalmente em carros de 2020 em diante, nacionais e importados. Valores: honestidade, tradição, inovação e alegria no trabalho. Diferenciais: prazo combinado, transparência detalhada e explicação do porquê de cada serviço.

## Como agendar
${contact.length ? contact.join('\n') : '- Pelo WhatsApp, pelo site.'}
- [Site oficial](${site.url}/)
- [Política de privacidade](${site.url}/politica-de-privacidade/)

## Serviços
${services.map((s) => `### ${s.title}\n${s.summary}\n${s.items.map((i) => `- ${i}`).join('\n')}`).join('\n\n')}

## O que não fazemos
${notOffered.map((n) => `- ${n}`).join('\n')}

## Perguntas frequentes
${faq.map((f) => `**${f.q}**\n${f.a}`).join('\n\n')}
`,
)

if (meta.title.length > 60) console.warn(`⚠  title com ${meta.title.length} caracteres (ideal ≤ 60)`)
if (meta.description.length > 160) console.warn(`⚠  description com ${meta.description.length} caracteres (ideal ≤ 160)`)
if (!site.whatsapp.enabled) {
  console.warn('\n⚠  VITE_WHATSAPP_NUMBER não definido: os botões de WhatsApp apontarão para #contato.')
}
if (!site.analytics.gtmId && !site.analytics.gaId) {
  console.warn('⚠  Sem VITE_GTM_ID/VITE_GA_ID: analytics desativado neste build.')
}
console.log(`✔ Pré-renderização concluída (${site.url})`)
