import Section from './Section'
import Heading from './Heading'
import WhatsAppButton from './WhatsAppButton'
import { steps } from '../content/steps'

export default function Process() {
  return (
    <Section
      id="como-funciona"
      tone="blue"
      eyebrow="Como funciona"
      title="Do primeiro contato à entrega, sem surpresa."
    >
      <ol className="steps">
        {steps.map((s, i) => (
          <li key={s.id} className="steps__item" data-reveal style={{ '--i': i }}>
            <span className="steps__num" aria-hidden="true">{i + 1}</span>
            <Heading as="h3" id={`passo-${s.id}`}>{s.title}</Heading>
            <p>{s.text}</p>
          </li>
        ))}
      </ol>
      <div className="section__cta" data-reveal>
        <WhatsAppButton location="como-funciona" size="lg" variant="whatsapp" title="Começar o atendimento pelo WhatsApp (abre em nova aba)">Começar pelo WhatsApp</WhatsAppButton>
      </div>
    </Section>
  )
}
