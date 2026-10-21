/**
 * Links diretos (#âncora):
 *  - ao abrir a página com #hash (ou ao mudar o hash), abre o <details> do alvo (perguntas do FAQ);
 *  - ao clicar no "#" de um título, copia a URL completa para a área de transferência.
 */
function openTarget(jump = false) {
  if (!location.hash) return
  const el = document.getElementById(decodeURIComponent(location.hash.slice(1)))
  if (!el) return
  const details = el.matches('details') ? el : el.closest('details')
  const wasClosed = details && !details.open
  if (wasClosed) details.open = true
  // Pulo instantâneo (sem animação): garante o destino certo ao abrir um link compartilhado
  if (jump || wasClosed) el.scrollIntoView({ behavior: 'instant' })
}

export function initAnchors() {
  openTarget(true)
  // Reposiciona quando imagens/fontes terminarem de carregar e o layout mudar
  window.addEventListener('load', () => openTarget(true), { once: true })
  window.addEventListener('hashchange', () => openTarget())

  document.addEventListener('click', (e) => {
    const a = e.target instanceof Element ? e.target.closest('a.anchor') : null
    if (!a || !navigator.clipboard) return
    const url = `${location.origin}${location.pathname}${a.getAttribute('href')}`
    navigator.clipboard.writeText(url).then(
      () => {
        a.dataset.copied = 'true'
        setTimeout(() => delete a.dataset.copied, 1600)
      },
      () => {},
    )
  })
}
