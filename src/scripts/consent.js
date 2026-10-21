import { site } from '../config/site'

/**
 * Consentimento de cookies (LGPD) para o Google Tag Manager / Analytics.
 *
 * Modo conservador: enquanto o visitante não clicar em "Aceitar", NENHUM script do Google é
 * carregado (nem cookies são criados). O estado "denied" é declarado ao dataLayer (Consent Mode v2)
 * para que, quando o GTM carregar, ele já saiba que anúncios continuam negados.
 *
 * A escolha fica no localStorage do navegador (chave mc-consent): 'granted' | 'denied'.
 */
const KEY = 'mc-consent'
const OPEN_EVENT = 'mc:consent-open'
let loaded = false

const store = {
  get() {
    try {
      return window.localStorage.getItem(KEY)
    } catch {
      return null
    }
  },
  set(value) {
    try {
      window.localStorage.setItem(KEY, value)
    } catch {
      /* navegação privada / armazenamento bloqueado: a escolha vale só nesta página */
    }
  },
}

export const analyticsEnabled = () => Boolean(site.analytics.gtmId || site.analytics.gaId)
/** 'granted' | 'denied' | null (ainda não escolheu) */
export const getConsent = () => store.get()
export const hasAnalyticsConsent = () => analyticsEnabled() && getConsent() === 'granted'

function ensureDataLayer() {
  window.dataLayer = window.dataLayer || []
  // gtag precisa empurrar o objeto `arguments` (não um array): exigência do Google
  window.gtag =
    window.gtag ||
    function gtag() {
      window.dataLayer.push(arguments)
    }
}

function injectScript(src) {
  const s = document.createElement('script')
  s.async = true
  s.src = src
  document.head.appendChild(s)
}

function loadAnalytics() {
  if (loaded) return
  loaded = true
  ensureDataLayer()
  window.gtag('consent', 'update', { analytics_storage: 'granted' })
  const { gtmId, gaId } = site.analytics
  if (gtmId) {
    window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' })
    injectScript(`https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(gtmId)}`)
  } else if (gaId) {
    window.gtag('js', new Date())
    window.gtag('config', gaId)
    injectScript(`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaId)}`)
  }
}

/** Apaga os cookies de análise do Google (_ga, _ga_*) no domínio atual e nos pais. */
function clearAnalyticsCookies() {
  const names = document.cookie
    .split(';')
    .map((c) => c.split('=')[0].trim())
    .filter((n) => n === '_ga' || n === '_gid' || n.startsWith('_ga_') || n.startsWith('_gat'))
  const parts = location.hostname.split('.')
  const domains = ['', ...parts.map((_, i) => `.${parts.slice(i).join('.')}`).filter((d) => d.split('.').length > 2)]
  for (const name of names) {
    for (const d of domains) {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${d ? `; domain=${d}` : ''}`
    }
  }
}

/** Grava a escolha do visitante ('granted' | 'denied') e aplica na hora. */
export function setConsent(value) {
  store.set(value)
  if (value === 'granted') {
    loadAnalytics()
  } else {
    if (loaded) window.gtag('consent', 'update', { analytics_storage: 'denied' })
    clearAnalyticsCookies()
  }
  window.dispatchEvent(new CustomEvent('mc:consent-change', { detail: value }))
}

/** Roda uma vez, depois da montagem da página. Sem GTM/GA configurado, não faz nada. */
export function initConsent() {
  if (!analyticsEnabled()) return
  ensureDataLayer()
  window.gtag('consent', 'default', {
    analytics_storage: 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  })
  if (getConsent() === 'granted') loadAnalytics()
}

/** Reabre o aviso (botão "Preferências de cookies" do rodapé). */
export const openPreferences = () => window.dispatchEvent(new Event(OPEN_EVENT))
export const onOpenPreferences = (fn) => {
  window.addEventListener(OPEN_EVENT, fn)
  return () => window.removeEventListener(OPEN_EVENT, fn)
}
