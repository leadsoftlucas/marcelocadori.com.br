import { site } from '../config/site'
import SocialLinks from './SocialLinks'
import Address from './Address'
import { openPreferences } from '../scripts/consent'

export default function Footer({ base = '' }) {
  const year = new Date().getFullYear()
  return (
    <footer className="footer">
      <div className="container footer__inner footer__main">
        <img src="/images/logo-branco.webp" alt="Logotipo Marcelo Cadori, mecânica, lataria e pintura" title="Marcelo Cadori" width="640" height="126" loading="lazy" />
        <p className="footer__desc">{site.businessType}{site.place ? ` em ${site.place}` : ''}.</p>
        <Address location="rodape" className="footer__address" />
        <SocialLinks location="rodape" labels className="social--footer" />
        <nav className="footer__nav" aria-label="Rodapé">
          <a href={`${base}#servicos`} title="Ver os serviços da oficina">Serviços</a>
          <a href={`${base}#duvidas`} title="Ler as dúvidas frequentes">Dúvidas</a>
          <a href={`${base}#sobre-marcelo`} title="Conhecer o mecânico Marcelo Cadori">Sobre o Marcelo</a>
          <a href={`${base}#sobre-oficina`} title="Conhecer a história, a missão e a visão da oficina">A oficina</a>
          <a href={`${base}#como-chegar`} title="Ver o endereço e o mapa da oficina">Como chegar</a>
          <a href={site.privacyPath} title="Ler a política de privacidade e de cookies">Política de privacidade</a>
          {site.analyticsEnabled && (
            <button type="button" className="footer__linkbtn" onClick={openPreferences} title="Rever ou alterar a sua escolha sobre cookies de análise">
              Preferências de cookies
            </button>
          )}
        </nav>
        <div className="footer__bottom">
          <p className="footer__copy" suppressHydrationWarning>© {year} {site.name}. Todos os direitos reservados.</p>
          <p className="footer__credit">
            <img src="/images/leadsoft.png" alt="Logotipo da LeadSoft Soluções Web" title="LeadSoft Soluções Web" width="20" height="20" loading="lazy" />
            <span>
              powered by{' '}
              <a href="https://www.leadsoft.inf.br/" target="_blank" rel="noopener noreferrer" title="Conhecer a LeadSoft Soluções Web, desenvolvedora deste site (abre em nova aba)">LeadSoft® Soluções Web</a>
            </span>
          </p>
        </div>
      </div>
    </footer>
  )
}
