import { site, whatsappUrl } from '../config/site'
import { WhatsAppIcon, InstagramIcon, FacebookIcon, MailIcon } from './Icons'

/** Ícones de contato/redes. Só renderiza o que estiver configurado. `location` alimenta o analytics. */
export default function SocialLinks({ location, className = '', labels = false, skip = [] }) {
  const items = [
    site.whatsapp.enabled && {
      key: 'whatsapp', label: 'WhatsApp', hint: 'Chamar o Marcelo no WhatsApp (abre em nova aba)', href: whatsappUrl(), icon: WhatsAppIcon,
      track: 'whatsapp_click', external: true,
    },
    site.social.instagram && {
      key: 'instagram', label: 'Instagram', hint: 'Ver o Instagram da oficina Marcelo Cadori (abre em nova aba)', href: site.social.instagram, icon: InstagramIcon,
      track: 'instagram_click', external: true, rel: 'me',
    },
    site.social.facebook && {
      key: 'facebook', label: 'Facebook', hint: 'Ver a página da oficina no Facebook (abre em nova aba)', href: site.social.facebook, icon: FacebookIcon,
      track: 'facebook_click', external: true, rel: 'me',
    },
    site.email && {
      key: 'email', label: 'E-mail', hint: `Enviar um e-mail para ${site.email}`, href: `mailto:${site.email}`, icon: MailIcon, track: 'email_click',
    },
  ].filter((i) => i && !skip.includes(i.key))

  if (!items.length) return null
  return (
    <ul className={`social ${labels ? 'social--labels' : ''} ${className}`}>
      {items.map(({ key, label, hint, href, icon: Icon, track, external, rel }) => (
        <li key={key}>
          <a
            href={href}
            aria-label={label}
            title={hint}
            data-track={track}
            data-track-location={location}
            {...(external ? { target: '_blank', rel: `noopener noreferrer ${rel || ''}`.trim() } : {})}
          >
            <Icon width={22} height={22} />
            {labels && <span>{label}</span>}
          </a>
        </li>
      ))}
    </ul>
  )
}
