import { Box, TextField, Typography } from '@mui/material'
import { API, Auth, graphqlOperation, Storage } from 'aws-amplify'
import { ChangeEvent, FC, SyntheticEvent, useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import { Post } from '../../API'
import { useLoadingContext } from '../../context/LoadingContext'
import {
  createPost,
  createPrivatePost,
  deletePost,
  deletePrivatePost,
  updatePost,
  updatePrivatePost,
} from '../../graphql/mutations'
import { DeleteButton } from './DeleteButton'
import { getSectionBody, replaceSection } from './EditorUtils'
import { SaveButton } from './SaveButton'

type EditorProps = {
  path: string
  hash: string
  post?: Post
  isLoading: boolean
}

export const Editor: FC<EditorProps> = ({ path, hash, post, isLoading }) => {
  const id = path.endsWith('/') && path !== '/' ? path.slice(0, path.length - 1) : path
  const deleteConfirmMessage = `Are you sure you want to delete the page: ${post?.id}?`
  const navigate = useNavigate()
  const [titleText, setTitle] = useState('')
  const [bodyText, setBody] = useState('')
  const [bodyPos, setBodyPos] = useState(0)
  const [mounted, setMounted] = useState(false)

  const { setLoading } = useLoadingContext()
  useEffect(() => {
    if (!mounted && post) {
      setTitle(post.title)
      if (hash) {
        const sectionBody = getSectionBody(hash, post.body)
        setBody(sectionBody)
        setBodyPos(sectionBody.length)
      } else {
        setBody(post.body)
        setBodyPos(post.body.length)
      }
      setMounted(true)
      setLoading(false)
    }
  }, [post, hash, setLoading, isLoading, mounted])
  const onDrop = useCallback(
    async (f: File[]) => {
      try {
        const file = f[0]
        const now = new Date()
        const fileId = `${now.getFullYear()}/${now.getMonth()}/${uuidv4()}`
        const res = await Storage.put(fileId, file, { level: 'public', contentType: file.type })
        const newBody = bodyText.slice(0, bodyPos) + `![](${res.key})\n` + bodyText.slice(bodyPos, bodyText.length)
        setBody(newBody)
      } catch (e) {
        // TODO: エラー処理
        console.log(e)
      } finally {
      }
    },
    [bodyPos, bodyText]
  )
  const { getRootProps, getInputProps } = useDropzone({ onDrop })
  const onChangeBody = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setBody(e.target.value)
  }
  const onSelectBody = (e: SyntheticEvent<HTMLDivElement>) => {
    const elem = e.target as any
    setBodyPos(elem.selectionStart)
  }
  const onChangeTitle = (e: ChangeEvent<HTMLTextAreaElement>) => setTitle(e.target.value)
  const onClickDelete = async () => {
    const session = await Auth.currentSession()
    const token = session.getIdToken().getJwtToken()
    if (post) {
      try {
        setLoading(true)
        const isPrivate = id === '/private' || id.startsWith('/private/')
        const res = await API.graphql(
          graphqlOperation(
            isPrivate ? deletePrivatePost : deletePost,
            { input: { id: post.id } },
            isPrivate ? token : undefined
          )
        )
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
    const session = await Auth.currentSession()
    const token = session.getIdToken().getJwtToken()
    const isPrivate = id === '/private' || id.startsWith('/private/')
    const query = post ? (isPrivate ? updatePrivatePost : updatePost) : isPrivate ? createPrivatePost : createPost
    const body = post && hash ? replaceSection(hash, bodyText, post.body) : bodyText
    try {
      setLoading(true)
      const res = await API.graphql(
        graphqlOperation(
          query,
          {
            input: { id, title: titleText, body, type: 'Post' },
          },
          isPrivate ? token : undefined
        )
      )
      if ('data' in res && res.data) {
        const id: string = post
          ? isPrivate
            ? res.data.updatePrivatePost.id
            : res.data.updatePost.id
          : isPrivate
          ? res.data.createPrivatePost.id
          : res.data.createPost.id
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
        onSelect={onSelectBody}
      />
      <Box display="flex">
        <DeleteButton confirmMessage={deleteConfirmMessage} disabled={!post} onClick={onClickDelete} />
        <SaveButton onClick={onClickSave} disabled={isLoading} sx={{ marginLeft: 'auto' }} />
      </Box>
      <Box
        width="100%"
        {...getRootProps()}
        border={1}
        borderRadius={2}
        borderColor="gray"
        bgcolor="lightgray"
        textAlign="center">
        <input {...getInputProps()} />
        <Typography p={4} variant="h1">
          Drop the files here
        </Typography>
      </Box>
    </>
  )
}
