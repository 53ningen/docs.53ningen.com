import PublicIcon from '@mui/icons-material/Public'
import { Box, Skeleton, Stack, Typography } from '@mui/material'
import 'katex/dist/katex.min.css'
import { FC } from 'react'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { Tweet } from 'react-twitter-widgets'
import rehypeKatex from 'rehype-katex'
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import { Link } from '../common/Link'
import { Section } from './Section'

type PostBodyProps = {
  body?: string
}

export const PostBody: FC<PostBodyProps> = ({ body }) => {
  if (body) {
    return (
      <Stack>
        <ReactMarkdown
          remarkPlugins={[remarkGfm, remarkMath]}
          rehypePlugins={[rehypeRaw, rehypeKatex]}
          components={{
            blockquote: ({ children }) => <blockquote style={{ marginLeft: 0 }}>{children}</blockquote>,
            h1: ({ node, children }) => <Section node={node}>{children}</Section>,
            h2: ({ node, children }) => <Section node={node}>{children}</Section>,
            h3: ({ node, children }) => <Section node={node}>{children}</Section>,
            h4: ({ node, children }) => <Section node={node}>{children}</Section>,
            h5: ({ node, children }) => <Section node={node}>{children}</Section>,
            h6: ({ node, children }) => <Section node={node}>{children}</Section>,
            p: ({ children }) => (
              <Typography paragraph textAlign="justify" pb={2}>
                {children}
              </Typography>
            ),
            img: ({ alt, ...props }) => <img alt={alt} {...props} style={{ maxWidth: '100%' }} />,
            ul: ({ children, depth, ...props }) =>
              depth === 0 ? (
                <Box mb={1}>
                  <ul style={{ marginTop: 0, paddingTop: 0, paddingLeft: '1em' }} {...props}>
                    {children}
                  </ul>
                </Box>
              ) : (
                <ul style={{ marginTop: 0, paddingTop: 0, paddingLeft: 0, marginLeft: '1em' }}>{children}</ul>
              ),
            ol: ({ children, depth, ...props }) =>
              depth === 0 ? (
                <Box mb={1}>
                  <ol style={{ paddingLeft: '1em' }}>{children}</ol>
                </Box>
              ) : (
                <ol style={{ paddingLeft: 0, marginLeft: '1em' }} {...props}>
                  {children}
                </ol>
              ),
            li: ({ children, ...props }) => (
              <li style={{ textAlign: 'justify' }} key={children.toString()} {...props}>
                {children}
              </li>
            ),
            a: ({ children, href, ...props }) =>
              href?.startsWith('/') || href?.startsWith('#') ? (
                <Link href={href} {...props} children={children} />
              ) : (
                <>
                  <a href={href ?? '/'} target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }} {...props}>
                    {children}
                  </a>{' '}
                  <PublicIcon fontSize="inherit" color="action" sx={{ verticalAlign: 'middle' }} />
                </>
              ),
            code({ inline, className, children }) {
              const match = /language-(\w+)/.exec(className || '')
              if (className === 'language-twitter') {
                return <Tweet tweetId={String(children).replace(/\n$/, '')} />
              }
              return !inline ? (
                <Box mb={4}>
                  <SyntaxHighlighter
                    children={String(children).replace(/\n$/, '')}
                    language={match ? match[1] : undefined}
                    PreTag="div"
                  />
                </Box>
              ) : (
                <strong style={{ color: '#777' }}>{children}</strong>
              )
            },
          }}>
          {body}
        </ReactMarkdown>
      </Stack>
    )
  } else {
    const Placeholder = (
      <Typography paragraph>
        <Skeleton variant="text" />
        <Skeleton variant="text" />
        <Skeleton variant="text" width="60%" />
      </Typography>
    )
    return (
      <>
        {Placeholder}
        {Placeholder}
        {Placeholder}
        {Placeholder}
        {Placeholder}
        {Placeholder}
      </>
    )
  }
}
