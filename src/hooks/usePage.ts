import { API, graphqlOperation } from 'aws-amplify'
import { useEffect, useState } from 'react'
import { Post } from '../API'
import { getPost } from '../graphql/queries'

export const usePost = (id: string) => {
  const [post, setPost] = useState<Post>()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<any>()
  useEffect(() => {
    setIsLoading(true)
    const fetchPost = async () => {
      try {
        const res = await API.graphql(graphqlOperation(getPost, { id }))
        if ('data' in res && res.data.getPost) {
          setPost(res.data.getPost as Post)
          return
        } else if ('data' in res && res.data.getPost === null) {
          setPost(undefined)
        }
        throw Error('invalid response')
      } catch (e: any) {
        if (e instanceof Error) {
          setError(new Error(`failed to fetch a post: "${id}", ${e.message}`))
        } else if ('errors' in e && e.errors && e.errors[0]) {
          setError(new Error(`failed to fetch a post: "${id}", ${e.errors[0].message}`))
        } else {
          setError(new Error(`unknown error occurred while fething a post: "${id}"`))
        }
      } finally {
        setIsLoading(false)
      }
    }
    fetchPost()
  }, [id])
  return { post, isLoading, error }
}
