/**
 * Título com âncora: o "#" leva (e copia) o link direto para aquela parte da página.
 *  - `id`   → o próprio título recebe o id (use quando nenhum ancestral já tem um).
 *  - `href` → aponta para o id de um ancestral (ex.: o id da <section>), sem duplicar ids.
 */
export default function Heading({ as: Tag = 'h3', id, href, className = '', label, children }) {
  const target = href || id
  return (
    <Tag id={id} className={`anchor-heading ${className}`.trim()}>
      {children}
      <a
        className="anchor"
        href={`#${target}`}
        aria-label={`Link direto para ${label || (typeof children === 'string' ? children : target)}`}
        title={`Link direto para ${label || (typeof children === 'string' ? children : target)} (clique para copiar)`}
      >
        #
      </a>
    </Tag>
  )
}
