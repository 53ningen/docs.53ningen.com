import { Button, SxProps, Theme } from '@mui/material'
import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../context/AuthContext'

type SignInOutButtonProps = {
  sx?: SxProps<Theme>
}

export const SignInOutButton: FC<SignInOutButtonProps> = ({ sx }) => {
  const { isAuthenticated, signOut } = useAuthContext()
  const navigate = useNavigate()
  const onClick = async () => {
    if (isAuthenticated) {
      await signOut()
    } else {
      navigate('/signin')
    }
  }
  return (
    <Button onClick={onClick} variant={isAuthenticated ? 'contained' : 'outlined'} sx={sx} size="small">
      {isAuthenticated ? 'Sign Out' : 'Sign In'}
    </Button>
  )
}
