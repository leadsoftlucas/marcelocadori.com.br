import { initTracking } from './tracking'
import { initAnchors } from './anchors'
import { initMotion } from './motion'
import { initConsent } from './consent'

let started = false

/**
 * Inicia os scripts de navegador (analytics, links diretos e efeitos de rolagem).
 * Deve rodar DEPOIS que o React montou/hidratou a página (chamado por um useEffect em App.jsx),
 * porque todos eles procuram elementos no DOM. A trava evita rodar duas vezes (StrictMode em dev).
 */
export function initPage() {
  if (started) return
  started = true
  initConsent() // declara o consentimento padrão (negado) e carrega o analytics só se já aceito
  initTracking()
  initAnchors() // primeiro: um link #âncora já posiciona a página
  initMotion()
}
