import { Skeleton, Stack, styled, Typography } from '@mui/material'
import md5 from 'md5'
import { Heading } from 'mdast'
import { FC } from 'react'
import { remark } from 'remark'

type TOCProps = {
  body?: string
  depth: 1 | 2 | 3 | 4 | 5 | 6
}

type SectionIndex = [number, number, number, number, number, number]

type Content = {
  id: string
  sectionIndex: SectionIndex
  hash: string
  label: string
  depth: number
}

export const TOC: FC<TOCProps> = ({ body, depth: tocDepth }) => {
  if (!body) {
    return (
      <Stack spacing={1}>
        <Typography variant="h2" pb={2}>
          <Skeleton />
        </Typography>
        <Typography>
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </Typography>
      </Stack>
    )
  }
  const p = remark().parse(body)
  const items = p.children.filter((v) => v.type === 'heading' && v.depth <= tocDepth) as Heading[]
  const contents: Content[] = []
  var sectionIndex: SectionIndex = [0, 0, 0, 0, 0, 0]
  for (const item of items) {
    sectionIndex = sectionIndex.map((n, i) => {
      if (i === item.depth - 1) {
        return n + 1
      } else if (i >= item.depth) {
        return 0
      } else {
        return n
      }
    }) as SectionIndex
    const startLine = item.position?.start.line ?? ''
    const startColumn = item.position?.start.column ?? ''
    const endLine = item.position?.end.line ?? ''
    const endColumn = item.position?.end.column ?? ''
    const hash = `#${startLine},${startColumn},${endLine},${endColumn}`
    const label = item.children.flatMap((c) => (c.type === 'text' ? c.value : '')).join()
    const id = md5(`h${item.depth}` + label).slice(0, 6)
    contents.push({
      id,
      sectionIndex,
      hash,
      label,
      depth: item.depth,
    })
  }
  return (
    <Stack spacing={1}>
      <Typography variant="h2" pb={2}>
        Contents
      </Typography>
      {contents.map((v, i) => (
        <Typography pl={v.depth - 1} key={i.toString()}>
          <A href={`#${v.id}`}>
            {v.sectionIndex.slice(0, v.depth).join('.')}. {v.label}
          </A>
        </Typography>
      ))}
    </Stack>
  )
}

const A = styled('a')({
  textDecoration: 'none',
})
