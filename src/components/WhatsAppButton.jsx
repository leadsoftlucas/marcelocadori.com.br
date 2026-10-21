import { whatsappUrl } from '../config/site'
import { WhatsAppIcon } from './Icons'

/** Botão principal de conversão. `location` identifica de onde veio o clique no analytics. */
export default function WhatsAppButton({ location, message, children = 'Agendar pelo WhatsApp', variant = 'primary', size, className = '', title = 'Falar com o Marcelo no WhatsApp (abre em nova aba)' }) {
  const cls = ['btn', `btn--${variant}`, size && `btn--${size}`, className].filter(Boolean).join(' ')
  return (
    <a
      className={cls}
      href={whatsappUrl(message)}
      title={title}
      target="_blank"
      rel="noopener noreferrer"
      data-track="whatsapp_click"
      data-track-location={location}
    >
      <WhatsAppIcon width={22} height={22} />
      <span>{children}</span>
    </a>
  )
}
