import { site } from '../config/site'
import { hasAnalyticsConsent } from './consent'

/**
 * Envia um evento para o GTM (dataLayer) ou, se só houver GA4, direto para o gtag.
 * Sem consentimento do visitante (LGPD) nada é enviado nem fica na fila do dataLayer, para não
 * "vazar" eventos antigos para o Google quando o aceite acontecer depois.
 */
export function trackEvent(name, params = {}) {
  if (typeof window === 'undefined') return
  if (!hasAnalyticsConsent()) return
  const { gtmId, gaId } = site.analytics
  if (gtmId) {
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({ event: name, ...params })
  } else if (gaId && typeof window.gtag === 'function') {
    window.gtag('event', name, params)
  }
}
