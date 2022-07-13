import * as React from 'react'
import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom'
import { useAuthContext } from '../../context/AuthContext'

export const Link = React.forwardRef<any, Omit<RouterLinkProps, 'to'> & { href: RouterLinkProps['to'] }>(
  (props, ref) => {
    const { isAuthenticated } = useAuthContext()
    const { href, children, ...other } = props
    const isPrivate = href.toString() === '/private' || href.toString().startsWith('/private/')
    const disabled = isPrivate && !isAuthenticated
    if (disabled) {
      return (
        <a href={href.toString()} ref={ref} {...other} style={{ textDecoration: 'none', pointerEvents: 'none' }}>
          {children}
        </a>
      )
    }
    return (
      <RouterLink ref={ref} to={href} {...other} style={{ textDecoration: 'none' }}>
        {children}
      </RouterLink>
    )
  }
)
