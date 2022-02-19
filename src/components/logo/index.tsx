import React from 'react'
import { Link } from 'react-router-dom'

import { StyledLogo } from './style'

const Logo: React.FC<{}> = () => {
  return (
    <StyledLogo as={Link} to="/">
      rabble. academy
    </StyledLogo>
  )
}

export default Logo
