import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)))
const title = process.argv.slice(2).join(' ').trim()
if (!title) {
  console.error('请输入文章标题，例如：npm run new -- "我的第一篇文章"')
  process.exit(1)
}
const date = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Shanghai', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date())
const slug = title.toLowerCase().replace(/[^\p{L}\p{N}-]+/gu, '-').replace(/^-+|-+$/g, '').slice(0, 80) || 'new-post'
const name = `${date}-${slug}.md`
const target = path.join(root, 'docs/posts', name)
const frontmatter = { title, date, category: '随笔', post: true, description: '在这里填写文章简介。' }
const content = '---\n' + Object.entries(frontmatter).map(([key, value]) => `${key}: ${JSON.stringify(value)}`).join('\n') + '\n---\n\n# ' + title + '\n\n<PostMeta />\n\n从这里开始写正文。\n'
await fs.mkdir(path.dirname(target), { recursive: true })
try {
  await fs.writeFile(target, content, { flag: 'wx' })
  console.log(`已创建：docs/posts/${name}`)
} catch (error) {
  if (error.code === 'EEXIST') console.error('同名文章已存在，请直接编辑它，或换一个标题。')
  else console.error(error.message)
  process.exitCode = 1
}
