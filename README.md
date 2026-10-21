# marcelocadori.com.br

Site institucional estático de **Marcelo Cadori**, mecânico: oficina de **mecânica, lataria e pintura**. É uma landing page cujo objetivo é simples: o cliente encontra a oficina e **chama no WhatsApp** para agendar.

🌐 **https://marcelocadori.com.br**

## Destaques

- **React + Vite com pré-renderização (SSG):** o HTML final já contém todo o conteúdo, então buscadores e LLMs leem a página sem executar JavaScript. No navegador o React apenas "hidrata".
- **SEO completo:** `title`/`description`, canonical, hreflang, Open Graph, Twitter Card, JSON-LD (`AutoRepair`, `WebSite`, `WebPage`, `FAQPage`), `sitemap.xml`, `robots.txt`, favicons e manifest.
- **Pensado para LLMs (GEO):** `robots.txt` liberando crawlers de IA (GPTBot, ClaudeBot, PerplexityBot…) e `llms.txt` com resumo do negócio em Markdown.
- **Efeitos de rolagem:** blocos que surgem ao rolar, parallax sutil, barra de progresso e destaque do menu. Respeitam `prefers-reduced-motion` e não escondem conteúdo do HTML pré-renderizado.
- **Acessibilidade:** `alt` descritivo em todas as imagens, `title` (hint) em botões e links, HTML semântico e links diretos (`#âncoras`) em todos os subtítulos.
- **Analytics:** Google Tag Manager (ou GA4 direto) e eventos de conversão (`whatsapp_click`, `section_view`…).
- **Performance e acessibilidade:** imagens WebP com dimensões, fontes auto-hospedadas, CSS de poucos KB, HTML semântico, sem dependências de terceiros em tempo de execução além do GTM.
- **Sem dados sensíveis no repositório:** telefone, endereço e IDs de analytics entram por variáveis de ambiente.

## Estrutura

```
src/
├─ pages/        páginas (HomePage)
├─ components/   seções e peças de interface
├─ content/      textos editáveis: serviços, FAQ, passos, valores
├─ config/       site.js: dados do negócio (lidos de VITE_*)
├─ seo/          meta tags, Open Graph, JSON-LD
├─ scripts/      scripts do navegador (analytics e rastreamento de eventos)
├─ styles/       CSS separado por responsabilidade (tokens, base, layout, componentes)
├─ App.jsx · main.jsx · entry-server.jsx
scripts/         scripts de build (prerender.mjs gera HTML, sitemap, robots, llms.txt)
public/          favicons, manifest, CNAME, _headers e imagens otimizadas
.github/         workflow de deploy no GitHub Pages
```

## Desenvolvimento

Requer Node.js 20+.

```bash
npm install
npm run dev        # servidor local com hot reload
npm run build      # build de produção + pré-renderização (gera dist/)
npm run preview    # serve o dist/ localmente
```

## Configuração (variáveis de ambiente)

Copie `.env.example` para `.env` (ignorado pelo Git) para desenvolvimento local. Todas as variáveis são opcionais; o build funciona sem elas, mas avisa o que falta.

| Variável | Para quê |
|---|---|
| `VITE_SITE_URL` | URL canônica (padrão `https://marcelocadori.com.br`) |
| `VITE_WHATSAPP_NUMBER` | WhatsApp com DDI+DDD, só dígitos (ex.: `5551999999999`) |
| `VITE_ADDRESS_*`, `VITE_GEO_LAT/LNG` | Endereço e SEO local (JSON-LD, meta `geo.*`) |
| `VITE_MAPS_URL` / `VITE_MAPS_QUERY` | Link do Google Maps e busca do mapa embutido (mostra nota e avaliações) |
| `VITE_OPENING_HOURS_SCHEMA` / `_TEXT` | Horário (schema.org e texto legível) |
| `VITE_EMAIL`, `VITE_INSTAGRAM_URL`, `VITE_FACEBOOK_URL` | Contato e redes (`sameAs`) |
| `VITE_GTM_ID` / `VITE_GA_ID` | Google Tag Manager (recomendado) ou GA4 direto |
| `VITE_GSC_VERIFICATION` / `VITE_BING_VERIFICATION` | Verificação de propriedade (Search Console / Bing) |

## Deploy (GitHub Pages)

1. **Settings → Pages → Source: GitHub Actions**.
2. **Settings → Secrets and variables → Actions → Variables**: crie as variáveis acima (não precisam ser *Secrets*).
3. Faça push na branch `main`: o workflow `.github/workflows/deploy.yml` faz o build e publica.
4. **Domínio próprio:** o arquivo `public/CNAME` já aponta para `marcelocadori.com.br`. Configure o DNS conforme a [documentação do GitHub Pages](https://docs.github.com/pt/pages/configuring-a-custom-domain-for-your-github-pages-site) e ative *Enforce HTTPS*.

> O site usa caminhos absolutos (`/images/...`) e foi feito para ser servido na raiz de um domínio próprio.

## Google Search Console e Tag Manager

- **Search Console:** adicione a propriedade, verifique por DNS (TXT) ou pela meta tag (`VITE_GSC_VERIFICATION`), envie `https://marcelocadori.com.br/sitemap.xml` e solicite a indexação da home.
- **Tag Manager:** informe `VITE_GTM_ID`, configure o GA4 dentro do GTM e use os eventos `whatsapp_click`, `service_details`, `section_view`, `maps_click`, `reviews_click`, `instagram_click`, `facebook_click` e `email_click` (parâmetros `location` e `section`).
- Para rastrear outro elemento: `data-track="nome_do_evento" data-track-location="onde"`.

## Cabeçalhos HTTP

O GitHub Pages não permite cabeçalhos customizados. O arquivo `public/_headers` traz CSP, HSTS e demais cabeçalhos de segurança como referência para uso com Cloudflare (proxy na frente do domínio), Cloudflare Pages ou Netlify.

## Editando conteúdo

- Textos: `src/content/*.js`
- Cores e tipografia: `src/styles/tokens.css`
- Título e descrição: `src/seo/meta.js`

## Direitos

O código-fonte deste repositório é de uso do proprietário do site. **Logotipo, marca "Marcelo Cadori", textos e imagens são propriedade de seus titulares: todos os direitos reservados.** Fotografias são de banco de imagens licenciado; não as reutilize fora deste site.
