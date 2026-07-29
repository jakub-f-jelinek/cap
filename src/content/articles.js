import { parseFrontmatter } from '@/utils/parseFrontmatter.js'

const rawFiles = import.meta.glob('./articles/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
})

const imageModules = import.meta.glob('@/assets/images/*.{png,jpg,jpeg,webp}', {
  eager: true,
  import: 'default',
})

const imageByName = Object.fromEntries(
  Object.entries(imageModules).map(([path, url]) => [path.split('/').pop(), url]),
)

export const articles = Object.entries(rawFiles)
  .map(([path, raw]) => {
    const { data, content } = parseFrontmatter(raw)
    return {
      slug: path.split('/').pop().replace('.md', ''),
      title: data.title ?? '',
      date: data.date ?? '',
      url: data.url ?? '#',
      excerpt: data.excerpt ?? '',
      image: imageByName[data.image] ?? null,
      content,
    }
  })
  .sort((a, b) => a.slug.localeCompare(b.slug))
