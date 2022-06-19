import { Stack } from '@mui/material'
import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { useLocation, useNavigate } from 'react-router-dom'
import { useLoadingContext } from '../../context/LoadingContext'
import { usePost } from '../../hooks/usePage'
import { Breadcrumbs } from '../common/Breadcrumbs'
import { ShareButtons } from '../common/ShareButtons'
import { SignInOutButton } from '../common/SignInOutButton'
import { PostBody } from './PostBody'
import { PostHeader } from './PostHeader'

function PostPage() {
  const { pathname: id } = useLocation()
  const { post, isLoading } = usePost(id)
  const { setLoading } = useLoadingContext()

  const navigate = useNavigate()
  useEffect(() => {
    setLoading(isLoading)
    if (id !== '/' && id.endsWith('/')) {
      navigate(id.substring(0, id.length - 1))
    } else if (!isLoading && !post) {
      navigate(`/edit${id}`)
    }
  }, [post, isLoading, id, navigate, setLoading])
  return (
    <>
      <Stack spacing={2}>
        <Helmet>
          <title>{post?.title}</title>
        </Helmet>
        <Stack direction="row" flex="flow">
          <Breadcrumbs path={post?.id} />
          <SignInOutButton sx={{ marginLeft: 'auto' }} />
        </Stack>
        <PostHeader post={post} />
        <PostBody body={post?.body} />
        <Stack direction="row" spacing={2}>
          <ShareButtons url="https://docs.53ningen.com" title="Test" size={24} />
        </Stack>
      </Stack>
    </>
  )
}

export default PostPage
