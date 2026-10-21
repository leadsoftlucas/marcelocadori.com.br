// Fonte única de dados do negócio. Valores variáveis vêm de variáveis de ambiente (VITE_*),
// então nada pessoal/sensível precisa ser versionado no repositório público.
const env = import.meta.env
const digits = (v = '') => String(v).replace(/\D/g, '')

const whatsappNumber = digits(env.VITE_WHATSAPP_NUMBER)

function formatBrPhone(n) {
  const m = n.match(/^55(\d{2})(\d{4,5})(\d{4})$/)
  return m ? `(${m[1]}) ${m[2]}-${m[3]}` : n
}

const city = (env.VITE_ADDRESS_CITY || '').trim()
const state = (env.VITE_ADDRESS_STATE || '').trim()

export const site = {
  name: 'Marcelo Cadori',
  businessType: 'Oficina mecânica, lataria e pintura',
  url: (env.VITE_SITE_URL || 'https://marcelocadori.com.br').replace(/\/$/, ''),
  locale: 'pt_BR',
  lang: 'pt-BR',
  themeColor: '#0032A1',
  whatsapp: {
    number: whatsappNumber,
    display: whatsappNumber ? formatBrPhone(whatsappNumber) : '',
    enabled: Boolean(whatsappNumber),
  },
  email: (env.VITE_EMAIL || '').trim(),
  address: {
    street: (env.VITE_ADDRESS_STREET || '').trim(),
    city,
    state,
    zip: (env.VITE_ADDRESS_ZIP || '').trim(),
    country: 'BR',
    lat: env.VITE_GEO_LAT || '',
    lng: env.VITE_GEO_LNG || '',
    mapsUrl: (env.VITE_MAPS_URL || '').trim(),
    // Texto de busca do mapa embutido (nome do local no Google): faz o cartão mostrar nota e avaliações.
    mapsQuery: (env.VITE_MAPS_QUERY || '').trim(),
  },
  hasAddress: Boolean(city),
  hours: {
    schema: (env.VITE_OPENING_HOURS_SCHEMA || '').trim(),
    text: (env.VITE_OPENING_HOURS_TEXT || '').trim(),
  },
  social: {
    instagram: (env.VITE_INSTAGRAM_URL || '').trim(),
    facebook: (env.VITE_FACEBOOK_URL || '').trim(),
  },
  analytics: {
    gtmId: (env.VITE_GTM_ID || '').trim(),
    gaId: (env.VITE_GA_ID || '').trim(),
  },
  verification: {
    google: (env.VITE_GSC_VERIFICATION || '').trim(),
    bing: (env.VITE_BING_VERIFICATION || '').trim(),
  },
  /** URL do mapa embutido (iframe do Google Maps, sem chave de API). */
  get mapsEmbedUrl() {
    const { lat, lng, mapsQuery } = this.address
    if (!mapsQuery && !(lat && lng)) return ''
    const q = mapsQuery || `${lat},${lng}`
    const ll = lat && lng ? `&ll=${lat},${lng}` : ''
    return `https://www.google.com/maps?q=${encodeURIComponent(q)}${ll}&z=16&hl=pt-BR&output=embed`
  },
  /** Endereço em uma linha. Não repete a cidade se a variável da rua já a contém. */
  get addressLine() {
    const a = this.address
    const streetHasCity = Boolean(a.street && a.city && a.street.toLowerCase().includes(a.city.toLowerCase()))
    const cityState = streetHasCity ? '' : [a.city, a.state].filter(Boolean).join(' - ')
    return [a.street, cityState, a.zip].filter(Boolean).join(', ')
  },
  get place() {
    return city ? (state ? `${city}/${state}` : city) : ''
  },
}

/** Link do WhatsApp com mensagem pré-preenchida (a mensagem identifica a origem do contato). */
export function whatsappUrl(message = 'Olá Marcelo! Vim pelo site e gostaria de agendar um serviço.') {
  if (!site.whatsapp.enabled) return '#contato'
  return `https://wa.me/${site.whatsapp.number}?text=${encodeURIComponent(message)}`
}
