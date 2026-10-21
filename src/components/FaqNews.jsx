import Section from './Section'
import Heading from './Heading'
import { slugify } from '../scripts/slug'
import { faq } from '../content/faq'
import { news } from '../content/news'
import { site } from '../config/site'
import SocialLinks from './SocialLinks'

/** Dúvidas frequentes (details nativo, texto no HTML p/ buscadores e LLMs) + novidades. */
export default function FaqNews() {
  const hasSocial = site.social.instagram || site.social.facebook
  return (
    <Section id="duvidas" tone="light" eyebrow="Dúvidas frequentes e novidades" title="Perguntas que o Marcelo mais escuta.">
      <div className="faqnews">
        <div className="faq" data-reveal>
          {faq.map((f) => (
            <details key={f.q} id={`duvida-${slugify(f.q)}`} className="faq__item">
              <summary title="Clique para ver ou ocultar a resposta">
                <span>{f.q}<a className="anchor" href={`#duvida-${slugify(f.q)}`} aria-label="Link direto para esta pergunta" title="Link direto para esta pergunta (clique para copiar)">#</a></span>
              </summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>

        <aside className="news card" data-reveal style={{ '--i': 2 }} aria-labelledby="novidades">
          <Heading as="h3" id="novidades">Novidades</Heading>
          {news.length > 0 ? (
            <ul className="news__list">
              {news.map((n) => (
                <li key={n.title}>
                  <time dateTime={n.date}>{new Date(n.date).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}</time>
                  <strong>{n.link ? <a href={n.link} title={`Ler: ${n.title}`}>{n.title}</a> : n.title}</strong>
                  <p>{n.text}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>Acompanhe trabalhos recentes, dicas de manutenção e novidades da oficina nas redes sociais.</p>
          )}
          {hasSocial && <SocialLinks location="novidades" labels className="social--card" />}
        </aside>
      </div>
    </Section>
  )
}
