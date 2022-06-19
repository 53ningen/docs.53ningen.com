import { Content } from 'mdast'
import { remark } from 'remark'

type SectionIndex = [number, number, number, number, number, number]

export const getContents = (body: string) => remark().parse(body).children

export const getMarkdownText = (contents: Content[]) => remark().stringify({ type: 'root', children: contents })

export const getSectionBody = (hash: string, contents: Content[]) => {
  const { start, end } = getSectionIndexRange(hash, contents)
  if (start < 0 || end < 0) {
    throw Error(`Could not find the section: ${hash}`)
  }
  const es = contents.slice(start, end >= 0 ? end : contents.length)
  return remark().stringify({ type: 'root', children: es })
}

export const replaceSection = (hash: string, section: string, contents: Content[]) => {
  const cs = contents.slice()
  const { start, end } = getSectionIndexRange(hash, cs)
  if (start < 0 || end < 0) {
    throw Error(`Could not find the section: ${hash}`)
  }
  const r = remark().parse(section)
  cs.splice(start, end - start, ...r.children)
  return cs
}

const getSectionIndexRange = (hash: string, contents: Content[]) => {
  var indexCounter = [0, 0, 0, 0, 0, 0] as SectionIndex
  var [start, end, targetDepth] = [-1, -1, -1]
  for (var i = 0; i < contents.length; i++) {
    const e = contents[i]
    if (e.type === 'heading' && e.position) {
      const sl = e.position.start.line.toString()
      const sc = e.position.start.column.toString()
      const el = e.position.end.line.toString()
      const ec = e.position.end.column.toString()
      const h = `#${[sl, sc, el, ec].toString()}`

      indexCounter.fill(0, e.depth, 6)
      indexCounter[e.depth - 1]++
      if (h === hash) {
        start = i
        targetDepth = e.depth
      } else if (start >= 0 && e.depth.valueOf() <= targetDepth) {
        end = i
        break
      }
    }
  }
  if (start >= 0 && end < 0) {
    end = contents.length
  }
  return { start, end }
}
