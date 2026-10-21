import { whatsappUrl } from '../config/site'
import { WhatsAppIcon } from './Icons'

/** Botão flutuante: o caminho para o WhatsApp fica a um toque em qualquer ponto da página. */
export default function WhatsAppFloat() {
  return (
    <a
      className="wa-float"
      href={whatsappUrl()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar com o Marcelo no WhatsApp"
      title="Falar com o Marcelo no WhatsApp (abre em nova aba)"
      data-track="whatsapp_click"
      data-track-location="flutuante"
    >
      <WhatsAppIcon width={30} height={30} />
    </a>
  )
}
