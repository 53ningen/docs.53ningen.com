import { Box, Chip, Skeleton, Typography } from '@mui/material'
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
      <Box>
        <Chip variant="outlined" size="small" label={`Created: ${c}`} />{' '}
        <Chip variant="outlined" size="small" label={`Updated: ${u}`} />
      </Box>
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
