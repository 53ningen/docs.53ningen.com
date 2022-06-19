import { Stack } from '@mui/material'
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Constants } from '../../Constants'
import { useLoadingContext } from '../../context/LoadingContext'
import { usePost } from '../../hooks/usePage'
import { Breadcrumbs } from '../common/Breadcrumbs'
import { Footer } from '../common/Footer'
import { Meta } from '../common/Meta'
import { ShareButtons } from '../common/ShareButtons'
import { SignInOutButton } from '../common/SignInOutButton'
import { PostBody } from './PostBody'
import { PostHeader } from './PostHeader'

function PostPage() {
  const { pathname: id } = useLocation()
  const { post, isLoading } = usePost(id)
  const { setLoading } = useLoadingContext()
  const { siteTitle, siteUrl } = Constants
  const shareTitle = id === '/' ? siteTitle : `${post?.title} | ${siteTitle}`
  const shareUrl = id === '/' ? siteUrl : `${siteUrl}${id}`

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
        <Meta title={shareTitle} description={post?.body} />
        <Stack direction="row" flex="flow">
          <Breadcrumbs path={post?.id} />
          <SignInOutButton sx={{ marginLeft: 'auto' }} />
        </Stack>
        <PostHeader post={post} />
        <PostBody body={post?.body} />
        <Stack direction="row" spacing={2} pt={8}>
          <ShareButtons url={shareUrl} title={shareTitle} size={24} />
        </Stack>
        <Footer />
      </Stack>
    </>
  )
}

export default PostPage
