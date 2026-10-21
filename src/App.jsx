import { useEffect } from 'react'
import HomePage from './pages/HomePage'
import { initPage } from './scripts/init'

// Site de página única: sem roteador. Para novas páginas (ex.: /servicos), crie em src/pages/
// e inclua no sitemap em scripts/prerender.mjs.
export default function App() {
  // Só roda no navegador, depois de a página estar no DOM (não roda no pré-render do build).
  useEffect(() => {
    initPage()
  }, [])

  return <HomePage />
}
