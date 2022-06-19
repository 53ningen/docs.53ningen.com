import { Box, Skeleton, Typography } from '@mui/material'
import 'katex/dist/katex.min.css'
import { FC } from 'react'
import ReactMarkdown from 'react-markdown'
import { Link } from 'react-router-dom'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { Tweet } from 'react-twitter-widgets'
import rehypeKatex from 'rehype-katex'
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import { Section } from './Section'

type PostBodyProps = {
  body?: string
}

export const PostBody: FC<PostBodyProps> = ({ body }) => {
  if (body) {
    return (
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeRaw, rehypeKatex]}
        components={{
          h1: ({ node, children }) => <Section node={node}>{children}</Section>,
          h2: ({ node, children }) => <Section node={node}>{children}</Section>,
          h3: ({ node, children }) => <Section node={node}>{children}</Section>,
          h4: ({ node, children }) => <Section node={node}>{children}</Section>,
          h5: ({ node, children }) => <Section node={node}>{children}</Section>,
          h6: ({ node, children }) => <Section node={node}>{children}</Section>,
          p: ({ children }) => (
            <Typography paragraph textAlign="justify" mt={2} mb={4}>
              {children}
            </Typography>
          ),
          ul: ({ children, depth, ...props }) =>
            depth === 0 ? (
              <Box mt={2} mb={4}>
                <ul style={{ paddingLeft: '1em' }}>{children}</ul>
              </Box>
            ) : (
              <ul style={{ paddingLeft: 0, marginLeft: '1em' }}>{children}</ul>
            ),
          li: ({ children }) => (
            <li style={{ textAlign: 'justify' }} key={children.toString()}>
              {children}
            </li>
          ),
          a: ({ children, href, ...props }) =>
            href?.startsWith('/') ? (
              <Link to={href} {...props} children={children} />
            ) : (
              <a href={href} target="_blank" rel="noreferrer" {...props}>
                {children}
              </a>
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
