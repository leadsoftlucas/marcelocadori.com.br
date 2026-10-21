import { site } from '../config/site'
import { PinIcon } from './Icons'

/** Endereço completo como link para o Google Maps (cai em texto simples se não houver link). */
export default function Address({ location, className = '' }) {
  const a = site.address
  const line = [a.street, [a.city, a.state].filter(Boolean).join(' - '), a.zip].filter(Boolean).join(', ')
  if (!line) return null
  return (
    <p className={`address ${className}`.trim()}>
      <PinIcon width={20} height={20} />
      {a.mapsUrl ? (
        <a href={a.mapsUrl} target="_blank" rel="noopener noreferrer" title="Abrir o endereço da oficina no Google Maps (abre em nova aba)" data-track="maps_click" data-track-location={location}>
          {line}
        </a>
      ) : (
        <span>{line}</span>
      )}
    </p>
  )
}
