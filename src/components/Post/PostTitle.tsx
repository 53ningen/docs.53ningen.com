import LockIcon from '@mui/icons-material/Lock'
import { Skeleton, Typography } from '@mui/material'
import { FC } from 'react'

type PostTitleProps = {
  title?: string
  isPrivate: boolean
}

export const PostTitle: FC<PostTitleProps> = ({ title, isPrivate }) => {
  if (title) {
    return (
      <Typography variant="h1" color={title === '' ? 'GrayText' : 'inherit'}>
        {isPrivate ? (
          <>
            <LockIcon fontSize="inherit" />{' '}
          </>
        ) : (
          <></>
        )}
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
