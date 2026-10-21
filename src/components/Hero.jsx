import WhatsAppButton from './WhatsAppButton'

/** Apresentação + slogan (topo da página). Redes sociais ficam no header. */
export default function Hero() {
  return (
    <section id="topo" className="hero" data-section="topo">
      <img
        className="hero__img" data-parallax="0.12"
        src="/images/hero-1920.webp"
        srcSet="/images/hero-960.webp 960w, /images/hero-1920.webp 1920w"
        sizes="100vw"
        width="1920"
        height="1272"
        alt="Profissional polindo a pintura de um carro na oficina" title="Oficina Marcelo Cadori: polimento e pintura automotiva"
        fetchPriority="high"
        decoding="async"
      />
      <div className="hero__overlay" aria-hidden="true" />
      <div className="container hero__content">
        <p className="eyebrow eyebrow--light">Oficina Marcelo Cadori · Mecânica, lataria e pintura</p>
        <h1 className="hero__title">
          Seu carro bem cuidado, e você sabendo o <em>porquê</em> de cada serviço.
        </h1>
        <p className="hero__lead">
          Sou o Marcelo, mecânico. Cuido do seu carro com prazo combinado, transparência e explicação. Fale direto comigo no WhatsApp e agende.
        </p>
        <div className="hero__actions">
          <WhatsAppButton location="hero" size="lg" title="Agendar o seu serviço pelo WhatsApp (abre em nova aba)" />
          <a className="btn btn--ghost btn--lg" href="#servicos" title="Rolar até a lista de serviços da oficina">Ver serviços</a>
        </div>
      </div>
    </section>
  )
}
