import Section from './Section'
import Heading from './Heading'
import { oficina } from '../content/about'
import { site } from '../config/site'

/** Sobre a oficina: história, missão, visão e valores. */
export default function AboutShop() {
  return (
    <Section id="sobre-oficina" tone="light" eyebrow="Sobre a oficina" title="Tradição de família, jeito novo de atender.">
      <div className="shop">
        <article className="card shop__card shop__card--wide" data-reveal style={{ '--i': 0 }}>
          <Heading as="h3" id="nossa-historia">Nossa história</Heading>
          <p>
            {oficina.history}
            {site.foundingYear && ` A oficina está em atividade desde ${site.foundingYear}.`}
          </p>
        </article>
        <article className="card shop__card" data-reveal style={{ '--i': 0 }}>
          <Heading as="h3" id="missao">Missão</Heading>
          <p>{oficina.mission}</p>
        </article>
        <article className="card shop__card" data-reveal style={{ '--i': 1 }}>
          <Heading as="h3" id="visao">Visão</Heading>
          <p>{oficina.vision}</p>
        </article>
        <article className="card shop__card shop__card--wide" data-reveal style={{ '--i': 0 }}>
          <Heading as="h3" id="valores">Valores</Heading>
          <ul className="chips chips--solid">
            {oficina.values.map((v) => (
              <li key={v}>{v}</li>
            ))}
          </ul>
        </article>
      </div>
    </Section>
  )
}
