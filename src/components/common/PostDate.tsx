import { Chip, Skeleton, Stack, Typography } from '@mui/material'
import { FC } from 'react'

type PostDateProps = {
  created?: string
  updated?: string
  showPlaceholder?: boolean
}

export const PostDate: FC<PostDateProps> = ({ created, updated, showPlaceholder }) => {
  if (created && updated) {
    const c = new Date(created).toLocaleString()
    const u = new Date(updated).toLocaleString()
    return (
      <Stack direction="row" spacing={2} sx={{ overflowWrap: 'anywhere' }} overflow="scroll">
        <Chip variant="outlined" size="small" label={`Created: ${c}`} />
        <Chip variant="outlined" size="small" label={`Updated: ${u}`} />
      </Stack>
    )
  } else if (showPlaceholder) {
    return (
      <Typography>
        <Skeleton variant="text" width="50%" />
      </Typography>
    )
  } else {
    return <></>
  }
}
