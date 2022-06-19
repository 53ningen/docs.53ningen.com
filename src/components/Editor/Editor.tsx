import { Box, TextField } from '@mui/material'
import { API, graphqlOperation } from 'aws-amplify'
import { Content } from 'mdast'
import { ChangeEvent, FC, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Post } from '../../API'
import { useLoadingContext } from '../../context/LoadingContext'
import { createPost, deletePost, updatePost } from '../../graphql/mutations'
import { DeleteButton } from './DeleteButton'
import { getContents, getMarkdownText, getSectionBody, replaceSection } from './EditorUtils'
import { SaveButton } from './SaveButton'

type EditorProps = {
  id: string
  hash: string
  post?: Post
  isLoading: boolean
}

export const Editor: FC<EditorProps> = ({ id, hash, post, isLoading }) => {
  const deleteConfirmMessage = `Are you sure you want to delete the page: ${post?.id}?`
  const navigate = useNavigate()
  const [titleText, setTitle] = useState('')
  const [bodyText, setBody] = useState('')
  const [contents, setContents] = useState<Content[]>([])
  const { setLoading } = useLoadingContext()

  useEffect(() => {
    setLoading(isLoading)
    if (post) {
      setTitle(post.title)
      if (hash) {
        const cs = getContents(post.body)
        setContents(cs)
        setBody(getSectionBody(hash, cs))
      } else {
        setBody(post.body)
      }
    }
  }, [post, hash, contents, setLoading, isLoading])

  const onChangeBody = (e: ChangeEvent<HTMLTextAreaElement>) => setBody(e.target.value)
  const onChangeTitle = (e: ChangeEvent<HTMLTextAreaElement>) => setTitle(e.target.value)
  const onClickDelete = async () => {
    if (post) {
      try {
        setLoading(true)
        const res = await API.graphql(graphqlOperation(deletePost, { input: { id: post.id } }))
        if ('data' in res && res.data) {
          navigate('/')
          return
        }
      } finally {
        setLoading(false)
      }
    } else {
      return
    }
  }
  const onClickSave = async () => {
    if (isLoading) return
    const query = post ? updatePost : createPost
    const body = post && hash ? getMarkdownText(replaceSection(hash, bodyText, contents)) : bodyText
    try {
      setLoading(true)
      const res = await API.graphql(
        graphqlOperation(query, {
          input: { id, title: titleText, body },
        })
      )
      if ('data' in res && res.data) {
        const id: string = post ? res.data.updatePost.id : res.data.createPost.id
        navigate(id)
        return
      }
    } finally {
      setLoading(false)
    }
    return
  }
  return (
    <>
      <TextField
        disabled={isLoading}
        label="Title"
        fullWidth
        autoComplete="off"
        value={titleText}
        onChange={onChangeTitle}
      />
      <TextField
        disabled={isLoading}
        label="Body"
        multiline
        rows={30}
        autoComplete="off"
        fullWidth
        value={bodyText}
        onChange={onChangeBody}
      />
      <Box display="flex">
        <DeleteButton confirmMessage={deleteConfirmMessage} disabled={!post} onClick={onClickDelete} />
        <SaveButton onClick={onClickSave} disabled={isLoading} sx={{ marginLeft: 'auto' }} />
      </Box>
    </>
  )
}
