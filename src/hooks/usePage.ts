import { API, Auth, graphqlOperation } from 'aws-amplify'
import { useEffect, useState } from 'react'
import { Post } from '../API'
import { getPost, getPrivatePost } from '../graphql/queries'

export const usePost = (path: string) => {
  const [post, setPost] = useState<Post>()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isNotFound, setIsNotFound] = useState<boolean>(false)
  const [error, setError] = useState<any>()

  const id = path.endsWith('/') && path !== '/' ? path.slice(0, path.length - 1) : path
  useEffect(() => {
    setIsLoading(true)
    const fetchPost = async () => {
      try {
        const res = await API.graphql(graphqlOperation(getPost, { id }))
        if ('data' in res && res.data.getPost) {
          setPost(res.data.getPost as Post)
          return
        } else if ('errors' in res) {
          throw Error('invalid response')
        } else if ('data' in res && res.data.getPost === null) {
          setPost(undefined)
          setIsNotFound(true)
          return
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
    const fetchPrivatePost = async () => {
      try {
        const session = await Auth.currentSession()
        const token = session.getIdToken().getJwtToken()
        const res = await API.graphql(graphqlOperation(getPrivatePost, { id }, token))
        if ('data' in res && res.data.getPrivatePost) {
          setPost(res.data.getPrivatePost as Post)
          return
        } else if ('data' in res && res.data.getPrivatePost === null) {
          setPost(undefined)
          setIsNotFound(true)
        }
        throw Error('invalid response')
      } catch (e: any) {
        if (e instanceof Error) {
          setError(new Error(`failed to fetch a private post: "${id}", ${e.message}`))
        } else if ('errors' in e && e.errors && e.errors[0]) {
          setError(new Error(`failed to fetch a private post: "${id}", ${e.errors[0].message}`))
        } else {
          setError(new Error(`unknown error occurred while fething a private post: "${id}"`))
        }
      } finally {
        setIsLoading(false)
      }
    }
    const isPrivate = id === '/private' || id.startsWith('/private/')
    if (isPrivate) {
      fetchPrivatePost()
    } else {
      fetchPost()
    }
  }, [id])
  return { post, isLoading, error, isNotFound }
}
