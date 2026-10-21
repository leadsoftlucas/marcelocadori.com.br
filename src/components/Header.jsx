import WhatsAppButton from './WhatsAppButton'
import SocialLinks from './SocialLinks'

const links = [
  { href: '#servicos', label: 'Serviços', hint: 'Ver os serviços da oficina' },
  { href: '#como-funciona', label: 'Como funciona', hint: 'Entender como funciona o atendimento' },
  { href: '#duvidas', label: 'Dúvidas', hint: 'Ler as dúvidas frequentes' },
  { href: '#sobre-marcelo', label: 'Sobre', hint: 'Conhecer o mecânico Marcelo Cadori' },
  { href: '#como-chegar', label: 'Como chegar', hint: 'Ver o endereço e o mapa da oficina' },
]

export default function Header() {
  return (
    <header className="header">
      <div className="container header__inner">
        <a className="header__brand" href="#topo" aria-label="Marcelo Cadori — início" title="Marcelo Cadori: voltar ao topo da página">
          <img src="/images/logo-branco.webp" alt="Logotipo Marcelo Cadori, mecânica, lataria e pintura" title="Marcelo Cadori" width="640" height="126" />
        </a>
        <nav className="header__nav" aria-label="Principal">
          {links.map((l) => (
            <a key={l.href} href={l.href} title={l.hint}>{l.label}</a>
          ))}
        </nav>
        <SocialLinks location="header" skip={['whatsapp']} className="social--header" />
        <WhatsAppButton location="header" size="sm" variant="whatsapp" title="Agendar um serviço com o Marcelo pelo WhatsApp (abre em nova aba)">Agendar</WhatsAppButton>
      </div>
      <div className="header__progress" aria-hidden="true" />
    </header>
  )
}
