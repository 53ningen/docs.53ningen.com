import { Box, Drawer, Paper, Stack, Toolbar } from '@mui/material'
import { FC, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Constants } from '../../Constants'
import { useLoadingContext } from '../../context/LoadingContext'
import { usePost } from '../../hooks/usePage'
import { Breadcrumbs } from '../common/Breadcrumbs'
import { Footer } from '../common/Footer'
import { Meta } from '../common/Meta'
import { RecentUpdates } from '../common/RecentUpdates'
import { ShareButtons } from '../common/ShareButtons'
import { SignInOutButton } from '../common/SignInOutButton'
import { TOC } from '../common/TOC'
import { PostBody } from './PostBody'
import { PostHeader } from './PostHeader'

const drawerWidth = 300

const PostPage: FC = () => {
  const { pathname } = useLocation()
  const id = pathname.endsWith('/') && pathname !== '/' ? pathname.slice(0, pathname.length - 1) : pathname

  const { post, isLoading, isNotFound, error } = usePost(id)
  const { setLoading } = useLoadingContext()
  const { siteTitle, siteUrl } = Constants
  const shareTitle = id === '/' ? siteTitle : `${post?.title} | ${siteTitle}`
  const shareUrl = id === '/' ? siteUrl : `${siteUrl}${id}`

  const navigate = useNavigate()
  useEffect(() => {
    setLoading(isLoading)
    if (!isLoading && isNotFound) {
      navigate(`/edit${id}`)
    } else if (!isLoading && error) {
      navigate(`/`)
    }
  }, [post, isLoading, id, navigate, setLoading, isNotFound, error])

  const [mobileOpen, setMobileOpen] = useState(false)
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }
  const container = window !== undefined ? () => document.body : undefined
  const drawer = (
    <>
      <Toolbar />
      <Stack spacing={4}>
        <TOC body={post?.body} depth={3} />
        <RecentUpdates />
        <SignInOutButton />
      </Stack>
    </>
  )
  return (
    <Box sx={{ display: 'flex' }}>
      <Meta title={shareTitle} description={post?.body} />
      <Box sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}>
          <Box p={2}>{drawer}</Box>
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'none', md: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              right: '12%',
            },
          }}
          open>
          <Box p={2}>{drawer}</Box>
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, width: { md: '80%', sm: `calc(100% - ${drawerWidth}px)`, xs: '100%' } }}
        minHeight="100%">
        <Paper square variant="outlined">
          <Box p={4}>
            <Stack spacing={2}>
              <Breadcrumbs path={post?.id} />
              <PostHeader post={post} />
              <PostBody body={post?.body} />
              <Stack direction="row" spacing={2} pt={8}>
                <ShareButtons url={shareUrl} title={shareTitle} size={24} />
              </Stack>
              <Footer />
            </Stack>
          </Box>
        </Paper>
      </Box>
    </Box>
  )
}

export default PostPage
