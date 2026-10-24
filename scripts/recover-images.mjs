import fs from 'node:fs/promises'
import path from 'node:path'
import { createHash } from 'node:crypto'
import { fileURLToPath } from 'node:url'
const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)))
const entries = JSON.parse(await fs.readFile(path.join(root, 'migration/images.json'), 'utf8'))
const unique = [...new Map(entries.map(item => [item.source, item])).values()]
const results = []
await fs.mkdir(path.join(root, 'docs/public/images/legacy'), { recursive: true })
let cursor = 0
async function worker() {
  while (cursor < unique.length) {
    const item = unique[cursor++]
    const result = { ...item, status: 'unavailable', attempts: [] }
    const sourceUrl = new URL(item.source);
    const alternate = new URL(item.source);
    alternate.hostname = 'r.photo.store.qq.com'; alternate.protocol = 'https:';
    const candidates = [item.source.replace(/^http:/, 'https:'), item.source];
    if (sourceUrl.hostname === 'a1.qpic.cn') candidates.push(alternate.href);
    for (const url of candidates) {
      try {
        const response = await fetch(url, { signal: AbortSignal.timeout(6000) })
        const type = response.headers.get('content-type') || ''
        const body = Buffer.from(await response.arrayBuffer())
        const image = body.subarray(0, 3).equals(Buffer.from([255,216,255])) || body.subarray(0,4).equals(Buffer.from([137,80,78,71])) || body.subarray(0,3).toString() === 'GIF' || (body.subarray(0,4).toString() === 'RIFF' && body.subarray(8,12).toString() === 'WEBP')
        if (createHash('sha256').update(body).digest('hex') === 'dd710f3030adc9dc7f43c1d1e30b2d9c1c95566d2ef3c0b7f684065ca6843207') throw Error('QQ hotlink placeholder, not the original image');
        if (!response.ok || !type.startsWith('image/') || !image) throw Error(`HTTP ${response.status}; ${type}; not a recoverable image`)
        const extension = type.includes('png') ? 'png' : type.includes('gif') ? 'gif' : type.includes('webp') ? 'webp' : 'jpg'
        const filename = `legacy-${String(item.number).padStart(2, '0')}.${extension}`
        await fs.writeFile(path.join(root, 'docs/public/images/legacy', filename), body)
        result.status = 'saved'; result.local = '/images/legacy/' + filename; result.bytes = body.length
        break
      } catch (error) { result.attempts.push({ url, reason: error.message }) }
    }
    results.push(result)
  }
}
await Promise.all(Array.from({ length: 8 }, worker))
results.sort((a,b) => a.number - b.number)
await fs.writeFile(path.join(root, 'migration/image-report.json'), JSON.stringify(results, null, 2))
const postPath = path.join(root, 'docs/2022/10/27/模拟电子技术基础笔记（一）/index.md')
let markdown = await fs.readFile(postPath, 'utf8')
const escape = value => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
for (const result of results.filter(item => item.status === 'saved')) {
  markdown = markdown.replaceAll(`src="${escape(result.source)}"`, `src="${result.local}"`)
}
await fs.writeFile(postPath, markdown)
console.log(JSON.stringify({ imageReferences: entries.length, uniqueImages: unique.length, saved: results.filter(item => item.status === 'saved').length, unavailable: results.filter(item => item.status !== 'saved').length }))


