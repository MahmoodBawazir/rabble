import React from 'react'
import { Link } from 'react-router-dom'

import { Container } from 'components/globals'
import { StyledFooter, Inner } from './style'

const Footer: React.FC<{}> = () => {
  return (
    <StyledFooter>
      <Container>
        <Inner>
          <p>Copyright &copy; 2022. rabble academy. All rights reserved.</p>
          <nav>
            <Link to="/privacy-policy">Privacy policy</Link>
            <Link to="/terms">Terms &amp; Conditions</Link>
          </nav>
        </Inner>
      </Container>
    </StyledFooter>
  )
}

export default Footer
