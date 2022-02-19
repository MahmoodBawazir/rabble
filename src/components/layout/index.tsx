import React from 'react'

import Header from 'components/header'
import Footer from 'components/footer'
import { StyledLayout } from './style'

interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <StyledLayout>
      <Header />
      {children}
      <Footer />
    </StyledLayout>
  )
}

export default Layout
