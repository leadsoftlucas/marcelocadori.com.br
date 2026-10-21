import Section from './Section'
import Heading from './Heading'
import { marcelo } from '../content/about'

/** Sobre o mecânico: propósito, frase de impacto e foto. */
export default function AboutMarcelo() {
  const { photo } = marcelo
  return (
    <Section id="sobre-marcelo" tone="soft" className="about">
      <div className="about__grid">
        <figure className="about__media" data-reveal="left">
          <div className="about__frame">
            <img data-parallax="0.08" src={photo.src} width={photo.width} height={photo.height} alt={photo.alt} title="Atendimento com confiança e transparência" loading="lazy" decoding="async" />
          </div>
          <figcaption className="about__impact">{marcelo.impact}</figcaption>
        </figure>
        <div className="about__text" data-reveal="right">
          <p className="eyebrow">Sobre o mecânico</p>
          <Heading as="h2" href="sobre-marcelo" className="section__title">Marcelo Cadori</Heading>
          <Heading as="h3" id="proposito" className="about__sub">Propósito</Heading>
          <p className="about__purpose">{marcelo.purpose}</p>
          {marcelo.story.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>
      </div>
    </Section>
  )
}
