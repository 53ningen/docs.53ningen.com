import { Stack, styled, Typography } from '@mui/material'
import md5 from 'md5'
import { FC } from 'react'
import { Element } from 'react-markdown/lib/ast-to-react'
import { SectionButtons } from './SesctionButtons'

type SectionProps = {
  children: React.ReactNode & React.ReactNode[]
  node: Element
}

export const Section: FC<SectionProps> = ({ children, node }) => {
  const { tagName } = node
  if (
    tagName !== 'h1' &&
    tagName !== 'h2' &&
    tagName !== 'h3' &&
    tagName !== 'h4' &&
    tagName !== 'h5' &&
    tagName !== 'h6'
  ) {
    throw new Error('Unexpected Error')
  }
  const startLine = node.position?.start.line
  const startColumn = node.position?.start.column
  const endLine = node.position?.end.line
  const endColumn = node.position?.end.column
  const sectionPosition = `${startLine},${startColumn},${endLine},${endColumn}`
  const id = md5(node.tagName + children[0]).slice(0, 6)
  const { protocol, host, pathname } = window.location
  const copyUrl = `${protocol}//${host}${pathname}#${id}`
  const A = styled('a')({
    textDecoration: 'none',
    color: 'inherit',
  })
  return (
    <Stack
      direction="row"
      display="flex"
      pt={1}
      pb={1}
      borderBottom={tagName === 'h1' ? 1 : 0}
      borderColor="silver"
      mb={tagName === 'h1' ? 2 : 0}>
      <Typography id={id} variant={tagName} sx={{ marginRight: 'auto' }}>
        <A className="headers" href={`#${id}`}>
          {children}
        </A>
      </Typography>
      <SectionButtons copyUrl={`${copyUrl}`} editUrl={`/edit${pathname}#${sectionPosition}`} />
    </Stack>
  )
}
