import { createContentLoader } from 'vitepress'

export default createContentLoader(['2022/**/*.md', 'posts/**/*.md'], {
  transform(rawData) {
    return rawData.filter(page => page.frontmatter.post === true).map(({ url, frontmatter }) => ({
      url,
      title: frontmatter.title || '无标题',
      date: String(frontmatter.date || '').slice(0, 10),
      category: frontmatter.category || '随笔',
      description: frontmatter.description || ''
    })).sort((a, b) => b.date.localeCompare(a.date))
  }
})
