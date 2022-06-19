import { Stack } from '@mui/material'
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../context/AuthContext'
import { usePost } from '../../hooks/usePage'
import { Breadcrumbs } from '../common/Breadcrumbs'
import { Meta } from '../common/Meta'
import { Editor } from './Editor'
import { EditorHeader } from './EditorHeader'

function EditorPage() {
  const { isAuthenticated } = useAuthContext()
  const { pathname, hash } = useLocation()
  const id = pathname.slice('/edit'.length, pathname.length)
  const { post, isLoading } = usePost(id)
  const isNotFound = () => !isLoading && !post

  const navigate = useNavigate()
  useEffect(() => {
    if (!pathname.startsWith('/edit/')) {
      navigate('/')
    } else if (pathname !== '/edit/' && pathname.endsWith('/')) {
      navigate(pathname.substring(0, pathname.length - 1))
    } else if (!isLoading && !isAuthenticated) {
      navigate('/signin')
    }
  }, [pathname, navigate, isLoading, isAuthenticated])
  return (
    <>
      <Stack spacing={2}>
        <Meta title={post?.title} description={post?.body} />
        <Breadcrumbs path={id} />
        <EditorHeader
          id={id}
          hash={hash}
          created={post?.createdAt}
          updated={post?.updatedAt}
          isLoading={isLoading}
          isNotFound={isNotFound()}
        />
        <Editor id={id} hash={hash} post={post} isLoading={isLoading} />
      </Stack>
    </>
  )
}

export default EditorPage
