import React from 'react'
import { Helmet } from 'react-helmet-async'

interface HeadProps {
  title?: string
  description?: string
  children?: any
}

const Head: React.FC<HeadProps> = ({ title, description, children }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap"
        rel="stylesheet"
      />
      {children}
    </Helmet>
  )
}

export default Head
