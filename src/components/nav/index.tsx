import React from 'react'
import { StyledNav, Anchor } from './style'

const Nav: React.FC<{}> = () => {
  return (
    <StyledNav>
      <Anchor to="/courses">Courses</Anchor>
    </StyledNav>
  )
}

export default Nav
