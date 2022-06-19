import { Box, Stack } from '@mui/material'
import { FC } from 'react'
import { Post } from '../../API'
import { PostDate } from '../common/PostDate'
import { PostTitle } from './PostTitle'
import { SectionButtons } from './SesctionButtons'

type PostHeaderProps = {
  post?: Post
}

export const PostHeader: FC<PostHeaderProps> = ({ post }) => {
  if (post) {
    const url = window.location.href
    return (
      <Stack spacing={2}>
        <Stack flex="flow" direction="row">
          <Box marginRight="auto">
            <PostTitle title={post.title} />
          </Box>
          <SectionButtons editUrl={`/edit${post.id}`} copyUrl={url} />
        </Stack>
        <PostDate created={post.createdAt} updated={post.updatedAt} />
      </Stack>
    )
  } else {
    return (
      <Stack spacing={2}>
        <PostTitle />
        <PostDate showPlaceholder />
      </Stack>
    )
  }
}
