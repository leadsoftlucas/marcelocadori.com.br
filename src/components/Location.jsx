import Section from './Section'
import WhatsAppButton from './WhatsAppButton'
import { site } from '../config/site'
import Address from './Address'
import { ClockIcon, StarIcon, ArrowIcon } from './Icons'

/** Como chegar: endereço, horário, mapa embutido e CTA final. */
export default function Location() {
  const a = site.address
  const embed = site.mapsEmbedUrl
  return (
    <Section id="como-chegar" tone="blue" eyebrow="Como chegar" title="Venha conhecer a oficina." intro="Fale com o Marcelo pelo WhatsApp para agendar o seu horário e confirmar o endereço.">
      <div className="location">
        <div className="location__info" data-reveal="left">
          <Address location="como-chegar" className="location__address" />
          {site.hours.text && (
            <p className="location__hours"><ClockIcon width={20} height={20} /><span>{site.hours.text}</span></p>
          )}
          <div className="location__actions">
            <WhatsAppButton location="como-chegar" size="lg" variant="whatsapp" title={`Chamar o Marcelo no WhatsApp${site.whatsapp.display ? ` ${site.whatsapp.display}` : ''} (abre em nova aba)`}>
              {site.whatsapp.display ? `Chamar ${site.whatsapp.display}` : 'Chamar no WhatsApp'}
            </WhatsAppButton>
            {a.mapsUrl && (
              <a className="btn btn--ghost" href={a.mapsUrl} target="_blank" rel="noopener noreferrer" title="Abrir a rota até a oficina no Google Maps (abre em nova aba)" data-track="maps_click" data-track-location="rota">
                <ArrowIcon width={20} height={20} /> Traçar rota
              </a>
            )}
            {a.mapsUrl && (
              <a className="btn btn--ghost" href={a.mapsUrl} target="_blank" rel="noopener noreferrer" title="Ver as avaliações da oficina no Google (abre em nova aba)" data-track="reviews_click" data-track-location="como-chegar">
                <StarIcon width={20} height={20} /> Avaliações no Google
              </a>
            )}
          </div>
        </div>
        {embed && (
          <div className="location__map" data-reveal="zoom">
            <iframe
              title={`Mapa: localização da oficina ${site.name}`}
              src={embed}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        )}
      </div>
    </Section>
  )
}
