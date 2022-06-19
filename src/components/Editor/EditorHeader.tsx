import { Skeleton, Stack, Typography } from '@mui/material'
import { FC } from 'react'
import { PostDate } from '../common/PostDate'

type EditorHeaderProps = {
  id: string
  created?: string
  updated?: string
  hash?: string
  isLoading: boolean
  isNotFound: boolean
}

export const EditorHeader: FC<EditorHeaderProps> = ({
  id,
  created,
  updated,
  hash,
  isLoading,
  isNotFound,
}) => {
  if (isLoading) {
    return (
      <Typography variant="h1">
        <Skeleton variant="text" width="50%" />
      </Typography>
    )
  } else {
    return (
      <Stack spacing={2}>
        <Typography variant="h1">
          {`${isNotFound ? 'Creating' : 'Editing'}: ${decodeURI(id)}${
            hash ?? ''
          }`}
        </Typography>
        <PostDate created={created} updated={updated} />
      </Stack>
    )
  }
}
