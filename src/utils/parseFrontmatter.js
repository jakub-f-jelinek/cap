/**
 * Minimal YAML-frontmatter parser for the small, flat key: value
 * blocks used by our article content. Deliberately not a full YAML
 * parser — just enough so articles can be authored/edited as plain
 * Markdown files without a build-time dependency.
 */
export function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/)
  if (!match) {
    return { data: {}, content: raw.trim() }
  }

  const [, frontmatter, content] = match
  const data = {}

  frontmatter.split(/\r?\n/).forEach((line) => {
    if (!line.trim()) return
    const separatorIndex = line.indexOf(':')
    if (separatorIndex === -1) return
    const key = line.slice(0, separatorIndex).trim()
    let value = line.slice(separatorIndex + 1).trim()
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1)
    }
    data[key] = value
  })

  return { data, content: content.trim() }
}
