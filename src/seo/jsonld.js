import { site } from '../config/site'
import { services } from '../content/services'
import { faq } from '../content/faq'

const abs = (p) => `${site.url}${p}`

function address() {
  if (!site.hasAddress) return undefined
  const a = site.address
  return {
    '@type': 'PostalAddress',
    ...(a.street && { streetAddress: a.street }),
    addressLocality: a.city,
    ...(a.state && { addressRegion: a.state }),
    ...(a.zip && { postalCode: a.zip }),
    addressCountry: 'BR',
  }
}

/** Grafo schema.org: AutoRepair (LocalBusiness) + WebSite + WebPage + FAQPage. */
export function buildJsonLd(meta) {
  const business = {
    '@type': 'AutoRepair',
    '@id': abs('/#negocio'),
    name: site.name,
    alternateName: `Oficina ${site.name}`,
    ...(site.legalName && { legalName: site.legalName }),
    ...(site.cnpj && { taxID: site.cnpj }),
    ...(site.foundingDate && { foundingDate: site.foundingDate }),
    description: meta.description,
    url: abs('/'),
    image: [meta.image.url],
    logo: abs('/images/logo-azul.png'),
    priceRange: '$$',
    ...(site.whatsapp.enabled && { telephone: `+${site.whatsapp.number}` }),
    ...(site.email && { email: site.email }),
    ...(address() && { address: address() }),
    ...(site.address.lat &&
      site.address.lng && {
        geo: { '@type': 'GeoCoordinates', latitude: site.address.lat, longitude: site.address.lng },
      }),
    ...(site.hours.schema && { openingHours: site.hours.schema.split(',').map((s) => s.trim()) }),
    areaServed: site.hasAddress ? { '@type': 'City', name: site.address.city } : { '@type': 'Country', name: 'Brasil' },
    founder: { '@type': 'Person', name: site.name, jobTitle: 'Mecânico' },
    knowsAbout: ['Mecânica automotiva', 'Lataria e funilaria', 'Pintura automotiva', 'Manutenção preventiva'],
    sameAs: [site.social.instagram, site.social.facebook].filter(Boolean),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Serviços',
      itemListElement: services.map((s) => ({
        '@type': 'OfferCatalog',
        name: s.title,
        itemListElement: s.items.map((name) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name } })),
      })),
    },
  }

  return {
    '@context': 'https://schema.org',
    '@graph': [
      business,
      {
        '@type': 'WebSite',
        '@id': abs('/#site'),
        url: abs('/'),
        name: site.name,
        inLanguage: site.lang,
        publisher: { '@id': business['@id'] },
      },
      {
        '@type': 'WebPage',
        '@id': abs('/#pagina'),
        url: abs('/'),
        name: meta.title,
        description: meta.description,
        inLanguage: site.lang,
        isPartOf: { '@id': abs('/#site') },
        about: { '@id': business['@id'] },
        primaryImageOfPage: { '@type': 'ImageObject', url: meta.image.url },
      },
      {
        '@type': 'FAQPage',
        '@id': abs('/#faq'),
        mainEntity: faq.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
    ],
  }
}
