import Header from '../components/Header'
import Footer from '../components/Footer'
import Heading from '../components/Heading'
import WhatsAppFloat from '../components/WhatsAppFloat'
import { site, whatsappUrl } from '../config/site'
import { buildPrivacy } from '../content/privacy'

/** Política de Privacidade e Cookies (página própria, pré-renderizada em /politica-de-privacidade/). */
export default function PrivacyPage() {
  const p = buildPrivacy(site)
  return (
    <>
      <a className="skip-link" href="#conteudo" title="Pular o menu e ir direto ao texto">Pular para o conteúdo</a>
      <Header base="/" />
      <main id="conteudo">
        <article className="container legal">
          <p className="eyebrow">Privacidade e cookies</p>
          <h1 className="legal__title">{p.title}</h1>
          <p className="legal__updated">Última atualização: {p.updatedLabel}</p>
          {p.intro.map((t) => (
            <p key={t.slice(0, 30)}>{t}</p>
          ))}

          {p.sections.map((s) => (
            <section key={s.id} className="legal__section">
              <Heading as="h2" id={s.id}>{s.title}</Heading>
              {s.paragraphs?.map((t) => (
                <p key={t.slice(0, 30)}>{t}</p>
              ))}
              {s.list && (
                <ul className="legal__list">
                  {s.list.map((t) => (
                    <li key={t.slice(0, 30)}>{t}</li>
                  ))}
                </ul>
              )}
              {s.table && (
                <div className="legal__table" role="region" aria-label="Tabela de cookies" tabIndex={0}>
                  <table>
                    <thead>
                      <tr>{s.table.head.map((h) => <th key={h} scope="col">{h}</th>)}</tr>
                    </thead>
                    <tbody>
                      {s.table.rows.map((r) => (
                        <tr key={r[0]}>{r.map((c, i) => <td key={i}>{c}</td>)}</tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              {s.after?.map((t) => (
                <p key={t.slice(0, 30)}>{t}</p>
              ))}
              {s.contact && (
                <ul className="legal__list">
                  {site.email && (
                    <li>E-mail: <a href={`mailto:${site.email}`} title={`Enviar um e-mail para ${site.email}`}>{site.email}</a></li>
                  )}
                  {site.whatsapp.enabled && (
                    <li>
                      WhatsApp:{' '}
                      <a href={whatsappUrl('Olá! Gostaria de falar sobre meus dados pessoais (LGPD).')} target="_blank" rel="noopener noreferrer" title="Falar sobre privacidade pelo WhatsApp (abre em nova aba)">
                        {site.whatsapp.display}
                      </a>
                    </li>
                  )}
                </ul>
              )}
            </section>
          ))}
          <p><a href="/" title="Voltar para a página inicial">← Voltar para a página inicial</a></p>
        </article>
      </main>
      <Footer base="/" />
      <WhatsAppFloat />
    </>
  )
}
