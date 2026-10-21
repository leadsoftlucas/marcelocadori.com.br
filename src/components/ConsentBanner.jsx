import { useEffect, useRef, useState } from 'react'
import { site } from '../config/site'
import { analyticsEnabled, getConsent, setConsent, onOpenPreferences } from '../scripts/consent'

/**
 * Aviso de cookies (LGPD). Só existe quando há GTM/GA configurado e o visitante ainda não escolheu
 * (ou pediu para rever em "Preferências de cookies"). "Aceitar" e "Recusar" têm o mesmo destaque.
 * Renderiza null no servidor e na hidratação (decide só no navegador, depois da montagem).
 */
export default function ConsentBanner() {
  const [open, setOpen] = useState(false)
  const accept = useRef(null)

  useEffect(() => {
    if (!analyticsEnabled()) return undefined
    if (getConsent() === null) setOpen(true)
    return onOpenPreferences(() => setOpen(true))
  }, [])

  useEffect(() => {
    if (open && getConsent() !== null) accept.current?.focus() // reaberto pelo rodapé: leva o foco ao aviso
  }, [open])

  if (!open) return null

  const choose = (value) => {
    setConsent(value)
    setOpen(false)
  }

  return (
    <div className="consent" role="dialog" aria-modal="false" aria-labelledby="consent-title" aria-describedby="consent-text">
      <div className="container consent__inner">
        <div>
          <p className="consent__title" id="consent-title">Sua privacidade</p>
          <p className="consent__text" id="consent-text">
            Usamos cookies de análise (Google Analytics) para entender como o site é usado e melhorá-lo. Você escolhe:
            o site funciona igual nos dois casos. Saiba mais na{' '}
            <a href={site.privacyPath} title="Ler a política de privacidade e de cookies">Política de Privacidade</a>.
          </p>
        </div>
        <div className="consent__actions">
          <button type="button" ref={accept} className="btn btn--solid" onClick={() => choose('granted')} title="Aceitar os cookies de análise">
            Aceitar
          </button>
          <button type="button" className="btn btn--outline" onClick={() => choose('denied')} title="Recusar os cookies de análise">
            Recusar
          </button>
        </div>
      </div>
    </div>
  )
}
