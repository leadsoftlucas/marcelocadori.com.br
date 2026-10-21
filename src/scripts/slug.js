/** "Vocês fazem troca de óleo?" → "voces-fazem-troca-de-oleo" (ids estáveis para links diretos). */
export function slugify(text, max = 60) {
  const slug = text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
  return slug.length > max ? slug.slice(0, max).replace(/-[^-]*$/, '') : slug
}
