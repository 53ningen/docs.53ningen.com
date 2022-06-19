import { Skeleton, Typography } from '@mui/material'
import { FC } from 'react'

type PostTitleProps = {
  title?: string
}

export const PostTitle: FC<PostTitleProps> = ({ title }) => {
  if (title) {
    return (
      <Typography variant="h1" color={title === '' ? 'GrayText' : 'inherit'}>
        {title === '' ? 'Untiltled' : title}
      </Typography>
    )
  } else {
    return (
      <Typography variant="h1" color={title === '' ? 'GrayText' : 'inherit'}>
        <Skeleton variant="text" width="40%" />
      </Typography>
    )
  }
}
