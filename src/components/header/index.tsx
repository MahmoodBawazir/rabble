import React from 'react'
import { Link } from 'react-router-dom'

import { Container } from 'components/globals'
import Logo from 'components/logo'
import { PrimaryButton } from 'components/button'
import { StyledHeader, Inner, SideButtons, LoginAnchor } from './style'
import useCurrentUser from '../../../shared/graphql/queries/user/useCurrentUser'
import { SERVER_URL } from '../../../shared/constants'

const Header: React.FC<{}> = () => {
  const { data } = useCurrentUser()

  return (
    <StyledHeader>
      <Container>
        <Inner>
          <Logo />

          <SideButtons>
            {data?.user ? (
              <>
                <Link to="/account">Hi, {data.user.displayName}</Link>
                <PrimaryButton
                  href={`${SERVER_URL}/auth/logout`}
                  target="_self"
                >
                  Logout
                </PrimaryButton>
              </>
            ) : (
              <>
                <LoginAnchor to="/login">Login</LoginAnchor>
                <PrimaryButton to="/signup">Sign up</PrimaryButton>
              </>
            )}
          </SideButtons>
        </Inner>
      </Container>
    </StyledHeader>
  )
}

export default Header
