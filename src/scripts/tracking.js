import { trackEvent } from './analytics'

/**
 * Rastreamento declarativo por atributos HTML (sem JS espalhado nos componentes):
 *  - data-track="whatsapp_click" data-track-location="hero"  → evento ao clicar
 *  - data-section="servicos"                                 → evento "section_view" ao entrar na tela (1x)
 *
 * Eventos enviados (configure como conversões/acionadores no GTM/GA4):
 *  whatsapp_click | phone_click | maps_click | instagram_click | section_view
 */
export function initTracking() {
  document.addEventListener('click', (e) => {
    const el = e.target instanceof Element ? e.target.closest('[data-track]') : null
    if (!el) return
    trackEvent(el.dataset.track, {
      location: el.dataset.trackLocation || 'unknown',
      link_url: el.getAttribute('href') || undefined,
    })
  })

  if (!('IntersectionObserver' in window)) return
  const seen = new Set()
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const id = entry.target.dataset.section
        if (entry.isIntersecting && id && !seen.has(id)) {
          seen.add(id)
          trackEvent('section_view', { section: id })
          io.unobserve(entry.target)
        }
      }
    },
    { threshold: 0.4 },
  )
  document.querySelectorAll('[data-section]').forEach((el) => io.observe(el))
}
