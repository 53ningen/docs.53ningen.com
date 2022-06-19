import * as React from 'react'
import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom'

export const Link = React.forwardRef<any, Omit<RouterLinkProps, 'to'> & { href: RouterLinkProps['to'] }>(
  (props, ref) => {
    const { href, ...other } = props
    return <RouterLink ref={ref} to={href} {...other} style={{ textDecoration: 'none' }} />
  }
)
