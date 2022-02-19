import React from 'react'

import { Container } from 'components/globals'
import Logo from 'components/logo'
import Nav from 'components/nav'
import { PrimaryButton } from 'components/button'
import { StyledHeader, Inner, SideButtons, LoginAnchor } from './style'

const Header: React.FC<{}> = () => {
  return (
    <StyledHeader>
      <Container>
        <Inner>
          <Logo />
          <Nav />
          <SideButtons>
            <LoginAnchor to="/login">Login</LoginAnchor>
            <PrimaryButton to="/signup">Sign up</PrimaryButton>
          </SideButtons>
        </Inner>
      </Container>
    </StyledHeader>
  )
}

export default Header
