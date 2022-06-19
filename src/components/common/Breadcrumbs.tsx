import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import { Breadcrumbs as MuiBreadcrumbs, Skeleton } from '@mui/material'
import Stack from '@mui/material/Stack'
import * as React from 'react'
import { Link } from 'react-router-dom'

type BreadcrumbsProps = {
  path?: string
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ path }) => {
  if (path) {
    const items = path.split('/')
    const elements = items.map((v, i) => (
      <Link key={i} to={i === 0 ? '/' : `${items.slice(0, i + 1).join('/')}`}>
        {i === 0 ? '🏠' : decodeURI(items[i])}
      </Link>
    ))
    return (
      <Stack spacing={2}>
        <MuiBreadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
          {elements}
        </MuiBreadcrumbs>
      </Stack>
    )
  } else {
    return <Skeleton variant="text" width="40%" />
  }
}
