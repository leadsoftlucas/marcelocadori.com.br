import { useRef, useState, useEffect, useCallback } from 'react'
import Section from './Section'
import Heading from './Heading'
import WhatsAppButton from './WhatsAppButton'
import { ChevronIcon, CloseIcon, CheckIcon } from './Icons'
import { services } from '../content/services'

/**
 * Carrossel dos serviços mais procurados. Scroll-snap nativo (funciona sem JS e no toque);
 * as setas e o modal de detalhes (<dialog>) são melhoria progressiva. Todo o texto fica no HTML.
 */
export default function ServicesCarousel() {
  const track = useRef(null)
  const dialogs = useRef({})
  const [edge, setEdge] = useState({ start: true, end: false })

  const update = useCallback(() => {
    const el = track.current
    if (!el) return
    setEdge({ start: el.scrollLeft <= 4, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4 })
  }, [])

  useEffect(() => {
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [update])

  const move = (dir) => {
    const el = track.current
    el.scrollBy({ left: dir * el.clientWidth * 0.85, behavior: 'smooth' })
  }

  return (
    <Section
      id="servicos"
      tone="soft"
      eyebrow="Serviços mais procurados"
      title="Mecânica, lataria e pintura no mesmo lugar."
      intro="Deslize para ver os serviços e toque em “Ver detalhes” para conhecer tudo o que está incluso."
    >
      <div className="carousel" data-reveal role="region" aria-roledescription="carrossel" aria-label="Serviços da oficina">
        <button type="button" className="carousel__nav carousel__nav--prev" onClick={() => move(-1)} disabled={edge.start} aria-label="Serviços anteriores" title="Ver os serviços anteriores">
          <ChevronIcon dir="left" width={22} height={22} />
        </button>
        <ul className="carousel__track" ref={track} onScroll={update} tabIndex={0}>
          {services.map((s) => (
            <li key={s.id} className="slide card" id={`servico-${s.id}`}>
              <img className="slide__img" src={s.image.src} width={s.image.width} height={s.image.height} alt={s.image.alt} title={s.title} loading="lazy" decoding="async" />
              <div className="slide__body">
                <Heading as="h3" href={`servico-${s.id}`} className="slide__title">{s.title}</Heading>
                <p className="slide__summary">{s.summary}</p>
                <div className="slide__actions">
                  <button
                    type="button"
                    className="btn btn--outline btn--sm"
                    onClick={() => dialogs.current[s.id]?.showModal()}
                    data-track="service_details"
                    data-track-location={s.id}
                    aria-haspopup="dialog"
                    title={`Ver detalhes de ${s.title}`}
                    aria-label={`Ver detalhes de ${s.title}`}
                  >
                    Ver detalhes
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <button type="button" className="carousel__nav carousel__nav--next" onClick={() => move(1)} disabled={edge.end} aria-label="Próximos serviços" title="Ver os próximos serviços">
          <ChevronIcon width={22} height={22} />
        </button>
      </div>

      {services.map((s) => (
        <dialog
          key={s.id}
          className="modal"
          ref={(el) => { dialogs.current[s.id] = el }}
          aria-labelledby={`modal-${s.id}-title`}
          onClick={(e) => { if (e.target === e.currentTarget) e.currentTarget.close() }}
        >
          <img className="modal__img" src={s.image.src} width={s.image.width} height={s.image.height} alt={s.image.alt} title={s.title} loading="lazy" decoding="async" />
          <div className="modal__body">
            <button type="button" className="modal__close" onClick={(e) => e.currentTarget.closest('dialog').close()} aria-label="Fechar detalhes" title="Fechar detalhes">
              <CloseIcon width={20} height={20} />
            </button>
            <h3 id={`modal-${s.id}-title`}>{s.title}</h3>
            <p>{s.summary}</p>
            <ul className="modal__list">
              {s.items.map((item) => (
                <li key={item}><CheckIcon width={18} height={18} /> {item}</li>
              ))}
            </ul>
            <WhatsAppButton location={`servico-${s.id}`} message={s.whatsappMessage} title={`Agendar "${s.title}" pelo WhatsApp (abre em nova aba)`}>Agendar este serviço</WhatsAppButton>
          </div>
        </dialog>
      ))}
    </Section>
  )
}
