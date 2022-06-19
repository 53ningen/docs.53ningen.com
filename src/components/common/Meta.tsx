import React from 'react'
import { Helmet } from 'react-helmet-async'
import { Constants } from '../../Constants'

interface Props {
  title?: string
  description?: string
}

export const Meta = ({ title, description }: Props) => {
  const siteUrl = Constants
  if (title) {
    const trimmedDescription = description?.slice(0, 80)
    return (
      <Helmet>
        <title>{title}</title>
        <meta property="description" content={trimmedDescription} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={trimmedDescription} />
        <meta property="og:image" content={`${siteUrl}/favicon192.jpg`} />
        <meta name="twitter:card" content="summary" />
      </Helmet>
    )
  } else {
    return <></>
  }
}
