import { site } from '../config/site'

/** Título/descrição da home. Usa a cidade quando configurada (SEO local). */
export function homeMeta() {
  const where = site.place ? ` em ${site.place}` : ''
  return {
    path: '/',
    title: `${site.name} | Mecânica, Lataria e Pintura${site.address.city ? ` em ${site.address.city}` : ''}`,
    description:
      `Oficina de mecânica, lataria e pintura${where} para carros nacionais e importados. ` +
      'Prazo combinado e transparência. Agende pelo WhatsApp.',
    image: {
      url: `${site.url}/images/og-image.jpg`,
      width: 1200,
      height: 630,
      alt: `${site.name} — mecânica, lataria e pintura`,
    },
    keywords: [
      'oficina mecânica',
      'lataria',
      'funilaria',
      'pintura automotiva',
      'polimento',
      'manutenção preventiva',
      'troca de óleo',
      'mecânico de importados',
      site.address.city && `oficina mecânica ${site.address.city}`,
    ].filter(Boolean),
  }
}
