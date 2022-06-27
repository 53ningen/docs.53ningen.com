import { Skeleton, Stack, Typography } from '@mui/material'
import { API, graphqlOperation } from 'aws-amplify'
import { useEffect, useState } from 'react'
import { Post } from '../../API'
import { listPostsOrderByUpdatedAt } from '../../graphql/queries'
import { Link } from './Link'

export const RecentUpdates = () => {
  const [posts, setPosts] = useState<Post[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<any>()
  useEffect(() => {
    setIsLoading(true)
    const fetchPosts = async () => {
      try {
        const res = await API.graphql(
          graphqlOperation(listPostsOrderByUpdatedAt, {
            type: 'Post',
            sortDirection: 'DESC',
            limit: 10,
          })
        )
        if ('data' in res && res.data.listPostsOrderByUpdatedAt && res.data.listPostsOrderByUpdatedAt.items) {
          setPosts(res.data.listPostsOrderByUpdatedAt.items as Post[])
          return
        } else if ('data' in res && res.data.getPost === null) {
          setPosts([])
        }
        throw Error('invalid response')
      } catch (e: any) {
        if (e instanceof Error) {
          setError(new Error(`failed to fetch posts: ${e.message}`))
        } else if ('errors' in e && e.errors && e.errors[0]) {
          setError(new Error(`failed to fetch posts: ${e.errors[0].message}`))
        } else {
          setError(new Error(`unknown error occurred while fething posts`))
        }
      } finally {
        setIsLoading(false)
      }
    }
    fetchPosts()
  }, [])
  if (!isLoading && posts && posts.length > 0) {
    return (
      <Stack spacing={1}>
        <Typography variant="h2" pb={2}>
          Recent Updates
        </Typography>
        {posts.map((p) => (
          <Link href={p.id} key={p.id}>
            {p.title}
          </Link>
        ))}
      </Stack>
    )
  }
  if (!isLoading && error) {
    return <></>
  } else {
    return (
      <Stack>
        <Typography variant="h2">
          <Skeleton />
        </Typography>
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
      </Stack>
    )
  }
}
