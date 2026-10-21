import Heading from './Heading'

/** Seção padrão: id para âncora/analytics, cabeçalho opcional e fundo alternável. */
export default function Section({ id, tone = 'light', eyebrow, title, intro, children, className = '' }) {
  return (
    <section id={id} data-section={id} className={`section section--${tone} ${className}`}>
      <div className="container">
        {(eyebrow || title) && (
          <div className="section__head" data-reveal>
            {eyebrow && <p className="eyebrow">{eyebrow}</p>}
            {title && <Heading as="h2" href={id} className="section__title">{title}</Heading>}
            {intro && <p className="section__intro">{intro}</p>}
          </div>
        )}
        {children}
      </div>
    </section>
  )
}
