import { Skeleton } from '@mui/material'
import { Storage } from 'aws-amplify'
import { FC, useEffect, useState } from 'react'

type S3ImageProps = {
  imgKey?: string
  level?: 'public' | 'protected' | 'private'
}

// TODO: Refinement
export const S3Image: FC<S3ImageProps> = ({ imgKey, level }) => {
  const [signedUrl, setSignedUrl] = useState<string>()
  useEffect(() => {
    const getImage = async () => {
      if (imgKey) {
        const res = await Storage.get(imgKey, { level })
        setSignedUrl(res)
      }
    }
    getImage()
  }, [imgKey, level])
  if (signedUrl) {
    return <img src={signedUrl} alt="" style={{ maxWidth: '100%' }} />
  } else {
    return <Skeleton variant="rectangular" width={200} height={100} />
  }
}
