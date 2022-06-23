import { Content } from 'mdast'
import { remark } from 'remark'

type SectionIndex = [number, number, number, number, number, number]

export const getSectionBody = (hash: string, body: string) => {
  const contents = remark().parse(body).children
  const { start, end } = getSectionPosition(hash, contents)
  if (start < 0 || end < 0) {
    throw Error(`Could not find the section: ${hash}`)
  }
  return body.substring(start, end)
}

export const replaceSection = (hash: string, section: string, body: string) => {
  const contents = remark().parse(body).children
  const { start, end } = getSectionPosition(hash, contents)
  if (start < 0 || end < 0) {
    throw Error(`Could not find the section: ${hash}`)
  }
  const head = body.slice(0, start)
  const foot = body.slice(end, body.length)
  return head + section + foot
}

const getSectionPosition = (hash: string, contents: Content[]) => {
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
        start = e.position.start.offset!
        targetDepth = e.depth
      } else if (start >= 0 && e.depth.valueOf() <= targetDepth) {
        end = e.position.start.offset! - 1
        break
      }
    }
  }
  if (start >= 0 && end < 0) {
    end = contents[contents.length - 1].position!.end.offset!
  }
  return { start, end }
}
