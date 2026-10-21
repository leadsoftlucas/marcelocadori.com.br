import { useEffect } from 'react'
import { resolveRoute } from './routes'
import ConsentBanner from './components/ConsentBanner'
import { initPage } from './scripts/init'

// `path` vem do build (pré-render). No navegador, usa o endereço atual (mesmo resultado do servidor).
export default function App({ path }) {
  const current = path ?? (typeof window !== 'undefined' ? window.location.pathname : '/')
  const { Page } = resolveRoute(current)

  // Só roda no navegador, depois de a página estar no DOM (não roda no pré-render do build).
  useEffect(() => {
    initPage()
  }, [])

  return (
    <>
      <Page />
      <ConsentBanner />
    </>
  )
}
