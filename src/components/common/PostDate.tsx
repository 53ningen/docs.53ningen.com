import { Box, Chip, Skeleton, Typography } from '@mui/material'
import { FC } from 'react'

type PostDateProps = {
  created?: string
  updated?: string
  showPlaceholder?: boolean
}

export const PostDate: FC<PostDateProps> = ({ created, updated, showPlaceholder }) => {
  if (created && updated) {
    const c = getDateTime(new Date(created))
    const u = getDateTime(new Date(updated))
    return (
      <Box>
        <Chip variant="outlined" size="small" label={`📝 ${c}`} />{' '}
        <Chip variant="outlined" size="small" label={`🔄 ${u}`} />
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

const getDateTime = (d: Date) => {
  const hh = d.getHours().toLocaleString(undefined, { minimumIntegerDigits: 2 })
  const mm = d.getHours().toLocaleString(undefined, { minimumIntegerDigits: 2 })
  return `${d.toLocaleDateString()} ${hh}:${mm}`
}
