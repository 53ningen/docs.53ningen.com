import { Box, Button, Container, Paper, Stack, TextField, Typography } from '@mui/material'
import { ChangeEventHandler, FormEventHandler, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Constants } from '../../Constants'
import { useAuthContext } from '../../context/AuthContext'
import { Breadcrumbs } from '../common/Breadcrumbs'
import { Meta } from '../common/Meta'

export const SignInPage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { isAuthenticated, signIn } = useAuthContext()
  const { siteUrl } = Constants

  const navigate = useNavigate()
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/')
    }
  }, [isAuthenticated, navigate])

  const onUsernameChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setUsername(e.target.value)
  }
  const onPasswordChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setPassword(e.target.value)
  }
  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    await signIn(username, password)
  }
  return (
    <Container maxWidth="sm">
      <Paper>
        <Box p={4}>
          <Meta title={`Sign into ${siteUrl}`} description="Sign in page" />
          <Stack spacing={4} textAlign="center">
            <Breadcrumbs path="/signin" />
            <Typography variant="h1">Sign into docs.53ningen.com</Typography>
            <form onSubmit={onSubmit}>
              <Stack spacing={4}>
                <TextField id="username" label="Username" defaultValue="" onChange={onUsernameChange} />
                <TextField
                  id="password"
                  label="Password"
                  type="password"
                  autoComplete="current-password"
                  onChange={onPasswordChange}
                />
                <Stack direction="row" flex="flow">
                  <Button type="submit" variant="contained" sx={{ marginLeft: 'auto' }}>
                    Sign in
                  </Button>
                </Stack>
              </Stack>
            </form>
          </Stack>
        </Box>
      </Paper>
    </Container>
  )
}
