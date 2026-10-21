/**
 * Efeitos de rolagem (melhoria progressiva, nada disso é necessário para ler o site):
 *  - [data-reveal]       → o bloco surge suavemente ao entrar na tela (data-reveal="up|left|right|zoom")
 *  - [data-parallax]     → a imagem desloca um pouco mais devagar que o conteúdo
 *  - .header__progress   → barra de progresso da leitura
 *  - .header__nav a      → destaca o item do menu da seção atual (scroll-spy)
 *
 * O HTML pré-renderizado já traz tudo visível: a classe `motion` só é aplicada aqui, depois do
 * carregamento, e não é aplicada se o usuário pediu "reduzir movimento" no sistema.
 */
export function initMotion() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  const root = document.documentElement
  const vh = () => window.innerHeight

  // 1) Revelar ao rolar ------------------------------------------------------------------------
  const reveals = [...document.querySelectorAll('[data-reveal]')]
  if (!reveals.length) return // nada para animar: não ativa o modo `motion` (evita esconder conteúdo)
  // O que já está na tela (ou acima dela, p.ex. após abrir um link #âncora) não é escondido.
  const entered = (el) => el.getBoundingClientRect().top < vh() * 0.88
  reveals.forEach((el) => {
    if (entered(el)) el.classList.add('is-visible')
  })
  root.classList.add('motion')

  let pending = reveals.filter((el) => !el.classList.contains('is-visible'))

  // 2) Parallax, progresso e scroll-spy (um único listener, agrupado por frame) ------------------
  const parallax = [...document.querySelectorAll('[data-parallax]')].map((el) => ({
    el,
    host: el.parentElement,
    speed: parseFloat(el.dataset.parallax) || 0.12,
    scale: parseFloat(getComputedStyle(el).getPropertyValue('--ps')) || 1.15,
  }))
  const bar = document.querySelector('.header__progress')
  const spy = [...document.querySelectorAll('.header__nav a[href^="#"]')]
    .map((a) => ({ a, section: document.getElementById(a.getAttribute('href').slice(1)) }))
    .filter((x) => x.section)

  let ticking = false
  const update = () => {
    ticking = false
    const h = vh()

    // Revela o que acabou de entrar na tela (sem IntersectionObserver: um só laço para tudo)
    if (pending.length) {
      pending = pending.filter((el) => {
        if (!entered(el)) return true
        el.classList.add('is-visible')
        return false
      })
    }

    for (const p of parallax) {
      const r = p.host.getBoundingClientRect()
      if (r.bottom < -120 || r.top > h + 120) continue
      const limit = (p.host.offsetHeight * (p.scale - 1)) / 2 // folga criada pelo zoom da imagem
      const offset = (h / 2 - (r.top + r.height / 2)) * p.speed
      p.el.style.setProperty('--py', `${Math.max(-limit, Math.min(limit, offset)).toFixed(1)}px`)
    }

    if (bar) {
      const max = root.scrollHeight - h
      bar.style.setProperty('--progress', max > 0 ? (window.scrollY / max).toFixed(4) : '0')
    }

    let current = null
    for (const s of spy) if (s.section.getBoundingClientRect().top <= h * 0.35) current = s
    for (const s of spy) {
      const on = s === current
      s.a.classList.toggle('is-active', on)
      if (on) s.a.setAttribute('aria-current', 'true')
      else s.a.removeAttribute('aria-current')
    }
  }
  const request = () => {
    if (!ticking) {
      ticking = true
      requestAnimationFrame(update)
    }
  }
  window.addEventListener('scroll', request, { passive: true })
  window.addEventListener('resize', request)
  update()
}
