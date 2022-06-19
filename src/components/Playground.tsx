import { TextField } from '@mui/material'
import { useAuthContext } from '../context/AuthContext'
import { usePost } from '../hooks/usePage'

export const Playground = () => {
  const id = '/'
  const { isLoading } = usePost(id)
  const { isAuthenticated } = useAuthContext()

  console.log(`isLoading: ${isLoading}`)
  console.log(`isAuthenticated: ${isAuthenticated}`)
  return (
    <>
      <TextField />
    </>
  )
}
