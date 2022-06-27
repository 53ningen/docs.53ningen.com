import { Box, Paper, Stack } from '@mui/material'
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../context/AuthContext'
import { useLoadingContext } from '../../context/LoadingContext'
import { usePost } from '../../hooks/usePage'
import { Breadcrumbs } from '../common/Breadcrumbs'
import { Meta } from '../common/Meta'
import { Editor } from './Editor'
import { EditorHeader } from './EditorHeader'

function EditorPage() {
  const { isAuthenticated } = useAuthContext()
  const { pathname, hash } = useLocation()
  const { setLoading } = useLoadingContext()
  const path = pathname.slice('/edit'.length, pathname.length)
  const id = path.endsWith('/') && path !== '/' ? path.slice(0, path.length - 1) : path
  const { post, isLoading } = usePost(id)
  const isNotFound = () => !isLoading && !post

  const navigate = useNavigate()
  useEffect(() => {
    setLoading(isLoading)
    if (!pathname.startsWith('/edit/')) {
      navigate('/')
    } else if (pathname !== '/edit/' && pathname.endsWith('/')) {
      navigate(pathname.substring(0, pathname.length - 1))
    } else if (!isLoading && !isAuthenticated) {
      navigate('/signin')
    }
  }, [pathname, navigate, isLoading, isAuthenticated, setLoading])
  return (
    <Paper>
      <Box p={4}>
        <Stack spacing={2}>
          <Meta title={`Editing: ${id}`} description={post?.body} />
          <Breadcrumbs path={id} />
          <EditorHeader
            id={id}
            hash={hash}
            created={post?.createdAt}
            updated={post?.updatedAt}
            isLoading={isLoading}
            isNotFound={isNotFound()}
          />
          <Editor path={id} hash={hash} post={post} isLoading={isLoading} />
        </Stack>
      </Box>
    </Paper>
  )
}

export default EditorPage
