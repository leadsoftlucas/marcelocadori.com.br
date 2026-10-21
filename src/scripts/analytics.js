import { site } from '../config/site'

/**
 * Envia um evento para o GTM (dataLayer) ou, se só houver GA4, direto para o gtag.
 * Sem IDs configurados não faz nada (seguro em dev e em builds sem analytics).
 */
export function trackEvent(name, params = {}) {
  if (typeof window === 'undefined') return
  const { gtmId, gaId } = site.analytics
  if (gtmId) {
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({ event: name, ...params })
  } else if (gaId && typeof window.gtag === 'function') {
    window.gtag('event', name, params)
  }
}
